// ═══════════════════════════════════════════════════════
//  HealthPulse SL  |  MIT License  |  SDG 3
//  AI-Powered Digital Health Awareness System
// ═══════════════════════════════════════════════════════

// ── TOPIC CONFIG ──────────────────────────────────────
const TOPIC_LABELS={
  en:{malaria:'Malaria',maternal:'Maternal Health',nutrition:'Nutrition',hiv:'HIV/AIDS',water:'Water & Sanitation',mentalhealth:'Mental Health',vaccination:'Vaccination',tuberculosis:'Tuberculosis',diabetes:'Diabetes',hypertension:'Hypertension',cholera:'Cholera',familyplanning:'Family Planning'},
  kr:{malaria:'Maleria',maternal:'Mama Elt',nutrition:'Nyutrishon',hiv:'HIV/AIDS',water:'Wata & Klinnes',mentalhealth:'Mayn Elt',vaccination:'Vaksin',tuberculosis:'TB',diabetes:'Dayabetis',hypertension:'Hai Preshon',cholera:'Kolera',familyplanning:'Famili Planin'},
  tm:{malaria:'Malaria',maternal:'Mama Bana',nutrition:'Nyutrishon',hiv:'HIV/AIDS',water:'Mɛn & Klin',mentalhealth:'Mayn Kɛn',vaccination:'Vaksin',tuberculosis:'TB',diabetes:'Dayabetis',hypertension:'Hai Preshon',cholera:'Kolera',familyplanning:'Famili Planin'},
  mn:{malaria:'Malaria',maternal:'Nya Kpɔ',nutrition:'Nyutrishon',hiv:'HIV/AIDS',water:'Ji & Kɛlɛ',mentalhealth:'Ngi Hinda',vaccination:'Vaksin',tuberculosis:'TB',diabetes:'Dayabetis',hypertension:'Hai Preshon',cholera:'Kolera',familyplanning:'Famili Planin'},
};
const TOPIC_SVGS={malaria:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8 2 5 5 5 9c0 3 2 5 4 6v5c0 1 1 2 3 2s3-1 3-2v-5c2-1 4-3 4-6 0-4-3-7-7-7z"/><path d="M12 2v2"/><path d="M8 4l1 1"/><path d="M16 4l-1 1"/></svg>',maternal:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M12 12v8"/><path d="M8 16h8"/><path d="M6 12c0-2 2-4 6-4s6 2 6 4"/></svg>',nutrition:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v12"/><path d="M8 10h8"/><path d="M8 14h8"/></svg>',hiv:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L4 8v8l8 6 8-6V8l-8-6z"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>',water:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.5c0 0-7 6-7 11a7 7 0 0 0 14 0c0-5-7-11-7-11z"/><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>',mentalhealth:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a9 9 0 0 0-9 9v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 1 4 0v4a2 2 0 0 0 2 2h4c1.1 0 2-.9 2-2v-7a9 9 0 0 0-9-9z"/><path d="M12 8v2"/><path d="M9 9h6"/></svg>',vaccination:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',tuberculosis:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',diabetes:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a5 5 0 0 0-5 5v2a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z"/><path d="M12 14v8"/><path d="M8 18h8"/><path d="M12 2v4"/></svg>',hypertension:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a5 5 0 0 0-5 5v2a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z"/><path d="M12 14v8"/><path d="M8 18h8"/><path d="M12 2v4"/><path d="M12 14l-2 2"/><path d="M12 14l2 2"/></svg>',cholera:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a5 5 0 0 0-5 5v2a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5z"/><path d="M12 14v8"/><path d="M8 18h8"/><path d="M12 2v4"/><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>',familyplanning:'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M12 12v8"/><path d="M8 16h8"/><path d="M6 12c0-2 2-4 6-4s6 2 6 4"/><path d="M12 2v2"/></svg>'};
const TOPIC_STYLE={malaria:{color:'#1A7A4A',bg:'#e6f4ee'},maternal:{color:'#9B2335',bg:'#fdeaec'},nutrition:{color:'#E8A020',bg:'#fdf4e3'},hiv:{color:'#8E44AD',bg:'#f3e8fa'},water:{color:'#2471A3',bg:'#e8f4fd'},mentalhealth:{color:'#16A085',bg:'#e3f6f3'},vaccination:{color:'#D35400',bg:'#fdebd0'},tuberculosis:{color:'#6B7C72',bg:'#f0f3f1'},diabetes:{color:'#E67E22',bg:'#fdf2e9'},hypertension:{color:'#C0392B',bg:'#f9ebe7'},cholera:{color:'#27AE60',bg:'#e9f7ef'},familyplanning:{color:'#8E44AD',bg:'#f4ecf7'}};
const TOPIC_EMOJIS={malaria:'🦟',maternal:'🤱',nutrition:'🥗',hiv:'🎗️',water:'💧',mentalhealth:'🧠',vaccination:'💉',tuberculosis:'🫁',diabetes:'🩸',hypertension:'❤️‍🩹',cholera:'🚰',familyplanning:'👨‍👩‍👧'};
const TOPIC_IDS=Object.keys(TOPIC_SVGS);

const LANGS=[
  {code:'en',label:'English',htmlLang:'en'},
  {code:'kr',label:'Krio',htmlLang:'en-SL'},
  {code:'tm',label:'Temne',htmlLang:'tem'},
  {code:'mn',label:'Mende',htmlLang:'men'},
];

