import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Upload, FileText, ChevronRight, PenLine, Mail, Type, Loader2, CheckCircle2, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Submit() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    authorName: '',
    email: '',
    title: '',
    abstract: ''
  });
  const [file, setFile] = useState<File | null>(null);

  const generateId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'REQ-';
    for (let i = 0; i < 4; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
    result += '-';
    for (let i = 0; i < 4; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
    return result;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert('Please attach a manuscript.');

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate API call and ID generation
    setTimeout(() => {
      const newId = generateId();
      setSubmissionId(newId);
      setSubmitStatus('success');
      setFormData({ authorName: '', email: '', title: '', abstract: '' });
      setFile(null);
      setErrorDetails(null);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <main className="max-w-screen-xl mx-auto px-6 md:px-12 pt-16 pb-24 academic-bg">
      <header className="mb-12 flex flex-col items-start text-left max-w-4xl">
        <p className="font-sans text-[9px] uppercase tracking-[0.4em] text-[#6495ED] mb-4 font-bold">{t('scholarlyContributions')}</p>
        <h1 className="text-3xl md:text-5xl font-serif text-[#222] leading-tight mb-6 font-medium">
          {t('portalTitle')}
        </h1>
        <div className="h-0.5 w-16 bg-[#6495ED] mb-6"></div>
        <p className="text-base md:text-lg text-[#555] font-serif leading-relaxed max-w-xl">
          {t('submitWelcome')}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8">
          <section className="bg-white p-8 md:p-12 border border-slate-100 shadow-sm relative">
            {submitStatus === 'success' && (
              <div className="absolute inset-0 bg-white/98 z-30 flex flex-col items-center justify-center text-center p-8 md:p-12 animate-in zoom-in-95 fade-in duration-500">
                <div className="bg-[#6495ED]/10 p-4 rounded-full mb-8">
                  <CheckCircle2 className="w-12 h-12 text-[#6495ED]" />
                </div>
                <h3 className="text-3xl font-serif text-primary mb-2 italic tracking-tight">{t('submissionSuccessful')}</h3>
                <div className="bg-slate-50 px-6 py-3 border border-slate-100 my-6">
                  <p className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">{t('confirmationNumber')}</p>
                  <code className="text-xl font-mono text-primary font-bold tracking-wider">{submissionId}</code>
                </div>
                <p className="text-slate-500 font-serif text-base max-w-md mb-10 leading-relaxed">
                  Your manuscript has been safely received by the editorial board.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 items-center">
                  <button 
                    onClick={() => setSubmitStatus('idle')}
                    className="flex items-center gap-2 font-sans text-[11px] uppercase tracking-widest font-black text-white bg-primary px-8 py-4 hover:bg-black transition-all shadow-md active:scale-95"
                  >
                    {t('submitAnother')}
                  </button>
                  <Link 
                    to="/"
                    className="flex items-center gap-2 font-sans text-[11px] uppercase tracking-widest font-bold text-slate-400 hover:text-primary transition-all group"
                  >
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    {t('goToHome')}
                  </Link>
                </div>
              </div>
            )}

            <form className="space-y-12" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <FormGroup label={t('leadAuthor')} icon={<PenLine className="w-4 h-4 text-[#6495ED]" />}>
                  <input 
                    name="authorName"
                    value={formData.authorName}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-slate-200 py-3 px-0 font-serif text-lg focus:border-[#6495ED] focus:ring-0 transition-all placeholder:text-slate-300" 
                    placeholder="Author Name" 
                    type="text"
                    required
                  />
                </FormGroup>
                <FormGroup label={t('academicEmail')} icon={<Mail className="w-4 h-4 text-[#6495ED]" />}>
                  <input 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-slate-200 py-3 px-0 font-serif text-lg focus:border-[#6495ED] focus:ring-0 transition-all placeholder:text-slate-300" 
                    placeholder="institution@naa-law.org" 
                    type="email"
                    required
                  />
                </FormGroup>
              </div>

              <FormGroup label={t('manuscriptTitle')} icon={<Type className="w-4 h-4 text-[#6495ED]" />}>
                <input 
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-b border-slate-200 py-3 px-0 font-serif text-lg focus:border-[#6495ED] focus:ring-0 transition-all placeholder:text-slate-300" 
                  placeholder="Enter the full title as it should appear in citation" 
                  type="text"
                  required
                />
              </FormGroup>

              <FormGroup label={t('abstractLabel')}>
                <textarea 
                  name="abstract"
                  value={formData.abstract}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-b border-slate-200 py-3 px-0 font-serif text-lg focus:border-[#6495ED] focus:ring-0 transition-all resize-none placeholder:text-slate-300" 
                  placeholder="Summarize the scope and findings..." 
                  rows={4}
                  required
                />
              </FormGroup>

              <div className="relative group">
                <div className="w-full py-16 px-8 bg-[#f9fafb] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center hover:bg-white hover:border-[#6495ED]/40 transition-all cursor-pointer shadow-sm relative">
                  {file ? (
                    <div className="flex flex-col items-center">
                      <FileText className="w-12 h-12 text-[#6495ED] mb-4" />
                      <p className="text-primary font-serif text-lg">{file.name}</p>
                      <button 
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setFile(null); }}
                        className="text-[9px] font-sans uppercase tracking-widest text-red-400 mt-4 underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-slate-300 mb-4 group-hover:text-[#6495ED] transition-colors" />
                      <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#6495ED] font-bold">{t('attachManuscript')}</p>
                      <p className="text-slate-400 mt-3 text-sm font-serif max-w-xs">PDF or DOCX format only.</p>
                    </>
                  )}
                  <input 
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.docx"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-slate-50">
                <p className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-widest text-center md:text-left">
                  info@naalawreview.org
                </p>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full md:w-auto bg-[#0369a1] text-white px-10 py-5 font-sans text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-black transition-all shadow-md active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                  ) : (
                    t('formalizeSubmission')
                  )}
                </button>
              </div>
              {submitStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-50 border border-red-100">
                  <p className="text-red-600 text-[10px] font-sans uppercase tracking-[0.1em] font-bold text-center">
                    {errorDetails || 'An error occurred. Please verify your connection and try again.'}
                  </p>
                </div>
              )}
            </form>
          </section>
        </div>

        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-[#f9fafb] border border-slate-100 p-8 shadow-sm">
            <h3 className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-[#222] mb-10 border-b border-slate-200 pb-3">{t('submissionGuidelines')}</h3>
            <ul className="space-y-8">
              <GuidelineItem num="01" title={t('guide1Title')}>
                {t('guide1Text')}
              </GuidelineItem>
              <GuidelineItem num="02" title={t('guide2Title')}>
                {t('guide2Text')}
              </GuidelineItem>
              <GuidelineItem num="03" title={t('guide3Title')}>
                {t('guide3Text')}
              </GuidelineItem>
            </ul>
          </div>
          
          <div className="p-8 border-l border-slate-100">
            <p className="font-serif text-base text-slate-400 leading-relaxed text-center">
              {t('contactInfo')}
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}

function FormGroup({ label, children, icon }: any) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        {icon}
        <label className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">{label}</label>
      </div>
      {children}
    </div>
  );
}

function GuidelineItem({ num, title, children }: any) {
  return (
    <li className="flex gap-6">
      <span className="font-sans font-black text-2xl text-primary/10 tracking-tighter">{num}</span>
      <div>
        <strong className="block text-primary font-sans text-[10px] uppercase tracking-widest mb-2 font-bold">{title}</strong>
        <p className="text-base text-slate-500 font-serif leading-relaxed opacity-80">{children}</p>
      </div>
    </li>
  );
}
