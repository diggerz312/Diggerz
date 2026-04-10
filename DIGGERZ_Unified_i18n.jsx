import { useState, useEffect, useRef, useCallback, useMemo, createContext, useContext } from "react";
import { Shield, Eye, Gem, Crown, ChevronRight, ChevronLeft, Lock, Terminal, Database, Hexagon, Fingerprint, Scan, Activity, Zap, User, Users, ArrowRight, RotateCcw, Brain, Heart, Feather, Palette, Sparkles, Globe, Cpu, Layers, Aperture, Target, Compass, Anchor, Flame, Sun, Moon, Box, Play, Pause, Volume2, Radio, Star, MessageCircle, Send, ThumbsUp, Plus, Bell, X, Search, Pin, ChevronDown } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";

// ═══════════════════════════════════════════════════════════════
//  DIGGERZ SUBSTRATE OS v5 — UNIFIED i18n EDITION
//  Boot × 80Q×8lang × Passport5tab × Archives16 × Forum × Soul
//  🇫🇷 🇬🇧 🇪🇸 🇧🇷 🇨🇳 🇯🇵 🇸🇦 🇮🇳
// ═══════════════════════════════════════════════════════════════

const P={black:"#101820",gray:"#888B8D",ruby:"#C8102E",sable:"#A39382",ghost:"#F2F2F2",bgCard:"#182230",bgHov:"#1c2838",bgIn:"#0e1620",border:"#243040",borderAct:"#344860",textDim:"#4a5868",textGhost:"#2a3644",emerald:"#2dd4a0",violet:"#8b5cf6",amber:"#d4a02d",cyan:"#22d3ee",mono:"'IBM Plex Mono',monospace"};
const Ctx=createContext();
const sn=()=>Array.from({length:6},()=>"0123456789ABCDEF"[Math.floor(Math.random()*16)]).join("");
const nx=()=>"░▒▓█▄▀│┤╡╣".split("").sort(()=>Math.random()-0.5).slice(0,3).join("");
const ago=m=>m<1?"now":m<60?`${m}m`:m<1440?`${Math.floor(m/60)}h`:`${Math.floor(m/1440)}d`;

// ═══ LANGUAGES ═══
const LANGS=[{c:"FR",l:"Français",f:"🇫🇷"},{c:"EN",l:"English",f:"🇬🇧"},{c:"ES",l:"Español",f:"🇪🇸"},{c:"PT",l:"Português",f:"🇧🇷"},{c:"ZH",l:"中文",f:"🇨🇳"},{c:"JA",l:"日本語",f:"🇯🇵"},{c:"AR",l:"العربية",f:"🇸🇦",rtl:true},{c:"HI",l:"हिन्दी",f:"🇮🇳"}];

