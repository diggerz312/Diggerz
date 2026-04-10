import { useState, useEffect, useRef, useCallback, useMemo, createContext, useContext } from "react";
import { Shield, Eye, Gem, Crown, ChevronRight, ChevronLeft, Lock, Terminal, Database, Hexagon, Fingerprint, Scan, Activity, Zap, User, Users, ArrowRight, RotateCcw, Brain, Heart, Feather, Palette, Sparkles, Globe, Cpu, Layers, Aperture, Target, Compass, Anchor, Flame, Sun, Moon, Box, Play, Pause, Volume2, Radio, Star, MessageCircle, Send, ThumbsUp, Plus, Bell, X, Search, Pin } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";

// ═══ SUBSTRATE OS v5 UNIFIED ═══
const P={black:"#101820",gray:"#888B8D",ruby:"#C8102E",sable:"#A39382",ghost:"#F2F2F2",bgCard:"#182230",bgHov:"#1c2838",bgIn:"#0e1620",border:"#243040",borderAct:"#344860",textDim:"#4a5868",textGhost:"#2a3644",emerald:"#2dd4a0",violet:"#8b5cf6",amber:"#d4a02d",cyan:"#22d3ee",mono:"'IBM Plex Mono',monospace"};
const Ctx=createContext();
const sn=()=>Array.from({length:6},()=>"0123456789ABCDEF"[Math.floor(Math.random()*16)]).join("");
const nx=()=>"░▒▓█▄▀│┤╡╣".split("").sort(()=>Math.random()-0.5).slice(0,3).join("");
const ago=m=>m<1?"now":m<60?`${m}m`:m<1440?`${Math.floor(m/60)}h`:`${Math.floor(m/1440)}d`;