// ── UI STRINGS ────────────────────────────────────────
const LANG_STRINGS={
  en:{
    pageTitle:'HealthPulse SL – AI Health Awareness System',
    tagline:'Empowering Sierra Leone with life-saving health knowledge',
    sdgLabel:'SDG 3 · Good Health & Well-being',
    langNote:'Language active:',
    statArticles:'Articles',statTopics:'Topics',statLangs:'Languages',statLicense:'AI',
    filterHeading:'Filter by Topic',allTopicsLabel:'All Topics',categoryLabel:'Categories',statsHeading:'Stats',
    aiSidebarTitle:'AI Features',
    aiWriteBtn:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> Write Article with AI',aiSummarizeBtn:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a9 9 0 0 0-9 9v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 1 4 0v4a2 2 0 0 0 2 2h4c1.1 0 2-.9 2-2v-7a9 9 0 0 0-9-9z"/></svg> Summarize Topic',aiTranslateBtn:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> Translate Article',
    createBtn:'+ New Article',searchPh:'Search articles…',sortLabel:'Sort:',
    sortNewest:'Newest first',sortOldest:'Oldest first',sortAZ:'A–Z',
    showing:'Showing',of:'of',articles:'articles',
    editBtn:'Edit',deleteBtn:'Delete',cancelBtn:'Cancel',
    saveBtn:'Save Article',updateBtn:'Update Article',
    formCreateTitle:'New Health Article',formEditTitle:'Edit Article',
    fieldTitle:'Title',fieldTopic:'Health Topic',fieldAuthor:'Author',
    fieldLang:'Language',fieldTags:'Tags',fieldExcerpt:'Summary',fieldBody:'Full Article',fieldRequired:'Required',
    phTitle:'Enter article title',phAuthor:'Author name',phTags:'e.g. prevention, children',phExcerpt:'Short summary (max 280 chars)',phBody:'Write the full article here…',
    validRequired:'Please fill in all required fields.',
    metaDate:'Date',metaAuthor:'Author',metaLang:'Language',
    confirmDel:'Delete Article',confirmMsg:'This will permanently remove this article. Cannot be undone.',confirmYes:'Yes, Delete',
    toastCreated:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Article created',toastUpdated:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Article updated',toastDeleted:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> Article deleted',
    noResults:'No articles found',noResultsSub:'Try a different search or filter.',
    footerSystem:'AI Health Awareness System',footerLicense:'Licensed under',footerMIT:'MIT License',
    footerAligned:'Aligned with',footerSDG:'SDG 3: Good Health & Well-being',
    footerPrivacy:'No personal data collected. Open JSON standard.',footerCopyright:'Copyright',
    fallbackNotice:'Not yet translated to {lang}. Showing English version.',
    // AI UI strings
    aiFormTitle:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> Generate with AI',aiFormPh:'Describe what this article should cover…',aiFormBtn:'Generate Article',
    aiGenerating:'AI is writing your article…',aiGenerated:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> AI-generated content ready — review and edit before saving.',
    aiTagsTitle:'AI Tag Suggestions — click to add:',
    aiSummaryTitle:'AI Summary',aiSummaryBtn:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a9 9 0 0 0-9 9v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 1 4 0v4a2 2 0 0 0 2 2h4c1.1 0 2-.9 2-2v-7a9 9 0 0 0-9-9z"/></svg> AI Summary',
    aiTranslateTitle:'AI Translation',aiTranslateBtn:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> AI Translate',aiTranslating:'Translating…',
    botName:'HealthBot AI',botTagline:'Your health assistant',
    botWelcome:'Hello! I\'m HealthBot, your AI health assistant for Sierra Leone. Ask me anything about malaria, maternal health, nutrition, HIV, and more. How can I help you today?',
    botPh:'Ask a health question…',
    botSugg1:'How to prevent malaria?',botSugg2:'Signs of malnutrition',botSugg3:'Is HIV curable?',botSugg4:'Antenatal care tips',
  },
  kr:{
    pageTitle:'HealthPulse SL – AI Elt Sistɛm',
    tagline:'Gi Salone elt infomeshon we de sef laif',
    sdgLabel:'SDG 3 · Gud Elt & Welbi',
    langNote:'Langwej aktiv:',
    statArticles:'Atikul',statTopics:'Topik',statLangs:'Langwej',statLicense:'AI',
    filterHeading:'Filta bay Topik',allTopicsLabel:'Ɔl Topik',categoryLabel:'Kategori',statsHeading:'Nɔmba',
    aiSidebarTitle:'AI Fɔ Ɛlp',
    aiWriteBtn:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> Let AI Rayt Atikul',aiSummarizeBtn:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a9 9 0 0 0-9 9v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 1 4 0v4a2 2 0 0 0 2 2h4c1.1 0 2-.9 2-2v-7a9 9 0 0 0-9-9z"/></svg> Sɔt Sumari',aiTranslateBtn:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> Translet Atikul',
    createBtn:'+ Rayt Nyuu Atikul',searchPh:'Soch atikul…',sortLabel:'Sot:',
    sortNewest:'Nyuu fos',sortOldest:'Ol fos',sortAZ:'A–Z',
    showing:'De sho',of:'fom',articles:'atikul',
    editBtn:'Chenj am',deleteBtn:'Dilit am',cancelBtn:'Kyansul',
    saveBtn:'Sev Atikul',updateBtn:'Apdet Atikul',
    formCreateTitle:'Nyuu Elt Atikul',formEditTitle:'Chenj Di Atikul',
    fieldTitle:'Taytul',fieldTopic:'Topik',fieldAuthor:'U Rayt Am',
    fieldLang:'Langwej',fieldTags:'Tagin',fieldExcerpt:'Sɔt Deskripshon',fieldBody:'Ful Atikul',fieldRequired:'Nɛsɛsri',
    phTitle:'Rayt taytul',phAuthor:'Nem',phTags:'e.g. privent, pikin',phExcerpt:'Sɔt (maks 280)',phBody:'Rayt di ful atikul ya…',
    validRequired:'Pliz fil ɔl di fildin dem.',
    metaDate:'Det',metaAuthor:'Ɔta',metaLang:'Langwej',
    confirmDel:'Dilit Di Atikul',confirmMsg:'Di atikul go dilit foheva.',confirmYes:'Yes, Dilit Am',
    toastCreated:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Atikul don sev',toastUpdated:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Atikul don chenj',toastDeleted:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> Atikul don dilit',
    noResults:'No atikul deh',noResultsSub:'Tri difren soch o topik.',
    footerSystem:'AI Elt Infomeshon Sistɛm',footerLicense:'Laisens:',footerMIT:'MIT Laisens',
    footerAligned:'Alinment wit',footerSDG:'SDG 3: Gud Elt & Welbi',
    footerPrivacy:'Wi nɔ tek yu pɛsin infomeshon.',footerCopyright:'Kopirait',
    fallbackNotice:'Nɔ de na {lang} yet. Wi de sho am na Inglis.',
    aiFormTitle:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> Let AI Rayt',aiFormPh:'Tɛl AI wetin fɔ rayt bout…',aiFormBtn:'Jeneret Atikul',
    aiGenerating:'AI de rayt yu atikul…',aiGenerated:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> AI don rayt — chek am bifo yu sev.',
    aiTagsTitle:'AI Tagin — klik fɔ ad:',
    aiSummaryTitle:'AI Sumari',aiSummaryBtn:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a9 9 0 0 0-9 9v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 1 4 0v4a2 2 0 0 0 2 2h4c1.1 0 2-.9 2-2v-7a9 9 0 0 0-9-9z"/></svg> AI Sumari',
    aiTranslateTitle:'AI Transleshn',aiTranslateBtn:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> AI Translet',aiTranslating:'De translet…',
    botName:'HealthBot AI',botTagline:'Yu elt asisistɛnt',
    botWelcome:'Ello! Na mi HealthBot, yu AI elt asisistɛnt fɔ Salone. Ax mi enitin bout maleria, mama elt, nyutrishon, HIV, an ɔda sik. Aw a fit ɛlp yu tɔdɛ?',
    botPh:'Ax elt kwɛshon…',
    botSugg1:'Aw fɔ prɛvɛnt maleria?',botSugg2:'Sain ɔf bad nyutrishon',botSugg3:'HIV fit kyɔ?',botSugg4:'ANC advais',
  },
  tm:{
    pageTitle:'HealthPulse SL – AI Bana Sistɛm',
    tagline:'Gi Salone bana infomeshon we de sef laif',
    sdgLabel:'SDG 3 · Bana an Fɔtɔ',
    langNote:'Langwej aktiv:',
    statArticles:'Atikul',statTopics:'Topik',statLangs:'Langwej',statLicense:'AI',
    filterHeading:'Fɛm Topik',allTopicsLabel:'Ɔl Topik',categoryLabel:'Kategori',statsHeading:'Nɔmba',
    aiSidebarTitle:'AI Ɛlp',
    aiWriteBtn:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> AI Kɛn Atikul',aiSummarizeBtn:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a9 9 0 0 0-9 9v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 1 4 0v4a2 2 0 0 0 2 2h4c1.1 0 2-.9 2-2v-7a9 9 0 0 0-9-9z"/></svg> Sumari',aiTranslateBtn:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> Translet',
    aiSearchPh:'Ax AI kwɛshon…',aiSearchBtn:'Ax AI',
    createBtn:'+ Kɛn Atikul',searchPh:'Fɛm atikul…',sortLabel:'Sot:',
    sortNewest:'Nyuu fɔs',sortOldest:'Ol fɔs',sortAZ:'A–Z',
    showing:'De sho',of:'fom',articles:'atikul',
    editBtn:'Kɛn chenj',deleteBtn:'Dilit',cancelBtn:'Bak',
    saveBtn:'Sev Atikul',updateBtn:'Apdet Atikul',
    formCreateTitle:'Nyuu Bana Atikul',formEditTitle:'Chenj Atikul',
    fieldTitle:'Taytul',fieldTopic:'Topik',fieldAuthor:'Rayta',
    fieldLang:'Langwej',fieldTags:'Tagin',fieldExcerpt:'Sɔt',fieldBody:'Ful Atikul',fieldRequired:'Nɛsɛsri',
    phTitle:'Rayt taytul',phAuthor:'Nem',phTags:'e.g. privent, pikin',phExcerpt:'Sɔt (maks 280)',phBody:'Rayt ful atikul ya…',
    validRequired:'Pliz fil ɔl fildin.',
    metaDate:'Det',metaAuthor:'Rayta',metaLang:'Langwej',
    confirmDel:'Dilit Atikul',confirmMsg:'Atikul go dilit foheva.',confirmYes:'Yes, Dilit',
    toastCreated:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Atikul don sev',toastUpdated:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Atikul don chenj',toastDeleted:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> Atikul don dilit',
    noResults:'No atikul',noResultsSub:'Fɛm difren topik.',
    footerSystem:'AI Bana Infomeshon Sistɛm',footerLicense:'Laisens:',footerMIT:'MIT Laisens',
    footerAligned:'SDG 3 alinment',footerSDG:'SDG 3: Bana an Fɔtɔ',
    footerPrivacy:'Wi nɔ tek pɛsin infomeshon.',footerCopyright:'Kopirait',
    fallbackNotice:'Nɔ de na {lang} yet. Wi de sho am na Inglis.',
    aiFormTitle:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> AI Kɛn',aiFormPh:'Tɛl AI wetin fɔ rayt…',aiFormBtn:'Jeneret',
    aiGenerating:'AI de rayt…',aiGenerated:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> AI don rayt — chek bifo sev.',
    aiTagsTitle:'AI Tagin — klik fɔ ad:',
    aiSummaryTitle:'AI Sumari',aiSummaryBtn:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a9 9 0 0 0-9 9v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 1 4 0v4a2 2 0 0 0 2 2h4c1.1 0 2-.9 2-2v-7a9 9 0 0 0-9-9z"/></svg> AI Sumari',
    aiTranslateTitle:'AI Transleshn',aiTranslateBtn:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> AI Translet',aiTranslating:'De translet…',
    botName:'HealthBot AI',botTagline:'Yu bana asisistɛnt',
    botWelcome:'Hello! Na mi HealthBot, yu AI bana asisistɛnt fɔ Salone. Ax mi enitin bout malaria, mama bana, an ɔda sik.',
    botPh:'Ax bana kwɛshon…',
    botSugg1:'Aw fɔ stɔp malaria?',botSugg2:'Pikin nyutrishon',botSugg3:'HIV kyɔ?',botSugg4:'ANC advais',
  },
  mn:{
    pageTitle:'HealthPulse SL – AI Kpɔ Sistɛm',
    tagline:'Gi Salone kpɔ infomeshon we de sef laif',
    sdgLabel:'SDG 3 · Kpɔ Ngi Hinda',
    langNote:'Langwej aktiv:',
    statArticles:'Atikul',statTopics:'Topik',statLangs:'Langwej',statLicense:'AI',
    filterHeading:'Lo Topik',allTopicsLabel:'Ɔl Topik',categoryLabel:'Kategori',statsHeading:'Nɔmba',
    aiSidebarTitle:'AI Ɛlp',
    aiWriteBtn:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> AI Kɔ Atikul',aiSummarizeBtn:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a9 9 0 0 0-9 9v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 1 4 0v4a2 2 0 0 0 2 2h4c1.1 0 2-.9 2-2v-7a9 9 0 0 0-9-9z"/></svg> Sumari',aiTranslateBtn:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> Translet',
    aiSearchPh:'Ax AI kwɛshon…',aiSearchBtn:'Ax AI',
    createBtn:'+ Kɔ Atikul',searchPh:'Lo atikul…',sortLabel:'Sot:',
    sortNewest:'Nyuu fɔs',sortOldest:'Tɔnɔ fɔs',sortAZ:'A–Z',
    showing:'De sho',of:'of',articles:'atikul',
    editBtn:'Gbɛ chenj',deleteBtn:'Hɛlɛ',cancelBtn:'Bak',
    saveBtn:'Sev Atikul',updateBtn:'Apdet Atikul',
    formCreateTitle:'Nyuu Kpɔ Atikul',formEditTitle:'Gbɛ Atikul',
    fieldTitle:'Taytul',fieldTopic:'Topik',fieldAuthor:'Rayta',
    fieldLang:'Langwej',fieldTags:'Tagin',fieldExcerpt:'Sɔt',fieldBody:'Ful Atikul',fieldRequired:'Nɛsɛsri',
    phTitle:'Rayt taytul',phAuthor:'Nem',phTags:'e.g. privent, pikin',phExcerpt:'Sɔt (maks 280)',phBody:'Rayt ful atikul ya…',
    validRequired:'Pliz fil ɔl fildin.',
    metaDate:'Det',metaAuthor:'Rayta',metaLang:'Langwej',
    confirmDel:'Hɛlɛ Atikul',confirmMsg:'Atikul go hɛlɛ foheva.',confirmYes:'Yes, Hɛlɛ',
    toastCreated:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Atikul don sev',toastUpdated:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Atikul don gbɛ',toastDeleted:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> Atikul don hɛlɛ',
    noResults:'Atikul hinda',noResultsSub:'Lo difren topik.',
    footerSystem:'AI Kpɔ Infomeshon Sistɛm',footerLicense:'Laisens:',footerMIT:'MIT Laisens',
    footerAligned:'SDG 3 alinment',footerSDG:'SDG 3: Kpɔ Ngi Hinda',
    footerPrivacy:'Wi nɔ tek pɛsin infomeshon.',footerCopyright:'Kopirait',
    fallbackNotice:'Nɔ de na {lang} yet. Wi de sho am na Inglis.',
    aiFormTitle:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> AI Kɔ',aiFormPh:'Tɛl AI wetin fɔ rayt…',aiFormBtn:'Jeneret',
    aiGenerating:'AI de rayt…',aiGenerated:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> AI don rayt — chek bifo sev.',
    aiTagsTitle:'AI Tagin — klik fɔ ad:',
    aiSummaryTitle:'AI Sumari',aiSummaryBtn:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a9 9 0 0 0-9 9v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 1 4 0v4a2 2 0 0 0 2 2h4c1.1 0 2-.9 2-2v-7a9 9 0 0 0-9-9z"/></svg> AI Sumari',
    aiTranslateTitle:'AI Transleshn',aiTranslateBtn:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> AI Translet',aiTranslating:'De translet…',
    botName:'HealthBot AI',botTagline:'Yu kpɔ asisistɛnt',
    botWelcome:'Hello! Na mi HealthBot, yu AI kpɔ asisistɛnt fɔ Salone. Ax mi enitin bout malaria, nya kpɔ, an ɔda sik.',
    botPh:'Ax kpɔ kwɛshon…',
    botSugg1:'Aw fɔ stɔp malaria?',botSugg2:'Pikin nyutrishon',botSugg3:'HIV kyɔ?',botSugg4:'ANC advais',
  }
};

