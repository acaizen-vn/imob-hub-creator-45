
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  type: 'house' | 'apartment' | 'commercial' | 'land';
  purpose: 'buy' | 'rent' | 'season';
  city: string;
  address: string;
  area: number;
  bedrooms?: number;
  bathrooms?: number;
  garage?: number;
  images: string[];
  featured: boolean;
  createdAt: string;
}

export interface City {
  id: string;
  name: string;
  state: string;
  propertiesCount: number;
}

export interface News {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  author: string;
  createdAt: string;
  published: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export interface Settings {
  siteName: string;
  siteDescription: string;
  logo: string;
  whatsappNumber: string;
  mapUrl: string;
  socialMedia: {
    instagram: string;
    facebook: string;
    whatsapp: string;
  };
  theme: 'light' | 'dark';
}
