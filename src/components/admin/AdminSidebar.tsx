
import { Home, Building, MapPin, Newspaper, Settings, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const menuItems = [
    { id: 'properties', label: 'Imóveis', icon: Building },
    { id: 'cities', label: 'Cidades', icon: MapPin },
    { id: 'news', label: 'Notícias', icon: Newspaper },
    { id: 'settings', label: 'Configurações', icon: Settings },
    { id: 'seo', label: 'SEO & IA', icon: Search },
  ];

  return (
    <aside className="w-64 bg-white shadow-sm border-r min-h-screen">
      <div className="p-6">
        <Button
          variant="ghost"
          className="w-full justify-start mb-4"
          onClick={() => window.open('/', '_blank')}
        >
          <Home className="w-4 h-4 mr-2" />
          Ver Site
        </Button>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="w-4 h-4 mr-2" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