// ── ARTICLE TRANSLATIONS (Krio / Temne / Mende) ───────
const ARTICLE_TRANSLATIONS={
  a1:{
    kr:{title:'Maleria: Wetin Koz Am, Sain Dem, an Aw Fɔ Prɛvɛnt Am',excerpt:'Maleria na wan big sik we de kil pipul plɛnti in Salone. If yu ondastand aw am de spred, dat na di fɔs step fɔ protɛkt yusef.',body:`Maleria de kɔmɔt fɔm Plasmodium parasite we mosquito wuman (Anopheles) de kari. Na im de bayt pipul den transmit di sik. Na Salone, maleria de koz plɛnti sik an hospital visit ɛvri yia.\n\nDi sain dem de komɔt 10 to 15 de afta di mosquito don bayt yu. Dem inkludin: hɔt bɔdi, shiverin, hed pein, bɔdi pein, nɔzea, an vɔmitin. If yu nɔ trit am kwik, am fit koz organ fɛlya an dɛt.\n\nFɔ prɛvɛnt maleria, yu fɔ: slep ɔnda mɔskito net we don trit wit insɛktisaid (ITN), spray yaad insaid, trow wei ɔl wata we de stand nɛ os, an tek maleria medisin if dɔkta se mek yu du so.\n\nKwik tɛstin an tit wit artemisinin-bɛs medisin (ACT) na di bɛs way fɔ trɛt maleria. Komiyniti ɛlt wɔka dem de play big roul fɔ tɛst an trit pipul na village level.`},
    tm:{title:'Malaria: Wetin Koz Am, Aw Am Look, an Aw Fɔ Stɔp Am',excerpt:'Malaria na big sik na Salone. If yu sabi aw am de spred, yu fit prɔtɛkt yusef an yu famili.',body:`Malaria de kɔmɔt fɔm parasite we de live insaid mosquito wuman (Anopheles). Wen am bayt yu, am pas di parasite insaid yu bodi.\n\nAfta 10 to 15 de, yu fit si: hɔt bɔdi, shiverin, hed pein, bɔdi pein, stomak wahala, an vɔmitin. Bad malaria fit kil pipul if dem nɔ get tit kwik.\n\nFɔ stop maleria: slep ɔnda ITN net, spray insaid hauz, distrɔy stan wata nɛ os, an tek prɔfilaksis medisin wen nidid.\n\nEali tɛstin an tit wit ACT medisin na di mɔs imɔtant ting. Komiyniti ɛlt wɔkas de ɛlp pipul get kwik tɛst an tit.`},
    mn:{title:'Malaria: Wetin Koz Am, Aw Am Si, na Aw Wi Fit Stɔp Am',excerpt:'Malaria na big sik na Salone. Ngi sabi aw am de spred na ngi fɔs step fɔ prɔtɛkt wi yɛlɛ.',body:`Malaria de kɔmɔt na Plasmodium parasite we mosquito wuman de kari. Wen am bayt yu, am pas parasite insaid yu bodi.\n\nAfta 10 to 15 de, yu fit fɛl: hɔt bɔdi, bɔdi shek, hed pein, an vɔmitin. Wɛlɛ malaria fit kɔz dɛt if yu nɔ trit am kwik.\n\nFɔ prɔtɛkt yu yɛlɛ: slep ɔnda ITN net, spray insaid hauz, klia ɔl stan wata nɛ os, an tek medisin wen dɔkta se so.\n\nKwik tɛstin an tit wit ACT na di bɛs way. Komiyniti ɛlt wɔkas de ɛlp plɛnti pipul.`}
  },
  a2:{
    kr:{title:'Mama Sefti: Antenatal Kia na Salone',excerpt:'Ɛvri prɛgnant wuman nid fɔ go klinik. Regular visit de redius mɔta dɛt an bɛbi dɛt plɛnti.',body:`Antenatal kia (ANC) de ɛlp dɔkta dem kech sik ɛli an ɛlp mama fɔ bi ɛlti. WHO se mek wuman go klinik at liis eit taims bifo dem bɔn.\n\nDi ting dem we dem de du na ANC visit inkludin: chek blɔd preshɔ, tɛst fɔ anemia, maleria, an HIV, giv ayan an fɔlik asid, tetanus vaksin, an kɔnsɛlin.\n\nSalone gɔvmɛnt don mek ɛlt kia fri fɔ prɛgnant wuman, mama we de nɔs, an pikin ɔnda faiv yia.\n\nAfta bɔnin, di fɔs 24 to 48 awa na vɛri imɔtant fɔ mama an nyu bɛbi. Deinja sain lɛk plɛnti blɛdin o fiva nid kwik klinik visit.`},
    tm:{title:'Mama Sefti: Antenatal Kia na Salone',excerpt:'Ɛvri prɛgnant wuman nid fɔ go ANC. Regular visit de sev mama an bɛbi layf.',body:`Antenatal kia de ɛlp fɔ kech sik bifo am bikam bɛtɛ. WHO advais se mek wuman go klinik at liis eit taim during prɛgnɛnsi.\n\nDi tings dem: blɔd preshɔ chek, anemia tɛst, HIV tɛst, ayan tɛblɛt, tetanus vaksin.\n\nSalone gɔvmɛnt don mek ɛlt sɛvis fri fɔ prɛgnant wuman dem an pikin ɔnda faiv yia.\n\nAfta bɔnin, di fɔs 48 awa na imɔtant. Deinja sain lɛk big blɛdin o fiva — go klinik kwik.`},
    mn:{title:'Mama Sefti: Antenatal Kia na Salone',excerpt:'Prɛgnant wuman ɔlɔs nid fɔ go ANC klinik. Di visit de sev layf.',body:`Antenatal kia (ANC) de ɛlp mama an bɛbi fɔ bi ɛlti. WHO se mek wuman go klinik eit taim bifo bɔnin.\n\nDem de du na ANC: blɔd preshɔ chek, tɛst fɔ anemia an HIV, ayan tɛblɛt, tetanus vaksin.\n\nSalone don mek ɛlt kia fri fɔ prɛgnant wuman an pikin ɔnda faiv.\n\nAfta bɔnin, di fɔs 48 awa dɛn sɛf imɔtant. Deinja sain lɛk blɛdin o fiva nid kwik klinik visit.`}
  },
  a3:{
    kr:{title:'Fɛ Bɛd Nyutrishon: Fid Yu Pikin Prɔpali fɔ Layf',excerpt:'Bad nyutrishon de afɛkt milions ɔf pikin dem na Wɛs Afrika. Gud fud na di fɔs 1,000 de de chɛnj evritin.',body:`Di fɔs 1,000 de — fɔm konsɛpshon tɔ pikin sɛkɔnd bɔtdɛ — na di mɔs imɔtant taim fɔ nyutrishon. Gut nyutrishon na dis taim de ɛlp bren grɔ an imiun sistɛm.\n\nKey tings: brɛstfid pɔyɔ pikin fɔ fɔs siks mɔnts, stɔt giv ɔda fud at siks mɔnts, giv varati fud, an chek weight na klinik.\n\nLak ɔf vitamin A, ayan, an zink na kɔmɔn. Komiyniti program de giv spɛshɛl fud fɔ pikin wɛ nɔ de it gud.\n\nFɔ big pipul, lɔkɔl fud lɛk kasava lif, granat su, an frɛsh fis de giv gut nyutrishon.`},
    tm:{title:'Fɛt Bɛd Nyutrishon: Fid Yu Pikin Gut',excerpt:'Bad nyutrishon de afɛkt plɛnti pikin na Wɛs Afrika.',body:`Di fɔs 1,000 de fɔm prɛgnɛnsi na di mɔs imɔtant taim fɔ pikin nyutrishon.\n\nFɔ pikin: brɛstfid fɔs siks mɔnts, den stɔt ɔda fud, giv varati fud, an chek bɔdi weight na klinik.\n\nLak ɔf vitamin A, ayan an zink de kɔmɔn. Spɛshɛl fud de ɛlp malnɔrishɛd pikin.\n\nLɔkɔl fud lɛk kasava lif, granat su, an fis de giv gut nyutrishon.`},
    mn:{title:'Fɛ Bɛd Nyutrishon: Fid Yu Pikin Gut fɔ Layf',excerpt:'Bad nyutrishon de afɛkt plɛnti pikin. Gut fud na di fɔs 1,000 de de chɛnj evritin.',body:`Di fɔs 1,000 de fɔm konsɛpshon na di mɔs imɔtant taim. Gut nyutrishon den de ɛlp bren grɔ an imiun sistɛm.\n\nFɔ pikin: brɛstfid pɔyɔ pikin fɔ siks mɔnts, stɔt ɔda fud, giv varati fud, an chek weight.\n\nLak ɔf vitamin A, ayan an zink na kɔmɔn problem. Spɛshɛl fud de ɛlp bad malnɔrishɛd pikin.\n\nLɔkɔl fud lɛk kasava lif, granat su an fis de giv gut nyutrishon.`}
  },
  a4:{
    kr:{title:'Klin Wata & Saniteshon: Ɔl Pipul Rayt',excerpt:'Klin wata de prɛvɛnt kolera, daiaria, an tifɔd. Washɔ hɛn wit sop fit kɛt pikin dɛt dɔm bay 45%.',body:`Sik fɔm wata lɛk kolera an daiaria stil na big wahala na Salone, ispecially ren sɛson.\n\nFɔ kip wata klin: bɔyl o trit wata bifo drink, prɔtɛkt wɛl fɔm doti wata, stɔ wata na kɔvad kontena, an rɛpot brɔk bohole.\n\nGut saniteshon — yuz latrin, no defɛket outsaid — na ɔlsɔ vɛri imɔtant.\n\nWashɔ hɛn wit sop bifo it, bifo kuk, an afta yuz latrin na wan ɔf di cheapɛs an bɛs way fɔ sev layf.`},
    tm:{title:'Klin Wata & Saniteshon: Ɔl Pipul Rayt',excerpt:'Klin wata de prɛvɛnt kolera an daiaria.',body:`Sik fɔm wata stil de kill pipul na Salone, spɛshɔli ren taim.\n\nFɔ kip wata klin: bɔyl wata bifo drink, stɔ wata ina kɔvad kontena, an rɛpot brɔk bohole.\n\nYuz latrin an no dɛfɛket outsaid de ɔlsɔ ɛlp stop sik.\n\nWashɔ hɛn wit sop bifo it, bifo kuk, an afta yuz latrin na di bɛst way fɔ stop sik.`},
    mn:{title:'Klin Wata & Saniteshon: Ɔl Pipul Rayt',excerpt:'Klin wata de prɛvɛnt daiaria an kolera.',body:`Wata sik lɛk kolera an daiaria stil de afɛkt pipul na Salone, spɛshɔli ren taim.\n\nFɔ kip wata klin: bɔyl wata bifo drink, kɔvɔ wata kontena, an rɛpot brɔk bohole.\n\nYuz latrin de ɛlp fɔ stop wata sik.\n\nWash hɛn wit sop bifo it, bifo kuk, an afta yuz latrin na di bɛs way fɔ stɔp sik.`}
  },
  a5:{
    kr:{title:'HIV/AIDS: No Yu Stɛtus, Prɔtɛkt Yu Komiyniti',excerpt:'HIV tɛst na fri an kɔnfidɛnshɔl. Wɛt ɛli trit, pipul wɛ get HIV de liv lɔn ɛlti layf.',body:`HIV de wikɛn di imiun sistɛm, an widout trit, am fit bikam AIDS. Na Salone, bout 1.5% ɔf adult dem get HIV.\n\nHIV de spred thru: ɔnprɔtɛktɛd sɛks, shea nidɔl, an fɔm mama tɔ bɛbi. HIV NO de spred thru hug, shea fud, o mosquito.\n\nART medisin de kip di vayrus dɔm sɔ se yu nɔ fit pas am tɔ yu pɛtna (U=U).\n\nPMTCT program, wen yu stɔt ɛli, fit redius transmishon tɔ ɔnda 2%.`},
    tm:{title:'HIV/AIDS: No Yu Stɛtus, Prɔtɛkt Yu Komiyniti',excerpt:'HIV tɛst na fri. Wɛt ɛli trit, pipul wɛ get HIV de liv ɛlti layf.',body:`HIV de wikɛn bɔdi defɛns, an widout trit am fit bikam AIDS.\n\nHIV de spred thru ɔnprɔtɛktɛd sɛks, shea nidɔl, an fɔm mama tɔ bɛbi. HIV NO de spred thru hug o shea fud.\n\nART medisin de kip vayrus dɔm (U=U).\n\nPMTCT de prɔtɛkt bɛbi. Ɔl prɛgnant wuman shud tɛst at fɔs ANC visit.`},
    mn:{title:'HIV/AIDS: No Yu Stɛtus, Prɔtɛkt Wi Pipul',excerpt:'HIV tɛst na fri. Wɛt ɛli trit, pipul wɛ get HIV de liv long layf.',body:`HIV de wikɛn bɔdi defɛns, an widout trit am fit bikam AIDS.\n\nHIV de spred thru ɔnprɔtɛktɛd sɛks, shea nidɔl, an fɔm mama tɔ bɛbi. HIV NO de spred thru hug o shea fud.\n\nART medisin de kip vayrus dɔm — U=U.\n\nPMTCT prɔgram de prɔtɛkt bɛbi. Ɔl prɛgnant wuman nid HIV tɛst at ANC.`}
  },
  a6:{
    kr:{title:'Vaksin De Sev Layf: Di Imyunaiseshon Skedyul fɔ Pikin',excerpt:'Vaksin de prɛvɛnt ova 20 sik dem. Kip yu pikin imyunaiseshon kɔd ap tɔ dɛt.',body:`Imyunaiseshon na wan ɔf di bɛs an chipɛs way fɔ sev layf. EPI program na Salone de giv fri vaksin.\n\nDi vaksin dem inkludin: BCG at bɔnin, polio vaksin at 6/10/14 wik, misliz an rubɛlla vaksin at 9 an 15 mɔnts, an yɛlɔ fiva vaksin.\n\nSɔm pipul de fraid vaksin bikɔs ɔf rɔng infomeshon. Bɔt ɔl vaksin dem don tɛst prɔpali.\n\nCHW dem an tradishonal lida dem de ɛlp mek shua se pikin dem get vaksin dem.`},
    tm:{title:'Vaksin De Sev Layf: Imyunaiseshon fɔ Pikin',excerpt:'Vaksin de prɛvɛnt plɛnti sik. Kip yu pikin imyunaiseshon kɔd ap tɔ dɛt.',body:`Imyunaiseshon na wan ɔf di mɔs ɛfɛktif way fɔ sev layf. EPI program na Salone de giv fri vaksin.\n\nDi vaksin dem inkludin BCG at bɔnin, polio an pɛntavalɛnt at 6/10/14 wik, misliz vaksin at 9 an 15 mɔnts, an yɛlɔ fiva vaksin.\n\nVaksin ɔl don tɛst prɔpali.\n\nCHW dem an komiyniti lida dem de ɛlp mek shua pikin dem get ɔl vaksin dem.`},
    mn:{title:'Vaksin De Sev Layf: Imyunaiseshon fɔ Pikin',excerpt:'Vaksin de prɛvɛnt plɛnti sik.',body:`Imyunaiseshon na wan ɔf di bɛs way fɔ prɔtɛkt pikin. EPI program na Salone de giv fri vaksin.\n\nVaksin dem inkludin BCG at bɔnin, polio an pɛntavalɛnt, misliz vaksin, an yɛlɔ fiva vaksin.\n\nVaksin ɔl don tɛst prɔpali.\n\nCHW dem an komiyniti lida dem de ɛnshua pikin dem get ɔl vaksin dem.`}
  },
  a7:{
    kr:{title:'Mayn Elt Mata: Brek Di Stigma na Salone',excerpt:'Mayn elt sik de afɛkt wan in fɔ pipul ɔlova di wɔd. Ask fɔ ɛlp na sain ɔf strengt.',body:`Mayn elt prɔblɛm lɛk dipreshon, ɛnzaiɛti, PTSD, na kɔmɔn, dem fit trit, an nɔ ting fɔ shɛm bout.\n\nKɔmɔn sik dem: dipreshon, ɛnzaiɛti, PTSD, an drɔg yuz prɔblɛm.\n\nStigma — fiya ɔf jɔjmɛnt — na di bigɛst wɔl aɡɛnst getin ɛlp. Famili an komiyniti fit ɛlp bay lisɛn widout jɔj.\n\nMayn elt sɛvis de na rifrɔl ɔspital. Tɔk tɔ trastɛd ɛlt wɔka na di fɔs step.`},
    tm:{title:'Mayn Elt Mata: Brek Di Stigma na Salone',excerpt:'Mayn elt sik de afɛkt wan in fɔ pipul.',body:`Mayn elt prɔblɛm lɛk dipreshon, ɛnzaiɛti, PTSD, na kɔmɔn an dem fit trit.\n\nStigma na di bigɛs prɔblɛm. Famili an komiyniti fit ɛlp bay lisɛn widout jɔj.\n\nMayn ɛlt sɛvis de na rifrɔl ɔspital. Tɔk tɔ ɛlt wɔka o kɔnsɛla na di fɔs step.`},
    mn:{title:'Mayn Ɛlt Mata: Brek Di Stigma na Salone',excerpt:'Mayn ɛlt sik de afɛkt wan in fɔ pipul.',body:`Mayn ɛlt prɔblɛm lɛk dipreshon, ɛnzaiɛti, an PTSD na kɔmɔn.\n\nStigma na di bigɛs wɔl. Famili an komiyniti fit ɛlp bay lisɛn widout jɔj.\n\nMayn ɛlt sɛvis de na rifrɔl ɔspital an komiyniti prɔgram. Tɔk tɔ ɛlt wɔka na di fɔs step.`}
  },
  a8:{
    kr:{title:'TB: Sain Dem, Ow Fɔ No Am, an Fri Trit',excerpt:'TB fit kyɔ. If yu get kɔf fɔ mɔ dan tu wik, go tɛst fɔ TB kwik na yu niɛs klinik.',body:`TB de kɔmɔt fɔm gɔm we de spred thru ɛ wen infɛktɛd pɛsin kɔf o tɔk. Na Salone, TB de afɛkt plɛnti pipul.\n\nSain ɔf TB: kɔf fɔ mɔ dan tri wik, kɔf blɔd, chɛs pein, lus weight, nayt swiit, an wɛri.\n\nDaiaɡnɔsis: GeneXpert tɛst an chɛs X-re. Trit na fri — siks mɔnts ɔf medisin. Yu mɔs finish ɔl.\n\nPipul we get HIV na mɔ riski fɔ get TB.`},
    tm:{title:'TB: Sain Dem, Daiaɡnɔsis, an Fri Trit',excerpt:'TB fit kyɔ. Kɔf fɔ mɔ dan tu wik min yu nid TB tɛst.',body:`TB de kɔmɔt fɔm gɔm we de spred thru ɛ wen pɛsin kɔf. Na Salone TB na big sik.\n\nSain ɔf TB: kɔf fɔ tri wik o mɔ, kɔf blɔd, weight lɔs, nayt swiit.\n\nGeneXpert tɛst an chɛs X-re de yusd. Trit na fri an nid siks mɔnts ɔf medisin.\n\nHIV pɔsitiv pipul ɛv haɪ risk ɔf TB.`},
    mn:{title:'TB: Sain Dem, Daiaɡnɔsis, an Fri Trit',excerpt:'TB fit kyɔ. Kɔf fɔ mɔ dan tu wik min yu nid TB tɛst kwik.',body:`TB de kɔmɔt fɔm gɔm we de spred thru ɛ. Na Salone TB de afɛkt plɛnti pipul.\n\nSain ɔf TB: kɔf fɔ tri wik o mɔ, kɔf blɔd, weight lɔs, nayt swiit.\n\nGeneXpert an chɛs X-re de yusd. Trit na fri — siks mɔnts.\n\nHIV pɔsitiv pipul ɛv haɪ risk ɔf TB.`}
  }
};

