
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Property, PropertyDocument, NearbyPlace, KeyHolder } from '@/types';
import { cityService } from '@/utils/storage';
import { MapPin, Upload, X, Plus, Key, Calendar, FileText, Camera, Video, Map } from 'lucide-react';

const propertySchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  price: z.number().min(0, 'Preço deve ser maior que zero'),
  type: z.enum(['house', 'apartment', 'commercial', 'land', 'penthouse', 'studio', 'duplex']),
  purpose: z.enum(['buy', 'rent', 'season']),
  city: z.string().min(1, 'Cidade é obrigatória'),
  neighborhood: z.string().optional(),
  address: z.string().min(1, 'Endereço é obrigatório'),
  zipCode: z.string().optional(),
  area: z.number().min(0, 'Área deve ser maior que zero'),
  builtArea: z.number().optional(),
  totalArea: z.number().optional(),
  bedrooms: z.number().optional(),
  bathrooms: z.number().optional(),
  suites: z.number().optional(),
  garage: z.number().optional(),
  balconies: z.number().optional(),
  floor: z.number().optional(),
  floors: z.number().optional(),
  elevators: z.number().optional(),
  orientation: z.enum(['north', 'south', 'east', 'west', 'northeast', 'northwest', 'southeast', 'southwest']).optional(),
  conditions: z.enum(['new', 'used', 'under_construction', 'renovated']).optional(),
  virtualTour: z.string().url().optional().or(z.literal('')),
  videoUrl: z.string().url().optional().or(z.literal('')),
  featured: z.boolean(),
  status: z.enum(['available', 'reserved', 'sold', 'rented']),
  priority: z.enum(['low', 'medium', 'high']),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

