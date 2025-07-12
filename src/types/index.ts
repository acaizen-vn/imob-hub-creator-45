
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  type: 'house' | 'apartment' | 'commercial' | 'land' | 'penthouse' | 'studio' | 'duplex';
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
  
  // Campos expandidos
  neighborhood?: string;
  zipCode?: string;
  builtArea?: number;
  totalArea?: number;
  suites?: number;
  balconies?: number;
  elevators?: number;
  floors?: number;
  floor?: number;
  orientation?: 'north' | 'south' | 'east' | 'west' | 'northeast' | 'northwest' | 'southeast' | 'southwest';
  amenities?: string[];
  conditions?: 'new' | 'used' | 'under_construction' | 'renovated';
  documents?: PropertyDocument[];
  virtualTour?: string;
  videoUrl?: string;
  mapCoordinates?: {
    lat: number;
    lng: number;
  };
  nearbyPlaces?: NearbyPlace[];
  financingOptions?: FinancingOption[];
  status: 'available' | 'reserved' | 'sold' | 'rented';
  priority: 'low' | 'medium' | 'high';
  tags?: string[];
  keyHolders?: KeyHolder[];
  visits?: PropertyVisit[];
  notes?: PropertyNote[];
  publishedOn?: string[];
  seoTitle?: string;
  seoDescription?: string;
  slug?: string;
}

export interface PropertyDocument {
  id: string;
  name: string;
  url: string;
  type: 'deed' | 'registration' | 'tax' | 'plan' | 'other';
  uploadedAt: string;
}

export interface NearbyPlace {
  id: string;
  name: string;
  type: 'school' | 'hospital' | 'shopping' | 'transport' | 'park' | 'restaurant' | 'bank';
  distance: number;
  walkingTime?: number;
}

export interface FinancingOption {
  id: string;
  bank: string;
  rate: number;
  term: number;
  downPayment: number;
  monthlyPayment: number;
}

export interface KeyHolder {
  id: string;
  name: string;
  phone: string;
  relationship: 'owner' | 'tenant' | 'doorman' | 'manager' | 'other';
  hasKey: boolean;
  availableTimes?: string[];
  notes?: string;
}

export interface PropertyVisit {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  scheduledDate: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
  feedback?: string;
  interested: boolean;
  agentNotes?: string;
  createdAt: string;
}

export interface PropertyNote {
  id: string;
  content: string;
  type: 'general' | 'maintenance' | 'client' | 'internal';
  createdBy: string;
  createdAt: string;
  isPrivate: boolean;
}

export interface City {
  id: string;
  name: string;
  state: string;
  propertiesCount: number;
  neighborhoods?: Neighborhood[];
  averagePrice?: number;
  marketTrend?: 'up' | 'down' | 'stable';
}

export interface Neighborhood {
  id: string;
  name: string;
  cityId: string;
  propertiesCount: number;
  averagePrice?: number;
  description?: string;
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
  category?: 'market' | 'tips' | 'news' | 'financing';
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  slug?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'agent' | 'user';
  phone?: string;
  photo?: string;
  permissions?: string[];
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
}

export interface Office {
  id: string;
  name: string;
  address: string;
  city: string;
  whatsapp: string;
  mapUrl: string;
  manager?: string;
  agents?: string[];
  workingHours?: WorkingHours;
  photo?: string;
}

export interface WorkingHours {
  monday?: TimeSlot;
  tuesday?: TimeSlot;
  wednesday?: TimeSlot;
  thursday?: TimeSlot;
  friday?: TimeSlot;
  saturday?: TimeSlot;
  sunday?: TimeSlot;
}

export interface TimeSlot {
  open: string;
  close: string;
  lunch?: {
    start: string;
    end: string;
  };
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
    youtube?: string;
    linkedin?: string;
  };
  theme: 'light' | 'dark';
  offices?: Office[];
  workingHours?: string;
  creci?: string;
  privacyPolicy?: string;
  termsOfUse?: string;
  aboutUs?: string;
  
  // Configurações expandidas
  emailTemplates?: EmailTemplate[];
  seoSettings?: SEOSettings;
  integrations?: {
    googleAnalytics?: string;
    googleTagManager?: string;
    facebookPixel?: string;
    hotjar?: string;
  };
  maintenanceMode?: boolean;
  allowRegistration?: boolean;
  defaultPropertyStatus?: Property['status'];
  autoPublishProperties?: boolean;
  watermarkSettings?: WatermarkSettings;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: 'welcome' | 'property_inquiry' | 'visit_confirmation' | 'newsletter';
  isActive: boolean;
}

export interface SEOSettings {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  googleSiteVerification?: string;
  robotsTxt?: string;
  sitemap?: boolean;
}

export interface WatermarkSettings {
  enabled: boolean;
  text: string;
  opacity: number;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
}

export interface ContactForm {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyId?: string;
  createdAt: string;
  status: 'new' | 'in_progress' | 'responded' | 'closed';
  assignedTo?: string;
  priority: 'low' | 'medium' | 'high';
  source?: 'website' | 'whatsapp' | 'email' | 'phone' | 'social';
  tags?: string[];
  notes?: ContactNote[];
}

export interface ContactNote {
  id: string;
  content: string;
  createdBy: string;
  createdAt: string;
  type: 'call' | 'email' | 'meeting' | 'note';
}

export interface SearchFilters {
  purpose?: Property['purpose'];
  type?: Property['type'];
  city?: string;
  neighborhood?: string;
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  bedrooms?: number;
  bathrooms?: number;
  garage?: number;
  amenities?: string[];
  status?: Property['status'];
  tags?: string[];
}

export interface Dashboard {
  totalProperties: number;
  availableProperties: number;
  soldProperties: number;
  rentedProperties: number;
  totalVisits: number;
  pendingContacts: number;
  monthlyRevenue: number;
  topPerformingProperties: Property[];
  recentActivities: Activity[];
  marketMetrics: MarketMetrics;
}

export interface Activity {
  id: string;
  type: 'property_added' | 'visit_scheduled' | 'contact_received' | 'property_sold' | 'property_rented';
  description: string;
  entityId: string;
  userId: string;
  createdAt: string;
}

export interface MarketMetrics {
  averagePrice: number;
  averagePriceChange: number;
  totalListings: number;
  newListingsThisMonth: number;
  averageDaysOnMarket: number;
  mostPopularNeighborhood: string;
}

export interface Report {
  id: string;
  title: string;
  type: 'sales' | 'inventory' | 'performance' | 'market' | 'financial';
  dateRange: {
    start: string;
    end: string;
  };
  data: any;
  generatedAt: string;
  generatedBy: string;
}

export interface Microsite {
  id: string;
  name: string;
  domain?: string;
  subdomain: string;
  theme: 'light' | 'dark' | 'custom';
  customCSS?: string;
  logo?: string;
  colors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  properties: string[];
  isActive: boolean;
  seoSettings?: SEOSettings;
  createdAt: string;
}
