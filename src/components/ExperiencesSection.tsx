import React, { useState } from 'react';
import { 
  CalendarCheck2, 
  Clock, 
  Users, 
  MapPin, 
  Check, 
  ArrowRight, 
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Calendar,
  X
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Activity } from '../types';

export const ExperiencesSection: React.FC = () => {
  const { activities, formatPrice, language, getWhatsAppUrl, showToast } = useStore();
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  
  // Quick booking modal inside activity
  const [bookingDate, setBookingDate] = useState('');
  const [participants, setParticipants] = useState(2);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const t = {
    fr: {
      pretitle: 'Art de Vivre & Découvertes',
      title: 'Expériences & Ateliers Diafa',
      arabicTitle: 'تجارب وأنشطة الضيافة المغربية الأصيلة',
      subtitle: 'Vivez l’authenticité du Maroc impérial : cours de cuisine avec nos cheffes dadas, secrets de la médina et rituels de bien-être séculaires.',
      bookActivity: 'Réserver l’expérience',
      perPerson: '/ personne',
      includesTitle: 'Ce qui est inclus :',
      meetingPoint: 'Point de rendez-vous :'
    },
    ar: {
      pretitle: 'فن العيش والاكتشاف',
      title: 'تجارب وورشات الضيافة المغربية',
      arabicTitle: 'تجارب وأنشطة الضيافة المغربية الأصيلة',
      subtitle: 'عش أصالة المغرب الإمبراطوري: دروس الطبخ مع دادة الدار، أسرار المدينة العتيقة وطقوس الاسترخاء.',
      bookActivity: 'حجز التجربة',
      perPerson: '/ للشخص',
      includesTitle: 'ما يشمله الحجز:',
      meetingPoint: 'نقطة الانطلاق:'
    },
    en: {
      pretitle: 'Lifestyle & Curated Journeys',
      title: 'Experiences & Diafa Workshops',
      arabicTitle: 'تجارب وأنشطة الضيافة المغربية الأصيلة',
      subtitle: 'Immerse yourself into imperial Morocco: traditional cooking with the Dada chef, medina hidden alleys, and ancient hammam rituals.',
      bookActivity: 'Book Experience',
      perPerson: '/ person',
      includesTitle: 'What is included:',
      meetingPoint: 'Meeting location:'
    }
  }[language];

  const handleConfirmActivityBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestPhone || !bookingDate) {
      showToast('Veuillez compléter la date et vos coordonnées.', 'warning');
      return;
    }
    setBookingConfirmed(true);
    showToast(`Réservation pour "${selectedActivity?.name}" validée ! Notre guide vous contactera sur WhatsApp.`, 'success');
  };

  return (
    <section id="experiences-section" className="py-16 lg:py-24 bg-[#FAF7F2] border-t border-[#EAE3D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#D4A373] mb-2">
            <span className="w-6 h-0.5 bg-[#D4A373] inline-block" />
            <span>{t.pretitle}</span>
            <span className="w-6 h-0.5 bg-[#D4A373] inline-block" />
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

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((act) => (
            <div
              key={act.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#E6DEC8] hover:border-[#D4A373] shadow-xs hover:shadow-xl transition-all flex flex-col group"
            >
              {/* Image Banner */}
              <div className="relative h-56 overflow-hidden bg-[#EAE3D2]">
                <img
                  src={act.image}
                  alt={act.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* City Tag */}
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#18392B]/90 text-white backdrop-blur-xs">
                    {act.city}
                  </span>
                  {act.tags.map((tg, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/90 text-[#18392B] backdrop-blur-xs">
                      {tg}
                    </span>
                  ))}
                </div>

                {/* Duration & Group */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#D4A373]" />
                    {act.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#D4A373]" />
                    {act.group}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading text-lg font-bold text-[#18392B] group-hover:text-[#A8582C] transition-colors mb-1">
                    {act.name}
                  </h3>
                  <p className="font-arabic text-xs text-[#8C3A27] font-semibold mb-2">
                    {act.arabicName}
                  </p>
                  <p className="text-xs text-[#5C4D3C] line-clamp-3 leading-relaxed mb-4">
                    {act.description}
                  </p>

                  {/* Highlights list */}
                  <div className="space-y-1.5 mb-4 text-[11px] text-[#4A3E31]">
                    {act.includes.slice(0, 2).map((inc, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#24533E] shrink-0" />
                        <span className="line-clamp-1">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="pt-4 border-t border-[#EAE3D2] flex items-center justify-between">
                  <div>
                    <span className="font-heading text-lg font-bold text-[#18392B]">
                      {formatPrice(act.price)}
                    </span>
                    <span className="text-[11px] text-[#8C7A65] block">{t.perPerson}</span>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedActivity(act);
                      setBookingConfirmed(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#18392B] hover:bg-[#24533E] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all"
                  >
                    <span>{t.bookActivity}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D4A373]" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Activity Booking Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
          <div className="bg-[#FAF7F2] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-[#E6DEC8] my-8 flex flex-col max-h-[92vh]">
            
            {/* Top header */}
            <div className="px-6 py-4 bg-white border-b border-[#EAE3D2] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#A8582C] tracking-wider">
                  {selectedActivity.city} • {selectedActivity.duration}
                </span>
                <h3 className="font-heading text-lg font-bold text-[#18392B]">
                  {selectedActivity.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedActivity(null)}
                className="p-2 rounded-full hover:bg-[#FAF7F2] text-[#4A3E31]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto p-6 space-y-6">
              
              {!bookingConfirmed ? (
                <>
                  <div className="h-48 w-full rounded-2xl overflow-hidden relative">
                    <img 
                      src={selectedActivity.image} 
                      alt="" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-white text-xs px-3 py-1 rounded-full font-bold">
                      {formatPrice(selectedActivity.price)} {t.perPerson}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-heading text-sm font-bold text-[#18392B] mb-1">
                      À propos de cette expérience
                    </h4>
                    <p className="text-xs sm:text-sm text-[#5C4D3C] leading-relaxed">
                      {selectedActivity.fullDescription}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-[#E6DEC8] space-y-2 text-xs">
                    <span className="font-bold text-[#18392B] block">{t.includesTitle}</span>
                    {selectedActivity.includes.map((inc, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[#4A3E31]">
                        <Check className="w-4 h-4 text-[#18392B] shrink-0" />
                        <span>{inc}</span>
                      </div>
                    ))}
                    <div className="pt-2 text-[11px] text-[#8C7A65]">
                      <strong>{t.meetingPoint}</strong> {selectedActivity.meetingPoint}
                    </div>
                  </div>

                  {/* Booking Form */}
                  <form onSubmit={handleConfirmActivityBooking} className="space-y-4 pt-2 border-t border-[#EAE3D2]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-[#8C7A65] uppercase tracking-wider block mb-1">
                          Date souhaitée *
                        </label>
                        <input
                          type="date"
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          className="w-full bg-white border border-[#E0D5C1] rounded-xl px-3 py-2 text-xs text-[#18392B] focus:outline-none focus:border-[#18392B]"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-[#8C7A65] uppercase tracking-wider block mb-1">
                          Participants
                        </label>
                        <select
                          value={participants}
                          onChange={(e) => setParticipants(Number(e.target.value))}
                          className="w-full bg-white border border-[#E0D5C1] rounded-xl px-3 py-2 text-xs text-[#18392B] focus:outline-none focus:border-[#18392B]"
                        >
                          {[1, 2, 3, 4, 5, 6, 8].map(n => (
                            <option key={n} value={n}>{n} personne{n > 1 ? 's' : ''}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Votre nom complet *"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full bg-white border border-[#E0D5C1] rounded-xl px-3 py-2 text-xs text-[#18392B] focus:outline-none focus:border-[#18392B]"
                        required
                      />
                      <input
                        type="tel"
                        placeholder="Téléphone / WhatsApp *"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className="w-full bg-white border border-[#E0D5C1] rounded-xl px-3 py-2 text-xs text-[#18392B] focus:outline-none focus:border-[#18392B]"
                        required
                      />
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-[#E6DEC8] flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#5C4D3C]">
                        Total ({participants} pers.) :
                      </span>
                      <span className="font-heading text-base font-bold text-[#18392B]">
                        {formatPrice(selectedActivity.price * participants)}
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 px-4 rounded-xl bg-[#18392B] hover:bg-[#24533E] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
                    >
                      <CalendarCheck2 className="w-4 h-4 text-[#D4A373]" />
                      <span>Confirmer la Réservation</span>
                    </button>

                    <a
                      href={getWhatsAppUrl(`Bonjour Dar Diafa, je souhaite réserver l'expérience : "${selectedActivity.name}" (${selectedActivity.city}) pour ${participants} personne(s) à la date du ${bookingDate || 'prochainement'}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Réserver par WhatsApp (+212 7 07 68 48 12)</span>
                    </a>
                  </form>
                </>
              ) : (
                <div className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-[#18392B]/10 text-[#18392B] rounded-full flex items-center justify-center mx-auto">
                    <Sparkles className="w-8 h-8 text-[#D4A373]" />
                  </div>
                  <h4 className="font-heading text-2xl font-bold text-[#18392B]">
                    Demande de Réservation Enregistrée !
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5C4D3C] max-w-md mx-auto leading-relaxed">
                    Merci <strong>{guestName}</strong> ! Votre place pour <strong>{selectedActivity.name}</strong> le <strong>{bookingDate}</strong> est pré-réservée.
                    Notre coordinateur culturel vous contactera sous 2 heures sur le <strong>{guestPhone}</strong> pour vous transmettre le bon d'accès.
                  </p>
                  <button
                    onClick={() => setSelectedActivity(null)}
                    className="mt-4 px-6 py-2.5 bg-[#18392B] text-white rounded-xl text-xs font-bold"
                  >
                    Fermer la fenêtre
                  </button>
                </div>
              )}

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
