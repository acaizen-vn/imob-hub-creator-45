
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('AdminDashboard: Starting authentication check');
    
    const checkAuth = async () => {
      try {
        console.log('AdminDashboard: Checking current user...');
        const user = authService.getCurrentUser();
        console.log('AdminDashboard: Current user result:', user);
        
        if (!user) {
          console.log('AdminDashboard: No user found, redirecting to login');
          navigate('/admin');
          return;
        }
        
        console.log('AdminDashboard: User authenticated successfully:', user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('AdminDashboard: Error checking authentication:', error);
        navigate('/admin');
      } finally {
        console.log('AdminDashboard: Authentication check completed');
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    try {
      console.log('AdminDashboard: Logging out...');
      authService.logout();
      navigate('/admin');
    } catch (error) {
      console.error('AdminDashboard: Error during logout:', error);
      navigate('/admin');
    }
  };

  const handleTabChange = (tab: string) => {
    console.log('AdminDashboard: Changing tab to:', tab);
    setActiveTab(tab as ActiveTab);
  };

  const renderContent = () => {
    try {
      console.log('AdminDashboard: Rendering content for tab:', activeTab);
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
      console.error('AdminDashboard: Error rendering content:', error);
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

  // Show loading screen while checking authentication
  if (isLoading) {
    console.log('AdminDashboard: Showing loading screen');
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  // Only render dashboard if authenticated
  if (!isAuthenticated) {
    console.log('AdminDashboard: Not authenticated, should redirect');
    return null;
  }

  console.log('AdminDashboard: Rendering full dashboard');
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