// ── SEED DATA ─────────────────────────────────────────
const SEED_ARTICLES=[
  {id:'a1',topic:'malaria',title:'Understanding Malaria: Causes, Symptoms & Prevention',excerpt:'Malaria remains one of the leading causes of illness and death in Sierra Leone. Understanding how it spreads is the first step to protection.',body:`Malaria is caused by Plasmodium parasites transmitted through the bites of infected female Anopheles mosquitoes. In Sierra Leone, malaria accounts for a significant proportion of all outpatient visits each year.\n\nSymptoms appear 10–15 days after infection: fever, chills, headache, muscle pain, nausea, and vomiting. Severe malaria can cause organ failure and death if untreated.\n\nPrevention: sleep under insecticide-treated nets (ITNs), spray indoors, eliminate standing water, and take prophylaxis when advised.\n\nEarly diagnosis and treatment with artemisinin-based combination therapy (ACT) is the cornerstone of malaria management.`,tags:['prevention','treatment','mosquito','community'],author:'Dr. A. Kamara',date:'2024-08-15',lang:'en',image:'https://images.unsplash.com/photo-1579684389782-64d84b5e902a?w=800&auto=format&fit=crop&q=60'},
  {id:'a2',topic:'maternal',title:'Safe Motherhood: Antenatal Care in Sierra Leone',excerpt:'Regular antenatal visits dramatically reduce maternal and infant mortality. Every pregnant woman deserves quality care from the first trimester.',body:`Antenatal care (ANC) promotes health and detects complications early. WHO recommends at least eight ANC contacts during pregnancy.\n\nANC services include blood pressure monitoring, testing for anaemia, malaria, and HIV, iron and folic acid supplements, tetanus vaccination, and birth preparedness counselling.\n\nSierra Leone's Free Health Care Initiative provides free healthcare for pregnant women, nursing mothers, and children under five.\n\nPostnatal care in the first 48 hours is critical. Danger signs — heavy bleeding, fever, difficulty breathing — require immediate referral.`,tags:['antenatal','pregnancy','newborn','free-healthcare'],author:'Nurse F. Conteh',date:'2024-09-02',lang:'en',image:'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=800&auto=format&fit=crop&q=60'},
  {id:'a3',topic:'nutrition',title:'Fighting Malnutrition: Feeding Your Child for Life',excerpt:'Stunting and wasting affect millions of children across West Africa. A diverse diet in the first 1,000 days of life changes everything.',body:`The first 1,000 days — from conception to a child's second birthday — are the most critical for nutrition. Adequate nutrition supports brain development, immune function, and long-term health.\n\nKey principles: exclusive breastfeeding for six months, complementary foods from six months, dietary diversity, and routine weight and height monitoring.\n\nMicronutrient deficiencies — vitamin A, iron, zinc — are widespread. Community programs provide therapeutic food for severe malnutrition.\n\nFor all ages, local foods — cassava leaves, groundnut soup, fresh fish — provide excellent nutrition at low cost.`,tags:['children','breastfeeding','diet','stunting'],author:'Nutritionist M. Sesay',date:'2024-07-20',lang:'en',image:'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop&q=60'},
  {id:'a4',topic:'water',title:'Clean Water & Sanitation: A Human Right, Not a Luxury',excerpt:'Access to safe water prevents diarrhoea, cholera, and typhoid. Hand-washing alone can cut child deaths by up to 45%.',body:`Waterborne diseases — cholera, typhoid, diarrhoea — remain major threats in Sierra Leone, especially during rainy season.\n\nSafe water practices: boil or treat drinking water, protect wells, store water in covered containers, report broken boreholes.\n\nProper sanitation — using latrines, no open defecation — is equally important.\n\nHandwashing with soap before eating, cooking, and after using the toilet is one of the most cost-effective health interventions available.`,tags:['cholera','handwashing','latrine','water'],author:'WASH Officer T. Bangura',date:'2024-10-10',lang:'en',image:'https://images.unsplash.com/photo-1581091919816-2a4c22a8a903?w=800&auto=format&fit=crop&q=60'},
  {id:'a5',topic:'hiv',title:'HIV/AIDS: Know Your Status, Protect Your Community',excerpt:'HIV testing is free, confidential, and widely available. With early treatment, people living with HIV lead long, healthy lives.',body:`HIV weakens the immune system and can progress to AIDS without treatment. In Sierra Leone, about 1.5% of adults have HIV.\n\nHIV spreads through unprotected sex, sharing needles, and from mother to child. HIV is NOT spread through hugging, sharing food, or mosquito bites.\n\nART suppresses the virus to undetectable levels — U=U means people on effective treatment cannot pass HIV to partners.\n\nPMTCT programs, started early, reduce mother-to-child transmission to under 2%. All pregnant women should test at their first ANC visit.`,tags:['testing','ART','PMTCT','stigma'],author:'Dr. I. Koroma',date:'2024-06-05',lang:'en',image:'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&auto=format&fit=crop&q=60'},
  {id:'a6',topic:'vaccination',title:'Vaccines Save Lives: The Immunisation Schedule for Children',excerpt:"Vaccines prevent over 20 life-threatening diseases. Keeping your child's immunisation card up to date is one of the most important things a parent can do.",body:`Immunisation is one of history's most successful public health interventions. Sierra Leone's EPI provides free vaccines at government facilities.\n\nThe schedule includes BCG at birth, polio and pentavalent vaccines at 6/10/14 weeks, measles and rubella at 9 and 15 months, and yellow fever vaccine.\n\nAll licensed vaccines have been rigorously tested. Mild side effects like soreness or low-grade fever are normal and temporary.\n\nCHWs and traditional leaders are essential for maintaining high coverage, especially in remote areas.`,tags:['EPI','children','polio','measles'],author:'PHO S. Koroma',date:'2024-11-01',lang:'en',image:'https://images.unsplash.com/photo-1584515901407-d8f46c53a5c4?w=800&auto=format&fit=crop&q=60'},
  {id:'a7',topic:'mentalhealth',title:'Mental Health Matters: Breaking the Stigma in Sierra Leone',excerpt:'Mental health conditions affect one in four people globally. Seeking help is a sign of strength, not weakness.',body:`Mental health disorders — depression, anxiety, PTSD, psychosis — are common, treatable, and nothing to be ashamed of. Sierra Leone's civil war and Ebola epidemic left deep psychological scars.\n\nCommon conditions include depression, anxiety disorders, PTSD, and substance use disorders.\n\nStigma remains the biggest barrier to care. Families and communities help by listening without judgment and encouraging treatment.\n\nMental health services are available at referral hospitals and through community rehabilitation programs.`,tags:['stigma','depression','PTSD','community'],author:'Counsellor A. Jalloh',date:'2024-05-18',lang:'en',image:'https://images.unsplash.com/photo-1527137341206-e92753e68c0e?w=800&auto=format&fit=crop&q=60'},
  {id:'a8',topic:'tuberculosis',title:'Tuberculosis: Symptoms, Diagnosis & Free Treatment',excerpt:'TB is curable. A cough lasting more than two weeks warrants a free TB test at your nearest health facility.',body:`TB is caused by Mycobacterium tuberculosis and primarily affects the lungs. Sierra Leone has a significant TB burden, especially in crowded, poorly ventilated settings.\n\nSymptoms: persistent cough of three+ weeks, coughing blood, chest pain, weight loss, night sweats, fatigue. TB spreads through the air when infected people cough or speak.\n\nDiagnosis: GeneXpert testing and chest X-ray. Treatment is free — six months of antibiotics. Completing the full course prevents drug-resistant TB.\n\nPeople living with HIV are especially vulnerable to TB co-infection.`,tags:['treatment','diagnosis','lung','co-infection'],author:'Dr. M. Fofanah',date:'2024-04-12',lang:'en',image:'https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?w=800&auto=format&fit=crop&q=60'},
  {id:'a9',topic:'diabetes',title:'Diabetes in Sierra Leone: Managing Blood Sugar for Better Health',excerpt:'Diabetes is on the rise in Sierra Leone. Early detection and lifestyle changes can prevent serious complications.',body:`Diabetes occurs when the body cannot properly use or produce insulin, leading to high blood sugar levels. Type 2 diabetes is becoming more common due to changing diets and lifestyles.\n\nSymptoms include excessive thirst, frequent urination, unexplained weight loss, fatigue, and slow-healing wounds. Many people have diabetes without knowing it.\n\nPrevention and management: maintain a healthy weight, exercise regularly, limit sugary foods and drinks, and eat more vegetables and whole grains.\n\nRegular blood sugar testing is important, especially for those over 40 or with a family history. Treatment includes medication and insulin when needed.`,tags:['blood-sugar','prevention','lifestyle','complications'],author:'Dr. S. Turay',date:'2024-03-25',lang:'en',image:'https://images.unsplash.com/photo-1508847154043-be12a3bc4b1c?w=800&auto=format&fit=crop&q=60'},
  {id:'a10',topic:'hypertension',title:'High Blood Pressure: The Silent Killer You Can Control',excerpt:'Hypertension often has no symptoms but can cause stroke and heart disease. Regular blood pressure checks save lives.',body:`High blood pressure (hypertension) forces the heart to work harder than normal, damaging arteries over time. It is called the "silent killer" because many people feel no symptoms until serious damage occurs.\n\nRisk factors include age, family history, high salt intake, lack of exercise, obesity, and stress.\n\nPrevention: reduce salt in your diet, exercise for 30 minutes daily, maintain a healthy weight, limit alcohol, and manage stress.\n\nTreatment includes lifestyle changes and medication. Regular monitoring at home or at health facilities is essential. Blood pressure should be kept below 130/80 mmHg.`,tags:['blood-pressure','stroke','heart','prevention'],author:'Dr. A. Mansaray',date:'2024-02-14',lang:'en',image:'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=800&auto=format&fit=crop&q=60'},
  {id:'a11',topic:'cholera',title:'Cholera Prevention: Clean Water Saves Lives',excerpt:'Cholera spreads through contaminated water and food. During rainy season, simple precautions can protect your family.',body:`Cholera is an acute diarrhoeal infection caused by Vibrio cholerae bacteria. It causes severe watery diarrhoea and dehydration that can be fatal within hours if untreated.\n\nCholera spreads through drinking contaminated water, eating contaminated food, and poor sanitation. Outbreaks are common during rainy season when flooding contaminates water sources.\n\nPrevention: drink only boiled or treated water, wash hands with soap, cook food thoroughly, use latrines, and avoid street food during outbreaks.\n\nTreatment is simple and effective: oral rehydration salts (ORS) and antibiotics. Seek care immediately if you have severe watery diarrhoea.`,tags:['water','diarrhoea','ORS','prevention'],author:'Dr. E. Kamara',date:'2024-01-08',lang:'en',image:'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&auto=format&fit=crop&q=60'},
  {id:'a12',topic:'familyplanning',title:'Family Planning: Planning Your Family, Planning Your Future',excerpt:'Family planning allows couples to decide when to have children and how many to have. It improves maternal and child health.',body:`Family planning enables individuals and couples to anticipate and attain their desired number of children and the spacing and timing of their births.\n\nMethods include condoms, contraceptive pills, injections, implants, IUDs, and natural family planning. All methods are available at government health facilities.\n\nBenefits: reduces maternal and infant mortality, allows women to pursue education and work, improves child health through proper spacing, and reduces poverty.\n\nFamily planning is voluntary and confidential. Couples should discuss options together and choose the method that works best for them.`,tags:['contraception','maternal','spacing','health'],author:'Midwife M. Bangura',date:'2024-12-20',lang:'en',image:'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&auto=format&fit=crop&q=60'},
];

