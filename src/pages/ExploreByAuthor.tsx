import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function ExploreByAuthor() {
  const { t } = useLanguage();
  const [selectedLetter, setSelectedLetter] = useState('ALL');

  const letters = ['ALL', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

  const authors = [
    { name: 'Talut Huseynov', letter: 'H' },
    { name: 'Sahil Zahir Huseynov', letter: 'H' },
  ];

  const filteredAuthors = selectedLetter === 'ALL' 
    ? authors 
    : authors.filter(a => a.letter === selectedLetter);

  // Group by letter for display
  const groupedAuthors: { [key: string]: string[] } = {};
  filteredAuthors.forEach(author => {
    if (!groupedAuthors[author.letter]) {
      groupedAuthors[author.letter] = [];
    }
    groupedAuthors[author.letter].push(author.name);
  });

  return (
    <main className="w-full academic-bg min-h-screen">
      {/* Breadcrumb Section */}
      <div className="max-w-screen-xl mx-auto px-6 py-6 border-b border-slate-100 mb-12">
        <div className="flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-widest text-slate-400">
          <Link to="/" className="hover:text-primary transition-colors">{t('navSubTitle')}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-primary">{t('exploreByAuthorTitle')}</span>
        </div>
      </div>

      <header className="max-w-screen-xl mx-auto px-6 text-center mb-24">
        <h1 className="text-5xl md:text-7xl font-serif text-[#1a1a1a] font-bold leading-tight tracking-tight">
          {t('exploreByAuthorTitle')}
        </h1>
      </header>

      {/* Alphabet Filter Bar */}
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 mb-12 md:mb-20">
        <div className="bg-white border border-slate-100 shadow-sm flex flex-wrap justify-center items-center py-2 md:py-4 px-2 gap-1 overflow-hidden">
          {letters.map((letter) => (
            <button
              key={letter}
              onClick={() => setSelectedLetter(letter)}
              className={`min-w-[32px] md:min-w-[40px] h-8 md:h-10 flex items-center justify-center font-sans text-[10px] md:text-xs font-bold transition-all border border-transparent ${
                selectedLetter === letter 
                  ? 'bg-[#6495ED] text-white shadow-lg' 
                  : 'text-slate-400 hover:border-slate-200 hover:text-primary active:bg-slate-50'
              }`}
            >
              {letter === 'ALL' ? t('all') : letter}
            </button>
          ))}
        </div>
      </div>

      {/* Authors List */}
      <div className="max-w-screen-xl mx-auto px-6 pb-48">
        <div className="space-y-32">
          {Object.keys(groupedAuthors).sort().map((letter) => (
            <section key={letter} className="relative">
              <div className="flex flex-col md:flex-row gap-8 md:gap-24">
                <div className="flex items-start">
                    <span className="text-4xl md:text-6xl font-serif font-light text-[#1a1a1a] sticky top-32">{letter}</span>
                </div>
                
                <div className="flex-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-6 pt-4 border-t border-slate-100 border-dotted">
                    {groupedAuthors[letter].map((name, i) => (
                      <Link 
                        key={i} 
                        to={`/explore/author/${encodeURIComponent(name)}`} 
                        className="font-sans text-[13px] font-bold text-slate-500 hover:text-[#6495ED] transition-colors leading-relaxed"
                      >
                        {name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ))}
          
          {Object.keys(groupedAuthors).length === 0 && (
            <div className="text-center py-32 border-y border-outline border-dotted">
                <p className="font-serif italic text-slate-400 text-xl">Authors starting with "{selectedLetter}" do not exist</p>
                <button 
                    onClick={() => setSelectedLetter('ALL')}
                    className="mt-8 text-[11px] font-sans font-black uppercase tracking-widest text-[#6495ED]"
                >
                    Reset Filter
                </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