// ═══ i18n STRINGS ═══
const T={
nav_home:{FR:"SUBSTRATE",EN:"SUBSTRATE",ES:"SUSTRATO",PT:"SUBSTRATO",ZH:"基底层",JA:"基盤",AR:"الركيزة",HI:"सबस्ट्रेट"},
nav_test:{FR:"TERMINAL",EN:"TERMINAL",ES:"TERMINAL",PT:"TERMINAL",ZH:"终端",JA:"ターミナル",AR:"المحطة",HI:"टर्मिनल"},
nav_arch:{FR:"ARCHIVES",EN:"ARCHIVES",ES:"ARCHIVOS",PT:"ARQUIVOS",ZH:"档案库",JA:"アーカイブ",AR:"الأرشيف",HI:"अभिलेखागार"},
nav_net:{FR:"RÉSEAU",EN:"NETWORK",ES:"RED",PT:"REDE",ZH:"网络",JA:"ネットワーク",AR:"الشبكة",HI:"नेटवर्क"},
nav_soul:{FR:"LOUNGE",EN:"LOUNGE",ES:"LOUNGE",PT:"LOUNGE",ZH:"灵魂空间",JA:"ラウンジ",AR:"الصالة",HI:"लाउंज"},
mc:{FR:"CONFIANCE MÉCANIQUE",EN:"MECHANICAL CONFIDENCE",ES:"CONFIANZA MECÁNICA",PT:"CONFIANÇA MECÂNICA",ZH:"机械自信",JA:"メカニカル・コンフィデンス",AR:"الثقة الميكانيكية",HI:"यांत्रिक आत्मविश्वास"},
nrw:{FR:"NEURO-REGULATING WEAR",EN:"NEURO-REGULATING WEAR",ES:"ROPA NEURO-REGULADORA",PT:"VESTUÁRIO NEURO-REGULADOR",ZH:"神经调节服饰",JA:"ニューロレギュレーティングウェア",AR:"ملابس تنظيم الأعصاب",HI:"न्यूरो-रेगुलेटिंग वेयर"},
desc:{FR:"Le vêtement comme interface cognitive. 80Q × 16 archétypes avec prescriptions matières et neuroscience.",EN:"Clothing as a cognitive interface. 80Q × 16 archetypes with material prescriptions and neuroscience.",ES:"La ropa como interfaz cognitiva. 80Q × 16 arquetipos con prescripciones de materiales.",PT:"A roupa como interface cognitiva. 80Q × 16 arquétipos com prescrições de materiais.",ZH:"服装作为认知接口。80题 × 16种原型，含面料处方与神经科学。",JA:"衣服を認知インターフェースとして。80問 × 16アーキタイプ。",AR:"الملابس كواجهة معرفية. 80 سؤال × 16 نموذج مع وصفات المواد.",HI:"कपड़े एक संज्ञानात्मक इंटरफेस। 80प्र × 16 मूलरूप सामग्री नुस्खे के साथ।"},
formula:{FR:"Sens Symbolique + Expérience Physique = Changement Cognitif",EN:"Symbolic Meaning + Physical Experience = Cognitive Change",ES:"Significado Simbólico + Experiencia Física = Cambio Cognitivo",PT:"Significado Simbólico + Experiência Física = Mudança Cognitiva",ZH:"象征意义 + 身体体验 = 认知改变",JA:"象徴的意味 + 身体的経験 = 認知変化",AR:"المعنى الرمزي + التجربة الجسدية = التغيير المعرفي",HI:"प्रतीकात्मक अर्थ + शारीरिक अनुभव = संज्ञानात्मक परिवर्तन"},
go:{FR:"INITIATION →",EN:"INITIATION →",ES:"INICIACIÓN →",PT:"INICIAÇÃO →",ZH:"启动 →",JA:"開始 →",AR:"← بدء",HI:"दीक्षा →"},
q:{FR:"QUESTIONS",EN:"QUESTIONS",ES:"PREGUNTAS",PT:"PERGUNTAS",ZH:"问题",JA:"質問",AR:"أسئلة",HI:"प्रश्न"},
ar:{FR:"ARCHÉTYPES",EN:"ARCHETYPES",ES:"ARQUETIPOS",PT:"ARQUÉTIPOS",ZH:"原型",JA:"アーキタイプ",AR:"أنماط",HI:"मूलरूप"},
ax:{FR:"AXES",EN:"AXES",ES:"EJES",PT:"EIXOS",ZH:"轴",JA:"軸",AR:"محاور",HI:"अक्ष"},
co:{FR:"COHORTE",EN:"COHORT",ES:"COHORTE",PT:"COORTE",ZH:"队列",JA:"コホート",AR:"مجموعة",HI:"समूह"},
tt:{FR:"Test Neuro-Design",EN:"Neuro-Design Test",ES:"Test Neuro-Diseño",PT:"Teste Neuro-Design",ZH:"神经设计测试",JA:"ニューロデザインテスト",AR:"اختبار التصميم العصبي",HI:"न्यूरो-डिज़ाइन परीक्षण"},
ts:{FR:"80 SÉQUENCES — 4 TERMINAUX",EN:"80 SEQUENCES — 4 TERMINALS",ES:"80 SECUENCIAS — 4 TERMINALES",PT:"80 SEQUÊNCIAS — 4 TERMINAIS",ZH:"80序列 — 4终端",JA:"80シーケンス — 4ターミナル",AR:"80 تسلسل — 4 محطات",HI:"80 अनुक्रम — 4 टर्मिनल"},
td:{FR:"Likert 1-5 × 4 axes → 1 archétype parmi 16.",EN:"Likert 1-5 × 4 axes → 1 of 16 archetypes.",ES:"Likert 1-5 × 4 ejes → 1 de 16 arquetipos.",PT:"Likert 1-5 × 4 eixos → 1 de 16 arquétipos.",ZH:"李克特1-5 × 4轴 → 16中取1。",JA:"リッカート1-5 × 4軸 → 16中1つ。",AR:"ليكرت 1-5 × 4 محاور → 1 من 16.",HI:"लिकर्ट 1-5 × 4 अक्ष → 16 में से 1।"},
la:{FR:"LANCER →",EN:"LAUNCH →",ES:"LANZAR →",PT:"INICIAR →",ZH:"启动 →",JA:"開始 →",AR:"← إطلاق",HI:"लॉन्च →"},
nx:{FR:"SUIVANT",EN:"NEXT",ES:"SIGUIENTE",PT:"PRÓXIMO",ZH:"下一题",JA:"次へ",AR:"التالي",HI:"अगला"},
bk:{FR:"RETOUR",EN:"BACK",ES:"ATRÁS",PT:"VOLTAR",ZH:"返回",JA:"戻る",AR:"رجوع",HI:"वापस"},
an:{FR:"ANALYSER",EN:"ANALYZE",ES:"ANALIZAR",PT:"ANALISAR",ZH:"分析",JA:"分析",AR:"تحليل",HI:"विश्लेषण"},
no:{FR:"NON",EN:"NO",ES:"NO",PT:"NÃO",ZH:"否",JA:"いいえ",AR:"لا",HI:"नहीं"},
ye:{FR:"OUI",EN:"YES",ES:"SÍ",PT:"SIM",ZH:"是",JA:"はい",AR:"نعم",HI:"हाँ"},
cp:{FR:"COMPUTING",EN:"COMPUTING",ES:"CALCULANDO",PT:"CALCULANDO",ZH:"计算中",JA:"計算中",AR:"حساب",HI:"गणना"},
dp:{FR:"PASSEPORT",EN:"PASSPORT",ES:"PASAPORTE",PT:"PASSAPORTE",ZH:"护照",JA:"パスポート",AR:"جواز",HI:"पासपोर्ट"},
pf:{FR:"PROFIL",EN:"PROFILE",ES:"PERFIL",PT:"PERFIL",ZH:"档案",JA:"プロフィール",AR:"ملف",HI:"प्रोफ़ाइल"},
ne:{FR:"NEURO",EN:"NEURO",ES:"NEURO",PT:"NEURO",ZH:"神经",JA:"ニューロ",AR:"عصبي",HI:"न्यूरो"},
ma:{FR:"MATIÈRES",EN:"MATERIALS",ES:"MATERIALES",PT:"MATERIAIS",ZH:"面料",JA:"素材",AR:"مواد",HI:"सामग्री"},
ga:{FR:"VÊTEMENT",EN:"GARMENT",ES:"PRENDA",PT:"VESTUÁRIO",ZH:"服装",JA:"ガーメント",AR:"ملابس",HI:"वस्त्र"},
sl:{FR:"SOUL",EN:"SOUL",ES:"ALMA",PT:"ALMA",ZH:"灵魂",JA:"ソウル",AR:"روح",HI:"आत्मा"},
ch:{FR:"CHARGE",EN:"LOAD",ES:"CARGA",PT:"CARGA",ZH:"重量",JA:"荷重",AR:"حمل",HI:"भार"},
re:{FR:"RÉS.",EN:"RES.",ES:"RES.",PT:"RES.",ZH:"共振",JA:"共鳴",AR:"رنين",HI:"अनुनाद"},
pc:{FR:"PIÈCE",EN:"PIECE",ES:"PIEZA",PT:"PEÇA",ZH:"单品",JA:"アイテム",AR:"قطعة",HI:"वस्तु"},
tr:{FR:"TRAJECTOIRE",EN:"TRAJECTORY",ES:"TRAYECTORIA",PT:"TRAJETÓRIA",ZH:"轨迹",JA:"軌跡",AR:"مسار",HI:"प्रक्षेपवक्र"},
sv:{FR:"SURVEY (n=33)",EN:"SURVEY (n=33)",ES:"ENCUESTA (n=33)",PT:"PESQUISA (n=33)",ZH:"调查(n=33)",JA:"調査(n=33)",AR:"استطلاع(n=33)",HI:"सर्वेक्षण(n=33)"},
ni:{FR:"NEURO-IMPACT",EN:"NEURO-IMPACT",ES:"NEURO-IMPACTO",PT:"NEURO-IMPACTO",ZH:"神经影响",JA:"ニューロインパクト",AR:"تأثير عصبي",HI:"न्यूरो-प्रभाव"},
pt_lbl:{FR:"PHARMACOPÉE TEXTILE",EN:"TEXTILE PHARMACOPOEIA",ES:"FARMACOPEA TEXTIL",PT:"FARMACOPÉIA TÊXTIL",ZH:"纺织药典",JA:"テキスタイル薬局方",AR:"دستور أدوية نسيجي",HI:"वस्त्र फार्माकोपिया"},
p1:{FR:"PRIMAIRE",EN:"PRIMARY",ES:"PRIMARIO",PT:"PRIMÁRIO",ZH:"主要",JA:"プライマリ",AR:"أساسي",HI:"प्राथमिक"},
p2:{FR:"SECONDAIRE",EN:"SECONDARY",ES:"SECUNDARIO",PT:"SECUNDÁRIO",ZH:"次要",JA:"セカンダリ",AR:"ثانوي",HI:"द्वितीयक"},
p3:{FR:"TERTIAIRE",EN:"TERTIARY",ES:"TERCIARIO",PT:"TERCIÁRIO",ZH:"第三",JA:"ターシャリ",AR:"ثالث",HI:"तृतीयक"},
cr:{FR:"PSYCHOLOGIE CHROMATIQUE",EN:"CHROMATIC PSYCHOLOGY",ES:"PSICOLOGÍA CROMÁTICA",PT:"PSICOLOGIA CROMÁTICA",ZH:"色彩心理学",JA:"色彩心理学",AR:"علم نفس لوني",HI:"वर्णिक मनोविज्ञान"},
pp:{FR:"PIÈCE PRESCRITE",EN:"PRESCRIBED PIECE",ES:"PIEZA PRESCRITA",PT:"PEÇA PRESCRITA",ZH:"推荐单品",JA:"処方アイテム",AR:"قطعة موصوفة",HI:"निर्धारित वस्तु"},
si:{FR:"SILHOUETTE",EN:"SILHOUETTE",ES:"SILUETA",PT:"SILHUETA",ZH:"轮廓",JA:"シルエット",AR:"صورة ظلية",HI:"सिल्हूट"},
sr_lbl:{FR:"RÔLE SOUL LOUNGE",EN:"SOUL LOUNGE ROLE",ES:"ROL SOUL LOUNGE",PT:"PAPEL SOUL LOUNGE",ZH:"灵魂空间角色",JA:"ソウルラウンジの役割",AR:"دور صالة الروح",HI:"सोल लाउंज भूमिका"},
rc:{FR:"RE-CALIBRER",EN:"RE-CALIBRATE",ES:"RE-CALIBRAR",PT:"RE-CALIBRAR",ZH:"重新校准",JA:"再校正",AR:"إعادة معايرة",HI:"पुन: अंशांकन"},
rx:{FR:"PRESCRIPTION TECHNIQUE",EN:"TECHNICAL PRESCRIPTION",ES:"PRESCRIPCIÓN TÉCNICA",PT:"PRESCRIÇÃO TÉCNICA",ZH:"技术处方",JA:"テクニカル処方",AR:"وصفة تقنية",HI:"तकनीकी नुस्खा"},
ad:{FR:"Profils complets. Cliquez pour détails.",EN:"Complete profiles. Click for details.",ES:"Perfiles completos. Clic para detalles.",PT:"Perfis completos. Clique para detalhes.",ZH:"完整档案。点击查看详情。",JA:"完全プロフィール。詳細はクリック。",AR:"ملفات كاملة. انقر للتفاصيل.",HI:"पूर्ण प्रोफ़ाइल। विवरण के लिए क्लिक करें।"},
al:{FR:"TOUS",EN:"ALL",ES:"TODOS",PT:"TODOS",ZH:"全部",JA:"すべて",AR:"الكل",HI:"सभी"},
ht:{FR:"Hub Communautaire",EN:"Community Hub",ES:"Centro Comunitario",PT:"Hub Comunitário",ZH:"社区中心",JA:"コミュニティハブ",AR:"مركز المجتمع",HI:"सामुदायिक केंद्र"},
nw:{FR:"NOUVEAU",EN:"NEW",ES:"NUEVO",PT:"NOVO",ZH:"发帖",JA:"新規",AR:"جديد",HI:"नया"},
se:{FR:"Rechercher...",EN:"Search...",ES:"Buscar...",PT:"Pesquisar...",ZH:"搜索...",JA:"検索...",AR:"...بحث",HI:"खोजें..."},
rp:{FR:"Répondre...",EN:"Reply...",ES:"Responder...",PT:"Responder...",ZH:"回复...",JA:"返信...",AR:"...رد",HI:"उत्तर..."},
sd:{FR:"ENVOYER",EN:"SEND",ES:"ENVIAR",PT:"ENVIAR",ZH:"发送",JA:"送信",AR:"إرسال",HI:"भेजें"},
pb:{FR:"PUBLIER",EN:"PUBLISH",ES:"PUBLICAR",PT:"PUBLICAR",ZH:"发布",JA:"投稿",AR:"نشر",HI:"प्रकाशित"},
ca:{FR:"ANNULER",EN:"CANCEL",ES:"CANCELAR",PT:"CANCELAR",ZH:"取消",JA:"キャンセル",AR:"إلغاء",HI:"रद्द"},
nf:{FR:"NOUVEAU FIL",EN:"NEW THREAD",ES:"NUEVO HILO",PT:"NOVO TÓPICO",ZH:"新主题",JA:"新規スレッド",AR:"موضوع جديد",HI:"नया धागा"},
ct:{FR:"CATÉGORIE",EN:"CATEGORY",ES:"CATEGORÍA",PT:"CATEGORIA",ZH:"分类",JA:"カテゴリ",AR:"فئة",HI:"श्रेणी"},
ti:{FR:"TITRE",EN:"TITLE",ES:"TÍTULO",PT:"TÍTULO",ZH:"标题",JA:"タイトル",AR:"عنوان",HI:"शीर्षक"},
cn:{FR:"CONTENU",EN:"CONTENT",ES:"CONTENIDO",PT:"CONTEÚDO",ZH:"内容",JA:"内容",AR:"محتوى",HI:"सामग्री"},
on:{FR:"EN LIGNE",EN:"ONLINE",ES:"EN LÍNEA",PT:"ONLINE",ZH:"在线",JA:"オンライン",AR:"متصل",HI:"ऑनलाइन"},
th:{FR:"FILS",EN:"THREADS",ES:"HILOS",PT:"TÓPICOS",ZH:"主题",JA:"スレッド",AR:"مواضيع",HI:"धागे"},
ac:{FR:"ACTIVITÉ",EN:"ACTIVITY",ES:"ACTIVIDAD",PT:"ATIVIDADE",ZH:"动态",JA:"アクティビティ",AR:"نشاط",HI:"गतिविधि"},
vo:{FR:"VOTE",EN:"VOTE",ES:"VOTO",PT:"VOTO",ZH:"投票",JA:"投票",AR:"تصويت",HI:"वोट"},
sc_lbl:{FR:"SOUL CHAT",EN:"SOUL CHAT",ES:"SOUL CHAT",PT:"SOUL CHAT",ZH:"灵魂聊天",JA:"ソウルチャット",AR:"محادثة الروح",HI:"सोल चैट"},
l3:{FR:"Lv3 requis",EN:"Lv3 required",ES:"Lv3 requerido",PT:"Lv3 necessário",ZH:"需要Lv3",JA:"Lv3必要",AR:"مطلوب Lv3",HI:"Lv3 आवश्यक"},
ss:{FR:"Espace Sacré",EN:"Sacred Space",ES:"Espacio Sagrado",PT:"Espaço Sagrado",ZH:"神圣空间",JA:"聖なる空間",AR:"المساحة المقدسة",HI:"पवित्र स्थान"},
ssd:{FR:"De \"paraître\" à la certitude de \"être\".",EN:"From \"appearing\" to the certainty of \"being\".",ES:"De \"parecer\" a la certeza de \"ser\".",PT:"De \"parecer\" à certeza de \"ser\".",ZH:"从\"表象\"到\"存在\"的确定性。",JA:"「見せかけ」から「存在」の確信へ。",AR:"من الظهور إلى يقين الكينونة.",HI:"\"दिखावे\" से \"होने\" की निश्चितता तक।"},
ph:{FR:"PHILOSOPHIE",EN:"PHILOSOPHY",ES:"FILOSOFÍA",PT:"FILOSOFIA",ZH:"哲学",JA:"哲学",AR:"فلسفة",HI:"दर्शन"},
tm1:{FR:"CHROMATIQUE",EN:"CHROMATIC",ES:"CROMÁTICO",PT:"CROMÁTICO",ZH:"色彩",JA:"クロマティック",AR:"لوني",HI:"वर्णिक"},
tm2:{FR:"MORPHOLOGIE",EN:"MORPHOLOGY",ES:"MORFOLOGÍA",PT:"MORFOLOGIA",ZH:"形态",JA:"モルフォロジー",AR:"التشكل",HI:"आकृतिविज्ञान"},
tm3:{FR:"MATIÈRE",EN:"MATERIAL",ES:"MATERIA",PT:"MATÉRIA",ZH:"材质",JA:"マテリアル",AR:"المادة",HI:"सामग्री"},
tm4:{FR:"SOUVERAINETÉ",EN:"SOVEREIGNTY",ES:"SOBERANÍA",PT:"SOBERANIA",ZH:"主权",JA:"ソブリンティ",AR:"سيادة",HI:"संप्रभुता"},
// Soul Lounge philosophy items
sp1t:{FR:"Écosystème Horizontal",EN:"Horizontal Ecosystem",ES:"Ecosistema Horizontal",PT:"Ecossistema Horizontal",ZH:"水平生态系统",JA:"水平エコシステム",AR:"نظام بيئي أفقي",HI:"क्षैतिज पारिस्थितिकी तंत्र"},
sp1d:{FR:"Connexion sur un plan d'égalité.",EN:"Connection on equal footing.",ES:"Conexión en igualdad.",PT:"Conexão em igualdade.",ZH:"平等连接。",JA:"対等な接続。",AR:"اتصال على قدم المساواة.",HI:"समानता पर संबंध।"},
sp2t:{FR:"Cocoon Enveloppant",EN:"Enveloping Cocoon",ES:"Capullo Envolvente",PT:"Casulo Envolvente",ZH:"包裹的茧",JA:"包み込む繭",AR:"شرنقة محيطة",HI:"आवृत कोकून"},
sp2d:{FR:"L'espace régule le système nerveux.",EN:"The space regulates the nervous system.",ES:"El espacio regula el sistema nervioso.",PT:"O espaço regula o sistema nervoso.",ZH:"空间调节神经系统。",JA:"空間が神経系を調整する。",AR:"المساحة تنظم الجهاز العصبي.",HI:"स्थान तंत्रिका तंत्र को नियंत्रित करता है।"},
sp3t:{FR:"'Paraître' → 'Être'",EN:"'Appearing' → 'Being'",ES:"'Parecer' → 'Ser'",PT:"'Parecer' → 'Ser'",ZH:"'表象' → '存在'",JA:"'見せかけ' → '存在'",AR:"'الظهور' → 'الكينونة'",HI:"'दिखावा' → 'होना'"},
sp3d:{FR:"Migration vers la certitude.",EN:"Migration toward certainty.",ES:"Migración hacia la certeza.",PT:"Migração para a certeza.",ZH:"向确定性迁移。",JA:"確信への移行。",AR:"الهجرة نحو اليقين.",HI:"निश्चितता की ओर प्रवास।"},
sp4t:{FR:"Énergie Collective",EN:"Collective Energy",ES:"Energía Colectiva",PT:"Energia Coletiva",ZH:"集体能量",JA:"集合的エネルギー",AR:"طاقة جماعية",HI:"सामूहिक ऊर्जा"},
sp4d:{FR:"Chaleur partagée.",EN:"Shared warmth.",ES:"Calidez compartida.",PT:"Calor compartilhado.",ZH:"共享温暖。",JA:"共有される温かさ。",AR:"دفء مشترك.",HI:"साझा गर्मजोशी।"},
// ── New keys for UX improvements ──
sel_ans:{FR:"Sélectionnez une réponse pour continuer",EN:"Select an answer to continue",ES:"Selecciona una respuesta para continuar",PT:"Selecione uma resposta para continuar",ZH:"请选择一个答案以继续",JA:"回答を選択してください",AR:"اختر إجابة للمتابعة",HI:"जारी रखने के लिए उत्तर चुनें"},
ax_gv:{FR:"GRAVITÉ",EN:"GRAVITY",ES:"GRAVEDAD",PT:"GRAVIDADE",ZH:"重力",JA:"グラビティ",AR:"الثقل",HI:"गुरुत्व"},
ax_ce:{FR:"ÉNERGIE",EN:"ENERGY",ES:"ENERGÍA",PT:"ENERGIA",ZH:"能量",JA:"エネルギー",AR:"الطاقة",HI:"ऊर्जा"},
ax_si:{FR:"SENS",EN:"SENSE",ES:"SENTIDO",PT:"SENTIDO",ZH:"感知",JA:"センス",AR:"الإدراك",HI:"संवेदन"},
ax_pt:{FR:"STRUCTURE",EN:"STRUCTURE",ES:"ESTRUCTURA",PT:"ESTRUTURA",ZH:"结构",JA:"ストラクチャー",AR:"البنية",HI:"संरचना"},
res_passport:{FR:"PASSEPORT NEURO-DESIGN",EN:"NEURO-DESIGN PASSPORT",ES:"PASAPORTE NEURO-DISEÑO",PT:"PASSAPORTE NEURO-DESIGN",ZH:"神经设计护照",JA:"ニューロデザインパスポート",AR:"جواز التصميم العصبي",HI:"न्यूरो-डिज़ाइन पासपोर्ट"},
res_dominant:{FR:"AXE DOMINANT",EN:"DOMINANT AXIS",ES:"EJE DOMINANTE",PT:"EIXO DOMINANTE",ZH:"主导轴",JA:"支配軸",AR:"المحور المهيمن",HI:"प्रमुख अक्ष"},
res_restart:{FR:"RE-CALIBRER",EN:"RE-CALIBRATE",ES:"RE-CALIBRAR",PT:"RE-CALIBRAR",ZH:"重新校准",JA:"再校正",AR:"إعادة معايرة",HI:"पुन: अंशांकन"},
arch_sub:{FR:"Bibliothèque des 16 archétypes",EN:"Library of 16 archetypes",ES:"Biblioteca de 16 arquetipos",PT:"Biblioteca de 16 arquétipos",ZH:"16个原型库",JA:"16アーキタイプライブラリ",AR:"مكتبة 16 نموذج",HI:"16 मूलरूप पुस्तकालय"},
arch_desc:{FR:"Chaque archétype est une signature neuro-cognitive unique — un profil de réponses sensorielles, chromatiques et structurelles.",EN:"Each archetype is a unique neuro-cognitive signature — a profile of sensory, chromatic and structural responses.",ES:"Cada arquetipo es una firma neuro-cognitiva única — un perfil de respuestas sensoriales, cromáticas y estructurales.",PT:"Cada arquétipo é uma assinatura neuro-cognitiva única — um perfil de respostas sensoriais, cromáticas e estruturais.",ZH:"每个原型都是独特的神经认知签名——感觉、色彩和结构反应的档案。",JA:"各アーキタイプはユニークなニューロ認知シグネチャー。",AR:"كل نموذج هو توقيع عصبي معرفي فريد.",HI:"प्रत्येक मूलरूप एक अद्वितीय न्यूरो-संज्ञानात्मक हस्ताक्षर है।"},
arch_soon:{FR:"Complétez le test pour débloquer votre archétype.",EN:"Complete the test to unlock your archetype.",ES:"Completa el test para desbloquear tu arquetipo.",PT:"Complete o teste para desbloquear seu arquétipo.",ZH:"完成测试以解锁您的原型。",JA:"テストを完了してアーキタイプを解放してください。",AR:"أكمل الاختبار لإلغاء قفل نموذجك.",HI:"अपना मूलरूप अनलॉक करने के लिए परीक्षण पूरा करें।"},
net_sub:{FR:"Connexions & Communauté",EN:"Connections & Community",ES:"Conexiones & Comunidad",PT:"Conexões & Comunidade",ZH:"连接与社区",JA:"コネクション＆コミュニティ",AR:"اتصالات ومجتمع",HI:"कनेक्शन और समुदाय"},
net_desc:{FR:"Rejoignez d'autres porteurs de la même signature neuro-cognitive. Partagez vos prescriptions.",EN:"Connect with others who share your neuro-cognitive signature. Share prescriptions and co-create clothing experiences.",ES:"Conecta con otros que comparten tu firma neuro-cognitiva. Comparte prescripciones.",PT:"Conecte-se com outros que compartilham sua assinatura neuro-cognitiva.",ZH:"与分享您神经认知签名的其他人联系。分享处方并共同创造着装体验。",JA:"同じシグネチャーを持つ人々とつながる。処方を共有し着装体験を共創する。",AR:"تواصل مع الآخرين الذين يشاركونك توقيعك العصبي المعرفي.",HI:"अपने न्यूरो-संज्ञानात्मक हस्ताक्षर साझा करने वालों से जुड़ें।"},
net_soon:{FR:"Disponible après l'analyse de votre profil.",EN:"Available after your profile analysis.",ES:"Disponible después del análisis de su perfil.",PT:"Disponível após a análise do seu perfil.",ZH:"档案分析后可用。",JA:"プロフィール分析後に利用可能。",AR:"متاح بعد تحليل ملفك الشخصي.",HI:"आपकी प्रोफ़ाइल विश्लेषण के बाद उपलब्ध।"},
};