interface AdvancedPropertyFormProps {
  property: Property | null;
  onSave: (property: Omit<Property, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

export const AdvancedPropertyForm = ({ property, onSave, onCancel }: AdvancedPropertyFormProps) => {
  const [cities, setCities] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>(['']);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [documents, setDocuments] = useState<PropertyDocument[]>([]);
  const [nearbyPlaces, setNearbyPlaces] = useState<NearbyPlace[]>([]);
  const [keyHolders, setKeyHolders] = useState<KeyHolder[]>([]);

  const form = useForm<z.infer<typeof propertySchema>>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      type: 'house',
      purpose: 'buy',
      city: '',
      neighborhood: '',
      address: '',
      zipCode: '',
      area: 0,
      builtArea: 0,
      totalArea: 0,
      bedrooms: 0,
      bathrooms: 0,
      suites: 0,
      garage: 0,
      balconies: 0,
      floor: 0,
      floors: 0,
      elevators: 0,
      virtualTour: '',
      videoUrl: '',
      featured: false,
      status: 'available',
      priority: 'medium',
      seoTitle: '',
      seoDescription: '',
    },
  });

  const commonAmenities = [
    'Piscina', 'Academia', 'Salão de Festas', 'Playground', 'Churrasqueira',
    'Portaria 24h', 'Elevador', 'Garagem Coberta', 'Jardim', 'Varanda',
    'Sacada', 'Área de Serviço', 'Closet', 'Escritório', 'Despensa',
    'Ar Condicionado', 'Aquecimento', 'Lareira', 'Hidromassagem', 'Sauna'
  ];

  useEffect(() => {
    const allCities = cityService.getAll();
    setCities(allCities.map(city => city.name));
  }, []);

  useEffect(() => {
    if (property) {
      form.reset({
        title: property.title,
        description: property.description,
        price: property.price,
        type: property.type,
        purpose: property.purpose,
        city: property.city,
        neighborhood: property.neighborhood || '',
        address: property.address,
        zipCode: property.zipCode || '',
        area: property.area,
        builtArea: property.builtArea || 0,
        totalArea: property.totalArea || 0,
        bedrooms: property.bedrooms || 0,
        bathrooms: property.bathrooms || 0,
        suites: property.suites || 0,
        garage: property.garage || 0,
        balconies: property.balconies || 0,
        floor: property.floor || 0,
        floors: property.floors || 0,
        elevators: property.elevators || 0,
        orientation: property.orientation,
        conditions: property.conditions,
        virtualTour: property.virtualTour || '',
        videoUrl: property.videoUrl || '',
        featured: property.featured,
        status: property.status,
        priority: property.priority,
        seoTitle: property.seoTitle || '',
        seoDescription: property.seoDescription || '',
      });
      
      setImages(property.images.length > 0 ? property.images : ['']);
      setAmenities(property.amenities || []);
      setTags(property.tags || []);
      setDocuments(property.documents || []);
      setNearbyPlaces(property.nearbyPlaces || []);
      setKeyHolders(property.keyHolders || []);
    }
  }, [property, form]);

  const handleSubmit = (data: z.infer<typeof propertySchema>) => {
    const propertyData = {
      ...data,
      images: images.filter(img => img.trim() !== ''),
      amenities,
      tags,
      documents,
      nearbyPlaces,
      keyHolders,
    };
    onSave(propertyData);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImages = [...images];
        newImages[index] = event.target?.result as string;
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const addImageField = () => {
    setImages([...images, '']);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages.length > 0 ? newImages : ['']);
  };

  const addAmenity = (amenity: string) => {
    if (!amenities.includes(amenity)) {
      setAmenities([...amenities, amenity]);
    }
  };

  const removeAmenity = (amenity: string) => {
    setAmenities(amenities.filter(a => a !== amenity));
  };

  const addTag = (tag: string) => {
    if (tag.trim() && !tags.includes(tag.trim())) {
      setTags([...tags, tag.trim()]);
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const addKeyHolder = () => {
    const newKeyHolder: KeyHolder = {
      id: Date.now().toString(),
      name: '',
      phone: '',
      relationship: 'other',
      hasKey: false,
    };
    setKeyHolders([...keyHolders, newKeyHolder]);
  };

  const updateKeyHolder = (index: number, field: keyof KeyHolder, value: any) => {
    const newKeyHolders = [...keyHolders];
    newKeyHolders[index] = { ...newKeyHolders[index], [field]: value };
    setKeyHolders(newKeyHolders);
  };

  const removeKeyHolder = (index: number) => {
    setKeyHolders(keyHolders.filter((_, i) => i !== index));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="basic">Básico</TabsTrigger>
            <TabsTrigger value="details">Detalhes</TabsTrigger>
            <TabsTrigger value="media">Mídia</TabsTrigger>
            <TabsTrigger value="amenities">Comodidades</TabsTrigger>
            <TabsTrigger value="keys">Chaves</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
                <CardDescription>Dados principais do imóvel</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título do Imóvel</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Casa 3 quartos no Centro" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preço (R$)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0"
                            {...field} 
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Descreva o imóvel detalhadamente..."
                          rows={4}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Imóvel</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="house">Casa</SelectItem>
                            <SelectItem value="apartment">Apartamento</SelectItem>
                            <SelectItem value="penthouse">Cobertura</SelectItem>
                            <SelectItem value="studio">Studio</SelectItem>
                            <SelectItem value="duplex">Duplex</SelectItem>
                            <SelectItem value="commercial">Comercial</SelectItem>
                            <SelectItem value="land">Terreno</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="purpose"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pretensão</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="buy">Comprar</SelectItem>
                            <SelectItem value="rent">Alugar</SelectItem>
                            <SelectItem value="season">Temporada</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="available">Disponível</SelectItem>
                            <SelectItem value="reserved">Reservado</SelectItem>
                            <SelectItem value="sold">Vendido</SelectItem>
                            <SelectItem value="rented">Alugado</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Continua nas próximas tabs... */}
          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Localização</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cidade</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione uma cidade" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {cities.map((city) => (
                              <SelectItem key={city} value={city}>{city}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="neighborhood"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bairro</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome do bairro" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Endereço</FormLabel>
                          <FormControl>
                            <Input placeholder="Rua, número" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CEP</FormLabel>
                        <FormControl>
                          <Input placeholder="00000-000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Características</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  <FormField
                    control={form.control}
                    name="area"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Área Total (m²)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0"
                            {...field} 
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="builtArea"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Área Construída (m²)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0"
                            {...field} 
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bedrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quartos</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0"
                            {...field} 
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="suites"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Suítes</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0"
                            {...field} 
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bathrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Banheiros</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0"
                            {...field} 
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="garage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vagas Garagem</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0"
                            {...field} 
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="balconies"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Varandas</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0"
                            {...field} 
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="floor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Andar</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="0"
                            {...field} 
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Imagens do Imóvel
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {images.map((image, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, index)}
                        className="flex-1"
                      />
                      {image && (
                        <img src={image} alt={`Preview ${index + 1}`} className="w-20 h-20 object-cover rounded" />
                      )}
                      {images.length > 1 && (
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={() => removeImage(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addImageField}>
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Imagem
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  Mídia Adicional
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="virtualTour"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tour Virtual (URL)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="videoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vídeo (URL)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="amenities" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Comodidades</CardTitle>
                <CardDescription>Selecione as comodidades disponíveis no imóvel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {commonAmenities.map((amenity) => (
                    <Button
                      key={amenity}
                      type="button"
                      variant={amenities.includes(amenity) ? "default" : "outline"}
                      size="sm"
                      onClick={() => 
                        amenities.includes(amenity) 
                          ? removeAmenity(amenity) 
                          : addAmenity(amenity)
                      }
                    >
                      {amenity}
                    </Button>
                  ))}
                </div>
                
                {amenities.length > 0 && (
                  <div className="space-y-2">
                    <Label>Comodidades Selecionadas:</Label>
                    <div className="flex flex-wrap gap-2">
                      {amenities.map((amenity) => (
                        <Badge key={amenity} variant="secondary">
                          {amenity}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="ml-2 h-4 w-4 p-0"
                            onClick={() => removeAmenity(amenity)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
                <CardDescription>Adicione tags para facilitar a busca</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Digite uma tag e pressione Enter"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTag(e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                  </div>
                  
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="ml-2 h-4 w-4 p-0"
                            onClick={() => removeTag(tag)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="keys" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  Responsáveis pelas Chaves
                </CardTitle>
                <CardDescription>Gerencie quem possui as chaves do imóvel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {keyHolders.map((keyHolder, index) => (
                    <div key={keyHolder.id} className="p-4 border rounded-lg space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          placeholder="Nome"
                          value={keyHolder.name}
                          onChange={(e) => updateKeyHolder(index, 'name', e.target.value)}
                        />
                        <Input
                          placeholder="Telefone"
                          value={keyHolder.phone}
                          onChange={(e) => updateKeyHolder(index, 'phone', e.target.value)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Select 
                          value={keyHolder.relationship} 
                          onValueChange={(value) => updateKeyHolder(index, 'relationship', value)}
                        >
                          <SelectTrigger className="w-48">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="owner">Proprietário</SelectItem>
                            <SelectItem value="tenant">Inquilino</SelectItem>
                            <SelectItem value="doorman">Porteiro</SelectItem>
                            <SelectItem value="manager">Síndico</SelectItem>
                            <SelectItem value="other">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={keyHolder.hasKey}
                              onCheckedChange={(checked) => updateKeyHolder(index, 'hasKey', checked)}
                            />
                            <Label>Possui chave</Label>
                          </div>
                          
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeKeyHolder(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <Button type="button" variant="outline" onClick={addKeyHolder}>
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Responsável
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seo" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Otimização para Buscadores (SEO)</CardTitle>
                <CardDescription>Configure informações para melhorar a visibilidade nos buscadores</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="seoTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título SEO</FormLabel>
                      <FormControl>
                        <Input placeholder="Título otimizado para buscadores" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="seoDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição SEO</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Descrição resumida para aparecer nos resultados de busca"
                          rows={3}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <FormField
                      control={form.control}
                      name="featured"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel>Marcar como Destaque</FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prioridade</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="low">Baixa</SelectItem>
                            <SelectItem value="medium">Média</SelectItem>
                            <SelectItem value="high">Alta</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Separator />

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">
            {property ? 'Atualizar' : 'Cadastrar'} Imóvel
          </Button>
        </div>
      </form>
    </Form>
  );
};