// ═══ 16 ENRICHED ARCHETYPES — 4 CLUSTERS ═══
const CL=[
{id:"A",name:"LES SENTINELLES",sub:"Protection & Ancrage",color:"#3b82f6",icon:Shield,
 phil:"Les Sentinelles incarnent l'Extraction de la Gemme Intérieure. Sanctuaire textile = sécurité neurochimique. 54.5% noir = bouclier, 27.3% poids = ancrage non-négociable.",
 arch:[
  {code:"SPGC",name:"THE FORTRESS",icon:Shield,color:"#3b82f6",sub:"Isolation Totale — Gardien Sensoriel Silencieux",
   axes:{SI:25,PT:20,GV:18,CE:15},axLab:{SI:"SENSORY",PT:"PROTECTIVE",GV:"GROUNDED",CE:"COVERT"},
   narr:"Le Fortress est le bunker ambulant du Substrate. Damasio le décrirait comme une réponse aux 'signaux somatiques négatifs constants' — l'isolation totale. Chaque gramme de cuir est un mur entre son système nerveux et le chaos.\n\nCorrespond aux 27.3% qui priorisent le POIDS. L'Enclothed Cognition fonctionne ici par Deep Pressure Therapy : pression distribuée → système parasympathique → réduction cortisol + hausse sérotonine.\n\nTrajectoire : Extraction silencieuse — creuse sa mine intérieure sans témoin, accumulant les strates de confiance avant toute interaction.",
   nT:"Réduction d'anxiété par pression proprioceptive",
   nD:"Active les corpuscules de Ruffini (pression profonde) et Pacini (vibration). Signal constant de sécurité au cortex somatosensoriel → rétroaction sur l'amygdale → réduction de la peur. Même mécanisme que la couverture lestée thérapeutique, intégré en système vestimentaire mobile.\n\nMarqueur somatique : 'sol stable sous les pieds' — en stress social, le corps reçoit un feedback de solidité qui contourne l'analyse cognitive.",
   mP:"Cuir de bovin pleine fleur 2.0mm",mPD:"Résistance 40N/mm² à la déchirure. Densité 1.2g/cm³ = poids uniformément distribué. Patine tanné végétal évolue avec le porteur — le vêtement archive l'histoire du corps.",
   mS:"Denim selvedge 22oz",mSD:"750gsm. Rigidité initiale se brise pour mouler le corps = 'moulage proprioceptif' unique. Selvedge japonais = lisière fermée = intégrité structurelle.",
   mT:"Doublure Jersey lourd 800gsm",mTD:"Douceur interne. Contraste coque rigide (cuir/denim) + intérieur souple (jersey) = dialogue haptique activant récepteurs de pression ET caresse simultanément.",
   charge:"3.8kg",res:"35Hz",tGsm:"2750gsm",garment:"Manteau Grounder",
   gD:"Oversize structuré mi-cuisse. Doublure jersey intégrale. Épaules renforcées feutre 4mm. 6 poches dissimulées (organisation=anxiolytique). Col montant YKK massive. Quilting canaux verticaux distribution poids.",
   pal:["#101820","#3d4249"],palN:["Black 6 C","Cool Gray 11 C"],
   cP:"Le Noir = 54.5% de la cohorte pour 'calme intérieur'. Pas l'absence — l'absorption totale. Lumière, regard, attention : tout est absorbé. Acte de disparition stratégique.",
   sil:"Cocoon Oversize — enveloppement maximal",silD:"72.7% oversize = liberté. Pour le Fortress, l'oversize = armure. Volume supplémentaire = espace tampon où le système nerveux se régule sans interférence.",
   sR:"Le Pilier Silencieux",sD:"Ne parle pas mais stabilise l'espace. Le sofa de velours sur lequel les autres s'appuient. Sans le Fortress, le Soul Lounge perdrait sa gravité.",
   traj:"Extraction → Accumulation → Sanctuaire",trajD:"Stade 1 : construit les fondations. Évolution → Vanguard (expression) ou Archivist (organisation).",
   surv:"27.3% poids=ancrage, 54.5% noir=bouclier, 68.7% refusent beau si inconfortable."},
  {code:"SPGE",name:"THE VANGUARD",icon:Anchor,color:"#2563eb",sub:"Souveraineté Spatiale — Forteresse Exprimée",
   axes:{SI:22,PT:18,GV:20,CE:70},axLab:{SI:"SENSORY",PT:"PROTECTIVE",GV:"GROUNDED",CE:"EXPRESSED"},
   narr:"Le Fortress qui a décidé d'être vu. Chaque centimètre de volume = déclaration de souveraineté. Le Nylon résiste aux agressions, le Néoprène structure la silhouette en armure visible.\n\nTransition Armure Protectrice → Enveloppement expressif. La protection peut être un statement — montrer ses murs est un acte de pouvoir.\n\nVolume perçu modifie la perception de l'espace occupé → hausse testostérone + baisse cortisol (power posing amplifié par textile).",
   nT:"Affirmation par le volume — Power Posing textile",
   nD:"Exploite Carney, Cuddy & Yap (2010) + Enclothed Cognition. Le volume du Bomber force une posture d'expansion → testostérone +20%, cortisol -25% en 2min. Le Néoprène maintient cette posture = power posing permanent.",
   mP:"Nylon Ripstop 70D",mPD:"Résiste 45kg avant déchirure grâce à grille renforcée. 68gsm ultra-léger mais indestructible — protection dans la structure, pas le poids.",
   mS:"Néoprène bonded 5mm",mSD:"850gsm semi-rigide maintient silhouette architecturale au repos. Isolation thermique = micro-climat stable.",
   mT:"Moquette technique intérieure",mTD:"Contraste extérieur technique/froid + intérieur organique/chaud. Activation de deux modes sensoriels simultanés.",
   charge:"2.6kg",res:"40Hz",tGsm:"918gsm",garment:"Bomber Shield",
   gD:"Oversize épaules structurées Néoprène. Raglan amplitude mouvement. Double zip YKK Vislon. Poches cargo rabat. Col côtelé maille. Réfléchissant minimal zone dorsale.",
   pal:["#101820","#C8102E"],palN:["Black 6 C","186 C Ruby"],
   cP:"Ruby = arousal physiologique. Le rouge augmente fréquence cardiaque + adrénaline. Les accents Ruby sont des signaux d'alerte : 'je suis ici, j'occupe cet espace'.",
   sil:"Volume architectural — épaules structurées",silD:"15.2% préfèrent structuré. Le volume n'est pas liberté mais occupation. Le vêtement est un cadre, pas un cocon.",
   sR:"Le Gardien de la Porte",sD:"Définit les limites du Soul Lounge. Sa présence marque la frontière intérieur/extérieur. Il est le seuil vivant.",
   traj:"Protection silencieuse → Expression → Occupation",trajD:"Stade 2 : Synthèse d'Autorité. Évolution → Ritualist ou Commander.",
   surv:"15.2% structuré=force, 81.3% mélange armure+invitation."},
  {code:"IPGC",name:"THE ARCHIVIST",icon:Database,color:"#64748b",sub:"Sécurité Organisationnelle — Sérénité par la Structure",
   axes:{SI:65,PT:25,GV:22,CE:18},axLab:{SI:"INTENTIONAL",PT:"PROTECTIVE",GV:"GROUNDED",CE:"COVERT"},
   narr:"Le stratège invisible. Là où le Fortress empile du poids et le Vanguard du volume, l'Archivist organise. Chaque poche = tiroir de confiance, chaque couture = point d'ancrage rationnel.\n\nDamasio : lien organisation cognitive ↔ régulation émotionnelle. Marqueurs somatiques d'ordre : quand chaque objet est à sa place, le cerveau reçoit 'monde contrôlé' → anxiété anticipatoire réduite.\n\nGabardine = précision sans ostentation. Trench à poches dissimulées = système de classement portable.",
   nT:"Sérénité par la structure — Anxiolytique organisationnel",
   nD:"Active cortex préfrontal dorsolatéral (planification). Savoir chaque objet 'archivé' crée un marqueur somatique de contrôle. Le vêtement externalise la fonction d'organisation du cerveau.",
   mP:"Gabardine technique 350gsm",mPD:"Armure sergée serrée résistante eau. Structure régulière = signal d'ordre pour les doigts. Chaque diagonale identique, chaque fil prévisible.",
   mS:"Doublure Bemberg 120gsm",mSD:"Cupro = glissement parfait pour accès poches. Efficacité mouvement = anxiolytique.",
   mT:"Fermetures magnétiques",mTD:"Feedback 'click' satisfaisant = signal sensoriel de fermeture confirmée → rassurance système nerveux.",
   charge:"1.8kg",res:"0dB",tGsm:"470gsm",garment:"Trench dissimulé",
   gD:"Classique réinterprété. 12 poches dissimulées (3 niveaux). Zip invisibles + rabats magnétiques. Ceinture structurante. Col tempête. Coutures thermosoudées.",
   pal:["#6b6f73","#8a7e6b"],palN:["Cool Gray 9 C","7530 C"],
   cP:"Gris moyens = neutralité stratégique. Ni noir ni blanc = invisibilité calculée, observer sans être catalogué.",
   sil:"Classique restructuré — précision invisible",silD:"Pas de statement. Correcte, précise, fonctionnelle. L'absence d'excès EST le message.",
   sR:"Le Chroniqueur",sD:"Documente. Observe les dynamiques, mémorise les échanges, structure l'intelligence collective.",
   traj:"Observation → Classification → Archive identitaire",trajD:"Entre stade 1 et 2. Évolution → Analyst ou Diplomat.",
   surv:"63.6% douceur interne, 12.1% ajusté=contrôle."},
  {code:"IPGE",name:"THE DIPLOMAT",icon:Heart,color:"#94a3b8",sub:"Équilibre Social — Confiance par la Souplesse",
   axes:{SI:60,PT:30,GV:25,CE:65},axLab:{SI:"INTENTIONAL",PT:"PROTECTIVE",GV:"GROUNDED",CE:"EXPRESSED"},
   narr:"Le négociateur textile. Ni armure ni invitation — les deux. 81.3% de la cohorte refusent de choisir.\n\nCachemire double-face : face pour soi (douceur) + face pour le monde (élégance). Cuir d'agneau 0.8mm = souplesse d'adaptation sans sacrifier structure.\n\nExploite la 'signification symbolique' : le Blazer dit 'je suis compétent' avant que le porteur ne parle.",
   nT:"Confiance par la souplesse — Double-face neurochimique",
   nD:"Active cortex préfrontal ventromédial (marqueurs somatiques sociaux de Damasio). Le Cachemire envoie signal compétence-bienveillance réduisant menace perçue chez l'interlocuteur. Marqueur : 'je suis en terrain connu' même en territoire inconnu.",
   mP:"Cachemire double-face 450gsm",mPD:"Chèvre Hircus 14.5μm = douceur maximale. Double-face : brossé (interne, réconfort) + lisse (externe, présentation).",
   mS:"Cuir d'agneau plongé 0.8mm",mSD:"Le plus souple des cuirs. Se plie comme tissu + signification symbolique (autorité, durabilité). Poids minimal 450gsm.",
   mT:"Doublure soie twill 14mm",mTD:"Glissement facilitant mobilité sociale. Enfiler/retirer = geste fluide sans friction physique ni sociale.",
   charge:"1.2kg",res:"180Hz",tGsm:"900gsm",garment:"Blazer Soft-Shell",
   gD:"Semi-ajusté non-structuré. Cuir d'agneau coudes/col. 2 boutons corne. Poches passepoilées. Dos pinces allongées. Finitions main boutonnières.",
   pal:["#A39382","#b3b0ad"],palN:["4515 C Sable","Cool Gray 5 C"],
   cP:"Sable = chaleur Soul Lounge. Cool Gray 5 C = neutralité pro. Ensemble : 'accessible mais pas vulnérable'.",
   sil:"Semi-ajustée — aisance calculée",silD:"Ni oversize ni ajusté = compromis sensoriel satisfaisant confort ET présentation.",
   sR:"Le Médiateur",sD:"Facilite la conversation entre profils incompatibles. Traduit le silence du Fortress en langage que le Catalyst comprend.",
   traj:"Observation sociale → Calibration → Navigation fluide",trajD:"Stade 2 : Synthèse par diplomatie. Évolution → Strategist ou Performer.",
   surv:"81.3% mélange armure+invitation, 63.6% douceur=réassurance."},
]},
{id:"B",name:"LES ORACLES",sub:"Vision & Énergie",color:"#10b981",icon:Eye,
 phil:"Les Oracles sont les Seekers of the Invisible. Leur relation au vêtement est exploratoire : chaque texture = indice, chaque couleur = fréquence à décoder. Branche dynamique où curiosité remplace protection.",
 arch:[
  {code:"ITVE",name:"THE CATALYST",icon:Zap,color:"#f59e0b",sub:"Activation Sensorielle — Éveil par le Contraste",
   axes:{SI:75,PT:65,GV:80,CE:82},axLab:{SI:"INTENTIONAL",PT:"TECHNICAL",GV:"VIBRANT",CE:"EXPRESSED"},
   narr:"Défibrillateur esthétique. Le contraste Ruby/Blanc = prescription neurologique. Semir Zeki (neuro-esthétique) : contrastes forts activent zones récompense + auto-affirmation.\n\nParka Flash = Chromathérapie Fonctionnelle stimulant porteur ET environnement social.\n\nIncarne le 'More is More' comme réanimation sensorielle — quand tout est gris, le rouge est un acte politique.",
   nT:"Éveil par contraste — Chromathérapie fonctionnelle",
   nD:"Ruby (620-750nm) → système sympathique : fréquence cardiaque +5-8 BPM, conductance cutanée ↑, adrénaline. Combiné blanc = 'choc perceptif' réinitialisant l'attention. Marqueur somatique : 'le monde est vivant et je suis dedans'.",
   mP:"Mesh technique 4-way 120gsm",mPD:"Respirabilité max. Transparence = statement de non-dissimulation.",
   mS:"Tissus réfléchissants 3M Scotchlite",mSD:"1000 candelas/lux renvoyés. Visible dans l'obscurité = présence involontaire.",
   mT:"Membrane imperméable soudée",mTD:"Fonctionnalité sous stress environnemental. Le Catalyst ne s'arrête pas.",
   charge:"1.5kg",res:"4kHz",tGsm:"420gsm",garment:"Parka Flash",
   gD:"Allongée asymétrique. Mesh aisselles/dos. 3M aux coutures. Capuche visière. Zip Aquaguard. Ruby principal, doublure blanc. Ventilation zips latéraux.",
   pal:["#C8102E","#ffffff"],palN:["186 C Ruby","Bright White"],
   cP:"Ruby = arousal DIGGERZ. Blanc = pureté d'intention. Contraste maximal du spectre = prescription neuroscientifique.",
   sil:"Asymétrique technique — mouvement perpétuel",silD:"L'asymétrie empêche le cerveau de 'classer et ignorer' — chaque angle exige un recalcul perceptif.",
   sR:"L'Étincelle",sD:"Initie. Lance la première conversation, brise le premier silence. Sans lui, le Soul Lounge resterait en veille.",
   traj:"Éveil → Provocation → Activation collective",trajD:"Stade 3 : Radiance. Déjà à plein potentiel.",
   surv:"6.1% couleurs vives = calme. Le paradoxe : activation comme apaisement."},
  {code:"ITVC",name:"THE SEEKER",icon:Eye,color:"#10b981",sub:"Modularité Adaptative — Curiosité Augmentée",
   axes:{SI:70,PT:72,GV:80,CE:30},axLab:{SI:"INTENTIONAL",PT:"TECHNICAL",GV:"VIBRANT",CE:"COVERT"},
   narr:"Le Digger originel — 'Chercheur d'Invisible' du manifeste. Métaphore fondatrice : nous sommes tous mineurs de nos vies, en quête de notre pépite intérieure.\n\nGore-Tex Pro 3L = liberté totale en toute condition. Dyneema CT5 = 200kg traction poids minimal. Pas de lourdeur, juste zéro limitation.\n\nModularité = approche cognitive : chaque situation nécessite configuration différente. Le vêtement = outil adaptatif.",
   nT:"Curiosité augmentée — Libération du cortex exploratoire",
   nD:"Active circuit dopaminergique mésolimbique (curiosité/exploration). En éliminant toute contrainte, le cerveau concentre ses ressources sur l'exploration cognitive. Marqueur : 'rien ne me retient' → invitation à explorer.",
   mP:"Gore-Tex Pro 3L",mPD:"3 couches soudées : textile, membrane ePTFE (9 milliards pores/cm²), doublure. Imperméabilité 28000mm, respirabilité 25000g/m²/24h.",
   mS:"Dyneema Composite CT5",mSD:"15× plus résistant que l'acier à poids égal. 43gsm = armure invisible pesant moins qu'un t-shirt.",
   mT:"Zips étanches AquaGuard",mTD:"Modularité sans compromis sur intégrité du système.",
   charge:"0.9kg",res:"20-20kHz",tGsm:"223gsm",garment:"Veste Modulaire",
   gD:"Système 3 pièces : coque Gore-Tex + doublure Primaloft amovible + gilet Dyneema. 8 points d'attache. Capuche compatible casque.",
   pal:["#888B8D","#F2F2F2"],palN:["Cool Gray 8 C","7527 C"],
   cP:"Cool Gray 8 C = infrastructure invisible. Ghost = page blanche. Le vêtement s'efface pour laisser le monde entrer.",
   sil:"Technique-articulée — zéro friction",silD:"Chaque couture suit ligne de mouvement. Le vêtement ne doit jamais être perçu — transparent.",
   sR:"L'Explorateur",sD:"Découvre les recoins du Soul Lounge que personne n'avait vus. Trouve le détail, le lien caché.",
   traj:"Curiosité → Exploration → Cartographie",trajD:"Mouvement perpétuel entre stades. Trajectoire = objectif. Évolution → Alchemist ou Oracle.",
   surv:"72.7% oversize (liberté) en version technique — liberté par ingénierie."},
  {code:"STVE",name:"THE KINETIC",icon:Sparkles,color:"#34d399",sub:"Libération du Geste — Flux d'Endorphines",
   axes:{SI:30,PT:60,GV:85,CE:75},axLab:{SI:"SENSORY",PT:"TECHNICAL",GV:"VIBRANT",CE:"EXPRESSED"},
   narr:"Corps en mouvement. Extension du geste. Élasthanne 4-way = extension multidirectionnelle sans frein. Le Kinetic habite cinétiquement.\n\n'Modularity Adaptive' : le vêtement s'adapte aux mouvements (inspiré arts martiaux) pour ne jamais entraver.\n\nMouvement libre → endorphines réelles, et le vêtement amplifie cette réponse neurochimique.",
   nT:"Flux d'endorphines — Amplification cinétique",
   nD:"Boucle mouvement-endorphine : mouvement libre → endorphines → bien-être → envie mouvement. Vêtement zéro résistance amplifie la boucle — la chaîne neurochimique n'est jamais interrompue.",
   mP:"Élasthanne 4-way stretch",mPD:"Extension 360° à 150% avec retour élastique parfait. Corps libre en toute position.",
   mS:"Jersey Schoeller 3xDry 280gsm",mSD:"Triple gestion humidité : absorption, distribution, évaporation.",
   mT:"Inserts mesh aéré",mTD:"Ventilation passive zones de chaleur pour thermorégulation continue.",
   charge:"0.7kg",res:"300Hz",tGsm:"280gsm",garment:"Combinaison Flow",
   gD:"Mono-pièce articulée. Coutures plates (flatlock). Genoux/coudes pré-articulés. Zip intégral. Ceinture élastique. Poids <700g.",
   pal:["#5a5e62","#c0c0c0"],palN:["Cool Gray 10 C","Silver"],
   cP:"Silver = mouvement fluide (mercure). Cool Gray 10 C = neutralité technique. Machine en mouvement.",
   sil:"Articulée-cinétique — pré-tension",silD:"Pas d'état au repos — toujours prête. Lignes de mouvement du corps, pas conventions mode.",
   sR:"L'Énergie",sD:"Ne s'assoit jamais. Circule, danse, transmet l'énergie par le mouvement.",
   traj:"Impulsion → Mouvement → Flow continu",trajD:"Transcende la trajectoire. EST le mouvement. Évolution → Catalyst ou Performer.",
   surv:"72.7% oversize = liberté de mouvement pur."},
  {code:"STVC",name:"THE ALCHEMIST",icon:Compass,color:"#a78bfa",sub:"Harmonie des Textures — Fusion Sensorielle",
   axes:{SI:25,PT:60,GV:78,CE:35},axLab:{SI:"SENSORY",PT:"TECHNICAL",GV:"VIBRANT",CE:"COVERT"},
   narr:"Transmutateur. Douceur velours → audace. Poids duvet → légèreté perçue. Fusionne textures contradictoires en vibration harmonique.\n\nVelours 600gsm caresse parasympathique. Lin 320gsm ancre par rugosité. Ensemble = 'fusion sensorielle' où le corps perçoit une vibration composite.\n\nKimono Hybrid = transmutation : enveloppement asymétrique, superposition visible, dialogue entre surfaces.",
   nT:"Fusion sensorielle — Vibration composite",
   nD:"Active simultanément Meissner (toucher fin/velours) et Ruffini (pression/lin). Co-activation = signal composite plus complexe. Marqueur : 'plénitude tactile' — rien ne manque.",
   mP:"Velours de soie 600gsm",mPD:"Pile soie 8mm sur base coton. Réfléchit lumière de manière variable — tissu vivant visuellement et tactilement.",
   mS:"Lin technique lavé 320gsm",mSD:"Enzyme-lavé 12× pour souplesse optimale + texture brute. Rugosité calibrée : éveille sans irriter.",
   mT:"Fil de soie métallisé (trame)",mTD:"Soie enrobée cuivre dans la trame — invisible à l'oeil, perceptible au toucher. Surprises cachées dans la matière.",
   charge:"1.4kg",res:"200Hz",tGsm:"920gsm",garment:"Kimono Hybrid",
   gD:"Asymétrique superposition croisée. Panneaux alternés velours/lin. Ceinture Obi cuir. Manches amples. Doublure soie brute. Finitions roulottées main.",
   pal:["#A39382","#F2F2F2"],palN:["4515 C Sable","7527 C"],
   cP:"Sable + Ghost = palette Soul Lounge. Terre (matière) + lumière (esprit) = creuset de transmutation.",
   sil:"Enveloppante asymétrique — superposition visible",silD:"Kimono = enveloppement non-contraint. Asymétrie maintient cerveau en mode exploration.",
   sR:"Le Transmutateur",sD:"Transforme l'atmosphère. Conversation tendue → échange fluide. Sa présence altère la chimie de l'espace.",
   traj:"Perception → Mélange → Transmutation",trajD:"Transition permanente. Extrait, synthétise, rayonne simultanément en mode caché. Évolution → Mystic.",
   surv:"Fusionne 63.6% douceur + 27.3% poids en profil composite."},
]},
{id:"C",name:"LES ANALYSTES",sub:"Précision & Data",color:"#94a3b8",icon:Cpu,
 phil:"Les ingénieurs du Substrate. Là où Sentinelles ressentent et Oracles explorent, les Analystes calculent. Relation systémique au vêtement. Branche 'Intentional × Technical'.",
 arch:[
  {code:"ITGC",name:"THE ANALYST",icon:Target,color:"#94a3b8",sub:"Focus Cognitif — Réduction Fatigue Mentale",
   axes:{SI:72,PT:65,GV:25,CE:20},axLab:{SI:"INTENTIONAL",PT:"TECHNICAL",GV:"GROUNDED",CE:"COVERT"},
   narr:"Élimine le bruit. Mérinos 17.5μm supprime distractions corporelles. Quand le corps cesse de signaler, le cerveau récupère une bande passante massive.\n\nThéorie charge cognitive : chaque signal corporel consomme capacité de traitement. Mérinos élimine ces signaux → 100% capacité pour la tâche.\n\nLe vêtement devient transparent au système nerveux.",
   nT:"Transparence sensorielle — Charge cognitive réduite",nD:"Théorie charge cognitive : cerveau = capacité limitée. Chaque signal (froid, friction, poids) consomme cette capacité. Mérinos 17.5μm élimine les signaux → cerveau récupère 100% pour cognition.",
   mP:"Laine mérinos 17.5μm",mPD:"Sous seuil démangeaison (25μm). Régulation thermique 5-30°C. Antibactérienne. Ne signale jamais son existence.",
   mS:"Popeline coton 120/2",mSD:"Fil retors : uniformité parfaite. Aucune surprise tactile.",
   mT:"Boutons corne naturelle",mTD:"Feedback tactile chaud rappelant l'humain derrière le système.",
   charge:"1.1kg",res:"Neutre",tGsm:"400gsm",garment:"Pull Logic",
   gD:"Coupe droite col rond. Coutures plates. Aucun décor. Fully-fashioned. Emmanchure ergonomique mouvement bras répétitif.",
   pal:["#3d4249","#101820"],palN:["Cool Gray 11 C","Black 6 C"],cP:"Zéro stimulation chromatique. Le vêtement ne demande aucune attention.",
   sil:"Droite minimale — zéro distraction",silD:"Si précise qu'elle disparaît. L'Analyst veut penser, pas penser à ses vêtements.",
   sR:"L'Observateur Quantitatif",sD:"Mesure. Compte interactions, chronomètre silences, évalue dynamiques avec précision insoupçonnée.",
   traj:"Observation → Optimisation → Transparence",trajD:"Évolution → Strategist ou Architect.",surv:"12.1% ajusté + 68.7% confort>beauté."},
  {code:"ITGE",name:"THE STRATEGIST",icon:Layers,color:"#cbd5e1",sub:"Autorité Géométrique — Stature et Contrôle",
   axes:{SI:70,PT:68,GV:30,CE:72},axLab:{SI:"INTENTIONAL",PT:"TECHNICAL",GV:"GROUNDED",CE:"EXPRESSED"},
   narr:"Architecture l'autorité. Cuir chèvre = structure, Mohair = adoucissement de la dominance. Pardessus Architect : chaque angle = argument, chaque ligne = directive.\n\nExploite le plus intensément la 'signification symbolique' : pardessus = autorité est un code culturel déclenchant réponse neurochimique automatique.",
   nT:"Architecture d'autorité — Doctor's coat effect",nD:"Même circuit qu'Adam & Galinsky : porter vêtement associé autorité → attention soutenue +50%. Cuir rigide ajoute signal proprioceptif 'structure'. Marqueur : 'je dirige'.",
   mP:"Cuir de chèvre rigide 1.5mm",mPD:"Rigidité naturelle supérieure au bovin + plus léger. Texture graineuse = artisanat + permanence.",
   mS:"Mohair brossé 550gsm",mSD:"Fibre Angora lustré. Brossage = surface veloutée adoucissant rigidité cuir.",
   mT:"Doublure Cupro technique",mTD:"Glissement drapé intérieur facilitant enfilage = geste naturel.",
   charge:"2.8kg",res:"38Hz",tGsm:"2050gsm",garment:"Pardessus Architect",
   gD:"Droit épaules marquées longueur genou. Col cranté. Croisé 6 boutons corne. Cuir aux épaules/col. Poches rabat. Martingale dos.",
   pal:["#101820","#A39382"],palN:["Black 6 C","4515 C"],cP:"Black = autorité absolue. Sable = chaleur humaine empêchant intimidation.",
   sil:"Structurée-classique — géométrie de commandement",silD:"15.2% structuré. Longueur genou = autorité optimale (ni casual ni cape).",
   sR:"Le Directeur",sD:"Donne direction aux sessions. Cadre le sujet, distribue la parole, maintient le cap.",
   traj:"Analyse → Architecture → Commandement",trajD:"Stade 2-3 : synthétise ET rayonne par autorité.",surv:"15.2% structuré + 54.5% noir = autorité projetée."},
  {code:"STGC",name:"THE ARCHITECT",icon:Box,color:"#78716c",sub:"Symétrie Systémique — Stabilité Mentale",
   axes:{SI:35,PT:55,GV:20,CE:22},axLab:{SI:"SENSORY",PT:"TECHNICAL",GV:"GROUNDED",CE:"COVERT"},
   narr:"Construit la symétrie. Feutre 800gsm = densité construction. Canvas ciré résiste sans déformation. Blouson Grid = grille invisible, chaque couture à angle droit.\n\nStabilité mentale naît de l'ordre physique : vêtement symétrique → signal d'équilibre → propagation au système nerveux.",
   nT:"Symétrie comme anxiolytique",nD:"Cerveau câblé pour détecter symétrie (visages, environnements). Symétrie parfaite → signal 'monde ordonné' au cortex visuel → rétroaction amygdale → anxiété réduite.",
   mP:"Feutre compressé 800gsm",mPD:"Mérinos compressé 3mm. Dense comme carton mais souple. Coupe laser sans effilochage.",
   mS:"Canvas 14oz coton ciré",mSD:"Cire d'abeille imperméable. Patine permanente — mémorise l'architecture du corps.",
   mT:"Rivets laiton",mTD:"Solidité visible = signal durabilité rassurant.",
   charge:"2.1kg",res:"42Hz",tGsm:"1280gsm",garment:"Blouson Grid",
   gD:"Coupe carrée. Coutures 90° exclusivement. Canvas avant, feutre dos. Poches géométriques couture contrastante. Col Mao. Double zip.",
   pal:["#9a9ea2","#ffffff"],palN:["Cool Gray 6 C","White"],cP:"Gris + blanc = grille de référence, système de coordonnées.",
   sil:"Carrée-géométrique — grille visible",silD:"Forme la plus stable. Ne flatte pas, structure. L'Architect cherche l'ordre.",
   sR:"Le Constructeur",sD:"Organise l'espace physique du Soul Lounge — sièges, angles, circulation.",
   traj:"Mesure → Construction → Système stable",trajD:"Stade 1-2 : extrait par mesure, synthétise par construction.",surv:"Structure = anxiolytique. Ordre physique = ordre mental."},
  {code:"STGE",name:"THE PERFORMER",icon:Star,color:"#a8a29e",sub:"Ergonomie Scénique — Présence et Aisance",
   axes:{SI:30,PT:55,GV:28,CE:78},axLab:{SI:"SENSORY",PT:"TECHNICAL",GV:"GROUNDED",CE:"EXPRESSED"},
   narr:"Habite la scène. Satin = mouvement fluide sous projecteurs, Denim enduit = ancrage backstage. Veste Vibration = ergonomie du geste scénique.\n\nPrésence naît de l'aisance : corps libre → performance naturelle. Le Performer EST sa performance grâce à zéro résistance au geste.",
   nT:"Libération du performer intérieur",nD:"Boucle confiance-performance : vêtement facilitant mouvement → gestes amples → feedback visuel confiance → renforcement interne. Satin reflète lumière dynamiquement — chaque mouvement = événement lumineux.",
   mP:"Satin technique stretch",mPD:"Polyester + 5% élasthanne. Surface réfléchissante captant lumière en mouvement = amplificateur de présence.",
   mS:"Denim enduit 16oz",mSD:"Résine polyuréthane semi-brillante. Contraste satin. Ancrage dans le concret.",
   mT:"Doublure mesh aérée",mTD:"Ventilation pour conditions scéniques — lumières chaudes, mouvement intense.",
   charge:"1.6kg",res:"1kHz",tGsm:"960gsm",garment:"Veste Vibration",
   gD:"Cintrée dos articulé. Satin épaules/avant-bras. Denim enduit corps. Mesh doublure. Emmanchure haute. Col V profond.",
   pal:["#C8102E","#767b80"],palN:["186 C Ruby","Cool Gray 7 C"],cP:"Ruby = scène, Cool Gray = backstage. Le Performer habite les deux.",
   sil:"Cintrée articulée — ergonomie du geste",silD:"Suit le corps sans contraindre. Montre la forme pour amplifier le mouvement.",
   sR:"L'Animateur",sD:"Donne le rythme. Lance sujets avec énergie, réagit avec expressivité, maintient le tempo.",
   traj:"Préparation → Entrée → Performance totale",trajD:"Stade 3 : Radiance par la scène.",surv:"81.3% mélange armure+invitation — protégé PAR sa visibilité."},
]},
{id:"D",name:"LES MYSTIQUES",sub:"Esprit & Soul Lounge",color:P.sable,icon:Moon,
 phil:"Dimension spirituelle. Vêtement transcende fonction et esthétique — touche au sacré. Gardiens du Soul Lounge intérieur. S'habiller = rituel, se déshabiller = offrande.",
 arch:[
  {code:"SPVC",name:"THE KEEPER",icon:Moon,color:"#6366f1",sub:"Réconfort Profond — Relaxation Parasympathique",
   axes:{SI:22,PT:18,GV:75,CE:25},axLab:{SI:"SENSORY",PT:"PROTECTIVE",GV:"VIBRANT",CE:"COVERT"},
   narr:"Enveloppe. Shearling = chaleur animale originelle, souvenir cellulaire de la première peau. Molleton 800gsm = couverture lestée portable.\n\nManteau Cocoon = Soul Lounge portable. L'environnement du dossier stratégique (velours, lumière, tapis) porté sur soi. Parasympathique activé par pression profonde.\n\nGardien du 'safe space interne' — lieu où vulnérabilité est permise.",
   nT:"Couverture lestée ambulante — Activation vagale",nD:"Deep Pressure Stimulation (3.5kg) active nerf vague → fréquence cardiaque -5-15 BPM, pression artérielle ↓, sérotonine ↑ (précurseur mélatonine). Shearling ajoute thermorécepteurs. Marqueur : 'je suis bercé' — sécurité primordiale.",
   mP:"Shearling mouton naturel",mPD:"Peau retournée : cuir extérieur, toison intérieure. Fibres 25-30μm = micro-climat 37°C. Absorbe 30% poids en humidité sans sensation mouillé.",
   mS:"Molleton brossé 800gsm",mSD:"Coton brossé double face. Poids calibré DPS thérapeutique — assez lourd nerf vague, assez souple pour ne pas contraindre.",
   mT:"Boutons bois naturel",mTD:"Toucher chaud organique. Boutonnage = acte connexion naturelle.",
   charge:"3.5kg",res:"28Hz",tGsm:"1800gsm",garment:"Manteau Cocoon",
   gD:"Enveloppant drapé longueur cheville. Col châle profond. Fermeture croisée ceinture intérieure. Pas de boutons visibles — enveloppement = fermeture. Poches profondes mains entières. Doublure Molleton intégrale.",
   pal:["#A39382","#F2F2F2"],palN:["4515 C Sable","7527 C"],cP:"Sable + Ghost = palette cocon. Terre (origine) + lumière (destination). Espace de gestation identitaire.",
   sil:"Enveloppante drapée — cocoon total",silD:"Pas de structure. Épouse, drape, enveloppe. Silhouette générée par le corps.",
   sR:"Le Gardien du Feu",sD:"Maintient la chaleur du Soul Lounge. Sa présence est le feu de camp autour duquel les autres se rassemblent.",
   traj:"Refuge → Incubation → Naissance de la gemme",trajD:"Stade 1 profond : Extraction organique lente. Cocon = lieu de métamorphose. Évolution → Ritualist ou Mystic.",
   surv:"63.6% douceur + 27.3% poids + 78.8% soulagement changement tenue — le Keeper EST le soulagement."},
  {code:"SPVE",name:"THE RITUALIST",icon:Flame,color:"#dc2626",sub:"Sacralité Vestimentaire — Connexion Culturelle",
   axes:{SI:20,PT:15,GV:82,CE:80},axLab:{SI:"SENSORY",PT:"PROTECTIVE",GV:"VIBRANT",CE:"EXPRESSED"},
   narr:"Sacralise l'acte de s'habiller. Jacquard fil d'or = héritage Soul Train, souveraineté culturelle. Cuir embossé croco = autorité ancestrale.\n\nCape Ceremony = rituel incarné. S'habiller = cérémonie. Philosophie DIGGERZ comme liturgie.\n\nOverdress = 'More is More' sacré : chaque couche = prière, chaque texture = invocation.",
   nT:"Connexion culturelle — Mémoire collective textile",nD:"Active cortex temporal (reconnaissance symbolique) + insula (émotion corporelle). Jacquard or = associations luxe, royauté, Soul Train = 'souvenirs collectifs' culturels. Marqueur : 'j'appartiens à une lignée'.",
   mP:"Jacquard fil d'or 24K",mPD:"Trame fil d'or 0.3mm plaqué 24K sur chaîne soie noire. Motif du tissage — or structurel, pas décoratif.",
   mS:"Cuir embossé crocodile 2mm",mSD:"Bovin embossé à chaud. Écailles relief = pattern tactile répétitif rappelant armures ancestrales.",
   mT:"Doublure brocart rubis",mTD:"Intérieur aussi opulent qu'extérieur — le rituel ne distingue pas visible/invisible.",
   charge:"2.4kg",res:"32Hz",tGsm:"1750gsm",garment:"Cape Ceremony",
   gD:"Cape cheville col montant. Agrafes dissimulées. Épaules structurées cuir. Doublure brocart intégrale. Broderie main fil or zone dorsale. Harnais interne distribution poids.",
   pal:["#C8102E","#A39382"],palN:["186 C Ruby","4515 C"],cP:"Ruby = feu (passion, rituel). Sable = terre (ancêtres, racines). Le rouge canalisé en énergie cérémonielle.",
   sil:"Cape cérémonielle — Overdress sacré",silD:"Forme vestimentaire la plus ancienne — précède la couture. Le Ritualist remonte aux origines du vêtement.",
   sR:"Le Maître de Cérémonie",sD:"Ouvre et ferme les sessions. Présence transforme réunion en événement, échange en rituel.",
   traj:"Apprentissage → Pratique → Officiation",trajD:"Stade 3 : Radiance par le sacré. Courage de la dévotion visible.",
   surv:"'More is More' comme acte spirituel — pas le surplus, le nécessaire."},
  {code:"IPVC",name:"THE MYSTIC",icon:Aperture,color:"#7c3aed",sub:"Vibration Subtile — État de Flow Continu",
   axes:{SI:62,PT:22,GV:78,CE:28},axLab:{SI:"INTENTIONAL",PT:"PROTECTIVE",GV:"VIBRANT",CE:"COVERT"},
   narr:"Vibre sur fréquence invisible. Chanvre = ancrage terrestre, Fibres d'argent = réseau invisible. Robe Substrate = interface monde visible/Substrate.\n\nFlow = fréquence de base. Le vêtement ne produit pas le flow, il cesse de l'interrompre. Contact tactile continu + prévisible → système nerveux en résonance stable.",
   nT:"État de flow — Résonance neurologique",nD:"Flow (Csikszentmihalyi) : action et conscience fusionnent. Maintenu par élimination interruptions + stimulation proprioceptive constante prévisible. Fibres argent éliminent micro-distractions (odeurs). Le flow n'est pas un pic — c'est le plateau.",
   mP:"Chanvre lourd 500gsm",mPD:"Fibre plus durable du végétal — résistance 55cN/tex. Poids modéré ancre sans lourdeur. Texture brute régulière = fond sensoriel constant.",
   mS:"Fibres d'argent 99.9%",mSD:"Argent pur 5% dans tissage. Conductivité thermique distribution chaleur uniforme. Antibactérien passif éliminant micro-distractions.",
   mT:"Coutures thermosoudées invisibles",mTD:"Aucune ligne de couture n'interrompt la surface. Objet continu.",
   charge:"1.8kg",res:"15kHz",tGsm:"500gsm",garment:"Robe Substrate",
   gD:"Droite ample cheville. Col kimono. Ceinture chanvre/argent. Manches amples. Pas de fermeture — superposition. Thermosoudé intégral.",
   pal:["#F2F2F2","#8b0000"],palN:["7527 C","Deep Ruby"],cP:"Ghost = conscience claire, espace entre pensées. Deep Ruby caché = flamme intérieure secrète.",
   sil:"Ample continue — sans couture",silD:"Forme la plus simple. Tissu entourant corps sans le former. Simplicité = sophistication ultime.",
   sR:"Le Centre Silencieux",sD:"Centre gravitationnel. Ne parle pas, ne bouge pas. Tout orbite autour de sa présence silencieuse.",
   traj:"Silence → Vibration → Résonance",trajD:"Transcende trajectoire linéaire. Habite état permanent de connexion avec le Substrate.",
   surv:"63.6% douceur + besoin 'certitude d'être' vs 'paraître'."},
  {code:"IPVE",name:"THE ORACLE",icon:Brain,color:"#fbbf24",sub:"Clarté Visionnaire — Vision Futuriste Élargie",
   axes:{SI:65,PT:25,GV:82,CE:72},axLab:{SI:"INTENTIONAL",PT:"PROTECTIVE",GV:"VIBRANT",CE:"EXPRESSED"},
   narr:"Voit à travers. Organza = presque invisible comme pensée pure. Soie habotai glisse sans friction — corps transparent à lui-même. Sur-chemise Vision = vêtement le plus léger du Substrate (0.4kg).\n\nPerçoit tendances avant formation, comprend systèmes avant formation. Choix simples anticipant 3 saisons.\n\nDestination finale DIGGERZ : souveraineté par vision claire, sans besoin de protection ni d'affirmation. Seule reste la lumière.",
   nT:"Vision futuriste — Simulation neurale accélérée",nD:"Exploite réseau par défaut (DMN) pour simuler scénarios futurs. En éliminant TOUT stimulus textile (poids minimal, transparence, zéro friction), le cerveau alloue 100% au DMN. Résultat : 'vision élargie' où patterns émergent du bruit. Marqueur : 'je vois ce qui va arriver'.",
   mP:"Organza technique 45gsm",mPD:"Soie polyester anti-statique. 45gsm = quasi-immatériel. Couche d'air structurée — existe à peine.",
   mS:"Soie habotai 12mm",mSD:"'Soft' en japonais. Soie la plus légère — suit courants d'air, révèle mouvement invisible. Stimule Meissner à seuil minimal.",
   mT:"Finition anti-UV",mTD:"Protection lumière sans dégradation. Voir la lumière sans être aveuglé.",
   charge:"0.4kg",res:"20kHz",tGsm:"101gsm",garment:"Sur-chemise Vision",
   gD:"Droite ample transparence calibrée. Col ouvert. Manches kimono. Se porte ouverte. Roulottées main. 400g total — le plus léger du catalogue.",
   pal:["#ffffff","#F2F2F2"],palN:["Bright White","7527 C"],cP:"Blanc = somme de toutes les couleurs. L'Oracle contient toutes les fréquences. Ghost = chaleur empêchant le clinique.",
   sil:"Éthérée transparente — quasi-absence",silD:"Le plus proche de l'absence. Voile, pas structure. Destination ultime : ne plus avoir besoin d'armure car confiance entièrement intérieure.",
   sR:"Le Visionnaire",sD:"Prononce la vérité que personne ne veut entendre. Clarté = don et malédiction — voit trop, trop tôt.",
   traj:"Perception → Anticipation → Vision → Lumière",trajD:"Stade 3 accompli : Radiance pure. 0.4kg = plus besoin de protection. Transparent = plus besoin de dissimulation.",
   surv:"État final où le vêtement n'est plus armure — il reste comme lumière."},
]},
];

