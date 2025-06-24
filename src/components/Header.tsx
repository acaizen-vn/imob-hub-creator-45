
import { useState } from 'react';
import { Search, MapPin, Building, Home, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from '@/components/ThemeProvider';
import { settingsService } from '@/utils/storage';

interface SearchFilters {
  purpose: string;
  type: string;
  location: string;
}

interface HeaderProps {
  onSearch?: (filters: SearchFilters) => void;
}

export const Header = ({ onSearch }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();
  const [filters, setFilters] = useState<SearchFilters>({
    purpose: '',
    type: '',
    location: '',
  });

  const settings = settingsService.get();

  const handleSearch = () => {
    onSearch?.(filters);
  };

  return (
    <header className="relative min-h-[600px] bg-gradient-to-br from-primary via-primary/90 to-primary/80 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-white/20 animate-float"></div>
        <div className="absolute bottom-40 right-32 w-24 h-24 rounded-full bg-white/15 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-white/10 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6">
        <div className="flex items-center space-x-2">
          <Building className="h-8 w-8 text-white" />
          <span className="text-2xl font-bold text-white">{settings.siteName}</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-white hover:bg-white/20"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
          
          <Button variant="secondary" className="hidden md:flex">
            Anunciar Imóvel
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 pt-16 pb-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Encontre o <span className="text-yellow-300">imóvel perfeito</span>
            <br />para você
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            {settings.siteDescription}
          </p>
        </div>

        {/* Search Form */}
        <div className="w-full max-w-4xl">
          <div className="glass-effect rounded-2xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Pretensão</label>
                <Select value={filters.purpose} onValueChange={(value) => setFilters({ ...filters, purpose: value })}>
                  <SelectTrigger className="bg-white/20 border-white/30 text-white">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buy">Comprar</SelectItem>
                    <SelectItem value="rent">Alugar</SelectItem>
                    <SelectItem value="season">Temporada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Tipo de Imóvel</label>
                <Select value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value })}>
                  <SelectTrigger className="bg-white/20 border-white/30 text-white">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house">Casa</SelectItem>
                    <SelectItem value="apartment">Apartamento</SelectItem>
                    <SelectItem value="commercial">Comercial</SelectItem>
                    <SelectItem value="land">Terreno</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Localização</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
                  <Input
                    type="text"
                    placeholder="Cidade ou bairro..."
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/60"
                  />
                </div>
              </div>

              <div className="flex items-end">
                <Button
                  onClick={handleSearch}
                  className="w-full bg-white text-primary hover:bg-white/90 font-semibold py-3 transition-all duration-300 transform hover:scale-105"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Buscar Imóvel
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              <span className="text-sm text-white/80">Buscar por:</span>
              {['Apartamento SP', 'Casa RJ', 'Comercial BH'].map((tag) => (
                <button
                  key={tag}
                  className="px-3 py-1 text-xs bg-white/20 text-white rounded-full hover:bg-white/30 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
