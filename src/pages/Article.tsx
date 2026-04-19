import { Share2, Printer, FileText, Bookmark, Quote, ArrowLeft, ArrowRight, Quote as CiteIcon, X, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { useLanguage } from '../contexts/LanguageContext';

export default function Article() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const articleId = searchParams.get('id');
  
  const [isCiteModalOpen, setIsCiteModalOpen] = useState(false);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const isSahil = articleId === 'sahil';

  const articleMetadata = isSahil ? {
    author: "Sahil Zahir Huseynov",
    title: t('article2Title'),
    journal: "National Aviation Academy Law Review",
    volume: "3",
    issue: "4",
    year: "2023",
    pages: "239-254",
    doi: "10.57125/FEL.2023.12.25.15",
    history: {
        received: "14-09-2023",
        accepted: "13-12-2023",
        available: "25-12-2023"
    },
    topics: ["CONSTITUTIONAL LAW", "LOCAL GOVERNMENT"]
  } : {
    author: t('authorName'),
    title: t('articleTitle'),
    journal: "National Aviation Academy Law Review",
    volume: "2",
    issue: "2",
    year: "2026",
    pages: "51-59",
    doi: "10.5281/zenodo.19474989",
    history: {
        received: "22-03-2026",
        accepted: "30-03-2026",
        available: "08-04-2026"
    },
    topics: ["PUBLIC ADMINISTRATION", "INSTITUTIONAL THEORY"]
  };

  const bodyParaClass = "mb-8 hover:bg-[#6495ED]/5 transition-all duration-300 px-2 md:px-4 -mx-2 md:-mx-4 py-2 rounded-sm cursor-default select-text text-justify";

  const citations = [
    {
      label: "APA",
      text: `${articleMetadata.author}. (${articleMetadata.year}). ${articleMetadata.title}. ${articleMetadata.journal}, ${articleMetadata.volume}(${articleMetadata.issue}), ${articleMetadata.pages}.`
    },
    {
      label: "MLA",
      text: `${articleMetadata.author}. "${articleMetadata.title}." ${articleMetadata.journal}, vol. ${articleMetadata.volume}, no. ${articleMetadata.issue}, ${articleMetadata.year}, pp. ${articleMetadata.pages}.`
    },
    {
      label: "Chicago",
      text: `${articleMetadata.author}. "${articleMetadata.title}." ${articleMetadata.journal} ${articleMetadata.volume}, no. ${articleMetadata.issue} (${articleMetadata.year}): ${articleMetadata.pages}.`
    }
  ];

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(label);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    
    if (isSahil) {
      // Sahil's branding (Futurity Economics & Law)
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.setTextColor(40, 60, 100);
      doc.text('FUTURITY', 115, 20);
      doc.setFont('helvetica', 'normal');
      doc.text('Economics & Law', 115, 30);
      
      // Blue accent line
      doc.setDrawColor(100, 149, 237);
      doc.setLineWidth(0.5);
      doc.line(20, 35, 190, 35);

      // Metadata block
      doc.setFontSize(8);
      doc.setTextColor(80);
      doc.text(`DOI: ${articleMetadata.doi}`, 190, 45, { align: 'right' });
      doc.setFont('helvetica', 'bold');
      doc.text('How to cite: ', 20, 52);
      doc.setFont('helvetica', 'italic');
      doc.text('Huseynov, S. Z. (2023). Organisation of local self-government in the Republic of Azerbaijan.', 40, 52);
      doc.text('Futurity Economics & Law, 3(4). 239-254.', 40, 57);

      // Title
      doc.setFont('times', 'bold');
      doc.setFontSize(18);
      doc.setTextColor(0);
      const titleLines = doc.splitTextToSize('Organisation of local self-government in the Republic of Azerbaijan', 160);
      doc.text(titleLines, 105, 80, { align: 'center' });

      // Author Details
      doc.setFontSize(12);
      doc.text('Sahil Zahir Huseynov', 105, 100, { align: 'center' });
      doc.setFontSize(9);
      doc.setFont('times', 'normal');
      const affiliation = 'National Aviation Academy of the Republic of Azerbaijan, Baku, Azerbaijan, https://orcid.org/0009-0003-0732-7110';
      const affLines = doc.splitTextToSize(affiliation, 140);
      doc.text(affLines, 105, 110, { align: 'center' });
      doc.text('Corresponding author: sahilhuseynov@naa.edu.az', 105, 125, { align: 'center' });

      // History
      doc.setFontSize(9);
      doc.setFont('times', 'bold');
      doc.text(`Received: September 14, 2023 | Accepted: December 13, 2023 | Available online: December 25, 2023`, 105, 140, { align: 'center' });

      // Abstract Section
      doc.setFontSize(11);
      doc.text('Abstract:', 25, 160);
      doc.setFont('times', 'normal');
      doc.setFontSize(10);
      const abstractLines = doc.splitTextToSize(t('article2Abstract'), 160);
      doc.text(abstractLines, 25, 165, { align: 'justify' });

      // Footer line
      doc.setDrawColor(200);
      doc.line(20, 270, 190, 270);
      doc.setFontSize(7);
      doc.text('©Copyright 2023 by the author(s). Licensed under Creative Commons Attribution 4.0 International License.', 105, 275, { align: 'center' });
      
      doc.save('Huseynov_LocalGov_Azerbaijan_2023.pdf');
    } else {
      // Talut's paper - Traditional NAA Review Style
      doc.setFontSize(8);
      doc.text('NATIONAL AVIATION ACADEMY LAW REVIEW', 105, 10, { align: 'center' });
      doc.text(`Volume-${articleMetadata.volume}, Issue-${articleMetadata.issue} (${articleMetadata.year}) | ISSN: 3107-4014 (Online)`, 105, 15, { align: 'center' });
      doc.setFontSize(16);
      doc.setFont('serif', 'bold');
      const title = articleMetadata.title;
      const titleLines = doc.splitTextToSize(title, 180);
      doc.text(titleLines, 105, 30, { align: 'center' });
      doc.setFontSize(10);
      doc.setFont('serif', 'normal');
      doc.text(articleMetadata.author, 105, 45, { align: 'center' });
      
      doc.setFontSize(8);
      doc.setTextColor(100);
      doc.text(`DOI: ${articleMetadata.doi}`, 105, 55, { align: 'center' });
      
      doc.setTextColor(0);
      doc.setFontSize(12);
      doc.setFont('serif', 'bold');
      doc.text('ABSTRACT', 20, 70);
      
      doc.setFontSize(10);
      doc.setFont('serif', 'normal');
      const abstractText = t('articleAbstract');
      const abstractLines = doc.splitTextToSize(abstractText, 170);
      doc.text(abstractLines, 20, 80);
      
      doc.save('Huseynov_Institutional_Theory_2026.pdf');
    }
  };

  return (
    <main className="w-full academic-bg min-h-screen pt-24 pb-48">
      {/* Search Result Indicator if navigated from search */}
      <div className="max-w-screen-lg mx-auto px-6 mb-8 flex justify-start">
         <Link to="/" className="text-[10px] font-sans font-black uppercase tracking-widest text-[#6495ED] flex items-center gap-2 hover:-translate-x-1 transition-transform">
            <ArrowLeft className="w-3 h-3" /> Back to Journal
         </Link>
      </div>

      {/* Title Section */}
      <section className="max-w-screen-lg mx-auto px-6 text-center mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#1a1a1a] mb-6 leading-tight max-w-4xl mx-auto">
          {articleMetadata.title}
        </h1>
        <div className="font-sans font-black text-[#6495ED] text-sm tracking-[0.4em] uppercase mb-12">
          {articleMetadata.author}
        </div>
        
        {/* Metadata Bar */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-4 border-y border-slate-100 text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-slate-400">
          <span>{t('volume')} {articleMetadata.volume}</span>
          <span className="text-slate-200">/</span>
          <span>{t('issue')} {articleMetadata.issue}</span>
          <span className="text-slate-200">/</span>
          <span>{articleMetadata.year}</span>
          <span className="text-slate-200">/</span>
          <span className="text-slate-300 italic">{articleMetadata.volume} NAA L. REV. {articleMetadata.pages.split('-')[0]}</span>
        </div>
      </section>

      {/* Decorative Stamp Pattern Banner */}
      <div className="w-full h-24 mb-16 opacity-[0.05] pointer-events-none overflow-hidden relative border-y border-slate-200">
        <div className="absolute inset-0 flex items-center justify-around">
            {[...Array(12)].map((_, i) => (
                <div key={i} className="w-16 h-16 border-2 border-slate-400 rounded-full flex items-center justify-center rotate-45 flex-shrink-0">
                    <div className="w-12 h-12 border border-slate-400 rounded-full flex items-center justify-center">
                        <span className="text-[10px] font-serif font-bold -rotate-45">NAALR</span>
                    </div>
                </div>
            ))}
        </div>
      </div>


      {/* Abstract and Download Section */}
      <article className="max-w-screen-md mx-auto px-6 mb-32">
        <div className="flex flex-col items-center">
            {/* Buttons Bar */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
              {/* Single Download Button */}
              <button 
                  onClick={handleDownload}
                  className="bg-[#6495ED] text-white px-10 py-4 font-sans font-black uppercase text-[11px] tracking-[0.3em] flex items-center gap-4 hover:bg-black transition-all shadow-lg active:scale-95"
              >
                  <FileText className="w-4 h-4" /> {t('download')}
              </button>

              {/* Cite Button */}
              <button 
                  onClick={() => setIsCiteModalOpen(true)}
                  className="bg-white border border-slate-200 text-slate-500 px-10 py-4 font-sans font-black uppercase text-[11px] tracking-[0.3em] flex items-center gap-4 hover:bg-slate-50 hover:text-primary transition-all active:scale-95"
              >
                  <CiteIcon className="w-4 h-4 opacity-50" /> {t('citeArticle')}
              </button>
            </div>

            <div className="prose prose-slate max-w-none font-serif text-lg lg:text-[21px] leading-[1.85] text-slate-800 text-justify antialiased">
                <div className="mb-12 p-6 bg-slate-50 border-l-4 border-[#6495ED] text-[11px] font-sans font-bold uppercase tracking-widest text-slate-500 space-y-2">
                    <p>Original Research Article</p>
                    <div className="flex flex-wrap gap-x-8 gap-y-2">
                        <span>Received: {articleMetadata.history.received}</span>
                        <span>Accepted: {articleMetadata.history.accepted}</span>
                        <span>Available online: {articleMetadata.history.available}</span>
                    </div>
                </div>

                <p className={`${bodyParaClass} indent-0 uppercase tracking-widest font-bold text-sm !mb-8`}>
                    {t('abstractTitle')}
                </p>
                <p className={bodyParaClass}>
                    {isSahil ? t('article2Abstract') : t('articleAbstract')}
                </p>

                <div className="mt-24 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-slate-300 border-t border-slate-100 pt-8 italic text-center md:text-left">
                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                        <span>{t('topics')}:</span>
                        {articleMetadata.topics.map(topic => (
                            <span key={topic} className="text-[#6495ED]">{topic}</span>
                        ))}
                    </div>
                    <span>{t('issued')}: {isSahil ? 'DECEMBER 2023' : 'MARCH-APRIL 2026'}</span>
                </div>
            </div>
        </div>
      </article>

      {/* Citation Modal */}
      <AnimatePresence>
        {isCiteModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCiteModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white max-w-2xl w-full relative z-10 shadow-2xl border border-slate-200 overflow-hidden"
            >
              <div className="flex items-center justify-between p-8 border-b border-slate-100 bg-slate-50">
                <div className="flex items-center gap-4">
                  <CiteIcon className="w-5 h-5 text-[#6495ED]" />
                  <h3 className="font-sans font-black text-xs uppercase tracking-[0.3em] text-primary">{t('citeThisArticle')}</h3>
                </div>
                <button 
                  onClick={() => setIsCiteModalOpen(false)}
                  className="text-slate-400 hover:text-primary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 space-y-10">
                {citations.map((cite) => (
                  <div key={cite.label} className="group relative">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-sans font-bold text-[10px] uppercase tracking-widest text-[#6495ED]">{cite.label} {t('format')}</span>
                      <button 
                        onClick={() => handleCopy(cite.text, cite.label)}
                        className="flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-widest text-slate-400 hover:text-[#6495ED] transition-colors"
                      >
                        {copiedFormat === cite.label ? (
                          <><Check className="w-3 h-3" /> {t('copied')}</>
                        ) : (
                          <><Copy className="w-3 h-3" /> {t('copyCitation')}</>
                        )}
                      </button>
                    </div>
                    <div className="p-6 bg-slate-50 border border-slate-100 font-serif italic text-lg leading-relaxed text-slate-700 select-all">
                      {cite.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-8 bg-slate-50 border-t border-slate-100 text-center">
                <p className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-widest">
                  {t('officialDoi')}: <span className="text-primary">{articleMetadata.doi}</span>
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
