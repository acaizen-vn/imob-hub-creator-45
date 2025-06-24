
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
import { DevelopmentCarousel } from '@/components/DevelopmentCarousel';
import { propertyService, initializeDefaultData } from '@/utils/storage';
import { Property } from '@/types';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [developments, setDevelopments] = useState<Property[]>([]);
  const [selectedCity, setSelectedCity] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize default data on first load
    initializeDefaultData();
    
    // Load properties for sale
    const allProperties = propertyService.getAll();
    const forSaleProperties = allProperties.filter(property => property.purpose === 'buy');
    setFeaturedProperties(forSaleProperties.filter(property => property.featured));
    setFilteredProperties(forSaleProperties);
    
    // Mock developments data
    setDevelopments(forSaleProperties.slice(0, 3));
  }, []);

  const handleSearch = (filters: { purpose: string; type: string; location: string }) => {
    console.log('Searching with filters:', filters);
    const results = propertyService.search({
      purpose: 'buy', // Always search for buy since we only show properties for sale
      type: filters.type || undefined,
      city: filters.location || undefined,
    });
    setFilteredProperties(results);
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    if (city) {
      const results = propertyService.getByCity(city).filter(property => property.purpose === 'buy');
      setFilteredProperties(results);
    } else {
      const allProperties = propertyService.getAll().filter(property => property.purpose === 'buy');
      setFilteredProperties(allProperties);
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
        title="Imóveis para Comprar"
        onPropertyClick={handlePropertyClick}
      />
      
      <DevelopmentCarousel
        properties={developments}
        title="Empreendimentos"
        onPropertyClick={handlePropertyClick}
      />
      
      <NewsCarousel />
      
      <CityButtons 
        onCitySelect={handleCitySelect}
        selectedCity={selectedCity}
      />
      
      <PropertyCarousel
        properties={filteredProperties.slice(0, 9)}
        title={selectedCity ? `Imóveis em ${selectedCity}` : "Todas as Unidades"}
        onPropertyClick={handlePropertyClick}
      />
      
      <AboutSection />
      
      <ContactSection />
      
      <Map />
      
      <Footer />
      
      <WhatsAppButton />
    </div>
  );
};

export default Index;
