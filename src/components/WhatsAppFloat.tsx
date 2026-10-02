import React, { useState } from 'react';
import { MessageSquare, X, PhoneCall, Sparkles, Building2, Package, ArrowUpRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { WHATSAPP_PHONE } from '../data/mockData';

export const WhatsAppFloat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getWhatsAppUrl } = useStore();

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-30 flex flex-col items-end">
      
      {/* Expanded Quick Options Menu */}
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-[#E6DEC8] p-4 space-y-2.5 animate-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between border-b border-[#EAE3D2] pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#25D366] animate-pulse" />
              <span className="font-heading font-bold text-xs text-[#18392B]">
                Conciergerie Dar Diafa
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#8C7A65] hover:text-black p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-[#5C4D3C] leading-snug">
            Notre équipe d'accueil à Fès et Meknès est en ligne pour vous assister 7j/7.
          </p>

          <div className="space-y-1.5 pt-1">
            <a
              href={getWhatsAppUrl("Bonjour Dar Diafa, je souhaite vérifier les disponibilités pour un Riad à Fès ou Meknès.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full p-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F1EAD9] text-[#18392B] text-xs font-semibold flex items-center justify-between transition-colors border border-[#E0D5C1]"
            >
              <span className="flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-[#18392B]" />
                Réserver un Riad de charme
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#8C7A65]" />
            </a>

            <a
              href={getWhatsAppUrl("Bonjour Dar Diafa, je souhaite commander une création artisanale sur mesure (tapis, zellige, dinanderie).")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full p-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F1EAD9] text-[#18392B] text-xs font-semibold flex items-center justify-between transition-colors border border-[#E0D5C1]"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
                Artisanat sur mesure
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#8C7A65]" />
            </a>

            <a
              href={getWhatsAppUrl("Bonjour Dar Diafa, j'ai une question concernant le suivi de ma commande.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full p-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F1EAD9] text-[#18392B] text-xs font-semibold flex items-center justify-between transition-colors border border-[#E0D5C1]"
            >
              <span className="flex items-center gap-2">
                <Package className="w-3.5 h-3.5 text-[#A8582C]" />
                Suivi d'une commande
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#8C7A65]" />
            </a>
          </div>

          <div className="pt-2 text-center text-[10px] text-[#8C7A65] border-t border-[#FAF7F2]">
            Ligne directe : +212 7 07 68 48 12
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white pl-4 pr-5 py-3 rounded-full shadow-2xl hover:scale-105 transition-all group ring-4 ring-white/80"
        title="Contacter le Concierge WhatsApp"
      >
        <div className="relative">
          <MessageSquare className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full" />
        </div>
        <div className="text-left hidden sm:block">
          <span className="text-[10px] uppercase font-bold tracking-wider block leading-none text-white/80">
            Concierge Direct
          </span>
          <span className="text-xs font-extrabold leading-none mt-0.5 block">
            WhatsApp 7j/7
          </span>
        </div>
      </button>

    </div>
  );
};
