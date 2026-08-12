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
    expert: [
      { q: "Dans quelle cité grecque la démocratie est-elle née au Ve siècle av. J.-C. ?", a: ["Athènes", "Sparte", "Thèbes", "Corinthe"], correct: 0 },
      { q: "Quel roi de Sparte défendit le défilé des Thermopyles contre les Perses ?", a: ["Périclès", "Thémistocle", "Léonidas", "Miltiade"], correct: 2 },
      { q: "La bataille de Marathon opposa les cités grecques à quel empire ?", a: ["L'Empire romain", "L'Empire perse", "L'Empire macédonien", "Carthage"], correct: 1 },
      { q: "Quel conquérant macédonien, élève d'Aristote, bâtit un empire jusqu'aux portes de l'Inde ?", a: ["Alexandre le Grand", "Philippe II", "Ptolémée", "Séleucos"], correct: 0 },
      { q: "Quel général carthaginois traversa les Alpes avec des éléphants pour attaquer Rome ?", a: ["Hamilcar", "Hannibal", "Hasdrubal", "Scipion"], correct: 1 },
      { q: "Quel chef gaulois fut vaincu par Jules César lors du siège d'Alésia en 52 av. J.-C. ?", a: ["Vercingétorix", "Brennus", "Ambiorix", "Astérix"], correct: 0 },
      { q: "Quel général franchit le Rubicon en déclarant, dit-on, « Alea jacta est » ?", a: ["Pompée", "Jules César", "Crassus", "Marc Antoine"], correct: 1 },
      { q: "Qui devint le premier empereur de Rome, sous le nom d'Auguste ?", a: ["Néron", "Tibère", "Octave", "Marc Aurèle"], correct: 2 },
      { q: "Quel gladiateur mena une grande révolte d'esclaves contre la République romaine ?", a: ["Crixus", "Commode", "Attila", "Spartacus"], correct: 3 },
      { q: "Quelle dernière reine d'Égypte s'allia à Marc Antoine contre Octave ?", a: ["Néfertiti", "Hatchepsout", "Bérénice", "Cléopâtre"], correct: 3 },
      { q: "Pour quel pharaon la grande pyramide de Gizeh fut-elle érigée ?", a: ["Ramsès II", "Toutânkhamon", "Djéser", "Khéops"], correct: 3 },
      { q: "Quel pharaon, dont la tombe presque intacte fut découverte en 1922, est mondialement connu ?", a: ["Toutânkhamon", "Khéphren", "Akhénaton", "Séthi Ier"], correct: 0 },
      { q: "Quelle est la seule des sept merveilles du monde antique encore debout aujourd'hui ?", a: ["Le phare d'Alexandrie", "La grande pyramide de Gizeh", "Le colosse de Rhodes", "Les jardins de Babylone"], correct: 1 },
      { q: "Quel premier empereur unifia la Chine et lança la construction de la Grande Muraille ?", a: ["Kubilai Khan", "Confucius", "Qin Shi Huang", "Sun Tzu"], correct: 2 },
      { q: "Quel roi des Francs fut baptisé à Reims vers l'an 496 ?", a: ["Dagobert", "Clovis", "Charles Martel", "Pépin le Bref"], correct: 1 },
      { q: "En quelle année Charlemagne fut-il couronné empereur d'Occident à Rome ?", a: ["768", "843", "987", "800"], correct: 3 },
      { q: "Quelle dynastie Hugues Capet a-t-il fondée en 987 ?", a: ["Les Mérovingiens", "Les Carolingiens", "Les Capétiens", "Les Valois"], correct: 2 },
      { q: "Quel duc de Normandie conquit l'Angleterre en 1066 après la bataille de Hastings ?", a: ["Rollon", "Guillaume le Conquérant", "Richard Cœur de Lion", "Harold"], correct: 1 },
      { q: "Quel sultan reprit Jérusalem aux croisés en 1187 ?", a: ["Baybars", "Saladin", "Soliman", "Mehmed II"], correct: 1 },
      { q: "Quel chef mongol fonda au XIIIe siècle le plus vaste empire terrestre d'un seul tenant ?", a: ["Tamerlan", "Attila", "Gengis Khan", "Kubilai"], correct: 2 },
      { q: "Quel marchand vénitien relata son long voyage jusqu'à la cour du Grand Khan de Chine ?", a: ["Ibn Battûta", "Vasco de Gama", "Christophe Colomb", "Marco Polo"], correct: 3 },
      { q: "Quelle héroïne délivra Orléans en 1429 avant d'être brûlée à Rouen en 1431 ?", a: ["Aliénor d'Aquitaine", "Blanche de Castille", "Catherine de Médicis", "Jeanne d'Arc"], correct: 3 },
      { q: "La guerre de Cent Ans opposa le royaume de France à quel autre royaume ?", a: ["L'Angleterre", "L'Espagne", "Le Saint-Empire", "La Bourgogne"], correct: 0 },
      { q: "Quelle épidémie décima près d'un tiers de l'Europe au milieu du XIVe siècle ?", a: ["Le choléra", "La peste noire", "La variole", "La grippe espagnole"], correct: 1 },
      { q: "Quelle grande ville tomba aux mains des Ottomans en 1453, mettant fin à l'Empire byzantin ?", a: ["Athènes", "Constantinople", "Vienne", "Antioche"], correct: 1 },
      { q: "Qui perfectionna l'imprimerie à caractères mobiles en Europe vers 1450 ?", a: ["Érasme", "Copernic", "Léonard de Vinci", "Gutenberg"], correct: 3 },
      { q: "Quel navigateur, au service de l'Espagne, aborda l'Amérique en 1492 en cherchant les Indes ?", a: ["Christophe Colomb", "Vasco de Gama", "Amerigo Vespucci", "Jean Cabot"], correct: 0 },
      { q: "Qui dirigea la première expédition à faire le tour du monde, achevée en 1522 ?", a: ["Magellan", "Vasco de Gama", "Francis Drake", "Bartolomeu Dias"], correct: 0 },
      { q: "Quel conquistador espagnol renversa l'Empire aztèque de Moctezuma ?", a: ["Francisco Pizarro", "Vasco de Balboa", "Hernán Cortés", "Diego de Almagro"], correct: 2 },
      { q: "Quel conquistador s'empara de l'Empire inca et de son chef Atahualpa ?", a: ["Hernán Cortés", "Francisco Pizarro", "Christophe Colomb", "Pedro de Alvarado"], correct: 1 },
      { q: "Quel roi de France remporta la bataille de Marignan en 1515 ?", a: ["Louis XII", "Henri II", "Charles VIII", "François Ier"], correct: 3 },
      { q: "Quel moine allemand déclencha la Réforme protestante en 1517 avec ses 95 thèses ?", a: ["Martin Luther", "Jean Calvin", "Thomas More", "Ulrich Zwingli"], correct: 0 },
      { q: "Quel roi mit fin aux guerres de religion en France par l'édit de Nantes en 1598 ?", a: ["Charles IX", "Louis XIII", "Henri IV", "François II"], correct: 2 },
      { q: "Qui a déchiffré les hiéroglyphes égyptiens grâce à la pierre de Rosette ?", a: ["Mariette", "Denon", "Champollion", "Maspero"], correct: 2 },
      { q: "Quel roi, surnommé le Roi-Soleil, fit de Versailles le centre de son pouvoir ?", a: ["Louis XIV", "Louis XIII", "Louis XV", "Henri IV"], correct: 0 },
      { q: "Quel monarque français détient le plus long règne de l'histoire de France, 72 ans ?", a: ["Louis XV", "Louis XIV", "Philippe le Bel", "François Ier"], correct: 1 },
      { q: "Quel cardinal fut le principal ministre du roi Louis XIII ?", a: ["Mazarin", "Fleury", "de Retz", "Richelieu"], correct: 3 },
      { q: "Quel philosophe des Lumières a théorisé la séparation des pouvoirs ?", a: ["Montesquieu", "Voltaire", "Rousseau", "Diderot"], correct: 0 },
      { q: "En quelle année les treize colonies déclarèrent-elles leur indépendance des États-Unis ?", a: ["1783", "1789", "1776", "1765"], correct: 2 },
      { q: "Qui fut le premier président des États-Unis ?", a: ["Thomas Jefferson", "Benjamin Franklin", "John Adams", "George Washington"], correct: 3 },
      { q: "Quel événement du 14 juillet 1789 est à l'origine de la fête nationale française ?", a: ["Le serment du Jeu de paume", "La fuite à Varennes", "La marche des femmes", "La prise de la Bastille"], correct: 3 },
      { q: "Quel roi de France fut guillotoné en janvier 1793 ?", a: ["Louis XV", "Louis XVIII", "Charles X", "Louis XVI"], correct: 3 },
      { q: "Quelle figure jacobine incarna la Terreur avant d'être guillotiné en 1794 ?", a: ["Robespierre", "Danton", "Marat", "Saint-Just"], correct: 0 },
      { q: "En quelle année Napoléon Bonaparte fut-il sacré empereur des Français ?", a: ["1799", "1812", "1804", "1815"], correct: 2 },
      { q: "La bataille d'Austerlitz de 1805 est surnommée la bataille des trois quoi ?", a: ["Empereurs", "Rois", "Nations", "Rivières"], correct: 0 },
      { q: "Quel code juridique promulgué en 1804 porte le nom de Napoléon ?", a: ["Le Code pénal", "Le Code Justinien", "Le Code civil", "Les Coutumes"], correct: 2 },
      { q: "Quelle bataille de 1815 marqua la défaite définitive de Napoléon ?", a: ["Leipzig", "Iéna", "Waterloo", "Wagram"], correct: 2 },
      { q: "Sur quelle île de l'Atlantique sud Napoléon mourut-il en exil en 1821 ?", a: ["L'île d'Elbe", "La Corse", "Sainte-Hélène", "Madère"], correct: 2 },
      { q: "Qui fit adopter le décret abolissant l'esclavage en France en 1848 ?", a: ["Jules Ferry", "Léon Gambetta", "Victor Schoelcher", "Adolphe Thiers"], correct: 2 },
      { q: "Quel préfet transforma Paris avec de grands boulevards sous Napoléon III ?", a: ["Eugène Poubelle", "Le baron Haussmann", "Adolphe Alphand", "Jean-Charles Rohault"], correct: 1 },
      { q: "Quelle défaite de 1870 face à la Prusse entraîna la chute de Napoléon III ?", a: ["Sedan", "Waterloo", "Rossbach", "Valmy"], correct: 0 },
      { q: "Quel chancelier réalisa l'unité allemande, proclamée à Versailles en 1871 ?", a: ["Metternich", "Guillaume II", "Adenauer", "Bismarck"], correct: 3 },
      { q: "Quel ministre rendit l'école primaire gratuite, laïque et obligatoire dans les années 1880 ?", a: ["Jules Grévy", "Jules Ferry", "Léon Gambetta", "Jean Jaurès"], correct: 1 },
      { q: "Quel président américain abolit l'esclavage pendant la guerre de Sécession ?", a: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "Ulysses Grant"], correct: 0 },
      { q: "Quel attentat, à Sarajevo en 1914, déclencha la Première Guerre mondiale ?", a: ["L'assassinat de Jaurès", "L'incendie du Reichstag", "Le torpillage du Lusitania", "L'assassinat de l'archiduc François-Ferdinand"], correct: 3 },
      { q: "Quelle bataille de 1916 symbolise l'enfer des tranchées pour les soldats français ?", a: ["Verdun", "La Somme", "La Marne", "Ypres"], correct: 0 },
      { q: "Quel jour de 1918 fut signé l'armistice de la Grande Guerre ?", a: ["Le 8 mai", "Le 14 juillet", "Le 6 juin", "Le 11 novembre"], correct: 3 },
      { q: "Quel révolutionnaire dirigea la prise du pouvoir bolchevique en Russie en 1917 ?", a: ["Staline", "Trotski", "Kerenski", "Lénine"], correct: 3 },
      { q: "Quel krach boursier de 1929 déclencha la Grande Dépression ?", a: ["Le krach de la City", "La faillite du Crédit autrichien", "Le krach de Wall Street", "Le krach du Mississippi"], correct: 2 },
      { q: "Quel général lança l'Appel du 18 juin 1940 depuis Londres ?", a: ["Charles de Gaulle", "Philippe Pétain", "Jean Moulin", "Leclerc"], correct: 0 },
      { q: "Quelle opération débarqua les Alliés en Normandie le 6 juin 1944 ?", a: ["Le Débarquement (Overlord)", "L'opération Torch", "L'opération Market Garden", "L'opération Barbarossa"], correct: 0 },
      { q: "Quelle date marque la capitulation de l'Allemagne nazie en Europe ?", a: ["Le 11 novembre 1918", "Le 6 juin 1944", "Le 8 mai 1945", "Le 2 septembre 1945"], correct: 2 },
      { q: "Sur quelle ville japonaise la première bombe atomique fut-elle larguée en 1945 ?", a: ["Nagasaki", "Hiroshima", "Tokyo", "Kyoto"], correct: 1 },
      { q: "Quel mur, érigé en 1961, symbolisa la division de l'Europe jusqu'à sa chute en 1989 ?", a: ["Le mur de Berlin", "La ligne Maginot", "Le rideau de Damas", "Le mur d'Hadrien"], correct: 0 },
      { q: "Quel leader indien prôna la non-violence pour obtenir l'indépendance en 1947 ?", a: ["Gandhi", "Nehru", "Ambedkar", "Bose"], correct: 0 },
      { q: "Quelle République la France inaugura-t-elle en 1958 avec le retour de De Gaulle ?", a: ["La Troisième", "La Cinquième", "La Quatrième", "La Sixième"], correct: 1 },
      { q: "Quel astronaute fut le premier homme à marcher sur la Lune, en 1969 ?", a: ["Buzz Aldrin", "Youri Gagarine", "Neil Armstrong", "Michael Collins"], correct: 2 },
      { q: "Quel prisonnier devint président d'Afrique du Sud en 1994, tournant la page de l'apartheid ?", a: ["Desmond Tutu", "Nelson Mandela", "Frederik de Klerk", "Steve Biko"], correct: 1 },
      { q: "Comment nomme-t-on le génocide des Juifs d'Europe perpétré par le régime nazi ?", a: ["La Grande Terreur", "Les purges", "La Shoah", "Le Goulag"], correct: 2 },
      { q: "Quel empereur byzantin fit rédiger un grand code de lois et bâtir Sainte-Sophie ?", a: ["Justinien", "Constantin", "Héraclius", "Basile II"], correct: 0 },
      { q: "Quel sultan ottoman, dit « le Magnifique », porta l'empire à son apogée au XVIe siècle ?", a: ["Osman Ier", "Mehmed II", "Soliman", "Bayezid"], correct: 2 },
      { q: "Quel navigateur portugais ouvrit la route maritime des Indes en contournant l'Afrique en 1498 ?", a: ["Bartolomeu Dias", "Pedro Cabral", "Magellan", "Vasco de Gama"], correct: 3 },
      { q: "Combien d'épouses successives le roi Henri VIII d'Angleterre eut-il ?", a: ["Trois", "Six", "Quatre", "Huit"], correct: 1 },
      { q: "Combien de républiques la France a-t-elle connues depuis 1792 ?", a: ["Trois", "Quatre", "Cinq", "Six"], correct: 2 },
      { q: "Quelle reine, au règne de 63 ans, donna son nom à une époque de l'histoire britannique ?", a: ["Élisabeth Ire", "Anne", "Marie Tudor", "Victoria"], correct: 3 },
      { q: "Quel empereur français vendit la Louisiane aux États-Unis en 1803 ?", a: ["Louis XVI", "Napoléon Bonaparte", "Louis XVIII", "Charles X"], correct: 1 },
      { q: "Quel massacre de 1572, la nuit de la Saint-Barthélemy, visa les protestants à Paris ?", a: ["La journée des Dupes", "Les Vêpres siciliennes", "La Terreur blanche", "Le massacre des huguenots"], correct: 3 },
      { q: "Quel écrivain publia « J'accuse… ! » pour défendre le capitaine Dreyfus en 1898 ?", a: ["Victor Hugo", "Émile Zola", "Georges Clemenceau", "Anatole France"], correct: 1 },
      { q: "Quel résistant, unificateur de la Résistance, mourut sous la torture en 1943 ?", a: ["Jean Moulin", "Pierre Brossolette", "Guy Môquet", "Missak Manouchian"], correct: 0 },
      { q: "Quel régime, dirigé par Pétain, collabora avec l'Allemagne de 1940 à 1944 ?", a: ["La Commune", "Le régime de Vichy", "Le Directoire", "Le Front populaire"], correct: 1 },
      { q: "Quelle organisation internationale fut fondée en 1945 pour préserver la paix ?", a: ["La SDN", "L'OTAN", "L'Union européenne", "L'ONU"], correct: 3 },
      { q: "Quelle crise de 1962 amena les États-Unis et l'URSS au bord de la guerre nucléaire ?", a: ["Le blocus de Berlin", "La guerre de Corée", "La crise de Suez", "La crise des missiles de Cuba"], correct: 3 },
      { q: "Quel pharaon-femme régna en portant les attributs masculins de la royauté égyptienne ?", a: ["Néfertiti", "Hatchepsout", "Cléopâtre", "Néfertari"], correct: 1 },
      { q: "Quel savant italien fut condamné par l'Église pour avoir soutenu que la Terre tourne autour du Soleil ?", a: ["Copernic", "Kepler", "Galilée", "Giordano Bruno"], correct: 2 },
      { q: "Quelle grande muraille défensive romaine barrait le nord de la Bretagne (actuelle Angleterre) ?", a: ["La ligne Maginot", "Le mur d'Hadrien", "Le limes du Rhin", "Le mur d'Antonin"], correct: 1 },
      { q: "Quel roi anglais signa la Grande Charte (Magna Carta) en 1215, limitant son pouvoir ?", a: ["Richard Cœur de Lion", "Jean sans Terre", "Henri II", "Édouard Ier"], correct: 1 },
      { q: "Quelle guerre civile américaine opposa le Nord et le Sud de 1861 à 1865 ?", a: ["La guerre d'Indépendance", "La guerre du Mexique", "La guerre de Sécession", "La conquête de l'Ouest"], correct: 2 },
      { q: "Quel empereur mongol, petit-fils de Gengis Khan, régna sur la Chine et reçut Marco Polo ?", a: ["Tamerlan", "Kubilai Khan", "Ögödei", "Batu"], correct: 1 },
      { q: "Quelle catastrophe ensevelit Pompéi et Herculanum en 79 apr. J.-C. ?", a: ["Un raz-de-marée", "L'éruption du Vésuve", "Un incendie", "Un séisme isolé"], correct: 1 },
      { q: "Quel empereur romain fit du christianisme une religion tolérée par l'édit de Milan en 313 ?", a: ["Néron", "Dioclétien", "Théodose", "Constantin"], correct: 3 },
      { q: "Quel roi de France, dit « le Bel », fit arrêter les Templiers un vendredi 13 de 1307 ?", a: ["Louis IX", "Charles IV", "Philippe IV", "Philippe VI"], correct: 2 },
      { q: "Quelle famille de riches banquiers a marqué la Florence de la Renaissance ?", a: ["Les Médicis", "Les Borgia", "Les Sforza", "Les Visconti"], correct: 0 },
      { q: "Quel tsar occidentalisa la Russie et fonda Saint-Pétersbourg au début du XVIIIe siècle ?", a: ["Pierre le Grand", "Ivan le Terrible", "Nicolas II", "Alexandre Ier"], correct: 0 },
      { q: "Quelle révolte de 1789 précéda la prise de la Bastille, quand les députés jurèrent de donner une constitution ?", a: ["Le serment du Jeu de paume", "La nuit du 4 août", "La fête de la Fédération", "Les journées de Juin"], correct: 0 },
      { q: "Quelle bataille navale de 1805 vit l'amiral Nelson écraser la flotte franco-espagnole ?", a: ["Aboukir", "Lépante", "Trafalgar", "La Hougue"], correct: 2 },
      { q: "Quel homme d'État britannique dirigea son pays durant la Seconde Guerre mondiale ?", a: ["Neville Chamberlain", "Clement Attlee", "Winston Churchill", "Anthony Eden"], correct: 2 },
      { q: "Quel événement déclencha officiellement la Seconde Guerre mondiale en septembre 1939 ?", a: ["L'annexion de l'Autriche", "L'invasion de la France", "L'attaque de Pearl Harbor", "L'invasion de la Pologne"], correct: 3 },
      { q: "Quelle attaque japonaise, en décembre 1941, fit entrer les États-Unis dans la guerre ?", a: ["Pearl Harbor", "Midway", "Iwo Jima", "Guadalcanal"], correct: 0 },
      { q: "Quel mouvement social de mai 1968 secoua la France par des grèves et des manifestations étudiantes ?", a: ["Le Front populaire", "La Commune", "Les journées de Juin", "Mai 68"], correct: 3 },
      { q: "Quel empereur romain aurait « regardé brûler Rome » lors du grand incendie de 64 ?", a: ["Caligula", "Tibère", "Domitien", "Néron"], correct: 3 },
    ],
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
    expert: [
      { q: "Quel est le plus haut sommet du monde ?", a: ["Le K2", "L'Aconcagua", "L'Everest", "Le Kilimandjaro"], correct: 2 },
      { q: "Quel est le plus haut sommet des Alpes et d'Europe occidentale ?", a: ["Le Cervin", "Le Mont Blanc", "Le mont Rose", "La Meije"], correct: 1 },
      { q: "Quel est le plus haut sommet des Amériques, dans les Andes argentines ?", a: ["Le Chimborazo", "L'Aconcagua", "Le mont McKinley", "L'Illimani"], correct: 1 },
      { q: "Quel est le plus haut sommet d'Afrique ?", a: ["Le Kilimandjaro", "Le mont Kenya", "L'Atlas", "Le Ruwenzori"], correct: 0 },
      { q: "Quelle chaîne de montagnes marque la frontière entre la France et l'Espagne ?", a: ["Les Alpes", "le Jura", "les Vosges", "Les Pyrénées"], correct: 3 },
      { q: "Quelle est la plus longue chaîne de montagnes émergée du monde ?", a: ["La cordillère des Andes", "L'Himalaya", "les Rocheuses", "l'Oural"], correct: 0 },
      { q: "Quel massif ancien occupe le centre-sud de la France ?", a: ["Les Vosges", "Le Massif central", "le Jura", "les Ardennes"], correct: 1 },
      { q: "Quel haut plateau d'Asie est surnommé le « toit du monde » ?", a: ["Le Deccan", "la Mongolie", "l'Anatolie", "Le Tibet"], correct: 3 },
      { q: "Quel fleuve d'Afrique est traditionnellement considéré comme le plus long du monde ?", a: ["L'Amazone", "le Yangtsé", "Le Nil", "le Congo"], correct: 2 },
      { q: "Quel fleuve possède le plus grand débit du monde ?", a: ["Le Nil", "L'Amazone", "le Mississippi", "le Gange"], correct: 1 },
      { q: "Quel est le plus long fleuve de France ?", a: ["La Seine", "La Loire", "le Rhône", "la Garonne"], correct: 1 },
      { q: "Quel fleuve traverse Paris ?", a: ["La Loire", "la Marne", "La Seine", "l'Oise"], correct: 2 },
      { q: "Quel fleuve se jette dans la Méditerranée après avoir traversé Lyon ?", a: ["La Loire", "la Garonne", "Le Rhône", "la Durance"], correct: 2 },
      { q: "Quel fleuve arrose Bordeaux avant de former l'estuaire de la Gironde ?", a: ["La Garonne", "La Dordogne", "le Lot", "la Charente"], correct: 0 },
      { q: "Quel fleuve, le plus long d'Europe, se jette dans la mer Caspienne ?", a: ["La Volga", "Le Danube", "le Rhin", "le Dniepr"], correct: 0 },
      { q: "Quel lac de Sibérie est le plus profond et le plus volumineux du monde ?", a: ["La mer d'Aral", "le lac Ladoga", "Le Baïkal", "le lac Balkhach"], correct: 2 },
      { q: "Quel est le plus grand lac d'Afrique ?", a: ["Le lac Victoria", "Le lac Tanganyika", "le lac Tchad", "le lac Malawi"], correct: 0 },
      { q: "Quel est le plus grand lac naturel situé entièrement en France ?", a: ["Le lac d'Annecy", "le lac Léman", "Le lac du Bourget", "le lac de Grand-Lieu"], correct: 2 },
      { q: "Quel est le plus vaste océan du monde ?", a: ["L'Atlantique", "l'océan Indien", "l'océan Arctique", "L'océan Pacifique"], correct: 3 },
      { q: "Combien d'océans compte-t-on aujourd'hui sur la Terre ?", a: ["Trois", "Quatre", "Cinq", "Sept"], correct: 2 },
      { q: "Quelle fosse océanique est la plus profonde du monde ?", a: ["La fosse du Japon", "La fosse des Mariannes", "la fosse de Porto Rico", "la fosse des Tonga"], correct: 1 },
      { q: "Quel détroit sépare l'Europe de l'Afrique à l'entrée de la Méditerranée ?", a: ["Le Bosphore", "Le détroit de Gibraltar", "le détroit de Messine", "les Dardanelles"], correct: 1 },
      { q: "Quel détroit traverse Istanbul et sépare l'Europe de l'Asie ?", a: ["Gibraltar", "le détroit d'Ormuz", "Le Bosphore", "l'Øresund"], correct: 2 },
      { q: "Quel détroit sépare la Russie de l'Alaska ?", a: ["Le détroit de Malacca", "Le détroit de Béring", "le détroit de Torres", "le passage de Drake"], correct: 1 },
      { q: "Quel canal relie l'océan Atlantique à l'océan Pacifique en Amérique centrale ?", a: ["Le canal de Suez", "le canal de Kiel", "le canal de Corinthe", "Le canal de Panama"], correct: 3 },
      { q: "Quel canal égyptien relie la Méditerranée à la mer Rouge ?", a: ["Le canal de Suez", "Le canal de Panama", "le canal de la Mer Blanche", "le canal du Rhône au Rhin"], correct: 0 },
      { q: "Quelle mer très salée, entre Israël et la Jordanie, permet de flotter sans effort ?", a: ["La mer Rouge", "La mer Morte", "la mer Noire", "la mer Caspienne"], correct: 1 },
      { q: "Quelle est la plus grande étendue d'eau intérieure du monde, qualifiée de mer ?", a: ["Le lac Supérieur", "La mer Caspienne", "la mer d'Aral", "le lac Victoria"], correct: 1 },
      { q: "Quel désert du Chili est réputé le plus aride du monde ?", a: ["L'Atacama", "Le Kalahari", "le Namib", "le Gobi"], correct: 0 },
      { q: "Quel désert froid est le plus vaste du monde ?", a: ["Le Sahara", "le Gobi", "l'Arctique", "L'Antarctique"], correct: 3 },
      { q: "Quel volcan italien domine la baie de Naples ?", a: ["L'Etna", "le Stromboli", "le Vulcano", "Le Vésuve"], correct: 3 },
      { q: "Quel est le plus grand volcan actif d'Europe, en Sicile ?", a: ["Le Vésuve", "le Stromboli", "L'Etna", "l'Hekla"], correct: 2 },
      { q: "Quel volcan est le point culminant du Japon ?", a: ["Le mont Aso", "le Sakurajima", "Le mont Fuji", "l'Ontake"], correct: 2 },
      { q: "Quel pays insulaire de l'Atlantique nord est célèbre pour ses volcans et ses geysers ?", a: ["La Norvège", "L'Islande", "l'Irlande", "le Groenland"], correct: 1 },
      { q: "Quel phénomène climatique apporte de fortes pluies saisonnières en Inde ?", a: ["Le blizzard", "La mousson", "l'harmattan", "le foehn"], correct: 1 },
      { q: "Quel courant marin chaud adoucit le climat de l'Europe de l'Ouest ?", a: ["Le courant de Humboldt", "le courant du Labrador", "le Kuroshio", "Le Gulf Stream"], correct: 3 },
      { q: "Quelle est la plus haute chute d'eau du monde, au Venezuela ?", a: ["Le Salto Ángel", "Les chutes du Niagara", "les chutes Victoria", "les chutes d'Iguaçu"], correct: 0 },
      { q: "Quel est le point émergé le plus bas de la planète ?", a: ["Les rives de la mer Morte", "La vallée de la Mort", "la dépression de l'Afar", "le Qattara"], correct: 0 },
      { q: "Quel est le plus grand pays du monde par la superficie ?", a: ["La Russie", "Le Canada", "la Chine", "les États-Unis"], correct: 0 },
      { q: "Quel est le plus petit État indépendant du monde ?", a: ["Le Vatican", "Monaco", "Saint-Marin", "le Liechtenstein"], correct: 0 },
      { q: "Quel pays est devenu le plus peuplé du monde en 2023 ?", a: ["La Chine", "L'Inde", "les États-Unis", "l'Indonésie"], correct: 1 },
      { q: "Quel est le plus grand pays d'Afrique par la superficie ?", a: ["La RD Congo", "le Soudan", "la Libye", "L'Algérie"], correct: 3 },
      { q: "Quelle est l'agglomération la plus peuplée du monde ?", a: ["Delhi", "Shanghai", "Mexico", "Tokyo"], correct: 3 },
      { q: "Quel pays est le plus grand archipel du monde, avec des milliers d'îles ?", a: ["Les Philippines", "le Japon", "la Malaisie", "L'Indonésie"], correct: 3 },
      { q: "De combien de nations constitutives le Royaume-Uni est-il composé ?", a: ["Deux", "Trois", "Quatre", "Cinq"], correct: 2 },
      { q: "Quelle est la plus grande île du monde ?", a: ["La Nouvelle-Guinée", "Bornéo", "Le Groenland", "Madagascar"], correct: 2 },
      { q: "À quel pays le Groenland est-il rattaché ?", a: ["Le Danemark", "La Norvège", "l'Islande", "le Canada"], correct: 0 },
      { q: "Quelle est la plus grande île de la mer Méditerranée ?", a: ["La Sardaigne", "La Sicile", "Chypre", "la Crète"], correct: 1 },
      { q: "Quelle est la plus grande île de France métropolitaine ?", a: ["Belle-Île", "Oléron", "l'île de Ré", "La Corse"], correct: 3 },
      { q: "Quelle est la capitale de l'Australie ?", a: ["Sydney", "Melbourne", "Perth", "Canberra"], correct: 3 },
      { q: "Quelle est la capitale du Canada ?", a: ["Toronto", "Montréal", "Vancouver", "Ottawa"], correct: 3 },
      { q: "Quelle est la capitale du Brésil ?", a: ["Rio de Janeiro", "Brasília", "São Paulo", "Salvador"], correct: 1 },
      { q: "Quelle est la capitale de la Turquie ?", a: ["Istanbul", "Izmir", "Bursa", "Ankara"], correct: 3 },
      { q: "Quelle est la capitale de la Suisse ?", a: ["Zurich", "Genève", "Bâle", "Berne"], correct: 3 },
      { q: "Quelle est la capitale de la Nouvelle-Zélande ?", a: ["Auckland", "Wellington", "Christchurch", "Hamilton"], correct: 1 },
      { q: "Quelle ville est le siège du gouvernement (capitale administrative) de l'Afrique du Sud ?", a: ["Le Cap", "Pretoria", "Johannesburg", "Durban"], correct: 1 },
      { q: "Quelle est la capitale du Maroc ?", a: ["Casablanca", "Marrakech", "Rabat", "Fès"], correct: 2 },
      { q: "Quelle est la capitale du Nigeria depuis 1991 ?", a: ["Lagos", "Kano", "Abuja", "Ibadan"], correct: 2 },
      { q: "Quelle est la capitale du Kazakhstan ?", a: ["Astana", "Almaty", "Chymkent", "Karaganda"], correct: 0 },
      { q: "Quelle est la capitale des Fidji, dans le Pacifique ?", a: ["Nadi", "Nouméa", "Suva", "Papeete"], correct: 2 },
      { q: "Quelle est la capitale de la Norvège ?", a: ["Bergen", "Stavanger", "Oslo", "Trondheim"], correct: 2 },
      { q: "Quelle est la capitale du Portugal ?", a: ["Porto", "Coimbra", "Lisbonne", "Faro"], correct: 2 },
      { q: "Quelle est la capitale de la Grèce ?", a: ["Thessalonique", "Patras", "Le Pirée", "Athènes"], correct: 3 },
      { q: "Quelle est la capitale de l'Argentine ?", a: ["Córdoba", "Rosario", "Buenos Aires", "Mendoza"], correct: 2 },
      { q: "Quelle est la capitale du Pérou ?", a: ["Cuzco", "Lima", "Arequipa", "Quito"], correct: 1 },
      { q: "Quelle est la capitale de l'Égypte ?", a: ["Le Caire", "Alexandrie", "Louxor", "Gizeh"], correct: 0 },
      { q: "Quelle est la capitale du Vietnam ?", a: ["Hanoï", "Hô-Chi-Minh-Ville", "Hué", "Da Nang"], correct: 0 },
      { q: "Quelle est la capitale de la Pologne ?", a: ["Varsovie", "Cracovie", "Gdańsk", "Wrocław"], correct: 0 },
      { q: "Quels trois pays forment le Benelux ?", a: ["France, Belgique et Suisse", "Allemagne, Autriche et Suisse", "Danemark, Suède et Norvège", "Belgique, Pays-Bas et Luxembourg"], correct: 3 },
      { q: "Comment nomme-t-on l'ensemble formé par l'Estonie, la Lettonie et la Lituanie ?", a: ["Les pays nordiques", "les Balkans", "l'Europe centrale", "Les pays baltes"], correct: 3 },
      { q: "Quels trois pays forment le cœur du Maghreb ?", a: ["Égypte, Libye et Soudan", "Mali, Niger et Tchad", "Maroc, Algérie et Tunisie", "Mauritanie, Sénégal et Guinée"], correct: 2 },
      { q: "Quelle péninsule regroupe l'Espagne et le Portugal ?", a: ["La péninsule des Balkans", "La péninsule Ibérique", "la péninsule italienne", "la péninsule anatolienne"], correct: 1 },
      { q: "Par quel faubourg de Londres passe le méridien de référence (longitude 0) ?", a: ["Westminster", "Camden", "Greenwich", "Croydon"], correct: 2 },
      { q: "Sur quel continent se trouve le pôle Sud ?", a: ["L'Antarctique", "L'Amérique du Sud", "l'Océanie", "aucun, c'est l'océan"], correct: 0 },
      { q: "Combien y a-t-il de Grands Lacs à la frontière entre les États-Unis et le Canada ?", a: ["Trois", "Quatre", "Six", "Cinq"], correct: 3 },
      { q: "Quelle ligne imaginaire partage la Terre en hémisphères nord et sud ?", a: ["Le tropique du Cancer", "L'équateur", "le méridien de Greenwich", "le cercle polaire"], correct: 1 },
      { q: "Dans quel océan se trouve l'île de la Réunion, département français ?", a: ["L'océan Pacifique", "L'océan Indien", "l'océan Atlantique", "la mer des Caraïbes"], correct: 1 },
      { q: "Dans quel océan se situe la Nouvelle-Calédonie ?", a: ["L'océan Indien", "l'océan Atlantique", "L'océan Pacifique", "l'océan Arctique"], correct: 2 },
      { q: "Par quel grand massif forestier la Guyane française est-elle recouverte ?", a: ["La forêt amazonienne", "La taïga", "la forêt tempérée", "la mangrove seule"], correct: 0 },
      { q: "Quel célèbre îlot, relié par une digue, se dresse dans une baie normande ?", a: ["Le Mont-Saint-Michel", "L'île d'Aix", "le fort Boyard", "l'île de Bréhat"], correct: 0 },
      { q: "Quelle mer borde la France entre la Bretagne et l'Angleterre ?", a: ["La Manche", "La mer du Nord", "la mer Celtique", "le golfe de Gascogne"], correct: 0 },
      { q: "Quel pays scandinave est célèbre pour ses profonds fjords ?", a: ["La Finlande", "le Danemark", "l'Islande", "La Norvège"], correct: 3 },
      { q: "Le mont Everest se dresse à la frontière du Népal et de quel autre territoire ?", a: ["L'Inde", "La Chine (Tibet)", "le Bhoutan", "le Pakistan"], correct: 1 },
      { q: "Quel grand fleuve prend sa source au lac Victoria et traverse l'Égypte ?", a: ["Le Congo", "le Niger", "Le Nil", "le Zambèze"], correct: 2 },
      { q: "Quelles chutes spectaculaires se trouvent à la frontière du Brésil et de l'Argentine ?", a: ["Les chutes du Niagara", "les chutes Victoria", "le Salto Ángel", "Les chutes d'Iguaçu"], correct: 3 },
      { q: "Entre quels deux pays les chutes Victoria se trouvent-elles, sur le Zambèze ?", a: ["Le Kenya et la Tanzanie", "La Zambie et le Zimbabwe", "l'Afrique du Sud et le Botswana", "l'Angola et la Namibie"], correct: 1 },
      { q: "Quel pays d'Asie du Sud-Est est traversé par le fleuve Mékong avant son delta ?", a: ["Le Japon", "les Philippines", "Le Vietnam", "la Corée"], correct: 2 },
      { q: "Quelle grande île de l'océan Indien, à l'est de l'Afrique, abrite une faune unique ?", a: ["Le Sri Lanka", "Madagascar", "les Seychelles", "Zanzibar"], correct: 1 },
      { q: "Quel massif volcanique domine la Tanzanie et culmine à près de 5 900 mètres ?", a: ["Le Kilimandjaro", "Le mont Kenya", "le Ruwenzori", "le Meru"], correct: 0 },
      { q: "Quelle cordillère longe toute la côte ouest de l'Amérique du Sud ?", a: ["Les Rocheuses", "la Sierra Madre", "Les Andes", "l'Atlas"], correct: 2 },
      { q: "Quel pays d'Amérique du Sud est le plus vaste et le plus peuplé ?", a: ["L'Argentine", "la Colombie", "le Pérou", "Le Brésil"], correct: 3 },
      { q: "Quelle mer intérieure, entre l'Europe et l'Asie, borde la Turquie au nord ?", a: ["La mer Rouge", "la mer Baltique", "la mer d'Aral", "La mer Noire"], correct: 3 },
      { q: "Quel grand pays occupe la majeure partie de la péninsule arabique ?", a: ["L'Iran", "l'Irak", "le Yémen", "L'Arabie saoudite"], correct: 3 },
      { q: "Quelle chaîne sépare traditionnellement l'Europe de l'Asie à l'est de la Russie ?", a: ["Le Caucase", "L'Oural", "les Carpates", "l'Altaï"], correct: 1 },
      { q: "Quel isthme relie l'Amérique du Nord à l'Amérique du Sud ?", a: ["L'isthme de Panama", "L'isthme de Suez", "l'isthme de Corinthe", "l'isthme de Kra"], correct: 0 },
      { q: "Quel pays d'Europe centrale n'a aucun accès à la mer et a pour capitale Vienne ?", a: ["La Suisse", "la Hongrie", "la Tchéquie", "L'Autriche"], correct: 3 },
      { q: "Quelle grande île britannique comprend l'Angleterre, l'Écosse et le pays de Galles ?", a: ["La Grande-Bretagne", "L'Irlande", "les Hébrides", "l'île de Man"], correct: 0 },
      { q: "Quel pays d'Afrique de l'Est a pour capitale Nairobi ?", a: ["Le Kenya", "La Tanzanie", "l'Ouganda", "l'Éthiopie"], correct: 0 },
      { q: "Quel vaste plateau désertique et montagneux couvre l'ouest des États-Unis ?", a: ["Le Grand Bassin", "La Grande Plaine", "le Bouclier canadien", "les Everglades"], correct: 0 },
      { q: "Quel fleuve d'Amérique du Nord traverse le pays du nord au sud jusqu'au golfe du Mexique ?", a: ["Le Colorado", "le Saint-Laurent", "Le Mississippi", "le Rio Grande"], correct: 2 },
    ],
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
    expert: [
      { q: "Quel avare de Molière veille jalousement sur sa cassette ?", a: ["Argan", "Tartuffe", "Alceste", "Harpagon"], correct: 3 },
      { q: "Dans quelle pièce M. Jourdain découvre qu'il fait de la prose sans le savoir ?", a: ["L'Avare", "Le Misanthrope", "Dom Juan", "Le Bourgeois gentilhomme"], correct: 3 },
      { q: "Quel dramaturge mourut peu après avoir interprété « Le Malade imaginaire » ?", a: ["Racine", "Molière", "Corneille", "Marivaux"], correct: 1 },
      { q: "Quel est le véritable nom de Molière ?", a: ["Pierre de Marivaux", "Jean-Baptiste Poquelin", "Jean Rotrou", "Cyrano de Bergerac"], correct: 1 },
      { q: "Quel héros du « Cid » de Corneille est déchiré entre l'amour et l'honneur ?", a: ["Rodrigue", "Néron", "Hippolyte", "Titus"], correct: 0 },
      { q: "Quel dramaturge classique écrivit la tragédie « Phèdre » ?", a: ["Racine", "Corneille", "Molière", "Voltaire"], correct: 0 },
      { q: "Quel héros à l'esprit vif et au grand nez aime Roxane dans une pièce de Rostand ?", a: ["Ruy Blas", "Lorenzaccio", "Scapin", "Cyrano de Bergerac"], correct: 3 },
      { q: "Dans quelle pièce de Beckett deux vagabonds attendent un certain Godot qui ne vient jamais ?", a: ["Rhinocéros", "En attendant Godot", "Huis clos", "La Cantatrice chauve"], correct: 1 },
      { q: "Quel recueil de Baudelaire, condamné en 1857, ouvre la voie à la poésie moderne ?", a: ["Les Contemplations", "Alcools", "Les Fleurs du mal", "Poèmes saturniens"], correct: 2 },
      { q: "Quel poète adolescent écrivit « Le Bateau ivre » avant de renoncer à la littérature ?", a: ["Paul Verlaine", "Stéphane Mallarmé", "Alfred de Musset", "Arthur Rimbaud"], correct: 3 },
      { q: "Combien de syllabes compte un vers alexandrin classique ?", a: ["Huit", "Dix", "Douze", "Quatorze"], correct: 2 },
      { q: "Quel poète de la Renaissance, chef de file de la Pléiade, a chanté les roses et l'amour ?", a: ["Villon", "Du Bellay", "Ronsard", "Marot"], correct: 2 },
      { q: "Quel mouvement du XIXe exalte les sentiments, la nature et le « moi » (Lamartine, Musset) ?", a: ["Le romantisme", "Le classicisme", "Le naturalisme", "Le Parnasse"], correct: 0 },
      { q: "Quel auteur du XVIIe a écrit les Fables mettant en scène des animaux ?", a: ["Charles Perrault", "Ésope moderne", "Florian", "Jean de La Fontaine"], correct: 3 },
      { q: "Dans quelle fable un imprudent, ayant chanté tout l'été, se retrouve démuni l'hiver ?", a: ["La Cigale et la Fourmi", "Le Corbeau et le Renard", "Le Lièvre et la Tortue", "Le Loup et l'Agneau"], correct: 0 },
      { q: "Quel auteur du XVIIe a fixé par écrit les contes comme Cendrillon et Le Chat botté ?", a: ["Charles Perrault", "Les frères Grimm", "Jean de La Fontaine", "Hans Christian Andersen"], correct: 0 },
      { q: "Quel conteur danois a écrit « La Petite Sirène » et « Le Vilain Petit Canard » ?", a: ["Charles Perrault", "Les frères Grimm", "Lewis Carroll", "Hans Christian Andersen"], correct: 3 },
      { q: "Quel bagnard au grand cœur est le héros des « Misérables » de Victor Hugo ?", a: ["Edmond Dantès", "Julien Sorel", "Jean Valjean", "Rastignac"], correct: 2 },
      { q: "Quel sonneur de cloches bossu aime Esmeralda dans un roman de Victor Hugo ?", a: ["Gwynplaine", "Quasimodo", "Triboulet", "Claude Frollo"], correct: 1 },
      { q: "Quel vaste ensemble romanesque de Balzac regroupe des dizaines de romans reliés ?", a: ["La Comédie humaine", "Les Rougon-Macquart", "Les Misérables", "La Chronique des Pasquier"], correct: 0 },
      { q: "Quel jeune ambitieux provincial est le héros du « Rouge et le Noir » de Stendhal ?", a: ["Julien Sorel", "Georges Duroy", "Frédéric Moreau", "Lucien de Rubempré"], correct: 0 },
      { q: "Quelle héroïne provinciale, rêveuse et insatisfaite, est au cœur d'un roman de Flaubert ?", a: ["Nana", "Thérèse Raquin", "Cosette", "Emma Bovary"], correct: 3 },
      { q: "Quel roman de Zola dépeint la dure grève des mineurs du Nord ?", a: ["Germinal", "L'Assommoir", "La Bête humaine", "Au Bonheur des Dames"], correct: 0 },
      { q: "Quel courant littéraire, fondé sur l'observation minutieuse du réel, Zola incarne-t-il ?", a: ["Le romantisme", "Le symbolisme", "Le naturalisme", "Le surréalisme"], correct: 2 },
      { q: "Quel auteur réaliste est un maître de la nouvelle avec « Boule de suif » et « Le Horla » ?", a: ["Alphonse Daudet", "Prosper Mérimée", "Villiers de l'Isle-Adam", "Maupassant"], correct: 3 },
      { q: "Quel héros injustement emprisonné devient le comte de Monte-Cristo chez Dumas ?", a: ["Edmond Dantès", "D'Artagnan", "Jean Valjean", "Lagardère"], correct: 0 },
      { q: "Quelle romancière du XIXe écrivait sous le nom masculin de George Sand ?", a: ["Colette", "Madame de Staël", "Aurore Dupin", "Marceline Desbordes"], correct: 2 },
      { q: "Quel capitaine commande le sous-marin Nautilus dans un roman de Jules Verne ?", a: ["Le capitaine Achab", "Le capitaine Haddock", "Le capitaine Nemo", "Le capitaine Crochet"], correct: 2 },
      { q: "Quel personnage de Jules Verne parie de faire le tour du monde en quatre-vingts jours ?", a: ["Phileas Fogg", "Michel Strogoff", "Axel Lidenbrock", "Cyrus Smith"], correct: 0 },
      { q: "Quel conte, écrit par un aviateur, met en scène un petit prince et sa rose ?", a: ["Le Petit Prince", "Alice au pays des merveilles", "Peter Pan", "Le Magicien d'Oz"], correct: 0 },
      { q: "Qui a écrit « Le Petit Prince » ?", a: ["Jean Giono", "Marcel Pagnol", "Antoine de Saint-Exupéry", "Romain Gary"], correct: 2 },
      { q: "Quel conte philosophique de Voltaire suit un héros optimiste malmené par le monde ?", a: ["Zadig", "Micromégas", "L'Ingénu", "Candide"], correct: 3 },
      { q: "Quel écrivain des Lumières signait ses œuvres du pseudonyme « Voltaire » ?", a: ["Denis Diderot", "Jean-Jacques Rousseau", "Montesquieu", "François-Marie Arouet"], correct: 3 },
      { q: "Quel penseur de la Renaissance a inventé le genre de l'« essai » avec son œuvre éponyme ?", a: ["Rabelais", "Érasme", "Montaigne", "Pascal"], correct: 2 },
      { q: "Quel auteur de la Renaissance a créé les géants Gargantua et Pantagruel ?", a: ["Montaigne", "Rabelais", "Ronsard", "Marot"], correct: 1 },
      { q: "Quel roman épistolaire de Laclos met en scène la marquise de Merteuil et le vicomte de Valmont ?", a: ["La Nouvelle Héloïse", "Manon Lescaut", "La Princesse de Clèves", "Les Liaisons dangereuses"], correct: 3 },
      { q: "Quel personnage indifférent, jugé pour un meurtre, est le narrateur de « L'Étranger » de Camus ?", a: ["Roquentin", "Meursault", "Bardamu", "Antoine Doinel"], correct: 1 },
      { q: "Quel philosophe-écrivain refusa le prix Nobel de littérature en 1964 ?", a: ["Albert Camus", "Jean-Paul Sartre", "André Malraux", "Louis Aragon"], correct: 1 },
      { q: "Quelle autrice a écrit « Le Deuxième Sexe », essai féministe majeur de 1949 ?", a: ["Marguerite Yourcenar", "Nathalie Sarraute", "Simone de Beauvoir", "Colette"], correct: 2 },
      { q: "Quel cycle romanesque de Proust s'ouvre sur la mémoire éveillée par une madeleine ?", a: ["À la recherche du temps perdu", "Les Thibault", "Jean-Christophe", "La Comédie humaine"], correct: 0 },
      { q: "Quel écrivain français a reçu le prix Nobel de littérature en 2014 ?", a: ["Patrick Modiano", "Michel Houellebecq", "Le Clézio", "Pascal Quignard"], correct: 0 },
      { q: "Quelle écrivaine française a reçu le prix Nobel de littérature en 2022 ?", a: ["Amélie Nothomb", "Leïla Slimani", "Annie Ernaux", "Delphine de Vigan"], correct: 2 },
      { q: "Quel est le plus prestigieux prix littéraire français, décerné chaque automne depuis 1903 ?", a: ["Le prix Renaudot", "Le prix Femina", "Le grand prix de l'Académie", "Le prix Goncourt"], correct: 3 },
      { q: "Quel dramaturge anglais a écrit « Hamlet » et « Roméo et Juliette » ?", a: ["Christopher Marlowe", "Oscar Wilde", "William Shakespeare", "George Bernard Shaw"], correct: 2 },
      { q: "Dans quelle tragédie de Shakespeare deux jeunes amants de Vérone meurent-ils ?", a: ["Othello", "Roméo et Juliette", "Macbeth", "Le Roi Lear"], correct: 1 },
      { q: "Quel héros espagnol de Cervantes prend des moulins à vent pour des géants ?", a: ["Sancho Panza", "Lazarillo", "Figaro", "Don Quichotte"], correct: 3 },
      { q: "Quel poète italien décrit un voyage à travers l'Enfer, le Purgatoire et le Paradis ?", a: ["Pétrarque", "Boccace", "L'Arioste", "Dante"], correct: 3 },
      { q: "À quel poète grec attribue-t-on l'« Iliade » et l'« Odyssée » ?", a: ["Hésiode", "Sophocle", "Virgile", "Homère"], correct: 3 },
      { q: "Quel personnage de Goethe vend son âme au diable Méphistophélès ?", a: ["Werther", "Faust", "Wilhelm Meister", "Egmont"], correct: 1 },
      { q: "Quel écrivain russe est l'auteur de « Guerre et Paix » ?", a: ["Fiodor Dostoïevski", "Léon Tolstoï", "Anton Tchekhov", "Ivan Tourgueniev"], correct: 1 },
      { q: "Quel roman de Dostoïevski suit l'étudiant meurtrier Raskolnikov ?", a: ["Crime et Châtiment", "Les Frères Karamazov", "L'Idiot", "Les Démons"], correct: 0 },
      { q: "Dans quelle nouvelle de Kafka un homme se réveille métamorphosé en insecte ?", a: ["Le Procès", "La Métamorphose", "Le Château", "La Colonie pénitentiaire"], correct: 1 },
      { q: "Quel roman d'Orwell met en scène « Big Brother » et une surveillance totale ?", a: ["Le Meilleur des mondes", "Fahrenheit 451", "La Ferme des animaux", "1984"], correct: 3 },
      { q: "Quel court roman d'Hemingway oppose un vieux pêcheur cubain à un marlin géant ?", a: ["L'Adieu aux armes", "Pour qui sonne le glas", "Le Vieil Homme et la Mer", "Le soleil se lève aussi"], correct: 2 },
      { q: "Quel écrivain colombien a écrit « Cent Ans de solitude » ?", a: ["Jorge Luis Borges", "Gabriel García Márquez", "Mario Vargas Llosa", "Pablo Neruda"], correct: 1 },
      { q: "Dans quel roman d'Oscar Wilde un portrait vieillit à la place de son modèle ?", a: ["Le Portrait de Dorian Gray", "De Profundis", "L'Importance d'être Constant", "Le Fantôme de Canterville"], correct: 0 },
      { q: "Quelle romancière anglaise a écrit « Orgueil et Préjugés » ?", a: ["Emily Brontë", "Virginia Woolf", "Jane Austen", "Mary Shelley"], correct: 2 },
      { q: "Quel avare, visité par des fantômes de Noël, est un personnage de Charles Dickens ?", a: ["Oliver Twist", "David Copperfield", "Ebenezer Scrooge", "Fagin"], correct: 2 },
      { q: "Quel capitaine obsédé poursuit la baleine blanche dans « Moby Dick » ?", a: ["Le capitaine Achab", "Le capitaine Nemo", "Long John Silver", "Le capitaine Crochet"], correct: 0 },
      { q: "Quelle autrice a imaginé la créature de « Frankenstein » ?", a: ["Bram Stoker", "Mary Shelley", "Ann Radcliffe", "Emily Brontë"], correct: 1 },
      { q: "Dans le roman de Mary Shelley, « Frankenstein » désigne en réalité qui ?", a: ["Le monstre lui-même", "Le narrateur marin", "Le savant qui crée la créature", "Le village maudit"], correct: 2 },
      { q: "Quel auteur a inventé la Terre du Milieu et l'anneau unique ?", a: ["C. S. Lewis", "George R. R. Martin", "Ursula Le Guin", "J. R. R. Tolkien"], correct: 3 },
      { q: "Quelle romancière britannique a créé le détective belge Hercule Poirot ?", a: ["P. D. James", "Agatha Christie", "Ruth Rendell", "Dorothy Sayers"], correct: 1 },
      { q: "Quel détective vit au 221B Baker Street, imaginé par Arthur Conan Doyle ?", a: ["Arsène Lupin", "Hercule Poirot", "le père Brown", "Sherlock Holmes"], correct: 3 },
      { q: "Quelle autrice britannique a créé le jeune sorcier Harry Potter ?", a: ["J. K. Rowling", "Enid Blyton", "Roald Dahl", "Philip Pullman"], correct: 0 },
      { q: "Quelle figure de style rapproche deux réalités sans mot de comparaison (« cet homme est un lion ») ?", a: ["La comparaison", "L'hyperbole", "La métaphore", "La litote"], correct: 2 },
      { q: "Quelle figure atténue l'expression pour suggérer davantage (« je ne te hais point ») ?", a: ["L'hyperbole", "La métaphore", "L'euphémisme", "La litote"], correct: 3 },
      { q: "Comment nomme-t-on la toute première phrase, l'ouverture d'un roman ?", a: ["Le dénouement", "L'épilogue", "L'incipit", "La péroraison"], correct: 2 },
      { q: "Comment appelle-t-on un poème à forme fixe de deux quatrains suivis de deux tercets ?", a: ["L'ode", "La ballade", "Le rondeau", "Le sonnet"], correct: 3 },
      { q: "Quel roman d'Antoine de Saint-Exupéry évoque l'aviation et le courrier au-dessus des Andes ?", a: ["Le Grand Meaulnes", "Vol de nuit", "Les Chevaliers du ciel", "L'Équipage"], correct: 1 },
      { q: "Quel roman d'Alain-Fournier raconte une adolescence et un domaine mystérieux ?", a: ["Le Diable au corps", "Le Grand Meaulnes", "Le Blé en herbe", "Poil de carotte"], correct: 1 },
      { q: "Quel écrivain a signé « Voyage au bout de la nuit », au style parlé novateur ?", a: ["Louis-Ferdinand Céline", "André Gide", "Georges Bernanos", "François Mauriac"], correct: 0 },
      { q: "Quel prix littéraire, créé pour concurrencer le Goncourt, est décerné par un jury féminin ?", a: ["Le prix Renaudot", "Le prix Femina", "Le prix Médicis", "Le prix Interallié"], correct: 1 },
      { q: "Quelle autrice belge, très prolifique, publie un roman chaque rentrée depuis 1992 ?", a: ["Françoise Sagan", "Anna Gavalda", "Amélie Nothomb", "Katherine Pancol"], correct: 2 },
      { q: "Quel très jeune auteur connut un succès immédiat avec « Bonjour tristesse » en 1954 ?", a: ["Françoise Sagan", "Marguerite Duras", "Simone de Beauvoir", "Colette"], correct: 0 },
      { q: "Quel roman de Marguerite Duras, prix Goncourt 1984, évoque une passion en Indochine ?", a: ["Hiroshima mon amour", "Un barrage contre le Pacifique", "L'Amant", "Le Ravissement de Lol V. Stein"], correct: 2 },
      { q: "Quel poète a rassemblé des textes comme « Les Feuilles mortes » dans le recueil « Paroles » ?", a: ["Paul Éluard", "Jacques Prévert", "Louis Aragon", "Robert Desnos"], correct: 1 },
      { q: "Quel mouvement littéraire, lancé par André Breton en 1924, explore le rêve et l'inconscient ?", a: ["Le surréalisme", "Le dadaïsme", "Le symbolisme", "Le futurisme"], correct: 0 },
      { q: "Quel écrivain italien a signé le roman policier médiéval « Le Nom de la rose » ?", a: ["Italo Calvino", "Umberto Eco", "Primo Levi", "Alberto Moravia"], correct: 1 },
      { q: "Quel roman de Stevenson met en scène un homme partagé entre deux personnalités opposées ?", a: ["L'Île au trésor", "Dracula", "Le Portrait de Dorian Gray", "L'Étrange Cas du Dr Jekyll et de M. Hyde"], correct: 3 },
      { q: "Quelle romancière anglaise a écrit « Les Hauts de Hurlevent » ?", a: ["Charlotte Brontë", "Emily Brontë", "Jane Austen", "George Eliot"], correct: 1 },
      { q: "Quel écrivain américain a créé le personnage espiègle de Tom Sawyer ?", a: ["Mark Twain", "Jack London", "Herman Melville", "Nathaniel Hawthorne"], correct: 0 },
      { q: "Quel roman d'aventures de Robert Louis Stevenson lance la chasse au trésor du pirate Flint ?", a: ["Robinson Crusoé", "Moby Dick", "L'Île au trésor", "Sa Majesté des Mouches"], correct: 2 },
      { q: "Quel naufragé de Daniel Defoe survit des années sur une île déserte avec Vendredi ?", a: ["Robinson Crusoé", "Gulliver", "Long John Silver", "Ulysse"], correct: 0 },
      { q: "Quel héros de Jonathan Swift échoue chez les minuscules habitants de Lilliput ?", a: ["Gulliver", "Robinson Crusoé", "Candide", "Pantagruel"], correct: 0 },
      { q: "Quel écrivain russe est l'auteur des nouvelles et pièces comme « La Cerisaie » ?", a: ["Nicolas Gogol", "Anton Tchekhov", "Maxime Gorki", "Alexandre Pouchkine"], correct: 1 },
      { q: "Quel poète et dramaturge est considéré comme le père de la littérature russe (« Eugène Onéguine ») ?", a: ["Léon Tolstoï", "Anton Tchekhov", "Alexandre Pouchkine", "Nicolas Gogol"], correct: 2 },
      { q: "Quel auteur américain de nouvelles fantastiques a écrit le poème « Le Corbeau » ?", a: ["H. P. Lovecraft", "Edgar Allan Poe", "Washington Irving", "Ambrose Bierce"], correct: 1 },
      { q: "Quel dramaturge norvégien a écrit « Une maison de poupée » ?", a: ["August Strindberg", "Anton Tchekhov", "Henrik Ibsen", "Bertolt Brecht"], correct: 2 },
      { q: "Quel écrivain tchèque a écrit « L'Insoutenable Légèreté de l'être » ?", a: ["Franz Kafka", "Milan Kundera", "Bohumil Hrabal", "Václav Havel"], correct: 1 },
      { q: "Quel romancier américain a peint la Génération perdue dans « Gatsby le Magnifique » ?", a: ["John Steinbeck", "William Faulkner", "F. Scott Fitzgerald", "Ernest Hemingway"], correct: 2 },
      { q: "Quel roman de John Steinbeck suit une famille de fermiers ruinés sur les routes de Californie ?", a: ["Les Raisins de la colère", "Des souris et des hommes", "À l'est d'Éden", "Tortilla Flat"], correct: 0 },
      { q: "Quel poète français de la Renaissance, malfaiteur, écrivit la « Ballade des pendus » ?", a: ["Ronsard", "François Villon", "Du Bellay", "Charles d'Orléans"], correct: 1 },
      { q: "Quelle héroïne de Lewis Carroll suit un lapin blanc et tombe dans un terrier ?", a: ["Wendy", "Alice", "Dorothy", "Gerda"], correct: 1 },
      { q: "Quel écrivain a créé le gentleman-cambrioleur Arsène Lupin ?", a: ["Gaston Leroux", "Georges Simenon", "Marcel Allain", "Maurice Leblanc"], correct: 3 },
      { q: "Quel commissaire à la pipe, créé par Simenon, mène ses enquêtes à Paris ?", a: ["L'inspecteur Lavardin", "Nestor Burma", "Le juge Ti", "Le commissaire Maigret"], correct: 3 },
      { q: "Quel roman de Gaston Leroux se déroule sous l'Opéra de Paris avec un mystérieux fantôme ?", a: ["Le Mystère de la chambre jaune", "Le Bossu", "Belphégor", "Le Fantôme de l'Opéra"], correct: 3 },
      { q: "Quel dramaturge allemand a théorisé la « distanciation » au théâtre ?", a: ["Bertolt Brecht", "Friedrich Schiller", "Frank Wedekind", "Georg Büchner"], correct: 0 },
      { q: "Quelle épopée médiévale française raconte la mort du chevalier Roland à Roncevaux ?", a: ["Le Roman de Renart", "Tristan et Iseut", "La Chanson de Roland", "Perceval"], correct: 2 },
      { q: "Quel recueil satirique du Moyen Âge met en scène le goupil Renart et le loup Ysengrin ?", a: ["La Chanson de Roland", "Le Roman de la Rose", "Les Fabliaux", "Le Roman de Renart"], correct: 3 },
    ],
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
    expert: [
      { q: "Combien de planètes compte le système solaire depuis le reclassement de 2006 ?", a: ["Huit", "Sept", "Neuf", "Dix"], correct: 0 },
      { q: "Dans quelle catégorie Pluton a-t-il été reclassé en 2006 ?", a: ["Planète naine", "Astéroïde", "Comète", "Satellite"], correct: 0 },
      { q: "Quelle est la plus grande planète du système solaire ?", a: ["Jupiter", "Saturne", "Neptune", "la Terre"], correct: 0 },
      { q: "Quelle planète est surnommée la « planète rouge » ?", a: ["Vénus", "Mars", "Mercure", "Jupiter"], correct: 1 },
      { q: "Quelle planète est la plus chaude, malgré Mercure plus proche du Soleil ?", a: ["Mars", "Vénus", "Jupiter", "Saturne"], correct: 1 },
      { q: "Comment se nomme la galaxie qui abrite notre système solaire ?", a: ["Andromède", "La Voie lactée", "le Grand Nuage de Magellan", "le Tourbillon"], correct: 1 },
      { q: "Quelle théorie décrit l'origine et l'expansion de l'univers ?", a: ["La relativité", "Le Big Bang", "la théorie des cordes", "le géocentrisme"], correct: 1 },
      { q: "Quel objet céleste a une gravité si intense que même la lumière ne peut s'en échapper ?", a: ["Une supernova", "Un trou noir", "une naine blanche", "un quasar"], correct: 1 },
      { q: "Comment appelle-t-on un astre glacé qui développe une longue queue en s'approchant du Soleil ?", a: ["Une comète", "Un astéroïde", "une météorite", "une étoile filante"], correct: 0 },
      { q: "Lors d'une éclipse solaire, quel astre s'interpose entre la Terre et le Soleil ?", a: ["Mars", "Vénus", "La Lune", "un nuage"], correct: 2 },
      { q: "Quel télescope spatial, lancé en 2021, observe l'univers dans l'infrarouge ?", a: ["Hubble", "Kepler", "James-Webb", "Spitzer"], correct: 2 },
      { q: "Qui fut le premier être humain à voyager dans l'espace, en 1961 ?", a: ["Neil Armstrong", "Alan Shepard", "Youri Gagarine", "Thomas Pesquet"], correct: 2 },
      { q: "Que mesure une année-lumière ?", a: ["Une durée", "Une distance", "une vitesse", "une masse"], correct: 1 },
      { q: "Quel élément chimique est de loin le plus abondant dans le Soleil ?", a: ["L'hélium", "l'oxygène", "L'hydrogène", "le fer"], correct: 2 },
      { q: "Quel astre est principalement responsable des marées sur Terre ?", a: ["Le Soleil", "La Lune", "Mars", "Jupiter"], correct: 1 },
      { q: "Quel savant anglais a formulé la loi de la gravitation universelle ?", a: ["Galilée", "Kepler", "Copernic", "Isaac Newton"], correct: 3 },
      { q: "Quelle célèbre équation d'Einstein relie l'énergie et la masse ?", a: ["F = ma", "a² + b² = c²", "E = mc²", "PV = nRT"], correct: 2 },
      { q: "Comment nomme-t-on le passage direct de l'état solide à l'état gazeux ?", a: ["La fusion", "la condensation", "La sublimation", "la vaporisation"], correct: 2 },
      { q: "À quelle température l'eau bout-elle au niveau de la mer ?", a: ["90 °C", "80 °C", "120 °C", "100 °C"], correct: 3 },
      { q: "En quelle unité mesure-t-on la tension électrique ?", a: ["L'ampère", "Le volt", "le watt", "l'ohm"], correct: 1 },
      { q: "Quelle unité mesure la puissance ?", a: ["Le joule", "Le watt", "le volt", "le newton"], correct: 1 },
      { q: "Que font deux pôles magnétiques identiques mis face à face ?", a: ["Ils s'attirent", "ils s'annulent", "ils fusionnent", "Ils se repoussent"], correct: 3 },
      { q: "En traversant un prisme, en quoi la lumière blanche se décompose-t-elle ?", a: ["Les couleurs du spectre", "De la chaleur seule", "un rayon unique", "de l'électricité"], correct: 0 },
      { q: "Dans quel milieu le son ne peut-il absolument pas se propager ?", a: ["L'eau", "l'air", "Le vide", "le métal"], correct: 2 },
      { q: "Quel principe, découvert par Archimède, explique qu'un bateau flotte ?", a: ["La gravité", "la tension de surface", "la capillarité", "La poussée d'Archimède"], correct: 3 },
      { q: "Quelle scientifique a découvert le polonium et le radium et reçu deux prix Nobel ?", a: ["Rosalind Franklin", "Lise Meitner", "Ada Lovelace", "Marie Curie"], correct: 3 },
      { q: "Quelles particules, avec les neutrons, composent le noyau de l'atome ?", a: ["Les électrons", "les photons", "Les protons", "les ions"], correct: 2 },
      { q: "Quelle est la charge électrique de l'électron ?", a: ["Négative", "Positive", "Neutre", "Variable"], correct: 0 },
      { q: "Quel physicien a découvert les rayons X en 1895 ?", a: ["Röntgen", "Becquerel", "Marie Curie", "Rutherford"], correct: 0 },
      { q: "Quelle est la formule chimique de l'eau ?", a: ["H2O", "CO2", "O2", "H2O2"], correct: 0 },
      { q: "Quel gaz les humains rejettent-ils en respirant et les plantes absorbent-elles ?", a: ["Le dioxyde de carbone", "L'oxygène", "l'azote", "l'hydrogène"], correct: 0 },
      { q: "Quel chimiste russe a conçu le tableau périodique des éléments ?", a: ["Lavoisier", "Mendeleïev", "Dalton", "Bohr"], correct: 1 },
      { q: "Quel est le symbole chimique de l'or ?", a: ["Au", "Or", "Ag", "Go"], correct: 0 },
      { q: "Que représente le symbole chimique « Fe » ?", a: ["Le cuivre", "Le fer", "le plomb", "l'étain"], correct: 1 },
      { q: "Sur l'échelle du pH, quelle valeur correspond à un milieu neutre ?", a: ["7", "0", "10", "14"], correct: 0 },
      { q: "Quel composé chimique constitue le sel de table ?", a: ["Le carbonate de calcium", "le bicarbonate", "le nitrate de potassium", "Le chlorure de sodium"], correct: 3 },
      { q: "Quel est l'élément chimique le plus léger ?", a: ["L'hélium", "le carbone", "L'hydrogène", "l'oxygène"], correct: 2 },
      { q: "De quel élément le diamant est-il entièrement constitué ?", a: ["Le silicium", "Le carbone", "le calcium", "le quartz"], correct: 1 },
      { q: "Le bronze est un alliage de cuivre et de quel autre métal ?", a: ["L'étain", "Le zinc", "le plomb", "le fer"], correct: 0 },
      { q: "Quel métal est liquide à température ambiante ?", a: ["Le plomb", "l'étain", "Le mercure", "le sodium"], correct: 2 },
      { q: "Quel gaz, plus léger que l'air, fait s'élever les ballons de fête ?", a: ["Le dioxyde de carbone", "l'azote", "L'hélium", "le méthane"], correct: 2 },
      { q: "Environ combien d'os compte le squelette d'un adulte ?", a: ["106", "306", "206", "150"], correct: 2 },
      { q: "Quelle cellule du sang transporte l'oxygène grâce à l'hémoglobine ?", a: ["Le globule blanc", "la plaquette", "Le globule rouge", "le plasma"], correct: 2 },
      { q: "Quelle est la cellule de base du système nerveux ?", a: ["Le globule blanc", "l'ovule", "la myéline", "Le neurone"], correct: 3 },
      { q: "Quelle molécule, en forme de double hélice, porte l'information génétique ?", a: ["L'ADN", "L'ARN messager", "la protéine", "le glucose"], correct: 0 },
      { q: "Combien de chromosomes contient une cellule humaine ordinaire ?", a: ["23", "48", "44", "46"], correct: 3 },
      { q: "Quel moine a fondé la génétique en étudiant l'hérédité des petits pois ?", a: ["Charles Darwin", "Louis Pasteur", "Gregor Mendel", "Lamarck"], correct: 2 },
      { q: "Quel organe filtre le sang et produit l'urine ?", a: ["Le foie", "la rate", "Le rein", "le pancréas"], correct: 2 },
      { q: "Quelle vitamine, produite grâce au soleil, est essentielle à la solidité des os ?", a: ["La vitamine C", "La vitamine D", "la vitamine A", "la vitamine B12"], correct: 1 },
      { q: "Quelle fine membrane de l'oreille vibre sous l'effet du son ?", a: ["La rétine", "la cornée", "Le tympan", "le cristallin"], correct: 2 },
      { q: "Quel organe produit l'insuline qui régule le sucre dans le sang ?", a: ["Le pancréas", "Le foie", "la rate", "l'estomac"], correct: 0 },
      { q: "Quel organite est surnommé la « centrale énergétique » de la cellule ?", a: ["Le noyau", "le ribosome", "La mitochondrie", "la membrane"], correct: 2 },
      { q: "Quelle est la couche externe et solide de la Terre, sur laquelle nous vivons ?", a: ["Le manteau", "La croûte terrestre", "le noyau externe", "le noyau interne"], correct: 1 },
      { q: "Le mouvement de quelles grandes structures provoque séismes et volcans ?", a: ["Les nuages", "les courants marins", "les vents", "Les plaques tectoniques"], correct: 3 },
      { q: "Quelle échelle célèbre mesure la magnitude d'un séisme ?", a: ["L'échelle de Beaufort", "L'échelle de Richter", "l'échelle de Mohs", "l'échelle de Celsius"], correct: 1 },
      { q: "Quel gaz est le plus abondant dans l'atmosphère terrestre ?", a: ["L'oxygène", "le dioxyde de carbone", "L'azote", "l'argon"], correct: 2 },
      { q: "Quelle couche de l'atmosphère nous protège des rayons ultraviolets du Soleil ?", a: ["La troposphère", "La couche d'ozone", "la ionosphère", "la mésosphère"], correct: 1 },
      { q: "Quelle dureté extrême place le diamant au sommet de l'échelle de Mohs ?", a: ["La dureté maximale (10)", "La dureté du talc", "une dureté moyenne", "la dureté du quartz"], correct: 0 },
      { q: "Quelle est la valeur approchée du nombre pi ?", a: ["Environ 3,14", "Environ 2,72", "Environ 1,61", "Environ 3,60"], correct: 0 },
      { q: "Quelle est la somme des angles d'un triangle ?", a: ["90 degrés", "360 degrés", "270 degrés", "180 degrés"], correct: 3 },
      { q: "Quel théorème relie les longueurs des côtés d'un triangle rectangle ?", a: ["Le théorème de Thalès", "le théorème de Fermat", "le théorème d'Euclide", "Le théorème de Pythagore"], correct: 3 },
      { q: "Comment appelle-t-on un polygone à six côtés ?", a: ["Un pentagone", "un octogone", "un heptagone", "Un hexagone"], correct: 3 },
      { q: "Comment nomme-t-on un nombre entier divisible uniquement par 1 et par lui-même ?", a: ["Un nombre pair", "un nombre parfait", "un nombre carré", "Un nombre premier"], correct: 3 },
      { q: "Quel système de numération, à base de 0 et de 1, est utilisé par les ordinateurs ?", a: ["Le système décimal", "le système romain", "le système hexadécimal", "Le système binaire"], correct: 3 },
      { q: "Comment appelle-t-on la mesure de l'espace intérieur d'un solide, en trois dimensions ?", a: ["L'aire", "Le volume", "le périmètre", "la surface"], correct: 1 },
      { q: "Quel inventeur américain est associé à la mise au point de l'ampoule électrique ?", a: ["Nikola Tesla", "Thomas Edison", "Benjamin Franklin", "Alexander Bell"], correct: 1 },
      { q: "À qui attribue-t-on l'invention du téléphone ?", a: ["Alexander Graham Bell", "Thomas Edison", "Guglielmo Marconi", "Samuel Morse"], correct: 0 },
      { q: "Quel médecin britannique a découvert la pénicilline en 1928 ?", a: ["Alexander Fleming", "Louis Pasteur", "Robert Koch", "Edward Jenner"], correct: 0 },
      { q: "Quel savant français a mis au point le vaccin contre la rage ?", a: ["Louis Pasteur", "Claude Bernard", "Alexander Fleming", "Robert Koch"], correct: 0 },
      { q: "Quel naturaliste a proposé la théorie de l'évolution par sélection naturelle ?", a: ["Jean-Baptiste Lamarck", "Gregor Mendel", "Charles Darwin", "Carl von Linné"], correct: 2 },
      { q: "Quels frères ont réalisé le premier vol motorisé et contrôlé en 1903 ?", a: ["Les frères Montgolfier", "les frères Lumière", "les frères Voisin", "Les frères Wright"], correct: 3 },
      { q: "Quel mathématicien britannique est considéré comme un père de l'informatique ?", a: ["Charles Babbage", "John von Neumann", "Alan Turing", "Blaise Pascal"], correct: 2 },
      { q: "Qui a inventé le World Wide Web à la fin des années 1980 ?", a: ["Bill Gates", "Steve Jobs", "Vint Cerf", "Tim Berners-Lee"], correct: 3 },
      { q: "Quels frères français ont fait voler le premier ballon à air chaud en 1783 ?", a: ["Les frères Wright", "Les frères Montgolfier", "les frères Lumière", "les frères Renault"], correct: 1 },
      { q: "Quelle réaction, en cassant des noyaux atomiques, produit l'énergie des centrales nucléaires ?", a: ["La fission nucléaire", "La fusion nucléaire", "la combustion", "l'électrolyse"], correct: 0 },
      { q: "Quel savant italien perfectionna la lunette astronomique et défendit l'héliocentrisme ?", a: ["Copernic", "Kepler", "Galilée", "Newton"], correct: 2 },
      { q: "Quels frères ont inventé le cinématographe et projeté les premiers films en 1895 ?", a: ["Les frères Lumière", "Les frères Pathé", "les frères Wright", "les frères Grimm"], correct: 0 },
      { q: "Quels sont les trois états classiques de la matière ?", a: ["Chaud, tiède et froid", "dur, mou et fluide", "Solide, liquide et gazeux", "minéral, végétal et animal"], correct: 2 },
      { q: "Quelle force universelle attire les objets vers le centre de la Terre ?", a: ["Le magnétisme", "La gravité", "l'électricité statique", "la pression"], correct: 1 },
      { q: "Comment appelle-t-on le passage de l'état gazeux à l'état liquide ?", a: ["L'évaporation", "la fusion", "La condensation", "la sublimation"], correct: 2 },
      { q: "Quel instrument mesure la température ?", a: ["Le baromètre", "l'hygromètre", "l'anémomètre", "Le thermomètre"], correct: 3 },
      { q: "Quel instrument mesure la pression atmosphérique ?", a: ["Le thermomètre", "la boussole", "l'altimètre", "Le baromètre"], correct: 3 },
      { q: "Quel appareil, aligné sur le champ magnétique terrestre, indique le nord ?", a: ["Le sextant", "le radar", "le GPS", "La boussole"], correct: 3 },
      { q: "Comment nomme-t-on l'étude scientifique des astres et de l'univers ?", a: ["L'astrologie", "la géologie", "la météorologie", "L'astronomie"], correct: 3 },
      { q: "Quelle science étudie les êtres vivants ?", a: ["La géologie", "la physique", "la chimie", "La biologie"], correct: 3 },
      { q: "Comment appelle-t-on un animal ou une science qui étudie les fossiles ?", a: ["La minéralogie", "l'archéologie", "la sismologie", "La paléontologie"], correct: 3 },
      { q: "Quel gaz respirable, indispensable à la vie, représente environ 21 % de l'air ?", a: ["L'oxygène", "L'azote", "le dioxyde de carbone", "l'hydrogène"], correct: 0 },
      { q: "Comment appelle-t-on le plus petit constituant d'un élément chimique gardant ses propriétés ?", a: ["La molécule", "la cellule", "l'ion", "L'atome"], correct: 3 },
      { q: "Quand deux atomes ou plus se lient, ils forment quoi ?", a: ["Un ion", "Une molécule", "un cristal", "un noyau"], correct: 1 },
      { q: "Quelle grandeur physique se mesure en degrés Celsius ?", a: ["La température", "La masse", "la pression", "la vitesse"], correct: 0 },
      { q: "Quelle énergie propre est produite par des panneaux photovoltaïques ?", a: ["L'énergie éolienne", "l'énergie hydraulique", "l'énergie fossile", "L'énergie solaire"], correct: 3 },
      { q: "Quelle énergie renouvelable est captée par des éoliennes ?", a: ["L'énergie solaire", "L'énergie du vent", "l'énergie géothermique", "l'énergie marémotrice"], correct: 1 },
      { q: "Quel scientifique a énoncé la théorie de la relativité au début du XXe siècle ?", a: ["Albert Einstein", "Isaac Newton", "Niels Bohr", "Max Planck"], correct: 0 },
      { q: "Comment appelle-t-on le changement de direction de la lumière lorsqu'elle passe de l'air à l'eau ?", a: ["La réfraction", "La réflexion", "la diffraction", "l'absorption"], correct: 0 },
      { q: "Quel phénomène renvoie la lumière sur un miroir ?", a: ["La réfraction", "la diffusion", "la polarisation", "La réflexion"], correct: 3 },
      { q: "Quelle est l'unité de mesure de la masse dans le système international ?", a: ["Le litre", "Le kilogramme", "le newton", "le mètre"], correct: 1 },
      { q: "Quelle grandeur le compteur électrique d'une maison mesure-t-il en kilowattheures ?", a: ["La tension", "L'énergie consommée", "la résistance", "la fréquence"], correct: 1 },
      { q: "Comment appelle-t-on l'ensemble des êtres vivants et de leur milieu en interaction ?", a: ["Une population", "une espèce", "Un écosystème", "un biotope isolé"], correct: 2 },
      { q: "Quel savant a énoncé le principe « rien ne se perd, rien ne se crée, tout se transforme » ?", a: ["Pasteur", "Lavoisier", "Newton", "Dalton"], correct: 1 },
      { q: "Quel instrument permet d'observer des cellules et des micro-organismes invisibles à l'œil nu ?", a: ["Le télescope", "le stéthoscope", "Le microscope", "le baromètre"], correct: 2 },
    ],
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
    expert: [
      { q: "Quel compositeur allemand a écrit la 9e Symphonie et son « Ode à la joie » malgré sa surdité ?", a: ["Beethoven", "Mozart", "Bach", "Brahms"], correct: 0 },
      { q: "Quel compositeur autrichien, enfant prodige, a écrit « La Flûte enchantée » et un « Requiem » inachevé ?", a: ["Mozart", "Haydn", "Schubert", "Beethoven"], correct: 0 },
      { q: "Quel compositeur baroque allemand est célèbre pour ses fugues et « Le Clavier bien tempéré » ?", a: ["Georg Friedrich Haendel", "Jean-Sébastien Bach", "Antonio Vivaldi", "Georg Philipp Telemann"], correct: 1 },
      { q: "Quel compositeur vénitien a écrit le cycle de concertos « Les Quatre Saisons » ?", a: ["Vivaldi", "Corelli", "Albinoni", "Scarlatti"], correct: 0 },
      { q: "Quel compositeur romantique polonais a écrit presque exclusivement pour le piano (nocturnes, polonaises) ?", a: ["Liszt", "Schumann", "Mendelssohn", "Chopin"], correct: 3 },
      { q: "Quel compositeur russe a écrit les ballets « Le Lac des cygnes » et « Casse-Noisette » ?", a: ["Tchaïkovski", "Rachmaninov", "Prokofiev", "Borodine"], correct: 0 },
      { q: "Quel compositeur italien a écrit les opéras « La Traviata » et « Aïda » ?", a: ["Puccini", "Verdi", "Rossini", "Donizetti"], correct: 1 },
      { q: "Quel compositeur allemand a composé la tétralogie « L'Anneau du Nibelung » ?", a: ["Brahms", "Bruckner", "Wagner", "Mahler"], correct: 2 },
      { q: "Quel compositeur français est une grande figure de l'impressionnisme musical (« La Mer », « Clair de lune ») ?", a: ["Ravel", "Debussy", "Fauré", "Satie"], correct: 1 },
      { q: "Quel compositeur français a écrit le « Boléro », bâti sur un thème répété en un long crescendo ?", a: ["Debussy", "Saint-Saëns", "Berlioz", "Ravel"], correct: 3 },
      { q: "De quel opéra de Bizet est tirée l'histoire d'une bohémienne séductrice à Séville ?", a: ["La Traviata", "Faust", "Carmen", "Manon"], correct: 2 },
      { q: "Quel oratorio de Haendel contient le célèbre chœur « Alléluia » ?", a: ["La Création", "Les Saisons", "Israël en Égypte", "Le Messie"], correct: 3 },
      { q: "Quel compositeur autrichien, « roi de la valse », a écrit « Le Beau Danube bleu » ?", a: ["Franz Lehár", "Franz Schubert", "Anton Bruckner", "Johann Strauss"], correct: 3 },
      { q: "Quel compositeur américain mêle jazz et classique dans « Rhapsody in Blue » ?", a: ["Aaron Copland", "Leonard Bernstein", "Cole Porter", "George Gershwin"], correct: 3 },
      { q: "Quel ballet de Stravinsky provoqua un scandale mémorable à sa création en 1913 ?", a: ["L'Oiseau de feu", "Petrouchka", "Le Boléro", "Le Sacre du printemps"], correct: 3 },
      { q: "Quel conte musical de Prokofiev associe chaque personnage à un instrument de l'orchestre ?", a: ["Le Carnaval des animaux", "L'Apprenti sorcier", "Pierre et le Loup", "Casse-Noisette"], correct: 2 },
      { q: "Quel compositeur français a écrit la fantaisie « Le Carnaval des animaux » ?", a: ["Gabriel Fauré", "Camille Saint-Saëns", "Jules Massenet", "Paul Dukas"], correct: 1 },
      { q: "Quel compositeur italien a écrit l'opéra « La Bohème » et « Madame Butterfly » ?", a: ["Verdi", "Puccini", "Rossini", "Bellini"], correct: 1 },
      { q: "De quel opéra de Rossini l'ouverture est-elle mondialement connue, reprise dans de nombreux westerns ?", a: ["Le Barbier de Séville", "La Cenerentola", "Semiramide", "Guillaume Tell"], correct: 3 },
      { q: "Quel compositeur romantique français a écrit la « Symphonie fantastique » ?", a: ["César Franck", "Camille Saint-Saëns", "Hector Berlioz", "Vincent d'Indy"], correct: 2 },
      { q: "Qui dirige un orchestre symphonique, souvent à l'aide d'une baguette ?", a: ["Le chef d'orchestre", "Le premier violon", "le soliste", "le compositeur"], correct: 0 },
      { q: "À quelle famille d'instruments appartient la trompette ?", a: ["Les bois", "les cordes", "les percussions", "Les cuivres"], correct: 3 },
      { q: "À quelle famille d'instruments appartient le violon ?", a: ["Les bois", "les cuivres", "les percussions", "Les cordes"], correct: 3 },
      { q: "Le son du piano est produit par de petits marteaux qui viennent frapper quoi ?", a: ["Des cordes", "Des tuyaux", "des lames de métal", "des anches"], correct: 0 },
      { q: "Combien de notes compte la gamme de do majeur (do, ré, mi, fa, sol, la, si) ?", a: ["Sept", "Cinq", "Huit", "Douze"], correct: 0 },
      { q: "Quelle clé, en forme de spirale, sert surtout à noter les sons aigus sur la portée ?", a: ["La clé de fa", "La clé de sol", "la clé d'ut", "la clé de si"], correct: 1 },
      { q: "Quel terme italien indique un tempo vif et enjoué ?", a: ["Allegro", "Adagio", "Lento", "Largo"], correct: 0 },
      { q: "En musique, que demande l'indication « forte » ?", a: ["Jouer doucement", "Jouer fort", "jouer lentement", "jouer vite"], correct: 1 },
      { q: "Quel petit instrument métallique en U donne le « la » de référence pour accorder ?", a: ["Le métronome", "l'archet", "Le diapason", "la sourdine"], correct: 2 },
      { q: "Combien de cordes possède une guitare classique standard ?", a: ["Quatre", "Huit", "Douze", "Six"], correct: 3 },
      { q: "Quel facteur d'instruments belge a inventé le saxophone au XIXe siècle ?", a: ["Théobald Boehm", "Antoine Courtois", "Jean-Baptiste Vuillaume", "Adolphe Sax"], correct: 3 },
      { q: "Quel appareil bat la mesure à un tempo réglable pour aider les musiciens ?", a: ["Le diapason", "Le métronome", "l'accordeur à pince", "le chronomètre"], correct: 1 },
      { q: "Quelle note vaut la durée de deux croches ?", a: ["La blanche", "la ronde", "la double croche", "La noire"], correct: 3 },
      { q: "Quel est, par la taille, le plus grave des instruments à cordes frottées de l'orchestre ?", a: ["Le violoncelle", "l'alto", "La contrebasse", "le violon"], correct: 2 },
      { q: "Que signifie chanter « a cappella » ?", a: ["En chœur uniquement", "en solo", "Sans accompagnement instrumental", "en improvisant"], correct: 2 },
      { q: "Quelle est la voix féminine la plus aiguë ?", a: ["La soprano", "L'alto", "la mezzo-soprano", "la contralto"], correct: 0 },
      { q: "Quelle est la voix masculine la plus grave ?", a: ["Le ténor", "le baryton", "le contre-ténor", "La basse"], correct: 3 },
      { q: "Quel ténor italien formait les « Trois Ténors » avec Plácido Domingo et José Carreras ?", a: ["Andrea Bocelli", "Luciano Pavarotti", "Roberto Alagna", "Enrico Caruso"], correct: 1 },
      { q: "Quelle cantatrice d'origine grecque, surnommée « la Divina », a marqué l'art lyrique du XXe siècle ?", a: ["Montserrat Caballé", "Renata Tebaldi", "Cecilia Bartoli", "Maria Callas"], correct: 3 },
      { q: "Dans quelle ville américaine le jazz est-il né au début du XXe siècle ?", a: ["La Nouvelle-Orléans", "Chicago", "New York", "Memphis"], correct: 0 },
      { q: "Quel trompettiste, surnommé « Satchmo », a popularisé « What a Wonderful World » ?", a: ["Miles Davis", "Louis Armstrong", "Dizzy Gillespie", "Chet Baker"], correct: 1 },
      { q: "Quelle chanteuse de jazz, « First Lady of Song », était une maîtresse du scat ?", a: ["Billie Holiday", "Ella Fitzgerald", "Nina Simone", "Sarah Vaughan"], correct: 1 },
      { q: "Quel trompettiste a marqué le jazz avec l'album « Kind of Blue » ?", a: ["John Coltrane", "Louis Armstrong", "Thelonious Monk", "Miles Davis"], correct: 3 },
      { q: "Quelle musique afro-américaine, née dans le sud des États-Unis, est à l'origine du jazz et du rock ?", a: ["Le gospel seul", "la country", "Le blues", "le ragtime"], correct: 2 },
      { q: "De quelle ville anglaise les Beatles sont-ils originaires ?", a: ["Londres", "Manchester", "Liverpool", "Birmingham"], correct: 2 },
      { q: "Quel groupe britannique des années 60 réunissait Lennon, McCartney, Harrison et Starr ?", a: ["Les Beatles", "Les Rolling Stones", "The Who", "les Kinks"], correct: 0 },
      { q: "Quel chanteur charismatique est le leader emblématique des Rolling Stones ?", a: ["Keith Richards", "Roger Daltrey", "Mick Jagger", "Robert Plant"], correct: 2 },
      { q: "Quel chanteur américain est surnommé « le King » du rock'n'roll ?", a: ["Elvis Presley", "Chuck Berry", "Little Richard", "Buddy Holly"], correct: 0 },
      { q: "Quel artiste, « King of Pop », a sorti « Thriller », l'un des albums les plus vendus de l'histoire ?", a: ["Michael Jackson", "Prince", "Lionel Richie", "Stevie Wonder"], correct: 0 },
      { q: "Quel groupe mené par Freddie Mercury a écrit « Bohemian Rhapsody » ?", a: ["Queen", "Led Zeppelin", "Deep Purple", "The Who"], correct: 0 },
      { q: "Quel chanteur folk-rock américain a reçu le prix Nobel de littérature en 2016 ?", a: ["Bruce Springsteen", "Bob Dylan", "Leonard Cohen", "Neil Young"], correct: 1 },
      { q: "Quel chanteur jamaïcain est la figure mondiale du reggae ?", a: ["Bob Marley", "Jimmy Cliff", "Peter Tosh", "Burning Spear"], correct: 0 },
      { q: "Quel groupe suédois a triomphé à l'Eurovision 1974 avec « Waterloo » ?", a: ["Roxette", "Ace of Base", "ABBA", "a-ha"], correct: 2 },
      { q: "Quel duo électro français masqué a produit « One More Time » et « Get Lucky » ?", a: ["Justice", "Air", "Cassius", "Daft Punk"], correct: 3 },
      { q: "Quelle chanteuse britannique a connu un immense succès avec l'album « 21 » et « Someone Like You » ?", a: ["Adele", "Amy Winehouse", "Dua Lipa", "Ed Sheeran"], correct: 0 },
      { q: "Quel guitariste de légende a enflammé Woodstock et révolutionné la guitare électrique ?", a: ["Eric Clapton", "Jimmy Page", "Carlos Santana", "Jimi Hendrix"], correct: 3 },
      { q: "Quel groupe de rock progressif a conçu les albums « The Wall » et « The Dark Side of the Moon » ?", a: ["Genesis", "Pink Floyd", "Yes", "King Crimson"], correct: 1 },
      { q: "Quel groupe de Seattle, mené par Kurt Cobain, a popularisé le grunge avec « Smells Like Teen Spirit » ?", a: ["Pearl Jam", "Nirvana", "Soundgarden", "Alice in Chains"], correct: 1 },
      { q: "Quelle chanteuse américaine est surnommée la « Queen of Pop » depuis les années 80 ?", a: ["Whitney Houston", "Madonna", "Cyndi Lauper", "Janet Jackson"], correct: 1 },
      { q: "Quelle chanteuse française est célèbre pour « La Vie en rose » et « Non, je ne regrette rien » ?", a: ["Dalida", "Barbara", "Juliette Gréco", "Édith Piaf"], correct: 3 },
      { q: "Quel chanteur belge a écrit « Ne me quitte pas » et « Amsterdam » ?", a: ["Charles Aznavour", "Georges Brassens", "Jacques Brel", "Léo Ferré"], correct: 2 },
      { q: "Quel chanteur à moustache, guitare en main, est connu pour « Les Copains d'abord » et ses textes poétiques ?", a: ["Georges Brassens", "Jacques Brel", "Léo Ferré", "Serge Reggiani"], correct: 0 },
      { q: "Quel auteur-compositeur provocateur français a écrit « La Javanaise » ?", a: ["Jacques Dutronc", "Serge Gainsbourg", "Alain Bashung", "Michel Polnareff"], correct: 1 },
      { q: "Quel chanteur, « idole des jeunes », est le plus célèbre rockeur français ?", a: ["Johnny Hallyday", "Eddy Mitchell", "Dick Rivers", "Michel Sardou"], correct: 0 },
      { q: "Quel chanteur français, « le fou chantant », a écrit « La Mer » et « Douce France » ?", a: ["Charles Aznavour", "Charles Trenet", "Yves Montand", "Tino Rossi"], correct: 1 },
      { q: "Quel artiste belge a connu un succès mondial avec « Alors on danse » et « Papaoutai » ?", a: ["Angèle", "Orelsan", "Stromae", "Damso"], correct: 2 },
      { q: "Quelle chanteuse québécoise interprète « My Heart Will Go On », du film Titanic ?", a: ["Isabelle Boulay", "Céline Dion", "Lara Fabian", "Garou"], correct: 1 },
      { q: "Quelle comédie musicale française de 1998 a révélé la chanson « Belle » et le chanteur Garou ?", a: ["Starmania", "Notre-Dame de Paris", "Les Dix Commandements", "Roméo et Juliette"], correct: 1 },
      { q: "Quel opéra-rock de Michel Berger et Luc Plamondon, créé en 1979, a marqué la chanson française ?", a: ["Notre-Dame de Paris", "Émilie Jolie", "Les Misérables", "Starmania"], correct: 3 },
      { q: "Quelle chanteuse française d'origine italienne a marqué la variété avec « Gigi l'Amoroso » ?", a: ["Sheila", "Mireille Mathieu", "Nana Mouskouri", "Dalida"], correct: 3 },
      { q: "Quel festival mythique de 1969 a réuni la contre-culture rock aux États-Unis ?", a: ["Woodstock", "Coachella", "Glastonbury", "le festival de l'île de Wight"], correct: 0 },
      { q: "De quel pays la bossa nova est-elle originaire ?", a: ["L'Argentine", "Cuba", "Le Brésil", "le Portugal"], correct: 2 },
      { q: "De quel pays le tango, dansé et chanté, est-il emblématique ?", a: ["L'Espagne", "le Mexique", "L'Argentine", "le Brésil"], correct: 2 },
      { q: "Quel genre musical et dansé, né en Andalousie, mêle chant, guitare et claquements de mains ?", a: ["Le fado", "la salsa", "Le flamenco", "le tango"], correct: 2 },
      { q: "Dans quel arrondissement de New York le hip-hop est-il né dans les années 1970 ?", a: ["Manhattan", "Le Bronx", "Brooklyn", "le Queens"], correct: 1 },
      { q: "Comment appelle-t-on une œuvre chantée sans paroles, sur des syllabes, typique du jazz ?", a: ["Le scat", "Le vibrato", "le yodel", "l'a cappella"], correct: 0 },
      { q: "Quel genre festif et dansant, à la mode dans les années 1970, est associé aux boules à facettes ?", a: ["Le funk", "la techno", "Le disco", "le rock"], correct: 2 },
      { q: "Quelle musique électronique répétitive est née à Detroit dans les années 1980 ?", a: ["La house", "La techno", "le disco", "la trance"], correct: 1 },
      { q: "Comment nomme-t-on le disque vinyle qui tourne à 33 tours par minute ?", a: ["Un 45 tours", "Un 33 tours", "un CD", "un single"], correct: 1 },
      { q: "Quel concours européen annuel de la chanson est diffusé depuis 1956 ?", a: ["Les Grammy Awards", "les Victoires de la musique", "le Concours Chopin", "L'Eurovision"], correct: 3 },
      { q: "Comment appelle-t-on les trois composantes de base d'une musique : le rythme, la mélodie et… ?", a: ["Le silence", "le tempo", "L'harmonie", "le timbre"], correct: 2 },
      { q: "Quel style de chant religieux médiéval, à une seule voix, porte le nom d'un pape ?", a: ["Le madrigal", "Le chant grégorien", "le motet", "la cantate"], correct: 1 },
      { q: "Quel groupe irlandais, mené par Bono, est l'un des plus grands groupes de rock depuis les années 80 ?", a: ["Coldplay", "R.E.M.", "The Cranberries", "U2"], correct: 3 },
      { q: "Quelle chanteuse américaine, « Queen of Soul », a chanté « Respect » ?", a: ["Tina Turner", "Diana Ross", "Aretha Franklin", "Gladys Knight"], correct: 2 },
      { q: "Quel artiste américain, auteur de « Purple Rain », jouait de presque tous les instruments lui-même ?", a: ["Michael Jackson", "Stevie Wonder", "Prince", "Lenny Kravitz"], correct: 2 },
      { q: "Quel compositeur norvégien a écrit la suite « Peer Gynt » (« Le Matin », « Dans l'antre du roi de la montagne ») ?", a: ["Edvard Grieg", "Jean Sibelius", "Carl Nielsen", "Bedřich Smetana"], correct: 0 },
      { q: "Quel compositeur tchèque a écrit la « Symphonie du Nouveau Monde » ?", a: ["Bedřich Smetana", "Leoš Janáček", "Antonín Dvořák", "Gustav Mahler"], correct: 2 },
      { q: "Quelle cantate scénique de Carl Orff s'ouvre sur le puissant « O Fortuna » ?", a: ["Le Requiem", "La Damnation de Faust", "Le Messie", "Carmina Burana"], correct: 3 },
      { q: "Quel groupe de hard rock britannique, avec Robert Plant et Jimmy Page, a écrit « Stairway to Heaven » ?", a: ["Deep Purple", "Led Zeppelin", "Black Sabbath", "AC/DC"], correct: 1 },
      { q: "Quel artiste britannique caméléon a créé le personnage de « Ziggy Stardust » ?", a: ["David Bowie", "Elton John", "Freddie Mercury", "Rod Stewart"], correct: 0 },
      { q: "Quelle chanteuse américaine à la voix puissante a interprété « I Will Always Love You » ?", a: ["Mariah Carey", "Céline Dion", "Whitney Houston", "Toni Braxton"], correct: 2 },
      { q: "Quel pianiste et compositeur virtuose hongrois du XIXe siècle déchaînait les foules ?", a: ["Frédéric Chopin", "Franz Liszt", "Robert Schumann", "Johannes Brahms"], correct: 1 },
      { q: "Quel instrument à clavier et à tuyaux, souvent installé dans les églises, est le plus imposant ?", a: ["L'orgue", "Le clavecin", "le piano", "l'harmonium"], correct: 0 },
      { q: "Quel instrument à vent en bois, muni d'une anche double, a une sonorité nasillarde caractéristique ?", a: ["La clarinette", "la flûte traversière", "Le hautbois", "le basson"], correct: 2 },
      { q: "Comment appelle-t-on la reprise, par un artiste, d'une chanson déjà interprétée par un autre ?", a: ["Une reprise (cover)", "Un featuring", "un sample", "un medley"], correct: 0 },
      { q: "Comment nomme-t-on un court extrait d'un morceau réutilisé dans une nouvelle chanson ?", a: ["Un refrain", "un pont", "Un sample", "un couplet"], correct: 2 },
      { q: "Quel chanteur américain surnommé « The Boss » est célèbre pour « Born in the U.S.A. » ?", a: ["Bob Seger", "Tom Petty", "John Mellencamp", "Bruce Springsteen"], correct: 3 },
      { q: "Quel groupe australien au rock électrique a écrit « Highway to Hell » et « Thunderstruck » ?", a: ["AC/DC", "Led Zeppelin", "Guns N' Roses", "Metallica"], correct: 0 },
      { q: "Quelle jeune autrice-compositrice belge a connu le succès avec « Balance ton quoi » ?", a: ["Pomme", "Clara Luciani", "Louane", "Angèle"], correct: 3 },
      { q: "Quel rappeur français, pionnier, s'est fait connaître avec « Bouge de là » à la fin des années 80 ?", a: ["Doc Gynéco", "Booba", "MC Solaar", "Oxmo Puccino"], correct: 2 },
    ],
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
    expert: [
      { q: "Quel réalisateur américain a signé « E.T. », « Jurassic Park » et « La Liste de Schindler » ?", a: ["Steven Spielberg", "George Lucas", "James Cameron", "Robert Zemeckis"], correct: 0 },
      { q: "Quel réalisateur britannique est surnommé le « maître du suspense » (« Psychose », « Les Oiseaux ») ?", a: ["Stanley Kubrick", "Brian De Palma", "Alfred Hitchcock", "Roman Polanski"], correct: 2 },
      { q: "Quel réalisateur américain a signé « Pulp Fiction » et « Kill Bill » ?", a: ["Quentin Tarantino", "Martin Scorsese", "Robert Rodriguez", "Guy Ritchie"], correct: 0 },
      { q: "Quel réalisateur a dirigé Robert De Niro dans « Taxi Driver » et « Les Affranchis » ?", a: ["Martin Scorsese", "Francis Ford Coppola", "Brian De Palma", "Michael Mann"], correct: 0 },
      { q: "Quel réalisateur a signé « 2001, l'Odyssée de l'espace » et « Shining » ?", a: ["Stanley Kubrick", "Ridley Scott", "Steven Spielberg", "David Lynch"], correct: 0 },
      { q: "Quel réalisateur a dirigé la trilogie du « Parrain » ?", a: ["Martin Scorsese", "Sergio Leone", "Francis Ford Coppola", "Brian De Palma"], correct: 2 },
      { q: "Quel réalisateur britannique a signé « Inception », « Interstellar » et « Oppenheimer » ?", a: ["Denis Villeneuve", "Christopher Nolan", "Ridley Scott", "Alfonso Cuarón"], correct: 1 },
      { q: "Quel réalisateur a mis en scène « Titanic » et « Avatar », deux immenses succès du box-office ?", a: ["Steven Spielberg", "James Cameron", "Peter Jackson", "Michael Bay"], correct: 1 },
      { q: "Quel cinéaste américain a créé la saga « Star Wars » ?", a: ["Steven Spielberg", "J. J. Abrams", "George Lucas", "Irvin Kershner"], correct: 2 },
      { q: "Quel réalisateur a signé les films de science-fiction « Alien » et « Blade Runner » ?", a: ["James Cameron", "Denis Villeneuve", "Ridley Scott", "Paul Verhoeven"], correct: 2 },
      { q: "Quel réalisateur néo-zélandais a adapté au cinéma « Le Seigneur des anneaux » ?", a: ["Guillermo del Toro", "James Cameron", "Peter Jackson", "Chris Columbus"], correct: 2 },
      { q: "Quel réalisateur japonais a réalisé « Les Sept Samouraïs » ?", a: ["Yasujirō Ozu", "Akira Kurosawa", "Hayao Miyazaki", "Takeshi Kitano"], correct: 1 },
      { q: "Quel réalisateur italien a signé « La Dolce Vita » et « 8½ » ?", a: ["Vittorio De Sica", "Roberto Rossellini", "Federico Fellini", "Luchino Visconti"], correct: 2 },
      { q: "Quel pionnier français a réalisé « Le Voyage dans la Lune » (1902) avec ses trucages ?", a: ["Georges Méliès", "Les frères Lumière", "Émile Cohl", "Louis Feuillade"], correct: 0 },
      { q: "De quel film de François Truffaut, manifeste de la Nouvelle Vague, Antoine Doinel est-il le héros ?", a: ["Les Quatre Cents Coups", "À bout de souffle", "Jules et Jim", "Hiroshima mon amour"], correct: 0 },
      { q: "Quel réalisateur français a signé « Léon » et « Le Cinquième Élément » ?", a: ["Luc Besson", "Jean-Jacques Annaud", "Mathieu Kassovitz", "Jacques Audiard"], correct: 0 },
      { q: "Quel réalisateur a signé « Le Fabuleux Destin d'Amélie Poulain » ?", a: ["Cédric Klapisch", "Jean-Pierre Jeunet et Marc Caro seul Jeunet ici", "Jean-Pierre Jeunet", "Luc Besson"], correct: 2 },
      { q: "Quel réalisateur mexicain a remporté l'Oscar avec « La Forme de l'eau » et « Le Labyrinthe de Pan » ?", a: ["Guillermo del Toro", "Alejandro González Iñárritu", "Alfonso Cuarón", "Robert Rodriguez"], correct: 0 },
      { q: "Quelle actrice détient le record de nominations aux Oscars ?", a: ["Katharine Hepburn", "Meryl Streep", "Bette Davis", "Cate Blanchett"], correct: 1 },
      { q: "Quel acteur incarne le personnage de « Forrest Gump » ?", a: ["Kevin Costner", "Robin Williams", "Tom Hanks", "Bill Murray"], correct: 2 },
      { q: "Quel acteur incarne le cannibale Hannibal Lecter dans « Le Silence des agneaux » ?", a: ["Anthony Hopkins", "Jack Nicholson", "Al Pacino", "Gary Oldman"], correct: 0 },
      { q: "Quelle actrice, icône des années 50, apparaît robe blanche soulevée dans « Sept ans de réflexion » ?", a: ["Grace Kelly", "Audrey Hepburn", "Rita Hayworth", "Marilyn Monroe"], correct: 3 },
      { q: "Quel acteur incarne Rick Blaine dans « Casablanca » (1942) ?", a: ["Cary Grant", "James Stewart", "Clark Gable", "Humphrey Bogart"], correct: 3 },
      { q: "Quel acteur incarne le cyborg venu du futur dans « Terminator » ?", a: ["Sylvester Stallone", "Arnold Schwarzenegger", "Jean-Claude Van Damme", "Dolph Lundgren"], correct: 1 },
      { q: "Quel acteur a créé et incarné le boxeur « Rocky » ?", a: ["Sylvester Stallone", "Arnold Schwarzenegger", "Mickey Rourke", "Robert De Niro"], correct: 0 },
      { q: "Quel acteur incarne à la fois Han Solo et Indiana Jones ?", a: ["Kurt Russell", "Mel Gibson", "Harrison Ford", "Kurt Douglas"], correct: 2 },
      { q: "Quel acteur comique français incarne le gendarme de Saint-Tropez ?", a: ["Bourvil", "Fernandel", "Coluche", "Louis de Funès"], correct: 3 },
      { q: "Quel acteur français a remporté l'Oscar du meilleur acteur pour « The Artist » en 2012 ?", a: ["Gérard Depardieu", "Jean Reno", "Vincent Cassel", "Jean Dujardin"], correct: 3 },
      { q: "Quelle actrice française a reçu l'Oscar pour son rôle d'Édith Piaf dans « La Môme » ?", a: ["Juliette Binoche", "Isabelle Adjani", "Marion Cotillard", "Audrey Tautou"], correct: 2 },
      { q: "Quel acteur français partage l'affiche d'« Intouchables » avec François Cluzet ?", a: ["Omar Sy", "Jamel Debbouze", "Dany Boon", "Kad Merad"], correct: 0 },
      { q: "Quel acteur, dans l'univers Marvel, incarne Tony Stark alias « Iron Man » ?", a: ["Chris Evans", "Robert Downey Jr.", "Chris Hemsworth", "Mark Ruffalo"], correct: 1 },
      { q: "Quel acteur a reçu un Oscar posthume pour son rôle du Joker dans « The Dark Knight » ?", a: ["Joaquin Phoenix", "Heath Ledger", "Jack Nicholson", "Jared Leto"], correct: 1 },
      { q: "Quel acteur écossais fut le premier à incarner James Bond au cinéma ?", a: ["Roger Moore", "Sean Connery", "Pierce Brosnan", "Daniel Craig"], correct: 1 },
      { q: "Quel jeune acteur incarne Jack dans « Titanic » de James Cameron ?", a: ["Brad Pitt", "Leonardo DiCaprio", "Matt Damon", "Johnny Depp"], correct: 1 },
      { q: "Quel acteur burlesque du muet a créé le personnage de « Charlot » ?", a: ["Charlie Chaplin", "Buster Keaton", "Harold Lloyd", "Max Linder"], correct: 0 },
      { q: "Quel film d'Orson Welles (1941) est régulièrement cité comme le meilleur de l'histoire du cinéma ?", a: ["Autant en emporte le vent", "Casablanca", "Vertigo", "Citizen Kane"], correct: 3 },
      { q: "Dans « Matrix », quelle couleur de pilule Néo choisit-il pour découvrir la vérité ?", a: ["La bleue", "La verte", "La rouge", "La blanche"], correct: 2 },
      { q: "Combien d'Oscars le film « Titanic » (1997) a-t-il remportés ?", a: ["Huit", "Cinq", "Quatorze", "Onze"], correct: 3 },
      { q: "Quel film de 1927 est considéré comme le premier long métrage parlant ?", a: ["Metropolis", "Les Lumières de la ville", "Le Chanteur de jazz", "Naissance d'une nation"], correct: 2 },
      { q: "Quel film français muet et en noir et blanc a triomphé aux Oscars en 2012 ?", a: ["Intouchables", "De rouille et d'os", "Amour", "The Artist"], correct: 3 },
      { q: "Quel film de 1966 avec de Funès et Bourvil fut longtemps le plus gros succès du cinéma français ?", a: ["Le Corniaud", "La Grande Vadrouille", "Les Aventures de Rabbi Jacob", "La Folie des grandeurs"], correct: 1 },
      { q: "Quel film de Dany Boon a battu le record d'entrées en France en 2008 ?", a: ["Intouchables", "Les Bronzés 3", "Bienvenue chez les Ch'tis", "Astérix Mission Cléopâtre"], correct: 2 },
      { q: "Quel film sud-coréen de Bong Joon-ho a remporté l'Oscar du meilleur film en 2020 ?", a: ["Old Boy", "Parasite", "Memories of Murder", "Snowpiercer"], correct: 1 },
      { q: "Quel requin géant terrorise les baigneurs dans le film de Spielberg « Les Dents de la mer » ?", a: ["Un requin-tigre", "Un grand requin blanc", "un orque", "un requin-marteau"], correct: 1 },
      { q: "Dans la saga « Star Wars », quel est le nom du père de Luke Skywalker ?", a: ["Obi-Wan Kenobi", "Dark Vador (Anakin)", "l'Empereur Palpatine", "Yoda"], correct: 1 },
      { q: "Quel film de Nolan explore les rêves à l'intérieur des rêves ?", a: ["Inception", "Interstellar", "Memento", "Le Prestige"], correct: 0 },
      { q: "Quelle trilogie de Peter Jackson a remporté 11 Oscars avec son dernier volet, « Le Retour du roi » ?", a: ["Le Seigneur des anneaux", "Le Hobbit", "Le Monde de Narnia", "Harry Potter"], correct: 0 },
      { q: "Quel acteur incarne le patriarche Vito Corleone dans « Le Parrain » (1972) ?", a: ["Al Pacino", "Marlon Brando", "Robert De Niro", "James Caan"], correct: 1 },
      { q: "Quel est le premier long métrage d'animation des studios Disney, sorti en 1937 ?", a: ["Pinocchio", "Cendrillon", "Bambi", "Blanche-Neige et les Sept Nains"], correct: 3 },
      { q: "Quel studio a produit « Toy Story », premier long métrage entièrement en images de synthèse ?", a: ["DreamWorks", "Disney seul", "Blue Sky", "Pixar"], correct: 3 },
      { q: "Quel réalisateur japonais a fondé le studio Ghibli et signé « Le Voyage de Chihiro » ?", a: ["Isao Takahata", "Hayao Miyazaki", "Makoto Shinkai", "Mamoru Hosoda"], correct: 1 },
      { q: "Quel film d'animation Disney de 1994 raconte l'histoire du lionceau Simba ?", a: ["Le Roi lion", "Le Livre de la jungle", "Tarzan", "Bambi"], correct: 0 },
      { q: "Quel studio américain a produit « Shrek » et « Kung Fu Panda » ?", a: ["Pixar", "DreamWorks", "Illumination", "Warner Animation"], correct: 1 },
      { q: "Comment surnomme-t-on la statuette dorée, plus haute récompense du cinéma américain ?", a: ["Le Golden Globe", "le BAFTA", "le Screen Award", "L'Oscar"], correct: 3 },
      { q: "Quelle récompense suprême est décernée chaque année au Festival de Cannes ?", a: ["Le Lion d'or", "l'Ours d'or", "le Grand Prix", "La Palme d'or"], correct: 3 },
      { q: "Quel festival italien décerne le « Lion d'or » du meilleur film ?", a: ["Le Festival de Rome", "la Berlinale", "le Festival de Turin", "La Mostra de Venise"], correct: 3 },
      { q: "Quelle récompense est l'équivalent français des Oscars, décernée chaque année ?", a: ["Le Lumière", "le Molière", "Le César", "le Magritte"], correct: 2 },
      { q: "Quel festival allemand décerne l'« Ours d'or » ?", a: ["La Mostra de Venise", "le Festival de Locarno", "La Berlinale", "le Festival de Cannes"], correct: 2 },
      { q: "Comment appelle-t-on la personne qui dirige les acteurs et le tournage d'un film ?", a: ["Le réalisateur", "Le producteur", "le scénariste", "le monteur"], correct: 0 },
      { q: "Comment nomme-t-on la musique composée spécialement pour un film ?", a: ["La bande originale", "Le générique", "le playback", "la voix off"], correct: 0 },
      { q: "Comment appelle-t-on un film retraçant la vie d'une personne réelle ?", a: ["Un documentaire", "un docu-fiction", "un péplum", "Un biopic"], correct: 3 },
      { q: "Comment nomme-t-on la personne chargée d'assembler les plans pour construire le film ?", a: ["Le cadreur", "le producteur", "le régisseur", "Le monteur"], correct: 3 },
      { q: "Comment appelle-t-on un mouvement de caméra qui se déplace en suivant l'action ?", a: ["Un zoom", "un panoramique fixe", "Un travelling", "un fondu"], correct: 2 },
      { q: "Comment appelle-t-on un plan très rapproché sur le visage d'un acteur ?", a: ["Un plan large", "Un gros plan", "un plan-séquence", "un plan d'ensemble"], correct: 1 },
      { q: "Comment appelle-t-on une nouvelle version d'un film déjà réalisé auparavant ?", a: ["Une suite", "un préquel", "Un remake", "un reboot"], correct: 2 },
      { q: "Comment nomme-t-on la personne qui réalise les scènes dangereuses à la place de l'acteur ?", a: ["Le figurant", "la doublure lumière", "le régisseur", "Le cascadeur"], correct: 3 },
      { q: "Comment surnomme-t-on un très gros film à grand spectacle et gros budget ?", a: ["Un navet", "Un blockbuster", "un court métrage", "un film d'auteur"], correct: 1 },
      { q: "Comment surnomme-t-on l'industrie du cinéma indien, très prolifique ?", a: ["Bollywood", "Nollywood", "Cinecittà", "Pinewood"], correct: 0 },
      { q: "Dans quel quartier de Los Angeles se concentre historiquement l'industrie du cinéma américain ?", a: ["Beverly Hills", "Santa Monica", "Burbank", "Hollywood"], correct: 3 },
      { q: "Comment appelle-t-on l'écran textuel qui défile à la fin d'un film pour citer toute l'équipe ?", a: ["Le synopsis", "Le générique de fin", "le teaser", "le storyboard"], correct: 1 },
      { q: "Quel film catastrophe de 1997 raconte le naufrage d'un paquebot lors de son voyage inaugural ?", a: ["Poséidon", "En pleine tempête", "Titanic II", "Titanic"], correct: 3 },
      { q: "Quelle saga de sorciers, adaptée des romans de J. K. Rowling, a débuté au cinéma en 2001 ?", a: ["Le Seigneur des anneaux", "Percy Jackson", "Harry Potter", "À la croisée des mondes"], correct: 2 },
      { q: "Quel personnage vert et grognon vit dans un marais dans le film d'animation « Shrek » ?", a: ["Un troll", "un géant", "un dragon", "Un ogre"], correct: 3 },
      { q: "Quel acteur français, dit « Bébel », a marqué le cinéma dans « À bout de souffle » et « L'As des as » ?", a: ["Alain Delon", "Lino Ventura", "Yves Montand", "Jean-Paul Belmondo"], correct: 3 },
      { q: "Quel acteur français au regard bleu a tourné dans « Le Guépard » et « Plein Soleil » ?", a: ["Jean-Paul Belmondo", "Alain Delon", "Michel Piccoli", "Philippe Noiret"], correct: 1 },
      { q: "Quelle comédie de 1973 met en scène Louis de Funès en industriel se faisant passer pour un rabbin ?", a: ["La Grande Vadrouille", "Le Corniaud", "Les Aventures de Rabbi Jacob", "L'Aile ou la Cuisse"], correct: 2 },
      { q: "Quel film de Luc Besson (1988) raconte la rivalité de deux plongeurs en apnée ?", a: ["Le Grand Bleu", "Nikita", "Subway", "Atlantis"], correct: 0 },
      { q: "Quel réalisateur américain, connu pour son style très symétrique, a signé « The Grand Budapest Hotel » ?", a: ["Wes Anderson", "Tim Burton", "Paul Thomas Anderson", "Spike Jonze"], correct: 0 },
      { q: "Quel réalisateur au style gothique a signé « Edward aux mains d'argent » et « Beetlejuice » ?", a: ["Guillermo del Toro", "Tim Burton", "Sam Raimi", "David Fincher"], correct: 1 },
      { q: "Quel film de 1994 de Tarantino entremêle les histoires de gangsters à Los Angeles ?", a: ["Reservoir Dogs", "Jackie Brown", "Pulp Fiction", "Kill Bill"], correct: 2 },
      { q: "Quel western culte de Sergio Leone (1966) suit Clint Eastwood en chasseur de primes cherchant un trésor confédéré ?", a: ["Il était une fois dans l'Ouest", "Pour une poignée de dollars", "Le Bon, la Brute et le Truand", "Et pour quelques dollars de plus"], correct: 2 },
      { q: "Quel film de 1993 de Spielberg ressuscite des dinosaures grâce à la génétique ?", a: ["Jurassic Park", "Godzilla", "King Kong", "Le Monde perdu"], correct: 0 },
      { q: "Quelle actrice britannique, élégante icône, a joué dans « Diamants sur canapé » et « Vacances romaines » ?", a: ["Audrey Hepburn", "Grace Kelly", "Elizabeth Taylor", "Ingrid Bergman"], correct: 0 },
      { q: "Quel réalisateur américain a signé « Fight Club », « Seven » et « The Social Network » ?", a: ["Christopher Nolan", "Darren Aronofsky", "Denis Villeneuve", "David Fincher"], correct: 3 },
      { q: "Quel réalisateur canadien a signé « Dune » (2021) et « Blade Runner 2049 » ?", a: ["Christopher Nolan", "Denis Villeneuve", "Ridley Scott", "Alfonso Cuarón"], correct: 1 },
      { q: "Quel film musical de 2016, avec Emma Stone et Ryan Gosling, rend hommage aux comédies musicales ?", a: ["Chicago", "La La Land", "Whiplash", "Moulin Rouge"], correct: 1 },
      { q: "Quelle actrice incarne l'agent secret dans la saga « Alien » face au xénomorphe ?", a: ["Linda Hamilton", "Jamie Lee Curtis", "Milla Jovovich", "Sigourney Weaver"], correct: 3 },
      { q: "Quel film d'horreur de 1980, tiré d'un roman de Stephen King, se déroule dans un hôtel isolé ?", a: ["Shining", "Ça", "Carrie", "Misery"], correct: 0 },
      { q: "Quel réalisateur espagnol, figure de la Movida, a signé « Femmes au bord de la crise de nerfs » ?", a: ["Alejandro Amenábar", "Pedro Almodóvar", "Luis Buñuel", "Carlos Saura"], correct: 1 },
      { q: "Quel film de guerre de 1998 de Spielberg s'ouvre sur le débarquement de Normandie ?", a: ["Il faut sauver le soldat Ryan", "La Ligne rouge", "Full Metal Jacket", "Le Jour le plus long"], correct: 0 },
      { q: "Quel dessin animé Pixar de 2008 met en scène un petit robot nettoyeur sur une Terre abandonnée ?", a: ["Ratatouille", "Là-haut", "WALL-E", "Robots"], correct: 2 },
      { q: "Quel film de 1999 des sœurs Wachowski oppose l'humanité aux machines dans un monde simulé ?", a: ["Blade Runner", "Terminator", "Matrix", "Ghost in the Shell"], correct: 2 },
      { q: "Quel film culte de 1982 de la troupe du Splendid se déroule un soir de réveillon à SOS Détresse-Amitié ?", a: ["Le Père Noël est une ordure", "Les Bronzés", "Les Visiteurs", "Papy fait de la résistance"], correct: 0 },
      { q: "Quel film de 2019 met en scène le personnage de Batman face à Arthur Fleck devenu criminel ?", a: ["The Batman", "The Dark Knight", "Joker", "Suicide Squad"], correct: 2 },
      { q: "Quelle saga de science-fiction se déroule « il y a bien longtemps, dans une galaxie lointaine » ?", a: ["Star Trek", "Dune", "Stargate", "Star Wars"], correct: 3 },
      { q: "Quel film d'animation de 2013 met en scène les sœurs Elsa et Anna dans un royaume gelé ?", a: ["Raiponce", "Vaiana", "La Reine des neiges", "Rebelle"], correct: 2 },
      { q: "Quel long métrage de Jacques Tati met en scène le maladroit Monsieur Hulot en vacances ?", a: ["Playtime", "Mon Oncle", "Jour de fête", "Les Vacances de Monsieur Hulot"], correct: 3 },
      { q: "Quel film français de 1995, en noir et blanc, suit trois jeunes de banlieue après une bavure policière ?", a: ["L'Esquive", "Entre les murs", "Les Misérables", "La Haine"], correct: 3 },
      { q: "Quel acteur américain incarne le capitaine Jack Sparrow dans « Pirates des Caraïbes » ?", a: ["Orlando Bloom", "Johnny Depp", "Antonio Banderas", "Colin Farrell"], correct: 1 },
      { q: "Quel film de 1975 de Miloš Forman se déroule dans un hôpital psychiatrique avec Jack Nicholson ?", a: ["Rain Man", "A Beautiful Mind", "Shutter Island", "Vol au-dessus d'un nid de coucou"], correct: 3 },
    ],
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
    expert: [
      { q: "Quel pays détient le record de victoires en Coupe du Monde de football ?", a: ["L'Allemagne", "Le Brésil", "l'Italie", "l'Argentine"], correct: 1 },
      { q: "En quelles années la France a-t-elle remporté la Coupe du Monde de football ?", a: ["1998 et 2006", "2006 et 2018", "1986 et 1998", "1998 et 2018"], correct: 3 },
      { q: "Quel joueur français a marqué deux buts de la tête en finale de la Coupe du Monde 1998 ?", a: ["Thierry Henry", "Emmanuel Petit", "Didier Deschamps", "Zinédine Zidane"], correct: 3 },
      { q: "Quel joueur français a inscrit un triplé en finale de la Coupe du Monde 2022 ?", a: ["Antoine Griezmann", "Olivier Giroud", "Kylian Mbappé", "Karim Benzema"], correct: 2 },
      { q: "Quel joueur argentin a soulevé la Coupe du Monde 2022 au Qatar ?", a: ["Ángel Di María", "Lionel Messi", "Sergio Agüero", "Paulo Dybala"], correct: 1 },
      { q: "Quel joueur détient le record de Ballons d'or ?", a: ["Lionel Messi", "Cristiano Ronaldo", "Michel Platini", "Johan Cruyff"], correct: 0 },
      { q: "Quel Brésilien, surnommé « le Roi », a remporté trois Coupes du Monde ?", a: ["Ronaldo", "Garrincha", "Pelé", "Zico"], correct: 2 },
      { q: "Quel joueur argentin a marqué le but de la « main de Dieu » en 1986 ?", a: ["Diego Maradona", "Gabriel Batistuta", "Mario Kempes", "Jorge Valdano"], correct: 0 },
      { q: "Quel club détient le record de victoires en Ligue des champions ?", a: ["Le FC Barcelone", "Le Real Madrid", "le Bayern Munich", "le Milan AC"], correct: 1 },
      { q: "Quel est le seul club français vainqueur de la Ligue des champions, en 1993 ?", a: ["Le Paris Saint-Germain", "l'AS Monaco", "l'Olympique lyonnais", "L'Olympique de Marseille"], correct: 3 },
      { q: "Quel meneur de jeu français a remporté trois Ballons d'or dans les années 1980 ?", a: ["Jean Tigana", "Michel Platini", "Alain Giresse", "Raymond Kopa"], correct: 1 },
      { q: "Combien de joueurs par équipe, gardien compris, sont sur le terrain au football ?", a: ["Neuf", "Dix", "Onze", "Douze"], correct: 2 },
      { q: "Combien de minutes dure un match de football, hors prolongations ?", a: ["90 minutes", "80 minutes", "100 minutes", "120 minutes"], correct: 0 },
      { q: "Comment nomme-t-on l'assistance vidéo à l'arbitrage, introduite dans le football moderne ?", a: ["Le TMO", "le hawk-eye", "le challenge", "La VAR"], correct: 3 },
      { q: "Quel sélectionneur a mené la France au titre mondial en 2018 après l'avoir gagné comme joueur en 1998 ?", a: ["Didier Deschamps", "Aimé Jacquet", "Laurent Blanc", "Roger Lemerre"], correct: 0 },
      { q: "Quel tournoi annuel de rugby oppose les grandes nations d'Europe (France, Angleterre, Irlande…) ?", a: ["Le Tournoi des Six Nations", "La Coupe d'Europe", "le Rugby Championship", "la Coupe latine"], correct: 0 },
      { q: "Quel pays a remporté la Coupe du Monde de rugby en 2023, en France ?", a: ["La Nouvelle-Zélande", "L'Afrique du Sud", "l'Angleterre", "la France"], correct: 1 },
      { q: "Quelle équipe nationale de rugby exécute le « haka » avant ses matchs ?", a: ["La Nouvelle-Zélande", "L'Australie", "les Fidji", "l'Afrique du Sud"], correct: 0 },
      { q: "Combien de points rapporte un essai au rugby à XV ?", a: ["Trois", "Quatre", "Sept", "Cinq"], correct: 3 },
      { q: "Quel demi de mêlée est la grande vedette du XV de France dans les années 2020 ?", a: ["Antoine Dupont", "Romain Ntamack", "Charles Ollivon", "Gaël Fickou"], correct: 0 },
      { q: "Comment nomme-t-on la phase de rugby où les avants se lient pour pousser après une faute ?", a: ["Le ruck", "la touche", "le maul", "La mêlée"], correct: 3 },
      { q: "Quel tournoi du Grand Chelem se joue sur terre battue, à Paris ?", a: ["Wimbledon", "l'US Open", "Roland-Garros", "l'Open d'Australie"], correct: 2 },
      { q: "Sur quelle surface se dispute le tournoi de Wimbledon ?", a: ["La terre battue", "le dur", "Le gazon", "la moquette"], correct: 2 },
      { q: "Quel joueur espagnol détient le record de victoires à Roland-Garros ?", a: ["Novak Djokovic", "Roger Federer", "Rafael Nadal", "Björn Borg"], correct: 2 },
      { q: "Quel joueur serbe détient le record de titres du Grand Chelem en simple messieurs ?", a: ["Rafael Nadal", "Roger Federer", "Pete Sampras", "Novak Djokovic"], correct: 3 },
      { q: "Comment appelle-t-on un service gagnant que l'adversaire ne touche pas, au tennis ?", a: ["Un let", "Un ace", "un break", "un smash"], correct: 1 },
      { q: "Comment nomme-t-on le jeu décisif joué à six jeux partout dans un set de tennis ?", a: ["L'avantage", "Le tie-break", "le break", "le match point"], correct: 1 },
      { q: "Quel joueur des Chicago Bulls est souvent considéré comme le meilleur basketteur de l'histoire ?", a: ["Michael Jordan", "LeBron James", "Kobe Bryant", "Magic Johnson"], correct: 0 },
      { q: "Combien de joueurs par équipe évoluent en même temps sur le terrain au basket-ball ?", a: ["Six", "Quatre", "Sept", "Cinq"], correct: 3 },
      { q: "Combien de points vaut un panier réussi de loin, derrière l'arc extérieur ?", a: ["Deux", "Un", "Trois", "Quatre"], correct: 2 },
      { q: "Quel prodige français a été le tout premier choix de la draft NBA en 2023 ?", a: ["Victor Wembanyama", "Rudy Gobert", "Tony Parker", "Nicolas Batum"], correct: 0 },
      { q: "Comment appelle-t-on un smash spectaculaire réalisé au-dessus du panier, au basket ?", a: ["Un lay-up", "un rebond", "une passe décisive", "Un dunk"], correct: 3 },
      { q: "Quelle couleur de maillot porte le leader du classement général du Tour de France ?", a: ["Le vert", "Le jaune", "le blanc", "le rose"], correct: 1 },
      { q: "Que récompense le maillot à pois rouges sur le Tour de France ?", a: ["Le meilleur grimpeur", "Le meilleur sprinteur", "le meilleur jeune", "le plus combatif"], correct: 0 },
      { q: "Quel cycliste belge, surnommé « le Cannibale », a remporté cinq Tours de France ?", a: ["Eddy Merckx", "Bernard Hinault", "Miguel Induráin", "Fausto Coppi"], correct: 0 },
      { q: "Comment s'appelle le grand tour cycliste national de l'Italie ?", a: ["Le Giro", "La Vuelta", "le Tour des Flandres", "Paris-Roubaix"], correct: 0 },
      { q: "Quel baron français a rénové les Jeux Olympiques modernes, dès 1896 ?", a: ["Pierre de Coubertin", "Jules Rimet", "Paul Doumer", "Henri Didon"], correct: 0 },
      { q: "Quel symbole, allumé à Olympie, est acheminé par relais jusqu'à la ville hôte des Jeux ?", a: ["Le drapeau olympique", "La flamme olympique", "les anneaux", "la médaille d'or"], correct: 1 },
      { q: "Quel sprinteur jamaïcain détient le record du monde du 100 mètres ?", a: ["Usain Bolt", "Carl Lewis", "Yohan Blake", "Justin Gatlin"], correct: 0 },
      { q: "Quelle distance parcourt-on lors d'un marathon ?", a: ["42,195 km", "40 km", "50 km", "26 km"], correct: 0 },
      { q: "Quelle ville a accueilli les Jeux Olympiques d'été de 2024 ?", a: ["Paris", "Los Angeles", "Tokyo", "Londres"], correct: 0 },
      { q: "Quel athlète noir américain a remporté quatre titres olympiques à Berlin en 1936, devant Hitler ?", a: ["Carl Lewis", "Jesse Owens", "Jim Thorpe", "Ralph Metcalfe"], correct: 1 },
      { q: "Comment nomme-t-on l'épreuve d'athlétisme combinant dix disciplines pour les hommes ?", a: ["L'heptathlon", "Le décathlon", "le pentathlon", "le triathlon"], correct: 1 },
      { q: "Quels deux pilotes détiennent le record de sept titres de champion du monde de Formule 1 ?", a: ["Senna et Prost", "Vettel et Alonso", "Schumacher et Hamilton", "Fangio et Lauda"], correct: 2 },
      { q: "Quel pilote britannique détient le record de victoires en Formule 1 ?", a: ["Michael Schumacher", "Lewis Hamilton", "Sebastian Vettel", "Ayrton Senna"], correct: 1 },
      { q: "Quelle course d'endurance automobile mythique se déroule chaque année dans la Sarthe ?", a: ["Le Grand Prix de Monaco", "les 500 miles d'Indianapolis", "le rallye Dakar", "Les 24 Heures du Mans"], correct: 3 },
      { q: "Quel pilote brésilien de Formule 1, triple champion, est mort en course à Imola en 1994 ?", a: ["Nelson Piquet", "Ayrton Senna", "Emerson Fittipaldi", "Rubens Barrichello"], correct: 1 },
      { q: "Quel boxeur américain, ancien Cassius Clay, se proclamait « le plus grand » ?", a: ["Mike Tyson", "Joe Frazier", "George Foreman", "Mohamed Ali"], correct: 3 },
      { q: "Quel judoka français est décuple champion du monde et multiple champion olympique des poids lourds ?", a: ["Teddy Riner", "David Douillet", "Djamel Bouras", "Lucie Décosse"], correct: 0 },
      { q: "Quelle couleur de ceinture symbolise un haut niveau d'expertise dans les arts martiaux ?", a: ["La jaune", "la verte", "La noire", "la marron"], correct: 2 },
      { q: "Quel sport de combat se pratique avec un fleuret, une épée ou un sabre ?", a: ["Le kendo", "L'escrime", "le judo", "la lutte"], correct: 1 },
      { q: "Quel nageur américain détient le record de médailles d'or aux Jeux Olympiques ?", a: ["Michael Phelps", "Mark Spitz", "Ryan Lochte", "Caeleb Dressel"], correct: 0 },
      { q: "Quelle nage est généralement la plus rapide en compétition ?", a: ["La brasse", "le dos", "Le crawl", "le papillon"], correct: 2 },
      { q: "Quel pays européen, l'équipe des « Experts », a longtemps dominé le handball mondial ?", a: ["L'Allemagne", "l'Espagne", "la Suède", "La France"], correct: 3 },
      { q: "Combien de trous compte un parcours de golf standard ?", a: ["Neuf", "Douze", "Vingt-quatre", "Dix-huit"], correct: 3 },
      { q: "Quel match désigne la grande finale annuelle du football américain aux États-Unis ?", a: ["Le World Series", "la Stanley Cup", "le Final Four", "Le Super Bowl"], correct: 3 },
      { q: "Quelle gymnaste américaine domine la gymnastique artistique mondiale depuis les années 2010 ?", a: ["Nadia Comăneci", "Simone Biles", "Gabby Douglas", "Aly Raisman"], correct: 1 },
      { q: "Dans quel sport collectif marque-t-on des buts en lançant une petite balle à la main ?", a: ["Le basket-ball", "le volley-ball", "le water-polo", "Le handball"], correct: 3 },
      { q: "Comment nomme-t-on l'attaque puissante frappée vers le camp adverse au volley-ball ?", a: ["Le smash", "La manchette", "la passe", "le service flottant"], correct: 0 },
      { q: "Quel tournoi du Grand Chelem de tennis se dispute à New York en fin d'été ?", a: ["Roland-Garros", "Wimbledon", "L'US Open", "l'Open d'Australie"], correct: 2 },
      { q: "Quel gardien et capitaine a soulevé la Coupe du Monde 1998 avec la France ?", a: ["Fabien Barthez", "Didier Deschamps", "Marcel Desailly", "Laurent Blanc"], correct: 1 },
      { q: "Dans quel sport peut-on réaliser un « strike » et un « spare » ?", a: ["Le bowling", "Le billard", "les fléchettes", "le curling"], correct: 0 },
      { q: "Dans quel sport parle-t-on de « birdie », de « par » et de « bogey » ?", a: ["Le tennis", "le cricket", "le polo", "Le golf"], correct: 3 },
      { q: "Quel sport, très populaire en Inde, se joue avec une batte, des guichets et un lanceur ?", a: ["Le baseball", "le hockey sur gazon", "Le cricket", "le kabaddi"], correct: 2 },
      { q: "Quelle épreuve enchaîne natation, cyclisme et course à pied ?", a: ["Le pentathlon", "le biathlon", "le décathlon", "Le triathlon"], correct: 3 },
      { q: "Quel sport d'hiver combine le ski de fond et le tir à la carabine ?", a: ["Le combiné nordique", "le skeleton", "Le biathlon", "le saut à ski"], correct: 2 },
      { q: "Dans quel sport s'affrontent les Blackhawks, les Canadiens et les Bruins, avec un palet ?", a: ["Le basket-ball", "le baseball", "Le hockey sur glace", "le football américain"], correct: 2 },
      { q: "Comment nomme-t-on un coup au golf où la balle est rentrée en un seul coup depuis le départ ?", a: ["Un albatros", "un eagle", "un putt", "Un trou en un"], correct: 3 },
      { q: "Quel cycliste français, quintuple vainqueur du Tour de France, était surnommé « le Blaireau » ?", a: ["Laurent Fignon", "Raymond Poulidor", "Jacques Anquetil", "Bernard Hinault"], correct: 3 },
      { q: "Quelle joueuse américaine a dominé le tennis féminin des années 2000-2010 avec 23 titres du Grand Chelem ?", a: ["Venus Williams", "Serena Williams", "Steffi Graf", "Martina Hingis"], correct: 1 },
      { q: "Quel pilote néerlandais a remporté plusieurs titres de champion du monde de Formule 1 dans les années 2020 ?", a: ["Lando Norris", "Charles Leclerc", "George Russell", "Max Verstappen"], correct: 3 },
      { q: "Comment appelle-t-on l'action de reprendre le ballon de la tête au football ?", a: ["Une tête", "Une reprise de volée", "un tacle", "une aile de pigeon"], correct: 0 },
      { q: "Quel joueur portugais, quintuple Ballon d'or, a marqué un record de buts en sélection ?", a: ["Luís Figo", "Eusébio", "Cristiano Ronaldo", "Rúben Dias"], correct: 2 },
      { q: "Comment nomme-t-on la faute au football sanctionnée par un tir depuis un point situé face au but ?", a: ["Le corner", "Le penalty", "le coup franc", "la touche"], correct: 1 },
      { q: "Quel entraîneur écossais a marqué l'histoire de Manchester United pendant plus de vingt-cinq ans ?", a: ["Arsène Wenger", "Alex Ferguson", "José Mourinho", "Pep Guardiola"], correct: 1 },
      { q: "Quel club anglais est surnommé les « Reds » et joue à Anfield ?", a: ["Liverpool", "Manchester United", "Chelsea", "Arsenal"], correct: 0 },
      { q: "Quel entraîneur français, longtemps à Arsenal, est surnommé « le Professeur » ?", a: ["Didier Deschamps", "Gérard Houllier", "Raymond Domenech", "Arsène Wenger"], correct: 3 },
      { q: "Quelle compétition oppose tous les quatre ans les meilleures nations de rugby du monde ?", a: ["Le Tournoi des Six Nations", "le Rugby Championship", "La Coupe du Monde de rugby", "la Coupe des nations"], correct: 2 },
      { q: "Comment appelle-t-on la pénalité au rugby où le buteur frappe le ballon posé au sol vers les poteaux ?", a: ["Un drop", "une transformation", "un essai de pénalité", "Une pénalité"], correct: 3 },
      { q: "Quel joueur suisse au style élégant a remporté vingt titres du Grand Chelem au tennis ?", a: ["Stan Wawrinka", "Roger Federer", "Andy Murray", "Marat Safin"], correct: 1 },
      { q: "Quelle épreuve reine de l'athlétisme couronne le titre de « femme ou homme le plus rapide du monde » ?", a: ["Le 400 mètres", "le marathon", "Le 100 mètres", "le relais 4×100 m"], correct: 2 },
      { q: "Quel athlète français a été sacré champion olympique du saut à la perche et détenteur de records ?", a: ["Renaud Lavillenie", "Kevin Mayer", "Christophe Lemaitre", "Teddy Tamgho"], correct: 0 },
      { q: "Quel décathlonien français a détenu le record du monde de la discipline ?", a: ["Renaud Lavillenie", "Yohann Diniz", "Kevin Mayer", "Mahiedine Mekhissi"], correct: 2 },
      { q: "Quel Français, champion de canoë, a présidé l'organisation des Jeux de Paris 2024 ?", a: ["David Douillet", "Jean-Pierre Rives", "Tony Estanguet", "Guy Drut"], correct: 2 },
      { q: "Dans quel sport oppose-t-on deux équipes qui tentent de marquer des « touchdowns » ?", a: ["Le football américain", "Le rugby", "le hockey", "le handball"], correct: 0 },
      { q: "Comment appelle-t-on la course cycliste classique du nord de la France, sur les pavés, dite « l'Enfer du Nord » ?", a: ["Milan-San Remo", "le Tour des Flandres", "Paris-Roubaix", "Liège-Bastogne-Liège"], correct: 2 },
      { q: "Quel nageur français, frère d'une championne olympique, a été sacré champion olympique du 50 m nage libre ?", a: ["Alain Bernard", "Florent Manaudou", "Frédérick Bousquet", "Yannick Agnel"], correct: 1 },
      { q: "Quel sport de raquette rapide se joue avec un volant plutôt qu'une balle ?", a: ["Le squash", "le tennis de table", "Le badminton", "le padel"], correct: 2 },
      { q: "Quel sport de raquette se pratique contre les murs d'un court fermé ?", a: ["Le badminton", "le tennis", "Le squash", "le padel"], correct: 2 },
      { q: "Comment appelle-t-on l'ensemble des coureurs cyclistes groupés pendant une étape ?", a: ["L'échappée", "Le peloton", "la caravane", "le contre-la-montre"], correct: 1 },
      { q: "Quelle compétition annuelle de golf oppose l'Europe aux États-Unis par équipes ?", a: ["Le Masters", "la Solheim Cup", "La Ryder Cup", "l'Open britannique"], correct: 2 },
      { q: "Quel basketteur américain est devenu le meilleur marqueur de l'histoire de la NBA ?", a: ["Kareem Abdul-Jabbar", "Michael Jordan", "Kobe Bryant", "LeBron James"], correct: 3 },
      { q: "Comment appelle-t-on la victoire d'un joueur de tennis remportant les quatre tournois majeurs la même année ?", a: ["Le Grand Chelem", "Le Masters", "la Coupe Davis", "le Golden Slam"], correct: 0 },
      { q: "Quel gardien de but a longtemps détenu le brassard et remporté la Coupe du Monde 1998 avec son crâne rasé ?", a: ["Bernard Lama", "Fabien Barthez", "Grégory Coupet", "Mickaël Landreau"], correct: 1 },
      { q: "Quel sport nautique consiste à glisser sur les vagues, debout sur une planche ?", a: ["Le kitesurf", "l'aviron", "Le surf", "le paddle"], correct: 2 },
      { q: "Quel pays a inventé et longtemps dominé le sport du cricket, avant l'Inde ?", a: ["L'Australie", "l'Afrique du Sud", "le Pakistan", "L'Angleterre"], correct: 3 },
      { q: "Quelle course automobile mythique se déroule dans les rues de la principauté monégasque ?", a: ["Les 24 Heures du Mans", "le Grand Prix d'Italie", "Le Grand Prix de Monaco", "le rallye Monte-Carlo"], correct: 2 },
      { q: "Quel joueur de football néerlandais a incarné le « football total » dans les années 1970 ?", a: ["Marco van Basten", "Ruud Gullit", "Dennis Bergkamp", "Johan Cruyff"], correct: 3 },
      { q: "Comment nomme-t-on un enchaînement de trois buts marqués par un même joueur dans un match ?", a: ["Un doublé", "Un coup du chapeau", "un quadruplé", "un but en or"], correct: 1 },
      { q: "Quel trophée récompense chaque année le meilleur footballeur du monde selon France Football ?", a: ["Le Soulier d'or", "Le Ballon d'or", "le trophée FIFA The Best", "la Golden Foot"], correct: 1 },
    ],
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
    expert: [
      { q: "En 1945, quelle organisation a remplacé la Société des Nations pour maintenir la paix mondiale ?", a: ["L'ONU", "L'OTAN", "l'Union européenne", "la Croix-Rouge"], correct: 0 },
      { q: "Dans quelle ville se trouve le siège de l'ONU ?", a: ["Genève", "Bruxelles", "Vienne", "New York"], correct: 3 },
      { q: "Combien de membres permanents siègent au Conseil de sécurité de l'ONU ?", a: ["Trois", "Sept", "Cinq", "Dix"], correct: 2 },
      { q: "Quel droit permet à un membre permanent du Conseil de sécurité de bloquer à lui seul une résolution ?", a: ["Le droit d'amendement", "la motion de censure", "Le droit de veto", "le référendum"], correct: 2 },
      { q: "Lequel de ces pays n'est PAS membre permanent du Conseil de sécurité de l'ONU ?", a: ["La France", "L'Allemagne", "la Chine", "la Russie"], correct: 1 },
      { q: "Combien de langues officielles l'ONU reconnaît-elle ?", a: ["Quatre", "Cinq", "Dix", "Six"], correct: 3 },
      { q: "Comment surnomme-t-on les soldats du maintien de la paix de l'ONU, à cause de leur couvre-chef ?", a: ["Les Bérets verts", "les Chemises rouges", "les Gardes blancs", "Les Casques bleus"], correct: 3 },
      { q: "Quelle déclaration universelle l'ONU a-t-elle adoptée en 1948 ?", a: ["La Charte de l'Atlantique", "la Convention de Vienne", "le Pacte de Varsovie", "La Déclaration des droits de l'homme"], correct: 3 },
      { q: "Quelle agence de l'ONU est chargée de la santé mondiale, avec son siège à Genève ?", a: ["L'OMS", "L'UNESCO", "l'UNICEF", "la FAO"], correct: 0 },
      { q: "Quelle agence de l'ONU, dont le siège est à Paris, protège l'éducation, la science et le patrimoine mondial ?", a: ["L'OMS", "l'OMC", "L'UNESCO", "le FMI"], correct: 2 },
      { q: "Quelle agence de l'ONU vient en aide aux enfants du monde entier ?", a: ["Le HCR", "la FAO", "L'UNICEF", "l'OIT"], correct: 2 },
      { q: "Comment nomme-t-on le haut fonctionnaire qui dirige l'administration de l'ONU ?", a: ["Le président", "le chancelier", "le commissaire", "Le Secrétaire général"], correct: 3 },
      { q: "Combien d'États membres compte l'Union européenne depuis le Brexit ?", a: ["25", "28", "30", "27"], correct: 3 },
      { q: "Quel traité de 1957 a fondé la Communauté économique européenne, ancêtre de l'UE ?", a: ["Le traité de Rome", "Le traité de Maastricht", "le traité de Lisbonne", "le traité de Schengen"], correct: 0 },
      { q: "Quel traité de 1992 a donné naissance à l'Union européenne et préparé la monnaie unique ?", a: ["Le traité de Rome", "le traité de Nice", "le traité de Versailles", "Le traité de Maastricht"], correct: 3 },
      { q: "En quelle année les pièces et billets en euros sont-ils entrés en circulation ?", a: ["1992", "1999", "2002", "2010"], correct: 2 },
      { q: "Dans quelle ville allemande siège la Banque centrale européenne ?", a: ["Berlin", "Bruxelles", "Francfort", "Strasbourg"], correct: 2 },
      { q: "Combien d'étoiles dorées figurent sur le drapeau de l'Union européenne ?", a: ["Quinze", "Vingt-sept", "Douze", "Vingt-huit"], correct: 2 },
      { q: "Quel air de Beethoven a été adopté comme hymne de l'Union européenne ?", a: ["La Marche turque", "La Lettre à Élise", "Le Boléro", "L'Ode à la joie"], correct: 3 },
      { q: "Dans quelle ville française siège le Parlement européen ?", a: ["Paris", "Strasbourg", "Lyon", "Bruxelles"], correct: 1 },
      { q: "Dans quelle ville se trouve le siège de la Commission européenne ?", a: ["Bruxelles", "Strasbourg", "Luxembourg", "Genève"], correct: 0 },
      { q: "Que permet l'espace Schengen entre ses pays membres ?", a: ["Circuler sans contrôle aux frontières", "Utiliser la même monnaie", "voter aux mêmes élections", "payer les mêmes impôts"], correct: 0 },
      { q: "Quel pays a quitté l'Union européenne en 2020, un départ surnommé le « Brexit » ?", a: ["La Grèce", "la Suisse", "Le Royaume-Uni", "la Norvège"], correct: 2 },
      { q: "Quel programme européen permet aux étudiants d'étudier dans un autre pays de l'Union ?", a: ["Erasmus", "Schengen", "Interreg", "Horizon"], correct: 0 },
      { q: "Face à la menace de quel pays l'OTAN a-t-elle été fondée en 1949 ?", a: ["L'Allemagne", "la Chine", "le Japon", "L'Union soviétique"], correct: 3 },
      { q: "Que prévoit l'article 5 du traité de l'OTAN ?", a: ["Une attaque contre un membre est une attaque contre tous", "Le désarmement de tous les membres", "l'unanimité pour toute décision", "la neutralité en cas de conflit"], correct: 0 },
      { q: "Dans quelle ville se trouve le siège de l'OTAN ?", a: ["Washington", "Genève", "Bruxelles", "Londres"], correct: 2 },
      { q: "Quels deux pays nordiques ont rejoint l'OTAN en 2023 et 2024 ?", a: ["La Norvège et le Danemark", "La Finlande et la Suède", "l'Islande et l'Irlande", "l'Autriche et la Suisse"], correct: 1 },
      { q: "Quelle alliance militaire regroupait les pays communistes face à l'OTAN pendant la Guerre froide ?", a: ["Le Pacte de Varsovie", "Le Komintern", "la Triple-Alliance", "le Kominform militaire"], correct: 0 },
      { q: "Quel traité international vise à empêcher la diffusion des armes nucléaires ?", a: ["Le traité de Kyoto", "les accords de Paris", "le traité de l'Antarctique", "Le Traité de non-prolifération"], correct: 3 },
      { q: "Quelle organisation, dont le siège est à Genève, fixe les règles du commerce international ?", a: ["Le FMI", "l'OCDE", "L'OMC", "la Banque mondiale"], correct: 2 },
      { q: "Quelle institution financière, basée à Washington, prête aux États en difficulté financière ?", a: ["La BCE", "Le FMI", "l'OMC", "l'OCDE"], correct: 1 },
      { q: "Quelle organisation regroupe les principaux pays exportateurs de pétrole ?", a: ["L'OMC", "L'OPEP", "le G7", "l'AIE"], correct: 1 },
      { q: "Quel Suisse a fondé la Croix-Rouge après avoir été témoin d'une bataille sanglante ?", a: ["Jean-Jacques Rousseau", "Guillaume Tell", "Carl Gustav Jung", "Henry Dunant"], correct: 3 },
      { q: "Dans quelle ville se trouve le siège du Comité international de la Croix-Rouge ?", a: ["New York", "Paris", "Genève", "La Haye"], correct: 2 },
      { q: "Quel forum réunit les États-Unis, le Japon, l'Allemagne, le Royaume-Uni, la France, l'Italie et le Canada ?", a: ["Le G7", "Le G20", "l'OTAN", "le Conseil de sécurité"], correct: 0 },
      { q: "Quel forum international réunit les vingt principales économies mondiales, pays riches et émergents ?", a: ["Le G20", "Le G7", "l'OCDE", "les BRICS"], correct: 0 },
      { q: "Quel groupe rassemble notamment le Brésil, la Russie, l'Inde, la Chine et l'Afrique du Sud ?", a: ["Les BRICS", "Le G7", "l'ASEAN", "l'ALENA"], correct: 0 },
      { q: "Quelle organisation, dont le siège est à Addis-Abeba, rassemble les États du continent africain ?", a: ["La Ligue arabe", "la CEDEAO", "le Commonwealth", "L'Union africaine"], correct: 3 },
      { q: "Quelle organisation régionale regroupe les pays d'Asie du Sud-Est comme la Thaïlande et l'Indonésie ?", a: ["L'APEC", "le Mercosur", "l'OCS", "L'ASEAN"], correct: 3 },
      { q: "Quelle organisation rassemble les pays et régions ayant le français en partage ?", a: ["Le Commonwealth", "l'Union latine", "l'Alliance française seule", "La Francophonie"], correct: 3 },
      { q: "Quelle association regroupe la plupart des anciennes colonies de l'Empire britannique ?", a: ["La Francophonie", "Le Commonwealth", "l'Union africaine", "le Conseil de l'Europe"], correct: 1 },
      { q: "Dans quelle ville néerlandaise siège la Cour internationale de justice, organe de l'ONU ?", a: ["Amsterdam", "Genève", "La Haye", "Bruxelles"], correct: 2 },
      { q: "Quelle cour, à La Haye, juge les individus accusés de crimes de guerre et de génocide ?", a: ["La Cour pénale internationale", "La Cour internationale de justice", "la Cour européenne des droits de l'homme", "le Tribunal de Nuremberg"], correct: 0 },
      { q: "Dans quelle ville française se trouve le siège d'Interpol ?", a: ["Paris", "Strasbourg", "Lyon", "Marseille"], correct: 2 },
      { q: "Quelles conventions internationales, signées dans une ville suisse, encadrent le droit de la guerre ?", a: ["Les accords de Yalta", "les traités de Westphalie", "Les Conventions de Genève", "les conventions de La Haye seules"], correct: 2 },
      { q: "Quelle cour, à Strasbourg, juge les violations des droits de l'homme commises par les États européens ?", a: ["La Cour pénale internationale", "La Cour européenne des droits de l'homme", "la Cour de justice de l'UE", "la Cour internationale de justice"], correct: 1 },
      { q: "Quelle organisation, distincte de l'Union européenne, défend les droits de l'homme depuis Strasbourg ?", a: ["La Commission européenne", "l'OSCE", "l'OTAN", "Le Conseil de l'Europe"], correct: 3 },
      { q: "Comment nomme-t-on le représentant officiel permanent d'un pays auprès d'un autre État ?", a: ["Un ambassadeur", "Un consul honoraire", "un attaché de presse", "un émissaire ponctuel"], correct: 0 },
      { q: "Quelle protection empêche de poursuivre un diplomate devant les tribunaux du pays où il est en poste ?", a: ["Le droit d'asile", "la clause de neutralité", "le secret d'État", "L'immunité diplomatique"], correct: 3 },
      { q: "Comment appelle-t-on l'arrêt des combats convenu entre belligérants, sans traité de paix définitif ?", a: ["Une capitulation", "une annexion", "Un cessez-le-feu", "une médiation"], correct: 2 },
      { q: "Comment nomme-t-on l'interdiction officielle de commercer avec un pays pour le sanctionner ?", a: ["Un protectorat", "un moratoire", "un blocus culturel", "Un embargo"], correct: 3 },
      { q: "Quel pays d'Europe centrale est célèbre pour sa politique de neutralité de très longue date ?", a: ["La Belgique", "l'Autriche", "la Pologne", "La Suisse"], correct: 3 },
      { q: "Comment nomme-t-on une personne fuyant son pays à cause de la guerre ou de persécutions ?", a: ["Un réfugié", "Un expatrié", "un touriste", "un résident"], correct: 0 },
      { q: "Comment qualifie-t-on une personne qui ne possède la nationalité d'aucun pays ?", a: ["Apatride", "Binational", "réfugié", "clandestin"], correct: 0 },
      { q: "Comment nomme-t-on l'influence d'un pays exercée par sa culture et sa diplomatie plutôt que par la force ?", a: ["Le soft power", "Le hard power", "la Realpolitik", "l'ingérence"], correct: 0 },
      { q: "Que signifie brandir un drapeau blanc dans un conflit armé ?", a: ["Une déclaration de guerre", "un appel à l'aide", "une victoire", "Une reddition ou une trêve"], correct: 3 },
      { q: "Comment appelle-t-on un État où le pouvoir est partagé entre un gouvernement central et des États fédérés ?", a: ["Une monarchie absolue", "un État unitaire", "Une fédération", "une confédération tribale"], correct: 2 },
      { q: "Selon Montesquieu, quels sont les trois pouvoirs de l'État ?", a: ["Roi, noblesse et clergé", "central, régional et local", "Exécutif, législatif et judiciaire", "militaire, civil et religieux"], correct: 2 },
      { q: "Comment nomme-t-on un vote où les citoyens répondent directement à une question par oui ou par non ?", a: ["Une motion", "Un référendum", "un plébiscite parlementaire", "un sondage"], correct: 1 },
      { q: "Comment se nomme la résidence officielle du président des États-Unis, à Washington ?", a: ["La Maison-Blanche", "Le Capitole", "le Pentagone", "Camp David"], correct: 0 },
      { q: "Quel ensemble fortifié au cœur de Moscou est le siège du pouvoir russe ?", a: ["La place Rouge", "la Loubianka", "Le Kremlin", "la Douma"], correct: 2 },
      { q: "Quel palais parisien est la résidence officielle du président de la République française ?", a: ["Matignon", "le Palais-Bourbon", "le Luxembourg", "L'Élysée"], correct: 3 },
      { q: "À quelle célèbre adresse de Londres réside le Premier ministre britannique ?", a: ["À Buckingham Palace", "Au 10 Downing Street", "à Westminster", "à Whitehall"], correct: 1 },
      { q: "Quel bâtiment à cinq côtés abrite le ministère de la Défense des États-Unis ?", a: ["Le Capitole", "Le Pentagone", "la Maison-Blanche", "Fort Knox"], correct: 1 },
      { q: "Comment nomme-t-on les deux chambres du Parlement des États-Unis (Chambre des représentants et Sénat) ?", a: ["La Douma", "Le Congrès", "le Bundestag", "les Communes"], correct: 1 },
      { q: "Quelle ville est revendiquée comme capitale à la fois par les Israéliens et les Palestiniens ?", a: ["Tel-Aviv", "Jérusalem", "Ramallah", "Amman"], correct: 1 },
      { q: "Quel principe diplomatique conduit la plupart des États à ne pas reconnaître officiellement Taïwan ?", a: ["La doctrine Monroe", "Le principe d'une seule Chine", "la Realpolitik", "le non-alignement"], correct: 1 },
      { q: "Quelle ligne, doublée d'une zone démilitarisée, sépare la Corée du Nord et la Corée du Sud ?", a: ["Le mur de Berlin", "la ligne verte", "le rideau de fer", "Le 38e parallèle"], correct: 3 },
      { q: "Comment surnomme-t-on la région des Balkans en raison de son histoire instable et conflictuelle ?", a: ["Le grenier de l'Europe", "La poudrière de l'Europe", "le toit du monde", "le croissant fertile"], correct: 1 },
      { q: "Quel détroit stratégique, entre l'Iran et la péninsule arabique, voit passer une grande partie du pétrole mondial ?", a: ["Le détroit de Malacca", "le canal de Suez", "le Bosphore", "Le détroit d'Ormuz"], correct: 3 },
      { q: "Quelle région montagneuse est disputée depuis 1947 entre l'Inde et le Pakistan ?", a: ["Le Tibet", "Le Cachemire", "le Pendjab", "le Baloutchistan"], correct: 1 },
      { q: "Quelle monnaie sert de principale devise de réserve et d'échange dans le monde ?", a: ["Le dollar américain", "L'euro", "la livre sterling", "le yen"], correct: 0 },
      { q: "Que mesure le PIB (produit intérieur brut) d'un pays ?", a: ["Sa population", "La richesse produite en un an", "sa superficie", "sa dette totale"], correct: 1 },
      { q: "Comment nomme-t-on la monnaie officielle de la Chine ?", a: ["Le yuan", "Le yen", "le won", "le ringgit"], correct: 0 },
      { q: "Dans quelle ville est remis chaque année le prix Nobel de la paix ?", a: ["Stockholm", "Genève", "Oslo", "La Haye"], correct: 2 },
      { q: "Comment appelle-t-on une zone où les pays suppriment les droits de douane entre eux ?", a: ["Une union monétaire", "un protectorat", "Une zone de libre-échange", "une zone franche fiscale"], correct: 2 },
      { q: "Quel organe de l'ONU réunit tous les États membres, chacun disposant d'une voix ?", a: ["Le Conseil de sécurité", "L'Assemblée générale", "le Secrétariat", "la Cour internationale de justice"], correct: 1 },
      { q: "Comment appelle-t-on le refus d'un pays de participer à un événement pour marquer une protestation ?", a: ["Un boycott", "Un embargo", "un veto", "une abstention"], correct: 0 },
      { q: "Comment nomme-t-on une petite portion de territoire d'un État entièrement entourée par un autre pays ?", a: ["Une presqu'île", "Une enclave", "un protectorat", "un archipel"], correct: 1 },
      { q: "Comment appelle-t-on l'annexion ou la prise de contrôle d'un territoire par la force ?", a: ["Une annexion", "Une décolonisation", "une sécession", "une fédération"], correct: 0 },
      { q: "Comment nomme-t-on la séparation d'une région qui veut se détacher d'un État pour devenir indépendante ?", a: ["Une annexion", "Une sécession", "une coalition", "une ratification"], correct: 1 },
      { q: "Quelle politique de rapprochement entre l'Est et l'Ouest a marqué la fin de la Guerre froide sous Gorbatchev ?", a: ["La doctrine Truman", "le maccarthysme", "La perestroïka", "la Realpolitik"], correct: 2 },
      { q: "Quel rideau symbolique séparait, selon Churchill, l'Europe de l'Ouest de l'Europe communiste ?", a: ["Le mur de la honte", "Le rideau de fer", "la ligne rouge", "le mur de l'Atlantique"], correct: 1 },
      { q: "Comment appelle-t-on des pays qui refusaient de choisir un camp entre les deux blocs de la Guerre froide ?", a: ["Les neutres armés", "les satellites", "Les non-alignés", "les protectorats"], correct: 2 },
      { q: "Comment nomme-t-on le fait, pour un État, d'intervenir dans les affaires intérieures d'un autre pays ?", a: ["L'ingérence", "La souveraineté", "la neutralité", "la coopération"], correct: 0 },
      { q: "Quel plan américain a financé la reconstruction de l'Europe de l'Ouest après la Seconde Guerre mondiale ?", a: ["Le plan Schuman", "le New Deal", "le plan Monnet", "Le plan Marshall"], correct: 3 },
      { q: "Quelle organisation regroupe les pays d'Amérique du Nord dans un accord de libre-échange (ex-ALENA) ?", a: ["Le Mercosur", "L'ACEUM", "l'ASEAN", "la CARICOM"], correct: 1 },
      { q: "Quelle union douanière et commerciale regroupe plusieurs pays d'Amérique du Sud comme le Brésil et l'Argentine ?", a: ["L'ALENA", "Le Mercosur", "la CAN", "l'ASEAN"], correct: 1 },
      { q: "Comment appelle-t-on la capacité d'un État à se gouverner lui-même sans dépendre d'une puissance extérieure ?", a: ["La souveraineté", "La neutralité", "l'autarcie", "la citoyenneté"], correct: 0 },
      { q: "Quel bloc militaire, mené par les États-Unis, s'opposait à l'URSS pendant la Guerre froide ?", a: ["Le Pacte de Varsovie", "le Kominform", "la Triple-Entente", "L'OTAN"], correct: 3 },
      { q: "Comment nomme-t-on l'ensemble des règles diplomatiques et des bonnes manières entre États et représentants ?", a: ["La bienséance", "la jurisprudence", "Le protocole", "la coutume"], correct: 2 },
      { q: "Quelle grande conférence de 1945 a réuni Churchill, Roosevelt et Staline pour préparer l'après-guerre ?", a: ["La conférence de Yalta", "Le congrès de Vienne", "les accords de Munich", "le traité de Versailles"], correct: 0 },
      { q: "Comment appelle-t-on un accord solennel et écrit conclu entre plusieurs États ?", a: ["Un décret", "une motion", "Un traité", "une circulaire"], correct: 2 },
      { q: "Comment nomme-t-on l'approbation officielle d'un traité par un État, souvent par son parlement ?", a: ["La promulgation", "l'abrogation", "La ratification", "la médiation"], correct: 2 },
      { q: "Quelle grande muraille commerciale et d'infrastructures la Chine développe-t-elle à travers le monde (« routes de la soie ») ?", a: ["Le grand bond en avant", "Les nouvelles routes de la soie", "le rideau de bambou", "le mur numérique"], correct: 1 },
      { q: "Comment appelle-t-on un pays qui n'a aucun accès direct à la mer ?", a: ["Un archipel", "Un pays enclavé", "une île-continent", "un protectorat"], correct: 1 },
      { q: "Quelle organisation de coopération et de développement réunit surtout les économies avancées (« club des pays riches ») ?", a: ["L'OCDE", "L'OPEP", "le FMI", "l'OMC"], correct: 0 },
      { q: "Comment nomme-t-on le découpage d'anciennes colonies en nouveaux États indépendants, surtout après 1945 ?", a: ["La mondialisation", "La décolonisation", "la partition", "la fédéralisation"], correct: 1 },
      { q: "Comment appelle-t-on la stratégie consistant à posséder l'arme nucléaire pour dissuader toute attaque ?", a: ["La guerre préventive", "l'escalade", "la ligne rouge", "La dissuasion nucléaire"], correct: 3 },
    ],
  },
  arts: {
    expert: [
      { q: "Quel musée de Madrid conserve « Guernica » de Picasso ?", a: ["Le musée du Prado", "Le Louvre", "Le musée Reina Sofía", "Le MoMA de New York"], correct: 2 },
      { q: "Dans quel musée se trouve « La Nuit étoilée » de Van Gogh ?", a: ["Le musée d'Orsay", "Le Van Gogh Museum d'Amsterdam", "La Tate de Londres", "Le MoMA de New York"], correct: 3 },
      { q: "Qui a peint « Le Radeau de la Méduse » ?", a: ["Eugène Delacroix", "Jacques-Louis David", "Théodore Géricault", "Jean-Auguste-Dominique Ingres"], correct: 2 },
      { q: "Qui a peint « La Liberté guidant le peuple » ?", a: ["Théodore Géricault", "Gustave Courbet", "Édouard Manet", "Eugène Delacroix"], correct: 3 },
      { q: "Quel peintre officiel de l'Empire a réalisé « Le Sacre de Napoléon » ?", a: ["Antoine-Jean Gros", "Jacques-Louis David", "Anne-Louis Girodet", "François Gérard"], correct: 1 },
      { q: "Quelle œuvre de Picasso, peinte en 1907, est vue comme l'annonce du cubisme ?", a: ["Guernica", "La Vie", "Les Demoiselles d'Avignon", "Le Rêve"], correct: 2 },
      { q: "Quel tableau de Monet a donné son nom à l'impressionnisme ?", a: ["Les Nymphéas", "Impression, soleil levant", "La Gare Saint-Lazare", "Les Coquelicots"], correct: 1 },
      { q: "Quelle technique de dégradé vaporeux Léonard de Vinci emploie-t-il dans « La Joconde » ?", a: ["Le clair-obscur", "Le sfumato", "La grisaille", "Le camaïeu"], correct: 1 },
      { q: "Dans quelle ville italienne peut-on voir « La Cène » de Léonard de Vinci ?", a: ["Rome", "Florence", "Milan", "Venise"], correct: 2 },
      { q: "Qui a peint la fresque « L'École d'Athènes » au Vatican ?", a: ["Michel-Ange", "Raphaël", "Léonard de Vinci", "Le Caravage"], correct: 1 },
      { q: "Qui a peint « La Naissance de Vénus », conservée aux Offices de Florence ?", a: ["Le Titien", "Giorgione", "Sandro Botticelli", "Raphaël"], correct: 2 },
      { q: "Quel peintre flamand a réalisé le triptyque « Le Jardin des délices » ?", a: ["Pieter Bruegel", "Jan van Eyck", "Hans Memling", "Jérôme Bosch"], correct: 3 },
      { q: "Qui a peint « Les Époux Arnolfini » (1434), aujourd'hui à Londres ?", a: ["Rogier van der Weyden", "Jan van Eyck", "Hans Memling", "Jérôme Bosch"], correct: 1 },
      { q: "Quel maître hollandais a peint « La Ronde de nuit » ?", a: ["Johannes Vermeer", "Frans Hals", "Rembrandt", "Pierre Paul Rubens"], correct: 2 },
      { q: "Qui a peint « La Jeune Fille à la perle » ?", a: ["Rembrandt", "Johannes Vermeer", "Frans Hals", "Pieter de Hooch"], correct: 1 },
      { q: "Quel peintre norvégien a réalisé « Le Cri » ?", a: ["Gustav Klimt", "Egon Schiele", "Edvard Munch", "Ernst Ludwig Kirchner"], correct: 2 },
      { q: "Quel peintre viennois de la « période dorée » a réalisé « Le Baiser » (1908) ?", a: ["Egon Schiele", "Edvard Munch", "Gustav Klimt", "Alphonse Mucha"], correct: 2 },
      { q: "Quel peintre surréaliste a représenté des montres molles dans « La Persistance de la mémoire » ?", a: ["René Magritte", "Max Ernst", "Salvador Dalí", "Joan Miró"], correct: 2 },
      { q: "Quel peintre a écrit « Ceci n'est pas une pipe » sous une pipe peinte ?", a: ["Salvador Dalí", "Max Ernst", "René Magritte", "Paul Delvaux"], correct: 2 },
      { q: "Quel tableau de 1863 fit scandale au Salon des refusés avec un nu au milieu d'hommes habillés ?", a: ["Olympia", "L'Origine du monde", "Le Déjeuner sur l'herbe", "La Grande Odalisque"], correct: 2 },
      { q: "Quelle technique par petites touches juxtaposées Georges Seurat a-t-il théorisée ?", a: ["Le pointillisme", "Le fauvisme", "Le tachisme", "Le cloisonnisme"], correct: 0 },
      { q: "Dans quel village Monet a-t-il créé le jardin d'eau à l'origine des « Nymphéas » ?", a: ["Argenteuil", "Giverny", "Barbizon", "Auvers-sur-Oise"], correct: 1 },
      { q: "Dans quelle ville du sud de la France Van Gogh a-t-il peint « La Maison jaune » ?", a: ["Aix-en-Provence", "Arles", "Nice", "Avignon"], correct: 1 },
      { q: "Quelle sculptrice française fut l'élève et la muse d'Auguste Rodin ?", a: ["Rosa Bonheur", "Suzanne Valadon", "Berthe Morisot", "Camille Claudel"], correct: 3 },
      { q: "Dans quelle ville se trouve la statue en marbre du « David » de Michel-Ange ?", a: ["Rome", "Milan", "Florence", "Venise"], correct: 2 },
      { q: "Quel sculpteur roumain a épuré la forme dans « L'Oiseau dans l'espace » ?", a: ["Constantin Brancusi", "Jean Arp", "Alberto Giacometti", "Alexander Calder"], correct: 0 },
      { q: "Quel sculpteur suisse est célèbre pour ses figures filiformes comme « L'Homme qui marche » ?", a: ["Alberto Giacometti", "Alexander Calder", "Henry Moore", "Constantin Brancusi"], correct: 0 },
      { q: "Quel artiste américain a inventé les « mobiles », sculptures suspendues en mouvement ?", a: ["Alexander Calder", "Jean Tinguely", "Henry Moore", "Jean Arp"], correct: 0 },
      { q: "Quel mouvement mené par Matisse se distingue par des couleurs pures et violentes ?", a: ["Le cubisme", "L'expressionnisme", "Le mouvement nabi", "Le fauvisme"], correct: 3 },
      { q: "Quels deux peintres ont fondé le cubisme au début du XXe siècle ?", a: ["Picasso et Matisse", "Braque et Léger", "Gris et Delaunay", "Picasso et Braque"], correct: 3 },
      { q: "Quel artiste a exposé un urinoir renversé sous le titre « Fontaine » (1917) ?", a: ["Man Ray", "Francis Picabia", "Jean Arp", "Marcel Duchamp"], correct: 3 },
      { q: "Quelle œuvre de Marcel Duchamp ajoute une moustache à la Joconde ?", a: ["Fontaine", "Nu descendant un escalier", "L.H.O.O.Q.", "Roue de bicyclette"], correct: 2 },
      { q: "Quel artiste du pop art a sérigraphié les boîtes de soupe Campbell ?", a: ["Roy Lichtenstein", "Robert Rauschenberg", "David Hockney", "Andy Warhol"], correct: 3 },
      { q: "Quel artiste pop imitait la trame et les bulles de la bande dessinée ?", a: ["Andy Warhol", "Keith Haring", "Roy Lichtenstein", "Jean-Michel Basquiat"], correct: 2 },
      { q: "Quel peintre russe est souvent présenté comme un pionnier de l'art abstrait ?", a: ["Kasimir Malévitch", "Piet Mondrian", "Vassily Kandinsky", "Marc Chagall"], correct: 2 },
      { q: "Quel peintre néerlandais compose avec des lignes noires et des rectangles rouges, jaunes et bleus ?", a: ["Theo van Doesburg", "Piet Mondrian", "Paul Klee", "Kasimir Malévitch"], correct: 1 },
      { q: "Quel peintre a réalisé « Carré noir sur fond blanc », manifeste du suprématisme ?", a: ["Alexandre Rodtchenko", "Vassily Kandinsky", "Kasimir Malévitch", "Vladimir Tatline"], correct: 2 },
      { q: "Quel peintre américain projetait la peinture sur la toile posée au sol (dripping) ?", a: ["Jackson Pollock", "Mark Rothko", "Willem de Kooning", "Barnett Newman"], correct: 0 },
      { q: "Quel peintre est connu pour ses grands aplats de couleurs superposés et vibrants ?", a: ["Mark Rothko", "Jackson Pollock", "Yves Klein", "Barnett Newman"], correct: 0 },
      { q: "Quel artiste français a déposé un bleu outremer intense connu sous le sigle IKB ?", a: ["Pierre Soulages", "Daniel Buren", "Piero Manzoni", "Yves Klein"], correct: 3 },
      { q: "Quel peintre français a fait du noir une matière de lumière avec son « outrenoir » ?", a: ["Yves Klein", "Hans Hartung", "Georges Mathieu", "Pierre Soulages"], correct: 3 },
      { q: "Quel artiste a empaqueté le Pont-Neuf puis l'Arc de Triomphe de Paris ?", a: ["Daniel Buren", "Robert Smithson", "Richard Long", "Christo"], correct: 3 },
      { q: "Qui a conçu les colonnes rayées de la cour d'honneur du Palais-Royal, à Paris ?", a: ["Daniel Buren", "Yves Klein", "Jesús Rafael Soto", "Victor Vasarely"], correct: 0 },
      { q: "Quel artiste est considéré comme un maître de l'art optique (« op art ») ?", a: ["Victor Vasarely", "Jesús Rafael Soto", "Bridget Riley", "Josef Albers"], correct: 0 },
      { q: "Quelle artiste a créé les sculptures féminines colorées appelées « Nanas » ?", a: ["Louise Bourgeois", "Niki de Saint Phalle", "Magdalena Abakanowicz", "Annette Messager"], correct: 1 },
      { q: "Quelle artiste a sculpté les araignées monumentales intitulées « Maman » ?", a: ["Niki de Saint Phalle", "Louise Bourgeois", "Yayoi Kusama", "Barbara Hepworth"], correct: 1 },
      { q: "Quelle artiste japonaise est célèbre pour ses pois et ses citrouilles ?", a: ["Mariko Mori", "Chiharu Shiota", "Yayoi Kusama", "Takashi Murakami"], correct: 2 },
      { q: "Quel artiste de rue britannique, resté anonyme, travaille au pochoir ?", a: ["Banksy", "Blek le Rat", "Shepard Fairey", "JR"], correct: 0 },
      { q: "Quel artiste français colle d'immenses portraits photographiques dans l'espace public ?", a: ["Banksy", "Invader", "C215", "JR"], correct: 3 },
      { q: "Quel peintre américain, proche de Warhol, est passé du graffiti (SAMO) à la peinture ?", a: ["Jean-Michel Basquiat", "Keith Haring", "Kenny Scharf", "Francesco Clemente"], correct: 0 },
      { q: "Quel artiste dessinait des figures dynamiques à la craie dans le métro de New York ?", a: ["Jean-Michel Basquiat", "Keith Haring", "Andy Warhol", "Kenny Scharf"], correct: 1 },
      { q: "Quel architecte a conçu la basilique de la Sagrada Família à Barcelone ?", a: ["Lluís Domènech i Montaner", "Antoni Gaudí", "Santiago Calatrava", "Josep Lluís Sert"], correct: 1 },
      { q: "Quel architecte a défini la maison comme une « machine à habiter » ?", a: ["Auguste Perret", "Le Corbusier", "Robert Mallet-Stevens", "Jean Prouvé"], correct: 1 },
      { q: "Quel architecte allemand a fondé l'école du Bauhaus en 1919 ?", a: ["Mies van der Rohe", "Walter Gropius", "Peter Behrens", "Marcel Breuer"], correct: 1 },
      { q: "À quel architecte doit-on la formule « less is more » ?", a: ["Le Corbusier", "Mies van der Rohe", "Frank Lloyd Wright", "Walter Gropius"], correct: 1 },
      { q: "Quel architecte américain a conçu la « Maison sur la cascade » (Fallingwater) ?", a: ["Louis Sullivan", "Philip Johnson", "Louis Kahn", "Frank Lloyd Wright"], correct: 3 },
      { q: "Quel architecte a dessiné le musée Guggenheim de Bilbao, habillé de titane ?", a: ["Zaha Hadid", "Norman Foster", "Jean Nouvel", "Frank Gehry"], correct: 3 },
      { q: "Quelle architecte irako-britannique fut la première femme à recevoir le prix Pritzker ?", a: ["Zaha Hadid", "Kazuyo Sejima", "Odile Decq", "Elizabeth Diller"], correct: 0 },
      { q: "Quel architecte français a conçu l'Institut du monde arabe à Paris ?", a: ["Dominique Perrault", "Christian de Portzamparc", "Jean-Michel Wilmotte", "Jean Nouvel"], correct: 3 },
      { q: "Quel architecte a conçu la pyramide de verre du Louvre ?", a: ["Jean Nouvel", "Ieoh Ming Pei", "Norman Foster", "Renzo Piano"], correct: 1 },
      { q: "Quels architectes ont conçu le Centre Pompidou, aux structures apparentes ?", a: ["Renzo Piano et Richard Rogers", "Norman Foster et Richard Rogers", "Renzo Piano et Jean Nouvel", "Rem Koolhaas et Richard Rogers"], correct: 0 },
      { q: "Quel architecte danois a imaginé les voiles de l'Opéra de Sydney ?", a: ["Eero Saarinen", "Jørn Utzon", "Alvar Aalto", "Arne Jacobsen"], correct: 1 },
      { q: "Quel paysagiste a dessiné les jardins à la française du château de Versailles ?", a: ["André Le Nôtre", "Louis Le Vau", "Jules Hardouin-Mansart", "Charles Le Brun"], correct: 0 },
      { q: "Quel architecte du XIXe siècle a restauré Notre-Dame de Paris et la cité de Carcassonne ?", a: ["Georges-Eugène Haussmann", "Eugène Viollet-le-Duc", "Charles Garnier", "Henri Labrouste"], correct: 1 },
      { q: "Quel architecte a conçu l'Opéra de Paris inauguré en 1875 ?", a: ["Charles Garnier", "Eugène Viollet-le-Duc", "Victor Baltard", "Théodore Ballu"], correct: 0 },
      { q: "Quel style médiéval se reconnaît à l'arc brisé et à la croisée d'ogives ?", a: ["Le roman", "Le gothique", "Le byzantin", "Le baroque"], correct: 1 },
      { q: "Quel artiste baroque a conçu la colonnade de la place Saint-Pierre de Rome ?", a: ["Francesco Borromini", "Michel-Ange", "Donato Bramante", "Le Bernin"], correct: 3 },
      { q: "Quel peintre italien est célèbre pour son clair-obscur violent (ténébrisme) ?", a: ["Le Caravage", "Pierre Paul Rubens", "Diego Vélasquez", "Le Bernin"], correct: 0 },
      { q: "Quel peintre espagnol a réalisé « Les Ménines » ?", a: ["Francisco de Goya", "Diego Vélasquez", "Bartolomé Murillo", "Francisco de Zurbarán"], correct: 1 },
      { q: "Quel peintre espagnol a réalisé « Le Trois Mai 1808 » et les « peintures noires » ?", a: ["Diego Vélasquez", "Le Greco", "Francisco de Goya", "José de Ribera"], correct: 2 },
      { q: "Quel peintre né en Crète, actif à Tolède, étirait démesurément ses figures ?", a: ["Le Greco", "Diego Vélasquez", "Francisco de Zurbarán", "José de Ribera"], correct: 0 },
      { q: "Quel paysagiste anglais est célèbre pour ses marines lumineuses et brumeuses ?", a: ["John Constable", "William Turner", "Thomas Gainsborough", "Joshua Reynolds"], correct: 1 },
      { q: "Quel peintre, chef de file du réalisme, a peint « Un enterrement à Ornans » ?", a: ["Jean-François Millet", "Camille Corot", "Honoré Daumier", "Gustave Courbet"], correct: 3 },
      { q: "Quel peintre a réalisé « L'Angélus » et « Les Glaneuses » ?", a: ["Gustave Courbet", "Camille Corot", "Théodore Rousseau", "Jean-François Millet"], correct: 3 },
      { q: "Quel impressionniste est surtout connu pour ses danseuses et ses pastels ?", a: ["Auguste Renoir", "Gustave Caillebotte", "Edgar Degas", "Alfred Sisley"], correct: 2 },
      { q: "Quel peintre a réalisé « Le Bal du moulin de la Galette » ?", a: ["Claude Monet", "Édouard Manet", "Auguste Renoir", "Edgar Degas"], correct: 2 },
      { q: "Quelle peintre française, belle-sœur d'Édouard Manet, fut une grande figure impressionniste ?", a: ["Mary Cassatt", "Suzanne Valadon", "Eva Gonzalès", "Berthe Morisot"], correct: 3 },
      { q: "Quel peintre a représenté sans relâche la montagne Sainte-Victoire ?", a: ["Paul Cézanne", "Vincent van Gogh", "Paul Gauguin", "Paul Signac"], correct: 0 },
      { q: "Quel peintre postimpressionniste est parti s'installer à Tahiti ?", a: ["Vincent van Gogh", "Paul Cézanne", "Paul Gauguin", "Émile Bernard"], correct: 2 },
      { q: "Quel artiste tchèque est une grande figure de l'Art nouveau et de l'affiche décorative ?", a: ["Gustav Klimt", "Aubrey Beardsley", "Jules Chéret", "Alphonse Mucha"], correct: 3 },
      { q: "Quel peintre a réalisé le plafond peint de l'Opéra Garnier en 1964 ?", a: ["Henri Matisse", "Fernand Léger", "Joan Miró", "Marc Chagall"], correct: 3 },
      { q: "Quel peintre a réalisé de grandes « gouaches découpées » à la fin de sa vie ?", a: ["Henri Matisse", "Pablo Picasso", "Georges Braque", "André Derain"], correct: 0 },
      { q: "Quelle peintre mexicaine est célèbre pour ses autoportraits intenses ?", a: ["Remedios Varo", "Rufino Tamayo", "María Izquierdo", "Frida Kahlo"], correct: 3 },
      { q: "Quel muraliste mexicain, époux de Frida Kahlo, est un maître de la fresque ?", a: ["José Clemente Orozco", "David Siqueiros", "Rufino Tamayo", "Diego Rivera"], correct: 3 },
      { q: "Quel artiste japonais a gravé l'estampe « La Grande Vague de Kanagawa » ?", a: ["Hokusai", "Hiroshige", "Utamaro", "Sharaku"], correct: 0 },
      { q: "Au sens strict, sur quel support une « fresque » est-elle peinte ?", a: ["Une planche de bois", "Un enduit encore frais", "Une toile tendue", "Une plaque de cuivre"], correct: 1 },
      { q: "Quelle technique crée l'illusion du relief ou de la profondeur sur une surface plane ?", a: ["Le trompe-l'œil", "Le camaïeu", "Le pochoir", "La grisaille"], correct: 0 },
      { q: "Dans « Les Ambassadeurs » de Hans Holbein, quelle forme déformée apparaît au premier plan ?", a: ["Un crâne", "Un sablier", "Une couronne", "Un miroir"], correct: 0 },
      { q: "Parmi ces peintures à l'eau, laquelle est réputée transparente ?", a: ["La gouache", "L'acrylique", "L'aquarelle", "La tempera"], correct: 2 },
      { q: "Quelle technique de gravure utilise un acide qui mord une plaque de métal ?", a: ["L'eau-forte", "La xylographie", "La lithographie", "La sérigraphie"], correct: 0 },
      { q: "Quelle technique d'impression repose sur l'antagonisme de l'eau et du gras sur une pierre calcaire ?", a: ["La lithographie", "L'eau-forte", "La sérigraphie", "La taille-douce"], correct: 0 },
      { q: "Comment appelle-t-on les petits fragments de verre ou de pierre assemblés dans une mosaïque ?", a: ["Des cabochons", "Des camées", "Des tesselles", "Des cames"], correct: 2 },
      { q: "Quelle cathédrale française est réputée pour ses vitraux médiévaux et son fameux bleu ?", a: ["Reims", "Chartres", "Amiens", "Beauvais"], correct: 1 },
      { q: "Quel événement historique la « tapisserie de Bayeux » raconte-t-elle ?", a: ["La première croisade", "La guerre de Cent Ans", "La bataille de Bouvines", "La conquête de l'Angleterre par Guillaume"], correct: 3 },
      { q: "Quel musée parisien conserve la tenture médiévale « La Dame à la licorne » ?", a: ["Le Louvre", "Le musée d'Orsay", "Le musée Carnavalet", "Le musée de Cluny"], correct: 3 },
      { q: "Quel procédé ancien permet de couler une statue en bronze à partir d'un modèle en cire ?", a: ["La taille directe", "La cire perdue", "Le moulage au sable", "La galvanoplastie"], correct: 1 },
      { q: "De quelle ville de Toscane provient le marbre blanc prisé des sculpteurs ?", a: ["Carrare", "Vérone", "Sienne", "Naples"], correct: 0 },
      { q: "Dans quel ancien bâtiment le musée d'Orsay, à Paris, est-il installé ?", a: ["Un ancien palais royal", "Une ancienne abbaye", "Une ancienne gare", "une ancienne caserne"], correct: 2 },
      { q: "Quel peintre maniériste composait des visages avec des fruits et des légumes ?", a: ["Jérôme Bosch", "Pieter Bruegel", "Giuseppe Arcimboldo", "Jacopo Bassano"], correct: 2 },
      { q: "Quel peintre flamand a représenté « La Tour de Babel » et de nombreuses scènes paysannes ?", a: ["Pieter Bruegel l'Ancien", "Jérôme Bosch", "Pierre Paul Rubens", "Jacob Jordaens"], correct: 0 },
    ],
  },
  nature: {
    expert: [
      { q: "Quel est le plus grand animal ayant jamais existé sur Terre ?", a: ["L'éléphant d'Afrique", "Le diplodocus", "La baleine bleue", "Le requin-baleine"], correct: 2 },
      { q: "Quel est l'animal terrestre le plus rapide à la course ?", a: ["Le lévrier", "L'antilope", "Le cheval", "Le guépard"], correct: 3 },
      { q: "Quel oiseau atteint la plus grande vitesse, en piqué ?", a: ["L'aigle royal", "Le martinet", "Le faucon pèlerin", "L'autruche"], correct: 2 },
      { q: "Quel est le plus grand lézard du monde ?", a: ["L'iguane vert", "Le gecko géant", "Le varan de Komodo", "Le caméléon panthère"], correct: 2 },
      { q: "Quel est le plus grand des félins ?", a: ["Le lion", "Le jaguar", "Le tigre", "Le léopard"], correct: 2 },
      { q: "Quel oiseau détient le record de la plus longue migration annuelle ?", a: ["L'hirondelle", "La sterne arctique", "La cigogne blanche", "Le manchot empereur"], correct: 1 },
      { q: "Quel mammifère terrestre possède la plus longue gestation, environ 22 mois ?", a: ["Le rhinocéros", "L'éléphant", "La girafe", "L'hippopotame"], correct: 1 },
      { q: "Quel est le plus grand poisson du monde ?", a: ["Le grand requin blanc", "Le poisson-lune", "Le requin-baleine", "La raie manta"], correct: 2 },
      { q: "Quelle espèce compte les arbres les plus hauts du monde ?", a: ["Le baobab", "L'eucalyptus", "Le chêne", "Le séquoia"], correct: 3 },
      { q: "Quelle plante produit la plus grande fleur du monde, la « fleur cadavre » ?", a: ["Le nénuphar géant", "La rafflesia", "Le lotus", "L'arum titan"], correct: 1 },
      { q: "À quel groupe de mammifères, qui portent leurs petits dans une poche, appartient le kangourou ?", a: ["Les rongeurs", "Les primates", "Les félins", "Les marsupiaux"], correct: 3 },
      { q: "Quel est le seul mammifère capable d'un vol battu véritable ?", a: ["L'écureuil volant", "Le colibri", "L'ornithorynque", "La chauve-souris"], correct: 3 },
      { q: "Quel mammifère, en Australie, pond des œufs ?", a: ["Le koala", "Le wombat", "L'opossum", "L'ornithorynque"], correct: 3 },
      { q: "À quelle classe d'animaux appartient l'araignée ?", a: ["Les insectes", "Les myriapodes", "Les arachnides", "Les crustacés"], correct: 2 },
      { q: "Le corail bâtisseur de récifs est en réalité de quelle nature ?", a: ["Un animal", "Une plante", "Un minéral", "Une algue"], correct: 0 },
      { q: "Le lichen naît de l'association d'un champignon et de quel autre organisme ?", a: ["Une algue", "Une mousse", "Une bactérie seule", "Un ver"], correct: 0 },
      { q: "À quel règle du vivant appartiennent les champignons ?", a: ["Le règne végétal", "Le règne fongique", "Le règne animal", "Le règne minéral"], correct: 1 },
      { q: "L'orque (épaulard) appartient en réalité à quelle famille ?", a: ["Les dauphins", "Les requins", "Les baleines à fanons", "Les phoques"], correct: 0 },
      { q: "Comment qualifie-t-on une espèce qui n'existe que dans une seule région du monde ?", a: ["Migratrice", "Endémique", "Invasive", "Nocturne"], correct: 1 },
      { q: "Comment appelle-t-on un animal qui pond des œufs plutôt que de mettre bas ?", a: ["Vivipare", "Herbivore", "Ovipare", "Vertébré"], correct: 2 },
      { q: "Combien de cœurs possède une pieuvre ?", a: ["Un", "Trois", "Deux", "Cinq"], correct: 1 },
      { q: "De quelle couleur est le sang de la pieuvre ?", a: ["Bleu", "Rouge", "Vert", "Incolore"], correct: 0 },
      { q: "Combien de pattes possède une araignée ?", a: ["Six", "Dix", "Quatre", "Huit"], correct: 3 },
      { q: "Combien de pattes possèdent la plupart des insectes adultes ?", a: ["Quatre", "Huit", "Dix", "Six"], correct: 3 },
      { q: "Combien de bras possède la pieuvre ?", a: ["Six", "Dix", "Douze", "Huit"], correct: 3 },
      { q: "Combien de vertèbres cervicales possède la girafe, comme presque tous les mammifères ?", a: ["Cinq", "Douze", "Vingt", "Sept"], correct: 3 },
      { q: "Combien de bosses possède le dromadaire ?", a: ["Deux", "Une", "Trois", "Aucune"], correct: 1 },
      { q: "De quelle matière est faite la corne du rhinocéros ?", a: ["D'ivoire", "De kératine", "D'os", "De corail"], correct: 1 },
      { q: "De quelle couleur est la peau de l'ours polaire, sous sa fourrure ?", a: ["Blanche", "Rose", "Grise", "Noire"], correct: 3 },
      { q: "La longue « corne » torsadée du narval est en réalité quoi ?", a: ["Une dent", "Un os du crâne", "Une nageoire", "Un poil durci"], correct: 0 },
      { q: "En plus de ses poumons, par quel organe la grenouille peut-elle respirer ?", a: ["Les branchies", "La peau", "Le foie", "La queue"], correct: 1 },
      { q: "Avec quel organe le serpent « goûte » l'air pour se repérer ?", a: ["Ses narines", "Sa langue", "Ses écailles", "Ses oreilles"], correct: 1 },
      { q: "De quoi est constitué le squelette du requin ?", a: ["D'os", "De kératine", "De cartilage", "De calcaire"], correct: 2 },
      { q: "Chez le moustique, lequel pique l'être humain pour se nourrir de sang ?", a: ["Le mâle", "Les jeunes larves", "Les deux également", "La femelle"], correct: 3 },
      { q: "Quel oiseau pond ses œufs dans le nid d'autres espèces, qui élèvent ses petits ?", a: ["Le rossignol", "Le coucou", "La pie", "Le merle"], correct: 1 },
      { q: "Quel oiseau est capable de voler en arrière et de faire du surplace ?", a: ["L'hirondelle", "Le colibri", "Le moineau", "Le héron"], correct: 1 },
      { q: "Comment la chauve-souris se repère-t-elle dans l'obscurité ?", a: ["Par écholocation", "Grâce à sa vue perçante", "Par l'odorat", "Grâce au champ magnétique"], correct: 0 },
      { q: "D'où provient la couleur rose du flamant ?", a: ["De son alimentation", "De ses gènes", "Du soleil", "De la température de l'eau"], correct: 0 },
      { q: "Chez l'hippocampe, qui porte les petits jusqu'à la naissance ?", a: ["Le mâle", "La femelle", "Les deux ensemble", "Aucun, les œufs flottent"], correct: 0 },
      { q: "Avec quel animal le poisson-clown vit-il en symbiose pour se protéger ?", a: ["L'anémone de mer", "Le corail dur", "La méduse", "L'étoile de mer"], correct: 0 },
      { q: "Quel rongeur des montagnes hiberne plusieurs mois et siffle pour donner l'alerte ?", a: ["Le castor", "Le hérisson", "La marmotte", "L'écureuil"], correct: 2 },
      { q: "Quel poisson remonte les rivières à contre-courant pour se reproduire ?", a: ["Le saumon", "La truite de mer", "L'anguille", "Le brochet"], correct: 0 },
      { q: "Quel micro-animal peut survivre au vide spatial et à des températures extrêmes ?", a: ["Le tardigrade", "La fourmi", "Le nématode", "Le rotifère"], correct: 0 },
      { q: "Lequel de ces oiseaux est incapable de voler ?", a: ["Le manchot", "Le pingouin", "Le macareux", "Le guillemot"], correct: 0 },
      { q: "Qu'est-ce qui distingue visuellement un hibou d'une chouette ?", a: ["Les aigrettes de plumes", "La couleur des yeux", "La taille du bec", "Le nombre de serres"], correct: 0 },
      { q: "Combien de bosses distinguent le chameau du dromadaire ?", a: ["Une", "Trois", "Aucune", "Deux"], correct: 3 },
      { q: "Dans quel hémisphère vivent, à l'état sauvage, tous les manchots ?", a: ["L'hémisphère nord", "Uniquement à l'équateur", "L'hémisphère sud", "Les deux hémisphères"], correct: 2 },
      { q: "Comment nomme-t-on l'enveloppe dans laquelle la chenille se transforme en papillon ?", a: ["Le cocon de mue", "La nymphe aquatique", "L'alvéole", "La chrysalide"], correct: 3 },
      { q: "Quelle petite bête est un précieux prédateur des pucerons au jardin ?", a: ["La coccinelle", "La punaise verte", "Le criquet", "La cigale"], correct: 0 },
      { q: "Quel insecte produit le fil de soie utilisé en tissage ?", a: ["L'araignée tisserande", "L'abeille", "Le bombyx du chêne", "Le ver à soie"], correct: 3 },
      { q: "Quel phénomène permet à la luciole d'émettre de la lumière ?", a: ["La fluorescence solaire", "La phosphorescence minérale", "La bioluminescence", "L'électricité statique"], correct: 2 },
      { q: "Comment appelle-t-on un rassemblement d'abeilles quittant la ruche en vol ?", a: ["Une meute", "Un essaim", "Un banc", "Une harde"], correct: 1 },
      { q: "Comment appelle-t-on le petit du sanglier ?", a: ["Le levraut", "Le faon", "Le marcassin", "Le marcassou"], correct: 2 },
      { q: "Comment appelle-t-on le petit du lièvre ?", a: ["Le lapereau", "Le faon", "Le levraut", "Le marcassin"], correct: 2 },
      { q: "Comment appelle-t-on la femelle du sanglier ?", a: ["La laie", "La biche", "La truie", "La hase"], correct: 0 },
      { q: "Comment appelle-t-on un groupe de loups vivant et chassant ensemble ?", a: ["Une meute", "Un troupeau", "Une harde", "Un banc"], correct: 0 },
      { q: "Quel animal « brame » à l'automne pendant la période du rut ?", a: ["Le loup", "Le sanglier", "Le chevreuil", "Le cerf"], correct: 3 },
      { q: "Quel animal de la forêt du Congo, aux pattes rayées, est le cousin de la girafe ?", a: ["Le zèbre", "L'okapi", "Le tapir", "L'antilope"], correct: 1 },
      { q: "De quoi le panda géant se nourrit-il presque exclusivement ?", a: ["D'eucalyptus", "De fruits", "De bambou", "De poissons"], correct: 2 },
      { q: "De quelles feuilles le koala se nourrit-il presque uniquement ?", a: ["Le bambou", "L'eucalyptus", "L'acacia", "Le figuier"], correct: 1 },
      { q: "Quel mammifère couvert d'écailles est le plus braconné au monde ?", a: ["Le tatou", "Le pangolin", "Le fourmilier", "Le hérisson"], correct: 1 },
      { q: "Quel marsupial australien produit des crottes de forme cubique ?", a: ["Le wombat", "Le koala", "L'opossum", "Le bandicoot"], correct: 0 },
      { q: "Quel petit renard du désert se reconnaît à ses très grandes oreilles ?", a: ["Le fennec", "Le chacal", "Le coyote", "Le dingo"], correct: 0 },
      { q: "Quel est le seul félin réellement social, vivant en groupe organisé ?", a: ["Le lion", "Le guépard", "Le tigre", "Le léopard"], correct: 0 },
      { q: "Quel grand ouvrage les castors construisent-ils sur les cours d'eau ?", a: ["Des barrages", "Des ponts", "Des terriers en falaise", "Des nids flottants"], correct: 0 },
      { q: "Quel milieu côtier tropical est formé d'arbres aux racines plongeant dans l'eau salée ?", a: ["La toundra", "La savane", "La garrigue", "La mangrove"], correct: 3 },
      { q: "Quelle vaste forêt de conifères s'étend au nord de la Sibérie et du Canada ?", a: ["La jungle", "La pampa", "La lande", "La taïga"], correct: 3 },
      { q: "Quel est le plus grand désert chaud du monde ?", a: ["Le désert de Gobi", "Le Sahara", "Le désert d'Atacama", "Le Kalahari"], correct: 1 },
      { q: "Au large de quel pays se trouve la Grande Barrière de corail ?", a: ["Le Brésil", "L'Indonésie", "Le Mexique", "L'Australie"], correct: 3 },
      { q: "Comment appelle-t-on la partie souterraine et filamenteuse d'un champignon ?", a: ["La spore", "Le chapeau", "Le mycélium", "Le rhizome"], correct: 2 },
      { q: "Comment les fougères se reproduisent-elles, sans fleurs ni graines ?", a: ["Par des spores", "Par bouturage naturel", "Par des bulbes", "Par pollinisation"], correct: 0 },
      { q: "Quel conifère est réputé pour perdre ses aiguilles en hiver ?", a: ["Le sapin", "L'épicéa", "Le pin", "Le mélèze"], correct: 3 },
      { q: "De quel arbre tire-t-on le latex du caoutchouc naturel ?", a: ["Le teck", "Le palissandre", "L'acajou", "L'hévéa"], correct: 3 },
      { q: "Le safran est fait des pistils séchés de quelle fleur ?", a: ["La tulipe", "Le lys", "Le crocus", "L'iris"], correct: 2 },
      { q: "À quelle famille de plantes appartient la vanille ?", a: ["Les liliacées", "Les orchidées", "Les fougères", "Les graminées"], correct: 1 },
      { q: "Quel arbre produit les glands ?", a: ["Le hêtre", "Le châtaignier", "Le frêne", "Le chêne"], correct: 3 },
      { q: "Sur quel arbre poussent les marrons d'Inde, non comestibles ?", a: ["Le châtaignier", "Le noyer", "Le marronnier", "Le noisetier"], correct: 2 },
      { q: "Quelle plante carnivore referme brusquement ses pièges à charnière sur les insectes ?", a: ["Le nénuphar", "La dionée", "Le lierre", "L'ortie"], correct: 1 },
      { q: "Quel gaz les plantes rejettent-elles le jour grâce à la photosynthèse ?", a: ["De l'oxygène", "Du dioxyde de carbone", "De l'azote", "Du méthane"], correct: 0 },
      { q: "Quel champignon très toxique cause la plupart des empoisonnements mortels ?", a: ["Le bolet", "L'amanite phalloïde", "La girolle", "Le cèpe"], correct: 1 },
      { q: "Quel mammifère marin est réputé pour ses longs « chants » complexes ?", a: ["La baleine à bosse", "Le dauphin", "Le morse", "Le phoque"], correct: 0 },
      { q: "De quel minuscule crustacé les grandes baleines à fanons se nourrissent-elles surtout ?", a: ["Le plancton végétal", "La méduse", "Le krill", "Le calmar"], correct: 2 },
      { q: "La méduse possède-t-elle un cerveau ?", a: ["Oui, un petit cerveau", "Oui, plusieurs cerveaux", "Non, aucun", "Seulement à l'état de larve"], correct: 2 },
      { q: "Quel est le plus grand invertébré connu, aux yeux immenses ?", a: ["La pieuvre commune", "Le calmar géant", "Le crabe royal", "La méduse à crinière"], correct: 1 },
      { q: "Quelle tortue marine, sans carapace osseuse rigide, est la plus grande du monde ?", a: ["La tortue verte", "La caouanne", "La tortue imbriquée", "La tortue luth"], correct: 3 },
      { q: "Quel amphibien mexicain conserve ses branchies toute sa vie et régénère ses membres ?", a: ["Le triton", "La salamandre de feu", "Le crapaud accoucheur", "L'axolotl"], correct: 3 },
      { q: "Quelle particularité les yeux du caméléon présentent-ils ?", a: ["Ils brillent la nuit", "Ils n'ont pas de paupières", "Ils voient en noir et blanc", "Ils bougent indépendamment"], correct: 3 },
      { q: "Comment un caméléon capture-t-il ses proies à distance ?", a: ["Avec sa queue préhensile", "Avec sa longue langue", "En bondissant", "Avec un jet de venin"], correct: 1 },
      { q: "Quel est le plus grand oiseau du monde, incapable de voler ?", a: ["L'émeu", "L'autruche", "Le condor", "L'aigle royal"], correct: 1 },
      { q: "Chez le manchot empereur, qui couve l'œuf sur ses pattes en plein hiver ?", a: ["La femelle", "Les deux à tour de rôle", "Le mâle", "Un autre couple du groupe"], correct: 2 },
      { q: "Quel oiseau charognard des montagnes se nourrit surtout d'os ?", a: ["Le faucon crécerelle", "La buse", "Le gypaète barbu", "Le milan noir"], correct: 2 },
      { q: "Quel oiseau incapable de voler, de l'île Maurice, a disparu au XVIIe siècle ?", a: ["Le grand pingouin", "Le moa", "Le dodo", "Le dronte de Rodrigues"], correct: 2 },
      { q: "Quel grand mammifère laineux à défenses a disparu à la fin de la dernière glaciation ?", a: ["Le mastodonte actuel", "Le mammouth", "Le bison des steppes", "L'aurochs"], correct: 1 },
      { q: "Quel animal peut porter plusieurs fois son propre poids et vit en colonie très organisée ?", a: ["Le scarabée", "La sauterelle", "La fourmi", "Le grillon"], correct: 2 },
      { q: "Quel arbre africain au tronc massif peut stocker l'eau dans son bois ?", a: ["Le palmier dattier", "L'acacia", "Le baobab", "Le manguier"], correct: 2 },
      { q: "Quel animal marin change de sexe au cours de sa vie, comme le poisson-clown ?", a: ["Le thon", "Le mérou", "Le maquereau", "La sardine"], correct: 1 },
      { q: "Quel oiseau marin plonge et « vole » sous l'eau grâce à ses ailes, mais vole aussi dans l'air ?", a: ["Le macareux", "Le manchot", "L'autruche", "Le kiwi"], correct: 0 },
      { q: "Quel gros rongeur d'Amérique du Sud est le plus grand du monde ?", a: ["Le castor", "Le ragondin", "Le porc-épic", "Le capybara"], correct: 3 },
      { q: "Quelle plante grimpante et parasite, aux boules blanches, s'installe sur les arbres en hiver ?", a: ["Le gui", "Le lierre", "Le houx", "La ronce"], correct: 0 },
      { q: "Comment qualifie-t-on un animal dont la température corporelle dépend du milieu, comme les reptiles ?", a: ["À sang chaud", "Hibernant", "À sang froid", "Nocturne"], correct: 2 },
    ],
  },
  gastronomie: {
    expert: [
      { q: "De quel lait le roquefort est-il fabriqué ?", a: ["Du lait de vache", "Du lait de brebis", "Du lait de chèvre", "Du lait de bufflonne"], correct: 1 },
      { q: "Dans quel village de l'Aveyron le roquefort est-il affiné en caves ?", a: ["Laguiole", "Salers", "Roquefort-sur-Soulzon", "Cantal"], correct: 2 },
      { q: "De quelle région provient le comté, fromage à pâte pressée cuite ?", a: ["La Savoie", "L'Auvergne", "La Franche-Comté", "Le Pays basque"], correct: 2 },
      { q: "La mozzarella di bufala est faite du lait de quel animal ?", a: ["La vache", "La brebis", "La chèvre", "La bufflonne"], correct: 3 },
      { q: "De quelle région française le camembert est-il originaire ?", a: ["La Bretagne", "La Normandie", "La Savoie", "L'Alsace"], correct: 1 },
      { q: "Quel fromage fondu est l'ingrédient clé de la tartiflette ?", a: ["Le reblochon", "Le comté", "Le beaufort", "Le munster"], correct: 0 },
      { q: "De quel pays le fromage cheddar est-il originaire ?", a: ["L'Angleterre", "La Suisse", "Les Pays-Bas", "L'Irlande"], correct: 0 },
      { q: "Quel fromage grec traditionnel est fait de lait de brebis et conservé en saumure ?", a: ["La ricotta", "La mozzarella", "La feta", "Le halloumi"], correct: 2 },
      { q: "Grâce à quel procédé le champagne prend-il ses bulles ?", a: ["L'ajout de gaz carbonique", "Une agitation prolongée", "Une seconde fermentation en bouteille", "La congélation du moût"], correct: 2 },
      { q: "Combien de cépages principaux entrent dans la composition du champagne ?", a: ["Deux", "Cinq", "Sept", "Trois"], correct: 3 },
      { q: "À combien de bouteilles standard un magnum équivaut-il ?", a: ["Trois", "Quatre", "Deux", "Six"], correct: 2 },
      { q: "Quel vin blanc liquoreux du Bordelais doit sa douceur à la « pourriture noble » ?", a: ["Le muscadet", "Le chablis", "Le sauternes", "Le sancerre"], correct: 2 },
      { q: "Le calvados est une eau-de-vie obtenue à partir de quoi ?", a: ["De raisin", "De pomme", "De prune", "De poire"], correct: 1 },
      { q: "La tequila est distillée à partir de quelle plante ?", a: ["L'agave", "La canne à sucre", "Le maïs", "Le cactus"], correct: 0 },
      { q: "À partir de quelle céréale le saké japonais est-il produit ?", a: ["Le riz", "L'orge", "Le blé", "Le millet"], correct: 0 },
      { q: "Le kir associe un vin blanc à quelle liqueur ?", a: ["La crème de cassis", "La liqueur d'orange", "Le sirop de grenadine", "La chartreuse"], correct: 0 },
      { q: "Quel vin du Jura, élevé « sous voile », est vendu dans une bouteille appelée clavelin ?", a: ["Le vin de paille", "Le crémant du Jura", "Le macvin", "Le vin jaune"], correct: 3 },
      { q: "De quelle région provient l'eau-de-vie appelée cognac ?", a: ["Les Charentes", "La Gascogne", "La Bourgogne", "L'Alsace"], correct: 0 },
      { q: "Quel cépage domine les grands vins rouges de Bourgogne ?", a: ["Le merlot", "La syrah", "Le gamay", "Le pinot noir"], correct: 3 },
      { q: "Quand sort traditionnellement le beaujolais nouveau ?", a: ["Le troisième jeudi de novembre", "Le 1er novembre", "À la Saint-Vincent", "Le jour de l'an"], correct: 0 },
      { q: "Quel plat du Sud-Ouest associe haricots blancs, saucisse et confit de canard ?", a: ["La garbure", "Le pot-au-feu", "Le cassoulet", "La potée"], correct: 2 },
      { q: "Par quel procédé le chou de la choucroute est-il transformé ?", a: ["Le fumage", "La cuisson au vin", "Le séchage", "La lacto-fermentation"], correct: 3 },
      { q: "Quel plat auvergnat « file » grâce à la tome fraîche mêlée à la purée de pommes de terre ?", a: ["La truffade", "La tartiflette", "L'aligot", "Le gratin dauphinois"], correct: 2 },
      { q: "De quelle farine la galette bretonne salée est-elle faite ?", a: ["Le froment", "Le maïs", "Le seigle", "Le sarrasin"], correct: 3 },
      { q: "Quelle est la garniture traditionnelle de la quiche lorraine ?", a: ["Des lardons", "Du fromage râpé", "Des oignons", "Des épinards"], correct: 0 },
      { q: "La socca, spécialité niçoise, est une galette à base de quelle farine ?", a: ["La farine de blé", "La farine de pois chiche", "La farine de châtaigne", "La farine de riz"], correct: 1 },
      { q: "Quel vin accompagne et parfume le bœuf bourguignon ?", a: ["Le vin rouge", "Le vin blanc", "Le cidre", "La bière"], correct: 0 },
      { q: "Quelle spécialité provençale mijote courgettes, aubergines, poivrons et tomates ?", a: ["La bouillabaisse", "La piperade", "La ratatouille", "La brandade"], correct: 2 },
      { q: "Quelle pâtisserie en forme d'anneau, garnie de praliné, évoque une course cycliste ?", a: ["L'éclair", "Le Saint-Honoré", "Le Paris-Brest", "La religieuse"], correct: 2 },
      { q: "Quelle tarte aux pommes caramélisées se cuit à l'envers avant d'être retournée ?", a: ["La tarte Tatin", "La tarte normande", "Le clafoutis", "Le far breton"], correct: 0 },
      { q: "Quel dessert du Limousin noie des cerises dans un appareil à flan ?", a: ["Le kouign-amann", "Le baba", "La tarte Tatin", "Le clafoutis"], correct: 3 },
      { q: "Quelle petite pâtisserie en forme de coquillage est associée à Marcel Proust ?", a: ["Le financier", "La navette", "La madeleine", "Le canelé"], correct: 2 },
      { q: "Quelle crème d'amande garnit traditionnellement la galette des rois ?", a: ["La frangipane", "La chantilly", "La crème pâtissière", "La ganache"], correct: 0 },
      { q: "Quelle ville de la Drôme est célèbre pour son nougat ?", a: ["Carpentras", "Aix-en-Provence", "Cambrai", "Montélimar"], correct: 3 },
      { q: "Quelle spécialité d'Aix-en-Provence, en forme de losange, mêle amande et melon confit ?", a: ["Le berlingot", "Le calisson", "La bêtise", "La praline"], correct: 1 },
      { q: "De quelle ville bordelaise le canelé, petit gâteau au rhum, est-il originaire ?", a: ["Nantes", "Toulouse", "Bordeaux", "Lyon"], correct: 2 },
      { q: "Quelle est l'épice la plus chère du monde au poids ?", a: ["Le safran", "La vanille", "La cardamome", "Le poivre noir"], correct: 0 },
      { q: "Quel pays est le premier producteur mondial de vanille ?", a: ["Madagascar", "Le Mexique", "L'Inde", "L'Indonésie"], correct: 0 },
      { q: "De quelle région provient le piment d'Espelette AOP ?", a: ["Le Pays basque", "La Provence", "Le Roussillon", "La Corse"], correct: 0 },
      { q: "De quelle ville italienne provient le vinaigre balsamique traditionnel ?", a: ["Parme", "Vérone", "Modène", "Bologne"], correct: 2 },
      { q: "Le caviar est constitué des œufs de quel poisson ?", a: ["Le saumon", "L'esturgeon", "Le hareng", "Le cabillaud"], correct: 1 },
      { q: "Quelle truffe blanche très prisée provient de la région d'Alba, en Italie ?", a: ["La truffe blanche du Piémont", "La truffe du Périgord", "La truffe de Bourgogne", "la truffe d'été"], correct: 0 },
      { q: "Quel jambon cru italien, affiné en Émilie-Romagne, est mondialement réputé ?", a: ["Le jambon de Bayonne", "Le jambon de Parme", "Le jambon Serrano", "Le jambon de la Forêt-Noire"], correct: 1 },
      { q: "Quelle volaille de l'Ain, reconnaissable à ses pattes bleues, bénéficie d'une AOP ?", a: ["Le chapon des Landes", "Le poulet de Bresse", "La poularde du Gers", "Le coucou de Rennes"], correct: 1 },
      { q: "Quelle lentille verte AOP est cultivée en Auvergne, autour du Puy ?", a: ["La lentille corail", "La lentille blonde", "La lentille du Puy", "la lentille beluga"], correct: 2 },
      { q: "Quelle herbe aromatique est l'ingrédient principal du pesto ?", a: ["Le persil", "La coriandre", "Le basilic", "L'estragon"], correct: 2 },
      { q: "De quelle région d'Espagne la paella est-elle originaire ?", a: ["Valence", "L'Andalousie", "La Catalogne", "Le Pays basque"], correct: 0 },
      { q: "Par l'absence de quoi le sashimi se distingue-t-il du sushi ?", a: ["Le riz", "Le poisson cru", "Les algues", "Le wasabi"], correct: 0 },
      { q: "Quel plat coréen est un chou fermenté et pimenté ?", a: ["Le bibimbap", "Le bulgogi", "Le kimchi", "Le tteokbokki"], correct: 2 },
      { q: "La soupe « pho » est une spécialité emblématique de quel pays ?", a: ["Le Vietnam", "La Thaïlande", "La Chine", "Le Japon"], correct: 0 },
      { q: "Le houmous est une purée à base de quel légume sec ?", a: ["La lentille", "Le pois chiche", "Le haricot rouge", "La fève"], correct: 1 },
      { q: "Quel plat péruvien « cuit » le poisson cru dans le jus de citron vert ?", a: ["Le tartare", "Le ceviche", "Le carpaccio", "Le gravlax"], correct: 1 },
      { q: "Le guacamole est une préparation à base de quel fruit ?", a: ["La tomate", "Le poivron", "L'avocat", "La mangue"], correct: 2 },
      { q: "La pizza margherita reprend les couleurs du drapeau de quel pays ?", a: ["L'Espagne", "L'Italie", "Le Portugal", "La Grèce"], correct: 1 },
      { q: "Quel fromage crémeux italien entre dans la composition du tiramisu ?", a: ["La ricotta", "Le mascarpone", "Le gorgonzola", "La burrata"], correct: 1 },
      { q: "Quel légume donne sa couleur rouge au bortsch d'Europe de l'Est ?", a: ["La tomate", "Le poivron", "Le paprika", "La betterave"], correct: 3 },
      { q: "Quelle épice rouge caractérise le goulash hongrois ?", a: ["Le curcuma", "Le piment de Cayenne", "Le paprika", "Le safran"], correct: 2 },
      { q: "Le tofu est fabriqué à partir de quel ingrédient ?", a: ["Le soja", "Le riz", "Le blé", "Le lait"], correct: 0 },
      { q: "Quel riz italien à grain rond est utilisé pour préparer le risotto ?", a: ["Le basmati", "Le thaï", "Le riz rouge", "L'arborio"], correct: 3 },
      { q: "De quelle grande région du monde le quinoa est-il originaire ?", a: ["L'Afrique de l'Ouest", "Les Andes", "L'Asie du Sud-Est", "Le Moyen-Orient"], correct: 1 },
      { q: "À partir de quelle céréale la semoule du couscous est-elle fabriquée ?", a: ["Le riz", "Le maïs", "Le blé dur", "L'orge"], correct: 2 },
      { q: "Que signifie le nom des pâtes italiennes « farfalle » ?", a: ["Des petites oreilles", "Des plumes", "Des coquilles", "Des papillons"], correct: 3 },
      { q: "Que fait-on lorsqu'on « blanchit » un légume ?", a: ["On le fait revenir à sec", "On le passe au four", "On le plonge brièvement dans l'eau bouillante", "On le laisse mariner"], correct: 2 },
      { q: "Comment appelle-t-on une découpe en très fins bâtonnets ?", a: ["Une brunoise", "Une paysanne", "Une julienne", "Une chiffonnade"], correct: 2 },
      { q: "Que fait-on quand on « déglace » une poêle après cuisson ?", a: ["On la nettoie à l'eau froide", "On dissout les sucs avec un liquide", "On la graisse à nouveau", "On la fait chauffer à vide"], correct: 1 },
      { q: "Quel mélange de beurre et de farine sert de base à la sauce béchamel ?", a: ["Le roux", "Le beurre manié", "La liaison", "Le fond blanc"], correct: 0 },
      { q: "La mayonnaise est une émulsion d'huile dans quel ingrédient ?", a: ["Le vinaigre", "Le jaune d'œuf", "La moutarde", "Le lait"], correct: 1 },
      { q: "Que signifie cuire des pâtes « al dente » ?", a: ["Très cuites et fondantes", "À la vapeur", "Réchauffées deux fois", "Encore fermes sous la dent"], correct: 3 },
      { q: "Que contient classiquement un bouquet garni ?", a: ["Ail, oignon et clou de girofle", "Thym, laurier et persil", "Basilic, menthe et coriandre", "Romarin, sauge et estragon"], correct: 1 },
      { q: "Quelle pâte, riche en beurre et « tournée » plusieurs fois, gonfle en fines couches ?", a: ["La pâte brisée", "La pâte feuilletée", "La pâte sablée", "La pâte à choux"], correct: 1 },
      { q: "Une ganache mélange du chocolat fondu et quoi ?", a: ["De l'eau", "De l'huile", "Du lait concentré", "De la crème"], correct: 3 },
      { q: "Combien de « sauces mères » la cuisine française classique compte-t-elle ?", a: ["Cinq", "Trois", "Quatre", "Sept"], correct: 0 },
      { q: "Quelle distinction le Guide Michelin décerne-t-il aux meilleurs restaurants ?", a: ["Des toques", "Des étoiles", "Des couronnes", "Des lauriers"], correct: 1 },
      { q: "Quel chef a codifié la cuisine française et organisé la « brigade » en cuisine ?", a: ["Paul Bocuse", "Antonin Carême", "Auguste Escoffier", "Alain Ducasse"], correct: 2 },
      { q: "Quel chef lyonnais a donné son nom à un célèbre concours international de cuisine ?", a: ["Joël Robuchon", "Paul Bocuse", "Alain Ducasse", "Pierre Gagnaire"], correct: 1 },
      { q: "Comment nomme-t-on le spécialiste des vins qui conseille au restaurant ?", a: ["Le maître d'hôtel", "Le chef de rang", "Le sommelier", "Le caviste"], correct: 2 },
      { q: "Comment appelle-t-on les restaurants traditionnels de la ville de Lyon ?", a: ["Des estaminets", "Des guinguettes", "Des brasseries", "Des bouchons"], correct: 3 },
      { q: "Quelle organisation a inscrit le « repas gastronomique des Français » à son patrimoine immatériel ?", a: ["L'Union européenne", "L'OMS", "La FAO", "L'UNESCO"], correct: 3 },
      { q: "De quelle région provient le munster, fromage à croûte lavée et à l'odeur forte ?", a: ["La Normandie", "Le Jura", "La Corse", "L'Alsace"], correct: 3 },
      { q: "Quel fromage bleu italien à pâte persillée porte un nom de ville lombarde ?", a: ["Le pecorino", "Le taleggio", "le provolone", "Le gorgonzola"], correct: 3 },
      { q: "Quel poisson fumé accompagne traditionnellement les blinis russes ?", a: ["Le saumon", "La truite", "Le maquereau", "L'anchois"], correct: 0 },
      { q: "Quelle sauce chaude, à base de beurre et de jaunes d'œufs, nappe les œufs Bénédicte ?", a: ["La béchamel", "La sauce tomate", "La sauce hollandaise", "Le beurre blanc"], correct: 2 },
      { q: "Quelle spécialité alsacienne fine et croustillante est garnie de crème, oignons et lardons ?", a: ["La fougasse", "La pissaladière", "La galette", "La tarte flambée"], correct: 3 },
      { q: "Quel légume confit et fondant est la base de la « pissaladière » niçoise ?", a: ["La courgette", "L'aubergine", "Le poivron", "L'oignon"], correct: 3 },
      { q: "Quelle boisson anisée du sud de la France se sert allongée d'eau fraîche ?", a: ["Le limoncello", "Le pastis", "Le porto", "Le vermouth"], correct: 1 },
      { q: "Quel dessert breton très beurré et caramélisé a un nom signifiant « gâteau au beurre » ?", a: ["Le kouign-amann", "Le far", "Le quatre-quarts", "La galette"], correct: 0 },
      { q: "Quelle spécialité marseillaise est une soupe de poissons de roche servie avec la rouille ?", a: ["La bourride", "La brandade", "La soupe au pistou", "La bouillabaisse"], correct: 3 },
      { q: "Quel fromage suisse à gros trous est un classique de la fondue ?", a: ["Le reblochon", "Le gruyère", "Le maroilles", "Le cantal"], correct: 1 },
      { q: "Quelle pâtisserie feuilletée à trois couches alterne crème pâtissière et caramel ou glaçage ?", a: ["Le fraisier", "L'opéra", "Le fondant", "Le mille-feuille"], correct: 3 },
      { q: "De quel arbre nord-américain récolte-t-on la sève pour faire le sirop d'érable ?", a: ["Le bouleau", "Le pin", "Le chêne", "L'érable"], correct: 3 },
      { q: "Quelle plante aromatique méditerranéenne parfume la ratatouille et la pizza (feuilles séchées) ?", a: ["L'aneth", "Le cerfeuil", "La ciboulette", "L'origan"], correct: 3 },
      { q: "Quel fruit à coque, torréfié, est à la base de la pâte de praliné ?", a: ["La châtaigne", "La noisette", "La cacahuète grillée", "La noix de cajou"], correct: 1 },
      { q: "Quel condiment jaune et piquant est une spécialité de la ville de Dijon ?", a: ["Le raifort", "La moutarde", "Le curry", "Le curcuma"], correct: 1 },
      { q: "Quel plat italien de riz crémeux se prépare en ajoutant le bouillon louche par louche ?", a: ["Les gnocchis", "Le risotto", "La polenta", "Le minestrone"], correct: 1 },
      { q: "Quelle spécialité japonaise consiste en beignets légers de légumes ou de crevettes ?", a: ["Le teriyaki", "Le yakitori", "La tempura", "Le takoyaki"], correct: 2 },
      { q: "Quel pain plat et moelleux accompagne les currys et tandooris indiens ?", a: ["La pita", "Le naan", "La tortilla", "Le chapati frit"], correct: 1 },
      { q: "Quel fromage frais grec, souvent grillé sans fondre, est apprécié à la poêle ?", a: ["Le halloumi", "La feta", "Le mascarpone", "Le brie"], correct: 0 },
      { q: "Quelle est la couleur du safran une fois infusé dans un plat ?", a: ["Jaune doré", "Rouge vif", "Vert", "Brun foncé"], correct: 0 },
      { q: "Quel agrume confit parfume traditionnellement les tajines marocains ?", a: ["L'orange", "Le pamplemousse", "La bergamote", "Le citron"], correct: 3 },
      { q: "Quel dessert glacé italien, plus dense que la glace, contient moins d'air et de crème ?", a: ["Le sorbet", "Le granité", "Le semifreddo", "Le gelato"], correct: 3 },
    ],
  },
  mythologie: {
    expert: [
      { q: "Quel sanctuaire d'Apollon abritait la Pythie, l'oracle le plus célèbre de Grèce ?", a: ["Olympie", "Éleusis", "Delphes", "Épidaure"], correct: 2 },
      { q: "De quoi Aphrodite est-elle née, selon le mythe grec ?", a: ["De la cuisse de Zeus", "D'une larme d'Ouranos", "Du feu de l'Olympe", "De l'écume de la mer"], correct: 3 },
      { q: "Quelle déesse grecque est sortie tout armée du crâne de Zeus ?", a: ["Héra", "Artémis", "Déméter", "Athéna"], correct: 3 },
      { q: "Quel dieu forgeron, boiteux, façonne les armes des dieux de l'Olympe ?", a: ["Héphaïstos", "Arès", "Hermès", "Apollon"], correct: 0 },
      { q: "Quelle déesse de la chasse est la sœur jumelle d'Apollon ?", a: ["Artémis", "Athéna", "Hestia", "Perséphone"], correct: 0 },
      { q: "Quel objet à trois pointes est l'attribut de Poséidon ?", a: ["Le caducée", "Le trident", "La foudre", "Le thyrse"], correct: 1 },
      { q: "Quelle nourriture assurait l'immortalité des dieux grecs ?", a: ["Le nectar de vigne", "Le miel d'Hymette", "La grenade", "L'ambroisie"], correct: 3 },
      { q: "Sur quelle montagne résident les principaux dieux grecs ?", a: ["Le Parnasse", "L'Ida", "L'Athos", "L'Olympe"], correct: 3 },
      { q: "Quelle déesse ailée personnifie la Victoire chez les Grecs ?", a: ["Iris", "Némésis", "Tyché", "Niké"], correct: 3 },
      { q: "Quel Titan, père de Zeus, dévorait ses propres enfants ?", a: ["Ouranos", "Océan", "Cronos", "Hypérion"], correct: 2 },
      { q: "Quel Titan a dérobé le feu aux dieux pour l'offrir aux hommes ?", a: ["Atlas", "Épiméthée", "Prométhée", "Japet"], correct: 2 },
      { q: "Quel Titan est condamné à porter la voûte céleste sur ses épaules ?", a: ["Atlas", "Cronos", "Typhon", "Encelade"], correct: 0 },
      { q: "Que reste-t-il au fond de la jarre de Pandore après que tous les maux se sont échappés ?", a: ["L'espérance", "La colère", "L'oubli", "La sagesse"], correct: 0 },
      { q: "Quel héros résolut l'énigme du Sphinx de Thèbes ?", a: ["Œdipe", "Persée", "Thésée", "Bellérophon"], correct: 0 },
      { q: "Quelle est la réponse à l'énigme du Sphinx (quatre pattes le matin, deux à midi, trois le soir) ?", a: ["Le temps", "L'homme", "Le soleil", "Le lion"], correct: 1 },
      { q: "Grâce au fil de quelle princesse Thésée retrouva-t-il la sortie du Labyrinthe ?", a: ["Ariane", "Médée", "Antigone", "Phèdre"], correct: 0 },
      { q: "Pourquoi Icare tomba-t-il dans la mer ?", a: ["Une tempête brisa ses ailes", "Un aigle l'attaqua", "Il s'endormit en plein vol", "Le soleil fit fondre la cire de ses ailes"], correct: 3 },
      { q: "Quel héros décapita la Gorgone Méduse en évitant son regard ?", a: ["Héraclès", "Persée", "Achille", "Jason"], correct: 1 },
      { q: "Que provoquait le regard de la Gorgone Méduse ?", a: ["Il rendait aveugle", "Il changeait en pierre", "Il endormait", "Il brûlait vif"], correct: 1 },
      { q: "Comment se nomme le cheval ailé né du sang de Méduse ?", a: ["Chrysaor", "Arion", "Pégase", "Xanthos"], correct: 2 },
      { q: "Quel monstre aux têtes repoussant sans cesse Héraclès dut-il affronter dans un marais ?", a: ["La Chimère", "Le lion de Némée", "L'Hydre de Lerne", "Le sanglier d'Érymanthe"], correct: 2 },
      { q: "Combien de travaux Héraclès dut-il accomplir pour expier ses fautes ?", a: ["Douze", "Sept", "Dix", "Vingt"], correct: 0 },
      { q: "Combien de têtes possède Cerbère, le chien gardien des Enfers ?", a: ["Deux", "Cinq", "Sept", "Trois"], correct: 3 },
      { q: "De combien d'yeux le cyclope Polyphème est-il pourvu ?", a: ["Deux", "Un", "Trois", "Aucun"], correct: 1 },
      { q: "Qui fait traverser le fleuve des Enfers aux morts, contre une piécette ?", a: ["Cerbère", "Charon", "Hadès", "Hermès"], correct: 1 },
      { q: "Comment se nomme la partie des Enfers grecs réservée aux âmes vertueuses ?", a: ["Le Tartare", "Les Champs Élysées", "L'Érèbe", "Le Léthé"], correct: 1 },
      { q: "Quel fleuve des Enfers procure l'oubli à ceux qui en boivent ?", a: ["Le Styx", "L'Achéron", "Le Léthé", "Le Cocyte"], correct: 2 },
      { q: "Quel roi de Phrygie transformait en or tout ce qu'il touchait ?", a: ["Crésus", "Tantale", "Midas", "Priam"], correct: 2 },
      { q: "Quel personnage est condamné à rouler éternellement un rocher qui redescend ?", a: ["Tantale", "Ixion", "Prométhée", "Sisyphe"], correct: 3 },
      { q: "Combien de Muses président aux arts dans la mythologie grecque ?", a: ["Neuf", "Trois", "Sept", "Douze"], correct: 0 },
      { q: "Combien sont les Moires, ces divinités qui filent le destin des mortels ?", a: ["Trois", "Deux", "Quatre", "Neuf"], correct: 0 },
      { q: "L'enlèvement de quelle femme, la plus belle du monde, déclencha la guerre de Troie ?", a: ["Cassandre", "Andromaque", "Hélène", "Briséis"], correct: 2 },
      { q: "À quelle déesse Pâris remit-il la « pomme de discorde » destinée à la plus belle ?", a: ["Héra", "Athéna", "Aphrodite", "Artémis"], correct: 2 },
      { q: "Quelle ruse permit aux Grecs de pénétrer dans la cité de Troie ?", a: ["Un tunnel secret", "Un incendie", "Un grand cheval de bois", "Un faux traité de paix"], correct: 2 },
      { q: "Quelle partie du corps du héros Achille resta son unique point vulnérable ?", a: ["Le talon", "Le cœur", "La nuque", "Le poignet"], correct: 0 },
      { q: "Quel héros mit dix ans à rentrer chez lui à Ithaque après la guerre de Troie ?", a: ["Ulysse", "Agamemnon", "Ménélas", "Nestor"], correct: 0 },
      { q: "Comment Ulysse résista-t-il au chant mortel des Sirènes ?", a: ["En bouchant ses yeux", "En plongeant dans la mer", "Attaché au mât de son navire", "En chantant plus fort"], correct: 2 },
      { q: "Quelle épouse d'Ulysse repoussait ses prétendants en tissant le jour un ouvrage défait la nuit ?", a: ["Circé", "Calypso", "Pénélope", "Nausicaa"], correct: 2 },
      { q: "Pourquoi Orphée perdit-il définitivement Eurydice en remontant des Enfers ?", a: ["Il chanta une fausse note", "Il se retourna trop tôt pour la regarder", "Il lâcha sa main", "Il oublia son nom"], correct: 1 },
      { q: "Quel jeune homme dépérit d'amour pour son propre reflet dans l'eau ?", a: ["Narcisse", "Adonis", "Hyacinthe", "Ganymède"], correct: 0 },
      { q: "L'enlèvement de Perséphone par Hadès explique mythologiquement quel phénomène ?", a: ["Les éclipses", "Les marées", "Les tremblements de terre", "L'alternance des saisons"], correct: 3 },
      { q: "Quel est le nom romain de la déesse grecque Aphrodite ?", a: ["Junon", "Vénus", "Minerve", "Diane"], correct: 1 },
      { q: "Comment les Romains nommaient-ils le dieu grec Zeus ?", a: ["Neptune", "Pluton", "Mars", "Jupiter"], correct: 3 },
      { q: "Quel dieu romain de la guerre correspond au grec Arès ?", a: ["Mars", "Mercure", "Vulcain", "Saturne"], correct: 0 },
      { q: "Quel animal allaita Romulus et Remus selon la légende de la fondation de Rome ?", a: ["Une louve", "Une ourse", "Une chèvre", "Une biche"], correct: 0 },
      { q: "Quel dieu romain possède deux visages, l'un tourné vers le passé, l'autre vers l'avenir ?", a: ["Janus", "Saturne", "Terminus", "Quirinus"], correct: 0 },
      { q: "Quel dieu nordique a sacrifié un œil pour obtenir la connaissance ?", a: ["Thor", "Tyr", "Odin", "Heimdall"], correct: 2 },
      { q: "Comment s'appelle le marteau de Thor, qui revient toujours dans sa main ?", a: ["Mjöllnir", "Gungnir", "Gram", "Draupnir"], correct: 0 },
      { q: "Quel dieu farceur et changeant sème la discorde parmi les Ases ?", a: ["Loki", "Baldr", "Freyr", "Njörd"], correct: 0 },
      { q: "Où les guerriers valeureux sont-ils accueillis après leur mort, dans la mythologie nordique ?", a: ["Le Valhalla", "Le Niflheim", "Le Midgard", "L'Asgard"], correct: 0 },
      { q: "Quelles guerrières emmènent les héros tombés au combat vers le séjour d'Odin ?", a: ["Les Nornes", "Les Disir", "Les Ases", "Les Valkyries"], correct: 3 },
      { q: "Comment se nomme l'arbre-monde qui relie les neuf royaumes de la mythologie nordique ?", a: ["Mímir", "Yggdrasil", "Ginnungagap", "Bifröst"], correct: 1 },
      { q: "Quel nom porte la bataille apocalyptique de la fin du monde nordique ?", a: ["Le Fimbulvetr", "Le Ragnarök", "Le Niflheim", "Le Muspell"], correct: 1 },
      { q: "Combien de pattes possède Sleipnir, le cheval d'Odin ?", a: ["Quatre", "Six", "Huit", "Dix"], correct: 2 },
      { q: "Combien de corbeaux, messagers d'Odin, se posent sur ses épaules ?", a: ["Trois", "Un", "Sept", "Deux"], correct: 3 },
      { q: "Quel dieu égyptien à tête de chacal préside à la momification et à l'embaumement ?", a: ["Anubis", "Horus", "Thot", "Sobek"], correct: 0 },
      { q: "Quel dieu égyptien à tête de faucon est le fils d'Osiris et d'Isis ?", a: ["Rê", "Horus", "Seth", "Ptah"], correct: 1 },
      { q: "Quel dieu jaloux, frère d'Osiris, assassina ce dernier ?", a: ["Anubis", "Amon", "Seth", "Khnoum"], correct: 2 },
      { q: "Quelle déesse, sœur et épouse d'Osiris, le ramena à la vie ?", a: ["Hathor", "Bastet", "Nephthys", "Isis"], correct: 3 },
      { q: "Quel dieu égyptien personnifie le soleil et voyage dans une barque céleste ?", a: ["Osiris", "Geb", "Chou", "Rê"], correct: 3 },
      { q: "Lors du jugement des morts égyptien, le cœur du défunt est pesé face à quoi ?", a: ["Une pierre", "Une plume", "Un scarabée", "Un pain d'or"], correct: 1 },
      { q: "Comment se nomme l'épée légendaire du roi Arthur ?", a: ["Durandal", "Joyeuse", "Tizona", "Excalibur"], correct: 3 },
      { q: "Quel enchanteur conseille et protège le roi Arthur ?", a: ["Merlin", "Lancelot", "Perceval", "Galaad"], correct: 0 },
      { q: "Quel objet sacré les chevaliers de la Table ronde cherchent-ils sans relâche ?", a: ["La Toison d'or", "L'Arche d'alliance", "La pierre philosophale", "Le Graal"], correct: 3 },
      { q: "Sur quelle île mythique le roi Arthur est-il emmené après son ultime bataille ?", a: ["Thulé", "Avalon", "Ys", "Lyonesse"], correct: 1 },
      { q: "Dans quelle forêt anglaise vit et se cache Robin des Bois ?", a: ["Sherwood", "Broceliande", "la New Forest", "Epping"], correct: 0 },
      { q: "Quel héros suisse dut, dit-on, transpercer d'une flèche une pomme posée sur la tête de son fils ?", a: ["Arnold de Winkelried", "Roland", "Siegfried", "Guillaume Tell"], correct: 3 },
      { q: "Quelle fée légendaire se changeait en femme-serpent chaque samedi ?", a: ["Morgane", "Viviane", "Mélusine", "Titania"], correct: 2 },
      { q: "Quel saint est célèbre pour avoir terrassé un dragon selon la légende ?", a: ["Saint Michel", "Saint Martin", "Saint Christophe", "Saint Georges"], correct: 3 },
      { q: "Quel oiseau légendaire renaît de ses propres cendres ?", a: ["Le griffon", "La harpie", "Le roc", "Le phénix"], correct: 3 },
      { q: "Quelle créature possède un corps de lion, une tête et des ailes d'aigle ?", a: ["La chimère", "Le sphinx", "Le griffon", "Le basilic"], correct: 2 },
      { q: "Dans la mythologie grecque antique, les Sirènes avaient à l'origine un corps de quoi ?", a: ["De poisson", "D'oiseau", "De serpent", "De cheval"], correct: 1 },
      { q: "Quel roi héros est au cœur de la plus ancienne épopée connue, née en Mésopotamie ?", a: ["Sargon", "Gilgamesh", "Hammourabi", "Assurbanipal"], correct: 1 },
      { q: "Quel dieu hindou à tête d'éléphant est invoqué pour lever les obstacles ?", a: ["Vishnou", "Shiva", "Ganesh", "Hanuman"], correct: 2 },
      { q: "Quelle déesse du soleil est une figure centrale du shinto japonais ?", a: ["Izanami", "Susanoo", "Benzaiten", "Amaterasu"], correct: 3 },
      { q: "Quel dieu aztèque prend la forme d'un serpent à plumes ?", a: ["Quetzalcóatl", "Huitzilopochtli", "Tlaloc", "Tezcatlipoca"], correct: 0 },
      { q: "Quelle créature d'argile de la tradition juive, animée par des mots sacrés, protégerait Prague ?", a: ["Le Dibbouk", "Le Léviathan", "Le Golem", "Le Béhémoth"], correct: 2 },
      { q: "Quelle immense créature marine légendaire des mers du Nord engloutirait les navires ?", a: ["La Charybde", "Le Kraken", "Le Léviathan", "La Scylla"], correct: 1 },
      { q: "Quel monstre légendaire hanterait un grand lac d'Écosse ?", a: ["Le Yéti", "Le Bunyip", "Nessie du Loch Ness", "La Tarasque"], correct: 2 },
      { q: "Quelle cité mythique, décrite par Platon, aurait été engloutie sous les flots ?", a: ["Ys", "L'Atlantide", "Thulé", "Lemuria"], correct: 1 },
      { q: "Quelle cité légendaire couverte d'or attira les conquistadors en Amérique du Sud ?", a: ["Cibola", "L'Eldorado", "Shambhala", "Camelot"], correct: 1 },
      { q: "Quel dieu grec messager porte des sandales ailées et un caducée ?", a: ["Apollon", "Hermès", "Éros", "Iris"], correct: 1 },
      { q: "Quel dieu grec préside au vin, à la fête et à l'ivresse ?", a: ["Pan", "Dionysos", "Priape", "Silène"], correct: 1 },
      { q: "Quel dieu grec règne sur le royaume des morts ?", a: ["Thanatos", "Érèbe", "Chronos", "Hadès"], correct: 3 },
      { q: "Quel centaure réputé pour sa sagesse fut le précepteur de nombreux héros grecs ?", a: ["Nessos", "Chiron", "Pholos", "Eurytion"], correct: 1 },
      { q: "Quelle créature crachant le feu mêle lion, chèvre et serpent ?", a: ["L'Hydre", "Le Sphinx", "La Gorgone", "La Chimère"], correct: 3 },
      { q: "Quel héros grec, monté sur Pégase, terrassa la Chimère ?", a: ["Bellérophon", "Persée", "Thésée", "Jason"], correct: 0 },
      { q: "Quel roi de Crète commanda à Dédale la construction du Labyrinthe ?", a: ["Égée", "Priam", "Pélias", "Minos"], correct: 3 },
      { q: "Quelle toison, gardée par un dragon, Jason partit-il conquérir avec les Argonautes ?", a: ["Le voile d'Athéna", "La peau du lion de Némée", "La Toison d'or", "Le manteau de Nessos"], correct: 2 },
      { q: "Quelle magicienne aida Jason à s'emparer de la Toison d'or avant de le suivre ?", a: ["Circé", "Ariane", "Hécate", "Médée"], correct: 3 },
      { q: "Sur l'île de quelle magicienne les compagnons d'Ulysse furent-ils changés en pourceaux ?", a: ["Calypso", "Circé", "Médée", "Éos"], correct: 1 },
      { q: "Quel loup monstrueux, fils de Loki, doit dévorer Odin lors du Ragnarök ?", a: ["Sköll", "Garm", "Fenrir", "Managarm"], correct: 2 },
      { q: "Quel pont en arc-en-ciel relie le monde des hommes à celui des dieux nordiques ?", a: ["Le Bifröst", "Le Gjallarbrú", "Le Valgrind", "L'Yggdrasil"], correct: 0 },
      { q: "Quel dieu égyptien à tête d'ibis est le patron des scribes et du savoir ?", a: ["Anubis", "Horus", "Thot", "Bès"], correct: 2 },
      { q: "Quelle déesse égyptienne, à tête de chatte, protège le foyer ?", a: ["Bastet", "Sekhmet", "Hathor", "Nout"], correct: 0 },
      { q: "Quel héros grec fut plongé enfant dans le Styx pour le rendre invulnérable ?", a: ["Ajax", "Hector", "Achille", "Patrocle"], correct: 2 },
      { q: "Comment se nomme le sculpteur mythique dont la statue prit vie sous le nom de Galatée ?", a: ["Dédale", "Orphée", "Pygmalion", "Épiméthée"], correct: 2 },
      { q: "Quelle jeune fille, changée en araignée par Athéna, était une tisseuse hors pair ?", a: ["Niobé", "Arachné", "Io", "Daphné"], correct: 1 },
      { q: "En quoi la nymphe Daphné fut-elle métamorphosée pour échapper à Apollon ?", a: ["En source", "En biche", "En roseau", "En laurier"], correct: 3 },
      { q: "Quel fauve à la peau invulnérable Héraclès dut-il étouffer de ses seuls bras ?", a: ["Le sanglier d'Érymanthe", "Le lion de Némée", "Le taureau de Crète", "La biche de Cérynie"], correct: 1 },
    ],
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
// ---------- MANCHE OU TOURNOI ----------------------------------
function ScreenMode({ onPick, onBack }) {
  const [hoverS, setHoverS] = useState(false);
  const [hoverT, setHoverT] = useState(false);
  const card = (on) => ({
    position: 'relative', background: on ? 'linear-gradient(165deg, color-mix(in oklab, var(--card) 92%, white), var(--card))' : 'var(--card)',
    border: `2px solid ${on ? 'var(--metal)' : 'color-mix(in oklab, var(--ink) 12%, transparent)'}`,
    borderRadius: 20, padding: '38px 26px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
    boxShadow: on ? '0 18px 44px rgba(40,20,10,0.20)' : '0 6px 18px rgba(40,20,10,0.09)', transition: 'all .2s',
  });
  const kicker = { fontFamily: 'var(--font-body)', fontSize: 12, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--metal-deep)', fontWeight: 600 };
  return (
    <div className="screen" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '48px 56px' }}>
      <SetupHeader step={1} title="Manche ou tournoi ?" onBack={onBack} />
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 26, alignContent: 'center' }}>
        {/* Manche */}
        <button onClick={() => onPick('single', 1)} onMouseEnter={() => setHoverS(true)} onMouseLeave={() => setHoverS(false)}
          style={{ ...card(hoverS), cursor: 'pointer', transform: hoverS ? 'translateY(-6px)' : 'none' }}>
          <span style={{ position: 'absolute', inset: 10, borderRadius: 14, border: '1px solid color-mix(in oklab, var(--metal) 55%, transparent)', opacity: hoverS ? 0.9 : 0.45, pointerEvents: 'none', transition: 'opacity .2s' }} />
          <div style={kicker}>Rapide</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 60, lineHeight: 0.95, color: 'var(--ink)', fontWeight: 500 }}>Manche</div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'color-mix(in oklab, var(--ink) 62%, transparent)', textAlign: 'center', textWrap: 'balance' }}>Une seule partie, un gagnant. Idéal pour jouer vite.</div>
        </button>
        {/* Tournoi */}
        <div onMouseEnter={() => setHoverT(true)} onMouseLeave={() => setHoverT(false)} style={card(hoverT)}>
          <span style={{ position: 'absolute', inset: 10, borderRadius: 14, border: '1px solid color-mix(in oklab, var(--metal) 55%, transparent)', opacity: hoverT ? 0.9 : 0.45, pointerEvents: 'none', transition: 'opacity .2s' }} />
          <div style={kicker}>Soirée</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 60, lineHeight: 0.95, color: 'var(--ink)', fontWeight: 500 }}>Tournoi</div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: 'color-mix(in oklab, var(--ink) 62%, transparent)', textAlign: 'center', textWrap: 'balance', marginBottom: 2 }}>Plusieurs manches cumulées, classement et titres décernés à la fin.</div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--metal-deep)', fontWeight: 700 }}>Nombre de manches</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, width: '100%' }}>
            {[3, 4, 5].map(n => (
              <button key={n} onClick={() => onPick('tournament', n)} style={{
                cursor: 'pointer', fontFamily: 'var(--font-display)', fontSize: 30, color: 'var(--ink)',
                background: 'var(--card)', border: '1.5px solid color-mix(in oklab, var(--ink) 16%, transparent)',
                borderRadius: 12, padding: '14px 0', transition: 'all .15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--metal)'; e.currentTarget.style.background = 'color-mix(in oklab, var(--metal) 16%, var(--card))'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'color-mix(in oklab, var(--ink) 16%, transparent)'; e.currentTarget.style.background = 'var(--card)'; }}>
                {n}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ScreenCount({ onPick, onBack }) {
  const [hover, setHover] = useState(null);
  return (
    <div className="screen" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '48px 56px' }}>
      <SetupHeader step={2} title="Combien de joueurs ?" onBack={onBack} />
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
      <SetupHeader step={3} title="Vos noms et vos couleurs" onBack={onBack} />
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
      <SetupHeader step={5} title="Catégories favorites" onBack={goPrev} />

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
      <SetupHeader step={4} title="Les catégories de la partie" onBack={onBack} />

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
          Étape {step} sur 5
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, margin: '2px 0 0', color: 'var(--ink)', fontWeight: 400 }}>{title}</h2>
      </div>
      <div style={{ width: 96 }} />
    </div>
  );
}

