
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
    purpose: 'buy',
    type: '',
    location: '',
  });

  const settings = settingsService.get();

  const handleSearch = () => {
    onSearch?.(filters);
  };

  return (
    <header className="relative min-h-[600px] bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
      {/* Enhanced Background Pattern with Navy Blue Tones */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-blue-300/30 animate-float shadow-lg shadow-blue-500/20"></div>
        <div className="absolute bottom-40 right-32 w-24 h-24 rounded-full bg-slate-300/25 animate-float shadow-lg shadow-slate-400/20" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-blue-200/20 animate-float shadow-lg shadow-blue-300/20" style={{ animationDelay: '2s' }}></div>
        {/* Additional decorative elements */}
        <div className="absolute top-32 right-1/4 w-20 h-20 rounded-full bg-gradient-to-r from-blue-400/20 to-slate-400/20 animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-28 h-28 rounded-full bg-gradient-to-l from-slate-300/15 to-blue-300/15 animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-blue-900/30"></div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6">
        <div className="flex items-center">
          <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 hover:bg-white/25 transition-all duration-300 shadow-xl shadow-blue-900/20 border border-white/20">
            <img 
              src="/lovable-uploads/d550ca61-f9b1-41f1-9721-2be817f1ec35.png" 
              alt="Conquista Imóveis" 
              className="h-12 w-auto filter brightness-110 contrast-110 drop-shadow-lg"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-white hover:bg-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/20"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
          
          <Button 
            variant="secondary" 
            className="hidden md:flex hover:scale-105 transition-transform duration-300 bg-white/20 hover:bg-white/30 text-white border border-white/30 shadow-lg hover:shadow-xl hover:shadow-blue-400/20"
          >
            Anunciar Imóvel
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 pt-16 pb-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in drop-shadow-2xl">
            Encontre o <span className="text-blue-300 animate-pulse drop-shadow-lg">imóvel perfeito:</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-100 mb-4 animate-fade-in drop-shadow-lg" style={{ animationDelay: '0.2s' }}>
            busca rápida e diversas opções
          </h2>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto animate-fade-in drop-shadow-md" style={{ animationDelay: '0.4s' }}>
            compre seu imóvel com tranquilidade e eficiência
          </p>
        </div>

        {/* Enhanced Search Form */}
        <div className="w-full max-w-4xl animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="glass-effect rounded-2xl p-6 md:p-8 hover:shadow-2xl transition-all duration-500 bg-white/10 backdrop-blur-md border border-white/20 shadow-xl shadow-blue-900/30">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-100">Tipo de Imóvel</label>
                <Select value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value })}>
                  <SelectTrigger className="bg-white/15 border-white/30 text-white hover:bg-white/25 transition-colors duration-300 shadow-md">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casa">Casa</SelectItem>
                    <SelectItem value="apartamento">Apartamento</SelectItem>
                    <SelectItem value="apartamento-garden">Apartamento Garden</SelectItem>
                    <SelectItem value="casa-condominio">Casa de Condomínio</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="cobertura">Cobertura</SelectItem>
                    <SelectItem value="terreno-lote">Terreno/Lote</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-100">Localização</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-200" />
                  <Input
                    type="text"
                    placeholder="Cidade ou bairro..."
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    className="pl-10 bg-white/15 border-white/30 text-white placeholder:text-slate-200 hover:bg-white/25 transition-colors duration-300 shadow-md"
                  />
                </div>
              </div>

              <div className="flex items-end">
                <Button
                  onClick={handleSearch}
                  className="w-full bg-gradient-to-r from-blue-600 to-slate-600 hover:from-blue-700 hover:to-slate-700 text-white font-semibold py-3 transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg border border-blue-400/30"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Buscar Imóvel
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              <span className="text-sm text-slate-200">Buscar por:</span>
              {['Casa SP', 'Apartamento RJ', 'Cobertura BH'].map((tag) => (
                <button
                  key={tag}
                  className="px-3 py-1 text-xs bg-white/15 text-slate-100 rounded-full hover:bg-white/25 transition-all duration-300 hover:scale-105 border border-white/20 shadow-md hover:shadow-lg"
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
