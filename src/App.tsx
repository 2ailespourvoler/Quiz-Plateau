// ============================================================
// App.jsx — Le Grand Quiz (version Vite / module ES)
// Généré depuis l'export Claude Design. Les questions sont dans QUESTIONS.
// ============================================================
import React from 'react';
const { useState, useEffect, useRef, useCallback, useMemo, useLayoutEffect } = React;

// ───────────────────────── data ─────────────────────────
// ============================================================
// data.jsx — 8 catégories, banque de questions, plateau 100 cases
// ============================================================

// 8 catégories — couleurs distinctes (le vert feutrine est réservé au plateau,
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
];

const CAT_BY_ID = Object.fromEntries(CATEGORIES.map(c => [c.id, c]));

// Banque de questions — culture générale familiale (FR), 4 réponses, index correct.
// Deux niveaux par catégorie : « adulte » et « enfant ».
const QUESTIONS = {
  histoire: {
    adulte: [
      { q: "En quelle année a eu lieu la prise de la Bastille ?", a: ["1789", "1715", "1848", "1804"], correct: 0 },
      { q: "Qui fut le premier empereur des Français ?", a: ["Louis XVI", "Charlemagne", "Napoléon Bonaparte", "Henri IV"], correct: 2 },
      { q: "Quelle reine d'Égypte s'allia à Jules César ?", a: ["Théodora", "Cléopâtre", "Néfertiti", "Hatchepsout"], correct: 1 },
      { q: "Quel mur est tombé en 1989 ?", a: ["La Grande Muraille", "Le mur des Lamentations", "Le mur d'Hadrien", "Le mur de Berlin"], correct: 3 },
      { q: "En quelle année eut lieu le débarquement de Normandie ?", a: ["1958", "1918", "1940", "1944"], correct: 3 },
      { q: "La guerre de Cent Ans opposa la France à quel pays ?", a: ["L'Espagne", "L'Allemagne", "L'Angleterre", "L'Italie"], correct: 2 },
      { q: "Qui a découvert l'Amérique en 1492 ?", a: ["Marco Polo", "Christophe Colomb", "Vasco de Gama", "Magellan"], correct: 1 },
      { q: "Quelle ville fut ensevelie par le Vésuve en 79 ?", a: ["Pompéi", "Carthage", "Alexandrie", "Athènes"], correct: 0 },
      { q: "Quel roi de France fut guillotiné en 1793 ?", a: ["Louis XIII", "Louis XVI", "François Ier", "Louis XV"], correct: 1 },
      { q: "Qui a lancé l'appel du 18 juin 1940 ?", a: ["Charles de Gaulle", "Philippe Pétain", "Léon Blum", "Georges Clemenceau"], correct: 0 },
      { q: "En quelle année débuta la Première Guerre mondiale ?", a: ["1939", "1918", "1914", "1905"], correct: 2 },
      { q: "Quel peuple naviguait à bord de drakkars ?", a: ["Les Celtes", "Les Francs", "Les Saxons", "Les Vikings"], correct: 3 },
      { q: "Quelle civilisation a bâti les pyramides de Gizeh ?", a: ["Les Romains", "Les Perses", "Les Égyptiens", "Les Grecs"], correct: 2 },
      { q: "Quelle reine régna sur l'Angleterre plus de 60 ans au XIXe siècle ?", a: ["Victoria", "Marie Ire", "Anne", "Élisabeth Ire"], correct: 0 },
      { q: "Qui était le premier président de la Ve République française ?", a: ["Vincent Auriol", "René Coty", "Georges Pompidou", "Charles de Gaulle"], correct: 3 },
      { q: "En quelle année a pris fin la Seconde Guerre mondiale ?", a: ["1950", "1945", "1918", "1939"], correct: 1 },
      { q: "Quel général carthaginois traversa les Alpes avec des éléphants ?", a: ["Jules César", "Alexandre", "Scipion", "Hannibal"], correct: 3 },
      { q: "Quelle dynastie régnait en France juste avant la Révolution de 1789 ?", a: ["Les Valois", "Les Capétiens", "Les Bourbons", "Les Carolingiens"], correct: 2 },
      { q: "Quel chef gaulois affronta Jules César à Alésia ?", a: ["Brennus", "Vercingétorix", "Astérix", "Clovis"], correct: 1 },
      { q: "Quel roi des Francs fut baptisé à Reims vers l'an 496 ?", a: ["Clovis", "Charlemagne", "Dagobert", "Hugues Capet"], correct: 0 },
      { q: "Quel souverain fut sacré empereur par le pape en l'an 800 ?", a: ["Othon Ier", "Auguste", "Jules César", "Charlemagne"], correct: 3 },
      { q: "Quel conflit opposa le Nord et le Sud des États-Unis ?", a: ["La guerre de Corée", "La guerre de Sécession", "La guerre d'Indépendance", "La guerre du Vietnam"], correct: 1 },
      { q: "Qui dirigeait l'URSS pendant la Seconde Guerre mondiale ?", a: ["Gorbatchev", "Khrouchtchev", "Staline", "Lénine"], correct: 2 },
      { q: "En quelle année un homme a-t-il marché sur la Lune pour la première fois ?", a: ["1969", "1957", "1961", "1975"], correct: 0 },
      { q: "Quel pharaon a un tombeau découvert presque intact en 1922 ?", a: ["Akhenaton", "Khéops", "Ramsès II", "Toutânkhamon"], correct: 3 },
      { q: "Quelle reine fut l'épouse du roi Louis XVI ?", a: ["Catherine de Médicis", "Joséphine", "Marie-Antoinette", "Anne d'Autriche"], correct: 2 },
      { q: "Quel navigateur dirigea la première expédition à faire le tour du monde ?", a: ["Magellan", "Vasco de Gama", "Drake", "Jacques Cartier"], correct: 0 },
      { q: "Quel explorateur remonta le Saint-Laurent en 1535 ?", a: ["Jean Cabot", "Jacques Cartier", "Samuel de Champlain", "Cavelier de La Salle"], correct: 1 },
      { q: "Quel mouvement intellectuel marqua l'Europe du XVIIIe siècle ?", a: ["Les Lumières", "Le Romantisme", "Le Baroque", "La Renaissance"], correct: 0 },
      { q: "Sur quelle île l'empereur Napoléon fut-il exilé après 1815 ?", a: ["La Corse", "Elbe", "Malte", "Sainte-Hélène"], correct: 3 },
      { q: "Quelle ville italienne fut le berceau de la Renaissance ?", a: ["Rome", "Venise", "Florence", "Naples"], correct: 2 },
      { q: "Quel accord de paix signé en 1919 mit fin à la Première Guerre mondiale ?", a: ["Le traité de Maastricht", "Le traité de Versailles", "Le traité de Rome", "Le traité de Vienne"], correct: 1 },
      { q: "Quelle civilisation antique est considérée comme l'inventeuse de la démocratie ?", a: ["Les Égyptiens", "Les Perses", "Les Romains", "Les Grecs"], correct: 3 },
      { q: "Quel dictateur dirigeait l'Allemagne nazie durant la Seconde Guerre mondiale ?", a: ["Hitler", "Mussolini", "Bismarck", "Goebbels"], correct: 0 },
      { q: "Comment nomme-t-on l'affrontement indirect entre les États-Unis et l'URSS après 1945 ?", a: ["La guerre de Crimée", "La guerre de Trente Ans", "La guerre froide", "La guerre des Boers"], correct: 2 },
      { q: "Quelle bataille de 1815 scella la défaite définitive de Napoléon ?", a: ["Iéna", "Waterloo", "Marengo", "Austerlitz"], correct: 1 },
      { q: "Quel roi de France était surnommé « le Bien-Aimé » ?", a: ["Louis XIV", "Louis XIII", "Louis XV", "Henri IV"], correct: 2 },
      { q: "Quelle reine d'Écosse fut décapitée sur ordre d'Élisabeth Ire ?", a: ["Jane Grey", "Marie Stuart", "Catherine Howard", "Anne Boleyn"], correct: 1 },
      { q: "Quelle jeune Française délivra Orléans pendant la guerre de Cent Ans ?", a: ["Olympe de Gouges", "Aliénor d'Aquitaine", "Blanche de Castille", "Jeanne d'Arc"], correct: 3 },
      { q: "En quelle année le mur de Berlin a-t-il été construit ?", a: ["1961", "1972", "1945", "1953"], correct: 0 },
      { q: "Quel grand État fut gouverné par des sultans depuis Constantinople ?", a: ["L'Empire ottoman", "L'Empire perse", "L'Empire romain", "L'Empire byzantin"], correct: 0 },
      { q: "Quel président américain abolit l'esclavage durant la guerre de Sécession ?", a: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "Theodore Roosevelt"], correct: 2 },
      { q: "Quelle centrale nucléaire ukrainienne connut une catastrophe en 1986 ?", a: ["Sellafield", "Three Mile Island", "Fukushima", "Tchernobyl"], correct: 3 },
      { q: "Quel peuple d'Amérique du Sud bâtit la cité du Machu Picchu ?", a: ["Les Aztèques", "Les Incas", "Les Mayas", "Les Olmèques"], correct: 1 },
      { q: "Quel immense ouvrage défensif protégeait la Chine au nord ?", a: ["Le limes", "Le mur d'Hadrien", "La ligne Maginot", "La Grande Muraille"], correct: 3 },
      { q: "Quelle ville fut la capitale de l'Empire romain antique ?", a: ["Athènes", "Carthage", "Rome", "Constantinople"], correct: 2 },
      { q: "Quelle invention de Gutenberg révolutionna la diffusion du savoir au XVe siècle ?", a: ["Le télescope", "L'imprimerie", "La poudre", "La boussole"], correct: 1 },
      { q: "Quel ouvrage romain longeait le nord de la Bretagne pour la protéger ?", a: ["Le mur d'Hadrien", "La ligne Maginot", "La Grande Muraille", "Le mur de Berlin"], correct: 0 },
      { q: "En quelle année Constantinople tomba-t-elle aux mains des Ottomans ?", a: ["1204", "1492", "1453", "1517"], correct: 2 },
      { q: "Quel traité de 1648 mit fin à la guerre de Trente Ans ?", a: ["Le traité d'Utrecht", "Les traités de Westphalie", "Le traité de Tordesillas", "La paix d'Augsbourg"], correct: 1 },
      { q: "Quel empereur romain rendit le christianisme toléré par l'édit de Milan en 313 ?", a: ["Néron", "Auguste", "Dioclétien", "Constantin"], correct: 3 },
      { q: "Quelle bataille de 1066 permit à Guillaume le Conquérant de prendre l'Angleterre ?", a: ["Hastings", "Azincourt", "Bouvines", "Crécy"], correct: 0 },
      { q: "Quel roi de France signa l'édit de Nantes en 1598 ?", a: ["François Ier", "Henri IV", "Louis XIII", "Charles IX"], correct: 1 },
      { q: "Quel roi révoqua l'édit de Nantes en 1685 ?", a: ["Louis XIV", "Louis XIII", "Louis XV", "Henri III"], correct: 0 },
      { q: "En quelle année eut lieu la bataille de Marignan ?", a: ["1492", "1559", "1515", "1610"], correct: 2 },
      { q: "Quelle dynastie chinoise édifia l'essentiel de la Grande Muraille actuelle ?", a: ["Les Han", "Les Tang", "Les Song", "Les Ming"], correct: 3 },
      { q: "Quel chancelier réalisa l'unité allemande en 1871 ?", a: ["Metternich", "Adenauer", "Guillaume Ier", "Bismarck"], correct: 3 },
      { q: "Quel traité de 1494 partagea le Nouveau Monde entre l'Espagne et le Portugal ?", a: ["Westphalie", "Tordesillas", "Utrecht", "Cateau-Cambrésis"], correct: 1 },
      { q: "Quelle souveraine est associée à l'âge d'or anglais de la fin du XVIe siècle ?", a: ["Élisabeth Ire", "Marie Ire", "Victoria", "Anne"], correct: 0 },
      { q: "Quel cardinal fut le principal ministre de Louis XIII ?", a: ["Mazarin", "Colbert", "Richelieu", "Fouquet"], correct: 2 },
      { q: "Quel cardinal gouverna la France pendant l'enfance de Louis XIV ?", a: ["Colbert", "Mazarin", "Fénelon", "Bossuet"], correct: 1 },
      { q: "Quelle révolte agita le royaume pendant la minorité de Louis XIV ?", a: ["La Fronde", "La Jacquerie", "La Commune", "La Ligue"], correct: 0 },
      { q: "Quel empereur byzantin fit codifier le droit romain au VIe siècle ?", a: ["Constantin", "Héraclius", "Basile II", "Justinien"], correct: 3 },
      { q: "Quelle bataille navale de 1805 opposa l'amiral Nelson aux flottes franco-espagnoles ?", a: ["Aboukir", "Lépante", "Trafalgar", "Salamine"], correct: 2 },
      { q: "Quel navigateur portugais atteignit l'Inde par la mer en 1498 ?", a: ["Magellan", "Bartolomeu Dias", "Vasco de Gama", "Cabral"], correct: 2 },
      { q: "Quel pharaon fit édifier les temples d'Abou Simbel ?", a: ["Khéops", "Akhenaton", "Thoutmôsis III", "Ramsès II"], correct: 3 },
      { q: "Quelle cité grecque rivalisa avec Athènes lors de la guerre du Péloponnèse ?", a: ["Thèbes", "Sparte", "Corinthe", "Argos"], correct: 1 },
      { q: "Quel empereur français fut renversé en 1870 après la défaite de Sedan ?", a: ["Napoléon III", "Napoléon Ier", "Napoléon II", "Louis-Philippe"], correct: 0 },
      { q: "En quelle année la révolution bolchevique renversa-t-elle le pouvoir en Russie ?", a: ["1905", "1922", "1936", "1917"], correct: 3 },
      { q: "Quelle dynastie succéda aux Mérovingiens sur le trône des Francs ?", a: ["Les Capétiens", "Les Carolingiens", "Les Valois", "Les Bourbons"], correct: 1 },
      { q: "Quel roi mena la septième croisade avant d'être canonisé par l'Église ?", a: ["Philippe Auguste", "Philippe le Bel", "Louis IX", "Louis VII"], correct: 2 },
      { q: "Quelle grande épidémie ravagea l'Europe au milieu du XIVe siècle ?", a: ["La peste noire", "Le choléra", "La grippe espagnole", "La variole"], correct: 0 },
      { q: "Quelle bataille de 1916 fut l'une des plus meurtrières de la Première Guerre mondiale ?", a: ["La Marne", "Austerlitz", "Verdun", "Iéna"], correct: 2 },
      { q: "Quel leader mena l'indépendance de l'Inde par la non-violence ?", a: ["Nehru", "Gandhi", "Jinnah", "Ambedkar"], correct: 1 },
      { q: "En quelle année l'Inde obtint-elle son indépendance ?", a: ["1947", "1930", "1950", "1962"], correct: 0 },
      { q: "Quelle dynastie régna sur la France de 987 à 1328, fondée par Hugues Capet ?", a: ["Les Valois", "Les Mérovingiens", "Les Plantagenêts", "Les Capétiens directs"], correct: 3 },
      { q: "Quel souverain aztèque régnait lors de l'arrivée de Cortés ?", a: ["Atahualpa", "Moctezuma II", "Cuauhtémoc", "Pachacutec"], correct: 1 },
      { q: "Quel conquistador espagnol renversa l'Empire inca ?", a: ["Cortés", "Balboa", "Almagro", "Pizarro"], correct: 3 },
      { q: "En quelle année la royauté fut-elle abolie et la République proclamée en France ?", a: ["1789", "1791", "1792", "1799"], correct: 2 },
      { q: "Quel coup d'État porta Bonaparte au pouvoir en 1799 ?", a: ["Le 18 Brumaire", "Le 9 Thermidor", "Les Trois Glorieuses", "Le 18 Fructidor"], correct: 0 },
    ],
    enfant: [
      { q: "Quel roi de France est surnommé le Roi-Soleil ?", a: ["Henri IV", "Napoléon", "Louis XIV", "Charlemagne"], correct: 2 },
      { q: "Dans quel pays vivaient les pharaons ?", a: ["L'Égypte", "La Grèce", "La Chine", "L'Italie"], correct: 0 },
      { q: "Quel grand monument de Paris a été construit pour 1889 ?", a: ["L'Arc de Triomphe", "Le Louvre", "Notre-Dame", "La tour Eiffel"], correct: 3 },
      { q: "Où habitaient les chevaliers au Moyen Âge ?", a: ["Des igloos", "Des châteaux forts", "Des cabanes", "Des gratte-ciels"], correct: 1 },
      { q: "Comment appelle-t-on les gens qui vivaient dans des grottes il y a très longtemps ?", a: ["Les Romains", "Les Vikings", "Les pirates", "Les hommes préhistoriques"], correct: 3 },
      { q: "Qui était Napoléon Bonaparte ?", a: ["Un explorateur", "Un peintre", "Un empereur", "Un roi"], correct: 2 },
      { q: "Quelle arme un chevalier utilisait-il au combat ?", a: ["Le pistolet", "L'épée", "Le ballon", "La fourchette"], correct: 1 },
      { q: "Sur quoi voyageaient les marins explorateurs autrefois ?", a: ["Des bateaux à voiles", "Des fusées", "Des voitures", "Des avions"], correct: 0 },
      { q: "Dans quelle grande demeure dorée vivait le roi Louis XIV ?", a: ["Le château de Versailles", "La tour Eiffel", "Notre-Dame", "Le Louvre"], correct: 0 },
      { q: "Quel objet mesurait le temps autrefois grâce à du sable qui s'écoule ?", a: ["Le télescope", "La loupe", "Le sablier", "La boussole"], correct: 2 },
      { q: "Quels grands reptiles vivaient sur Terre il y a des millions d'années ?", a: ["Les dragons", "Les sirènes", "Les licornes", "Les dinosaures"], correct: 3 },
      { q: "Quel moyen de transport tiré par des chevaux utilisait-on jadis ?", a: ["La trottinette", "La calèche", "Le métro", "L'avion"], correct: 1 },
      { q: "Quel petit Gaulois de bande dessinée boit une potion magique ?", a: ["Astérix", "Tintin", "Lucky Luke", "Spirou"], correct: 0 },
      { q: "Quelle héroïne était surnommée la « Pucelle d'Orléans » ?", a: ["Marie-Antoinette", "Cléopâtre", "Jeanne d'Arc", "Blanche-Neige"], correct: 2 },
      { q: "De quelle matière étaient faites les armures des chevaliers ?", a: ["De bois", "De papier", "De plumes", "De métal"], correct: 3 },
      { q: "Comment s'appelle le grand tombeau pointu construit dans l'Égypte ancienne ?", a: ["La cathédrale", "La pyramide", "L'igloo", "La cabane"], correct: 1 },
      { q: "Que porte un roi sur la tête comme symbole de son pouvoir ?", a: ["Le bonnet", "La couronne", "La casquette", "Le chapeau de paille"], correct: 1 },
      { q: "D'où venaient les Vikings ?", a: ["Du désert", "De la jungle", "Du nord de l'Europe", "Du pôle Sud"], correct: 2 },
      { q: "Comment se déplaçait-on le plus souvent avant l'invention de la voiture ?", a: ["En avion", "En train électrique", "En fusée", "À cheval"], correct: 3 },
      { q: "Dans quoi vivaient les seigneurs au Moyen Âge, entouré de hautes murailles ?", a: ["Un château fort", "Un immeuble", "Une tente", "Une grotte"], correct: 0 },
    ],
  },
  geo: {
    adulte: [
      { q: "Quelle est la capitale de l'Australie ?", a: ["Melbourne", "Sydney", "Canberra", "Perth"], correct: 2 },
      { q: "Sur quel continent se trouve le désert du Sahara ?", a: ["Océanie", "Afrique", "Asie", "Amérique"], correct: 1 },
      { q: "Quel est le plus long fleuve d'Europe ?", a: ["Le Danube", "Le Rhin", "La Loire", "La Volga"], correct: 3 },
      { q: "Dans quel pays se trouve le Machu Picchu ?", a: ["Pérou", "Chili", "Mexique", "Bolivie"], correct: 0 },
      { q: "Quelle est la capitale du Canada ?", a: ["Toronto", "Ottawa", "Montréal", "Vancouver"], correct: 1 },
      { q: "Quel est le plus grand océan du monde ?", a: ["L'Atlantique", "L'Indien", "L'Arctique", "Le Pacifique"], correct: 3 },
      { q: "Quelle est la capitale de l'Italie ?", a: ["Naples", "Turin", "Rome", "Milan"], correct: 2 },
      { q: "Quel est le plus haut sommet du monde ?", a: ["L'Everest", "Le K2", "Le mont Blanc", "Le Kilimandjaro"], correct: 0 },
      { q: "Quel fleuve traverse Paris ?", a: ["La Loire", "La Garonne", "Le Rhône", "La Seine"], correct: 3 },
      { q: "Quelle est la capitale du Japon ?", a: ["Tokyo", "Osaka", "Kyoto", "Nagoya"], correct: 0 },
      { q: "Quel est le plus vaste désert froid du monde ?", a: ["Le Sahara", "L'Antarctique", "L'Atacama", "Le Gobi"], correct: 1 },
      { q: "Combien de continents compte la Terre ?", a: ["Cinq", "Six", "Sept", "Huit"], correct: 2 },
      { q: "Quelle mer borde la Côte d'Azur ?", a: ["La Baltique", "La mer du Nord", "La mer Noire", "La Méditerranée"], correct: 3 },
      { q: "Quel est le plus grand pays du monde par sa superficie ?", a: ["Le Brésil", "La Chine", "La Russie", "Le Canada"], correct: 2 },
      { q: "Quelle est la capitale de l'Espagne ?", a: ["Madrid", "Valence", "Barcelone", "Séville"], correct: 0 },
      { q: "Quelle est la capitale de l'Allemagne ?", a: ["Francfort", "Berlin", "Munich", "Hambourg"], correct: 1 },
      { q: "Quelle est la capitale du Royaume-Uni ?", a: ["Manchester", "Londres", "Liverpool", "Édimbourg"], correct: 1 },
      { q: "Quelle est la capitale de la Russie ?", a: ["Moscou", "Minsk", "Kiev", "Saint-Pétersbourg"], correct: 0 },
      { q: "Quelle est la capitale des États-Unis ?", a: ["New York", "Chicago", "Washington", "Los Angeles"], correct: 2 },
      { q: "Quelle est la capitale de l'Égypte ?", a: ["Louxor", "Alexandrie", "Assouan", "Le Caire"], correct: 3 },
      { q: "Quelle est la capitale de la Grèce ?", a: ["Thessalonique", "Corinthe", "Athènes", "Sparte"], correct: 2 },
      { q: "Quelle est la capitale du Portugal ?", a: ["Lisbonne", "Faro", "Porto", "Coimbra"], correct: 0 },
      { q: "Quel grand fleuve traverse l'Égypte ?", a: ["Le Gange", "Le Nil", "Le Congo", "L'Amazone"], correct: 1 },
      { q: "Quel océan borde la côte ouest de la France ?", a: ["L'océan Indien", "Le Pacifique", "L'Arctique", "L'Atlantique"], correct: 3 },
      { q: "Quelle chaîne de montagnes sépare la France de l'Espagne ?", a: ["Les Alpes", "Le Jura", "Les Vosges", "Les Pyrénées"], correct: 3 },
      { q: "Quelle longue chaîne de montagnes parcourt l'ouest de l'Amérique du Sud ?", a: ["L'Himalaya", "L'Atlas", "Les Andes", "Les Rocheuses"], correct: 2 },
      { q: "Dans quel pays se trouve la célèbre tour penchée de Pise ?", a: ["L'Italie", "L'Espagne", "Le Portugal", "La Grèce"], correct: 0 },
      { q: "Dans quel pays se dresse la statue de la Liberté ?", a: ["La France", "Les États-Unis", "Le Royaume-Uni", "Le Canada"], correct: 1 },
      { q: "Dans quel pays se trouve le Taj Mahal ?", a: ["La Chine", "Le Népal", "Le Pakistan", "L'Inde"], correct: 3 },
      { q: "Dans quel pays se trouvent les pyramides de Gizeh ?", a: ["Le Mexique", "La Grèce", "L'Égypte", "l'Irak"], correct: 2 },
      { q: "Quelle est la plus grande île du monde ?", a: ["Le Groenland", "Bornéo", "L'Islande", "Madagascar"], correct: 0 },
      { q: "Quel grand pays d'Amérique du Sud abrite la forêt amazonienne ?", a: ["L'Argentine", "Le Brésil", "Le Chili", "Le Pérou"], correct: 1 },
      { q: "Quelle voie d'eau artificielle relie la Méditerranée à la mer Rouge ?", a: ["Le canal de Suez", "Le canal de Corinthe", "Le canal de Panama", "Le canal du Midi"], correct: 0 },
      { q: "Quelle voie d'eau traverse l'Amérique centrale pour relier deux océans ?", a: ["Le canal de Corinthe", "Le canal de Suez", "Le canal de Panama", "Le canal de Kiel"], correct: 2 },
      { q: "Quelle est la capitale de la Chine ?", a: ["Shanghai", "Pékin", "Hong Kong", "Canton"], correct: 1 },
      { q: "Quelle est la capitale de l'Inde ?", a: ["Calcutta", "Bombay", "Bangalore", "New Delhi"], correct: 3 },
      { q: "Quelle est la capitale du Brésil ?", a: ["Rio de Janeiro", "Salvador", "Brasília", "São Paulo"], correct: 2 },
      { q: "Quel pays a une forme souvent comparée à un hexagone ?", a: ["L'Allemagne", "La Pologne", "L'Espagne", "La France"], correct: 3 },
      { q: "Quelle est la plus grande île de la Grèce ?", a: ["Santorin", "La Crète", "Corfou", "Rhodes"], correct: 1 },
      { q: "Dans quelle ville se trouve le Colisée ?", a: ["Rome", "Florence", "Athènes", "Naples"], correct: 0 },
      { q: "Quel volcan domine la baie de Naples ?", a: ["Le Stromboli", "Le Vésuve", "Le Fuji", "L'Etna"], correct: 1 },
      { q: "Quel est le plus vaste pays d'Afrique par sa superficie ?", a: ["L'Égypte", "l'Afrique du Sud", "Le Nigéria", "L'Algérie"], correct: 3 },
      { q: "Quelle ville est traversée par le fleuve la Tamise ?", a: ["Londres", "Vienne", "Paris", "Rome"], correct: 0 },
      { q: "Quel pays forme à lui seul un continent ?", a: ["Le Canada", "La Russie", "L'Australie", "Le Groenland"], correct: 2 },
      { q: "Quel pays nordique est réputé pour ses fjords ?", a: ["La Norvège", "La Finlande", "Le Danemark", "La Suède"], correct: 0 },
      { q: "Quelle est la plus haute montagne d'Afrique ?", a: ["L'Atlas", "Le Kilimandjaro", "Le mont Kenya", "Le Ruwenzori"], correct: 1 },
      { q: "Quel passage maritime sépare l'Espagne du Maroc ?", a: ["Le pas de Calais", "Les Dardanelles", "Le Bosphore", "Le détroit de Gibraltar"], correct: 3 },
      { q: "Quelle est la capitale de la Belgique ?", a: ["Liège", "Gand", "Bruxelles", "Anvers"], correct: 2 },
      { q: "Quelle est la capitale de la Turquie ?", a: ["Ankara", "Istanbul", "Izmir", "Bursa"], correct: 0 },
      { q: "Quelle est la capitale du Maroc ?", a: ["Casablanca", "Marrakech", "Rabat", "Fès"], correct: 2 },
      { q: "Quelle est la capitale de la Suisse ?", a: ["Genève", "Zurich", "Bâle", "Berne"], correct: 3 },
      { q: "Quelle est la capitale de la Nouvelle-Zélande ?", a: ["Auckland", "Wellington", "Christchurch", "Hamilton"], correct: 1 },
      { q: "Quelle est la capitale du Kazakhstan ?", a: ["Astana", "Almaty", "Tachkent", "Bichkek"], correct: 0 },
      { q: "Quelle ville abrite le siège du gouvernement sud-africain ?", a: ["Le Cap", "Johannesburg", "Durban", "Pretoria"], correct: 3 },
      { q: "Quel fleuve marque une partie de la frontière entre les États-Unis et le Mexique ?", a: ["Le Mississippi", "Le Colorado", "Le Rio Grande", "Le Missouri"], correct: 2 },
      { q: "Quel est le plus long fleuve d'Afrique ?", a: ["Le Congo", "Le Nil", "Le Niger", "Le Zambèze"], correct: 1 },
      { q: "Quel bras de mer sépare l'Europe de l'Asie au niveau d'Istanbul ?", a: ["Gibraltar", "Ormuz", "Le Bosphore", "Malacca"], correct: 2 },
      { q: "Quel passage stratégique, à l'entrée du golfe Persique, voit transiter le pétrole ?", a: ["Gibraltar", "Ormuz", "Bab-el-Mandeb", "Malacca"], correct: 1 },
      { q: "Quelle étendue d'eau extrêmement salée se trouve entre Israël et la Jordanie ?", a: ["La mer Rouge", "La mer Noire", "La mer Caspienne", "La mer Morte"], correct: 3 },
      { q: "Quel est le plus grand lac d'eau douce d'Afrique ?", a: ["Le lac Victoria", "Le lac Tchad", "Le lac Tanganyika", "Le lac Malawi"], correct: 0 },
      { q: "Quelle est la plus grande étendue d'eau intérieure du monde, en réalité salée ?", a: ["La mer Noire", "La mer Baltique", "La mer d'Aral", "La mer Caspienne"], correct: 3 },
      { q: "Quel pays insulaire compte le plus de volcans actifs sur la ceinture de feu ?", a: ["Le Japon", "L'Indonésie", "Le Chili", "l'Islande"], correct: 1 },
      { q: "Quel massif montagneux sépare traditionnellement l'Europe de l'Asie ?", a: ["L'Oural", "Les Carpates", "Le Caucase", "Les Balkans"], correct: 0 },
      { q: "Quel petit royaume est entièrement enclavé dans l'Afrique du Sud ?", a: ["Le Botswana", "L'Eswatini", "Le Lesotho", "Le Zimbabwe"], correct: 2 },
      { q: "Quelle est la capitale de l'Argentine ?", a: ["Córdoba", "Buenos Aires", "Rosario", "Mendoza"], correct: 1 },
      { q: "Quelle est la capitale du Mexique ?", a: ["Guadalajara", "Cancún", "Mexico", "Monterrey"], correct: 2 },
      { q: "Quelle est la capitale de la Suède ?", a: ["Oslo", "Helsinki", "Copenhague", "Stockholm"], correct: 3 },
      { q: "Quelle est la capitale de la Pologne ?", a: ["Varsovie", "Cracovie", "Gdańsk", "Wrocław"], correct: 0 },
      { q: "Quelle est la capitale de la Hongrie ?", a: ["Vienne", "Budapest", "Prague", "Bratislava"], correct: 1 },
      { q: "Quel est le pays le plus vaste d'Amérique du Sud ?", a: ["L'Argentine", "Le Pérou", "La Colombie", "Le Brésil"], correct: 3 },
      { q: "Quel archipel d'Asie du Sud-Est compte plus de dix-sept mille îles ?", a: ["L'Indonésie", "Les Philippines", "Le Japon", "La Malaisie"], correct: 0 },
      { q: "Quelle vaste région froide et venteuse occupe le sud de l'Argentine ?", a: ["Le Gobi", "L'Atacama", "La Patagonie", "Le Kalahari"], correct: 2 },
      { q: "Quel désert très aride borde la côte du Chili et du Pérou ?", a: ["L'Atacama", "Le Sahara", "Le Namib", "Le Gobi"], correct: 0 },
      { q: "Quel massif sépare la France de l'Italie au sud-est ?", a: ["Les Pyrénées", "Les Alpes", "Le Jura", "Les Vosges"], correct: 1 },
      { q: "Quelle grande ville s'étend à la fois sur l'Europe et sur l'Asie ?", a: ["Le Caire", "Moscou", "Istanbul", "Athènes"], correct: 2 },
      { q: "Quel est le plus haut sommet d'Amérique du Nord ?", a: ["Le mont Whitney", "Le mont Logan", "Le Popocatépetl", "Le Denali"], correct: 3 },
      { q: "Quel est le plus haut sommet d'Amérique du Sud, dans la cordillère des Andes ?", a: ["L'Aconcagua", "Le Chimborazo", "L'Illimani", "Le Huascarán"], correct: 0 },
      { q: "Quelle mer borde l'Allemagne et les Pays-Bas, face aux îles britanniques ?", a: ["La mer Baltique", "La Manche", "La mer du Nord", "La mer Noire"], correct: 2 },
      { q: "Quel petit pays de l'Himalaya mesure le « bonheur national brut » ?", a: ["Le Népal", "Le Bhoutan", "Le Tibet", "Le Sikkim"], correct: 1 },
      { q: "Quelle est la capitale de l'Autriche ?", a: ["Salzbourg", "Graz", "Innsbruck", "Vienne"], correct: 3 },
    ],
    enfant: [
      { q: "Quelle est la capitale de la France ?", a: ["Paris", "Nice", "Marseille", "Lyon"], correct: 0 },
      { q: "Quel animal vit sur la banquise ?", a: ["Le kangourou", "Le manchot", "Le chameau", "Le lion"], correct: 1 },
      { q: "Quelle est la plus grande étendue d'eau salée ?", a: ["La rivière", "Le lac", "L'océan", "La mare"], correct: 2 },
      { q: "Sur quel continent vivent les lions et les éléphants sauvages ?", a: ["L'Europe", "L'Australie", "L'Antarctique", "L'Afrique"], correct: 3 },
      { q: "Comment s'appelle l'étoile qui nous éclaire le jour ?", a: ["Vénus", "Le Soleil", "La Lune", "Mars"], correct: 1 },
      { q: "Quel pays a la forme d'une botte ?", a: ["Le Portugal", "L'Espagne", "La Grèce", "L'Italie"], correct: 3 },
      { q: "Dans quel pays se trouve la tour Eiffel ?", a: ["La France", "L'Italie", "L'Espagne", "L'Allemagne"], correct: 0 },
      { q: "Quel grand animal d'Afrique a une longue trompe ?", a: ["Le pingouin", "Le kangourou", "L'éléphant", "L'ours blanc"], correct: 2 },
      { q: "Quel animal du désert peut avoir une ou deux bosses ?", a: ["L'ours", "Le dauphin", "Le chameau", "Le pingouin"], correct: 2 },
      { q: "Où vivent les poissons ?", a: ["Dans les arbres", "Dans l'eau", "Dans le sable", "Sous terre"], correct: 1 },
      { q: "Comment appelle-t-on la grande forêt très connue d'Amérique du Sud ?", a: ["La banquise", "La savane", "Le Sahara", "L'Amazonie"], correct: 3 },
      { q: "Comment appelle-t-on une très grande étendue de sable très chaude ?", a: ["Le désert", "La montagne", "La forêt", "La banquise"], correct: 0 },
      { q: "Quel grand animal blanc vit au pôle Nord et chasse sur la glace ?", a: ["Le lion", "Le kangourou", "Le tigre", "L'ours polaire"], correct: 3 },
      { q: "Comment appelle-t-on une montagne qui crache du feu et de la lave ?", a: ["Une colline", "Un volcan", "Une grotte", "Une falaise"], correct: 1 },
      { q: "Comment appelle-t-on l'eau gelée et blanche qui tombe parfois en hiver ?", a: ["La neige", "La pluie", "Le sable", "Le vent"], correct: 0 },
      { q: "Quel animal géant vit dans la mer et envoie de l'eau par le haut ?", a: ["Le requin", "La pieuvre", "La baleine", "Le crabe"], correct: 2 },
      { q: "Sur quel continent vit le kangourou à l'état sauvage ?", a: ["L'Europe", "L'Australie", "L'Afrique", "L'Asie"], correct: 1 },
      { q: "Quel animal rayé noir et blanc vit dans la savane d'Afrique ?", a: ["Le panda", "Le tigre", "Le zèbre", "Le dauphin"], correct: 2 },
      { q: "Comment appelle-t-on une très grande étendue couverte d'arbres ?", a: ["Le désert", "La plage", "La ville", "La forêt"], correct: 3 },
      { q: "De quelle couleur représente-t-on en général les océans sur une carte ?", a: ["Bleu", "Rouge", "Vert", "Jaune"], correct: 0 },
    ],
  },
  litterature: {
    adulte: [
      { q: "Qui a écrit « Les Misérables » ?", a: ["Émile Zola", "Balzac", "Molière", "Victor Hugo"], correct: 3 },
      { q: "Qui a écrit « Roméo et Juliette » ?", a: ["Racine", "Shakespeare", "Molière", "Goethe"], correct: 1 },
      { q: "Quel détective a été créé par Arthur Conan Doyle ?", a: ["Maigret", "Arsène Lupin", "Sherlock Holmes", "Hercule Poirot"], correct: 2 },
      { q: "Qui a écrit « Germinal » ?", a: ["Émile Zola", "Flaubert", "Victor Hugo", "Maupassant"], correct: 0 },
      { q: "Qui est l'auteur de « Madame Bovary » ?", a: ["Balzac", "Stendhal", "Gustave Flaubert", "Zola"], correct: 2 },
      { q: "Qui a écrit « Les Fleurs du mal » ?", a: ["Apollinaire", "Rimbaud", "Verlaine", "Baudelaire"], correct: 3 },
      { q: "Qui a écrit « Le Comte de Monte-Cristo » ?", a: ["Honoré de Balzac", "Alexandre Dumas", "Stendhal", "Jules Verne"], correct: 1 },
      { q: "Qui a imaginé « Vingt mille lieues sous les mers » ?", a: ["Jules Verne", "H.G. Wells", "Daniel Defoe", "Lewis Carroll"], correct: 0 },
      { q: "Qui a écrit la pièce « Le Misanthrope » ?", a: ["Molière", "Racine", "Corneille", "Beaumarchais"], correct: 0 },
      { q: "Quel personnage de Cervantès combat des moulins à vent ?", a: ["Gargantua", "Sancho Pança", "Ulysse", "Don Quichotte"], correct: 3 },
      { q: "Qui a écrit « À la recherche du temps perdu » ?", a: ["Albert Camus", "André Gide", "Marcel Proust", "Jean-Paul Sartre"], correct: 2 },
      { q: "Quel romancier a créé le gentleman cambrioleur Arsène Lupin ?", a: ["Marcel Pagnol", "Maurice Leblanc", "Georges Simenon", "Gaston Leroux"], correct: 1 },
      { q: "Qui a écrit le roman « L'Étranger » ?", a: ["Jean-Paul Sartre", "Albert Camus", "Boris Vian", "Marcel Aymé"], correct: 1 },
      { q: "Quel poète est l'auteur du « Dormeur du val » ?", a: ["Arthur Rimbaud", "Paul Verlaine", "Alfred de Musset", "Paul Éluard"], correct: 0 },
      { q: "Qui a écrit « Notre-Dame de Paris » ?", a: ["Balzac", "Zola", "Victor Hugo", "Flaubert"], correct: 2 },
      { q: "Qui a écrit « Le Rouge et le Noir » ?", a: ["Maupassant", "Balzac", "Flaubert", "Stendhal"], correct: 3 },
      { q: "Qui a écrit « Le Père Goriot » ?", a: ["Zola", "Dumas", "Hugo", "Balzac"], correct: 3 },
      { q: "Qui a écrit la fable « Le Corbeau et le Renard » ?", a: ["Florian", "Charles Perrault", "Jean de La Fontaine", "Ésope"], correct: 2 },
      { q: "Qui a écrit « Les Trois Mousquetaires » ?", a: ["Jules Verne", "Alexandre Dumas", "Stendhal", "Victor Hugo"], correct: 1 },
      { q: "Qui a écrit « Bel-Ami » ?", a: ["Maupassant", "Flaubert", "Daudet", "Zola"], correct: 0 },
      { q: "Quel dramaturge a écrit la pièce « Le Cid » ?", a: ["Molière", "Corneille", "Racine", "Voltaire"], correct: 1 },
      { q: "Qui a écrit la tragédie « Phèdre » ?", a: ["Racine", "Beaumarchais", "Molière", "Corneille"], correct: 0 },
      { q: "Qui a écrit le conte philosophique « Candide » ?", a: ["Diderot", "Rousseau", "Montesquieu", "Voltaire"], correct: 3 },
      { q: "Qui a écrit la pièce « Cyrano de Bergerac » ?", a: ["Alfred de Musset", "Beaumarchais", "Edmond Rostand", "Victor Hugo"], correct: 2 },
      { q: "Qui a écrit « L'Île au trésor » ?", a: ["Daniel Defoe", "Jack London", "Robert Louis Stevenson", "Mark Twain"], correct: 2 },
      { q: "Qui a écrit « Robinson Crusoé » ?", a: ["Stevenson", "Jonathan Swift", "Mark Twain", "Daniel Defoe"], correct: 3 },
      { q: "Qui a écrit « Les Aventures de Tom Sawyer » ?", a: ["Mark Twain", "Steinbeck", "Hemingway", "Jack London"], correct: 0 },
      { q: "Quel poète a écrit « Demain, dès l'aube » ?", a: ["Verlaine", "Victor Hugo", "Vigny", "Lamartine"], correct: 1 },
      { q: "Quel écrivain russe a écrit « Guerre et Paix » ?", a: ["Pouchkine", "Tchekhov", "Tolstoï", "Dostoïevski"], correct: 2 },
      { q: "Quel écrivain russe a écrit « Crime et Châtiment » ?", a: ["Gogol", "Tourgueniev", "Tolstoï", "Dostoïevski"], correct: 3 },
      { q: "Qui a écrit la tragédie « Hamlet » ?", a: ["Shakespeare", "Molière", "Goethe", "Ibsen"], correct: 0 },
      { q: "Qui a écrit la pièce « Faust » ?", a: ["Kafka", "Goethe", "Thomas Mann", "Schiller"], correct: 1 },
      { q: "Qui a écrit la pièce « En attendant Godot » ?", a: ["Sartre", "Ionesco", "Samuel Beckett", "Anouilh"], correct: 2 },
      { q: "Quelle romancière anglaise a écrit « Orgueil et Préjugés » ?", a: ["Virginia Woolf", "Emily Brontë", "George Eliot", "Jane Austen"], correct: 3 },
      { q: "Quel écrivain a créé le personnage d'Oliver Twist ?", a: ["Charles Dickens", "Thomas Hardy", "Walter Scott", "H.G. Wells"], correct: 0 },
      { q: "Qui a écrit « Le Vieil Homme et la Mer » ?", a: ["Faulkner", "Hemingway", "Steinbeck", "Fitzgerald"], correct: 1 },
      { q: "Quelle romancière a créé le détective Hercule Poirot ?", a: ["P.D. James", "Ruth Rendell", "Agatha Christie", "Patricia Cornwell"], correct: 2 },
      { q: "Quel commissaire est le héros des romans de Georges Simenon ?", a: ["Maigret", "San-Antonio", "Nestor Burma", "Rouletabille"], correct: 0 },
      { q: "Qui a écrit « Voyage au centre de la Terre » ?", a: ["H.G. Wells", "Daniel Defoe", "Lewis Carroll", "Jules Verne"], correct: 3 },
      { q: "Quel auteur a écrit les contes mettant en scène « Le Petit Chose » ?", a: ["Hector Malot", "Alphonse Daudet", "Jules Renard", "Erckmann"], correct: 1 },
      { q: "Quel philosophe a écrit « Du contrat social » ?", a: ["Rousseau", "Diderot", "Voltaire", "Montesquieu"], correct: 0 },
      { q: "Quel auteur britannique a écrit « Le Seigneur des anneaux » ?", a: ["C.S. Lewis", "George R.R. Martin", "Lewis Carroll", "J.R.R. Tolkien"], correct: 3 },
      { q: "Quelle autrice a écrit la saga « Harry Potter » ?", a: ["Enid Blyton", "J.K. Rowling", "Roald Dahl", "Stephenie Meyer"], correct: 1 },
      { q: "Quel poète romantique a écrit « Le Lac » ?", a: ["Musset", "Hugo", "Lamartine", "Vigny"], correct: 2 },
      { q: "Quel écrivain de la Renaissance a créé le géant Gargantua ?", a: ["Ronsard", "Rabelais", "Montaigne", "du Bellay"], correct: 1 },
      { q: "Quel philosophe grec fut le maître de Platon ?", a: ["Épicure", "Aristote", "Pythagore", "Socrate"], correct: 3 },
      { q: "Quel poète de l'Antiquité a composé « L'Odyssée » ?", a: ["Homère", "Ovide", "Sophocle", "Virgile"], correct: 0 },
      { q: "Quel écrivain a créé le personnage de Robinson sur une île déserte ?", a: ["Jules Verne", "Jack London", "Daniel Defoe", "Stevenson"], correct: 2 },
      { q: "Quel écrivain reçut le tout premier prix Nobel de littérature, en 1901 ?", a: ["Victor Hugo", "Anatole France", "Sully Prudhomme", "Émile Zola"], correct: 2 },
      { q: "Quel romancier américain a écrit « Moby Dick » ?", a: ["Hawthorne", "Edgar Poe", "Walt Whitman", "Herman Melville"], correct: 3 },
      { q: "Quel auteur a écrit « Cent ans de solitude » ?", a: ["Gabriel García Márquez", "Borges", "Vargas Llosa", "Cortázar"], correct: 0 },
      { q: "Quel écrivain de langue allemande a écrit « La Métamorphose » ?", a: ["Kundera", "Franz Kafka", "Hašek", "Rilke"], correct: 1 },
      { q: "Quel romancier a écrit « 1984 » ?", a: ["Aldous Huxley", "Ray Bradbury", "George Orwell", "H.G. Wells"], correct: 2 },
      { q: "Quel auteur a écrit « Le Meilleur des mondes » ?", a: ["Aldous Huxley", "George Orwell", "Ray Bradbury", "Isaac Asimov"], correct: 0 },
      { q: "Quel dramaturge norvégien a écrit « Une maison de poupée » ?", a: ["Strindberg", "Tchekhov", "Brecht", "Henrik Ibsen"], correct: 3 },
      { q: "Quel poète italien a écrit « La Divine Comédie » ?", a: ["Pétrarque", "Dante", "Boccace", "Le Tasse"], correct: 1 },
      { q: "Quel auteur espagnol a écrit « Don Quichotte » ?", a: ["Cervantès", "Lope de Vega", "Calderón", "Góngora"], correct: 0 },
      { q: "Quel écrivain irlandais a écrit le roman « Ulysse » ?", a: ["Oscar Wilde", "James Joyce", "Samuel Beckett", "W.B. Yeats"], correct: 1 },
      { q: "Quel poète a publié le recueil « Alcools » ?", a: ["Verlaine", "Mallarmé", "Valéry", "Apollinaire"], correct: 3 },
      { q: "Quel poète symboliste a écrit « Sagesse » et « Les Poètes maudits » ?", a: ["Rimbaud", "Baudelaire", "Verlaine", "Mallarmé"], correct: 2 },
      { q: "Quel auteur a écrit la comédie « Le Mariage de Figaro » ?", a: ["Marivaux", "Molière", "Musset", "Beaumarchais"], correct: 3 },
      { q: "Quel romancier est l'auteur du cycle « Les Rougon-Macquart » ?", a: ["Émile Zola", "Balzac", "Maupassant", "Flaubert"], correct: 0 },
      { q: "Quel écrivain a signé « Voyage au bout de la nuit » ?", a: ["Malraux", "Louis-Ferdinand Céline", "Sartre", "Aragon"], correct: 1 },
      { q: "Quel philosophe a écrit l'essai « L'Être et le Néant » ?", a: ["Camus", "Merleau-Ponty", "Jean-Paul Sartre", "Bergson"], correct: 2 },
      { q: "Quelle autrice a écrit l'essai « Le Deuxième Sexe » ?", a: ["Marguerite Duras", "Simone de Beauvoir", "Colette", "Françoise Sagan"], correct: 1 },
      { q: "Quel roman de Marguerite Duras se déroule en Indochine ?", a: ["L'Amant", "Hiroshima mon amour", "Moderato cantabile", "Le Vice-consul"], correct: 0 },
      { q: "Quel écrivain a écrit le roman « Le Grand Meaulnes » ?", a: ["André Gide", "Jean Giono", "François Mauriac", "Alain-Fournier"], correct: 3 },
      { q: "Quel poète a écrit le poème « Le Bateau ivre » ?", a: ["Verlaine", "Baudelaire", "Rimbaud", "Hugo"], correct: 2 },
      { q: "Quel écrivain américain a écrit « Gatsby le Magnifique » ?", a: ["Francis Scott Fitzgerald", "Hemingway", "Faulkner", "Steinbeck"], correct: 0 },
      { q: "Quel romancier a écrit « Les Raisins de la colère » ?", a: ["Hemingway", "Dos Passos", "Faulkner", "John Steinbeck"], correct: 3 },
      { q: "Quel écrivain russe a écrit « Anna Karénine » ?", a: ["Dostoïevski", "Tchekhov", "Tolstoï", "Gogol"], correct: 2 },
      { q: "Quel dramaturge anglais a écrit « Macbeth » et « Othello » ?", a: ["Marlowe", "Shakespeare", "Ben Jonson", "Webster"], correct: 1 },
      { q: "Quel poète latin a écrit l'épopée « L'Énéide » ?", a: ["Ovide", "Horace", "Cicéron", "Virgile"], correct: 3 },
      { q: "Quel écrivain italien a écrit « Le Nom de la rose » ?", a: ["Italo Calvino", "Moravia", "Umberto Eco", "Buzzati"], correct: 2 },
      { q: "Quel poète a écrit « Le Cimetière marin » ?", a: ["Paul Valéry", "Mallarmé", "Claudel", "Saint-John Perse"], correct: 0 },
      { q: "Quel auteur du XXe siècle a écrit une pièce intitulée « Antigone » ?", a: ["Giraudoux", "Jean Anouilh", "Montherlant", "Cocteau"], correct: 1 },
      { q: "Quel romancier a écrit « La Peste » ?", a: ["Sartre", "Malraux", "Albert Camus", "Gide"], correct: 2 },
      { q: "Quel écrivain a écrit « La Chartreuse de Parme » ?", a: ["Balzac", "Mérimée", "Dumas", "Stendhal"], correct: 3 },
      { q: "Quel poète a écrit le recueil « Les Contemplations » ?", a: ["Victor Hugo", "Lamartine", "Vigny", "Musset"], correct: 0 },
      { q: "Quel romancier russe a écrit « Les Frères Karamazov » ?", a: ["Tolstoï", "Dostoïevski", "Gogol", "Boulgakov"], correct: 1 },
    ],
    enfant: [
      { q: "Qui a écrit l'histoire du « Petit Prince » ?", a: ["Molière", "Victor Hugo", "Zola", "Saint-Exupéry"], correct: 3 },
      { q: "Quelle fillette apporte un panier à sa grand-mère et rencontre un loup ?", a: ["Alice", "Blanche-Neige", "Le Petit Chaperon rouge", "Cendrillon"], correct: 2 },
      { q: "Combien de nains accompagnent Blanche-Neige ?", a: ["7", "5", "9", "3"], correct: 0 },
      { q: "Quel pantin a un long nez quand il ment ?", a: ["Peter Pan", "Pinocchio", "Tintin", "Aladdin"], correct: 1 },
      { q: "Qui perd une pantoufle de verre au bal ?", a: ["Alice", "Raiponce", "Cendrillon", "Mulan"], correct: 2 },
      { q: "Quel petit reporter a un chien nommé Milou ?", a: ["Spirou", "Tintin", "Astérix", "Gaston"], correct: 1 },
      { q: "Quel garçon refuse de grandir au Pays imaginaire ?", a: ["Pinocchio", "Aladdin", "Mowgli", "Peter Pan"], correct: 3 },
      { q: "Quel petit ours adore le miel avec son ami Porcinet ?", a: ["Winnie l'ourson", "Baloo", "Paddington", "Petit Ours brun"], correct: 0 },
      { q: "Dans quel conte une princesse dort cent ans après s'être piquée ?", a: ["La Belle au bois dormant", "Alice", "Cendrillon", "Raiponce"], correct: 0 },
      { q: "Quelle héroïne de conte a une très longue chevelure dans une tour ?", a: ["Boucle d'or", "Cendrillon", "Alice", "Raiponce"], correct: 3 },
      { q: "Quel héros de conte sème des cailloux pour retrouver son chemin ?", a: ["Pinocchio", "Peter Pan", "Le Petit Poucet", "Aladdin"], correct: 2 },
      { q: "Dans quel conte un loup souffle pour détruire des maisons ?", a: ["Les Trois Ours", "Les Trois Petits Cochons", "Les Trois Brigands", "Les Trois Mousquetaires"], correct: 1 },
      { q: "Quel animal portant des bottes aide son maître dans un conte de Perrault ?", a: ["Le loup", "Le renard", "Le chat botté", "L'âne"], correct: 2 },
      { q: "Quelle petite fille blonde entre dans la maison des trois ours ?", a: ["Cendrillon", "Alice", "Raiponce", "Boucle d'or"], correct: 3 },
      { q: "Quel petit garçon est élevé par des loups dans la jungle ?", a: ["Tarzan", "Mowgli", "Peter Pan", "Aladdin"], correct: 1 },
      { q: "Qui transforme une citrouille en carrosse pour Cendrillon ?", a: ["La bonne fée", "La sorcière", "Le lutin", "Le génie"], correct: 0 },
      { q: "Dans « Alice au pays des merveilles », quel animal est toujours en retard ?", a: ["Le lapin blanc", "Le chat", "La tortue", "Le hibou"], correct: 0 },
      { q: "Quel jeune héros retire une épée d'un rocher pour devenir roi ?", a: ["Robin des Bois", "Lancelot", "Le roi Arthur", "Merlin"], correct: 2 },
      { q: "Quelle créature à queue de poisson chante dans les contes de la mer ?", a: ["La fée", "La licorne", "Le dragon", "La sirène"], correct: 3 },
      { q: "Quel animal est Baloo dans « Le Livre de la jungle » ?", a: ["Un tigre", "Un ours", "Une panthère", "Un singe"], correct: 1 },
    ],
  },
  sciences: {
    adulte: [
      { q: "Quelle planète est la plus proche du Soleil ?", a: ["Mercure", "La Terre", "Mars", "Vénus"], correct: 0 },
      { q: "Combien d'os compte un corps humain adulte ?", a: ["256", "306", "156", "206"], correct: 3 },
      { q: "Quel gaz les plantes absorbent-elles le jour ?", a: ["L'hélium", "L'oxygène", "Le dioxyde de carbone", "L'azote"], correct: 2 },
      { q: "Quel métal est liquide à température ambiante ?", a: ["Le fer", "Le mercure", "Le plomb", "Le cuivre"], correct: 1 },
      { q: "Quelle est la vitesse approximative de la lumière ?", a: ["300 000 km/s", "30 km/s", "3 000 km/s", "300 km/h"], correct: 0 },
      { q: "Quel est le symbole chimique de l'or ?", a: ["Ag", "Or", "Go", "Au"], correct: 3 },
      { q: "Quel gaz est le plus présent dans l'air que nous respirons ?", a: ["L'oxygène", "L'azote", "Le dioxyde de carbone", "L'hydrogène"], correct: 1 },
      { q: "Quel organe pompe le sang dans tout le corps ?", a: ["Les poumons", "Le foie", "Le cœur", "Les reins"], correct: 2 },
      { q: "Quelle est la formule chimique de l'eau ?", a: ["H2O", "NaCl", "CO2", "O2"], correct: 0 },
      { q: "Quelle planète est surnommée la planète rouge ?", a: ["Vénus", "Mars", "Saturne", "Jupiter"], correct: 1 },
      { q: "Qui a formulé la théorie de la relativité ?", a: ["Galilée", "Niels Bohr", "Albert Einstein", "Isaac Newton"], correct: 2 },
      { q: "Quelle est la plus grande planète du système solaire ?", a: ["Saturne", "Neptune", "La Terre", "Jupiter"], correct: 3 },
      { q: "Quelle physicienne a reçu deux prix Nobel ?", a: ["Ada Lovelace", "Rosalind Franklin", "Marie Curie", "Lise Meitner"], correct: 2 },
      { q: "Quel est l'os le plus long du corps humain ?", a: ["L'humérus", "Le tibia", "La clavicule", "Le fémur"], correct: 3 },
      { q: "Quel est le symbole chimique du carbone ?", a: ["Co", "C", "Ca", "Cr"], correct: 1 },
      { q: "Combien de planètes compte le système solaire ?", a: ["8", "10", "9", "7"], correct: 0 },
      { q: "Quel astre se trouve au centre du système solaire ?", a: ["Jupiter", "La Lune", "La Terre", "Le Soleil"], correct: 3 },
      { q: "Quel savant anglais a énoncé la loi de la gravitation universelle ?", a: ["Einstein", "Kepler", "Newton", "Galilée"], correct: 2 },
      { q: "Quel gaz les humains rejettent-ils en expirant ?", a: ["Le dioxyde de carbone", "L'azote", "L'oxygène", "L'hélium"], correct: 0 },
      { q: "Quel organe nous permet de respirer ?", a: ["Les reins", "Les poumons", "Le foie", "L'estomac"], correct: 1 },
      { q: "Combien de dents possède un adulte, dents de sagesse comprises ?", a: ["36", "30", "28", "32"], correct: 3 },
      { q: "À quelle température l'eau bout-elle au niveau de la mer ?", a: ["90 °C", "100 °C", "50 °C", "120 °C"], correct: 1 },
      { q: "À quelle température l'eau gèle-t-elle ?", a: ["-10 °C", "10 °C", "0 °C", "5 °C"], correct: 2 },
      { q: "Quel est le plus grand animal du monde ?", a: ["La baleine bleue", "Le requin blanc", "La girafe", "L'éléphant"], correct: 0 },
      { q: "Quel métal sert principalement à fabriquer l'acier ?", a: ["L'aluminium", "Le cuivre", "Le zinc", "Le fer"], correct: 3 },
      { q: "Quelle planète est entourée de grands anneaux bien visibles ?", a: ["Mercure", "Mars", "Saturne", "Vénus"], correct: 2 },
      { q: "Quel savant français a mis au point le vaccin contre la rage ?", a: ["Louis Pasteur", "Robert Koch", "Edward Jenner", "Claude Bernard"], correct: 0 },
      { q: "Quel médecin a découvert la pénicilline ?", a: ["Koch", "Alexander Fleming", "Darwin", "Pasteur"], correct: 1 },
      { q: "Quelle théorie Charles Darwin a-t-il rendue célèbre ?", a: ["La génétique", "L'évolution des espèces", "La relativité", "La gravitation"], correct: 1 },
      { q: "Quel gaz indispensable à la vie respirons-nous ?", a: ["Le méthane", "L'hélium", "L'azote", "L'oxygène"], correct: 3 },
      { q: "Quel est l'organe principal du système nerveux ?", a: ["Le cerveau", "La rate", "Le foie", "Le cœur"], correct: 0 },
      { q: "Quel astre tourne autour de la Terre ?", a: ["Vénus", "Le Soleil", "La Lune", "Mars"], correct: 2 },
      { q: "Combien de temps met la Terre pour faire le tour du Soleil ?", a: ["Dix ans", "Un jour", "Un an", "Un mois"], correct: 2 },
      { q: "Quel savant affirma que la Terre tourne autour du Soleil ?", a: ["Copernic", "Newton", "Ptolémée", "Aristote"], correct: 0 },
      { q: "De quel élément les étoiles sont-elles principalement composées ?", a: ["De glace", "De gaz", "De métal", "De roche"], correct: 1 },
      { q: "Quel appareil sert à observer les astres lointains ?", a: ["Le microscope", "Le baromètre", "Le périscope", "Le télescope"], correct: 3 },
      { q: "Quel appareil permet de grossir les objets minuscules ?", a: ["Le microscope", "Le télescope", "Le sonar", "Le radar"], correct: 0 },
      { q: "Quel os protège le cerveau ?", a: ["Les côtes", "La colonne vertébrale", "Le crâne", "Le bassin"], correct: 2 },
      { q: "Combien de cavités compte le cœur humain ?", a: ["Cinq", "Deux", "Trois", "Quatre"], correct: 3 },
      { q: "Quel liquide rouge circule dans nos vaisseaux ?", a: ["La sève", "Le sang", "La lymphe", "L'eau"], correct: 1 },
      { q: "Que produisent principalement les panneaux solaires ?", a: ["De l'essence", "Du gaz", "De l'électricité", "De la chaleur seule"], correct: 2 },
      { q: "Quelle planète est la plus éloignée du Soleil ?", a: ["Saturne", "Neptune", "Uranus", "Mars"], correct: 1 },
      { q: "Quel est l'élément chimique le plus léger ?", a: ["L'hydrogène", "Le carbone", "L'hélium", "L'oxygène"], correct: 0 },
      { q: "Quel astre provoque principalement les marées sur Terre ?", a: ["Le vent", "Le Soleil seul", "Les nuages", "La Lune"], correct: 3 },
      { q: "Quel sens utilise-t-on principalement avec le nez ?", a: ["Le toucher", "L'odorat", "L'ouïe", "Le goût"], correct: 1 },
      { q: "Combien de couleurs distingue-t-on dans un arc-en-ciel ?", a: ["Six", "Cinq", "Huit", "Sept"], correct: 3 },
      { q: "Quel animal est réputé pour changer de couleur ?", a: ["Le caméléon", "Le hibou", "Le castor", "Le crapaud"], correct: 0 },
      { q: "Quel savant italien perfectionna la lunette pour observer le ciel ?", a: ["Copernic", "Newton", "Galilée", "Kepler"], correct: 2 },
      { q: "Quel est le symbole chimique du sodium ?", a: ["So", "Sd", "Na", "Nm"], correct: 2 },
      { q: "Quel est le symbole chimique du potassium ?", a: ["Po", "Pt", "Ka", "K"], correct: 3 },
      { q: "Quel est le symbole chimique du fer ?", a: ["Fr", "Fe", "Ir", "F"], correct: 1 },
      { q: "Combien de chromosomes possède l'être humain ?", a: ["46", "23", "44", "48"], correct: 0 },
      { q: "Quel gaz léger gonfle les ballons qui s'envolent ?", a: ["L'hélium", "L'hydrogène", "Le néon", "L'argon"], correct: 0 },
      { q: "Quelle unité mesure la force dans le Système international ?", a: ["Le joule", "Le watt", "Le pascal", "Le newton"], correct: 3 },
      { q: "Quelle unité mesure l'énergie dans le Système international ?", a: ["Le watt", "Le joule", "Le newton", "Le volt"], correct: 1 },
      { q: "Quelle particule de l'atome porte une charge négative ?", a: ["Le proton", "Le neutron", "L'électron", "Le photon"], correct: 2 },
      { q: "Quel savant a établi le tableau périodique des éléments ?", a: ["Mendeleïev", "Lavoisier", "Bohr", "Dalton"], correct: 0 },
      { q: "Quel chimiste français est considéré comme le père de la chimie moderne ?", a: ["Pasteur", "Lavoisier", "Berthelot", "Ampère"], correct: 1 },
      { q: "Quelle planète est la plus chaude du système solaire ?", a: ["Mercure", "Mars", "Vénus", "Jupiter"], correct: 2 },
      { q: "Combien de temps met la lumière du Soleil pour atteindre la Terre ?", a: ["Une seconde", "Une heure", "Un jour", "Huit minutes"], correct: 3 },
      { q: "Quel est le plus grand organe du corps humain ?", a: ["Le foie", "Les poumons", "La peau", "L'intestin"], correct: 2 },
      { q: "Quel groupe sanguin est qualifié de « donneur universel » ?", a: ["O négatif", "AB positif", "A positif", "B négatif"], correct: 0 },
      { q: "Quelle substance la peau fabrique-t-elle grâce au soleil ?", a: ["La vitamine A", "La vitamine C", "La vitamine K", "La vitamine D"], correct: 3 },
      { q: "Quelle force maintient les planètes en orbite autour du Soleil ?", a: ["Le magnétisme", "La gravitation", "L'électricité", "La pression"], correct: 1 },
      { q: "Quel est le métal le plus abondant dans la croûte terrestre ?", a: ["Le fer", "L'aluminium", "Le cuivre", "L'or"], correct: 1 },
      { q: "Comment nomme-t-on le passage direct de l'état solide à l'état gazeux ?", a: ["L'évaporation", "La condensation", "La sublimation", "La fusion"], correct: 2 },
      { q: "Quel gaz issu des activités humaines est le principal responsable de l'effet de serre ?", a: ["L'oxygène", "L'azote", "L'hélium", "Le dioxyde de carbone"], correct: 3 },
      { q: "Quel gaz de haute altitude nous protège des rayons ultraviolets ?", a: ["L'ozone", "L'azote", "Le méthane", "L'hélium"], correct: 0 },
      { q: "Quel physicien découvrit la radioactivité naturelle en 1896 ?", a: ["Pierre Curie", "Rutherford", "Roentgen", "Henri Becquerel"], correct: 3 },
      { q: "Quel savant allemand découvrit les rayons X ?", a: ["Becquerel", "Marie Curie", "Röntgen", "Edison"], correct: 2 },
      { q: "Quel est le plus petit os du corps humain, situé dans l'oreille ?", a: ["Le marteau", "L'étrier", "La rotule", "Le coccyx"], correct: 1 },
      { q: "Combien de paires de côtes possède un être humain ?", a: ["Douze", "Dix", "Quatorze", "Vingt-quatre"], correct: 0 },
      { q: "Quelle planète est la plus dense du système solaire ?", a: ["Mercure", "La Terre", "Jupiter", "Saturne"], correct: 1 },
      { q: "Quel phénomène se produit quand la Lune passe devant le Soleil ?", a: ["Une éclipse solaire", "Une éclipse lunaire", "Une aurore", "Une comète"], correct: 0 },
      { q: "Quel physicien proposa un modèle de l'atome doté d'un noyau central ?", a: ["Thomson", "Bohr", "Dalton", "Rutherford"], correct: 3 },
      { q: "Quelle est la formule chimique du dioxyde de carbone ?", a: ["CO", "O2", "CO2", "C2O"], correct: 2 },
      { q: "Quel organite produit l'essentiel de l'énergie dans la cellule ?", a: ["Le noyau", "Le ribosome", "La membrane", "La mitochondrie"], correct: 3 },
      { q: "Quels chercheurs décrivirent la structure en double hélice de l'ADN ?", a: ["Watson et Crick", "Mendel et Morgan", "Pasteur et Koch", "Banting et Best"], correct: 0 },
      { q: "Quelle est l'étoile la plus proche de la Terre après le Soleil ?", a: ["Sirius", "Bételgeuse", "Proxima du Centaure", "L'étoile Polaire"], correct: 2 },
      { q: "Quelle grandeur physique mesure-t-on en degrés Celsius ?", a: ["La masse", "La température", "La vitesse", "La pression"], correct: 1 },
    ],
    enfant: [
      { q: "Combien de pattes a une araignée ?", a: ["8", "6", "10", "4"], correct: 0 },
      { q: "Sur quelle planète vivons-nous ?", a: ["La Lune", "Mars", "Jupiter", "La Terre"], correct: 3 },
      { q: "De quelle couleur est le ciel par beau temps ?", a: ["Jaune", "Bleu", "Rouge", "Vert"], correct: 1 },
      { q: "Que faut-il donner à une plante pour qu'elle pousse ?", a: ["Du papier", "Du sel", "De l'eau", "Du sable"], correct: 2 },
      { q: "Quel animal pond des œufs et fait « cocorico » ?", a: ["Le canard", "Le cheval", "Le coq", "Le chat"], correct: 2 },
      { q: "Combien de doigts as-tu sur une main ?", a: ["3", "5", "6", "4"], correct: 1 },
      { q: "Quel astre éclaire le ciel pendant la nuit ?", a: ["Le Soleil", "Une comète", "Un nuage", "La Lune"], correct: 3 },
      { q: "Que devient l'eau quand il fait très froid ?", a: ["De la glace", "De la vapeur", "De la fumée", "Du sable"], correct: 0 },
      { q: "Combien de pattes a un chat ?", a: ["Quatre", "Huit", "Deux", "Six"], correct: 0 },
      { q: "Que mange une vache ?", a: ["Des insectes", "De l'herbe", "De la viande", "Du poisson"], correct: 1 },
      { q: "Quel animal fait « coin coin » ?", a: ["La vache", "Le chat", "Le canard", "Le chien"], correct: 2 },
      { q: "Quelle partie de la plante pousse sous la terre ?", a: ["Les fleurs", "Les feuilles", "Les fruits", "Les racines"], correct: 3 },
      { q: "Combien de pattes a un insecte comme la fourmi ?", a: ["Six", "Quatre", "Huit", "Dix"], correct: 0 },
      { q: "Quel insecte transforme le nectar des fleurs en miel ?", a: ["La mouche", "Le moustique", "L'abeille", "La coccinelle"], correct: 2 },
      { q: "De quelle couleur sont les feuilles des arbres en été ?", a: ["Bleues", "Rouges", "Noires", "Vertes"], correct: 3 },
      { q: "Que devient l'eau quand on la fait bouillir très fort ?", a: ["De la glace", "De la vapeur", "Du sable", "Du bois"], correct: 1 },
      { q: "Quel organe utilise-t-on pour voir ?", a: ["Les yeux", "Les oreilles", "Le nez", "Les mains"], correct: 0 },
      { q: "Quel petit animal porte sa maison sur son dos ?", a: ["Le lapin", "L'escargot", "La souris", "Le chat"], correct: 1 },
      { q: "Comment appelle-t-on un bébé grenouille ?", a: ["Un poussin", "Un veau", "Un têtard", "Un chaton"], correct: 2 },
      { q: "Que voit-on briller par milliers dans le ciel pendant la nuit ?", a: ["Le Soleil", "Les nuages", "La pluie", "Les étoiles"], correct: 3 },
    ],
  },
  musique: {
    adulte: [
      { q: "Quel instrument possède 88 touches ?", a: ["Le clavecin", "L'orgue", "Le piano", "L'accordéon"], correct: 2 },
      { q: "Qui a composé l'« Hymne à la joie » (9e symphonie) ?", a: ["Mozart", "Bach", "Vivaldi", "Beethoven"], correct: 3 },
      { q: "Qui a composé le « Boléro » ?", a: ["Saint-Saëns", "Maurice Ravel", "Berlioz", "Debussy"], correct: 1 },
      { q: "Combien de notes compte la gamme de musique ?", a: ["7", "6", "5", "8"], correct: 0 },
      { q: "Quel groupe a chanté « Hey Jude » ?", a: ["Les Beatles", "ABBA", "Queen", "Les Rolling Stones"], correct: 0 },
      { q: "Quel instrument joue-t-on avec un archet ?", a: ["La trompette", "La flûte", "Le piano", "Le violon"], correct: 3 },
      { q: "Qui a composé « La Flûte enchantée » ?", a: ["Bach", "Mozart", "Haydn", "Schubert"], correct: 1 },
      { q: "Quel instrument à vent possède une anche simple ?", a: ["La harpe", "Le cor", "La clarinette", "La trompette"], correct: 2 },
      { q: "Quelle chanteuse française était surnommée « la Môme » ?", a: ["Dalida", "Barbara", "Édith Piaf", "Mireille Mathieu"], correct: 2 },
      { q: "Quel groupe britannique a chanté « Bohemian Rhapsody » ?", a: ["The Who", "Queen", "Led Zeppelin", "Pink Floyd"], correct: 1 },
      { q: "Quel est le plus grave des instruments à cordes de l'orchestre ?", a: ["L'alto", "Le violon", "La harpe", "La contrebasse"], correct: 3 },
      { q: "De quel pays l'opéra est-il originaire ?", a: ["L'Italie", "La France", "La Russie", "L'Allemagne"], correct: 0 },
      { q: "Quel chanteur américain est surnommé « le King » ?", a: ["Chuck Berry", "Elvis Presley", "Buddy Holly", "Ray Charles"], correct: 1 },
      { q: "Quel grand instrument à clavier trouve-t-on dans les églises ?", a: ["L'accordéon", "Le clavecin", "L'orgue", "Le piano"], correct: 2 },
      { q: "Qui a composé « Les Quatre Saisons » ?", a: ["Vivaldi", "Bach", "Corelli", "Haendel"], correct: 0 },
      { q: "Qui a composé la bagatelle « Pour Élise » ?", a: ["Schubert", "Chopin", "Mozart", "Beethoven"], correct: 3 },
      { q: "Qui a composé le ballet « Casse-Noisette » ?", a: ["Stravinsky", "Borodine", "Prokofiev", "Tchaïkovski"], correct: 3 },
      { q: "Qui a composé l'opéra « Carmen » ?", a: ["Gounod", "Bizet", "Offenbach", "Massenet"], correct: 1 },
      { q: "Quel compositeur baroque est l'auteur de nombreuses fugues pour orgue ?", a: ["Mozart", "Verdi", "Bach", "Chopin"], correct: 2 },
      { q: "Combien de cordes possède un violon ?", a: ["Quatre", "Trois", "Cinq", "Six"], correct: 0 },
      { q: "Quel grand instrument à cordes pincées se joue posé au sol ?", a: ["La harpe", "Le luth", "Le banjo", "La mandoline"], correct: 0 },
      { q: "Quel instrument à vent en cuivre possède une coulisse ?", a: ["Le cor", "Le trombone", "La trompette", "Le tuba"], correct: 1 },
      { q: "Quel instrument à clavier produit le son par des cordes frappées ?", a: ["L'accordéon", "Le clavecin", "L'orgue", "Le piano"], correct: 3 },
      { q: "Quel groupe a enregistré l'album « Abbey Road » ?", a: ["The Who", "Queen", "Les Beatles", "Les Rolling Stones"], correct: 2 },
      { q: "Quel membre des Beatles est l'auteur de la chanson « Imagine » ?", a: ["Paul McCartney", "John Lennon", "George Harrison", "Ringo Starr"], correct: 1 },
      { q: "Quelle chanteuse américaine est surnommée « la reine de la pop » ?", a: ["Madonna", "Whitney Houston", "Tina Turner", "Cher"], correct: 0 },
      { q: "Quel artiste américain a chanté « Thriller » ?", a: ["James Brown", "Stevie Wonder", "Michael Jackson", "Prince"], correct: 2 },
      { q: "Quel chanteur belge a interprété « Ne me quitte pas » ?", a: ["Léo Ferré", "Yves Montand", "Georges Brassens", "Jacques Brel"], correct: 3 },
      { q: "Quel chanteur français est l'auteur de « La Bohème » ?", a: ["Sacha Distel", "Gilbert Bécaud", "Charles Aznavour", "Jacques Brel"], correct: 2 },
      { q: "Quel auteur-compositeur a chanté « Les Copains d'abord » ?", a: ["Georges Brassens", "Trenet", "Léo Ferré", "Brel"], correct: 0 },
      { q: "Quelle note de musique vient juste après « do » ?", a: ["Si", "Mi", "La", "Ré"], correct: 3 },
      { q: "Combien de lignes compte une portée musicale ?", a: ["Sept", "Cinq", "Six", "Quatre"], correct: 1 },
      { q: "Comment appelle-t-on une œuvre pour orchestre en plusieurs mouvements ?", a: ["Une sonate", "Une symphonie", "Une valse", "Une fugue"], correct: 1 },
      { q: "Quel signe indique d'élever une note d'un demi-ton ?", a: ["Le bémol", "Le bécarre", "La clé", "Le dièse"], correct: 3 },
      { q: "Quelle clé musicale est employée pour les sons aigus ?", a: ["La clé de sol", "La clé de fa", "La clé plate", "La clé anglaise"], correct: 0 },
      { q: "Quel style musical est né à La Nouvelle-Orléans ?", a: ["Le reggae", "La salsa", "Le jazz", "Le rock"], correct: 2 },
      { q: "De quel pays le reggae est-il originaire ?", a: ["Cuba", "La Jamaïque", "Le Brésil", "Le Mexique"], correct: 1 },
      { q: "De quel pays le flamenco est-il originaire ?", a: ["L'Espagne", "Le Portugal", "La Grèce", "L'Italie"], correct: 0 },
      { q: "De quel pays le tango est-il originaire ?", a: ["Cuba", "Le Brésil", "Le Mexique", "L'Argentine"], correct: 3 },
      { q: "Quel instrument à cordes est associé à la musique country américaine ?", a: ["Le bouzouki", "La cornemuse", "Le banjo", "Le sitar"], correct: 2 },
      { q: "Quel instrument à vent écossais comporte un sac d'air ?", a: ["La cornemuse", "La flûte", "La clarinette", "Le hautbois"], correct: 0 },
      { q: "Quel compositeur prodige composa enfant et mourut jeune au XVIIIe siècle ?", a: ["Haydn", "Schubert", "Salieri", "Mozart"], correct: 3 },
      { q: "Quel groupe suédois a chanté « Dancing Queen » ?", a: ["Ace of Base", "ABBA", "Roxette", "A-ha"], correct: 1 },
      { q: "Quel instrument possède un clavier et un soufflet que l'on étire ?", a: ["L'orgue", "Le piano", "L'accordéon", "Le clavecin"], correct: 2 },
      { q: "Quel instrument donne le « la » à l'orchestre pour s'accorder ?", a: ["Le violon", "La flûte", "Le hautbois", "La trompette"], correct: 2 },
      { q: "Quelle voix d'homme est la plus aiguë ?", a: ["La basse", "Le baryton", "La basse profonde", "Le ténor"], correct: 3 },
      { q: "Quelle voix de femme est la plus aiguë ?", a: ["La mezzo", "La soprano", "L'alto", "Le contralto"], correct: 1 },
      { q: "Quel mot désigne la vitesse d'exécution d'un morceau ?", a: ["Le tempo", "Le silence", "Le timbre", "Le ton"], correct: 0 },
      { q: "Qui a composé l'opéra « La Traviata » ?", a: ["Puccini", "Rossini", "Verdi", "Donizetti"], correct: 2 },
      { q: "Qui a composé l'opéra « La Bohème » ?", a: ["Verdi", "Puccini", "Bizet", "Mascagni"], correct: 1 },
      { q: "Qui a composé l'opéra « Le Barbier de Séville » ?", a: ["Verdi", "Bellini", "Donizetti", "Rossini"], correct: 3 },
      { q: "Quel compositeur allemand a écrit le cycle « L'Anneau du Nibelung » ?", a: ["Wagner", "Brahms", "Richard Strauss", "Mahler"], correct: 0 },
      { q: "Quel compositeur polonais est célèbre pour ses nocturnes pour piano ?", a: ["Liszt", "Chopin", "Schumann", "Debussy"], correct: 1 },
      { q: "Quel compositeur français a écrit « Clair de lune » et « La Mer » ?", a: ["Ravel", "Fauré", "Debussy", "Saint-Saëns"], correct: 2 },
      { q: "Quel compositeur russe a écrit « Le Sacre du printemps » ?", a: ["Prokofiev", "Chostakovitch", "Rachmaninov", "Stravinsky"], correct: 3 },
      { q: "Quel compositeur autrichien est surnommé « le père de la symphonie » ?", a: ["Haydn", "Mozart", "Schubert", "Bruckner"], correct: 0 },
      { q: "Quel compositeur baroque a écrit l'oratorio « Le Messie » et son « Alléluia » ?", a: ["Haendel", "Bach", "Telemann", "Purcell"], correct: 0 },
      { q: "Combien de symphonies Beethoven a-t-il achevées ?", a: ["Cinq", "Neuf", "Sept", "Douze"], correct: 1 },
      { q: "Quel terme italien indique de jouer lentement ?", a: ["Allegro", "Presto", "Adagio", "Vivace"], correct: 2 },
      { q: "Quel terme italien indique un mouvement rapide et vif ?", a: ["Largo", "Andante", "Lento", "Allegro"], correct: 3 },
      { q: "Comment nomme-t-on l'intervalle de huit degrés entre deux « do » ?", a: ["La quinte", "La tierce", "L'octave", "La sixte"], correct: 2 },
      { q: "Combien de touches noires compte une octave au piano ?", a: ["Trois", "Cinq", "Sept", "Huit"], correct: 1 },
      { q: "Quelle famille réunit le hautbois, la clarinette et le basson ?", a: ["Les bois", "Les cuivres", "Les cordes", "Les percussions"], correct: 0 },
      { q: "Quel instrument à clavier, à cordes pincées, est l'ancêtre du piano ?", a: ["L'orgue", "Le célesta", "Le carillon", "Le clavecin"], correct: 3 },
      { q: "Quelle voix de femme se situe entre les plus aiguës et les plus graves ?", a: ["L'alto", "Le ténor", "La mezzo-soprano", "La basse"], correct: 2 },
      { q: "Comment appelle-t-on un passage joué par un seul instrumentiste ?", a: ["Un duo", "Un solo", "Un tutti", "Un chœur"], correct: 1 },
      { q: "Quel instrument est le plus grave de la famille des cuivres ?", a: ["Le cor", "Le trombone", "La trompette", "Le tuba"], correct: 3 },
      { q: "Quel compositeur a écrit la célèbre « Marche turque » ?", a: ["Mozart", "Beethoven", "Haydn", "Liszt"], correct: 0 },
      { q: "Quel ballet de Tchaïkovski met en scène une princesse changée en cygne ?", a: ["Casse-Noisette", "Giselle", "Coppélia", "Le Lac des cygnes"], correct: 3 },
      { q: "Quel ténor italien fut l'un des « Trois Ténors » avec Domingo et Carreras ?", a: ["Caruso", "Pavarotti", "Bocelli", "Gigli"], correct: 1 },
      { q: "Quel groupe a publié l'album « The Dark Side of the Moon » ?", a: ["Led Zeppelin", "The Who", "Pink Floyd", "Genesis"], correct: 2 },
      { q: "Quel groupe de hard rock australien a chanté « Highway to Hell » ?", a: ["AC/DC", "Metallica", "Iron Maiden", "Kiss"], correct: 0 },
      { q: "Quel chanteur britannique, alias « Ziggy Stardust », a chanté « Heroes » ?", a: ["Elton John", "David Bowie", "Freddie Mercury", "Rod Stewart"], correct: 1 },
      { q: "Quel guitariste légendaire marqua le festival de Woodstock en 1969 ?", a: ["Eric Clapton", "Jimmy Page", "Jimi Hendrix", "Carlos Santana"], correct: 2 },
      { q: "Quel compositeur a écrit la cantate scénique « Carmina Burana » ?", a: ["Carl Orff", "Gustav Holst", "Benjamin Britten", "Stravinsky"], correct: 0 },
      { q: "Quel signe musical abaisse une note d'un demi-ton ?", a: ["Le dièse", "Le bécarre", "Le soupir", "Le bémol"], correct: 3 },
      { q: "Comment nomme-t-on un silence équivalent à une noire ?", a: ["Une pause", "Un demi-soupir", "Un soupir", "Une demi-pause"], correct: 2 },
      { q: "Quel instrument indien à cordes est associé à Ravi Shankar ?", a: ["La cithare", "Le sitar", "Le oud", "La balalaïka"], correct: 1 },
      { q: "Quel compositeur tchèque a écrit la « Symphonie du Nouveau Monde » ?", a: ["Smetana", "Sibelius", "Grieg", "Dvořák"], correct: 3 },
      { q: "Comment nomme-t-on une œuvre vocale religieuse avec chœur, comme chez Bach ?", a: ["Une cantate", "Une sonate", "Une fugue", "Une toccata"], correct: 0 },
    ],
    enfant: [
      { q: "Quel instrument a des touches noires et blanches ?", a: ["Le tambour", "Le piano", "La guitare", "La flûte"], correct: 1 },
      { q: "Avec quoi joue-t-on du tambour ?", a: ["Un archet", "Un clavier", "Des baguettes", "Une corde"], correct: 2 },
      { q: "Dans la chanson, « Frère Jacques », que fais-tu ?", a: ["Tu dors", "Tu sautes", "Tu manges", "Tu cours"], correct: 0 },
      { q: "Quel instrument souffle-t-on pour jouer ?", a: ["Le piano", "Le violon", "Le triangle", "La trompette"], correct: 3 },
      { q: "Comment appelle-t-on une personne qui chante ?", a: ["Un acteur", "Un danseur", "Un chanteur", "Un peintre"], correct: 2 },
      { q: "Combien de cordes a une guitare ?", a: ["3", "6", "1", "10"], correct: 1 },
      { q: "Quel objet rond tourne sur une platine pour jouer de la musique ?", a: ["Un disque", "Un livre", "Une assiette", "Une roue"], correct: 0 },
      { q: "Comment appelle-t-on celui qui dirige les musiciens, baguette en main ?", a: ["Le boulanger", "Le jardinier", "Le facteur", "Le chef d'orchestre"], correct: 3 },
      { q: "Quel petit instrument secoue-t-on pour faire du bruit ?", a: ["La harpe", "Le piano", "Les maracas", "Le violon"], correct: 2 },
      { q: "Que fait-on avec ses mains pour féliciter un artiste ?", a: ["On souffle", "On applaudit", "On dort", "On siffle"], correct: 1 },
      { q: "Quelle comptine parle d'une petite bête qui grimpe le long d'une gouttière ?", a: ["Au clair de la lune", "Une souris verte", "Frère Jacques", "L'araignée Gipsy"], correct: 3 },
      { q: "Avec quel petit objet le chef donne-t-il le rythme aux musiciens ?", a: ["Une baguette", "Un marteau", "Un crayon", "Une cuillère"], correct: 0 },
      { q: "Quel animal fait « miaou » ?", a: ["Le chien", "La vache", "Le chat", "Le coq"], correct: 2 },
      { q: "Quel instrument tient-on entre le menton et l'épaule pour en jouer ?", a: ["Le violon", "La trompette", "Le tambour", "La flûte"], correct: 0 },
      { q: "Avec quelle partie du corps souffle-t-on dans une flûte ?", a: ["Les pieds", "Les genoux", "Les coudes", "La bouche"], correct: 3 },
      { q: "Quel grand instrument à cordes pincées avec les doigts a une forme triangulaire ?", a: ["Le tambour", "La harpe", "La trompette", "Le triangle"], correct: 1 },
      { q: "Comment appelle-t-on un groupe de personnes qui chantent ensemble ?", a: ["Une chorale", "Une équipe", "Une classe", "Une foule"], correct: 0 },
      { q: "Quel petit instrument métallique fait « ting » quand on le frappe ?", a: ["Le piano", "La guitare", "Le triangle", "Le violon"], correct: 2 },
      { q: "Dans « Au clair de la lune », à qui demande-t-on une plume ?", a: ["Au facteur", "Au roi", "À la maîtresse", "À Pierrot"], correct: 3 },
      { q: "Quel objet pose-t-on sur ses oreilles pour écouter de la musique ?", a: ["Un chapeau", "Un casque", "Une casserole", "Un livre"], correct: 1 },
    ],
  },
  cinema: {
    adulte: [
      { q: "Qui a réalisé le film « Titanic » ?", a: ["Steven Spielberg", "Ridley Scott", "George Lucas", "James Cameron"], correct: 3 },
      { q: "Quel acteur incarne « Forrest Gump » ?", a: ["Robert De Niro", "Tom Hanks", "Brad Pitt", "Tom Cruise"], correct: 1 },
      { q: "Quel studio a créé « Toy Story » ?", a: ["Pixar", "DreamWorks", "Disney", "Illumination"], correct: 0 },
      { q: "Quelle saga se déroule « dans une galaxie lointaine » ?", a: ["Avatar", "Dune", "Star Wars", "Star Trek"], correct: 2 },
      { q: "Quel héros porte un chapeau et un fouet pour chasser les trésors ?", a: ["Lara Croft", "James Bond", "Zorro", "Indiana Jones"], correct: 3 },
      { q: "Quelle grande récompense du cinéma américain est remise chaque année ?", a: ["Le Lion d'or", "L'Oscar", "La Palme d'or", "Le César"], correct: 1 },
      { q: "Qui a réalisé « E.T. l'extra-terrestre » ?", a: ["Steven Spielberg", "Ridley Scott", "James Cameron", "George Lucas"], correct: 0 },
      { q: "Dans quelle ville a lieu le plus célèbre festival du film français ?", a: ["Deauville", "Annecy", "Cannes", "Avignon"], correct: 2 },
      { q: "Quel acteur incarne le boxeur « Rocky » ?", a: ["Bruce Willis", "Sylvester Stallone", "Kurt Russell", "Mel Gibson"], correct: 1 },
      { q: "Quel film d'animation Pixar suit un cuisinier dans un restaurant parisien ?", a: ["Vice-versa", "Coco", "Ratatouille", "Là-haut"], correct: 2 },
      { q: "Quel réalisateur est célèbre pour ses films à suspense comme « Psychose » ?", a: ["Orson Welles", "Tim Burton", "Stanley Kubrick", "Alfred Hitchcock"], correct: 3 },
      { q: "Quel acteur fut le tout premier à jouer James Bond au cinéma ?", a: ["Sean Connery", "Daniel Craig", "Pierce Brosnan", "Roger Moore"], correct: 0 },
      { q: "Quelle trilogie de Peter Jackson se déroule en Terre du Milieu ?", a: ["Le Seigneur des anneaux", "Le Hobbit", "Narnia", "Harry Potter"], correct: 0 },
      { q: "Quel célèbre film met en scène des dinosaures vivants sur une île ?", a: ["Avatar", "Godzilla", "Jurassic Park", "King Kong"], correct: 2 },
      { q: "Qui a réalisé « La Liste de Schindler » ?", a: ["Coppola", "Steven Spielberg", "Kubrick", "Scorsese"], correct: 1 },
      { q: "Qui a réalisé la trilogie « Le Parrain » ?", a: ["De Palma", "Spielberg", "Scorsese", "Francis Ford Coppola"], correct: 3 },
      { q: "Quel acteur incarne le capitaine Jack Sparrow dans « Pirates des Caraïbes » ?", a: ["Tom Cruise", "Brad Pitt", "Johnny Depp", "Orlando Bloom"], correct: 2 },
      { q: "Quel film d'animation Disney met en scène le lionceau Mufasa et son fils ?", a: ["Le Livre de la jungle", "Bambi", "Tarzan", "Le Roi lion"], correct: 3 },
      { q: "Quel acteur fétiche de Scorsese joue dans « Les Affranchis » ?", a: ["Joe Pesci", "Robert De Niro", "Ray Liotta", "Al Pacino"], correct: 1 },
      { q: "De quel pays est issu le cinéma surnommé « Bollywood » ?", a: ["L'Inde", "La Chine", "Le Pakistan", "Le Nigéria"], correct: 0 },
      { q: "Quelle cérémonie récompense le cinéma français chaque année ?", a: ["Les BAFTA", "Les Golden Globes", "Les César", "Les Oscars"], correct: 2 },
      { q: "Quelle récompense suprême est remise au Festival de Cannes ?", a: ["Le Goya", "Le Lion d'or", "L'Ours d'or", "La Palme d'or"], correct: 3 },
      { q: "Quelle actrice française a reçu un Oscar pour le rôle d'Édith Piaf ?", a: ["Juliette Binoche", "Marion Cotillard", "Catherine Deneuve", "Audrey Tautou"], correct: 1 },
      { q: "Quel film de Jean-Pierre Jeunet suit une jeune serveuse rêveuse à Montmartre ?", a: ["Amélie Poulain", "La Haine", "Le Dîner de cons", "Intouchables"], correct: 0 },
      { q: "Quel film raconte l'amitié entre un riche tétraplégique et son aide à domicile ?", a: ["La Grande Vadrouille", "Le Dîner de cons", "Les Ch'tis", "Intouchables"], correct: 3 },
      { q: "Quel comédien français joue dans « La Grande Vadrouille » avec Bourvil ?", a: ["Jean Gabin", "Louis de Funès", "Fernandel", "Coluche"], correct: 1 },
      { q: "Quel humoriste français a fondé les Restos du Cœur ?", a: ["Coluche", "Pierre Richard", "Michel Blanc", "Thierry Lhermitte"], correct: 0 },
      { q: "Quel réalisateur a tourné « Pulp Fiction » et « Kill Bill » ?", a: ["David Fincher", "Guy Ritchie", "Quentin Tarantino", "Robert Rodriguez"], correct: 2 },
      { q: "Quel film de 1999 met en scène Neo découvrant un monde virtuel ?", a: ["Tron", "Matrix", "Inception", "Blade Runner"], correct: 1 },
      { q: "Quel super-héros Marvel est interprété par Robert Downey Jr. ?", a: ["Thor", "Captain America", "Hulk", "Iron Man"], correct: 3 },
      { q: "Quel petit maître Jedi à la peau verte parle de façon inversée ?", a: ["Yoda", "Han Solo", "Dark Vador", "Chewbacca"], correct: 0 },
      { q: "Quel acteur a incarné Indiana Jones au cinéma ?", a: ["Kevin Costner", "Mel Gibson", "Harrison Ford", "Tom Hanks"], correct: 2 },
      { q: "Quelle maison d'animation japonaise a réalisé « Le Voyage de Chihiro » ?", a: ["DreamWorks", "Pixar", "Le Studio Ghibli", "Disney"], correct: 2 },
      { q: "Quel film de 1994 tiré de Stephen King raconte l'amitié de deux détenus ?", a: ["Les Évadés", "Le Fugitif", "Seven", "Forrest Gump"], correct: 0 },
      { q: "Quel acteur autrichien a incarné « Terminator » ?", a: ["Dolph Lundgren", "Arnold Schwarzenegger", "Sylvester Stallone", "Van Damme"], correct: 1 },
      { q: "Quel film de 2009 se déroule sur la planète Pandora avec les Na'vi ?", a: ["Prometheus", "Dune", "Interstellar", "Avatar"], correct: 3 },
      { q: "Quelle souris est le personnage emblématique créé par Walt Disney ?", a: ["Jerry", "Speedy Gonzales", "Mickey Mouse", "Bugs Bunny"], correct: 2 },
      { q: "Quel canard colérique fait partie des héros de Walt Disney ?", a: ["Mickey", "Picsou", "Riri", "Donald"], correct: 3 },
      { q: "Quel film de 1995 fut le premier long métrage entièrement en images de synthèse ?", a: ["Shrek", "Toy Story", "Bambi", "Le Roi lion"], correct: 1 },
      { q: "Quel film de Spielberg met en scène un requin tueur ?", a: ["Les Dents de la mer", "Anaconda", "Orca", "Piranhas"], correct: 0 },
      { q: "Quelle célèbre franchise d'espionnage a pour héros l'agent 007 ?", a: ["OSS 117", "James Bond", "Mission impossible", "Jason Bourne"], correct: 1 },
      { q: "Quel comédien muet portait un chapeau melon et une petite canne ?", a: ["Max Linder", "Buster Keaton", "Harold Lloyd", "Charlie Chaplin"], correct: 3 },
      { q: "Comment appelle-t-on un genre de cinéma destiné à faire peur ?", a: ["Le film d'horreur", "La comédie", "Le documentaire", "Le péplum"], correct: 0 },
      { q: "Comment appelle-t-on la personne qui dirige le tournage d'un film ?", a: ["Le producteur", "Le cadreur", "Le réalisateur", "Le scénariste"], correct: 2 },
      { q: "Comment appelle-t-on l'histoire écrite d'un film avant le tournage ?", a: ["Le générique", "Le scénario", "L'affiche", "Le casting"], correct: 1 },
      { q: "Comment appelle-t-on la courte vidéo qui présente un film à venir ?", a: ["L'affiche", "Le carton", "La bande-annonce", "Le générique"], correct: 2 },
      { q: "Dans quel pays se trouve le quartier de Hollywood ?", a: ["Les États-Unis", "Le Royaume-Uni", "Le Canada", "L'Australie"], correct: 0 },
      { q: "Quel film d'animation Disney raconte l'amour d'une jeune fille et d'un monstre ensorcelé ?", a: ["Mulan", "Cendrillon", "Aladdin", "La Belle et la Bête"], correct: 3 },
      { q: "Qui a réalisé « Citizen Kane » ?", a: ["Hitchcock", "Orson Welles", "John Ford", "Howard Hawks"], correct: 1 },
      { q: "Qui a réalisé « 2001 : l'Odyssée de l'espace » ?", a: ["Spielberg", "Ridley Scott", "George Lucas", "Stanley Kubrick"], correct: 3 },
      { q: "Qui a réalisé « Apocalypse Now » ?", a: ["Francis Ford Coppola", "Scorsese", "Michael Cimino", "Oliver Stone"], correct: 0 },
      { q: "Quel cinéaste japonais a réalisé « Les Sept Samouraïs » ?", a: ["Ozu", "Mizoguchi", "Akira Kurosawa", "Miyazaki"], correct: 2 },
      { q: "Quel cinéaste italien a réalisé « La Dolce Vita » ?", a: ["Federico Fellini", "Visconti", "Antonioni", "De Sica"], correct: 0 },
      { q: "Quel réalisateur suédois a tourné « Le Septième Sceau » ?", a: ["Carl Dreyer", "Tarkovski", "Lars von Trier", "Ingmar Bergman"], correct: 3 },
      { q: "Quel film de Kubrick adapte un roman d'Anthony Burgess ?", a: ["Shining", "Full Metal Jacket", "Orange mécanique", "Lolita"], correct: 2 },
      { q: "Quel réalisateur a tourné « Sueurs froides » (« Vertigo ») ?", a: ["Fritz Lang", "Hitchcock", "Billy Wilder", "Orson Welles"], correct: 1 },
      { q: "Quel film de 1942 réunit Humphrey Bogart et Ingrid Bergman au Maroc ?", a: ["Casablanca", "Gilda", "Le Faucon maltais", "Les Enchaînés"], correct: 0 },
      { q: "Quel acteur incarne Don Vito Corleone dans « Le Parrain » ?", a: ["Al Pacino", "Marlon Brando", "Robert De Niro", "James Caan"], correct: 1 },
      { q: "Quel cinéaste espagnol a réalisé « Tout sur ma mère » et « Volver » ?", a: ["Buñuel", "Amenábar", "Carlos Saura", "Pedro Almodóvar"], correct: 3 },
      { q: "Quel film muet allemand de 1927 est un chef-d'œuvre de science-fiction ?", a: ["Nosferatu", "Le Cabinet du docteur Caligari", "Metropolis", "M le maudit"], correct: 2 },
      { q: "Quel acteur a gagné deux Oscars pour « Philadelphia » puis « Forrest Gump » ?", a: ["Tom Hanks", "Denzel Washington", "Al Pacino", "Dustin Hoffman"], correct: 0 },
      { q: "Quel cinéaste a réalisé « Les Temps modernes » et « Le Dictateur » ?", a: ["Buster Keaton", "Charlie Chaplin", "Harold Lloyd", "Jacques Tati"], correct: 1 },
      { q: "Quel cinéaste français a réalisé « Les Quatre Cents Coups » ?", a: ["Godard", "Chabrol", "François Truffaut", "Resnais"], correct: 2 },
      { q: "Quel cinéaste de la Nouvelle Vague a réalisé « À bout de souffle » ?", a: ["Truffaut", "Rohmer", "Louis Malle", "Jean-Luc Godard"], correct: 3 },
      { q: "Quel acteur incarne Hannibal Lecter dans « Le Silence des agneaux » ?", a: ["Jack Nicholson", "Gary Oldman", "Anthony Hopkins", "Ian McKellen"], correct: 2 },
      { q: "Quel film de 1976 de Scorsese suit un chauffeur new-yorkais solitaire ?", a: ["Mean Streets", "Taxi Driver", "Raging Bull", "Casino"], correct: 1 },
      { q: "Quel cinéaste mexicain a gagné l'Oscar pour « La Forme de l'eau » ?", a: ["Alejandro Iñárritu", "Alfonso Cuarón", "Robert Rodriguez", "Guillermo del Toro"], correct: 3 },
      { q: "Quel film de Miyazaki met en scène une jeune apprentie magicienne et son chat noir ?", a: ["Kiki la petite sorcière", "Princesse Mononoké", "Le Château ambulant", "Ponyo"], correct: 0 },
      { q: "Quel acteur incarne Neo dans la saga « Matrix » ?", a: ["Tom Cruise", "Brad Pitt", "Will Smith", "Keanu Reeves"], correct: 3 },
      { q: "Quel film de Ridley Scott de 1979 se déroule dans un vaisseau hanté par une créature ?", a: ["Blade Runner", "Alien", "Prometheus", "Gravity"], correct: 1 },
      { q: "Quel film de 1980 est le deuxième volet de la trilogie originale « Star Wars » ?", a: ["Un nouvel espoir", "Le Retour du Jedi", "L'Empire contre-attaque", "La Menace fantôme"], correct: 2 },
      { q: "Quel personnage récurrent Jacques Tati incarne-t-il dans ses films ?", a: ["Monsieur Hulot", "Fantômas", "Le gendarme", "Don Camillo"], correct: 0 },
      { q: "Quel film de David Lean, en 1962, se déroule dans le désert arabique ?", a: ["Le Pont de la rivière Kwaï", "Docteur Jivago", "Lawrence d'Arabie", "Ben-Hur"], correct: 2 },
      { q: "Quelle réalisatrice reçut l'Oscar de la mise en scène pour « Démineurs » ?", a: ["Kathryn Bigelow", "Sofia Coppola", "Greta Gerwig", "Jane Campion"], correct: 0 },
      { q: "Quel acteur incarne Jack Dawson dans « Titanic » ?", a: ["Brad Pitt", "Matt Damon", "Tom Cruise", "Leonardo DiCaprio"], correct: 3 },
      { q: "Quel film de Roberto Benigni se déroule, comme une fable, dans un camp en guerre ?", a: ["Cinema Paradiso", "La vie est belle", "Le Pianiste", "La Strada"], correct: 1 },
      { q: "Quel cinéaste sud-coréen a remporté la Palme d'or et des Oscars avec « Parasite » ?", a: ["Bong Joon-ho", "Park Chan-wook", "Kim Ki-duk", "Hong Sang-soo"], correct: 0 },
      { q: "Quel film de Christopher Nolan explore l'idée d'un rêve dans le rêve ?", a: ["Interstellar", "Memento", "Inception", "Tenet"], correct: 2 },
      { q: "Quel acteur britannique incarna James Bond durant les années 1970 ?", a: ["Sean Connery", "Timothy Dalton", "Pierce Brosnan", "Roger Moore"], correct: 3 },
      { q: "Quel film de Frank Darabont, tiré de Stephen King, se déroule dans un couloir de la mort ?", a: ["Les Évadés", "La Ligne verte", "Misery", "Stand by Me"], correct: 1 },
    ],
    enfant: [
      { q: "Quel est le héros lion du dessin animé de Disney ?", a: ["Bambi", "Dumbo", "Baloo", "Simba"], correct: 3 },
      { q: "Quel jouet cowboy est le héros de « Toy Story » ?", a: ["Woody", "Buzz", "Zigzag", "Rex"], correct: 0 },
      { q: "De quelle couleur est l'ogre Shrek ?", a: ["Jaune", "Rouge", "Vert", "Bleu"], correct: 2 },
      { q: "Quelle reine des neiges a une sœur nommée Anna ?", a: ["Belle", "Elsa", "Raiponce", "Jasmine"], correct: 1 },
      { q: "Quel petit poisson est recherché par son papa dans le film ?", a: ["Dory", "Willy", "Flipper", "Némo"], correct: 3 },
      { q: "Quel petit robot ramasse des déchets dans un film Pixar ?", a: ["Eve", "WALL-E", "C-3PO", "R2-D2"], correct: 1 },
      { q: "Quel jeune sorcier porte des lunettes rondes et une cicatrice ?", a: ["Harry Potter", "Aladdin", "Tintin", "Pinocchio"], correct: 0 },
      { q: "Quelle petite fille suit un lapin blanc pressé dans un terrier ?", a: ["Raiponce", "Cendrillon", "Alice", "Dorothy"], correct: 2 },
      { q: "Quel éléphant Disney aux grandes oreilles arrive à voler ?", a: ["Baloo", "Simba", "Bambi", "Dumbo"], correct: 3 },
      { q: "Quel jouet spatial s'écrie « Vers l'infini et au-delà » ?", a: ["Buzz l'Éclair", "Rex", "Zigzag", "Woody"], correct: 0 },
      { q: "Quelle voiture de course rouge est la vedette d'un film Pixar ?", a: ["Martin", "Bumblebee", "Flash McQueen", "Herbie"], correct: 2 },
      { q: "Quel panda devient un héros d'arts martiaux dans un dessin animé ?", a: ["Baloo", "Po", "King Kong", "Kaa"], correct: 1 },
      { q: "Quel jouet dinosaure vert fait partie de la bande de « Toy Story » ?", a: ["Rex", "Woody", "Buzz", "Zigzag"], correct: 0 },
      { q: "Comment s'appelle le mammouth du dessin animé « L'Âge de glace » ?", a: ["Sid", "Diego", "Scrat", "Manny"], correct: 3 },
      { q: "Quels petits personnages jaunes en salopette parlent un langage rigolo dans « Moi, moche et méchant » ?", a: ["Les Schtroumpfs", "Les Lapins crétins", "Les Minions", "Les Bisounours"], correct: 2 },
      { q: "Quel bonhomme de neige adore les câlins dans « La Reine des neiges » ?", a: ["Sven", "Olaf", "Kristoff", "Hans"], correct: 1 },
      { q: "De quelle couleur est Stitch, le petit extraterrestre de Disney ?", a: ["Rose", "Vert", "Bleu", "Jaune"], correct: 2 },
      { q: "Quel chien parlant accompagne les héros dans « Là-haut » de Pixar ?", a: ["Rex", "Bolt", "Pluto", "Doug"], correct: 3 },
      { q: "Quelle dépanneuse rouillée est l'amie de Flash McQueen dans « Cars » ?", a: ["Sally", "Martin", "Bumblebee", "Herbie"], correct: 1 },
      { q: "Quel poisson bleu très distrait aide à retrouver Némo ?", a: ["Dory", "Marin", "Bulle", "Pigi"], correct: 0 },
    ],
  },
  sport: {
    adulte: [
      { q: "Tous les combien d'années ont lieu les J.O. d'été ?", a: ["3 ans", "4 ans", "2 ans", "5 ans"], correct: 1 },
      { q: "Dans quel sport marque-t-on un « ace » ?", a: ["Le tennis", "La natation", "Le judo", "Le rugby"], correct: 0 },
      { q: "Quel pays a inventé le judo ?", a: ["La Thaïlande", "La Chine", "Le Japon", "La Corée"], correct: 2 },
      { q: "Combien de trous compte un parcours de golf classique ?", a: ["9", "12", "24", "18"], correct: 3 },
      { q: "Combien de joueurs compte une équipe de basket sur le terrain ?", a: ["6", "7", "4", "5"], correct: 3 },
      { q: "Dans quel sport réalise-t-on un « strike » ?", a: ["Le curling", "Le tir à l'arc", "Le bowling", "Le golf"], correct: 2 },
      { q: "Dans quel sport utilise-t-on un ballon ovale ?", a: ["Le rugby", "Le basket", "Le handball", "Le volley"], correct: 0 },
      { q: "Quelle grande course cycliste se déroule chaque mois de juillet ?", a: ["La Vuelta", "Le Tour de France", "Le Giro", "Paris-Roubaix"], correct: 1 },
      { q: "Combien de joueurs compose une équipe de volley sur le terrain ?", a: ["Six", "Cinq", "Sept", "Neuf"], correct: 0 },
      { q: "Quel sport de combat se pratique pieds et poings sur un tatami ?", a: ["La boxe", "La lutte", "Le karaté", "L'escrime"], correct: 2 },
      { q: "Dans quel pays sont nés les Jeux olympiques de l'Antiquité ?", a: ["L'Italie", "La Grèce", "La Turquie", "L'Égypte"], correct: 1 },
      { q: "Combien de minutes dure un match de football réglementaire ?", a: ["Quarante-cinq", "Soixante", "Cent vingt", "Quatre-vingt-dix"], correct: 3 },
      { q: "Quel tournoi de tennis se joue sur gazon près de Londres ?", a: ["Roland-Garros", "L'US Open", "L'Open d'Australie", "Wimbledon"], correct: 3 },
      { q: "Combien de points rapporte un essai au rugby ?", a: ["Sept", "Deux", "Cinq", "Trois"], correct: 2 },
      { q: "Combien de joueurs compte une équipe de rugby à XV sur le terrain ?", a: ["15", "18", "13", "11"], correct: 0 },
      { q: "Dans quel sport utilise-t-on un volant et une raquette légère ?", a: ["Le tennis", "Le badminton", "Le padel", "Le squash"], correct: 1 },
      { q: "Quel sport se joue avec une crosse et un palet sur une patinoire ?", a: ["Le patinage", "Le bobsleigh", "Le hockey sur glace", "Le curling"], correct: 2 },
      { q: "Combien de joueurs compte une équipe de handball sur le terrain ?", a: ["5", "6", "11", "7"], correct: 3 },
      { q: "Quel sport oppose deux cavaliers et un maillet pour pousser une balle ?", a: ["Le cricket", "Le polo", "Le hockey sur gazon", "Le golf"], correct: 1 },
      { q: "Quelle discipline consiste à monter à cheval pour franchir des obstacles ?", a: ["L'équitation", "La voltige", "Le rodéo", "Le polo"], correct: 0 },
      { q: "Dans quel sport s'affrontent deux adversaires sur un ring, en plusieurs rounds ?", a: ["La lutte", "L'escrime", "La boxe", "Le judo"], correct: 2 },
      { q: "Quel sport se pratique avec un fleuret, une épée ou un sabre ?", a: ["Le tir à l'arc", "L'escrime", "Le lancer", "Le javelot"], correct: 1 },
      { q: "Quelle distance parcourt-on lors d'un marathon ?", a: ["10 km", "21 km", "100 km", "42 km"], correct: 3 },
      { q: "Combien d'anneaux figurent sur le drapeau olympique ?", a: ["Cinq", "Quatre", "Six", "Trois"], correct: 0 },
      { q: "Tous les combien d'années a lieu la Coupe du monde de football ?", a: ["Trois ans", "Quatre ans", "Cinq ans", "Deux ans"], correct: 1 },
      { q: "Dans quel pays s'est déroulée la première Coupe du monde de football en 1930 ?", a: ["L'Italie", "La France", "Le Brésil", "L'Uruguay"], correct: 3 },
      { q: "Quel pays a remporté la Coupe du monde de football en 1998 ?", a: ["La France", "L'Italie", "L'Allemagne", "Le Brésil"], correct: 0 },
      { q: "Dans quel sport réalise-t-on un « slam dunk » ?", a: ["Le volley", "Le handball", "Le basket", "Le rugby"], correct: 2 },
      { q: "Quel sport enchaîne natation, vélo puis course à pied ?", a: ["Le pentathlon", "Le triathlon", "Le décathlon", "Le biathlon"], correct: 1 },
      { q: "Quel sport d'hiver combine ski de fond et tir à la carabine ?", a: ["Le curling", "Le saut à ski", "Le bobsleigh", "Le biathlon"], correct: 3 },
      { q: "Sur quelle surface se dispute le tournoi de Roland-Garros ?", a: ["La terre battue", "La moquette", "Le gazon", "Le dur"], correct: 0 },
      { q: "Quelle grande enceinte sportive accueille les Bleus au nord de Paris ?", a: ["Roland-Garros", "Bercy", "Le Stade de France", "Le Parc des Princes"], correct: 2 },
      { q: "De quel pays vient la célèbre équipe de rugby des All Blacks ?", a: ["l'Afrique du Sud", "l'Angleterre", "La Nouvelle-Zélande", "L'Australie"], correct: 2 },
      { q: "Quel sport pratiquait la star américaine Michael Jordan ?", a: ["Le football américain", "Le basket", "Le baseball", "Le tennis"], correct: 1 },
      { q: "Dans quelle discipline le pilote Ayrton Senna s'est-il illustré ?", a: ["La Formule 1", "Le MotoGP", "Le karting", "Le rallye"], correct: 0 },
      { q: "Quelle course automobile d'endurance dure une journée entière en France ?", a: ["Le Grand Prix de Monaco", "Le Dakar", "Le Tour Auto", "Les 24 Heures du Mans"], correct: 3 },
      { q: "Quel sport à la batte, très suivi aux États-Unis, oppose deux équipes de neuf ?", a: ["Le softball", "Le hockey", "Le baseball", "Le cricket"], correct: 2 },
      { q: "Quel sport de batte et de guichet est très populaire en Inde ?", a: ["Le polo", "Le baseball", "Le golf", "Le cricket"], correct: 3 },
      { q: "Combien de joueurs aligne une équipe de football américain sur le terrain ?", a: ["9", "11", "15", "13"], correct: 1 },
      { q: "Quelle nage imite le déplacement d'une grenouille ?", a: ["La brasse", "Le crawl", "Le papillon", "Le dos"], correct: 0 },
      { q: "Comment nomme-t-on l'épreuve où l'athlète franchit une barre à l'aide d'une longue tige flexible ?", a: ["Le triple saut", "Le saut en longueur", "Le saut en hauteur", "Le saut à la perche"], correct: 3 },
      { q: "Quel sport regroupe les lancers de poids, de disque et de javelot ?", a: ["L'athlétisme", "La gymnastique", "Le tir", "L'haltérophilie"], correct: 0 },
      { q: "Quel sport consiste à glisser sur les vagues debout sur une planche ?", a: ["Le kayak", "Le surf", "La voile", "Le ski nautique"], correct: 1 },
      { q: "Quel sport d'hiver se pratique debout sur une seule planche fixée aux pieds ?", a: ["La luge", "Le ski", "Le snowboard", "Le patinage"], correct: 2 },
      { q: "Quelle compétition oppose chaque année les meilleurs clubs de football européens ?", a: ["La Coupe du monde", "La Ligue des champions", "l'Euro", "la Coupe de France"], correct: 1 },
      { q: "Combien de sets gagnants faut-il pour remporter un match masculin en Grand Chelem ?", a: ["Quatre", "Deux", "Cinq", "Trois"], correct: 3 },
      { q: "Quel sport collectif se joue dans l'eau avec un ballon et des buts ?", a: ["Le water-polo", "L'aviron", "La nage synchronisée", "La plongée"], correct: 0 },
      { q: "Quel jeu d'hiver consiste à faire glisser des pierres vers une cible sur la glace ?", a: ["Le hockey", "Le patinage", "Le curling", "Le biathlon"], correct: 2 },
      { q: "Dans quelle ville se sont tenus les premiers Jeux olympiques modernes, en 1896 ?", a: ["Paris", "Londres", "Rome", "Athènes"], correct: 3 },
      { q: "Qui a fait renaître les Jeux olympiques à la fin du XIXe siècle ?", a: ["Jules Rimet", "Juan Antonio Samaranch", "Pierre de Coubertin", "Henri Didon"], correct: 2 },
      { q: "Quelle est la devise olympique latine signifiant « plus vite, plus haut, plus fort » ?", a: ["Citius, Altius, Fortius", "Veni, Vidi, Vici", "Alea jacta est", "Carpe diem"], correct: 0 },
      { q: "Combien de joueurs compose une équipe de cricket ?", a: ["Neuf", "Onze", "Treize", "Quinze"], correct: 1 },
      { q: "Au tennis, comment annonce-t-on un score de quarante partout ?", a: ["Avantage", "Égalité", "Jeu blanc", "Tie-break"], correct: 1 },
      { q: "Combien de joueurs aligne une équipe de baseball en défense ?", a: ["Sept", "Onze", "Treize", "Neuf"], correct: 3 },
      { q: "Quelle nation remporta la première Coupe du monde de rugby, en 1987 ?", a: ["L'Australie", "l'Afrique du Sud", "La Nouvelle-Zélande", "l'Angleterre"], correct: 2 },
      { q: "De quelle couleur est le vêtement du leader du Tour de France ?", a: ["Jaune", "Vert", "Rouge", "Blanc"], correct: 0 },
      { q: "Quel vêtement distinctif récompense le meilleur grimpeur du Tour de France ?", a: ["Le maillot vert", "Le maillot jaune", "Le maillot blanc", "Le maillot à pois"], correct: 3 },
      { q: "Quel boxeur, surnommé « The Greatest », refusa de partir au Vietnam ?", a: ["Mike Tyson", "Joe Frazier", "Mohamed Ali", "George Foreman"], correct: 2 },
      { q: "Dans quel sport dispute-t-on les tournois de Wimbledon et de l'US Open ?", a: ["Le golf", "Le tennis", "Le badminton", "Le squash"], correct: 1 },
      { q: "Combien de minutes dure un quart-temps de basket selon les règles internationales ?", a: ["Dix", "Huit", "Douze", "Quinze"], correct: 0 },
      { q: "Au golf, comment nomme-t-on un score d'un coup sous le par sur un trou ?", a: ["Un eagle", "Un bogey", "Un birdie", "Un par"], correct: 2 },
      { q: "Au golf, comment nomme-t-on un score de deux coups sous le par ?", a: ["Un eagle", "Un birdie", "Un albatros", "Un bogey"], correct: 0 },
      { q: "Dans quel pays est né le rugby, dans un collège du même nom ?", a: ["L'Écosse", "L'Angleterre", "le pays de Galles", "l'Irlande"], correct: 1 },
      { q: "Quelle épreuve de ski alpin est la plus rapide ?", a: ["Le slalom", "Le slalom géant", "Le combiné", "La descente"], correct: 3 },
      { q: "Combien de jeux faut-il gagner, en principe, pour remporter une manche au tennis ?", a: ["Six", "Quatre", "Huit", "Dix"], correct: 0 },
      { q: "Quelle course d'athlétisme correspond à un tour complet de piste standard ?", a: ["Le 100 mètres", "Le 400 mètres", "Le 800 mètres", "Le 1500 mètres"], correct: 1 },
      { q: "Quel sprinteur jamaïcain remporta le 100 m olympique en 2008, 2012 et 2016 ?", a: ["Carl Lewis", "Yohan Blake", "Usain Bolt", "Asafa Powell"], correct: 2 },
      { q: "Dans quel sport s'illustrent les fameux Harlem Globetrotters ?", a: ["Le baseball", "Le hockey", "Le volley", "Le basket"], correct: 3 },
      { q: "Combien de manches (« innings ») compte un match de baseball classique ?", a: ["Sept", "Onze", "Neuf", "Quatre"], correct: 2 },
      { q: "Quelle épreuve de tennis par équipes nationales masculines existe depuis 1900 ?", a: ["La Ryder Cup", "La Coupe Davis", "La Laver Cup", "La Fed Cup"], correct: 1 },
      { q: "Quelle compétition de golf oppose l'Europe aux États-Unis ?", a: ["La Ryder Cup", "La Coupe Davis", "La Solheim Cup", "Le Masters"], correct: 0 },
      { q: "Dans quelle ville se trouve le siège du Comité international olympique ?", a: ["Genève", "Paris", "Athènes", "Lausanne"], correct: 3 },
      { q: "Quel nageur américain est l'athlète le plus médaillé de l'histoire des Jeux ?", a: ["Mark Spitz", "Michael Phelps", "Ian Thorpe", "Ryan Lochte"], correct: 1 },
      { q: "Comment nomme-t-on trois buts marqués par un même joueur dans un match ?", a: ["Un coup du chapeau", "Un doublé", "Un quadruplé", "Un penalty"], correct: 0 },
      { q: "Quelle discipline olympique enchaîne escrime, natation, équitation, tir et course ?", a: ["Le décathlon", "Le triathlon", "Le biathlon", "Le pentathlon moderne"], correct: 3 },
      { q: "Combien d'épreuves comporte le décathlon en athlétisme ?", a: ["Cinq", "Sept", "Dix", "Douze"], correct: 2 },
      { q: "Quel pays fut le premier à remporter cinq Coupes du monde de football ?", a: ["L'Allemagne", "Le Brésil", "L'Italie", "L'Argentine"], correct: 1 },
      { q: "Comment nomme-t-on, au football, une faute sanctionnée par un tir à onze mètres ?", a: ["Le penalty", "Le corner", "Le coup franc", "La touche"], correct: 0 },
      { q: "Quelle lutte traditionnelle est considérée comme le sport national du Japon ?", a: ["Le judo", "Le karaté", "Le sumo", "L'aïkido"], correct: 2 },
      { q: "Quelle ville a accueilli les Jeux olympiques d'été de 1924 et de 2024 ?", a: ["Londres", "Los Angeles", "Athènes", "Paris"], correct: 3 },
    ],
    enfant: [
      { q: "Avec quelle partie du corps joue-t-on au football ?", a: ["Les coudes", "La tête seulement", "Les mains", "Les pieds"], correct: 3 },
      { q: "Dans quel sport marque-t-on un panier ?", a: ["Le basket", "Le tennis", "La natation", "Le ski"], correct: 0 },
      { q: "Combien de roues a un vélo classique ?", a: ["3", "4", "2", "1"], correct: 2 },
      { q: "Que gagne-t-on quand on finit premier d'une course ?", a: ["Un filet", "Une médaille d'or", "Une raquette", "Un ballon"], correct: 1 },
      { q: "Dans quel sport nage-t-on ?", a: ["Le golf", "L'escrime", "Le judo", "La natation"], correct: 3 },
      { q: "Combien de joueurs y a-t-il dans une équipe de football sur le terrain ?", a: ["9", "7", "11", "5"], correct: 2 },
      { q: "Avec quoi frappe-t-on la balle au tennis ?", a: ["Une crosse", "Une raquette", "Un filet", "Un bâton"], correct: 1 },
      { q: "Quel sport pratique-t-on sur la neige avec deux planches aux pieds ?", a: ["Le ski", "La natation", "Le judo", "Le tennis"], correct: 0 },
      { q: "Quel objet rond frappe-t-on du pied au football ?", a: ["Un palet", "Un volant", "Un ballon", "Une raquette"], correct: 2 },
      { q: "Que met-on sur la tête pour faire du vélo en toute sécurité ?", a: ["Une couronne", "Une casquette", "Un chapeau", "Un casque"], correct: 3 },
      { q: "Quel animal monte-t-on pour faire de l'équitation ?", a: ["Un cheval", "Un mouton", "Un chien", "Une vache"], correct: 0 },
      { q: "Que met-on aux mains pour faire de la boxe ?", a: ["Une raquette", "Des gants", "Des chaussures", "Un casque"], correct: 1 },
      { q: "Dans quel sport saute-t-on dans une piscine depuis un plongeoir ?", a: ["Le football", "Le tennis", "Le golf", "Le plongeon"], correct: 3 },
      { q: "Sur quoi vise-t-on en lançant des fléchettes ?", a: ["Un filet", "Un panier", "Une cible", "Un but"], correct: 2 },
      { q: "Quel sport se joue avec une raquette et une petite balle sur une table ?", a: ["Le football", "Le ping-pong", "Le golf", "Le rugby"], correct: 1 },
      { q: "Dans quel sport glisse-t-on sur la glace avec des patins ?", a: ["Le patinage", "La natation", "Le vélo", "Le tennis"], correct: 0 },
      { q: "Que crie-t-on quand un but est marqué au football ?", a: ["Panier", "But", "Stop", "Saut"], correct: 1 },
      { q: "Quel objet rebondit et sert à jouer au basket ?", a: ["Un volant", "Une fléchette", "Un palet", "Un ballon"], correct: 3 },
      { q: "Sur quoi court-on lors d'une course à pied dans un stade ?", a: ["Sur une piste", "Sur l'eau", "Sur la neige", "Dans les arbres"], correct: 0 },
      { q: "Quelle discipline consiste à se battre en kimono sur un tapis ?", a: ["Le tennis", "Le golf", "Le judo", "La natation"], correct: 2 },
    ],
  },
  geopolitique: {
    adulte: [
      { q: "Combien de membres permanents compte le Conseil de sécurité de l'ONU ?", a: ["5", "7", "10", "3"], correct: 0 },
      { q: "Dans quelle ville se trouve le siège de l'ONU ?", a: ["Genève", "Paris", "New York", "Vienne"], correct: 2 },
      { q: "Combien d'étoiles figurent sur le drapeau européen ?", a: ["15", "12", "10", "27"], correct: 1 },
      { q: "Quelle alliance militaire regroupe les pays de l'Atlantique Nord ?", a: ["L'ONU", "L'UE", "Le G7", "L'OTAN"], correct: 3 },
      { q: "Dans quelle ville siègent les institutions de l'Union européenne ?", a: ["Rome", "Bruxelles", "Strasbourg", "Berlin"], correct: 1 },
      { q: "Quel pays était le plus peuplé du monde en 2024 ?", a: ["L'Inde", "La Chine", "Les États-Unis", "L'Indonésie"], correct: 0 },
      { q: "Quel animal est l'emblème des États-Unis ?", a: ["Le bison", "L'ours", "Le lion", "L'aigle"], correct: 3 },
      { q: "Comment appelle-t-on le siège du Parlement britannique ?", a: ["Le Kremlin", "Le Capitole", "Westminster", "Le Reichstag"], correct: 2 },
      { q: "Quel pays a quitté l'Union européenne en 2020 ?", a: ["La Suède", "La Grèce", "La Pologne", "Le Royaume-Uni"], correct: 3 },
      { q: "Dans quel bâtiment travaille le président des États-Unis ?", a: ["La Maison-Blanche", "Le Kremlin", "L'Élysée", "Le Capitole"], correct: 0 },
      { q: "Quelle organisation veille sur la santé à l'échelle mondiale ?", a: ["L'OTAN", "L'OMS", "L'OPEP", "L'UNESCO"], correct: 1 },
      { q: "Combien d'étoiles figurent sur le drapeau américain ?", a: ["Treize", "Vingt-sept", "Cinquante", "Quarante-huit"], correct: 2 },
      { q: "Quel pays voisin de la France est dirigé par un chancelier ?", a: ["La Belgique", "Le Portugal", "L'Allemagne", "L'Espagne"], correct: 2 },
      { q: "Comment nomme-t-on le chef du gouvernement au Royaume-Uni ?", a: ["Le gouverneur", "Le président", "Le chancelier", "Le Premier ministre"], correct: 3 },
      { q: "Combien de pays composent aujourd'hui l'Union européenne ?", a: ["25", "27", "30", "28"], correct: 1 },
      { q: "Quelle est la monnaie utilisée au Royaume-Uni ?", a: ["La livre sterling", "L'euro", "Le dollar", "Le franc"], correct: 0 },
      { q: "Quelle est la monnaie des États-Unis ?", a: ["Le dollar", "Le peso", "L'euro", "La livre"], correct: 0 },
      { q: "Quelle est la monnaie du Japon ?", a: ["Le won", "Le baht", "Le yen", "Le yuan"], correct: 2 },
      { q: "Dans quelle ville se situe la Maison-Blanche ?", a: ["New York", "Philadelphie", "Boston", "Washington"], correct: 3 },
      { q: "Comment s'appelle le palais où réside le président de la République française ?", a: ["Le Louvre", "L'Élysée", "Versailles", "Matignon"], correct: 1 },
      { q: "Comment s'appelle la résidence du Premier ministre français ?", a: ["L'Élysée", "Le Palais-Bourbon", "Matignon", "Le Sénat"], correct: 2 },
      { q: "Quelle institution, élue par le peuple, vote les lois en France ?", a: ["Le Conseil d'État", "L'Assemblée nationale", "Le Sénat", "Le Congrès"], correct: 1 },
      { q: "Combien d'années dure le mandat du président de la République française ?", a: ["Cinq ans", "Quatre ans", "Six ans", "Sept ans"], correct: 0 },
      { q: "Comment appelle-t-on le siège du pouvoir russe, au cœur de Moscou ?", a: ["Le Palais d'Hiver", "La Loubianka", "Le Bolchoï", "Le Kremlin"], correct: 3 },
      { q: "Quel sommet réunit chaque année sept grandes puissances économiques ?", a: ["L'OPEP", "Le G7", "L'ONU", "L'OTAN"], correct: 1 },
      { q: "Quelle organisation regroupe de grands pays exportateurs de pétrole ?", a: ["L'OCDE", "L'OMC", "Le FMI", "L'OPEP"], correct: 3 },
      { q: "Quelle agence de l'ONU est chargée de l'éducation et de la culture ?", a: ["L'UNESCO", "L'OMS", "Le FMI", "L'UNICEF"], correct: 0 },
      { q: "Quelle agence de l'ONU vient en aide aux enfants du monde ?", a: ["Le HCR", "L'UNESCO", "L'UNICEF", "L'OMS"], correct: 2 },
      { q: "Quelle est la langue officielle du Brésil ?", a: ["L'anglais", "Le français", "L'espagnol", "Le portugais"], correct: 3 },
      { q: "Quelle est la langue officielle de l'Argentine ?", a: ["Le français", "L'espagnol", "L'italien", "Le portugais"], correct: 1 },
      { q: "Dans quel pays parle-t-on majoritairement le mandarin ?", a: ["La Chine", "Le Japon", "La Corée", "Le Vietnam"], correct: 0 },
      { q: "Quel pays est aujourd'hui le seul à être dirigé par un empereur ?", a: ["Le Maroc", "La Thaïlande", "Le Japon", "La Chine"], correct: 2 },
      { q: "Quelle ville française partage avec Bruxelles le siège du Parlement européen ?", a: ["Luxembourg", "Lille", "Strasbourg", "Lyon"], correct: 2 },
      { q: "Quel grand fleuve européen traverse Vienne et Budapest ?", a: ["l'Elbe", "Le Rhin", "Le Rhône", "Le Danube"], correct: 3 },
      { q: "Quel minuscule État est entièrement entouré par la ville de Rome ?", a: ["Le Vatican", "Saint-Marin", "Monaco", "Andorre"], correct: 0 },
      { q: "Quelle principauté de la Côte d'Azur est célèbre pour son casino ?", a: ["Liechtenstein", "Monaco", "Saint-Marin", "Andorre"], correct: 1 },
      { q: "Quel pays réunit l'Angleterre, l'Écosse, le pays de Galles et l'Irlande du Nord ?", a: ["la Scandinavie", "l'Irlande", "les Pays-Bas", "Le Royaume-Uni"], correct: 3 },
      { q: "Quelle est la capitale des Pays-Bas ?", a: ["Rotterdam", "Amsterdam", "Utrecht", "La Haye"], correct: 1 },
      { q: "Quel pays neutre, hors de l'UE, accueille l'ONU à Genève ?", a: ["La Suisse", "La Norvège", "L'Autriche", "La Belgique"], correct: 0 },
      { q: "Dans quelle ville se trouve le siège européen de l'ONU ?", a: ["Bruxelles", "La Haye", "Genève", "Vienne"], correct: 2 },
      { q: "Quelle ville néerlandaise abrite la Cour internationale de justice ?", a: ["Rotterdam", "Bruxelles", "La Haye", "Amsterdam"], correct: 2 },
      { q: "Quel oiseau est souvent utilisé comme symbole de la paix ?", a: ["La colombe", "L'aigle", "Le faucon", "Le corbeau"], correct: 0 },
      { q: "Quel texte adopté par l'ONU en 1948 protège les libertés de chacun ?", a: ["La Magna Carta", "La Déclaration universelle des droits de l'homme", "Le traité de Rome", "La Constitution"], correct: 1 },
      { q: "Quel océan sépare la France des États-Unis ?", a: ["Le Pacifique", "l'Arctique", "l'océan Indien", "L'Atlantique"], correct: 3 },
      { q: "Combien d'étoiles figurent sur le drapeau de la Chine ?", a: ["Cinq", "Une", "Trois", "Sept"], correct: 0 },
      { q: "Quelle couleur domine sur le drapeau de la Chine ?", a: ["Le vert", "Le bleu", "Le blanc", "Le rouge"], correct: 3 },
      { q: "Quel est le plus vaste pays du continent américain ?", a: ["l'Argentine", "Le Brésil", "Le Canada", "Les États-Unis"], correct: 2 },
      { q: "Quels trois pays forment l'Amérique du Nord ?", a: ["France, Espagne et Italie", "Canada, États-Unis et Mexique", "Brésil, Chili et Pérou", "Chine, Inde et Japon"], correct: 1 },
      { q: "En quelle année fut signé le traité de Rome, fondateur de la Communauté économique européenne ?", a: ["1948", "1973", "1992", "1957"], correct: 3 },
      { q: "Quel accord signé en 1992 a donné naissance à l'Union européenne ?", a: ["Le traité de Rome", "Le traité de Lisbonne", "Le traité de Maastricht", "Le traité de Nice"], correct: 2 },
      { q: "En quelle année les pièces et billets en euros sont-ils entrés en circulation ?", a: ["1999", "2002", "2004", "2007"], correct: 1 },
      { q: "Combien d'États membres comptent environ les Nations unies ?", a: ["193", "150", "220", "250"], correct: 0 },
      { q: "Quel dispositif de 1985 a supprimé les contrôles aux frontières de plusieurs pays européens ?", a: ["Les accords de Schengen", "Maastricht", "Yalta", "Helsinki"], correct: 0 },
      { q: "Quelle conférence de 1945 réunit Roosevelt, Churchill et Staline pour préparer l'après-guerre ?", a: ["Potsdam", "Yalta", "Téhéran", "Munich"], correct: 1 },
      { q: "Quelle expression de Churchill désignait la frontière entre les blocs de l'Est et de l'Ouest ?", a: ["La ligne rouge", "Le mur de l'argent", "La barrière verte", "Le rideau de fer"], correct: 3 },
      { q: "Comment s'appelle la chambre haute du Parlement français ?", a: ["L'Assemblée nationale", "Le Conseil constitutionnel", "Le Sénat", "Le Congrès"], correct: 2 },
      { q: "Comment nomme-t-on le parlement des États-Unis ?", a: ["Le Congrès", "Le Sénat", "La Diète", "Le Bundestag"], correct: 0 },
      { q: "Comment s'appelle le parlement fédéral allemand ?", a: ["Le Reichstag", "Le Bundestag", "La Douma", "La Diète"], correct: 1 },
      { q: "Comment s'appelle la chambre basse du parlement russe ?", a: ["Le Soviet", "Le Sénat", "Le Bundestag", "La Douma"], correct: 3 },
      { q: "Comment s'appelle le parlement japonais ?", a: ["La Douma", "Le Congrès", "La Diète", "La Knesset"], correct: 2 },
      { q: "Quelle alliance militaire regroupait les pays de l'Est face à l'OTAN ?", a: ["Le Komintern", "Le pacte de Varsovie", "Le Comecon", "La Triple-Entente"], correct: 1 },
      { q: "Quelle organisation économique réunissait les pays communistes de l'Est ?", a: ["L'OPEP", "L'OCDE", "Le G7", "Le Comecon"], correct: 3 },
      { q: "Quelle institution de l'Union, à Bruxelles, propose les lois et veille à leur application ?", a: ["Le Conseil", "La Cour de justice", "La Commission européenne", "Le Parlement"], correct: 2 },
      { q: "Quelle institution, à Francfort, gère la monnaie unique du continent ?", a: ["La Banque centrale européenne", "Le FMI", "La Banque mondiale", "La BERD"], correct: 0 },
      { q: "Qui dispose d'un droit de veto au Conseil de sécurité de l'ONU ?", a: ["Les cinq membres permanents", "Tous les membres", "Les pays fondateurs", "L'Assemblée générale"], correct: 0 },
      { q: "Quelle langue compte le plus de locuteurs natifs dans le monde ?", a: ["L'anglais", "L'espagnol", "Le hindi", "Le mandarin"], correct: 3 },
      { q: "Quel fleuve marque une partie de la frontière entre la France et l'Allemagne ?", a: ["La Seine", "Le Rhin", "Le Danube", "l'Elbe"], correct: 1 },
      { q: "Quelle ville fut la capitale de l'Allemagne de l'Ouest avant la réunification ?", a: ["Berlin", "Francfort", "Bonn", "Cologne"], correct: 2 },
      { q: "Quelle est la capitale de la Corée du Sud ?", a: ["Pyongyang", "Tokyo", "Séoul", "Busan"], correct: 2 },
      { q: "Quelle est la capitale de la Corée du Nord ?", a: ["Séoul", "Hanoï", "Pékin", "Pyongyang"], correct: 3 },
      { q: "Quelle est la capitale de l'Arabie saoudite ?", a: ["Riyad", "La Mecque", "Djeddah", "Dubaï"], correct: 0 },
      { q: "Quel pays d'Asie partage ses frontières avec quatorze pays, comme la Russie ?", a: ["L'Inde", "La Chine", "Le Pakistan", "Le Kazakhstan"], correct: 1 },
      { q: "Quelle organisation, basée à Genève, régule le commerce mondial ?", a: ["L'OMS", "L'OIT", "Le FMI", "L'OMC"], correct: 3 },
      { q: "Quelle institution financière née à Bretton Woods aide les pays en difficulté ?", a: ["Le FMI", "La BCE", "L'OMC", "L'OCDE"], correct: 0 },
      { q: "Comment appelle-t-on l'ensemble des pays ayant adopté la monnaie unique européenne ?", a: ["L'espace Schengen", "Le marché commun", "La zone euro", "L'Eurogroupe"], correct: 2 },
      { q: "Dans quelle ville fut signée la Charte des Nations unies en 1945 ?", a: ["New York", "San Francisco", "Genève", "Yalta"], correct: 1 },
      { q: "Quel pays nordique a conservé sa couronne plutôt que d'adopter l'euro ?", a: ["La Finlande", "La Suède", "L'Estonie", "L'Irlande"], correct: 1 },
      { q: "Quel accord signé en 2007 a réformé le fonctionnement de l'Union européenne ?", a: ["Le traité de Nice", "Le traité d'Amsterdam", "Le traité de Lisbonne", "Le traité de Rome"], correct: 2 },
      { q: "Comment nomme-t-on un État gouverné par un roi ou une reine ?", a: ["Une monarchie", "Une république", "Une dictature", "Une fédération"], correct: 0 },
      { q: "Quelle est la capitale de la Finlande ?", a: ["Oslo", "Stockholm", "Tallinn", "Helsinki"], correct: 3 },
    ],
    enfant: [
      { q: "Quelles sont les couleurs du drapeau de la France ?", a: ["Bleu-jaune", "Jaune-rouge", "Vert-blanc-rouge", "Bleu-blanc-rouge"], correct: 3 },
      { q: "Qui dirige un royaume ?", a: ["Un roi ou une reine", "Un boulanger", "Un pompier", "Un facteur"], correct: 0 },
      { q: "Quelle est la fête nationale française ?", a: ["Halloween", "Noël", "Le 14 juillet", "Pâques"], correct: 2 },
      { q: "Dans quelle ville travaille le président français ?", a: ["Londres", "Paris", "Madrid", "Rome"], correct: 1 },
      { q: "Quelle monnaie utilise-t-on en France ?", a: ["Le dollar", "L'euro", "Le yen", "La livre"], correct: 1 },
      { q: "Comment appelle-t-on les pays d'Europe réunis ?", a: ["L'Amérique", "L'Afrique", "L'Union européenne", "L'Asie"], correct: 2 },
      { q: "Comment appelle-t-on le chef élu d'une République comme la France ?", a: ["Le président", "Le chevalier", "Le roi", "Le prince"], correct: 0 },
      { q: "Sur quel continent se situe la France ?", a: ["L'Afrique", "L'Amérique", "L'Asie", "L'Europe"], correct: 3 },
      { q: "Quel objet en tissu, avec des couleurs, représente un pays ?", a: ["Le ballon", "Le tapis", "Le chapeau", "Le drapeau"], correct: 3 },
      { q: "Comment appelle-t-on l'argent utilisé pour acheter des choses ?", a: ["Le ticket", "La carte", "La monnaie", "Le jeton"], correct: 2 },
      { q: "Comment nomme-t-on l'ensemble des habitants d'un pays ?", a: ["L'équipe", "La population", "La famille", "La classe"], correct: 1 },
      { q: "Dans quel bâtiment travaille le maire d'une ville ?", a: ["La mairie", "La gare", "L'école", "L'hôpital"], correct: 0 },
      { q: "Comment appelle-t-on le chef élu d'une ville en France ?", a: ["Le maire", "Le roi", "Le capitaine", "Le facteur"], correct: 0 },
      { q: "Quel document permet de voyager dans d'autres pays ?", a: ["Le ticket de bus", "La carte de jeu", "Le passeport", "Le menu"], correct: 2 },
      { q: "Comment appelle-t-on les habitants de la France ?", a: ["Les Anglais", "Les Français", "Les Italiens", "Les Espagnols"], correct: 1 },
      { q: "Combien de couleurs y a-t-il sur le drapeau français ?", a: ["Deux", "Quatre", "Cinq", "Trois"], correct: 3 },
      { q: "Que glisse-t-on dans l'urne pour choisir ses élus ?", a: ["Un bulletin", "Un dessin", "Un bonbon", "Une photo"], correct: 0 },
      { q: "Comment appelle-t-on l'endroit où l'on est né ?", a: ["Le voisin", "L'étranger", "La planète", "Le pays natal"], correct: 3 },
      { q: "Quel papier officiel, avec une photo, prouve qui tu es ?", a: ["La carte postale", "La carte à jouer", "La carte d'identité", "Le ticket"], correct: 2 },
      { q: "Comment appelle-t-on la grande ville où siège le gouvernement d'un pays ?", a: ["Le village", "La capitale", "La banlieue", "La campagne"], correct: 1 },
    ],
  },
};