// ═══ FLAT LOOKUP (for test engine + passport) ═══
const ARC={};CL.forEach(c=>c.arch.forEach(a=>{ARC[a.code]={...a,cluster:c.id,clusterName:c.name};}));

// ═══ 80 QUESTIONS ═══
const QC=[{t:"Une couleur sombre me fait sentir en sécurité.",a:{GV:-1,CE:-0.5}},{t:"Je choisis mes couleurs pour MON humeur.",a:{CE:-1,SI:-0.5}},{t:"Le noir est mon bouclier.",a:{PT:-1,CE:-0.5}},{t:"Je porterais du rouge vif devant des inconnus.",a:{CE:1,GV:0.5}},{t:"Les Jewel Tones me donnent de l'énergie.",a:{GV:1,SI:0.5}},{t:"Je calcule quelle couleur porter.",a:{SI:1,PT:0.5}},{t:"La couleur modifie mon état interne.",a:{SI:-1,GV:0.5}},{t:"J'associe couleurs et souvenirs tactiles.",a:{SI:-1,GV:-0.5}},{t:"L'or me fait sentir victorieux/se.",a:{GV:1,CE:0.5}},{t:"Palette neutre — pas d'émotion.",a:{CE:-1,GV:-0.5}},{t:"La couleur est un outil d'influence.",a:{SI:1,CE:1}},{t:"Certaines couleurs = sensation physique.",a:{SI:-1,GV:0.5}},{t:"Couleurs vives = courage.",a:{GV:1,CE:0.5}},{t:"Bleu marine = contrôle.",a:{PT:-0.5,GV:-1,SI:0.5}},{t:"Couleur cachée influence confiance.",a:{CE:-0.5,SI:-1}},{t:"Renoncé couleur vive par peur.",a:{CE:-1,PT:-0.5}},{t:"Améthyste = extravagance.",a:{GV:1,SI:-0.5}},{t:"Couleurs choisies avec données.",a:{SI:1,PT:1}},{t:"Émeraude = performance créative.",a:{GV:0.5,CE:0.5}},{t:"Ma palette parle avant moi.",a:{CE:1,SI:0.5}}];
const QF=[{t:"Oversize = espace autour du corps.",a:{PT:-1,GV:-0.5}},{t:"Épaules marquées = puissance.",a:{PT:0.5,CE:0.5,SI:0.5}},{t:"Superposition = instinct premier.",a:{PT:-1,GV:0.5,CE:0.5}},{t:"Ajusté = contrôle.",a:{SI:0.5,PT:0.5,GV:-0.5}},{t:"Oversize = 'soft armor'.",a:{PT:-1,SI:-0.5}},{t:"Silhouette conçue comme architecte.",a:{SI:1,PT:1}},{t:"Fluidité prime sur forme.",a:{SI:-1,GV:0.5}},{t:"Poches fonctionnelles = assurance.",a:{PT:1,GV:-0.5}},{t:"Volume = espace mental.",a:{SI:-1,PT:-0.5}},{t:"Géométrie = message contrôlé.",a:{SI:1,CE:1}},{t:"Trop près du corps = anxiété.",a:{PT:-1,SI:-0.5}},{t:"Lignes nettes > organiques.",a:{SI:1,PT:1,GV:-0.5}},{t:"Modularité fascinante.",a:{PT:1,SI:1,GV:0.5}},{t:"Corps + vêtement = protection.",a:{PT:-1,SI:-0.5}},{t:"'More is More' = philosophie.",a:{GV:1,CE:1}},{t:"Réversibilité = options.",a:{SI:1,PT:1,CE:0.5}},{t:"Silhouette change selon humeur.",a:{SI:-1,GV:0.5}},{t:"Ergonomie invisible > forme.",a:{CE:-1,PT:0.5}},{t:"Proportions disproportionnées attirent.",a:{GV:1,CE:0.5}},{t:"Forme communique fonction sociale.",a:{CE:1,SI:1}}];
const QM=[{t:"Douceur extrême calme système nerveux.",a:{SI:-1,GV:-0.5}},{t:"Poids épais = sécurité.",a:{SI:-1,PT:-1}},{t:"Vêtement lesté = réduire anxiété.",a:{PT:-1,GV:-0.5}},{t:"Rugosité naturelle éveille.",a:{SI:-1,PT:0.5}},{t:"Soie lourde = autorité.",a:{CE:0.5,SI:0.5,GV:0.5}},{t:"Je juge par toucher d'abord.",a:{SI:-1,CE:-0.5}},{t:"Synthétique gêne physiquement.",a:{SI:-1,PT:-0.5}},{t:"Velours = caresse émotionnelle.",a:{SI:-1,PT:-0.5}},{t:"Choix par propriétés techniques.",a:{SI:1,PT:1}},{t:"Moquette/duvet = couverture lestée.",a:{PT:-1,SI:-1}},{t:"Matériaux innovants attirent.",a:{PT:1,SI:1,GV:0.5}},{t:"Fausse fourrure = luxe Soul Train.",a:{GV:1,CE:1}},{t:"Textures complexes > lisses.",a:{GV:1,CE:0.5}},{t:"Denim brut = ancrage.",a:{GV:-1,PT:-0.5}},{t:"Analyse composition avant achat.",a:{SI:1,PT:1}},{t:"Matière change posture.",a:{SI:-1,CE:0.5}},{t:"Cuir embossé = pouvoir.",a:{CE:0.5,GV:0.5,SI:0.5}},{t:"Contact tissu = non-négociable.",a:{SI:-1,GV:-0.5}},{t:"Matelassage = containment.",a:{PT:-1,SI:-0.5}},{t:"Matières racontent histoire technique.",a:{PT:1,CE:1}}];
const QI=[{t:"Vêtements = armure.",a:{PT:-1,CE:-0.5}},{t:"Vêtements = invitation.",a:{CE:1,GV:0.5}},{t:"Style reflète qui je suis.",a:{CE:0.5,SI:-0.5}},{t:"Style adapté au contexte.",a:{SI:1,CE:0.5}},{t:"Changer tenue = soulagement.",a:{SI:-1,PT:-0.5}},{t:"Peur du regard.",a:{CE:-1,PT:-0.5}},{t:"Société impacte comment je m'habille.",a:{SI:1,CE:-0.5}},{t:"Style optimal trouvé.",a:{CE:0.5,GV:0.5}},{t:"Identité = RÉSISTANCE.",a:{CE:0.5,GV:0.5}},{t:"Fonctionnel avant beau.",a:{PT:1,GV:-0.5,CE:-0.5}},{t:"Luxe fonctionnel résonne.",a:{PT:0.5,SI:0.5}},{t:"Communauté vestimentaire.",a:{CE:1,GV:0.5}},{t:"Authenticité = résistance.",a:{GV:0.5,CE:0.5}},{t:"Discret mais impeccable.",a:{CE:-1,SI:1}},{t:"Vêtement = interface cognitive.",a:{SI:0.5,PT:0.5}},{t:"Garde-robe = intelligence.",a:{SI:1,PT:1,CE:0.5}},{t:"Overdress = souveraineté.",a:{CE:1,GV:1}},{t:"Vulnérabilité = force.",a:{CE:1,GV:0.5}},{t:"Travaille silencieusement.",a:{CE:-1,PT:0.5}},{t:"Chaque espace = Soul Lounge.",a:{CE:1,GV:1,SI:0.5}}];
const TERMS=[{key:"CHROMATIQUE",icon:Palette,q:QC},{key:"MORPHOLOGIE",icon:Box,q:QF},{key:"MATIÈRE",icon:Feather,q:QM},{key:"SOUVERAINETÉ",icon:Fingerprint,q:QI}];

