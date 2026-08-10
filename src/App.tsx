// ============================================================
// App.jsx — Le Grand Quiz (version Vite / module ES)
// Généré depuis l'export Claude Design. Les questions sont dans QUESTIONS.
// ============================================================
import React from 'react';
const { useState, useEffect, useRef, useCallback, useMemo, useLayoutEffect } = React;

// ───────────────────────── data ─────────────────────────
// ============================================================
// data.jsx — 12 catégories, banque de questions, plateau 100 cases (8 catégories tirées par partie)
// ============================================================

// 12 catégories — couleurs distinctes (le vert feutrine est réservé au plateau,
// donc aucune catégorie n'utilise la teinte verte ~155 pour éviter le conflit).
const CATEGORIES = [
  { id: 'histoire',     label: 'Histoire',     short: 'Histoire',  color: 'oklch(0.52 0.15 32)',  soft: 'oklch(0.92 0.045 32)',  glyph: '⚜' },
  { id: 'geo',          label: 'Géographie',   short: 'Géo',       color: 'oklch(0.56 0.14 240)', soft: 'oklch(0.92 0.04 240)',  glyph: '◍' },
  { id: 'litterature',  label: 'Littérature',  short: 'Lettres',   color: 'oklch(0.50 0.14 322)', soft: 'oklch(0.92 0.045 322)', glyph: '❦' },
  { id: 'sciences',     label: 'Sciences',     short: 'Sciences',  color: 'oklch(0.56 0.11 200)', soft: 'oklch(0.92 0.04 200)',  glyph: '⚛' },
  { id: 'musique',      label: 'Musique',      short: 'Musique',   color: 'oklch(0.58 0.16 355)', soft: 'oklch(0.93 0.045 355)', glyph: '♬' },
  { id: 'cinema',       label: 'Cinéma',       short: 'Cinéma',    color: 'oklch(0.48 0.15 290)', soft: 'oklch(0.92 0.045 290)', glyph: '✲' },
  { id: 'sport',        label: 'Sport',        short: 'Sport',     color: 'oklch(0.64 0.14 62)',  soft: 'oklch(0.94 0.04 62)',   glyph: '✺' },
  { id: 'geopolitique', label: 'Géopolitique', short: 'Géopol.',   color: 'oklch(0.46 0.055 252)',soft: 'oklch(0.91 0.025 252)', glyph: '⊕' },
  { id: 'arts',         label: 'Arts',         short: 'Arts',      color: 'oklch(0.50 0.14 271)', soft: 'oklch(0.92 0.05 271)',  glyph: '❖' },
  { id: 'nature',       label: 'Nature',       short: 'Nature',    color: 'oklch(0.52 0.11 178)', soft: 'oklch(0.92 0.04 178)',  glyph: '♣' },
  { id: 'gastronomie',  label: 'Gastronomie',  short: 'Gastro.',   color: 'oklch(0.55 0.15 25)',  soft: 'oklch(0.93 0.05 25)',   glyph: '✿' },
  { id: 'mythologie',   label: 'Mythologie',   short: 'Mythes',    color: 'oklch(0.79 0.165 100)',soft: 'oklch(0.95 0.05 100)',  glyph: '✵' },
];

// Nombre de catégories tirées sur le plateau à chaque partie (parmi les 12).
const BOARD_CATS = 8;

const CAT_BY_ID = Object.fromEntries(CATEGORIES.map(c => [c.id, c]));

