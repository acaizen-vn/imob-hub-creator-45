
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
    <div className="text-white">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white drop-shadow-lg">Configurações do Site</h2>
        <p className="text-slate-200">Gerencie as configurações gerais do seu site</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white">Informações Básicas</CardTitle>
            <CardDescription className="text-slate-200">Configure as informações principais do site</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="siteName" className="text-white font-medium">Nome da Imobiliária</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="bg-white/15 border-white/30 text-white placeholder:text-slate-300 hover:bg-white/25 transition-colors duration-300"
              />
            </div>

            <div>
              <Label htmlFor="siteDescription" className="text-white font-medium">Descrição do Site</Label>
              <Textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                rows={3}
                className="bg-white/15 border-white/30 text-white placeholder:text-slate-300 hover:bg-white/25 transition-colors duration-300"
              />
            </div>

            <div>
              <Label htmlFor="logo" className="text-white font-medium">Logo da Empresa</Label>
              <Input
                id="logo"
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="bg-white/15 border-white/30 text-white file:bg-blue-600 file:text-white file:border-0 file:rounded-md file:px-3 file:py-1 hover:bg-white/25 transition-colors duration-300"
              />
              {settings.logo && (
                <div className="mt-2 p-2 bg-white/10 rounded-lg">
                  <img src={settings.logo} alt="Logo" className="w-32 h-32 object-contain" />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white">Tipos de Imóveis</CardTitle>
            <CardDescription className="text-slate-200">Tipos disponíveis no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
              <div className="p-2 bg-blue-600/30 text-white rounded border border-blue-400/30">Casa</div>
              <div className="p-2 bg-blue-600/30 text-white rounded border border-blue-400/30">Apartamento</div>
              <div className="p-2 bg-blue-600/30 text-white rounded border border-blue-400/30">Apartamento Garden</div>
              <div className="p-2 bg-blue-600/30 text-white rounded border border-blue-400/30">Casa de Condomínio</div>
              <div className="p-2 bg-blue-600/30 text-white rounded border border-blue-400/30">Studio</div>
              <div className="p-2 bg-blue-600/30 text-white rounded border border-blue-400/30">Cobertura</div>
              <div className="p-2 bg-blue-600/30 text-white rounded border border-blue-400/30">Terreno/Lote</div>
            </div>
            <p className="text-sm text-slate-200 mt-2">
              Tipos configurados para venda de imóveis
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white">Contato</CardTitle>
            <CardDescription className="text-slate-200">Configure os dados de contato</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="whatsapp" className="text-white font-medium">WhatsApp (com DDD)</Label>
              <Input
                id="whatsapp"
                value={settings.whatsappNumber}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                placeholder="+5511999999999"
                className="bg-white/15 border-white/30 text-white placeholder:text-slate-300 hover:bg-white/25 transition-colors duration-300"
              />
            </div>

            <div>
              <Label htmlFor="mapUrl" className="text-white font-medium">URL do Google Maps (embed)</Label>
              <Textarea
                id="mapUrl"
                value={settings.mapUrl}
                onChange={(e) => setSettings({ ...settings, mapUrl: e.target.value })}
                placeholder="Cole aqui a URL de incorporação do Google Maps"
                rows={3}
                className="bg-white/15 border-white/30 text-white placeholder:text-slate-300 hover:bg-white/25 transition-colors duration-300"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white">Redes Sociais</CardTitle>
            <CardDescription className="text-slate-200">Configure os links das redes sociais</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="instagram" className="text-white font-medium">Instagram</Label>
              <Input
                id="instagram"
                value={settings.socialMedia.instagram}
                onChange={(e) => setSettings({ 
                  ...settings, 
                  socialMedia: { ...settings.socialMedia, instagram: e.target.value }
                })}
                placeholder="https://instagram.com/seuperfil"
                className="bg-white/15 border-white/30 text-white placeholder:text-slate-300 hover:bg-white/25 transition-colors duration-300"
              />
            </div>

            <div>
              <Label htmlFor="facebook" className="text-white font-medium">Facebook</Label>
              <Input
                id="facebook"
                value={settings.socialMedia.facebook}
                onChange={(e) => setSettings({ 
                  ...settings, 
                  socialMedia: { ...settings.socialMedia, facebook: e.target.value }
                })}
                placeholder="https://facebook.com/suapagina"
                className="bg-white/15 border-white/30 text-white placeholder:text-slate-300 hover:bg-white/25 transition-colors duration-300"
              />
            </div>

            <div>
              <Label htmlFor="whatsappSocial" className="text-white font-medium">WhatsApp (link)</Label>
              <Input
                id="whatsappSocial"
                value={settings.socialMedia.whatsapp}
                onChange={(e) => setSettings({ 
                  ...settings, 
                  socialMedia: { ...settings.socialMedia, whatsapp: e.target.value }
                })}
                placeholder="https://wa.me/5511999999999"
                className="bg-white/15 border-white/30 text-white placeholder:text-slate-300 hover:bg-white/25 transition-colors duration-300"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button 
            type="submit" 
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-slate-600 hover:from-blue-700 hover:to-slate-700 text-white font-semibold shadow-lg border border-blue-400/30 hover:shadow-xl transition-all duration-300"
          >
            Salvar Configurações
          </Button>
        </div>
      </form>
    </div>
  );
};
