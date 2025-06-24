
import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { PropertyCarousel } from '@/components/PropertyCarousel';
import { CityButtons } from '@/components/CityButtons';
import { NewsCarousel } from '@/components/NewsCarousel';
import { AboutSection } from '@/components/AboutSection';
import { ContactSection } from '@/components/ContactSection';
import { Map } from '@/components/Map';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { propertyService, initializeDefaultData } from '@/utils/storage';
import { Property } from '@/types';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [selectedCity, setSelectedCity] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize default data on first load
    initializeDefaultData();
    
    // Load featured properties
    setFeaturedProperties(propertyService.getFeatured());
    setFilteredProperties(propertyService.getAll());
  }, []);

  const handleSearch = (filters: { purpose: string; type: string; location: string }) => {
    console.log('Searching with filters:', filters);
    const results = propertyService.search({
      purpose: filters.purpose || undefined,
      type: filters.type || undefined,
      city: filters.location || undefined,
    });
    setFilteredProperties(results);
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    if (city) {
      const results = propertyService.getByCity(city);
      setFilteredProperties(results);
    } else {
      setFilteredProperties(propertyService.getAll());
    }
  };

  const handlePropertyClick = (property: Property) => {
    console.log('Property clicked:', property);
    navigate(`/property/${property.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={handleSearch} />
      
      <PropertyCarousel
        properties={featuredProperties}
        title="Imóveis em Destaque"
        onPropertyClick={handlePropertyClick}
      />
      
      <CityButtons 
        onCitySelect={handleCitySelect}
        selectedCity={selectedCity}
      />
      
      <PropertyCarousel
        properties={filteredProperties.slice(0, 9)}
        title={selectedCity ? `Imóveis em ${selectedCity}` : "Todos os Imóveis"}
        onPropertyClick={handlePropertyClick}
      />
      
      <AboutSection />
      
      <NewsCarousel />
      
      <ContactSection />
      
      <Map />
      
      <Footer />
      
      <WhatsAppButton />
    </div>
  );
};

export default Index;