// Banque de questions — culture générale familiale (FR), 4 réponses, index correct.
// Deux paliers de difficulté par catégorie : « debutant » (Initié) et « expert » (Expert).
const QUESTIONS = {
// Deux paliers : « debutant » (Initié, conservé, 8 catégories d'origine) et « expert »
// (palier Expert, 100 questions/catégorie — voir banque en préparation).
  histoire: {
    debutant: [
      { q: "Quel peuple antique a inventé l'écriture cunéiforme en Mésopotamie ?", a: ["Les Égyptiens", "Les Grecs", "Les Sumériens", "Les Romains"], correct: 2 },
      { q: "Quel grand centre du savoir de l'Antiquité, riche de milliers de rouleaux, se trouvait en Égypte ?", a: ["La bibliothèque d'Alexandrie", "La bibliothèque de Rome", "La bibliothèque d'Athènes", "La bibliothèque de Babylone"], correct: 0 },
      { q: "Comment appelait-on les combattants qui s'affrontaient dans les arènes romaines ?", a: ["Les légionnaires", "Les gladiateurs", "Les sénateurs", "Les consuls"], correct: 1 },
      { q: "Quel grand amphithéâtre de Rome accueillait les combats de gladiateurs ?", a: ["Le Parthénon", "Le Panthéon", "Le Forum", "Le Colisée"], correct: 3 },
      { q: "Quel temple domine la colline de l'Acropole à Athènes ?", a: ["Le Colisée", "La basilique", "Le Parthénon", "L'obélisque"], correct: 2 },
      { q: "Quelle langue parlait-on couramment dans la Rome antique ?", a: ["Le grec", "Le latin", "L'italien", "L'espagnol"], correct: 1 },
      { q: "Quel premier empereur de Rome succéda à Jules César ?", a: ["Néron", "Trajan", "Caligula", "Auguste"], correct: 3 },
      { q: "Quelle cité rivale de Rome fut défendue par le général Hannibal ?", a: ["Carthage", "Athènes", "Sparte", "Troie"], correct: 0 },
      { q: "Quel long conflit opposa Rome à Carthage dans l'Antiquité ?", a: ["La guerre de Troie", "Les guerres puniques", "Les guerres médiques", "La guerre des Gaules"], correct: 1 },
      { q: "Quel roi de Macédoine, élève d'Aristote, conquit un vaste empire ?", a: ["Léonidas", "Périclès", "Darius", "Alexandre le Grand"], correct: 3 },
      { q: "Quelle bataille vit trois cents Spartiates résister aux Perses dans un défilé ?", a: ["Les Thermopyles", "Marathon", "Salamine", "Cannes"], correct: 0 },
      { q: "Comment nommait-on les communautés politiques indépendantes de la Grèce antique, comme Athènes ?", a: ["Les empires", "Les royaumes", "Les cités-États", "Les colonies"], correct: 2 },
      { q: "Comment appelait-on le souverain de l'Égypte ancienne ?", a: ["Le pharaon", "Le calife", "Le tsar", "Le sultan"], correct: 0 },
      { q: "Quel objet gravé a permis de déchiffrer les hiéroglyphes égyptiens ?", a: ["La pierre philosophale", "Le disque de Phaistos", "La table d'émeraude", "La pierre de Rosette"], correct: 3 },
      { q: "Quelle statue à corps de lion et tête humaine garde les pyramides de Gizeh ?", a: ["Le Colosse", "La Victoire", "Le Sphinx", "Le totem"], correct: 2 },
      { q: "Quel État chrétien d'Orient avait Constantinople pour capitale ?", a: ["L'Empire ottoman", "L'Empire byzantin", "L'Empire perse", "L'Empire romain"], correct: 1 },
      { q: "Quel prophète fonda l'islam au VIIe siècle ?", a: ["Mahomet", "Abraham", "Moïse", "Bouddha"], correct: 0 },
      { q: "Comment appelait-on les expéditions vers Jérusalem menées par les chrétiens d'Europe ?", a: ["Les odyssées", "Les croisades", "Les migrations", "Les colonisations"], correct: 1 },
      { q: "Quel roi d'Angleterre, réputé courageux, était surnommé « Cœur de Lion » ?", a: ["Jean", "Édouard", "Guillaume", "Richard"], correct: 3 },
      { q: "Quel roi anglais dut accepter la Grande Charte en 1215 ?", a: ["Richard", "Henri VIII", "Jean sans Terre", "Guillaume"], correct: 2 },
      { q: "Comment appelait-on les moines qui recopiaient les livres à la main dans les monastères ?", a: ["Les imprimeurs", "Les copistes", "Les libraires", "Les relieurs"], correct: 1 },
      { q: "Quel conquérant fonda un immense empire mongol au XIIIe siècle ?", a: ["Gengis Khan", "Attila", "Tamerlan", "Kubilai"], correct: 0 },
      { q: "Comment appelait-on le grand seigneur à qui les paysans devaient obéissance au Moyen Âge ?", a: ["Le bourgeois", "L'artisan", "Le marchand", "Le suzerain"], correct: 3 },
      { q: "Quel artiste italien a peint le plafond de la chapelle Sixtine ?", a: ["Léonard de Vinci", "Raphaël", "Michel-Ange", "Titien"], correct: 2 },
      { q: "Quelle famille dirigea Florence et protégea les artistes de la Renaissance ?", a: ["Les Borgia", "Les Sforza", "Les Médicis", "Les Tudor"], correct: 2 },
      { q: "Quel navigateur a donné son prénom au continent américain ?", a: ["Amerigo Vespucci", "Christophe Colomb", "Magellan", "Jean Cabot"], correct: 0 },
      { q: "Quel explorateur portugais contourna l'Afrique par le cap de Bonne-Espérance ?", a: ["Vasco de Gama", "Bartolomeu Dias", "Magellan", "Christophe Colomb"], correct: 1 },
      { q: "Quel roi anglais fonda l'Église anglicane après avoir rompu avec Rome ?", a: ["Charles Ier", "Jacques Ier", "Édouard VI", "Henri VIII"], correct: 3 },
      { q: "Quelle reine catholique d'Espagne soutint le voyage de Christophe Colomb ?", a: ["Marie Tudor", "Catherine de Médicis", "Élisabeth Ire", "Isabelle de Castille"], correct: 3 },
      { q: "Quel massacre de protestants ensanglanta Paris en 1572 ?", a: ["La Saint-Barthélemy", "La Terreur", "La Fronde", "La Commune"], correct: 0 },
      { q: "Quel moine allemand lança la Réforme protestante en 1517 ?", a: ["Jean Calvin", "Martin Luther", "Thomas More", "Érasme"], correct: 1 },
      { q: "Quel réformateur religieux s'installa à Genève au XVIe siècle ?", a: ["Martin Luther", "John Knox", "Jean Calvin", "Zwingli"], correct: 2 },
      { q: "Quel tsar fonda la ville de Saint-Pétersbourg ?", a: ["Pierre le Grand", "Ivan le Terrible", "Nicolas II", "Alexandre Ier"], correct: 0 },
      { q: "Quelle impératrice éclairée régna sur la Russie au XVIIIe siècle ?", a: ["Élisabeth Ire", "Marie-Thérèse", "Victoria", "Catherine II"], correct: 3 },
      { q: "Quelle souveraine régna sur l'Autriche au XVIIIe siècle et eut seize enfants ?", a: ["Catherine II", "Élisabeth", "Marie-Thérèse", "Anne"], correct: 2 },
      { q: "Quel ministre de Louis XIV développa l'industrie et le commerce du royaume ?", a: ["Mazarin", "Colbert", "Richelieu", "Fouquet"], correct: 1 },
      { q: "Quel conflit du XVIIIe siècle opposa la France et l'Angleterre pour leurs colonies ?", a: ["La guerre de Cent Ans", "La guerre de Trente Ans", "La guerre de Sept Ans", "La guerre de Crimée"], correct: 2 },
      { q: "Quel texte de 1776 proclama la rupture des colonies américaines avec l'Angleterre ?", a: ["La Déclaration d'indépendance", "La Grande Charte", "La Constitution", "La Bill of Rights"], correct: 0 },
      { q: "Quel général devint le premier président des États-Unis ?", a: ["Thomas Jefferson", "Abraham Lincoln", "Benjamin Franklin", "George Washington"], correct: 3 },
      { q: "Quel engagement les députés prirent-ils en 1789, jurant de ne pas se séparer avant une constitution ?", a: ["La prise de la Bastille", "Le serment du Jeu de paume", "La nuit du 4 août", "La fuite à Varennes"], correct: 1 },
      { q: "Quel texte de 1789 proclama que les êtres humains naissent libres et égaux ?", a: ["La Grande Charte", "La Déclaration des droits de l'homme", "La Constitution américaine", "La Magna Carta"], correct: 1 },
      { q: "Comment appelait-on les révolutionnaires modérés opposés aux Montagnards ?", a: ["Les Jacobins", "Les royalistes", "Les Girondins", "Les sans-culottes"], correct: 2 },
      { q: "Quel révolutionnaire fut assassiné dans sa baignoire par Charlotte Corday ?", a: ["Danton", "Robespierre", "Saint-Just", "Marat"], correct: 3 },
      { q: "Quelle période de 1793 et 1794 fut marquée par de nombreuses exécutions ?", a: ["La Terreur", "La Fronde", "La Restauration", "Les Cent-Jours"], correct: 0 },
      { q: "En quelle année Napoléon fut-il sacré empereur ?", a: ["1804", "1799", "1812", "1815"], correct: 0 },
      { q: "Quelle bataille de 1805 fut une éclatante victoire de Napoléon ?", a: ["Waterloo", "Iéna", "Austerlitz", "Wagram"], correct: 2 },
      { q: "Quelle offensive désastreuse Napoléon lança-t-il vers Moscou en 1812 ?", a: ["La campagne d'Égypte", "La campagne d'Italie", "La campagne d'Espagne", "La campagne de Russie"], correct: 3 },
      { q: "Quel recueil de lois, promulgué en 1804, organise encore le droit français ?", a: ["La Grande Charte", "Le Code civil", "La Constitution", "La Déclaration"], correct: 1 },
      { q: "Quelle invention, perfectionnée par Watt, déclencha la révolution industrielle ?", a: ["L'ampoule", "Le téléphone", "La machine à vapeur", "L'automobile"], correct: 2 },
      { q: "Quel moyen de transport révolutionna les voyages terrestres au XIXe siècle ?", a: ["Le chemin de fer", "L'avion", "La voiture", "Le bateau à voile"], correct: 0 },
      { q: "Quel soulèvement du milieu du XIXe siècle chassa le roi Louis-Philippe ?", a: ["Les Trois Glorieuses", "La Commune", "La Fronde", "La révolution de 1848"], correct: 3 },
      { q: "Qui proclama le Second Empire en 1852 ?", a: ["Napoléon Ier", "Louis-Napoléon Bonaparte", "Louis-Philippe", "Adolphe Thiers"], correct: 1 },
      { q: "Quel conflit de 1870 et 1871 opposa la France à la Prusse ?", a: ["La guerre de Crimée", "La guerre de Sept Ans", "La guerre des Boers", "La guerre franco-prussienne"], correct: 3 },
      { q: "Quelle insurrection parisienne éclata au printemps 1871 après la défaite ?", a: ["La Fronde", "Les Trois Glorieuses", "La Commune de Paris", "Mai 68"], correct: 2 },
      { q: "Quelle voie d'eau, ouverte en 1869, relie la Méditerranée à la mer Rouge ?", a: ["Le canal de Suez", "Le canal de Panama", "Le canal du Midi", "Le canal de Corinthe"], correct: 0 },
      { q: "Comment appelait-on la vague d'expansion coloniale européenne au XIXe siècle ?", a: ["La décolonisation", "La colonisation", "La mondialisation", "L'industrialisation"], correct: 1 },
      { q: "Quel attentat de 1914 à Sarajevo déclencha la Première Guerre mondiale ?", a: ["L'attentat contre Lincoln", "L'attentat contre Kennedy", "L'assassinat de l'archiduc François-Ferdinand", "L'assassinat de Jaurès"], correct: 2 },
      { q: "Dans quels longs fossés les soldats combattaient-ils durant la Grande Guerre ?", a: ["Les casemates", "Les bunkers", "Les remparts", "Les tranchées"], correct: 3 },
      { q: "Comment surnommait-on les soldats français de la Première Guerre mondiale ?", a: ["Les poilus", "Les sans-culottes", "Les gaulois", "Les chevaliers"], correct: 0 },
      { q: "Quel dirigeant communiste prit le pouvoir en Russie en 1917 ?", a: ["Staline", "Lénine", "Trotski", "Gorbatchev"], correct: 1 },
      { q: "Quel dictateur dirigea l'Italie fasciste à partir des années 1920 ?", a: ["Franco", "Hitler", "Salazar", "Mussolini"], correct: 3 },
      { q: "Quel dictateur dirigea l'Espagne après la guerre civile de 1936 à 1939 ?", a: ["Mussolini", "Franco", "Salazar", "Perón"], correct: 1 },
      { q: "Quelle crise économique frappa le monde après 1929 ?", a: ["La Belle Époque", "Les Trente Glorieuses", "La Grande Dépression", "La Renaissance"], correct: 2 },
      { q: "Quel pays attaqua la Pologne en 1939, déclenchant la Seconde Guerre mondiale ?", a: ["L'Allemagne", "L'Italie", "L'URSS", "Le Japon"], correct: 0 },
      { q: "Quelle attaque de 1941 fit entrer les États-Unis dans la Seconde Guerre mondiale ?", a: ["Hiroshima", "Pearl Harbor", "Midway", "Iwo Jima"], correct: 1 },
      { q: "Comment appelait-on le mouvement mené par de Gaulle depuis Londres pour poursuivre le combat contre l'occupant ?", a: ["La Commune", "La Fronde", "La Restauration", "La France libre"], correct: 3 },
      { q: "Quel mouvement clandestin luttait contre l'occupant en France de 1940 à 1944 ?", a: ["La Révolution", "La Réforme", "La Résistance", "La Renaissance"], correct: 2 },
      { q: "Sur quelles villes japonaises des bombes atomiques furent-elles larguées en 1945 ?", a: ["Hiroshima et Nagasaki", "Tokyo et Osaka", "Kyoto et Kobe", "Nagoya et Sapporo"], correct: 0 },
      { q: "Quel génocide visa les Juifs d'Europe durant la Seconde Guerre mondiale ?", a: ["La Terreur", "L'Inquisition", "La Shoah", "La colonisation"], correct: 2 },
      { q: "Quel homme dirigea le Royaume-Uni pendant la Seconde Guerre mondiale ?", a: ["Neville Chamberlain", "Clement Attlee", "Anthony Eden", "Winston Churchill"], correct: 3 },
      { q: "Quel président américain dirigea les États-Unis durant la majeure partie de la Seconde Guerre mondiale ?", a: ["Franklin Roosevelt", "Harry Truman", "Woodrow Wilson", "Dwight Eisenhower"], correct: 0 },
      { q: "Quel dirigeant soviétique lança les réformes de la perestroïka dans les années 1980 ?", a: ["Léonid Brejnev", "Mikhaïl Gorbatchev", "Nikita Khrouchtchev", "Boris Eltsine"], correct: 1 },
      { q: "Quel leader sud-africain, emprisonné vingt-sept ans, devint président en 1994 ?", a: ["Desmond Tutu", "Kofi Annan", "Nelson Mandela", "Steve Biko"], correct: 2 },
      { q: "Quel régime de ségrégation raciale exista en Afrique du Sud jusqu'en 1991 ?", a: ["L'apartheid", "La ségrégation", "L'esclavage", "La colonisation"], correct: 0 },
      { q: "Quel pasteur américain défendit les droits des Noirs par la non-violence ?", a: ["Malcolm X", "Martin Luther King", "Barack Obama", "Frederick Douglass"], correct: 1 },
      { q: "Quel dirigeant proclama la République populaire de Chine en 1949 ?", a: ["Sun Yat-sen", "Deng Xiaoping", "Tchang Kaï-chek", "Mao Zedong"], correct: 3 },
      { q: "Quel conflit des années 1960 opposa le Nord et le Sud, avec une lourde intervention américaine en Asie ?", a: ["La guerre du Vietnam", "La guerre de Corée", "La guerre du Golfe", "La guerre froide"], correct: 0 },
      { q: "Quel conflit d'indépendance opposa un pays du Maghreb à la France de 1954 à 1962 ?", a: ["La guerre du Vietnam", "La guerre d'Algérie", "La guerre d'Indochine", "La guerre des Boers"], correct: 1 },
      { q: "En quelle année les femmes obtinrent-elles le droit de vote en France ?", a: ["1848", "1789", "1944", "1968"], correct: 2 },
      { q: "Quel événement du printemps 1968 secoua la France par des manifestations étudiantes ?", a: ["La Commune", "La Fronde", "Les Trois Glorieuses", "Mai 68"], correct: 3 },
      { q: "Quel empereur unifia la Chine et se fit enterrer avec une armée de terre cuite ?", a: ["Confucius", "Mao Zedong", "Kubilai Khan", "Qin Shi Huang"], correct: 3 },
      { q: "Quelle famille de shoguns dirigea le Japon jusqu'en 1868 ?", a: ["Les Ming", "Les Tokugawa", "Les Meiji", "Les Qing"], correct: 1 },
      { q: "Quel pharaon imposa le culte du dieu solaire Aton ?", a: ["Akhenaton", "Toutankhamon", "Ramsès II", "Khéops"], correct: 0 },
      { q: "Quel roi de France mourut poignardé par Ravaillac en 1610 ?", a: ["Henri III", "Louis XIII", "Henri IV", "François II"], correct: 2 },
      { q: "Quel empereur romain persécuta les chrétiens et aurait laissé brûler Rome ?", a: ["Auguste", "Trajan", "Néron", "Hadrien"], correct: 2 },
      { q: "Quel explorateur anglais mena trois grands voyages dans le Pacifique au XVIIIe siècle ?", a: ["Francis Drake", "James Cook", "Walter Raleigh", "Henry Hudson"], correct: 1 },
      { q: "Quelle bataille de 732 arrêta l'avancée arabe en Gaule ?", a: ["Poitiers", "Roncevaux", "Bouvines", "Azincourt"], correct: 0 },
      { q: "Quelle bataille de 1415 fut une lourde défaite française face aux Anglais ?", a: ["Marignan", "Bouvines", "Crécy", "Azincourt"], correct: 3 },
      { q: "Quel roi de France fut fait prisonnier à la bataille de Pavie en 1525 ?", a: ["Louis XII", "François Ier", "Henri II", "Charles VIII"], correct: 1 },
      { q: "Quel président américain fut assassiné en 1865, peu après la guerre de Sécession ?", a: ["John Kennedy", "James Garfield", "William McKinley", "Abraham Lincoln"], correct: 3 },
      { q: "Quel président américain fut assassiné à Dallas en 1963 ?", a: ["John Kennedy", "Abraham Lincoln", "Ronald Reagan", "Richard Nixon"], correct: 0 },
      { q: "Quelle acquisition de 1803 doubla presque la superficie des États-Unis ?", a: ["L'achat de l'Alaska", "L'annexion du Texas", "La vente de la Louisiane", "La conquête de l'Ouest"], correct: 2 },
      { q: "Quel afflux de chercheurs d'or attira des milliers de personnes en Californie en 1849 ?", a: ["La conquête de l'Ouest", "La ruée vers l'or", "La révolution industrielle", "La Sécession"], correct: 1 },
      { q: "Quel navire transporta des colons anglais en Amérique en 1620 ?", a: ["La Santa María", "Le Titanic", "Le Mayflower", "L'Endeavour"], correct: 2 },
      { q: "Quel roi de Prusse fit de Berlin une grande capitale au XVIIIe siècle ?", a: ["Guillaume Ier", "Guillaume II", "Othon", "Frédéric II"], correct: 3 },
      { q: "Comment appelait-on la vaste domination coloniale « où le soleil ne se couche jamais » ?", a: ["L'Empire britannique", "L'Empire romain", "L'Empire ottoman", "L'Empire aztèque"], correct: 0 },
      { q: "Quelle civilisation d'Amérique centrale bâtit des pyramides à degrés, comme les Mayas ?", a: ["Les Incas", "Les Vikings", "Les Romains", "Les Aztèques"], correct: 3 },
      { q: "Comment appelait-on les aventuriers espagnols partis soumettre l'Amérique ?", a: ["Les conquistadors", "Les croisés", "Les légionnaires", "Les corsaires"], correct: 0 },
      { q: "Quelle capitale aztèque les Espagnols détruisirent-ils au Mexique ?", a: ["Cuzco", "Tenochtitlan", "Machu Picchu", "Chichén Itzá"], correct: 1 },
      { q: "Quel roi de France régnait à la fin de la guerre de Cent Ans, en 1453 ?", a: ["Louis XI", "François Ier", "Charles VII", "Charles VIII"], correct: 2 },
    ],
    expert: [],
  },
  geo: {
    debutant: [
      { q: "Quelle est la capitale de la Malaisie ?", a: ["Jakarta", "Singapour", "Bangkok", "Kuala Lumpur"], correct: 3 },
      { q: "Quelle est la capitale de la Norvège ?", a: ["Oslo", "Bergen", "Stavanger", "Helsinki"], correct: 0 },
      { q: "Quelle est la capitale du Danemark ?", a: ["Oslo", "Copenhague", "Stockholm", "Hambourg"], correct: 1 },
      { q: "Quelle est la capitale de l'Irlande ?", a: ["Belfast", "Cork", "Dublin", "Édimbourg"], correct: 2 },
      { q: "Quelle est la capitale de la République tchèque ?", a: ["Vienne", "Cracovie", "Brno", "Prague"], correct: 3 },
      { q: "Quelle est la capitale de la Roumanie ?", a: ["Bucarest", "Sofia", "Budapest", "Chisinau"], correct: 0 },
      { q: "Quelle est la capitale du Chili ?", a: ["Lima", "Valparaíso", "Santiago", "Mendoza"], correct: 2 },
      { q: "Quelle est la capitale du Pérou ?", a: ["Quito", "Lima", "La Paz", "Cuzco"], correct: 1 },
      { q: "Quelle est la capitale de la Colombie ?", a: ["Bogotá", "Medellín", "Caracas", "Quito"], correct: 0 },
      { q: "Quelle est la capitale de l'Iran ?", a: ["Bagdad", "Téhéran", "Kaboul", "Ispahan"], correct: 1 },
      { q: "Quelle est la capitale de la Thaïlande ?", a: ["Hanoï", "Jakarta", "Bangkok", "Manille"], correct: 2 },
      { q: "Quelle est la capitale du Vietnam ?", a: ["Bangkok", "Phnom Penh", "Saïgon", "Hanoï"], correct: 3 },
      { q: "Quelle est la capitale du Ghana ?", a: ["Accra", "Lagos", "Abidjan", "Lomé"], correct: 0 },
      { q: "Quelle est la capitale de l'Irak ?", a: ["Damas", "Bagdad", "Amman", "Téhéran"], correct: 1 },
      { q: "Quelle est la capitale de l'Indonésie ?", a: ["Bali", "Surabaya", "Bandung", "Jakarta"], correct: 3 },
      { q: "Quelle est la capitale des Philippines ?", a: ["Cebu", "Davao", "Manille", "Quezon"], correct: 2 },
      { q: "Quelle est la capitale de Cuba ?", a: ["Kingston", "La Havane", "Santo Domingo", "San Juan"], correct: 1 },
      { q: "Quelle est la capitale du Kenya ?", a: ["Nairobi", "Lagos", "Khartoum", "Kampala"], correct: 0 },
      { q: "Quelle est la capitale de l'Algérie ?", a: ["Oran", "Tunis", "Alger", "Rabat"], correct: 2 },
      { q: "Quelle est la capitale de la Tunisie ?", a: ["Alger", "Tripoli", "Le Caire", "Tunis"], correct: 3 },
      { q: "Quelle est la capitale du Sénégal ?", a: ["Dakar", "Bamako", "Conakry", "Abidjan"], correct: 0 },
      { q: "Quelle est la capitale de la Jordanie ?", a: ["Damas", "Amman", "Beyrouth", "Bagdad"], correct: 1 },
      { q: "Quelle est la capitale du Pakistan ?", a: ["Karachi", "Lahore", "Islamabad", "New Delhi"], correct: 2 },
      { q: "Quelle cité-État d'Asie du Sud-Est est un pays très prospère ?", a: ["Hong Kong", "Manille", "Bangkok", "Singapour"], correct: 3 },
      { q: "Quelle est la capitale de la Jamaïque ?", a: ["La Havane", "Kingston", "Nassau", "Port-au-Prince"], correct: 1 },
      { q: "Quelle grande étendue d'eau sépare l'Europe de l'Amérique ?", a: ["L'océan Atlantique", "L'océan Pacifique", "L'océan Indien", "L'océan Arctique"], correct: 0 },
      { q: "Quelle grande étendue d'eau borde l'est de l'Afrique et l'ouest de l'Australie ?", a: ["L'océan Atlantique", "L'océan Pacifique", "L'océan Arctique", "L'océan Indien"], correct: 3 },
      { q: "Quelle étendue d'eau gelée entoure le pôle Nord ?", a: ["L'océan Antarctique", "L'océan Indien", "L'océan Arctique", "L'océan Pacifique"], correct: 2 },
      { q: "Quel continent est presque entièrement recouvert de glace ?", a: ["L'Arctique", "L'Afrique", "L'Océanie", "L'Antarctique"], correct: 3 },
      { q: "Quel est le plus petit des continents ?", a: ["L'Europe", "L'Antarctique", "L'Océanie", "L'Amérique"], correct: 2 },
      { q: "Quel fleuve traverse la ville de Rome ?", a: ["Le Tibre", "Le Pô", "L'Arno", "L'Adige"], correct: 0 },
      { q: "Quel fleuve traverse Vienne, Budapest et Belgrade ?", a: ["Le Rhin", "Le Danube", "L'Elbe", "La Vistule"], correct: 1 },
      { q: "Quel fleuve américain traverse la ville de La Nouvelle-Orléans ?", a: ["Le Colorado", "Le Rio Grande", "Le Mississippi", "L'Hudson"], correct: 2 },
      { q: "Quel fleuve sacré traverse le nord de l'Inde ?", a: ["L'Indus", "Le Gange", "Le Mékong", "Le Brahmapoutre"], correct: 1 },
      { q: "Quel grand fleuve de Chine est aussi appelé « fleuve Bleu » ?", a: ["Le Yangzi", "Le fleuve Jaune", "Le Mékong", "L'Indus"], correct: 0 },
      { q: "Quel fleuve d'Amérique du Sud a le plus grand débit du monde ?", a: ["L'Orénoque", "Le Paraná", "Le Rio de la Plata", "L'Amazone"], correct: 3 },
      { q: "Comment appelle-t-on l'immense intérieur désertique de l'Australie ?", a: ["La Pampa", "L'Outback", "La Toundra", "La Savane"], correct: 1 },
      { q: "Quel désert s'étend en Afrique australe, notamment au Botswana ?", a: ["Le Kalahari", "Le Sahara", "Le Namib", "Le Gobi"], correct: 0 },
      { q: "Quel volcan enneigé est le plus haut sommet du Japon ?", a: ["L'Etna", "Le Vésuve", "Le Kilimandjaro", "Le mont Fuji"], correct: 3 },
      { q: "Quelle chaîne de montagnes d'Asie abrite le mont Everest ?", a: ["Les Andes", "Les Rocheuses", "L'Himalaya", "L'Oural"], correct: 2 },
      { q: "Quelle chaîne de montagnes traverse l'ouest de l'Amérique du Nord ?", a: ["Les Andes", "Les Rocheuses", "L'Himalaya", "Les Alpes"], correct: 1 },
      { q: "Dans quel pays himalayen se trouve une partie du mont Everest ?", a: ["Le Népal", "Le Bhoutan", "Le Bangladesh", "La Birmanie"], correct: 0 },
      { q: "Quelle mer se trouve entre l'Italie et la péninsule balkanique ?", a: ["La mer Ionienne", "La mer Égée", "La mer Tyrrhénienne", "La mer Adriatique"], correct: 3 },
      { q: "Quelle mer baigne à la fois la Grèce et la Turquie ?", a: ["L'Adriatique", "La mer Noire", "La mer Égée", "La mer Ionienne"], correct: 2 },
      { q: "Quelle mer intérieure borde l'Ukraine, la Turquie et la Roumanie ?", a: ["La mer Baltique", "La mer Rouge", "La mer Noire", "La mer Caspienne"], correct: 2 },
      { q: "Quelle mer sépare l'Afrique de la péninsule arabique ?", a: ["La mer Rouge", "La Méditerranée", "La mer Noire", "Le golfe Persique"], correct: 0 },
      { q: "Quel est le plus grand des Grands Lacs d'Amérique du Nord ?", a: ["Le lac Michigan", "Le lac Érié", "Le lac Huron", "Le lac Supérieur"], correct: 3 },
      { q: "Quel grand lac borde la ville de Genève, en Suisse ?", a: ["Le lac de Côme", "Le lac Léman", "Le lac de Constance", "Le lac Majeur"], correct: 1 },
      { q: "Quelle est la plus grande île de la mer Méditerranée ?", a: ["La Sicile", "La Sardaigne", "Chypre", "La Crète"], correct: 0 },
      { q: "Quelle grande île se trouve à l'est de l'Afrique, dans l'océan Indien ?", a: ["Sri Lanka", "La Réunion", "Zanzibar", "Madagascar"], correct: 3 },
      { q: "Dans quel pays se trouve la Grande Muraille ?", a: ["Le Japon", "La Chine", "La Corée", "La Mongolie"], correct: 1 },
      { q: "Dans quel pays se trouve la Sagrada Família ?", a: ["L'Italie", "Le Portugal", "L'Espagne", "La France"], correct: 2 },
      { q: "Dans quel pays se dresse le Christ Rédempteur, au-dessus de Rio ?", a: ["L'Argentine", "Le Mexique", "Le Brésil", "Le Pérou"], correct: 2 },
      { q: "Dans quel pays se trouvent les temples d'Angkor ?", a: ["La Thaïlande", "Le Cambodge", "Le Vietnam", "Le Laos"], correct: 1 },
      { q: "Dans quel pays se trouve le mont Rushmore, aux visages sculptés ?", a: ["Les États-Unis", "Le Canada", "Le Mexique", "L'Australie"], correct: 0 },
      { q: "Dans quel pays se trouve la ville de Marrakech ?", a: ["L'Algérie", "La Tunisie", "L'Égypte", "Le Maroc"], correct: 3 },
      { q: "Dans quel pays se trouve la ville de Venise ?", a: ["L'Italie", "La Grèce", "La Croatie", "L'Espagne"], correct: 0 },
      { q: "Dans quel pays se trouve l'antique cité de Petra, taillée dans la roche ?", a: ["L'Égypte", "La Syrie", "Israël", "La Jordanie"], correct: 3 },
      { q: "Dans quel pays se trouve la ville sainte de La Mecque ?", a: ["L'Iran", "L'Irak", "L'Arabie saoudite", "l'Égypte"], correct: 2 },
      { q: "Dans quel pays se trouve la ville de Saint-Pétersbourg ?", a: ["L'Ukraine", "La Russie", "La Pologne", "La Finlande"], correct: 1 },
      { q: "Quel minuscule État est entièrement enclavé dans la ville de Rome ?", a: ["Saint-Marin", "Monaco", "Le Vatican", "Andorre"], correct: 2 },
      { q: "Quel petit État de la Côte d'Azur est célèbre pour son casino ?", a: ["Andorre", "Saint-Marin", "Le Luxembourg", "Monaco"], correct: 3 },
      { q: "Quel pays européen est formé de la Flandre et de la Wallonie ?", a: ["La Belgique", "Les Pays-Bas", "Le Luxembourg", "La Suisse"], correct: 0 },
      { q: "Combien y a-t-il d'océans sur la Terre ?", a: ["Trois", "Cinq", "Quatre", "Sept"], correct: 1 },
      { q: "Comment appelle-t-on les lignes imaginaires horizontales tracées sur un globe ?", a: ["Les méridiens", "Les tropiques", "Les fuseaux", "Les parallèles"], correct: 3 },
      { q: "Comment appelle-t-on la grande forêt de conifères du nord de la Russie ?", a: ["La taïga", "La toundra", "La savane", "La jungle"], correct: 0 },
      { q: "Comment appelle-t-on la plaine gelée et sans arbres du grand nord ?", a: ["La savane", "La jungle", "La toundra", "La prairie"], correct: 2 },
      { q: "Comment appelle-t-on la vaste prairie d'Argentine ?", a: ["La savane", "La pampa", "La steppe", "La toundra"], correct: 1 },
      { q: "Comment appelle-t-on la grande plaine herbeuse d'Afrique où vivent les lions ?", a: ["La toundra", "La savane", "La pampa", "La jungle"], correct: 1 },
      { q: "Comment appelle-t-on un cours d'eau qui se jette dans un plus grand fleuve ?", a: ["Un delta", "Un estuaire", "Une source", "Un affluent"], correct: 3 },
      { q: "Comment appelle-t-on l'embouchure où un fleuve se divise en plusieurs bras avant la mer ?", a: ["Une source", "Un affluent", "Un delta", "Un méandre"], correct: 2 },
      { q: "Comment appelle-t-on une étroite bande de terre reliant deux grandes terres ?", a: ["Un isthme", "Une île", "Une presqu'île", "Un cap"], correct: 0 },
      { q: "Comment appelle-t-on un passage d'eau resserré entre deux mers ?", a: ["Un golfe", "Une baie", "Un cap", "Un détroit"], correct: 3 },
      { q: "Comment appelle-t-on une terre presque entourée d'eau, rattachée au continent ?", a: ["Une péninsule", "Une île", "Un archipel", "Un atoll"], correct: 0 },
      { q: "Comment appelle-t-on un ensemble de plusieurs îles ?", a: ["Un continent", "Un delta", "Un archipel", "Un golfe"], correct: 2 },
      { q: "Comment appelle-t-on le moment où un volcan projette lave et cendres ?", a: ["Une avalanche", "Une éruption", "Une inondation", "Un raz-de-marée"], correct: 1 },
      { q: "Comment appelle-t-on un tremblement de terre ?", a: ["Un séisme", "Un cyclone", "Un tsunami", "Un orage"], correct: 0 },
      { q: "Comment appelle-t-on une immense vague provoquée par un tremblement de terre sous-marin ?", a: ["Un cyclone", "Une marée", "Un tsunami", "Une écume"], correct: 2 },
      { q: "Comment appelle-t-on une violente tempête tropicale aux vents tournants ?", a: ["Un séisme", "Une avalanche", "Une éruption", "Un cyclone"], correct: 3 },
      { q: "Comment appelle-t-on la ligne où le ciel semble rejoindre la mer au loin ?", a: ["L'équateur", "L'horizon", "Le méridien", "Le zénith"], correct: 1 },
      { q: "Quel pays est surnommé « le pays du Soleil-Levant » ?", a: ["Le Japon", "La Chine", "La Corée", "La Thaïlande"], correct: 0 },
      { q: "Quel pays d'Afrique de l'Est a pour capitale Addis-Abeba ?", a: ["Le Kenya", "La Somalie", "L'Éthiopie", "Le Soudan"], correct: 2 },
      { q: "Quel pays d'Afrique de l'Ouest a pour capitale Abuja ?", a: ["Le Ghana", "Le Nigeria", "Le Bénin", "Le Cameroun"], correct: 1 },
      { q: "Quelle grande ville indienne, ancien Bombay, borde la mer d'Arabie ?", a: ["New Delhi", "Calcutta", "Bangalore", "Mumbai"], correct: 3 },
      { q: "Quelle ville australienne est célèbre pour son opéra en forme de voiles ?", a: ["Melbourne", "Canberra", "Sydney", "Perth"], correct: 2 },
      { q: "Quelle ville des États-Unis est célèbre pour ses casinos en plein désert ?", a: ["Miami", "Las Vegas", "Seattle", "Boston"], correct: 1 },
      { q: "Quel pays du Golfe possède la ville de Dubaï et ses gratte-ciels ?", a: ["Les Émirats arabes unis", "Le Qatar", "Le Koweït", "Bahreïn"], correct: 0 },
      { q: "Quelle ville sainte est vénérée par les juifs, les chrétiens et les musulmans ?", a: ["La Mecque", "Rome", "Istanbul", "Jérusalem"], correct: 3 },
      { q: "Quelle immense île, la plus grande du monde, appartient au Danemark ?", a: ["L'Islande", "Le Groenland", "La Norvège", "Le Svalbard"], correct: 1 },
      { q: "Quelle île britannique abrite Londres, Édimbourg et Cardiff ?", a: ["La Grande-Bretagne", "L'Irlande", "L'Islande", "La Sardaigne"], correct: 0 },
      { q: "Quels deux pays se partagent l'île d'Hispaniola dans les Caraïbes ?", a: ["Cuba et la Jamaïque", "Les Bahamas et Cuba", "La Barbade et Trinité", "Haïti et la République dominicaine"], correct: 3 },
      { q: "Quel pays d'Amérique du Sud est célèbre pour le tango et la viande grillée ?", a: ["Le Brésil", "Le Chili", "L'Argentine", "Le Pérou"], correct: 2 },
      { q: "Quelle grande ville des États-Unis abrite le quartier d'Hollywood ?", a: ["New York", "Chicago", "Los Angeles", "Miami"], correct: 2 },
      { q: "Quelle ville américaine est surnommée « la Grosse Pomme » ?", a: ["Los Angeles", "New York", "Chicago", "Miami"], correct: 1 },
      { q: "Quelle ville française accueille un célèbre festival de cinéma sur la Côte d'Azur ?", a: ["Cannes", "Nice", "Marseille", "Deauville"], correct: 0 },
      { q: "Quelle ville indienne abrite le célèbre Taj Mahal ?", a: ["New Delhi", "Bombay", "Jaipur", "Agra"], correct: 3 },
      { q: "Quelle grande ville allemande, traversée par la Spree, fut longtemps divisée par un mur ?", a: ["Berlin", "Munich", "Hambourg", "Cologne"], correct: 0 },
      { q: "Quelle métropole chinoise, très peuplée, est un grand port de la côte est ?", a: ["Chengdu", "Xi'an", "Lhassa", "Shanghai"], correct: 3 },
      { q: "Quel pays possède le plus long littoral du monde ?", a: ["La Russie", "L'Australie", "Le Canada", "L'Indonésie"], correct: 2 },
      { q: "Comment appelle-t-on la région la plus au sud de la Terre, couverte de glace ?", a: ["Le pôle Nord", "Le pôle Sud", "L'équateur", "Le tropique"], correct: 1 },
    ],
    expert: [],
  },
  litterature: {
    debutant: [
      { q: "Qui a écrit les contes « Le Chat botté » et « Cendrillon » ?", a: ["Les frères Grimm", "Charles Perrault", "Hans Andersen", "Jean de La Fontaine"], correct: 1 },
      { q: "Quel duo d'auteurs allemands a recueilli « Hansel et Gretel » et « Blanche-Neige » ?", a: ["Les frères Lumière", "Charles Perrault", "Hans Andersen", "Les frères Grimm"], correct: 3 },
      { q: "Quel auteur danois a écrit « La Petite Sirène » et « Le Vilain Petit Canard » ?", a: ["Hans Christian Andersen", "Charles Perrault", "Les frères Grimm", "Lewis Carroll"], correct: 0 },
      { q: "Qui a écrit « Alice au pays des merveilles » ?", a: ["Roald Dahl", "James Barrie", "Lewis Carroll", "Kenneth Grahame"], correct: 2 },
      { q: "Qui a écrit « Charlie et la Chocolaterie » ?", a: ["Lewis Carroll", "C.S. Lewis", "Roald Dahl", "Enid Blyton"], correct: 2 },
      { q: "Qui a écrit « Le Livre de la jungle » ?", a: ["Robert Stevenson", "Rudyard Kipling", "Jack London", "Joseph Conrad"], correct: 1 },
      { q: "Qui a écrit « L'Appel de la forêt » ?", a: ["Jack London", "Mark Twain", "Ernest Hemingway", "John Steinbeck"], correct: 0 },
      { q: "Qui a écrit « Le Portrait de Dorian Gray » ?", a: ["Bram Stoker", "James Joyce", "George Bernard Shaw", "Oscar Wilde"], correct: 3 },
      { q: "Qui a imaginé le monstre du roman « Frankenstein » ?", a: ["Mary Shelley", "Bram Stoker", "Emily Brontë", "Jane Austen"], correct: 0 },
      { q: "Qui a écrit le roman « Dracula » ?", a: ["Mary Shelley", "Bram Stoker", "Oscar Wilde", "Edgar Poe"], correct: 1 },
      { q: "Qui a écrit le poème « Le Corbeau » (« The Raven ») ?", a: ["Walt Whitman", "Emily Dickinson", "Robert Frost", "Edgar Allan Poe"], correct: 3 },
      { q: "Qui a écrit « Le Tour du monde en quatre-vingts jours » ?", a: ["Herbert Wells", "Alexandre Dumas", "Jules Verne", "Louis Boussenard"], correct: 2 },
      { q: "Qui a écrit le roman « L'Écume des jours » ?", a: ["Raymond Queneau", "Albert Camus", "Romain Gary", "Boris Vian"], correct: 3 },
      { q: "Qui a écrit « Zazie dans le métro » ?", a: ["Boris Vian", "Raymond Queneau", "Georges Perec", "Marcel Aymé"], correct: 1 },
      { q: "Qui a écrit « La Gloire de mon père » ?", a: ["Marcel Pagnol", "Jean Giono", "Alphonse Daudet", "Colette"], correct: 0 },
      { q: "Qui a écrit le roman « La Condition humaine » ?", a: ["Jean-Paul Sartre", "Albert Camus", "André Malraux", "Louis Aragon"], correct: 2 },
      { q: "Qui a écrit l'essai poétique « Les Nourritures terrestres » ?", a: ["Paul Valéry", "André Gide", "Paul Claudel", "André Suarès"], correct: 1 },
      { q: "Quelle autrice a écrit « Le Blé en herbe » et les romans de « Claudine » ?", a: ["George Sand", "Simone de Beauvoir", "Françoise Sagan", "Colette"], correct: 3 },
      { q: "Quelle jeune autrice écrivit « Bonjour tristesse » à dix-huit ans ?", a: ["Colette", "Marguerite Duras", "Françoise Sagan", "Nathalie Sarraute"], correct: 2 },
      { q: "Qui a écrit le roman épistolaire « Les Liaisons dangereuses » ?", a: ["Choderlos de Laclos", "Jean-Jacques Rousseau", "Voltaire", "Denis Diderot"], correct: 0 },
      { q: "Quelle autrice écrivit « La Princesse de Clèves » au XVIIe siècle ?", a: ["Madame de Sévigné", "George Sand", "Madame de La Fayette", "Colette"], correct: 2 },
      { q: "Quel écrivain russe a écrit la nouvelle « Le Manteau » ?", a: ["Anton Tchekhov", "Nicolas Gogol", "Ivan Tourgueniev", "Léon Tolstoï"], correct: 1 },
      { q: "Quel dramaturge russe a écrit « La Cerisaie » ?", a: ["Maxime Gorki", "Nicolas Gogol", "Alexandre Ostrovski", "Anton Tchekhov"], correct: 3 },
      { q: "Quel poète russe a écrit « Eugène Onéguine » ?", a: ["Alexandre Pouchkine", "Mikhaïl Lermontov", "Alexandre Blok", "Vladimir Maïakovski"], correct: 0 },
      { q: "Quel écrivain allemand a écrit « La Montagne magique » ?", a: ["Hermann Hesse", "Günter Grass", "Franz Kafka", "Thomas Mann"], correct: 3 },
      { q: "Quel écrivain allemand a écrit « Siddhartha » et « Le Loup des steppes » ?", a: ["Hermann Hesse", "Thomas Mann", "Stefan Zweig", "Heinrich Böll"], correct: 0 },
      { q: "Quel écrivain américain a écrit « L'Attrape-cœurs » ?", a: ["Jack Kerouac", "Truman Capote", "J.D. Salinger", "William Faulkner"], correct: 2 },
      { q: "Quel écrivain de la Beat Generation a écrit « Sur la route » ?", a: ["J.D. Salinger", "Jack Kerouac", "Allen Ginsberg", "Charles Bukowski"], correct: 1 },
      { q: "Quel écrivain américain a créé le personnage de Tarzan ?", a: ["Rudyard Kipling", "Jules Verne", "Jack London", "Edgar Rice Burroughs"], correct: 3 },
      { q: "Quel écrivain français a écrit « Vendredi ou la Vie sauvage » ?", a: ["Jean Giono", "Michel Tournier", "Le Clézio", "Marcel Aymé"], correct: 1 },
      { q: "Quel bagnard, héros de Victor Hugo, est poursuivi par l'inspecteur Javert ?", a: ["Edmond Dantès", "Julien Sorel", "Jean Valjean", "Rastignac"], correct: 2 },
      { q: "Quel personnage d'Alexandre Dumas s'évade du château d'If ?", a: ["Edmond Dantès", "D'Artagnan", "Jean Valjean", "Quasimodo"], correct: 0 },
      { q: "Comment se nomme le sonneur de cloches bossu dans « Notre-Dame de Paris » ?", a: ["Frollo", "Quasimodo", "Gringoire", "Phœbus"], correct: 1 },
      { q: "Quel jeune ambitieux est le héros du « Rouge et le Noir » de Stendhal ?", a: ["Fabrice del Dongo", "Rastignac", "Julien Sorel", "Georges Duroy"], correct: 2 },
      { q: "Comment s'appellent les trois mousquetaires que rejoint d'Artagnan ?", a: ["Athos, Rochefort et Aramis", "Tréville, Porthos et Athos", "Aramis, Planchet et Athos", "Athos, Porthos et Aramis"], correct: 3 },
      { q: "Comment se nomme le commandant du sous-marin Nautilus chez Jules Verne ?", a: ["Le capitaine Nemo", "Le capitaine Achab", "Le capitaine Crochet", "Long John Silver"], correct: 0 },
      { q: "Quel marin obsédé par une baleine blanche mène l'équipage dans « Moby Dick » ?", a: ["Le capitaine Achab", "Le capitaine Nemo", "Le capitaine Crochet", "Le capitaine Flint"], correct: 0 },
      { q: "Comment s'appelle le pirate ennemi juré de Peter Pan ?", a: ["Barbe-Noire", "Long John Silver", "Le capitaine Crochet", "Le capitaine Nemo"], correct: 2 },
      { q: "Comment se nomme le fidèle écuyer de Don Quichotte ?", a: ["Rossinante", "Sancho Panza", "Figaro", "Passepartout"], correct: 1 },
      { q: "Quel poète a écrit le poème « Liberté » pendant l'Occupation ?", a: ["Louis Aragon", "Jacques Prévert", "René Char", "Paul Éluard"], correct: 3 },
      { q: "Quel poète a réuni « Les Feuilles mortes » dans le recueil « Paroles » ?", a: ["Paul Éluard", "Louis Aragon", "Guillaume Apollinaire", "Jacques Prévert"], correct: 3 },
      { q: "Quel écrivain publia le « Manifeste du surréalisme » en 1924 ?", a: ["Tristan Tzara", "André Breton", "Louis Aragon", "Paul Éluard"], correct: 1 },
      { q: "Quel poète du XVIe siècle invite à cueillir la rose dès aujourd'hui ?", a: ["Joachim du Bellay", "Clément Marot", "Pierre de Ronsard", "François Villon"], correct: 2 },
      { q: "Quel poète médiéval, ancien brigand, a écrit la « Ballade des pendus » ?", a: ["François Villon", "Rutebeuf", "Charles d'Orléans", "Pierre de Ronsard"], correct: 0 },
      { q: "Quel poète romantique a écrit « Les Nuits » après sa rupture avec George Sand ?", a: ["Alphonse de Lamartine", "Alfred de Musset", "Alfred de Vigny", "Victor Hugo"], correct: 1 },
      { q: "Quel écrivain a laissé les « Mémoires d'outre-tombe » ?", a: ["Jean-Jacques Rousseau", "Lamartine", "Chateaubriand", "Victor Hugo"], correct: 2 },
      { q: "Quel philosophe des Lumières a écrit « De l'esprit des lois » ?", a: ["Voltaire", "Rousseau", "Diderot", "Montesquieu"], correct: 3 },
      { q: "Quel philosophe dirigea la rédaction de « L'Encyclopédie » au XVIIIe siècle ?", a: ["Denis Diderot", "Voltaire", "Jean-Jacques Rousseau", "Buffon"], correct: 0 },
      { q: "Quel auteur a écrit la nouvelle fantastique « Le Horla » ?", a: ["Prosper Mérimée", "Théophile Gautier", "Edgar Poe", "Maupassant"], correct: 3 },
      { q: "Quel personnage de conte offre trois vœux quand on frotte sa lampe ?", a: ["La fée", "Le génie", "Le lutin", "L'ogre"], correct: 1 },
      { q: "Quel héros des « Mille et Une Nuits » ouvre une caverne en disant « Sésame, ouvre-toi » ?", a: ["Ali Baba", "Aladdin", "Sindbad", "Simbad"], correct: 0 },
      { q: "Quel jeune héros des « Mille et Une Nuits » possède une lampe magique ?", a: ["Ali Baba", "Sindbad", "Aladdin", "Hercule"], correct: 2 },
      { q: "Quel marin des « Mille et Une Nuits » vit sept voyages extraordinaires ?", a: ["Ulysse", "Robinson", "Sindbad", "Gulliver"], correct: 2 },
      { q: "Quel voyageur découvre le pays des géants et celui des Lilliputiens ?", a: ["Robinson", "Gulliver", "Sindbad", "Ulysse"], correct: 1 },
      { q: "Quel écrivain italien a créé le personnage de Pinocchio ?", a: ["Umberto Eco", "Italo Calvino", "Gianni Rodari", "Carlo Collodi"], correct: 3 },
      { q: "Quel marin barbu et colérique est l'ami fidèle de Tintin ?", a: ["Le capitaine Haddock", "Le professeur Tournesol", "Nestor", "Rastapopoulos"], correct: 0 },
      { q: "Quel savant distrait et un peu sourd accompagne souvent Tintin ?", a: ["Le capitaine Haddock", "Nestor", "Le professeur Tournesol", "Séraphin Lampion"], correct: 2 },
      { q: "Quels deux policiers jumeaux et maladroits apparaissent dans les aventures de Tintin ?", a: ["Astérix et Obélix", "Pixi et Dixi", "Boule et Bill", "Dupond et Dupont"], correct: 3 },
      { q: "Quelle bande dessinée met en scène un village gaulois qui résiste aux Romains ?", a: ["Tintin", "Astérix", "Lucky Luke", "Gaston Lagaffe"], correct: 1 },
      { q: "Quel roman américain de Margaret Mitchell a pour héroïne Scarlett O'Hara ?", a: ["Autant en emporte le vent", "Les Raisins de la colère", "La Case de l'oncle Tom", "Beloved"], correct: 0 },
      { q: "Quelle autrice américaine a écrit « Ne tirez pas sur l'oiseau moqueur » ?", a: ["Margaret Mitchell", "Harper Lee", "Toni Morrison", "Flannery O'Connor"], correct: 1 },
      { q: "Quelle autrice a écrit « Les Quatre Filles du docteur March » ?", a: ["Margaret Mitchell", "Jane Austen", "Louisa May Alcott", "Emily Brontë"], correct: 2 },
      { q: "Quel auteur a écrit la saga fantastique « Le Trône de fer » ?", a: ["George R.R. Martin", "J.R.R. Tolkien", "Terry Pratchett", "Robert Jordan"], correct: 0 },
      { q: "Quel écrivain a créé le monde magique de Narnia ?", a: ["J.R.R. Tolkien", "Roald Dahl", "Philip Pullman", "C.S. Lewis"], correct: 3 },
      { q: "Quelle autrice suédoise a créé le personnage de Fifi Brindacier ?", a: ["Selma Lagerlöf", "Tove Jansson", "Hans Andersen", "Astrid Lindgren"], correct: 3 },
      { q: "Quel écrivain italien a écrit « Le Baron perché » ?", a: ["Umberto Eco", "Italo Calvino", "Alberto Moravia", "Dino Buzzati"], correct: 1 },
      { q: "Quel écrivain brésilien a écrit « L'Alchimiste » ?", a: ["Paulo Coelho", "Jorge Amado", "Machado de Assis", "José Saramago"], correct: 0 },
      { q: "Quel écrivain japonais contemporain a écrit « Kafka sur le rivage » ?", a: ["Yukio Mishima", "Kenzaburô Ôe", "Haruki Murakami", "Yasunari Kawabata"], correct: 2 },
      { q: "Quel dramaturge a écrit la comédie « Le Songe d'une nuit d'été » ?", a: ["Christopher Marlowe", "Ben Jonson", "Shakespeare", "Molière"], correct: 2 },
      { q: "Comment appelle-t-on un poème de quatorze vers ?", a: ["Une ode", "Un sonnet", "Une ballade", "Une élégie"], correct: 1 },
      { q: "Comment appelle-t-on un vers de douze syllabes en poésie française ?", a: ["L'alexandrin", "L'octosyllabe", "Le décasyllabe", "Le pentamètre"], correct: 0 },
      { q: "Comment appelle-t-on la répétition d'un même son de consonne dans un vers ?", a: ["Une assonance", "Une métaphore", "Une césure", "Une allitération"], correct: 3 },
      { q: "Comment appelle-t-on une image comme « cet homme est un lion », sans mot de comparaison ?", a: ["Une comparaison", "Une métaphore", "Une hyperbole", "Une litote"], correct: 1 },
      { q: "Comment appelle-t-on une exagération, comme « mourir de rire » ?", a: ["Une litote", "Une métaphore", "Une hyperbole", "Une ironie"], correct: 2 },
      { q: "Comment appelle-t-on un récit de fiction bref, plus court qu'un roman ?", a: ["Une nouvelle", "Un poème", "Une pièce", "Une épopée"], correct: 0 },
      { q: "Comment appelle-t-on les paroles d'un personnage seul sur scène, se parlant à lui-même ?", a: ["Un dialogue", "Une réplique", "Un quiproquo", "Un monologue"], correct: 3 },
      { q: "Comment appelle-t-on le texte de présentation placé au début d'un livre ?", a: ["L'épilogue", "La préface", "La postface", "Le colophon"], correct: 1 },
      { q: "Comment appelle-t-on un auteur qui écrit des pièces de théâtre ?", a: ["Un romancier", "Un poète", "Un dramaturge", "Un essayiste"], correct: 2 },
      { q: "Comment appelle-t-on une œuvre où l'auteur raconte sa propre vie ?", a: ["Une autobiographie", "Une biographie", "Un roman", "Un essai"], correct: 0 },
      { q: "Quel écrivain a écrit le roman de science-fiction « Fahrenheit 451 » ?", a: ["Isaac Asimov", "Philip K. Dick", "Arthur C. Clarke", "Ray Bradbury"], correct: 3 },
      { q: "Quel écrivain de science-fiction a imaginé les « lois de la robotique » ?", a: ["Ray Bradbury", "Isaac Asimov", "Frank Herbert", "Philip K. Dick"], correct: 1 },
      { q: "Quel roman de Frank Herbert se déroule sur une planète désertique aux vers géants ?", a: ["Dune", "Fondation", "Ubik", "Hypérion"], correct: 0 },
      { q: "Quel écrivain britannique a écrit « La Guerre des mondes » et « La Machine à explorer le temps » ?", a: ["Jules Verne", "Arthur Conan Doyle", "Bram Stoker", "Herbert George Wells"], correct: 3 },
      { q: "Quelle poétesse américaine du XIXe siècle, très discrète, écrivit des centaines de poèmes brefs ?", a: ["Walt Whitman", "Sylvia Plath", "Emily Dickinson", "Marianne Moore"], correct: 2 },
      { q: "Quel dramaturge grec antique a écrit « Œdipe roi » et « Antigone » ?", a: ["Euripide", "Eschyle", "Aristophane", "Sophocle"], correct: 3 },
      { q: "Quel auteur grec est considéré comme le père de la comédie antique ?", a: ["Aristophane", "Sophocle", "Euripide", "Ménandre"], correct: 0 },
      { q: "Quel auteur grec est surnommé « le père de l'Histoire » ?", a: ["Thucydide", "Xénophon", "Hérodote", "Plutarque"], correct: 2 },
      { q: "Quel philosophe grec fonda l'Académie d'Athènes et écrivit « La République » ?", a: ["Aristote", "Platon", "Socrate", "Épicure"], correct: 1 },
      { q: "Quel savant grec fut le précepteur d'Alexandre le Grand ?", a: ["Platon", "Aristote", "Socrate", "Pythagore"], correct: 1 },
      { q: "Quel écrivain a écrit « Les Aventures de Huckleberry Finn » ?", a: ["Jack London", "Herman Melville", "Mark Twain", "Washington Irving"], correct: 2 },
      { q: "Quelle épopée raconte la colère d'Achille durant la guerre de Troie ?", a: ["L'Odyssée", "L'Énéide", "Les Argonautiques", "L'Iliade"], correct: 3 },
      { q: "Quelle épopée médiévale française raconte la mort d'un chevalier à Roncevaux ?", a: ["La Chanson de Roland", "Tristan et Iseut", "Le Roman de la Rose", "Perceval"], correct: 0 },
      { q: "Quelle œuvre médiévale met en scène un goupil rusé et le loup Ysengrin ?", a: ["Le Roman de Renart", "La Chanson de Roland", "Tristan et Iseut", "Lancelot"], correct: 0 },
      { q: "Quel amour tragique du Moyen Âge unit Tristan à sa bien-aimée ?", a: ["Guenièvre", "Iseut", "Mélisande", "Héloïse"], correct: 1 },
      { q: "Quel écrivain russe a écrit « Le Docteur Jivago » ?", a: ["Alexandre Soljenitsyne", "Mikhaïl Boulgakov", "Boris Pasternak", "Vladimir Nabokov"], correct: 2 },
      { q: "Quel écrivain russe, prix Nobel, a décrit les camps dans « L'Archipel du Goulag » ?", a: ["Boris Pasternak", "Mikhaïl Boulgakov", "Léon Tolstoï", "Alexandre Soljenitsyne"], correct: 3 },
      { q: "Quel écrivain a écrit « Lolita » et « Feu pâle » ?", a: ["Boris Pasternak", "Vladimir Nabokov", "Philip Roth", "Saul Bellow"], correct: 1 },
      { q: "Quel poète chilien, prix Nobel, est célèbre pour ses odes et ses poèmes d'amour ?", a: ["Pablo Neruda", "Octavio Paz", "Jorge Luis Borges", "Gabriela Mistral"], correct: 0 },
      { q: "Quel écrivain colombien a écrit « L'Amour aux temps du choléra » ?", a: ["Mario Vargas Llosa", "Jorge Luis Borges", "Julio Cortázar", "Gabriel García Márquez"], correct: 3 },
      { q: "Quel auteur a écrit « Le Petit Nicolas » avec le dessinateur Sempé ?", a: ["Marcel Pagnol", "Roald Dahl", "René Goscinny", "Hergé"], correct: 2 },
    ],
    expert: [],
  },
  sciences: {
    debutant: [
      { q: "Quel est le symbole chimique de l'oxygène ?", a: ["O", "Ox", "Og", "Oy"], correct: 0 },
      { q: "Quel est le symbole chimique de l'hydrogène ?", a: ["Hy", "Hg", "H", "Hn"], correct: 2 },
      { q: "Quel est le symbole chimique du chlore ?", a: ["Ch", "Cr", "Co", "Cl"], correct: 3 },
      { q: "Quel est le symbole chimique de l'hélium ?", a: ["Hl", "He", "Hm", "Ho"], correct: 1 },
      { q: "Quels atomes composent une molécule d'eau ?", a: ["Carbone et oxygène", "Azote et hydrogène", "Hydrogène et oxygène", "Oxygène et azote"], correct: 2 },
      { q: "Quel gaz éteint le feu et forme les bulles des sodas ?", a: ["Le dioxyde de carbone", "L'oxygène", "L'hydrogène", "L'azote"], correct: 0 },
      { q: "Quelle est la formule chimique du sel de table ?", a: ["KCl", "H2O", "CO2", "NaCl"], correct: 3 },
      { q: "Comment appelle-t-on un mélange bien homogène, comme du sucre dissous dans l'eau ?", a: ["Une émulsion", "Une solution", "Une suspension", "Un précipité"], correct: 1 },
      { q: "Comment appelle-t-on le passage de l'état liquide à l'état gazeux ?", a: ["La condensation", "La fusion", "L'évaporation", "La solidification"], correct: 2 },
      { q: "Comment appelle-t-on le phénomène par lequel une vapeur redevient liquide ?", a: ["La condensation", "L'évaporation", "La fusion", "La sublimation"], correct: 0 },
      { q: "Comment appelle-t-on le passage de l'état solide à l'état liquide ?", a: ["La solidification", "La fusion", "L'évaporation", "La sublimation"], correct: 1 },
      { q: "Quel instrument mesure la température ?", a: ["Le baromètre", "La boussole", "Le chronomètre", "Le thermomètre"], correct: 3 },
      { q: "Quel instrument mesure la pression de l'air ?", a: ["Le thermomètre", "Le baromètre", "L'anémomètre", "La balance"], correct: 1 },
      { q: "Quel instrument indique la direction du nord ?", a: ["Le thermomètre", "Le baromètre", "La boussole", "La balance"], correct: 2 },
      { q: "Comment qualifie-t-on une matière qui laisse passer la lumière, comme le verre ?", a: ["Opaque", "Métallique", "Élastique", "Transparente"], correct: 3 },
      { q: "Quelle force nous attire vers le sol ?", a: ["La gravité", "Le magnétisme", "L'électricité", "La friction"], correct: 0 },
      { q: "Comment qualifie-t-on l'énergie que possède un objet en mouvement ?", a: ["Potentielle", "Sonore", "Lumineuse", "Cinétique"], correct: 3 },
      { q: "Quel savant grec aurait crié « Eurêka » en découvrant la poussée dans l'eau ?", a: ["Newton", "Galilée", "Archimède", "Pythagore"], correct: 2 },
      { q: "Comment appelle-t-on un objet qui attire le fer ?", a: ["Un aimant", "Une pile", "Une ampoule", "Un ressort"], correct: 0 },
      { q: "Quels sont les deux pôles d'un aimant ?", a: ["Est et Ouest", "Nord et Sud", "Positif et neutre", "Chaud et froid"], correct: 1 },
      { q: "Comment appelle-t-on l'ensemble des couleurs obtenues en décomposant la lumière avec un prisme ?", a: ["L'ombre", "Le reflet", "Le spectre", "Le halo"], correct: 2 },
      { q: "Comment appelle-t-on le rebond de la lumière sur un miroir ?", a: ["La réflexion", "La réfraction", "La diffraction", "L'absorption"], correct: 0 },
      { q: "Quelle est l'unité de mesure de la longueur dans le système international ?", a: ["Le litre", "Le mètre", "Le gramme", "La seconde"], correct: 1 },
      { q: "Quelle unité usuelle sert à mesurer la masse ?", a: ["Le mètre", "Le litre", "Le newton", "Le kilogramme"], correct: 3 },
      { q: "Quelle est l'unité de base pour mesurer le temps ?", a: ["Le mètre", "Le kilogramme", "Le kelvin", "La seconde"], correct: 3 },
      { q: "Que transforme une pile pour fournir de l'électricité ?", a: ["De l'énergie chimique", "De l'énergie solaire", "De l'énergie nucléaire", "De l'énergie éolienne"], correct: 0 },
      { q: "Combien de temps met la Lune pour faire le tour de la Terre ?", a: ["Un jour", "Un mois", "Une semaine", "Un an"], correct: 1 },
      { q: "Comment appelle-t-on la trajectoire d'une planète autour du Soleil ?", a: ["L'axe", "L'équateur", "L'orbite", "Le méridien"], correct: 2 },
      { q: "Comment appelle-t-on la traînée lumineuse d'un petit corps qui brûle dans l'atmosphère ?", a: ["Une planète", "Une étoile filante", "Une galaxie", "Une aurore"], correct: 1 },
      { q: "Comment appelle-t-on un ensemble de milliards d'étoiles, comme la Voie lactée ?", a: ["Une galaxie", "Une constellation", "Un système solaire", "Une nébuleuse"], correct: 0 },
      { q: "Comment appelle-t-on un dessin formé par des étoiles, comme la Grande Ourse ?", a: ["Une galaxie", "Une comète", "Une planète", "Une constellation"], correct: 3 },
      { q: "Comment appelle-t-on les astronautes russes ?", a: ["Des spationautes", "Des taïkonautes", "Des cosmonautes", "Des aviateurs"], correct: 2 },
      { q: "Qui fut le premier homme à marcher sur la Lune ?", a: ["Neil Armstrong", "Youri Gagarine", "Buzz Aldrin", "Thomas Pesquet"], correct: 0 },
      { q: "Qui fut le premier homme à voyager dans l'espace ?", a: ["Neil Armstrong", "Alan Shepard", "Michael Collins", "Youri Gagarine"], correct: 3 },
      { q: "Comment nomme-t-on le grand laboratoire habité en orbite autour de la Terre depuis 1998 ?", a: ["Le télescope Hubble", "La navette Columbia", "La Station spatiale internationale", "La sonde Voyager"], correct: 2 },
      { q: "Combien de poumons possède un être humain ?", a: ["Un", "Deux", "Trois", "Quatre"], correct: 1 },
      { q: "Quel organe poursuit la digestion des aliments après l'estomac ?", a: ["Le foie", "Le cœur", "Le poumon", "L'intestin"], correct: 3 },
      { q: "Combien de sens l'être humain possède-t-il traditionnellement ?", a: ["Trois", "Quatre", "Cinq", "Six"], correct: 2 },
      { q: "Quel sens permet d'entendre les sons ?", a: ["L'ouïe", "La vue", "Le goût", "L'odorat"], correct: 0 },
      { q: "Quel sens utilise-t-on avec la langue ?", a: ["L'odorat", "Le goût", "Le toucher", "La vue"], correct: 1 },
      { q: "Comment appelle-t-on l'empilement d'os qui soutient le dos ?", a: ["La colonne vertébrale", "La cage thoracique", "Le bassin", "Le sternum"], correct: 0 },
      { q: "Qu'est-ce qui, attaché aux os, permet au corps de bouger ?", a: ["Les cheveux", "Les muscles", "Les ongles", "La peau"], correct: 1 },
      { q: "De quelle matière très dure les dents sont-elles recouvertes ?", a: ["La kératine", "Le cartilage", "La corne", "L'émail"], correct: 3 },
      { q: "Quel est le plus grand animal vivant sur la terre ferme ?", a: ["La girafe", "L'hippopotame", "L'éléphant", "Le rhinocéros"], correct: 2 },
      { q: "Quel est l'animal terrestre le plus rapide à la course ?", a: ["Le lion", "Le cheval", "Le guépard", "L'antilope"], correct: 2 },
      { q: "Quel grand oiseau ne peut pas voler mais court très vite ?", a: ["L'autruche", "L'aigle", "Le manchot", "Le héron"], correct: 0 },
      { q: "Quel mammifère marin très intelligent bondit souvent hors de l'eau ?", a: ["Le requin", "Le thon", "La pieuvre", "Le dauphin"], correct: 3 },
      { q: "Comment appelle-t-on un animal qui se nourrit uniquement de plantes ?", a: ["Un carnivore", "Un herbivore", "Un omnivore", "Un insectivore"], correct: 1 },
      { q: "Comment appelle-t-on un animal qui se nourrit de viande ?", a: ["Un herbivore", "Un carnivore", "Un omnivore", "Un granivore"], correct: 1 },
      { q: "Comment appelle-t-on un animal qui mange à la fois des plantes et de la viande ?", a: ["Un omnivore", "Un herbivore", "Un carnivore", "Un frugivore"], correct: 0 },
      { q: "Comment appelle-t-on la transformation d'une chenille en papillon ?", a: ["La mue", "La reproduction", "La métamorphose", "La germination"], correct: 2 },
      { q: "Comment appelle-t-on le long sommeil de certains animaux durant l'hiver ?", a: ["La migration", "La mue", "La couvaison", "L'hibernation"], correct: 3 },
      { q: "Comment appelle-t-on le voyage saisonnier des oiseaux vers les pays chauds ?", a: ["La migration", "L'hibernation", "La nidification", "La mue"], correct: 0 },
      { q: "Quel animal tisse une toile pour attraper ses proies ?", a: ["La fourmi", "L'araignée", "Le criquet", "Le ver"], correct: 1 },
      { q: "Quel groupe d'animaux a le corps couvert de plumes ?", a: ["Les poissons", "Les reptiles", "Les oiseaux", "Les insectes"], correct: 2 },
      { q: "Quel groupe d'animaux a le corps couvert d'écailles et vit dans l'eau ?", a: ["Les oiseaux", "Les insectes", "Les mammifères", "Les poissons"], correct: 3 },
      { q: "Comment appelle-t-on les animaux qui allaitent leurs petits ?", a: ["Les reptiles", "Les mammifères", "Les oiseaux", "Les amphibiens"], correct: 1 },
      { q: "Comment appelle-t-on un animal comme la grenouille, à l'aise dans l'eau et sur terre ?", a: ["Un reptile", "Un poisson", "Un insecte", "Un amphibien"], correct: 3 },
      { q: "Combien d'ailes possède un papillon ?", a: ["Deux", "Six", "Quatre", "Huit"], correct: 2 },
      { q: "Quelle partie de la plante fabrique sa nourriture grâce au soleil ?", a: ["Les feuilles", "Les racines", "La tige", "Les fruits"], correct: 0 },
      { q: "Comment appelle-t-on la poudre jaune des fleurs transportée par les abeilles ?", a: ["Le nectar", "Le pollen", "La sève", "La résine"], correct: 1 },
      { q: "Que faut-il planter dans la terre pour faire pousser une fleur ?", a: ["Une graine", "Un caillou", "Une feuille", "Un fruit"], correct: 0 },
      { q: "Comment appelle-t-on le liquide nourricier qui circule dans les plantes ?", a: ["Le nectar", "Le pollen", "L'huile", "La sève"], correct: 3 },
      { q: "Comment appelle-t-on le processus par lequel les plantes fabriquent leur matière grâce à la lumière ?", a: ["La respiration", "La digestion", "La photosynthèse", "La germination"], correct: 2 },
      { q: "Comment appelle-t-on l'eau qui tombe des nuages ?", a: ["La rosée", "La brume", "La pluie", "La vapeur"], correct: 2 },
      { q: "Comment appelle-t-on l'ensemble des gaz qui entourent la Terre ?", a: ["L'hydrosphère", "La biosphère", "La lithosphère", "L'atmosphère"], correct: 3 },
      { q: "Comment appelle-t-on le trajet par lequel l'eau s'évapore, forme les nuages, puis retombe en pluie ?", a: ["La photosynthèse", "Le cycle de l'eau", "L'érosion", "La marée"], correct: 1 },
      { q: "Comment appelle-t-on l'usure lente des roches par le vent et l'eau ?", a: ["L'érosion", "La fusion", "L'évaporation", "La condensation"], correct: 0 },
      { q: "Comment appelle-t-on le charbon, le pétrole et le gaz, formés il y a des millions d'années ?", a: ["Les énergies renouvelables", "Les métaux", "Les énergies fossiles", "Les minéraux"], correct: 2 },
      { q: "Comment appelle-t-on l'électricité produite grâce à la force du vent ?", a: ["L'énergie solaire", "L'énergie fossile", "L'énergie nucléaire", "L'énergie éolienne"], correct: 3 },
      { q: "Comment appelle-t-on l'électricité produite grâce à la lumière du Soleil ?", a: ["L'énergie solaire", "L'énergie éolienne", "L'énergie fossile", "L'énergie nucléaire"], correct: 0 },
      { q: "Comment appelle-t-on l'électricité produite par les barrages sur les rivières ?", a: ["L'énergie éolienne", "L'énergie hydraulique", "L'énergie solaire", "L'énergie nucléaire"], correct: 1 },
      { q: "Comment appelle-t-on la plus petite partie d'un élément chimique ?", a: ["La molécule", "La cellule", "L'atome", "Le cristal"], correct: 2 },
      { q: "Comment appelle-t-on l'assemblage de plusieurs atomes liés ensemble ?", a: ["Une molécule", "Un atome", "Un ion", "Un noyau"], correct: 0 },
      { q: "Combien d'états principaux la matière prend-elle couramment ?", a: ["Deux", "Trois", "Quatre", "Cinq"], correct: 1 },
      { q: "Comment appelle-t-on un liquide qui pique, comme le vinaigre fort ?", a: ["Une base", "Un sel", "Un solvant", "Un acide"], correct: 3 },
      { q: "Quel objet en verre sépare la lumière blanche en couleurs ?", a: ["La loupe", "Le miroir", "La vitre", "Le prisme"], correct: 3 },
      { q: "Comment appelle-t-on les gouttes d'eau qui se déposent sur l'herbe au petit matin ?", a: ["La pluie", "La neige", "La rosée", "La grêle"], correct: 2 },
      { q: "Quel phénomène coloré et courbé apparaît après la pluie, quand revient le soleil ?", a: ["L'éclair", "L'arc-en-ciel", "L'aurore", "Le mirage"], correct: 1 },
      { q: "Comment appelle-t-on l'éclat lumineux qui zèbre le ciel pendant un orage ?", a: ["L'éclair", "Le tonnerre", "L'arc-en-ciel", "La brume"], correct: 0 },
      { q: "Combien de temps environ dure une grossesse humaine ?", a: ["Six mois", "Douze mois", "Neuf mois", "Trois mois"], correct: 2 },
      { q: "Quel liquide protège et humidifie en permanence l'œil ?", a: ["La salive", "Les larmes", "La sueur", "Le sang"], correct: 1 },
      { q: "Quel organe filtre le sang et fabrique l'urine ?", a: ["Le rein", "Le foie", "La rate", "Le poumon"], correct: 0 },
      { q: "Comment appelle-t-on les cellules du sang qui combattent les microbes ?", a: ["Les globules rouges", "Les plaquettes", "Les neurones", "Les globules blancs"], correct: 3 },
      { q: "Comment appelle-t-on les cellules du sang qui transportent l'oxygène ?", a: ["Les globules rouges", "Les globules blancs", "Les plaquettes", "Les fibres"], correct: 0 },
      { q: "Comment appelle-t-on un microbe minuscule, plus petit qu'une bactérie, qui rend malade ?", a: ["Une bactérie", "Un champignon", "un parasite", "Un virus"], correct: 3 },
      { q: "Comment appelle-t-on la protection reçue par une piqûre pour éviter une maladie ?", a: ["Un antibiotique", "Une vitamine", "Un vaccin", "Un pansement"], correct: 2 },
      { q: "Quel type de médicament combat les infections dues aux bactéries ?", a: ["Un vaccin", "Un antibiotique", "Un antalgique", "Un sirop"], correct: 1 },
      { q: "Quel inventeur est à l'origine du téléphone ?", a: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Guglielmo Marconi"], correct: 1 },
      { q: "Quel inventeur américain mit au point l'ampoule électrique pratique ?", a: ["Thomas Edison", "Nikola Tesla", "Graham Bell", "Benjamin Franklin"], correct: 0 },
      { q: "Quel savant montra que la foudre est de l'électricité grâce à un cerf-volant ?", a: ["Thomas Edison", "Alessandro Volta", "André Ampère", "Benjamin Franklin"], correct: 3 },
      { q: "Quel physicien italien inventa la pile électrique ?", a: ["André Ampère", "Georg Ohm", "Alessandro Volta", "Michael Faraday"], correct: 2 },
      { q: "Quel ingénieur écossais a donné son nom à l'unité de puissance électrique ?", a: ["Alessandro Volta", "James Watt", "André Ampère", "Georg Ohm"], correct: 1 },
      { q: "Comment appelle-t-on la science qui étudie les êtres vivants ?", a: ["La chimie", "La physique", "La géologie", "La biologie"], correct: 3 },
      { q: "Comment appelle-t-on la science qui étudie les astres et l'Univers ?", a: ["La géologie", "La biologie", "L'astronomie", "La botanique"], correct: 2 },
      { q: "Comment appelle-t-on la science qui étudie les roches et la Terre ?", a: ["La géologie", "La biologie", "L'astronomie", "La botanique"], correct: 0 },
      { q: "Comment appelle-t-on la science qui étudie le temps qu'il fait ?", a: ["La météorologie", "L'astronomie", "La géographie", "La biologie"], correct: 0 },
      { q: "Comment appelle-t-on la science qui étudie les plantes ?", a: ["La zoologie", "La géologie", "L'écologie", "La botanique"], correct: 3 },
      { q: "Comment appelle-t-on le scientifique qui étudie les fossiles de dinosaures ?", a: ["Un archéologue", "Un paléontologue", "Un géographe", "Un chimiste"], correct: 1 },
      { q: "Comment appelle-t-on la disparition totale et définitive d'une espèce animale ?", a: ["La migration", "L'hibernation", "L'extinction", "La domestication"], correct: 2 },
    ],
    expert: [],
  },
  musique: {
    debutant: [
      { q: "Qui a composé les « Rhapsodies hongroises » pour piano ?", a: ["Chopin", "Brahms", "Liszt", "Schumann"], correct: 2 },
      { q: "Qui a composé la « Marche nuptiale » du « Songe d'une nuit d'été » ?", a: ["Wagner", "Mendelssohn", "Bach", "Haendel"], correct: 1 },
      { q: "Qui a composé la valse « Le Beau Danube bleu » ?", a: ["Johann Strauss", "Chopin", "Liszt", "Offenbach"], correct: 0 },
      { q: "Qui a composé la « Symphonie inachevée » ?", a: ["Schumann", "Brahms", "Mendelssohn", "Schubert"], correct: 3 },
      { q: "Qui a composé « Le Carnaval des animaux » ?", a: ["Saint-Saëns", "Ravel", "Fauré", "Debussy"], correct: 0 },
      { q: "Qui a composé le conte musical « Pierre et le Loup » ?", a: ["Stravinsky", "Prokofiev", "Rachmaninov", "Chostakovitch"], correct: 1 },
      { q: "Qui a composé la « Symphonie fantastique » ?", a: ["Saint-Saëns", "Gounod", "Berlioz", "Bizet"], correct: 2 },
      { q: "Qui a composé les « Gymnopédies » pour piano ?", a: ["Claude Debussy", "Maurice Ravel", "Gabriel Fauré", "Erik Satie"], correct: 3 },
      { q: "Qui a composé « Rhapsody in Blue » ?", a: ["Bernstein", "Copland", "Joplin", "Gershwin"], correct: 3 },
      { q: "Qui a composé la suite orchestrale « Les Planètes » ?", a: ["Gustav Holst", "Edward Elgar", "Benjamin Britten", "Ralph Vaughan Williams"], correct: 0 },
      { q: "Qui a composé la musique de « Peer Gynt », dont « Le Matin » ?", a: ["Sibelius", "Nielsen", "Grieg", "Dvořák"], correct: 2 },
      { q: "Qui a composé quatre symphonies et une célèbre « Berceuse » ?", a: ["Schumann", "Brahms", "Bruckner", "Mahler"], correct: 1 },
      { q: "Qui a composé la comédie musicale « West Side Story » ?", a: ["George Gershwin", "Stephen Sondheim", "Cole Porter", "Leonard Bernstein"], correct: 3 },
      { q: "Qui a composé l'opéra « Faust » ?", a: ["Gounod", "Bizet", "Massenet", "Offenbach"], correct: 0 },
      { q: "Qui a composé l'opéra fantastique « Les Contes d'Hoffmann » ?", a: ["Gounod", "Massenet", "Offenbach", "Bizet"], correct: 2 },
      { q: "Qui a composé le « Canon » en ré souvent joué aux mariages ?", a: ["Bach", "Pachelbel", "Vivaldi", "Haendel"], correct: 1 },
      { q: "Quel instrument à vent en bois possède une anche double ?", a: ["La clarinette", "Le hautbois", "La flûte", "Le saxophone"], correct: 1 },
      { q: "Quel instrument à vent en bois est le plus grave de sa famille, avec une longue perce repliée ?", a: ["Le basson", "La clarinette", "Le hautbois", "Le piccolo"], correct: 0 },
      { q: "Quel instrument à vent en métal se joue sans anche, tenu horizontalement ?", a: ["Le hautbois", "La clarinette", "Le basson", "La flûte traversière"], correct: 3 },
      { q: "Quel instrument à cordes est un peu plus grand que le violon, à la voix plus grave ?", a: ["La contrebasse", "La harpe", "L'alto", "Le violoncelle"], correct: 2 },
      { q: "Quel instrument à cordes se joue posé entre les jambes du musicien assis ?", a: ["Le violon", "L'alto", "La mandoline", "Le violoncelle"], correct: 3 },
      { q: "Quel instrument de percussion possède des lames de bois que l'on frappe ?", a: ["Le triangle", "Le xylophone", "La cymbale", "Le tambourin"], correct: 1 },
      { q: "Quels grands disques de métal s'entrechoquent dans un orchestre ?", a: ["Les timbales", "Le triangle", "Les cymbales", "Le tambourin"], correct: 2 },
      { q: "Quel cuivre enroulé au son rond et chaud est courant dans l'orchestre ?", a: ["Le cor d'harmonie", "La trompette", "Le trombone", "Le tuba"], correct: 0 },
      { q: "Quel instrument, vedette du rock, se joue avec un médiator et se branche à un ampli ?", a: ["La harpe", "Le clavecin", "Le violon", "La guitare électrique"], correct: 3 },
      { q: "Quel ensemble de fûts et de cymbales donne le tempo dans un groupe de rock ?", a: ["La guitare", "La batterie", "Le clavier", "Le micro"], correct: 1 },
      { q: "Quel petit instrument à vent, en version « à bec », s'apprend souvent à l'école ?", a: ["La flûte", "La trompette", "Le violon", "Le tuba"], correct: 0 },
      { q: "Comment appelle-t-on l'instrument à clavier vertical et compact que l'on trouve souvent chez les particuliers ?", a: ["L'orgue", "Le clavecin", "Le piano droit", "L'harmonium"], correct: 2 },
      { q: "Quel groupe britannique mené par Mick Jagger a chanté « Satisfaction » ?", a: ["Les Beatles", "Les Rolling Stones", "The Who", "Led Zeppelin"], correct: 1 },
      { q: "Quel groupe a enregistré « Stairway to Heaven » ?", a: ["Led Zeppelin", "Deep Purple", "Black Sabbath", "Pink Floyd"], correct: 0 },
      { q: "Quel groupe irlandais mené par Bono a chanté « With or Without You » ?", a: ["Coldplay", "The Cranberries", "U2", "Oasis"], correct: 2 },
      { q: "Quel groupe de Seattle mené par Kurt Cobain a chanté « Smells Like Teen Spirit » ?", a: ["Pearl Jam", "Soundgarden", "Metallica", "Nirvana"], correct: 3 },
      { q: "Quel artiste américain a chanté « Purple Rain » ?", a: ["Michael Jackson", "Prince", "Lenny Kravitz", "Stevie Wonder"], correct: 1 },
      { q: "Quel chanteur américain, prix Nobel de littérature, a écrit « Blowin' in the Wind » ?", a: ["Neil Young", "Leonard Cohen", "Bob Dylan", "Bruce Springsteen"], correct: 2 },
      { q: "Quelle chanteuse est surnommée « la reine de la soul » ?", a: ["Tina Turner", "Diana Ross", "Whitney Houston", "Aretha Franklin"], correct: 3 },
      { q: "Quel crooner américain a rendu célèbre la chanson « My Way » ?", a: ["Frank Sinatra", "Dean Martin", "Nat King Cole", "Bing Crosby"], correct: 0 },
      { q: "Quel trompettiste de jazz à la voix rauque a chanté « What a Wonderful World » ?", a: ["Miles Davis", "Chet Baker", "Louis Armstrong", "Dizzy Gillespie"], correct: 2 },
      { q: "Quelle chanteuse québécoise a interprété la chanson du film « Titanic » ?", a: ["Lara Fabian", "Céline Dion", "Isabelle Boulay", "Natasha St-Pier"], correct: 1 },
      { q: "Quel chanteur français, « idole des jeunes », est une icône du rock hexagonal ?", a: ["Johnny Hallyday", "Eddy Mitchell", "Michel Sardou", "Michel Delpech"], correct: 0 },
      { q: "Quel chanteur français a composé « Comme d'habitude », repris en anglais sous le titre « My Way » ?", a: ["Johnny Hallyday", "Michel Polnareff", "Joe Dassin", "Claude François"], correct: 3 },
      { q: "Quel artiste français à l'univers provocateur a chanté « Je t'aime… moi non plus » ?", a: ["Jacques Dutronc", "Alain Bashung", "Serge Gainsbourg", "Léo Ferré"], correct: 2 },
      { q: "Quel chanteur belge a connu un succès mondial avec « Alors on danse » et « Papaoutai » ?", a: ["Angèle", "Stromae", "Orelsan", "Maître Gims"], correct: 1 },
      { q: "Quel duo français masqué de musique électronique a créé « Get Lucky » ?", a: ["Justice", "Air", "Cassius", "Daft Punk"], correct: 3 },
      { q: "Quelle chanteuse britannique a chanté « Rolling in the Deep » et « Someone Like You » ?", a: ["Adele", "Amy Winehouse", "Dua Lipa", "Duffy"], correct: 0 },
      { q: "Quel chanteur britannique roux a connu un tube mondial avec « Shape of You » ?", a: ["Ed Sheeran", "Sam Smith", "Harry Styles", "James Blunt"], correct: 0 },
      { q: "Quelle chanteuse américaine, star de la pop, a chanté « Single Ladies » ?", a: ["Rihanna", "Lady Gaga", "Beyoncé", "Katy Perry"], correct: 2 },
      { q: "Quelle chanteuse originaire de la Barbade a chanté « Umbrella » ?", a: ["Beyoncé", "Nicki Minaj", "Alicia Keys", "Rihanna"], correct: 3 },
      { q: "Quelle chanteuse américaine excentrique a chanté « Bad Romance » et « Poker Face » ?", a: ["Katy Perry", "Lady Gaga", "Pink", "Kesha"], correct: 1 },
      { q: "Quel groupe britannique des frères Gallagher a chanté « Wonderwall » ?", a: ["Blur", "Oasis", "Coldplay", "Radiohead"], correct: 1 },
      { q: "Quel groupe britannique mené par Chris Martin a chanté « Yellow » et « Fix You » ?", a: ["U2", "Oasis", "Coldplay", "Muse"], correct: 2 },
      { q: "Combien de noires faut-il pour égaler la durée d'une ronde ?", a: ["Deux", "Une", "Huit", "Quatre"], correct: 3 },
      { q: "Comment appelle-t-on la note pleine, munie d'une hampe, qui vaut un temps ?", a: ["La noire", "La blanche", "La ronde", "La croche"], correct: 0 },
      { q: "Comment appelle-t-on une note deux fois plus courte que la noire ?", a: ["La blanche", "La ronde", "La croche", "La double"], correct: 2 },
      { q: "Comment appelle-t-on les traits verticaux qui découpent une partition en mesures ?", a: ["Les barres de mesure", "Les portées", "Les clés", "Les soupirs"], correct: 0 },
      { q: "Quelle clé musicale sert à noter les instruments graves, comme la contrebasse ?", a: ["La clé de sol", "La clé de fa", "La clé d'ut", "La clé de si"], correct: 1 },
      { q: "Comment appelle-t-on la partie d'une chanson qui revient à l'identique après chaque couplet ?", a: ["Le couplet", "Le pont", "L'intro", "Le refrain"], correct: 3 },
      { q: "Comment appelle-t-on la partie d'une chanson dont les paroles changent à chaque fois ?", a: ["Le refrain", "Le couplet", "Le pont", "L'outro"], correct: 1 },
      { q: "Comment appelle-t-on les mots que l'on chante dans une chanson ?", a: ["La portée", "Le tempo", "Les paroles", "Le timbre"], correct: 2 },
      { q: "Comment appelle-t-on la suite de sons qui forme l'air reconnaissable d'une chanson ?", a: ["La mélodie", "Le rythme", "L'harmonie", "Le timbre"], correct: 0 },
      { q: "Comment appelle-t-on la pulsation régulière sur laquelle on tape du pied ?", a: ["La mélodie", "L'harmonie", "Le timbre", "Le rythme"], correct: 3 },
      { q: "De quel pays vient la samba ?", a: ["L'Argentine", "Cuba", "Le Brésil", "Le Mexique"], correct: 2 },
      { q: "De quel pays la salsa a-t-elle été popularisée, aux Caraïbes ?", a: ["Le Brésil", "Cuba", "L'Espagne", "La Grèce"], correct: 1 },
      { q: "De quel pays vient la musique country ?", a: ["L'Irlande", "Le Canada", "L'Australie", "Les États-Unis"], correct: 3 },
      { q: "Quel style rythmé aux paroles scandées est né dans le Bronx, à New York ?", a: ["Le rap", "Le jazz", "Le reggae", "La country"], correct: 0 },
      { q: "Quel style de musique électronique répétitive fait danser en boîte de nuit ?", a: ["Le jazz", "Le blues", "La techno", "La country"], correct: 2 },
      { q: "Quel style triste et expressif, né dans le sud des États-Unis, a donné naissance au rock ?", a: ["La country", "Le gospel", "Le reggae", "Le blues"], correct: 3 },
      { q: "Quel chant religieux afro-américain a fortement influencé la soul ?", a: ["Le blues", "Le gospel", "Le rap", "Le reggae"], correct: 1 },
      { q: "Comment appelle-t-on un grand rassemblement en plein air où se produisent de nombreux groupes ?", a: ["Un festival", "Un récital", "Une répétition", "Une audition"], correct: 0 },
      { q: "Comment appelle-t-on un concert donné par un seul artiste devant un public ?", a: ["Un festival", "Une jam", "Une chorale", "Un récital"], correct: 3 },
      { q: "Comment appelle-t-on le lieu où l'on enregistre professionnellement la musique ?", a: ["Un studio", "Une scène", "Une loge", "Un balcon"], correct: 0 },
      { q: "Combien de pédales possède généralement un piano à queue ?", a: ["Une", "Trois", "Deux", "Quatre"], correct: 1 },
      { q: "Comment appelle-t-on la personne qui crée la musique d'une œuvre ?", a: ["Un interprète", "Un chef d'orchestre", "Un compositeur", "Un luthier"], correct: 2 },
      { q: "Comment appelle-t-on l'artisan qui fabrique et répare les violons ?", a: ["Un ébéniste", "Un accordeur", "Un luthier", "Un facteur"], correct: 2 },
      { q: "Comment appelle-t-on le musicien qui joue une œuvre écrite par un autre ?", a: ["Un interprète", "Un compositeur", "Un parolier", "Un producteur"], correct: 0 },
      { q: "Comment appelle-t-on l'auteur des paroles d'une chanson ?", a: ["Un compositeur", "Un parolier", "Un chef d'orchestre", "Un choriste"], correct: 1 },
      { q: "Comment appelle-t-on les chanteurs qui accompagnent la voix principale ?", a: ["Les solistes", "Les figurants", "Les musiciens", "Les choristes"], correct: 3 },
      { q: "Comment appelle-t-on le grand ensemble de musiciens dirigé par un chef ?", a: ["La chorale", "Le duo", "L'orchestre", "Le trio"], correct: 2 },
      { q: "Comment appelle-t-on un ensemble de quatre musiciens ?", a: ["Un quatuor", "Un trio", "Un duo", "Un quintette"], correct: 0 },
      { q: "Comment appelle-t-on un morceau interprété par deux musiciens ?", a: ["Un solo", "Un duo", "Un trio", "Un chœur"], correct: 1 },
      { q: "Quel chanteur français a composé la célèbre chanson « La Mer » ?", a: ["Charles Aznavour", "Jacques Brel", "Georges Brassens", "Charles Trenet"], correct: 3 },
      { q: "Quelle chanteuse française des années 1960 a interprété « Mon amie la rose » ?", a: ["France Gall", "Sylvie Vartan", "Françoise Hardy", "Sheila"], correct: 2 },
      { q: "Quelle jeune chanteuse remporta l'Eurovision 1965 avec « Poupée de cire, poupée de son » ?", a: ["Françoise Hardy", "Dalida", "Sheila", "France Gall"], correct: 3 },
      { q: "Quelle chanteuse populaire à la voix reconnaissable a chanté « Gigi l'Amoroso » ?", a: ["Dalida", "Mireille Mathieu", "Sheila", "Sylvie Vartan"], correct: 0 },
      { q: "Quel chanteur a rendu célèbre « Les Champs-Élysées » ?", a: ["Michel Sardou", "Joe Dassin", "Michel Delpech", "Claude François"], correct: 1 },
      { q: "Quel groupe américain de hard rock a chanté « Sweet Child O' Mine » ?", a: ["Aerosmith", "Bon Jovi", "Kiss", "Guns N' Roses"], correct: 3 },
      { q: "Quel groupe britannique mené par Sting a chanté « Every Breath You Take » ?", a: ["The Cure", "Dire Straits", "The Police", "Duran Duran"], correct: 2 },
      { q: "Quel artiste au surnom de « parrain de la soul » était une bête de scène du funk ?", a: ["James Brown", "Marvin Gaye", "Otis Redding", "Sam Cooke"], correct: 0 },
      { q: "Quel pianiste et chanteur aveugle a chanté « I Just Called to Say I Love You » ?", a: ["Ray Charles", "Stevie Wonder", "Lionel Richie", "Barry White"], correct: 1 },
      { q: "Quel pianiste et chanteur aveugle a popularisé « Georgia on My Mind » ?", a: ["Stevie Wonder", "Ray Charles", "Nat King Cole", "Otis Redding"], correct: 1 },
      { q: "Quel chanteur britannique flamboyant, au piano, a chanté « Rocket Man » ?", a: ["Elton John", "Freddie Mercury", "David Bowie", "George Michael"], correct: 0 },
      { q: "Quelle chanteuse américaine à la voix puissante a interprété « I Will Always Love You » ?", a: ["Mariah Carey", "Tina Turner", "Whitney Houston", "Aretha Franklin"], correct: 2 },
      { q: "Quelle chanteuse britannique à la voix soul, morte à vingt-sept ans, a chanté « Rehab » ?", a: ["Adele", "Duffy", "Joss Stone", "Amy Winehouse"], correct: 3 },
      { q: "Quel guitariste britannique surnommé « Slowhand » a joué au sein de Cream ?", a: ["Jimi Hendrix", "Eric Clapton", "Jimmy Page", "Keith Richards"], correct: 1 },
      { q: "Quel chanteur latino a lancé « Livin' la Vida Loca » ?", a: ["Enrique Iglesias", "Marc Anthony", "Luis Fonsi", "Ricky Martin"], correct: 3 },
      { q: "Quelle chanteuse colombienne a interprété « Waka Waka » pour la Coupe du monde ?", a: ["Shakira", "Jennifer Lopez", "Gloria Estefan", "Rihanna"], correct: 0 },
      { q: "De quel pays vient le fado, chant mélancolique ?", a: ["L'Espagne", "L'Italie", "Le Portugal", "La Grèce"], correct: 2 },
      { q: "Comment appelle-t-on la musique composée pour accompagner un film ?", a: ["La bande originale", "Le générique", "Le refrain", "L'ouverture"], correct: 0 },
      { q: "Quel compositeur a signé les musiques de « Star Wars » et « Indiana Jones » ?", a: ["Hans Zimmer", "Ennio Morricone", "John Williams", "Danny Elfman"], correct: 2 },
      { q: "Quel compositeur italien a écrit les musiques de nombreux westerns, dont « Le Bon, la Brute et le Truand » ?", a: ["Nino Rota", "Ennio Morricone", "John Williams", "Hans Zimmer"], correct: 1 },
      { q: "Quelle chanteuse américaine fut la voix des Supremes, star de la Motown ?", a: ["Aretha Franklin", "Tina Turner", "Gladys Knight", "Diana Ross"], correct: 3 },
    ],
    expert: [],
  },
  cinema: {
    debutant: [
      { q: "Quel film de super-héros réunit Iron Man, Thor et Captain America ?", a: ["Justice League", "Avengers", "Watchmen", "Kingsman"], correct: 1 },
      { q: "Quel super-héros est un justicier masqué en chauve-souris protégeant Gotham City ?", a: ["Superman", "Spider-Man", "Batman", "Iron Man"], correct: 2 },
      { q: "Quel super-héros lance des toiles et grimpe le long des murs ?", a: ["Batman", "Superman", "Hulk", "Spider-Man"], correct: 3 },
      { q: "Quel super-héros venu de Krypton porte une cape rouge et un « S » sur la poitrine ?", a: ["Superman", "Batman", "Flash", "Aquaman"], correct: 0 },
      { q: "Quel géant vert en colère est un super-héros Marvel ?", a: ["Thor", "Hulk", "Iron Man", "Groot"], correct: 1 },
      { q: "Quel dieu nordique du tonnerre, super-héros Marvel, manie un marteau ?", a: ["Loki", "Odin", "Hulk", "Thor"], correct: 3 },
      { q: "Quel hobbit doit détruire un anneau dans « Le Seigneur des anneaux » ?", a: ["Frodon", "Bilbon", "Sam", "Aragorn"], correct: 0 },
      { q: "Quel magicien barbu guide les héros du « Seigneur des anneaux » ?", a: ["Merlin", "Dumbledore", "Gandalf", "Saroumane"], correct: 2 },
      { q: "Quel espion américain amnésique est le héros d'une saga de films d'action ?", a: ["Ethan Hunt", "Jason Bourne", "James Bond", "John Wick"], correct: 1 },
      { q: "Quel agent de « Mission impossible » est incarné par Tom Cruise ?", a: ["Jason Bourne", "James Bond", "Jack Ryan", "Ethan Hunt"], correct: 3 },
      { q: "Quel reptile géant venu du Japon détruit des villes dans de nombreux films ?", a: ["King Kong", "Mothra", "Godzilla", "Gamera"], correct: 2 },
      { q: "Quel gorille géant escalade un gratte-ciel de New York au cinéma ?", a: ["King Kong", "Godzilla", "Donkey Kong", "Rafiki"], correct: 0 },
      { q: "Quel réalisateur a créé la saga « Star Wars » ?", a: ["Steven Spielberg", "James Cameron", "Ridley Scott", "George Lucas"], correct: 3 },
      { q: "Quel réalisateur britannique a tourné « Slumdog Millionaire » et « Trainspotting » ?", a: ["Guy Ritchie", "Ken Loach", "Danny Boyle", "Sam Mendes"], correct: 2 },
      { q: "Quel réalisateur au style gothique a tourné « Edward aux mains d'argent » et « Beetlejuice » ?", a: ["Tim Burton", "Guillermo del Toro", "Sam Raimi", "Wes Craven"], correct: 0 },
      { q: "Quel réalisateur a tourné « Fight Club » et « Seven » ?", a: ["David Lynch", "David Fincher", "Darren Aronofsky", "Paul Thomas Anderson"], correct: 1 },
      { q: "Quel réalisateur canadien a tourné « Dune » et « Blade Runner 2049 » ?", a: ["Christopher Nolan", "Alfonso Cuarón", "Denis Villeneuve", "J.J. Abrams"], correct: 2 },
      { q: "Quel réalisateur mexicain a tourné « Gravity » et « Roma » ?", a: ["Guillermo del Toro", "Alfonso Cuarón", "Alejandro Iñárritu", "Robert Rodriguez"], correct: 1 },
      { q: "Quel réalisateur au style très symétrique a tourné « The Grand Budapest Hotel » ?", a: ["Spike Jonze", "Sofia Coppola", "Noah Baumbach", "Wes Anderson"], correct: 3 },
      { q: "Quel cinéaste hongkongais a tourné « In the Mood for Love » ?", a: ["Wong Kar-wai", "John Woo", "Ang Lee", "Zhang Yimou"], correct: 0 },
      { q: "Quel acteur joue le rôle principal de « Shining » et le Joker en 1989 ?", a: ["Al Pacino", "Jack Nicholson", "Robert De Niro", "Dustin Hoffman"], correct: 1 },
      { q: "Quel acteur comique incarne « Le Masque » et « Ace Ventura » ?", a: ["Robin Williams", "Ben Stiller", "Adam Sandler", "Jim Carrey"], correct: 3 },
      { q: "Quel acteur américain joue dans « Fight Club », « Seven » et « Ocean's Eleven » ?", a: ["Matt Damon", "Tom Cruise", "Brad Pitt", "Leonardo DiCaprio"], correct: 2 },
      { q: "Quel acteur incarne Danny Ocean dans « Ocean's Eleven » ?", a: ["George Clooney", "Brad Pitt", "Ben Affleck", "Matt Damon"], correct: 0 },
      { q: "Quel acteur incarne Maximus dans « Gladiator » ?", a: ["Russell Crowe", "Mel Gibson", "Gerard Butler", "Colin Farrell"], correct: 0 },
      { q: "Quel acteur irlandais traque les ravisseurs de sa fille dans « Taken » ?", a: ["Mel Gibson", "Liam Neeson", "Bruce Willis", "Nicolas Cage"], correct: 1 },
      { q: "Quel acteur incarne le héros de « Die Hard » (« Piège de cristal ») ?", a: ["Arnold Schwarzenegger", "Sylvester Stallone", "Mel Gibson", "Bruce Willis"], correct: 3 },
      { q: "Quelle actrice incarne « Pretty Woman » aux côtés de Richard Gere ?", a: ["Meg Ryan", "Sandra Bullock", "Julia Roberts", "Demi Moore"], correct: 2 },
      { q: "Quelle actrice australienne joue dans « Moulin Rouge » et « The Hours » ?", a: ["Cate Blanchett", "Nicole Kidman", "Naomi Watts", "Charlize Theron"], correct: 1 },
      { q: "Quelle actrice incarne Black Widow dans les films Marvel ?", a: ["Brie Larson", "Gal Gadot", "Elizabeth Olsen", "Scarlett Johansson"], correct: 3 },
      { q: "Quelle actrice israélienne incarne « Wonder Woman » ?", a: ["Gal Gadot", "Scarlett Johansson", "Brie Larson", "Margot Robbie"], correct: 0 },
      { q: "Quel acteur britannique incarne Doctor Strange, et Sherlock dans une série ?", a: ["Tom Hiddleston", "Eddie Redmayne", "Benedict Cumberbatch", "Andrew Garfield"], correct: 2 },
      { q: "Quel acteur comique français incarne le gendarme de Saint-Tropez ?", a: ["Bourvil", "Fernandel", "Louis de Funès", "Coluche"], correct: 2 },
      { q: "Quel acteur français corpulent a incarné Obélix au cinéma ?", a: ["Gérard Depardieu", "Christian Clavier", "Jean Reno", "Jamel Debbouze"], correct: 0 },
      { q: "Quelle actrice française incarne Amélie Poulain ?", a: ["Marion Cotillard", "Sophie Marceau", "Juliette Binoche", "Audrey Tautou"], correct: 3 },
      { q: "Quel acteur français est connu pour « Le Grand Bleu », « Léon » et « Taxi » ?", a: ["Gérard Depardieu", "Jean Reno", "Vincent Cassel", "Daniel Auteuil"], correct: 1 },
      { q: "Quel dessin animé français met en scène un petit garçon africain et une sorcière ?", a: ["Kirikou", "Azur et Asmar", "Ernest et Célestine", "Les Triplettes de Belleville"], correct: 0 },
      { q: "Quelle comédie française de 2008 se moque des clichés sur le Nord de la France ?", a: ["Les Bronzés", "Bienvenue chez les Ch'tis", "La Vérité si je mens", "Camping"], correct: 1 },
      { q: "Quel réalisateur français a tourné « Le Grand Bleu » et « Léon » ?", a: ["Jean-Jacques Annaud", "Claude Berri", "Luc Besson", "Mathieu Kassovitz"], correct: 2 },
      { q: "Quel film de Mathieu Kassovitz, en 1995, décrit en noir et blanc la vie en banlieue ?", a: ["Les Misérables", "Banlieue 13", "Divines", "La Haine"], correct: 3 },
      { q: "Quelle princesse Disney possède de longs cheveux blonds aux pouvoirs magiques ?", a: ["Elsa", "Mulan", "Raiponce", "Pocahontas"], correct: 2 },
      { q: "Quelle sirène rêve de vivre sur la terre ferme dans un film Disney ?", a: ["Elsa", "Vaiana", "Jasmine", "Ariel"], correct: 3 },
      { q: "Quelle jeune fille se déguise en soldat pour défendre la Chine chez Disney ?", a: ["Pocahontas", "Mulan", "Raiponce", "Jasmine"], correct: 1 },
      { q: "Quelle jeune navigatrice du Pacifique part sur l'océan dans un film Disney ?", a: ["Vaiana", "Mulan", "Ariel", "Mérida"], correct: 0 },
      { q: "Quel film Pixar suit un jeune Mexicain qui voyage au pays des morts en musique ?", a: ["Vice-versa", "Rebelle", "Soul", "Coco"], correct: 3 },
      { q: "Quel film Pixar se déroule dans la tête d'une fillette, parmi ses émotions ?", a: ["Vice-versa", "Coco", "Soul", "Là-haut"], correct: 0 },
      { q: "Quels deux monstres travaillent ensemble à effrayer les enfants dans « Monstres et Cie » ?", a: ["Timon et Pumbaa", "Sully et Bob", "Tom et Jerry", "Buzz et Woody"], correct: 1 },
      { q: "Quel petit ours en duffle-coat bleu, venu du Pérou, adore la marmelade ?", a: ["Winnie", "Baloo", "Paddington", "Petit Ours brun"], correct: 2 },
      { q: "Quel dragon noir devient l'ami du jeune Harold dans « Dragons » ?", a: ["Mushu", "Krokmou", "Spyro", "Rex"], correct: 1 },
      { q: "Quelle famille de super-héros affronte les méchants dans un film Pixar de 2004 ?", a: ["Les Avengers", "Les Minions", "Les Croods", "Les Indestructibles"], correct: 3 },
      { q: "Comment appelle-t-on la musique composée spécialement pour un film ?", a: ["Le générique", "Le montage", "La bande originale", "Le doublage"], correct: 2 },
      { q: "Comment appelle-t-on le remplacement de la voix d'un acteur dans une autre langue ?", a: ["Le doublage", "Le sous-titrage", "Le montage", "Le mixage"], correct: 0 },
      { q: "Comment appelle-t-on le texte affiché en bas de l'écran pour traduire les dialogues ?", a: ["Les sous-titres", "Le générique", "La voix off", "Le synopsis"], correct: 0 },
      { q: "Comment appelle-t-on l'assemblage des scènes filmées pour obtenir le film final ?", a: ["Le cadrage", "Le doublage", "Le casting", "Le montage"], correct: 3 },
      { q: "Comment appelle-t-on la liste des noms qui défile à la fin d'un film ?", a: ["L'affiche", "Le générique", "Le synopsis", "La bande-annonce"], correct: 1 },
      { q: "Comment appelle-t-on la personne qui joue un rôle dans un film ?", a: ["Un réalisateur", "Un producteur", "Un acteur", "Un machiniste"], correct: 2 },
      { q: "Comment appelle-t-on la personne qui remplace l'acteur dans les scènes dangereuses ?", a: ["Un figurant", "Un cascadeur", "Un régisseur", "Un producteur"], correct: 1 },
      { q: "Comment appelle-t-on les personnes en arrière-plan d'une scène, sans réplique ?", a: ["Des cascadeurs", "Des techniciens", "Des figurants", "Des critiques"], correct: 2 },
      { q: "Comment appelle-t-on la salle où l'on va voir des films sur grand écran ?", a: ["Le théâtre", "L'opéra", "Le musée", "Le cinéma"], correct: 3 },
      { q: "Comment appelle-t-on les images truquées par ordinateur dans un film ?", a: ["Les effets spéciaux", "Les décors", "Les costumes", "Les répliques"], correct: 0 },
      { q: "Comment appelle-t-on un film qui cherche surtout à faire rire ?", a: ["Une comédie", "Un drame", "Un thriller", "Un documentaire"], correct: 0 },
      { q: "Comment appelle-t-on un film qui montre des faits réels, sans acteurs ?", a: ["Une fiction", "Un dessin animé", "Une comédie", "Un documentaire"], correct: 3 },
      { q: "Comment appelle-t-on un film de cow-boys dans l'Ouest américain ?", a: ["Un péplum", "Un western", "Un polar", "Un thriller"], correct: 1 },
      { q: "Comment appelle-t-on un film en costumes de l'Antiquité, comme « Ben-Hur » ?", a: ["Un western", "Un thriller", "Un péplum", "Un biopic"], correct: 2 },
      { q: "Comment appelle-t-on un film qui raconte la vie d'un personnage réel ?", a: ["Un biopic", "Un documentaire", "Un western", "Un thriller"], correct: 0 },
      { q: "Comment appelle-t-on un film policier plein de suspense et de tension ?", a: ["Une comédie", "Un western", "Un thriller", "Une romance"], correct: 2 },
      { q: "Comment appelle-t-on un très grand succès populaire au cinéma ?", a: ["Un navet", "Un blockbuster", "Un court-métrage", "Un remake"], correct: 1 },
      { q: "Comment appelle-t-on familièrement un film raté et sans intérêt ?", a: ["Un chef-d'œuvre", "Un classique", "Un culte", "Un navet"], correct: 3 },
      { q: "Comment appelle-t-on une nouvelle version d'un ancien film ?", a: ["Une suite", "Un préquel", "Un spin-off", "Un remake"], correct: 3 },
      { q: "Comment appelle-t-on un film qui raconte ce qui s'est passé avant l'histoire d'origine ?", a: ["Une suite", "Un remake", "Un préquel", "Un épisode"], correct: 2 },
      { q: "Quel film musical de 2016 raconte l'amour d'une actrice et d'un musicien à Los Angeles ?", a: ["La La Land", "Whiplash", "Chicago", "Moulin Rouge"], correct: 0 },
      { q: "Quel film de guerre de 1998 de Spielberg s'ouvre sur le débarquement de Normandie ?", a: ["Le Jour le plus long", "Il faut sauver le soldat Ryan", "Dunkerque", "La Ligne rouge"], correct: 1 },
      { q: "Quelle comédie met en scène un homme condamné à revivre sans cesse la même journée ?", a: ["Love Actually", "Notting Hill", "Quatre mariages et un enterrement", "Un jour sans fin"], correct: 3 },
      { q: "Quel film d'horreur met en scène une poupée maléfique animée par un tueur ?", a: ["Chucky", "Annabelle", "Saw", "Halloween"], correct: 0 },
      { q: "Quel film d'horreur met en scène un clown terrifiant nommé Grippe-Sou ?", a: ["Chucky", "Ça", "Massacre à la tronçonneuse", "Halloween"], correct: 1 },
      { q: "Quel film de 1984 mêle comédie et frayeur avec des attrapeurs de spectres à New York ?", a: ["Men in Black", "Gremlins", "SOS Fantômes", "Beetlejuice"], correct: 2 },
      { q: "Quel film met en scène des agents en costume noir qui traquent des extraterrestres ?", a: ["SOS Fantômes", "Independence Day", "X-Files", "Men in Black"], correct: 3 },
      { q: "Quel film de 1996 montre des extraterrestres attaquant la Terre le 4 juillet ?", a: ["Men in Black", "Armageddon", "Independence Day", "La Guerre des mondes"], correct: 2 },
      { q: "Quelle comédie musicale met en scène des lycéens des années 1950, avec John Travolta ?", a: ["Hairspray", "Grease", "Footloose", "Fame"], correct: 1 },
      { q: "Quel film de danse célèbre a pour réplique « On ne laisse pas Bébé dans un coin » ?", a: ["Dirty Dancing", "Flashdance", "Footloose", "Fame"], correct: 0 },
      { q: "Quel duo de réalisateurs américains a tourné « Fargo » et « No Country for Old Men » ?", a: ["Les Wachowski", "Les frères Dardenne", "Les frères Coen", "Les frères Farrelly"], correct: 2 },
      { q: "Quelles réalisatrices, sœurs, ont créé la saga « Matrix » ?", a: ["Les frères Coen", "Les Wachowski", "Les frères Russo", "Les Dardenne"], correct: 1 },
      { q: "Quel duo de réalisateurs a mis en scène « Avengers: Infinity War » et « Avengers: Endgame » ?", a: ["Les Wachowski", "Les frères Coen", "Les frères Farrelly", "Les frères Russo"], correct: 3 },
      { q: "Quel réalisateur italien de westerns a tourné « Il était une fois dans l'Ouest » ?", a: ["Sergio Leone", "Federico Fellini", "Dario Argento", "Bernardo Bertolucci"], correct: 0 },
      { q: "Quel acteur, souvent cow-boy taciturne, a aussi réalisé « Impitoyable » ?", a: ["John Wayne", "Clint Eastwood", "Charles Bronson", "Lee Van Cleef"], correct: 1 },
      { q: "Quel acteur légendaire du western américain était surnommé « Duke » ?", a: ["Clint Eastwood", "Gary Cooper", "Kirk Douglas", "John Wayne"], correct: 3 },
      { q: "Quel studio américain a créé « Blanche-Neige », premier long métrage d'animation ?", a: ["Pixar", "DreamWorks", "Disney", "Warner"], correct: 2 },
      { q: "Quel studio d'animation a créé les « Minions » et « Moi, moche et méchant » ?", a: ["Illumination", "Pixar", "DreamWorks", "Ghibli"], correct: 0 },
      { q: "Quelle saga de vampires et de loups-garous met en scène des amours adolescentes ?", a: ["Underworld", "Vampire Diaries", "Blade", "Twilight"], correct: 3 },
      { q: "Quelle franchise de films met en scène des voitures et des courses, avec Vin Diesel ?", a: ["Taxi", "Rush", "Fast and Furious", "Le Transporteur"], correct: 2 },
      { q: "Quel acteur incarne Loki dans les films Marvel ?", a: ["Chris Hemsworth", "Tom Hiddleston", "Benedict Cumberbatch", "Tom Holland"], correct: 1 },
      { q: "Quel jeune acteur incarne Spider-Man depuis 2016 ?", a: ["Tom Holland", "Andrew Garfield", "Tobey Maguire", "Timothée Chalamet"], correct: 0 },
      { q: "Quel acteur australien incarne Thor dans les films Marvel ?", a: ["Chris Evans", "Chris Pratt", "Chris Pine", "Chris Hemsworth"], correct: 3 },
      { q: "Quel acteur incarne Captain America dans les films Marvel ?", a: ["Chris Evans", "Chris Hemsworth", "Sebastian Stan", "Anthony Mackie"], correct: 0 },
      { q: "Comment s'appelle le petit garçon resté seul chez lui dans « Maman, j'ai raté l'avion » ?", a: ["Charlie", "Dennis", "Kevin", "Tom"], correct: 2 },
      { q: "Quelle comédie de Noël met en scène un lutin humain élevé au pôle Nord ?", a: ["Le Grinch", "Elfe", "Grinch", "Scrooge"], correct: 1 },
      { q: "Quel film de 2000 suit Tom Hanks échoué sur une île déserte avec un ballon nommé Wilson ?", a: ["Naufragé", "Robinson", "Seul au monde", "L'Île"], correct: 2 },
      { q: "Quel film raconte l'histoire vraie d'un souverain bègue qui doit s'adresser à la nation ?", a: ["Le Discours d'un roi", "The Queen", "Lincoln", "Invictus"], correct: 0 },
      { q: "Quelle actrice incarne Rose face à Leonardo DiCaprio dans « Titanic » ?", a: ["Nicole Kidman", "Kate Winslet", "Cate Blanchett", "Charlize Theron"], correct: 1 },
      { q: "Quel acteur, maître d'arts martiaux, a tourné « Opération Dragon » ?", a: ["Jackie Chan", "Jet Li", "Chuck Norris", "Bruce Lee"], correct: 3 },
    ],
    expert: [],
  },
  sport: {
    debutant: [
      { q: "Quel joueur argentin génial a brillé au FC Barcelone puis gagné la Coupe du monde 2022 ?", a: ["Cristiano Ronaldo", "Neymar", "Lionel Messi", "Sergio Agüero"], correct: 2 },
      { q: "Quel attaquant portugais aux nombreux buts est surnommé « CR7 » ?", a: ["Lionel Messi", "Luís Figo", "Eusébio", "Cristiano Ronaldo"], correct: 3 },
      { q: "Quel jeune attaquant français a marqué en finale de la Coupe du monde 2018 ?", a: ["Kylian Mbappé", "Antoine Griezmann", "Olivier Giroud", "Karim Benzema"], correct: 0 },
      { q: "Quel pays a remporté la Coupe du monde de football 2022 au Qatar ?", a: ["La France", "L'Argentine", "Le Brésil", "L'Allemagne"], correct: 1 },
      { q: "Quel pays a organisé et remporté la Coupe du monde de football de 1966 ?", a: ["L'Allemagne", "Le Brésil", "L'Italie", "L'Angleterre"], correct: 3 },
      { q: "Comment appelle-t-on le joueur chargé de garder les buts au football ?", a: ["Le gardien de but", "L'arbitre", "L'attaquant", "Le milieu"], correct: 0 },
      { q: "Comment appelle-t-on la personne qui fait respecter les règles pendant un match ?", a: ["L'entraîneur", "Le capitaine", "L'arbitre", "Le commentateur"], correct: 2 },
      { q: "Que brandit l'arbitre pour exclure définitivement un joueur du terrain ?", a: ["Le carton jaune", "Le carton rouge", "Le carton vert", "Le carton bleu"], correct: 1 },
      { q: "Que brandit l'arbitre pour donner un simple avertissement à un joueur ?", a: ["Le carton jaune", "Le carton rouge", "Le carton blanc", "Le carton noir"], correct: 0 },
      { q: "Comment appelle-t-on la remise en jeu au pied depuis le coin du terrain ?", a: ["La touche", "Le corner", "Le penalty", "La mêlée"], correct: 1 },
      { q: "Comment appelle-t-on la remise en jeu à la main quand le ballon sort sur le côté ?", a: ["Le corner", "Le penalty", "Le hors-jeu", "La touche"], correct: 3 },
      { q: "Comment appelle-t-on la position irrégulière d'un attaquant placé trop en avant ?", a: ["La touche", "Le corner", "Le hors-jeu", "La faute"], correct: 2 },
      { q: "Quel club anglais joue à Old Trafford et est surnommé « les Red Devils » ?", a: ["Liverpool", "Manchester United", "Arsenal", "Chelsea"], correct: 1 },
      { q: "Quel club catalan est le grand rival du Real Madrid ?", a: ["L'Atlético", "Valence", "Séville", "Le FC Barcelone"], correct: 3 },
      { q: "Quel club de Turin est surnommé « la Vieille Dame » ?", a: ["L'AC Milan", "L'Inter", "La Juventus", "La Roma"], correct: 2 },
      { q: "Quel grand club allemand, basé en Bavière, domine son championnat ?", a: ["Le Bayern Munich", "Le Borussia Dortmund", "Schalke 04", "Le RB Leipzig"], correct: 0 },
      { q: "Quel club de la capitale française a pour sigle « PSG » ?", a: ["L'Olympique de Marseille", "L'Olympique lyonnais", "Monaco", "Le Paris Saint-Germain"], correct: 3 },
      { q: "Quel club français a remporté la Ligue des champions en 1993 ?", a: ["L'Olympique de Marseille", "Le PSG", "L'Olympique lyonnais", "Bordeaux"], correct: 0 },
      { q: "Quel tournoi du Grand Chelem de tennis se joue à Paris sur terre battue ?", a: ["Wimbledon", "Roland-Garros", "L'US Open", "L'Open d'Australie"], correct: 1 },
      { q: "Quel tournoi du Grand Chelem ouvre la saison de tennis, en janvier ?", a: ["Wimbledon", "Roland-Garros", "L'Open d'Australie", "L'US Open"], correct: 2 },
      { q: "Quel joueur de tennis suisse a remporté vingt tournois du Grand Chelem ?", a: ["Rafael Nadal", "Roger Federer", "Novak Djokovic", "Pete Sampras"], correct: 1 },
      { q: "Quel joueur de tennis espagnol est surnommé le « roi de la terre battue » ?", a: ["Roger Federer", "Novak Djokovic", "Carlos Alcaraz", "Rafael Nadal"], correct: 3 },
      { q: "Quel joueur de tennis serbe a remporté un nombre record de titres du Grand Chelem ?", a: ["Novak Djokovic", "Roger Federer", "Rafael Nadal", "Andy Murray"], correct: 0 },
      { q: "Quelle joueuse américaine a remporté vingt-trois titres du Grand Chelem en tennis ?", a: ["Steffi Graf", "Martina Navrátilová", "Serena Williams", "Venus Williams"], correct: 2 },
      { q: "Comment appelle-t-on le point qui donne un ascendant juste après « quarante partout » ?", a: ["L'avantage", "L'ace", "Le break", "Le tie-break"], correct: 0 },
      { q: "Comment appelle-t-on le jeu décisif joué à six partout dans un set ?", a: ["L'avantage", "Le tie-break", "Le break", "Le smash"], correct: 1 },
      { q: "Comment appelle-t-on un service gagnant que l'adversaire ne parvient pas à toucher ?", a: ["Un break", "Un smash", "Un let", "Un ace"], correct: 3 },
      { q: "Quelle ligue de basket professionnel est la plus célèbre, aux États-Unis ?", a: ["La NFL", "La NHL", "La NBA", "La MLB"], correct: 2 },
      { q: "Quel basketteur surnommé « King » est une superstar de la NBA ?", a: ["Michael Jordan", "Kobe Bryant", "LeBron James", "Stephen Curry"], correct: 2 },
      { q: "Combien de points vaut un lancer franc réussi au basket ?", a: ["Deux", "Trois", "Quatre", "Un"], correct: 3 },
      { q: "Comment appelle-t-on le fait de faire rebondir le ballon en avançant, au basket ?", a: ["Le dribble", "La passe", "Le tir", "Le rebond"], correct: 0 },
      { q: "Combien de points vaut une pénalité réussie au rugby à XV ?", a: ["Un", "Trois", "Deux", "Cinq"], correct: 1 },
      { q: "Comment appelle-t-on l'action où les avants s'arc-boutent et se poussent pour le ballon ?", a: ["La mêlée", "La touche", "L'en-avant", "La pénalité"], correct: 0 },
      { q: "Quelle compétition annuelle oppose six équipes européennes de rugby ?", a: ["La Coupe du monde", "Le Tournoi des Six Nations", "Le Top 14", "La Coupe d'Europe"], correct: 1 },
      { q: "Dans quelle ville se sont déroulés les Jeux olympiques d'été de 2021 ?", a: ["Rio", "Londres", "Tokyo", "Pékin"], correct: 2 },
      { q: "Quelle ville a accueilli les Jeux olympiques d'été de 2016 ?", a: ["Londres", "Pékin", "Athènes", "Rio de Janeiro"], correct: 3 },
      { q: "Quel feu est allumé en Grèce puis porté jusqu'à la ville des Jeux olympiques ?", a: ["Le feu de camp", "Le brasier sacré", "La flamme olympique", "La lanterne"], correct: 2 },
      { q: "Comment appelle-t-on la course d'équipe où l'on se passe un bâton ?", a: ["Le relais", "Le sprint", "Le steeple", "Le fond"], correct: 0 },
      { q: "Quelle épreuve d'athlétisme consiste à sauter le plus loin possible dans le sable ?", a: ["Le triple saut", "Le saut en longueur", "Le saut en hauteur", "La perche"], correct: 1 },
      { q: "Quelle épreuve d'athlétisme consiste à franchir une barre horizontale sans la faire tomber ?", a: ["Le saut en longueur", "La perche", "Le triple saut", "Le saut en hauteur"], correct: 3 },
      { q: "Quel engin métallique lourd les athlètes lancent-ils en tournant sur eux-mêmes ?", a: ["Le javelot", "Le poids", "La balle", "Le marteau"], correct: 3 },
      { q: "Combien de coureurs se relaient dans une équipe de relais 4 × 100 mètres ?", a: ["Deux", "Quatre", "Six", "Huit"], correct: 1 },
      { q: "Quel sport d'hiver consiste à descendre une piste de glace en traîneau, tête la première ?", a: ["Le skeleton", "Le bobsleigh", "La luge", "Le curling"], correct: 0 },
      { q: "Quel sport d'hiver se pratique à plusieurs dans un engin lancé sur une piste glacée ?", a: ["Le skeleton", "Le patinage", "Le bobsleigh", "Le curling"], correct: 2 },
      { q: "Quel art martial coréen met l'accent sur les coups de pied ?", a: ["Le judo", "Le karaté", "Le kung-fu", "Le taekwondo"], correct: 3 },
      { q: "Quel art martial chinois est célèbre grâce aux films de Bruce Lee ?", a: ["Le kung-fu", "Le judo", "Le sumo", "La capoeira"], correct: 0 },
      { q: "Quel art martial brésilien mêle danse, acrobaties et musique ?", a: ["Le judo", "La capoeira", "Le karaté", "Le taekwondo"], correct: 1 },
      { q: "Quel sport de glisse se pratique sur l'eau, tracté par un bateau à moteur ?", a: ["Le surf", "La voile", "Le ski nautique", "Le kayak"], correct: 2 },
      { q: "Quel sport nautique consiste à avancer dans une petite embarcation à l'aide de pagaies ?", a: ["Le kayak", "La voile", "La natation", "Le surf"], correct: 0 },
      { q: "Quel sport se pratique sur un bateau propulsé par le vent dans ses voiles ?", a: ["Le kayak", "L'aviron", "Le surf", "La voile"], correct: 3 },
      { q: "Quel sport se pratique à plusieurs rameurs dans un bateau fin et allongé ?", a: ["Le kayak", "L'aviron", "La voile", "Le canoë"], correct: 1 },
      { q: "Comment appelle-t-on la mise hors de combat qui met fin à un match de boxe ?", a: ["Le set", "L'ace", "Le K.-O.", "Le strike"], correct: 2 },
      { q: "Dans quel sport lance-t-on des boules d'acier pour les rapprocher d'un cochonnet ?", a: ["Le bowling", "Le curling", "La pétanque", "Le billard"], correct: 2 },
      { q: "Dans quel sport fait-on tomber des quilles avec une boule lourde ?", a: ["Le bowling", "La pétanque", "Le curling", "Le billard"], correct: 0 },
      { q: "Dans quel jeu frappe-t-on des boules avec une queue sur un tapis vert ?", a: ["Le bowling", "Le billard", "La pétanque", "Le golf"], correct: 1 },
      { q: "Quel jeu de plateau oppose deux camps de pièces, dont le roi et la reine ?", a: ["Les dames", "Le go", "Le backgammon", "Les échecs"], correct: 3 },
      { q: "Combien de joueurs s'affrontent dans un match de tennis en simple ?", a: ["Deux", "Un", "Trois", "Quatre"], correct: 0 },
      { q: "Où nage-t-on lors d'une compétition de natation ?", a: ["Dans le désert", "Sur la neige", "Dans un stade", "Dans une piscine"], correct: 3 },
      { q: "Quel objet lance-t-on vers un panier au basket ?", a: ["Un palet", "Un ballon", "Une balle de golf", "Un volant"], correct: 1 },
      { q: "Avec quel objet frappe-t-on une balle au baseball ?", a: ["Une raquette", "Un club", "Une batte", "Une crosse"], correct: 2 },
      { q: "Avec quel objet frappe-t-on la balle au golf ?", a: ["Une raquette", "Un club", "Une batte", "Un maillet"], correct: 1 },
      { q: "Sur quelle surface glissante les hockeyeurs se déplacent-ils en patins ?", a: ["Sur le sable", "Sur l'herbe", "Sur la glace", "Sur l'eau"], correct: 2 },
      { q: "Comment appelle-t-on le chapeau rigide qui protège la tête du cavalier ?", a: ["La bombe", "La casquette", "Le béret", "La couronne"], correct: 0 },
      { q: "Que met-on aux pieds pour faire du roller ?", a: ["Des skis", "Des palmes", "Des crampons", "Des patins à roulettes"], correct: 3 },
      { q: "Que met-on aux pieds pour nager plus vite ?", a: ["Des crampons", "Des patins", "Des palmes", "Des skis"], correct: 2 },
      { q: "Que porte-t-on sur les yeux pour nager sous l'eau ?", a: ["Un chapeau", "Des lunettes", "Une écharpe", "Des gants"], correct: 1 },
      { q: "Comment appelle-t-on la personne qui prépare une équipe et choisit ses tactiques ?", a: ["L'entraîneur", "L'arbitre", "Le supporter", "Le capitaine"], correct: 0 },
      { q: "Comment appelle-t-on les personnes qui encouragent leur équipe dans les tribunes ?", a: ["Les arbitres", "Les joueurs", "Les entraîneurs", "Les supporters"], correct: 3 },
      { q: "Comment appelle-t-on le joueur qui porte le brassard et dirige son équipe ?", a: ["Le gardien", "L'arbitre", "Le remplaçant", "Le capitaine"], correct: 3 },
      { q: "Comment appelle-t-on le joueur qui entre en jeu à la place d'un coéquipier ?", a: ["L'arbitre", "Le remplaçant", "Le supporter", "Le capitaine"], correct: 1 },
      { q: "Comment appelle-t-on la grande enceinte à tribunes où se jouent les matchs de football ?", a: ["Le stade", "La piscine", "La patinoire", "Le gymnase"], correct: 0 },
      { q: "Comment appelle-t-on le grand bassin où l'on nage ?", a: ["La patinoire", "Le stade", "La piscine", "Le court"], correct: 2 },
      { q: "Comment appelle-t-on le terrain de glace du hockey et du patinage ?", a: ["La piscine", "Le stade", "La patinoire", "Le court"], correct: 2 },
      { q: "Comment appelle-t-on le terrain où l'on joue au tennis ?", a: ["Le court", "Le green", "La piste", "Le ring"], correct: 0 },
      { q: "Comment appelle-t-on la pelouse rase autour du trou, au golf ?", a: ["Le court", "Le ring", "La piste", "Le green"], correct: 3 },
      { q: "Comment appelle-t-on l'espace carré entouré de cordes où boxent deux adversaires ?", a: ["Le court", "Le ring", "Le green", "Le tatami"], correct: 1 },
      { q: "Comment appelle-t-on le tapis sur lequel s'affrontent les judokas ?", a: ["Le ring", "Le green", "Le tatami", "La piste"], correct: 2 },
      { q: "Quelle récompense, la plus précieuse, reçoit le vainqueur d'une compétition ?", a: ["La médaille d'or", "La médaille d'argent", "La médaille de bronze", "Le diplôme"], correct: 0 },
      { q: "Quelle récompense reçoit celui qui termine deuxième d'une compétition ?", a: ["La médaille d'or", "La médaille de bronze", "La coupe", "La médaille d'argent"], correct: 3 },
      { q: "Quelle récompense reçoit celui qui termine troisième d'une compétition ?", a: ["La médaille d'or", "La médaille de bronze", "La médaille d'argent", "Le trophée"], correct: 1 },
      { q: "Quel footballeur brésilien, surnommé « le Roi », a gagné trois Coupes du monde ?", a: ["Ronaldinho", "Zico", "Pelé", "Garrincha"], correct: 2 },
      { q: "Quel footballeur argentin a marqué le but de « la main de Dieu » en 1986 ?", a: ["Lionel Messi", "Diego Maradona", "Gabriel Batistuta", "Mario Kempes"], correct: 1 },
      { q: "Quel joueur français a marqué deux buts de la tête en finale de la Coupe du monde 1998 ?", a: ["Thierry Henry", "Didier Deschamps", "Emmanuel Petit", "Zinédine Zidane"], correct: 3 },
      { q: "Quelle gymnaste américaine a dominé son sport de nombreuses fois dans les années 2010 ?", a: ["Simone Biles", "Nadia Comăneci", "Larissa Latynina", "Olga Korbut"], correct: 0 },
      { q: "Quel pilote britannique a égalé le record de sept titres de champion du monde de Formule 1 ?", a: ["Jenson Button", "Nigel Mansell", "Lewis Hamilton", "Damon Hill"], correct: 2 },
      { q: "Quel pilote allemand a remporté sept titres de champion du monde de Formule 1 ?", a: ["Sebastian Vettel", "Nico Rosberg", "Ralf Schumacher", "Michael Schumacher"], correct: 3 },
      { q: "Quelle course automobile mythique se déroule chaque année dans les rues de la principauté ?", a: ["Le Grand Prix de Monaco", "Les 24 Heures du Mans", "Le Rallye Monte-Carlo", "L'Indy 500"], correct: 0 },
      { q: "Quelle grande course cycliste italienne rivalise avec l'épreuve française de juillet ?", a: ["La Vuelta", "Le Tour d'Italie", "Paris-Roubaix", "Le Tour des Flandres"], correct: 1 },
      { q: "Comment appelle-t-on le grand tour cycliste d'Espagne ?", a: ["Le Giro", "Le Tour", "La Vuelta", "Paris-Nice"], correct: 2 },
      { q: "Quel championnat oppose les nations européennes de football tous les quatre ans ?", a: ["L'Euro", "La Ligue des champions", "La Coupe du monde", "La Copa America"], correct: 0 },
      { q: "Quel sport consiste à grimper le long de parois rocheuses ?", a: ["La randonnée", "Le parapente", "Le canyoning", "L'escalade"], correct: 3 },
      { q: "Quel sport consiste à sauter d'un avion en chute libre avant d'ouvrir sa voile ?", a: ["Le deltaplane", "Le parachutisme", "Le parapente", "Le base-jump"], correct: 1 },
      { q: "Quel sport de glisse urbaine se pratique sur une planche à roulettes ?", a: ["Le roller", "La trottinette", "Le BMX", "Le skateboard"], correct: 3 },
      { q: "Quel sport de précision consiste à viser le centre d'une cible avec une carabine ?", a: ["Le tir sportif", "Le tir à l'arc", "Le biathlon", "Le lancer"], correct: 0 },
      { q: "Quelle discipline gymnique se pratique avec un ruban, un cerceau ou un ballon ?", a: ["La gymnastique artistique", "Le trampoline", "La gymnastique rythmique", "L'acrosport"], correct: 2 },
      { q: "Quel agrès de gymnastique est une barre étroite sur laquelle on évolue en équilibre ?", a: ["Les barres asymétriques", "La poutre", "Le cheval d'arçons", "Les anneaux"], correct: 1 },
      { q: "Quel sport de raquette se joue dans une salle fermée en frappant la balle contre un mur ?", a: ["Le tennis", "Le badminton", "Le squash", "Le padel"], correct: 2 },
      { q: "Quel sport oppose deux équipes qui tirent chacune de leur côté sur un même câble ?", a: ["Le lancer de poids", "Le tir à la corde", "La lutte", "L'haltérophilie"], correct: 1 },
      { q: "Quel sport consiste à soulever la barre la plus lourde possible ?", a: ["La lutte", "La boxe", "Le lancer", "L'haltérophilie"], correct: 3 },
      { q: "Comment appelle-t-on l'ensemble des règles à respecter dans un sport ?", a: ["Le règlement", "Le classement", "Le championnat", "Le calendrier"], correct: 0 },
    ],
    expert: [],
  },
  geopolitique: {
    debutant: [
      { q: "Quel animal est l'emblème traditionnel de la Russie ?", a: ["L'aigle", "L'ours", "Le lion", "Le loup"], correct: 1 },
      { q: "Quel oiseau figure sur les maillots des sportifs français comme emblème ?", a: ["Le coq", "L'aigle", "La colombe", "Le lion"], correct: 0 },
      { q: "Quel animal noir et blanc est un symbole cher à la Chine ?", a: ["Le dragon", "Le tigre", "La grue", "Le panda"], correct: 3 },
      { q: "Quel animal mythique figure sur le drapeau du pays de Galles ?", a: ["La licorne", "Le lion", "Le dragon", "L'aigle"], correct: 2 },
      { q: "Quel félin est le symbole royal de l'Angleterre, présent sur ses armoiries ?", a: ["L'ours", "L'aigle", "Le loup", "Le lion"], correct: 3 },
      { q: "Quelle fleur colorée est un symbole national des Pays-Bas ?", a: ["La rose", "La tulipe", "Le tournesol", "Le lys"], correct: 1 },
      { q: "Quelle fleur blanche fut longtemps l'emblème des rois de France ?", a: ["Le lys", "La rose", "La tulipe", "La marguerite"], correct: 0 },
      { q: "Quel monument offert par la France aux États-Unis brandit une torche à l'entrée de New York ?", a: ["La colonne Vendôme", "Le Christ Rédempteur", "La statue de la Liberté", "Le Colosse de Rhodes"], correct: 2 },
      { q: "Combien de couleurs compte le drapeau allemand ?", a: ["Deux", "Quatre", "Cinq", "Trois"], correct: 3 },
      { q: "Quelles sont les trois couleurs du drapeau allemand ?", a: ["Bleu, blanc, rouge", "Noir, rouge, jaune", "Vert, blanc, rouge", "Rouge, blanc, bleu"], correct: 1 },
      { q: "Quelles couleurs composent le drapeau italien ?", a: ["Vert, blanc, rouge", "Bleu, blanc, rouge", "Noir, rouge, jaune", "Rouge, blanc, bleu"], correct: 0 },
      { q: "De quelle couleur est le fond du drapeau japonais, avec un cercle rouge au centre ?", a: ["Bleu", "Vert", "Blanc", "Jaune"], correct: 2 },
      { q: "Quel motif chrétien décalé vers la gauche figure sur les drapeaux nordiques ?", a: ["Le croissant", "La croix scandinave", "L'étoile", "Le soleil"], correct: 1 },
      { q: "Quel symbole en forme de lune, avec une étoile, figure sur le drapeau turc ?", a: ["La croix", "Le soleil", "Le croissant", "L'aigle"], correct: 2 },
      { q: "Combien de bandes rouges et blanches compte le drapeau américain ?", a: ["Treize", "Sept", "Onze", "Cinquante"], correct: 0 },
      { q: "Quelle est la monnaie de la Chine ?", a: ["Le yen", "Le won", "Le baht", "Le yuan"], correct: 3 },
      { q: "Quelle est la monnaie de la Russie ?", a: ["Le rouble", "Le zloty", "Le forint", "Le leu"], correct: 0 },
      { q: "Quelle monnaie scandinave est utilisée en Suède, au Danemark et en Norvège ?", a: ["L'euro", "Le florin", "La couronne", "Le mark"], correct: 2 },
      { q: "Quelle monnaie porte le même nom aux États-Unis, au Canada et en Australie ?", a: ["L'euro", "La livre", "Le peso", "Le dollar"], correct: 3 },
      { q: "Quelle monnaie est utilisée au Mexique et dans plusieurs pays d'Amérique latine ?", a: ["Le real", "Le peso", "Le dollar", "Le sol"], correct: 1 },
      { q: "Que signifie le sigle « ONU » ?", a: ["L'Office national de l'union", "L'Organisation des Nations unies", "L'Ordre des nations unifiées", "L'Organisation navale universelle"], correct: 1 },
      { q: "Que signifie le sigle « UE » ?", a: ["L'Union européenne", "L'Unité économique", "L'Union des États", "L'Union étatique"], correct: 0 },
      { q: "Quelle organisation humanitaire fondée par Henry Dunant secourt les blessés de guerre ?", a: ["L'UNICEF", "Greenpeace", "L'OMS", "La Croix-Rouge"], correct: 3 },
      { q: "Quelle organisation, connue pour ses actions coup de poing, défend l'environnement ?", a: ["La Croix-Rouge", "Amnesty International", "Greenpeace", "L'OMS"], correct: 2 },
      { q: "Quelle organisation défend les prisonniers d'opinion et les droits humains ?", a: ["Greenpeace", "La Croix-Rouge", "L'UNESCO", "Amnesty International"], correct: 3 },
      { q: "Quelle organisation internationale gère le football mondial ?", a: ["L'UEFA", "La FIFA", "Le CIO", "L'ONU"], correct: 1 },
      { q: "Quelle instance internationale organise les Jeux d'été et d'hiver ?", a: ["Le Comité international olympique", "La FIFA", "L'ONU", "L'UEFA"], correct: 0 },
      { q: "Quelle association réunit surtout d'anciennes colonies britanniques autour du Royaume-Uni ?", a: ["La Francophonie", "L'ASEAN", "Le Commonwealth", "L'Union africaine"], correct: 2 },
      { q: "Quelle organisation réunit les pays qui ont le français en partage ?", a: ["La Francophonie", "Le Commonwealth", "L'Hispanidad", "L'ASEAN"], correct: 0 },
      { q: "Comment appelle-t-on un pays dirigé par un président élu, sans roi ni reine ?", a: ["Une monarchie", "Un empire", "Une république", "Une principauté"], correct: 2 },
      { q: "Comment appelle-t-on un régime où un seul homme détient tout le pouvoir, sans élections libres ?", a: ["Une démocratie", "Une république", "Une fédération", "Une dictature"], correct: 3 },
      { q: "Comment appelle-t-on le partage du pouvoir entre le législatif, l'exécutif et le judiciaire ?", a: ["La démocratie directe", "La séparation des pouvoirs", "Le fédéralisme", "La cohabitation"], correct: 1 },
      { q: "Comment appelle-t-on la branche de l'État chargée de faire les lois ?", a: ["Le pouvoir exécutif", "Le pouvoir judiciaire", "Le pouvoir législatif", "Le pouvoir royal"], correct: 2 },
      { q: "Comment appelle-t-on la branche de l'État chargée d'appliquer les lois et de gouverner ?", a: ["Le pouvoir législatif", "Le pouvoir exécutif", "Le pouvoir judiciaire", "Le pouvoir médiatique"], correct: 1 },
      { q: "Comment appelle-t-on la branche de l'État chargée de rendre la justice ?", a: ["Le pouvoir exécutif", "Le pouvoir législatif", "Le pouvoir spirituel", "Le pouvoir judiciaire"], correct: 3 },
      { q: "Comment appelle-t-on un vote où les citoyens répondent par oui ou par non à une question ?", a: ["Un référendum", "Une primaire", "Un sondage", "Un recensement"], correct: 0 },
      { q: "Comment appelle-t-on le comptage officiel de toute la population d'un pays ?", a: ["Un référendum", "Un recensement", "Un sondage", "Un scrutin"], correct: 1 },
      { q: "Comment appelle-t-on le texte qui rassemble les lois fondamentales d'un pays ?", a: ["La Constitution", "Le décret", "La charte", "Le règlement"], correct: 0 },
      { q: "Comment appelle-t-on la limite qui sépare deux pays ?", a: ["La côte", "Le littoral", "La frontière", "L'horizon"], correct: 2 },
      { q: "Comment appelle-t-on un accord officiel signé entre plusieurs pays ?", a: ["Un débat", "Un discours", "Un sondage", "Un traité"], correct: 3 },
      { q: "Comment appelle-t-on l'ensemble formé par l'Assemblée nationale et le Sénat en France ?", a: ["Le Gouvernement", "Le Conseil d'État", "Le Parlement", "La Cour"], correct: 2 },
      { q: "Qui est, en France, le chef du gouvernement nommé par le président ?", a: ["Le maire", "Le préfet", "Le député", "Le Premier ministre"], correct: 3 },
      { q: "Comment appelle-t-on un membre élu de l'Assemblée nationale française ?", a: ["Un député", "Un sénateur", "Un ministre", "Un préfet"], correct: 0 },
      { q: "Comment appelle-t-on un membre du Sénat français ?", a: ["Un député", "Un sénateur", "Un ministre", "Un maire"], correct: 1 },
      { q: "Comment appelle-t-on le représentant de l'État dans un département français ?", a: ["Le maire", "Le député", "Le préfet", "Le sénateur"], correct: 2 },
      { q: "Comment s'appelle l'hymne national de la France ?", a: ["La Carmagnole", "La Marseillaise", "Le Chant du départ", "L'Internationale"], correct: 1 },
      { q: "Quelle est la devise de la République française ?", a: ["Liberté, Égalité, Fraternité", "Un pour tous, tous pour un", "Dieu et mon droit", "Travail, Famille, Patrie"], correct: 0 },
      { q: "Quelle figure symbolise la République française, représentée en buste dans les mairies ?", a: ["Jeanne d'Arc", "Germania", "Athéna", "Marianne"], correct: 3 },
      { q: "Combien de départements compte environ la France métropolitaine ?", a: ["50", "200", "300", "96"], correct: 3 },
      { q: "Comment appelle-t-on les grandes divisions administratives françaises, comme la Bretagne ou l'Occitanie ?", a: ["Les régions", "Les départements", "Les cantons", "Les communes"], correct: 0 },
      { q: "Comment appelle-t-on le chef de l'Église catholique, au Vatican ?", a: ["Le roi", "Le pape", "Le calife", "Le sultan"], correct: 1 },
      { q: "Comment appelle-t-on le souverain d'un royaume comme l'Arabie saoudite ?", a: ["Le président", "Le pape", "Le roi", "Le chancelier"], correct: 2 },
      { q: "Comment appelle-t-on le chef d'un émirat, comme celui du Qatar ?", a: ["Le tsar", "Le doge", "L'émir", "Le pape"], correct: 2 },
      { q: "Comment appelait-on le souverain de la Russie avant 1917 ?", a: ["Le tsar", "Le kaiser", "Le sultan", "Le doge"], correct: 0 },
      { q: "Comment appelait-on l'empereur d'Allemagne avant 1918 ?", a: ["Le tsar", "Le kaiser", "Le sultan", "Le roi"], correct: 1 },
      { q: "Comment appelle-t-on le chef du gouvernement en Allemagne ?", a: ["Le président", "Le roi", "Le préfet", "Le chancelier"], correct: 3 },
      { q: "Dans quel pays le président est-il élu et réside-t-il à la Maison-Blanche ?", a: ["Les États-Unis", "La France", "L'Allemagne", "Le Royaume-Uni"], correct: 0 },
      { q: "Quel drapeau bleu à croix blanche appartient à un pays nordique voisin de la Russie ?", a: ["La Suède", "La Finlande", "La Norvège", "L'Islande"], correct: 1 },
      { q: "Quel pays a un drapeau à bandes rouges et blanches avec des étoiles sur fond bleu ?", a: ["Le Royaume-Uni", "Le Chili", "Les États-Unis", "Le Liberia"], correct: 2 },
      { q: "Quel emblème national réunit les croix de saint Georges, saint André et saint Patrick ?", a: ["Le drapeau irlandais", "Le drapeau français", "Le drapeau nordique", "Le drapeau du Royaume-Uni"], correct: 3 },
      { q: "Comment appelait-on l'affrontement indirect entre les États-Unis et l'URSS après 1945 ?", a: ["La guerre froide", "La guerre des Six Jours", "La guerre de Sécession", "La drôle de guerre"], correct: 0 },
      { q: "Quelle superpuissance communiste s'est effondrée en 1991, se divisant en plusieurs pays ?", a: ["La Chine", "La Yougoslavie", "L'Allemagne de l'Est", "L'URSS"], correct: 3 },
      { q: "Quels deux pays dominaient chacun un bloc pendant la guerre froide ?", a: ["La France et l'Angleterre", "Les États-Unis et l'URSS", "La Chine et le Japon", "L'Allemagne et l'Italie"], correct: 1 },
      { q: "Comment appelle-t-on le processus par lequel les colonies ont accédé à l'indépendance ?", a: ["La colonisation", "La mondialisation", "La décolonisation", "L'immigration"], correct: 2 },
      { q: "Sur quel continent trouve-t-on le plus grand nombre de pays ?", a: ["L'Asie", "L'Europe", "L'Afrique", "L'Amérique"], correct: 2 },
      { q: "Comment appelle-t-on le fait qu'un pays gouverne seul ses affaires, sans dépendre d'un autre ?", a: ["La souveraineté", "La neutralité", "La diplomatie", "La colonisation"], correct: 0 },
      { q: "Comment appelle-t-on le souverain qui règne mais ne gouverne pas, dans une monarchie parlementaire ?", a: ["Le président", "Le chancelier", "Le préfet", "Le monarque"], correct: 3 },
      { q: "Quel pays est à la fois un continent et une île, dans l'hémisphère sud ?", a: ["Le Groenland", "L'Australie", "Madagascar", "L'Antarctique"], correct: 1 },
      { q: "Quelle terre glacée, sans pays ni habitants permanents, entoure le pôle Sud ?", a: ["L'Arctique", "L'Antarctique", "Le Sahara", "La Sibérie"], correct: 1 },
      { q: "Quel pays partage la plus longue frontière terrestre du monde avec les États-Unis ?", a: ["Le Mexique", "Cuba", "Le Canada", "La Russie"], correct: 2 },
      { q: "Comment appelle-t-on l'échange de marchandises entre les différents pays ?", a: ["Le commerce international", "Le tourisme", "L'immigration", "La diplomatie"], correct: 0 },
      { q: "Comment appelle-t-on les relations pacifiques entre pays, menées par leurs représentants ?", a: ["La guerre", "Le commerce", "L'espionnage", "La diplomatie"], correct: 3 },
      { q: "Comment appelle-t-on le représentant d'un pays dans une ambassade à l'étranger ?", a: ["Le préfet", "Le maire", "Le ministre", "L'ambassadeur"], correct: 3 },
      { q: "Comment appelle-t-on la taxe payée sur les marchandises qui franchissent une frontière ?", a: ["L'impôt sur le revenu", "Les droits de douane", "La TVA", "L'amende"], correct: 1 },
      { q: "Comment appelle-t-on une personne qui fuit son pays à cause de la guerre ou des persécutions ?", a: ["Un réfugié", "Un touriste", "Un citoyen", "Un diplomate"], correct: 0 },
      { q: "Comment appelle-t-on le fait, pour un pays, de protéger une personne en danger venue d'ailleurs ?", a: ["Le droit du sol", "Le droit de vote", "Le droit d'asile", "Le droit de grève"], correct: 2 },
      { q: "Comment appelle-t-on l'interdiction faite à un pays de commercer, en guise de sanction ?", a: ["Un traité", "Un référendum", "Un recensement", "Un embargo"], correct: 3 },
      { q: "Comment appelle-t-on l'intensification des échanges entre tous les pays du monde ?", a: ["La colonisation", "La mondialisation", "La décolonisation", "La migration"], correct: 1 },
      { q: "Comment appelle-t-on l'entente et la coopération entre pays aux intérêts communs ?", a: ["Une rivalité", "Une frontière", "Une alliance", "Une colonie"], correct: 2 },
      { q: "De quel pays Washington est-elle la capitale ?", a: ["Les États-Unis", "Le Canada", "Le Royaume-Uni", "L'Australie"], correct: 0 },
      { q: "De quel pays Moscou est-elle la capitale ?", a: ["L'Ukraine", "La Pologne", "La Russie", "La Biélorussie"], correct: 2 },
      { q: "De quel pays Pékin est-elle la capitale ?", a: ["La Chine", "Le Japon", "La Corée", "La Mongolie"], correct: 0 },
      { q: "Quel pays accueille les sièges principaux de l'Union européenne et de l'OTAN ?", a: ["La France", "La Belgique", "La Suisse", "Le Luxembourg"], correct: 1 },
      { q: "Dans quel petit pays européen siègent la Cour de justice de l'UE et d'autres institutions ?", a: ["La Belgique", "La Suisse", "Monaco", "Le Luxembourg"], correct: 3 },
      { q: "Comment qualifie-t-on un État qui refuse de prendre parti dans les conflits, comme la Suisse ?", a: ["Un pays allié", "Un pays colonisateur", "Un pays fédéral", "Un pays neutre"], correct: 3 },
      { q: "Comment appelle-t-on l'union de plusieurs États sous un gouvernement commun, comme aux États-Unis ?", a: ["Une fédération", "Une colonie", "Une principauté", "Une cité-État"], correct: 0 },
      { q: "Comment appelait-on un territoire lointain dominé et exploité par un autre pays ?", a: ["Une province", "Une colonie", "Une région", "Une capitale"], correct: 1 },
      { q: "Quel étendard de couleur unie agite-t-on pour se rendre à l'ennemi ?", a: ["Le drapeau noir", "Le drapeau rouge", "Le drapeau blanc", "Le drapeau vert"], correct: 2 },
      { q: "De quelle couleur est le casque des soldats de la paix envoyés par l'ONU ?", a: ["Rouge", "Vert", "Bleu", "Blanc"], correct: 2 },
      { q: "Comment surnomme-t-on les soldats envoyés par l'ONU pour maintenir la paix ?", a: ["Les Casques bleus", "Les Bérets verts", "La Légion", "Les Marines"], correct: 0 },
      { q: "Comment appelle-t-on la possibilité pour chaque citoyen de choisir ses dirigeants dans les urnes ?", a: ["Le droit du sol", "Le droit d'asile", "Le droit de grève", "Le droit de vote"], correct: 3 },
      { q: "À partir de quel âge peut-on voter en France ?", a: ["16 ans", "18 ans", "21 ans", "25 ans"], correct: 1 },
      { q: "Comment appelle-t-on l'ensemble des personnes qui ont le droit de voter ?", a: ["Les candidats", "Les élus", "Les électeurs", "Les députés"], correct: 2 },
      { q: "Comment appelle-t-on une personne qui se présente à une élection ?", a: ["Un électeur", "Un candidat", "Un arbitre", "Un ministre"], correct: 1 },
      { q: "Comment appelle-t-on l'ensemble des idées d'un candidat pour diriger le pays ?", a: ["Un programme", "Un bulletin", "Un débat", "Un sondage"], correct: 0 },
      { q: "Comment appelle-t-on le fait de devenir officiellement citoyen d'un nouveau pays ?", a: ["L'émigration", "L'exil", "Le tourisme", "La naturalisation"], correct: 3 },
      { q: "Comment appelle-t-on une personne qui quitte son pays pour aller vivre ailleurs ?", a: ["Un émigrant", "Un touriste", "Un réfugié", "Un diplomate"], correct: 0 },
      { q: "Comment appelle-t-on une personne qui arrive dans un pays pour s'y installer ?", a: ["Un émigrant", "Un immigrant", "Un touriste", "Un exilé"], correct: 1 },
      { q: "Comment appelle-t-on un rassemblement de citoyens dans la rue pour défendre une cause ?", a: ["Une élection", "Un référendum", "Une manifestation", "Une cérémonie"], correct: 2 },
      { q: "Comment appelle-t-on une carte à plat qui représente tous les pays du monde ?", a: ["Un globe", "Un atlas", "Une boussole", "Un planisphère"], correct: 3 },
    ],
    expert: [],
  },
  arts: {
    expert: [],
  },
  nature: {
    expert: [],
  },
  gastronomie: {
    expert: [],
  },
  mythologie: {
    expert: [],
  },
};

// Couleurs des joueurs — distinctes, même chroma/clarté, teintes variées.
const PLAYER_COLORS = [
  { id: 'corail', label: 'Corail',  color: 'oklch(0.64 0.16 28)',  ring: 'oklch(0.50 0.15 28)' },
  { id: 'azur',   label: 'Azur',    color: 'oklch(0.62 0.13 235)', ring: 'oklch(0.48 0.12 235)' },
  { id: 'jade',   label: 'Jade',    color: 'oklch(0.62 0.12 168)', ring: 'oklch(0.47 0.11 168)' },
  { id: 'prune',  label: 'Prune',   color: 'oklch(0.58 0.15 330)', ring: 'oklch(0.46 0.14 330)' },
  { id: 'ambre',  label: 'Ambre',   color: 'oklch(0.74 0.15 78)',  ring: 'oklch(0.60 0.14 78)' },
  { id: 'indigo', label: 'Indigo',  color: 'oklch(0.50 0.15 285)', ring: 'oklch(0.40 0.14 285)' },
];

// Plateau de 100 cases : 12 cases par catégorie (8×12 = 96) + 4 cases « Joker ».
// `selectedIds` = les 8 catégories retenues pour la partie (parmi les 12).
// Répartition au hasard, cases numérotées de 1 à 100.
function buildBoard(selectedIds) {
  const ids = (selectedIds && selectedIds.length === BOARD_CATS)
    ? selectedIds
    : CATEGORIES.slice(0, BOARD_CATS).map(c => c.id);
  const cells = [];
  ids.forEach(id => { for (let k = 0; k < 12; k++) cells.push({ type: 'cat', category: id }); });
  for (let k = 0; k < 4; k++) cells.push({ type: 'joker' });
  // Mélange Fisher–Yates
  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }
  return cells.map((c, i) => ({ ...c, index: i, number: i + 1 }));
}

