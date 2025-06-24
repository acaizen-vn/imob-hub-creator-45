
import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cityService } from '@/utils/storage';
import { City } from '@/types';

interface CityButtonsProps {
  onCitySelect?: (city: string) => void;
  selectedCity?: string;
}

export const CityButtons = ({ onCitySelect, selectedCity }: CityButtonsProps) => {
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    setCities(cityService.getAll());
  }, []);

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore por <span className="text-primary">Cidade</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Encontre o imóvel perfeito nas principais cidades do Brasil
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {cities.map((city) => (
            <Button
              key={city.id}
              variant={selectedCity === city.name ? 'default' : 'outline'}
              className="h-auto p-6 flex flex-col items-center space-y-3 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
              onClick={() => onCitySelect?.(city.name)}
            >
              <div className={`p-3 rounded-full transition-colors ${
                selectedCity === city.name 
                  ? 'bg-white text-primary' 
                  : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white'
              }`}>
                <MapPin className="h-6 w-6" />
              </div>
              
              <div className="text-center">
                <div className="font-semibold">{city.name}</div>
                <div className="text-xs opacity-70">{city.state}</div>
                <div className="text-xs opacity-60 mt-1">
                  {city.propertiesCount} imóveis
                </div>
              </div>
            </Button>
          ))}
        </div>

        {selectedCity && (
          <div className="text-center mt-8">
            <Button
              variant="ghost"
              onClick={() => onCitySelect?.('')}
              className="text-primary hover:text-primary/80"
            >
              Limpar filtro de cidade
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
