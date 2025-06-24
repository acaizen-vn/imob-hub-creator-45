
import { Property, City, News, User, Settings } from '@/types';

const STORAGE_KEYS = {
  PROPERTIES: 'conquista_properties',
  CITIES: 'conquista_cities',
  NEWS: 'conquista_news',
  USERS: 'conquista_users',
  SETTINGS: 'conquista_settings',
  AUTH: 'conquista_auth',
} as const;

// Generic storage utilities
export const storage = {
  get: <T>(key: string): T[] => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch {
      return [] as T[];
    }
  },

  set: <T>(key: string, data: T[]): void => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Storage error:', error);
    }
  },

  getSingle: <T>(key: string): T | null => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  setSingle: <T>(key: string, data: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Storage error:', error);
    }
  },
};

// Initialize default data
export const initializeDefaultData = () => {
  // Default user
  const users = storage.get<User>(STORAGE_KEYS.USERS);
  if (users.length === 0) {
    const defaultUser: User = {
      id: '1',
      email: 'conquista@imobhub.com.br',
      name: 'Admin Conquista',
      role: 'admin',
    };
    storage.set(STORAGE_KEYS.USERS, [defaultUser]);
  }

  // Default settings
  const settings = storage.getSingle<Settings>(STORAGE_KEYS.SETTINGS);
  if (!settings) {
    const defaultSettings: Settings = {
      siteName: 'Conquista Imob Hub',
      siteDescription: 'Sua imobiliária digital completa',
      logo: '/placeholder.svg',
      whatsappNumber: '+5511999999999',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1!2d-46.6!3d-23.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMwJzAwLjAiUyA0NsKwMzYnMDAuMCJX!5e0!3m2!1spt!2sbr!4v1000000000000!5m2!1spt!2sbr',
      socialMedia: {
        instagram: 'https://instagram.com/conquistaimobhub',
        facebook: 'https://facebook.com/conquistaimobhub',
        whatsapp: 'https://wa.me/5511999999999',
      },
      theme: 'light',
    };
    storage.setSingle(STORAGE_KEYS.SETTINGS, defaultSettings);
  }

  // Default cities
  const cities = storage.get<City>(STORAGE_KEYS.CITIES);
  if (cities.length === 0) {
    const defaultCities: City[] = [
      { id: '1', name: 'São Paulo', state: 'SP', propertiesCount: 0 },
      { id: '2', name: 'Rio de Janeiro', state: 'RJ', propertiesCount: 0 },
      { id: '3', name: 'Belo Horizonte', state: 'MG', propertiesCount: 0 },
      { id: '4', name: 'Salvador', state: 'BA', propertiesCount: 0 },
      { id: '5', name: 'Curitiba', state: 'PR', propertiesCount: 0 },
    ];
    storage.set(STORAGE_KEYS.CITIES, defaultCities);
  }
};

// Property services
export const propertyService = {
  getAll: (): Property[] => storage.get<Property>(STORAGE_KEYS.PROPERTIES),
  
  getFeatured: (): Property[] => 
    storage.get<Property>(STORAGE_KEYS.PROPERTIES).filter(p => p.featured),

  getByCity: (city: string): Property[] =>
    storage.get<Property>(STORAGE_KEYS.PROPERTIES).filter(p => 
      p.city.toLowerCase().includes(city.toLowerCase())
    ),

  search: (filters: { purpose?: string; type?: string; city?: string }): Property[] => {
    let properties = storage.get<Property>(STORAGE_KEYS.PROPERTIES);
    
    if (filters.purpose) {
      properties = properties.filter(p => p.purpose === filters.purpose);
    }
    if (filters.type) {
      properties = properties.filter(p => p.type === filters.type);
    }
    if (filters.city) {
      properties = properties.filter(p => 
        p.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }
    
    return properties;
  },

  create: (property: Omit<Property, 'id' | 'createdAt'>): Property => {
    const newProperty: Property = {
      ...property,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    const properties = storage.get<Property>(STORAGE_KEYS.PROPERTIES);
    properties.push(newProperty);
    storage.set(STORAGE_KEYS.PROPERTIES, properties);
    
    return newProperty;
  },

  update: (id: string, updates: Partial<Property>): Property | null => {
    const properties = storage.get<Property>(STORAGE_KEYS.PROPERTIES);
    const index = properties.findIndex(p => p.id === id);
    
    if (index === -1) return null;
    
    properties[index] = { ...properties[index], ...updates };
    storage.set(STORAGE_KEYS.PROPERTIES, properties);
    
    return properties[index];
  },

  delete: (id: string): boolean => {
    const properties = storage.get<Property>(STORAGE_KEYS.PROPERTIES);
    const filtered = properties.filter(p => p.id !== id);
    
    if (filtered.length === properties.length) return false;
    
    storage.set(STORAGE_KEYS.PROPERTIES, filtered);
    return true;
  },
};

export const cityService = {
  getAll: (): City[] => storage.get<City>(STORAGE_KEYS.CITIES),
  
  create: (city: Omit<City, 'id'>): City => {
    const newCity: City = {
      ...city,
      id: Date.now().toString(),
    };
    
    const cities = storage.get<City>(STORAGE_KEYS.CITIES);
    cities.push(newCity);
    storage.set(STORAGE_KEYS.CITIES, cities);
    
    return newCity;
  },
};

export const newsService = {
  getAll: (): News[] => storage.get<News>(STORAGE_KEYS.NEWS),
  
  getPublished: (): News[] => 
    storage.get<News>(STORAGE_KEYS.NEWS).filter(n => n.published),

  create: (news: Omit<News, 'id' | 'createdAt'>): News => {
    const newNews: News = {
      ...news,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    const allNews = storage.get<News>(STORAGE_KEYS.NEWS);
    allNews.push(newNews);
    storage.set(STORAGE_KEYS.NEWS, allNews);
    
    return newNews;
  },
};

export const authService = {
  login: (email: string, password: string): User | null => {
    // Hardcoded login for demo
    if (email === 'conquista@imobhub.com.br' && password === 'Conquista2025#') {
      const user = storage.get<User>(STORAGE_KEYS.USERS)[0];
      storage.setSingle(STORAGE_KEYS.AUTH, user);
      return user;
    }
    return null;
  },

  logout: (): void => {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  },

  getCurrentUser: (): User | null => {
    return storage.getSingle<User>(STORAGE_KEYS.AUTH);
  },
};

export const settingsService = {
  get: (): Settings => {
    return storage.getSingle<Settings>(STORAGE_KEYS.SETTINGS) || {
      siteName: 'Conquista Imob Hub',
      siteDescription: 'Sua imobiliária digital completa',
      logo: '/placeholder.svg',
      whatsappNumber: '+5511999999999',
      mapUrl: '',
      socialMedia: {
        instagram: '',
        facebook: '',
        whatsapp: '',
      },
      theme: 'light',
    };
  },

  update: (updates: Partial<Settings>): Settings => {
    const current = settingsService.get();
    const updated = { ...current, ...updates };
    storage.setSingle(STORAGE_KEYS.SETTINGS, updated);
    return updated;
  },
};
