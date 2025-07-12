
import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Filter, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { AdvancedPropertyForm } from './AdvancedPropertyForm';
import { PropertyTable } from './PropertyTable';
import { propertyService } from '@/utils/storage';
import { Property, SearchFilters } from '@/types';
import { useToast } from '@/hooks/use-toast';

export const PropertyManager = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const { toast } = useToast();

  useEffect(() => {
    loadProperties();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [properties, searchTerm, filters]);

  const loadProperties = () => {
    const allProperties = propertyService.getAll();
    setProperties(allProperties);
  };

  const applyFilters = () => {
    let filtered = [...properties];

    // Filtro por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Aplicar outros filtros
    if (filters.purpose) {
      filtered = filtered.filter(property => property.purpose === filters.purpose);
    }

    if (filters.type) {
      filtered = filtered.filter(property => property.type === filters.type);
    }

    if (filters.city) {
      filtered = filtered.filter(property => 
        property.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    if (filters.status) {
      filtered = filtered.filter(property => property.status === filters.status);
    }

    if (filters.minPrice !== undefined) {
      filtered = filtered.filter(property => property.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter(property => property.price <= filters.maxPrice!);
    }

    setFilteredProperties(filtered);
  };

  const handleSave = (propertyData: Omit<Property, 'id' | 'createdAt'>) => {
    try {
      if (selectedProperty) {
        const updated = propertyService.update(selectedProperty.id, propertyData);
        if (updated) {
          loadProperties();
          toast({ title: "Imóvel atualizado com sucesso!" });
        }
      } else {
        propertyService.create(propertyData);
        loadProperties();
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
      loadProperties();
      toast({ title: "Imóvel excluído com sucesso!" });
    }
  };

  const handleNewProperty = () => {
    setSelectedProperty(null);
    setIsDialogOpen(true);
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
  };

  const getStatusCount = (status: Property['status']) => {
    return properties.filter(p => p.status === status).length;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Gestão de Imóveis</h2>
          <p className="text-slate-200">
            Total: {properties.length} | Disponíveis: {getStatusCount('available')} | 
            Vendidos: {getStatusCount('sold')} | Alugados: {getStatusCount('rented')}
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleNewProperty} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Novo Imóvel
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl">
                {selectedProperty ? 'Editar Imóvel' : 'Novo Imóvel'}
              </DialogTitle>
            </DialogHeader>
            <AdvancedPropertyForm
              property={selectedProperty}
              onSave={handleSave}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtros e Busca */}
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Buscar imóveis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/20 border-white/30 text-white placeholder-slate-300"
            />
          </div>

          <Select value={filters.purpose || ''} onValueChange={(value) => 
            setFilters(prev => ({ ...prev, purpose: value as Property['purpose'] || undefined }))
          }>
            <SelectTrigger className="bg-white/20 border-white/30 text-white">
              <SelectValue placeholder="Pretensão" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todas</SelectItem>
              <SelectItem value="buy">Comprar</SelectItem>
              <SelectItem value="rent">Alugar</SelectItem>
              <SelectItem value="season">Temporada</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.type || ''} onValueChange={(value) => 
            setFilters(prev => ({ ...prev, type: value as Property['type'] || undefined }))
          }>
            <SelectTrigger className="bg-white/20 border-white/30 text-white">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos</SelectItem>
              <SelectItem value="house">Casa</SelectItem>
              <SelectItem value="apartment">Apartamento</SelectItem>
              <SelectItem value="penthouse">Cobertura</SelectItem>
              <SelectItem value="commercial">Comercial</SelectItem>
              <SelectItem value="land">Terreno</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.status || ''} onValueChange={(value) => 
            setFilters(prev => ({ ...prev, status: value as Property['status'] || undefined }))
          }>
            <SelectTrigger className="bg-white/20 border-white/30 text-white">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos</SelectItem>
              <SelectItem value="available">Disponível</SelectItem>
              <SelectItem value="reserved">Reservado</SelectItem>
              <SelectItem value="sold">Vendido</SelectItem>
              <SelectItem value="rented">Alugado</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            variant="outline" 
            onClick={clearFilters}
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            Limpar Filtros
          </Button>
        </div>

        {/* Filtros ativos */}
        {(searchTerm || Object.keys(filters).some(key => filters[key as keyof SearchFilters])) && (
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-slate-300">Filtros ativos:</span>
            {searchTerm && (
              <Badge variant="secondary">
                Busca: {searchTerm}
              </Badge>
            )}
            {filters.purpose && (
              <Badge variant="secondary">
                Pretensão: {filters.purpose === 'buy' ? 'Comprar' : filters.purpose === 'rent' ? 'Alugar' : 'Temporada'}
              </Badge>
            )}
            {filters.type && (
              <Badge variant="secondary">
                Tipo: {filters.type}
              </Badge>
            )}
            {filters.status && (
              <Badge variant="secondary">
                Status: {filters.status}
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Tabela de Imóveis */}
      <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 overflow-hidden">
        <PropertyTable
          properties={filteredProperties}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Estatísticas */}
      {filteredProperties.length !== properties.length && (
        <div className="text-center text-slate-300">
          Mostrando {filteredProperties.length} de {properties.length} imóveis
        </div>
      )}
    </div>
  );
};