// ── STATE ─────────────────────────────────────────────
const API_BASE=window.__HEALTHPULSE_API_BASE__||((window.location.protocol==='file:'||window.location.hostname==='localhost'||window.location.hostname==='127.0.0.1')?'http://localhost:3000/api':'https://healthpulse-sl.onrender.com/api');

async function loadArticles(){
  try{
    const res=await fetch(`${API_BASE}/articles`);
    if(!res.ok)throw new Error('Failed to fetch articles');
    return await res.json();
  }catch(e){
    console.error('Error loading articles:',e);
    return[...SEED_ARTICLES];
  }
}

async function saveArticle(article){
  STATE.loading=true;
  STATE.loadingMessage=article.id?'Saving article...':'Creating article...';
  render();
  try{
    const url=article.id?`${API_BASE}/articles/${article.id}`:`${API_BASE}/articles`;
    const method=article.id?'PUT':'POST';
    const token=localStorage.getItem('adminToken');
    const res=await fetch(url,{
      method,
      headers:{
        'Content-Type':'application/json',
        'Authorization':token?`Bearer ${token}`:''
      },
      body:JSON.stringify(article)
    });
    if(!res.ok)throw new Error('Failed to save article');
    return await res.json();
  }catch(e){
    console.error('Error saving article:',e);
    throw e;
  }finally{
    STATE.loading=false;
    STATE.loadingMessage='';
    render();
  }
}

async function apiDeleteArticle(id){
  STATE.loading=true;
  STATE.loadingMessage='Deleting article...';
  render();
  try{
    const token=localStorage.getItem('adminToken');
    const res=await fetch(`${API_BASE}/articles/${id}`,{
      method:'DELETE',
      headers:{
        'Authorization':token?`Bearer ${token}`:''
      }
    });
    if(!res.ok)throw new Error('Failed to delete article');
    return await res.json();
  }catch(e){
    console.error('Error deleting article:',e);
    throw e;
  }finally{
    STATE.loading=false;
    STATE.loadingMessage='';
    render();
  }
}

let STATE={
  articles:[],lang:'en',search:'',activeTopic:null,sort:'newest',
  modal:null,toasts:[],
  botOpen:false,         // HealthBot panel open
  botMessages:[],        // [{role:'bot'|'user', text}]
  botTyping:false,
  aiSummary:null,        // {articleId, text, loading} for read modal
  aiTranslation:null,    // {articleId, lang, text, loading} for read modal
  aiTagSuggestions:[],   // array of tag strings for form
  aiGenerating:false,    // form AI generation in progress
  darkMode:false,        // dark mode toggle state
  mobileMenuOpen:false,  // mobile menu open state
  loading:false,         // global loading state
  loadingMessage:'',     // loading message to display
  favorites:[],         // array of favorited article IDs
  showFavoritesOnly:false, // filter to show only favorites
};
let toastCounter=0;

// ── HELPERS ───────────────────────────────────────────
const t=k=>LANG_STRINGS[STATE.lang]?.[k]??LANG_STRINGS.en[k]??k;
const topicLabel=id=>(TOPIC_LABELS[STATE.lang]||TOPIC_LABELS.en)[id]||id;
const topicStyle=id=>TOPIC_STYLE[id]||{color:'#6B7C72',bg:'#f0f0f0'};
const topicEmoji=id=>TOPIC_SVGS[id]||'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>';
const fmtDate=d=>{try{return new Date(d).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});}catch{return d;}};
const uid=()=>'a'+Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const esc=s=>String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const nl2p=s=>s.split('\n\n').filter(x=>x.trim()).map(x=>`<p>${esc(x.trim())}</p>`).join('');

function resolveArticle(article,lang){
  if(lang==='en')return{...article,isFallback:false,isTranslated:true};
  const built=ARTICLE_TRANSLATIONS[article.id]?.[lang];
  if(built)return{...article,...built,isFallback:false,isTranslated:true};
  if(article.lang===lang)return{...article,isFallback:false,isTranslated:true};
  return{...article,isFallback:true,isTranslated:false};
}

function updateDocumentMeta(){
  const lo=LANGS.find(l=>l.code===STATE.lang)||LANGS[0];
  document.getElementById('root-html').setAttribute('lang',lo.htmlLang);
  const title=t('pageTitle');
  document.getElementById('page-title').textContent=title;
  document.title=title;
  // Apply dark mode
  if(STATE.darkMode)document.body.classList.add('dark-mode');
  else document.body.classList.remove('dark-mode');
}

function addToast(msgKey,type='success'){
  const id=++toastCounter;
  STATE.toasts=[...STATE.toasts,{id,msgKey,type}];
  render();
  setTimeout(()=>{STATE.toasts=STATE.toasts.filter(x=>x.id!==id);render();},3200);
}

function filteredArticles(){
  let arr=[...STATE.articles];
  if(STATE.showFavoritesOnly)arr=arr.filter(a=>STATE.favorites.includes(a.id));
  if(STATE.activeTopic)arr=arr.filter(a=>a.topic===STATE.activeTopic);
  if(STATE.search.trim()){
    const q=STATE.search.toLowerCase();
    arr=arr.filter(a=>{const r=resolveArticle(a,STATE.lang);return(r.title+r.excerpt+r.body+(a.tags||[]).join(' ')).toLowerCase().includes(q);});
  }
  if(STATE.sort==='newest')arr.sort((a,b)=>new Date(b.date)-new Date(a.date));
  else if(STATE.sort==='oldest')arr.sort((a,b)=>new Date(a.date)-new Date(b.date));
  else arr.sort((a,b)=>{const ra=resolveArticle(a,STATE.lang),rb=resolveArticle(b,STATE.lang);return ra.title.localeCompare(rb.title);});
  return arr;
}
function topicCounts(){const c={};STATE.articles.forEach(a=>{c[a.topic]=(c[a.topic]||0)+1;});return c;}

// ── CRUD ──────────────────────────────────────────────
async function createArticle(data){
  try{
    const newArticle={...data,id:uid(),date:new Date().toISOString().split('T')[0]};
    const saved=await saveArticle(newArticle);
    STATE.articles=[saved,...STATE.articles];
    STATE.modal=null;
    addToast('toastCreated');
    render();
  }catch(e){
    console.error('Error creating article:',e);
    addToast('validRequired','error');
  }
}
async function updateArticle(id,data){
  try{
    const updated=await saveArticle({...data,id});
    STATE.articles=STATE.articles.map(a=>a.id===id?updated:a);
    STATE.modal=null;
    addToast('toastUpdated');
    render();
  }catch(e){
    console.error('Error updating article:',e);
    addToast('validRequired','error');
  }
}
async function deleteArticle(id){
  try{
    await apiDeleteArticle(id);
    STATE.articles=STATE.articles.filter(a=>a.id!==id);
    STATE.modal=null;
    addToast('toastDeleted','warning');
    render();
  }catch(e){
    console.error('Error deleting article:',e);
    addToast('validRequired','error');
  }
}

// ═══════════════════════════════════════════════════════
//  AI ENGINE  —  All Claude API calls
// ═══════════════════════════════════════════════════════

const AI_MODEL='claude-3-5-sonnet-20241022';
const HEALTH_SYSTEM=`You are HealthBot, an expert public health assistant for Sierra Leone, aligned with SDG 3 (Good Health & Well-being). You provide accurate, compassionate, culturally appropriate health information about diseases and conditions common in Sierra Leone including malaria, maternal health, nutrition, HIV/AIDS, water/sanitation, mental health, vaccination, and tuberculosis. Always encourage people to visit their nearest health facility for diagnosis and treatment. Keep responses concise, warm, and practical. Avoid medical jargon. Never diagnose individuals.`;

async function callClaude(messages,systemPrompt,maxTokens=800){
  const API_KEY=window.ANTHROPIC_API_KEY || '';
  if(!API_KEY)throw new Error('Anthropic API key not configured');
  const res=await fetch('https://api.anthropic.com/v1/messages',{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      'x-api-key':API_KEY,
      'anthropic-version':'2023-06-01'
    },
    body:JSON.stringify({
      model:AI_MODEL,max_tokens:maxTokens,
      system:systemPrompt||HEALTH_SYSTEM,
      messages
    })
  });
  if(!res.ok){const err=await res.json();throw new Error(err.error?.message||'API error');}
  const data=await res.json();
  return data.content.filter(b=>b.type==='text').map(b=>b.text).join('');
}

// ── AI FEATURE 1: Article Generation ─────────────────
async function aiGenerateArticle(topic,title,prompt){
  STATE.aiGenerating=true;
  render();
  const langName=LANGS.find(l=>l.code===STATE.lang)?.label||'English';
  const topicName=topicLabel(topic);
  try{
    const result=await callClaude([{role:'user',content:`Write a comprehensive public health article for Sierra Leone communities about "${title}" in the topic of ${topicName}.\n\nGuidance: ${prompt||'Cover causes, symptoms, prevention, and treatment.'}\n\nWrite in ${langName}. Format as JSON: {"title":"...","excerpt":"...","body":"paragraph1\\n\\nparagraph2\\n\\nparagraph3\\n\\nparagraph4","tags":["tag1","tag2","tag3","tag4"]}\n\nThe body must have 4 paragraphs separated by double newlines. Excerpt max 280 chars. Tags: 3-5 relevant keywords. Output ONLY valid JSON, no markdown.`}],HEALTH_SYSTEM,900);
    const clean=result.replace(/```json|```/g,'').trim();
    const parsed=JSON.parse(clean);
    // Fill form fields
    setTimeout(()=>{
      const tf=document.getElementById('f-title');const ef=document.getElementById('f-excerpt');const bf=document.getElementById('f-body');const tagsF=document.getElementById('f-tags');
      if(tf)tf.value=parsed.title||title;
      if(ef)ef.value=parsed.excerpt||'';
      if(bf)bf.value=parsed.body||'';
      if(tagsF)tagsF.value=(parsed.tags||[]).join(', ');
      document.getElementById('title-count').textContent=(parsed.title||title).length+'/120';
      document.getElementById('excerpt-count').textContent=(parsed.excerpt||'').length+'/280';
      // Show success notice
      const notice=document.getElementById('ai-gen-notice');
      if(notice){notice.textContent=t('aiGenerated');notice.style.color='#1A7A4A';}
    },50);
  }catch(e){
    const notice=document.getElementById('ai-gen-notice');
    if(notice){notice.textContent='AI generation failed. Please try again or write manually.';notice.style.color='#C0392B';}
  }
  STATE.aiGenerating=false;
  render();
}

