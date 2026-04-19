import { Search, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function Archive() {
  const { t } = useLanguage();

  return (
    <main className="w-full bg-white pb-24">
      <header className="py-24 border-b border-outline bg-slate-50">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-7xl font-serif text-primary mb-8 font-light tracking-tight italic">{t('journalArchive')}</h2>
          <p className="text-xl font-serif italic text-on-surface-variant max-w-2xl mx-auto leading-relaxed opacity-80">
            {t('archiveDescription')}
          </p>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-6 -mt-8">
        <div className="bg-white border border-outline shadow-xl flex items-center px-8 py-6 mb-24">
          <Search className="w-5 h-5 text-slate-400 mr-6" />
          <input 
            className="bg-transparent border-none focus:ring-0 w-full font-serif text-xl italic" 
            placeholder={t('searchPlaceholder')} 
            type="text"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-8 space-y-24">
            <VolumeRecord vol="3" year="2023" issues={['Issue 4']} />
            <VolumeRecord vol="2" year="2026" issues={['Spring']} />
          </div>

          <aside className="md:col-span-4 space-y-12">
            <div className="border-t-2 border-primary pt-8">
              <h4 className="font-sans text-[11px] uppercase tracking-[0.2em] font-bold text-primary mb-8">{t('specialIssues')}</h4>
              <ul className="space-y-6">
                <li><a href="#" className="font-serif italic text-lg hover:text-accent transition-colors">Centennial Flight Review (2026)</a></li>
                <li><a href="#" className="font-serif italic text-lg hover:text-accent transition-colors">Post-9/11 Security Jurisprudence</a></li>
                <li><a href="#" className="font-serif italic text-lg hover:text-accent transition-colors">The Chicago Convention Retrospective</a></li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function VolumeRecord({ vol, year, issues }: any) {
  const { t } = useLanguage();

  return (
    <section>
      <div className="border-b border-outline pb-4 mb-10 flex justify-between items-baseline">
        <h3 className="text-3xl font-serif font-bold text-primary">{t('volume')} {vol}</h3>
        <span className="font-serif italic text-slate-400">{year}</span>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {issues.map((issue: string) => (
          <Link key={issue} to={vol === "3" ? "/article?id=sahil" : "/article"} className="group flex items-center justify-between p-6 hover:bg-slate-50 border border-transparent hover:border-outline transition-all">
            <span className="text-xl font-serif group-hover:italic group-hover:text-accent transition-all">{issue}</span>
            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-accent translate-x-0 group-hover:translate-x-2 transition-all" />
          </Link>
        ))}
      </div>
    </section>
  );
}
