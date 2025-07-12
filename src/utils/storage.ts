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
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    storage.set(STORAGE_KEYS.USERS, [defaultUser]);
  }

  // Default settings with updated information
  const settings = storage.getSingle<Settings>(STORAGE_KEYS.SETTINGS);
  if (!settings) {
    const defaultSettings: Settings = {
      siteName: 'Conquista Imóveis',
      siteDescription: 'CRECI J-6602 - Referência em Barra Mansa e Volta Redonda',
      logo: '/placeholder.svg',
      whatsappNumber: '+5524998753750',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3699.0!2d-44.1!3d-22.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDMwJzAwLjAiUyA0NMKwMDYnMDAuMCJX!5e0!3m2!1spt!2sbr!4v1000000000000!5m2!1spt!2sbr',
      socialMedia: {
        instagram: 'https://instagram.com/conquistaimobiliaria',
        facebook: 'https://facebook.com/conquistaimobiliaria',
        whatsapp: 'https://wa.me/5524998753750',
      },
      theme: 'light',
      offices: [
        {
          id: '1',
          name: 'Volta Redonda',
          address: 'Rua Edson Passos, 66, Aterrado',
          city: 'Volta Redonda - Rio de Janeiro',
          whatsapp: '(24) 99875-3750',
          mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3699.0!2d-44.1!3d-22.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDMwJzAwLjAiUyA0NMKwMDYnMDAuMCJX!5e0!3m2!1spt!2sbr!4v1000000000000!5m2!1spt!2sbr'
        },
        {
          id: '2',
          name: 'Barra Mansa',
          address: 'Rua Michel Wardini, 10, Centro',
          city: 'Barra Mansa - Rio de Janeiro',
          whatsapp: '(24) 99875-3750',
          mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3699.0!2d-44.2!3d-22.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDM2JzAwLjAiUyA0NMKwMTInMDAuMCJX!5e0!3m2!1spt!2sbr!4v1000000000000!5m2!1spt!2sbr'
        }
      ],
      workingHours: '09:00 às 18:00',
      creci: 'CRECI J-6602',
      privacyPolicy: 'A Conquista Imóveis respeita sua privacidade. Coletamos apenas os dados necessários para contato, simulações e envio de informações sobre imóveis.\n\nTodos os dados são protegidos conforme a LGPD e só são compartilhados com instituições financeiras quando necessário.\n\nVocê pode solicitar acesso, correção ou exclusão dos seus dados a qualquer momento pelo e-mail: contato@conquistarj.com.br.\n\nUtilizamos cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa política de privacidade.',
      termsOfUse: 'Ao acessar nosso site, você concorda com os termos de uso da Conquista Imóveis. Coletamos apenas os dados necessários, como nome, telefone e e-mail, para oferecer um atendimento personalizado, simular financiamentos e apresentar as melhores oportunidades.\n\nSeguimos as diretrizes da Lei Geral de Proteção de Dados (LGPD) e garantimos a segurança das suas informações. Seus dados nunca serão compartilhados sem seu consentimento.\n\nAo continuar navegando, você aceita estes termos e confia na nossa forma de trabalhar: com ética, segurança e respeito ao seu sonho de conquistar um imóvel.',
      aboutUs: 'Com 12 anos de atuação no mercado imobiliário, a Conquista Imóveis é referência em Barra Mansa e Volta Redonda na intermediação de imóveis residenciais, comerciais e empreendimentos na planta. Ao longo dessa trajetória, já realizamos o sonho de mais de 750 famílias, sempre com transparência, credibilidade e atendimento personalizado.\n\nSomos correspondente Caixa autorizado, o que nos permite agilizar e facilitar o processo de financiamento habitacional, com simulações sob medida e aprovações mais rápidas para nossos clientes. Além disso, oferecemos assessoria jurídica especializada em todas as etapas da negociação.\n\nMais que vender imóveis, nosso propósito é entregar segurança, confiança e realizar conquistas. Afinal, o seu sonho também é o nosso.'
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

  delete: (id: string): boolean => {
    const cities = storage.get<City>(STORAGE_KEYS.CITIES);
    const filtered = cities.filter(c => c.id !== id);
    
    if (filtered.length === cities.length) return false;
    
    storage.set(STORAGE_KEYS.CITIES, filtered);
    return true;
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
      siteName: 'Conquista Imóveis',
      siteDescription: 'CRECI J-6602 - Referência em Barra Mansa e Volta Redonda',
      logo: '/placeholder.svg',
      whatsappNumber: '+5524998753750',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3699.0!2d-44.1!3d-22.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDMwJzAwLjAiUyA0NMKwMDYnMDAuMCJX!5e0!3m2!1spt!2sbr!4v1000000000000!5m2!1spt!2sbr',
      socialMedia: {
        instagram: 'https://instagram.com/conquistaimobiliaria',
        facebook: 'https://facebook.com/conquistaimobiliaria',
        whatsapp: 'https://wa.me/5524998753750',
      },
      theme: 'light',
      offices: [
        {
          id: '1',
          name: 'Volta Redonda',
          address: 'Rua Edson Passos, 66, Aterrado',
          city: 'Volta Redonda - Rio de Janeiro',
          whatsapp: '(24) 99875-3750',
          mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3699.0!2d-44.1!3d-22.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDMwJzAwLjAiUyA0NMKwMDYnMDAuMCJX!5e0!3m2!1spt!2sbr!4v1000000000000!5m2!1spt!2sbr'
        },
        {
          id: '2',
          name: 'Barra Mansa',
          address: 'Rua Michel Wardini, 10, Centro',
          city: 'Barra Mansa - Rio de Janeiro',
          whatsapp: '(24) 99875-3750',
          mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3699.0!2d-44.2!3d-22.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDM2JzAwLjAiUyA0NMKwMTInMDAuMCJX!5e0!3m2!1spt!2sbr!4v1000000000000!5m2!1spt!2sbr'
        }
      ],
      workingHours: '09:00 às 18:00',
      creci: 'CRECI J-6602',
      privacyPolicy: 'A Conquista Imóveis respeita sua privacidade. Coletamos apenas os dados necessários para contato, simulações e envio de informações sobre imóveis.\n\nTodos os dados são protegidos conforme a LGPD e só são compartilhados com instituições financeiras quando necessário.\n\nVocê pode solicitar acesso, correção ou exclusão dos seus dados a qualquer momento pelo e-mail: contato@conquistarj.com.br.\n\nUtilizamos cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa política de privacidade.',
      termsOfUse: 'Ao acessar nosso site, você concorda com os termos de uso da Conquista Imóveis. Coletamos apenas os dados necessários, como nome, telefone e e-mail, para oferecer um atendimento personalizado, simular financiamentos e apresentar as melhores oportunidades.\n\nSeguimos as diretrizes da Lei Geral de Proteção de Dados (LGPD) e garantimos a segurança das suas informações. Seus dados nunca serão compartilhados sem seu consentimento.\n\nAo continuar navegando, você aceita estes termos e confia na nossa forma de trabalhar: com ética, segurança e respeito ao seu sonho de conquistar um imóvel.',
      aboutUs: 'Com 12 anos de atuação no mercado imobiliário, a Conquista Imóveis é referência em Barra Mansa e Volta Redonda na intermediação de imóveis residenciais, comerciais e empreendimentos na planta. Ao longo dessa trajetória, já realizamos o sonho de mais de 750 famílias, sempre com transparência, credibilidade e atendimento personalizado.\n\nSomos correspondente Caixa autorizado, o que nos permite agilizar e facilitar o processo de financiamento habitacional, com simulações sob medida e aprovações mais rápidas para nossos clientes. Além disso, oferecemos assessoria jurídica especializada em todas as etapas da negociação.\n\nMais que vender imóveis, nosso propósito é entregar segurança, confiança e realizar conquistas. Afinal, o seu sonho também é o nosso.'
    };
  },

  update: (updates: Partial<Settings>): Settings => {
    const current = settingsService.get();
    const updated = { ...current, ...updates };
    storage.setSingle(STORAGE_KEYS.SETTINGS, updated);
    return updated;
  },
};
