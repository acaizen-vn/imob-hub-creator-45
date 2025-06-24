
import { useState } from 'react';
import { MapPin, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CitySelectorProps {
  selectedCity: string;
  onCitySelect: (city: string) => void;
}

const cities = [
  { id: 'barra-mansa', name: 'Barra Mansa', coordinates: [-22.5441, -44.1742] },
  { id: 'volta-redonda', name: 'Volta Redonda', coordinates: [-22.5231, -44.1045] }
];

export const CitySelector = ({ selectedCity, onCitySelect }: CitySelectorProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8">
      <div className="flex items-center gap-2 text-muted-foreground">
        <MapPin className="h-4 w-4" />
        <span className="text-sm font-medium">Selecione a cidade:</span>
      </div>
      
      <div className="flex gap-2">
        {cities.map((city) => (
          <Button
            key={city.id}
            variant={selectedCity === city.id ? 'default' : 'outline'}
            className={`
              relative overflow-hidden transition-all duration-300 ease-out
              ${selectedCity === city.id 
                ? 'bg-primary text-primary-foreground shadow-lg scale-105' 
                : 'hover:scale-105 hover:shadow-md'
              }
            `}
            onClick={() => onCitySelect(city.id)}
          >
            <div className="flex items-center gap-2">
              {selectedCity === city.id && (
                <Check className="h-4 w-4 animate-scale-in" />
              )}
              <span className="font-medium">{city.name}</span>
            </div>
            
            {/* Ripple effect background */}
            <div className={`
              absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent
              transition-opacity duration-300
              ${selectedCity === city.id ? 'opacity-100' : 'opacity-0'}
            `} />
          </Button>
        ))}
      </div>
    </div>
  );
};