// ───────────────────────── tweaks-panel ─────────────────────────
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null
      ? keyOrEdits : { [keyOrEdits]: val };
    setValues((prev) => ({ ...prev, ...edits }));
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', { detail: edits }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({ title = 'Tweaks', children }) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({ x: 16, y: 16 });
  const PAD = 16;

  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth, h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y)),
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);

  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);

  React.useEffect(() => {
    const onMsg = (e) => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);
      else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*');
  };

  const onDragStart = (e) => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX, sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = (ev) => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy),
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  if (!open) return null;
  return (
    <>
      <style>{__TWEAKS_STYLE}</style>
      <div ref={dragRef} className="twk-panel" data-omelette-chrome=""
           style={{ right: offsetRef.current.x, bottom: offsetRef.current.y }}>
        <div className="twk-hd" onMouseDown={onDragStart}>
          <b>{title}</b>
          <button className="twk-x" aria-label="Close tweaks"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={dismiss}>✕</button>
        </div>
        <div className="twk-body">
          {children}
        </div>
      </div>
    </>
  );
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({ label, children }) {
  return (
    <>
      <div className="twk-sect">{label}</div>
      {children}
    </>
  );
}

function TweakRow({ label, value, children, inline = false }) {
  return (
    <div className={inline ? 'twk-row twk-row-h' : 'twk-row'}>
      <div className="twk-lbl">
        <span>{label}</span>
        {value != null && <span className="twk-val">{value}</span>}
      </div>
      {children}
    </div>
  );
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({ label, value, min = 0, max = 100, step = 1, unit = '', onChange }) {
  return (
    <TweakRow label={label} value={`${value}${unit}`}>
      <input type="range" className="twk-slider" min={min} max={max} step={step}
             value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </TweakRow>
  );
}

function TweakToggle({ label, value, onChange }) {
  return (
    <div className="twk-row twk-row-h">
      <div className="twk-lbl"><span>{label}</span></div>
      <button type="button" className="twk-toggle" data-on={value ? '1' : '0'}
              role="switch" aria-checked={!!value}
              onClick={() => onChange(!value)}><i /></button>
    </div>
  );
}

function TweakRadio({ label, value, options, onChange }) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = (o) => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({ 2: 16, 3: 10 }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = (s) => {
      const m = options.find((o) => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return <TweakSelect label={label} value={value} options={options}
                        onChange={(s) => onChange(resolve(s))} />;
  }
  const opts = options.map((o) => (typeof o === 'object' ? o : { value: o, label: o }));
  const idx = Math.max(0, opts.findIndex((o) => o.value === value));
  const n = opts.length;

  const segAt = (clientX) => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor(((clientX - r.left - 2) / inner) * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };

  const onPointerDown = (e) => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = (ev) => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  return (
    <TweakRow label={label}>
      <div ref={trackRef} role="radiogroup" onPointerDown={onPointerDown}
           className={dragging ? 'twk-seg dragging' : 'twk-seg'}>
        <div className="twk-seg-thumb"
             style={{ left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
                      width: `calc((100% - 4px) / ${n})` }} />
        {opts.map((o) => (
          <button key={o.value} type="button" role="radio" aria-checked={o.value === value}>
            {o.label}
          </button>
        ))}
      </div>
    </TweakRow>
  );
}

function TweakSelect({ label, value, options, onChange }) {
  return (
    <TweakRow label={label}>
      <select className="twk-field" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => {
          const v = typeof o === 'object' ? o.value : o;
          const l = typeof o === 'object' ? o.label : o;
          return <option key={v} value={v}>{l}</option>;
        })}
      </select>
    </TweakRow>
  );
}

