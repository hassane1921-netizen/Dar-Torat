import React from 'react';
import { Star, Quote, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-white border-t border-[#EAE3D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#D4A373] mb-2">
            <span className="w-6 h-0.5 bg-[#D4A373] inline-block" />
            <span>Témoignages & Récits</span>
            <span className="w-6 h-0.5 bg-[#D4A373] inline-block" />
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#18392B]">
            L'Expérience Vécue par nos Hôtes
          </h2>
          <p className="font-arabic text-lg text-[#8C3A27] font-semibold mt-1">
            شهادات ضيوفنا وزوارنا الكرام
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#E6DEC8] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-[#D4A373]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#D4A373]/30" />
                </div>

                <p className="text-xs sm:text-sm text-[#5C4D3C] italic leading-relaxed mb-6">
                  "{t.text}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[#EAE3D2]">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-10 h-10 rounded-full object-cover border border-[#D4A373]"
                />
                <div>
                  <h4 className="font-heading text-xs font-bold text-[#18392B]">{t.author}</h4>
                  <p className="text-[10px] text-[#8C7A65]">{t.location} • {t.stay}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
