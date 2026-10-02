import React from 'react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  Sparkles, 
  ArrowRight,
  Compass,
  CheckCircle2,
  Smartphone,
  ShieldCheck,
  Truck,
  CreditCard,
  Building2,
  Palette
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { MoroccanRegion } from '../types';
import { MOROCCAN_REGIONS } from '../data/mockData';

interface HeroProps {
  onSearchClick: () => void;
  onSelectRegion: (region: MoroccanRegion) => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onSearchClick, 
  onSelectRegion,
  onNavigateSection 
}) => {
  const { 
    language, 
    selectedRegion, 
    setSelectedRegion, 
    searchFilters, 
    setSearchFilters,
    openModal 
  } = useStore();

  const isAr = language === 'ar';

  const t = {
    fr: {
      badge: "L'Excellence du Royaume du Maroc",
      headline: "L'Âme du Maroc Authentique",
      subline: "Riads de prestige & chefs-d'œuvre uniques des Maâlems à travers toutes les régions.",
      chooseRegion: "Sélectionner un Territoire",
      allRegions: "Tous les Territoires du Royaume",
      checkIn: "Date Arrivée",
      guests: "Voyageurs",
      searchBtn: "Explorer les Riads & Trésors",
      apkBadge: "App APK Disponible",
      installApp: "Installer l'App",
      tag1: "100% Maâlem Fait Main",
      tag2: "Livraison Partout au Maroc",
      tag3: "Paiement à la Livraison"
    },
    ar: {
      badge: "أصالة وفخامة المملكة المغربية",
      headline: "سحر المغرب الأصيل",
      subline: "رياضات وقصور عريقة وتحف نادرة بأيدي كبار المعلمين عبر كافة أقاليم المملكة.",
      chooseRegion: "اختر الإقليم أو الجهة",
      allRegions: "جميع أقاليم وجهات المملكة",
      checkIn: "تاريخ الوصول",
      guests: "الضيوف",
      searchBtn: "اكتشف الرياضات والتحف",
      apkBadge: "تطبيق APK متوفر",
      installApp: "تثبيت التطبيق",
      tag1: "صناعة يدوية 100%",
      tag2: "توصيل لكافة المدن",
      tag3: "الدفع عند الاستلام"
    },
    en: {
      badge: "The Essence of the Kingdom of Morocco",
      headline: "The Soul of Authentic Morocco",
      subline: "Heritage Riads & handcrafted masterworks across every region of Morocco.",
      chooseRegion: "Select Region or Territory",
      allRegions: "All Moroccan Regions",
      checkIn: "Check-in Date",
      guests: "Guests",
      searchBtn: "Explore Riads & Treasures",
      apkBadge: "APK App Available",
      installApp: "Install App",
      tag1: "100% Handcrafted by Maâlems",
      tag2: "Delivery Across Morocco",
      tag3: "Cash on Delivery"
    }
  }[language];

  // Highlights / Stories Reels
  const stories = [
    { 
      id: 'riads', 
      label: isAr ? 'رياضات عريقة' : 'Riads Royaux', 
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=200&q=80',
      action: () => onNavigateSection ? onNavigateSection('hotels-section') : onSearchClick()
    },
    { 
      id: 'zellige', 
      label: isAr ? 'زليج وفخار' : 'Zellige Fassi', 
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80',
      action: () => onNavigateSection ? onNavigateSection('artisanat-section') : onSearchClick()
    },
    { 
      id: 'cuir', 
      label: isAr ? 'مصنوعات جلدية' : 'Cuir & Babouches', 
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&q=80',
      action: () => onNavigateSection ? onNavigateSection('artisanat-section') : onSearchClick()
    },
    { 
      id: 'cuivre', 
      label: isAr ? 'نحاس الصفارين' : 'Dinanderie', 
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&q=80',
      action: () => onNavigateSection ? onNavigateSection('artisanat-section') : onSearchClick()
    },
    { 
      id: 'tapis', 
      label: isAr ? 'زرابي الأطلس' : 'Tapis Berbères', 
      image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=200&q=80',
      action: () => onNavigateSection ? onNavigateSection('artisanat-section') : onSearchClick()
    },
    { 
      id: 'argan', 
      label: isAr ? 'أركان طبيعي' : 'Terroir & Argan', 
      image: 'https://images.unsplash.com/photo-1608248597359-009941dfc1a4?w=200&q=80',
      action: () => onNavigateSection ? onNavigateSection('artisanat-section') : onSearchClick()
    },
    { 
      id: 'apk', 
      label: isAr ? 'تثبيت APK' : 'Installer APK', 
      image: '/icon.svg',
      isSpecial: true,
      action: () => openModal({ type: 'apk-install' })
    }
  ];

  return (
    <section className="relative px-3 sm:px-6 lg:px-8 pt-2 pb-8 sm:pb-14 max-w-7xl mx-auto space-y-4">
      
      {/* 1. Mobile & Tablet App Stories Highlights Bar - Vibrant Eye-Catching Rings */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 px-1 scrollbar-none">
        {stories.map((story) => (
          <button
            key={story.id}
            onClick={story.action}
            className="flex flex-col items-center gap-1.5 shrink-0 group focus:outline-none cursor-pointer"
          >
            <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full p-0.5 transition-transform duration-300 group-hover:scale-105 shadow-md ${
              story.isSpecial 
                ? 'bg-gradient-to-tr from-amber-400 via-orange-500 to-emerald-400 animate-pulse' 
                : 'bg-gradient-to-tr from-amber-500 via-rose-500 to-emerald-600'
            }`}>
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-white bg-stone-900 flex items-center justify-center">
                <img 
                  src={story.image} 
                  alt={story.label} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
            </div>
            <span className={`text-[10px] sm:text-[11px] font-bold whitespace-nowrap text-center max-w-[72px] truncate ${
              story.isSpecial ? 'text-amber-700 font-black' : 'text-stone-800 group-hover:text-emerald-800'
            }`}>
              {story.label}
            </span>
          </button>
        ))}
      </div>

      {/* 2. Captivating Modern Hero Face Card - Vibrant Moroccan Jewel Atmosphere */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[460px] sm:min-h-[520px] flex flex-col justify-between p-5 sm:p-10 border-2 border-amber-300/40">
        
        {/* High-Resolution Stunning Twilight Moroccan Atmosphere Image */}
        <img
          src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1600&q=85"
          alt="Palais et Riad Marocain d'Exception"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.12] saturate-[1.2] transition-transform duration-1000 scale-100 hover:scale-103"
        />

        {/* Ambient Darkened Radial Gradient Overlay with Golden & Emerald Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/25 via-transparent to-transparent pointer-events-none" />

        {/* Top Badges & APK Quick Trigger */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/25 backdrop-blur-md border border-white/40 text-white text-xs font-black tracking-wider uppercase shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{t.badge}</span>
          </div>

          {/* Quick APK Install Badge - Glowing Amber */}
          <button
            onClick={() => openModal({ type: 'apk-install' })}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-stone-950 font-black text-xs shadow-xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-amber-200"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>{t.apkBadge}</span>
            <span className="bg-stone-950 text-amber-300 text-[10px] px-2 py-0.5 rounded-md uppercase font-black">
              APK
            </span>
          </button>
        </div>

        {/* Center: Punchy Minimal Text ("9lel lktaba") with Radiant Moroccan Gold Shimmer */}
        <div className="relative z-10 max-w-2xl my-auto text-left py-4 sm:py-6">
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-lg">
            {isAr ? (
              <span>سحر المغرب الأصيل</span>
            ) : (
              <>
                L'Âme du <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-200">Maroc Authentique</span>
              </>
            )}
          </h1>

          <p className="font-arabic text-xl sm:text-3xl text-amber-300 font-black mt-2 drop-shadow-[0_2px_12px_rgba(245,158,11,0.6)]">
            دار الضيافة • ضيافة أصيلة وروائع الصانع المغربي
          </p>

          <p className="text-white/90 text-xs sm:text-sm font-semibold max-w-lg mt-2 leading-relaxed drop-shadow-md">
            {t.subline}
          </p>
        </div>

        {/* Bottom: Fast Region & Province Search Bar ("hasaba li9lim") - Eye-Catching Border & Accents */}
        <div className="relative z-20 w-full bg-white/98 backdrop-blur-xl p-4 sm:p-5 rounded-3xl shadow-2xl border-2 border-amber-300/80">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            {/* Region / Territory Selector */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-wider text-amber-900 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                {t.chooseRegion}
              </label>
              <select
                aria-label="Sélectionner un Territoire"
                value={selectedRegion}
                onChange={(e) => {
                  const reg = e.target.value as MoroccanRegion;
                  setSelectedRegion(reg);
                  setSearchFilters(prev => ({ ...prev, region: reg }));
                  onSelectRegion(reg);
                }}
                className="w-full bg-amber-50/50 border border-amber-200 rounded-xl px-3 py-2.5 text-xs font-bold text-stone-900 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 cursor-pointer shadow-xs"
              >
                <option value="Toutes">🇲🇦 {t.allRegions}</option>
                {MOROCCAN_REGIONS.map(r => (
                  <option key={r.region} value={r.region}>
                    📍 {r.region} ({r.provinces.slice(0, 2).join(', ')}...)
                  </option>
                ))}
              </select>
            </div>

            {/* Check-In */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-wider text-amber-900 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                {t.checkIn}
              </label>
              <input
                type="date"
                value={searchFilters.checkIn}
                onChange={(e) => setSearchFilters(prev => ({ ...prev, checkIn: e.target.value }))}
                className="w-full bg-amber-50/50 border border-amber-200 rounded-xl px-3 py-2.5 text-xs font-bold text-stone-900 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 shadow-xs"
              />
            </div>

            {/* Guests */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-wider text-amber-900 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-teal-700" />
                {t.guests}
              </label>
              <select
                value={searchFilters.guests}
                onChange={(e) => setSearchFilters(prev => ({ ...prev, guests: Number(e.target.value) }))}
                className="w-full bg-amber-50/50 border border-amber-200 rounded-xl px-3 py-2.5 text-xs font-bold text-stone-900 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 cursor-pointer shadow-xs"
              >
                <option value={1}>1 personne</option>
                <option value={2}>2 personnes (Couple)</option>
                <option value={3}>3 personnes</option>
                <option value={4}>4+ personnes (Famille)</option>
              </select>
            </div>

            {/* Action Explore Button - Radiant Emerald Gradient */}
            <div className="flex items-end">
              <button
                onClick={onSearchClick}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-800 hover:from-emerald-500 hover:to-teal-600 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-800/30 hover:scale-[1.02] active:scale-98 transition-all cursor-pointer border border-emerald-400/40"
              >
                <Search className="w-4 h-4 text-amber-300" />
                <span>{t.searchBtn}</span>
              </button>
            </div>

          </div>

          {/* Quick Region Pills Bar - High Contrast */}
          <div className="mt-3 pt-3 border-t border-amber-200/80 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
            <span className="text-[10px] uppercase font-black text-amber-900 whitespace-nowrap mr-1">
              {isAr ? 'الجهات والأقاليم :' : 'Régions :'}
            </span>
            <button
              onClick={() => {
                setSelectedRegion('Toutes');
                setSearchFilters(prev => ({ ...prev, region: 'Toutes' }));
              }}
              className={`px-3 py-1 rounded-full whitespace-nowrap text-[11px] font-bold transition-all ${
                selectedRegion === 'Toutes'
                  ? 'bg-gradient-to-r from-emerald-800 to-teal-800 text-white shadow-sm'
                  : 'bg-white text-stone-700 border border-amber-200 hover:bg-amber-100/60 hover:border-amber-400 hover:text-emerald-950'
              }`}
            >
              {isAr ? 'كل ربوع المملكة' : 'Toutes les régions'}
            </button>
            {MOROCCAN_REGIONS.map(reg => (
              <button
                key={reg.region}
                onClick={() => {
                  setSelectedRegion(reg.region);
                  setSearchFilters(prev => ({ ...prev, region: reg.region }));
                  onSelectRegion(reg.region);
                }}
                className={`px-3 py-1 rounded-full whitespace-nowrap text-[11px] font-bold transition-all ${
                  selectedRegion === reg.region
                    ? 'bg-gradient-to-r from-emerald-800 to-teal-800 text-white shadow-sm'
                    : 'bg-white text-stone-700 border border-amber-200 hover:bg-amber-100/60 hover:border-amber-400 hover:text-emerald-950'
                }`}
              >
                {reg.region}
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* 3. Three Sleek Trust & Native App Value Badges - Jewel Tones */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-50/90 to-teal-50/60 border border-emerald-300/80 flex items-center gap-3 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-sm">
            <ShieldCheck className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <span className="text-xs font-black text-emerald-950 block">{t.tag1}</span>
            <span className="text-[10px] text-emerald-800/80 font-semibold">Coopératives & Maâlems Agréés</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-50/90 to-orange-50/60 border border-amber-300/80 flex items-center gap-3 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Truck className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xs font-black text-amber-950 block">{t.tag2}</span>
            <span className="text-[10px] text-amber-800/80 font-semibold">Express 24-48h & International</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-50/90 to-indigo-50/60 border border-blue-300/80 flex items-center gap-3 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-blue-700 text-white flex items-center justify-center shrink-0 shadow-sm">
            <CreditCard className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <span className="text-xs font-black text-blue-950 block">{t.tag3}</span>
            <span className="text-[10px] text-blue-800/80 font-semibold">Espèces ou Virement Sécurisé</span>
          </div>
        </div>
      </div>
    </section>
  );
};
