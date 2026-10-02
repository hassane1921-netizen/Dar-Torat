import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  MapPin, 
  Star, 
  Heart, 
  Check, 
  ArrowRight,
  ShieldAlert,
  Compass
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Hotel, MoroccanRegion } from '../types';
import { MOROCCAN_REGIONS } from '../data/mockData';

interface HotelsSectionProps {
  onSelectHotel: (hotel: Hotel) => void;
}

export const HotelsSection: React.FC<HotelsSectionProps> = ({ onSelectHotel }) => {
  const { 
    hotels, 
    formatPrice, 
    language, 
    toggleWishlist, 
    isInWishlist, 
    searchFilters, 
    setSearchFilters,
    selectedRegion,
    setSelectedRegion 
  } = useStore();

  const [selectedType, setSelectedType] = useState<string>('Tous');
  const [selectedProvince, setSelectedProvince] = useState<string>('Toutes');
  const [selectedAmenity, setSelectedAmenity] = useState<string>('Tous');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'rating'>('recommended');

  const isAr = language === 'ar';

  const t = {
    fr: {
      pretitle: 'Hébergements de Prestige',
      title: 'Riads & Demeures Historiques',
      arabicTitle: 'رياض ودور الضيافة العريقة عبر أقاليم المملكة',
      subtitle: 'Plongez dans l’intimité des plus beaux patios andalous, dars et palais restaurés selon chaque région du Maroc.',
      allRegions: 'Toutes les régions',
      allProvinces: 'Toutes les provinces',
      typeAll: 'Tous les types',
      perNight: '/ nuit',
      bookNow: 'Réserver',
      viewDetails: 'Détails & Photos',
      noResults: 'Aucune demeure ne correspond à cette région ou ce filtre.',
      resetFilters: 'Afficher toutes les régions'
    },
    ar: {
      pretitle: 'إقامات فاخرة',
      title: 'رياضات وقصور تاريخية عريقة',
      arabicTitle: 'رياض ودور الضيافة العريقة عبر أقاليم المملكة',
      subtitle: 'عش تجربة الضيافة في أبهى صورها بين الرياضات الأندلسية والقصور العتيقة المرممة في كل جهة وإقليم.',
      allRegions: 'كل الأقاليم والجهات',
      allProvinces: 'جميع الأقاليم والعمالات',
      typeAll: 'جميع الأنواع',
      perNight: '/ ليلة',
      bookNow: 'حجز فوري',
      viewDetails: 'التفاصيل والصور',
      noResults: 'لا توجد دور ضيافة مسجلة في هذا الإقليم حالياً.',
      resetFilters: 'عرض كل الأقاليم'
    },
    en: {
      pretitle: 'Prestige Stays',
      title: 'Historic Riads & Dars',
      arabicTitle: 'رياض ودور الضيافة العريقة عبر أقاليم المملكة',
      subtitle: 'Step into serene courtyards, fountains, and preserved architectural masterpieces across Moroccan regions.',
      allRegions: 'All Regions',
      allProvinces: 'All Provinces',
      typeAll: 'All Property Types',
      perNight: '/ night',
      bookNow: 'Book Now',
      viewDetails: 'View Details',
      noResults: 'No properties match your current region or filter.',
      resetFilters: 'Show all regions'
    }
  }[language];

  // Available provinces based on selected region or all hotels
  const availableProvinces = useMemo(() => {
    if (selectedRegion === 'Toutes') {
      const set = new Set<string>();
      hotels.forEach(h => set.add(h.province));
      return Array.from(set);
    }
    const regObj = MOROCCAN_REGIONS.find(r => r.region === selectedRegion);
    return regObj ? regObj.provinces : [];
  }, [selectedRegion, hotels]);

  // Filtered & Sorted Hotels
  const filteredHotels = useMemo(() => {
    return hotels.filter(h => {
      // Region match ("hasaba li9lim")
      if (selectedRegion !== 'Toutes' && h.region !== selectedRegion) {
        return false;
      }
      // Province match
      if (selectedProvince !== 'Toutes' && h.province !== selectedProvince && h.city !== selectedProvince) {
        return false;
      }
      // Type match
      if (selectedType !== 'Tous' && h.property_type !== selectedType) {
        return false;
      }
      // Amenity match
      if (selectedAmenity === 'Piscine' && !h.amenities.some(a => a.toLowerCase().includes('piscine') || a.toLowerCase().includes('bassin'))) {
        return false;
      }
      if (selectedAmenity === 'Hammam' && !h.amenities.some(a => a.toLowerCase().includes('hammam'))) {
        return false;
      }
      if (selectedAmenity === 'Rooftop' && !h.amenities.some(a => a.toLowerCase().includes('rooftop') || a.toLowerCase().includes('terrasse'))) {
        return false;
      }
      // Max price check
      if (searchFilters.maxPrice && h.price_per_night > searchFilters.maxPrice) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price_per_night - b.price_per_night;
      if (sortBy === 'price-desc') return b.price_per_night - a.price_per_night;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [hotels, selectedRegion, selectedProvince, searchFilters.maxPrice, selectedType, selectedAmenity, sortBy]);

  const typeBadgeColors: Record<string, string> = {
    Riad: 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white border-emerald-500 shadow-xs',
    Dar: 'bg-gradient-to-r from-amber-500 to-orange-600 text-white border-amber-400 shadow-xs',
    Villa: 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white border-blue-400 shadow-xs',
    Kasbah: 'bg-gradient-to-r from-rose-600 to-amber-700 text-white border-rose-400 shadow-xs',
    Palais: 'bg-gradient-to-r from-purple-600 to-violet-800 text-white border-purple-400 shadow-xs'
  };

  return (
    <section id="hotels-section" className="py-16 lg:py-24 bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EC] to-[#F5ECE0] border-t border-amber-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-amber-700 mb-2">
              <span className="w-8 h-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full inline-block" />
              <span>{t.pretitle}</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl font-black text-emerald-950">
              {t.title}
            </h2>
            <p className="font-arabic text-xl text-amber-700 font-black mt-1">
              {t.arabicTitle}
            </p>
            <p className="text-stone-700 text-sm mt-2 max-w-xl font-medium">
              {t.subtitle}
            </p>
          </div>

          {/* Region / Territory Pills Selector ("hasaba li9lim") */}
          <div className="flex flex-col gap-2 self-start md:self-auto max-w-full">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full scrollbar-none">
              <button
                onClick={() => {
                  setSelectedRegion('Toutes');
                  setSelectedProvince('Toutes');
                  setSearchFilters(prev => ({ ...prev, region: 'Toutes' }));
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedRegion === 'Toutes'
                    ? 'bg-gradient-to-r from-emerald-800 to-teal-800 text-white shadow-sm'
                    : 'bg-white text-stone-700 border border-amber-200 hover:bg-amber-100/60 hover:text-emerald-950'
                }`}
              >
                🇲🇦 {t.allRegions}
              </button>
              {MOROCCAN_REGIONS.map(r => (
                <button
                  key={r.region}
                  onClick={() => {
                    setSelectedRegion(r.region);
                    setSelectedProvince('Toutes');
                    setSearchFilters(prev => ({ ...prev, region: r.region }));
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedRegion === r.region
                      ? 'bg-gradient-to-r from-emerald-800 to-teal-800 text-white shadow-sm'
                      : 'bg-white text-stone-700 border border-amber-200 hover:bg-amber-100/60 hover:text-emerald-950'
                  }`}
                >
                  {r.region}
                </button>
              ))}
            </div>

            {/* Province Quick Filter */}
            <div className="flex items-center gap-2 text-xs">
              <span className="font-black text-amber-900 uppercase text-[10px] whitespace-nowrap">
                Province / عمالة :
              </span>
              <select
                aria-label="Filtrer par Province"
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="bg-white border-2 border-amber-300 rounded-xl px-3 py-1 text-xs font-bold text-emerald-950 focus:border-emerald-600 focus:outline-none cursor-pointer shadow-xs"
              >
                <option value="Toutes">📍 {t.allProvinces}</option>
                {availableProvinces.map(prov => (
                  <option key={prov} value={prov}>{prov}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Secondary Filter Bar */}
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border-2 border-amber-200/80 shadow-md mb-8 flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Property Types */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-black text-amber-900 mr-1 uppercase text-[10px]">Type :</span>
            {['Tous', 'Riad', 'Dar', 'Villa', 'Kasbah', 'Palais'].map((pt) => (
              <button
                key={pt}
                onClick={() => setSelectedType(pt)}
                className={`px-3 py-1 rounded-full font-bold transition-all ${
                  selectedType === pt
                    ? 'bg-gradient-to-r from-emerald-800 to-teal-800 text-white shadow-xs'
                    : 'bg-amber-50/70 text-stone-700 border border-amber-200 hover:bg-amber-100 hover:text-emerald-900'
                }`}
              >
                {pt}
              </button>
            ))}
          </div>

          {/* Amenities & Sorting */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSelectedAmenity(selectedAmenity === 'Piscine' ? 'Tous' : 'Piscine')}
                className={`px-2.5 py-1 rounded-md border text-xs font-medium flex items-center gap-1 transition-colors ${
                  selectedAmenity === 'Piscine'
                    ? 'bg-[#18392B] text-white border-[#18392B]'
                    : 'bg-[#FAF7F2] text-[#5C4D3C] border-[#E0D5C1] hover:border-[#18392B]'
                }`}
              >
                🏊 Piscine
              </button>
              <button
                onClick={() => setSelectedAmenity(selectedAmenity === 'Hammam' ? 'Tous' : 'Hammam')}
                className={`px-2.5 py-1 rounded-md border text-xs font-medium flex items-center gap-1 transition-colors ${
                  selectedAmenity === 'Hammam'
                    ? 'bg-[#18392B] text-white border-[#18392B]'
                    : 'bg-[#FAF7F2] text-[#5C4D3C] border-[#E0D5C1] hover:border-[#18392B]'
                }`}
              >
                🛁 Hammam
              </button>
              <button
                onClick={() => setSelectedAmenity(selectedAmenity === 'Rooftop' ? 'Tous' : 'Rooftop')}
                className={`px-2.5 py-1 rounded-md border text-xs font-medium flex items-center gap-1 transition-colors ${
                  selectedAmenity === 'Rooftop'
                    ? 'bg-[#18392B] text-white border-[#18392B]'
                    : 'bg-[#FAF7F2] text-[#5C4D3C] border-[#E0D5C1] hover:border-[#18392B]'
                }`}
              >
                🌄 Rooftop
              </button>
            </div>

            {/* Sort Dropdown */}
            <select
              aria-label="Trier par"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#FAF7F2] border border-[#E0D5C1] rounded-md px-2.5 py-1 text-xs font-medium text-[#18392B] focus:outline-none cursor-pointer"
            >
              <option value="recommended">Recommandés</option>
              <option value="rating">Meilleures notes</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
            </select>
          </div>

        </div>

        {/* Hotels Cards Grid */}
        {filteredHotels.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-[#E6DEC8] max-w-lg mx-auto">
            <ShieldAlert className="w-10 h-10 text-[#D4A373] mx-auto mb-3" />
            <h3 className="font-heading text-lg font-bold text-[#18392B] mb-2">{t.noResults}</h3>
            <button
              onClick={() => {
                setSelectedRegion('Toutes');
                setSearchFilters(prev => ({ ...prev, region: 'Toutes', maxPrice: 5000 }));
                setSelectedType('Tous');
                setSelectedAmenity('Tous');
              }}
              className="mt-4 px-4 py-2 bg-[#18392B] text-white rounded-lg text-xs font-bold hover:bg-[#24533E]"
            >
              {t.resetFilters}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredHotels.map((hotel) => {
              const inFav = isInWishlist(hotel.id);
              return (
                <div 
                  key={hotel.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#E6DEC8] hover:border-[#D4A373] shadow-sm hover:shadow-xl transition-all flex flex-col group"
                >
                  {/* Image & Badges */}
                  <div className="relative h-64 overflow-hidden bg-[#EAE3D2]">
                    <img 
                      src={hotel.image_url} 
                      alt={hotel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold border uppercase tracking-wider ${typeBadgeColors[hotel.property_type] || 'bg-white text-black'}`}>
                          {hotel.property_type}
                        </span>
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#18392B]/90 text-white uppercase tracking-wider backdrop-blur-xs">
                          {hotel.city} ({hotel.region})
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(hotel.id);
                        }}
                        className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                          inFav 
                            ? 'bg-[#8C3A27] text-white' 
                            : 'bg-black/30 hover:bg-black/50 text-white'
                        }`}
                        title="Favoris"
                      >
                        <Heart className={`w-4 h-4 ${inFav ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Bottom overlay info */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                      <div>
                        <div className="flex items-center gap-1 text-xs font-semibold text-[#F1EAD9]">
                          <MapPin className="w-3.5 h-3.5 text-[#D4A373]" />
                          <span>{hotel.neighborhood} • {hotel.province}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-[#18392B]/90 px-2 py-1 rounded-md text-xs font-bold text-[#E8DFD0] backdrop-blur-xs">
                        <Star className="w-3.5 h-3.5 text-[#D4A373] fill-current" />
                        <span>{hotel.rating}</span>
                        <span className="text-[10px] text-white/70">({hotel.review_count})</span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-baseline justify-between mb-1">
                        <h3 className="font-heading text-xl font-bold text-[#18392B] group-hover:text-[#A8582C] transition-colors">
                          {hotel.name}
                        </h3>
                        <span className="text-xs font-arabic text-[#8C7A65] font-bold">
                          {hotel.arabicName}
                        </span>
                      </div>

                      <p className="text-xs text-[#5C4D3C] line-clamp-2 leading-relaxed mb-4">
                        {hotel.description}
                      </p>

                      {/* Amenities Pills */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                          <span 
                            key={idx}
                            className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#FAF7F2] text-[#4A3E31] border border-[#E6DEC8]"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price & Actions */}
                    <div className="pt-4 border-t border-[#EAE3D2] flex items-center justify-between">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-[#8C7A65] tracking-wider">À partir de</div>
                        <div className="flex items-baseline gap-1">
                          <span className="font-heading text-xl font-bold text-[#18392B]">
                            {formatPrice(hotel.price_per_night)}
                          </span>
                          <span className="text-xs text-[#8C7A65]">{t.perNight}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onSelectHotel(hotel)}
                          className="px-4 py-2 rounded-xl bg-[#18392B] hover:bg-[#24533E] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all group-hover:shadow-md"
                        >
                          <span>{t.bookNow}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#D4A373]" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