// ═══ TRANSLATION HOOK ═══
function useT(){const{lang}=useContext(Ctx);return useCallback(k=>{const e=T[k];return e?e[lang]||e.FR||k:k;},[lang]);}

// ═══ ARCHETYPE NAMES (16 = 2^4 from GV CE SI PT binary) ═══
// Index is a 4-bit code: GV(8)|CE(4)|SI(2)|PT(1), positive axis bit = 1
const ARCHETYPE_NAMES=["PHANTOM","GUARDIAN","CURRENT","ARCHITECT","SIGNAL","CURATOR","ORACLE","PROPHET","NOMAD","SENTINEL","CATALYST","ENGINEER","SOVEREIGN","REBEL","VANGUARD","APEX"];
const REQUIRED_AXES=["GV","CE","SI","PT"];
function getArchetype(scores){
  // Ensure all axes are present; default to 0 (negative) if missing
  const s={GV:0,CE:0,SI:0,PT:0,...scores};
  const code=(s.GV>=0?8:0)|(s.CE>=0?4:0)|(s.SI>=0?2:0)|(s.PT>=0?1:0);
  return ARCHETYPE_NAMES[code]||ARCHETYPE_NAMES[0];
}

// Computing animation duration in ms
const COMPUTING_ANIMATION_DURATION_MS=2200;

// ═══ SCORE COMPUTATION ═══
function computeScores(vals,allQ){
  const raw={GV:0,CE:0,SI:0,PT:0};
  Object.entries(vals).forEach(([idx,val])=>{
    const q=allQ[+idx];
    if(!q?.a)return;
    // Normalize 1-5 Likert to -1..+1: 1→-1, 2→-0.5, 3→0, 4→0.5, 5→1
    const norm=(val-3)/2;
    Object.entries(q.a).forEach(([ax,w])=>{raw[ax]=(raw[ax]||0)+norm*w;});
  });
  // Clamp minimum to 1 so a perfectly neutral (all-3) profile returns zeros rather than dividing by 0
  const maxAbs=Math.max(...Object.values(raw).map(Math.abs),1);
  return Object.fromEntries(REQUIRED_AXES.map(k=>[k,Math.round((raw[k]/maxAbs)*100)]));
}

