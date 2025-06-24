
import { MapPin, Bed, Bath, Car, Home, Building, Store, TreePine } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Property } from '@/types';

interface PropertyCardProps {
  property: Property;
  onClick?: (property: Property) => void;
}

const getTypeIcon = (type: Property['type']) => {
  switch (type) {
    case 'house':
      return <Home className="h-4 w-4" />;
    case 'apartment':
      return <Building className="h-4 w-4" />;
    case 'commercial':
      return <Store className="h-4 w-4" />;
    case 'land':
      return <TreePine className="h-4 w-4" />;
    default:
      return <Home className="h-4 w-4" />;
  }
};

const getTypeLabel = (type: Property['type']) => {
  switch (type) {
    case 'house':
      return 'Casa';
    case 'apartment':
      return 'Apartamento';
    case 'commercial':
      return 'Comercial';
    case 'land':
      return 'Terreno';
    default:
      return 'Imóvel';
  }
};

const getPurposeLabel = (purpose: Property['purpose']) => {
  switch (purpose) {
    case 'buy':
      return 'Venda';
    case 'rent':
      return 'Aluguel';
    case 'season':
      return 'Temporada';
    default:
      return '';
  }
};

export const PropertyCard = ({ property, onClick }: PropertyCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <Card 
      className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      onClick={() => onClick?.(property)}
    >
      <div className="relative overflow-hidden">
        <img
          src={property.images[0] || '/placeholder.svg'}
          alt={property.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant="secondary" className="bg-white/90 text-primary">
            {getPurposeLabel(property.purpose)}
          </Badge>
          {property.featured && (
            <Badge className="bg-yellow-500 text-white">
              Destaque
            </Badge>
          )}
        </div>

        <div className="absolute top-3 right-3">
          <div className="bg-white/90 p-2 rounded-full">
            {getTypeIcon(property.type)}
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
              {property.title}
            </h3>
            <div className="flex items-center text-muted-foreground text-sm mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              {property.city}, {property.address}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-3 text-muted-foreground">
              {property.bedrooms && (
                <div className="flex items-center">
                  <Bed className="h-3 w-3 mr-1" />
                  {property.bedrooms}
                </div>
              )}
              {property.bathrooms && (
                <div className="flex items-center">
                  <Bath className="h-3 w-3 mr-1" />
                  {property.bathrooms}
                </div>
              )}
              {property.garage && (
                <div className="flex items-center">
                  <Car className="h-3 w-3 mr-1" />
                  {property.garage}
                </div>
              )}
            </div>
            <span className="text-xs text-muted-foreground">
              {property.area}m²
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-primary">
                {formatPrice(property.price)}
              </span>
              {property.purpose !== 'buy' && (
                <span className="text-sm text-muted-foreground">/mês</span>
              )}
            </div>
            <Badge variant="outline">
              {getTypeLabel(property.type)}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
