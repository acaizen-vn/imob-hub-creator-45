
import { useState } from 'react';
import { TrendingUp, Users, Eye, MessageSquare, BarChart3, Target, Zap, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const MarketingTools = () => {
  const [campaigns] = useState([
    { id: 1, name: 'Campanha Black Friday', status: 'active', clicks: 1245, conversions: 23, budget: 5000 },
    { id: 2, name: 'Promoção Apartamentos', status: 'paused', clicks: 892, conversions: 15, budget: 3000 },
    { id: 3, name: 'Casas Família', status: 'active', clicks: 2156, conversions: 42, budget: 8000 },
  ]);

  const [analytics] = useState({
    visitors: 15420,
    leads: 342,
    conversions: 89,
    revenue: 2450000
  });

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Ferramentas de Marketing</h2>
        <p className="text-gray-600">Analise performance e gerencie suas campanhas</p>
      </div>

      <Tabs defaultValue="analytics" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="campaigns">Campanhas</TabsTrigger>
          <TabsTrigger value="automation">Automação</TabsTrigger>
          <TabsTrigger value="insights">Insights IA</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Visitantes</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.visitors.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+12%</span> em relação ao mês anterior
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Leads</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.leads}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+8%</span> em relação ao mês anterior
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversões</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.conversions}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+15%</span> em relação ao mês anterior
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Receita</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  R$ {(analytics.revenue / 1000000).toFixed(1)}M
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+22%</span> em relação ao mês anterior
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance por Canal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Google Ads</span>
                  <span>45%</span>
                </div>
                <Progress value={45} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Facebook/Instagram</span>
                  <span>32%</span>
                </div>
                <Progress value={32} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>WhatsApp</span>
                  <span>18%</span>
                </div>
                <Progress value={18} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Email Marketing</span>
                  <span>5%</span>
                </div>
                <Progress value={5} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Campanhas Ativas</h3>
            <Button>
              <Target className="h-4 w-4 mr-2" />
              Nova Campanha
            </Button>
          </div>

          <div className="grid gap-4">
            {campaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-semibold">{campaign.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{campaign.clicks} cliques</span>
                        <span>{campaign.conversions} conversões</span>
                        <span>R$ {campaign.budget.toLocaleString()} orçamento</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                        {campaign.status === 'active' ? 'Ativa' : 'Pausada'}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  Automações Ativas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded">
                  <div>
                    <h4 className="font-medium">Email de Boas-vindas</h4>
                    <p className="text-sm text-muted-foreground">Enviado automaticamente para novos leads</p>
                  </div>
                  <Badge>Ativa</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded">
                  <div>
                    <h4 className="font-medium">Follow-up WhatsApp</h4>
                    <p className="text-sm text-muted-foreground">Mensagem automática após 24h sem resposta</p>
                  </div>
                  <Badge>Ativa</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded">
                  <div>
                    <h4 className="font-medium">Remarketing Facebook</h4>
                    <p className="text-sm text-muted-foreground">Anúncios para visitantes que não converteram</p>
                  </div>
                  <Badge variant="secondary">Pausada</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Insights com IA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded">
                <h4 className="font-medium text-blue-900">Oportunidade Identificada</h4>
                <p className="text-sm text-blue-800 mt-1">
                  Imóveis de 2 quartos em Volta Redonda têm 35% mais interesse. 
                  Considere aumentar o investimento nesta categoria.
                </p>
              </div>
              <div className="p-4 bg-green-50 border border-green-200 rounded">
                <h4 className="font-medium text-green-900">Tendência Positiva</h4>
                <p className="text-sm text-green-800 mt-1">
                  Buscas por "apartamento para alugar" aumentaram 28% esta semana. 
                  Destaque mais imóveis para locação.
                </p>
              </div>
              <div className="p-4 bg-amber-50 border border-amber-200 rounded">
                <h4 className="font-medium text-amber-900">Recomendação de Otimização</h4>
                <p className="text-sm text-amber-800 mt-1">
                  Campanhas no horário 19h-21h têm melhor performance. 
                  Ajuste os horários para maximizar conversões.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