function TweakText({ label, value, placeholder, onChange }) {
  return (
    <TweakRow label={label}>
      <input className="twk-field" type="text" value={value} placeholder={placeholder}
             onChange={(e) => onChange(e.target.value)} />
    </TweakRow>
  );
}

function TweakNumber({ label, value, min, max, step = 1, unit = '', onChange }) {
  const clamp = (n) => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({ x: 0, val: 0 });
  const onScrubStart = (e) => {
    e.preventDefault();
    startRef.current = { x: e.clientX, val: value };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = (ev) => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return (
    <div className="twk-num">
      <span className="twk-num-lbl" onPointerDown={onScrubStart}>{label}</span>
      <input type="number" value={value} min={min} max={max} step={step}
             onChange={(e) => onChange(clamp(Number(e.target.value)))} />
      {unit && <span className="twk-num-unit">{unit}</span>}
    </div>
  );
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, (c) => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}

const __TwkCheck = ({ light }) => (
  <svg viewBox="0 0 14 14" aria-hidden="true">
    <path d="M3 7.2 5.8 10 11 4.2" fill="none" strokeWidth="2.2"
          strokeLinecap="round" strokeLinejoin="round"
          stroke={light ? 'rgba(0,0,0,.78)' : '#fff'} />
  </svg>
);

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({ label, value, options, onChange }) {
  if (!options || !options.length) {
    return (
      <div className="twk-row twk-row-h">
        <div className="twk-lbl"><span>{label}</span></div>
        <input type="color" className="twk-swatch" value={value}
               onChange={(e) => onChange(e.target.value)} />
      </div>
    );
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = (o) => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return (
    <TweakRow label={label}>
      <div className="twk-chips" role="radiogroup">
        {options.map((o, i) => {
          const colors = Array.isArray(o) ? o : [o];
          const [hero, ...rest] = colors;
          const sup = rest.slice(0, 4);
          const on = key(o) === cur;
          return (
            <button key={i} type="button" className="twk-chip" role="radio"
                    aria-checked={on} data-on={on ? '1' : '0'}
                    aria-label={colors.join(', ')} title={colors.join(' · ')}
                    style={{ background: hero }}
                    onClick={() => onChange(o)}>
              {sup.length > 0 && (
                <span>
                  {sup.map((c, j) => <i key={j} style={{ background: c }} />)}
                </span>
              )}
              {on && <__TwkCheck light={__twkIsLight(hero)} />}
            </button>
          );
        })}
      </div>
    </TweakRow>
  );
}

function TweakButton({ label, onClick, secondary = false }) {
  return (
    <button type="button" className={secondary ? 'twk-btn secondary' : 'twk-btn'}
            onClick={onClick}>{label}</button>
  );
}

Object.assign(window, {
  useTweaks, TweaksPanel, TweakSection, TweakRow,
  TweakSlider, TweakToggle, TweakRadio, TweakSelect,
  TweakText, TweakNumber, TweakColor, TweakButton,
});

// ───────────────────────── components ─────────────────────────
// ============================================================
// components.jsx — Composants partagés (avatars, badges, boutons)
// ============================================================

// ---- Filet décoratif doré --------------------------------------
function Flourish({ width = 220, tone = 'var(--metal)' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, width, color: tone, opacity: 0.9 }}>
      <span style={{ flex: 1, height: 1, background: 'currentColor', opacity: 0.5 }} />
      <span style={{ fontSize: 10, letterSpacing: 2 }}>◆</span>
      <span style={{ width: 7, height: 7, transform: 'rotate(45deg)', border: '1px solid currentColor' }} />
      <span style={{ fontSize: 10, letterSpacing: 2 }}>◆</span>
      <span style={{ flex: 1, height: 1, background: 'currentColor', opacity: 0.5 }} />
    </div>
  );
}

