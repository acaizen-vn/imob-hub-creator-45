
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PropertyCard } from '@/components/PropertyCard';
import { Property } from '@/types';

interface DevelopmentCarouselProps {
  properties: Property[];
  title: string;
  onPropertyClick?: (property: Property) => void;
}

export const DevelopmentCarousel = ({ properties, title, onPropertyClick }: DevelopmentCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, properties.length - itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  useEffect(() => {
    if (properties.length === 0) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, maxIndex, properties.length]);

  if (properties.length === 0) {
    return (
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-2">
            <Building2 className="h-8 w-8 text-primary" />
            {title}
          </h2>
          <div className="text-center text-muted-foreground">
            Nenhum empreendimento disponível no momento.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-2">
            <Building2 className="h-8 w-8 text-primary" />
            {title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Conheça nossos empreendimentos exclusivos e encontre o seu futuro lar
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
                width: `${(properties.length / itemsPerPage) * 100}%`
              }}
            >
              {properties.map((property) => (
                <div 
                  key={property.id} 
                  className={`flex-shrink-0 px-3`}
                  style={{ width: `${100 / properties.length}%` }}
                >
                  <PropertyCard 
                    property={property} 
                    onClick={onPropertyClick}
                  />
                </div>
              ))}
            </div>
          </div>

          {properties.length > itemsPerPage && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-lg hover:bg-gray-50 z-10"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-lg hover:bg-gray-50 z-10"
                onClick={nextSlide}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>

        {properties.length > itemsPerPage && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
