
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, TrendingUp, Target } from 'lucide-react';

export const SEOTools = () => {
  const [metaTags, setMetaTags] = useState({
    title: 'Conquista Imob Hub - Sua Imobiliária Digital',
    description: 'Encontre o imóvel dos seus sonhos com a Conquista Imob Hub. Casas, apartamentos e terrenos nas melhores localizações.',
    keywords: 'imóveis, casas, apartamentos, terrenos, comprar, alugar, imobiliária',
  });

  const [aiSuggestion, setAiSuggestion] = useState('');

  const generateAISuggestion = () => {
    // Simulação de IA
    const suggestions = [
      'Considere adicionar palavras-chave como "imóveis de luxo", "financiamento imobiliário" e "plantas de imóveis" para melhorar o SEO.',
      'Para aumentar conversões, inclua termos como "documentação gratuita", "visita virtual" e "financiamento facilitado".',
      'Adicione localização específica: "imóveis em São Paulo", "casas na zona sul" podem melhorar buscas locais.',
      'Use call-to-actions como "agende sua visita", "simule seu financiamento" para aumentar engajamento.',
    ];
    
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    setAiSuggestion(randomSuggestion);
  };

  // Dados simulados de performance
  const performanceData = [
    { metric: 'Visitantes Únicos', value: '2.847', change: '+12%' },
    { metric: 'Visualizações de Páginas', value: '8.234', change: '+8%' },
    { metric: 'Taxa de Conversão', value: '3.2%', change: '+15%' },
    { metric: 'Tempo na Página', value: '4m 23s', change: '+7%' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">SEO & Ferramentas de IA</h2>
        <p className="text-gray-600">Otimize seu site e acompanhe a performance</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Meta Tags SEO</CardTitle>
            <CardDescription>Configure as meta tags principais do site</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Título da Página</Label>
              <Input
                id="title"
                value={metaTags.title}
                onChange={(e) => setMetaTags({ ...metaTags, title: e.target.value })}
              />
              <p className="text-xs text-gray-500 mt-1">
                {metaTags.title.length}/60 caracteres
              </p>
            </div>

            <div>
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={metaTags.description}
                onChange={(e) => setMetaTags({ ...metaTags, description: e.target.value })}
                rows={3}
              />
              <p className="text-xs text-gray-500 mt-1">
                {metaTags.description.length}/160 caracteres
              </p>
            </div>

            <div>
              <Label htmlFor="keywords">Palavras-chave</Label>
              <Input
                id="keywords"
                value={metaTags.keywords}
                onChange={(e) => setMetaTags({ ...metaTags, keywords: e.target.value })}
                placeholder="Separe por vírgulas"
              />
            </div>

            <Button className="w-full">Salvar Meta Tags</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="w-5 h-5 mr-2" />
              Sugestões de IA
            </CardTitle>
            <CardDescription>Otimizações sugeridas por inteligência artificial</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={generateAISuggestion} className="w-full">
              Gerar Sugestão
            </Button>
            
            {aiSuggestion && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">{aiSuggestion}</p>
              </div>
            )}

            <div className="space-y-2">
              <h4 className="font-medium">Recomendações Ativas:</h4>
              <Badge variant="outline" className="mr-2">Otimizar imagens</Badge>
              <Badge variant="outline" className="mr-2">Melhorar velocidade</Badge>
              <Badge variant="outline">Adicionar schema markup</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Performance do Site
          </CardTitle>
          <CardDescription>Métricas simuladas dos últimos 30 dias</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {performanceData.map((item, index) => (
              <div key={index} className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold">{item.value}</div>
                <div className="text-sm text-gray-600">{item.metric}</div>
                <div className="text-xs text-green-600 mt-1">{item.change}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Campanhas Publicitárias
          </CardTitle>
          <CardDescription>Status das campanhas (dados simulados)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 border rounded">
              <div>
                <div className="font-medium">Google Ads - Imóveis São Paulo</div>
                <div className="text-sm text-gray-600">CTR: 2.8% | CPC: R$ 1,45</div>
              </div>
              <Badge className="bg-green-100 text-green-800">Ativa</Badge>
            </div>
            
            <div className="flex justify-between items-center p-3 border rounded">
              <div>
                <div className="font-medium">Facebook Ads - Apartamentos</div>
                <div className="text-sm text-gray-600">CTR: 3.2% | CPC: R$ 0,87</div>
              </div>
              <Badge className="bg-green-100 text-green-800">Ativa</Badge>
            </div>
            
            <div className="flex justify-between items-center p-3 border rounded">
              <div>
                <div className="font-medium">Instagram - Casas de Luxo</div>
                <div className="text-sm text-gray-600">CTR: 4.1% | CPC: R$ 2,12</div>
              </div>
              <Badge variant="secondary">Pausada</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