// ---- Avatar joueur (jeton émaillé à initiale — identité, pas un pion) -------
function Avatar({ player, size = 46, active = false, plain = false, style = {} }) {
  const initial = (player.name || '?').trim().charAt(0).toUpperCase() || '?';
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: player.color,
      display: 'grid', placeItems: 'center', flexShrink: 0,
      color: 'oklch(0.97 0.02 90)',
      fontFamily: 'var(--font-display)',
      fontSize: size * 0.46,
      boxShadow: `inset 0 ${size * 0.05}px ${size * 0.12}px rgba(255,255,255,0.35), inset 0 -${size * 0.06}px ${size * 0.14}px rgba(0,0,0,0.30), 0 ${size * 0.06}px ${size * 0.14}px rgba(40,20,10,0.30)`,
      border: `${Math.max(2, size * 0.06)}px solid var(--metal)`,
      outline: active ? `${Math.max(2, size * 0.05)}px solid var(--metal)` : 'none',
      outlineOffset: 3,
      transition: 'outline-color .2s, transform .2s',
      ...style,
    }}>
      {plain ? '' : initial}
    </div>
  );
}

// ---- Pastille de catégorie (rond coloré + glyphe) --------------------------
function CatBadge({ cat, size = 34, ring = true, style = {} }) {
  return (
    <div title={cat.label} style={{
      width: size, height: size, borderRadius: '50%',
      display: 'grid', placeItems: 'center', flexShrink: 0,
      background: cat.color, color: 'oklch(0.98 0.02 90)',
      fontSize: size * 0.52,
      textShadow: '0 1px 2px rgba(0,0,0,0.42)',
      border: ring ? '2px solid var(--metal)' : 'none',
      boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.35), inset 0 -2px 5px rgba(0,0,0,0.25), 0 3px 8px rgba(40,20,10,0.22)',
      ...style,
    }}>
      {cat.glyph}
    </div>
  );
}

