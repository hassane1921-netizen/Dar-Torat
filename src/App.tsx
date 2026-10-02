import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HotelsSection } from './components/HotelsSection';
import { HotelDetailModal } from './components/HotelDetailModal';
import { ArtisanatSection } from './components/ArtisanatSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ExperiencesSection } from './components/ExperiencesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { BookingSuccessModal } from './components/BookingSuccessModal';
import { SellerModal } from './components/SellerModal';
import { SellerDashboardModal } from './components/SellerDashboardModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { WishlistModal } from './components/WishlistModal';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { MobileBottomNav } from './components/MobileBottomNav';
import { APKInstallModal } from './components/APKInstallModal';
import { Footer } from './components/Footer';
import { Hotel, Product, MoroccanRegion } from './types';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';

const AppContent: React.FC = () => {
  const { 
    activeModal, 
    openModal, 
    closeModal, 
    hotels, 
    products, 
    toasts,
    setSelectedRegion 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'all' | 'hotels' | 'artisanat' | 'experiences'>('all');
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleNavigateSection = (sectionId: string) => {
    if (sectionId === 'all') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectHotelById = (hotelId: string) => {
    const found = hotels.find(h => h.id === hotelId);
    if (found) setSelectedHotel(found);
  };

  const handleSelectProductById = (productId: string) => {
    const found = products.find(p => p.id === productId);
    if (found) setSelectedProduct(found);
  };

  const handleSelectRegion = (region: MoroccanRegion) => {
    setSelectedRegion(region);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFDF9] via-[#FAF6F0] to-[#F5ECE0] text-stone-900 flex flex-col font-body selection:bg-amber-400/40 selection:text-emerald-950">
      
      {/* Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onNavigateSection={handleNavigateSection} 
      />

      {/* Hero with Visual-First Imagery & Region Selector */}
      <Hero 
        onSearchClick={() => handleNavigateSection('hotels-section')}
        onSelectRegion={handleSelectRegion}
        onNavigateSection={handleNavigateSection}
      />

      {/* Main Content Sections depending on activeTab or all */}
      <main className="flex-1 pb-20 lg:pb-0">
        {(activeTab === 'all' || activeTab === 'hotels') && (
          <HotelsSection onSelectHotel={(hotel) => setSelectedHotel(hotel)} />
        )}

        {(activeTab === 'all' || activeTab === 'artisanat') && (
          <ArtisanatSection onSelectProduct={(product) => setSelectedProduct(product)} />
        )}

        {(activeTab === 'all' || activeTab === 'experiences') && (
          <ExperiencesSection />
        )}

        {activeTab === 'all' && (
          <TestimonialsSection />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigateSection={handleNavigateSection} />

      {/* Native Mobile Bottom Navigation Bar (APK Phone App Experience) */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNavigateSection={handleNavigateSection}
        onOpenAPKModal={() => openModal({ type: 'apk-install' })}
      />

      {/* Sticky Floating WhatsApp Concierge */}
      <WhatsAppFloat />

      {/* Toast Notification Container */}
      <div className="fixed top-24 right-4 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto bg-white/95 backdrop-blur-md border border-[#E6DEC8] p-3.5 rounded-2xl shadow-xl flex items-center gap-3 text-xs font-semibold text-[#18392B] animate-in slide-in-from-top-2 duration-200"
          >
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#24533E] shrink-0" />}
            {toast.type === 'warning' && <AlertTriangle className="w-4 h-4 text-[#D4A373] shrink-0" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-[#18392B] shrink-0" />}
            <span className="flex-1">{toast.message}</span>
          </div>
        ))}
      </div>

      {/* Modals */}
      {selectedHotel && (
        <HotelDetailModal 
          hotel={selectedHotel} 
          onClose={() => setSelectedHotel(null)} 
        />
      )}

      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}

      {activeModal?.type === 'cart' && (
        <CartDrawer 
          onClose={closeModal} 
          onProceedToCheckout={() => openModal({ type: 'checkout' })} 
        />
      )}

      {activeModal?.type === 'checkout' && (
        <CheckoutModal 
          onClose={closeModal} 
        />
      )}

      {activeModal?.type === 'booking-success' && (
        <BookingSuccessModal 
          booking={activeModal.booking} 
          onClose={closeModal} 
        />
      )}

      {activeModal?.type === 'seller-register' && (
        <SellerModal 
          onClose={closeModal} 
        />
      )}

      {/* Dedicated Seller Dashboard with confirmation analytics, cost price, profit, and demand trends */}
      {activeModal?.type === 'seller-dashboard' && (
        <SellerDashboardModal 
          onClose={closeModal} 
        />
      )}

      {/* Super Admin Dashboard with full customer database, vendor approvals, and platform overview */}
      {activeModal?.type === 'admin-dashboard' && (
        <AdminDashboardModal 
          onClose={closeModal} 
        />
      )}

      {activeModal?.type === 'wishlist' && (
        <WishlistModal 
          onClose={closeModal}
          onSelectHotel={handleSelectHotelById}
          onSelectProduct={handleSelectProductById}
        />
      )}

      {/* Native Mobile APK Installation Modal */}
      {activeModal?.type === 'apk-install' && (
        <APKInstallModal 
          onClose={closeModal} 
        />
      )}

    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
