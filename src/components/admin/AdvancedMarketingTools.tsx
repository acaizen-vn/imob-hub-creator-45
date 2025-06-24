
import { useState } from 'react';
import { TrendingUp, Users, Eye, MessageSquare, BarChart3, Target, Zap, Calendar, Settings, Bot, Globe, Search, Mail, Share2, PieChart, DollarSign, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const AdvancedMarketingTools = () => {
  const [isConnected, setIsConnected] = useState({
    googleAds: false,
    googleAnalytics: false,
    facebookAds: false,
    emailMarketing: false,
    whatsappBusiness: true,
  });

  const [automationSettings, setAutomationSettings] = useState({
    leadCapture: true,
    emailSequence: true,
    retargeting: false,
    chatbot: true,
    seoOptimization: true,
  });

  const connectService = (service: string) => {
    setIsConnected(prev => ({ ...prev, [service]: !prev[service as keyof typeof prev] }));
  };

  const analytics = {
    visitors: 15420,
    leads: 342,
    conversions: 89,
    revenue: 2450000,
    conversionRate: 4.2,
    avgTimeOnSite: '5m 32s',
    bounceRate: 35.7,
    organicTraffic: 68.3
  };

  const campaigns = [
    { 
      id: 1, 
      name: 'Google Ads - Imóveis Luxo VR', 
      platform: 'Google Ads',
      status: 'active', 
      clicks: 1245, 
      conversions: 23, 
      cost: 850.50,
      cpc: 0.68,
      roas: 4.2
    },
    { 
      id: 2, 
      name: 'Facebook - Apartamentos BM', 
      platform: 'Facebook',
      status: 'active', 
      clicks: 892, 
      conversions: 15, 
      cost: 420.30,
      cpc: 0.47,
      roas: 3.8
    },
    { 
      id: 3, 
      name: 'Instagram - Casas Família', 
      platform: 'Instagram',
      status: 'paused', 
      clicks: 2156, 
      conversions: 42, 
      cost: 1230.75,
      cpc: 0.57,
      roas: 5.1
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Marketing Avançado & Automação</h2>
        <p className="text-gray-600">Ferramentas completas para gestão de marketing digital</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="integrations">Integrações</TabsTrigger>
          <TabsTrigger value="campaigns">Campanhas</TabsTrigger>
          <TabsTrigger value="automation">Automação</TabsTrigger>
          <TabsTrigger value="seo">SEO & Analytics</TabsTrigger>
          <TabsTrigger value="crm">CRM & WhatsApp</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="luxury-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Visitantes</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.visitors.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+12%</span> vs mês anterior
                </p>
              </CardContent>
            </Card>

            <Card className="luxury-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Leads Gerados</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.leads}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+18%</span> vs mês anterior
                </p>
              </CardContent>
            </Card>

            <Card className="luxury-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversões</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.conversions}</div>
                <p className="text-xs text-muted-foreground">
                  Taxa: <span className="text-green-600">{analytics.conversionRate}%</span>
                </p>
              </CardContent>
            </Card>

            <Card className="luxury-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Receita</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  R$ {(analytics.revenue / 1000000).toFixed(1)}M
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+22%</span> vs mês anterior
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="luxury-shadow">
              <CardHeader>
                <CardTitle>Performance por Canal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Google Ads</span>
                    <span>45% • R$ 1.2M</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Facebook/Instagram</span>
                    <span>32% • R$ 856K</span>
                  </div>
                  <Progress value={32} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>WhatsApp Business</span>
                    <span>18% • R$ 485K</span>
                  </div>
                  <Progress value={18} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Email Marketing</span>
                    <span>5% • R$ 134K</span>
                  </div>
                  <Progress value={5} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="luxury-shadow">
              <CardHeader>
                <CardTitle>Métricas de Qualidade</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Tempo médio no site</span>
                  <Badge variant="outline">{analytics.avgTimeOnSite}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Taxa de rejeição</span>
                  <Badge variant="outline">{analytics.bounceRate}%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Tráfego orgânico</span>
                  <Badge variant="outline">{analytics.organicTraffic}%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Score de SEO</span>
                  <Badge className="bg-green-100 text-green-800">Excelente</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="luxury-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Integrações Google
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <Search className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium">Google Ads</p>
                      <p className="text-sm text-muted-foreground">Campanhas publicitárias</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={isConnected.googleAds ? "default" : "secondary"}>
                      {isConnected.googleAds ? "Conectado" : "Desconectado"}
                    </Badge>
                    <Button 
                      size="sm" 
                      onClick={() => connectService('googleAds')}
                      variant={isConnected.googleAds ? "destructive" : "default"}
                    >
                      {isConnected.googleAds ? "Desconectar" : "Conectar"}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <BarChart3 className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Google Analytics</p>
                      <p className="text-sm text-muted-foreground">Análise de tráfego</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={isConnected.googleAnalytics ? "default" : "secondary"}>
                      {isConnected.googleAnalytics ? "Conectado" : "Desconectado"}
                    </Badge>
                    <Button 
                      size="sm" 
                      onClick={() => connectService('googleAnalytics')}
                      variant={isConnected.googleAnalytics ? "destructive" : "default"}
                    >
                      {isConnected.googleAnalytics ? "Desconectar" : "Conectar"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="luxury-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Share2 className="h-5 w-5 mr-2" />
                  Redes Sociais & Email
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <MessageSquare className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Facebook Ads</p>
                      <p className="text-sm text-muted-foreground">Facebook e Instagram</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={isConnected.facebookAds ? "default" : "secondary"}>
                      {isConnected.facebookAds ? "Conectado" : "Desconectado"}
                    </Badge>
                    <Button 
                      size="sm" 
                      onClick={() => connectService('facebookAds')}
                      variant={isConnected.facebookAds ? "destructive" : "default"}
                    >
                      {isConnected.facebookAds ? "Desconectar" : "Conectar"}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Mail className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Email Marketing</p>
                      <p className="text-sm text-muted-foreground">Mailchimp/SendGrid</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={isConnected.emailMarketing ? "default" : "secondary"}>
                      {isConnected.emailMarketing ? "Conectado" : "Desconectado"}
                    </Badge>
                    <Button 
                      size="sm" 
                      onClick={() => connectService('emailMarketing')}
                      variant={isConnected.emailMarketing ? "destructive" : "default"}
                    >
                      {isConnected.emailMarketing ? "Desconectar" : "Conectar"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="luxury-shadow">
            <CardHeader>
              <CardTitle>Configurar Integrações</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="google-ads-id">Google Ads Customer ID</Label>
                  <Input id="google-ads-id" placeholder="123-456-7890" />
                </div>
                <div>
                  <Label htmlFor="google-analytics-id">Google Analytics ID</Label>
                  <Input id="google-analytics-id" placeholder="G-XXXXXXXXXX" />
                </div>
                <div>
                  <Label htmlFor="facebook-pixel">Facebook Pixel ID</Label>
                  <Input id="facebook-pixel" placeholder="123456789012345" />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="mailchimp-api">Mailchimp API Key</Label>
                  <Input id="mailchimp-api" placeholder="xxxxxxxx-us1" type="password" />
                </div>
                <div>
                  <Label htmlFor="whatsapp-token">WhatsApp Business Token</Label>
                  <Input id="whatsapp-token" placeholder="EAAG..." type="password" />
                </div>
                <Button className="w-full">Salvar Configurações</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Gestão de Campanhas</h3>
            <Button>
              <Target className="h-4 w-4 mr-2" />
              Nova Campanha
            </Button>
          </div>

          <div className="grid gap-4">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="luxury-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-semibold">{campaign.name}</h4>
                        <Badge variant="outline">{campaign.platform}</Badge>
                        <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                          {campaign.status === 'active' ? 'Ativa' : 'Pausada'}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-5 gap-4 text-sm text-muted-foreground">
                        <div>
                          <span className="font-medium text-foreground">{campaign.clicks}</span>
                          <p>Cliques</p>
                        </div>
                        <div>
                          <span className="font-medium text-foreground">{campaign.conversions}</span>
                          <p>Conversões</p>
                        </div>
                        <div>
                          <span className="font-medium text-foreground">R$ {campaign.cost.toFixed(2)}</span>
                          <p>Investimento</p>
                        </div>
                        <div>
                          <span className="font-medium text-foreground">R$ {campaign.cpc.toFixed(2)}</span>
                          <p>CPC</p>
                        </div>
                        <div>
                          <span className="font-medium text-foreground">{campaign.roas}x</span>
                          <p>ROAS</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                      <Button variant="outline" size="sm">
                        Relatório
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          <Card className="luxury-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Configurações de Automação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Captura automática de leads</Label>
                      <p className="text-sm text-muted-foreground">Integra formulários com CRM</p>
                    </div>
                    <Switch 
                      checked={automationSettings.leadCapture}
                      onCheckedChange={(checked) => 
                        setAutomationSettings(prev => ({ ...prev, leadCapture: checked }))
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Sequência de emails</Label>
                      <p className="text-sm text-muted-foreground">Email automático para novos leads</p>
                    </div>
                    <Switch 
                      checked={automationSettings.emailSequence}
                      onCheckedChange={(checked) => 
                        setAutomationSettings(prev => ({ ...prev, emailSequence: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Remarketing automático</Label>
                      <p className="text-sm text-muted-foreground">Anúncios para visitantes que não converteram</p>
                    </div>
                    <Switch 
                      checked={automationSettings.retargeting}
                      onCheckedChange={(checked) => 
                        setAutomationSettings(prev => ({ ...prev, retargeting: checked }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Chatbot WhatsApp</Label>
                      <p className="text-sm text-muted-foreground">Respostas automáticas</p>
                    </div>
                    <Switch 
                      checked={automationSettings.chatbot}
                      onCheckedChange={(checked) => 
                        setAutomationSettings(prev => ({ ...prev, chatbot: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Otimização de SEO</Label>
                      <p className="text-sm text-muted-foreground">Meta tags automáticas</p>
                    </div>
                    <Switch 
                      checked={automationSettings.seoOptimization}
                      onCheckedChange={(checked) => 
                        setAutomationSettings(prev => ({ ...prev, seoOptimization: checked }))
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="luxury-shadow">
            <CardHeader>
              <CardTitle>Fluxos de Automação Ativos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Mail className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Sequência de Boas-vindas</h4>
                    <p className="text-sm text-muted-foreground">3 emails enviados automaticamente</p>
                  </div>
                </div>
                <Badge>267 leads processados</Badge>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Follow-up WhatsApp</h4>
                    <p className="text-sm text-muted-foreground">Mensagem após 24h sem resposta</p>
                  </div>
                </div>
                <Badge>89 mensagens enviadas</Badge>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Target className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Remarketing Facebook</h4>
                    <p className="text-sm text-muted-foreground">Anúncios para visitantes sem conversão</p>
                  </div>
                </div>
                <Badge variant="secondary">Pausado</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="luxury-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  SEO Automático
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-green-900 dark:text-green-100">Score SEO Geral</h4>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">92/100</Badge>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Meta descriptions otimizadas</span>
                    <Badge variant="outline">Auto</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Schema markup imóveis</span>
                    <Badge variant="outline">Ativo</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Sitemap XML atualizado</span>
                    <Badge variant="outline">Auto</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Otimização de imagens</span>
                    <Badge variant="outline">Ativo</Badge>
                  </div>
                </div>

                <Button className="w-full">
                  Executar Auditoria SEO
                </Button>
              </CardContent>
            </Card>

            <Card className="luxury-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Analytics Avançado
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 border rounded">
                    <div className="text-2xl font-bold">156</div>
                    <div className="text-sm text-muted-foreground">Palavras-chave rankiando</div>
                  </div>
                  <div className="text-center p-3 border rounded">
                    <div className="text-2xl font-bold">2.8K</div>
                    <div className="text-sm text-muted-foreground">Backlinks ativos</div>
                  </div>
                  <div className="text-center p-3 border rounded">
                    <div className="text-2xl font-bold">94</div>
                    <div className="text-sm text-muted-foreground">Page Speed Score</div>
                  </div>
                  <div className="text-center p-3 border rounded">
                    <div className="text-2xl font-bold">4.8</div>
                    <div className="text-sm text-muted-foreground">Avaliação Google</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Top Palavras-chave</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>imóveis volta redonda</span>
                      <Badge variant="outline">Posição 3</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>casas barra mansa</span>
                      <Badge variant="outline">Posição 1</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>apartamentos para alugar</span>
                      <Badge variant="outline">Posição 7</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="crm" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="luxury-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  WhatsApp Business
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">342</div>
                    <div className="text-sm text-green-600">Conversas ativas</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">89%</div>
                    <div className="text-sm text-blue-600">Taxa de resposta</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label>Mensagem automática de boas-vindas</Label>
                    <Textarea 
                      placeholder="Olá! Obrigado pelo interesse. Como posso ajudá-lo?"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Horário de atendimento automático</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o horário" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="24h">24 horas</SelectItem>
                        <SelectItem value="business">Horário comercial</SelectItem>
                        <SelectItem value="custom">Personalizado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="luxury-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  CRM Integrado
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 border rounded-lg">
                    <div className="text-lg font-bold">458</div>
                    <div className="text-xs text-muted-foreground">Leads totais</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="text-lg font-bold">89</div>
                    <div className="text-xs text-muted-foreground">Quentes</div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="text-lg font-bold">23</div>
                    <div className="text-xs text-muted-foreground">Fechados</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Leads Recentes</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <p className="font-medium text-sm">Maria Silva</p>
                        <p className="text-xs text-muted-foreground">Interessada em apartamento</p>
                      </div>
                      <Badge variant="outline">WhatsApp</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <p className="font-medium text-sm">João Santos</p>
                        <p className="text-xs text-muted-foreground">Busca casa até R$ 300k</p>
                      </div>
                      <Badge variant="outline">Site</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="luxury-shadow">
            <CardHeader>
              <CardTitle>Configurações do CRM</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label>Pipeline de vendas</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o pipeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Padrão (5 etapas)</SelectItem>
                      <SelectItem value="simple">Simples (3 etapas)</SelectItem>
                      <SelectItem value="custom">Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="auto-assign" />
                  <Label htmlFor="auto-assign">Distribuição automática de leads</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="follow-up" />
                  <Label htmlFor="follow-up">Follow-up automático após 24h</Label>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label>Integração com WhatsApp Business</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Switch id="whatsapp-integration" defaultChecked />
                    <Label htmlFor="whatsapp-integration">Ativo</Label>
                  </div>
                </div>
                <div>
                  <Label>Webhook para integrações</Label>
                  <Input placeholder="https://api.exemplo.com/webhook" />
                </div>
                <Button className="w-full">Salvar Configurações</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