// ---- Étoiles de faveur (⭐⭐ = 3 pts, ⭐ = 2 pts) ---------------------------
function Stars({ level, size = 13, tone = 'var(--metal)' }) {
  return (
    <span style={{ display: 'inline-flex', gap: 1, color: tone, fontSize: size, lineHeight: 1 }}>
      {Array.from({ length: level }).map((_, i) => <span key={i}>★</span>)}
    </span>
  );
}

// Badge "catégorie favorite" : pastille + étoiles, utilisé dans le scoreboard.
function FavoriteChip({ cat, level, compact = false }) {
  return (
    <div title={`${cat.label} — ${level === 2 ? 3 : 2} points`} style={{
      display: 'flex', alignItems: 'center', gap: 5,
      padding: compact ? '2px 6px 2px 3px' : '3px 9px 3px 4px',
      borderRadius: 999,
      background: 'color-mix(in oklab, var(--card) 86%, transparent)',
      border: `1px solid color-mix(in oklab, ${cat.color} 45%, transparent)`,
    }}>
      <CatBadge cat={cat} size={compact ? 18 : 22} ring={false} />
      <Stars level={level} size={compact ? 10 : 12} tone="var(--metal-deep)" />
    </div>
  );
}

// ---- Bouton principal ------------------------------------------------------
function Button({ children, onClick, variant = 'primary', disabled = false, size = 'md', style = {} }) {
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
  const pad = size === 'lg' ? '20px 44px' : size === 'sm' ? '10px 20px' : '15px 32px';
  const fs = size === 'lg' ? 24 : size === 'sm' ? 15 : 19;
  const base = {
    primary: { bg: 'var(--ink)', fg: 'var(--paper)', bd: 'var(--ink)' },
    metal:   { bg: 'var(--metal)', fg: 'oklch(0.24 0.02 60)', bd: 'var(--metal-deep)' },
    ghost:   { bg: 'transparent', fg: 'var(--ink)', bd: 'color-mix(in oklab, var(--ink) 35%, transparent)' },
  }[variant];
  return (
    <button
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      disabled={disabled}
      style={{
        fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: fs,
        letterSpacing: 0.3, padding: pad, borderRadius: 999, whiteSpace: 'nowrap',
        cursor: disabled ? 'not-allowed' : 'pointer',
        background: base.bg, color: base.fg,
        border: `1.5px solid ${base.bd}`,
        opacity: disabled ? 0.4 : 1,
        boxShadow: variant === 'ghost' ? 'none'
          : press ? 'inset 0 2px 5px rgba(0,0,0,0.3)'
          : '0 6px 16px rgba(40,20,10,0.22), inset 0 1px 0 rgba(255,255,255,0.18)',
        transform: press ? 'translateY(1px)' : hover && !disabled ? 'translateY(-2px)' : 'none',
        transition: 'transform .12s, box-shadow .12s, background .2s',
        ...style,
      }}>
      {children}
    </button>
  );
}

Object.assign(window, { Flourish, Avatar, CatBadge, Stars, FavoriteChip, Button });

// ───────────────────────── screens-setup ─────────────────────────
// ============================================================
// screens-setup.jsx — Accueil · Nombre de joueurs · Noms · Catégories favorites
// ============================================================

// ---------- ACCUEIL ---------------------------------------------
function ScreenAccueil({ onStart }) {
  return (
    <div className="screen" style={{ display: 'grid', placeItems: 'center', height: '100%', padding: 40, position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 22, borderRadius: 18, border: '1.5px solid var(--metal)', opacity: 0.5, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 30, borderRadius: 14, border: '1px solid color-mix(in oklab, var(--ink) 22%, transparent)', pointerEvents: 'none' }} />

      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <div style={{ fontFamily: 'var(--font-body)', letterSpacing: 6, fontSize: 15, textTransform: 'uppercase', color: 'var(--metal-deep)', fontWeight: 600 }}>
          Jeu de plateau · Culture générale
        </div>
        <Flourish width={260} />
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 92, lineHeight: 1.0, margin: 0, color: 'var(--ink)', fontWeight: 400, letterSpacing: -1, whiteSpace: 'nowrap' }}>
          Le Grand Quiz
        </h1>
        <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 26, color: 'color-mix(in oklab, var(--ink) 72%, transparent)' }}>
          100 cases · 12 catégories · 8 par partie
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, auto)', gap: 12, marginTop: 12, justifyContent: 'center' }}>
          {CATEGORIES.map(c => <CatBadge key={c.id} cat={c} size={48} />)}
        </div>

        <div style={{ marginTop: 22 }}>
          <Button size="lg" onClick={onStart}>Commencer une partie</Button>
        </div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'color-mix(in oklab, var(--ink) 55%, transparent)', marginTop: 4 }}>
          2 à 4 joueurs · choisissez une case, répondez, marquez des points · 20 points pour gagner
        </div>
      </div>
    </div>
  );
}

