import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, FileText, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function AuthorArticles() {
  const { authorName } = useParams();
  const { t } = useLanguage();

  // Mock data for articles by author
  const getArticlesForAuthor = (name: string | undefined) => {
    if (name?.includes('Sahil')) {
      return [
        {
          title: t('article2Title'),
          vol: "3",
          issue: "4",
          year: "2023",
          category: "CONSTITUTIONAL LAW",
          link: "/article?id=sahil"
        }
      ];
    }
    return [
      {
        title: t('articleTitle'),
        vol: "2",
        issue: "2",
        year: "2026",
        category: "PUBLIC ADMINISTRATION",
        link: "/article"
      },
      {
        title: "Legitimacy and Organizational Survival in Transitional Economies",
        vol: "2",
        issue: "1",
        year: "2026",
        category: "JURISPRUDENCE",
        link: "/article"
      }
    ];
  };

  const articles = getArticlesForAuthor(authorName);

  return (
    <main className="w-full academic-bg min-h-screen pt-32 pb-48">
      <div className="max-w-screen-md mx-auto px-6">
        <Link 
          to="/explore/author" 
          className="inline-flex items-center gap-2 text-[10px] font-sans font-black uppercase tracking-[0.2em] text-[#6495ED] mb-12 hover:-translate-x-1 transition-transform"
        >
          <ArrowLeft className="w-4 h-4" /> {t('exploreByAuthorTitle')}
        </Link>

        <header className="mb-24 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-8 border border-slate-200">
                <span className="text-3xl font-serif text-slate-400">{authorName?.charAt(0)}</span>
            </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            {authorName}
          </h1>
          <p className="text-[11px] font-sans font-black text-slate-300 uppercase tracking-[0.4em]">
            {t('contributingAuthor')}
          </p>
        </header>

        <div className="space-y-8">
            <h3 className="font-sans text-[10px] uppercase tracking-[0.3em] font-black text-slate-900 border-b border-black pb-4 mb-12">
                {t('publishedWorks')} ({articles.length})
            </h3>

          {articles.map((article, idx) => (
            <Link 
              key={idx} 
              to={article.link}
              className="group block p-6 md:p-8 bg-white border border-slate-100 hover:border-[#6495ED] transition-all shadow-sm hover:shadow-xl"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                <span className="text-[9px] font-sans font-bold text-[#6495ED] uppercase tracking-widest px-2 py-1 bg-slate-50 border border-slate-100 italic">
                    {article.category}
                </span>
                <span className="text-[10px] font-sans font-black text-slate-300 uppercase tracking-widest italic">
                    {article.year}
                </span>
              </div>
              
              <h4 className="text-lg md:text-xl font-serif font-bold text-primary group-hover:italic transition-all leading-tight mb-6">
                {article.title}
              </h4>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-50">
                <div className="flex gap-4 text-[9px] font-sans font-bold uppercase tracking-widest text-slate-400">
                    <span>{t('volume')} {article.vol}</span>
                    <span className="text-slate-200">◆</span>
                    <span>{t('issue')} {article.issue}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-widest text-[#6495ED] opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                    {t('viewArticle')} <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
