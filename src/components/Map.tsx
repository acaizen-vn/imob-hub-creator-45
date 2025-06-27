
import { useEffect, useState } from 'react';
import { settingsService } from '@/utils/storage';
import { CitySelector } from '@/components/CitySelector';
import { MapPin, Navigation, Zap, Clock } from 'lucide-react';

export const Map = () => {
  const [mapUrl, setMapUrl] = useState('');
  const [selectedCity, setSelectedCity] = useState('barra-mansa');
  const [mapKey, setMapKey] = useState(0); // Add key to force iframe reload

  // URLs específicas para cada cidade
  const cityMaps = {
    'barra-mansa': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3665.123456789!2d-44.1742!3d-22.5441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9c8b6a6b6a6b6a6b%3A0x6b6a6b6a6b6a6b6a!2sRua%20Michel%20Wardini%2C%2010%2C%20Centro%2C%20Barra%20Mansa%20-%20RJ!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr',
    'volta-redonda': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3665.123456789!2d-44.1045!3d-22.5231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9c8b6a6b6a6b6a6b%3A0x6b6a6b6a6b6a6b6a!2sRua%20Edson%20Passos%2C%2066%2C%20Aterrado%2C%20Volta%20Redonda%20-%20RJ!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr'
  };

  const cityInfo = {
    'barra-mansa': {
      name: 'Barra Mansa',
      address: 'Rua Michel Wardini, 10, Centro',
      city: 'Barra Mansa - Rio de Janeiro',
      hours: '09 às 18h'
    },
    'volta-redonda': {
      name: 'Volta Redonda',
      address: 'Rua Edson Passos, 66, Aterrado',
      city: 'Volta Redonda - Rio de Janeiro',
      hours: '09 às 18h'
    }
  };

  useEffect(() => {
    const settings = settingsService.get();
    const newMapUrl = settings.mapUrl || cityMaps[selectedCity as keyof typeof cityMaps];
    setMapUrl(newMapUrl);
  }, [selectedCity]);

  const handleCitySelect = (cityId: string) => {
    console.log('City selected:', cityId);
    setSelectedCity(cityId);
    const newMapUrl = cityMaps[cityId as keyof typeof cityMaps];
    setMapUrl(newMapUrl);
    setMapKey(prev => prev + 1); // Force iframe reload
    console.log('New map URL:', newMapUrl);
  };

  const currentCityInfo = cityInfo[selectedCity as keyof typeof cityInfo];

  if (!mapUrl && !cityMaps[selectedCity as keyof typeof cityMaps]) {
    return (
      <section className="py-20 px-6 bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center glass-effect rounded-2xl p-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <MapPin className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Nossa Localização</h2>
            <p className="text-muted-foreground">
              Configure o mapa no painel administrativo
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header com animação */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Navigation className="h-6 w-6 text-primary" />
            </div>
            <div className="h-px w-12 bg-gradient-to-r from-primary to-transparent" />
            <div className="p-2 bg-secondary/10 rounded-lg">
              <Zap className="h-4 w-4 text-secondary-foreground" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            Nossa <span className="text-primary">Localização</span>
          </h2>
          
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Encontre-nos nas principais cidades da região. Estamos prontos para atendê-lo com excelência.
          </p>
        </div>

        {/* Seletor de cidades */}
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <CitySelector 
            selectedCity={selectedCity}
            onCitySelect={handleCitySelect}
          />
        </div>

        {/* Container do mapa com design moderno */}
        <div className="relative animate-fade-in" style={{ animationDelay: '0.4s' }}>
          {/* Decorative border */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary rounded-3xl p-1">
            <div className="bg-background rounded-3xl h-full" />
          </div>
          
          {/* Mapa */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] group">
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/5 pointer-events-none z-10 rounded-3xl" />
            
            {/* Loading shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-20 rounded-3xl" />
            
            <iframe
              key={mapKey}
              src={mapUrl || cityMaps[selectedCity as keyof typeof cityMaps]}
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Localização Conquista ${currentCityInfo.name}`}
              className="rounded-3xl filter brightness-105 contrast-105"
            />
          </div>

          {/* Info cards atualizados */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="glass-effect rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Conquista {currentCityInfo.name}</h3>
                  <p className="text-muted-foreground mb-1">{currentCityInfo.address}</p>
                  <p className="text-muted-foreground text-sm">{currentCityInfo.city}</p>
                </div>
              </div>
            </div>

            <div className="glass-effect rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary/10 rounded-xl">
                  <Clock className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Horário de Funcionamento</h3>
                  <p className="text-muted-foreground">
                    {currentCityInfo.hours}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
