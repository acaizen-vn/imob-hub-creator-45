
import { useState, useEffect } from 'react';
import { Header } from '@/components/admin/AdminHeader';
import { Sidebar } from '@/components/admin/AdminSidebar';
import { PropertyManager } from '@/components/admin/PropertyManager';
import { CityManager } from '@/components/admin/CityManager';
import { NewsManager } from '@/components/admin/NewsManager';
import { SiteSettings } from '@/components/admin/SiteSettings';
import { SEOTools } from '@/components/admin/SEOTools';
import { MarketingTools } from '@/components/admin/MarketingTools';
import { authService } from '@/utils/storage';
import { useNavigate } from 'react-router-dom';

type ActiveTab = 'properties' | 'cities' | 'news' | 'settings' | 'seo' | 'marketing';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('properties');
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const user = authService.getCurrentUser();
      if (!user) {
        console.log('User not authenticated, redirecting to login');
        navigate('/admin');
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    try {
      authService.logout();
      navigate('/admin');
    } catch (error) {
      console.error('Error during logout:', error);
      navigate('/admin');
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as ActiveTab);
  };

  const renderContent = () => {
    try {
      switch (activeTab) {
        case 'properties':
          return <PropertyManager />;
        case 'cities':
          return <CityManager />;
        case 'news':
          return <NewsManager />;
        case 'settings':
          return <SiteSettings />;
        case 'seo':
          return <SEOTools />;
        case 'marketing':
          return <MarketingTools />;
        default:
          return <PropertyManager />;
      }
    } catch (error) {
      console.error('Error rendering content:', error);
      return (
        <div className="text-white p-4">
          <h2 className="text-xl font-bold mb-2">Erro ao carregar conteúdo</h2>
          <p>Ocorreu um erro ao carregar esta seção. Tente recarregar a página.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Recarregar Página
          </button>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
      <Header onLogout={handleLogout} />
      
      <div className="flex">
        <Sidebar 
          activeTab={activeTab} 
          onTabChange={handleTabChange} 
        />
        
        <main className="flex-1 p-6">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
