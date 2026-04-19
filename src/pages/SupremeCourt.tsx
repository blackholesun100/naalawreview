import { Gavel, FileText, ChevronRight, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function SupremeCourt() {
  const { t } = useLanguage();

  const resolutions = [
    { title: t('resolution1'), date: '2025-10-14', no: '05' },
    { title: t('resolution2'), date: '2024-12-28', no: '12' },
    { title: t('resolution3'), date: '2024-06-15', no: '08' },
    { title: t('resolution4'), date: '2023-11-20', no: '14' },
    { title: t('resolution5'), date: '2023-05-10', no: '03' },
    { title: t('resolution6'), date: '2022-09-18', no: '07' },
  ];

  return (
    <main className="max-w-screen-xl mx-auto px-6 md:px-12 pt-16 pb-24">
      <header className="mb-16 flex flex-col items-start text-left max-w-4xl">
        <p className="font-sans text-[9px] uppercase tracking-[0.4em] text-on-surface-variant mb-4 font-bold">{t('supremeCourtTitle')}</p>
        <h1 className="text-3xl md:text-5xl font-serif text-primary leading-tight mb-6 font-medium">
          {t('supremeCourtSub')}
        </h1>
        <div className="h-0.5 w-16 bg-[#6495ED] mb-6"></div>
        <p className="text-base md:text-lg text-slate-500 font-serif leading-relaxed italic max-w-2xl">
          Exploring the precedent-setting decisions that define the unified legal landscape of the Republic of Azerbaijan. Access to the official records of the Plenum of the Supreme Court.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-8">
          {resolutions.map((res, idx) => (
            <div key={idx} className="bg-white border border-slate-100 p-8 md:p-10 hover:shadow-md transition-all group">
              <div className="flex justify-between items-start mb-6">
                <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-[#6495ED] font-bold">Resolution No. {res.no} / {res.date.split('-')[0]}</span>
                <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-slate-300 font-bold">{res.date}</span>
              </div>
              <h3 className="text-xl md:text-2xl font-serif text-primary mb-6 font-medium leading-snug group-hover:italic transition-all uppercase">
                {res.title}
              </h3>
              <p className="text-slate-500 font-serif italic text-base leading-relaxed mb-8 opacity-70">
                Detailed interpretation of relevant legislative frameworks to ensure consistency across lower courts...
              </p>
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 text-[11px] font-sans uppercase tracking-[0.2em] font-bold text-accent hover:translate-x-1 transition-transform">
                  {t('viewResolution')} <ChevronRight className="w-4 h-4" />
                </button>
                <a 
                  href="https://supremecourt.gov.az/az/vahid-mehkeme-tecrubesi/ali-mehkemenin-plenum-qerarlari" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-slate-300 hover:text-primary transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <aside className="lg:col-span-4 space-y-16">
          <div className="bg-stone-50 border border-slate-100 p-12">
            <h4 className="font-serif text-2xl italic mb-8 text-primary font-bold">{t('navigation')}</h4>
            <nav className="flex flex-col gap-6">
              {[
                'Plenum Structures',
                'Judicial Review',
                'Case Law Archive',
                'Legal Methodology',
                'International Cooperation'
              ].map((item, i) => (
                <a 
                  key={i}
                  href="#" 
                  className={`font-sans text-[10px] uppercase tracking-widest font-bold transition-all ${
                    i === 0 
                      ? 'text-primary underline decoration-[#6495ED] underline-offset-4 decoration-2' 
                      : 'text-slate-400 hover:text-accent'
                  }`}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          <div className="p-8 border-l-2 border-primary/10">
            <p className="font-serif italic text-slate-400 leading-relaxed text-lg">
              "The decisions of the Plenum of the Supreme Court carry a significant weight in ensuring the uniform application of law throughout the judicial system."
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
