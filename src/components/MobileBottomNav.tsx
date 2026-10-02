import React from 'react';
import { 
  Home, 
  Building2, 
  Palette, 
  ShoppingBag, 
  BarChart3, 
  Download,
  ShieldCheck,
  Heart
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface MobileBottomNavProps {
  activeTab: 'all' | 'hotels' | 'artisanat' | 'experiences';
  setActiveTab: (tab: 'all' | 'hotels' | 'artisanat' | 'experiences') => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenAPKModal: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  onNavigateSection,
  onOpenAPKModal,
}) => {
  const { cartTotalCount, wishlist, openModal, language } = useStore();

  const isAr = language === 'ar';

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[#E6DEC8] shadow-2xl safe-area-pb">
      <div className="grid grid-cols-5 h-16 max-w-lg mx-auto px-1">
        
        {/* 1. Home / Accueil */}
        <button
          onClick={() => {
            setActiveTab('all');
            onNavigateSection('all');
          }}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            activeTab === 'all'
              ? 'text-[#18392B]'
              : 'text-[#8C7A65] hover:text-[#18392B]'
          }`}
        >
          <Home className={`w-5 h-5 ${activeTab === 'all' ? 'stroke-[2.5]' : ''}`} />
          <span className={`text-[10px] mt-1 font-bold ${activeTab === 'all' ? 'text-[#18392B]' : ''}`}>
            {isAr ? 'الرئيسية' : 'Accueil'}
          </span>
        </button>

        {/* 2. Riads & Stays */}
        <button
          onClick={() => {
            setActiveTab('hotels');
            onNavigateSection('hotels-section');
          }}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            activeTab === 'hotels'
              ? 'text-[#18392B]'
              : 'text-[#8C7A65] hover:text-[#18392B]'
          }`}
        >
          <Building2 className={`w-5 h-5 ${activeTab === 'hotels' ? 'stroke-[2.5]' : ''}`} />
          <span className={`text-[10px] mt-1 font-bold ${activeTab === 'hotels' ? 'text-[#18392B]' : ''}`}>
            {isAr ? 'الرياضات' : 'Riads'}
          </span>
        </button>

        {/* 3. Boutique Crafts */}
        <button
          onClick={() => {
            setActiveTab('artisanat');
            onNavigateSection('artisanat-section');
          }}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            activeTab === 'artisanat'
              ? 'text-[#18392B]'
              : 'text-[#8C7A65] hover:text-[#18392B]'
          }`}
        >
          <Palette className={`w-5 h-5 ${activeTab === 'artisanat' ? 'stroke-[2.5]' : ''}`} />
          <span className={`text-[10px] mt-1 font-bold ${activeTab === 'artisanat' ? 'text-[#18392B]' : ''}`}>
            {isAr ? 'المتجر' : 'Boutique'}
          </span>
        </button>

        {/* 4. Seller / Admin Portal */}
        <button
          onClick={() => openModal({ type: 'seller-dashboard' })}
          className="flex flex-col items-center justify-center py-1 text-[#8C7A65] hover:text-[#18392B] transition-colors relative"
        >
          <BarChart3 className="w-5 h-5" />
          <span className="text-[10px] mt-1 font-bold">
            {isAr ? 'البائع' : 'Vendeur'}
          </span>
        </button>

        {/* 5. Cart / Panier with Badge */}
        <button
          onClick={() => openModal({ type: 'cart' })}
          className="flex flex-col items-center justify-center py-1 text-[#8C7A65] hover:text-[#18392B] transition-colors relative"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-[#18392B]" />
            {cartTotalCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#8C3A27] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs animate-scale">
                {cartTotalCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-1 font-bold text-[#18392B]">
            {isAr ? 'السلة' : 'Panier'}
          </span>
        </button>

      </div>
    </nav>
  );
};