// Couleurs des joueurs — distinctes, même chroma/clarté, teintes variées.
const PLAYER_COLORS = [
  { id: 'corail', label: 'Corail',  color: 'oklch(0.64 0.16 28)',  ring: 'oklch(0.50 0.15 28)' },
  { id: 'azur',   label: 'Azur',    color: 'oklch(0.62 0.13 235)', ring: 'oklch(0.48 0.12 235)' },
  { id: 'jade',   label: 'Jade',    color: 'oklch(0.62 0.12 168)', ring: 'oklch(0.47 0.11 168)' },
  { id: 'prune',  label: 'Prune',   color: 'oklch(0.58 0.15 330)', ring: 'oklch(0.46 0.14 330)' },
];

// Plateau de 100 cases : 12 cases par catégorie (8×12 = 96) + 4 cases « Joker ».
// Répartition au hasard, cases numérotées de 1 à 100.
function buildBoard() {
  const cells = [];
  CATEGORIES.forEach(c => { for (let k = 0; k < 12; k++) cells.push({ type: 'cat', category: c.id }); });
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
          100 cases · 8 catégories
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 12, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 620 }}>
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
                {[['enfant', 'Enfant'], ['adulte', 'Adulte']].map(([val, lab]) => {
                  const on = (p.level || 'adulte') === val;
                  return (
                    <button key={val} onClick={() => setLevel(i, val)} style={{
                      fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                      padding: '7px 16px', borderRadius: 999, border: 'none', whiteSpace: 'nowrap',
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
function ScreenStars({ players, setPlayers, onStart, onBack }) {
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
      <SetupHeader step={3} title="Catégories favorites" onBack={goPrev} />

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
        {CATEGORIES.map(c => {
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
          Étape {step} sur 3
        </div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, margin: '2px 0 0', color: 'var(--ink)', fontWeight: 400 }}>{title}</h2>
      </div>
      <div style={{ width: 96 }} />
    </div>
  );
}

Object.assign(window, { ScreenAccueil, ScreenCount, ScreenNames, ScreenStars });

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
        <span style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.3))' }}>{joker ? '★' : cat.glyph}</span>
        <span style={{ position: 'absolute', bottom: 2, right: 4, fontFamily: 'var(--font-display)', fontSize: 10, opacity: 0.7 }}>{cell.number}</span>
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
function ScreenQuestion({ cat, question, player, stake, onAnswer, timeLimit = 30 }) {
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
            {stake > 1 && <Stars level={stake === 3 ? 2 : 1} size={13} tone="oklch(0.97 0.02 90)" />}
            {stake} {stake > 1 ? 'points en jeu' : 'point en jeu'}
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
                {correct
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
function DiscoveryOverlay({ players, onReveal, durationS }) {
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
          {CATEGORIES.map(c => (
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

function pickQuestion(catId, level, usedMap) {
  const pool = (QUESTIONS[catId] && QUESTIONS[catId][level]) || QUESTIONS[catId].adulte;
  const key = catId + '_' + level;
  const used = usedMap[key] || [];
  const avail = pool.map((_, i) => i).filter(i => !used.includes(i));
  const list = avail.length ? avail : pool.map((_, i) => i);
  const idx = list[Math.floor(Math.random() * list.length)];
  return { idx, question: pool[idx], key };
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const target = parseInt(t.winScore, 10) || 20;
  const delayMs = Math.round((parseFloat(t.revealDelay) || 3) * 1000);
  const questionTime = parseInt(t.questionTime, 10) || 30;
  const discoveryS = t.discoveryTime == null ? 10 : parseInt(t.discoveryTime, 10);

  const [phase, setPhase] = useState('accueil'); // accueil | count | names | stars | board | victory
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
  const usedRef = useRef({});
  const timerRef = useRef(null);
  const discTimerRef = useRef(null);

  useEffect(() => { fitStage(); }, [phase]);
  useEffect(() => {
    document.getElementById('frame').setAttribute('data-theme', THEME_MAP[t.theme] || '');
  }, [t.theme]);
  useEffect(() => () => { clearTimeout(timerRef.current); clearInterval(discTimerRef.current); }, []);

  function initPlayers(n) {
    setPlayers(Array.from({ length: n }).map((_, i) => ({
      name: '', colorId: PLAYER_COLORS[i].id, color: PLAYER_COLORS[i].color,
      level: 'adulte', score: 0, star2: null, star1: null,
    })));
  }

  function startGame() {
    clearTimeout(timerRef.current); clearInterval(discTimerRef.current);
    playedRef.current = {}; usedRef.current = {};
    setBoard(buildBoard());
    setPlayed({}); setUsedMap({});
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
      beginReveal(cat, stakeFor(cur, cat.id), cur.level || 'adulte');
    }
  }

  function chooseJoker(catId) {
    const cur = players[current];
    beginReveal(CAT_BY_ID[catId], stakeFor(cur, catId), cur.level || 'adulte');
  }

  function answerQuestion(correct) {
    const gained = correct ? active.stake : 0;
    usedRef.current = { ...usedRef.current, [active.key]: [...(usedRef.current[active.key] || []), active.qIdx] };
    setUsedMap({ ...usedRef.current });

    const curIdx = current;
    let newScore = players[curIdx].score + gained;
    setPlayers(prev => prev.map((pl, i) => i === curIdx ? { ...pl, score: pl.score + gained } : pl));
    setActive(null);

    const remaining = board.length - Object.keys(playedRef.current).length;
    setTimeout(() => {
      if (newScore >= target) {
        setPlayers(prev => { setWinner(prev[curIdx]); return prev; });
        setReachedTarget(true);
        setPhase('victory');
      } else if (remaining <= 0) {
        setPlayers(prev => { setWinner([...prev].sort((a, b) => b.score - a.score)[0]); return prev; });
        setReachedTarget(false);
        setPhase('victory');
      } else if (t.replayOnCorrect && correct) {
        // le joueur rejoue : on ne change pas `current`
      } else {
        setCurrent(c => (c + 1) % players.length);
      }
    }, 20);
  }

  // ----- Rendu selon la phase -----
  let content;
  if (phase === 'accueil') {
    content = <ScreenAccueil onStart={() => setPhase('count')} />;
  } else if (phase === 'count') {
    content = <ScreenCount onBack={() => setPhase('accueil')} onPick={(n) => { setCount(n); initPlayers(n); setPhase('names'); }} />;
  } else if (phase === 'names') {
    content = <ScreenNames count={count} players={players} setPlayers={setPlayers} onBack={() => setPhase('count')} onStart={() => setPhase('stars')} />;
  } else if (phase === 'stars') {
    content = <ScreenStars players={players} setPlayers={setPlayers} onBack={() => setPhase('names')} onStart={startGame} />;
  } else if (phase === 'board') {
    content = (
      <>
        <ScreenBoard players={players} current={current} board={board} played={played}
          target={target} canPlay={!active && discovery === 'done'} onPick={clickCell}
          peek={discovery === 'reveal'} discoverLeft={discoverLeft} />
        {discovery === 'prompt' && (
          <DiscoveryOverlay players={players} onReveal={revealBoard} durationS={discoveryS} />
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
