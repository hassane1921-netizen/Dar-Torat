import React, { useState } from 'react';
import { 
  X, 
  UserCheck, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  MapPin, 
  Phone, 
  Mail, 
  FileText,
  UploadCloud
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { MoroccanRegion } from '../types';
import { MOROCCAN_REGIONS } from '../data/mockData';

interface SellerModalProps {
  onClose: () => void;
}

export const SellerModal: React.FC<SellerModalProps> = ({ onClose }) => {
  const { addSellerApplication, showToast } = useStore();

  const [fullName, setFullName] = useState('');
  const [cooperativeName, setCooperativeName] = useState('');
  const [region, setRegion] = useState<MoroccanRegion>('Fès-Meknès');
  const [city, setCity] = useState('Fès');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [craftType, setCraftType] = useState('Céramique & Zellige');
  const [experienceYears, setExperienceYears] = useState(15);
  const [portfolioDescription, setPortfolioDescription] = useState('');
  const [productSampleCount, setProductSampleCount] = useState(10);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !portfolioDescription) {
      showToast('Veuillez renseigner tous les champs obligatoires.', 'warning');
      return;
    }

    addSellerApplication({
      fullName,
      cooperativeName,
      city,
      region,
      phone,
      email,
      craftType,
      experienceYears,
      portfolioDescription,
      productSampleCount
    });

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="bg-[#FAF7F2] w-full max-w-2xl rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[#E6DEC8] my-0 sm:my-8 flex flex-col max-h-[94vh] sm:max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-[#EAE3D2] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-[#A8582C]" />
            <h2 className="font-heading text-lg font-bold text-[#18392B]">
              Rejoindre la Guilde des Artisans & Riads
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
        <div className="overflow-y-auto p-6 sm:p-8 flex-1">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="text-center max-w-md mx-auto mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#A8582C] block">
                  Candidature Vendeur & Hôte
                </span>
                <h3 className="font-heading text-xl font-bold text-[#18392B]">
                  Valorisez votre savoir-faire auprès d’une clientèle d’exception
                </h3>
                <p className="text-xs text-[#5C4D3C] mt-1">
                  Dar Diafa sélectionne avec rigueur les maîtres artisans (maâlems) et demeures de charme de Fès, Meknès et du Moyen Atlas.
                </p>
              </div>

              {/* Personal Info */}
              <div className="bg-white p-5 rounded-2xl border border-[#E6DEC8] space-y-3">
                <h4 className="font-heading text-xs font-bold text-[#18392B] uppercase tracking-wider">
                  1. Identité & Atelier
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Nom et prénom du Maâlem / Gérant *"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-[#FAF7F2] border border-[#E0D5C1] rounded-xl px-3 py-2 text-xs text-[#18392B] focus:outline-none focus:border-[#18392B]"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Nom de l’atelier ou de la coopérative"
                    value={cooperativeName}
                    onChange={(e) => setCooperativeName(e.target.value)}
                    className="bg-[#FAF7F2] border border-[#E0D5C1] rounded-xl px-3 py-2 text-xs text-[#18392B] focus:outline-none focus:border-[#18392B]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-[#8C7A65] block mb-1">Région / Territoire</label>
                    <select
                      value={region}
                      onChange={(e) => setRegion(e.target.value as MoroccanRegion)}
                      className="w-full bg-[#FAF7F2] border border-[#E0D5C1] rounded-xl px-3 py-2 text-xs text-[#18392B] focus:outline-none focus:border-[#18392B]"
                    >
                      {MOROCCAN_REGIONS.map(r => (
                        <option key={r.region} value={r.region}>{r.region}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase text-[#8C7A65] block mb-1">Ville / Province</label>
                    <input
                      type="text"
                      placeholder="Ex: Fès, Marrakech, Chefchaouen..."
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#E0D5C1] rounded-xl px-3 py-2 text-xs text-[#18392B] focus:outline-none focus:border-[#18392B]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase text-[#8C7A65] block mb-1">Spécialité artisanale</label>
                  <select
                    value={craftType}
                    onChange={(e) => setCraftType(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#E0D5C1] rounded-xl px-3 py-2 text-xs text-[#18392B] focus:outline-none focus:border-[#18392B]"
                  >
                    <option value="Céramique & Zellige">Céramique & Zellige</option>
                    <option value="Maroquinerie & Babouches">Maroquinerie & Babouches</option>
                    <option value="Tapis & Textiles Berbères">Tapis & Textiles Berbères</option>
                    <option value="Dinanderie & Cuivre Martelé">Dinanderie & Cuivre Martelé</option>
                    <option value="Couture Traditionnelle & Caftans">Couture Traditionnelle & Caftans</option>
                    <option value="Produits du Terroir & Argan Bio">Produits du Terroir & Argan Bio</option>
                    <option value="Hôtellerie / Riad / Dar">Hôtellerie / Riad / Dar</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="tel"
                    placeholder="Téléphone WhatsApp *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
              </div>

              {/* Craft & Portfolio */}
              <div className="bg-white p-5 rounded-2xl border border-[#E6DEC8] space-y-3">
                <h4 className="font-heading text-xs font-bold text-[#18392B] uppercase tracking-wider">
                  2. Expérience & Catalogue
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-[#8C7A65] block mb-1">
                      Années de pratique / Maîtrise ({experienceYears} ans)
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={50}
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(Number(e.target.value))}
                      className="w-full accent-[#18392B]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase text-[#8C7A65] block mb-1">
                      Nombre de références disponibles ({productSampleCount} créations)
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={100}
                      value={productSampleCount}
                      onChange={(e) => setProductSampleCount(Number(e.target.value))}
                      className="w-full accent-[#18392B]"
                    />
                  </div>
                </div>

                <textarea
                  placeholder="Décrivez votre méthode de fabrication artisanale, vos matières premières et votre histoire d'artisan... *"
                  value={portfolioDescription}
                  onChange={(e) => setPortfolioDescription(e.target.value)}
                  rows={3}
                  className="w-full bg-[#FAF7F2] border border-[#E0D5C1] rounded-xl px-3 py-2 text-xs text-[#18392B] focus:outline-none focus:border-[#18392B]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-[#18392B] hover:bg-[#24533E] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Sparkles className="w-4 h-4 text-[#D4A373]" />
                <span>Soumettre ma candidature artisan</span>
              </button>

            </form>
          ) : (
            <div className="p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-[#24533E]/10 rounded-full flex items-center justify-center mx-auto text-[#24533E]">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-[#18392B]">
                Candidature Transmise avec Succès !
              </h3>
              <p className="text-xs sm:text-sm text-[#5C4D3C] max-w-md mx-auto leading-relaxed">
                Merci <strong>{fullName}</strong>. Votre dossier pour l’atelier <strong>{cooperativeName || craftType}</strong> ({city}) est en cours d'examen par notre curateur du patrimoine.
                Nous prendrons contact avec vous sous 48h par WhatsApp au <strong>{phone}</strong>.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 bg-[#18392B] text-white rounded-xl text-xs font-bold"
              >
                Fermer
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
