import { useLanguage } from '../contexts/LanguageContext';

export default function BoardOfEditors() {
  const { t } = useLanguage();

  return (
    <main className="max-w-screen-xl mx-auto px-6 md:px-12 pt-32 pb-48 academic-bg min-h-screen">
      <header className="mb-16 flex flex-col items-center text-center">
        <h1 className="text-3xl md:text-5xl font-serif text-[#222] leading-tight max-w-4xl mb-8 font-medium">
          {t('boardTitle')}
        </h1>
        <div className="h-px w-full bg-slate-100 max-w-5xl mb-8"></div>
      </header>

      <section className="max-w-4xl mx-auto bg-white border border-slate-50 p-8 md:p-16 shadow-sm relative overflow-hidden">
        {/* Harvard Decorative background elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 opacity-50 -mr-16 -mt-16 rotate-45" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-slate-50 opacity-50 -ml-16 -mb-16 rotate-45" />

        <div className="relative">
          <p className="font-serif text-lg md:text-xl leading-[1.7] text-[#333] mb-8 first-letter:text-[70px] first-letter:font-serif first-letter:font-light first-letter:mr-6 first-letter:float-left first-letter:leading-[0.8] first-letter:text-[#6495ED] first-letter:pt-2">
            {t('boardDescription')}
          </p>
          <p className="font-serif text-base md:text-lg leading-[1.6] text-[#555] italic border-l-2 border-slate-100 pl-6">
            {t('boardMenuText')}
          </p>
          
          <div className="mt-20 pt-16 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-12 font-sans text-[11px] uppercase tracking-[0.2em] font-bold text-slate-400">
             <div className="space-y-4">
                <p className="text-[#6495ED]">Executive Board (Vol 1)</p>
                <div className="w-8 h-0.5 bg-slate-200" />
             </div>
             <div className="space-y-4">
                <p className="hover:text-[#6495ED] transition-colors cursor-pointer">Membership Archive</p>
                <div className="w-8 h-0.5 bg-slate-200" />
             </div>
          </div>
        </div>
      </section>
    </main>
  );
}