// ═══ FORUM DATA ═══
const FU=[{id:1,name:"Kael_Substrate",arch:"SPVE",lv:3},{id:2,name:"NyxWeaver",arch:"STVC",lv:3},{id:3,name:"VoidArchitect",arch:"ITGC",lv:2},{id:5,name:"RubyForge",arch:"STGE",lv:3},{id:6,name:"PhantomVeil",arch:"SPVC",lv:2},{id:10,name:"CosmicLoom",arch:"ITVE",lv:3}];
const FC=[{id:"general",name:"GÉNÉRAL",icon:MessageCircle,color:P.gray,lv:1},{id:"neuro",name:"NEURO",icon:Brain,color:P.emerald,lv:1},{id:"matiere",name:"MATIÈRES",icon:Feather,color:P.sable,lv:1},{id:"tech",name:"TECH",icon:Database,color:P.violet,lv:2},{id:"soul",name:"SOUL",icon:Moon,color:P.ruby,lv:3}];
const FT0=[
  {id:1,cat:"general",title:"Qu'est-ce que la Confiance Mécanique ?",au:1,date:43200,pin:true,body:"Concept central DIGGERZ : le vêtement comme outil cognitif. Confiance Mécanique = propriétés physiques du textile régulant le système nerveux.\n\nSymbolic Meaning + Physical Experience = Cognitive Change",votes:47,replies:[{id:1,au:2,body:"Évident avec velours 600gsm. Pression épaules change posture ET état mental en 30s.",votes:23,date:42000},{id:2,au:10,body:"Après 80Q, j'ai réalisé que je choisissais déjà selon ces axes. Le Substrate rend conscient l'inconscient.",votes:31,date:38400}]},
  {id:2,cat:"general",title:"'More is More' vs minimalisme stérile",au:10,date:28800,pin:false,body:"Maximalisme DIGGERZ = réponse à l'anesthésie sensorielle. Quand tout est gris, le système nerveux s'éteint. 'More is More' = réanimation.",votes:56,replies:[{id:1,au:1,body:"Chaque couche = refus de conformité. Denim 22oz + Velours + Fourrure = minimum pour exister.",votes:34,date:27000}]},
  {id:3,cat:"neuro",title:"Adam & Galinsky (2012) — implications design",au:3,date:21600,pin:false,body:"Double déclencheur : signification symbolique ET expérience physique simultanées = changement cognitif mesurable.",votes:34,replies:[]},
  {id:4,cat:"matiere",title:"Velours 600gsm vs Molleton 800gsm — terrain",au:5,date:14400,pin:false,body:"Velours → parasympathique ~45s, 'caresse continue'.\nMolleton → ~2min mais plus profond, 'couverture lestée'.",votes:41,replies:[{id:1,au:6,body:"En Keeper (SPVC), le Molleton correspond à mon ancrage continu.",votes:15,date:12600}]},
  {id:5,cat:"tech",title:"[DATA] Survey n=33 — résultats",au:3,date:7200,pin:true,body:"72.7% oversize, 63.6% douceur, 54.5% noir=bouclier, 87.8% réceptifs lestage, 81.3% armure+invitation.",votes:67,replies:[]},
  {id:6,cat:"soul",title:"[SOUL] Session #44 : Overdress = résistance",au:1,date:3600,pin:false,body:"Overdress non pas excès mais nécessité existentielle. Direction capsule : chaque pièce fonctionne seule ET en superposition max.",votes:12,replies:[]},
];

