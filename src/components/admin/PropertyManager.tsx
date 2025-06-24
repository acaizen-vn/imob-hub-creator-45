
import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PropertyForm } from './PropertyForm';
import { PropertyTable } from './PropertyTable';
import { propertyService } from '@/utils/storage';
import { Property } from '@/types';
import { useToast } from '@/hooks/use-toast';

export const PropertyManager = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setProperties(propertyService.getAll());
  }, []);

  const handleSave = (propertyData: Omit<Property, 'id' | 'createdAt'>) => {
    try {
      if (selectedProperty) {
        const updated = propertyService.update(selectedProperty.id, propertyData);
        if (updated) {
          setProperties(propertyService.getAll());
          toast({ title: "Imóvel atualizado com sucesso!" });
        }
      } else {
        propertyService.create(propertyData);
        setProperties(propertyService.getAll());
        toast({ title: "Imóvel cadastrado com sucesso!" });
      }
      setIsDialogOpen(false);
      setSelectedProperty(null);
    } catch (error) {
      toast({ 
        title: "Erro", 
        description: "Não foi possível salvar o imóvel",
        variant: "destructive" 
      });
    }
  };

  const handleEdit = (property: Property) => {
    setSelectedProperty(property);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este imóvel?')) {
      propertyService.delete(id);
      setProperties(propertyService.getAll());
      toast({ title: "Imóvel excluído com sucesso!" });
    }
  };

  const handleNewProperty = () => {
    setSelectedProperty(null);
    setIsDialogOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Gestão de Imóveis</h2>
          <p className="text-gray-600">Cadastre e gerencie os imóveis do seu catálogo</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleNewProperty}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Imóvel
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedProperty ? 'Editar Imóvel' : 'Novo Imóvel'}
              </DialogTitle>
            </DialogHeader>
            <PropertyForm
              property={selectedProperty}
              onSave={handleSave}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <PropertyTable
        properties={properties}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};
