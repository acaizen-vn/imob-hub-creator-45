
import { useEffect, useState } from 'react';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { settingsService } from '@/utils/storage';

export const Map = () => {
  const [selectedOffice, setSelectedOffice] = useState<'volta-redonda' | 'barra-mansa'>('volta-redonda');
  const [settings, setSettings] = useState(settingsService.get());

  const offices = [
    {
      id: 'volta-redonda',
      name: 'Volta Redonda',
      address: 'Rua Edson Passos, 66, Aterrado',
      city: 'Volta Redonda - Rio de Janeiro',
      phone: '(24) 99875-3750',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3695.4234567890123!2d-44.0987654321!3d-22.5123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDMwJzQ0LjQiUyA0NMKwMDUnNTUuNiJX!5e0!3m2!1spt-BR!2sbr!4v1234567890123',
      whatsappUrl: `https://wa.me/5524998753750?text=Olá! Gostaria de mais informações sobre os imóveis em Volta Redonda.`
    },
    {
      id: 'barra-mansa',
      name: 'Barra Mansa',
      address: 'Rua Michel Wardini, 10, Centro',
      city: 'Barra Mansa - Rio de Janeiro',
      phone: '(24) 99875-3750',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3695.4234567890123!2d-44.1987654321!3d-22.6123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDM2JzQ0LjQiUyA0NMKwMTEnNTUuNiJX!5e0!3m2!1spt-BR!2sbr!4v1234567890123',
      whatsappUrl: `https://wa.me/5524998753750?text=Olá! Gostaria de mais informações sobre os imóveis em Barra Mansa.`
    }
  ];

  const currentOffice = offices.find(office => office.id === selectedOffice);

  const openGoogleMaps = () => {
    if (currentOffice) {
      const address = encodeURIComponent(`${currentOffice.address}, ${currentOffice.city}`);
      window.open(`https://www.google.com/maps/search/${address}`, '_blank');
    }
  };

  const openWhatsApp = () => {
    if (currentOffice) {
      window.open(currentOffice.whatsappUrl, '_blank');
    }
  };

  return (
    <section id="location" className="py-16 px-6 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Nossas <span className="text-primary">Unidades</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Visite nossos escritórios ou entre em contato conosco. 
            Estamos em Volta Redonda e Barra Mansa para atendê-lo melhor.
          </p>
        </div>

        {/* Office Selector */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-muted rounded-full p-1">
            {offices.map((office) => (
              <Button
                key={office.id}
                variant={selectedOffice === office.id ? "default" : "ghost"}
                className={`rounded-full px-6 py-2 transition-all duration-300 ${
                  selectedOffice === office.id 
                    ? 'luxury-shadow' 
                    : 'hover:bg-background/50'
                }`}
                onClick={() => setSelectedOffice(office.id as 'volta-redonda' | 'barra-mansa')}
              >
                <MapPin className="h-4 w-4 mr-2" />
                {office.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Office Info Card */}
          <div className="lg:col-span-1">
            <Card className="luxury-shadow">
              <CardContent className="p-6">
                {currentOffice && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{currentOffice.name}</h3>
                      <div className="flex items-start space-x-3 text-muted-foreground">
                        <MapPin className="h-5 w-5 mt-0.5 text-primary" />
                        <div>
                          <p>{currentOffice.address}</p>
                          <p>{currentOffice.city}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 text-muted-foreground">
                      <Phone className="h-5 w-5 text-primary" />
                      <span>{currentOffice.phone}</span>
                    </div>

                    <div className="flex items-center space-x-3 text-muted-foreground">
                      <Clock className="h-5 w-5 text-primary" />
                      <span>{settings.workingHours}</span>
                    </div>

                    <div className="pt-4 space-y-3">
                      <Button 
                        onClick={openGoogleMaps}
                        className="w-full luxury-shadow"
                        variant="outline"
                      >
                        <Navigation className="h-4 w-4 mr-2" />
                        Ver no Google Maps
                      </Button>
                      
                      <Button 
                        onClick={openWhatsApp}
                        className="w-full bg-green-600 hover:bg-green-700 text-white luxury-shadow"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        WhatsApp
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Map */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl overflow-hidden luxury-shadow h-96">
              {currentOffice ? (
                <iframe
                  src={currentOffice.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Localização - ${currentOffice.name}`}
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-muted">
                  <p className="text-muted-foreground">
                    Configure o mapa no painel administrativo
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
