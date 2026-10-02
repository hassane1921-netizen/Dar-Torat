export type MoroccanRegion = 
  | 'Toutes'
  | 'Fès-Meknès'
  | 'Marrakech-Safi'
  | 'Tanger-Tétouan-Al Hoceïma'
  | 'Souss-Massa'
  | 'Drâa-Tafilalet'
  | 'Rabat-Salé-Kénitra'
  | 'Casablanca-Settat'
  | 'Béni Mellal-Khénifra'
  | 'Oriental'
  | 'Guelmim-Oued Noun'
  | 'Laâyoune-Sakia El Hamra'
  | 'Dakhla-Oued Ed-Dahab';

export type City = string;

export type PropertyType = 'Riad' | 'Dar' | 'Palais' | 'Kasbah' | 'Villa';

export type ProductCategory = 
  | 'Tous'
  | 'Céramique'
  | 'Maroquinerie'
  | 'Textile'
  | 'Métal & Cuivre'
  | 'Terroir & Bien-être'
  | 'Couture';

export type Currency = 'MAD' | 'EUR' | 'USD';

export type Language = 'fr' | 'ar' | 'en';

export interface RoomOption {
  id: string;
  name: string;
  arabicName: string;
  capacity: number;
  bedType: string;
  pricePerNight: number;
  image: string;
  size: string;
  features: string[];
}

export interface Hotel {
  id: string;
  name: string;
  arabicName: string;
  city: string;
  province: string;
  region: MoroccanRegion;
  property_type: PropertyType;
  price_per_night: number;
  rating: number;
  review_count: number;
  image_url: string;
  gallery: string[];
  neighborhood: string;
  description: string;
  fullDescription: string;
  amenities: string[];
  rooms: RoomOption[];
  host: {
    name: string;
    role: string;
    avatar: string;
    experienceYears: number;
  };
  address: string;
  heritageEra: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  featured?: boolean;
}

export interface ArtisanProfile {
  name: string;
  title: string;
  cooperative?: string;
  bio: string;
  avatar: string;
  city: string;
  region?: MoroccanRegion;
  verified: boolean;
  yearsOfMastery: number;
}

export interface Product {
  id: string;
  name: string;
  arabicName: string;
  category: 'Céramique' | 'Maroquinerie' | 'Textile' | 'Métal & Cuivre' | 'Terroir & Bien-être' | 'Couture';
  origin: string;
  region: MoroccanRegion;
  province: string;
  price: number; // Public client price (تمن البيع للزبون)
  costPrice: number; // Original cost (الثمن الأصلي - الخاص بالبائع فقط)
  oldPrice?: number;
  description: string;
  fullDescription: string;
  emoji: string;
  image: string;
  gallery: string[];
  artisan: ArtisanProfile;
  sellerId: string; // ID of the registered seller
  dimensions?: string;
  materials?: string[];
  stock: number;
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  featured?: boolean;
  estimatedDeliveryDays: string;
}

export interface Activity {
  id: string;
  name: string;
  arabicName: string;
  city: string;
  region: MoroccanRegion;
  duration: string;
  group: string;
  price: number;
  description: string;
  fullDescription: string;
  emoji: string;
  image: string;
  tags: string[];
  includes: string[];
  meetingPoint: string;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface Booking {
  id: string;
  bookingRef: string;
  hotelId: string;
  hotelName: string;
  hotelCity: string;
  hotelRegion: MoroccanRegion;
  roomName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  pricePerNight: number;
  totalPrice: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests?: string;
  includeBreakfast: boolean;
  includeAirportTransfer: boolean;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  costTotal: number; // Total cost price
  profitTotal: number; // Total net profit
  shippingCost: number;
  discount: number;
  total: number;
  currency: Currency;
  shippingMethod: 'express_morocco' | 'standard_morocco' | 'international' | 'pickup';
  paymentMethod: 'cod' | 'card' | 'transfer';
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    region?: MoroccanRegion;
    postalCode?: string;
    country: string;
  };
  notes?: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'delivered';
  createdAt: string;
}

export interface Seller {
  id: string;
  name: string;
  shopName: string;
  arabicShopName: string;
  email: string;
  phone: string;
  region: MoroccanRegion;
  city: string;
  craftType: string;
  avatar: string;
  status: 'pending' | 'approved' | 'rejected';
  bio: string;
  joinedAt: string;
  experienceYears: number;
}

export interface SellerApplication {
  id: string;
  fullName: string;
  cooperativeName: string;
  city: string;
  region: MoroccanRegion;
  phone: string;
  email: string;
  craftType: string;
  experienceYears: number;
  portfolioDescription: string;
  productSampleCount: number;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

export interface SearchFilters {
  region: MoroccanRegion;
  city: string;
  propertyType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  maxPrice: number;
  amenities: string[];
}

export interface DemandTrend {
  period: string;
  orders: number;
  confirmed: number;
  unconfirmed: number;
  revenue: number;
  profit: number;
  trend: 'up' | 'down' | 'stable';
  changeRate: number; // e.g. +14% or -8%
}