const norm=(x)=>JSON.parse(JSON.stringify(x,(k,v)=>k==="icon"||typeof v==="function"?undefined:v));
const dl=(name,payload)=>{const b=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"});const u=URL.createObjectURL(b);const a=document.createElement("a");a.href=u;a.download=`${name}_${new Date().toISOString().slice(0,10)}.json`;a.click();URL.revokeObjectURL(u);};

const CSS=`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@200;300;400;500;600;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}body{background:${P.black};overflow-x:hidden}
::selection{background:${P.ruby}44;color:${P.ghost}}::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:${P.black}}::-webkit-scrollbar-thumb{background:${P.border}}
textarea:focus,input:focus{outline:1px solid ${P.ruby}66}
@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
@keyframes pulse{0%,100%{opacity:0.5}50%{opacity:1}}@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes scanDown{0%{top:-2px}100%{top:100%}}@keyframes waveA{0%{transform:translateX(0)}50%{transform:translateX(-25%)}100%{transform:translateX(-50%)}}
.fu{animation:fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) both}`;

// ═══ SMALL COMPONENTS ═══
function AB({c,s=12}){if(!c||!ARC[c])return null;const a=ARC[c];const I=a.icon;return <div style={{display:"inline-flex",alignItems:"center",gap:2,padding:"1px 4px",border:`1px solid ${a.color}44`,background:`${a.color}0a`}}><I size={s-4} color={a.color} strokeWidth={1.5}/><span style={{fontFamily:P.mono,fontSize:s-5,color:a.color,letterSpacing:"1px"}}>{c}</span></div>;}
function LB({lv}){const c={1:P.gray,2:P.emerald,3:P.amber};const n={1:"PRSP",2:"INIT",3:"CORE"};return <span style={{fontFamily:P.mono,fontSize:6,color:c[lv],padding:"1px 3px",border:`1px solid ${c[lv]}44`}}>{n[lv]}</span>;}

// ═══ BOOT ═══
function Boot({onDone}){const[lines,setLines]=useState([]);const[p,setP]=useState(0);
  useEffect(()=>{const ms=[{d:200,m:"[SUBSTRATE OS] v5.0 — DIGGERZ"},{d:400,m:`[BOOT] ${sn()}`},{d:600,m:"[INIT] Neural pathways..."},{d:800,m:"[SCAN] 4 axes: SI PT GV CE [OK]"},{d:1100,m:"[ARCH] 16 profiles × 4 clusters"},{d:1400,m:"[TERM] 80 sequences ready"},{d:1700,m:"[NET] 2,847 diggers online"},{d:2000,m:"[SYS] ████████████ COMPLETE"},{d:2300,m:"[READY] Interface loaded."}];
    ms.forEach(({d,m})=>setTimeout(()=>{setLines(l=>[...l,m]);setP(Math.min((d/2300)*100,100));},d));setTimeout(onDone,2800);
  },[onDone]);
  return <div style={{position:"fixed",inset:0,zIndex:200,background:P.black,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:24}}><div style={{maxWidth:520,width:"100%"}}><div style={{fontFamily:P.mono,fontSize:11,color:P.gray,lineHeight:1.8,whiteSpace:"pre-wrap",minHeight:180}}>{lines.map((l,i)=><div key={i} style={{color:l.includes("[OK]")||l.includes("COMPLETE")||l.includes("READY")?P.emerald:l.includes("████")?P.ruby:P.gray}}>{l}</div>)}<span style={{animation:"blink 0.8s infinite",color:P.ruby}}>█</span></div><div style={{height:2,background:P.border,marginTop:12}}><div style={{height:"100%",background:`linear-gradient(90deg,${P.ruby},${P.sable})`,width:`${p}%`,transition:"width 0.3s"}}/></div></div></div>;
}

// ═══ HEADER ═══
function Header(){const{view,setView,uLv,uArch,notifs,setNotifs}=useContext(Ctx);const[time,setTime]=useState("");const[showN,setShowN]=useState(false);
  useEffect(()=>{const t=()=>setTime(new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit",second:"2-digit"}));t();const i=setInterval(t,1000);return()=>clearInterval(i);},[]);
  const ur=notifs.filter(n=>!n.read).length;
  return <header style={{position:"sticky",top:0,zIndex:100,borderBottom:`1px solid ${P.border}`,background:`${P.black}e8`,backdropFilter:"blur(16px)"}}>
    <div style={{height:2,background:`linear-gradient(90deg,${P.ruby},transparent 30%,transparent 70%,${P.sable})`}}/>
    <div style={{maxWidth:1400,margin:"0 auto",padding:"0 12px",display:"flex",alignItems:"center",justifyContent:"space-between",height:42}}>
      <div style={{display:"flex",alignItems:"center",gap:6,cursor:"pointer"}} onClick={()=>setView("home")}><Hexagon size={13} color={P.ruby} strokeWidth={2}/><span style={{fontFamily:P.mono,fontSize:11,fontWeight:600,color:P.ghost,letterSpacing:"4px"}}>DIGGERZ</span></div>
      <nav style={{display:"flex",flexWrap:"wrap"}}>{[{id:"home",l:"HOME"},{id:"test",l:"TERMINAL"},{id:"archives",l:"ARCHIVES"},{id:"hub",l:"NETWORK"},{id:"soul",l:"LOUNGE"},{id:"responses",l:"RESPONSES"}].map(({id,l})=><button key={id} onClick={()=>setView(id)} style={{background:"none",border:"none",cursor:"pointer",padding:"3px 8px",fontFamily:P.mono,fontSize:7,letterSpacing:"2px",color:view===id?P.ruby:P.textDim,borderBottom:view===id?`2px solid ${P.ruby}`:"2px solid transparent"}}>{l}</button>)}</nav>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <span style={{fontFamily:P.mono,fontSize:7,color:P.textDim}}>{time}</span>
        <div style={{position:"relative"}}><button onClick={()=>setShowN(!showN)} style={{background:"none",border:`1px solid ${P.border}`,width:24,height:24,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:P.gray,position:"relative"}}><Bell size={10}/>{ur>0&&<div style={{position:"absolute",top:-2,right:-2,width:9,height:9,borderRadius:"50%",background:P.ruby,fontFamily:P.mono,fontSize:5,color:P.ghost,display:"flex",alignItems:"center",justifyContent:"center"}}>{ur}</div>}</button>
          {showN&&<div style={{position:"absolute",top:"100%",right:0,width:260,background:P.bgCard,border:`1px solid ${P.border}`,zIndex:150,maxHeight:240,overflow:"auto"}}>{notifs.map(n=><div key={n.id} onClick={()=>setNotifs(ns=>ns.map(x=>x.id===n.id?{...x,read:true}:x))} style={{padding:"5px 8px",borderBottom:`1px solid ${P.border}`,cursor:"pointer",background:n.read?"transparent":P.ruby+"06"}}><div style={{fontFamily:P.mono,fontSize:7,color:P.ghost}}>{n.text}</div><div style={{fontFamily:P.mono,fontSize:5,color:P.textDim}}>{ago(n.time)}</div></div>)}</div>}
        </div>
        {uArch&&<AB c={uArch} s={10}/>}<LB lv={uLv}/>
      </div>
    </div>
  </header>;
}

// ═══ HOME ═══
function Home(){const{setView}=useContext(Ctx);return <div className="fu" style={{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:"80px 16px 40px"}}><div style={{textAlign:"center",maxWidth:660}}>
  <div style={{fontFamily:P.mono,fontSize:9,color:P.textDim,letterSpacing:"5px",marginBottom:16}}>{nx()} MECHANICAL CONFIDENCE {nx()}</div>
  <h1 style={{fontFamily:P.mono,fontSize:"clamp(40px,8vw,68px)",fontWeight:200,color:P.ghost,lineHeight:1,letterSpacing:"-2px",margin:"0 0 4px"}}>DIGGERZ</h1>
  <div style={{fontFamily:P.mono,fontSize:11,color:P.ruby,letterSpacing:"10px",marginBottom:24,fontWeight:500}}>NEURO-REGULATING WEAR</div>
  <div style={{display:"flex",justifyContent:"center",gap:8,marginBottom:20,flexWrap:"wrap"}}>{[{l:"QUESTIONS",v:"80"},{l:"ARCHÉTYPES",v:"16"},{l:"AXES",v:"04"},{l:"COHORTE",v:"33"}].map(({l,v})=><div key={l} style={{border:`1px solid ${P.border}`,padding:"8px 12px"}}><div style={{fontFamily:P.mono,fontSize:18,color:P.ruby,fontWeight:300}}>{v}</div><div style={{fontFamily:P.mono,fontSize:6,color:P.gray,letterSpacing:"2px"}}>{l}</div></div>)}</div>
  <p style={{fontFamily:P.mono,fontSize:11,color:P.gray,lineHeight:1.7,maxWidth:500,margin:"0 auto 24px"}}>Le vêtement comme interface cognitive. 80Q × 16 archétypes enrichis avec prescriptions matières, neuroscience, et rôles Soul Lounge.</p>
  <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
    <button onClick={()=>setView("test")} style={{background:P.ruby,color:P.ghost,border:"none",padding:"11px 28px",cursor:"pointer",fontFamily:P.mono,fontSize:10,letterSpacing:"2.5px",fontWeight:600}}>INITIATION →</button>
    <button onClick={()=>setView("archives")} style={{background:"none",border:`1px solid ${P.border}`,color:P.gray,padding:"11px 20px",cursor:"pointer",fontFamily:P.mono,fontSize:10,letterSpacing:"2px"}}>ARCHIVES 16</button>
    <button onClick={()=>setView("hub")} style={{background:"none",border:`1px solid ${P.border}`,color:P.gray,padding:"11px 20px",cursor:"pointer",fontFamily:P.mono,fontSize:10,letterSpacing:"2px"}}>NETWORK</button>
  </div>
</div></div>;}

// ═══ TEST ENGINE ═══
function TestEng(){const{setView,setResult,setULv,setUArch}=useContext(Ctx);const[phase,setPhase]=useState("intro");const[ti,setTi]=useState(0);const[qi,setQi]=useState(0);const[ans,setAns]=useState({});const[cur,setCur]=useState(null);const[vis,setVis]=useState(true);
  const allQ=useMemo(()=>TERMS.flatMap((t,tI)=>t.q.map((q,qI)=>({...q,tI,qI,gI:tI*20+qI,icon:t.icon}))),[]);const total=80;const gI=ti*20+qi;const cq=allQ[gI];
  const anim=useCallback(cb=>{setVis(false);setTimeout(()=>{cb();setTimeout(()=>setVis(true),30);},200);},[]);
  const next=()=>{if(cur===null)return;const na={...ans,[`${ti}-${qi}`]:cur};setAns(na);setCur(null);
    if(qi<19)anim(()=>setQi(qi+1));else if(ti<3)anim(()=>{setTi(ti+1);setQi(0);});
    else{setPhase("calc");setTimeout(()=>{const sc={SI:0,PT:0,GV:0,CE:0},cn={SI:0,PT:0,GV:0,CE:0};allQ.forEach((q,i)=>{const v=((na[`${Math.floor(i/20)}-${i%20}`]||3)-1)/4;Object.entries(q.a).forEach(([ax,w])=>{if(w>0)sc[ax]+=v*Math.abs(w);else sc[ax]+=(1-v)*Math.abs(w);cn[ax]+=Math.abs(w);});});const nm={};Object.keys(sc).forEach(k=>nm[k]=cn[k]>0?(sc[k]/cn[k])*100:50);const key=(nm.SI>50?"I":"S")+(nm.PT>50?"T":"P")+(nm.GV>50?"V":"G")+(nm.CE>50?"E":"C");try{const prev=JSON.parse(localStorage.getItem("dgz_responses")||"[]");prev.push({id:Date.now(),ts:new Date().toISOString(),archKey:key,archName:ARC[key]?.name||key,cluster:ARC[key]?.clusterName||"-",scores:nm,answers:na});localStorage.setItem("dgz_responses",JSON.stringify(prev));}catch(e){}setResult({archKey:key,scores:nm});setULv(2);setUArch(key);setView("results");},2200);}};
  if(phase==="calc")return <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}><Hexagon size={20} color={P.ruby} style={{marginBottom:12,animation:"pulse 1.5s infinite"}}/><div style={{fontFamily:P.mono,fontSize:9,color:P.textDim,letterSpacing:"3px"}}>{nx()} COMPUTING {nx()}</div></div>;
  if(phase==="intro")return <div className="fu" style={{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:"80px 16px"}}><div style={{textAlign:"center",maxWidth:480}}><Scan size={22} color={P.ruby} style={{marginBottom:14}}/><div style={{fontFamily:P.mono,fontSize:9,color:P.textDim,letterSpacing:"3px",marginBottom:8}}>80 SÉQUENCES — 4 TERMINAUX</div><h2 style={{fontFamily:P.mono,fontSize:18,fontWeight:300,color:P.ghost,margin:"0 0 8px"}}>Test Neuro-Design</h2><p style={{fontFamily:P.mono,fontSize:10,color:P.gray,marginBottom:16}}>Likert 1-5 × 4 axes → 1 archétype parmi 16 avec profil complet.</p><button onClick={()=>setPhase("q")} style={{background:P.ruby,color:P.ghost,border:"none",padding:"11px 32px",cursor:"pointer",fontFamily:P.mono,fontSize:10,letterSpacing:"3px",fontWeight:600}}>LANCER →</button></div></div>;
  const term=TERMS[ti];const TI=term.icon;
  return <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",padding:"66px 16px 16px",maxWidth:620,margin:"0 auto",opacity:vis?1:0,transform:vis?"none":"translateY(6px)",transition:"all 0.18s"}}>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}><span style={{fontFamily:P.mono,fontSize:6,color:P.textGhost}}>{sn()}</span><span style={{fontFamily:P.mono,fontSize:6,color:P.textGhost}}>{nx()}</span></div>
    <div style={{marginBottom:2}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}><span style={{fontFamily:P.mono,fontSize:6,color:P.textDim}}>GLOBAL</span><span style={{fontFamily:P.mono,fontSize:7,color:P.ruby}}>{gI+1}/{total}</span></div><div style={{height:2,background:P.border}}><div style={{height:"100%",background:`linear-gradient(90deg,${P.ruby},${P.sable})`,width:`${((gI+1)/total)*100}%`,transition:"width 0.3s"}}/></div></div>
    <div style={{marginBottom:12}}><div style={{display:"flex",justifyContent:"space-between",marginTop:4,marginBottom:2}}><div style={{display:"flex",alignItems:"center",gap:3}}><TI size={9} color={P.ruby}/><span style={{fontFamily:P.mono,fontSize:7,color:P.ruby,letterSpacing:"2px"}}>T-0{ti+1} {term.key}</span></div><span style={{fontFamily:P.mono,fontSize:6,color:P.textDim}}>{qi+1}/20</span></div><div style={{height:1,background:P.border}}><div style={{height:"100%",background:P.ruby,width:`${((qi+1)/20)*100}%`,opacity:0.5}}/></div></div>
    <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}><div style={{fontFamily:P.mono,fontSize:14,color:P.ruby,fontWeight:300}}>Q{String(qi+1).padStart(2,"0")}</div><div style={{flex:1,height:1,background:P.border}}/></div>
    <div style={{border:`1px solid ${P.border}`,padding:"10px 12px",marginBottom:12,background:P.bgCard}}><p style={{fontFamily:P.mono,fontSize:11,color:P.ghost,lineHeight:1.7,margin:0}}>"{cq.t}"</p></div>
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",margin:"8px 0"}}><span style={{fontFamily:P.mono,fontSize:6,color:P.textGhost,marginRight:6}}>NON</span>{[1,2,3,4,5].map(n=>{const s=cur===n;return <button key={n} onClick={()=>setCur(n)} style={{width:34,height:34,margin:"0 3px",border:`2px solid ${s?P.ruby:P.border}`,background:s?P.ruby+"22":"transparent",color:s?P.ruby:P.textDim,fontFamily:P.mono,fontSize:13,fontWeight:s?600:300,cursor:"pointer"}}>{n}</button>;})}<span style={{fontFamily:P.mono,fontSize:6,color:P.textGhost,marginLeft:6}}>OUI</span></div>
    <div style={{display:"flex",justifyContent:"space-between",marginTop:"auto",paddingTop:8,borderTop:`1px solid ${P.border}`}}>
      <button onClick={()=>{if(qi>0){setCur(null);anim(()=>setQi(qi-1));}else if(ti>0){setCur(null);anim(()=>{setTi(ti-1);setQi(19);});}}} disabled={gI===0} style={{background:"none",border:`1px solid ${gI===0?P.border:P.borderAct}`,padding:"6px 10px",cursor:gI===0?"default":"pointer",fontFamily:P.mono,fontSize:7,color:gI===0?P.textGhost:P.gray,opacity:gI===0?0.3:1,display:"flex",alignItems:"center",gap:3}}><ChevronLeft size={10}/>RETOUR</button>
      <button onClick={next} disabled={cur===null} style={{background:cur?P.ruby:P.bgCard,color:cur?P.ghost:P.textDim,border:"none",padding:"6px 16px",cursor:cur?"pointer":"default",fontFamily:P.mono,fontSize:7,fontWeight:600,display:"flex",alignItems:"center",gap:3,opacity:cur?1:0.3}}>{gI===total-1?"ANALYSER":"SUIVANT"}<ChevronRight size={10}/></button>
    </div>
  </div>;
}

// ═══ PASSPORT (Enhanced with 5-tab) ═══
function Passport(){const{result,setView}=useContext(Ctx);const[ok,sO]=useState(false);const[tab,setTab]=useState("narr");useEffect(()=>{setTimeout(()=>sO(true),150);},[]);
  const a=ARC[result.archKey]||ARC.STVC;const I=a.icon;
  const rd=[{axis:"SI",val:Math.round(result.scores.SI)},{axis:"PT",val:Math.round(result.scores.PT)},{axis:"GV",val:Math.round(result.scores.GV)},{axis:"CE",val:Math.round(result.scores.CE)}];
  const poles=[{l:"SENSORY",r:"INTENTIONAL",v:result.scores.SI},{l:"PROTECTIVE",r:"TECHNICAL",v:result.scores.PT},{l:"GROUNDED",r:"VIBRANT",v:result.scores.GV},{l:"COVERT",r:"EXPRESSED",v:result.scores.CE}];
  const tabs=[{id:"narr",l:"PROFIL"},{id:"neuro",l:"NEURO"},{id:"mat",l:"MATIÈRES"},{id:"gar",l:"VÊTEMENT"},{id:"soul",l:"SOUL"}];
  return <div style={{minHeight:"100vh",padding:"66px 16px 40px",display:"flex",justifyContent:"center",opacity:ok?1:0,transform:ok?"none":"translateY(10px)",transition:"all 0.5s"}}>
    <div style={{maxWidth:680,width:"100%"}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontFamily:P.mono,fontSize:6,color:P.textGhost}}>{nx()} DATA PASSPORT {nx()}</span><span style={{fontFamily:P.mono,fontSize:6,color:P.textGhost}}>{sn()}</span></div>
      {/* Header */}
      <div style={{border:`2px solid ${a.color}55`,padding:"12px 14px",background:`linear-gradient(135deg,${a.color}0a,transparent)`,position:"relative"}}><div style={{position:"absolute",left:0,right:0,height:1,background:`${a.color}33`,animation:"scanDown 3s linear infinite"}}/><div style={{display:"flex",gap:12}}><div style={{width:44,height:44,border:`2px solid ${a.color}55`,display:"flex",alignItems:"center",justifyContent:"center",background:`${a.color}0c`,flexShrink:0}}><I size={18} color={a.color}/></div><div><div style={{fontFamily:P.mono,fontSize:7,color:a.color,letterSpacing:"3px"}}>{a.code} — CLUSTER {a.cluster}: {a.clusterName}</div><h2 style={{fontFamily:P.mono,fontSize:20,fontWeight:400,color:P.ghost,margin:"2px 0",letterSpacing:"2px"}}>{a.name}</h2><div style={{fontFamily:P.mono,fontSize:9,color:P.sable,fontStyle:"italic"}}>{a.sub}</div></div></div></div>
      {/* Radar + specs */}
      <div style={{border:`1px solid ${P.border}`,borderTop:"none",display:"grid",gridTemplateColumns:"160px 1fr"}}>
        <div style={{padding:10,borderRight:`1px solid ${P.border}`,display:"flex",flexDirection:"column",alignItems:"center"}}><div style={{width:140,height:140}}><ResponsiveContainer width="100%" height="100%"><RadarChart data={rd} cx="50%" cy="50%" outerRadius="65%"><PolarGrid stroke={P.border}/><PolarAngleAxis dataKey="axis" tick={{fill:P.gray,fontSize:7,fontFamily:P.mono}}/><PolarRadiusAxis tick={false} axisLine={false} domain={[0,100]}/><Radar dataKey="val" stroke={a.color} fill={a.color} fillOpacity={0.15} strokeWidth={2} dot={{fill:a.color,r:2}}/></RadarChart></ResponsiveContainer></div></div>
        <div style={{padding:10}}>{poles.map(({l,r,v},i)=><div key={i} style={{marginBottom:6}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:2}}><span style={{fontFamily:P.mono,fontSize:6,color:v<=50?P.sable:P.textDim}}>{l}</span><span style={{fontFamily:P.mono,fontSize:7,color:P.ruby}}>{Math.round(v)}</span><span style={{fontFamily:P.mono,fontSize:6,color:v>50?P.sable:P.textDim}}>{r}</span></div><div style={{height:3,background:P.border,position:"relative"}}><div style={{position:"absolute",left:`${Math.max(2,Math.min(98,v))}%`,top:-1,width:2,height:5,background:P.ruby,transition:"left 0.8s"}}/></div></div>)}</div>
      </div>
      {/* Quick specs */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",border:`1px solid ${P.ruby}33`,borderTop:"none",background:P.ruby+"06"}}>
        {[{l:"CHARGE",v:a.charge,c:P.ruby},{l:"RÉS.",v:a.res},{l:"GSM",v:a.tGsm},{l:"PIÈCE",v:a.garment,c:P.ruby}].map((d,i)=><div key={i} style={{padding:"6px 8px",borderRight:i<3?`1px solid ${P.ruby}22`:"none"}}><div style={{fontFamily:P.mono,fontSize:5,color:P.textDim,letterSpacing:"1px",marginBottom:1}}>{d.l}</div><div style={{fontFamily:P.mono,fontSize:8,color:d.c||P.ghost,fontWeight:500}}>{d.v}</div></div>)}
      </div>
      {/* Tabs */}
      <div style={{display:"flex",borderBottom:`1px solid ${P.border}`,marginTop:8}}>{tabs.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,background:tab===t.id?P.bgCard:"transparent",border:"none",borderBottom:tab===t.id?`2px solid ${a.color}`:"2px solid transparent",padding:"6px",cursor:"pointer",fontFamily:P.mono,fontSize:7,letterSpacing:"1.5px",color:tab===t.id?a.color:P.textDim}}>{t.l}</button>)}</div>
      <div style={{border:`1px solid ${P.border}`,borderTop:"none",padding:"12px 14px",minHeight:160}}>
        {tab==="narr"&&<div><div style={{fontFamily:P.mono,fontSize:9,color:P.gray,lineHeight:1.7,whiteSpace:"pre-wrap",marginBottom:10}}>{a.narr}</div><div style={{border:`1px solid ${P.border}`,padding:8}}><div style={{fontFamily:P.mono,fontSize:6,color:P.textDim,letterSpacing:"1.5px",marginBottom:2}}>TRAJECTOIRE</div><div style={{fontFamily:P.mono,fontSize:8,color:a.color,marginBottom:2}}>{a.traj}</div><div style={{fontFamily:P.mono,fontSize:7,color:P.gray,lineHeight:1.5}}>{a.trajD}</div></div><div style={{border:`1px solid ${P.sable}33`,padding:8,marginTop:6,background:`${P.sable}06`}}><div style={{fontFamily:P.mono,fontSize:6,color:P.sable,letterSpacing:"1.5px",marginBottom:2}}>SURVEY (n=33)</div><div style={{fontFamily:P.mono,fontSize:7,color:P.gray}}>{a.surv}</div></div></div>}
        {tab==="neuro"&&<div><div style={{padding:8,border:`1px solid ${P.ruby}33`,background:P.ruby+"06",marginBottom:8}}><div style={{fontFamily:P.mono,fontSize:6,color:P.ruby,letterSpacing:"2px",marginBottom:2}}>NEURO-IMPACT</div><div style={{fontFamily:P.mono,fontSize:9,color:P.ghost,fontWeight:500}}>{a.nT}</div></div><div style={{fontFamily:P.mono,fontSize:8,color:P.gray,lineHeight:1.7,whiteSpace:"pre-wrap"}}>{a.nD}</div></div>}
        {tab==="mat"&&<div><div style={{fontFamily:P.mono,fontSize:7,color:P.textDim,letterSpacing:"2px",marginBottom:8}}>PHARMACOPÉE TEXTILE</div>{[{t:"PRIMAIRE",n:a.mP,d:a.mPD},{t:"SECONDAIRE",n:a.mS,d:a.mSD},{t:"TERTIAIRE",n:a.mT,d:a.mTD}].map((m,i)=><div key={i} style={{border:`1px solid ${P.border}`,padding:8,marginBottom:4}}><div style={{fontFamily:P.mono,fontSize:5,color:P.textDim,letterSpacing:"1.5px",marginBottom:1}}>{m.t}</div><div style={{fontFamily:P.mono,fontSize:9,color:P.ghost,fontWeight:500,marginBottom:3}}>{m.n}</div><div style={{fontFamily:P.mono,fontSize:7,color:P.gray,lineHeight:1.5}}>{m.d}</div></div>)}<div style={{border:`1px solid ${P.border}`,padding:8,marginTop:4}}><div style={{fontFamily:P.mono,fontSize:5,color:P.textDim,marginBottom:2}}>PSYCHOLOGIE CHROMATIQUE</div><div style={{fontFamily:P.mono,fontSize:7,color:P.gray,lineHeight:1.5}}>{a.cP}</div><div style={{display:"flex",gap:4,marginTop:4}}>{a.pal.map((c,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:3}}><div style={{width:14,height:14,background:c,border:`1px solid ${P.border}`}}/><span style={{fontFamily:P.mono,fontSize:6,color:P.textDim}}>{a.palN[i]}</span></div>)}</div></div></div>}
        {tab==="gar"&&<div><div style={{padding:8,border:`1px solid ${P.ruby}33`,background:P.ruby+"06",marginBottom:8}}><div style={{fontFamily:P.mono,fontSize:5,color:P.ruby,letterSpacing:"2px",marginBottom:1}}>PIÈCE PRESCRITE</div><div style={{fontFamily:P.mono,fontSize:13,color:P.ghost,fontWeight:500}}>{a.garment}</div></div><div style={{fontFamily:P.mono,fontSize:8,color:P.gray,lineHeight:1.6,marginBottom:8}}>{a.gD}</div><div style={{border:`1px solid ${P.border}`,padding:8}}><div style={{fontFamily:P.mono,fontSize:5,color:P.textDim,letterSpacing:"1.5px",marginBottom:2}}>SILHOUETTE</div><div style={{fontFamily:P.mono,fontSize:9,color:P.ghost,fontWeight:500,marginBottom:2}}>{a.sil}</div><div style={{fontFamily:P.mono,fontSize:7,color:P.gray,lineHeight:1.5}}>{a.silD}</div></div></div>}
        {tab==="soul"&&<div><div style={{border:`1px solid ${P.sable}33`,padding:10,background:`${P.sable}06`,marginBottom:8}}><div style={{fontFamily:P.mono,fontSize:6,color:P.sable,letterSpacing:"2px",marginBottom:2}}>RÔLE SOUL LOUNGE</div><div style={{fontFamily:P.mono,fontSize:11,color:P.ghost,fontWeight:500,marginBottom:4}}>{a.sR}</div><div style={{fontFamily:P.mono,fontSize:8,color:P.gray,lineHeight:1.6}}>{a.sD}</div></div></div>}
      </div>
      {/* Actions */}
      <div style={{display:"flex",gap:6,marginTop:10,justifyContent:"center",flexWrap:"wrap"}}>
        <button onClick={()=>setView("test")} style={{background:"none",border:`1px solid ${P.border}`,padding:"6px 12px",cursor:"pointer",fontFamily:P.mono,fontSize:7,color:P.gray,display:"flex",alignItems:"center",gap:3}}><RotateCcw size={9}/>RE-CALIBRER</button>
        <button onClick={()=>setView("archives")} style={{background:"none",border:`1px solid ${P.border}`,padding:"6px 12px",cursor:"pointer",fontFamily:P.mono,fontSize:7,color:P.gray,display:"flex",alignItems:"center",gap:3}}><Database size={9}/>ARCHIVES</button>
        <button onClick={()=>setView("hub")} style={{background:P.ruby,color:P.ghost,border:"none",padding:"6px 14px",cursor:"pointer",fontFamily:P.mono,fontSize:7,fontWeight:600,display:"flex",alignItems:"center",gap:3}}>NETWORK<ArrowRight size={9}/></button>
      </div>
    </div>
  </div>;
}