Object.assign(window, { ScreenAccueil, ScreenMode, ScreenCount, ScreenNames, ScreenCategories, ScreenStars });

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
// ---------- RÉSULTATS : classement, réussite par catégorie, titres ------
// Titre décerné par catégorie (« Meilleur Historien », etc.) — réservé aux tournois.
const CAT_TITLE = {
  histoire: 'Historien', geo: 'Géographe', litterature: 'Littéraire', sciences: 'Scientifique',
  musique: 'Mélomane', cinema: 'Cinéphile', sport: 'Sportif', geopolitique: 'Diplomate',
  arts: 'Artiste', nature: 'Naturaliste', gastronomie: 'Gastronome', mythologie: 'Mythologue',
};
// Nombre minimal de questions dans une catégorie pour décerner un titre (évite les 1/1 trompeurs).
const MIN_TITLE_ATTEMPTS = 2;
const pctOf = (c, a) => (a ? Math.round((c / a) * 100) : 0);

// rows: [{ player, stats, score }]. Renvoie un titre par catégorie (échantillon suffisant, correct>0).
function computeTitles(rows, cats) {
  const titles = [];
  cats.forEach(c => {
    let best = null;
    rows.forEach(r => {
      const s = (r.stats || {})[c.id];
      if (!s || s.attempts < MIN_TITLE_ATTEMPTS) return;
      const ratio = s.correct / s.attempts;
      if (!best || ratio > best.ratio || (ratio === best.ratio && s.attempts > best.s.attempts)) best = { r, s, ratio };
    });
    if (best && best.s.correct > 0) titles.push({ cat: c, player: best.r.player, s: best.s });
  });
  return titles;
}

