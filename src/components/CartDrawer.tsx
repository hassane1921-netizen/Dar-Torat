import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  Tag, 
  ShieldCheck, 
  MessageSquare 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface CartDrawerProps {
  onClose: () => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onClose, onProceedToCheckout }) => {
  const { 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    cartSubtotalMAD, 
    formatPrice, 
    getWhatsAppUrl, 
    clearCart,
    showToast 
  } = useStore();

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  // Free shipping threshold: 500 MAD
  const freeShippingThreshold = 500;
  const progressPercent = Math.min(100, Math.round((cartSubtotalMAD / freeShippingThreshold) * 100));
  const remainingForFree = Math.max(0, freeShippingThreshold - cartSubtotalMAD);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'DIAFA10') {
      setDiscountPercent(10);
      setPromoApplied(true);
      showToast('Code promo DIAFA10 appliqué : -10% sur votre commande !', 'success');
    } else {
      showToast('Code promo invalide. Essayez "DIAFA10".', 'warning');
    }
  };

  const discountAmount = Math.round((cartSubtotalMAD * discountPercent) / 100);
  const totalMAD = cartSubtotalMAD - discountAmount;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#E6DEC8] shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 bg-white border-b border-[#EAE3D2] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#18392B]" />
              <h2 className="font-heading text-lg font-bold text-[#18392B]">
                Votre Panier d’Artisanat
              </h2>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#18392B]/10 text-[#18392B]">
                {cart.reduce((s, i) => s + i.quantity, 0)}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#5C4D3C] hover:bg-[#FAF7F2] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="bg-[#F1EAD9] p-3 text-xs border-b border-[#E0D5C1]">
            <div className="flex items-center justify-between text-[#18392B] font-semibold mb-1">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#A8582C]" />
                {remainingForFree === 0 ? (
                  <strong className="text-[#24533E]">Livraison express offerte au Maroc ! 🎉</strong>
                ) : (
                  <span>Plus que <strong>{formatPrice(remainingForFree)}</strong> pour la livraison offerte</span>
                )}
              </span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full bg-white h-2 rounded-full overflow-hidden border border-[#E0D5C1]">
              <div 
                className="bg-[#18392B] h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#EAE3D2] text-[#8C7A65] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-heading text-lg font-bold text-[#18392B]">Votre panier est vide</p>
                  <p className="text-xs text-[#8C7A65] mt-1 max-w-xs mx-auto">
                    Découvrez nos créations d’artisanat d’exception créées par les maâlems de Fès et Meknès.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-[#18392B] text-white text-xs font-bold hover:bg-[#24533E] transition-all"
                >
                  Explorer la boutique
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3 bg-white rounded-2xl border border-[#E6DEC8] flex gap-3 shadow-xs"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-xl object-cover shrink-0 bg-[#EAE3D2]"
                  />
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-heading text-xs sm:text-sm font-bold text-[#18392B] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[#8C7A65] hover:text-red-600 p-1"
                          title="Supprimer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[10px] text-[#A8582C] font-semibold block">
                        {item.product.origin} • {item.product.artisan.name}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#FAF7F2]">
                      <span className="font-heading text-sm font-bold text-[#18392B]">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>

                      <div className="flex items-center bg-[#FAF7F2] border border-[#E0D5C1] rounded-lg">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, -1)}
                          className="p-1 text-[#18392B] hover:bg-white rounded-l-lg"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-[#18392B]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, 1)}
                          className="p-1 text-[#18392B] hover:bg-white rounded-r-lg"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-4 bg-white border-t border-[#EAE3D2] space-y-3">
              
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-[#8C7A65] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Code promo (ex: DIAFA10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#E0D5C1] rounded-xl pl-8 pr-3 py-2 text-xs uppercase font-semibold text-[#18392B] focus:outline-none focus:border-[#18392B]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-[#F1EAD9] hover:bg-[#EAE3D2] text-[#18392B] rounded-xl text-xs font-bold transition-colors"
                >
                  Appliquer
                </button>
              </form>

              {/* Subtotal breakdown */}
              <div className="space-y-1.5 text-xs text-[#5C4D3C] pt-2 border-t border-[#FAF7F2]">
                <div className="flex justify-between">
                  <span>Sous-total articles :</span>
                  <span className="font-semibold">{formatPrice(cartSubtotalMAD)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#8C3A27] font-semibold">
                    <span>Remise privilège (-{discountPercent}%) :</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#24533E] font-medium">
                  <span>Livraison :</span>
                  <span>{remainingForFree === 0 ? 'Offerte' : 'Calculée à l’étape suivante'}</span>
                </div>
                <div className="flex justify-between text-[#18392B] font-bold text-sm pt-2 border-t border-[#EAE3D2]">
                  <span>Total :</span>
                  <span className="font-heading text-lg">{formatPrice(totalMAD)}</span>
                </div>
              </div>

              {/* Actions */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-4 rounded-xl bg-[#18392B] hover:bg-[#24533E] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <span>Commander maintenant</span>
                <ArrowRight className="w-4 h-4 text-[#D4A373]" />
              </button>

              <a
                href={getWhatsAppUrl(`Bonjour Dar Diafa, je souhaite valider mon panier de ${cart.length} création(s) artisanale(s) pour un montant de ${totalMAD} MAD. Pouvez-vous me confirmer les délais ?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Commander par WhatsApp (+212 7 07 68 48 12)</span>
              </a>

              <div className="text-center text-[10px] text-[#8C7A65] flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#18392B]" />
                <span>Paiement à la livraison ou en ligne 100% sécurisé</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
