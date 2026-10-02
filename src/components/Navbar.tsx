import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  MessageSquare, 
  Menu, 
  X, 
  Compass, 
  Sparkles, 
  Building2, 
  Palette, 
  CalendarCheck2, 
  ShieldCheck, 
  PhoneCall,
  UserCheck,
  Store,
  BarChart3,
  Smartphone,
  Download
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Currency, Language } from '../types';

interface NavbarProps {
  activeTab: 'all' | 'hotels' | 'artisanat' | 'experiences';
  setActiveTab: (tab: 'all' | 'hotels' | 'artisanat' | 'experiences') => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  setActiveTab, 
  onNavigateSection 
}) => {
  const { 
    language, 
    setLanguage, 
    currency, 
    setCurrency, 
    cartTotalCount, 
    wishlist, 
    bookings, 
    orders, 
    sellerApplications,
    openModal, 
    getWhatsAppUrl 
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAr = language === 'ar';

  const pendingAppsCount = sellerApplications.filter(a => a.status === 'pending').length;

  const t = {
    fr: {
      stays: 'Séjours & Riads',
      crafts: 'Artisanat d’Art',
      experiences: 'Expériences',
      sellerRegister: 'Devenir Vendeur',
      sellerDashboard: 'Espace Vendeur',
      admin: 'Super Admin',
      contact: 'Concierge WhatsApp',
      announcement: '✨ Dar Diafa • Sanctuaire de l’Hospitalité & de l’Artisanat d’Art à travers les Régions du Maroc',
      tagline: 'L’Art de Recevoir'
    },
    ar: {
      stays: 'الإقامات والرياضات',
      crafts: 'الصناعة التقليدية',
      experiences: 'التجارب الثقافية',
      sellerRegister: 'طلب انضمام بائع',
      sellerDashboard: 'دشبورد البائع',
      admin: 'لوحة تحكم المدير',
      contact: 'واتساب كونسيرج',
      announcement: '✨ دار الضيافة • أصالة الاستقبال المغربي وروائع الصانع التقليدي عبر مختلف أقاليم المملكة',
      tagline: 'أصالة الضيافة'
    },
    en: {
      stays: 'Riads & Stays',
      crafts: 'Artisan Crafts',
      experiences: 'Experiences',
      sellerRegister: 'Join as Seller',
      sellerDashboard: 'Seller Portal',
      admin: 'Super Admin',
      contact: 'WhatsApp Concierge',
      announcement: '✨ Dar Diafa • Moroccan Heritage Stays & Master Crafts across all Regions',
      tagline: 'Art of Hospitality'
    }
  }[language];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs transition-all">
      {/* Top Announcement Bar - Rich Imperial Gradient */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-amber-950 text-amber-100 text-xs font-medium py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-3 border-b border-amber-500/20">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse hidden sm:inline" />
        <span className="truncate font-semibold tracking-normal sm:tracking-wide">{t.announcement}</span>
        <a 
          href={getWhatsAppUrl()} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-amber-300 hover:text-white underline font-bold tracking-wider uppercase ml-1 shrink-0 flex items-center gap-1 transition-colors"
        >
          <PhoneCall className="w-3 h-3 text-amber-400" />
          +212 7 07 68 48 12
        </a>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo with Vibrant Emerald & Gold Seal */}
          <div 
            onClick={() => onNavigateSection('hero')} 
            className="cursor-pointer flex items-center gap-3 group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 via-amber-600 to-emerald-800 text-white border-2 border-amber-300/80 flex items-center justify-center shadow-md shadow-amber-500/25 group-hover:scale-105 group-hover:shadow-amber-500/40 transition-all">
              <span className="font-heading text-2xl font-black tracking-tighter drop-shadow-sm">D</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-xl sm:text-2xl font-black text-emerald-950 tracking-wider uppercase">
                  Dar Diafa
                </span>
                <span className="text-xs font-arabic text-white font-extrabold px-2 py-0.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 shadow-xs">
                  دار الضيافة
                </span>
              </div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-amber-700 font-bold">
                {t.tagline} • Maroc Authentique
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-amber-50/80 p-1.5 rounded-full border border-amber-200/80 shadow-xs">
            <button
              onClick={() => {
                setActiveTab('all');
                onNavigateSection('all');
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all ${
                activeTab === 'all'
                  ? 'bg-gradient-to-r from-emerald-800 to-teal-800 text-white shadow-md shadow-emerald-900/25'
                  : 'text-stone-700 hover:text-emerald-900 hover:bg-white/80'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Compass className={`w-3.5 h-3.5 ${activeTab === 'all' ? 'text-amber-300' : 'text-amber-600'}`} />
                {isAr ? 'الكل' : 'Découvrir'}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('hotels');
                onNavigateSection('hotels-section');
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all ${
                activeTab === 'hotels'
                  ? 'bg-gradient-to-r from-emerald-800 to-teal-800 text-white shadow-md shadow-emerald-900/25'
                  : 'text-stone-700 hover:text-emerald-900 hover:bg-white/80'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Building2 className={`w-3.5 h-3.5 ${activeTab === 'hotels' ? 'text-amber-300' : 'text-amber-600'}`} />
                {t.stays}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('artisanat');
                onNavigateSection('artisanat-section');
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all ${
                activeTab === 'artisanat'
                  ? 'bg-gradient-to-r from-emerald-800 to-teal-800 text-white shadow-md shadow-emerald-900/25'
                  : 'text-stone-700 hover:text-emerald-900 hover:bg-white/80'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Palette className={`w-3.5 h-3.5 ${activeTab === 'artisanat' ? 'text-amber-300' : 'text-amber-600'}`} />
                {t.crafts}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('experiences');
                onNavigateSection('experiences-section');
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all ${
                activeTab === 'experiences'
                  ? 'bg-gradient-to-r from-emerald-800 to-teal-800 text-white shadow-md shadow-emerald-900/25'
                  : 'text-stone-700 hover:text-emerald-900 hover:bg-white/80'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <CalendarCheck2 className={`w-3.5 h-3.5 ${activeTab === 'experiences' ? 'text-amber-300' : 'text-amber-600'}`} />
                {t.experiences}
              </span>
            </button>
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            
            {/* Currency selector */}
            <select
              aria-label="Devise"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="text-xs font-bold bg-white text-emerald-950 border border-amber-300 rounded-xl px-2 py-1.5 focus:outline-none cursor-pointer hover:border-amber-500 shadow-xs"
            >
              <option value="MAD">MAD (د.م)</option>
              <option value="EUR">EUR (€)</option>
              <option value="USD">USD ($)</option>
            </select>

            {/* Language Switcher */}
            <div className="flex items-center bg-white rounded-xl p-0.5 border border-amber-300 shadow-xs">
              {(['fr', 'ar', 'en'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2 py-1 text-xs rounded-lg font-bold transition-all ${
                    language === lang 
                      ? 'bg-emerald-800 text-white shadow-xs' 
                      : 'text-stone-600 hover:text-emerald-900'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            {/* INSTALL APK BUTTON - Vibrant Eye-Catching Gold & Amber Glow */}
            <button
              onClick={() => openModal({ type: 'apk-install' })}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-stone-950 font-black text-xs transition-all shadow-md shadow-amber-500/30 hover:scale-105 active:scale-95 group cursor-pointer border border-amber-300/80"
              title="Télécharger l'Application APK / تثبيت التطبيق"
            >
              <Smartphone className="w-3.5 h-3.5 text-stone-950 group-hover:rotate-12 transition-transform" />
              <span className="hidden md:inline">{isAr ? 'تثبيت التطبيق' : 'Installer l’App'}</span>
              <span className="text-[9px] bg-stone-950 text-amber-300 px-1.5 py-0.5 rounded font-black tracking-wide">APK</span>
            </button>

            {/* SELLER DASHBOARD BUTTON */}
            <button
              onClick={() => openModal({ type: 'seller-dashboard' })}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border-2 border-amber-300 hover:border-amber-500 text-stone-800 hover:text-amber-800 text-xs font-bold transition-all hover:bg-amber-50/50 shadow-xs"
              title="Tableau de bord Vendeur (Prix de revient, Bénéfice, Confirmation)"
            >
              <BarChart3 className="w-3.5 h-3.5 text-amber-600" />
              <span>{t.sellerDashboard}</span>
            </button>

            {/* SUPER ADMIN BUTTON */}
            <button
              onClick={() => openModal({ type: 'admin-dashboard' })}
              className="relative p-2 rounded-xl bg-white border-2 border-emerald-300 hover:border-emerald-500 text-emerald-900 hover:bg-emerald-50 transition-all shadow-xs"
              title="Super Admin Dashboard (Clients, Vendeurs, Approbations)"
            >
              <ShieldCheck className="w-5 h-5 text-emerald-800" />
              {pendingAppsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-600 to-rose-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-pulse shadow-xs">
                  {pendingAppsCount}
                </span>
              )}
            </button>

            {/* Wishlist */}
            <button
              onClick={() => openModal({ type: 'wishlist' })}
              className="relative p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors shadow-xs"
              title="Favoris"
            >
              <Heart className="w-5 h-5 fill-rose-500 text-rose-600" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button - Rich Emerald & Gold Counter */}
            <button
              onClick={() => openModal({ type: 'cart' })}
              className="relative flex items-center gap-2 bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 hover:from-emerald-700 hover:to-teal-700 text-white px-4 py-2 rounded-xl transition-all shadow-md shadow-emerald-900/30 group border border-emerald-700/80 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-black bg-amber-400 text-stone-950 px-1.5 py-0.5 rounded-full min-w-[20px] text-center shadow-xs">
                {cartTotalCount}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-emerald-950 bg-amber-50 border border-amber-300 hover:bg-amber-100 rounded-xl transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-gradient-to-b from-white via-amber-50/60 to-amber-100/40 border-b border-amber-300 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setActiveTab('all');
                onNavigateSection('all');
                setMobileMenuOpen(false);
              }}
              className="p-3 text-left rounded-xl bg-white text-emerald-950 font-bold text-xs flex items-center gap-2 border border-amber-200 shadow-xs hover:border-amber-400"
            >
              <Compass className="w-4 h-4 text-amber-600" />
              Découvrir
            </button>
            <button
              onClick={() => {
                setActiveTab('hotels');
                onNavigateSection('hotels-section');
                setMobileMenuOpen(false);
              }}
              className="p-3 text-left rounded-xl bg-white text-emerald-950 font-bold text-xs flex items-center gap-2 border border-amber-200 shadow-xs hover:border-amber-400"
            >
              <Building2 className="w-4 h-4 text-amber-600" />
              {t.stays}
            </button>
            <button
              onClick={() => {
                setActiveTab('artisanat');
                onNavigateSection('artisanat-section');
                setMobileMenuOpen(false);
              }}
              className="p-3 text-left rounded-xl bg-white text-emerald-950 font-bold text-xs flex items-center gap-2 border border-amber-200 shadow-xs hover:border-amber-400"
            >
              <Palette className="w-4 h-4 text-amber-600" />
              {t.crafts}
            </button>
            <button
              onClick={() => {
                setActiveTab('experiences');
                onNavigateSection('experiences-section');
                setMobileMenuOpen(false);
              }}
              className="p-3 text-left rounded-xl bg-white text-emerald-950 font-bold text-xs flex items-center gap-2 border border-amber-200 shadow-xs hover:border-amber-400"
            >
              <CalendarCheck2 className="w-4 h-4 text-amber-600" />
              {t.experiences}
            </button>
          </div>

          {/* Direct APK Install Button in Mobile Menu - Glowing Gold & Amber */}
          <button
            onClick={() => {
              openModal({ type: 'apk-install' });
              setMobileMenuOpen(false);
            }}
            className="w-full p-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 text-stone-950 font-black text-xs flex items-center justify-between shadow-md shadow-amber-500/30 border border-amber-300"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-stone-950 text-amber-300 flex items-center justify-center">
                <Smartphone className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block font-black text-stone-950 text-xs">
                  {isAr ? 'تثبيت التطبيق (نسخة APK)' : 'Installer l’Application APK'}
                </span>
                <span className="text-[10px] text-amber-950/80 font-bold">
                  {isAr ? 'تصفح أسرع وتجربة سلسة' : 'Accès instantané & Mode Hors-ligne'}
                </span>
              </div>
            </div>
            <span className="px-2 py-1 rounded-lg bg-stone-950 text-amber-300 text-[10px] font-black uppercase tracking-wider">
              INSTALL
            </span>
          </button>

          <div className="pt-2 border-t border-amber-200 flex flex-col gap-2">
            <button
              onClick={() => {
                openModal({ type: 'seller-dashboard' });
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-white border border-[#A8582C] text-[#18392B] font-bold text-xs flex items-center justify-center gap-2"
            >
              <BarChart3 className="w-4 h-4 text-[#A8582C]" />
              <span>{t.sellerDashboard} (Espace Artisan)</span>
            </button>

            <button
              onClick={() => {
                openModal({ type: 'admin-dashboard' });
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-[#18392B] text-white font-bold text-xs flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#D4A373]" />
              <span>{t.admin} (Superviseur & Validation Vendeurs)</span>
            </button>

            <button
              onClick={() => {
                openModal({ type: 'seller-register' });
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-[#FAF7F2] border border-[#E0D5C1] text-[#18392B] font-semibold text-xs flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4 text-[#A8582C]" />
              <span>{t.sellerRegister}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
