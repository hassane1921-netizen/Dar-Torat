import React, { useState, useMemo } from 'react';
import { 
  X, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Lock, 
  Eye, 
  Plus, 
  ShoppingBag, 
  Layers, 
  BarChart3, 
  ShieldCheck, 
  Percent, 
  ArrowUpRight, 
  ArrowDownRight,
  Package,
  Calendar,
  Sparkles
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, ProductCategory, MoroccanRegion } from '../types';
import { MOROCCAN_REGIONS } from '../data/mockData';

interface SellerDashboardModalProps {
  onClose: () => void;
}

export const SellerDashboardModal: React.FC<SellerDashboardModalProps> = ({ onClose }) => {
  const { 
    sellers, 
    activeSellerId, 
    setActiveSellerId, 
    currentSeller, 
    products, 
    orders, 
    formatPrice, 
    demandTrends, 
    addProduct, 
    updateProduct,
    showToast 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'orders' | 'add-product'>('analytics');
  
  // New product form state
  const [newProdName, setNewProdName] = useState('');
  const [newProdArabicName, setNewProdArabicName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<Exclude<ProductCategory, 'Tous'>>('Céramique');
  const [newProdPublicPrice, setNewProdPublicPrice] = useState<number>(350);
  const [newProdCostPrice, setNewProdCostPrice] = useState<number>(200); // Taman lasli
  const [newProdStock, setNewProdStock] = useState<number>(15);
  const [newProdImage, setNewProdImage] = useState('https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdRegion, setNewProdRegion] = useState<MoroccanRegion>(currentSeller?.region || 'Fès-Meknès');

  // Filter products belonging to current seller
  const sellerProducts = useMemo(() => {
    return products.filter(p => p.sellerId === currentSeller?.id);
  }, [products, currentSeller]);

  // Orders containing seller's products
  const sellerOrders = useMemo(() => {
    return orders.filter(o => 
      o.items.some(i => i.product.sellerId === currentSeller?.id)
    );
  }, [orders, currentSeller]);

  // Order confirmation analytics (Confermation et Non-Conferm)
  const confirmedOrdersCount = sellerOrders.filter(o => o.status === 'confirmed' || o.status === 'delivered').length;
  const pendingOrdersCount = sellerOrders.filter(o => o.status === 'pending').length;
  const cancelledOrdersCount = sellerOrders.filter(o => o.status === 'cancelled').length;
  const totalOrdersCount = sellerOrders.length;
  const confirmationRate = totalOrdersCount > 0 ? Math.round((confirmedOrdersCount / totalOrdersCount) * 100) : 100;

  // Profit analytics (Rebh & Taman Lasli)
  // Total public revenue for this seller
  const sellerTotalRevenue = sellerProducts.reduce((sum, p) => sum + (p.price * 8), 0);
  // Total cost price (taman lasli)
  const sellerTotalCost = sellerProducts.reduce((sum, p) => sum + ((p.costPrice || (p.price * 0.6)) * 8), 0);
  // Net profit (rebh safi)
  const sellerNetProfit = sellerTotalRevenue - sellerTotalCost;
  // Profit margin percentage
  const profitMarginPercent = sellerTotalRevenue > 0 ? Math.round((sellerNetProfit / sellerTotalRevenue) * 100) : 40;

  // New product profit calculation
  const newProductUnitProfit = Math.max(0, newProdPublicPrice - newProdCostPrice);
  const newProductMarginPercent = newProdPublicPrice > 0 ? Math.round((newProductUnitProfit / newProdPublicPrice) * 100) : 0;

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentSeller) return;

    if (currentSeller.status !== 'approved') {
      showToast('Compte non approuvé : Vous devez attendre l’approbation de l’administrateur pour publier un produit.', 'warning');
      return;
    }

    if (!newProdName || newProdPublicPrice <= 0 || newProdCostPrice <= 0) {
      showToast('Veuillez renseigner le nom et des prix valides.', 'warning');
      return;
    }

    addProduct({
      name: newProdName,
      arabicName: newProdArabicName || newProdName,
      category: newProdCategory,
      origin: currentSeller.city,
      region: newProdRegion,
      province: currentSeller.city,
      price: newProdPublicPrice,
      costPrice: newProdCostPrice,
      description: newProdDesc || 'Création artisanale confectionnée à la main.',
      fullDescription: newProdDesc || 'Pièce authentique réalisée selon les techniques traditionnelles.',
      emoji: '✨',
      image: newProdImage,
      gallery: [newProdImage],
      artisan: {
        name: currentSeller.name,
        title: currentSeller.craftType,
        cooperative: currentSeller.shopName,
        bio: currentSeller.bio,
        avatar: currentSeller.avatar,
        city: currentSeller.city,
        region: currentSeller.region,
        verified: true,
        yearsOfMastery: currentSeller.experienceYears
      },
      sellerId: currentSeller.id,
      stock: newProdStock,
      estimatedDeliveryDays: '2 à 4 jours ouvrés'
    });

    // Reset form
    setNewProdName('');
    setNewProdArabicName('');
    setNewProdDesc('');
    setActiveTab('products');
  };

  const isApproved = currentSeller?.status === 'approved';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="bg-[#FAF7F2] w-full max-w-6xl rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[#E6DEC8] my-0 sm:my-6 flex flex-col max-h-[95vh] sm:max-h-[94vh]">
        
        {/* Top Header & Seller Switcher */}
        <div className="px-5 py-4 bg-white border-b border-[#EAE3D2] flex flex-wrap items-center justify-between gap-3 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#18392B] text-[#D4A373] flex items-center justify-center font-bold text-lg border border-[#D4A373]/40">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-heading text-lg font-bold text-[#18392B]">
                  Espace Vendeur / دشبورد البائع
                </h2>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isApproved 
                    ? 'bg-[#24533E]/10 text-[#24533E]' 
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {isApproved ? '✓ Vendeur Approuvé' : '⏳ En attente d’approbation admin'}
                </span>
              </div>
              <p className="text-xs text-[#8C7A65]">
                {currentSeller?.shopName} • {currentSeller?.city} ({currentSeller?.region})
              </p>
            </div>
          </div>

          {/* Switch Active Seller Selector */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-[#FAF7F2] border border-[#E0D5C1] rounded-xl px-2.5 py-1 text-xs">
              <span className="text-[#8C7A65] font-semibold text-[11px]">Compte :</span>
              <select
                aria-label="Changer de vendeur"
                value={activeSellerId}
                onChange={(e) => setActiveSellerId(e.target.value)}
                className="bg-transparent font-bold text-[#18392B] focus:outline-none cursor-pointer"
              >
                {sellers.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.shopName}) {s.status === 'pending' ? '⚠️ En attente' : '✓'}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#5C4D3C] hover:bg-[#FAF7F2]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Status Warning Banner if seller is not approved yet */}
        {!isApproved && (
          <div className="bg-amber-50 border-b border-amber-200 px-6 py-3 flex items-center justify-between text-xs text-amber-900">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Demande en cours d’examen :</strong> Votre compte vendeur doit être validé par le super administrateur avant de pouvoir publier vos articles sur la boutique en ligne.
              </span>
            </div>
            <span className="font-bold text-amber-700">En attente</span>
          </div>
        )}

        {/* Navigation Tabs inside Seller Dashboard */}
        <div className="px-6 pt-4 bg-[#FAF7F2] border-b border-[#EAE3D2] flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold whitespace-nowrap transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'analytics'
                ? 'bg-white text-[#18392B] border-[#18392B] shadow-xs'
                : 'text-[#8C7A65] border-transparent hover:text-[#18392B]'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-[#A8582C]" />
            <span>Analyse des Bénéfices & Demande</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold whitespace-nowrap transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'products'
                ? 'bg-white text-[#18392B] border-[#18392B] shadow-xs'
                : 'text-[#8C7A65] border-transparent hover:text-[#18392B]'
            }`}
          >
            <Package className="w-4 h-4 text-[#18392B]" />
            <span>Mes Produits & Prix de Revient ({sellerProducts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold whitespace-nowrap transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'orders'
                ? 'bg-white text-[#18392B] border-[#18392B] shadow-xs'
                : 'text-[#8C7A65] border-transparent hover:text-[#18392B]'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-[#24533E]" />
            <span>Confirmation des Commandes ({sellerOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('add-product')}
            disabled={!isApproved}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold whitespace-nowrap transition-all border-b-2 flex items-center gap-1.5 ${
              !isApproved 
                ? 'opacity-50 cursor-not-allowed text-[#8C7A65]'
                : activeTab === 'add-product'
                  ? 'bg-white text-[#18392B] border-[#18392B] shadow-xs'
                  : 'text-[#8C7A65] border-transparent hover:text-[#18392B]'
            }`}
          >
            <Plus className="w-4 h-4 text-[#D4A373]" />
            <span>Ajouter un Produit {!isApproved && '(Bloqué)'}</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1 bg-white">
          
          {/* TAB 1: Analytics (Confirmation, Non-Confirmation, Rebh, Taman Lasli & Mibyan So3od/Nozol) */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              
              {/* Row 1: Key Performance Metrics Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                
                {/* 1. Net Profit (Al Ribh As-Safi) */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#18392B]/5 to-[#18392B]/10 border border-[#18392B]/20">
                  <div className="flex items-center justify-between text-[#8C7A65] mb-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider">Bénéfice Net Réalisé (الربح الصافي)</span>
                    <DollarSign className="w-4 h-4 text-[#24533E]" />
                  </div>
                  <div className="font-heading text-xl sm:text-2xl font-bold text-[#18392B]">
                    {formatPrice(sellerNetProfit)}
                  </div>
                  <div className="text-[11px] text-[#24533E] font-bold mt-1 flex items-center gap-1">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>Marge nette : ~{profitMarginPercent}%</span>
                  </div>
                </div>

                {/* 2. Confirmed Orders (Confermation) */}
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <div className="flex items-center justify-between text-emerald-800 mb-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider">Commandes Confirmées (المؤكدة)</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="font-heading text-xl sm:text-2xl font-bold text-emerald-900">
                    {confirmedOrdersCount}
                  </div>
                  <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                    Taux de confirmation : {confirmationRate}%
                  </div>
                </div>

                {/* 3. Non-Confirmed Orders (Non-Conferm) */}
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                  <div className="flex items-center justify-between text-amber-800 mb-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider">Non-Confirmées / En Attente</span>
                    <Clock className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="font-heading text-xl sm:text-2xl font-bold text-amber-900">
                    {pendingOrdersCount}
                  </div>
                  <div className="text-[11px] text-amber-700 font-semibold mt-1">
                    {cancelledOrdersCount} annulée(s)
                  </div>
                </div>

                {/* 4. Total Cost vs Revenue (Taman Lasli) */}
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E6DEC8]">
                  <div className="flex items-center justify-between text-[#8C7A65] mb-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider">Coût de Revient Total (الثمن الأصلي)</span>
                    <Lock className="w-4 h-4 text-[#A8582C]" />
                  </div>
                  <div className="font-heading text-xl sm:text-2xl font-bold text-[#8C3A27]">
                    {formatPrice(sellerTotalCost)}
                  </div>
                  <div className="text-[10px] text-[#8C7A65] font-medium mt-1">
                    🔒 Visible uniquement par vous
                  </div>
                </div>

              </div>

              {/* Row 2: Visual Chart of Demand Fluctuations ("Mibyan So3od Wanozol Talab") */}
              <div className="bg-[#FAF7F2] p-5 sm:p-6 rounded-2xl border border-[#E6DEC8] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-heading text-base font-bold text-[#18392B] flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-[#A8582C]" />
                      <span>Courbe de la Demande & Évolution des Ventes (صعود ونزول الطلب)</span>
                    </h3>
                    <p className="text-xs text-[#5C4D3C] mt-0.5">
                      Visualisation des pics de commande, taux de confirmation et fluctuations hebdomadaires.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#18392B] bg-white px-3 py-1 rounded-full border border-[#E0D5C1] self-start sm:self-auto">
                    30 Derniers Jours
                  </span>
                </div>

                {/* Interactive Simulated Bar Chart */}
                <div className="space-y-3 pt-2">
                  {demandTrends.map((trend, idx) => {
                    const isUp = trend.trend === 'up';
                    const maxOrders = 80;
                    const widthPercent = Math.min(100, Math.round((trend.orders / maxOrders) * 100));

                    return (
                      <div key={idx} className="bg-white p-3.5 rounded-xl border border-[#E6DEC8] space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[#18392B]">{trend.period}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-[#5C4D3C]">
                              <strong>{trend.orders}</strong> commandes ({trend.confirmed} confirmées)
                            </span>
                            <span className="font-bold text-[#18392B]">
                              {formatPrice(trend.revenue)}
                            </span>
                            <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-[10px] font-bold ${
                              isUp 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                              {isUp ? '+' : ''}{trend.changeRate}% {isUp ? 'Hausse (صعود)' : 'Baisse (نزول)'}
                            </span>
                          </div>
                        </div>

                        {/* Visual Progress Bar */}
                        <div className="w-full bg-[#FAF7F2] h-3 rounded-full overflow-hidden flex border border-[#E0D5C1]">
                          <div 
                            className={`h-full transition-all duration-700 ${isUp ? 'bg-[#18392B]' : 'bg-[#A8582C]'}`}
                            style={{ width: `${widthPercent}%` }}
                            title={`${trend.orders} commandes`}
                          />
                        </div>

                        <div className="flex justify-between text-[11px] text-[#8C7A65]">
                          <span>Bénéfice estimé : <strong className="text-[#24533E]">{formatPrice(trend.profit)}</strong></span>
                          <span>Taux de validation : <strong>{Math.round((trend.confirmed / trend.orders) * 100)}%</strong></span>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>

              {/* Row 3: Product Profit Breakdown Table (Taman Lasli vs Taman Public) */}
              <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E6DEC8] space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-sm font-bold text-[#18392B] flex items-center gap-2">
                    <Percent className="w-4 h-4 text-[#D4A373]" />
                    <span>Tableau de Rentabilité par Produit (الثمن الأصلي وهامش الربح)</span>
                  </h3>
                  <span className="text-[11px] text-[#A8582C] font-bold flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    Le coût de revient est 100% privé
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-white border-b border-[#EAE3D2] text-[#8C7A65] uppercase text-[10px]">
                      <tr>
                        <th className="p-3">Produit</th>
                        <th className="p-3">Prix Public (ثمن البيع)</th>
                        <th className="p-3 text-[#A8582C]">Prix Revient (الثمن الأصلي) 🔒</th>
                        <th className="p-3 text-[#24533E]">Bénéfice Unitaire (الربح)</th>
                        <th className="p-3">Marge %</th>
                        <th className="p-3">Stock</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EAE3D2] bg-white">
                      {sellerProducts.map(p => {
                        const unitProfit = p.price - (p.costPrice || (p.price * 0.6));
                        const marginPct = Math.round((unitProfit / p.price) * 100);

                        return (
                          <tr key={p.id} className="hover:bg-[#FAF7F2] transition-colors">
                            <td className="p-3 font-bold text-[#18392B] flex items-center gap-2">
                              <img src={p.image} alt="" className="w-9 h-9 rounded-lg object-cover" />
                              <div>
                                <span>{p.name}</span>
                                <span className="block text-[10px] text-[#8C7A65] font-normal">{p.category}</span>
                              </div>
                            </td>
                            <td className="p-3 font-semibold text-[#18392B]">{formatPrice(p.price)}</td>
                            <td className="p-3 font-bold text-[#A8582C] bg-amber-50/50">
                              {formatPrice(p.costPrice || (p.price * 0.6))}
                            </td>
                            <td className="p-3 font-bold text-[#24533E] bg-emerald-50/50">
                              +{formatPrice(unitProfit)}
                            </td>
                            <td className="p-3 font-bold text-[#18392B]">{marginPct}%</td>
                            <td className="p-3 font-semibold text-[#5C4D3C]">{p.stock} pcs</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: Products List */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading text-base font-bold text-[#18392B]">
                    Catalogue Produits de l’Atelier
                  </h3>
                  <p className="text-xs text-[#5C4D3C]">
                    Gérez les stocks, le prix de revient privé et le prix de vente public.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('add-product')}
                  disabled={!isApproved}
                  className={`px-4 py-2 rounded-xl bg-[#18392B] text-white text-xs font-bold flex items-center gap-1.5 transition-all ${
                    !isApproved ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#24533E]'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5 text-[#D4A373]" />
                  <span>Ajouter une pièce</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sellerProducts.map(p => (
                  <div key={p.id} className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E6DEC8] space-y-3">
                    <img src={p.image} alt="" className="w-full h-40 rounded-xl object-cover" />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#A8582C]">{p.category} • {p.origin}</span>
                      <h4 className="font-heading font-bold text-sm text-[#18392B]">{p.name}</h4>
                      <p className="text-xs text-[#5C4D3C] line-clamp-1 mt-0.5">{p.description}</p>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-[#EAE3D2] space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-[#8C7A65]">Prix Public :</span>
                        <strong className="text-[#18392B]">{formatPrice(p.price)}</strong>
                      </div>
                      <div className="flex justify-between text-[#A8582C]">
                        <span>Thaman Lasli (Coût) 🔒 :</span>
                        <strong>{formatPrice(p.costPrice || (p.price * 0.6))}</strong>
                      </div>
                      <div className="flex justify-between text-[#24533E] pt-1 border-t border-[#FAF7F2]">
                        <span>Bénéfice Net :</span>
                        <strong>+{formatPrice(p.price - (p.costPrice || (p.price * 0.6)))} ({Math.round(((p.price - (p.costPrice || (p.price * 0.6))) / p.price) * 100)}%)</strong>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-[11px] text-[#24533E] font-semibold">Stock : {p.stock} unités</span>
                      <button
                        onClick={() => {
                          const newStock = prompt('Nouveau stock disponible :', String(p.stock));
                          if (newStock && !isNaN(Number(newStock))) {
                            updateProduct(p.id, { stock: Number(newStock) });
                          }
                        }}
                        className="px-2.5 py-1 bg-white hover:bg-[#EAE3D2] rounded-lg border text-[11px] font-bold text-[#18392B]"
                      >
                        Modifier stock
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Seller Orders Confirmation */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading text-base font-bold text-[#18392B]">
                    Commandes Reçues pour vos Créations
                  </h3>
                  <p className="text-xs text-[#5C4D3C]">
                    Analysez les commandes confirmées par vos clients et celles en attente de validation.
                  </p>
                </div>
              </div>

              {sellerOrders.length === 0 ? (
                <div className="p-8 text-center text-xs text-[#8C7A65]">
                  Aucune commande enregistrée pour l'instant pour cet atelier.
                </div>
              ) : (
                <div className="divide-y divide-[#EAE3D2] border border-[#E6DEC8] rounded-2xl overflow-hidden">
                  {sellerOrders.map(o => (
                    <div key={o.id} className="p-4 bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#18392B]">{o.orderNumber}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            o.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {o.status === 'confirmed' ? '✓ Confirmée' : '⏳ En attente de validation'}
                          </span>
                        </div>
                        <div className="text-[#5C4D3C] mt-0.5">
                          Client : <strong>{o.customer.fullName}</strong> ({o.customer.city}) • Tél : {o.customer.phone}
                        </div>
                        <div className="text-[11px] text-[#8C7A65]">
                          {o.items.map(i => `${i.quantity}x ${i.product.name}`).join(', ')}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-heading font-bold text-sm text-[#18392B]">
                          {formatPrice(o.total)}
                        </div>
                        <span className="text-[10px] text-[#24533E] font-semibold block">
                          Paiement : {o.paymentMethod.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Add Product Form with Confidential Cost Price */}
          {activeTab === 'add-product' && (
            <div className="max-w-2xl mx-auto space-y-5">
              <div>
                <h3 className="font-heading text-lg font-bold text-[#18392B]">
                  Publier une Nouvelle Création Artisanale
                </h3>
                <p className="text-xs text-[#5C4D3C]">
                  Renseignez votre coût de fabrication (Thaman Al-Asli) qui restera strictement privé et invisible pour vos clients.
                </p>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-[#8C7A65] block mb-1">Nom de la création (Français) *</label>
                    <input
                      type="text"
                      placeholder="Ex: Babouches en cuir brodé..."
                      value={newProdName}
                      onChange={(e) => setNewProdName(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#E0D5C1] rounded-xl px-3 py-2 text-xs text-[#18392B] focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-[#8C7A65] block mb-1">Nom en Arabe (العربية)</label>
                    <input
                      type="text"
                      placeholder="Ex: بلغة فاسية أصيلة..."
                      value={newProdArabicName}
                      onChange={(e) => setNewProdArabicName(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#E0D5C1] rounded-xl px-3 py-2 text-xs text-[#18392B] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-[#8C7A65] block mb-1">Catégorie</label>
                    <select
                      value={newProdCategory}
                      onChange={(e) => setNewProdCategory(e.target.value as Exclude<ProductCategory, 'Tous'>)}
                      className="w-full bg-[#FAF7F2] border border-[#E0D5C1] rounded-xl px-3 py-2 text-xs text-[#18392B] focus:outline-none"
                    >
                      <option value="Céramique">Céramique</option>
                      <option value="Maroquinerie">Maroquinerie</option>
                      <option value="Textile">Textile</option>
                      <option value="Métal & Cuivre">Métal & Cuivre</option>
                      <option value="Terroir & Bien-être">Terroir & Bien-être</option>
                      <option value="Couture">Couture</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#8C7A65] block mb-1">Région / Territoire</label>
                    <select
                      value={newProdRegion}
                      onChange={(e) => setNewProdRegion(e.target.value as MoroccanRegion)}
                      className="w-full bg-[#FAF7F2] border border-[#E0D5C1] rounded-xl px-3 py-2 text-xs text-[#18392B] focus:outline-none"
                    >
                      {MOROCCAN_REGIONS.map(r => (
                        <option key={r.region} value={r.region}>{r.region}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Price & Cost Comparison Box */}
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#8C3A27]">
                    <Lock className="w-4 h-4 text-[#A8582C]" />
                    <span>Fixation des Prix & Calcul de la Marge Nette</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-[#8C3A27] block mb-1">
                        Thaman Al-Asli (الثمن الأصلي / Coût de revient) 🔒 *
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={newProdCostPrice}
                        onChange={(e) => setNewProdCostPrice(Number(e.target.value))}
                        className="w-full bg-white border border-[#E0D5C1] rounded-xl px-3 py-2 text-xs font-bold text-[#A8582C] focus:outline-none"
                        required
                      />
                      <span className="text-[10px] text-[#8C7A65] mt-0.5 block">Invisible pour les clients</span>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-[#18392B] block mb-1">
                        Prix Public de Vente (ثمن البيع للزبون) *
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={newProdPublicPrice}
                        onChange={(e) => setNewProdPublicPrice(Number(e.target.value))}
                        className="w-full bg-white border border-[#E0D5C1] rounded-xl px-3 py-2 text-xs font-bold text-[#18392B] focus:outline-none"
                        required
                      />
                      <span className="text-[10px] text-[#8C7A65] mt-0.5 block">Prix affiché dans la boutique</span>
                    </div>
                  </div>

                  {/* Profit Preview */}
                  <div className="p-3 bg-white rounded-xl border border-amber-200 flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#5C4D3C]">
                      Bénéfice Net par Vente : <strong className="text-[#24533E]">+{formatPrice(newProductUnitProfit)}</strong>
                    </span>
                    <span className="font-bold text-[#18392B] bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      Marge : {newProductMarginPercent}%
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-[#8C7A65] block mb-1">Quantité en stock</label>
                    <input
                      type="number"
                      min={1}
                      value={newProdStock}
                      onChange={(e) => setNewProdStock(Number(e.target.value))}
                      className="w-full bg-[#FAF7F2] border border-[#E0D5C1] rounded-xl px-3 py-2 text-xs text-[#18392B] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#8C7A65] block mb-1">URL de l'image</label>
                    <input
                      type="url"
                      value={newProdImage}
                      onChange={(e) => setNewProdImage(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#E0D5C1] rounded-xl px-3 py-2 text-xs text-[#18392B] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#8C7A65] block mb-1">Description & Savoir-faire</label>
                  <textarea
                    rows={2}
                    value={newProdDesc}
                    onChange={(e) => setNewProdDesc(e.target.value)}
                    placeholder="Matières utilisées, technique artisanale, histoire..."
                    className="w-full bg-[#FAF7F2] border border-[#E0D5C1] rounded-xl px-3 py-2 text-xs text-[#18392B] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-[#18392B] hover:bg-[#24533E] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Plus className="w-4 h-4 text-[#D4A373]" />
                  <span>Publier la création dans la boutique</span>
                </button>
              </form>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
