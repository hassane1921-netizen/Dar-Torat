import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  MessageSquare, 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Award, 
  Check, 
  Minus, 
  Plus, 
  Sparkles,
  MapPin
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { 
    formatPrice, 
    addToCart, 
    language, 
    toggleWishlist, 
    isInWishlist, 
    getWhatsAppUrl, 
    openModal 
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const inFav = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
    openModal({ type: 'cart' });
  };

  const isAr = language === 'ar';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="bg-[#FAF7F2] w-full max-w-4xl rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[#E6DEC8] my-0 sm:my-8 flex flex-col max-h-[94vh] sm:max-h-[92vh]">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-white border-b border-[#EAE3D2] flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 bg-[#18392B]/10 text-[#18392B] rounded-md">
              {product.category}
            </span>
            <span className="text-xs font-semibold text-[#8C7A65]">
              Origine : {product.origin}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-2 rounded-full border transition-colors ${
                inFav 
                  ? 'bg-[#8C3A27] text-white border-[#8C3A27]' 
                  : 'bg-white text-[#4A3E31] border-[#E0D5C1] hover:bg-[#FAF7F2]'
              }`}
              title="Favoris"
            >
              <Heart className={`w-4 h-4 ${inFav ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white text-[#4A3E31] border border-[#E0D5C1] hover:bg-[#F1EAD9] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-4 sm:p-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left: Gallery */}
            <div className="space-y-3">
              <div className="h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-[#EAE3D2] relative shadow-inner">
                <img 
                  src={images[activeImageIndex] || images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#18392B]/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-md backdrop-blur-xs">
                  {product.origin}
                </div>
              </div>

              {images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                        activeImageIndex === idx 
                          ? 'border-[#18392B] scale-105 shadow-sm' 
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Guarantees Box */}
              <div className="p-4 rounded-2xl bg-white border border-[#E6DEC8] space-y-2 text-xs text-[#5C4D3C]">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#D4A373] shrink-0" />
                  <span>100% Fait main par un Maâlem certifié</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#18392B] shrink-0" />
                  <span>{product.estimatedDeliveryDays}</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-[#A8582C] shrink-0" />
                  <span>Retour & échange sous 14 jours garantis</span>
                </div>
              </div>
            </div>

            {/* Right: Info & Purchase */}
            <div className="flex flex-col justify-between space-y-6">
              <div>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1 bg-[#F1EAD9] px-2 py-0.5 rounded text-xs font-bold text-[#18392B]">
                    <Star className="w-3.5 h-3.5 text-[#D4A373] fill-current" />
                    <span>{product.rating}</span>
                  </div>
                  <span className="text-xs text-[#8C7A65]">({product.reviewsCount} avis vérifiés)</span>
                </div>

                {/* Title */}
                <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#18392B] mb-1">
                  {product.name}
                </h1>
                <p className="font-arabic text-lg text-[#8C3A27] font-semibold mb-4">
                  {product.arabicName}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-4 p-3 bg-white rounded-xl border border-[#E6DEC8]">
                  <span className="font-heading text-2xl sm:text-3xl font-bold text-[#18392B]">
                    {formatPrice(product.price)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-sm text-[#8C7A65] line-through">
                      {formatPrice(product.oldPrice)}
                    </span>
                  )}
                  <span className="text-xs text-[#24533E] font-medium ml-auto">
                    ✓ En stock atelier ({product.stock} pièces disponibles)
                  </span>
                </div>

                {/* Description */}
                <div className="space-y-3 mb-6">
                  <h3 className="font-heading text-sm font-bold text-[#18392B]">
                    Description & Savoir-Faire
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5C4D3C] leading-relaxed whitespace-pre-line">
                    {product.fullDescription}
                  </p>
                </div>

                {/* Materials & Dimensions */}
                {(product.dimensions || product.materials) && (
                  <div className="p-3.5 rounded-xl bg-white border border-[#E6DEC8] space-y-2 mb-6 text-xs">
                    {product.dimensions && (
                      <div className="flex justify-between">
                        <span className="text-[#8C7A65]">Dimensions / Format :</span>
                        <span className="font-semibold text-[#18392B]">{product.dimensions}</span>
                      </div>
                    )}
                    {product.materials && (
                      <div className="flex justify-between">
                        <span className="text-[#8C7A65]">Matières :</span>
                        <span className="font-semibold text-[#18392B]">{product.materials.join(', ')}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Artisan Card */}
                <div className="p-3.5 rounded-2xl bg-white border border-[#E6DEC8] flex items-center gap-3 mb-6">
                  <img 
                    src={product.artisan.avatar} 
                    alt={product.artisan.name}
                    className="w-12 h-12 rounded-full object-cover border border-[#D4A373]"
                  />
                  <div>
                    <div className="text-[10px] uppercase font-bold text-[#A8582C] tracking-wider">
                      Créateur de cette pièce
                    </div>
                    <div className="font-heading text-sm font-bold text-[#18392B]">
                      {product.artisan.name}
                    </div>
                    <div className="text-xs text-[#5C4D3C]">
                      {product.artisan.title} • {product.artisan.yearsOfMastery} ans d’expérience
                    </div>
                  </div>
                </div>

              </div>

              {/* Quantity & CTA Buttons */}
              <div className="space-y-3 pt-4 border-t border-[#EAE3D2]">
                
                {/* Quantity stepper */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#8C7A65] uppercase tracking-wider">
                    Quantité
                  </span>
                  <div className="flex items-center bg-white border border-[#E0D5C1] rounded-xl p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1.5 rounded-lg text-[#18392B] hover:bg-[#FAF7F2]"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 text-xs font-bold text-[#18392B]">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="p-1.5 rounded-lg text-[#18392B] hover:bg-[#FAF7F2]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Add to Cart button */}
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#18392B] hover:bg-[#24533E] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <ShoppingBag className="w-4 h-4 text-[#D4A373]" />
                  <span>Ajouter au panier • {formatPrice(product.price * quantity)}</span>
                </button>

                {/* WhatsApp Direct Order button */}
                <a
                  href={getWhatsAppUrl(`Bonjour Dar Diafa, je souhaite commander : ${product.name} (Quantité: ${quantity}, Prix: ${product.price * quantity} MAD). Merci de m'indiquer la disponibilité et les modalités de livraison.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Commander via WhatsApp (+212 7 07 68 48 12)</span>
                </a>

              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
