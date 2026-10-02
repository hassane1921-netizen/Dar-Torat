import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Users, 
  Store, 
  Calendar, 
  ShoppingBag, 
  TrendingUp, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  MessageSquare, 
  Phone, 
  Mail, 
  MapPin, 
  DollarSign, 
  Sparkles,
  ArrowRight,
  Filter,
  UserCheck
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { MOROCCAN_REGIONS } from '../data/mockData';

interface AdminDashboardModalProps {
  onClose: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({ onClose }) => {
  const { 
    bookings, 
    orders, 
    sellers, 
    sellerApplications, 
    customers, 
    hotels, 
    products, 
    formatPrice, 
    approveSeller, 
    rejectSeller, 
    approveApplication, 
    updateOrderStatus, 
    updateBookingStatus, 
    getWhatsAppUrl 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'sellers-approval' | 'customers' | 'orders' | 'bookings'>('sellers-approval');
  const [customerSearch, setCustomerSearch] = useState('');
  const [orderFilter, setOrderFilter] = useState<'all' | 'confirmed' | 'pending' | 'cancelled'>('all');

  // Platform metrics
  const totalBookingsMAD = bookings.reduce((sum, b) => sum + b.totalPrice, 0);
  const totalOrdersMAD = orders.reduce((sum, o) => sum + o.total, 0);
  const totalPlatformMAD = totalBookingsMAD + totalOrdersMAD;
  const pendingApplications = sellerApplications.filter(a => a.status === 'pending');
  const pendingSellersCount = sellers.filter(s => s.status === 'pending').length + pendingApplications.length;

  // Filtered customers
  const filteredCustomers = customers.filter(c => {
    if (!customerSearch.trim()) return true;
    const q = customerSearch.toLowerCase();
    return c.fullName.toLowerCase().includes(q) || c.phone.includes(q) || c.email.toLowerCase().includes(q) || c.city.toLowerCase().includes(q);
  });

  // Filtered orders
  const filteredOrders = orders.filter(o => {
    if (orderFilter === 'all') return true;
    return o.status === orderFilter;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="bg-[#FAF7F2] w-full max-w-6xl rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[#E6DEC8] my-0 sm:my-6 flex flex-col max-h-[95vh] sm:max-h-[94vh]">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#18392B] text-white flex flex-wrap items-center justify-between gap-3 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4A373] text-[#18392B] flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-heading text-lg font-bold">
                  Super Admin • لوحة تحكم المدير العام
                </h2>
                <span className="text-[10px] uppercase font-bold bg-[#D4A373] text-[#18392B] px-2 py-0.5 rounded-full">
                  Accès Fondateur
                </span>
              </div>
              <p className="text-xs text-white/70">
                Gestion centrale de toutes les données clients, validation des vendeurs et suivi des flux
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Stats Strip */}
        <div className="bg-white px-6 py-3 border-b border-[#EAE3D2] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-[#8C7A65] block text-[10px] uppercase font-bold">Volume Total d’Affaires</span>
            <strong className="text-base text-[#18392B] font-heading">{formatPrice(totalPlatformMAD)}</strong>
          </div>
          <div>
            <span className="text-[#8C7A65] block text-[10px] uppercase font-bold">Base Clients Enregistrés</span>
            <strong className="text-base text-[#18392B]">{customers.length} acheteurs</strong>
          </div>
          <div>
            <span className="text-[#8C7A65] block text-[10px] uppercase font-bold">Artisans Actifs</span>
            <strong className="text-base text-[#24533E]">{sellers.filter(s => s.status === 'approved').length} maîtres agréés</strong>
          </div>
          <div>
            <span className="text-[#8C7A65] block text-[10px] uppercase font-bold">Demandes Vendeurs en Attente</span>
            <span className="inline-flex items-center gap-1 font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
              <AlertCircle className="w-3.5 h-3.5" />
              {pendingApplications.length} à valider
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 pt-3 bg-[#FAF7F2] border-b border-[#EAE3D2] flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('sellers-approval')}
            className={`px-4 py-2 rounded-t-xl text-xs font-bold whitespace-nowrap transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'sellers-approval'
                ? 'bg-white text-[#18392B] border-[#18392B] shadow-xs'
                : 'text-[#8C7A65] border-transparent hover:text-[#18392B]'
            }`}
          >
            <Store className="w-4 h-4 text-[#A8582C]" />
            <span>Approbation Vendeurs ({pendingApplications.length})</span>
            {pendingApplications.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('customers')}
            className={`px-4 py-2 rounded-t-xl text-xs font-bold whitespace-nowrap transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'customers'
                ? 'bg-white text-[#18392B] border-[#18392B] shadow-xs'
                : 'text-[#8C7A65] border-transparent hover:text-[#18392B]'
            }`}
          >
            <Users className="w-4 h-4 text-[#18392B]" />
            <span>Données Complètes des Clients ({customers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-t-xl text-xs font-bold whitespace-nowrap transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'orders'
                ? 'bg-white text-[#18392B] border-[#18392B] shadow-xs'
                : 'text-[#8C7A65] border-transparent hover:text-[#18392B]'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-[#24533E]" />
            <span>Commandes d’Artisanat ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 rounded-t-xl text-xs font-bold whitespace-nowrap transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'bookings'
                ? 'bg-white text-[#18392B] border-[#18392B] shadow-xs'
                : 'text-[#8C7A65] border-transparent hover:text-[#18392B]'
            }`}
          >
            <Calendar className="w-4 h-4 text-[#D4A373]" />
            <span>Réservations Riads ({bookings.length})</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1 bg-white">
          
          {/* TAB 1: SELLERS APPROVAL ("talab dayal lbai3 hta n9blo 3ad ib9A ihet les product") */}
          {activeTab === 'sellers-approval' && (
            <div className="space-y-6">
              
              {/* Pending applications banner */}
              <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200">
                <div className="flex items-center gap-2 mb-1">
                  <AlertCircle className="w-5 h-5 text-amber-700" />
                  <h3 className="font-heading text-sm font-bold text-amber-900">
                    Demandes d'Adhésion Vendeurs en Attente de Votre Validation
                  </h3>
                </div>
                <p className="text-xs text-amber-800">
                  Règle stricte : Tant que vous n'avez pas cliqué sur <strong>"Accepter / Approuver"</strong>, l'artisan ne peut pas publier de produits dans la boutique publique.
                </p>
              </div>

              {pendingApplications.length === 0 ? (
                <div className="p-8 text-center bg-[#FAF7F2] rounded-2xl border border-[#E6DEC8] text-xs text-[#8C7A65]">
                  <CheckCircle2 className="w-8 h-8 text-[#24533E] mx-auto mb-2" />
                  Toutes les candidatures ont été traitées ! Aucun dossier en attente.
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingApplications.map(app => (
                    <div 
                      key={app.id} 
                      className="p-5 rounded-2xl bg-white border-2 border-amber-300 shadow-sm space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EAE3D2] pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-heading font-bold text-base text-[#18392B]">{app.fullName}</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                              En attente d'approbation
                            </span>
                          </div>
                          <span className="text-xs text-[#8C7A65]">
                            {app.cooperativeName} • Région : <strong>{app.region}</strong> ({app.city})
                          </span>
                        </div>

                        {/* Approval Action Buttons */}
                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <button
                            onClick={() => approveApplication(app.id)}
                            className="px-4 py-2 rounded-xl bg-[#24533E] hover:bg-[#18392B] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#D4A373]" />
                            <span>Accepter & Autoriser la Vente</span>
                          </button>

                          <a
                            href={getWhatsAppUrl(`Bonjour Maâlem ${app.fullName}, nous examinons votre candidature sur Dar Diafa pour l'atelier ${app.cooperativeName}...`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10"
                            title="Contacter sur WhatsApp"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </a>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#5C4D3C]">
                        <div>
                          <span className="text-[#8C7A65] block text-[10px] uppercase font-bold">Métier</span>
                          <strong>{app.craftType}</strong> ({app.experienceYears} ans de pratique)
                        </div>
                        <div>
                          <span className="text-[#8C7A65] block text-[10px] uppercase font-bold">Contact</span>
                          <span>{app.phone} • {app.email}</span>
                        </div>
                        <div>
                          <span className="text-[#8C7A65] block text-[10px] uppercase font-bold">Catalogue Prévu</span>
                          <span>{app.productSampleCount} références prêtes</span>
                        </div>
                      </div>

                      <p className="text-xs text-[#5C4D3C] bg-[#FAF7F2] p-3 rounded-xl border border-[#EAE3D2] italic">
                        "{app.portfolioDescription}"
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* List of Already Approved Vendors */}
              <div className="pt-6 border-t border-[#EAE3D2] space-y-3">
                <h4 className="font-heading text-sm font-bold text-[#18392B] flex items-center justify-between">
                  <span>Vendeurs Actifs et Autorisés à Vendre ({sellers.filter(s => s.status === 'approved').length})</span>
                  <span className="text-xs text-[#24533E] font-normal">Ces artisans ont le droit de publier</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {sellers.filter(s => s.status === 'approved').map(seller => (
                    <div key={seller.id} className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E6DEC8] flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <img src={seller.avatar} alt="" className="w-12 h-12 rounded-xl object-cover" />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <strong className="text-sm text-[#18392B]">{seller.name}</strong>
                            <span className="text-[10px] text-[#24533E] font-bold">✓ Actif</span>
                          </div>
                          <span className="text-[#8C7A65] block">{seller.shopName}</span>
                          <span className="text-[11px] text-[#A8582C] font-semibold">{seller.region} ({seller.city})</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => rejectSeller(seller.id)}
                          className="px-2.5 py-1 text-[11px] text-red-700 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200"
                          title="Suspendre ce vendeur"
                        >
                          Suspendre
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: CUSTOMERS DATA HUB ("data kamla dayal zobanae") */}
          {activeTab === 'customers' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-heading text-base font-bold text-[#18392B]">
                    Répertoire Central des Clients & Acheteurs
                  </h3>
                  <p className="text-xs text-[#5C4D3C]">
                    Coordonnées téléphoniques, emails, historique de commandes et montants dépensés.
                  </p>
                </div>

                <input
                  type="text"
                  placeholder="Rechercher par nom, ville, tél..."
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                  className="bg-[#FAF7F2] border border-[#E0D5C1] rounded-xl px-3 py-2 text-xs text-[#18392B] focus:outline-none w-full sm:w-64"
                />
              </div>

              <div className="overflow-x-auto border border-[#E6DEC8] rounded-2xl">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#FAF7F2] text-[#8C7A65] uppercase text-[10px] border-b border-[#EAE3D2]">
                    <tr>
                      <th className="p-3">Client</th>
                      <th className="p-3">Téléphone WhatsApp</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Ville / Région</th>
                      <th className="p-3">Dépenses Cumulées</th>
                      <th className="p-3">Commandes</th>
                      <th className="p-3">Statut</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAE3D2]">
                    {filteredCustomers.map(cust => (
                      <tr key={cust.id} className="hover:bg-[#FAF7F2] transition-colors">
                        <td className="p-3 font-bold text-[#18392B]">{cust.fullName}</td>
                        <td className="p-3 font-semibold text-[#18392B]">{cust.phone}</td>
                        <td className="p-3 text-[#5C4D3C]">{cust.email}</td>
                        <td className="p-3 text-[#8C7A65]">{cust.city}</td>
                        <td className="p-3 font-heading font-bold text-[#18392B]">{formatPrice(cust.totalSpent)}</td>
                        <td className="p-3 font-semibold text-[#5C4D3C]">{cust.totalOrders} achat(s)</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            cust.status === 'vip' ? 'bg-[#D4A373]/20 text-[#8C3A27]' : 'bg-[#18392B]/10 text-[#18392B]'
                          }`}>
                            {cust.status === 'vip' ? '⭐ VIP' : 'Actif'}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <a
                            href={getWhatsAppUrl(`Bonjour ${cust.fullName}, l'équipe Dar Diafa vous remercie pour votre fidélité...`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#25D366] text-white text-[11px] font-bold"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>WhatsApp</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* TAB 3: ALL ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 className="font-heading text-base font-bold text-[#18392B]">
                  Toutes les Commandes d'Artisanat de la Plateforme
                </h3>

                {/* Filter buttons */}
                <div className="flex items-center gap-1 bg-[#FAF7F2] p-1 rounded-xl border border-[#E0D5C1] text-xs">
                  <button
                    onClick={() => setOrderFilter('all')}
                    className={`px-3 py-1 rounded-lg font-bold ${orderFilter === 'all' ? 'bg-[#18392B] text-white' : 'text-[#8C7A65]'}`}
                  >
                    Toutes ({orders.length})
                  </button>
                  <button
                    onClick={() => setOrderFilter('confirmed')}
                    className={`px-3 py-1 rounded-lg font-bold ${orderFilter === 'confirmed' ? 'bg-[#18392B] text-white' : 'text-[#8C7A65]'}`}
                  >
                    Confirmées ({orders.filter(o => o.status === 'confirmed').length})
                  </button>
                  <button
                    onClick={() => setOrderFilter('pending')}
                    className={`px-3 py-1 rounded-lg font-bold ${orderFilter === 'pending' ? 'bg-[#18392B] text-white' : 'text-[#8C7A65]'}`}
                  >
                    En Attente ({orders.filter(o => o.status === 'pending').length})
                  </button>
                </div>
              </div>

              <div className="divide-y divide-[#EAE3D2] border border-[#E6DEC8] rounded-2xl overflow-hidden">
                {filteredOrders.map(o => (
                  <div key={o.id} className="p-4 bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-sm text-[#18392B]">{o.orderNumber}</strong>
                        <span className="text-[#8C7A65]">({o.createdAt})</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          o.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {o.status === 'confirmed' ? '✓ Confirmée' : '⏳ Non-Confirmée'}
                        </span>
                      </div>
                      <div className="text-[#5C4D3C] mt-1">
                        Client : <strong>{o.customer.fullName}</strong> ({o.customer.phone}) • {o.customer.city}
                      </div>
                      <div className="text-[11px] text-[#8C7A65]">
                        Articles : {o.items.map(i => `${i.quantity}x ${i.product.name}`).join(', ')}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end md:self-center">
                      <div className="text-right">
                        <span className="font-heading font-bold text-sm text-[#18392B] block">
                          {formatPrice(o.total)}
                        </span>
                        <span className="text-[10px] text-[#24533E] font-medium">
                          Paiement : {o.paymentMethod.toUpperCase()}
                        </span>
                      </div>

                      {/* Status toggle button */}
                      <button
                        onClick={() => updateOrderStatus(o.id, o.status === 'confirmed' ? 'pending' : 'confirmed')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                          o.status === 'confirmed'
                            ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                            : 'bg-emerald-600 text-white hover:bg-emerald-700'
                        }`}
                      >
                        {o.status === 'confirmed' ? 'Passer en Attente' : 'Confirmer'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 4: BOOKINGS */}
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              <h3 className="font-heading text-base font-bold text-[#18392B]">
                Réservations de Riads & Demeures Historiques
              </h3>

              <div className="divide-y divide-[#EAE3D2] border border-[#E6DEC8] rounded-2xl overflow-hidden">
                {bookings.map(b => (
                  <div key={b.id} className="p-4 bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-sm text-[#18392B]">{b.guestName}</strong>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#18392B]/10 text-[#18392B]">
                          {b.bookingRef}
                        </span>
                      </div>
                      <div className="text-[#5C4D3C] mt-0.5">
                        Demeure : <strong>{b.hotelName}</strong> ({b.hotelCity}, {b.hotelRegion}) • {b.roomName}
                      </div>
                      <div className="text-[11px] text-[#8C7A65]">
                        Du {b.checkIn} au {b.checkOut} ({b.nights} nuits • {b.guests} voyageurs) • Tél : {b.guestPhone}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end md:self-center">
                      <div className="text-right">
                        <span className="font-heading font-bold text-sm text-[#18392B] block">
                          {formatPrice(b.totalPrice)}
                        </span>
                        <span className="text-[10px] text-[#24533E] font-bold">
                          {b.status === 'confirmed' ? '✓ Confirmée' : '⏳ En attente'}
                        </span>
                      </div>

                      <button
                        onClick={() => updateBookingStatus(b.id, b.status === 'confirmed' ? 'pending' : 'confirmed')}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                          b.status === 'confirmed'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-600 text-white'
                        }`}
                      >
                        {b.status === 'confirmed' ? 'Marquer En attente' : 'Valider'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