// ═══ ARCHIVES (with 5-tab detail modal) ═══
function Archives(){const[sel,setSel]=useState(null);const[selC,setSelC]=useState(null);const[filter,setFilter]=useState("ALL");const[tab,setTab]=useState("narr");
  const filtered=filter==="ALL"?CL:CL.filter(c=>c.id===filter);
  return <div className="fu" style={{minHeight:"100vh",padding:"66px 14px 40px",maxWidth:1060,margin:"0 auto"}}>
    <div style={{fontFamily:P.mono,fontSize:7,color:P.textGhost,marginBottom:2}}>{nx()} SUBSTRATE INTELLIGENCE DATABASE {nx()}</div>
    <h1 style={{fontFamily:P.mono,fontSize:22,fontWeight:200,color:P.ghost,margin:"0 0 3px"}}>ARCHIVES <span style={{color:P.ruby}}>16</span></h1>
    <p style={{fontFamily:P.mono,fontSize:8,color:P.gray,marginBottom:10}}>Profils complets — neuroscience, pharmacopée textile, prescriptions, Soul Lounge. Cliquez pour détails.</p>
    <div style={{display:"flex",borderBottom:`1px solid ${P.border}`,marginBottom:10,overflowX:"auto"}}><button onClick={()=>setFilter("ALL")} style={{background:filter==="ALL"?P.bgCard:"transparent",border:"none",borderBottom:filter==="ALL"?`2px solid ${P.ruby}`:"2px solid transparent",padding:"5px 10px",cursor:"pointer",fontFamily:P.mono,fontSize:6,color:filter==="ALL"?P.ruby:P.textDim,letterSpacing:"1.5px",whiteSpace:"nowrap"}}>TOUS (16)</button>{CL.map(c=>{const I=c.icon;return <button key={c.id} onClick={()=>setFilter(c.id)} style={{background:filter===c.id?P.bgCard:"transparent",border:"none",borderBottom:filter===c.id?`2px solid ${c.color}`:"2px solid transparent",padding:"5px 8px",cursor:"pointer",fontFamily:P.mono,fontSize:6,color:filter===c.id?c.color:P.textDim,display:"flex",alignItems:"center",gap:2,whiteSpace:"nowrap"}}><I size={8}/>{c.id}: {c.sub}</button>;})}</div>
    {filtered.map(cl=>{const CI=cl.icon;return <div key={cl.id} style={{marginBottom:16}}>
      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3,borderBottom:`1px solid ${cl.color}33`,paddingBottom:3}}><CI size={11} color={cl.color}/><span style={{fontFamily:P.mono,fontSize:8,color:cl.color,letterSpacing:"3px",fontWeight:600}}>CLUSTER {cl.id}</span><span style={{fontFamily:P.mono,fontSize:8,color:P.ghost}}>{cl.name}</span><div style={{flex:1,height:1,background:P.border,marginLeft:4}}/><span style={{fontFamily:P.mono,fontSize:6,color:P.textDim,fontStyle:"italic"}}>{cl.sub}</span></div>
      <div style={{fontFamily:P.mono,fontSize:7,color:P.textDim,marginBottom:4,lineHeight:1.4}}>{cl.phil}</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:5}}>
        {cl.arch.map((a,i)=>{const I=a.icon;return <div key={a.code} onClick={()=>{setSel(a);setSelC(cl);setTab("narr");}} style={{border:`1px solid ${P.border}`,background:P.bgCard,cursor:"pointer",transition:"all 0.2s",animation:`fadeUp 0.4s ${i*40}ms both`}}
          onMouseOver={e=>{e.currentTarget.style.borderColor=a.color+"66";e.currentTarget.style.background=a.color+"06";}}
          onMouseOut={e=>{e.currentTarget.style.borderColor=P.border;e.currentTarget.style.background=P.bgCard;}}>
          <div style={{padding:"4px 6px",borderBottom:`1px solid ${P.border}`,display:"flex",justifyContent:"space-between"}}><span style={{fontFamily:P.mono,fontSize:7,color:a.color,letterSpacing:"2px",fontWeight:600}}>{a.code}</span><span style={{fontFamily:P.mono,fontSize:6,color:P.ruby}}>{a.charge}</span></div>
          <div style={{padding:"6px 6px 5px"}}><div style={{display:"flex",alignItems:"center",gap:4,marginBottom:3}}><I size={11} color={a.color}/><span style={{fontFamily:P.mono,fontSize:8,color:P.ghost,fontWeight:500}}>{a.name}</span></div><div style={{fontFamily:P.mono,fontSize:6,color:P.gray,marginBottom:4,lineHeight:1.3}}>{a.sub.split("—")[0]}</div><div style={{display:"flex",gap:2,marginBottom:3}}>{a.pal.map((c,j)=><div key={j} style={{width:8,height:8,background:c,border:`1px solid ${P.border}`}}/>)}</div><div style={{fontFamily:P.mono,fontSize:6,color:P.ruby,padding:"1px 4px",border:`1px solid ${P.ruby}33`,display:"inline-block",background:P.ruby+"08"}}>{a.garment}</div></div>
        </div>;})}
      </div>
    </div>;})}
    {/* Detail Modal */}
    {sel&&selC&&<div style={{position:"fixed",inset:0,zIndex:200,background:"rgba(16,24,32,0.94)",backdropFilter:"blur(10px)",display:"flex",alignItems:"flex-start",justifyContent:"center",padding:16,overflowY:"auto"}} onClick={()=>setSel(null)}>
      <div style={{maxWidth:700,width:"100%",background:"#0e1620",border:`1px solid ${sel.color}44`,margin:"20px 0"}} onClick={e=>e.stopPropagation()}>
        <div style={{padding:"12px 14px",borderBottom:`1px solid ${P.border}`,background:`linear-gradient(135deg,${sel.color}0c,transparent)`,position:"relative"}}><div style={{position:"absolute",left:0,right:0,height:1,background:`${sel.color}33`,animation:"scanDown 3s linear infinite"}}/><button onClick={()=>setSel(null)} style={{position:"absolute",top:8,right:10,background:"none",border:`1px solid ${P.border}`,width:24,height:24,cursor:"pointer",color:P.gray,display:"flex",alignItems:"center",justifyContent:"center"}}><X size={9}/></button><div style={{display:"flex",gap:10}}><div style={{width:44,height:44,border:`2px solid ${sel.color}55`,display:"flex",alignItems:"center",justifyContent:"center",background:`${sel.color}0c`}}>{(()=>{const I=sel.icon;return <I size={18} color={sel.color}/>;})()}</div><div><div style={{fontFamily:P.mono,fontSize:6,color:sel.color,letterSpacing:"3px"}}>{sel.code} — {selC.name}</div><h2 style={{fontFamily:P.mono,fontSize:18,fontWeight:400,color:P.ghost,margin:"1px 0",letterSpacing:"2px"}}>{sel.name}</h2><div style={{fontFamily:P.mono,fontSize:8,color:P.sable,fontStyle:"italic"}}>{sel.sub}</div></div></div></div>
        {/* Radar + specs */}
        <div style={{display:"grid",gridTemplateColumns:"150px 1fr",borderBottom:`1px solid ${P.border}`}}>
          <div style={{padding:8,borderRight:`1px solid ${P.border}`,display:"flex",flexDirection:"column",alignItems:"center"}}><div style={{width:130,height:130}}><ResponsiveContainer width="100%" height="100%"><RadarChart data={[{axis:"SI",val:sel.axes.SI},{axis:"PT",val:sel.axes.PT},{axis:"GV",val:sel.axes.GV},{axis:"CE",val:sel.axes.CE}]} cx="50%" cy="50%" outerRadius="65%"><PolarGrid stroke={P.border}/><PolarAngleAxis dataKey="axis" tick={{fill:P.gray,fontSize:6,fontFamily:P.mono}}/><PolarRadiusAxis tick={false} axisLine={false} domain={[0,100]}/><Radar dataKey="val" stroke={sel.color} fill={sel.color} fillOpacity={0.15} strokeWidth={2} dot={{fill:sel.color,r:2}}/></RadarChart></ResponsiveContainer></div></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr"}}>{[{l:"CHARGE",v:sel.charge,c:P.ruby},{l:"RÉS.",v:sel.res},{l:"GSM",v:sel.tGsm},{l:"MAT. 1",v:sel.mP},{l:"MAT. 2",v:sel.mS},{l:"VÊTEMENT",v:sel.garment,c:P.ruby}].map((d,i)=><div key={i} style={{padding:"6px 8px",borderBottom:`1px solid ${P.border}`,borderRight:(i%3<2)?`1px solid ${P.border}`:"none"}}><div style={{fontFamily:P.mono,fontSize:5,color:P.textDim,letterSpacing:"1px",marginBottom:1}}>{d.l}</div><div style={{fontFamily:P.mono,fontSize:7,color:d.c||P.ghost,fontWeight:500,lineHeight:1.3}}>{d.v}</div></div>)}</div>
        </div>
        {/* Tabs */}
        <div style={{display:"flex",borderBottom:`1px solid ${P.border}`}}>{[{id:"narr",l:"PROFIL"},{id:"neuro",l:"NEURO"},{id:"mat",l:"MATIÈRES"},{id:"gar",l:"VÊTEMENT"},{id:"soul",l:"SOUL LOUNGE"}].map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,background:tab===t.id?P.bgCard:"transparent",border:"none",borderBottom:tab===t.id?`2px solid ${sel.color}`:"2px solid transparent",padding:"6px",cursor:"pointer",fontFamily:P.mono,fontSize:6,letterSpacing:"1.5px",color:tab===t.id?sel.color:P.textDim}}>{t.l}</button>)}</div>
        <div style={{padding:"10px 14px",minHeight:160}}>
          {tab==="narr"&&<div><div style={{fontFamily:P.mono,fontSize:8,color:P.gray,lineHeight:1.7,whiteSpace:"pre-wrap",marginBottom:8}}>{sel.narr}</div><div style={{border:`1px solid ${P.border}`,padding:8,marginBottom:4}}><div style={{fontFamily:P.mono,fontSize:5,color:P.textDim,letterSpacing:"1.5px",marginBottom:2}}>TRAJECTOIRE</div><div style={{fontFamily:P.mono,fontSize:8,color:sel.color}}>{sel.traj}</div><div style={{fontFamily:P.mono,fontSize:7,color:P.gray,marginTop:2}}>{sel.trajD}</div></div><div style={{border:`1px solid ${P.sable}33`,padding:8,background:`${P.sable}06`}}><div style={{fontFamily:P.mono,fontSize:5,color:P.sable,marginBottom:2}}>SURVEY (n=33)</div><div style={{fontFamily:P.mono,fontSize:7,color:P.gray}}>{sel.surv}</div></div></div>}
          {tab==="neuro"&&<div><div style={{padding:8,border:`1px solid ${P.ruby}33`,background:P.ruby+"06",marginBottom:6}}><div style={{fontFamily:P.mono,fontSize:6,color:P.ruby,letterSpacing:"2px",marginBottom:2}}>NEURO-IMPACT</div><div style={{fontFamily:P.mono,fontSize:9,color:P.ghost,fontWeight:500}}>{sel.nT}</div></div><div style={{fontFamily:P.mono,fontSize:8,color:P.gray,lineHeight:1.7,whiteSpace:"pre-wrap"}}>{sel.nD}</div></div>}
          {tab==="mat"&&<div>{[{t:"PRIMAIRE",n:sel.mP,d:sel.mPD},{t:"SECONDAIRE",n:sel.mS,d:sel.mSD},{t:"TERTIAIRE",n:sel.mT,d:sel.mTD}].map((m,i)=><div key={i} style={{border:`1px solid ${P.border}`,padding:8,marginBottom:4}}><div style={{fontFamily:P.mono,fontSize:5,color:P.textDim,marginBottom:1}}>{m.t}</div><div style={{fontFamily:P.mono,fontSize:8,color:P.ghost,fontWeight:500,marginBottom:2}}>{m.n}</div><div style={{fontFamily:P.mono,fontSize:7,color:P.gray,lineHeight:1.5}}>{m.d}</div></div>)}<div style={{border:`1px solid ${P.border}`,padding:8}}><div style={{fontFamily:P.mono,fontSize:5,color:P.textDim,marginBottom:2}}>PSYCHOLOGIE CHROMATIQUE</div><div style={{fontFamily:P.mono,fontSize:7,color:P.gray,lineHeight:1.5}}>{sel.cP}</div><div style={{display:"flex",gap:4,marginTop:4}}>{sel.pal.map((c,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:2}}><div style={{width:12,height:12,background:c,border:`1px solid ${P.border}`}}/><span style={{fontFamily:P.mono,fontSize:5,color:P.textDim}}>{sel.palN[i]}</span></div>)}</div></div></div>}
          {tab==="gar"&&<div><div style={{padding:8,border:`1px solid ${P.ruby}33`,background:P.ruby+"06",marginBottom:6}}><div style={{fontFamily:P.mono,fontSize:12,color:P.ghost,fontWeight:500}}>{sel.garment}</div></div><div style={{fontFamily:P.mono,fontSize:7,color:P.gray,lineHeight:1.6,marginBottom:6}}>{sel.gD}</div><div style={{border:`1px solid ${P.border}`,padding:8}}><div style={{fontFamily:P.mono,fontSize:5,color:P.textDim,marginBottom:2}}>SILHOUETTE</div><div style={{fontFamily:P.mono,fontSize:8,color:P.ghost,fontWeight:500,marginBottom:2}}>{sel.sil}</div><div style={{fontFamily:P.mono,fontSize:7,color:P.gray,lineHeight:1.5}}>{sel.silD}</div></div></div>}
          {tab==="soul"&&<div style={{border:`1px solid ${P.sable}33`,padding:10,background:`${P.sable}06`}}><div style={{fontFamily:P.mono,fontSize:6,color:P.sable,letterSpacing:"2px",marginBottom:2}}>RÔLE SOUL LOUNGE</div><div style={{fontFamily:P.mono,fontSize:11,color:P.ghost,fontWeight:500,marginBottom:4}}>{sel.sR}</div><div style={{fontFamily:P.mono,fontSize:8,color:P.gray,lineHeight:1.6}}>{sel.sD}</div></div>}
        </div>
      </div>
    </div>}
  </div>;
}