// ═══ 80 QUESTIONS × 8 LANGUAGES ═══
// Each question: array of {FR,EN,ES,PT,ZH,JA,AR,HI,a:{axis weights}}
const QC=[
{FR:"Une couleur sombre me fait sentir en sécurité.",EN:"A dark color makes me feel safe.",ES:"Un color oscuro me hace sentir seguro/a.",PT:"Uma cor escura me faz sentir seguro/a.",ZH:"深色让我感到安全。",JA:"暗い色は安心感を与える。",AR:"اللون الداكن يجعلني أشعر بالأمان.",HI:"गहरा रंग मुझे सुरक्षित महसूस कराता है।",a:{GV:-1,CE:-0.5}},
{FR:"Je choisis mes couleurs pour MON humeur.",EN:"I choose colors for MY mood.",ES:"Elijo colores según MI estado de ánimo.",PT:"Escolho cores pelo MEU humor.",ZH:"我根据自己的心情选择颜色。",JA:"自分の気分で色を選ぶ。",AR:"أختار ألواني حسب مزاجي.",HI:"मैं अपने मूड के लिए रंग चुनता हूँ।",a:{CE:-1,SI:-0.5}},
{FR:"Le noir est mon bouclier.",EN:"Black is my shield.",ES:"El negro es mi escudo.",PT:"O preto é meu escudo.",ZH:"黑色是我的盾牌。",JA:"黒は私の盾。",AR:"الأسود درعي.",HI:"काला मेरी ढाल है।",a:{PT:-1,CE:-0.5}},
{FR:"Je porterais du rouge vif devant des inconnus.",EN:"I would wear bright red in front of strangers.",ES:"Usaría rojo brillante frente a desconocidos.",PT:"Usaria vermelho vivo diante de estranhos.",ZH:"我会在陌生人面前穿鲜红色。",JA:"知らない人の前で真っ赤を着れる。",AR:"سأرتدي الأحمر أمام الغرباء.",HI:"मैं अजनबियों के सामने लाल पहनूँगा।",a:{CE:1,GV:0.5}},
{FR:"Les Jewel Tones me donnent de l'énergie.",EN:"Jewel Tones give me energy.",ES:"Los Jewel Tones me dan energía.",PT:"Os Jewel Tones me dão energia.",ZH:"宝石色调给我能量。",JA:"ジュエルトーンはエネルギーをくれる。",AR:"ألوان الجواهر تمنحني طاقة.",HI:"ज्वेल टोन मुझे ऊर्जा देते हैं।",a:{GV:1,SI:0.5}},
{FR:"Je calcule quelle couleur porter.",EN:"I calculate which color to wear.",ES:"Calculo qué color usar.",PT:"Calculo qual cor usar.",ZH:"我计算穿什么颜色。",JA:"何色を着るか計算する。",AR:"أحسب أي لون أرتديه.",HI:"मैं गणना करता हूँ कौन सा रंग पहनना है।",a:{SI:1,PT:0.5}},
{FR:"La couleur modifie mon état interne.",EN:"Color changes my internal state.",ES:"El color modifica mi estado interno.",PT:"A cor modifica meu estado interno.",ZH:"颜色改变我的内在状态。",JA:"色は内面の状態を変える。",AR:"اللون يغير حالتي الداخلية.",HI:"रंग मेरी आंतरिक स्थिति बदलता है।",a:{SI:-1,GV:0.5}},
{FR:"J'associe couleurs et souvenirs tactiles.",EN:"I link colors with tactile memories.",ES:"Asocio colores con recuerdos táctiles.",PT:"Associo cores com memórias táteis.",ZH:"我将颜色与触觉记忆联系。",JA:"色と触覚の記憶を結びつける。",AR:"أربط الألوان بالذكريات اللمسية.",HI:"मैं रंगों को स्पर्श स्मृतियों से जोड़ता हूँ।",a:{SI:-1,GV:-0.5}},
{FR:"L'or me fait sentir victorieux/se.",EN:"Gold makes me feel victorious.",ES:"El dorado me hace sentir victorioso/a.",PT:"O dourado me faz sentir vitorioso/a.",ZH:"金色让我感到胜利。",JA:"ゴールドは勝利を感じさせる。",AR:"الذهبي يجعلني أشعر بالانتصار.",HI:"सोना मुझे विजयी महसूस कराता है।",a:{GV:1,CE:0.5}},
{FR:"Palette neutre — pas d'émotion.",EN:"Neutral palette — no emotion.",ES:"Paleta neutra — sin emoción.",PT:"Paleta neutra — sem emoção.",ZH:"中性色调——没有情绪。",JA:"ニュートラル——感情なし。",AR:"لوحة محايدة — بلا عاطفة.",HI:"तटस्थ पैलेट — कोई भावना नहीं।",a:{CE:-1,GV:-0.5}},
{FR:"La couleur est un outil d'influence.",EN:"Color is a tool of influence.",ES:"El color es herramienta de influencia.",PT:"A cor é ferramenta de influência.",ZH:"颜色是影响工具。",JA:"色は影響力のツール。",AR:"اللون أداة تأثير.",HI:"रंग प्रभाव का उपकरण है।",a:{SI:1,CE:1}},
{FR:"Certaines couleurs = sensation physique.",EN:"Some colors = physical sensation.",ES:"Algunos colores = sensación física.",PT:"Certas cores = sensação física.",ZH:"某些颜色=身体感觉。",JA:"ある色は身体的感覚をもたらす。",AR:"بعض الألوان = إحساس جسدي.",HI:"कुछ रंग = शारीरिक संवेदना।",a:{SI:-1,GV:0.5}},
{FR:"Couleurs vives = courage.",EN:"Bright colors = courage.",ES:"Colores vivos = valentía.",PT:"Cores vivas = coragem.",ZH:"鲜艳颜色=勇气。",JA:"鮮やかな色=勇気。",AR:"ألوان زاهية = شجاعة.",HI:"चमकीले रंग = साहस।",a:{GV:1,CE:0.5}},
{FR:"Bleu marine = contrôle.",EN:"Navy blue = control.",ES:"Azul marino = control.",PT:"Azul marinho = controle.",ZH:"海军蓝=控制感。",JA:"ネイビー=コントロール。",AR:"الأزرق الداكن = سيطرة.",HI:"नेवी ब्लू = नियंत्रण।",a:{PT:-0.5,GV:-1,SI:0.5}},
{FR:"Couleur cachée influence confiance.",EN:"Hidden color influences confidence.",ES:"Color oculto influye confianza.",PT:"Cor escondida influencia confiança.",ZH:"隐藏颜色影响自信。",JA:"隠れた色が自信に影響。",AR:"اللون المخفي يؤثر على الثقة.",HI:"छिपा रंग आत्मविश्वास प्रभावित करता है।",a:{CE:-0.5,SI:-1}},
{FR:"Renoncé couleur vive par peur.",EN:"Gave up bright color from fear.",ES:"Renuncié color vivo por miedo.",PT:"Desisti de cor viva por medo.",ZH:"因害怕放弃鲜艳颜色。",JA:"恐れから鮮やかな色を諦めた。",AR:"تخليت عن لون زاهي خوفاً.",HI:"डर से चमकीला रंग छोड़ दिया।",a:{CE:-1,PT:-0.5}},
{FR:"Améthyste = extravagance.",EN:"Amethyst = extravagance.",ES:"Amatista = extravagancia.",PT:"Ametista = extravagância.",ZH:"紫水晶=奢华。",JA:"アメジスト=エクストラバガンス。",AR:"الجمشت = بذخ.",HI:"एमेथिस्ट = भव्यता।",a:{GV:1,SI:-0.5}},
{FR:"Couleurs choisies avec données.",EN:"Colors chosen with data.",ES:"Colores elegidos con datos.",PT:"Cores escolhidas com dados.",ZH:"用数据选颜色。",JA:"データで色を選ぶ。",AR:"ألوان مختارة بالبيانات.",HI:"डेटा से रंग चुने गए।",a:{SI:1,PT:1}},
{FR:"Émeraude = performance créative.",EN:"Emerald = creative performance.",ES:"Esmeralda = rendimiento creativo.",PT:"Esmeralda = performance criativa.",ZH:"翡翠绿=创造性表现。",JA:"エメラルド=クリエイティブ。",AR:"الزمرد = أداء إبداعي.",HI:"पन्ना = रचनात्मक प्रदर्शन।",a:{GV:0.5,CE:0.5}},
{FR:"Ma palette parle avant moi.",EN:"My palette speaks before me.",ES:"Mi paleta habla antes que yo.",PT:"Minha paleta fala antes de mim.",ZH:"我的色调先开口。",JA:"パレットが先に語る。",AR:"لوحتي تتحدث قبلي.",HI:"मेरा पैलेट मुझसे पहले बोलता है।",a:{CE:1,SI:0.5}},
];

const QF=[
{FR:"Oversize = espace autour du corps.",EN:"Oversize = space around body.",ES:"Oversize = espacio alrededor del cuerpo.",PT:"Oversize = espaço ao redor do corpo.",ZH:"超大号=身体周围空间。",JA:"オーバーサイズ=体の周りの空間。",AR:"كبير الحجم = مساحة حول الجسم.",HI:"ओवरसाइज़ = शरीर के चारों ओर जगह।",a:{PT:-1,GV:-0.5}},
{FR:"Épaules marquées = puissance.",EN:"Marked shoulders = power.",ES:"Hombros marcados = poder.",PT:"Ombros marcados = poder.",ZH:"强调肩部=力量。",JA:"肩ライン=パワー。",AR:"أكتاف بارزة = قوة.",HI:"चिह्नित कंधे = शक्ति।",a:{PT:0.5,CE:0.5,SI:0.5}},
{FR:"Superposition = instinct premier.",EN:"Layering = first instinct.",ES:"Superposición = primer instinto.",PT:"Sobreposição = primeiro instinto.",ZH:"叠穿=第一直觉。",JA:"レイヤリング=最初の本能。",AR:"التراكب = الغريزة الأولى.",HI:"लेयरिंग = पहली प्रवृत्ति।",a:{PT:-1,GV:0.5,CE:0.5}},
{FR:"Ajusté = contrôle.",EN:"Fitted = control.",ES:"Ajustado = control.",PT:"Ajustado = controle.",ZH:"合身=控制。",JA:"フィット=コントロール。",AR:"محكم = سيطرة.",HI:"फिटेड = नियंत्रण।",a:{SI:0.5,PT:0.5,GV:-0.5}},
{FR:"Oversize = 'soft armor'.",EN:"Oversize = 'soft armor'.",ES:"Oversize = 'armadura suave'.",PT:"Oversize = 'armadura suave'.",ZH:"超大号='软甲'。",JA:"オーバーサイズ=ソフトアーマー。",AR:"كبير الحجم = درع ناعم.",HI:"ओवरसाइज़ = सॉफ्ट आर्मर।",a:{PT:-1,SI:-0.5}},
{FR:"Silhouette conçue comme architecte.",EN:"Silhouette designed like architect.",ES:"Silueta diseñada como arquitecto.",PT:"Silhueta projetada como arquiteto.",ZH:"像建筑师设计轮廓。",JA:"建築家のようにシルエットを設計。",AR:"صورة ظلية مصممة كمهندس.",HI:"वास्तुकार की तरह सिल्हूट डिज़ाइन।",a:{SI:1,PT:1}},
{FR:"Fluidité prime sur forme.",EN:"Fluidity over form.",ES:"Fluidez sobre forma.",PT:"Fluidez sobre forma.",ZH:"流动性优先。",JA:"形より流動性。",AR:"السيولة فوق الشكل.",HI:"रूप पर तरलता।",a:{SI:-1,GV:0.5}},
{FR:"Poches fonctionnelles = assurance.",EN:"Functional pockets = confidence.",ES:"Bolsillos funcionales = seguridad.",PT:"Bolsos funcionais = segurança.",ZH:"功能口袋=安全感。",JA:"機能的ポケット=安心。",AR:"جيوب وظيفية = ثقة.",HI:"कार्यात्मक जेबें = आत्मविश्वास।",a:{PT:1,GV:-0.5}},
{FR:"Volume = espace mental.",EN:"Volume = mental space.",ES:"Volumen = espacio mental.",PT:"Volume = espaço mental.",ZH:"体量=心理空间。",JA:"ボリューム=メンタルスペース。",AR:"الحجم = مساحة ذهنية.",HI:"वॉल्यूम = मानसिक स्थान।",a:{SI:-1,PT:-0.5}},
{FR:"Géométrie = message contrôlé.",EN:"Geometry = controlled message.",ES:"Geometría = mensaje controlado.",PT:"Geometria = mensagem controlada.",ZH:"几何=可控信息。",JA:"ジオメトリ=コントロール。",AR:"الهندسة = رسالة محكومة.",HI:"ज्यामिति = नियंत्रित संदेश।",a:{SI:1,CE:1}},
{FR:"Trop près du corps = anxiété.",EN:"Too close to body = anxiety.",ES:"Demasiado cerca = ansiedad.",PT:"Muito perto = ansiedade.",ZH:"太贴身=焦虑。",JA:"体に近すぎる=不安。",AR:"قريب جداً = قلق.",HI:"शरीर के करीब = चिंता।",a:{PT:-1,SI:-0.5}},
{FR:"Lignes nettes > organiques.",EN:"Clean lines > organic.",ES:"Líneas netas > orgánicas.",PT:"Linhas nítidas > orgânicas.",ZH:"利落线条>有机形态。",JA:"クリーンなライン>オーガニック。",AR:"خطوط نظيفة > عضوية.",HI:"साफ रेखाएँ > जैविक।",a:{SI:1,PT:1,GV:-0.5}},
{FR:"Modularité fascinante.",EN:"Modularity is fascinating.",ES:"La modularidad fascina.",PT:"Modularidade fascina.",ZH:"模块化令人着迷。",JA:"モジュラリティに魅了。",AR:"النمطية رائعة.",HI:"मॉड्यूलरिटी आकर्षक।",a:{PT:1,SI:1,GV:0.5}},
{FR:"Corps + vêtement = protection.",EN:"Body + garment = protection.",ES:"Cuerpo + prenda = protección.",PT:"Corpo + roupa = proteção.",ZH:"身体+服装=保护。",JA:"身体+衣服=プロテクション。",AR:"جسم + ملابس = حماية.",HI:"शरीर + वस्त्र = सुरक्षा।",a:{PT:-1,SI:-0.5}},
{FR:"'More is More' = philosophie.",EN:"'More is More' = philosophy.",ES:"'Más es Más' = filosofía.",PT:"'Mais é Mais' = filosofia.",ZH:"越多越好=哲学。",JA:"More is More=哲学。",AR:"الأكثر هو الأكثر = فلسفة.",HI:"अधिक ही अधिक = दर्शन।",a:{GV:1,CE:1}},
{FR:"Réversibilité = options.",EN:"Reversibility = options.",ES:"Reversibilidad = opciones.",PT:"Reversibilidade = opções.",ZH:"可逆性=选择。",JA:"リバーシビリティ=オプション。",AR:"الانعكاسية = خيارات.",HI:"उत्क्रमणीयता = विकल्प।",a:{SI:1,PT:1,CE:0.5}},
{FR:"Silhouette change selon humeur.",EN:"Silhouette changes with mood.",ES:"Silueta cambia según humor.",PT:"Silhueta muda com humor.",ZH:"轮廓随心情变。",JA:"シルエットは気分で変わる。",AR:"الصورة تتغير حسب المزاج.",HI:"सिल्हूट मूड से बदलता।",a:{SI:-1,GV:0.5}},
{FR:"Ergonomie invisible > forme.",EN:"Invisible ergonomics > form.",ES:"Ergonomía invisible > forma.",PT:"Ergonomia invisível > forma.",ZH:"隐形人体工学>外形。",JA:"見えないエルゴノミクス>フォーム。",AR:"بيئة عمل غير مرئية > شكل.",HI:"अदृश्य एर्गोनॉमिक्स > रूप।",a:{CE:-1,PT:0.5}},
{FR:"Proportions disproportionnées attirent.",EN:"Disproportionate proportions attract.",ES:"Proporciones desproporcionadas atraen.",PT:"Proporções desproporcionadas atraem.",ZH:"不成比例吸引人。",JA:"アンバランスに惹かれる。",AR:"نسب غير متناسبة تجذب.",HI:"असमानुपातिक अनुपात आकर्षित।",a:{GV:1,CE:0.5}},
{FR:"Forme communique fonction sociale.",EN:"Form communicates social function.",ES:"Forma comunica función social.",PT:"Forma comunica função social.",ZH:"形式传达社会功能。",JA:"フォームは社会的機能を伝える。",AR:"الشكل ينقل وظيفة اجتماعية.",HI:"रूप सामाजिक कार्य संप्रेषित।",a:{CE:1,SI:1}},
];

