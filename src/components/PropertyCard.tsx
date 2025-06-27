
import { MapPin, Bed, Bath, Car, Home, Building, Store, TreePine, Wifi, Utensils, Dumbbell, Car as CarIcon, Shield, Waves, Zap, Star } from 'lucide-react';
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

// Mock amenities data - in a real app this would come from the property data
const getAmenities = (type: Property['type']) => {
  const commonAmenities = [
    { icon: Wifi, label: 'Internet' },
    { icon: Shield, label: 'Segurança' },
    { icon: Car, label: 'Garagem' }
  ];

  if (type === 'apartment') {
    return [
      ...commonAmenities,
      { icon: Dumbbell, label: 'Academia' },
      { icon: Waves, label: 'Piscina' }
    ];
  }

  return commonAmenities.slice(0, 3);
};

export const PropertyCard = ({ property, onClick }: PropertyCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const amenities = getAmenities(property.type);

  return (
    <Card 
      className="group cursor-pointer overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-br from-card via-card to-card/95 border-0 shadow-lg"
      onClick={() => onClick?.(property)}
    >
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
        
        <img
          src={property.images[0] || '/placeholder.svg'}
          alt={property.title}
          className="w-full h-64 sm:h-48 object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
        />
        
        {/* Overlay with glassmorphism effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
        
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-30">
          <Badge variant="secondary" className="bg-white/95 backdrop-blur-sm text-primary font-semibold px-3 py-1 shadow-lg">
            {getPurposeLabel(property.purpose)}
          </Badge>
          {property.featured && (
            <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold px-3 py-1 shadow-lg animate-pulse">
              <Star className="h-3 w-3 mr-1 fill-current" />
              Destaque
            </Badge>
          )}
        </div>

        <div className="absolute top-4 right-4 z-30">
          <div className="bg-white/95 backdrop-blur-sm p-2.5 rounded-full shadow-lg transition-transform duration-300 group-hover:scale-110">
            {getTypeIcon(property.type)}
          </div>
        </div>

        {/* Price overlay on hover */}
        <div className="absolute bottom-4 left-4 right-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-30">
          <div className="glass-effect rounded-xl p-3">
            <div className="text-white">
              <span className="text-2xl font-bold">
                {formatPrice(property.price)}
              </span>
              {property.purpose !== 'buy' && (
                <span className="text-sm opacity-80">/mês</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-6 space-y-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-bold text-xl line-clamp-2 group-hover:text-primary transition-colors duration-300 mb-2">
              {property.title}
            </h3>
            <div className="flex items-center text-muted-foreground text-sm">
              <MapPin className="h-4 w-4 mr-2 text-primary" />
              <span className="truncate">{property.city}, {property.address}</span>
            </div>
          </div>

          {/* Property specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-border/50">
            <div className="text-center">
              <div className="text-lg font-bold text-primary">{property.area}</div>
              <div className="text-xs text-muted-foreground">m²</div>
            </div>
            {property.bedrooms && (
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Bed className="h-4 w-4 text-primary" />
                </div>
                <div className="text-sm font-semibold">{property.bedrooms}</div>
                <div className="text-xs text-muted-foreground">Quartos</div>
              </div>
            )}
            {property.bathrooms && (
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Bath className="h-4 w-4 text-primary" />
                </div>
                <div className="text-sm font-semibold">{property.bathrooms}</div>
                <div className="text-xs text-muted-foreground">Banheiros</div>
              </div>
            )}
            {property.garage && (
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <CarIcon className="h-4 w-4 text-primary" />
                </div>
                <div className="text-sm font-semibold">{property.garage}</div>
                <div className="text-xs text-muted-foreground">Vagas</div>
              </div>
            )}
          </div>

          {/* Amenities */}
          <div className="space-y-2">
            <div className="text-sm font-semibold text-foreground">Comodidades</div>
            <div className="flex flex-wrap gap-2">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex items-center gap-1 bg-muted/50 rounded-full px-3 py-1.5 text-xs">
                  <amenity.icon className="h-3 w-3 text-primary" />
                  <span>{amenity.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Price and type */}
          <div className="flex items-center justify-between pt-2">
            <div className="group-hover:hidden transition-all duration-300">
              <span className="text-2xl font-bold text-primary">
                {formatPrice(property.price)}
              </span>
              {property.purpose !== 'buy' && (
                <span className="text-sm text-muted-foreground">/mês</span>
              )}
            </div>
            <div className="hidden group-hover:block transition-all duration-300">
              <div className="bg-gradient-to-r from-primary to-primary/80 text-white px-4 py-2 rounded-lg font-semibold text-sm">
                Ver Detalhes
              </div>
            </div>
            <Badge variant="outline" className="border-primary/20 text-primary font-medium">
              {getTypeLabel(property.type)}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
