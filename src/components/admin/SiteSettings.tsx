
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { settingsService } from '@/utils/storage';
import { Settings } from '@/types';
import { useToast } from '@/hooks/use-toast';

export const SiteSettings = () => {
  const [settings, setSettings] = useState<Settings>({
    siteName: '',
    siteDescription: '',
    logo: '',
    whatsappNumber: '',
    mapUrl: '',
    socialMedia: {
      instagram: '',
      facebook: '',
      whatsapp: '',
    },
    theme: 'light',
  });
  const { toast } = useToast();

  useEffect(() => {
    setSettings(settingsService.get());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      settingsService.update(settings);
      toast({ title: "Configurações salvas com sucesso!" });
    } catch (error) {
      toast({ 
        title: "Erro", 
        description: "Não foi possível salvar as configurações",
        variant: "destructive" 
      });
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSettings({ ...settings, logo: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Configurações do Site</h2>
        <p className="text-gray-600">Gerencie as configurações gerais do seu site</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
            <CardDescription>Configure as informações principais do site</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="siteName">Nome da Imobiliária</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="siteDescription">Descrição do Site</Label>
              <Textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="logo">Logo da Empresa</Label>
              <Input
                id="logo"
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
              />
              {settings.logo && (
                <img src={settings.logo} alt="Logo" className="mt-2 w-32 h-32 object-contain" />
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tipos de Imóveis</CardTitle>
            <CardDescription>Tipos disponíveis no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
              <div className="p-2 bg-gray-100 rounded">Casa</div>
              <div className="p-2 bg-gray-100 rounded">Apartamento</div>
              <div className="p-2 bg-gray-100 rounded">Apartamento Garden</div>
              <div className="p-2 bg-gray-100 rounded">Casa de Condomínio</div>
              <div className="p-2 bg-gray-100 rounded">Studio</div>
              <div className="p-2 bg-gray-100 rounded">Cobertura</div>
              <div className="p-2 bg-gray-100 rounded">Terreno/Lote</div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Tipos configurados para venda de imóveis
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contato</CardTitle>
            <CardDescription>Configure os dados de contato</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="whatsapp">WhatsApp (com DDD)</Label>
              <Input
                id="whatsapp"
                value={settings.whatsappNumber}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                placeholder="+5511999999999"
              />
            </div>

            <div>
              <Label htmlFor="mapUrl">URL do Google Maps (embed)</Label>
              <Textarea
                id="mapUrl"
                value={settings.mapUrl}
                onChange={(e) => setSettings({ ...settings, mapUrl: e.target.value })}
                placeholder="Cole aqui a URL de incorporação do Google Maps"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Redes Sociais</CardTitle>
            <CardDescription>Configure os links das redes sociais</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                value={settings.socialMedia.instagram}
                onChange={(e) => setSettings({ 
                  ...settings, 
                  socialMedia: { ...settings.socialMedia, instagram: e.target.value }
                })}
                placeholder="https://instagram.com/seuperfil"
              />
            </div>

            <div>
              <Label htmlFor="facebook">Facebook</Label>
              <Input
                id="facebook"
                value={settings.socialMedia.facebook}
                onChange={(e) => setSettings({ 
                  ...settings, 
                  socialMedia: { ...settings.socialMedia, facebook: e.target.value }
                })}
                placeholder="https://facebook.com/suapagina"
              />
            </div>

            <div>
              <Label htmlFor="whatsappSocial">WhatsApp (link)</Label>
              <Input
                id="whatsappSocial"
                value={settings.socialMedia.whatsapp}
                onChange={(e) => setSettings({ 
                  ...settings, 
                  socialMedia: { ...settings.socialMedia, whatsapp: e.target.value }
                })}
                placeholder="https://wa.me/5511999999999"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" size="lg">
            Salvar Configurações
          </Button>
        </div>
      </form>
    </div>
  );
};
