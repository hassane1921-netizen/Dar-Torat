import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Banknote, 
  Building, 
  CheckCircle2, 
  Printer, 
  MessageSquare,
  ArrowRight,
  PackageCheck
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Order } from '../types';

interface CheckoutModalProps {
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ onClose }) => {
  const { 
    cart, 
    cartSubtotalMAD, 
    formatPrice, 
    addOrder, 
    currency, 
    getWhatsAppUrl, 
    openModal 
  } = useStore();

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Fès');
  const [country, setCountry] = useState('Maroc');
  const [shippingMethod, setShippingMethod] = useState<'express_morocco' | 'standard_morocco' | 'international' | 'pickup'>('express_morocco');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card' | 'transfer'>('cod');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Calculate shipping cost
  const shippingCost = React.useMemo(() => {
    if (shippingMethod === 'pickup') return 0;
    if (shippingMethod === 'international') return 250;
    if (shippingMethod === 'express_morocco') {
      return cartSubtotalMAD >= 500 ? 0 : 40;
    }
    return 30;
  }, [shippingMethod, cartSubtotalMAD]);

  const total = cartSubtotalMAD + shippingCost;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMsg('Veuillez renseigner votre nom complet.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Veuillez renseigner une adresse email valide.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Veuillez renseigner votre numéro de téléphone WhatsApp.');
      return;
    }
    if (shippingMethod !== 'pickup' && !address.trim()) {
      setErrorMsg('Veuillez renseigner votre adresse de livraison.');
      return;
    }

    const newOrder = addOrder({
      items: [...cart],
      subtotal: cartSubtotalMAD,
      shippingCost,
      discount: 0,
      total,
      currency,
      shippingMethod,
      paymentMethod,
      customer: {
        fullName,
        email,
        phone,
        address,
        city,
        country
      },
      notes
    });

    setCreatedOrder(newOrder);
    setStep('success');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="bg-[#FAF7F2] w-full max-w-3xl rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[#E6DEC8] my-0 sm:my-8 flex flex-col max-h-[94vh] sm:max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-[#EAE3D2] flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-[#18392B]" />
            <h2 className="font-heading text-lg font-bold text-[#18392B]">
              {step === 'form' ? 'Finalisation de votre commande' : 'Commande Confirmée !'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#5C4D3C] hover:bg-[#FAF7F2]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-4 sm:p-8 flex-1">
          {step === 'form' ? (
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              
              {errorMsg && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                  {errorMsg}
                </div>
              )}

              {/* 1. Customer Information */}
              <div className="bg-white p-5 rounded-2xl border border-[#E6DEC8] space-y-3">
                <h3 className="font-heading text-sm font-bold text-[#18392B] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#18392B] text-white text-xs flex items-center justify-center">1</span>
                  Vos Coordonnées
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Nom complet *"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-[#FAF7F2] border border-[#E0D5C1] rounded-xl px-3 py-2 text-xs text-[#18392B] focus:outline-none focus:border-[#18392B]"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Adresse email *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[#FAF7F2] border border-[#E0D5C1] rounded-xl px-3 py-2 text-xs text-[#18392B] focus:outline-none focus:border-[#18392B]"
                    required
                  />
                </div>

                <input
                  type="tel"
                  placeholder="Numéro de téléphone / WhatsApp (ex: +212 6... ou +33...) *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#E0D5C1] rounded-xl px-3 py-2 text-xs text-[#18392B] focus:outline-none focus:border-[#18392B]"
                  required
                />
              </div>

              {/* 2. Delivery Address */}
              <div className="bg-white p-5 rounded-2xl border border-[#E6DEC8] space-y-3">
                <h3 className="font-heading text-sm font-bold text-[#18392B] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#18392B] text-white text-xs flex items-center justify-center">2</span>
                  Adresse de Livraison
                </h3>

                <input
                  type="text"
                  placeholder="Adresse de rue, quartier, bâtiment *"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#E0D5C1] rounded-xl px-3 py-2 text-xs text-[#18392B] focus:outline-none focus:border-[#18392B]"
                  required={shippingMethod !== 'pickup'}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-[#8C7A65] block mb-1">Ville</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#E0D5C1] rounded-xl px-3 py-2 text-xs text-[#18392B] focus:outline-none focus:border-[#18392B]"
                    >
                      <option value="Fès">Fès</option>
                      <option value="Meknès">Meknès</option>
                      <option value="Casablanca">Casablanca</option>
                      <option value="Rabat">Rabat</option>
                      <option value="Marrakech">Marrakech</option>
                      <option value="Tanger">Tanger</option>
                      <option value="Agadir">Agadir</option>
                      <option value="Autre">Autre ville</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase text-[#8C7A65] block mb-1">Pays</label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#E0D5C1] rounded-xl px-3 py-2 text-xs text-[#18392B] focus:outline-none focus:border-[#18392B]"
                    >
                      <option value="Maroc">Maroc (المغرب)</option>
                      <option value="France">France</option>
                      <option value="Belgique">Belgique</option>
                      <option value="Suisse">Suisse</option>
                      <option value="Espagne">Espagne</option>
                      <option value="Royaume-Uni">Royaume-Uni</option>
                      <option value="États-Unis">États-Unis</option>
                      <option value="Canada">Canada</option>
                      <option value="Autre">Autre destination internationale</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 3. Shipping Method */}
              <div className="bg-white p-5 rounded-2xl border border-[#E6DEC8] space-y-3">
                <h3 className="font-heading text-sm font-bold text-[#18392B] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#18392B] text-white text-xs flex items-center justify-center">3</span>
                  Mode d’Expédition
                </h3>

                <div className="space-y-2">
                  <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer text-xs transition-colors ${
                    shippingMethod === 'express_morocco' ? 'bg-[#18392B]/5 border-[#18392B]' : 'bg-[#FAF7F2] border-[#E0D5C1]'
                  }`}>
                    <div className="flex items-center gap-2.5">
                      <input 
                        type="radio" 
                        name="shipping" 
                        checked={shippingMethod === 'express_morocco'}
                        onChange={() => setShippingMethod('express_morocco')}
                        className="text-[#18392B] focus:ring-0"
                      />
                      <div>
                        <div className="font-bold text-[#18392B]">Livraison Express Maroc (24h - 48h)</div>
                        <div className="text-[11px] text-[#8C7A65]">Remise en main propre contre signature</div>
                      </div>
                    </div>
                    <span className="font-bold text-[#18392B]">
                      {cartSubtotalMAD >= 500 ? 'Gratuit' : formatPrice(40)}
                    </span>
                  </label>

                  <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer text-xs transition-colors ${
                    shippingMethod === 'pickup' ? 'bg-[#18392B]/5 border-[#18392B]' : 'bg-[#FAF7F2] border-[#E0D5C1]'
                  }`}>
                    <div className="flex items-center gap-2.5">
                      <input 
                        type="radio" 
                        name="shipping" 
                        checked={shippingMethod === 'pickup'}
                        onChange={() => setShippingMethod('pickup')}
                        className="text-[#18392B] focus:ring-0"
                      />
                      <div>
                        <div className="font-bold text-[#18392B]">Retrait gratuit à l’Atelier (Fès ou Meknès)</div>
                        <div className="text-[11px] text-[#8C7A65]">Prêt sous 24h avec thé de bienvenue</div>
                      </div>
                    </div>
                    <span className="font-bold text-[#24533E]">Gratuit</span>
                  </label>

                  <label className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer text-xs transition-colors ${
                    shippingMethod === 'international' ? 'bg-[#18392B]/5 border-[#18392B]' : 'bg-[#FAF7F2] border-[#E0D5C1]'
                  }`}>
                    <div className="flex items-center gap-2.5">
                      <input 
                        type="radio" 
                        name="shipping" 
                        checked={shippingMethod === 'international'}
                        onChange={() => setShippingMethod('international')}
                        className="text-[#18392B] focus:ring-0"
                      />
                      <div>
                        <div className="font-bold text-[#18392B]">Expédition Internationale Sécurisée (DHL / FedEx Express)</div>
                        <div className="text-[11px] text-[#8C7A65]">Europe, Amérique & Moyen-Orient (4 à 7 jours)</div>
                      </div>
                    </div>
                    <span className="font-bold text-[#18392B]">{formatPrice(250)}</span>
                  </label>
                </div>
              </div>

              {/* 4. Payment Method */}
              <div className="bg-white p-5 rounded-2xl border border-[#E6DEC8] space-y-3">
                <h3 className="font-heading text-sm font-bold text-[#18392B] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#18392B] text-white text-xs flex items-center justify-center">4</span>
                  Mode de Paiement
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <label className={`p-3 rounded-xl border cursor-pointer text-xs flex flex-col justify-between transition-colors ${
                    paymentMethod === 'cod' ? 'bg-[#18392B]/5 border-[#18392B]' : 'bg-[#FAF7F2] border-[#E0D5C1]'
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      <input 
                        type="radio" 
                        name="payment" 
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="text-[#18392B] focus:ring-0"
                      />
                      <Banknote className="w-4 h-4 text-[#18392B]" />
                      <span className="font-bold text-[#18392B]">Paiement à la livraison</span>
                    </div>
                    <p className="text-[10px] text-[#8C7A65]">Réglez en espèces à réception du colis</p>
                  </label>

                  <label className={`p-3 rounded-xl border cursor-pointer text-xs flex flex-col justify-between transition-colors ${
                    paymentMethod === 'card' ? 'bg-[#18392B]/5 border-[#18392B]' : 'bg-[#FAF7F2] border-[#E0D5C1]'
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      <input 
                        type="radio" 
                        name="payment" 
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="text-[#18392B] focus:ring-0"
                      />
                      <CreditCard className="w-4 h-4 text-[#A8582C]" />
                      <span className="font-bold text-[#18392B]">Carte Bancaire CMI / Visa</span>
                    </div>
                    <p className="text-[10px] text-[#8C7A65]">Paiement 3D Secure 100% crypté</p>
                  </label>

                  <label className={`p-3 rounded-xl border cursor-pointer text-xs flex flex-col justify-between transition-colors ${
                    paymentMethod === 'transfer' ? 'bg-[#18392B]/5 border-[#18392B]' : 'bg-[#FAF7F2] border-[#E0D5C1]'
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      <input 
                        type="radio" 
                        name="payment" 
                        checked={paymentMethod === 'transfer'}
                        onChange={() => setPaymentMethod('transfer')}
                        className="text-[#18392B] focus:ring-0"
                      />
                      <Building className="w-4 h-4 text-[#D4A373]" />
                      <span className="font-bold text-[#18392B]">Virement Bancaire</span>
                    </div>
                    <p className="text-[10px] text-[#8C7A65]">RIB transmis après confirmation</p>
                  </label>
                </div>
              </div>

              {/* Order Summary & Submit */}
              <div className="bg-white p-5 rounded-2xl border border-[#E6DEC8] space-y-3">
                <div className="flex justify-between text-xs text-[#5C4D3C]">
                  <span>Sous-total ({cart.length} articles) :</span>
                  <span>{formatPrice(cartSubtotalMAD)}</span>
                </div>
                <div className="flex justify-between text-xs text-[#5C4D3C]">
                  <span>Frais de livraison :</span>
                  <span>{shippingCost === 0 ? 'Offert' : formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between text-[#18392B] font-bold text-base pt-2 border-t border-[#EAE3D2]">
                  <span>Montant Total :</span>
                  <span className="font-heading text-xl">{formatPrice(total)}</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#18392B] hover:bg-[#24533E] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all mt-4"
                >
                  <PackageCheck className="w-4 h-4 text-[#D4A373]" />
                  <span>Valider et Enregistrer ma Commande</span>
                </button>
              </div>

            </form>
          ) : (
            /* Step 2: Order Success Voucher */
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 bg-[#24533E]/10 text-[#24533E] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-[#24533E]" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#A8582C]">
                  Confirmation de Commande
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#18392B] mt-1">
                  Merci pour votre confiance, {createdOrder?.customer.fullName} !
                </h3>
                <p className="text-xs sm:text-sm text-[#5C4D3C] mt-1">
                  Votre bon de commande N° <strong>{createdOrder?.orderNumber}</strong> a été transmis à nos ateliers.
                </p>
              </div>

              {/* Printable Voucher Card */}
              <div id="order-voucher" className="bg-white p-6 rounded-2xl border-2 border-dashed border-[#D4A373] text-left space-y-4 max-w-lg mx-auto shadow-sm">
                <div className="flex justify-between items-center border-b border-[#EAE3D2] pb-3">
                  <div>
                    <span className="font-heading font-bold text-sm text-[#18392B]">DAR DIAFA</span>
                    <span className="text-[10px] text-[#8C7A65] block">Sanctuaire de l'Artisanat • Fès</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-[#18392B]">{createdOrder?.orderNumber}</span>
                    <span className="text-[10px] text-[#8C7A65] block">{createdOrder?.createdAt}</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="text-[#8C7A65] font-semibold">Articles commandés :</div>
                  {createdOrder?.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-[#18392B]">
                      <span>{item.quantity}x {item.product.name}</span>
                      <span className="font-semibold">{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                  
                  <div className="pt-2 border-t border-[#FAF7F2] flex justify-between text-[#8C7A65]">
                    <span>Livraison ({createdOrder?.customer.city}) :</span>
                    <span>{createdOrder?.shippingCost === 0 ? 'Gratuit' : formatPrice(createdOrder?.shippingCost || 0)}</span>
                  </div>

                  <div className="pt-2 border-t border-[#EAE3D2] flex justify-between font-bold text-sm text-[#18392B]">
                    <span>Total payé / à régler :</span>
                    <span className="font-heading">{formatPrice(createdOrder?.total || 0)}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#FAF7F2] text-[11px] text-[#5C4D3C]">
                  <strong>Livraison à :</strong> {createdOrder?.customer.address}, {createdOrder?.customer.city} ({createdOrder?.customer.country})<br />
                  <strong>Téléphone :</strong> {createdOrder?.customer.phone}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handlePrint}
                  className="px-5 py-2.5 rounded-xl border border-[#18392B] text-[#18392B] hover:bg-[#18392B] hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimer le bon de commande</span>
                </button>

                <a
                  href={getWhatsAppUrl(`Bonjour Dar Diafa, voici le suivi de ma commande ${createdOrder?.orderNumber} d'un montant de ${createdOrder?.total} MAD au nom de ${createdOrder?.customer.fullName}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-[#25D366] text-white hover:bg-[#20ba5a] text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Suivre sur WhatsApp (+212 7 07 68 48 12)</span>
                </a>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
