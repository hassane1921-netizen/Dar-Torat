import React from 'react';
import { X, Heart, Trash2, ArrowRight, ShoppingBag, Building2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface WishlistModalProps {
  onClose: () => void;
  onSelectHotel: (hotelId: string) => void;
  onSelectProduct: (productId: string) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({ 
  onClose, 
  onSelectHotel, 
  onSelectProduct 
}) => {
  const { wishlist, toggleWishlist, hotels, products, formatPrice, addToCart } = useStore();

  const savedHotels = hotels.filter(h => wishlist.includes(h.id));
  const savedProducts = products.filter(p => wishlist.includes(p.id));
  const totalSaved = savedHotels.length + savedProducts.length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-[#FAF7F2] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-[#E6DEC8] my-8 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-[#EAE3D2] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#8C3A27] fill-current" />
            <h2 className="font-heading text-lg font-bold text-[#18392B]">
              Mes Coups de Cœur ({totalSaved})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#5C4D3C] hover:bg-[#FAF7F2]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
          {totalSaved === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#EAE3D2] text-[#8C7A65] flex items-center justify-center mx-auto">
                <Heart className="w-7 h-7" />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#18392B]">
                Vous n’avez aucun favori enregistré
              </h3>
              <p className="text-xs text-[#8C7A65] max-w-xs mx-auto">
                Cliquez sur le cœur d’un Riad ou d’une création artisanale pour la retrouver ici à tout moment.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Saved Hotels */}
              {savedHotels.length > 0 && (
                <div>
                  <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-[#A8582C] mb-3 flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Riads & Demeures Séculaires ({savedHotels.length})
                  </h3>
                  <div className="space-y-2">
                    {savedHotels.map(h => (
                      <div
                        key={h.id}
                        className="p-3 bg-white rounded-2xl border border-[#E6DEC8] flex items-center justify-between gap-3 text-xs shadow-xs"
                      >
                        <div className="flex items-center gap-3">
                          <img src={h.image_url} alt="" className="w-16 h-16 rounded-xl object-cover" />
                          <div>
                            <span className="text-[10px] text-[#A8582C] uppercase font-bold">{h.city} • {h.property_type}</span>
                            <h4 className="font-heading font-bold text-sm text-[#18392B]">{h.name}</h4>
                            <span className="font-bold text-[#18392B]">{formatPrice(h.price_per_night)} / nuit</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              onSelectHotel(h.id);
                              onClose();
                            }}
                            className="px-3 py-1.5 rounded-lg bg-[#18392B] text-white font-bold text-xs"
                          >
                            Voir
                          </button>
                          <button
                            onClick={() => toggleWishlist(h.id)}
                            className="p-1.5 text-[#8C7A65] hover:text-red-600"
                            title="Retirer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Saved Products */}
              {savedProducts.length > 0 && (
                <div>
                  <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-[#A8582C] mb-3 flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    Trésors d’Artisanat ({savedProducts.length})
                  </h3>
                  <div className="space-y-2">
                    {savedProducts.map(p => (
                      <div
                        key={p.id}
                        className="p-3 bg-white rounded-2xl border border-[#E6DEC8] flex items-center justify-between gap-3 text-xs shadow-xs"
                      >
                        <div className="flex items-center gap-3">
                          <img src={p.image} alt="" className="w-16 h-16 rounded-xl object-cover" />
                          <div>
                            <span className="text-[10px] text-[#A8582C] uppercase font-bold">{p.category} • {p.origin}</span>
                            <h4 className="font-heading font-bold text-sm text-[#18392B]">{p.name}</h4>
                            <span className="font-bold text-[#18392B]">{formatPrice(p.price)}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => addToCart(p, 1)}
                            className="px-3 py-1.5 rounded-lg bg-[#18392B] text-white font-bold text-xs flex items-center gap-1"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Panier</span>
                          </button>
                          <button
                            onClick={() => toggleWishlist(p.id)}
                            className="p-1.5 text-[#8C7A65] hover:text-red-600"
                            title="Retirer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