function TitlesPanel({ rows, cats }) {
  const titles = computeTitles(rows, cats);
  const label = { fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--metal-deep)', fontWeight: 700 };
  if (!titles.length) {
    return <div style={{ ...label, textAlign: 'center', marginTop: 10, opacity: 0.85 }}>Pas assez de questions par catégorie pour décerner des titres.</div>;
  }
  return (
    <div style={{ width: '100%', marginTop: 10 }}>
      <div style={{ ...label, marginBottom: 10, textAlign: 'center' }}>Les titres du tournoi</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
        {titles.map(({ cat, player, s }) => (
          <div key={cat.id} style={{
            display: 'flex', alignItems: 'center', gap: 12, background: 'var(--card)',
            border: `1.5px solid color-mix(in oklab, ${cat.color} 50%, transparent)`,
            borderRadius: 14, padding: '10px 14px',
          }}>
            <CatBadge cat={cat} size={36} />
            <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'color-mix(in oklab, var(--ink) 55%, transparent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>Meilleur {CAT_TITLE[cat.id] || cat.label}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <Avatar player={player} size={22} />
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{player.name || 'Joueur'}</span>
              </div>
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: cat.color, whiteSpace: 'nowrap' }}>{s.correct}/{s.attempts}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Grand tableau : ligne = joueur, colonne = catégorie, cellule = réussi/tenté, + colonne Total.
function CategoryTable({ rows, cats }) {
  const cell = { padding: '13px 10px', textAlign: 'center', fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--ink)' };
  const th = { padding: '8px 10px 14px', textAlign: 'center', verticalAlign: 'bottom' };
  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 640 }}>
        <thead>
          <tr style={{ borderBottom: '2px solid color-mix(in oklab, var(--metal) 60%, transparent)' }}>
            <th style={{ ...th, textAlign: 'left', minWidth: 150 }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--metal-deep)', fontWeight: 700 }}>Joueur</span>
            </th>
            {cats.map(c => (
              <th key={c.id} style={{ ...th, minWidth: 70 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                  <CatBadge cat={c} size={30} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, color: 'color-mix(in oklab, var(--ink) 72%, transparent)' }}>{c.short || c.label}</span>
                </div>
              </th>
            ))}
            <th style={{ ...th, minWidth: 92 }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--metal-deep)', fontWeight: 700 }}>Total</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => {
            const tot = cats.reduce((acc, c) => { const s = (r.stats || {})[c.id]; return s ? { c: acc.c + s.correct, a: acc.a + s.attempts } : acc; }, { c: 0, a: 0 });
            return (
              <tr key={ri} style={{ background: ri % 2 ? 'color-mix(in oklab, var(--ink) 4%, transparent)' : 'transparent' }}>
                <td style={{ ...cell, textAlign: 'left' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar player={r.player} size={32} />
                    <span style={{ fontSize: 20, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 150 }}>{r.player.name || 'Joueur'}</span>
                  </div>
                </td>
                {cats.map(c => {
                  const s = (r.stats || {})[c.id];
                  if (!s) return <td key={c.id} style={{ ...cell, color: 'color-mix(in oklab, var(--ink) 28%, transparent)' }}>—</td>;
                  const perfect = s.correct === s.attempts;
                  return <td key={c.id} style={{ ...cell, color: perfect ? c.color : 'var(--ink)', fontWeight: perfect ? 700 : 500 }}>{s.correct}/{s.attempts}</td>;
                })}
                <td style={{ ...cell, fontWeight: 700 }}>
                  {tot.c}/{tot.a}
                  <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 700, color: 'var(--metal-deep)' }}>{pctOf(tot.c, tot.a)}%</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function ScreenResults({ mode, isFinal, matchNo, matchCount, players, winner, target, reachedTarget, tour, cats, onNext, onReplay, onHome }) {
  const [view, setView] = useState('classement');
  const isTour = mode === 'tournament';
  const tourFinal = isTour && isFinal;
  const rows = tourFinal
    ? players.map((p, i) => ({ player: p, stats: (tour[i] || {}).stats || {}, score: (tour[i] || {}).score || 0, wins: (tour[i] || {}).wins || 0 }))
    : players.map(p => ({ player: p, stats: p.stats || {}, score: p.score, wins: 0 }));
  const ranked = [...rows].sort((a, b) => (b.score - a.score) || (b.wins - a.wins));
  const champ = tourFinal ? (ranked[0] ? ranked[0].player : winner) : winner;
  const heading = tourFinal ? 'Classement du tournoi'
    : isTour ? `Manche ${matchNo} sur ${matchCount}`
    : (reachedTarget ? `Objectif ${target} points atteint` : 'Plateau terminé');
  const verb = tourFinal ? 'remporte le tournoi' : isTour ? 'remporte la manche' : "l'emporte";

  const seg = (id, txt) => (
    <button onClick={() => setView(id)} style={{
      cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 700, letterSpacing: 0.5,
      padding: '9px 18px', borderRadius: 999,
      border: '1.5px solid ' + (view === id ? 'var(--metal)' : 'color-mix(in oklab, var(--ink) 14%, transparent)'),
      background: view === id ? 'color-mix(in oklab, var(--metal) 20%, var(--card))' : 'var(--card)', color: 'var(--ink)',
    }}>{txt}</button>
  );

  return (
    <div className="screen" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', height: '100%', overflowY: 'auto', padding: 40, position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 24, borderRadius: 18, border: '1.5px solid var(--metal)', opacity: 0.5, pointerEvents: 'none' }} />
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, width: view === 'categories' ? 'min(1060px, 100%)' : 680, maxWidth: '100%', transition: 'width .2s' }}>
        <div style={{ fontFamily: 'var(--font-body)', letterSpacing: 5, fontSize: 14, textTransform: 'uppercase', color: 'var(--metal-deep)', fontWeight: 700 }}>{heading}</div>
        <div style={{ width: 76, height: 76, borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'radial-gradient(circle at 38% 32%, oklch(0.88 0.10 88), var(--metal) 60%, var(--metal-deep))', border: '2px solid var(--metal-deep)', color: 'oklch(0.30 0.04 60)', fontSize: 34, boxShadow: 'inset 0 2px 6px rgba(255,255,255,0.5), inset 0 -3px 8px rgba(0,0,0,0.25), 0 8px 20px rgba(40,20,10,0.25)' }}>★</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 44, margin: 0, color: 'var(--ink)', fontWeight: 400, display: 'flex', alignItems: 'center', gap: 16, textAlign: 'center' }}>
          <Avatar player={champ} size={46} active />
          {(champ && champ.name) || 'Le gagnant'} {verb}&nbsp;!
        </h1>
        <Flourish width={280} />

        <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
          {seg('classement', 'Classement')}
          {seg('categories', 'Résultats par catégorie')}
        </div>

        {view === 'classement' ? (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10, width: 560, maxWidth: '100%' }}>
              {ranked.map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'var(--card)', borderRadius: 14, padding: '11px 18px', border: i === 0 ? '2px solid var(--metal)' : '1.5px solid color-mix(in oklab, var(--ink) 10%, transparent)' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--metal-deep)', width: 26 }}>{i + 1}</span>
                  <Avatar player={r.player} size={40} />
                  <span style={{ flex: 1, textAlign: 'left', fontFamily: 'var(--font-display)', fontSize: 23, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.player.name || 'Joueur'}</span>
                  {tourFinal && r.wins > 0 && <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700, color: 'var(--metal-deep)' }}>{r.wins} {r.wins > 1 ? 'manches' : 'manche'}</span>}
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 30, color: 'var(--ink)', minWidth: 44, textAlign: 'right' }}>{r.score}</span>
                </div>
              ))}
            </div>
            {tourFinal && <TitlesPanel rows={rows} cats={cats} />}
          </>
        ) : (
          <div style={{ marginTop: 12, width: '100%' }}>
            <CategoryTable rows={ranked} cats={cats} />
          </div>
        )}

        <div style={{ display: 'flex', gap: 14, marginTop: 20 }}>
          <Button variant="ghost" onClick={onHome}>Accueil</Button>
          {isTour && !isFinal
            ? <Button onClick={onNext}>Manche suivante</Button>
            : <Button onClick={onReplay}>{isTour ? 'Nouvelle soirée' : 'Rejouer'}</Button>}
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

