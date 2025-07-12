
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Property } from '@/types';
import { cityService } from '@/utils/storage';

interface PropertyFormProps {
  property: Property | null;
  onSave: (property: Omit<Property, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

export const PropertyForm = ({ property, onSave, onCancel }: PropertyFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    type: 'house' as Property['type'],
    purpose: 'buy' as Property['purpose'],
    city: '',
    address: '',
    area: 0,
    bedrooms: 0,
    bathrooms: 0,
    garage: 0,
    images: [''],
    featured: false,
    status: 'available' as Property['status'],
    priority: 'medium' as Property['priority'],
  });

  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    const allCities = cityService.getAll();
    setCities(allCities.map(city => city.name));
  }, []);

  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title,
        description: property.description,
        price: property.price,
        type: property.type,
        purpose: property.purpose,
        city: property.city,
        address: property.address,
        area: property.area,
        bedrooms: property.bedrooms || 0,
        bathrooms: property.bathrooms || 0,
        garage: property.garage || 0,
        images: property.images,
        featured: property.featured,
        status: property.status,
        priority: property.priority,
      });
    }
  }, [property]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImages = [...formData.images];
        newImages[index] = event.target?.result as string;
        setFormData({ ...formData, images: newImages });
      };
      reader.readAsDataURL(file);
    }
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Título do Imóvel</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        
        <div>
          <Label htmlFor="price">Preço (R$)</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Tipo de Imóvel</Label>
          <Select value={formData.type} onValueChange={(value: Property['type']) => setFormData({ ...formData, type: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="house">Casa</SelectItem>
              <SelectItem value="apartment">Apartamento</SelectItem>
              <SelectItem value="commercial">Comercial</SelectItem>
              <SelectItem value="land">Terreno</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Pretensão</Label>
          <Select value={formData.purpose} onValueChange={(value: Property['purpose']) => setFormData({ ...formData, purpose: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="buy">Comprar</SelectItem>
              <SelectItem value="rent">Alugar</SelectItem>
              <SelectItem value="season">Temporada</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Cidade</Label>
          <Select value={formData.city} onValueChange={(value) => setFormData({ ...formData, city: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma cidade" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="address">Endereço</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div>
          <Label htmlFor="area">Área (m²)</Label>
          <Input
            id="area"
            type="number"
            value={formData.area}
            onChange={(e) => setFormData({ ...formData, area: Number(e.target.value) })}
          />
        </div>

        <div>
          <Label htmlFor="bedrooms">Quartos</Label>
          <Input
            id="bedrooms"
            type="number"
            value={formData.bedrooms}
            onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
          />
        </div>

        <div>
          <Label htmlFor="bathrooms">Banheiros</Label>
          <Input
            id="bathrooms"
            type="number"
            value={formData.bathrooms}
            onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
          />
        </div>

        <div>
          <Label htmlFor="garage">Garagem</Label>
          <Input
            id="garage"
            type="number"
            value={formData.garage}
            onChange={(e) => setFormData({ ...formData, garage: Number(e.target.value) })}
          />
        </div>
      </div>

      <div>
        <Label>Imagens do Imóvel</Label>
        {formData.images.map((image, index) => (
          <div key={index} className="flex items-center space-x-2 mt-2">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, index)}
              className="flex-1"
            />
            {image && (
              <img src={image} alt={`Preview ${index + 1}`} className="w-16 h-16 object-cover rounded" />
            )}
          </div>
        ))}
        <Button type="button" variant="outline" onClick={addImageField} className="mt-2">
          Adicionar Imagem
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          checked={formData.featured}
          onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
        />
        <Label>Marcar como Destaque</Label>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">
          {property ? 'Atualizar' : 'Cadastrar'}
        </Button>
      </div>
    </form>
  );
};
