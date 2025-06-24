
import { useState, useEffect } from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { settingsService } from '@/utils/storage';

export const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState(settingsService.get());

  const offices = [
    {
      name: 'Volta Redonda',
      phone: '(24) 99875-3750',
      whatsappUrl: 'https://wa.me/5524998753750?text=Olá! Gostaria de mais informações sobre os imóveis em Volta Redonda.',
    },
    {
      name: 'Barra Mansa', 
      phone: '(24) 99875-3750',
      whatsappUrl: 'https://wa.me/5524998753750?text=Olá! Gostaria de mais informações sobre os imóveis em Barra Mansa.',
    }
  ];

  const handleOfficeClick = (office: typeof offices[0]) => {
    window.open(office.whatsappUrl, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* Main WhatsApp Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 luxury-shadow animate-pulse-luxury"
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6 text-white" /> : <MessageCircle className="h-6 w-6 text-white" />}
      </Button>

      {/* Office Selection Popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-72">
          <Card className="luxury-glass luxury-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <MessageCircle className="h-5 w-5 mr-2 text-green-600" />
                Escolha uma unidade
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {offices.map((office, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start hover:bg-green-50 dark:hover:bg-green-950 transition-colors"
                  onClick={() => handleOfficeClick(office)}
                >
                  <Phone className="h-4 w-4 mr-3 text-green-600" />
                  <div className="text-left">
                    <div className="font-medium">{office.name}</div>
                    <div className="text-sm text-muted-foreground">{office.phone}</div>
                  </div>
                </Button>
              ))}
              <div className="text-xs text-muted-foreground text-center pt-2">
                Horário: {settings.workingHours}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};