Object.assign(window, { stakeFor, ScreenBoard, RevealOverlay, JokerChooser, ScreenQuestion, ScreenResults, DiscoveryOverlay, DiscoveryCountdown });

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

  const [phase, setPhase] = useState('accueil'); // accueil | mode | count | names | categories | stars | board | victory | duel
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
  const [mode, setMode] = useState('single');       // 'single' | 'tournament'
  const [matchCount, setMatchCount] = useState(3);   // nombre de manches d'un tournoi
  const [matchNo, setMatchNo] = useState(1);         // manche courante (1-based)
  const [isFinal, setIsFinal] = useState(true);      // écran de résultats = fin de tournoi ?

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
  const duelAskRef = useRef(0);        // compteur de questions de duel → force le remontage de ScreenQuestion
  const selectedCatsRef = useRef(selectedCats);
  useEffect(() => { selectedCatsRef.current = selectedCats; }, [selectedCats]);
  const modeRef = useRef('single');
  useEffect(() => { modeRef.current = mode; }, [mode]);
  const matchCountRef = useRef(3);
  useEffect(() => { matchCountRef.current = matchCount; }, [matchCount]);
  const matchNoRef = useRef(1);       // manche courante (source de vérité pour les timeouts)
  const tourRef = useRef([]);          // cumul soirée : [{ score, wins, stats:{catId:{correct,attempts}} }]
  const soireeStartedRef = useRef(false); // une soirée est-elle en cours ? (distingue 1re manche vs suivantes)
  const [duelView, setDuelView] = useState({ mode: 'intro', contenders: [], msg: '' });

  useEffect(() => { fitStage(); }, [phase]);
  useEffect(() => {
    document.getElementById('frame').setAttribute('data-theme', THEME_MAP[t.theme] || '');
  }, [t.theme]);
  useEffect(() => () => { clearTimeout(timerRef.current); clearInterval(discTimerRef.current); }, []);

  function initPlayers(n) {
    setPlayers(Array.from({ length: n }).map((_, i) => ({
      name: '', colorId: PLAYER_COLORS[i].id, color: PLAYER_COLORS[i].color,
      level: 'debutant', score: 0, star2: null, star1: null, stats: {},
    })));
  }

  // Prépare et lance UNE manche (plateau, scores et stats remis à zéro) — sans toucher au cumul du tournoi.
  function beginMatch() {
    clearTimeout(timerRef.current); clearInterval(discTimerRef.current);
    playedRef.current = {}; endgameRef.current = null;
    duelIdsRef.current = []; duelQueueRef.current = []; duelResRef.current = {};
    duelCurRef.current = null; duelPlayersRef.current = [];
    setBoard(buildBoard(selectedCats));
    setPlayed({}); setUsedMap({ ...usedRef.current });
    setDuelView({ mode: 'intro', contenders: [], msg: '' });
    setPlayers(prev => prev.map(p => ({ ...p, score: 0, stats: {} })));
    setCurrent(0); setActive(null); setWinner(null); setReachedTarget(true);
    setDiscovery(discoveryS > 0 ? 'prompt' : 'done');
    setPhase('board');
  }

  // Démarre une SOIRÉE (ou une manche simple) : remet à zéro le cumul et le compteur de manches.
  function startGame() {
    usedRef.current = loadUsed();
    tourRef.current = Array.from({ length: players.length || count }, () => ({ score: 0, wins: 0, stats: {} }));
    matchNoRef.current = 1; setMatchNo(1);
    setIsFinal(modeRef.current !== 'tournament');
    soireeStartedRef.current = true;
    beginMatch();
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
    const catId = active.cat ? active.cat.id : null;
    const updated = players.map((pl, i) => {
      if (i !== curIdx) return pl;
      let stats = pl.stats || {};
      if (catId) {
        const s = stats[catId] || { correct: 0, attempts: 0 };
        stats = { ...stats, [catId]: { correct: s.correct + (correct ? 1 : 0), attempts: s.attempts + 1 } };
      }
      return { ...pl, score: pl.score + gained, stats };
    });
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
      setReachedTarget(max >= target);
      concludeMatch(finalPlayers, top[0]);
    } else {
      startDuel(top, finalPlayers);
    }
  }

  // Clôture d'une manche : cumule les stats dans la soirée puis affiche les résultats.
  function concludeMatch(finalPlayers, winnerIdx) {
    const t = tourRef.current;
    finalPlayers.forEach((p, i) => {
      const e = t[i] || { score: 0, wins: 0, stats: {} };
      const stats = { ...e.stats };
      Object.entries(p.stats || {}).forEach(([cid, s]) => {
        const cur = stats[cid] || { correct: 0, attempts: 0 };
        stats[cid] = { correct: cur.correct + s.correct, attempts: cur.attempts + s.attempts };
      });
      t[i] = { score: e.score + p.score, wins: e.wins + (i === winnerIdx ? 1 : 0), stats };
    });
    const final = modeRef.current !== 'tournament' || matchNoRef.current >= matchCountRef.current;
    setWinner(finalPlayers[winnerIdx]);
    setIsFinal(final);
    setPhase('victory');
  }

  // Manche suivante d'un tournoi : mêmes joueurs, mais on re-choisit catégories PUIS favoris.
  function nextMatch() {
    clearTimeout(timerRef.current); clearInterval(discTimerRef.current);
    matchNoRef.current += 1; setMatchNo(matchNoRef.current);
    setActive(null); setWinner(null);
    setSelectedCats([]);            // repartir d'une sélection vierge
    setPhase('categories');
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
    duelAskRef.current += 1;
    setDuelView({ mode: 'ask', playerIdx: pid, cat, question: picked.question, ask: duelAskRef.current });
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
        setReachedTarget(true);
        concludeMatch(duelPlayersRef.current, good[0]);
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
    content = <ScreenAccueil onStart={() => { soireeStartedRef.current = false; setPhase('mode'); }} />;
  } else if (phase === 'mode') {
    content = <ScreenMode onBack={() => setPhase('accueil')} onPick={(m, n) => { setMode(m); setMatchCount(n); setPhase('count'); }} />;
  } else if (phase === 'count') {
    content = <ScreenCount onBack={() => setPhase('mode')} onPick={(n) => { setCount(n); initPlayers(n); setPhase('names'); }} />;
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
    content = <ScreenStars players={players} setPlayers={setPlayers} cats={starCats} onBack={() => setPhase('categories')} onStart={() => (soireeStartedRef.current ? beginMatch() : startGame())} />;
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
          <ScreenQuestion key={'q-' + active.key + '-' + active.qIdx} cat={active.cat} question={active.question} player={players[current]} stake={active.stake} timeLimit={questionTime} onAnswer={answerQuestion} />
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
          <ScreenQuestion key={'duel-' + duelView.ask} cat={duelView.cat} question={duelView.question} player={duelPlayersRef.current[duelView.playerIdx] || {}} stake={0} duel timeLimit={questionTime} onAnswer={answerDuel} />
        )}
      </>
    );
  } else if (phase === 'victory') {
    const catObjs = CATEGORIES.filter(c => selectedCats.includes(c.id));
    content = <ScreenResults mode={mode} isFinal={isFinal} matchNo={matchNo} matchCount={matchCount}
      players={players} winner={winner || players[0]} target={target} reachedTarget={reachedTarget}
      tour={tourRef.current} cats={catObjs}
      onNext={nextMatch} onReplay={startGame} onHome={() => setPhase('accueil')} />;
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
