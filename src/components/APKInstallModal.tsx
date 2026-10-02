import React from 'react';
import { 
  X, 
  Download, 
  Smartphone, 
  ShieldCheck, 
  Zap, 
  Bell, 
  WifiOff, 
  CheckCircle2, 
  Share2, 
  PlusSquare,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useStore } from '../context/StoreContext';

interface APKInstallModalProps {
  onClose: () => void;
}

export const APKInstallModal: React.FC<APKInstallModalProps> = ({ onClose }) => {
  const { isInstallable, isInstalled, isIOS, isAndroid, install } = usePWAInstall();
  const { language } = useStore();

  const isAr = language === 'ar';

  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="bg-[#FAF7F2] w-full max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[#E6DEC8] flex flex-col max-h-[92vh]">
        
        {/* Top Header with App Badge */}
        <div className="relative bg-gradient-to-br from-[#18392B] to-[#0E241B] text-white p-6 sm:p-7 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-[#D4A373]/20 border border-[#D4A373]/50 p-1.5 flex items-center justify-center shadow-lg">
              <img src="/icon.svg" alt="Dar Diafa App" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading text-lg sm:text-xl font-bold">
                  {isAr ? 'تطبيق دار الضيافة' : 'Application Dar Diafa'}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D4A373] text-[#18392B] uppercase">
                  APK • v2.4
                </span>
              </div>
              <p className="text-xs text-[#E8DFD0] mt-0.5">
                {isAr ? 'تثبيت فوري على شاشة الهاتف مجاناً' : 'Installation native sur écran d’accueil Android & iOS'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1 text-xs text-[#1D2B24]">
          
          {/* Status if already installed */}
          {isInstalled && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold text-sm">Application déjà installée !</p>
                <p className="text-xs text-emerald-700">Vous utilisez l'application en mode autonome plein écran.</p>
              </div>
            </div>
          )}

          {/* Benefits Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-white border border-[#E6DEC8] space-y-1">
              <div className="w-7 h-7 rounded-xl bg-[#18392B]/10 text-[#18392B] flex items-center justify-center font-bold">
                <Zap className="w-4 h-4 text-[#A8582C]" />
              </div>
              <p className="font-bold text-[#18392B]">
                {isAr ? 'سرعة فائقة' : 'Zéro Téléchargement Lourd'}
              </p>
              <p className="text-[11px] text-[#5C4D3C] leading-relaxed">
                {isAr ? 'يعمل بدون متصفح ويفتح بنقرة زر' : 'Ouverture instantanée sans barre d’adresse de navigateur.'}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-[#E6DEC8] space-y-1">
              <div className="w-7 h-7 rounded-xl bg-[#18392B]/10 text-[#18392B] flex items-center justify-center font-bold">
                <Bell className="w-4 h-4 text-[#24533E]" />
              </div>
              <p className="font-bold text-[#18392B]">
                {isAr ? 'تنبيهات فورية' : 'Suivi en Direct'}
              </p>
              <p className="text-[11px] text-[#5C4D3C] leading-relaxed">
                {isAr ? 'إشعارات الطلبات والحجوزات الجديدة' : 'Mises à jour des statuts de livraison et réservations.'}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-[#E6DEC8] space-y-1">
              <div className="w-7 h-7 rounded-xl bg-[#18392B]/10 text-[#18392B] flex items-center justify-center font-bold">
                <WifiOff className="w-4 h-4 text-[#D4A373]" />
              </div>
              <p className="font-bold text-[#18392B]">
                {isAr ? 'تصفح بدون إنترنت' : 'Accès Hors-Ligne'}
              </p>
              <p className="text-[11px] text-[#5C4D3C] leading-relaxed">
                {isAr ? 'الكتالوج محفوظ بذاكرة هاتفك' : 'Consultez vos riads et créations même sans réseau.'}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-[#E6DEC8] space-y-1">
              <div className="w-7 h-7 rounded-xl bg-[#18392B]/10 text-[#18392B] flex items-center justify-center font-bold">
                <ShieldCheck className="w-4 h-4 text-[#18392B]" />
              </div>
              <p className="font-bold text-[#18392B]">
                {isAr ? 'آمن وخفيف' : '100% Sécurisé'}
              </p>
              <p className="text-[11px] text-[#5C4D3C] leading-relaxed">
                {isAr ? 'خفيف على ذاكرة الهاتف وبطاريته' : 'Moins de 2 Mo d’espace utilisé sur votre téléphone.'}
              </p>
            </div>
          </div>

          {/* Android Direct One-Click Install */}
          {isInstallable ? (
            <div className="space-y-3 pt-2">
              <button
                onClick={handleInstallClick}
                className="w-full py-4 px-5 rounded-2xl bg-[#18392B] hover:bg-[#24533E] text-white font-bold text-sm flex items-center justify-center gap-3 shadow-xl transition-all transform active:scale-98"
              >
                <Download className="w-5 h-5 text-[#D4A373] animate-bounce" />
                <span>{isAr ? 'تثبيت التطبيق الآن على الهاتف (APK)' : 'Installer l’Application sur mon Smartphone'}</span>
              </button>
              <p className="text-[10px] text-center text-[#8C7A65]">
                Compatible avec tous les téléphones Android (Samsung, Xiaomi, Oppo, etc.) et Chrome
              </p>
            </div>
          ) : isIOS ? (
            /* iOS Safari Instructions */
            <div className="p-4 rounded-2xl bg-white border border-[#E6DEC8] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#18392B]">
                <Smartphone className="w-4 h-4 text-[#A8582C]" />
                <span>{isAr ? 'طريقة التثبيت على آيفون (iPhone)' : 'Comment installer sur iPhone / iPad :'}</span>
              </div>
              <ol className="list-decimal list-inside space-y-2 text-[11px] text-[#5C4D3C] leading-relaxed">
                <li>
                  {isAr ? 'اضغط على زر المشاركة ' : 'Appuyez sur le bouton Partager '}
                  <Share2 className="w-3.5 h-3.5 inline text-[#18392B] mx-1" />
                  {isAr ? 'في أسفل متصفح Safari.' : 'dans la barre Safari.'}
                </li>
                <li>
                  {isAr ? 'مرر للأسفل واختر ' : 'Faites défiler vers le bas et choisissez '}
                  <strong>« Sur l'écran d'accueil »</strong> (أو « إضافة إلى الشاشة الرئيسية »).
                </li>
                <li>
                  {isAr ? 'اضغط على « إضافة » في الأعلى.' : 'Appuyez sur « Ajouter » en haut à droite.'}
                </li>
              </ol>
            </div>
          ) : (
            /* Chrome / Android standard guidance */
            <div className="space-y-3 pt-2">
              <button
                onClick={handleInstallClick}
                className="w-full py-4 px-5 rounded-2xl bg-[#18392B] hover:bg-[#24533E] text-white font-bold text-sm flex items-center justify-center gap-3 shadow-xl transition-all"
              >
                <Download className="w-5 h-5 text-[#D4A373]" />
                <span>{isAr ? 'تثبيت التطبيق على الشاشة الرئيسية' : 'Ajouter à l’écran d’accueil du téléphone'}</span>
              </button>
              <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  {isAr 
                    ? 'يمكنك أيضاً الضغط على القائمة (⋮) أعلى متصفح هاتفك ثم اختيار «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية».' 
                    : 'Sur mobile, vous pouvez aussi ouvrir le menu (⋮) de votre navigateur puis appuyer sur « Installer l’application ».'}
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#EAE3D2] flex items-center justify-between text-xs">
          <span className="text-[#8C7A65]">Édition officielle Dar Diafa</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#FAF7F2] hover:bg-[#EAE3D2] text-[#18392B] font-bold rounded-xl"
          >
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
};
