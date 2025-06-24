
import { useEffect, useState } from 'react';
import { Building, Instagram, Facebook, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
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
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Building className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">{settings.siteName}</span>
            </div>
            <p className="text-gray-400 text-sm">
              {settings.siteDescription}
            </p>
            {settings.creci && (
              <p className="text-sm text-gray-400">{settings.creci}</p>
            )}
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Serviços</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Compra de Imóveis</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Avaliação</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Financiamento</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Consultoria</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contato</h3>
            <div className="space-y-2 text-gray-400 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>{settings.whatsappNumber}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contato@{settings.siteName.toLowerCase()}.com.br</span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              {settings.socialMedia.instagram && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white hover:bg-white/10 h-8 w-8"
                  asChild
                >
                  <a href={settings.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                    <Instagram className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {settings.socialMedia.facebook && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white hover:bg-white/10 h-8 w-8"
                  asChild
                >
                  <a href={settings.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                    <Facebook className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2025 {settings.siteName}. Todos os direitos reservados.
            </div>
            
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-400">Desenvolvido por</span>
              <Button
                variant="link"
                className="text-primary font-semibold p-0 h-auto"
                asChild
              >
                <a 
                  href="https://wa.me/5524992342252" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1"
                >
                  <span>Nexus Hub Software</span>
                  <MessageCircle className="h-3 w-3" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
