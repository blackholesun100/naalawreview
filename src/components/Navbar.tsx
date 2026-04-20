import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Globe, ChevronDown, Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const { setLanguage, t, language } = useLanguage();
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsAboutOpen(false);
    setIsExploreOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const isActive = (path: string) => location.pathname === path;
  const isAboutActive = location.pathname === '/submit' || location.pathname === '/board-of-editors';
  const isExploreActive = location.pathname.startsWith('/explore');
  const isHome = location.pathname === '/';

  const navItemClass = (path: string) => `text-[10px] font-sans uppercase tracking-[0.15em] font-semibold transition-colors ${
    isActive(path) 
      ? 'text-primary underline decoration-[#6495ED] underline-offset-8 decoration-2' 
      : 'text-primary hover:text-accent'
  }`;

  return (
    <header className="flex flex-col w-full">
      {/* Title Bar */}
      <div className={`bg-primary flex flex-col items-center justify-center text-center relative overflow-hidden transition-all duration-700 ease-in-out ${
        isHome ? 'py-20' : 'py-8'
      }`}>
        {/* Courthouse & Lady Justice (Femida) Watermark */}
        <div className={`absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] transition-all duration-700 ${
          isHome ? 'scale-100' : 'scale-75'
        }`}>
          <svg viewBox="0 0 400 400" className="w-[400px] h-[400px] text-white fill-current">
            {/* STAIRCASE / BASE (Grand Foundation) */}
            <rect x="50" y="340" width="300" height="4" rx="1" />
            <rect x="60" y="332" width="280" height="8" rx="1" />
            <rect x="75" y="322" width="250" height="10" rx="1" />
            <rect x="90" y="310" width="220" height="12" rx="1" />

            {/* CLASSICAL COLUMNS (Ionic/Corinthian Style Details) */}
            {[105, 145, 245, 285].map((x) => (
              <g key={x}>
                {/* Column Base */}
                <rect x={x-4} y={305} width="18" height="5" rx="1" />
                {/* Main Shaft with Fluting lines */}
                <rect x={x} y={145} width="10" height="160" />
                <rect x={x+3} y={145} width="1" height="160" className="opacity-30" />
                <rect x={x+6} y={145} width="1" height="160" className="opacity-30" />
                {/* Capital (Top) */}
                <path d={`M${x-6} 145 Q${x} 135 ${x+5} 145 Q${x+10} 135 ${x+16} 145 L${x+16} 135 L${x-6} 135 Z`} />
              </g>
            ))}

            {/* UPPER ARCHITRAVE (Entablature) */}
            <rect x="85" y="125" width="230" height="10" rx="1" />
            <rect x="80" y="115" width="240" height="10" rx="1" />

            {/* TRIANGULAR PEDIMENT (Timpano) */}
            <path d="M60 115 L200 20 L340 115 Z" />
            {/* Decorative inner line */}
            <path d="M85 105 L200 35 L315 105 Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="opacity-20" />
            {/* Center Emblem in Pediment */}
            <circle cx="200" cy="80" r="12" stroke="currentColor" fill="none" strokeWidth="1" className="opacity-40" />
            <path d="M200 70 L200 90 M190 80 L210 80" stroke="currentColor" strokeWidth="0.5" className="opacity-20" />

            {/* LADY JUSTICE (FEMIDA) - Refined Silhouette */}
            <g transform="translate(0, 5)">
                {/* Figure Body (The Gown) */}
                <path d="M200 135 L190 170 L180 230 L175 310 L225 310 L220 230 L210 170 Z" className="opacity-60" />
                {/* Sash / Detail */}
                <path d="M190 170 Q200 165 210 180" fill="none" stroke="currentColor" strokeWidth="0.5" className="opacity-40" />
                {/* Head with Blindfold detail */}
                <circle cx="200" cy="120" r="10" className="opacity-60" />
                <rect x="190" y="118" width="20" height="3" className="opacity-80" />
                
                {/* The Scales (Balanced and Precise) */}
                <g className="opacity-80">
                    <path d="M155 155 L245 155" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /> {/* Beam */}
                    {/* Left Scale */}
                    <path d="M155 155 L145 190 M155 155 L165 190" stroke="currentColor" strokeWidth="0.5" />
                    <path d="M135 190 L175 190 Q155 215 135 190" stroke="currentColor" strokeWidth="1" />
                    {/* Right Scale */}
                    <path d="M245 155 L235 190 M245 155 L255 190" stroke="currentColor" strokeWidth="0.5" />
                    <path d="M225 190 L265 190 Q245 215 225 190" stroke="currentColor" strokeWidth="1" />
                </g>

                {/* The Sword (Upright) */}
                <path d="M235 210 L235 295" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-50" />
                <path d="M228 220 L242 220" stroke="currentColor" strokeWidth="2" className="opacity-50" /> {/* Hilt */}
            </g>

            {/* Decorative Wreath / Flourish */}
            <path d="M100 60 Q120 40 150 70" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-10" />
            <path d="M300 60 Q280 40 250 70" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-10" />
          </svg>
        </div>
        <Link to="/" className="group transition-all duration-500">
          <h1 className={`text-white font-serif tracking-[0.2em] uppercase leading-tight font-light transition-all duration-500 ${
            isHome ? 'text-2xl md:text-4xl' : 'text-lg md:text-xl'
          }`}>
            {t('navTitle')}
          </h1>
          <h2 className={`text-white font-serif tracking-[0.25em] uppercase leading-tight font-light transition-all duration-500 ${
            isHome ? 'text-2xl md:text-4xl mt-2' : 'text-lg md:text-xl mt-1'
          }`}>
            {t('navSubTitle')}
          </h2>
        </Link>
      </div>

      <div className="bg-white border-b border-outline sticky top-0 z-50 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-primary p-2 -ml-2"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          <nav className="hidden md:flex flex-1 justify-center items-center gap-8 h-full">
            <Link to="/article" className={navItemClass('/article')}>{t('featuredArticles')}</Link>
            <Link to="/student-writing" className={navItemClass('/student-writing')}>{t('studentWriting')}</Link>
            
            {/* Explore Dropdown */}
            <div 
              className="relative h-full flex items-center group"
              onMouseEnter={() => setIsExploreOpen(true)}
              onMouseLeave={() => setIsExploreOpen(false)}
            >
              <button 
                className={`flex items-center gap-1 text-[10px] font-sans uppercase tracking-[0.15em] font-semibold transition-colors cursor-pointer h-full ${
                  isExploreActive 
                    ? 'text-primary underline decoration-[#6495ED] underline-offset-8 decoration-2' 
                    : 'text-primary'
                }`}
              >
                {t('explore')} <ChevronDown className={`w-3 h-3 transition-transform ${isExploreOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isExploreOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-0 w-56 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="bg-white border border-slate-100 shadow-2xl p-2 flex flex-col">
                    <Link 
                      to="/explore/author" 
                      className="px-4 py-3 text-[10px] font-sans uppercase tracking-widest font-bold text-slate-400 hover:text-primary hover:bg-slate-50 transition-all border-b border-slate-50 last:border-0"
                      onClick={() => setIsExploreOpen(false)}
                    >
                      {t('exploreByAuthor')}
                    </Link>
                    <Link 
                      to="/archive" 
                      className="px-4 py-3 text-[10px] font-sans uppercase tracking-widest font-bold text-slate-400 hover:text-primary hover:bg-slate-50 transition-all border-b border-slate-50 last:border-0"
                      onClick={() => setIsExploreOpen(false)}
                    >
                      {t('exploreByVolume')}
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link to="/supreme-court" className={navItemClass('/supreme-court')}>{t('supremeCourt')}</Link>
            <Link to="/archive" className={navItemClass('/archive')}>{t('archive')}</Link>
            
            {/* About Dropdown */}
            <div 
              className="relative h-full flex items-center group"
              onMouseEnter={() => setIsAboutOpen(true)}
              onMouseLeave={() => setIsAboutOpen(false)}
            >
              <button 
                className={`flex items-center gap-1 text-[10px] font-sans uppercase tracking-[0.15em] font-semibold transition-colors cursor-pointer h-full ${
                  isAboutActive 
                    ? 'text-primary underline decoration-[#6495ED] underline-offset-8 decoration-2' 
                    : 'text-primary'
                }`}
              >
                {t('about')} <ChevronDown className={`w-3 h-3 transition-transform ${isAboutOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isAboutOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-0 w-48 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="bg-white border border-slate-100 shadow-2xl p-2 flex flex-col">
                    <Link 
                      to="/submit" 
                      className={`px-4 py-3 text-[10px] font-sans uppercase tracking-widest font-bold transition-all border-b border-slate-50 last:border-0 ${
                        isActive('/submit') ? 'text-primary bg-slate-50' : 'text-slate-400 hover:text-primary hover:bg-slate-50'
                      }`}
                      onClick={() => setIsAboutOpen(false)}
                    >
                      {t('submit')}
                    </Link>
                    <Link 
                      to="/board-of-editors" 
                      className={`px-4 py-3 text-[10px] font-sans uppercase tracking-widest font-bold transition-all border-b border-slate-50 last:border-0 ${
                        isActive('/board-of-editors') ? 'text-primary bg-slate-50' : 'text-slate-400 hover:text-primary hover:bg-slate-50'
                      }`}
                      onClick={() => setIsAboutOpen(false)}
                    >
                      {t('boardOfEditors')}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Centered Identity Title on Mobile */}
          <div className="md:hidden flex-1 flex justify-center py-2">
            <span className="font-serif text-[10px] uppercase font-bold tracking-widest text-primary text-center">
              NAA Law Review
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Desktop Language Switcher */}
            <div className="hidden md:flex items-center border border-slate-100 rounded mr-2 overflow-hidden">
              <button 
                onClick={() => setLanguage('en')}
                className={`text-[9px] font-sans font-black px-2 py-1.5 transition-all ${language === 'en' ? 'bg-primary text-white' : 'bg-white text-slate-300 hover:text-primary'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLanguage('az')}
                className={`text-[9px] font-sans font-black px-2 py-1.5 transition-all ${language === 'az' ? 'bg-primary text-white' : 'bg-white text-slate-300 hover:text-primary'}`}
              >
                AZ
              </button>
            </div>
            <button 
              className={`transition-colors p-2 ${isSearchOpen ? 'text-[#6495ED]' : 'text-primary hover:text-accent'}`}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              {isSearchOpen ? <X className="w-5 h-5 stroke-[2]" /> : <Search className="w-5 h-5 stroke-[1.5]" />}
            </button>
          </div>
        </div>

        {/* Integrated Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="bg-slate-50 border-t border-outline overflow-hidden"
            >
              <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-4">
                <div className="relative max-w-2xl mx-auto">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('searchPlaceholder')}
                    className="w-full bg-white border border-slate-200 pl-12 pr-12 py-4 font-serif text-lg focus:outline-none focus:border-[#6495ED] focus:ring-4 focus:ring-[#6495ED]/10 shadow-sm transition-all rounded-none"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-300 hover:text-[#6495ED] hover:bg-slate-50 transition-all rounded-full group"
                      title="Clear search"
                    >
                      <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Slide-out Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] md:hidden"
              />
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 left-0 w-[80%] max-w-xs bg-white z-[101] shadow-2xl md:hidden overflow-y-auto"
              >
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-outline flex items-center justify-between">
                    <span className="font-serif font-bold text-sm tracking-widest text-[#6495ED]">NAA LAW REVIEW</span>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="text-primary">
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <nav className="flex-1 p-6 space-y-2">
                    <Link to="/article" className="block py-4 border-b border-slate-50 text-[11px] font-sans font-black uppercase tracking-[0.2em] text-primary">{t('featuredArticles')}</Link>
                    <Link to="/student-writing" className="block py-4 border-b border-slate-50 text-[11px] font-sans font-black uppercase tracking-[0.2em] text-primary">{t('studentWriting')}</Link>
                    
                    <div className="py-4 border-b border-slate-50">
                      <span className="block text-[10px] font-sans font-bold text-slate-300 uppercase tracking-widest mb-4">Archives</span>
                      <Link to="/archive" className="block pl-4 py-3 text-[11px] font-sans font-black uppercase tracking-[0.2em] text-primary mb-2 italic">By Volume</Link>
                      <Link to="/explore/author" className="block pl-4 py-2 text-[11px] font-sans font-black uppercase tracking-[0.2em] text-primary italic">By Author</Link>
                    </div>

                    <Link to="/supreme-court" className="block py-4 border-b border-slate-50 text-[11px] font-sans font-black uppercase tracking-[0.2em] text-primary">{t('supremeCourt')}</Link>
                    
                    <div className="py-4 border-b border-slate-50">
                      <span className="block text-[10px] font-sans font-bold text-slate-300 uppercase tracking-widest mb-4">Information</span>
                      <Link to="/submit" className="block pl-4 py-3 text-[11px] font-sans font-black uppercase tracking-[0.2em] text-primary mb-2 italic">{t('submit')}</Link>
                      <Link to="/board-of-editors" className="block pl-4 py-2 text-[11px] font-sans font-black uppercase tracking-[0.2em] text-primary italic">{t('boardOfEditors')}</Link>
                    </div>
                  </nav>

                  <div className="p-8 bg-slate-50 border-t border-outline">
                    <div className="flex justify-center gap-4 mb-6">
                      <button 
                        onClick={() => setLanguage('en')}
                        className={`text-[11px] font-sans font-black uppercase tracking-widest px-4 py-2 rounded border transition-all ${language === 'en' ? 'bg-primary text-white border-primary' : 'bg-white text-slate-400 border-slate-200'}`}
                      >
                        English
                      </button>
                      <button 
                        onClick={() => setLanguage('az')}
                        className={`text-[11px] font-sans font-black uppercase tracking-widest px-4 py-2 rounded border transition-all ${language === 'az' ? 'bg-primary text-white border-primary' : 'bg-white text-slate-400 border-slate-200'}`}
                      >
                        Azerbaijani
                      </button>
                    </div>
                    <p className="text-[10px] font-serif italic text-slate-400 text-center">"Lex Volat Altissime"</p>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