// ── AI FEATURE 3: Article Summary ─────────────────────
async function aiSummarizeArticle(articleId){
  const article=STATE.articles.find(a=>a.id===articleId);
  if(!article)return;
  STATE.aiSummary={articleId,text:null,loading:true};
  render();
  const resolved=resolveArticle(article,STATE.lang);
  const langName=LANGS.find(l=>l.code===STATE.lang)?.label||'English';
  try{
    const text=await callClaude([{role:'user',content:`Summarize this health article in 3 bullet points (in ${langName}), each starting with "• ":\n\nTitle: ${resolved.title}\n\n${resolved.body}`}],HEALTH_SYSTEM,300);
    STATE.aiSummary={articleId,text,loading:false};
  }catch(e){STATE.aiSummary={articleId,text:'Summary unavailable. Please try again.',loading:false};}
  render();
}

// ── AI FEATURE 4: AI Translation ──────────────────────
async function aiTranslateArticle(articleId,targetLang){
  const article=STATE.articles.find(a=>a.id===articleId);
  if(!article)return;
  STATE.aiTranslation={articleId,lang:targetLang,text:null,loading:true};
  render();
  const langName=LANGS.find(l=>l.code===targetLang)?.label||targetLang;
  try{
    const text=await callClaude([{role:'user',content:`Translate the following health article body into ${langName} (Sierra Leone dialect if applicable). Keep the same paragraph structure. Output only the translated body text, no title or extra formatting.\n\n${article.body}`}],HEALTH_SYSTEM,800);
    STATE.aiTranslation={articleId,lang:targetLang,text,loading:false};
  }catch(e){STATE.aiTranslation={articleId,lang:targetLang,text:'Translation unavailable.',loading:false};}
  render();
}

// ── AI FEATURE 5: Tag Suggestions ─────────────────────
async function aiSuggestTags(title,body){
  try{
    const result=await callClaude([{role:'user',content:`Suggest 5 short, relevant tags for this health article. Return ONLY a JSON array of strings, no explanation.\n\nTitle: ${title}\nContent: ${body.slice(0,400)}`}],HEALTH_SYSTEM,100);
    const clean=result.replace(/```json|```/g,'').trim();
    STATE.aiTagSuggestions=JSON.parse(clean);
  }catch(e){STATE.aiTagSuggestions=[];}
  render();
}

// ── AI FEATURE 6: HealthBot Chat ──────────────────────
async function botSendMessage(text){
  if(!text.trim())return;
  STATE.botMessages=[...STATE.botMessages,{role:'user',text}];
  STATE.botTyping=true;
  render();
  scrollBot();
  const history=STATE.botMessages.slice(-8).map(m=>({role:m.role==='bot'?'assistant':'user',content:m.text}));
  const langName=LANGS.find(l=>l.code===STATE.lang)?.label||'English';
  try{
    const reply=await callClaude(history,HEALTH_SYSTEM+` Always respond in ${langName}. Be warm and practical.`,500);
    STATE.botMessages=[...STATE.botMessages,{role:'bot',text:reply}];
  }catch(e){STATE.botMessages=[...STATE.botMessages,{role:'bot',text:'Sorry, I\'m having trouble connecting. Please try again.'}];}
  STATE.botTyping=false;
  render();
  scrollBot();
}

function scrollBot(){setTimeout(()=>{const m=document.getElementById('bot-messages');if(m)m.scrollTop=m.scrollHeight;},50);}

function initBot(){
  if(STATE.botMessages.length===0){
    STATE.botMessages=[{role:'bot',text:t('botWelcome')}];
  }
}

// ═══════════════════════════════════════════════════════
//  RENDER ENGINE
// ═══════════════════════════════════════════════════════
function render(){
  const activeEl = document.activeElement;
  const isSearchActive = activeEl && activeEl.dataset && activeEl.dataset.action === 'search';
  const selectionStart = isSearchActive ? activeEl.selectionStart : null;
  const selectionEnd = isSearchActive ? activeEl.selectionEnd : null;

  updateDocumentMeta();
  document.getElementById('app').innerHTML=buildHTML();
  attachEvents();

  if (isSearchActive) {
    const searchInputs = document.querySelectorAll('input[data-action="search"]');
    searchInputs.forEach(input => {
      input.focus();
      if (selectionStart !== null && selectionEnd !== null) {
        try {
          input.setSelectionRange(selectionStart, selectionEnd);
        } catch(e) {}
      }
    });
  }
}

function buildHTML(){
  const counts=topicCounts();const filtered=filteredArticles();
  return`${STATE.loading?`<div class="loading-overlay" role="alert" aria-live="polite"><div class="spinner-lg"></div><p>${STATE.loadingMessage||'Loading...'}</p></div>`:''}
${buildTopbar()}${buildLangStrip()}${buildHero()}
<div class="layout"><div class="layout-grid">
  ${buildSidebar(counts)}
  <div role="main">
    ${buildMainToolbar()}
    <div class="articles-meta" aria-live="polite">${t('showing')} <span>${filtered.length}</span> ${t('of')} <span>${STATE.articles.length}</span> ${t('articles')}</div>
    ${filtered.length===0?buildEmptyState():buildGrid(filtered)}
  </div>
</div></div>
${buildFooter()}${buildToasts()}
${buildHealthBot()}
${STATE.modal?buildModal():''}`;
}

// ── TOPBAR ────────────────────────────────────────────
function buildTopbar(){
  const isAdminLoggedIn = localStorage.getItem('adminToken') !== null;
  const adminData = isAdminLoggedIn ? JSON.parse(localStorage.getItem('adminData') || '{}') : null;
  
  return`<nav class="topbar" role="banner">
  <div class="topbar-brand"><div class="topbar-logo"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></div><div class="topbar-title">HealthPulse&nbsp;<span>SL</span></div></div>
  <button class="hamburger" data-action="toggle-mobile-menu" aria-label="Toggle menu" aria-expanded="${STATE.mobileMenuOpen?'true':'false'}">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
  </button>
  <div class="topbar-right${STATE.mobileMenuOpen?' open':''}" role="navigation" aria-label="Main navigation">
    <button class="dark-mode-toggle" data-action="toggle-darkmode" aria-label="Toggle dark mode" aria-pressed="${STATE.darkMode?'true':'false'}">
      ${STATE.darkMode?'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>':'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'}
    </button>
    <a href="emergency.html" class="emergency-nav-link" aria-label="Emergency &amp; First Aid Hub" style="background:#C0392B;border:1.5px solid rgba(255,255,255,.3);color:#fff;border-radius:6px;padding:5px 12px;font-size:.8rem;font-weight:700;display:flex;align-items:center;gap:6px;text-decoration:none;">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      🚨 Emergency
      <span style="width:7px;height:7px;background:#fff;border-radius:50%;display:inline-block;animation:pulse 1.5s infinite;"></span>
    </a>
    ${isAdminLoggedIn ? `
      <a href="admin.html" class="admin-link" aria-label="Go to admin dashboard">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        ${adminData?.full_name || 'Admin'}
      </a>
      <button class="lang-btn" data-action="admin-logout" aria-label="Logout">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
      </button>
    ` : `
      <a href="admin.html" class="admin-link" aria-label="Go to admin login">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        Admin
      </a>
    `}
    ${LANGS.map(l=>`<button class="lang-btn${STATE.lang===l.code?' active':''}" data-action="setlang" data-lang="${l.code}" aria-label="Switch to ${l.label}">${l.label}</button>`).join('')}
  </div>
</nav>`;
}

function buildLangStrip(){
  const ln=LANGS.find(l=>l.code===STATE.lang)?.label||'English';
  return`<div class="lang-strip"><span class="live-dot"></span> ${t('langNote')} <strong>${ln}</strong> &nbsp;|&nbsp; <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg> AI-Powered</div>`;
}

// ── HERO ───────────────────────────────────────────────
function buildHero(){
  return`<div class="hero">
  <div class="hero-inner">
    <span class="hero-eyebrow"><span class="live-dot"></span> HealthPulse Sierra Leone</span>
    <h1>HealthPulse <em>SL</em></h1>
    <p class="hero-sub">${t('tagline')}</p>
    
    <div class="hero-search-container">
      <div class="hero-search-bar">
        <span class="hero-search-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        </span>
        <input type="search" placeholder="${t('searchPh')}" value="${esc(STATE.search)}" data-action="search" aria-label="Search articles"/>
      </div>
    </div>
    
    <div class="hero-stats">
      <div class="hero-stat">
        <span class="num">${STATE.articles.length}</span>
        <span class="lbl">${t('statArticles')}</span>
      </div>
      <div class="hero-stat">
        <span class="num">4</span>
        <span class="lbl">${t('statLangs')}</span>
      </div>
      <div class="hero-stat">
        <span class="num">100%</span>
        <span class="lbl">${t('statVerified') || 'Verified Info'}</span>
      </div>
      <div class="hero-stat">
        <span class="num">⚡</span>
        <span class="lbl">${t('statOffline') || 'Offline Ready'}</span>
      </div>
    </div>
  </div>
</div>`;
}

// ── SIDEBAR ───────────────────────────────────────────
function buildSidebar(counts){
  const total=STATE.articles.length;
  return`<aside class="sidebar" role="navigation" aria-label="Filter by topic">
  <div class="sidebar-head"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg> ${t('filterHeading')}</div>
  <div class="sidebar-section">
    <label>${t('allTopicsLabel')}</label>
    <button class="filter-tag${!STATE.activeTopic?' active':''}" data-action="topic" data-topic="" aria-label="Show all topics">${t('allTopicsLabel')} (${total})</button>
  </div>
  <div class="sidebar-section">
    <label>${t('categoryLabel')}</label>
    ${TOPIC_IDS.map(id=>{const s=topicStyle(id);const active=STATE.activeTopic===id;
      return`<button class="filter-tag${active?' active':''}" data-action="topic" data-topic="${id}" aria-label="Filter by ${topicLabel(id)}"
        style="${active?`background:${s.color};border-color:${s.color};`:''}">${topicEmoji(id)} ${topicLabel(id)} (${counts[id]||0})</button>`;
    }).join('')}
  </div>
  <div class="sidebar-section">
    <label>Favorites</label>
    <button class="filter-tag${STATE.showFavoritesOnly?' active':''}" data-action="toggle-favorites-filter" aria-expanded="${STATE.showFavoritesOnly?'true':'false'}" aria-pressed="${STATE.showFavoritesOnly?'true':'false'}">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="${STATE.showFavoritesOnly?'currentColor':'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
      ${STATE.showFavoritesOnly?'Show All':'Favorites Only'} (${STATE.favorites.length})
    </button>
  </div>
  <div class="ai-sidebar-section">
    <div class="ai-sidebar-title"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg> ${t('aiSidebarTitle')}</div>
    <button class="ai-quick-btn" data-action="open-bot" aria-label="Open HealthBot"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> ${t('botName')}</button>
    <button class="ai-quick-btn" data-action="ai-sidebar-write" aria-label="Generate article with AI"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> ${t('aiWriteBtn')}</button>
  </div>
  <div class="sidebar-stats">
    <label style="font-size:.75rem;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;display:block;margin-bottom:8px;">${t('statsHeading')}</label>
    ${TOPIC_IDS.filter(id=>counts[id]).map(id=>`
    <div class="sidebar-stat-row"><span>${topicEmoji(id)} ${topicLabel(id)}</span><span class="val">${counts[id]}</span></div>`).join('')}
  </div>
</aside>`;
}

// ── TOOLBAR ───────────────────────────────────────────
function buildMainToolbar(){
  return`<div class="main-toolbar">
  <label style="font-size:.85rem;color:var(--text-secondary);font-weight:600;white-space:nowrap;display:flex;align-items:center;gap:8px;">${t('sortLabel')}
    <select class="sort-select" data-action="sort">
      <option value="newest"${STATE.sort==='newest'?' selected':''}>${t('sortNewest')}</option>
      <option value="oldest"${STATE.sort==='oldest'?' selected':''}>${t('sortOldest')}</option>
      <option value="az"${STATE.sort==='az'?' selected':''}>${t('sortAZ')}</option>
    </select>
  </label>
  <button class="btn btn-primary" data-action="create">${t('createBtn')}</button>
</div>`;
}

// ── EMPTY STATE ───────────────────────────────────────
function buildEmptyState(){
  if(STATE.showFavoritesOnly){
    return`<div class="empty"><div class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg></div><h3>No favorites yet</h3><p>Bookmark articles to quickly access them later. Click the bookmark icon on any article to add it to your favorites.</p></div>`;
  }
  if(STATE.search.trim()){
    return`<div class="empty"><div class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg></div><h3>No results found</h3><p>Try different keywords or check your spelling. You can also browse by topic using the sidebar.</p></div>`;
  }
  if(STATE.activeTopic){
    return`<div class="empty"><div class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg></div><h3>No articles in this topic</h3><p>There are no articles for ${topicLabel(STATE.activeTopic)} yet. Check back later or browse other topics.</p></div>`;
  }
  return`<div class="empty"><div class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg></div><h3>No articles yet</h3><p>Get started by creating your first health article. Click the "Create Article" button to begin.</p></div>`;
}

// ── GRID & CARDS ──────────────────────────────────────
function buildGrid(articles){return`<div class="articles-grid">${articles.map(buildCard).join('')}</div>`;}

