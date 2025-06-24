
import { useEffect, useState } from 'react';
import { Instagram, Facebook, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { settingsService } from '@/utils/storage';
import { Settings } from '@/types';

export const Footer = () => {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    setSettings(settingsService.get());
  }, []);

  if (!settings) return null;

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/logo.png" 
                alt="Conquista Imob" 
                className="h-12 w-auto brightness-0 invert"
              />
              <div>
                <span className="text-2xl font-bold">{settings.siteName}</span>
                <p className="text-sm text-gray-400">{settings.creci}</p>
              </div>
            </div>
            <p className="text-gray-400">
              {settings.siteDescription}
            </p>
            <div className="text-sm text-gray-400">
              <div className="flex items-center mt-2">
                <Clock className="h-3 w-3 mr-1" />
                {settings.workingHours}
              </div>
            </div>
            <div className="flex space-x-4">
              {settings.socialMedia.instagram && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white hover:bg-white/10"
                  asChild
                >
                  <a href={settings.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-5 w-5" />
                  </a>
                </Button>
              )}
              {settings.socialMedia.facebook && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white hover:bg-white/10"
                  asChild
                >
                  <a href={settings.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                    <Facebook className="h-5 w-5" />
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Serviços</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Compra</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Venda</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Aluguel</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Temporada</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Avaliação</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Financiamento CAIXA</a></li>
            </ul>
          </div>

          {/* Property Types */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Tipos de Imóvel</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Casas</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Apartamentos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Comerciais</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terrenos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Rurais</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Nossas Unidades</h3>
            <div className="space-y-4">
              {settings.offices?.map((office) => (
                <div key={office.id} className="space-y-2 text-gray-400 text-sm">
                  <h4 className="font-semibold text-white">{office.name}</h4>
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-3 w-3 mt-1 flex-shrink-0" />
                    <span>{office.address}<br />{office.city}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-3 w-3" />
                    <span>{office.whatsapp}</span>
                  </div>
                </div>
              ))}
              <div className="pt-2 border-t border-gray-800">
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <Mail className="h-3 w-3" />
                  <span>contato@conquistarj.com.br</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              <a href="#privacy" className="hover:text-white transition-colors">Política de Privacidade</a>
              <a href="#terms" className="hover:text-white transition-colors">Termos de Uso</a>
              <a href="#contact" className="hover:text-white transition-colors">Contato</a>
            </div>
            
            <div className="text-sm text-gray-400 text-center">
              <p>© 2025 {settings.siteName}. Todos os direitos reservados.</p>
              <p className="mt-1">
                Desenvolvido por <span className="text-primary font-semibold">Nexus Hub Software</span>
              </p>
              <p className="mt-1 text-xs">{settings.creci}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
