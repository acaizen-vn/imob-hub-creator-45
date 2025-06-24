
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Bed, Bath, Car, Home, Building, Store, TreePine, Share2, Heart, Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { propertyService, settingsService } from '@/utils/storage';
import { Property, Settings } from '@/types';
import { useToast } from '@/hooks/use-toast';

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      const foundProperty = propertyService.getAll().find(p => p.id === id);
      setProperty(foundProperty || null);
    }
    setSettings(settingsService.get());
  }, [id]);

  const handleContact = () => {
    if (!contactForm.name || !contactForm.email || !contactForm.phone) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha nome, email e telefone",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve"
    });
    setContactForm({ name: '', email: '', phone: '', message: '' });
    setIsContactOpen(false);
  };

  const handleWhatsApp = () => {
    if (!property || !settings) return;
    const message = `Olá! Tenho interesse no imóvel: ${property.title} - ${formatPrice(property.price)}`;
    const url = `https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const getTypeIcon = (type: Property['type']) => {
    switch (type) {
      case 'house': return <Home className="h-5 w-5" />;
      case 'apartment': return <Building className="h-5 w-5" />;
      case 'commercial': return <Store className="h-5 w-5" />;
      case 'land': return <TreePine className="h-5 w-5" />;
      default: return <Home className="h-5 w-5" />;
    }
  };

  const getTypeLabel = (type: Property['type']) => {
    switch (type) {
      case 'house': return 'Casa';
      case 'apartment': return 'Apartamento';
      case 'commercial': return 'Comercial';
      case 'land': return 'Terreno';
      default: return 'Imóvel';
    }
  };

  const getPurposeLabel = (purpose: Property['purpose']) => {
    switch (purpose) {
      case 'buy': return 'Venda';
      case 'rent': return 'Aluguel';
      case 'season': return 'Temporada';
      default: return '';
    }
  };

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Imóvel não encontrado</h1>
          <Button onClick={() => navigate('/')}>Voltar ao início</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <Button
          variant="outline"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Galeria de Imagens */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative">
              <img
                src={property.images[selectedImage] || '/placeholder.svg'}
                alt={property.title}
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge className="bg-primary text-white">
                  {getPurposeLabel(property.purpose)}
                </Badge>
                {property.featured && (
                  <Badge className="bg-yellow-500 text-white">
                    Destaque
                  </Badge>
                )}
              </div>
            </div>

            {property.images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {property.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${property.title} ${index + 1}`}
                    className={`w-full h-20 object-cover rounded cursor-pointer transition-opacity ${
                      selectedImage === index ? 'opacity-100 ring-2 ring-primary' : 'opacity-70'
                    }`}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Informações do Imóvel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(property.type)}
                    <Badge variant="outline">
                      {getTypeLabel(property.type)}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-2xl">{property.title}</CardTitle>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {property.address}, {property.city}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-primary">
                  {formatPrice(property.price)}
                  {property.purpose !== 'buy' && (
                    <span className="text-lg text-muted-foreground">/mês</span>
                  )}
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{property.area}</div>
                    <div className="text-sm text-muted-foreground">m²</div>
                  </div>
                  {property.bedrooms && (
                    <div className="text-center">
                      <div className="text-2xl font-bold">{property.bedrooms}</div>
                      <div className="text-sm text-muted-foreground">Quartos</div>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="text-center">
                      <div className="text-2xl font-bold">{property.bathrooms}</div>
                      <div className="text-sm text-muted-foreground">Banheiros</div>
                    </div>
                  )}
                  {property.garage && (
                    <div className="text-center">
                      <div className="text-2xl font-bold">{property.garage}</div>
                      <div className="text-sm text-muted-foreground">Garagem</div>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="space-y-3">
                  <Button onClick={handleWhatsApp} className="w-full" size="lg">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    WhatsApp
                  </Button>

                  <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full" size="lg">
                        <Phone className="h-5 w-5 mr-2" />
                        Tenho Interesse
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Entre em Contato</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Nome *</Label>
                          <Input
                            id="name"
                            value={contactForm.name}
                            onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={contactForm.email}
                            onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Telefone *</Label>
                          <Input
                            id="phone"
                            value={contactForm.phone}
                            onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="message">Mensagem</Label>
                          <Textarea
                            id="message"
                            value={contactForm.message}
                            onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                            placeholder="Gostaria de mais informações sobre este imóvel..."
                          />
                        </div>
                        <Button onClick={handleContact} className="w-full">
                          Enviar Mensagem
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Descrição */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Descrição</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {property.description}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PropertyDetail;
