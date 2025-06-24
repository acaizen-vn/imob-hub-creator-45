
import { Edit, Trash2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Property } from '@/types';

interface PropertyTableProps {
  properties: Property[];
  onEdit: (property: Property) => void;
  onDelete: (id: string) => void;
}

export const PropertyTable = ({ properties, onEdit, onDelete }: PropertyTableProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const getTypeLabel = (type: Property['type']) => {
    const types = {
      house: 'Casa',
      apartment: 'Apartamento',
      commercial: 'Comercial',
      land: 'Terreno',
    };
    return types[type];
  };

  const getPurposeLabel = (purpose: Property['purpose']) => {
    const purposes = {
      buy: 'Comprar',
      rent: 'Alugar',
      season: 'Temporada',
    };
    return purposes[purpose];
  };

  if (properties.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Nenhum imóvel cadastrado ainda.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Imóvel</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Pretensão</TableHead>
            <TableHead>Cidade</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties.map((property) => (
            <TableRow key={property.id}>
              <TableCell>
                <div className="flex items-center space-x-3">
                  {property.images[0] && (
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                  <div>
                    <div className="font-medium">{property.title}</div>
                    <div className="text-sm text-gray-500">{property.address}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{getTypeLabel(property.type)}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{getPurposeLabel(property.purpose)}</Badge>
              </TableCell>
              <TableCell>{property.city}</TableCell>
              <TableCell className="font-medium">{formatPrice(property.price)}</TableCell>
              <TableCell>
                {property.featured && (
                  <Badge className="bg-yellow-100 text-yellow-800">
                    <Star className="w-3 h-3 mr-1" />
                    Destaque
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(property)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(property.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