const QM=[
{FR:"Douceur extrême calme système nerveux.",EN:"Extreme softness calms nervous system.",ES:"Suavidad extrema calma sistema nervioso.",PT:"Suavidade extrema acalma sistema nervoso.",ZH:"极致柔软平息神经。",JA:"極度の柔らかさが神経を落ち着かせる。",AR:"النعومة الشديدة تهدئ الجهاز العصبي.",HI:"अत्यधिक कोमलता तंत्रिका शांत करती है।",a:{SI:-1,GV:-0.5}},
{FR:"Poids épais = sécurité.",EN:"Heavy weight = safety.",ES:"Peso grueso = seguridad.",PT:"Peso pesado = segurança.",ZH:"厚重=安全感。",JA:"重さ=安全。",AR:"وزن ثقيل = أمان.",HI:"भारी वजन = सुरक्षा।",a:{SI:-1,PT:-1}},
{FR:"Vêtement lesté = réduire anxiété.",EN:"Weighted garment = reduce anxiety.",ES:"Prenda lastrada = reducir ansiedad.",PT:"Roupa pesada = reduzir ansiedade.",ZH:"加重服装=减少焦虑。",JA:"加重衣服=不安軽減。",AR:"ملابس مرجحة = تقليل قلق.",HI:"भारित वस्त्र = चिंता कम।",a:{PT:-1,GV:-0.5}},
{FR:"Rugosité naturelle éveille.",EN:"Natural roughness awakens.",ES:"Rugosidad natural despierta.",PT:"Rugosidade natural desperta.",ZH:"自然粗糙感唤醒。",JA:"自然な粗さが覚醒させる。",AR:"الخشونة الطبيعية توقظ.",HI:"प्राकृतिक खुरदरापन जागृत करता है।",a:{SI:-1,PT:0.5}},
{FR:"Soie lourde = autorité.",EN:"Heavy silk = authority.",ES:"Seda pesada = autoridad.",PT:"Seda pesada = autoridade.",ZH:"重丝绸=权威。",JA:"重いシルク=権威。",AR:"حرير ثقيل = سلطة.",HI:"भारी रेशम = अधिकार।",a:{CE:0.5,SI:0.5,GV:0.5}},
{FR:"Je juge par toucher d'abord.",EN:"I judge by touch first.",ES:"Juzgo por tacto primero.",PT:"Julgo pelo toque primeiro.",ZH:"先通过触感判断。",JA:"まず触覚で判断。",AR:"أحكم باللمس أولاً.",HI:"पहले स्पर्श से जज करता हूँ।",a:{SI:-1,CE:-0.5}},
{FR:"Synthétique gêne physiquement.",EN:"Synthetic bothers physically.",ES:"Sintético molesta físicamente.",PT:"Sintético incomoda fisicamente.",ZH:"合成材料不适。",JA:"合成素材は体に不快。",AR:"الاصطناعي يزعج جسدياً.",HI:"सिंथेटिक शारीरिक परेशान।",a:{SI:-1,PT:-0.5}},
{FR:"Velours = caresse émotionnelle.",EN:"Velvet = emotional caress.",ES:"Terciopelo = caricia emocional.",PT:"Veludo = carícia emocional.",ZH:"天鹅绒=情感抚慰。",JA:"ベルベット=感情の愛撫。",AR:"مخمل = مداعبة عاطفية.",HI:"मखमल = भावनात्मक स्पर्श।",a:{SI:-1,PT:-0.5}},
{FR:"Choix par propriétés techniques.",EN:"Choice by technical properties.",ES:"Elección por propiedades técnicas.",PT:"Escolha por propriedades técnicas.",ZH:"按技术性能选择。",JA:"技術的特性で選ぶ。",AR:"اختيار حسب خصائص تقنية.",HI:"तकनीकी गुणों द्वारा चयन।",a:{SI:1,PT:1}},
{FR:"Moquette/duvet = couverture lestée.",EN:"Carpet/duvet = weighted blanket.",ES:"Moqueta/edredón = manta lastrada.",PT:"Carpete/edredom = cobertor pesado.",ZH:"地毯/羽绒=加重毯。",JA:"カーペット/デュベ=加重ブランケット。",AR:"سجاد/لحاف = بطانية مرجحة.",HI:"कार्पेट/डुवेट = भारित कंबल।",a:{PT:-1,SI:-1}},
{FR:"Matériaux innovants attirent.",EN:"Innovative materials attract.",ES:"Materiales innovadores atraen.",PT:"Materiais inovadores atraem.",ZH:"创新材料吸引。",JA:"革新的素材に惹かれる。",AR:"مواد مبتكرة تجذب.",HI:"नवीन सामग्री आकर्षित।",a:{PT:1,SI:1,GV:0.5}},
{FR:"Fausse fourrure = luxe Soul Train.",EN:"Faux fur = Soul Train luxury.",ES:"Piel sintética = lujo Soul Train.",PT:"Pele falsa = luxo Soul Train.",ZH:"人造皮草=灵魂列车奢华。",JA:"フェイクファー=ソウルトレイン。",AR:"فراء صناعي = رفاهية.",HI:"फॉक्स फर = सोल ट्रेन लक्जरी।",a:{GV:1,CE:1}},
{FR:"Textures complexes > lisses.",EN:"Complex textures > smooth.",ES:"Texturas complejas > lisas.",PT:"Texturas complexas > lisas.",ZH:"复杂纹理>光滑。",JA:"複雑テクスチャー>滑らか。",AR:"قوام معقد > أملس.",HI:"जटिल बनावट > चिकनी।",a:{GV:1,CE:0.5}},
{FR:"Denim brut = ancrage.",EN:"Raw denim = anchoring.",ES:"Denim crudo = anclaje.",PT:"Denim cru = ancoragem.",ZH:"原色牛仔=锚定。",JA:"生デニム=アンカリング。",AR:"دنيم خام = تثبيت.",HI:"रॉ डेनिम = लंगर।",a:{GV:-1,PT:-0.5}},
{FR:"Analyse composition avant achat.",EN:"Analyze composition before buying.",ES:"Analizo composición antes de comprar.",PT:"Analiso composição antes de comprar.",ZH:"购买前分析成分。",JA:"購入前に素材分析。",AR:"أحلل التركيب قبل الشراء.",HI:"खरीदने से पहले विश्लेषण।",a:{SI:1,PT:1}},
{FR:"Matière change posture.",EN:"Material changes posture.",ES:"Material cambia postura.",PT:"Material muda postura.",ZH:"材质改变姿态。",JA:"素材は姿勢を変える。",AR:"المادة تغير الوضعية.",HI:"सामग्री मुद्रा बदलती।",a:{SI:-1,CE:0.5}},
{FR:"Cuir embossé = pouvoir.",EN:"Embossed leather = power.",ES:"Cuero repujado = poder.",PT:"Couro gravado = poder.",ZH:"压纹皮革=力量。",JA:"エンボスレザー=パワー。",AR:"جلد منقوش = قوة.",HI:"एम्बॉस्ड लेदर = शक्ति।",a:{CE:0.5,GV:0.5,SI:0.5}},
{FR:"Contact tissu = non-négociable.",EN:"Fabric contact = non-negotiable.",ES:"Contacto tela = innegociable.",PT:"Contato tecido = inegociável.",ZH:"面料接触=不可妥协。",JA:"生地の接触=譲れない。",AR:"ملامسة قماش = غير قابل للتفاوض.",HI:"कपड़े का स्पर्श = अपरिहार्य।",a:{SI:-1,GV:-0.5}},
{FR:"Matelassage = containment.",EN:"Quilting = containment.",ES:"Acolchado = contención.",PT:"Acolchoado = contenção.",ZH:"绗缝=包裹感。",JA:"キルティング=コンテインメント。",AR:"تبطين = احتواء.",HI:"क्विल्टिंग = नियंत्रण।",a:{PT:-1,SI:-0.5}},
{FR:"Matières racontent histoire technique.",EN:"Materials tell technical story.",ES:"Materiales cuentan historia técnica.",PT:"Materiais contam história técnica.",ZH:"材料讲述技术故事。",JA:"素材が技術的ストーリーを語る。",AR:"مواد تروي قصة تقنية.",HI:"सामग्री तकनीकी कहानी बताती।",a:{PT:1,CE:1}},
];

