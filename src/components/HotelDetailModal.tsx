import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Star, 
  Heart, 
  Check, 
  ShieldCheck, 
  Calendar, 
  Users, 
  Share2, 
  Phone, 
  MessageSquare, 
  Coffee, 
  Car, 
  ChevronRight,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Hotel, RoomOption, Booking } from '../types';

interface HotelDetailModalProps {
  hotel: Hotel;
  onClose: () => void;
}

export const HotelDetailModal: React.FC<HotelDetailModalProps> = ({ hotel, onClose }) => {
  const { 
    formatPrice, 
    language, 
    toggleWishlist, 
    isInWishlist, 
    addBooking, 
    openModal, 
    getWhatsAppUrl, 
    searchFilters 
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<RoomOption>(hotel.rooms[0]);
  
  // Reservation form state
  const [checkIn, setCheckIn] = useState<string>(() => {
    if (searchFilters.checkIn) return searchFilters.checkIn;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    return tomorrow.toISOString().split('T')[0];
  });

  const [checkOut, setCheckOut] = useState<string>(() => {
    if (searchFilters.checkOut) return searchFilters.checkOut;
    const end = new Date();
    end.setDate(end.getDate() + 5);
    return end.toISOString().split('T')[0];
  });

  const [guests, setGuests] = useState(searchFilters.guests || 2);
  const [includeBreakfast, setIncludeBreakfast] = useState(true);
  const [includeAirportTransfer, setIncludeAirportTransfer] = useState(false);

  // Guest Contact Info
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [formError, setFormError] = useState('');

  // Calculate nights
  const nights = React.useMemo(() => {
    if (!checkIn || !checkOut) return 1;
    const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    const days = Math.round(diff / (1000 * 3600 * 24));
    return days > 0 ? days : 1;
  }, [checkIn, checkOut]);

  // Total price calculation
  const roomBasePrice = selectedRoom.pricePerNight * nights;
  const transferCost = includeAirportTransfer ? 250 : 0;
  const totalPrice = roomBasePrice + transferCost;

  const inFav = isInWishlist(hotel.id);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      setFormError('Veuillez renseigner votre nom complet.');
      return;
    }
    if (!guestEmail.trim() || !guestEmail.includes('@')) {
      setFormError('Veuillez indiquer une adresse email valide.');
      return;
    }
    if (!guestPhone.trim()) {
      setFormError('Veuillez renseigner votre numéro de téléphone (WhatsApp).');
      return;
    }

    const newBooking = addBooking({
      hotelId: hotel.id,
      hotelName: hotel.name,
      hotelCity: hotel.city,
      hotelRegion: hotel.region,
      roomName: selectedRoom.name,
      checkIn,
      checkOut,
      nights,
      guests,
      pricePerNight: selectedRoom.pricePerNight,
      totalPrice,
      guestName,
      guestEmail,
      guestPhone,
      specialRequests,
      includeBreakfast,
      includeAirportTransfer
    });

    onClose();
    openModal({ type: 'booking-success', booking: newBooking });
  };

  const images = hotel.gallery && hotel.gallery.length > 0 ? hotel.gallery : [hotel.image_url];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="bg-[#FAF7F2] w-full max-w-5xl rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[#E6DEC8] my-0 sm:my-8 flex flex-col max-h-[94vh] sm:max-h-[92vh]">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-white border-b border-[#EAE3D2] flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 bg-[#18392B]/10 text-[#18392B] rounded-md">
              {hotel.property_type} de Prestige
            </span>
            <span className="text-xs font-semibold text-[#8C7A65] hidden sm:inline">
              {hotel.heritageEra}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleWishlist(hotel.id)}
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

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-8 space-y-8 flex-1">
          
          {/* Gallery Section */}
          <div className="space-y-3">
            <div className="h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-[#EAE3D2] relative shadow-inner">
              <img 
                src={images[activeImageIndex] || images[0]} 
                alt={hotel.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-xs font-medium">
                Photo {activeImageIndex + 1} / {images.length}
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
          </div>

          {/* Title & Coordinates Strip */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-[#EAE3D2] pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#A8582C] uppercase tracking-wider mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{hotel.city} • {hotel.neighborhood}</span>
              </div>
              <h1 className="font-heading text-2xl sm:text-4xl font-bold text-[#18392B]">
                {hotel.name}
              </h1>
              <p className="font-arabic text-xl text-[#8C3A27] font-semibold mt-1">
                {hotel.arabicName}
              </p>
              <p className="text-xs text-[#8C7A65] mt-1">
                {hotel.address}
              </p>
            </div>

            <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-[#E6DEC8] shadow-xs self-start">
              <div className="flex items-center gap-1.5 text-base font-bold text-[#18392B]">
                <Star className="w-5 h-5 text-[#D4A373] fill-current" />
                <span>{hotel.rating} / 10</span>
              </div>
              <div className="h-6 w-px bg-[#EAE3D2]" />
              <div className="text-xs text-[#5C4D3C]">
                <span className="font-bold text-[#18392B] block">{hotel.review_count} avis</span>
                <span className="text-[#8C7A65]">Voyageurs vérifiés</span>
              </div>
            </div>
          </div>

          {/* Grid Layout: Details & Booking Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left 7 Columns: Story, Amenities, Host */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Full Description */}
              <div>
                <h3 className="font-heading text-lg font-bold text-[#18392B] mb-2">
                  L’Âme de la Demeure
                </h3>
                <p className="text-xs sm:text-sm text-[#5C4D3C] leading-relaxed whitespace-pre-line">
                  {hotel.fullDescription}
                </p>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="font-heading text-lg font-bold text-[#18392B] mb-3">
                  Prestations & Services Inclus
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {hotel.amenities.map((amenity, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#E6DEC8] text-xs font-medium text-[#18392B]"
                    >
                      <Check className="w-4 h-4 text-[#18392B] shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Room Selection */}
              <div>
                <h3 className="font-heading text-lg font-bold text-[#18392B] mb-3">
                  Choisissez votre Chambre ou Suite
                </h3>
                <div className="space-y-3">
                  {hotel.rooms.map((room) => {
                    const isSelected = selectedRoom.id === room.id;
                    return (
                      <div
                        key={room.id}
                        onClick={() => setSelectedRoom(room)}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                          isSelected 
                            ? 'bg-white border-[#18392B] shadow-md ring-2 ring-[#18392B]/10' 
                            : 'bg-white/70 border-[#E6DEC8] hover:border-[#D4A373]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img 
                            src={room.image} 
                            alt={room.name} 
                            className="w-16 h-16 rounded-xl object-cover shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-heading text-sm font-bold text-[#18392B]">
                                {room.name}
                              </h4>
                              {isSelected && (
                                <span className="bg-[#18392B] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                  Sélectionné
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-[#8C7A65] flex items-center gap-2 mt-0.5">
                              <span>{room.size}</span>
                              <span>•</span>
                              <span>{room.capacity} pers. max</span>
                              <span>•</span>
                              <span>{room.bedType}</span>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-1.5">
                              {room.features.slice(0, 2).map((feat, i) => (
                                <span key={i} className="text-[10px] bg-[#FAF7F2] text-[#5C4D3C] px-1.5 py-0.5 rounded border border-[#EAE3D2]">
                                  {feat}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="text-right sm:self-center shrink-0 w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-2 sm:pt-0">
                          <div className="font-heading text-lg font-bold text-[#18392B]">
                            {formatPrice(room.pricePerNight)}
                          </div>
                          <div className="text-[10px] text-[#8C7A65]">par nuit</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Host Profile */}
              <div className="p-4 rounded-2xl bg-white border border-[#E6DEC8] flex items-center gap-4">
                <img 
                  src={hotel.host.avatar} 
                  alt={hotel.host.name} 
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#D4A373]"
                />
                <div>
                  <div className="text-[11px] uppercase font-bold tracking-wider text-[#A8582C]">
                    Votre Maître de Maison
                  </div>
                  <div className="font-heading text-base font-bold text-[#18392B]">
                    {hotel.host.name}
                  </div>
                  <div className="text-xs text-[#5C4D3C]">
                    {hotel.host.role} • {hotel.host.experienceYears} ans de dévouement
                  </div>
                </div>
              </div>

            </div>

            {/* Right 5 Columns: Reservation Card Form */}
            <div className="lg:col-span-5">
              <div className="bg-white p-6 rounded-3xl border border-[#E6DEC8] shadow-lg sticky top-24 space-y-5">
                
                <div className="border-b border-[#EAE3D2] pb-4">
                  <div className="text-xs uppercase font-bold text-[#8C7A65] tracking-wider mb-1">
                    Récapitulatif & Réservation Directe
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="font-heading text-2xl font-bold text-[#18392B]">
                      {formatPrice(selectedRoom.pricePerNight)}
                    </span>
                    <span className="text-xs text-[#8C7A65]">/ nuit • {selectedRoom.name}</span>
                  </div>
                </div>

                {formError && (
                  <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs border border-red-200">
                    {formError}
                  </div>
                )}

                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  
                  {/* Dates Selection */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C7A65] block mb-1">
                        Arrivée
                      </label>
                      <input 
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full bg-[#FAF7F2] border border-[#E0D5C1] rounded-xl px-3 py-2 text-xs font-semibold text-[#18392B] focus:outline-none focus:border-[#18392B]"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C7A65] block mb-1">
                        Départ
                      </label>
                      <input 
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full bg-[#FAF7F2] border border-[#E0D5C1] rounded-xl px-3 py-2 text-xs font-semibold text-[#18392B] focus:outline-none focus:border-[#18392B]"
                        required
                      />
                    </div>
                  </div>

                  {/* Guests */}
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C7A65] block mb-1">
                      Nombre de voyageurs
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full bg-[#FAF7F2] border border-[#E0D5C1] rounded-xl px-3 py-2 text-xs font-semibold text-[#18392B] focus:outline-none focus:border-[#18392B]"
                    >
                      <option value={1}>1 voyageur</option>
                      <option value={2}>2 voyageurs</option>
                      <option value={3}>3 voyageurs</option>
                      <option value={4}>4 voyageurs</option>
                    </select>
                  </div>

                  {/* Add-on options */}
                  <div className="space-y-2 pt-2 border-t border-[#EAE3D2]">
                    <label className="flex items-center justify-between p-2 rounded-xl bg-[#FAF7F2] border border-[#E0D5C1] cursor-pointer text-xs">
                      <span className="flex items-center gap-2 text-[#18392B] font-medium">
                        <Coffee className="w-4 h-4 text-[#D4A373]" />
                        Petit-déjeuner impérial inclus
                      </span>
                      <input 
                        type="checkbox"
                        checked={includeBreakfast}
                        onChange={(e) => setIncludeBreakfast(e.target.checked)}
                        className="rounded text-[#18392B] focus:ring-0"
                      />
                    </label>

                    <label className="flex items-center justify-between p-2 rounded-xl bg-[#FAF7F2] border border-[#E0D5C1] cursor-pointer text-xs">
                      <span className="flex items-center gap-2 text-[#18392B] font-medium">
                        <Car className="w-4 h-4 text-[#A8582C]" />
                        Transfert Aéroport / Gare (+250 MAD)
                      </span>
                      <input 
                        type="checkbox"
                        checked={includeAirportTransfer}
                        onChange={(e) => setIncludeAirportTransfer(e.target.checked)}
                        className="rounded text-[#18392B] focus:ring-0"
                      />
                    </label>
                  </div>

                  {/* Guest Information */}
                  <div className="space-y-2.5 pt-2 border-t border-[#EAE3D2]">
                    <div className="text-xs font-bold text-[#18392B]">Coordonnées du client</div>
                    
                    <input
                      type="text"
                      placeholder="Nom et Prénom *"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#E0D5C1] rounded-xl px-3 py-2 text-xs text-[#18392B] focus:outline-none focus:border-[#18392B]"
                      required
                    />

                    <input
                      type="email"
                      placeholder="Adresse email *"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#E0D5C1] rounded-xl px-3 py-2 text-xs text-[#18392B] focus:outline-none focus:border-[#18392B]"
                      required
                    />

                    <input
                      type="tel"
                      placeholder="Téléphone / WhatsApp *"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#E0D5C1] rounded-xl px-3 py-2 text-xs text-[#18392B] focus:outline-none focus:border-[#18392B]"
                      required
                    />

                    <textarea
                      placeholder="Demandes particulières (heure d'arrivée, régime alimentaire...)"
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      rows={2}
                      className="w-full bg-[#FAF7F2] border border-[#E0D5C1] rounded-xl px-3 py-2 text-xs text-[#18392B] focus:outline-none focus:border-[#18392B]"
                    />
                  </div>

                  {/* Calculation Breakdown */}
                  <div className="space-y-1.5 pt-3 border-t border-[#EAE3D2] text-xs text-[#5C4D3C]">
                    <div className="flex justify-between">
                      <span>{selectedRoom.name} x {nights} nuit(s)</span>
                      <span className="font-semibold">{formatPrice(roomBasePrice)}</span>
                    </div>
                    {includeAirportTransfer && (
                      <div className="flex justify-between text-[#A8582C]">
                        <span>Transfert privé</span>
                        <span>{formatPrice(250)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[#18392B] font-bold text-sm pt-2 border-t border-[#EAE3D2]">
                      <span>Total Séjour</span>
                      <span className="font-heading text-lg">{formatPrice(totalPrice)}</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl bg-[#18392B] hover:bg-[#24533E] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                  >
                    <span>Confirmer la Réservation</span>
                    <ArrowRight className="w-4 h-4 text-[#D4A373]" />
                  </button>

                  {/* WhatsApp Quick Book Alternative */}
                  <a
                    href={getWhatsAppUrl(`Bonjour Dar Diafa, je souhaite réserver au ${hotel.name} (${hotel.city}) du ${checkIn} au ${checkOut} (${nights} nuits) pour la ${selectedRoom.name}. Mon nom est ${guestName || 'un voyageur'}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Réserver par WhatsApp (+212 7 07 68 48 12)</span>
                  </a>

                  <div className="text-center text-[10px] text-[#8C7A65] flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#18392B]" />
                    <span>Annulation gratuite jusqu’à 48h avant l’arrivée</span>
                  </div>

                </form>

              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