function buildCard(a){
  const s=topicStyle(a.topic);const resolved=resolveArticle(a,STATE.lang);
  const lb=STATE.lang!=='en'?(resolved.isTranslated?`<span class="lang-badge translated"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> ${LANGS.find(l=>l.code===STATE.lang)?.label}</span>`:`<span class="lang-badge fallback">EN</span>`):'';
  const isFav=STATE.favorites.includes(a.id);
  const bannerContent=a.image 
    ? `<div class="card-image-container"><img class="card-image" src="${a.image}" alt="${esc(resolved.title)}" onerror="this.style.display='none'; this.parentElement.style.height='6px'; this.parentElement.style.background='${s.color}'"/></div>`
    : `<div class="card-banner" style="background:${s.color}"></div>`;
  return`<div class="article-card" data-action="read" data-id="${a.id}" tabindex="0">
  ${bannerContent}
  <div class="card-body">
    <div style="display:flex;align-items:center;flex-wrap:wrap;gap:4px;margin-bottom:10px;">
      <div class="card-topic" style="background:${s.bg};color:${s.color};margin-bottom:0">${topicEmoji(a.topic)} ${topicLabel(a.topic)}</div>${lb}
    </div>
    <div class="card-title">${esc(resolved.title)}</div>
    <div class="card-excerpt">${esc(resolved.excerpt)}</div>
  </div>
  <div class="card-meta">
    <span class="card-date"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> ${fmtDate(a.date)}</span>
    <div class="card-actions">
      <button class="icon-btn bookmark${isFav?' active':''}" data-action="toggle-favorite" data-id="${a.id}" title="${isFav?'Remove from favorites':'Add to favorites'}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="${isFav?'currentColor':'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg></button>
      <button class="icon-btn edit" data-action="edit" data-id="${a.id}" title="${t('editBtn')}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
      <button class="icon-btn del" data-action="confirmdelete" data-id="${a.id}" title="${t('deleteBtn')}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
    </div>
  </div>
</div>`;
}

// ── TOASTS ────────────────────────────────────────────
function buildToasts(){
  if(!STATE.toasts.length)return'';
  return`<div class="toast-container">${STATE.toasts.map(toast=>`<div class="toast${toast.type==='error'?' error':toast.type==='warning'?' warning':toast.type==='ai'?' ai':''}">${t(toast.msgKey)}</div>`).join('')}</div>`;
}

function buildFooter(){
  return`<footer class="footer"><strong>HealthPulse SL</strong> — ${t('footerSystem')} &nbsp;|&nbsp; ${t('footerLicense')} <a href="#">${t('footerMIT')}</a> &nbsp;|&nbsp; ${t('footerAligned')} <strong>${t('footerSDG')}</strong><br/><small>${t('footerPrivacy')} &copy; ${t('footerCopyright')} ${new Date().getFullYear()}</small></footer>`;
}

// ── HEALTHBOT ─────────────────────────────────────────
function buildHealthBot(){
  const open=STATE.botOpen;
  const msgs=STATE.botMessages;
  const suggesions=[t('botSugg1'),t('botSugg2'),t('botSugg3'),t('botSugg4')];
  return`
<button class="healthbot-fab" data-action="toggle-bot" aria-label="${t('botName')}">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg><span class="fab-badge">AI</span>
</button>
<div class="healthbot-panel${open?'':' hidden'}" id="healthbot-panel">
  <div class="healthbot-head">
    <div class="healthbot-head-info">
      <div class="healthbot-avatar"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg></div>
      <div><h3>${t('botName')}</h3><p>${t('botTagline')}</p></div>
    </div>
    <button class="healthbot-close" data-action="toggle-bot"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
  </div>
  <div class="healthbot-messages" id="bot-messages">
    ${msgs.map(m=>m.role==='bot'
      ?`<div class="bot-msg"><div class="avatar"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg></div><div class="bot-bubble">${esc(m.text)}</div></div>`
      :`<div class="bot-msg user-msg"><div class="user-bubble">${esc(m.text)}</div></div>`
    ).join('')}
    ${STATE.botTyping?`<div class="bot-msg"><div class="avatar"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg></div><div class="bot-typing"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div></div>`:''}
  </div>
  ${msgs.length<=1?`<div class="healthbot-suggestions">${suggesions.map(s=>`<button class="suggestion-chip" data-action="bot-sugg" data-text="${esc(s)}">${esc(s)}</button>`).join('')}</div>`:''}
  <div class="healthbot-footer">
    <input class="healthbot-input" id="bot-input" type="text" placeholder="${t('botPh')}" autocomplete="off"/>
    <button class="healthbot-send" data-action="bot-send"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button>
  </div>
</div>`;
}

// ── MODALS ────────────────────────────────────────────
function buildModal(){
  const m=STATE.modal;
  if(m.type==='create')return buildFormModal(null);
  if(m.type==='edit'){const a=STATE.articles.find(x=>x.id===m.id);return buildFormModal(a);}
  if(m.type==='read'){const a=STATE.articles.find(x=>x.id===m.id);return buildReadModal(a);}
  if(m.type==='delete'){const a=STATE.articles.find(x=>x.id===m.id);return buildDeleteModal(a);}
  return'';
}

// ── FORM MODAL WITH AI WRITER ─────────────────────────
function buildFormModal(article){
  const isEdit=!!article;const tp=article?article.topic:'malaria';
  const genNotice=STATE.aiGenerating?`<div class="ai-generating"><span class="spinner"></span>${t('aiGenerating')}</div>`:'';
  const tagsSugg=STATE.aiTagSuggestions.length
    ?`<div class="ai-tags-row">${STATE.aiTagSuggestions.map(tag=>`<button type="button" class="ai-tag-pill" data-action="add-tag" data-tag="${esc(tag)}">${esc(tag)}</button>`).join('')}</div>`:'';

  return`<div class="modal-bg" data-action="closebg">
  <div class="modal" style="max-width:680px" onclick="event.stopPropagation()">
    <div class="modal-head"><h2>${isEdit?'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> '+t('formEditTitle'):'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> '+t('formCreateTitle')}</h2>
      <button class="modal-close" data-action="close"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>
    <div class="modal-body">
      <!-- AI WRITER PANEL -->
      <div class="ai-form-bar">
        <div class="ai-form-bar-title"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg> ${t('aiFormTitle')}</div>
        <div class="ai-form-row">
          <input id="ai-prompt-input" type="text" placeholder="${t('aiFormPh')}" autocomplete="off"/>
          <button type="button" class="btn btn-ai btn-sm${STATE.aiGenerating?' loading':''}" data-action="ai-generate">
            ${STATE.aiGenerating?`<span class="spinner white"></span>`:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>'}
            ${t('aiFormBtn')}
          </button>
        </div>
        ${genNotice}
        <div id="ai-gen-notice" style="font-size:.8rem;margin-top:6px;min-height:18px;"></div>
      </div>
      <!-- FORM -->
      <form id="article-form" novalidate>
        <div class="form-group">
          <label for="f-title">${t('fieldTitle')} <span class="required">*</span></label>
          <input id="f-title" name="title" type="text" maxlength="120" required placeholder="${t('phTitle')}" value="${article?esc(article.title):''}" autocomplete="off"/>
          <div class="char-count" id="title-count">${article?article.title.length:0}/120</div>
          <div class="validation-error" id="title-error">Title is required</div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="f-topic">${t('fieldTopic')} <span class="required">*</span></label>
            <select id="f-topic" name="topic">${TOPIC_IDS.map(id=>`<option value="${id}"${tp===id?' selected':''}>${topicEmoji(id)} ${topicLabel(id)}</option>`).join('')}</select>
            <div class="validation-error" id="topic-error">Please select a topic</div>
          </div>
          <div class="form-group">
            <label for="f-author">${t('fieldAuthor')}</label>
            <input id="f-author" name="author" type="text" placeholder="${t('phAuthor')}" value="${article?esc(article.author||''):''}"/>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="f-lang">${t('fieldLang')}</label>
            <select id="f-lang" name="lang">${LANGS.map(l=>`<option value="${l.code}"${(article?article.lang:STATE.lang)===l.code?' selected':''}>${l.label}</option>`).join('')}</select>
          </div>
          <div class="form-group">
            <label for="f-tags">${t('fieldTags')} <button type="button" class="btn btn-ai-outline btn-sm" data-action="ai-tags" style="margin-left:8px;padding:2px 8px;font-size:.72rem;"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg> AI</button></label>
            <input id="f-tags" name="tags" type="text" placeholder="${t('phTags')}" value="${article?esc((article.tags||[]).join(', ')):''}"/>
            ${tagsSugg}
          </div>
        </div>
        <div class="form-group">
          <label for="f-excerpt">${t('fieldExcerpt')} <span class="required">*</span></label>
          <textarea id="f-excerpt" name="excerpt" rows="2" maxlength="280" required placeholder="${t('phExcerpt')}">${article?esc(article.excerpt):''}</textarea>
          <div class="char-count" id="excerpt-count">${article?article.excerpt.length:0}/280</div>
          <div class="validation-error" id="excerpt-error">Excerpt is required</div>
        </div>
        <div class="form-group">
          <label for="f-image">Illustration Image URL</label>
          <input id="f-image" name="image" type="url" placeholder="Optional. e.g. https://images.unsplash.com/..." value="${article?esc(article.image||''):''}"/>
        </div>
        <div class="form-group">
          <label for="f-body">${t('fieldBody')} <span class="required">*</span></label>
          <textarea id="f-body" name="body" rows="8" required placeholder="${t('phBody')}">${article?esc(article.body):''}</textarea>
          <div class="validation-error" id="body-error">Article body is required</div>
        </div>
        <div class="form-footer">
          <button type="button" class="btn btn-ghost" data-action="close">${t('cancelBtn')}</button>
          <button type="submit" class="btn btn-primary">${isEdit?'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg> '+t('updateBtn'):'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> '+t('saveBtn')}</button>
        </div>
      </form>
    </div>
  </div>
</div>`;
}

