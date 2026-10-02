import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Sparkles, 
  MessageSquare, 
  ShieldCheck, 
  Heart, 
  ArrowRight,
  Send
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { FAQS } from '../data/mockData';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  const { openModal, getWhatsAppUrl, showToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Veuillez renseigner une adresse email valide.', 'warning');
      return;
    }
    showToast('Bienvenue dans le cercle privé Dar Diafa !', 'success');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#18392B] text-[#FAF7F2] border-t border-[#D4A373]/30 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* FAQ Accordion Section */}
        <div className="bg-white/5 rounded-3xl p-6 sm:p-10 border border-white/10 backdrop-blur-xs">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4A373]">
              Foire Aux Questions
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold mt-1">
              Tout ce que vous devez savoir sur Dar Diafa
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 font-semibold text-xs sm:text-sm text-[#F1EAD9]">
                    <span>{faq.question}</span>
                    <span className="text-[#D4A373] text-base">{isOpen ? '−' : '+'}</span>
                  </div>
                  {isOpen && (
                    <p className="mt-2 text-xs text-white/80 leading-relaxed pt-2 border-t border-white/10">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pt-4">
          
          {/* Brand info (2 columns) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#D4A373] text-[#18392B] flex items-center justify-center font-heading font-bold text-xl">
                D
              </div>
              <div>
                <span className="font-heading text-2xl font-bold uppercase tracking-wider block">
                  DAR DIAFA
                </span>
                <span className="font-arabic text-[#D4A373] text-sm font-bold">
                  دار الضيافة • فاس ومكناس
                </span>
              </div>
            </div>

            <p className="text-xs text-white/70 leading-relaxed max-w-sm">
              Sanctuaire culturel dédié à la préservation et au rayonnement de l'hospitalité traditionnelle et de l'artisanat d'art des capitales impériales de Fès et Meknès.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#25D366] text-white text-xs font-bold flex items-center gap-2 hover:bg-[#20ba5a] transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Concierge (+212 7 07 68 48 12)</span>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-[#D4A373]">
              Séjours & Demeures
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <button onClick={() => onNavigateSection('hotels-section')} className="hover:text-[#D4A373] transition-colors">
                  Riads à Fès (El-Bali)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('hotels-section')} className="hover:text-[#D4A373] transition-colors">
                  Dars & Palais à Meknès
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('hotels-section')} className="hover:text-[#D4A373] transition-colors">
                  Villas & Domaines privés
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('experiences-section')} className="hover:text-[#D4A373] transition-colors">
                  Rituels Hammam & Spa
                </button>
              </li>
            </ul>
          </div>

          {/* Artisanat links */}
          <div className="space-y-3">
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-[#D4A373]">
              Boutique des Maâlems
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <button onClick={() => onNavigateSection('artisanat-section')} className="hover:text-[#D4A373] transition-colors">
                  Zellige artisanal de Fès
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('artisanat-section')} className="hover:text-[#D4A373] transition-colors">
                  Tapis Béni Ouarain
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('artisanat-section')} className="hover:text-[#D4A373] transition-colors">
                  Dinanderie & Cuivre martelé
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('artisanat-section')} className="hover:text-[#D4A373] transition-colors">
                  Babouches brodées royales
                </button>
              </li>
              <li>
                <button onClick={() => openModal({ type: 'seller-register' })} className="text-[#D4A373] font-bold hover:underline">
                  Devenir Vendeur / Maâlem
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-[#D4A373]">
              Lettre Privilège
            </h4>
            <p className="text-xs text-white/70 leading-snug">
              Recevez en avant-première nos invitations aux réceptions culturelles et pièces uniques d'artisanat.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <input
                type="email"
                placeholder="Votre adresse email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder-white/50 focus:outline-none focus:border-[#D4A373]"
              />
              <button
                type="submit"
                className="w-full py-2 bg-[#D4A373] hover:bg-[#c08d5c] text-[#18392B] font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Rejoindre le cercle</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div>
            © 2026 Dar Diafa. Tous droits réservés. L'Axe Impérial (Fès & Meknès).
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => openModal({ type: 'admin-dashboard' })} className="hover:text-white transition-colors">
              Portail Gestion
            </button>
            <span>•</span>
            <button onClick={() => openModal({ type: 'seller-dashboard' })} className="hover:text-white transition-colors">
              Espace Artisans
            </button>
            <span>•</span>
            <a href="https://dar-diafa.base44.app" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4A373]">
              dar-diafa.base44.app
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