// ═══ NETWORK (Forum) ═══
function Network(){const{uLv}=useContext(Ctx);const[threads,setThreads]=useState(FT0);const[activeT,setActiveT]=useState(null);const[activeCat,setActiveCat]=useState("all");const[searchQ,setSearchQ]=useState("");const[showComp,setShowComp]=useState(false);const[cTitle,setCTitle]=useState("");const[cBody,setCBody]=useState("");const[cCat,setCCat]=useState("general");const[replyT,setReplyT]=useState("");
  const[chatMsgs,setChatMsgs]=useState([{u:1,t:"Session #45 commence bientôt.",tm:"21:40"},{u:10,t:"Proto Doudoune v3: 2.5kg torse, 0.8kg/manche.",tm:"21:42"},{u:2,t:"Répartition poids en mouvement?",tm:"21:43"}]);const[chatIn,setChatIn]=useState("");
  const filtered=useMemo(()=>{let t=threads;if(activeCat!=="all")t=t.filter(th=>th.cat===activeCat);if(searchQ)t=t.filter(th=>th.title.toLowerCase().includes(searchQ.toLowerCase()));const ok=FC.filter(c=>c.lv<=uLv).map(c=>c.id);t=t.filter(th=>ok.includes(th.cat));return t.sort((a,b)=>a.pin&&!b.pin?-1:!a.pin&&b.pin?1:a.date-b.date);},[threads,activeCat,searchQ,uLv]);
  const tObj=activeT?threads.find(t=>t.id===activeT):null;
  return <div className="fu" style={{minHeight:"100vh",padding:"56px 10px 30px",maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 220px",gap:10,alignItems:"start"}}>
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}><div><div style={{fontFamily:P.mono,fontSize:7,color:P.textGhost,marginBottom:2}}>{nx()} NETWORK {nx()}</div><h1 style={{fontFamily:P.mono,fontSize:16,fontWeight:300,color:P.ghost,margin:0}}>Hub Communautaire</h1></div><button onClick={()=>setShowComp(true)} style={{background:P.ruby,color:P.ghost,border:"none",padding:"6px 12px",cursor:"pointer",fontFamily:P.mono,fontSize:7,fontWeight:600,display:"flex",alignItems:"center",gap:3}}><Plus size={9}/>NOUVEAU</button></div>
      <div style={{display:"flex",alignItems:"center",gap:3,border:`1px solid ${P.border}`,padding:"4px 6px",background:P.bgIn,marginBottom:6}}><Search size={9} color={P.textDim}/><input value={searchQ} onChange={e=>setSearchQ(e.target.value)} placeholder="Rechercher..." style={{flex:1,background:"transparent",border:"none",fontFamily:P.mono,fontSize:8,color:P.ghost,outline:"none"}}/></div>
      <div style={{display:"flex",borderBottom:`1px solid ${P.border}`,marginBottom:6,overflowX:"auto"}}><button onClick={()=>{setActiveCat("all");setActiveT(null);}} style={{background:activeCat==="all"?P.bgCard:"transparent",border:"none",borderBottom:activeCat==="all"?`2px solid ${P.ruby}`:"2px solid transparent",padding:"4px 8px",cursor:"pointer",fontFamily:P.mono,fontSize:6,color:activeCat==="all"?P.ruby:P.textDim,whiteSpace:"nowrap"}}>TOUS</button>{FC.filter(c=>c.lv<=uLv).map(c=>{const I=c.icon;return <button key={c.id} onClick={()=>{setActiveCat(c.id);setActiveT(null);}} style={{background:activeCat===c.id?P.bgCard:"transparent",border:"none",borderBottom:activeCat===c.id?`2px solid ${c.color}`:"2px solid transparent",padding:"4px 6px",cursor:"pointer",fontFamily:P.mono,fontSize:6,color:activeCat===c.id?c.color:P.textDim,display:"flex",alignItems:"center",gap:2,whiteSpace:"nowrap"}}><I size={7}/>{c.name}</button>;})}</div>
      {tObj?(()=>{const au=FU.find(u=>u.id===tObj.au)||{name:"You",arch:null,lv:1};return <div className="fu">
        <button onClick={()=>setActiveT(null)} style={{background:"none",border:`1px solid ${P.border}`,padding:"3px 7px",cursor:"pointer",fontFamily:P.mono,fontSize:7,color:P.gray,display:"flex",alignItems:"center",gap:2,marginBottom:6}}><ChevronLeft size={8}/>RETOUR</button>
        <div style={{border:`1px solid ${P.border}`}}>
          <div style={{padding:"8px 10px",borderBottom:`1px solid ${P.border}`}}><div style={{display:"flex",alignItems:"center",gap:4,marginBottom:3}}>{tObj.pin&&<Pin size={7} color={P.ruby}/>}<h2 style={{fontFamily:P.mono,fontSize:12,fontWeight:500,color:P.ghost,margin:0}}>{tObj.title}</h2></div><div style={{display:"flex",alignItems:"center",gap:4}}><span style={{fontFamily:P.mono,fontSize:7,color:P.ghost}}>{au.name}</span>{au.arch&&<AB c={au.arch} s={9}/>}<span style={{fontFamily:P.mono,fontSize:6,color:P.textDim}}>{ago(tObj.date)}</span></div></div>
          <div style={{padding:"8px 10px",borderBottom:`1px solid ${P.border}`,fontFamily:P.mono,fontSize:9,color:P.gray,lineHeight:1.7,whiteSpace:"pre-wrap"}}>{tObj.body}</div>
          <div style={{padding:"5px 10px"}}><button onClick={()=>setThreads(ts=>ts.map(t=>t.id===tObj.id?{...t,votes:t.votes+1}:t))} style={{background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:2,fontFamily:P.mono,fontSize:8,color:P.emerald}}><ThumbsUp size={10}/>{tObj.votes}</button></div>
        </div>
        {tObj.replies.map((r,i)=>{const ra=FU.find(u=>u.id===r.au)||{name:"You",arch:null,lv:1};return <div key={r.id} style={{border:`1px solid ${P.border}`,borderTop:"none",background:i%2===0?P.bgCard:"transparent"}}>
          <div style={{padding:"5px 10px 2px",display:"flex",alignItems:"center",gap:3}}><span style={{fontFamily:P.mono,fontSize:7,color:P.ghost}}>{ra.name}</span>{ra.arch&&<AB c={ra.arch} s={8}/>}<span style={{fontFamily:P.mono,fontSize:5,color:P.textDim}}>{ago(r.date)}</span></div>
          <div style={{padding:"2px 10px 5px",fontFamily:P.mono,fontSize:8,color:P.gray,lineHeight:1.6}}>{r.body}</div>
          <div style={{padding:"2px 10px 5px"}}><button onClick={()=>setThreads(ts=>ts.map(t=>t.id===tObj.id?{...t,replies:t.replies.map(x=>x.id===r.id?{...x,votes:x.votes+1}:x)}:t))} style={{background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:2,fontFamily:P.mono,fontSize:7,color:P.emerald}}><ThumbsUp size={8}/>{r.votes}</button></div>
        </div>;})}
        <div style={{border:`1px solid ${P.border}`,borderTop:"none",padding:8,background:P.bgCard}}>
          <textarea value={replyT} onChange={e=>setReplyT(e.target.value)} placeholder="Répondre..." rows={2} style={{width:"100%",background:P.bgIn,border:`1px solid ${P.border}`,padding:"5px 6px",fontFamily:P.mono,fontSize:8,color:P.ghost,resize:"vertical",marginBottom:4,outline:"none"}}/>
          <div style={{display:"flex",justifyContent:"flex-end"}}><button onClick={()=>{if(replyT.trim()){setThreads(ts=>ts.map(t=>t.id===tObj.id?{...t,replies:[...t.replies,{id:t.replies.length+1,au:0,body:replyT.trim(),votes:0,date:0}]}:t));setReplyT("");}}} style={{background:replyT.trim()?P.ruby:P.bgCard,color:replyT.trim()?P.ghost:P.textDim,border:"none",padding:"4px 10px",cursor:replyT.trim()?"pointer":"default",fontFamily:P.mono,fontSize:7,fontWeight:600,display:"flex",alignItems:"center",gap:2,opacity:replyT.trim()?1:0.4}}><Send size={7}/>ENVOYER</button></div>
        </div>
      </div>;})():(
        <div>{filtered.map((t,i)=>{const au=FU.find(u=>u.id===t.au)||{name:"You",arch:null,lv:1};const co=FC.find(c=>c.id===t.cat);const CI=co?.icon||MessageCircle;
          return <div key={t.id} onClick={()=>setActiveT(t.id)} style={{border:`1px solid ${P.border}`,borderBottom:"none",padding:"6px 8px",cursor:"pointer",transition:"all 0.15s",display:"flex",gap:6,animation:`fadeUp 0.3s ${i*30}ms both`}} onMouseOver={e=>e.currentTarget.style.background=P.bgHov} onMouseOut={e=>e.currentTarget.style.background="transparent"}>
            <div style={{textAlign:"center",minWidth:26}}><div style={{fontFamily:P.mono,fontSize:11,color:t.votes>30?P.emerald:P.ghost,fontWeight:300}}>{t.votes}</div><div style={{fontFamily:P.mono,fontSize:5,color:P.textDim}}>VOTE</div></div>
            <div style={{flex:1,minWidth:0}}><div style={{display:"flex",alignItems:"center",gap:3,marginBottom:2}}>{t.pin&&<Pin size={6} color={P.ruby}/>}<span style={{fontFamily:P.mono,fontSize:9,color:P.ghost,fontWeight:500}}>{t.title}</span></div><div style={{display:"flex",alignItems:"center",gap:3}}><CI size={6} color={co?.color}/><span style={{fontFamily:P.mono,fontSize:5,color:co?.color}}>{co?.name}</span><span style={{fontFamily:P.mono,fontSize:6,color:P.gray}}>{au.name}</span><span style={{fontFamily:P.mono,fontSize:5,color:P.textDim}}>{ago(t.date)}</span></div></div>
            <div style={{display:"flex",alignItems:"center",gap:2}}><MessageCircle size={8} color={P.textDim}/><span style={{fontFamily:P.mono,fontSize:7,color:P.textDim}}>{t.replies.length}</span></div>
          </div>;})}
          {filtered.length>0&&<div style={{borderBottom:`1px solid ${P.border}`}}/>}
        </div>
      )}
    </div>
    {/* SIDEBAR */}
    <div style={{display:"flex",flexDirection:"column",gap:6,position:"sticky",top:52}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>{[{i:Users,l:"EN LIGNE",v:"6",c:P.emerald},{i:MessageCircle,l:"FILS",v:String(threads.length),c:P.ruby}].map(({i:I,l,v,c})=><div key={l} style={{border:`1px solid ${P.border}`,padding:5,display:"flex",alignItems:"center",gap:3}}><I size={8} color={c}/><div><div style={{fontFamily:P.mono,fontSize:9,color:P.ghost,fontWeight:300}}>{v}</div><div style={{fontFamily:P.mono,fontSize:5,color:P.textDim}}>{l}</div></div></div>)}</div>
      <div style={{border:`1px solid ${P.border}`}}><div style={{padding:"3px 6px",borderBottom:`1px solid ${P.border}`,fontFamily:P.mono,fontSize:6,color:P.ruby,display:"flex",alignItems:"center",gap:2}}><Activity size={7}/>ACTIVITÉ</div>{[{u:"CosmicLoom",a:"publie SOUL",t:5},{u:"RubyForge",a:"répond Velours",t:12},{u:"VoidArchitect",a:"+1 survey",t:18},{u:"Sentinel_K",a:"atteint LV2",t:45}].map((x,i)=><div key={i} style={{padding:"2px 6px",borderBottom:`1px solid ${P.border}`,fontFamily:P.mono,fontSize:6,color:P.gray,display:"flex",alignItems:"center",gap:2}}><div style={{width:2,height:2,borderRadius:"50%",background:P.emerald}}/><span style={{color:P.emerald}}>{x.u}</span><span style={{color:P.textDim}}>{x.a}</span></div>)}</div>
      <div style={{border:`1px solid ${P.border}`}}><div style={{padding:"3px 6px",borderBottom:`1px solid ${P.border}`,fontFamily:P.mono,fontSize:6,color:P.emerald,display:"flex",alignItems:"center",gap:2}}><Users size={7}/>EN LIGNE</div>{FU.slice(0,5).map(u=><div key={u.id} style={{padding:"2px 6px",borderBottom:`1px solid ${P.border}`,display:"flex",alignItems:"center",gap:3}}><div style={{width:3,height:3,borderRadius:"50%",background:P.emerald}}/><span style={{fontFamily:P.mono,fontSize:7,color:P.ghost}}>{u.name}</span><AB c={u.arch} s={8}/></div>)}</div>
      {uLv>=3?<div style={{border:`1px solid ${P.sable}33`,background:`${P.sable}06`}}><div style={{padding:"3px 6px",borderBottom:`1px solid ${P.sable}22`,fontFamily:P.mono,fontSize:6,color:P.sable,display:"flex",alignItems:"center",gap:2}}><Moon size={7}/>SOUL CHAT<div style={{marginLeft:"auto",width:3,height:3,borderRadius:"50%",background:P.emerald,animation:"pulse 2s infinite"}}/></div><div style={{height:140,overflowY:"auto",padding:"3px 6px"}}>{chatMsgs.map((m,i)=>{const u=m.u===0?{name:"You"}:FU.find(x=>x.id===m.u);return <div key={i} style={{marginBottom:4}}><div style={{display:"flex",gap:2}}><span style={{fontFamily:P.mono,fontSize:6,color:m.u===0?P.ruby:P.emerald,fontWeight:500}}>{u?.name}</span><span style={{fontFamily:P.mono,fontSize:5,color:P.textGhost,marginLeft:"auto"}}>{m.tm}</span></div><div style={{fontFamily:P.mono,fontSize:7,color:P.gray,lineHeight:1.3}}>{m.t}</div></div>;})}</div><div style={{padding:"3px 6px",borderTop:`1px solid ${P.sable}22`,display:"flex",gap:3}}><input value={chatIn} onChange={e=>setChatIn(e.target.value)} placeholder="Msg..." onKeyDown={e=>{if(e.key==="Enter"&&chatIn.trim()){const now=new Date();setChatMsgs(ms=>[...ms,{u:0,t:chatIn.trim(),tm:`${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`}]);setChatIn("");}}} style={{flex:1,background:P.bgIn,border:`1px solid ${P.border}`,padding:"3px 5px",fontFamily:P.mono,fontSize:7,color:P.ghost,outline:"none"}}/><button onClick={()=>{if(chatIn.trim()){const now=new Date();setChatMsgs(ms=>[...ms,{u:0,t:chatIn.trim(),tm:`${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`}]);setChatIn("");}}} style={{background:`${P.sable}33`,border:`1px solid ${P.sable}44`,padding:"3px 5px",cursor:"pointer",color:P.sable}}><Send size={7}/></button></div></div>
      :<div style={{border:`1px solid ${P.sable}22`,padding:8,textAlign:"center",background:`${P.sable}06`}}><Lock size={10} color={P.sable} style={{marginBottom:3}}/><div style={{fontFamily:P.mono,fontSize:6,color:P.sable}}>SOUL CHAT — Lv3</div></div>}
    </div>
    {showComp&&<div style={{position:"fixed",inset:0,zIndex:200,background:"rgba(16,24,32,0.9)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",padding:12}} onClick={()=>setShowComp(false)}><div style={{maxWidth:480,width:"100%",background:P.bgCard,border:`1px solid ${P.border}`}} onClick={e=>e.stopPropagation()}><div style={{padding:"8px 12px",borderBottom:`1px solid ${P.border}`,display:"flex",justifyContent:"space-between"}}><span style={{fontFamily:P.mono,fontSize:7,color:P.ruby,letterSpacing:"2px"}}>NOUVEAU FIL</span><button onClick={()=>setShowComp(false)} style={{background:"none",border:`1px solid ${P.border}`,width:20,height:20,cursor:"pointer",color:P.gray,display:"flex",alignItems:"center",justifyContent:"center"}}><X size={8}/></button></div><div style={{padding:12}}><div style={{marginBottom:8}}><div style={{fontFamily:P.mono,fontSize:5,color:P.textDim,marginBottom:2}}>CATÉGORIE</div><div style={{display:"flex",gap:2,flexWrap:"wrap"}}>{FC.filter(c=>c.lv<=uLv).map(c=>{const I=c.icon;return <button key={c.id} onClick={()=>setCCat(c.id)} style={{background:cCat===c.id?c.color+"15":"transparent",border:`1px solid ${cCat===c.id?c.color+"66":P.border}`,padding:"2px 6px",cursor:"pointer",fontFamily:P.mono,fontSize:6,color:cCat===c.id?c.color:P.textDim,display:"flex",alignItems:"center",gap:2}}><I size={7}/>{c.name}</button>;})}</div></div><div style={{marginBottom:8}}><input value={cTitle} onChange={e=>setCTitle(e.target.value)} placeholder="Titre..." style={{width:"100%",background:P.bgIn,border:`1px solid ${P.border}`,padding:"5px 7px",fontFamily:P.mono,fontSize:9,color:P.ghost,outline:"none"}}/></div><div style={{marginBottom:10}}><textarea value={cBody} onChange={e=>setCBody(e.target.value)} placeholder="Contenu..." rows={3} style={{width:"100%",background:P.bgIn,border:`1px solid ${P.border}`,padding:"5px 7px",fontFamily:P.mono,fontSize:8,color:P.ghost,resize:"vertical",outline:"none"}}/></div><div style={{display:"flex",justifyContent:"flex-end",gap:4}}><button onClick={()=>setShowComp(false)} style={{background:"none",border:`1px solid ${P.border}`,padding:"5px 10px",cursor:"pointer",fontFamily:P.mono,fontSize:7,color:P.textDim}}>ANNULER</button><button onClick={()=>{if(cTitle.trim()&&cBody.trim()){setThreads(ts=>[{id:ts.length+1,cat:cCat,title:cTitle.trim(),au:0,date:0,pin:false,body:cBody.trim(),votes:0,replies:[]},...ts]);setShowComp(false);setCTitle("");setCBody("");}}} style={{background:cTitle.trim()&&cBody.trim()?P.ruby:P.bgCard,color:cTitle.trim()&&cBody.trim()?P.ghost:P.textDim,border:"none",padding:"5px 12px",cursor:cTitle.trim()&&cBody.trim()?"pointer":"default",fontFamily:P.mono,fontSize:7,fontWeight:600,display:"flex",alignItems:"center",gap:2,opacity:cTitle.trim()&&cBody.trim()?1:0.4}}><Send size={7}/>PUBLIER</button></div></div></div></div>}
  </div>;
}

// ═══ SOUL LOUNGE ═══
function SoulLounge(){const[playing,setPlaying]=useState(false);return <div className="fu" style={{minHeight:"100vh",padding:"66px 16px 40px",position:"relative",overflow:"hidden"}}>
  <div style={{position:"absolute",bottom:0,left:"-50%",right:"-50%",height:180,opacity:0.07,pointerEvents:"none"}}><svg viewBox="0 0 1440 180" style={{width:"200%",animation:"waveA 8s ease-in-out infinite"}}><path d="M0,90 C360,20 720,160 1080,70 C1260,35 1440,110 1440,110 L1440,180 L0,180 Z" fill={P.ruby}/></svg></div>
  <div style={{maxWidth:540,margin:"0 auto",position:"relative",zIndex:2}}>
    <div style={{fontFamily:P.mono,fontSize:8,color:P.sable,letterSpacing:"5px",marginBottom:8,textAlign:"center"}}>{nx()} THE SOUL LOUNGE {nx()}</div>
    <h2 style={{fontFamily:P.mono,fontSize:"clamp(20px,4vw,28px)",fontWeight:200,color:P.ghost,textAlign:"center",margin:"0 0 6px"}}>Espace Sacré</h2>
    <p style={{fontFamily:P.mono,fontSize:9,color:P.sable,lineHeight:1.7,textAlign:"center",maxWidth:400,margin:"0 auto 24px"}}>Velours, lumière chaude, tapis épais. De "paraître" à la certitude de "être".</p>
    <div style={{border:`1px solid ${P.sable}33`,padding:12,marginBottom:20,background:`${P.sable}08`}}>
      <div style={{fontFamily:P.mono,fontSize:6,color:P.sable,letterSpacing:"2px",marginBottom:6}}>AMBIENT — JAZZ / BARYTON / BASSES</div>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <button onClick={()=>setPlaying(!playing)} style={{width:28,height:28,border:`1px solid ${P.sable}44`,background:"transparent",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:P.sable}}>{playing?<Pause size={10}/>:<Play size={10}/>}</button>
        <div style={{flex:1}}><div style={{height:2,background:P.border}}><div style={{height:"100%",background:P.sable,width:playing?"65%":"0%",transition:"width 2s",opacity:0.6}}/></div></div><Volume2 size={9} color={P.sable}/>
      </div>
      <div style={{display:"flex",alignItems:"end",gap:1,height:16,marginTop:6,justifyContent:"center"}}>{Array.from({length:36},(_,i)=><div key={i} style={{width:2,background:P.sable,opacity:playing?0.3+Math.random()*0.5:0.15,height:playing?2+Math.random()*13:2,transition:"height 0.15s",borderRadius:1}}/>)}</div>
    </div>
    <div style={{border:`1px solid ${P.border}`,padding:12}}><div style={{fontFamily:P.mono,fontSize:6,color:P.textDim,letterSpacing:"2px",marginBottom:6}}>PHILOSOPHIE</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>{[{t:"Écosystème Horizontal",d:"Connexion sur un plan d'égalité."},{t:"Cocoon Enveloppant",d:"L'espace régule le système nerveux."},{t:"'Paraître' → 'Être'",d:"Migration vers la certitude."},{t:"Énergie Collective",d:"Chaleur partagée et énergie."}].map(({t,d},i)=><div key={i} style={{padding:8,border:`1px solid ${P.sable}22`,background:`${P.sable}06`}}><div style={{fontFamily:P.mono,fontSize:6,color:P.sable,marginBottom:2}}>{t}</div><div style={{fontFamily:P.mono,fontSize:7,color:P.gray,lineHeight:1.4}}>{d}</div></div>)}</div></div>
  </div>
</div>;}

// ═══ RESPONSES DASHBOARD ═══
function Responses(){const[data,setData]=useState([]);const[sel,setSel]=useState(null);const load=useCallback(()=>{try{setData(JSON.parse(localStorage.getItem("dgz_responses")||"[]"));}catch(e){setData([]);}},[]);
  useEffect(()=>{load();const i=setInterval(load,5000);const h=e=>{if(e.key==="dgz_responses")load();};window.addEventListener("storage",h);return()=>{clearInterval(i);window.removeEventListener("storage",h);};},[load]);
  const sorted=useMemo(()=>[...data].reverse(),[data]);
  const stats=useMemo(()=>{const ct={};data.forEach(r=>{ct[r.archKey]=(ct[r.archKey]||0)+1;});return Object.entries(ct).sort((a,b)=>b[1]-a[1]).map(([k,v])=>({key:k,name:ARC[k]?.name||k,color:ARC[k]?.color||P.gray,count:v,pct:data.length>0?((v/data.length)*100).toFixed(1):0}));},[data]);
  const axAvg=useMemo(()=>{if(data.length===0)return{SI:0,PT:0,GV:0,CE:0};const s={SI:0,PT:0,GV:0,CE:0};data.forEach(r=>{Object.keys(s).forEach(k=>s[k]+=(r.scores[k]||50));});Object.keys(s).forEach(k=>s[k]=Math.round(s[k]/data.length));return s;},[data]);
  const detail=sel?sorted.find(r=>r.id===sel):null;
  const exports=[
    {id:"all",label:"EXPORT ALL DATA",run:()=>dl("diggerz_all_data",{generatedAt:new Date().toISOString(),archetypes:norm(CL),questions:norm({QC,QF,QM,QI,TERMS}),forum:norm({FU,FC,FT0}),responses:norm(data)})},
    {id:"arch",label:"ARCHETYPES",run:()=>dl("diggerz_archetypes",norm(CL))},
    {id:"questions",label:"QUESTIONS",run:()=>dl("diggerz_questions",norm({QC,QF,QM,QI,TERMS}))},
    {id:"forum",label:"FORUM",run:()=>dl("diggerz_forum",norm({FU,FC,FT0}))},
    {id:"responses",label:"RESPONSES",run:()=>dl("diggerz_responses",norm(data)),disabled:data.length===0},
  ];
  return <div className="fu" style={{padding:"66px 16px 32px",maxWidth:1000,margin:"0 auto"}}>
    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}><Activity size={16} color={P.ruby}/><h2 style={{fontFamily:P.mono,fontSize:16,fontWeight:300,color:P.ghost,letterSpacing:"3px",margin:0}}>SURVEY RESPONSES</h2><span style={{fontFamily:P.mono,fontSize:8,color:P.textDim,letterSpacing:"2px"}}>LIVE — AUTO-REFRESH 5s</span><div style={{width:6,height:6,borderRadius:"50%",background:P.emerald,animation:"pulse 2s infinite",marginLeft:4}}/></div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:8,marginBottom:16}}>
      <div style={{border:`1px solid ${P.border}`,padding:12,background:P.bgCard}}><div style={{fontFamily:P.mono,fontSize:6,color:P.textDim,letterSpacing:"2px",marginBottom:4}}>TOTAL RESPONSES</div><div style={{fontFamily:P.mono,fontSize:22,color:P.ghost,fontWeight:300}}>{data.length}</div></div>
      <div style={{border:`1px solid ${P.border}`,padding:12,background:P.bgCard}}><div style={{fontFamily:P.mono,fontSize:6,color:P.textDim,letterSpacing:"2px",marginBottom:4}}>UNIQUE ARCHETYPES</div><div style={{fontFamily:P.mono,fontSize:22,color:P.emerald,fontWeight:300}}>{stats.length}<span style={{fontSize:9,color:P.textDim}}>/{16}</span></div></div>
      <div style={{border:`1px solid ${P.border}`,padding:12,background:P.bgCard}}><div style={{fontFamily:P.mono,fontSize:6,color:P.textDim,letterSpacing:"2px",marginBottom:4}}>TOP ARCHETYPE</div><div style={{fontFamily:P.mono,fontSize:11,color:stats[0]?.color||P.gray,fontWeight:400}}>{stats[0]?.name||"—"}</div><div style={{fontFamily:P.mono,fontSize:7,color:P.textDim}}>{stats[0]?`${stats[0].count} (${stats[0].pct}%)`:""}</div></div>
      <div style={{border:`1px solid ${P.border}`,padding:12,background:P.bgCard}}><div style={{fontFamily:P.mono,fontSize:6,color:P.textDim,letterSpacing:"2px",marginBottom:4}}>AVG AXES</div>{Object.entries(axAvg).map(([k,v])=><div key={k} style={{display:"flex",alignItems:"center",gap:4,marginBottom:2}}><span style={{fontFamily:P.mono,fontSize:6,color:P.gray,width:16}}>{k}</span><div style={{flex:1,height:3,background:P.border}}><div style={{height:"100%",background:P.ruby,width:`${v}%`}}/></div><span style={{fontFamily:P.mono,fontSize:6,color:P.textDim,width:20,textAlign:"right"}}>{v}</span></div>)}</div>
    </div>
    {stats.length>0&&<div style={{border:`1px solid ${P.border}`,padding:12,background:P.bgCard,marginBottom:16}}><div style={{fontFamily:P.mono,fontSize:7,color:P.textDim,letterSpacing:"2px",marginBottom:8}}>ARCHETYPE DISTRIBUTION</div>{stats.map(s=><div key={s.key} style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}><span style={{fontFamily:P.mono,fontSize:7,color:s.color,width:110,flexShrink:0}}>{s.key} {s.name}</span><div style={{flex:1,height:8,background:P.border,position:"relative"}}><div style={{height:"100%",background:s.color,width:`${s.pct}%`,transition:"width 0.3s"}}/></div><span style={{fontFamily:P.mono,fontSize:7,color:P.ghost,width:50,textAlign:"right",flexShrink:0}}>{s.count} ({s.pct}%)</span></div>)}</div>}
    <div style={{border:`1px solid ${P.border}`,background:P.bgCard,overflowX:"auto"}}>
      <div style={{display:"grid",gridTemplateColumns:"40px 1fr 100px 60px 60px 60px 60px 56px",padding:"6px 10px",borderBottom:`1px solid ${P.border}`,background:P.bgIn,minWidth:540}}>{["#","ARCHETYPE","CLUSTER","SI","PT","GV","CE","TIME"].map(h=><div key={h} style={{fontFamily:P.mono,fontSize:6,color:P.textDim,letterSpacing:"2px"}}>{h}</div>)}</div>
      <div style={{maxHeight:400,overflow:"auto"}}>{sorted.length===0?<div style={{padding:16,textAlign:"center",fontFamily:P.mono,fontSize:9,color:P.textDim}}>No responses yet — complete the test to see data here.</div>:sorted.map((r,i)=><div key={r.id} onClick={()=>setSel(sel===r.id?null:r.id)} style={{display:"grid",gridTemplateColumns:"40px 1fr 100px 60px 60px 60px 60px 56px",padding:"5px 10px",borderBottom:`1px solid ${P.border}`,cursor:"pointer",background:sel===r.id?P.bgHov:"transparent",minWidth:540}}>
        <div style={{fontFamily:P.mono,fontSize:8,color:P.textDim}}>{data.length-i}</div>
        <div style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:4,height:4,borderRadius:"50%",background:ARC[r.archKey]?.color||P.gray,flexShrink:0}}/><span style={{fontFamily:P.mono,fontSize:8,color:ARC[r.archKey]?.color||P.ghost}}>{r.archKey}</span><span style={{fontFamily:P.mono,fontSize:7,color:P.gray,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.archName}</span></div>
        <div style={{fontFamily:P.mono,fontSize:7,color:P.textDim}}>{r.cluster}</div>
        {["SI","PT","GV","CE"].map(ax=><div key={ax} style={{fontFamily:P.mono,fontSize:8,color:r.scores[ax]>60?P.emerald:r.scores[ax]<40?P.ruby:P.gray}}>{Math.round(r.scores[ax])}</div>)}
        <div style={{fontFamily:P.mono,fontSize:6,color:P.textDim}}>{new Date(r.ts).toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"})}</div>
      </div>)}</div>
    </div>
    {detail&&<div style={{border:`1px solid ${P.border}`,padding:12,background:P.bgCard,marginTop:8}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:8,flexWrap:"wrap",gap:4}}><div style={{fontFamily:P.mono,fontSize:8,color:P.ghost}}>RESPONSE #{data.length-sorted.indexOf(detail)} — {detail.archKey} {detail.archName}</div><div style={{fontFamily:P.mono,fontSize:7,color:P.textDim}}>{new Date(detail.ts).toLocaleString("fr-FR")}</div></div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(100px,1fr))",gap:6}}>{["SI","PT","GV","CE"].map(ax=><div key={ax} style={{border:`1px solid ${P.border}`,padding:8,textAlign:"center"}}><div style={{fontFamily:P.mono,fontSize:6,color:P.textDim,letterSpacing:"2px"}}>{ax}</div><div style={{fontFamily:P.mono,fontSize:18,color:detail.scores[ax]>60?P.emerald:detail.scores[ax]<40?P.ruby:P.ghost,fontWeight:300}}>{Math.round(detail.scores[ax])}</div><div style={{height:3,background:P.border,marginTop:4}}><div style={{height:"100%",background:detail.scores[ax]>60?P.emerald:detail.scores[ax]<40?P.ruby:P.gray,width:`${detail.scores[ax]}%`}}/></div></div>)}</div>
      {detail.answers&&<div style={{marginTop:8}}><div style={{fontFamily:P.mono,fontSize:6,color:P.textDim,letterSpacing:"2px",marginBottom:4}}>RAW ANSWERS (80Q)</div><div style={{display:"flex",flexWrap:"wrap",gap:2}}>{Object.entries(detail.answers).sort((a,b)=>{const[at,aq]=a[0].split("-").map(Number);const[bt,bq]=b[0].split("-").map(Number);return at*20+aq-(bt*20+bq);}).map(([k,v])=><div key={k} style={{width:14,height:14,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:P.mono,fontSize:6,color:v>=4?P.emerald:v<=2?P.ruby:P.ghost,background:P.bgIn,border:`1px solid ${P.border}`}}>{v}</div>)}</div></div>}
    </div>}
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:6,marginTop:12}}>{exports.map(x=><button key={x.id} onClick={x.run} disabled={x.disabled} style={{background:"none",border:`1px solid ${P.border}`,color:x.disabled?P.textDim:P.gray,padding:"6px 10px",cursor:x.disabled?"default":"pointer",fontFamily:P.mono,fontSize:7,letterSpacing:"1.5px",opacity:x.disabled?0.45:1}}>{x.label}</button>)}</div>
    <div style={{display:"flex",justifyContent:"flex-end",marginTop:8}}><button onClick={()=>{if(confirm("Effacer toutes les réponses ?")){localStorage.removeItem("dgz_responses");load();}}} style={{background:"none",border:`1px solid ${P.ruby}44`,color:P.ruby,padding:"6px 14px",cursor:"pointer",fontFamily:P.mono,fontSize:7,letterSpacing:"2px",opacity:0.6}} disabled={data.length===0}>CLEAR RESPONSES</button></div>
  </div>;
}

