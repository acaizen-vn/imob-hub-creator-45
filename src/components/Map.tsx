
import { useEffect, useState } from 'react';
import { settingsService } from '@/utils/storage';

export const Map = () => {
  const [mapUrl, setMapUrl] = useState('');

  useEffect(() => {
    const settings = settingsService.get();
    setMapUrl(settings.mapUrl);
  }, []);

  if (!mapUrl) {
    return (
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
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
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Nossa <span className="text-primary">Localização</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Visite nosso escritório ou entre em contato conosco
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-lg">
          <iframe
            src={mapUrl}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização da imobiliária"
          />
        </div>
      </div>
    </section>
  );
};
