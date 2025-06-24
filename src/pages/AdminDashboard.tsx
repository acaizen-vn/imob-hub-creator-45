
import { useState, useEffect } from 'react';
import { Header } from '@/components/admin/AdminHeader';
import { Sidebar } from '@/components/admin/AdminSidebar';
import { PropertyManager } from '@/components/admin/PropertyManager';
import { CityManager } from '@/components/admin/CityManager';
import { NewsManager } from '@/components/admin/NewsManager';
import { SiteSettings } from '@/components/admin/SiteSettings';
import { SEOTools } from '@/components/admin/SEOTools';
import { authService } from '@/utils/storage';
import { useNavigate } from 'react-router-dom';

type ActiveTab = 'properties' | 'cities' | 'news' | 'settings' | 'seo';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('properties');
  const navigate = useNavigate();

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (!user) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate('/admin');
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as ActiveTab);
  };

  const renderContent = () => {
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
      default:
        return <PropertyManager />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onLogout={handleLogout} />
      
      <div className="flex">
        <Sidebar 
          activeTab={activeTab} 
          onTabChange={handleTabChange} 
        />
        
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