// ---------- NOMBRE DE JOUEURS -----------------------------------
function ScreenCount({ onPick, onBack }) {
  const [hover, setHover] = useState(null);
  return (
    <div className="screen" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '48px 56px' }}>
      <SetupHeader step={1} title="Combien de joueurs ?" onBack={onBack} />
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 26, alignContent: 'center' }}>
        {[2, 3, 4].map(n => {
          const isHover = hover === n;
          return (
            <button key={n} onClick={() => onPick(n)}
              onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(null)}
              style={{
                position: 'relative', cursor: 'pointer',
                background: isHover
                  ? 'linear-gradient(165deg, color-mix(in oklab, var(--card) 92%, white), var(--card))'
                  : 'var(--card)',
                border: `2px solid ${isHover ? 'var(--metal)' : 'color-mix(in oklab, var(--ink) 12%, transparent)'}`,
                borderRadius: 20, padding: '46px 24px 40px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
                boxShadow: isHover ? '0 18px 44px rgba(40,20,10,0.20)' : '0 6px 18px rgba(40,20,10,0.09)',
                transform: isHover ? 'translateY(-6px)' : 'none', transition: 'all .2s',
              }}>
              {/* Filet doré intérieur */}
              <span style={{ position: 'absolute', inset: 10, borderRadius: 14, border: '1px solid color-mix(in oklab, var(--metal) 55%, transparent)', opacity: isHover ? 0.9 : 0.45, pointerEvents: 'none', transition: 'opacity .2s' }} />
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--metal-deep)', fontWeight: 600 }}>Table de</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 104, lineHeight: 0.9, color: 'var(--ink)', fontWeight: 500 }}>{n}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--metal)' }}>
                <span style={{ width: 26, height: 1, background: 'currentColor', opacity: 0.6 }} />
                <span style={{ display: 'flex', gap: 5 }}>
                  {Array.from({ length: n }).map((_, i) => (
                    <span key={i} style={{ width: 7, height: 7, transform: 'rotate(45deg)', background: 'currentColor', borderRadius: 1 }} />
                  ))}
                </span>
                <span style={{ width: 26, height: 1, background: 'currentColor', opacity: 0.6 }} />
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 17, letterSpacing: 1, color: 'color-mix(in oklab, var(--ink) 62%, transparent)' }}>joueurs</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ---------- NOMS & COULEURS -------------------------------------
function ScreenNames({ count, players, setPlayers, onStart, onBack }) {
  function setName(i, name) {
    setPlayers(prev => prev.map((p, idx) => idx === i ? { ...p, name } : p));
  }
  function setLevel(i, level) {
    setPlayers(prev => prev.map((p, idx) => idx === i ? { ...p, level } : p));
  }
  function cycleColor(i) {
    setPlayers(prev => {
      const taken = prev.filter((_, idx) => idx !== i).map(p => p.colorId);
      const cur = PLAYER_COLORS.findIndex(c => c.id === prev[i].colorId);
      for (let k = 1; k <= PLAYER_COLORS.length; k++) {
        const cand = PLAYER_COLORS[(cur + k) % PLAYER_COLORS.length];
        if (!taken.includes(cand.id)) {
          return prev.map((p, idx) => idx === i ? { ...p, colorId: cand.id, color: cand.color } : p);
        }
      }
      return prev;
    });
  }

  return (
    <div className="screen" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '44px 56px' }}>
      <SetupHeader step={2} title="Vos noms et vos couleurs" onBack={onBack} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'center', maxWidth: 720, width: '100%', margin: '0 auto' }}>
        {players.map((p, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 18,
            background: 'var(--card)', borderRadius: 16, padding: '14px 20px',
            border: '1.5px solid color-mix(in oklab, var(--ink) 12%, transparent)',
            boxShadow: '0 4px 14px rgba(40,20,10,0.08)',
          }}>
            <button onClick={() => cycleColor(i)} title="Changer de couleur"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, position: 'relative' }}>
              <Avatar player={p} size={56} />
              <span style={{
                position: 'absolute', bottom: -4, right: -4, width: 22, height: 22, borderRadius: '50%',
                background: 'var(--paper)', border: '1px solid var(--metal)', display: 'grid', placeItems: 'center',
                fontSize: 12, color: 'var(--metal-deep)',
              }}>⟳</span>
            </button>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label style={{ fontFamily: 'var(--font-body)', fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', color: 'color-mix(in oklab, var(--ink) 55%, transparent)' }}>
                Joueur {i + 1}
              </label>
              <input value={p.name} onChange={e => setName(i, e.target.value.slice(0, 14))} placeholder={`Joueur ${i + 1}`}
                style={{
                  fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--ink)',
                  background: 'transparent', border: 'none', outline: 'none',
                  borderBottom: '2px solid color-mix(in oklab, var(--ink) 18%, transparent)',
                  padding: '2px 0', width: '100%',
                }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, letterSpacing: 1, textTransform: 'uppercase', color: 'color-mix(in oklab, var(--ink) 50%, transparent)' }}>
                {PLAYER_COLORS.find(c => c.id === p.colorId)?.label}
              </div>
              <div style={{ display: 'flex', gap: 0, background: 'color-mix(in oklab, var(--ink) 8%, transparent)', borderRadius: 999, padding: 3 }}>
                {[['debutant', 'Initié'], ['expert', 'Expert']].map(([val, lab]) => {
                  const on = (p.level || 'debutant') === val;
                  return (
                    <button key={val} onClick={() => setLevel(i, val)} title={val === 'debutant' ? 'Initié — questions accessibles' : 'Expert — questions relevées'} style={{
                      fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                      padding: '7px 13px', borderRadius: 999, border: 'none', whiteSpace: 'nowrap',
                      background: on ? 'var(--ink)' : 'transparent',
                      color: on ? 'var(--paper)' : 'color-mix(in oklab, var(--ink) 60%, transparent)',
                      boxShadow: on ? '0 2px 6px rgba(40,20,10,0.2)' : 'none', transition: 'all .15s',
                    }}>{lab}</button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
        <Button size="lg" onClick={onStart}>Catégories favorites →</Button>
      </div>
    </div>
  );
}

// ---------- CATÉGORIES FAVORITES (⭐⭐ et ⭐) ---------------------
function ScreenStars({ players, setPlayers, onStart, onBack, cats }) {
  const pool = (cats && cats.length) ? cats : CATEGORIES.slice(0, BOARD_CATS);
  const [idx, setIdx] = useState(0);
  const [active, setActive] = useState('star2'); // quel emplacement on remplit
  const p = players[idx];
  const ready = p.star2 && p.star1;
  const isLast = idx === players.length - 1;

  function assign(catId) {
    setPlayers(prev => prev.map((pl, i) => {
      if (i !== idx) return pl;
      let { star2, star1 } = pl;
      if (active === 'star2') { if (star1 === catId) star1 = null; star2 = catId; }
      else { if (star2 === catId) star2 = null; star1 = catId; }
      return { ...pl, star2, star1 };
    }));
    // bascule vers l'autre emplacement s'il est encore vide
    setActive(active === 'star2' ? (p.star1 ? 'star2' : 'star1') : (p.star2 ? 'star1' : 'star2'));
  }

  function goNext() {
    if (!ready) return;
    if (isLast) { onStart(); }
    else { setIdx(idx + 1); setActive('star2'); }
  }
  function goPrev() {
    if (idx === 0) { onBack(); }
    else { setIdx(idx - 1); setActive('star2'); }
  }

  const Slot = ({ slot, level, label }) => {
    const catId = slot === 'star2' ? p.star2 : p.star1;
    const cat = catId ? CAT_BY_ID[catId] : null;
    const on = active === slot;
    return (
      <button onClick={() => setActive(slot)} style={{
        flex: 1, display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left',
        background: 'var(--card)', cursor: 'pointer',
        border: `2px solid ${on ? 'var(--metal)' : 'color-mix(in oklab, var(--ink) 14%, transparent)'}`,
        borderRadius: 16, padding: '14px 18px',
        boxShadow: on ? '0 10px 26px rgba(40,20,10,0.16)' : '0 3px 10px rgba(40,20,10,0.07)',
        transition: 'all .18s',
      }}>
        {cat
          ? <CatBadge cat={cat} size={48} />
          : <div style={{ width: 48, height: 48, borderRadius: '50%', flexShrink: 0, border: '2px dashed color-mix(in oklab, var(--ink) 28%, transparent)', display: 'grid', placeItems: 'center', color: 'color-mix(in oklab, var(--ink) 35%, transparent)', fontSize: 22 }}>?</div>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>
            <Stars level={level} size={16} tone="var(--metal-deep)" />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700, color: 'var(--metal-deep)' }}>{level === 2 ? '3 points' : '2 points'}</span>
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: cat ? 'var(--ink)' : 'color-mix(in oklab, var(--ink) 45%, transparent)', whiteSpace: 'nowrap' }}>
            {cat ? cat.label : label}
          </div>
        </div>
      </button>
    );
  };

  return (
    <div className="screen" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '34px 56px 28px' }}>
      <SetupHeader step={4} title="Catégories favorites" onBack={goPrev} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, margin: '4px 0 14px' }}>
        <Avatar player={p} size={44} active />
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 30, color: 'var(--ink)', whiteSpace: 'nowrap' }}>{p.name || `Joueur ${idx + 1}`}</div>
        <div style={{ display: 'flex', gap: 6, marginLeft: 8 }}>
          {players.map((_, i) => (
            <span key={i} style={{ width: i === idx ? 22 : 9, height: 9, borderRadius: 999, background: i === idx ? 'var(--metal)' : 'color-mix(in oklab, var(--ink) 20%, transparent)', transition: 'all .2s' }} />
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, maxWidth: 760, width: '100%', margin: '0 auto 6px' }}>
        <Slot slot="star2" level={2} label="Catégorie préférée" />
        <Slot slot="star1" level={1} label="Seconde préférée" />
      </div>
      <div style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: 14, color: 'color-mix(in oklab, var(--ink) 58%, transparent)', margin: '4px 0 12px' }}>
        Touchez un emplacement, puis choisissez une catégorie ci-dessous.
      </div>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, maxWidth: 760, width: '100%', margin: '0 auto', alignContent: 'center' }}>
        {pool.map(c => {
          const picked = p.star2 === c.id ? 2 : p.star1 === c.id ? 1 : 0;
          return (
            <button key={c.id} onClick={() => assign(c.id)} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer',
              background: picked ? 'color-mix(in oklab, ' + c.color + ' 14%, var(--card))' : 'var(--card)',
              border: `2px solid ${picked ? c.color : 'color-mix(in oklab, var(--ink) 12%, transparent)'}`,
              borderRadius: 14, padding: '14px 8px 11px', position: 'relative', transition: 'all .15s',
            }}>
              <CatBadge cat={c} size={40} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{c.label}</span>
              {picked > 0 && (
                <span style={{ position: 'absolute', top: 7, right: 8 }}><Stars level={picked} size={12} tone="var(--metal-deep)" /></span>
              )}
            </button>
          );
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 14 }}>
        <Button size="lg" onClick={goNext} disabled={!ready}>
          {isLast ? 'Lancer la partie →' : 'Joueur suivant →'}
        </Button>
      </div>
    </div>
  );
}

// ---------- CHOIX DES 8 CATÉGORIES (parmi 12) ------------------
function ScreenCategories({ selected, setSelected, onStart, onBack }) {
  const full = selected.length === BOARD_CATS;
  function toggle(id) {
    setSelected(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= BOARD_CATS) return prev;  // plafond à 8
      return [...prev, id];
    });
  }
  return (
    <div className="screen" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '34px 56px 28px' }}>
      <SetupHeader step={3} title="Les catégories de la partie" onBack={onBack} />

      <div style={{ textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: 15, color: 'color-mix(in oklab, var(--ink) 62%, transparent)', margin: '2px 0 14px' }}>
        Choisissez <strong>{BOARD_CATS} catégories</strong> parmi les {CATEGORIES.length}. Seules celles-ci apparaîtront sur le plateau.
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, margin: '0 0 14px' }}>
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: 22,
          color: full ? 'var(--metal-deep)' : 'var(--ink)',
        }}>{selected.length}/{BOARD_CATS}</span>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', color: 'color-mix(in oklab, var(--ink) 50%, transparent)' }}>
          {full ? 'sélection complète' : 'catégories choisies'}
        </span>
      </div>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, maxWidth: 820, width: '100%', margin: '0 auto', alignContent: 'center' }}>
        {CATEGORIES.map(c => {
          const on = selected.includes(c.id);
          const locked = !on && selected.length >= BOARD_CATS;
          return (
            <button key={c.id} onClick={() => toggle(c.id)} disabled={locked} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              cursor: locked ? 'default' : 'pointer',
              background: on ? 'color-mix(in oklab, ' + c.color + ' 16%, var(--card))' : 'var(--card)',
              border: `2px solid ${on ? c.color : 'color-mix(in oklab, var(--ink) 12%, transparent)'}`,
              borderRadius: 14, padding: '14px 8px 11px', position: 'relative',
              opacity: locked ? 0.4 : 1, transition: 'all .15s',
            }}>
              <CatBadge cat={c} size={40} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{c.label}</span>
              {on && (
                <span style={{
                  position: 'absolute', top: 7, right: 8, width: 20, height: 20, borderRadius: '50%',
                  background: c.color, color: '#fff', display: 'grid', placeItems: 'center',
                  fontSize: 12, fontWeight: 700, boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                }}>✓</span>
              )}
            </button>
          );
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 14 }}>
        <Button size="lg" onClick={onStart} disabled={!full}>Catégories favorites →</Button>
      </div>
    </div>
  );
}

// ---------- En-tête commun des écrans de configuration ----------
function SetupHeader({ step, title, onBack }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 8 }}>
      <button onClick={onBack} style={{
        fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--ink)',
        background: 'var(--card)', border: '1.5px solid color-mix(in oklab, var(--ink) 18%, transparent)',
        borderRadius: 999, padding: '8px 16px', cursor: 'pointer',
      }}>← Retour</button>
      <div style={{ flex: 1, textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--metal-deep)', fontWeight: 600 }}>
          Étape {step} sur 4
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, margin: '2px 0 0', color: 'var(--ink)', fontWeight: 400 }}>{title}</h2>
      </div>
      <div style={{ width: 96 }} />
    </div>
  );
}

Object.assign(window, { ScreenAccueil, ScreenCount, ScreenNames, ScreenCategories, ScreenStars });

// ───────────────────────── screens-game ─────────────────────────
// ============================================================
// screens-game.jsx — Plateau 100 cases · Révélation · Question · Classement
// ============================================================

// Points en jeu selon la catégorie et les faveurs du joueur.
function stakeFor(player, catId) {
  if (player.star2 === catId) return 3;
  if (player.star1 === catId) return 2;
  return 1;
}

// ---------- BANDEAU DES SCORES ----------------------------------
function Scoreboard({ players, current, target }) {
  return (
    <div style={{ display: 'flex', gap: 12, padding: '12px 22px 6px', justifyContent: 'center', alignItems: 'stretch' }}>
      {players.map((p, i) => {
        const active = i === current;
        const fav2 = CAT_BY_ID[p.star2], fav1 = CAT_BY_ID[p.star1];
        return (
          <div key={i} style={{
            flex: '1 1 0', maxWidth: 300, minWidth: 0,
            display: 'flex', alignItems: 'center', gap: 12,
            background: active ? 'var(--card)' : 'color-mix(in oklab, var(--card) 65%, transparent)',
            borderRadius: 14, padding: '8px 14px 8px 9px',
            border: active ? '2px solid var(--metal)' : '2px solid transparent',
            boxShadow: active ? '0 8px 22px rgba(40,20,10,0.18)' : 'none',
            opacity: active ? 1 : 0.8, transition: 'all .25s',
          }}>
            <Avatar player={p} size={42} active={active} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, minWidth: 0, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--ink)', whiteSpace: 'nowrap' }}>
                  {p.name || `Joueur ${i + 1}`}
                </span>
                {active && <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--metal-deep)', fontWeight: 700, whiteSpace: 'nowrap' }}>à vous</span>}
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                {fav2 && <FavoriteChip cat={fav2} level={2} compact />}
                {fav1 && <FavoriteChip cat={fav1} level={1} compact />}
              </div>
            </div>
            <div style={{ textAlign: 'right', lineHeight: 1 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 34, color: 'var(--ink)' }}>{p.score}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'color-mix(in oklab, var(--ink) 50%, transparent)' }}>/ {target}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ---------- PLATEAU 10×10 ---------------------------------------
function ScreenBoard({ players, current, board, played, target, canPlay, onPick, peek, discoverLeft }) {
  const cur = players[current];
  const remaining = board.length - Object.keys(played).length;

  return (
    <div className="screen" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Scoreboard players={players} current={current} target={target} />

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 30, padding: '0 26px 18px' }}>
        {/* Plateau feutrine */}
        <div style={{
          width: 624, height: 624, flexShrink: 0, position: 'relative',
          borderRadius: 18, padding: 24,
          background: 'linear-gradient(160deg, color-mix(in oklab, var(--metal) 55%, #2a1c0e), color-mix(in oklab, var(--metal-deep) 60%, #1c1206))',
          boxShadow: '0 26px 64px rgba(20,12,4,0.45), inset 0 1px 0 rgba(255,255,255,0.35)',
          border: '2px solid color-mix(in oklab, var(--metal-deep) 70%, black)',
        }}>
          <div style={{
            width: '100%', height: '100%', borderRadius: 8, padding: 10,
            background: 'radial-gradient(130% 130% at 50% 20%, oklch(0.44 0.078 154), oklch(0.345 0.07 156))',
            boxShadow: 'inset 0 3px 18px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(0,0,0,0.3)',
            display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gridTemplateRows: 'repeat(10, 1fr)', gap: 5,
          }}>
            {board.map((cell, i) => (
              <BoardCell key={i} cell={cell} revealed={!!played[i]} peek={peek} canPlay={canPlay} onPick={() => onPick(i)} />
            ))}
          </div>
        </div>

        {/* Panneau latéral : découverte ou tour en cours */}
        <div style={{ width: 286, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {peek ? (
            <div style={{
              background: 'var(--card)', borderRadius: 18, padding: '26px 22px 28px',
              border: '2px solid var(--metal)', boxShadow: '0 14px 36px rgba(40,20,10,0.18)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center',
            }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--metal-deep)', fontWeight: 700 }}>Découverte</div>
              <div style={{
                width: 110, height: 110, borderRadius: '50%', display: 'grid', placeItems: 'center',
                background: 'radial-gradient(circle at 38% 32%, color-mix(in oklab, var(--metal) 55%, var(--card)), var(--card))',
                border: '2px solid var(--metal)', boxShadow: 'inset 0 2px 8px rgba(255,255,255,0.5), 0 8px 20px rgba(40,20,10,0.18)',
                fontFamily: 'var(--font-display)', fontSize: 56, color: 'var(--ink)',
              }}>{discoverLeft}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 20, color: 'color-mix(in oklab, var(--ink) 72%, transparent)', textWrap: 'pretty' }}>
                Mémorisez la place de vos catégories favorites…
              </div>
            </div>
          ) : (
          <div style={{
            background: 'var(--card)', borderRadius: 18, padding: '22px 22px 24px',
            border: '2px solid var(--metal)', boxShadow: '0 14px 36px rgba(40,20,10,0.18)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center',
          }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--metal-deep)', fontWeight: 700 }}>Au tour de</div>
            <Avatar player={cur} size={64} active />
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 30, color: 'var(--ink)', lineHeight: 1.05, whiteSpace: 'nowrap' }}>{cur.name || `Joueur ${current + 1}`}</div>
            <Flourish width={180} />
            <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 19, color: 'color-mix(in oklab, var(--ink) 70%, transparent)', textWrap: 'pretty' }}>
              Choisissez une case sur le plateau.
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 2 }}>
              {cur.star2 && <FavoriteChip cat={CAT_BY_ID[cur.star2]} level={2} />}
              {cur.star1 && <FavoriteChip cat={CAT_BY_ID[cur.star1]} level={1} />}
            </div>
          </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 6px', fontFamily: 'var(--font-body)', fontSize: 13, color: 'color-mix(in oklab, var(--ink) 60%, transparent)' }}>
            <span>{remaining} cases restantes</span>
            <span>★ Joker = catégorie au choix</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function BoardCell({ cell, revealed, peek, canPlay, onPick }) {
  const [hover, setHover] = useState(false);
  const cat = cell.type === 'cat' ? CAT_BY_ID[cell.category] : null;
  const clickable = !revealed && !peek && canPlay;
  const showFace = revealed || peek;

  if (showFace) {
    const joker = cell.type === 'joker';
    return (
      <div style={{
        position: 'relative', borderRadius: 6, display: 'grid', placeItems: 'center',
        background: joker
          ? 'radial-gradient(circle at 50% 35%, oklch(0.86 0.10 88), var(--metal) 55%, var(--metal-deep))'
          : cat.color,
        color: joker ? 'oklch(0.30 0.04 60)' : 'oklch(0.97 0.02 90)',
        border: '1px solid rgba(0,0,0,0.28)',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.32), inset 0 -1px 2px rgba(255,255,255,0.12)',
        fontSize: 'clamp(16px, 2.4vw, 26px)',
        animation: peek && !revealed ? 'pop .35s cubic-bezier(.2,1.2,.5,1)' : 'none',
      }}>
        <span style={{ filter: 'drop-shadow(0 1px 1.5px rgba(0,0,0,0.45))' }}>{joker ? '★' : cat.glyph}</span>
        <span style={{ position: 'absolute', bottom: 2, right: 4, fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: 'oklch(0.98 0.01 90)', textShadow: '0 0 2px rgba(0,0,0,0.9), 0 1px 2px rgba(0,0,0,0.65)' }}>{cell.number}</span>
      </div>
    );
  }

  return (
    <button
      onClick={clickable ? onPick : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      disabled={!clickable}
      style={{
        appearance: 'none', borderRadius: 6, position: 'relative', padding: 0,
        cursor: clickable ? 'pointer' : 'default',
        background: 'linear-gradient(158deg, oklch(0.475 0.082 153), oklch(0.40 0.075 156))',
        border: hover && clickable ? '1px solid var(--metal)' : '1px solid rgba(0,0,0,0.22)',
        boxShadow: hover && clickable
          ? 'inset 0 1px 0 rgba(255,255,255,0.18), 0 0 0 2px color-mix(in oklab, var(--metal) 55%, transparent), 0 6px 14px rgba(0,0,0,0.35)'
          : 'inset 0 1px 0 rgba(255,255,255,0.14), inset 0 -2px 4px rgba(0,0,0,0.22)',
        transform: hover && clickable ? 'translateY(-2px)' : 'none',
        transition: 'transform .12s, box-shadow .12s, border-color .12s',
        display: 'grid', placeItems: 'center',
      }}>
      <span style={{
        fontFamily: 'var(--font-display)', fontWeight: 600,
        fontSize: 'clamp(16px, 2.3vw, 25px)',
        color: hover && clickable ? 'oklch(0.90 0.11 88)' : 'var(--metal)',
        textShadow: '0 1px 1px rgba(0,0,0,0.45), 0 0 6px rgba(0,0,0,0.25)',
        transition: 'color .12s',
      }}>{cell.number}</span>
    </button>
  );
}

// ---------- RÉVÉLATION DE LA CATÉGORIE (≈3 s de suspense) -------
function RevealOverlay({ cat, player, stake, delayMs }) {
  return (
    <div className="screen" style={{
      position: 'absolute', inset: 0, zIndex: 50, padding: 40,
      background: 'color-mix(in oklab, oklch(0.18 0.02 60) 78%, transparent)',
      display: 'grid', placeItems: 'center',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--metal)', fontWeight: 700 }}>
          Catégorie révélée
        </div>
        <div style={{
          width: 132, height: 132, borderRadius: '50%', display: 'grid', placeItems: 'center',
          background: cat.color, color: 'oklch(0.98 0.02 90)', fontSize: 66,
          border: '3px solid var(--metal)',
          boxShadow: 'inset 0 2px 8px rgba(255,255,255,0.3), inset 0 -4px 12px rgba(0,0,0,0.3), 0 14px 40px rgba(0,0,0,0.4)',
          animation: 'pop .4s cubic-bezier(.2,1.3,.5,1)',
        }}>{cat.glyph}</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 54, color: 'oklch(0.97 0.02 90)', lineHeight: 1 }}>{cat.label}</div>

        {stake > 1 && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '8px 18px', borderRadius: 999,
            background: 'color-mix(in oklab, var(--metal) 24%, transparent)', border: '1.5px solid var(--metal)',
          }}>
            <Stars level={stake === 3 ? 2 : 1} size={16} tone="var(--metal)" />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 16, fontWeight: 600, color: 'oklch(0.95 0.03 88)' }}>
              Votre catégorie favorite · {stake} points en jeu
            </span>
          </div>
        )}

        <div style={{ width: 320, height: 5, borderRadius: 999, background: 'rgba(255,255,255,0.18)', overflow: 'hidden', marginTop: 6 }}>
          <div style={{ height: '100%', background: 'var(--metal)', borderRadius: 999, transformOrigin: 'left', animation: `grow ${delayMs}ms linear forwards` }} />
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 20, color: 'oklch(0.9 0.02 88)', opacity: 0.85 }}>
          La question se prépare…
        </div>
      </div>
    </div>
  );
}

