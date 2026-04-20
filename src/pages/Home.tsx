import { ArrowRight, FileText, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="w-full">
      {/* Hero Section - Matching User Image */}
      <section className="relative overflow-hidden pt-8 md:pt-16 pb-16 md:pb-24 px-4 md:px-6 academic-bg border-b border-outline">
        <div className="max-w-screen-lg mx-auto flex flex-col items-center">
          
          <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3 mb-6 md:mb-8">
            <span className="text-xs md:text-sm font-serif text-primary">{t('volume')} 1</span>
            <span className="text-[8px] md:text-[10px] text-accent opacity-40">◆</span>
            <span className="text-xs md:text-sm font-serif text-primary">{t('issue')} 1</span>
            <span className="text-[8px] md:text-[10px] text-accent opacity-40">◆</span>
            <span className="text-xs md:text-sm font-serif text-primary">{t('spring')} 2026</span>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 md:p-20 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] border border-outline relative max-w-4xl w-full"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-accent">{t('aviationLaw')}</span>
              <span className="text-[8px] text-accent">◆</span>
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant/60">{t('article')}</span>
            </div>

            <h2 className="text-2xl md:text-4xl font-serif leading-tight text-primary mb-8 font-medium">
              {t('articleTitle')}
            </h2>

            <p className="text-base md:text-lg font-serif leading-relaxed text-on-surface-variant max-w-3xl mb-10 opacity-85">
              {t('articleAbstract')}
            </p>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-8 border-t border-outline">
              <div />
              <Link to="/article" className="flex items-center gap-2 text-[11px] font-sans uppercase tracking-[0.2em] font-bold text-accent hover:translate-x-1 transition-transform">
                {t('readFullManuscript')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Subtle decorative diamond from image */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-12 w-3 h-3 bg-primary rotate-45" />
      </section>

      {/* Grid of Featured Articles - Harvard Style List */}
      <section className="max-w-screen-xl mx-auto px-6 py-20">
        <div className="flex justify-between items-baseline mb-12 border-b-2 border-slate-900 pb-4">
          <h3 className="font-sans text-[10px] uppercase tracking-[0.4em] font-black text-[#222]">{t('featuredArticles')}</h3>
          <Link to="/archive" className="text-[9px] font-sans uppercase tracking-widest font-black text-[#6495ED] hover:text-black transition-colors">{t('browseArchive')} →</Link>
        </div>

        <div className="divide-y divide-slate-100 max-w-5xl">
          <HarvardArticleItem 
             category={t('foreword')}
             title={t('article2Title')}
             author={t('article2Author')}
             summary={t('article2Abstract')}
             link="/article?id=sahil"
          />
          <HarvardArticleItem 
             category={t('aviationLaw')}
             title={t('articleTitle')}
             author={t('authorName')}
             summary={t('articleAbstract').substring(0, 200) + "..."}
             link="/article"
          />
          <HarvardArticleItem 
             category={t('note')}
             title={t('schol1')}
             author="Editorial Board"
             summary={t('schol1Summary')}
             link="/article"
          />
          <HarvardArticleItem 
             category={t('review')}
             title={t('schol2')}
             author="T. Huseynov"
             summary={t('schol2Summary')}
             link="/article"
          />
          <HarvardArticleItem 
             category={t('comment')}
             title={t('schol3')}
             author="Faculty Research"
             summary={t('schol3Summary')}
             link="/article"
          />
        </div>
      </section>

      {/* Supreme Court Section Teaser */}
      <section className="bg-primary text-white py-20 px-6 overflow-hidden relative">
        <div className="max-w-screen-xl mx-auto flex flex-col items-center text-center">
          <h3 className="font-sans text-[9px] uppercase tracking-[0.4em] text-white/40 mb-6 font-bold">{t('supremeCourt')}</h3>
          <h2 className="text-3xl md:text-4xl font-serif mb-8 leading-tight max-w-2xl">
            {t('supremeCourtSub')}
          </h2>
          <Link to="/supreme-court" className="inline-flex items-center gap-4 text-[10px] font-sans uppercase tracking-[0.3em] font-black hover:text-white/60 transition-colors">
            Access Plenum Records <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Student Writing Teaser */}
      <section className="bg-white py-24 px-6 border-b border-outline">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <h3 className="font-sans text-[10px] uppercase tracking-[0.4em] text-accent mb-6 font-bold">{t('studentWriting')}</h3>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 text-primary leading-tight">
              A journey of legal discovery.
            </h2>
            <p className="text-xl font-serif text-slate-500 mb-10 leading-relaxed">
              From early academic reflections to sophisticated research, this section showcases the emerging voices and critical scholarship of National Aviation Academy students.
            </p>
            <Link to="/student-writing" className="inline-flex items-center gap-4 text-[10px] font-sans uppercase tracking-[0.3em] font-black text-primary hover:text-accent transition-colors">
              Explore Student Notes <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex-1 grid grid-cols-1 gap-6">
            <div className="p-8 bg-slate-50 border border-slate-100 group hover:border-[#6495ED] transition-all">
                <div className="text-[9px] font-sans font-bold text-[#6495ED] uppercase tracking-widest mb-4">Space Law Note</div>
                <h4 className="font-serif text-xl font-bold mb-2">Commericial Satellite Operations & Evolving Space Law</h4>
                <div className="text-[10px] font-sans font-bold text-slate-300 uppercase tracking-widest">A. Mammadov</div>
            </div>
            <div className="p-8 bg-slate-50 border border-slate-100 group hover:border-[#6495ED] transition-all opacity-50">
                <div className="text-[9px] font-sans font-bold text-[#6495ED] uppercase tracking-widest mb-4">Regulatory Comment</div>
                <h4 className="font-serif text-xl font-bold mb-2">Sustainable Aviation Fuel: Legal Hurdles</h4>
                <div className="text-[10px] font-sans font-bold text-slate-300 uppercase tracking-widest">L. Aliyeva</div>
            </div>
          </div>
        </div>
      </section>

      {/* Submission CTA */}
      <section className="bg-slate-50 py-24 border-y border-outline px-6">
        <div className="max-w-screen-xl mx-auto text-center">
            <h2 className="text-4xl font-serif mb-8 text-primary">{t('submitForPeerReview')}</h2>
            <p className="text-lg font-serif text-on-surface-variant leading-relaxed mb-10 max-w-lg mx-auto">
              {t('submitDescription')}
            </p>
            <Link to="/submit" className="inline-block bg-primary text-white px-10 py-4 font-sans text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-black transition-colors">
              {t('manuscriptInstructions')}
            </Link>
        </div>
      </section>
    </main>
  );
}

