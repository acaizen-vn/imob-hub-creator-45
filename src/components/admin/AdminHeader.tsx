
import { LogOut, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminHeaderProps {
  onLogout: () => void;
}

export const Header = ({ onLogout }: AdminHeaderProps) => {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 shadow-xl border-b border-white/20">
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white drop-shadow-lg">
            Conquista Imob Hub - Painel Admin
          </h1>
          <p className="text-sm text-slate-200">
            Sistema de gestão de conteúdo
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            size="sm"
            className="bg-white/15 border-white/30 text-white hover:bg-white/25 transition-all duration-300 shadow-md"
          >
            <Settings className="w-4 h-4 mr-2" />
            Configurações
          </Button>
          
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={onLogout}
            className="bg-red-600/80 hover:bg-red-700/90 text-white shadow-md"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>
    </header>
  );
};
