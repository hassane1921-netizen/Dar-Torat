import React, { useState, useMemo } from 'react';
import { 
  Palette, 
  Search, 
  ShoppingBag, 
  Heart, 
  Star, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  MessageSquare,
  Filter,
  ShieldCheck,
  Eye
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, ProductCategory } from '../types';
import { MOROCCAN_REGIONS } from '../data/mockData';

interface ArtisanatSectionProps {
  onSelectProduct: (product: Product) => void;
}

export const ArtisanatSection: React.FC<ArtisanatSectionProps> = ({ onSelectProduct }) => {
  const { 
    products, 
    formatPrice, 
    addToCart, 
    language, 
    toggleWishlist, 
    isInWishlist, 
    getWhatsAppUrl,
    selectedRegion,
    setSelectedRegion 
  } = useStore();

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('Tous');
  const [selectedProvince, setSelectedProvince] = useState<string>('Toutes');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const categories: ProductCategory[] = [
    'Tous',
    'Céramique',
    'Maroquinerie',
    'Textile',
    'Métal & Cuivre',
    'Terroir & Bien-être',
    'Couture'
  ];

  const t = {
    fr: {
      pretitle: 'Boutique & Trésors d’Art',
      title: 'Artisanat d’Exception des Maâlems',
      arabicTitle: 'كنوز الصناعة التقليدية الأصيلة عبر أقاليم المملكة',
      subtitle: 'Chaque création est une œuvre unique façonnée patiemment à la main dans les corporations et coopératives des terroirs marocains.',
      searchPlaceholder: 'Rechercher un tapis, zellige, babouche, théière, thuya...',
      addToCart: 'Ajouter au panier',
      viewProduct: 'Aperçu & Détails',
      inStock: 'En stock atelier',
      verifiedArtisan: 'Artisan Maâlem Certifié',
      allOrigins: 'Toutes les régions',
      allProvinces: 'Toutes les provinces',
      customOrderTitle: 'Besoin d’une pièce sur mesure ?',
      customOrderSub: 'Dinanderie gravée à vos initiales, tapis berbère sur dimensions spécifiques ou zellige sur mesure.',
      customOrderBtn: 'Contacter notre Maître Artisan sur WhatsApp'
    },
    ar: {
      pretitle: 'المتجر والتحف الفنية',
      title: 'صناعة تقليدية بأيدي كبار المعلمين',
      arabicTitle: 'كنوز الصناعة التقليدية الأصيلة عبر أقاليم المملكة',
      subtitle: 'كل قطعة تحفة فريدة صُنعت بصبر وإتقان في أروقة الحرفيين التقليديين ومختلف ربوع المملكة.',
      searchPlaceholder: 'ابحث عن زربية، زليج، بلغة، طقم شاي، عرعار...',
      addToCart: 'أضف إلى السلة',
      viewProduct: 'معاينة وتفاصيل',
      inStock: 'متوفر بالورشة',
      verifiedArtisan: 'صانع تقليدي معتمد',
      allOrigins: 'جميع الجهات والأقاليم',
      allProvinces: 'جميع الأقاليم',
      customOrderTitle: 'هل ترغب في طلب خاص على المقاس؟',
      customOrderSub: 'نقش النحاس بأسماء خاصة، زرابي بمقاسات وألوان محددة، أو زليج مصمم حسب الطلب.',
      customOrderBtn: 'تواصل مع المعلم عبر واتساب'
    },
    en: {
      pretitle: 'Curated Boutique & Crafts',
      title: 'Moroccan Master Crafts & Treasures',
      arabicTitle: 'كنوز الصناعة التقليدية الأصيلة عبر أقاليم المملكة',
      subtitle: 'Every piece is hand-hewn by recognized Maâlems across the ancient guilds and cooperatives of Morocco.',
      searchPlaceholder: 'Search rugs, zellige tiles, leather slippers, teapots, thuya wood...',
      addToCart: 'Add to Cart',
      viewProduct: 'View Details',
      inStock: 'In workshop stock',
      verifiedArtisan: 'Certified Master Artisan',
      allOrigins: 'All Regions',
      allProvinces: 'All Provinces',
      customOrderTitle: 'Looking for a bespoke creation?',
      customOrderSub: 'Personalized brass engraving, custom-sized Berber rugs, or bespoke zellige mosaic compositions.',
      customOrderBtn: 'Chat with Master Artisan on WhatsApp'
    }
  }[language];

  // Available provinces for products
  const availableProvinces = useMemo(() => {
    if (selectedRegion === 'Toutes') {
      const set = new Set<string>();
      products.forEach(p => { if (p.province) set.add(p.province); });
      return Array.from(set);
    }
    const regObj = MOROCCAN_REGIONS.find(r => r.region === selectedRegion);
    return regObj ? regObj.provinces : [];
  }, [selectedRegion, products]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category filter
      if (selectedCategory !== 'Tous' && p.category !== selectedCategory) {
        return false;
      }
      // Region filter ("hasaba li9lim")
      if (selectedRegion !== 'Toutes' && p.region !== selectedRegion) {
        return false;
      }
      // Province filter
      if (selectedProvince !== 'Toutes' && p.province !== selectedProvince && !p.origin.includes(selectedProvince)) {
        return false;
      }
      // Search text
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(query);
        const matchDesc = p.description.toLowerCase().includes(query);
        const matchArtisan = p.artisan.name.toLowerCase().includes(query);
        if (!matchName && !matchDesc && !matchArtisan) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, selectedCategory, selectedRegion, selectedProvince, searchQuery, sortBy]);

  return (
    <section id="artisanat-section" className="py-16 lg:py-24 bg-white border-t border-[#EAE3D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#A8582C] mb-2">
            <span className="w-6 h-0.5 bg-[#A8582C] inline-block" />
            <span>{t.pretitle}</span>
            <span className="w-6 h-0.5 bg-[#A8582C] inline-block" />
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#18392B]">
            {t.title}
          </h2>
          <p className="font-arabic text-xl text-[#8C3A27] font-semibold mt-1">
            {t.arabicTitle}
          </p>
          <p className="text-[#5C4D3C] text-sm sm:text-base mt-3 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="space-y-4 mb-10">
          
          {/* Search & Origin row */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-[#8C7A65] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#E0D5C1] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#18392B] focus:outline-none focus:border-[#18392B]"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C7A65] hover:text-black"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              {/* All 12 Regions Dropdown */}
              <select
                aria-label="Région & Territoire"
                value={selectedRegion}
                onChange={(e) => {
                  setSelectedRegion(e.target.value as any);
                  setSelectedProvince('Toutes');
                }}
                className="bg-[#FAF7F2] border border-[#E0D5C1] rounded-xl px-3 py-2.5 text-xs font-semibold text-[#18392B] focus:outline-none cursor-pointer flex-1 sm:flex-none"
              >
                <option value="Toutes">🇲🇦 {t.allOrigins}</option>
                {MOROCCAN_REGIONS.map(r => (
                  <option key={r.region} value={r.region}>{r.region}</option>
                ))}
              </select>

              {/* Province Dropdown */}
              <select
                aria-label="Province & Ville"
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="bg-[#FAF7F2] border border-[#E0D5C1] rounded-xl px-3 py-2.5 text-xs font-semibold text-[#18392B] focus:outline-none cursor-pointer flex-1 sm:flex-none"
              >
                <option value="Toutes">📍 {t.allProvinces}</option>
                {availableProvinces.map(prov => (
                  <option key={prov} value={prov}>{prov}</option>
                ))}
              </select>

              <select
                aria-label="Trier par"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#FAF7F2] border border-[#E0D5C1] rounded-xl px-3 py-2.5 text-xs font-semibold text-[#18392B] focus:outline-none cursor-pointer flex-1 sm:flex-none"
              >
                <option value="featured">Sélection vedette</option>
                <option value="rating">Mieux notés</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#18392B] text-white shadow-xs'
                    : 'bg-[#FAF7F2] text-[#4A3E31] border border-[#E6DEC8] hover:bg-[#F1EAD9]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center bg-[#FAF7F2] rounded-3xl border border-[#E6DEC8] max-w-md mx-auto">
            <Palette className="w-10 h-10 text-[#D4A373] mx-auto mb-3" />
            <p className="font-heading text-lg font-bold text-[#18392B]">Aucune création trouvée</p>
            <p className="text-xs text-[#5C4D3C] mt-1">Essayez un autre mot-clé ou réinitialisez la catégorie.</p>
            <button
              onClick={() => { setSelectedCategory('Tous'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 bg-[#18392B] text-white rounded-xl text-xs font-bold"
            >
              Afficher tout l'artisanat
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const inFav = isInWishlist(product.id);
              return (
                <div
                  key={product.id}
                  className="bg-[#FAF7F2] rounded-2xl overflow-hidden border border-[#E6DEC8] hover:border-[#D4A373] shadow-xs hover:shadow-xl transition-all flex flex-col group"
                >
                  {/* Image container */}
                  <div 
                    onClick={() => onSelectProduct(product)}
                    className="relative h-56 overflow-hidden bg-[#EAE3D2] cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Origin & Category Badges */}
                    <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#18392B]/90 text-white uppercase tracking-wider backdrop-blur-xs flex items-center gap-1">
                        📍 {product.province ? `${product.province}` : product.origin}
                      </span>
                      {product.oldPrice && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#8C3A27] text-white uppercase tracking-wider">
                          Promo
                        </span>
                      )}
                    </div>

                    {/* Wishlist toggle */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-colors ${
                        inFav 
                          ? 'bg-[#8C3A27] text-white' 
                          : 'bg-white/80 hover:bg-white text-[#18392B]'
                      }`}
                      title="Favoris"
                    >
                      <Heart className={`w-3.5 h-3.5 ${inFav ? 'fill-current' : ''}`} />
                    </button>

                    {/* Quick View Button on hover */}
                    <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProduct(product);
                        }}
                        className="w-full py-2 bg-white/95 text-[#18392B] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md hover:bg-white"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#A8582C]" />
                        <span>{t.viewProduct}</span>
                      </button>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Rating & Artisan Mini Badge */}
                      <div className="flex items-center justify-between text-[11px] text-[#8C7A65] mb-1.5">
                        <span className="font-semibold text-[#A8582C] flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-[#18392B]" />
                          {product.artisan.name}
                        </span>
                        <div className="flex items-center gap-0.5 font-bold text-[#18392B]">
                          <Star className="w-3 h-3 text-[#D4A373] fill-current" />
                          <span>{product.rating}</span>
                        </div>
                      </div>

                      {/* Product Name */}
                      <h3 
                        onClick={() => onSelectProduct(product)}
                        className="font-heading text-base font-bold text-[#18392B] hover:text-[#A8582C] cursor-pointer line-clamp-1 mb-1"
                      >
                        {product.name}
                      </h3>

                      <p className="font-arabic text-xs text-[#8C3A27] mb-2 line-clamp-1">
                        {product.arabicName}
                      </p>

                      <p className="text-xs text-[#5C4D3C] line-clamp-2 leading-relaxed mb-3">
                        {product.description}
                      </p>
                    </div>

                    {/* Price & Add to Cart button */}
                    <div className="pt-3 border-t border-[#EAE3D2] flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-heading text-lg font-bold text-[#18392B]">
                            {formatPrice(product.price)}
                          </span>
                          {product.oldPrice && (
                            <span className="text-[11px] text-[#8C7A65] line-through">
                              {formatPrice(product.oldPrice)}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-[#24533E] font-medium block">
                          ✓ {t.inStock}
                        </span>
                      </div>

                      <button
                        onClick={() => addToCart(product, 1)}
                        className="p-2.5 rounded-xl bg-[#18392B] hover:bg-[#24533E] text-white shadow-xs hover:shadow-md transition-all group/btn"
                        title={t.addToCart}
                      >
                        <ShoppingBag className="w-4 h-4 text-[#D4A373] group-hover/btn:scale-110 transition-transform" />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bespoke / Sur Mesure Banner */}
        <div className="mt-14 bg-gradient-to-r from-[#18392B] to-[#24533E] rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-[#D4A373]/30">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#D4A373] text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sur Mesure & Commandes Spéciales</span>
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold">
              {t.customOrderTitle}
            </h3>
            <p className="text-white/80 text-xs sm:text-sm max-w-xl">
              {t.customOrderSub}
            </p>
          </div>

          <a
            href={getWhatsAppUrl("Bonjour Dar Diafa, je souhaite faire une commande d'artisanat sur mesure (dimensions personnalisées ou personnalisation dinanderie/tapis).")}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{t.customOrderBtn}</span>
          </a>
        </div>

      </div>
    </section>
  );
};
