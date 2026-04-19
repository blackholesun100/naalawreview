import { Gavel, Plane, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-white py-24 border-t border-outline">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-xl md:text-2xl font-serif tracking-[0.2em] uppercase mb-6 leading-tight">{t('navTitle')} <br/> {t('navSubTitle')}</h2>
            <p className="font-serif italic text-white/50 text-lg leading-relaxed max-w-sm">
              {t('footerDescription')}
            </p>
          </div>
          
          <div className="flex flex-col gap-6">
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] font-bold text-white/30">{t('navigation')}</span>
            <div className="flex flex-col gap-3">
              <Link to="/archive" className="font-sans text-[10px] uppercase tracking-[0.2em] font-semibold text-white/70 hover:text-white transition-colors">{t('archive')}</Link>
              <Link to="/submit" className="font-sans text-[10px] uppercase tracking-[0.2em] font-semibold text-white/70 hover:text-white transition-colors">{t('submit')}</Link>
              <Link to="/student-writing" className="font-sans text-[10px] uppercase tracking-[0.2em] font-semibold text-white/70 hover:text-white transition-colors">{t('studentWriting')}</Link>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] font-bold text-white/30">{t('connect')}</span>
            <div className="flex flex-col gap-3">
              <a href="mailto:info@naalawreview.org" className="text-white/80 hover:text-white transition-colors font-sans text-xs tracking-widest font-semibold uppercase italic mb-4">info@naalawreview.org</a>
            </div>
            <div className="flex gap-6">
              <Gavel className="w-5 h-5 opacity-30 hover:opacity-100 cursor-pointer transition-all" />
              <Plane className="w-5 h-5 opacity-30 hover:opacity-100 cursor-pointer transition-all" />
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2 items-center md:items-start">
            <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/40">
              © 2026 NAA Law Review. All Rights Reserved.
            </p>
            <p className="font-sans text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-white/40 font-semibold italic">
      
            </p>
          </div>
          <p className="font-serif italic text-sm text-white/40">
            {t('motto')}
          </p>
        </div>
      </div>
    </footer>
  );
}