// ── READ MODAL WITH AI TOOLS ──────────────────────────
function buildReadModal(a){
  if(!a)return'';
  const s=topicStyle(a.topic);const resolved=resolveArticle(a,STATE.lang);
  const bodyHtml=nl2p(resolved.body);
  const langName=LANGS.find(l=>l.code===a.lang)?.label||a.lang;
  const curLangName=LANGS.find(l=>l.code===STATE.lang)?.label||STATE.lang;
  const fallback=resolved.isFallback?`<div class="fallback-notice"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> ${t('fallbackNotice').replace('{lang}',curLangName)}</div>`:'';

  // AI Summary section
  const summarySection=STATE.aiSummary?.articleId===a.id
    ?`<div class="ai-summary-box">
        <div class="ai-summary-head"><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a9 9 0 0 0-9 9v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 1 4 0v4a2 2 0 0 0 2 2h4c1.1 0 2-.9 2-2v-7a9 9 0 0 0-9-9z"/></svg> ${t('aiSummaryTitle')}</span></div>
        ${STATE.aiSummary.loading
          ?`<div style="display:flex;align-items:center;gap:8px;color:var(--ai);font-size:.85rem;"><span class="spinner"></span> Summarizing…</div>`
          :`<div class="ai-summary-text">${nl2p(STATE.aiSummary.text)}</div>`}
      </div>`:'';

  // AI Translation section
  const transSection=STATE.aiTranslation?.articleId===a.id
    ?`<div class="ai-translate-box">
        <div class="ai-translate-head"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> ${t('aiTranslateTitle')} — ${LANGS.find(l=>l.code===STATE.aiTranslation.lang)?.label||''}</div>
        ${STATE.aiTranslation.loading
          ?`<div style="display:flex;align-items:center;gap:8px;color:var(--green-mid);font-size:.85rem;"><span class="spinner"></span> ${t('aiTranslating')}</div>`
          :`<div class="ai-translate-body">${nl2p(STATE.aiTranslation.text)}</div>`}
      </div>`:'';

  // Translate buttons (show for langs without built-in translation)
  const otherLangs=LANGS.filter(l=>l.code!=='en'&&l.code!==STATE.lang&&!ARTICLE_TRANSLATIONS[a.id]?.[l.code]);
  const transButtons=otherLangs.length
    ?`<div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px;">
        <span style="font-size:.75rem;color:var(--muted);font-weight:600;align-self:center;">AI Translate:</span>
        ${otherLangs.map(l=>`<button class="btn btn-ai-outline btn-sm" data-action="ai-translate" data-id="${a.id}" data-lang="${l.code}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> ${l.label}</button>`).join('')}
      </div>`:'';

  const bannerContent=a.image 
    ? `<div class="read-image-container"><img class="read-image" src="${a.image}" alt="${esc(resolved.title)}" onerror="this.style.display='none'; this.parentElement.style.height='6px'; this.parentElement.style.background='${s.color}'"/></div>`
    : `<div class="read-banner" style="background:${s.color}"></div>`;

  return`<div class="modal-bg" data-action="closebg">
  <div class="modal" onclick="event.stopPropagation()" style="max-width:720px">
    <div class="modal-head" style="background:${s.color}">
      <h2>${topicEmoji(a.topic)} ${topicLabel(a.topic)}</h2>
      <button class="modal-close" data-action="close"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
    </div>
    <div class="modal-body read">
      ${bannerContent}
      <div class="read-content">
        ${fallback}
        <div class="read-topic" style="background:${s.bg};color:${s.color}">${topicEmoji(a.topic)} ${topicLabel(a.topic)}</div>
        <div class="read-title">${esc(resolved.title)}</div>
        <div class="read-meta">
          <span><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> ${t('metaDate')}: ${fmtDate(a.date)}</span>
          ${a.author?`<span><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg> ${t('metaAuthor')}: ${esc(a.author)}</span>`:''}
          <span><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> ${resolved.isTranslated&&STATE.lang!=='en'?curLangName:langName}</span>
          ${resolved.isTranslated&&STATE.lang!=='en'?`<span class="lang-badge translated"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> ${curLangName}</span>`:''}
        </div>
        <div class="read-body">${bodyHtml}</div>
        ${summarySection}
        ${transSection}
        ${transButtons}
        ${a.tags?.length?`<div class="read-tags">${a.tags.map(tag=>`<span class="tag-pill">#${esc(tag)}</span>`).join('')}</div>`:''}
      </div>
      <div class="read-footer">
        <button class="btn btn-ghost btn-sm" data-action="close">${t('cancelBtn')}</button>
        <button class="btn btn-ai-outline btn-sm" data-action="ai-summarize" data-id="${a.id}">${t('aiSummaryBtn')}</button>
        <button class="btn btn-amber btn-sm" data-action="edit" data-id="${a.id}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> ${t('editBtn')}</button>
        <button class="btn btn-danger btn-sm" data-action="confirmdelete" data-id="${a.id}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> ${t('deleteBtn')}</button>
      </div>
    </div>
  </div>
</div>`;
}

// ── DELETE MODAL ──────────────────────────────────────
function buildDeleteModal(a){
  if(!a)return'';const resolved=resolveArticle(a,STATE.lang);
  return`<div class="modal-bg" data-action="closebg">
  <div class="modal confirm-modal" onclick="event.stopPropagation()">
    <div class="modal-head" style="background:var(--red)"><h2><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> ${t('confirmDel')}</h2>
      <button class="modal-close" data-action="close"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>
    <div class="confirm-body"><div class="warn-icon"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></div><h3>"${esc(resolved.title)}"</h3><p>${t('confirmMsg')}</p></div>
    <div class="confirm-footer">
      <button class="btn btn-ghost" data-action="close">${t('cancelBtn')}</button>
      <button class="btn btn-danger" data-action="delete" data-id="${a.id}">${t('confirmYes')}</button>
    </div>
  </div>
</div>`;
}

// ═══════════════════════════════════════════════════════
//  EVENTS
// ═══════════════════════════════════════════════════════
function attachEvents(){
  // General data-action delegation
  document.querySelectorAll('[data-action]').forEach(el=>{
    const action=el.dataset.action;
    if(action==='search'){el.addEventListener('input',e=>{STATE.search=e.target.value;render();});return;}
    if(action==='sort'){el.addEventListener('change',e=>{STATE.sort=e.target.value;render();});return;}
    el.addEventListener('click',e=>{e.stopPropagation();handleAction(action,el.dataset,el);});
    if(el.classList.contains('article-card')){
      el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();handleAction(action,el.dataset,el);}});
    }
  });

  // Article form
  const form=document.getElementById('article-form');
  if(form){
    // Real-time validation
    const validateField=(input,errorId,validator)=>{
      const errorEl=document.getElementById(errorId);
      const isValid=validator(input.value);
      if(!isValid){
        input.classList.add('invalid');
        input.classList.remove('valid');
        if(errorEl)errorEl.classList.add('show');
      }else{
        input.classList.remove('invalid');
        input.classList.add('valid');
        if(errorEl)errorEl.classList.remove('show');
      }
      return isValid;
    };

    const titleInput=form.querySelector('#f-title');
    const topicSelect=form.querySelector('#f-topic');
    const excerptTA=form.querySelector('#f-excerpt');
    const bodyTA=form.querySelector('#f-body');
    const titleCount=document.getElementById('title-count');
    const excerptCount=document.getElementById('excerpt-count');

    // Title validation
    if(titleInput){
      titleInput.addEventListener('input',()=>{
        titleCount.textContent=titleInput.value.length+'/120';
        if(titleInput.value.length>=100)titleCount.classList.add('warning');
        else titleCount.classList.remove('warning');
        if(titleInput.value.length===120)titleCount.classList.add('error');
        else titleCount.classList.remove('error');
        validateField(titleInput,'title-error',v=>v.trim().length>0);
      });
    }

    // Topic validation
    if(topicSelect){
      topicSelect.addEventListener('change',()=>{
        validateField(topicSelect,'topic-error',v=>v.trim().length>0);
      });
    }

    // Excerpt validation
    if(excerptTA){
      excerptTA.addEventListener('input',()=>{
        excerptCount.textContent=excerptTA.value.length+'/280';
        if(excerptTA.value.length>=250)excerptCount.classList.add('warning');
        else excerptCount.classList.remove('warning');
        if(excerptTA.value.length===280)excerptCount.classList.add('error');
        else excerptCount.classList.remove('error');
        validateField(excerptTA,'excerpt-error',v=>v.trim().length>0);
      });
    }

    // Body validation
    if(bodyTA){
      bodyTA.addEventListener('input',()=>{
        validateField(bodyTA,'body-error',v=>v.trim().length>0);
      });
    }

    form.addEventListener('submit',e=>{
      e.preventDefault();
      const fd=new FormData(form);
      const data={title:fd.get('title').trim(),topic:fd.get('topic'),author:fd.get('author').trim(),lang:fd.get('lang'),excerpt:fd.get('excerpt').trim(),body:fd.get('body').trim(),image:(fd.get('image')||'').trim(),tags:(fd.get('tags')||'').split(',').map(s=>s.trim()).filter(Boolean)};
      
      // Validate all fields
      const titleValid=validateField(titleInput,'title-error',v=>v.trim().length>0);
      const topicValid=validateField(topicSelect,'topic-error',v=>v.trim().length>0);
      const excerptValid=validateField(excerptTA,'excerpt-error',v=>v.trim().length>0);
      const bodyValid=validateField(bodyTA,'body-error',v=>v.trim().length>0);
      
      if(!titleValid||!topicValid||!excerptValid||!bodyValid){
        const id=++toastCounter;STATE.toasts=[...STATE.toasts,{id,msgKey:'validRequired',type:'error'}];render();setTimeout(()=>{STATE.toasts=STATE.toasts.filter(x=>x.id!==id);render();},3200);return;
      }
      if(STATE.modal?.type==='edit')updateArticle(STATE.modal.id,data);else createArticle(data);
    });
  }

  // HealthBot input
  const botInput=document.getElementById('bot-input');
  if(botInput){
    botInput.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();botSendMessage(botInput.value);botInput.value='';}});
    if(STATE.botOpen)setTimeout(()=>botInput.focus(),100);
  }

  // Keyboard shortcuts
  document.addEventListener('keydown',e=>{
    // Ignore if in input/textarea
    if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA'||e.target.tagName==='SELECT')return;
    
    const isMac=navigator.platform.toUpperCase().indexOf('MAC')>=0;
    const modifier=isMac?e.metaKey:e.ctrlKey;
    
    if(modifier){
      if(e.key==='k'){
        e.preventDefault();
        const searchInput=document.querySelector('input[type="search"]');
        if(searchInput)searchInput.focus();
      }
      if(e.key==='n'){
        e.preventDefault();
        handleAction('create',{},null);
      }
      if(e.key==='b'){
        e.preventDefault();
        handleAction('toggle-favorites-filter',{},null);
      }
      if(e.key==='d'){
        e.preventDefault();
        handleAction('toggle-darkmode',{},null);
      }
    }
    if(e.key==='Escape'){
      if(STATE.modal)handleAction('close',{},null);
      if(STATE.botOpen)handleAction('toggle-bot',{},null);
    }
  });
}

async function handleAction(action,data,el){
  // Language / filter / sort / nav
  if(action==='setlang'){STATE.lang=data.lang;STATE.aiSummary=null;STATE.aiTranslation=null;STATE.mobileMenuOpen=false;render();return;}
  if(action==='toggle-darkmode'){STATE.darkMode=!STATE.darkMode;localStorage.setItem('healthpulse-darkmode',STATE.darkMode);render();return;}
  if(action==='toggle-mobile-menu'){STATE.mobileMenuOpen=!STATE.mobileMenuOpen;render();return;}
  if(action==='topic'){STATE.activeTopic=data.topic||null;STATE.mobileMenuOpen=false;render();return;}
  if(action==='toggle-favorites-filter'){STATE.showFavoritesOnly=!STATE.showFavoritesOnly;render();return;}
  if(action==='admin-logout'){
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    render();
    return;
  }
  if(action==='toggle-favorite'){
    const id=data.id;
    if(STATE.favorites.includes(id)){
      STATE.favorites=STATE.favorites.filter(f=>f!==id);
    }else{
      STATE.favorites=[...STATE.favorites,id];
    }
    localStorage.setItem('healthpulse-favorites',JSON.stringify(STATE.favorites));
    render();
    return;
  }
  if(action==='create'){STATE.modal={type:'create'};STATE.aiTagSuggestions=[];STATE.aiGenerating=false;STATE.mobileMenuOpen=false;render();return;}
  if(action==='read'){STATE.modal={type:'read',id:data.id};STATE.aiSummary=null;STATE.aiTranslation=null;STATE.mobileMenuOpen=false;render();return;}
  if(action==='edit'){STATE.modal={type:'edit',id:data.id};STATE.aiTagSuggestions=[];STATE.aiGenerating=false;STATE.mobileMenuOpen=false;render();return;}
  if(action==='confirmdelete'){STATE.modal={type:'delete',id:data.id};render();return;}
  if(action==='delete'){deleteArticle(data.id);return;}
  if(action==='close'||action==='closebg'){STATE.modal=null;render();return;}

  // Bot
  if(action==='toggle-bot'){
    STATE.botOpen=!STATE.botOpen;
    initBot();
    render();
    return;
  }
  if(action==='open-bot'){STATE.botOpen=true;initBot();render();return;}
  if(action==='bot-send'){
    const inp=document.getElementById('bot-input');
    if(inp){botSendMessage(inp.value);inp.value='';}
    return;
  }
  if(action==='bot-sugg'){botSendMessage(data.text);return;}

  // AI Generate Article
  if(action==='ai-generate'||action==='ai-sidebar-write'){
    if(action==='ai-sidebar-write'){STATE.modal={type:'create'};STATE.aiTagSuggestions=[];render();setTimeout(()=>document.getElementById('ai-prompt-input')?.focus(),200);return;}
    const prompt=document.getElementById('ai-prompt-input')?.value||'';
    const title=document.getElementById('f-title')?.value||'Health Article';
    const topic=document.getElementById('f-topic')?.value||'malaria';
    await aiGenerateArticle(topic,title,prompt);
    return;
  }

  // AI Tags
  if(action==='ai-tags'){
    const title=document.getElementById('f-title')?.value||'';
    const body=document.getElementById('f-body')?.value||'';
    await aiSuggestTags(title,body);
    return;
  }
  if(action==='add-tag'){
    const tagsInput=document.getElementById('f-tags');
    if(tagsInput){
      const existing=tagsInput.value.split(',').map(s=>s.trim()).filter(Boolean);
      if(!existing.includes(data.tag)){existing.push(data.tag);tagsInput.value=existing.join(', ');}
      STATE.aiTagSuggestions=STATE.aiTagSuggestions.filter(t=>t!==data.tag);
      render();
    }
    return;
  }

  // AI Summarize
  if(action==='ai-summarize'){await aiSummarizeArticle(data.id);return;}

  // AI Translate
  if(action==='ai-translate'){await aiTranslateArticle(data.id,data.lang);return;}
}

// Initialize app with data from API
async function init(){
  // Load dark mode preference
  STATE.darkMode=localStorage.getItem('healthpulse-darkmode')==='true';
  // Load favorites
  try{
    STATE.favorites=JSON.parse(localStorage.getItem('healthpulse-favorites')||'[]');
  }catch(e){
    STATE.favorites=[];
  }
  STATE.loading=true;
  STATE.loadingMessage='Loading articles...';
  render();
  try{
    STATE.articles=await loadArticles();
    STATE.loading=false;
    STATE.loadingMessage='';
    render();
  }catch(e){
    console.error('Failed to load articles from API, using seed data:',e);
    STATE.articles=[...SEED_ARTICLES];
    STATE.loading=false;
    STATE.loadingMessage='';
    render();
  }
}

init();
