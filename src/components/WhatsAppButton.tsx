
import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { settingsService } from '@/utils/storage';

export const WhatsAppButton = () => {
  const [whatsappNumber, setWhatsappNumber] = useState('');

  useEffect(() => {
    const settings = settingsService.get();
    setWhatsappNumber(settings.whatsappNumber);
  }, []);

  if (!whatsappNumber) return null;

  const handleClick = () => {
    const url = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=Olá! Gostaria de mais informações sobre os imóveis.`;
    window.open(url, '_blank');
  };

  return (
    <Button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 shadow-lg animate-pulse-primary"
      size="icon"
    >
      <Phone className="h-6 w-6 text-white" />
    </Button>
  );
};