const QI=[
{FR:"Vêtements = armure.",EN:"Clothing = armor.",ES:"Ropa = armadura.",PT:"Roupas = armadura.",ZH:"服装=盔甲。",JA:"衣服=アーマー。",AR:"ملابس = درع.",HI:"कपड़े = कवच।",a:{PT:-1,CE:-0.5}},
{FR:"Vêtements = invitation.",EN:"Clothing = invitation.",ES:"Ropa = invitación.",PT:"Roupas = convite.",ZH:"服装=邀请。",JA:"衣服=招待。",AR:"ملابس = دعوة.",HI:"कपड़े = निमंत्रण।",a:{CE:1,GV:0.5}},
{FR:"Style reflète qui je suis.",EN:"Style reflects who I am.",ES:"Estilo refleja quién soy.",PT:"Estilo reflete quem sou.",ZH:"风格反映我是谁。",JA:"スタイルは自分を映す。",AR:"الأسلوب يعكس من أنا.",HI:"शैली दर्शाती कि मैं कौन हूँ।",a:{CE:0.5,SI:-0.5}},
{FR:"Style adapté au contexte.",EN:"Style adapted to context.",ES:"Estilo adaptado al contexto.",PT:"Estilo adaptado ao contexto.",ZH:"风格适应场景。",JA:"文脈に合わせたスタイル。",AR:"أسلوب متكيف مع السياق.",HI:"संदर्भ अनुसार शैली।",a:{SI:1,CE:0.5}},
{FR:"Changer tenue = soulagement.",EN:"Changing clothes = relief.",ES:"Cambiar ropa = alivio.",PT:"Trocar roupa = alívio.",ZH:"换衣=解脱。",JA:"着替え=安堵。",AR:"تغيير ملابس = ارتياح.",HI:"कपड़े बदलना = राहत।",a:{SI:-1,PT:-0.5}},
{FR:"Peur du regard.",EN:"Fear of being watched.",ES:"Miedo a las miradas.",PT:"Medo dos olhares.",ZH:"害怕目光。",JA:"人の目が怖い。",AR:"خوف من النظرات.",HI:"देखे जाने का डर।",a:{CE:-1,PT:-0.5}},
{FR:"Société impacte comment je m'habille.",EN:"Society impacts how I dress.",ES:"Sociedad impacta cómo me visto.",PT:"Sociedade impacta como me visto.",ZH:"社会影响穿着。",JA:"社会が服装に影響。",AR:"المجتمع يؤثر على لبسي.",HI:"समाज प्रभावित करता कैसे पहनता हूँ।",a:{SI:1,CE:-0.5}},
{FR:"Style optimal trouvé.",EN:"Found optimal style.",ES:"Encontré estilo óptimo.",PT:"Encontrei estilo ótimo.",ZH:"找到最佳风格。",JA:"最適なスタイルを見つけた。",AR:"وجدت أسلوبي المثالي.",HI:"इष्टतम शैली मिली।",a:{CE:0.5,GV:0.5}},
{FR:"Identité = RÉSISTANCE.",EN:"Identity = RESISTANCE.",ES:"Identidad = RESISTENCIA.",PT:"Identidade = RESISTÊNCIA.",ZH:"身份=抵抗。",JA:"アイデンティティ=レジスタンス。",AR:"هوية = مقاومة.",HI:"पहचान = प्रतिरोध।",a:{CE:0.5,GV:0.5}},
{FR:"Fonctionnel avant beau.",EN:"Functional before beautiful.",ES:"Funcional antes que bonito.",PT:"Funcional antes de bonito.",ZH:"功能优先于美观。",JA:"美より機能。",AR:"الوظيفة قبل الجمال.",HI:"सुंदर से पहले कार्यात्मक।",a:{PT:1,GV:-0.5,CE:-0.5}},
{FR:"Luxe fonctionnel résonne.",EN:"Functional luxury resonates.",ES:"Lujo funcional resuena.",PT:"Luxo funcional ressoa.",ZH:"功能性奢华共鸣。",JA:"機能的ラグジュアリーが響く。",AR:"رفاهية وظيفية تتردد.",HI:"कार्यात्मक विलासिता गूंजती।",a:{PT:0.5,SI:0.5}},
{FR:"Communauté vestimentaire.",EN:"Fashion community.",ES:"Comunidad de moda.",PT:"Comunidade de moda.",ZH:"时尚社区。",JA:"ファッションコミュニティ。",AR:"مجتمع أزياء.",HI:"फैशन समुदाय।",a:{CE:1,GV:0.5}},
{FR:"Authenticité = résistance.",EN:"Authenticity = resistance.",ES:"Autenticidad = resistencia.",PT:"Autenticidade = resistência.",ZH:"真实=抵抗。",JA:"オーセンティシティ=レジスタンス。",AR:"أصالة = مقاومة.",HI:"प्रामाणिकता = प्रतिरोध।",a:{GV:0.5,CE:0.5}},
{FR:"Discret mais impeccable.",EN:"Discreet but impeccable.",ES:"Discreto pero impecable.",PT:"Discreto mas impecável.",ZH:"低调但无可挑剔。",JA:"控えめだが完璧。",AR:"متحفظ لكن لا تشوبه شائبة.",HI:"विवेकी लेकिन निर्दोष।",a:{CE:-1,SI:1}},
{FR:"Vêtement = interface cognitive.",EN:"Clothing = cognitive interface.",ES:"Ropa = interfaz cognitiva.",PT:"Roupa = interface cognitiva.",ZH:"服装=认知接口。",JA:"衣服=認知インターフェース。",AR:"ملابس = واجهة معرفية.",HI:"कपड़े = संज्ञानात्मक इंटरफेस।",a:{SI:0.5,PT:0.5}},
{FR:"Garde-robe = intelligence.",EN:"Wardrobe = intelligence.",ES:"Guardarropa = inteligencia.",PT:"Guarda-roupa = inteligência.",ZH:"衣橱=智慧。",JA:"ワードローブ=インテリジェンス。",AR:"خزانة ملابس = ذكاء.",HI:"अलमारी = बुद्धिमत्ता।",a:{SI:1,PT:1,CE:0.5}},
{FR:"Overdress = souveraineté.",EN:"Overdress = sovereignty.",ES:"Overdress = soberanía.",PT:"Overdress = soberania.",ZH:"过度着装=主权。",JA:"オーバードレス=ソブリンティ。",AR:"إفراط لباس = سيادة.",HI:"ओवरड्रेस = संप्रभुता।",a:{CE:1,GV:1}},
{FR:"Vulnérabilité = force.",EN:"Vulnerability = strength.",ES:"Vulnerabilidad = fuerza.",PT:"Vulnerabilidade = força.",ZH:"脆弱=力量。",JA:"脆弱性=強さ。",AR:"ضعف = قوة.",HI:"भेद्यता = ताकत।",a:{CE:1,GV:0.5}},
{FR:"Travaille silencieusement.",EN:"Works silently.",ES:"Trabaja en silencio.",PT:"Trabalha silenciosamente.",ZH:"默默工作。",JA:"静かに働く。",AR:"يعمل بصمت.",HI:"चुपचाप काम करता है।",a:{CE:-1,PT:0.5}},
{FR:"Chaque espace = Soul Lounge.",EN:"Every space = my Soul Lounge.",ES:"Cada espacio = mi Soul Lounge.",PT:"Cada espaço = meu Soul Lounge.",ZH:"每个空间=我的灵魂空间。",JA:"すべての空間=ソウルラウンジ。",AR:"كل مساحة = صالة روحي.",HI:"हर जगह = मेरा सोल लाउंज।",a:{CE:1,GV:1,SI:0.5}},
];

const TERMS_I18N=[{k:"tm1",q:QC},{k:"tm2",q:QF},{k:"tm3",q:QM},{k:"tm4",q:QI}];

// ═══ CSS STYLES (injected once at root) ═══
const GLOBAL_CSS=`
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@200;300;400;500;600;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{background:${P.black}}
::selection{background:${P.ruby}44;color:${P.ghost}}
::-webkit-scrollbar{width:3px}
::-webkit-scrollbar-track{background:${P.black}}
::-webkit-scrollbar-thumb{background:${P.border}}
.reveal{opacity:0;transform:translateY(18px);transition:opacity 0.8s ease,transform 0.8s ease;will-change:opacity,transform}
.reveal.visible{opacity:1;transform:none}
.reveal-delay-1{transition-delay:0.08s}
.reveal-delay-2{transition-delay:0.16s}
.reveal-delay-3{transition-delay:0.24s}
@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
@keyframes dg-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
/* Hover transitions */
.dg-btn{transition:border-color 0.15s,background 0.15s,color 0.15s,opacity 0.15s}
.dg-btn:hover:not(:disabled){border-color:${P.borderAct} !important;color:${P.ghost} !important}
.dg-btn-primary:hover:not(:disabled){background:#a00d24 !important}
.dg-btn-outline:hover:not(:disabled){background:${P.ruby}11 !important}
.dg-likert-btn{transition:border-color 0.15s,background 0.15s,transform 0.1s}
.dg-likert-btn:hover{border-color:${P.ruby}88 !important;background:${P.ruby}10 !important}
.dg-likert-btn:active{transform:scale(0.93)}
.dg-card{transition:border-color 0.2s,background 0.2s}
.dg-card:hover{border-color:${P.borderAct} !important;background:${P.bgHov} !important}
.dg-nav-btn{background:none;border:none;border-bottom:2px solid transparent;padding:6px 12px;cursor:pointer;font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:2px;color:${P.textDim};transition:color 0.15s,border-color 0.15s;white-space:nowrap;height:52px;display:flex;align-items:center}
.dg-nav-btn:hover{color:${P.gray}}
.dg-nav-btn.dg-nav-active{color:${P.ruby};border-bottom-color:${P.ruby}}
.dg-dropdown-item{transition:background 0.15s,color 0.15s}
.dg-dropdown-item:hover{background:${P.ruby}22 !important;color:${P.ghost} !important}
/* Mobile responsive */
@media(max-width:640px){
  .resp-grid-4{grid-template-columns:1fr 1fr !important}
  .resp-grid-2{grid-template-columns:1fr !important}
  .resp-nav-desktop{display:none !important}
  .resp-nav-mobile{display:flex !important}
  .resp-overflow{overflow-x:auto;padding-bottom:4px}
  .resp-pad{padding:20px 12px 40px}
}
@media(max-width:400px){
  .resp-grid-4{grid-template-columns:1fr !important}
}
`;

