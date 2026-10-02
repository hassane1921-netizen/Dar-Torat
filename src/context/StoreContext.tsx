import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Hotel, 
  Product, 
  Activity, 
  CartItem, 
  Booking, 
  Order, 
  Seller,
  SellerApplication, 
  Currency, 
  Language, 
  SearchFilters,
  MoroccanRegion,
  DemandTrend
} from '../types';
import { 
  HOTELS, 
  PRODUCTS, 
  ACTIVITIES, 
  INITIAL_SELLERS,
  DEMAND_TRENDS_DATA,
  CURRENCY_RATES, 
  WHATSAPP_LINK 
} from '../data/mockData';

export type ModalType = 
  | null 
  | { type: 'cart' }
  | { type: 'checkout' }
  | { type: 'wishlist' }
  | { type: 'seller-register' }
  | { type: 'seller-dashboard'; sellerId?: string }
  | { type: 'admin-dashboard' }
  | { type: 'add-product'; sellerId: string }
  | { type: 'hotel'; hotel: Hotel }
  | { type: 'product'; product: Product }
  | { type: 'booking-success'; booking: Booking }
  | { type: 'order-success'; order: Order }
  | { type: 'apk-install' };

export interface CustomerProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  region?: string;
  totalSpent: number;
  totalOrders: number;
  lastOrderDate: string;
  status: 'active' | 'vip' | 'new';
}

interface ToastNotification {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

interface StoreContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  formatPrice: (amountInMAD: number) => string;
  
  // Products & Stays
  products: Product[];
  hotels: Hotel[];
  activities: Activity[];
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviewsCount' | 'inStock'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;

  // Sellers
  sellers: Seller[];
  activeSellerId: string;
  setActiveSellerId: (id: string) => void;
  currentSeller: Seller | undefined;
  approveSeller: (sellerId: string) => void;
  rejectSeller: (sellerId: string) => void;

  // Regions & Filtering
  selectedRegion: MoroccanRegion;
  setSelectedRegion: (region: MoroccanRegion) => void;
  searchFilters: SearchFilters;
  setSearchFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;

  // Cart operations
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  cartTotalCount: number;
  cartSubtotalMAD: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;

