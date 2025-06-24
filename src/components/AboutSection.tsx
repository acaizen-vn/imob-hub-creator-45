
import { useEffect, useState } from 'react';
import { Building, Shield, Award, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { settingsService } from '@/utils/storage';
import { Settings } from '@/types';

export const AboutSection = () => {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    setSettings(settingsService.get());
  }, []);

  if (!settings?.aboutUs) return null;

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Sobre a <span className="text-primary">Conquista Imóveis</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {settings.creci} - Sua parceira de confiança no mercado imobiliário
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="prose prose-lg">
              {settings.aboutUs.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary">12</div>
                <div className="text-sm text-muted-foreground">Anos de experiência</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary">750+</div>
                <div className="text-sm text-muted-foreground">Famílias atendidas</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary">CAIXA</div>
                <div className="text-sm text-muted-foreground">Correspondente autorizado</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary">{settings.creci}</div>
                <div className="text-sm text-muted-foreground">Registro CRECI</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
