import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'motion/react';
import { BookOpen, GraduationCap, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function StudentWriting() {
  const { t } = useLanguage();

  const studentPapers = [
    {
      title: "The Impact of Evolving Space Law on Commercial Satellite Operations",
      author: "Aydin Mammadov",
      year: "2026",
      summary: "An analysis of the Outer Space Treaty's relevance in the age of mega-constellations.",
      type: "Note"
    },
    {
      title: "Sustainable Aviation Fuel: Regulatory Hurdles and Incentives",
      author: "Leyla Aliyeva",
      year: "2025",
      summary: "Exploring the legal frameworks required to accelerate the adoption of green fuels in Asia.",
      type: "Comment"
    },
    {
      title: "Liability in Mid-Air Collisions involving Remotely Piloted Aircraft",
      author: "Farid Guliyev",
      year: "2026",
      summary: "Examining ICAO standards vs. national tort law in complex liability scenarios.",
      type: "Note"
    }
  ];

  return (
    <main className="w-full academic-bg min-h-screen pt-32 pb-48">
      <div className="max-w-screen-xl mx-auto px-6">
        {/* Header Section */}
        <header className="mb-24 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-100 rounded-full mb-8">
            <GraduationCap className="w-5 h-5 text-[#6495ED]" />
            <span className="text-[10px] font-sans font-black uppercase tracking-[0.2em] text-slate-400">{t('emergingScholars')}</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary mb-12">
            {t('studentWriting')}
          </h1>
          <div className="space-y-6 text-lg text-slate-600 font-serif leading-relaxed">
            <p>
              {t('studentMission1')}
            </p>
            <p>
              {t('studentMission2')}
            </p>
          </div>
        </header>

        {/* Papers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {studentPapers.map((paper, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white border border-slate-100 p-10 group hover:border-[#6495ED] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
                <BookOpen className="w-16 h-16 text-[#6495ED]" />
              </div>
              
              <div className="flex items-center gap-2 mb-8 text-[9px] font-sans font-bold uppercase tracking-[0.3em] text-[#6495ED]">
                <span className="px-2 py-1 bg-slate-50 border border-slate-100 rounded">{paper.type}</span>
                <span className="text-slate-300">/</span>
                <span className="text-slate-400">{paper.year}</span>
              </div>

              <h3 className="text-2xl font-serif font-bold text-primary mb-4 transition-all leading-tight">
                {paper.title}
              </h3>
              
              <div className="font-sans font-black text-[10px] uppercase tracking-widest text-slate-500 mb-6">
                By {paper.author}
              </div>

              <p className="text-slate-400 font-serif leading-relaxed mb-8 flex-1">
                {paper.summary}
              </p>

              <Link 
                to="/article" 
                className="inline-flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-widest text-[#6495ED] group/link"
              >
                {t('readFully')} <ChevronRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <section className="mt-32 p-12 bg-primary text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none flex items-center justify-center">
            <GraduationCap className="w-[400px] h-[400px] text-white" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-serif font-bold text-white mb-6">{t('submitYourWork')}</h2>
            <p className="max-w-xl mx-auto text-white/60 font-serif mb-10 text-lg">
              {t('submitDescription')}
            </p>
            <Link 
              to="/submit" 
              className="inline-block bg-white text-primary px-10 py-4 font-sans font-black uppercase text-[11px] tracking-[0.3em] hover:bg-[#6495ED] hover:text-white transition-all shadow-xl"
            >
              {t('submissionGuidelines')}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