// ---------- JOKER : choix de la catégorie -----------------------
function JokerChooser({ player, onPick }) {
  return (
    <div className="screen" style={{
      position: 'absolute', inset: 0, zIndex: 50, padding: 40,
      background: 'color-mix(in oklab, oklch(0.18 0.02 60) 80%, transparent)',
      display: 'grid', placeItems: 'center',
    }}>
      <div style={{
        width: 720, maxWidth: '100%', background: 'var(--card)', borderRadius: 22, padding: '28px 32px 32px',
        border: '3px solid var(--metal)', boxShadow: '0 30px 70px rgba(20,10,5,0.45)', textAlign: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <span style={{ fontSize: 30, color: 'var(--metal-deep)' }}>★</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 42, margin: 0, color: 'var(--ink)', fontWeight: 400 }}>Case Joker</h2>
          <span style={{ fontSize: 30, color: 'var(--metal-deep)' }}>★</span>
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 21, color: 'color-mix(in oklab, var(--ink) 70%, transparent)', marginTop: 4 }}>
          {player.name || 'Joueur'}, choisissez votre catégorie — astuce : visez vos favorites !
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginTop: 22 }}>
          {CATEGORIES.map(c => {
            const lvl = player.star2 === c.id ? 2 : player.star1 === c.id ? 1 : 0;
            return (
              <button key={c.id} onClick={() => onPick(c.id)} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer',
                background: lvl ? 'color-mix(in oklab, ' + c.color + ' 14%, var(--paper))' : 'var(--paper)',
                border: `2px solid ${lvl ? c.color : 'color-mix(in oklab, var(--ink) 12%, transparent)'}`,
                borderRadius: 14, padding: '14px 8px 11px', position: 'relative', transition: 'all .15s',
              }}>
                <CatBadge cat={c} size={40} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{c.label}</span>
                {lvl > 0 && <span style={{ position: 'absolute', top: 7, right: 8 }}><Stars level={lvl} size={11} tone="var(--metal-deep)" /></span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ---------- QUESTION --------------------------------------------
function ScreenQuestion({ cat, question, player, stake, onAnswer, timeLimit = 30, duel = false }) {
  const [picked, setPicked] = useState(null);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const revealed = picked !== null;
  const timedOut = picked === -1;
  const correct = revealed && picked === question.correct;
  const gained = correct ? stake : 0;

  useEffect(() => {
    if (revealed) return;
    const id = setInterval(() => {
      setTimeLeft(s => {
        if (s <= 1) { clearInterval(id); setPicked(-1); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [revealed]);

  const frac = Math.max(0, timeLeft / timeLimit);
  const low = timeLeft <= 10;
  const barColor = low ? 'oklch(0.62 0.18 25)' : 'oklch(0.97 0.02 90)';

  return (
    <div className="screen" style={{
      position: 'absolute', inset: 0, zIndex: 50,
      background: 'color-mix(in oklab, var(--ink) 55%, transparent)',
      display: 'grid', placeItems: 'center', padding: 40,
    }}>
      <div style={{
        width: 880, maxWidth: '100%', background: 'var(--card)', borderRadius: 22,
        border: `3px solid ${cat.color}`, overflow: 'hidden', boxShadow: '0 30px 70px rgba(20,10,5,0.45)',
      }}>
        <div style={{ background: cat.color, padding: '15px 28px', display: 'flex', alignItems: 'center', gap: 14, color: 'oklch(0.98 0.02 90)' }}>
          <span style={{ fontSize: 26 }}>{cat.glyph}</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 28, letterSpacing: 0.5, whiteSpace: 'nowrap' }}>{cat.label}</span>
          <span style={{ flex: 1 }} />
          {/* Décompte */}
          <span style={{
            display: 'flex', alignItems: 'center', gap: 7, padding: '5px 13px 5px 9px', borderRadius: 999,
            background: revealed ? 'rgba(255,255,255,0.14)' : low ? 'rgba(0,0,0,0.28)' : 'rgba(255,255,255,0.18)',
            fontFamily: 'var(--font-body)', fontSize: 16, fontWeight: 700, whiteSpace: 'nowrap',
            transition: 'background .3s',
          }}>
            <span style={{ fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', opacity: 0.85, fontWeight: 700 }}>Temps</span>
            {revealed ? '—' : `${timeLeft}\u00a0s`}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 12px', borderRadius: 999, background: 'rgba(255,255,255,0.18)', fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600, whiteSpace: 'nowrap' }}>
            {duel
              ? <>{'\u2605'} Duel {'\u00b7'} {player.name || 'Joueur'}</>
              : <>{stake > 1 && <Stars level={stake === 3 ? 2 : 1} size={13} tone="oklch(0.97 0.02 90)" />}{stake} {stake > 1 ? 'points en jeu' : 'point en jeu'}</>}
          </span>
        </div>

        {/* Barre de temps */}
        <div style={{ height: 5, background: 'color-mix(in oklab, var(--ink) 12%, transparent)' }}>
          <div style={{ height: '100%', width: `${frac * 100}%`, background: revealed ? 'color-mix(in oklab, var(--ink) 20%, transparent)' : barColor, transition: 'width 1s linear, background .3s' }} />
        </div>

        <div style={{ padding: '28px 36px 32px' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, lineHeight: 1.2, color: 'var(--ink)', textWrap: 'pretty', minHeight: 76 }}>
            {question.q}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 22 }}>
            {question.a.map((ans, i) => {
              const isCorrect = i === question.correct;
              const isPicked = i === picked;
              let bg = 'var(--paper)', bd = 'color-mix(in oklab, var(--ink) 16%, transparent)', fg = 'var(--ink)';
              if (revealed) {
                if (isCorrect) { bg = 'oklch(0.62 0.13 150)'; bd = 'oklch(0.5 0.13 150)'; fg = 'white'; }
                else if (isPicked) { bg = 'oklch(0.58 0.16 25)'; bd = 'oklch(0.48 0.16 25)'; fg = 'white'; }
                else { fg = 'color-mix(in oklab, var(--ink) 45%, transparent)'; }
              }
              return (
                <button key={i} onClick={() => { if (!revealed) setPicked(i); }} disabled={revealed}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left',
                    background: bg, border: `2px solid ${bd}`, borderRadius: 14,
                    padding: '15px 18px', cursor: revealed ? 'default' : 'pointer',
                    fontFamily: 'var(--font-body)', fontSize: 19, color: fg,
                    transition: 'all .2s', boxShadow: revealed ? 'none' : '0 3px 10px rgba(40,20,10,0.08)',
                  }}>
                  <span style={{
                    width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                    display: 'grid', placeItems: 'center', fontFamily: 'var(--font-display)', fontSize: 16,
                    background: revealed ? 'rgba(255,255,255,0.25)' : cat.soft,
                    color: revealed ? 'inherit' : cat.color,
                  }}>{['A', 'B', 'C', 'D'][i]}</span>
                  <span style={{ flex: 1 }}>{ans}</span>
                  {revealed && isCorrect && <span style={{ fontSize: 20 }}>✓</span>}
                  {revealed && isPicked && !isCorrect && <span style={{ fontSize: 20 }}>✗</span>}
                </button>
              );
            })}
          </div>

          {revealed && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 24, gap: 16 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 23, color: correct ? 'oklch(0.5 0.12 150)' : 'oklch(0.5 0.15 25)' }}>
                {duel
                  ? (correct ? `Bonne réponse, ${player.name || 'bravo'} !` : timedOut ? 'Temps écoulé !' : 'Raté !')
                  : correct
                    ? `Bravo ! +${gained} ${gained > 1 ? 'points' : 'point'} pour ${player.name || 'vous'}.`
                    : timedOut ? 'Temps écoulé ! 0 point.' : 'Dommage… 0 point cette fois.'}
              </div>
              <Button onClick={() => onAnswer(correct)}>Continuer →</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------- CLASSEMENT / VICTOIRE -------------------------------
function ScreenVictory({ players, winner, target, reachedTarget, onReplay, onHome }) {
  const ranked = [...players].sort((a, b) => b.score - a.score);
  return (
    <div className="screen" style={{ display: 'grid', placeItems: 'center', height: '100%', padding: 40, position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 24, borderRadius: 18, border: '1.5px solid var(--metal)', opacity: 0.5, pointerEvents: 'none' }} />
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <div style={{ fontFamily: 'var(--font-body)', letterSpacing: 5, fontSize: 14, textTransform: 'uppercase', color: 'var(--metal-deep)', fontWeight: 700 }}>
          {reachedTarget ? `Objectif ${target} points atteint` : 'Plateau terminé'}
        </div>
        <div style={{
          width: 84, height: 84, borderRadius: '50%', display: 'grid', placeItems: 'center',
          background: 'radial-gradient(circle at 38% 32%, oklch(0.88 0.10 88), var(--metal) 60%, var(--metal-deep))',
          border: '2px solid var(--metal-deep)', color: 'oklch(0.30 0.04 60)', fontSize: 38,
          boxShadow: 'inset 0 2px 6px rgba(255,255,255,0.5), inset 0 -3px 8px rgba(0,0,0,0.25), 0 8px 20px rgba(40,20,10,0.25)',
        }}>★</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 56, margin: 0, color: 'var(--ink)', fontWeight: 400, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 18 }}>
          <Avatar player={winner} size={54} active />
          {winner.name || 'Le gagnant'} l'emporte&nbsp;!
        </h1>
        <Flourish width={300} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8, width: 560, maxWidth: '100%' }}>
          {ranked.map((p, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              background: 'var(--card)', borderRadius: 14, padding: '11px 18px',
              border: i === 0 ? '2px solid var(--metal)' : '1.5px solid color-mix(in oklab, var(--ink) 10%, transparent)',
            }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--metal-deep)', width: 26 }}>{i + 1}</span>
              <Avatar player={p} size={40} />
              <span style={{ flex: 1, textAlign: 'left', fontFamily: 'var(--font-display)', fontSize: 23, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name || 'Joueur'}</span>
              <div style={{ display: 'flex', gap: 6 }}>
                {p.star2 && <FavoriteChip cat={CAT_BY_ID[p.star2]} level={2} compact />}
                {p.star1 && <FavoriteChip cat={CAT_BY_ID[p.star1]} level={1} compact />}
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 30, color: 'var(--ink)', minWidth: 44, textAlign: 'right' }}>{p.score}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 14, marginTop: 18 }}>
          <Button variant="ghost" onClick={onHome}>Accueil</Button>
          <Button onClick={onReplay}>Rejouer</Button>
        </div>
      </div>
    </div>
  );
}

// ---------- DÉCOUVERTE DU PLATEAU (prompt + décompte 10 s) ------
function DiscoveryOverlay({ players, onReveal, durationS, cats }) {
  const legend = (cats && cats.length) ? cats : CATEGORIES.slice(0, BOARD_CATS);
  return (
    <div className="screen" style={{
      position: 'absolute', inset: 0, zIndex: 50, padding: 40,
      background: 'color-mix(in oklab, oklch(0.18 0.02 60) 72%, transparent)',
      display: 'grid', placeItems: 'center',
    }}>
      <div style={{
        width: 560, maxWidth: '100%', background: 'var(--card)', borderRadius: 22, padding: '34px 38px 36px',
        border: '3px solid var(--metal)', boxShadow: '0 30px 70px rgba(20,10,5,0.45)', textAlign: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
      }}>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, letterSpacing: 4, textTransform: 'uppercase', color: 'var(--metal-deep)', fontWeight: 700 }}>
          Avant de commencer
        </div>
        <div style={{
          width: 76, height: 76, borderRadius: '50%', display: 'grid', placeItems: 'center',
          background: 'radial-gradient(circle at 38% 32%, oklch(0.88 0.10 88), var(--metal) 60%, var(--metal-deep))',
          border: '2px solid var(--metal-deep)', color: 'oklch(0.30 0.04 60)', fontSize: 34,
          boxShadow: 'inset 0 2px 6px rgba(255,255,255,0.5), 0 8px 20px rgba(40,20,10,0.25)',
        }}>◉</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 42, margin: 0, color: 'var(--ink)', fontWeight: 400, lineHeight: 1.05 }}>Découverte du plateau</h2>
        <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 21, color: 'color-mix(in oklab, var(--ink) 72%, transparent)', textWrap: 'pretty' }}>
          Tout le plateau se dévoile pendant {durationS} secondes. Observez bien — repérez surtout où se cachent vos catégories favorites&nbsp;!
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', color: 'var(--metal)', margin: '2px 0' }}>
          <span style={{ flex: 1, height: 1, background: 'currentColor', opacity: 0.45 }} />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--metal-deep)', fontWeight: 700 }}>Les 8 catégories</span>
          <span style={{ flex: 1, height: 1, background: 'currentColor', opacity: 0.45 }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px 18px', width: '100%' }}>
          {legend.map(c => (
            <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <CatBadge cat={c} size={28} />
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>{c.label}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12 }}>
          <Button size="lg" onClick={onReveal}>Dévoiler le plateau</Button>
        </div>
      </div>
    </div>
  );
}

function DiscoveryCountdown({ secondsLeft }) {
  return (
    <div className="screen" style={{ position: 'absolute', left: 0, right: 0, top: 18, zIndex: 60, display: 'grid', placeItems: 'center', pointerEvents: 'none' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 14, padding: '10px 22px', borderRadius: 999,
        background: 'color-mix(in oklab, oklch(0.20 0.02 60) 84%, transparent)', border: '1.5px solid var(--metal)',
        boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
      }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--metal)', fontWeight: 700 }}>Mémorisez</span>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 30, color: 'oklch(0.97 0.02 90)', minWidth: 30, textAlign: 'center' }}>{secondsLeft}</span>
      </div>
    </div>
  );
}

Object.assign(window, { stakeFor, ScreenBoard, RevealOverlay, JokerChooser, ScreenQuestion, ScreenVictory, DiscoveryOverlay, DiscoveryCountdown });

// ───────────────────────── App + logique de jeu ─────────────────────────
// Mise à l'échelle du cadre fixe 1280×800
function fitStage() {
  const frame = document.getElementById('frame');
  if (!frame) return;
  const s = Math.min(window.innerWidth / 1280, window.innerHeight / 800);
  frame.style.transform = `translate(-50%, -50%) scale(${s})`;
}
window.addEventListener('resize', fitStage);
window.addEventListener('orientationchange', fitStage);

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "patrimoine",
  "winScore": 20,
  "revealDelay": 3,
  "questionTime": 30,
  "discoveryTime": 10,
  "replayOnCorrect": false
}/*EDITMODE-END*/;

const THEME_MAP = { patrimoine: '', nuit: 'nuit' };

// Une question déjà posée ne peut pas revenir avant ce délai (1 heure).
const NO_REPEAT_MS = 60 * 60 * 1000;

function loadUsed() {
  try {
    if (typeof localStorage === 'undefined') return {};
    const raw = localStorage.getItem('gq_recent_questions');
    return raw ? JSON.parse(raw) : {};
  } catch (e) { return {}; }
}
function saveUsed(map) {
  try {
    if (typeof localStorage !== 'undefined') localStorage.setItem('gq_recent_questions', JSON.stringify(map));
  } catch (e) {}
}

// Question de secours si une catégorie n'a pas encore de questions (migration en cours).
const PLACEHOLDER_Q = { q: 'Question en préparation pour cette catégorie.', a: ['—', '—', '—', '—'], correct: 0 };

function pickQuestion(catId, level, usedMap) {
  const cat = QUESTIONS[catId] || {};
  // Palier demandé, sinon expert, sinon initié, sinon n'importe quel palier non vide.
  let pool = cat[level];
  if (!pool || !pool.length) pool = (cat.expert && cat.expert.length) ? cat.expert : cat.debutant;
  if (!pool || !pool.length) pool = Object.values(cat).find(a => Array.isArray(a) && a.length);
  const key = catId + '_' + level;
  if (!pool || !pool.length) return { idx: 0, question: PLACEHOLDER_Q, key };
  const shown = usedMap[key] || {};            // { indice: horodatage (ms) de la derniere apparition }
  const now = Date.now();
  // Questions encore "fraiches" : jamais posees, ou posees il y a plus d'une heure.
  const fresh = pool.map((_, i) => i).filter(i => !shown[i] || (now - shown[i]) >= NO_REPEAT_MS);
  let idx;
  if (fresh.length) {
    // Priorite aux questions jamais posees, sinon au hasard parmi les disponibles.
    const never = fresh.filter(i => !shown[i]);
    const choose = never.length ? never : fresh;
    idx = choose[Math.floor(Math.random() * choose.length)];
  } else {
    // Tout le stock est passe dans l'heure : on reprend la plus ancienne.
    idx = pool.map((_, i) => i).sort((a, b) => (shown[a] || 0) - (shown[b] || 0))[0];
  }
  return { idx, question: pool[idx], key };
}

function DuelOverlay({ contenders, players, msg, onStart }) {
  return (
    <div className="screen" style={{ position: 'absolute', inset: 0, zIndex: 60, background: 'color-mix(in oklab, var(--ink) 62%, transparent)', display: 'grid', placeItems: 'center', padding: 40 }}>
      <div style={{ width: 660, maxWidth: '100%', background: 'var(--card)', borderRadius: 22, border: '3px solid var(--metal)', padding: '32px 40px 28px', textAlign: 'center', boxShadow: '0 30px 70px rgba(20,10,5,0.45)' }}>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--metal-deep)', fontWeight: 700 }}>Égalité au sommet</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 44, margin: '6px 0 6px', color: 'var(--ink)', fontWeight: 400 }}>Duel final</h2>
        {msg
          ? <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 21, color: 'var(--metal-deep)', margin: '2px 0 14px' }}>{msg}</div>
          : <div style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.5, color: 'color-mix(in oklab, var(--ink) 62%, transparent)', margin: '6px auto 16px', maxWidth: 520 }}>Thème tiré au hasard. Chaque joueur répond à tour de rôle : celui qui répond juste quand l'autre se trompe l'emporte. En cas d'égalité, on rejoue&nbsp;!</div>}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 12, margin: '8px 0 22px' }}>
          {contenders.map(i => {
            const p = players[i] || {};
            const initial = (p.name || '?').trim().charAt(0).toUpperCase() || '?';
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--paper)', border: '1.5px solid color-mix(in oklab, var(--ink) 15%, transparent)', borderRadius: 999, padding: '7px 16px 7px 7px' }}>
                <span style={{ width: 34, height: 34, borderRadius: '50%', background: p.color || 'var(--metal)', color: '#fff', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-display)', fontSize: 16 }}>{initial}</span>
                <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 16, color: 'var(--ink)' }}>{p.name || ('Joueur ' + (i + 1))}</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--metal-deep)' }}>{p.score}</span>
              </div>
            );
          })}
        </div>
        <Button size="lg" onClick={onStart}>Lancer la question →</Button>
      </div>
    </div>
  );
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const target = parseInt(t.winScore, 10) || 20;
  const delayMs = Math.round((parseFloat(t.revealDelay) || 3) * 1000);
  const questionTime = parseInt(t.questionTime, 10) || 30;
  const discoveryS = t.discoveryTime == null ? 10 : parseInt(t.discoveryTime, 10);

  const [phase, setPhase] = useState('accueil'); // accueil | count | names | categories | stars | board | victory | duel
  const [selectedCats, setSelectedCats] = useState([]);
  const [count, setCount] = useState(2);
  const [players, setPlayers] = useState([]);
  const [current, setCurrent] = useState(0);
  const [board, setBoard] = useState(() => buildBoard());
  const [played, setPlayed] = useState({});
  const [active, setActive] = useState(null); // {stage:'reveal'|'joker'|'question', cat, stake, level, question, qIdx, key}
  const [usedMap, setUsedMap] = useState({});
  const [winner, setWinner] = useState(null);
  const [reachedTarget, setReachedTarget] = useState(true);
  const [discovery, setDiscovery] = useState('done'); // prompt | reveal | done
  const [discoverLeft, setDiscoverLeft] = useState(0);

  const playedRef = useRef({});
  const usedRef = useRef(loadUsed());
  const timerRef = useRef(null);
  const discTimerRef = useRef(null);
  const endgameRef = useRef(null);
  const duelIdsRef = useRef([]);
  const duelQueueRef = useRef([]);
  const duelResRef = useRef({});
  const duelCurRef = useRef(null);
  const duelPlayersRef = useRef([]);
  const selectedCatsRef = useRef(selectedCats);
  useEffect(() => { selectedCatsRef.current = selectedCats; }, [selectedCats]);
  const [duelView, setDuelView] = useState({ mode: 'intro', contenders: [], msg: '' });

  useEffect(() => { fitStage(); }, [phase]);
  useEffect(() => {
    document.getElementById('frame').setAttribute('data-theme', THEME_MAP[t.theme] || '');
  }, [t.theme]);
  useEffect(() => () => { clearTimeout(timerRef.current); clearInterval(discTimerRef.current); }, []);

  function initPlayers(n) {
    setPlayers(Array.from({ length: n }).map((_, i) => ({
      name: '', colorId: PLAYER_COLORS[i].id, color: PLAYER_COLORS[i].color,
      level: 'debutant', score: 0, star2: null, star1: null,
    })));
  }

  function startGame() {
    clearTimeout(timerRef.current); clearInterval(discTimerRef.current);
    playedRef.current = {}; usedRef.current = loadUsed();
    endgameRef.current = null;
    duelIdsRef.current = []; duelQueueRef.current = []; duelResRef.current = {};
    duelCurRef.current = null; duelPlayersRef.current = [];
    setBoard(buildBoard(selectedCats));
    setPlayed({}); setUsedMap({ ...usedRef.current });
    setDuelView({ mode: 'intro', contenders: [], msg: '' });
    setPlayers(prev => prev.map(p => ({ ...p, score: 0 })));
    setCurrent(0); setActive(null); setWinner(null); setReachedTarget(true);
    setDiscovery(discoveryS > 0 ? 'prompt' : 'done');
    setPhase('board');
  }

  // Découverte du plateau : tout se dévoile pendant discoveryS, puis se referme.
  function revealBoard() {
    setDiscovery('reveal');
    setDiscoverLeft(discoveryS);
    clearInterval(discTimerRef.current);
    discTimerRef.current = setInterval(() => {
      setDiscoverLeft(s => {
        if (s <= 1) { clearInterval(discTimerRef.current); setDiscovery('done'); return 0; }
        return s - 1;
      });
    }, 1000);
  }

  // Lancer la révélation puis la question après ≈ delayMs
  function beginReveal(cat, stake, level) {
    setActive({ stage: 'reveal', cat, stake, level });
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const { idx, question, key } = pickQuestion(cat.id, level, usedRef.current);
      setActive({ stage: 'question', cat, stake, level, question, qIdx: idx, key });
    }, delayMs);
  }

  function clickCell(i) {
    if (active || played[i] || discovery !== 'done') return;
    playedRef.current = { ...playedRef.current, [i]: true };
    setPlayed({ ...playedRef.current });
    const cell = board[i];
    const cur = players[current];
    if (cell.type === 'joker') {
      setActive({ stage: 'joker' });
    } else {
      const cat = CAT_BY_ID[cell.category];
      beginReveal(cat, stakeFor(cur, cat.id), cur.level || 'debutant');
    }
  }

  function chooseJoker(catId) {
    const cur = players[current];
    beginReveal(CAT_BY_ID[catId], stakeFor(cur, catId), cur.level || 'debutant');
  }

  function answerQuestion(correct) {
    const gained = correct ? active.stake : 0;
    const prevForKey = usedRef.current[active.key] || {};
    usedRef.current = { ...usedRef.current, [active.key]: { ...prevForKey, [active.qIdx]: Date.now() } };
    saveUsed(usedRef.current);
    setUsedMap({ ...usedRef.current });

    const curIdx = current;
    const updated = players.map((pl, i) => i === curIdx ? { ...pl, score: pl.score + gained } : pl);
    setPlayers(updated);
    setActive(null);

    const remaining = board.length - Object.keys(playedRef.current).length;

    let triggered = false;
    if (endgameRef.current === null && updated[curIdx].score >= target) {
      endgameRef.current = (players.length - 1) - curIdx;
      triggered = true;
    }

    setTimeout(() => {
      if (endgameRef.current !== null) {
        if (!triggered) endgameRef.current -= 1;
        if (endgameRef.current <= 0) { finishGame(updated); return; }
        setCurrent(c => (c + 1) % players.length);
        return;
      }
      if (remaining <= 0) { finishGame(updated); return; }
      if (t.replayOnCorrect && correct) {
        // le joueur rejoue : on ne change pas `current`
      } else {
        setCurrent(c => (c + 1) % players.length);
      }
    }, 20);
  }

  function finishGame(finalPlayers) {
    const max = Math.max(...finalPlayers.map(p => p.score));
    const top = finalPlayers.map((p, i) => i).filter(i => finalPlayers[i].score === max);
    if (top.length === 1) {
      setWinner(finalPlayers[top[0]]);
      setReachedTarget(max >= target);
      setPhase('victory');
    } else {
      startDuel(top, finalPlayers);
    }
  }

  function startDuel(ids, finalPlayers) {
    duelPlayersRef.current = finalPlayers;
    duelIdsRef.current = ids;
    setDuelView({ mode: 'intro', contenders: ids, msg: '' });
    setPhase('duel');
  }
  function runDuelRound() {
    duelQueueRef.current = [...duelIdsRef.current];
    duelResRef.current = {};
    nextDuelAsk();
  }
  function nextDuelAsk() {
    if (duelQueueRef.current.length === 0) { resolveDuelRound(); return; }
    const pid = duelQueueRef.current.shift();
    const inPlay = selectedCatsRef.current.map(id => CAT_BY_ID[id]).filter(Boolean);
    const catPool = inPlay.length ? inPlay : CATEGORIES.slice(0, BOARD_CATS);
    const cat = catPool[Math.floor(Math.random() * catPool.length)];
    const level = (duelPlayersRef.current[pid] && duelPlayersRef.current[pid].level) || 'debutant';
    const picked = pickQuestion(cat.id, level, usedRef.current);
    duelCurRef.current = { playerIdx: pid, key: picked.key, qIdx: picked.idx };
    setDuelView({ mode: 'ask', playerIdx: pid, cat, question: picked.question });
  }
  function answerDuel(correct) {
    const cur = duelCurRef.current;
    if (cur) {
      const prevForKey = usedRef.current[cur.key] || {};
      usedRef.current = { ...usedRef.current, [cur.key]: { ...prevForKey, [cur.qIdx]: Date.now() } };
      saveUsed(usedRef.current);
      duelResRef.current = { ...duelResRef.current, [cur.playerIdx]: correct };
    }
    nextDuelAsk();
  }
  function resolveDuelRound() {
    const ids = duelIdsRef.current;
    const res = duelResRef.current;
    const good = ids.filter(i => res[i]);
    const bad = ids.filter(i => !res[i]);
    const nameOf = (i) => (duelPlayersRef.current[i] && duelPlayersRef.current[i].name) || ('Joueur ' + (i + 1));
    if (good.length > 0 && bad.length > 0) {
      if (good.length === 1) {
        setWinner(duelPlayersRef.current[good[0]]);
        setReachedTarget(true);
        setPhase('victory');
      } else {
        duelIdsRef.current = good;
        setDuelView({ mode: 'intro', contenders: good, msg: bad.map(nameOf).join(', ') + (bad.length > 1 ? ' sont elimines !' : ' est elimine !') });
      }
    } else {
      setDuelView({ mode: 'intro', contenders: ids, msg: 'Personne n\'est departage : on rejoue une question !' });
    }
  }

  // ----- Rendu selon la phase -----
  let content;
  if (phase === 'accueil') {
    content = <ScreenAccueil onStart={() => setPhase('count')} />;
  } else if (phase === 'count') {
    content = <ScreenCount onBack={() => setPhase('accueil')} onPick={(n) => { setCount(n); initPlayers(n); setPhase('names'); }} />;
  } else if (phase === 'names') {
    content = <ScreenNames count={count} players={players} setPlayers={setPlayers} onBack={() => setPhase('count')} onStart={() => { setSelectedCats([]); setPhase('categories'); }} />;
  } else if (phase === 'categories') {
    content = <ScreenCategories selected={selectedCats} setSelected={setSelectedCats} onBack={() => setPhase('names')} onStart={() => {
      // Retire des favoris toute catégorie qui ne fait plus partie de la sélection.
      setPlayers(prev => prev.map(p => ({
        ...p,
        star2: selectedCats.includes(p.star2) ? p.star2 : null,
        star1: selectedCats.includes(p.star1) ? p.star1 : null,
      })));
      setPhase('stars');
    }} />;
  } else if (phase === 'stars') {
    const starCats = CATEGORIES.filter(c => selectedCats.includes(c.id));
    content = <ScreenStars players={players} setPlayers={setPlayers} cats={starCats} onBack={() => setPhase('categories')} onStart={startGame} />;
  } else if (phase === 'board') {
    content = (
      <>
        <ScreenBoard players={players} current={current} board={board} played={played}
          target={target} canPlay={!active && discovery === 'done'} onPick={clickCell}
          peek={discovery === 'reveal'} discoverLeft={discoverLeft} />
        {discovery === 'prompt' && (
          <DiscoveryOverlay players={players} onReveal={revealBoard} durationS={discoveryS} cats={CATEGORIES.filter(c => selectedCats.includes(c.id))} />
        )}
        {active && active.stage === 'reveal' && (
          <RevealOverlay cat={active.cat} player={players[current]} stake={active.stake} delayMs={delayMs} />
        )}
        {active && active.stage === 'joker' && (
          <JokerChooser player={players[current]} onPick={chooseJoker} />
        )}
        {active && active.stage === 'question' && (
          <ScreenQuestion cat={active.cat} question={active.question} player={players[current]} stake={active.stake} timeLimit={questionTime} onAnswer={answerQuestion} />
        )}
      </>
    );
  } else if (phase === 'duel') {
    content = (
      <>
        <ScreenBoard players={players} current={current} board={board} played={played}
          target={target} canPlay={false} onPick={() => {}} />
        {duelView.mode === 'intro' && (
          <DuelOverlay contenders={duelView.contenders} players={duelPlayersRef.current} msg={duelView.msg} onStart={runDuelRound} />
        )}
        {duelView.mode === 'ask' && (
          <ScreenQuestion cat={duelView.cat} question={duelView.question} player={duelPlayersRef.current[duelView.playerIdx] || {}} stake={0} duel timeLimit={questionTime} onAnswer={answerDuel} />
        )}
      </>
    );
  } else if (phase === 'victory') {
    content = <ScreenVictory players={players} winner={winner || players[0]} target={target}
      reachedTarget={reachedTarget} onReplay={startGame} onHome={() => setPhase('accueil')} />;
  }

  return (
    <div style={{ width: '100%', height: '100%', fontFamily: 'var(--font-body)' }}>
      {content}
      <TweaksPanel>
        <TweakSection label="Ambiance" />
        <TweakRadio label="Thème" value={t.theme} options={['patrimoine', 'nuit']} onChange={(v) => setTweak('theme', v)} />
        <TweakSection label="Règle du jeu" />
        <TweakSlider label="Score pour gagner" value={target} min={10} max={30} step={5} unit=" pts" onChange={(v) => setTweak('winScore', v)} />
        <TweakSlider label="Temps par question" value={questionTime} min={10} max={60} step={5} unit=" s" onChange={(v) => setTweak('questionTime', v)} />
        <TweakSlider label="Délai avant la question" value={parseFloat(t.revealDelay) || 3} min={1} max={5} step={0.5} unit=" s" onChange={(v) => setTweak('revealDelay', v)} />
        <TweakSlider label="Découverte du plateau" value={discoveryS} min={0} max={20} step={5} unit=" s" onChange={(v) => setTweak('discoveryTime', v)} />
        <TweakToggle label="Bonne réponse → rejoue" value={!!t.replayOnCorrect} onChange={(v) => setTweak('replayOnCorrect', v)} />
      </TweaksPanel>
    </div>
  );
}

fitStage();

export default App;