// ═══ LANGUAGE SELECTOR ═══
function LangSel(){
  const{lang,setLang}=useContext(Ctx);
  const[open,setOpen]=useState(false);
  const cur=LANGS.find(l=>l.c===lang);
  return(
    <div style={{position:"relative"}}>
      <button className="dg-btn" onClick={()=>setOpen(!open)} style={{background:"none",border:`1px solid ${P.border}`,padding:"5px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:5,fontFamily:P.mono,fontSize:11,color:P.gray}}>
        <Globe size={12}/>{cur?.f} {lang}<ChevronDown size={10}/>
      </button>
      {open&&(
        <div style={{position:"absolute",top:"calc(100% + 4px)",right:0,background:P.bgCard,border:`1px solid ${P.border}`,zIndex:200,minWidth:160}}>
          {LANGS.map(l=>(
            <button key={l.c} className="dg-dropdown-item" onClick={()=>{setLang(l.c);setOpen(false);}} style={{display:"flex",alignItems:"center",gap:8,width:"100%",background:lang===l.c?P.ruby+"15":"transparent",border:"none",borderBottom:`1px solid ${P.border}`,padding:"8px 12px",cursor:"pointer",fontFamily:P.mono,fontSize:11,color:lang===l.c?P.ruby:P.gray,textAlign:"left"}}>
              <span style={{fontSize:15}}>{l.f}</span>{l.l}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ═══ TEST QUESTION COMPONENT ═══
function TestQuestion({q,lang,val,onChange}){
  const text=q[lang]||q.FR;
  return(
    <div style={{border:`1px solid ${P.border}`,padding:"18px 16px",marginBottom:12,background:P.bgCard}}>
      <p style={{fontFamily:P.mono,fontSize:13,color:P.ghost,lineHeight:1.75,margin:0}}>"{text}"</p>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,marginTop:16}}>
        {[1,2,3,4,5].map(n=>{
          const s=val===n;
          return(
            <button key={n} className="dg-likert-btn" onClick={()=>onChange(n)} style={{width:48,height:48,border:`2px solid ${s?P.ruby:P.border}`,background:s?P.ruby+"22":"transparent",color:s?P.ruby:P.gray,fontFamily:P.mono,fontSize:16,fontWeight:s?600:300,cursor:"pointer"}}>
              {n}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ═══ RESULT PASSPORT ═══
function ResultPassport({scores,t,lang,onRestart}){
  const archetype=getArchetype(scores);
  const axKeys={GV:"ax_gv",CE:"ax_ce",SI:"ax_si",PT:"ax_pt"};
  const radarData=[
    {axis:t("ax_gv"),value:Math.abs(scores.GV)},
    {axis:t("ax_ce"),value:Math.abs(scores.CE)},
    {axis:t("ax_si"),value:Math.abs(scores.SI)},
    {axis:t("ax_pt"),value:Math.abs(scores.PT)},
  ];
  const dominant=Object.entries(scores).sort((a,b)=>Math.abs(b[1])-Math.abs(a[1]))[0];
  return(
    <div style={{paddingTop:8}}>
      <div style={{fontSize:10,color:P.ruby,letterSpacing:"4px",marginBottom:10,textAlign:"center"}}>{t("res_passport")}</div>
      <div style={{border:`1px solid ${P.ruby}44`,background:P.bgCard,padding:"24px 20px",marginBottom:20}}>
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{fontSize:11,color:P.textDim,letterSpacing:"3px",marginBottom:8}}>{t("ar")}</div>
          <div style={{fontSize:30,fontWeight:200,color:P.ghost,letterSpacing:"5px",marginBottom:8}}>{archetype}</div>
          <div style={{fontSize:11,color:P.textDim}}>{t("res_dominant")}: <span style={{color:P.sable}}>{t(axKeys[dominant[0]])}</span></div>
        </div>
        {/* 4-axis scores */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:20}} className="resp-grid-4">
          {Object.entries(scores).map(([ax,val])=>(
            <div key={ax} style={{border:`1px solid ${P.border}`,padding:"12px 8px",textAlign:"center"}}>
              <div style={{fontSize:20,fontWeight:300,color:val>=0?P.ruby:P.sable}}>{val>0?"+":""}{val}</div>
              <div style={{fontSize:11,color:P.textDim,letterSpacing:"1px",marginTop:5}}>{t(axKeys[ax])}</div>
            </div>
          ))}
        </div>
        {/* Radar chart */}
        <div style={{height:220,marginBottom:8}}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid stroke={P.border}/>
              <PolarAngleAxis dataKey="axis" tick={{fill:P.gray,fontSize:10,fontFamily:"IBM Plex Mono"}}/>
              <PolarRadiusAxis domain={[0,100]} tick={false} axisLine={false}/>
              <Radar dataKey="value" stroke={P.ruby} fill={P.ruby} fillOpacity={0.15}/>
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div style={{display:"flex",justifyContent:"center"}}>
        <button className="dg-btn" onClick={onRestart} style={{border:`1px solid ${P.border}`,background:"none",padding:"10px 22px",cursor:"pointer",fontFamily:P.mono,fontSize:12,color:P.gray,display:"flex",alignItems:"center",gap:7}}>
          <RotateCcw size={13}/>{t("res_restart")}
        </button>
      </div>
    </div>
  );
}

// ═══ TEST MODAL (full-screen overlay) ═══
function TestModal({allQ,lang,t,isRTL,onClose}){
  const[step,setStep]=useState(0);
  const[vals,setVals]=useState({});
  const[phase,setPhase]=useState("testing");// testing|computing|result
  const[scores,setScores]=useState(null);
  const[dots,setDots]=useState(".");
  const ChevL=isRTL?ChevronRight:ChevronLeft;
  const ChevR=isRTL?ChevronLeft:ChevronRight;

  useEffect(()=>{
    if(phase!=="computing")return;
    const iv=setInterval(()=>setDots(d=>d.length>=3?".":d+"."),450);
    const to=setTimeout(()=>{setScores(computeScores(vals,allQ));setPhase("result");},COMPUTING_ANIMATION_DURATION_MS);
    return()=>{clearInterval(iv);clearTimeout(to);};
  },[phase]);

  const answered=vals[step]!=null;

  return(
    <div style={{position:"fixed",inset:0,zIndex:300,background:P.black+"f8",display:"flex",flexDirection:"column",overflowY:"auto"}}>
      {/* Modal header */}
      <div style={{borderBottom:`1px solid ${P.border}`,background:P.bgCard+"ee",backdropFilter:"blur(16px)",padding:"0 16px",display:"flex",alignItems:"center",justifyContent:"space-between",height:52,flexShrink:0,position:"sticky",top:0,zIndex:10}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <Hexagon size={14} color={P.ruby} strokeWidth={2}/>
          <span style={{fontSize:12,letterSpacing:"3px",color:P.ghost}}>TERMINAL</span>
        </div>
        {phase==="testing"&&<div style={{fontSize:12,color:P.ruby}}>{step+1} / 80</div>}
        <button className="dg-btn" onClick={onClose} style={{background:"none",border:`1px solid ${P.border}`,padding:"6px 10px",cursor:"pointer",color:P.gray,display:"flex",alignItems:"center"}}>
          <X size={15}/>
        </button>
      </div>

      <div style={{flex:1,maxWidth:680,width:"100%",margin:"0 auto",padding:"28px 16px 48px"}} className="resp-pad">
        {phase==="testing"&&(
          <>
            {/* Terminal tabs */}
            <div style={{display:"flex",gap:4,marginBottom:18}} className="resp-overflow">
              {TERMS_I18N.map((tm,i)=>{
                const active=step>=i*20&&step<(i+1)*20;
                return(
                  <div key={i} style={{flex:1,padding:"8px 10px",border:`1px solid ${active?P.ruby+"66":P.border}`,background:active?P.ruby+"08":"transparent",textAlign:"center",minWidth:60}}>
                    <div style={{fontSize:10,color:active?P.ruby:P.textDim,letterSpacing:"1px"}}>T-0{i+1}</div>
                    <div style={{fontSize:11,color:active?P.ghost:P.textDim}}>{t(tm.k)}</div>
                  </div>
                );
              })}
            </div>
            {/* Progress */}
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
              <span style={{fontSize:11,color:P.textDim}}>GLOBAL</span>
              <span style={{fontSize:11,color:P.ruby}}>{step+1} / 80</span>
            </div>
            <div style={{height:3,background:P.border,marginBottom:20,borderRadius:2}}>
              <div style={{height:"100%",background:`linear-gradient(90deg,${P.ruby},${P.sable})`,width:`${((step+1)/80)*100}%`,transition:"width 0.3s",borderRadius:2}}/>
            </div>
            {/* Question label */}
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
              <span style={{fontSize:16,color:P.ruby,fontWeight:300}}>Q{String(step%20+1).padStart(2,"0")}</span>
              <div style={{flex:1,height:1,background:P.border}}/>
              <span style={{fontSize:11,color:P.textGhost}}>LIKERT 1→5</span>
            </div>
            <TestQuestion q={allQ[step]} lang={lang} val={vals[step]} onChange={v=>setVals({...vals,[step]:v})}/>
            {/* Likert axis labels */}
            <div style={{display:"flex",justifyContent:"space-between",padding:"0 48px",marginBottom:6}}>
              <span style={{fontSize:11,color:P.textGhost}}>{t("no")}</span>
              <span style={{fontSize:11,color:P.textGhost}}>{t("ye")}</span>
            </div>
            {/* Select-answer hint */}
            {!answered&&(
              <div style={{textAlign:"center",fontSize:11,color:P.sable,marginBottom:10,opacity:0.85}}>
                ↑ {t("sel_ans")}
              </div>
            )}
            {/* Navigation */}
            <div style={{display:"flex",justifyContent:"space-between",marginTop:12}}>
              <button className="dg-btn" onClick={()=>setStep(Math.max(0,step-1))} disabled={step===0} style={{background:"none",border:`1px solid ${step===0?P.border:P.borderAct}`,padding:"10px 18px",cursor:step===0?"default":"pointer",fontSize:12,color:step===0?P.textGhost:P.gray,display:"flex",alignItems:"center",gap:5,opacity:step===0?0.3:1}}>
                <ChevL size={13}/>{t("bk")}
              </button>
              <button className={answered?"dg-btn dg-btn-primary":"dg-btn"} onClick={()=>{if(!answered)return;step===79?setPhase("computing"):setStep(Math.min(79,step+1));}} disabled={!answered} style={{background:answered?P.ruby:P.bgCard,color:answered?P.ghost:P.textDim,border:"none",padding:"10px 22px",cursor:answered?"pointer":"default",fontSize:12,fontWeight:600,display:"flex",alignItems:"center",gap:5,opacity:answered?1:0.35}}>
                {step===79?t("an"):t("nx")}<ChevR size={13}/>
              </button>
            </div>
          </>
        )}

        {phase==="computing"&&(
          <div style={{textAlign:"center",padding:"80px 20px"}}>
            <div style={{fontSize:36,color:P.ruby,marginBottom:18,display:"inline-block",animation:"dg-spin 2s linear infinite"}}>◈</div>
            <div style={{fontSize:16,color:P.ghost,letterSpacing:"5px",marginBottom:10}}>{t("cp")}{dots}</div>
            <div style={{fontSize:11,color:P.textDim,letterSpacing:"2px"}}>80Q × 4 AXES → ARCHETYPE</div>
          </div>
        )}

        {phase==="result"&&scores&&(
          <ResultPassport scores={scores} t={t} lang={lang} onRestart={()=>{setStep(0);setVals({});setPhase("testing");setScores(null);}}/>
        )}
      </div>
    </div>
  );
}

// ═══ SECTION: HOME ═══
function HomeSection({t,revealSection,onLaunchTest}){
  return(
    <>
      <div ref={revealSection} className="reveal reveal-delay-2" style={{textAlign:"center",marginBottom:48}}>
        <div style={{fontSize:11,color:P.textDim,letterSpacing:"5px",marginBottom:14}}>{nx()} {t("mc")} {nx()}</div>
        <h1 style={{fontSize:"clamp(36px,7vw,60px)",fontWeight:200,color:P.ghost,lineHeight:1,letterSpacing:"-2px",margin:"0 0 8px"}}>DIGGERZ</h1>
        <div style={{fontSize:13,color:P.ruby,letterSpacing:"6px",marginBottom:18,fontWeight:500}}>{t("nrw")}</div>
        <p style={{fontSize:13,color:P.gray,lineHeight:1.75,maxWidth:500,margin:"0 auto 16px"}}>{t("desc")}</p>
        <div style={{fontSize:11,color:P.textDim,padding:"7px 14px",border:`1px solid ${P.border}`,display:"inline-block",marginBottom:26}}>{t("formula")}</div>
        <div style={{display:"flex",justifyContent:"center",gap:10,marginBottom:30,flexWrap:"wrap"}}>
          {[{k:"q",v:"80"},{k:"ar",v:"16"},{k:"ax",v:"04"},{k:"co",v:"33"}].map(({k,v})=>(
            <div key={k} style={{border:`1px solid ${P.border}`,padding:"10px 16px"}}>
              <div style={{fontSize:22,color:P.ruby,fontWeight:300}}>{v}</div>
              <div style={{fontSize:11,color:P.gray,letterSpacing:"2px"}}>{t(k)}</div>
            </div>
          ))}
        </div>
        <button className="dg-btn dg-btn-primary" onClick={onLaunchTest} style={{background:P.ruby,color:P.ghost,border:"none",padding:"14px 36px",cursor:"pointer",fontSize:13,fontWeight:600,letterSpacing:"3px"}}>
          {t("go")}
        </button>
      </div>

      <div ref={revealSection} className="reveal reveal-delay-3" style={{marginBottom:48}}>
        <div style={{border:`1px solid ${P.border}`,padding:"24px",background:P.bgCard}}>
          <div style={{fontSize:11,color:P.ruby,letterSpacing:"3px",marginBottom:8}}>{t("ts")}</div>
          <h2 style={{fontSize:18,fontWeight:300,color:P.ghost,marginBottom:6}}>{t("tt")}</h2>
          <p style={{fontSize:12,color:P.gray,marginBottom:18,lineHeight:1.7}}>{t("td")}</p>
          <div style={{display:"flex",gap:6,marginBottom:18}} className="resp-overflow">
            {TERMS_I18N.map((tm,i)=>(
              <div key={i} style={{flex:1,padding:"8px 10px",border:`1px solid ${P.border}`,textAlign:"center",minWidth:60}}>
                <div style={{fontSize:10,color:P.ruby,letterSpacing:"1px"}}>T-0{i+1}</div>
                <div style={{fontSize:11,color:P.gray}}>{t(tm.k)}</div>
              </div>
            ))}
          </div>
          <button className="dg-btn dg-btn-outline" onClick={onLaunchTest} style={{border:`1px solid ${P.ruby}`,background:"none",padding:"10px 26px",cursor:"pointer",fontFamily:P.mono,fontSize:12,color:P.ruby,letterSpacing:"2px"}}>
            {t("la")}
          </button>
        </div>
      </div>
    </>
  );
}

// ═══ SECTION: ARCHIVES ═══
function ArchivesSection({t}){
  const stubs=[
    {name:"SOVEREIGN",axes:"+GV +CE",c:P.ruby},{name:"ARCHITECT",axes:"+SI +PT",c:P.sable},
    {name:"PHANTOM",axes:"−GV −CE",c:P.violet},{name:"ORACLE",axes:"+SI −PT",c:P.emerald},
    {name:"REBEL",axes:"+CE −SI",c:P.amber},{name:"SENTINEL",axes:"−GV +PT",c:P.cyan},
    {name:"CATALYST",axes:"+GV +SI",c:P.ruby},{name:"GUARDIAN",axes:"−SI −PT",c:P.sable},
  ];
  return(
    <div>
      <div style={{textAlign:"center",marginBottom:36}}>
        <div style={{fontSize:11,color:P.textDim,letterSpacing:"5px",marginBottom:12}}>{nx()} {t("arch_title")} {nx()}</div>
        <h2 style={{fontSize:"clamp(24px,5vw,40px)",fontWeight:200,color:P.ghost,marginBottom:10}}>{t("arch_sub")}</h2>
        <p style={{fontSize:13,color:P.gray,lineHeight:1.75,maxWidth:540,margin:"0 auto 24px"}}>{t("arch_desc")}</p>
        <div style={{fontSize:12,color:P.sable,padding:"8px 18px",border:`1px solid ${P.sable}44`,display:"inline-block"}}>{t("arch_soon")}</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}} className="resp-grid-4">
        {stubs.map((a,i)=>(
          <div key={i} className="dg-card" style={{border:`1px solid ${P.border}`,padding:"18px 12px",textAlign:"center",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:a.c+"66"}}/>
            <Lock size={15} color={P.textDim} style={{marginBottom:10}}/>
            <div style={{fontSize:12,fontWeight:500,color:P.ghost,letterSpacing:"2px",marginBottom:5}}>{a.name}</div>
            <div style={{fontSize:10,color:P.textDim}}>{a.axes}</div>
          </div>
        ))}
      </div>
      <div style={{textAlign:"center",marginTop:14,fontSize:11,color:P.textDim}}>+ 8 {t("ar")} — {t("l3")}</div>
    </div>
  );
}

// ═══ SECTION: NETWORK ═══
function NetworkSection({t}){
  const cards=[
    {icon:<Users size={26} color={P.ruby}/>,label:t("ht"),desc:t("net_desc")},
    {icon:<MessageCircle size={26} color={P.sable}/>,label:t("sc_lbl"),desc:t("ssd")},
    {icon:<Activity size={26} color={P.emerald}/>,label:t("ac"),desc:t("net_sub")},
  ];
  return(
    <div>
      <div style={{textAlign:"center",marginBottom:36}}>
        <div style={{fontSize:11,color:P.textDim,letterSpacing:"5px",marginBottom:12}}>{nx()} {t("nav_net")} {nx()}</div>
        <h2 style={{fontSize:"clamp(24px,5vw,40px)",fontWeight:200,color:P.ghost,marginBottom:10}}>{t("net_sub")}</h2>
        <p style={{fontSize:13,color:P.gray,lineHeight:1.75,maxWidth:540,margin:"0 auto 24px"}}>{t("net_desc")}</p>
        <div style={{fontSize:12,color:P.sable,padding:"8px 18px",border:`1px solid ${P.sable}44`,display:"inline-block"}}>{t("net_soon")}</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}} className="resp-grid-2">
        {cards.map((c,i)=>(
          <div key={i} className="dg-card" style={{border:`1px solid ${P.border}`,padding:"28px 18px",textAlign:"center"}}>
            <div style={{marginBottom:14}}>{c.icon}</div>
            <div style={{fontSize:13,color:P.ghost,letterSpacing:"2px",marginBottom:8,fontWeight:500}}>{c.label}</div>
            <div style={{fontSize:12,color:P.gray,lineHeight:1.65}}>{c.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══ SECTION: SOUL LOUNGE ═══
function SoulSection({t,revealSection}){
  return(
    <div ref={revealSection} className="reveal reveal-delay-2">
      <div style={{fontSize:11,color:P.sable,letterSpacing:"4px",marginBottom:10,textAlign:"center"}}>{nx()} SOUL LOUNGE {nx()}</div>
      <h2 style={{fontSize:"clamp(22px,5vw,38px)",fontWeight:200,color:P.ghost,textAlign:"center",marginBottom:8}}>{t("ss")}</h2>
      <p style={{fontSize:13,color:P.sable,textAlign:"center",marginBottom:28}}>{t("ssd")}</p>
      <div style={{fontSize:12,color:P.textDim,letterSpacing:"2px",marginBottom:14}}>{t("ph")}</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}} className="resp-grid-2">
        {[{t:"sp1t",d:"sp1d"},{t:"sp2t",d:"sp2d"},{t:"sp3t",d:"sp3d"},{t:"sp4t",d:"sp4d"}].map(({t:tk,d:dk},i)=>(
          <div key={i} className="dg-card" style={{padding:18,border:`1px solid ${P.sable}33`,background:`${P.sable}06`}}>
            <div style={{fontSize:13,color:P.sable,marginBottom:6,fontWeight:500}}>{t(tk)}</div>
            <div style={{fontSize:12,color:P.gray,lineHeight:1.65}}>{t(dk)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══ DEMO APP ═══
export default function App(){
  const[lang,setLang]=useState("FR");
  const[activeTab,setActiveTab]=useState("home");
  const[testOpen,setTestOpen]=useState(false);
  const revealRefs=useRef([]);
  const t=useCallback(k=>{const e=T[k];return e?e[lang]||e.FR||k:k;},[lang]);
  const isRTL=LANGS.find(l=>l.c===lang)?.rtl;
  const allQ=[...QC,...QF,...QM,...QI];

  const revealSection=useCallback(el=>{
    if(el&&!revealRefs.current.includes(el))revealRefs.current.push(el);
  },[]);

  useEffect(()=>{
    revealRefs.current=revealRefs.current.filter(el=>document.body.contains(el));
    if(typeof window==="undefined"||!window.IntersectionObserver)return;
    const observer=new IntersectionObserver(
      entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible");}),
      {threshold:0.12,rootMargin:"0px 0px -8% 0px"}
    );
    revealRefs.current.forEach(el=>observer.observe(el));
    return()=>observer.disconnect();
  },[activeTab]);

  const NAV_TABS=[
    {k:"nav_home",id:"home"},
    {k:"nav_test",id:"terminal"},
    {k:"nav_arch",id:"archives"},
    {k:"nav_net",id:"network"},
    {k:"nav_soul",id:"soul"},
  ];

  function handleNavClick(id){
    if(id==="terminal"){setTestOpen(true);}
    else{setActiveTab(id);}
  }

  return(
    <Ctx.Provider value={{lang,setLang}}>
      <div dir={isRTL?"rtl":"ltr"} style={{background:P.black,minHeight:"100vh",color:P.ghost,fontFamily:P.mono}}>
        <style>{GLOBAL_CSS}</style>

        {/* Background glow */}
        <div style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",background:`radial-gradient(ellipse at 10% 40%,${P.ruby}06,transparent 50%),${P.black}`}}/>

        <div style={{position:"relative",zIndex:2}}>
          {/* ── HEADER ── */}
          <header ref={revealSection} className="reveal reveal-delay-1" style={{borderBottom:`1px solid ${P.border}`,background:`${P.black}e8`,backdropFilter:"blur(16px)",position:"sticky",top:0,zIndex:100}}>
            <div style={{height:2,background:`linear-gradient(90deg,${P.ruby},transparent 30%,transparent 70%,${P.sable})`}}/>
            <div style={{maxWidth:1200,margin:"0 auto",padding:"0 16px",display:"flex",alignItems:"center",justifyContent:"space-between",height:52}}>
              {/* Logo button */}
              <button className="dg-btn" onClick={()=>setActiveTab("home")} style={{background:"none",border:"none",padding:"4px 0",cursor:"pointer",display:"flex",alignItems:"center",gap:8}}>
                <Hexagon size={16} color={P.ruby} strokeWidth={2}/>
                <span style={{fontSize:13,fontWeight:600,color:P.ghost,letterSpacing:"4px"}}>DIGGERZ</span>
                <span style={{fontSize:10,color:P.textGhost,padding:"1px 5px",border:`1px solid ${P.border}`}}>v5</span>
              </button>
              {/* Desktop nav */}
              <nav style={{display:"flex",alignItems:"center"}} className="resp-nav-desktop">
                {NAV_TABS.map(({k,id})=>(
                  <button key={id} className={`dg-nav-btn${activeTab===id||(id==="terminal"&&testOpen)?" dg-nav-active":""}`} onClick={()=>handleNavClick(id)}>
                    {t(k)}
                  </button>
                ))}
              </nav>
              <LangSel/>
            </div>
            {/* Mobile nav strip */}
            <div className="resp-nav-mobile" style={{display:"none",overflowX:"auto",borderTop:`1px solid ${P.border}`,padding:"0 8px"}}>
              {NAV_TABS.map(({k,id})=>(
                <button key={id} className={`dg-nav-btn${activeTab===id||(id==="terminal"&&testOpen)?" dg-nav-active":""}`} onClick={()=>handleNavClick(id)} style={{padding:"6px 10px",fontSize:11,height:40}}>
                  {t(k)}
                </button>
              ))}
            </div>
          </header>

          <div style={{maxWidth:900,margin:"0 auto",padding:"32px 16px 56px"}} className="resp-pad">
            {activeTab==="home"&&<HomeSection t={t} revealSection={revealSection} onLaunchTest={()=>setTestOpen(true)}/>}
            {activeTab==="archives"&&<ArchivesSection t={t}/>}
            {activeTab==="network"&&<NetworkSection t={t}/>}
            {activeTab==="soul"&&<SoulSection t={t} revealSection={revealSection}/>}
          </div>

          <footer style={{borderTop:`1px solid ${P.border}`,padding:"12px 16px",textAlign:"center"}}>
            <div style={{fontSize:11,color:P.textDim,letterSpacing:"2px"}}>DIGGERZ © 2026 — SUBSTRATE OS v5 — 🇫🇷🇬🇧🇪🇸🇧🇷🇨🇳🇯🇵🇸🇦🇮🇳</div>
          </footer>
        </div>

        {/* Test modal rendered inside Provider so it has context */}
        {testOpen&&(
          <TestModal allQ={allQ} lang={lang} t={t} isRTL={isRTL} onClose={()=>setTestOpen(false)}/>
        )}
      </div>
    </Ctx.Provider>
  );
}
