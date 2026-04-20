import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'en' | 'az';

interface Translations {
  [key: string]: {
    en: string;
    az: string;
  };
}

const translations: Translations = {
  // Navbar
  home: { en: 'Home', az: 'Ana Səhifə' },
  publications: { en: 'Publications', az: 'Nəşrlər' },
  featuredArticles: { en: 'Articles', az: 'Məqalələr' },
  supremeCourt: { en: 'Supreme Court', az: 'Ali Məhkəmə' },
  archive: { en: 'Archive', az: 'Arxiv' },
  explore: { en: 'Explore', az: 'Kəşf et' },
  exploreByAuthor: { en: 'By Author', az: 'Müəllifə görə' },
  exploreByVolume: { en: 'By Volume & Issue', az: 'Buraxılış və Say üzrə' },
  exploreByAuthorTitle: { en: 'Explore By Author', az: 'Müəllifə görə Kəşf et' },
  all: { en: 'ALL', az: 'HAMISI' },
  viewMore: { en: 'VIEW MORE', az: 'DAHA ÇOX GÖR' },
  submit: { en: 'Submit', az: 'Təqdim et' },
  about: { en: 'About', az: 'Haqqımızda' },
  contact: { en: 'Contact', az: 'Əlaqə' },
  studentWriting: { en: 'Student Writing', az: 'Tələbə Yazıları' },
  navTitle: { en: 'National Aviation Academy', az: 'Milli Aviasiya Akademiyası' },
  navSubTitle: { en: 'Law Review', az: 'Hüquq Jurnalı' },

  // Home
  volume: { en: 'Volume', az: 'Buraxılış' },
  issue: { en: 'Issue', az: 'Say' },
  spring: { en: 'Spring', az: 'Yaz' },
  aviationLaw: { en: 'Public Administration', az: 'Dövlət İdarəçiliyi' },
  article: { en: 'Article', az: 'Məqalə' },
  articles: { en: 'Articles', az: 'Məqalələr' },
  citationLabel: { en: '1 NAA L. REV. 51', az: '1 NAA L. REV. 51' },
  seeFullIssue: { en: 'See Full Issue', az: 'Tam Buraxılışı Gör' },
  download: { en: 'Download', az: 'Yüklə' },
  authorName: { en: 'Talut Huseynov', az: 'Talut Hüseynov' },
  note: { en: 'Note', az: 'Qeyd' },
  review: { en: 'Review', az: 'Rəy' },
  comment: { en: 'Comment', az: 'Şərh' },
  foreword: { en: 'Foreword', az: 'Ön söz' },
  article2Title: { en: 'Constitutional and Legal Aspects of Interaction Between State Authorities and Local Self-Government in Azerbaijan', az: 'Azərbaycan Respublikasında Dövlət Hakimiyyəti Orqanları və Yerli Özünüidarəetmənin Qarşılıqlı Əlaqəsinin Konstitusiya-Hüquqi Məzmunu' },
  article2Author: { en: 'Sahil Zahir Huseynov', az: 'Sahil Zahir Hüseynov' },
  article2Abstract: { 
    en: 'The relevance of the study lies in the fact that local self-government is the foundation of the life of the citizens of the Republic of Azerbaijan and one of the main foundations of any democratic system. This study aims to establish the constitutional and legal content and forms of interaction between the state authorities and local self-government at the present stage of development.', 
    az: 'Tədqiqatın aktuallığı yerli özünüidarəetmənin Azərbaycan Respublikası vətəndaşlarının həyatının əsası və hər hansı demokratik sistemin əsas təməllərindən biri olması ilə bağlıdır. Bu tədqiqat hazırkı inkişaf mərhələsində dövlət hakimiyyəti orqanları ilə yerli özünüidarəetmə orqanları arasındakı qarşılıqlı əlaqənin konstitusiya-hüquqi məzmununu və formalarını müəyyən etməyi hədəfləyir.' 
  },
  heroTitle: { en: 'Aviation Liability in the Age of Autonomous Aircraft', az: 'Avtonom Hava Gəmiləri Dövründə Aviasiya Məsuliyyəti' },
  heroAbstract: { en: 'As unmanned aerial vehicles become increasingly prevalent in commercial aviation, traditional frameworks of pilot liability face unprecedented challenges. This article examines how existing tort law principles must evolve to address questions of responsibility when artificial intelligence systems make critical flight decisions, proposing a new framework for distributed liability among manufacturers, operators, and software developers.', az: 'Kommersiya aviasiyasında pilotsuz uçuş aparatlarının getdikcə yayılması ilə əlaqədar olaraq, pilot məsuliyyətinin ənənəvi çərçivələri misilsiz çətinliklərlə üzləşir. Bu məqalə süni intellekt sistemləri kritik uçuş qərarları qəbul edərkən mövcud mülki məsuliyyət prinsiplərinin məsuliyyət məsələlərini həll etmək üçün necə təkamül etməli olduğunu araşdırır və istehsalçılar, operatorlar və proqram təminatı hazırlayanlar arasında paylanmış məsuliyyət üçün yeni çərçivə təklif edir.' },
  readFullManuscript: { en: 'Read Full Manuscript', az: 'Tam Əlyazmanı Oxu' },
  recentPublications: { en: 'Recent Publications', az: 'Son Nəşrlər' },
  browseArchive: { en: 'Browse Archive', az: 'Arxivə Bax' },
  submitForPeerReview: { en: 'Submit for Peer Review', az: 'Rəy üçün Təqdim et' },
  manuscriptInstructions: { en: 'Manuscript Instructions', az: 'Əlyazma Təlimatları' },
  submitDescription: { en: 'The NAA Law Review invites submissions from practitioners, academics, and students specializing in the evolving field of law', az: 'MAA Hüquq Jurnalı hüquq elminin inkişaf edən sahəsində ixtisaslaşan praktikləri, akademikləri və tələbələri əlyazmalarını təqdim etməyə dəvət edir.' },

  // Archive
  journalArchive: { en: 'Journal Archive', az: 'Jurnal Arxivi' },
  archiveDescription: { en: 'A comprehensive repository of aviation jurisprudence and scholarly discourse since the founding of the Review.', az: 'Jurnalın yarandığı gündən bəri aviasiya hüququ və elmi diskursun geniş mərkəzi.' },
  searchPlaceholder: { en: 'Search by keyword, author, or volume...', az: 'Açar söz, müəllif və ya buraxılış üzrə axtar...' },
  specialIssues: { en: 'Special Issues', az: 'Xüsusi Buraxılışlar' },

  // Submit
  scholarlyContributions: { en: 'Scholarly Contributions', az: 'Elmi Töhfələr' },
  portalTitle: { en: 'The Portal for Legal Inquiry', az: 'Hüquqi Araşdırma Portalı' },
  submitWelcome: { en: 'The National Aviation Academy Law Review welcomes original manuscripts that explore the intersection of criminal law, commercial law and many more.', az: 'Milli Aviasiya Akademiyasının Hüquq Jurnalı cinayət hüququ, kommersiya hüququ və daha bir çox sahənin kəsişməsini araşdıran orijinal əlyazmaları salamlayır.' },
  submissionGuidelines: { en: 'Submission Guidelines', az: 'Təqdimat Qaydaları' },
  submissionSuccessful: { en: 'Submission Successful', az: 'Təqdimat Uğurludur' },
  confirmationNumber: { en: 'Confirmation Number', az: 'Təsdiq nömrəsi' },
  goToHome: { en: 'Return to Homepage', az: 'Ana səhifəyə qayıt' },
  submitAnother: { en: 'Submit Another Manuscript', az: 'Başqa bir əlyazma təqdim et' },
  formalizeSubmission: { en: 'Formalize Submission', az: 'Təqdimatı Rəsmiləşdir' },
  attachManuscript: { en: 'Attach Manuscript', az: 'Əlyazmanı Qoşun' },
  abstractLabel: { en: 'Abstract / Brief Summary', az: 'Abstrakt / Qısa Xülasə' },
  manuscriptTitle: { en: 'Working Title of Manuscript', az: 'Əlyazmanın İşçi Başlığı' },
  academicEmail: { en: 'Academic Correspondence Email', az: 'Akademik Yazışma E-poçtu' },
  leadAuthor: { en: 'Full Name of Lead Author', az: 'Aparıcı Müəllifin Tam Adı' },
  emailLabel: { en: 'Contact Email', az: 'Əlaqə E-poçtu' },
  contactInfo: { en: 'For inquiries, please contact info@naalawreview.org', az: 'Suallarınız üçün info@naalawreview.org ünvanına müraciət edin.' },

  // Guidelines
  guide1Title: { en: 'Length Requirements', az: 'Uzunluq Tələbləri' },
  guide1Text: { en: 'Manuscripts should typically range between 5,000 and 15,000 words, including footnotes and appendices.', az: 'Əlyazmalar, adətən, haşiyələr və əlavələr daxil olmaqla, 5000 ilə 15000 söz arasında olmalıdır.' },
  guide2Title: { en: 'Double-Blind Review', az: 'İkitərəfli Anonim Rəy' },
  guide2Text: { en: 'Please submit a clean version of the manuscript. Remove all references that could identify the authors.', az: 'Zəhmət olmasa əlyazmanın təmiz versiyasını təqdim edin. Müəllifləri müəyyən edə bilən bütün istinadları silin.' },
  guide3Title: { en: 'Originality', az: 'Orijinallıq' },
  guide3Text: { en: 'Submissions must not be currently under consideration by any other journal or publication.', az: 'Təqdim olunan işlər hazırda hər hansı digər jurnal və ya nəşr tərəfindən nəzərdən keçirilməməlidir.' },

  // Article
  abstractTitle: { en: 'Abstract', az: 'Abstrakt' },
  articleTitle: { en: 'The Silent Assumption of Institutional Theory: Does Good Governance Always Become Institutionalized?', az: 'İnstitusional Nəzəriyyənin Səssiz Fərziyyəsi: Yaxşı İdarəçilik Həmişə İnstitusionallaşır?' },
  articleAbstract: { 
    en: 'The new institutionalist approach assumes that organizations adopt socially accepted norms in their pursuit of legitimacy and that these norms, over time, become embedded in organizational practices and are thus institutionalized. Although this assumption is often not stated explicitly, it nevertheless functions as a silent presupposition underlying the core explanatory logic of institutional theory. By contrast, contemporary public administration reforms-particularly in the context of good governance principles-demonstrate that this assumption does not always find empirical support. Good governance principles are widely adopted and incorporated into legal and organizational structures. This article problematizes this silent assumption of institutional theory. To explain this situation, it proposes the concept of "selective institutionalization." The article argues that legitimacy is not a sufficient condition for institutionalization and that institutionalization should be understood as a contextual, political, and selective process.',
    az: 'Yeni institusionalist yanaşma fərz edir ki, təşkilatlar legitimlik axtarışında sosial cəhətdən qəbul edilmiş normaları mənimsəyirlər və bu normalar zaman keçdikcə təşkilati təcrübələrə daxil olaraq institusionallaşır. Bu fərziyyə çox vaxt açıq şəkildə ifadə edilməsə də, institusional nəzəriyyənin əsas izahedici məntiqinin təməlində dayanan səssiz bir presuppozisiya kimi fəaliyyət göstərir. Bunun əksinə olaraq, müasir dövlət idarəçiliyi islahatları — xüsusilə yaxşı idarəçilik prinsipləri kontekstində — bu fərziyyənin həmişə empirik dəstək tapmadığını nümayiş etdirir. Yaxşı idarəçilik prinsipləri geniş şəkildə qəbul edilir və hüquqi və təşkilati strukturlara daxil edilir. Bu məqalə institusional nəzəriyyənin bu səssiz fərziyyəsini problematikləşdirir. Bu vəziyyəti izah etmək üçün "selektiv institusionallaşma" anlayışını təklif edir. Məqalədə iddia edilir ki, legitimlik institusionallaşma üçün kifayət qədər şərt deyil və institusionallaşma kontekstual, siyasi və selektiv bir proses kimi başa düşülməlidir.'
  },
  keywordsLabel: { en: 'Keywords', az: 'Açar Sözlər' },
  articleKeywords: { en: 'Institutionalization, Good Governance, Isomorphism, Public Administration, Organizational Legitimacy', az: 'İnstitusionallaşma, Yaxşı İdarəçilik, İzomorfizm, Dövlət İdarəçiliyi, Təşkilati Legitimlik' },
  introTitle: { en: 'I. Introduction', az: 'I. Giriş' },
  originsTitle: { en: 'II. The Origins of the Silent Assumption', az: 'II. Səssiz Fərziyyənin Mənşəyi' },
  decouplingTitle: { en: 'III. The Phenomenon of Decoupling', az: 'III. Dekuplinq Fenomeni' },
  previousPaper: { en: 'Previous Paper', az: 'Əvvəlki sənəd' },
  nextPaper: { en: 'Next Paper', az: 'Növbəti sənəd' },
  editorialNote: { en: 'Editorial Note', az: 'Redaksiya Qeydi' },
  editorialNoteText: { en: 'This research was supported by the 2026 NAA Law Review Council.', az: 'Bu araşdırma 2026-cı il MAA Hüquq Jurnalı Şurası tərəfindən dəstəklənmişdir.' },
  relatedScholarship: { en: 'Related Scholarship', az: 'Əlaqədar Elmi İşlər' },
  schol1: { en: 'Organizational Legitimacy in Public Sector', az: 'Dövlət Sektorunda Təşkilati Legitimlik' },
  schol1Summary: { en: 'A comprehensive study of survival strategies in public organizations.', az: 'Dövlət təşkilatlarında yaşamaq strategiyalarının hərtərəfli tədqiqi.' },
  schol2: { en: 'The Evolution of New Institutionalism', az: 'Yeni İnstitusionalizmin Təkamülü' },
  schol2Summary: { en: 'Exploring the shift from technical to socially constructed norms in theory.', az: 'Nəzəriyyədə texniki normalardan sosial cəhətdən qurulmuş normalara keçidin araşdırılması.' },
  articleQuote1: { en: '“Legitimacy is not a sufficient condition for institutionalization; it must be understood as a contextual, political, and selective process.”', az: '“Legitimlik institusionallaşma üçün kifayət qədər şərt deyil; o, kontekstual, siyasi və selektiv bir proses kimi başa düşülməlidir.”' },
  articleQuote1Author: { en: '— Talut Huseynov (2026)', az: '— Talut Hüseynov (2026)' },
  articleQuote2: { en: '“Does good governance always become institutionalized? The systemic gap between adoption and implementation suggests a deeper structural selectivity.”', az: '“Yaxşı idarəçilik həmişə institusionallaşırmı? Qəbul və icra arasındakı sistemli boşluq daha dərin struktur selektivliyinə işarə edir.”' },
  articleQuote2Author: { en: '— Center for Institutional Policy (2025)', az: '— İnstitusional Siyasət Mərkəzi (2025)' },
  schol3: { en: 'Sovereignty Above the Clouds: A Post-Westphalian Analysis', az: 'Buludların üzərində suverenlik: Vestfaliyadan sonrakı təhlil' },
  schol3Summary: { en: 'Re-evaluating territorial jurisdiction in high-altitude airspace.', az: 'Yüksək hündürlükdə olan hava məkanında ərazi yurisdiksiyasının yenidən qiymətləndirilməsi.' },
  schol4: { en: 'The Chicago Convention at 80: Modernizing Treaty Law', az: 'Çikaqo Konvensiyasının 80 illiyi: Müqavilə Hüququnun Müasirləşdirilməsi' },
  schol4Summary: { en: 'A critical look at the foundational treaty of international aviation.', az: 'Beynəlxalq aviasiyanın əsas müqaviləsinə tənqidi baxış.' },
  schol5: { en: 'Artificial Intelligence and Judicial Forensics', az: 'Süni İntellekt və Məhkəmə Ekspertizası' },
  schol5Summary: { en: 'The integration of algorithmic evidence in appellate proceedings.', az: 'Apellyasiya icraatında alqoritmik sübutların inteqrasiyası.' },
  commentTitle: { en: 'The Future of Institutional Policy: 2026 Outlook', az: 'İnstitusional Siyasətin Gələcəyi: 2026 Görünüşü' },
  commentSummary: { en: 'Predicting policy shifts in a multi-agency ecosystem.', az: 'Çox agentlikli ekosistemdə siyasət dəyişikliklərinin proqnozlaşdırılması.' },
  
  // Supreme Court
  supremeCourtTitle: { en: 'Supreme Court of Azerbaijan', az: 'Azərbaycan Respublikasının Ali Məhkəməsi' },
  supremeCourtSub: { en: 'Plenum Resolutions & Unified Judicial Practice', az: 'Plenum Qərarları və Vahid Məhkəmə Təcrübəsi' },
  resolution1: { en: 'On the application of legislation during the consideration of cases related to inheritance', az: 'Vərəsəliklə bağlı işlərə baxılarkən qanunvericiliyin tətbiqi haqqında' },
  resolution2: { en: 'On the judicial practice of cases related to the protection of labor rights', az: 'Əmək hüquqlarının müdafiəsi ilə bağlı işlərin məhkəmə təcrübəsi haqqında' },
  resolution3: { en: 'On the unified judicial practice of family law disputes', az: 'Ailə hüquq münasibətlərindən irəli gələn mübahisələr üzrə vahid məhkəmə təcrübəsi haqqında' },
  resolution4: { en: 'On judicial practice related to cases of identification of persons during criminal proceedings', az: 'Cinayət işlərinə baxılarkən şəxsin eyniləşdirilməsi üzrə qanunvericiliyin tətbiqi haqqında' },
  resolution5: { en: 'On the practice of applying special confiscation in criminal cases', az: 'Cinayət işləri üzrə xüsusi müsadirənin tətbiqi təcrübəsi haqqında' },
  resolution6: { en: 'On some issues of judicial practice on cases of administrative offenses', az: 'İnzibati xətalar haqqında işlər üzrə məhkəmə təcrübəsinin bəzi məsələləri haqqında' },
  viewResolution: { en: 'View Full Resolution', az: 'Tam Qərarı Oxu' },

  // Board of Editors
  boardOfEditors: { en: 'Board of Editors', az: 'Redaksiya Şurası' },
  boardTitle: { en: 'Board of Editors', az: 'Redaksiya Şurası' },
  boardDescription: { en: 'Board of Editors are selected carefully by application. The Review is independent of the Academy administration and student editors make all editorial and organizational decisions.', az: 'Redaksiya Şurası müraciət əsasında diqqətlə seçilir. Jurnal Akademiya administrasiyasından müstəqildir və tələbə redaktorlar bütün redaksiya və təşkilati qərarları qəbul edirlər.' },
  boardMenuText: { en: 'Use the menu below to view membership lists of Boards of Editors for past volumes of the Review, as well as the volume’s business staff and links to each issue published as part of the volume.', az: 'Jurnalın keçmiş buraxılışları üçün Redaksiya Şuralarının üzvlük siyahılarını, habelə buraxılışın biznes heyətini və hər bir saya keçidləri görmək üçün aşağıdakı menyudan istifadə edin.' },

  // Footer
  footerDescription: { en: 'Dedicated to the scholarly examination of the legal frameworks governing our skies and beyond.', az: 'Səmalarımızı və ondan kənarı idarə edən hüquqi çərçivələrin elmi araşdırılmasına həsr edilmişdir.' },
  navigation: { en: 'Navigation', az: 'Naviqasiya' },
  connect: { en: 'Connect', az: 'Əlaqə' },
  motto: { en: '"Lex Volat Altissime" — The Law Flies Highest.', az: '"Lex Volat Altissime" — Qanun Ən Yüksəkdə Uçur.' },
  chiefEditorCredit: { en: 'Initiative of Chief Editor Roya Suleymanli', az: 'Baş redaktor Röya Süleymanlının təşəbbüsü ilə' },
  
  // Student Writing
  studentMission1: { 
    en: 'This section reflects the academic journey of our students—from early legal reflections to sophisticated research and commentary on complex legal issues.',
    az: 'Bu bölmə tələbələrimizin akademik səyahətini — ilkin hüquqi düşüncələrdən mürəkkəb hüquqi məsələlər üzrə daha təkmil tədqiqat və şərhlərə qədər olan yolu əks etdirir.'
  },
  studentMission2: {
    en: 'While student writing in early law journals often began as simple classroom notes, today it represents a deeper engagement with law, reasoning, and critical thinking. At the National Aviation Academy, we aim to continue this tradition by providing a dedicated forum for emerging voices in legal scholarship.',
    az: 'Erkən hüquq jurnallarında tələbə yazıları çox vaxt sadə sinif qeydləri kimi başlasa da, bu gün bu, hüquq, mühakimə və tənqidi təfəkkürlə daha dərin bir əlaqəni təmsil edir. Milli Aviasiya Akademiyasında biz elmi fəaliyyətdə yeni səslər üçün məkan təmin etməklə bu ənənəni davam etdirməyi hədəfləyirik.'
  },
  emergingScholars: { en: 'Emerging Legal Scholars', az: 'Yeni Nəsil Hüquqşünaslar' },
  readFully: { en: 'Read Fully', az: 'Tam Oxu' },
  submitYourWork: { en: 'Submit Your Work', az: 'İşinizi Təqdim Edin' },

  // Citation & Meta
  citeArticle: { en: 'Cite Article', az: 'Məqaləyə İstinad' },
  citeThisArticle: { en: 'Cite This Article', az: 'Bu Məqaləyə İstinad Et' },
  copyCitation: { en: 'Copy Citation', az: 'İstinadı Kopyala' },
  copied: { en: 'Copied', az: 'Kopyalandı' },
  officialDoi: { en: 'Official DOI', az: 'Rəsmi DOI' },
  format: { en: 'FORMAT', az: 'FORMATI' },
  topics: { en: 'TOPICS', az: 'MÖVZULAR' },
  issued: { en: 'ISSUED', az: 'BURAXILIB' },

  // Author Profile
  contributingAuthor: { en: 'Contributing Author', az: 'İştirakçı Müəllif' },
  publishedWorks: { en: 'Published Works', az: 'Nəşr Olunmuş İşlər' },
  viewArticle: { en: 'View Article', az: 'Məqaləyə Bax' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const detectLanguage = (): Language => {
  // 1. Check for manual override in localStorage
  const saved = localStorage.getItem('naalr_language');
  if (saved === 'en' || saved === 'az') return saved as Language;

  // 2. Check browser language (navigator.language)
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('az')) return 'az';

  // 3. Geolocation via Timezone proxy (Azerbaijan is Asia/Baku)
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timezone === 'Asia/Baku') return 'az';
  } catch (e) {
    // Fallback if Intl or timezone detection fails
  }

  return 'en';
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setInternalLanguage] = useState<Language>(detectLanguage);

  const setLanguage = (lang: Language) => {
    setInternalLanguage(lang);
    localStorage.setItem('naalr_language', lang);
  };

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