// ═══ APP ═══
export default function App(){const[booting,setBooting]=useState(true);const[view,setView]=useState("home");const[result,setResult]=useState(null);const[uLv,setULv]=useState(1);const[uArch,setUArch]=useState(null);
  const[notifs,setNotifs]=useState([{id:1,text:"NyxWeaver a répondu",time:5,read:false},{id:2,text:"RubyForge +1 votre thread",time:15,read:false},{id:3,text:"Niveau INITIATED !",time:30,read:false}]);
  const bootDone=useCallback(()=>setBooting(false),[]);
  const ctx=useMemo(()=>({view,setView,result,setResult,uLv,setULv,uArch,setUArch,notifs,setNotifs}),[view,result,uLv,uArch,notifs]);
  return <Ctx.Provider value={ctx}><div style={{background:P.black,minHeight:"100vh",color:P.ghost}}>
    <style>{CSS}</style>
    {booting&&<Boot onDone={bootDone}/>}
    {!booting&&<>
      <div style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",background:`radial-gradient(ellipse at 10% 40%,${P.ruby}06 0%,transparent 50%),radial-gradient(ellipse at 90% 80%,${P.sable}04 0%,transparent 40%),${P.black}`}}><div style={{position:"absolute",inset:0,opacity:0.02,backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,backgroundSize:"128px"}}/><div style={{position:"absolute",inset:0,opacity:0.01,backgroundImage:`linear-gradient(${P.gray} 1px,transparent 1px),linear-gradient(90deg,${P.gray} 1px,transparent 1px)`,backgroundSize:"calc(100%/12) calc(100%/12)"}}/></div>
      <div style={{position:"relative",zIndex:2}}>
        <Header/>
        {view==="home"&&<Home/>}
        {view==="test"&&<TestEng/>}
        {view==="results"&&result&&<Passport/>}
        {view==="archives"&&<Archives/>}
        {view==="hub"&&<Network/>}
        {view==="soul"&&<SoulLounge/>}
        {view==="responses"&&<Responses/>}
        <footer style={{borderTop:`1px solid ${P.border}`,padding:8,textAlign:"center"}}><div style={{fontFamily:P.mono,fontSize:6,color:P.textDim,letterSpacing:"2px"}}>DIGGERZ © 2026 — SUBSTRATE OS v5 UNIFIED — FDI4 — {sn()}</div></footer>
      </div>
    </>}
  </div></Ctx.Provider>;
}
