import React from 'react';
import { 
  X, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  Users, 
  Printer, 
  MessageSquare, 
  ShieldCheck,
  Building2
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Booking } from '../types';

interface BookingSuccessModalProps {
  booking: Booking;
  onClose: () => void;
}

export const BookingSuccessModal: React.FC<BookingSuccessModalProps> = ({ booking, onClose }) => {
  const { formatPrice, getWhatsAppUrl } = useStore();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-[#FAF7F2] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-[#E6DEC8] my-8 flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-[#EAE3D2] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#24533E]" />
            <h2 className="font-heading text-lg font-bold text-[#18392B]">
              Bon de Réservation Confirmé
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
        <div className="p-6 sm:p-8 space-y-6 text-center">
          
          <div className="w-16 h-16 bg-[#24533E]/10 rounded-full flex items-center justify-center mx-auto text-[#24533E]">
            <Building2 className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#A8582C]">
              Réservation Validée
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#18392B] mt-1">
              Bienvenue chez Dar Diafa, {booking.guestName} !
            </h3>
            <p className="text-xs sm:text-sm text-[#5C4D3C] mt-1 max-w-md mx-auto">
              Votre séjour au <strong>{booking.hotelName}</strong> ({booking.hotelCity}) est confirmé.
              Un email avec les instructions d'arrivée et coordonnées du maître de maison vous a été expédié.
            </p>
          </div>

          {/* Printable Voucher */}
          <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-[#D4A373] text-left space-y-4 shadow-xs">
            <div className="flex justify-between items-center border-b border-[#EAE3D2] pb-3">
              <div>
                <span className="font-heading font-bold text-base text-[#18392B]">DAR DIAFA</span>
                <span className="text-[10px] text-[#8C7A65] block">Sanctuaire de l’Hospitalité Impériale</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-[#A8582C] px-2 py-0.5 rounded bg-[#A8582C]/10">
                  {booking.bookingRef}
                </span>
                <span className="text-[10px] text-[#8C7A65] block mt-0.5">{booking.createdAt}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[#8C7A65] block text-[10px] uppercase font-bold">Demeure & Ville</span>
                <strong className="text-[#18392B] text-sm">{booking.hotelName}</strong>
                <p className="text-[#5C4D3C]">{booking.hotelCity} • {booking.roomName}</p>
              </div>

              <div>
                <span className="text-[#8C7A65] block text-[10px] uppercase font-bold">Dates de Séjour</span>
                <strong className="text-[#18392B]">Du {booking.checkIn} au {booking.checkOut}</strong>
                <p className="text-[#5C4D3C]">{booking.nights} nuit(s) • {booking.guests} voyageur(s)</p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#FAF7F2] space-y-1 text-xs">
              <div className="flex justify-between text-[#5C4D3C]">
                <span>Chambre ({booking.nights} nuits) :</span>
                <span>{formatPrice(booking.pricePerNight * booking.nights)}</span>
              </div>
              {booking.includeAirportTransfer && (
                <div className="flex justify-between text-[#5C4D3C]">
                  <span>Transfert privé aéroport :</span>
                  <span>{formatPrice(250)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#24533E] font-medium">
                <span>Petit-déjeuner impérial :</span>
                <span>Inclus</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-[#18392B] pt-2 border-t border-[#EAE3D2]">
                <span>Total Séjour :</span>
                <span className="font-heading text-lg">{formatPrice(booking.totalPrice)}</span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-[#5C4D3C] border-t border-[#FAF7F2]">
              <strong>Client :</strong> {booking.guestName} ({booking.guestEmail} • {booking.guestPhone})<br />
              {booking.specialRequests && (
                <span><strong>Notes :</strong> {booking.specialRequests}</span>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-xl border border-[#18392B] text-[#18392B] hover:bg-[#18392B] hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimer le voucher</span>
            </button>

            <a
              href={getWhatsAppUrl(`Bonjour Dar Diafa, voici ma confirmation de réservation n° ${booking.bookingRef} au ${booking.hotelName} (${booking.hotelCity}) du ${booking.checkIn} au ${booking.checkOut}. Au nom de ${booking.guestName}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#25D366] text-white hover:bg-[#20ba5a] text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Envoyer sur WhatsApp (+212 7 07 68 48 12)</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