function HarvardArticleItem({ category, title, author, summary, link }: any) {
  return (
    <div className="group py-8 md:py-12 first:pt-0">
      <Link to={link || "/article"} className="block">
        <div className="flex items-center gap-2 md:gap-3 mb-4">
          <span className="font-sans text-[8px] md:text-[9px] uppercase tracking-[0.3em] font-black text-[#6495ED]">{category}</span>
          <span className="text-slate-200 text-[6px] md:text-[8px] opacity-40">◆</span>
          <span className="font-sans text-[8px] md:text-[9px] uppercase tracking-[0.3em] font-black text-slate-300">Article</span>
        </div>
        <h4 className="text-lg md:text-2xl font-serif text-[#222] mb-4 leading-tight group-hover:text-[#6495ED] transition-colors decoration-1">
          {title}
        </h4>
        <div className="font-sans font-bold text-[#6495ED] text-[9px] md:text-[10px] uppercase tracking-widest mb-4 md:mb-6">
          {author}
        </div>
        <p className="text-sm md:text-base font-serif text-slate-500 leading-relaxed max-w-3xl">
          {summary}
        </p>
      </Link>
    </div>
  );
}

function ArchiveLink({ year, title }: any) {
  return (
    <Link to="/archive" className="group">
      <span className="font-sans text-[10px] text-slate-400 block mb-2 font-bold tracking-widest">{year}</span>
      <span className="font-serif text-xl font-bold leading-snug group-hover:text-primary-container group-hover:underline underline-offset-4 decoration-1">{title}</span>
    </Link>
  );
}