  // Bookings & Orders
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'bookingRef' | 'createdAt' | 'status'>) => Booking;
  updateBookingStatus: (id: string, status: 'confirmed' | 'pending' | 'cancelled') => void;

  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status' | 'costTotal' | 'profitTotal'>) => Order;
  updateOrderStatus: (id: string, status: 'confirmed' | 'pending' | 'cancelled' | 'delivered') => void;

  // Seller Applications (Waitlist before admin approval)
  sellerApplications: SellerApplication[];
  addSellerApplication: (app: Omit<SellerApplication, 'id' | 'submittedAt' | 'status'>) => void;
  approveApplication: (appId: string) => void;

  // Customers database
  customers: CustomerProfile[];

  // Modals & UI
  activeModal: ModalType;
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
  toasts: ToastNotification[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  getWhatsAppUrl: (message?: string) => string;
  demandTrends: DemandTrend[];
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('dar_diafa_lang') as Language) || 'fr';
  });

  const [currency, setCurrencyState] = useState<Currency>(() => {
    return (localStorage.getItem('dar_diafa_currency') as Currency) || 'MAD';
  });

  const [selectedRegion, setSelectedRegion] = useState<MoroccanRegion>('Toutes');

  const [sellers, setSellers] = useState<Seller[]>(() => {
    try {
      const saved = localStorage.getItem('dar_diafa_sellers_list');
      return saved ? JSON.parse(saved) : INITIAL_SELLERS;
    } catch {
      return INITIAL_SELLERS;
    }
  });

  const [activeSellerId, setActiveSellerId] = useState<string>('seller-1');

  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('dar_diafa_products_list');
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('dar_diafa_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dar_diafa_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('dar_diafa_bookings');
      return saved ? JSON.parse(saved) : [
        {
          id: 'b-demo-1',
          bookingRef: 'DIAFA-7492-FES',
          hotelId: '1',
          hotelName: 'Riad Sidi Bou',
          hotelCity: 'Fès',
          hotelRegion: 'Fès-Meknès',
          roomName: 'Suite Royale Al-Andalous',
          checkIn: '2026-10-15',
          checkOut: '2026-10-18',
          nights: 3,
          guests: 2,
          pricePerNight: 1250,
          totalPrice: 3750,
          guestName: 'Claire de Montmirail',
          guestEmail: 'claire.montmirail@example.com',
          guestPhone: '+33 6 12 34 56 78',
          specialRequests: 'Arrivée tardive vers 21h, thé d’accueil souhaité.',
          includeBreakfast: true,
          includeAirportTransfer: true,
          status: 'confirmed',
          createdAt: '2026-10-01'
        },
        {
          id: 'b-demo-2',
          bookingRef: 'DIAFA-3821-KECH',
          hotelId: '5',
          hotelName: 'Riad Kasbah Marrakech',
          hotelCity: 'Marrakech',
          hotelRegion: 'Marrakech-Safi',
          roomName: 'Suite Menara',
          checkIn: '2026-10-22',
          checkOut: '2026-10-25',
          nights: 3,
          guests: 2,
          pricePerNight: 1100,
          totalPrice: 3300,
          guestName: 'Tariq Mansour',
          guestEmail: 'tariq.mansour@dubai-travel.ae',
          guestPhone: '+971 50 123 4567',
          specialRequests: 'Transfert aéroport Menara demandé.',
          includeBreakfast: true,
          includeAirportTransfer: true,
          status: 'pending',
          createdAt: '2026-10-02'
        }
      ];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('dar_diafa_orders');
      return saved ? JSON.parse(saved) : [
        {
          id: 'ord-demo-1',
          orderNumber: 'CMD-DIAFA-8421',
          items: [
            { product: PRODUCTS[0], quantity: 2 }, // Zellige: price 320, cost 180
            { product: PRODUCTS[1], quantity: 1 }  // Babouches: price 380, cost 210
          ],
          subtotal: 1020,
          costTotal: 570,
          profitTotal: 450,
          shippingCost: 0,
          discount: 0,
          total: 1020,
          currency: 'MAD',
          shippingMethod: 'express_morocco',
          paymentMethod: 'cod',
          customer: {
            fullName: 'Mehdi Benkiran',
            email: 'mehdi.benkiran@example.ma',
            phone: '+212 6 61 23 45 67',
            address: 'Boulevard d’Anfa, Résidence Les Palmiers',
            city: 'Casablanca',
            region: 'Rabat-Salé-Kénitra',
            country: 'Maroc'
          },
          status: 'confirmed',
          createdAt: '2026-09-28'
        },
        {
          id: 'ord-demo-2',
          orderNumber: 'CMD-DIAFA-9104',
          items: [
            { product: PRODUCTS[2], quantity: 1 } // Tapis: price 2400, cost 1450
          ],
          subtotal: 2400,
          costTotal: 1450,
          profitTotal: 950,
          shippingCost: 0,
          discount: 0,
          total: 2400,
          currency: 'MAD',
          shippingMethod: 'express_morocco',
          paymentMethod: 'card',
          customer: {
            fullName: 'Sarah Jenkins',
            email: 'sarah.j@londonart.co.uk',
            phone: '+44 7700 900123',
            address: '42 Kensington Gardens',
            city: 'Londres',
            country: 'Royaume-Uni'
          },
          status: 'confirmed',
          createdAt: '2026-09-30'
        },
        {
          id: 'ord-demo-3',
          orderNumber: 'CMD-DIAFA-6532',
          items: [
            { product: PRODUCTS[3], quantity: 1 } // Service à thé: price 850, cost 480
          ],
          subtotal: 850,
          costTotal: 480,
          profitTotal: 370,
          shippingCost: 40,
          discount: 0,
          total: 890,
          currency: 'MAD',
          shippingMethod: 'express_morocco',
          paymentMethod: 'cod',
          customer: {
            fullName: 'Younes Amrani',
            email: 'younes.amrani@gmail.com',
            phone: '+212 6 75 33 22 11',
            address: 'Quartier Hassan, Av. Mohammed V',
            city: 'Rabat',
            region: 'Rabat-Salé-Kénitra',
            country: 'Maroc'
          },
          status: 'pending', // Non-confirmed yet
          createdAt: '2026-10-02'
        }
      ];
    } catch {
      return [];
    }
  });

  const [sellerApplications, setSellerApplications] = useState<SellerApplication[]>(() => {
    try {
      const saved = localStorage.getItem('dar_diafa_seller_apps');
      return saved ? JSON.parse(saved) : [
        {
          id: 'app-demo-1',
          fullName: 'Moulay Hicham Berbouch',
          cooperativeName: 'Atelier Cuir & Maroquinerie de Marrakech',
          city: 'Marrakech',
          region: 'Marrakech-Safi',
          phone: '+212 6 61 77 44 11',
          email: 'hicham.berbouch@kech-artisan.ma',
          craftType: 'Maroquinerie & Décoration',
          experienceYears: 20,
          portfolioDescription: 'Fabrication de poufs en cuir véritable tanné artisanalement et coussins berbères.',
          productSampleCount: 18,
          status: 'pending',
          submittedAt: '2026-09-28'
        },
        {
          id: 'app-demo-2',
          fullName: 'Rachida Alami',
          cooperativeName: 'Tissages Bleus de Chefchaouen',
          city: 'Chefchaouen',
          region: 'Tanger-Tétouan-Al Hoceïma',
          phone: '+212 6 72 33 66 99',
          email: 'rachida.alami@chaouen-crafts.ma',
          craftType: 'Textile & Tissages du Rif',
          experienceYears: 24,
          portfolioDescription: 'Couvertures traditionnelles et mendils en coton et laine filée main.',
          productSampleCount: 12,
          status: 'pending',
          submittedAt: '2026-10-01'
        }
      ];
    } catch {
      return [];
    }
  });

  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    region: 'Toutes',
    city: 'Toutes',
    propertyType: 'Tous',
    checkIn: '',
    checkOut: '',
    guests: 2,
    maxPrice: 3000,
    amenities: []
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('dar_diafa_sellers_list', JSON.stringify(sellers));
  }, [sellers]);

  useEffect(() => {
    localStorage.setItem('dar_diafa_products_list', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('dar_diafa_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('dar_diafa_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('dar_diafa_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('dar_diafa_seller_apps', JSON.stringify(sellerApplications));
  }, [sellerApplications]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('dar_diafa_lang', lang);
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = lang;
    }
  };

  const setCurrency = (curr: Currency) => {
    setCurrencyState(curr);
    localStorage.setItem('dar_diafa_currency', curr);
  };

  const formatPrice = (amountInMAD: number): string => {
    if (currency === 'EUR') {
      const converted = Math.round(amountInMAD * CURRENCY_RATES.EUR);
      return `${converted.toLocaleString('fr-FR')} €`;
    }
    if (currency === 'USD') {
      const converted = Math.round(amountInMAD * CURRENCY_RATES.USD);
      return `$${converted.toLocaleString('en-US')}`;
    }
    return `${amountInMAD.toLocaleString('fr-FR')} MAD`;
  };

  // Active seller helper
  const currentSeller = sellers.find(s => s.id === activeSellerId) || sellers[0];

  // Admin approves seller application -> creates approved seller!
  const approveSeller = (sellerId: string) => {
    setSellers(prev => prev.map(s => s.id === sellerId ? { ...s, status: 'approved' } : s));
    showToast(`Vendeur approuvé avec succès ! Il peut maintenant publier des produits.`, 'success');
  };

  const rejectSeller = (sellerId: string) => {
    setSellers(prev => prev.map(s => s.id === sellerId ? { ...s, status: 'rejected' } : s));
    showToast(`Statut du vendeur mis à jour (Rejeté).`, 'info');
  };

  const approveApplication = (appId: string) => {
    const app = sellerApplications.find(a => a.id === appId);
    if (!app) return;

    // Check if seller already exists
    const existing = sellers.find(s => s.email === app.email);
    if (existing) {
      setSellers(prev => prev.map(s => s.id === existing.id ? { ...s, status: 'approved' } : s));
    } else {
      const newSeller: Seller = {
        id: 'seller-' + Date.now(),
        name: app.fullName,
        shopName: app.cooperativeName || `Atelier ${app.fullName}`,
        arabicShopName: `ورشة ${app.fullName}`,
        email: app.email,
        phone: app.phone,
        region: app.region,
        city: app.city,
        craftType: app.craftType,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
        status: 'approved',
        bio: app.portfolioDescription,
        joinedAt: new Date().toISOString().split('T')[0],
        experienceYears: app.experienceYears
      };
      setSellers(prev => [...prev, newSeller]);
    }

    setSellerApplications(prev => prev.map(a => a.id === appId ? { ...a, status: 'approved' } : a));
    showToast(`Candidature de ${app.fullName} approuvée ! Le vendeur est désormais actif.`, 'success');
  };

  // Add Product by a Seller
  const addProduct = (productData: Omit<Product, 'id' | 'rating' | 'reviewsCount' | 'inStock'>) => {
    const seller = sellers.find(s => s.id === productData.sellerId);
    if (seller && seller.status !== 'approved') {
      showToast('Action impossible : Vous devez attendre l’approbation de l’administrateur avant de publier des produits.', 'warning');
      return;
    }

    const newProd: Product = {
      ...productData,
      id: 'p-' + Date.now(),
      rating: 5.0,
      reviewsCount: 1,
      inStock: true
    };
    setProducts(prev => [newProd, ...prev]);
    showToast(`Produit "${newProd.name}" publié avec succès dans votre boutique !`, 'success');
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    showToast('Produit mis à jour avec succès.', 'success');
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, selectedColor?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prev, { product, quantity, selectedColor }];
    });
    showToast(`${product.name} ajouté au panier !`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Article retiré du panier', 'info');
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => setCart([]);

  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotalMAD = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  // Wishlist
  const toggleWishlist = (id: string) => {
    setWishlist(prev => {
      if (prev.includes(id)) {
        showToast('Retiré de vos favoris', 'info');
        return prev.filter(i => i !== id);
      } else {
        showToast('Ajouté à vos favoris ❤️', 'success');
        return [...prev, id];
      }
    });
  };

  const isInWishlist = (id: string) => wishlist.includes(id);

  // Bookings
  const addBooking = (bookingData: Omit<Booking, 'id' | 'bookingRef' | 'createdAt' | 'status'>): Booking => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const cityCode = (bookingData.hotelCity || 'FES').toUpperCase().substring(0, 3);
    const newBooking: Booking = {
      ...bookingData,
      id: 'b-' + Date.now(),
      bookingRef: `DIAFA-${randomDigits}-${cityCode}`,
      status: 'confirmed',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setBookings(prev => [newBooking, ...prev]);
    showToast(`Réservation ${newBooking.bookingRef} confirmée !`, 'success');
    return newBooking;
  };

  const updateBookingStatus = (id: string, status: 'confirmed' | 'pending' | 'cancelled') => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    showToast(`Statut de la réservation mis à jour : ${status}`, 'info');
  };

  // Orders
  const addOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status' | 'costTotal' | 'profitTotal'>): Order => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    
    // Calculate total cost and profit
    const costTotal = orderData.items.reduce((sum, i) => sum + ((i.product.costPrice || (i.product.price * 0.6)) * i.quantity), 0);
    const profitTotal = orderData.subtotal - costTotal;

    const newOrder: Order = {
      ...orderData,
      id: 'ord-' + Date.now(),
      orderNumber: `CMD-DIAFA-${randomNum}`,
      costTotal,
      profitTotal,
      status: 'confirmed',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    showToast(`Commande ${newOrder.orderNumber} enregistrée !`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (id: string, status: 'confirmed' | 'pending' | 'cancelled' | 'delivered') => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : b(o, status)));
    showToast(`Statut de la commande mis à jour : ${status}`, 'info');
  };

  const b = (o: Order, status: any) => ({ ...o, status });

  // Seller applications
  const addSellerApplication = (appData: Omit<SellerApplication, 'id' | 'submittedAt' | 'status'>) => {
    const newApp: SellerApplication = {
      ...appData,
      id: 'app-' + Date.now(),
      status: 'pending',
      submittedAt: new Date().toISOString().split('T')[0]
    };
    setSellerApplications(prev => [newApp, ...prev]);
    showToast('Candidature soumise ! En attente d’approbation par l’administrateur avant publication de produits.', 'success');
  };

  // All unique customers aggregated
  const customers: CustomerProfile[] = React.useMemo(() => {
    const map = new Map<string, CustomerProfile>();
    
    orders.forEach(o => {
      const email = o.customer.email.toLowerCase();
      if (!map.has(email)) {
        map.set(email, {
          id: 'cust-' + email,
          fullName: o.customer.fullName,
          email: o.customer.email,
          phone: o.customer.phone,
          city: o.customer.city,
          region: o.customer.region,
          totalSpent: o.total,
          totalOrders: 1,
          lastOrderDate: o.createdAt,
          status: o.total > 2000 ? 'vip' : 'active'
        });
      } else {
        const exist = map.get(email)!;
        exist.totalSpent += o.total;
        exist.totalOrders += 1;
        if (exist.totalSpent > 2000) exist.status = 'vip';
      }
    });

    bookings.forEach(b => {
      const email = b.guestEmail.toLowerCase();
      if (!map.has(email)) {
        map.set(email, {
          id: 'cust-' + email,
          fullName: b.guestName,
          email: b.guestEmail,
          phone: b.guestPhone,
          city: b.hotelCity,
          totalSpent: b.totalPrice,
          totalOrders: 1,
          lastOrderDate: b.createdAt,
          status: b.totalPrice > 3000 ? 'vip' : 'active'
        });
      } else {
        const exist = map.get(email)!;
        exist.totalSpent += b.totalPrice;
        exist.totalOrders += 1;
        if (exist.totalSpent > 3000) exist.status = 'vip';
      }
    });

    return Array.from(map.values());
  }, [orders, bookings]);

  const getWhatsAppUrl = (message?: string) => {
    if (!message) {
      return `${WHATSAPP_LINK}?text=${encodeURIComponent("Bonjour Dar Diafa, je souhaite avoir des renseignements sur vos séjours et vos artisans.")}`;
    }
    return `${WHATSAPP_LINK}?text=${encodeURIComponent(message)}`;
  };

  return (
    <StoreContext.Provider value={{
      language,
      setLanguage,
      currency,
      setCurrency,
      formatPrice,
      products,
      hotels: HOTELS,
      activities: ACTIVITIES,
      addProduct,
      updateProduct,
      sellers,
      activeSellerId,
      setActiveSellerId,
      currentSeller,
      approveSeller,
      rejectSeller,
      selectedRegion,
      setSelectedRegion,
      searchFilters,
      setSearchFilters,
      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      cartTotalCount,
      cartSubtotalMAD,
      wishlist,
      toggleWishlist,
      isInWishlist,
      bookings,
      addBooking,
      updateBookingStatus,
      orders,
      addOrder,
      updateOrderStatus,
      sellerApplications,
      addSellerApplication,
      approveApplication,
      customers,
      activeModal,
      openModal: setActiveModal,
      closeModal: () => setActiveModal(null),
      toasts,
      showToast,
      getWhatsAppUrl,
      demandTrends: DEMAND_TRENDS_DATA
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
