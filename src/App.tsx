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
    ],
    enfant: [
      { q: "Quel roi de France est surnommé le Roi-Soleil ?", a: ["Henri IV", "Napoléon", "Louis XIV", "Charlemagne"], correct: 2 },
      { q: "Dans quel pays vivaient les pharaons ?", a: ["La Grèce", "L'Égypte", "La Chine", "L'Italie"], correct: 1 },
      { q: "Quel grand monument de Paris a été construit pour 1889 ?", a: ["L'Arc de Triomphe", "Le Louvre", "Notre-Dame", "La tour Eiffel"], correct: 3 },
      { q: "Où habitaient les chevaliers au Moyen Âge ?", a: ["Des châteaux forts", "Des igloos", "Des cabanes", "Des gratte-ciels"], correct: 0 },
      { q: "Comment appelle-t-on les gens qui vivaient dans des grottes il y a très longtemps ?", a: ["Les Romains", "Les hommes préhistoriques", "Les Vikings", "Les pirates"], correct: 1 },
      { q: "Qui était Napoléon Bonaparte ?", a: ["Un empereur", "Un explorateur", "Un peintre", "Un roi"], correct: 0 },
      { q: "Quelle arme un chevalier utilisait-il au combat ?", a: ["Le pistolet", "Le ballon", "L'épée", "La fourchette"], correct: 2 },
      { q: "Sur quoi voyageaient les marins explorateurs autrefois ?", a: ["Des fusées", "Des voitures", "Des avions", "Des bateaux à voiles"], correct: 3 },
      { q: "Dans quelle grande demeure dorée vivait le roi Louis XIV ?", a: ["La tour Eiffel", "Notre-Dame", "Le Louvre", "Le château de Versailles"], correct: 3 },
      { q: "Quel objet mesurait le temps autrefois grâce à du sable qui s'écoule ?", a: ["Le télescope", "Le sablier", "La loupe", "La boussole"], correct: 1 },
      { q: "Quels grands reptiles vivaient sur Terre il y a des millions d'années ?", a: ["Les dinosaures", "Les dragons", "Les sirènes", "Les licornes"], correct: 0 },
      { q: "Quel moyen de transport tiré par des chevaux utilisait-on jadis ?", a: ["La trottinette", "Le métro", "La calèche", "L'avion"], correct: 2 },
    ],
  },
  geo: {
    adulte: [
      { q: "Quelle est la capitale de l'Australie ?", a: ["Melbourne", "Canberra", "Sydney", "Perth"], correct: 1 },
      { q: "Sur quel continent se trouve le désert du Sahara ?", a: ["Afrique", "Océanie", "Asie", "Amérique"], correct: 0 },
      { q: "Quel est le plus long fleuve d'Europe ?", a: ["Le Danube", "Le Rhin", "La Loire", "La Volga"], correct: 3 },
      { q: "Dans quel pays se trouve le Machu Picchu ?", a: ["Chili", "Mexique", "Pérou", "Bolivie"], correct: 2 },
      { q: "Quelle est la capitale du Canada ?", a: ["Toronto", "Montréal", "Ottawa", "Vancouver"], correct: 2 },
      { q: "Quel est le plus grand océan du monde ?", a: ["L'Atlantique", "L'Indien", "L'Arctique", "Le Pacifique"], correct: 3 },
      { q: "Quelle est la capitale de l'Italie ?", a: ["Naples", "Rome", "Turin", "Milan"], correct: 1 },
      { q: "Quel est le plus haut sommet du monde ?", a: ["L'Everest", "Le K2", "Le mont Blanc", "Le Kilimandjaro"], correct: 0 },
      { q: "Quel fleuve traverse Paris ?", a: ["La Loire", "La Garonne", "Le Rhône", "La Seine"], correct: 3 },
      { q: "Quelle est la capitale du Japon ?", a: ["Osaka", "Tokyo", "Kyoto", "Nagoya"], correct: 1 },
      { q: "Quel est le plus vaste désert froid du monde ?", a: ["Le Sahara", "L'Atacama", "L'Antarctique", "Le Gobi"], correct: 2 },
      { q: "Combien de continents compte la Terre ?", a: ["Sept", "Cinq", "Six", "Huit"], correct: 0 },
      { q: "Quelle mer borde la Côte d'Azur ?", a: ["La Baltique", "La mer du Nord", "La Méditerranée", "La mer Noire"], correct: 2 },
      { q: "Quel est le plus grand pays du monde par sa superficie ?", a: ["Le Brésil", "La Russie", "La Chine", "Le Canada"], correct: 1 },
      { q: "Quelle est la capitale de l'Espagne ?", a: ["Madrid", "Valence", "Barcelone", "Séville"], correct: 0 },
      { q: "Quelle est la capitale de l'Allemagne ?", a: ["Francfort", "Munich", "Hambourg", "Berlin"], correct: 3 },
      { q: "Quelle est la capitale du Royaume-Uni ?", a: ["Manchester", "Londres", "Liverpool", "Édimbourg"], correct: 1 },
      { q: "Quelle est la capitale de la Russie ?", a: ["Minsk", "Kiev", "Saint-Pétersbourg", "Moscou"], correct: 3 },
      { q: "Quelle est la capitale des États-Unis ?", a: ["New York", "Chicago", "Washington", "Los Angeles"], correct: 2 },
      { q: "Quelle est la capitale de l'Égypte ?", a: ["Le Caire", "Louxor", "Alexandrie", "Assouan"], correct: 0 },
      { q: "Quelle est la capitale de la Grèce ?", a: ["Thessalonique", "Corinthe", "Athènes", "Sparte"], correct: 2 },
      { q: "Quelle est la capitale du Portugal ?", a: ["Lisbonne", "Faro", "Porto", "Coimbra"], correct: 0 },
      { q: "Quel grand fleuve traverse l'Égypte ?", a: ["Le Gange", "Le Congo", "L'Amazone", "Le Nil"], correct: 3 },
      { q: "Quel océan borde la côte ouest de la France ?", a: ["L'océan Indien", "L'Atlantique", "Le Pacifique", "L'Arctique"], correct: 1 },
      { q: "Quelle chaîne de montagnes sépare la France de l'Espagne ?", a: ["Les Alpes", "Le Jura", "Les Vosges", "Les Pyrénées"], correct: 3 },
      { q: "Quelle longue chaîne de montagnes parcourt l'ouest de l'Amérique du Sud ?", a: ["L'Himalaya", "L'Atlas", "Les Andes", "Les Rocheuses"], correct: 2 },
      { q: "Dans quel pays se trouve la célèbre tour penchée de Pise ?", a: ["L'Espagne", "L'Italie", "Le Portugal", "La Grèce"], correct: 1 },
      { q: "Dans quel pays se dresse la statue de la Liberté ?", a: ["Les États-Unis", "La France", "Le Royaume-Uni", "Le Canada"], correct: 0 },
      { q: "Dans quel pays se trouve le Taj Mahal ?", a: ["L'Inde", "La Chine", "Le Népal", "Le Pakistan"], correct: 0 },
      { q: "Dans quel pays se trouvent les pyramides de Gizeh ?", a: ["Le Mexique", "La Grèce", "L'Égypte", "l'Irak"], correct: 2 },
      { q: "Quelle est la plus grande île du monde ?", a: ["Bornéo", "L'Islande", "Madagascar", "Le Groenland"], correct: 3 },
      { q: "Quel grand pays d'Amérique du Sud abrite la forêt amazonienne ?", a: ["L'Argentine", "Le Brésil", "Le Chili", "Le Pérou"], correct: 1 },
      { q: "Quelle voie d'eau artificielle relie la Méditerranée à la mer Rouge ?", a: ["Le canal de Suez", "Le canal de Corinthe", "Le canal de Panama", "Le canal du Midi"], correct: 0 },
      { q: "Quelle voie d'eau traverse l'Amérique centrale pour relier deux océans ?", a: ["Le canal de Corinthe", "Le canal de Suez", "Le canal de Panama", "Le canal de Kiel"], correct: 2 },
      { q: "Quelle est la capitale de la Chine ?", a: ["Shanghai", "Hong Kong", "Canton", "Pékin"], correct: 3 },
      { q: "Quelle est la capitale de l'Inde ?", a: ["Calcutta", "New Delhi", "Bombay", "Bangalore"], correct: 1 },
      { q: "Quelle est la capitale du Brésil ?", a: ["Rio de Janeiro", "Brasília", "Salvador", "São Paulo"], correct: 1 },
      { q: "Quel pays a une forme souvent comparée à un hexagone ?", a: ["L'Allemagne", "La Pologne", "La France", "L'Espagne"], correct: 2 },
      { q: "Quelle est la plus grande île de la Grèce ?", a: ["Santorin", "Corfou", "Rhodes", "La Crète"], correct: 3 },
      { q: "Dans quelle ville se trouve le Colisée ?", a: ["Rome", "Florence", "Athènes", "Naples"], correct: 0 },
      { q: "Quel volcan domine la baie de Naples ?", a: ["Le Stromboli", "Le Fuji", "Le Vésuve", "L'Etna"], correct: 2 },
      { q: "Quel est le plus vaste pays d'Afrique par sa superficie ?", a: ["L'Égypte", "L'Algérie", "l'Afrique du Sud", "Le Nigéria"], correct: 1 },
      { q: "Quelle ville est traversée par le fleuve la Tamise ?", a: ["Vienne", "Paris", "Rome", "Londres"], correct: 3 },
      { q: "Quel pays forme à lui seul un continent ?", a: ["L'Australie", "Le Canada", "La Russie", "Le Groenland"], correct: 0 },
      { q: "Quel pays nordique est réputé pour ses fjords ?", a: ["La Finlande", "La Norvège", "Le Danemark", "La Suède"], correct: 1 },
      { q: "Quelle est la plus haute montagne d'Afrique ?", a: ["L'Atlas", "Le mont Kenya", "Le Ruwenzori", "Le Kilimandjaro"], correct: 3 },
      { q: "Quel passage maritime sépare l'Espagne du Maroc ?", a: ["Le pas de Calais", "Les Dardanelles", "Le détroit de Gibraltar", "Le Bosphore"], correct: 2 },
      { q: "Quelle est la capitale de la Belgique ?", a: ["Bruxelles", "Liège", "Gand", "Anvers"], correct: 0 },
    ],
    enfant: [
      { q: "Quelle est la capitale de la France ?", a: ["Nice", "Marseille", "Lyon", "Paris"], correct: 3 },
      { q: "Quel animal vit sur la banquise ?", a: ["Le manchot", "Le kangourou", "Le chameau", "Le lion"], correct: 0 },
      { q: "Quelle est la plus grande étendue d'eau salée ?", a: ["La rivière", "L'océan", "Le lac", "La mare"], correct: 1 },
      { q: "Sur quel continent vivent les lions et les éléphants sauvages ?", a: ["L'Europe", "L'Australie", "L'Afrique", "L'Antarctique"], correct: 2 },
      { q: "Comment s'appelle l'étoile qui nous éclaire le jour ?", a: ["Vénus", "La Lune", "Mars", "Le Soleil"], correct: 3 },
      { q: "Quel pays a la forme d'une botte ?", a: ["Le Portugal", "L'Espagne", "L'Italie", "La Grèce"], correct: 2 },
      { q: "Dans quel pays se trouve la tour Eiffel ?", a: ["La France", "L'Italie", "L'Espagne", "L'Allemagne"], correct: 0 },
      { q: "Quel grand animal d'Afrique a une longue trompe ?", a: ["Le pingouin", "L'éléphant", "Le kangourou", "L'ours blanc"], correct: 1 },
      { q: "Quel animal du désert peut avoir une ou deux bosses ?", a: ["L'ours", "Le chameau", "Le dauphin", "Le pingouin"], correct: 1 },
      { q: "Où vivent les poissons ?", a: ["Dans l'eau", "Dans les arbres", "Dans le sable", "Sous terre"], correct: 0 },
      { q: "Comment appelle-t-on la grande forêt très connue d'Amérique du Sud ?", a: ["La banquise", "La savane", "L'Amazonie", "Le Sahara"], correct: 2 },
      { q: "Comment appelle-t-on une très grande étendue de sable très chaude ?", a: ["La montagne", "La forêt", "La banquise", "Le désert"], correct: 3 },
    ],
  },
  litterature: {
    adulte: [
      { q: "Qui a écrit « Les Misérables » ?", a: ["Émile Zola", "Balzac", "Victor Hugo", "Molière"], correct: 2 },
      { q: "Qui a écrit « Roméo et Juliette » ?", a: ["Shakespeare", "Racine", "Molière", "Goethe"], correct: 0 },
      { q: "Quel détective a été créé par Arthur Conan Doyle ?", a: ["Maigret", "Sherlock Holmes", "Arsène Lupin", "Hercule Poirot"], correct: 1 },
      { q: "Qui a écrit « Germinal » ?", a: ["Flaubert", "Victor Hugo", "Maupassant", "Émile Zola"], correct: 3 },
      { q: "Qui est l'auteur de « Madame Bovary » ?", a: ["Balzac", "Stendhal", "Zola", "Gustave Flaubert"], correct: 3 },
      { q: "Qui a écrit « Les Fleurs du mal » ?", a: ["Apollinaire", "Rimbaud", "Baudelaire", "Verlaine"], correct: 2 },
      { q: "Qui a écrit « Le Comte de Monte-Cristo » ?", a: ["Alexandre Dumas", "Honoré de Balzac", "Stendhal", "Jules Verne"], correct: 0 },
      { q: "Qui a imaginé « Vingt mille lieues sous les mers » ?", a: ["H.G. Wells", "Jules Verne", "Daniel Defoe", "Lewis Carroll"], correct: 1 },
      { q: "Qui a écrit la pièce « Le Misanthrope » ?", a: ["Racine", "Corneille", "Beaumarchais", "Molière"], correct: 3 },
      { q: "Quel personnage de Cervantès combat des moulins à vent ?", a: ["Gargantua", "Sancho Pança", "Don Quichotte", "Ulysse"], correct: 2 },
      { q: "Qui a écrit « À la recherche du temps perdu » ?", a: ["Marcel Proust", "Albert Camus", "André Gide", "Jean-Paul Sartre"], correct: 0 },
      { q: "Quel romancier a créé le gentleman cambrioleur Arsène Lupin ?", a: ["Marcel Pagnol", "Maurice Leblanc", "Georges Simenon", "Gaston Leroux"], correct: 1 },
      { q: "Qui a écrit le roman « L'Étranger » ?", a: ["Albert Camus", "Jean-Paul Sartre", "Boris Vian", "Marcel Aymé"], correct: 0 },
      { q: "Quel poète est l'auteur du « Dormeur du val » ?", a: ["Paul Verlaine", "Alfred de Musset", "Arthur Rimbaud", "Paul Éluard"], correct: 2 },
      { q: "Qui a écrit « Notre-Dame de Paris » ?", a: ["Balzac", "Victor Hugo", "Zola", "Flaubert"], correct: 1 },
      { q: "Qui a écrit « Le Rouge et le Noir » ?", a: ["Maupassant", "Balzac", "Flaubert", "Stendhal"], correct: 3 },
      { q: "Qui a écrit « Le Père Goriot » ?", a: ["Zola", "Dumas", "Balzac", "Hugo"], correct: 2 },
      { q: "Qui a écrit la fable « Le Corbeau et le Renard » ?", a: ["Florian", "Charles Perrault", "Ésope", "Jean de La Fontaine"], correct: 3 },
      { q: "Qui a écrit « Les Trois Mousquetaires » ?", a: ["Jules Verne", "Alexandre Dumas", "Stendhal", "Victor Hugo"], correct: 1 },
      { q: "Qui a écrit « Bel-Ami » ?", a: ["Maupassant", "Flaubert", "Daudet", "Zola"], correct: 0 },
      { q: "Quel dramaturge a écrit la pièce « Le Cid » ?", a: ["Molière", "Corneille", "Racine", "Voltaire"], correct: 1 },
      { q: "Qui a écrit la tragédie « Phèdre » ?", a: ["Beaumarchais", "Molière", "Corneille", "Racine"], correct: 3 },
      { q: "Qui a écrit le conte philosophique « Candide » ?", a: ["Voltaire", "Diderot", "Rousseau", "Montesquieu"], correct: 0 },
      { q: "Qui a écrit la pièce « Cyrano de Bergerac » ?", a: ["Alfred de Musset", "Beaumarchais", "Edmond Rostand", "Victor Hugo"], correct: 2 },
      { q: "Qui a écrit « L'Île au trésor » ?", a: ["Robert Louis Stevenson", "Daniel Defoe", "Jack London", "Mark Twain"], correct: 0 },
      { q: "Qui a écrit « Robinson Crusoé » ?", a: ["Stevenson", "Daniel Defoe", "Jonathan Swift", "Mark Twain"], correct: 1 },
      { q: "Qui a écrit « Les Aventures de Tom Sawyer » ?", a: ["Steinbeck", "Hemingway", "Jack London", "Mark Twain"], correct: 3 },
      { q: "Quel poète a écrit « Demain, dès l'aube » ?", a: ["Verlaine", "Vigny", "Victor Hugo", "Lamartine"], correct: 2 },
      { q: "Quel écrivain russe a écrit « Guerre et Paix » ?", a: ["Tolstoï", "Pouchkine", "Tchekhov", "Dostoïevski"], correct: 0 },
      { q: "Quel écrivain russe a écrit « Crime et Châtiment » ?", a: ["Gogol", "Tourgueniev", "Dostoïevski", "Tolstoï"], correct: 2 },
      { q: "Qui a écrit la tragédie « Hamlet » ?", a: ["Molière", "Goethe", "Ibsen", "Shakespeare"], correct: 3 },
      { q: "Qui a écrit la pièce « Faust » ?", a: ["Kafka", "Goethe", "Thomas Mann", "Schiller"], correct: 1 },
      { q: "Qui a écrit la pièce « En attendant Godot » ?", a: ["Samuel Beckett", "Sartre", "Ionesco", "Anouilh"], correct: 0 },
      { q: "Quelle romancière anglaise a écrit « Orgueil et Préjugés » ?", a: ["Virginia Woolf", "Emily Brontë", "George Eliot", "Jane Austen"], correct: 3 },
      { q: "Quel écrivain a créé le personnage d'Oliver Twist ?", a: ["Thomas Hardy", "Walter Scott", "Charles Dickens", "H.G. Wells"], correct: 2 },
      { q: "Qui a écrit « Le Vieil Homme et la Mer » ?", a: ["Faulkner", "Hemingway", "Steinbeck", "Fitzgerald"], correct: 1 },
      { q: "Quelle romancière a créé le détective Hercule Poirot ?", a: ["P.D. James", "Ruth Rendell", "Agatha Christie", "Patricia Cornwell"], correct: 2 },
      { q: "Quel commissaire est le héros des romans de Georges Simenon ?", a: ["San-Antonio", "Maigret", "Nestor Burma", "Rouletabille"], correct: 1 },
      { q: "Qui a écrit « Voyage au centre de la Terre » ?", a: ["H.G. Wells", "Daniel Defoe", "Lewis Carroll", "Jules Verne"], correct: 3 },
      { q: "Quel auteur a écrit les contes mettant en scène « Le Petit Chose » ?", a: ["Alphonse Daudet", "Hector Malot", "Jules Renard", "Erckmann"], correct: 0 },
      { q: "Quel philosophe a écrit « Du contrat social » ?", a: ["Diderot", "Voltaire", "Montesquieu", "Rousseau"], correct: 3 },
      { q: "Quel auteur britannique a écrit « Le Seigneur des anneaux » ?", a: ["C.S. Lewis", "J.R.R. Tolkien", "George R.R. Martin", "Lewis Carroll"], correct: 1 },
      { q: "Quelle autrice a écrit la saga « Harry Potter » ?", a: ["J.K. Rowling", "Enid Blyton", "Roald Dahl", "Stephenie Meyer"], correct: 0 },
      { q: "Quel poète romantique a écrit « Le Lac » ?", a: ["Musset", "Hugo", "Lamartine", "Vigny"], correct: 2 },
      { q: "Quel écrivain de la Renaissance a créé le géant Gargantua ?", a: ["Ronsard", "Rabelais", "Montaigne", "du Bellay"], correct: 1 },
      { q: "Quel philosophe grec fut le maître de Platon ?", a: ["Épicure", "Aristote", "Socrate", "Pythagore"], correct: 2 },
      { q: "Quel poète de l'Antiquité a composé « L'Odyssée » ?", a: ["Ovide", "Sophocle", "Virgile", "Homère"], correct: 3 },
      { q: "Quel écrivain a créé le personnage de Robinson sur une île déserte ?", a: ["Daniel Defoe", "Jules Verne", "Jack London", "Stevenson"], correct: 0 },
    ],
    enfant: [
      { q: "Qui a écrit l'histoire du « Petit Prince » ?", a: ["Molière", "Saint-Exupéry", "Victor Hugo", "Zola"], correct: 1 },
      { q: "Quelle fillette apporte un panier à sa grand-mère et rencontre un loup ?", a: ["Alice", "Blanche-Neige", "Cendrillon", "Le Petit Chaperon rouge"], correct: 3 },
      { q: "Combien de nains accompagnent Blanche-Neige ?", a: ["7", "5", "9", "3"], correct: 0 },
      { q: "Quel pantin a un long nez quand il ment ?", a: ["Peter Pan", "Tintin", "Pinocchio", "Aladdin"], correct: 2 },
      { q: "Qui perd une pantoufle de verre au bal ?", a: ["Cendrillon", "Alice", "Raiponce", "Mulan"], correct: 0 },
      { q: "Quel petit reporter a un chien nommé Milou ?", a: ["Spirou", "Tintin", "Astérix", "Gaston"], correct: 1 },
      { q: "Quel garçon refuse de grandir au Pays imaginaire ?", a: ["Pinocchio", "Aladdin", "Peter Pan", "Mowgli"], correct: 2 },
      { q: "Quel petit ours adore le miel avec son ami Porcinet ?", a: ["Baloo", "Paddington", "Petit Ours brun", "Winnie l'ourson"], correct: 3 },
      { q: "Dans quel conte une princesse dort cent ans après s'être piquée ?", a: ["La Belle au bois dormant", "Alice", "Cendrillon", "Raiponce"], correct: 0 },
      { q: "Quelle héroïne de conte a une très longue chevelure dans une tour ?", a: ["Boucle d'or", "Cendrillon", "Raiponce", "Alice"], correct: 2 },
      { q: "Quel héros de conte sème des cailloux pour retrouver son chemin ?", a: ["Pinocchio", "Le Petit Poucet", "Peter Pan", "Aladdin"], correct: 1 },
      { q: "Dans quel conte un loup souffle pour détruire des maisons ?", a: ["Les Trois Ours", "Les Trois Brigands", "Les Trois Mousquetaires", "Les Trois Petits Cochons"], correct: 3 },
    ],
  },
  sciences: {
    adulte: [
      { q: "Quelle planète est la plus proche du Soleil ?", a: ["Mercure", "La Terre", "Mars", "Vénus"], correct: 0 },
      { q: "Combien d'os compte un corps humain adulte ?", a: ["256", "206", "306", "156"], correct: 1 },
      { q: "Quel gaz les plantes absorbent-elles le jour ?", a: ["L'hélium", "L'oxygène", "Le dioxyde de carbone", "L'azote"], correct: 2 },
      { q: "Quel métal est liquide à température ambiante ?", a: ["Le fer", "Le plomb", "Le cuivre", "Le mercure"], correct: 3 },
      { q: "Quelle est la vitesse approximative de la lumière ?", a: ["30 km/s", "300 000 km/s", "3 000 km/s", "300 km/h"], correct: 1 },
      { q: "Quel est le symbole chimique de l'or ?", a: ["Ag", "Or", "Go", "Au"], correct: 3 },
      { q: "Quel gaz est le plus présent dans l'air que nous respirons ?", a: ["L'azote", "L'oxygène", "Le dioxyde de carbone", "L'hydrogène"], correct: 0 },
      { q: "Quel organe pompe le sang dans tout le corps ?", a: ["Les poumons", "Le foie", "Le cœur", "Les reins"], correct: 2 },
      { q: "Quelle est la formule chimique de l'eau ?", a: ["NaCl", "CO2", "H2O", "O2"], correct: 2 },
      { q: "Quelle planète est surnommée la planète rouge ?", a: ["Vénus", "Mars", "Saturne", "Jupiter"], correct: 1 },
      { q: "Qui a formulé la théorie de la relativité ?", a: ["Galilée", "Niels Bohr", "Isaac Newton", "Albert Einstein"], correct: 3 },
      { q: "Quelle est la plus grande planète du système solaire ?", a: ["Jupiter", "Saturne", "Neptune", "La Terre"], correct: 0 },
      { q: "Quelle physicienne a reçu deux prix Nobel ?", a: ["Ada Lovelace", "Rosalind Franklin", "Lise Meitner", "Marie Curie"], correct: 3 },
      { q: "Quel est l'os le plus long du corps humain ?", a: ["L'humérus", "Le fémur", "Le tibia", "La clavicule"], correct: 1 },
      { q: "Quel est le symbole chimique du carbone ?", a: ["C", "Co", "Ca", "Cr"], correct: 0 },
      { q: "Combien de planètes compte le système solaire ?", a: ["10", "9", "8", "7"], correct: 2 },
      { q: "Quel astre se trouve au centre du système solaire ?", a: ["Jupiter", "Le Soleil", "La Lune", "La Terre"], correct: 1 },
      { q: "Quel savant anglais a énoncé la loi de la gravitation universelle ?", a: ["Einstein", "Kepler", "Newton", "Galilée"], correct: 2 },
      { q: "Quel gaz les humains rejettent-ils en expirant ?", a: ["L'azote", "L'oxygène", "L'hélium", "Le dioxyde de carbone"], correct: 3 },
      { q: "Quel organe nous permet de respirer ?", a: ["Les poumons", "Les reins", "Le foie", "L'estomac"], correct: 0 },
      { q: "Combien de dents possède un adulte, dents de sagesse comprises ?", a: ["36", "30", "28", "32"], correct: 3 },
      { q: "À quelle température l'eau bout-elle au niveau de la mer ?", a: ["90 °C", "100 °C", "50 °C", "120 °C"], correct: 1 },
      { q: "À quelle température l'eau gèle-t-elle ?", a: ["-10 °C", "10 °C", "0 °C", "5 °C"], correct: 2 },
      { q: "Quel est le plus grand animal du monde ?", a: ["La baleine bleue", "Le requin blanc", "La girafe", "L'éléphant"], correct: 0 },
      { q: "Quel métal sert principalement à fabriquer l'acier ?", a: ["L'aluminium", "Le cuivre", "Le fer", "Le zinc"], correct: 2 },
      { q: "Quelle planète est entourée de grands anneaux bien visibles ?", a: ["Mercure", "Mars", "Vénus", "Saturne"], correct: 3 },
      { q: "Quel savant français a mis au point le vaccin contre la rage ?", a: ["Robert Koch", "Louis Pasteur", "Edward Jenner", "Claude Bernard"], correct: 1 },
      { q: "Quel médecin a découvert la pénicilline ?", a: ["Alexander Fleming", "Koch", "Darwin", "Pasteur"], correct: 0 },
      { q: "Quelle théorie Charles Darwin a-t-il rendue célèbre ?", a: ["L'évolution des espèces", "La génétique", "La relativité", "La gravitation"], correct: 0 },
      { q: "Quel gaz indispensable à la vie respirons-nous ?", a: ["Le méthane", "L'hélium", "L'azote", "L'oxygène"], correct: 3 },
      { q: "Quel est l'organe principal du système nerveux ?", a: ["La rate", "Le foie", "Le cerveau", "Le cœur"], correct: 2 },
      { q: "Quel astre tourne autour de la Terre ?", a: ["Vénus", "La Lune", "Le Soleil", "Mars"], correct: 1 },
      { q: "Combien de temps met la Terre pour faire le tour du Soleil ?", a: ["Dix ans", "Un an", "Un jour", "Un mois"], correct: 1 },
      { q: "Quel savant affirma que la Terre tourne autour du Soleil ?", a: ["Copernic", "Newton", "Ptolémée", "Aristote"], correct: 0 },
      { q: "De quel élément les étoiles sont-elles principalement composées ?", a: ["De glace", "De métal", "De gaz", "De roche"], correct: 2 },
      { q: "Quel appareil sert à observer les astres lointains ?", a: ["Le microscope", "Le baromètre", "Le périscope", "Le télescope"], correct: 3 },
      { q: "Quel appareil permet de grossir les objets minuscules ?", a: ["Le télescope", "Le sonar", "Le radar", "Le microscope"], correct: 3 },
      { q: "Quel os protège le cerveau ?", a: ["Les côtes", "La colonne vertébrale", "Le crâne", "Le bassin"], correct: 2 },
      { q: "Combien de cavités compte le cœur humain ?", a: ["Cinq", "Quatre", "Deux", "Trois"], correct: 1 },
      { q: "Quel liquide rouge circule dans nos vaisseaux ?", a: ["Le sang", "La sève", "La lymphe", "L'eau"], correct: 0 },
      { q: "Que produisent principalement les panneaux solaires ?", a: ["De l'essence", "De l'électricité", "Du gaz", "De la chaleur seule"], correct: 1 },
      { q: "Quelle planète est la plus éloignée du Soleil ?", a: ["Neptune", "Saturne", "Uranus", "Mars"], correct: 0 },
      { q: "Quel est l'élément chimique le plus léger ?", a: ["Le carbone", "L'hélium", "L'oxygène", "L'hydrogène"], correct: 3 },
      { q: "Quel astre provoque principalement les marées sur Terre ?", a: ["Le vent", "Le Soleil seul", "La Lune", "Les nuages"], correct: 2 },
      { q: "Quel sens utilise-t-on principalement avec le nez ?", a: ["Le toucher", "L'ouïe", "L'odorat", "Le goût"], correct: 2 },
      { q: "Combien de couleurs distingue-t-on dans un arc-en-ciel ?", a: ["Six", "Cinq", "Huit", "Sept"], correct: 3 },
      { q: "Quel animal est réputé pour changer de couleur ?", a: ["Le caméléon", "Le hibou", "Le castor", "Le crapaud"], correct: 0 },
      { q: "Quel savant italien perfectionna la lunette pour observer le ciel ?", a: ["Copernic", "Galilée", "Newton", "Kepler"], correct: 1 },
    ],
    enfant: [
      { q: "Combien de pattes a une araignée ?", a: ["6", "10", "8", "4"], correct: 2 },
      { q: "Sur quelle planète vivons-nous ?", a: ["La Lune", "Mars", "Jupiter", "La Terre"], correct: 3 },
      { q: "De quelle couleur est le ciel par beau temps ?", a: ["Bleu", "Jaune", "Rouge", "Vert"], correct: 0 },
      { q: "Que faut-il donner à une plante pour qu'elle pousse ?", a: ["Du papier", "De l'eau", "Du sel", "Du sable"], correct: 1 },
      { q: "Quel animal pond des œufs et fait « cocorico » ?", a: ["Le canard", "Le cheval", "Le coq", "Le chat"], correct: 2 },
      { q: "Combien de doigts as-tu sur une main ?", a: ["3", "6", "4", "5"], correct: 3 },
      { q: "Quel astre éclaire le ciel pendant la nuit ?", a: ["La Lune", "Le Soleil", "Une comète", "Un nuage"], correct: 0 },
      { q: "Que devient l'eau quand il fait très froid ?", a: ["De la vapeur", "De la glace", "De la fumée", "Du sable"], correct: 1 },
      { q: "Combien de pattes a un chat ?", a: ["Huit", "Deux", "Quatre", "Six"], correct: 2 },
      { q: "Que mange une vache ?", a: ["De l'herbe", "Des insectes", "De la viande", "Du poisson"], correct: 0 },
      { q: "Quel animal fait « coin coin » ?", a: ["La vache", "Le chat", "Le chien", "Le canard"], correct: 3 },
      { q: "Quelle partie de la plante pousse sous la terre ?", a: ["Les fleurs", "Les racines", "Les feuilles", "Les fruits"], correct: 1 },
    ],
  },
  musique: {
    adulte: [
      { q: "Quel instrument possède 88 touches ?", a: ["Le piano", "Le clavecin", "L'orgue", "L'accordéon"], correct: 0 },
      { q: "Qui a composé l'« Hymne à la joie » (9e symphonie) ?", a: ["Mozart", "Bach", "Vivaldi", "Beethoven"], correct: 3 },
      { q: "Qui a composé le « Boléro » ?", a: ["Saint-Saëns", "Maurice Ravel", "Berlioz", "Debussy"], correct: 1 },
      { q: "Combien de notes compte la gamme de musique ?", a: ["6", "5", "7", "8"], correct: 2 },
      { q: "Quel groupe a chanté « Hey Jude » ?", a: ["ABBA", "Les Beatles", "Queen", "Les Rolling Stones"], correct: 1 },
      { q: "Quel instrument joue-t-on avec un archet ?", a: ["La trompette", "La flûte", "Le piano", "Le violon"], correct: 3 },
      { q: "Qui a composé « La Flûte enchantée » ?", a: ["Mozart", "Bach", "Haydn", "Schubert"], correct: 0 },
      { q: "Quel instrument à vent possède une anche simple ?", a: ["La harpe", "Le cor", "La clarinette", "La trompette"], correct: 2 },
      { q: "Quelle chanteuse française était surnommée « la Môme » ?", a: ["Dalida", "Barbara", "Édith Piaf", "Mireille Mathieu"], correct: 2 },
      { q: "Quel groupe britannique a chanté « Bohemian Rhapsody » ?", a: ["The Who", "Led Zeppelin", "Pink Floyd", "Queen"], correct: 3 },
      { q: "Quel est le plus grave des instruments à cordes de l'orchestre ?", a: ["La contrebasse", "L'alto", "Le violon", "La harpe"], correct: 0 },
      { q: "De quel pays l'opéra est-il originaire ?", a: ["La France", "L'Italie", "La Russie", "L'Allemagne"], correct: 1 },
      { q: "Quel chanteur américain est surnommé « le King » ?", a: ["Chuck Berry", "Buddy Holly", "Elvis Presley", "Ray Charles"], correct: 2 },
      { q: "Quel grand instrument à clavier trouve-t-on dans les églises ?", a: ["L'orgue", "L'accordéon", "Le clavecin", "Le piano"], correct: 0 },
      { q: "Qui a composé « Les Quatre Saisons » ?", a: ["Bach", "Corelli", "Haendel", "Vivaldi"], correct: 3 },
      { q: "Qui a composé la bagatelle « Pour Élise » ?", a: ["Schubert", "Beethoven", "Chopin", "Mozart"], correct: 1 },
      { q: "Qui a composé le ballet « Casse-Noisette » ?", a: ["Tchaïkovski", "Stravinsky", "Borodine", "Prokofiev"], correct: 0 },
      { q: "Qui a composé l'opéra « Carmen » ?", a: ["Gounod", "Bizet", "Offenbach", "Massenet"], correct: 1 },
      { q: "Quel compositeur baroque est l'auteur de nombreuses fugues pour orgue ?", a: ["Mozart", "Verdi", "Chopin", "Bach"], correct: 3 },
      { q: "Combien de cordes possède un violon ?", a: ["Trois", "Cinq", "Quatre", "Six"], correct: 2 },
      { q: "Quel grand instrument à cordes pincées se joue posé au sol ?", a: ["Le luth", "Le banjo", "La mandoline", "La harpe"], correct: 3 },
      { q: "Quel instrument à vent en cuivre possède une coulisse ?", a: ["Le trombone", "Le cor", "La trompette", "Le tuba"], correct: 0 },
      { q: "Quel instrument à clavier produit le son par des cordes frappées ?", a: ["L'accordéon", "Le piano", "Le clavecin", "L'orgue"], correct: 1 },
      { q: "Quel groupe a enregistré l'album « Abbey Road » ?", a: ["The Who", "Queen", "Les Beatles", "Les Rolling Stones"], correct: 2 },
      { q: "Quel membre des Beatles est l'auteur de la chanson « Imagine » ?", a: ["Paul McCartney", "John Lennon", "George Harrison", "Ringo Starr"], correct: 1 },
      { q: "Quelle chanteuse américaine est surnommée « la reine de la pop » ?", a: ["Madonna", "Whitney Houston", "Tina Turner", "Cher"], correct: 0 },
      { q: "Quel artiste américain a chanté « Thriller » ?", a: ["James Brown", "Stevie Wonder", "Prince", "Michael Jackson"], correct: 3 },
      { q: "Quel chanteur belge a interprété « Ne me quitte pas » ?", a: ["Léo Ferré", "Yves Montand", "Jacques Brel", "Georges Brassens"], correct: 2 },
      { q: "Quel chanteur français est l'auteur de « La Bohème » ?", a: ["Charles Aznavour", "Sacha Distel", "Gilbert Bécaud", "Jacques Brel"], correct: 0 },
      { q: "Quel auteur-compositeur a chanté « Les Copains d'abord » ?", a: ["Trenet", "Léo Ferré", "Brel", "Georges Brassens"], correct: 3 },
      { q: "Quelle note de musique vient juste après « do » ?", a: ["Si", "Mi", "Ré", "La"], correct: 2 },
      { q: "Combien de lignes compte une portée musicale ?", a: ["Sept", "Cinq", "Six", "Quatre"], correct: 1 },
      { q: "Comment appelle-t-on une œuvre pour orchestre en plusieurs mouvements ?", a: ["Une sonate", "Une valse", "Une fugue", "Une symphonie"], correct: 3 },
      { q: "Quel signe indique d'élever une note d'un demi-ton ?", a: ["Le bémol", "Le bécarre", "Le dièse", "La clé"], correct: 2 },
      { q: "Quelle clé musicale est employée pour les sons aigus ?", a: ["La clé de sol", "La clé de fa", "La clé plate", "La clé anglaise"], correct: 0 },
      { q: "Quel style musical est né à La Nouvelle-Orléans ?", a: ["Le reggae", "Le jazz", "La salsa", "Le rock"], correct: 1 },
      { q: "De quel pays le reggae est-il originaire ?", a: ["Cuba", "Le Brésil", "La Jamaïque", "Le Mexique"], correct: 2 },
      { q: "De quel pays le flamenco est-il originaire ?", a: ["Le Portugal", "La Grèce", "L'Italie", "L'Espagne"], correct: 3 },
      { q: "De quel pays le tango est-il originaire ?", a: ["L'Argentine", "Cuba", "Le Brésil", "Le Mexique"], correct: 0 },
      { q: "Quel instrument à cordes est associé à la musique country américaine ?", a: ["Le bouzouki", "Le banjo", "La cornemuse", "Le sitar"], correct: 1 },
      { q: "Quel instrument à vent écossais comporte un sac d'air ?", a: ["La flûte", "La clarinette", "Le hautbois", "La cornemuse"], correct: 3 },
      { q: "Quel compositeur prodige composa enfant et mourut jeune au XVIIIe siècle ?", a: ["Haydn", "Schubert", "Mozart", "Salieri"], correct: 2 },
      { q: "Quel groupe suédois a chanté « Dancing Queen » ?", a: ["ABBA", "Ace of Base", "Roxette", "A-ha"], correct: 0 },
      { q: "Quel instrument possède un clavier et un soufflet que l'on étire ?", a: ["L'orgue", "L'accordéon", "Le piano", "Le clavecin"], correct: 1 },
      { q: "Quel instrument donne le « la » à l'orchestre pour s'accorder ?", a: ["Le violon", "La flûte", "Le hautbois", "La trompette"], correct: 2 },
      { q: "Quelle voix d'homme est la plus aiguë ?", a: ["La basse", "Le ténor", "Le baryton", "La basse profonde"], correct: 1 },
      { q: "Quelle voix de femme est la plus aiguë ?", a: ["La mezzo", "L'alto", "Le contralto", "La soprano"], correct: 3 },
      { q: "Quel mot désigne la vitesse d'exécution d'un morceau ?", a: ["Le tempo", "Le silence", "Le timbre", "Le ton"], correct: 0 },
    ],
    enfant: [
      { q: "Quel instrument a des touches noires et blanches ?", a: ["Le piano", "Le tambour", "La guitare", "La flûte"], correct: 0 },
      { q: "Avec quoi joue-t-on du tambour ?", a: ["Un archet", "Un clavier", "Une corde", "Des baguettes"], correct: 3 },
      { q: "Dans la chanson, « Frère Jacques », que fais-tu ?", a: ["Tu sautes", "Tu manges", "Tu dors", "Tu cours"], correct: 2 },
      { q: "Quel instrument souffle-t-on pour jouer ?", a: ["Le piano", "La trompette", "Le violon", "Le triangle"], correct: 1 },
      { q: "Comment appelle-t-on une personne qui chante ?", a: ["Un acteur", "Un danseur", "Un chanteur", "Un peintre"], correct: 2 },
      { q: "Combien de cordes a une guitare ?", a: ["3", "1", "10", "6"], correct: 3 },
      { q: "Quel objet rond tourne sur une platine pour jouer de la musique ?", a: ["Un livre", "Un disque", "Une assiette", "Une roue"], correct: 1 },
      { q: "Comment appelle-t-on celui qui dirige les musiciens, baguette en main ?", a: ["Le chef d'orchestre", "Le boulanger", "Le jardinier", "Le facteur"], correct: 0 },
      { q: "Quel petit instrument secoue-t-on pour faire du bruit ?", a: ["Les maracas", "La harpe", "Le piano", "Le violon"], correct: 0 },
      { q: "Que fait-on avec ses mains pour féliciter un artiste ?", a: ["On souffle", "On dort", "On applaudit", "On siffle"], correct: 2 },
      { q: "Quelle comptine parle d'une petite bête qui grimpe le long d'une gouttière ?", a: ["Au clair de la lune", "Une souris verte", "Frère Jacques", "L'araignée Gipsy"], correct: 3 },
      { q: "Avec quel petit objet le chef donne-t-il le rythme aux musiciens ?", a: ["Un marteau", "Une baguette", "Un crayon", "Une cuillère"], correct: 1 },
    ],
  },
  cinema: {
    adulte: [
      { q: "Qui a réalisé le film « Titanic » ?", a: ["James Cameron", "Steven Spielberg", "Ridley Scott", "George Lucas"], correct: 0 },
      { q: "Quel acteur incarne « Forrest Gump » ?", a: ["Robert De Niro", "Brad Pitt", "Tom Cruise", "Tom Hanks"], correct: 3 },
      { q: "Quel studio a créé « Toy Story » ?", a: ["DreamWorks", "Disney", "Pixar", "Illumination"], correct: 2 },
      { q: "Quelle saga se déroule « dans une galaxie lointaine » ?", a: ["Avatar", "Star Wars", "Dune", "Star Trek"], correct: 1 },
      { q: "Quel héros porte un chapeau et un fouet pour chasser les trésors ?", a: ["Indiana Jones", "Lara Croft", "James Bond", "Zorro"], correct: 0 },
      { q: "Quelle grande récompense du cinéma américain est remise chaque année ?", a: ["Le Lion d'or", "La Palme d'or", "Le César", "L'Oscar"], correct: 3 },
      { q: "Qui a réalisé « E.T. l'extra-terrestre » ?", a: ["Ridley Scott", "Steven Spielberg", "James Cameron", "George Lucas"], correct: 1 },
      { q: "Dans quelle ville a lieu le plus célèbre festival du film français ?", a: ["Deauville", "Annecy", "Cannes", "Avignon"], correct: 2 },
      { q: "Quel acteur incarne le boxeur « Rocky » ?", a: ["Sylvester Stallone", "Bruce Willis", "Kurt Russell", "Mel Gibson"], correct: 0 },
      { q: "Quel film d'animation Pixar suit un cuisinier dans un restaurant parisien ?", a: ["Vice-versa", "Ratatouille", "Coco", "Là-haut"], correct: 1 },
      { q: "Quel réalisateur est célèbre pour ses films à suspense comme « Psychose » ?", a: ["Orson Welles", "Tim Burton", "Alfred Hitchcock", "Stanley Kubrick"], correct: 2 },
      { q: "Quel acteur fut le tout premier à jouer James Bond au cinéma ?", a: ["Daniel Craig", "Pierce Brosnan", "Roger Moore", "Sean Connery"], correct: 3 },
      { q: "Quelle trilogie de Peter Jackson se déroule en Terre du Milieu ?", a: ["Le Hobbit", "Narnia", "Le Seigneur des anneaux", "Harry Potter"], correct: 2 },
      { q: "Quel célèbre film met en scène des dinosaures vivants sur une île ?", a: ["Avatar", "Godzilla", "King Kong", "Jurassic Park"], correct: 3 },
      { q: "Qui a réalisé « La Liste de Schindler » ?", a: ["Coppola", "Steven Spielberg", "Kubrick", "Scorsese"], correct: 1 },
      { q: "Qui a réalisé la trilogie « Le Parrain » ?", a: ["Francis Ford Coppola", "De Palma", "Spielberg", "Scorsese"], correct: 0 },
      { q: "Quel acteur incarne le capitaine Jack Sparrow dans « Pirates des Caraïbes » ?", a: ["Tom Cruise", "Brad Pitt", "Orlando Bloom", "Johnny Depp"], correct: 3 },
      { q: "Quel film d'animation Disney met en scène le lionceau Mufasa et son fils ?", a: ["Le Livre de la jungle", "Bambi", "Le Roi lion", "Tarzan"], correct: 2 },
      { q: "Quel acteur fétiche de Scorsese joue dans « Les Affranchis » ?", a: ["Robert De Niro", "Joe Pesci", "Ray Liotta", "Al Pacino"], correct: 0 },
      { q: "De quel pays est issu le cinéma surnommé « Bollywood » ?", a: ["La Chine", "L'Inde", "Le Pakistan", "Le Nigéria"], correct: 1 },
      { q: "Quelle cérémonie récompense le cinéma français chaque année ?", a: ["Les BAFTA", "Les Golden Globes", "Les Oscars", "Les César"], correct: 3 },
      { q: "Quelle récompense suprême est remise au Festival de Cannes ?", a: ["Le Goya", "La Palme d'or", "Le Lion d'or", "L'Ours d'or"], correct: 1 },
      { q: "Quelle actrice française a reçu un Oscar pour le rôle d'Édith Piaf ?", a: ["Juliette Binoche", "Catherine Deneuve", "Marion Cotillard", "Audrey Tautou"], correct: 2 },
      { q: "Quel film de Jean-Pierre Jeunet suit une jeune serveuse rêveuse à Montmartre ?", a: ["Amélie Poulain", "La Haine", "Le Dîner de cons", "Intouchables"], correct: 0 },
      { q: "Quel film raconte l'amitié entre un riche tétraplégique et son aide à domicile ?", a: ["La Grande Vadrouille", "Le Dîner de cons", "Les Ch'tis", "Intouchables"], correct: 3 },
      { q: "Quel comédien français joue dans « La Grande Vadrouille » avec Bourvil ?", a: ["Jean Gabin", "Fernandel", "Louis de Funès", "Coluche"], correct: 2 },
      { q: "Quel humoriste français a fondé les Restos du Cœur ?", a: ["Coluche", "Pierre Richard", "Michel Blanc", "Thierry Lhermitte"], correct: 0 },
      { q: "Quel réalisateur a tourné « Pulp Fiction » et « Kill Bill » ?", a: ["David Fincher", "Quentin Tarantino", "Guy Ritchie", "Robert Rodriguez"], correct: 1 },
      { q: "Quel film de 1999 met en scène Neo découvrant un monde virtuel ?", a: ["Tron", "Matrix", "Inception", "Blade Runner"], correct: 1 },
      { q: "Quel super-héros Marvel est interprété par Robert Downey Jr. ?", a: ["Thor", "Captain America", "Hulk", "Iron Man"], correct: 3 },
      { q: "Quel petit maître Jedi à la peau verte parle de façon inversée ?", a: ["Yoda", "Han Solo", "Dark Vador", "Chewbacca"], correct: 0 },
      { q: "Quel acteur a incarné Indiana Jones au cinéma ?", a: ["Kevin Costner", "Mel Gibson", "Harrison Ford", "Tom Hanks"], correct: 2 },
      { q: "Quelle maison d'animation japonaise a réalisé « Le Voyage de Chihiro » ?", a: ["DreamWorks", "Pixar", "Le Studio Ghibli", "Disney"], correct: 2 },
      { q: "Quel film de 1994 tiré de Stephen King raconte l'amitié de deux détenus ?", a: ["Les Évadés", "Le Fugitif", "Seven", "Forrest Gump"], correct: 0 },
      { q: "Quel acteur autrichien a incarné « Terminator » ?", a: ["Dolph Lundgren", "Arnold Schwarzenegger", "Sylvester Stallone", "Van Damme"], correct: 1 },
      { q: "Quel film de 2009 se déroule sur la planète Pandora avec les Na'vi ?", a: ["Prometheus", "Dune", "Interstellar", "Avatar"], correct: 3 },
      { q: "Quelle souris est le personnage emblématique créé par Walt Disney ?", a: ["Mickey Mouse", "Jerry", "Speedy Gonzales", "Bugs Bunny"], correct: 0 },
      { q: "Quel canard colérique fait partie des héros de Walt Disney ?", a: ["Mickey", "Picsou", "Donald", "Riri"], correct: 2 },
      { q: "Quel film de 1995 fut le premier long métrage entièrement en images de synthèse ?", a: ["Shrek", "Bambi", "Le Roi lion", "Toy Story"], correct: 3 },
      { q: "Quel film de Spielberg met en scène un requin tueur ?", a: ["Anaconda", "Les Dents de la mer", "Orca", "Piranhas"], correct: 1 },
      { q: "Quelle célèbre franchise d'espionnage a pour héros l'agent 007 ?", a: ["OSS 117", "Mission impossible", "James Bond", "Jason Bourne"], correct: 2 },
      { q: "Quel comédien muet portait un chapeau melon et une petite canne ?", a: ["Max Linder", "Charlie Chaplin", "Buster Keaton", "Harold Lloyd"], correct: 1 },
      { q: "Comment appelle-t-on un genre de cinéma destiné à faire peur ?", a: ["Le film d'horreur", "La comédie", "Le documentaire", "Le péplum"], correct: 0 },
      { q: "Comment appelle-t-on la personne qui dirige le tournage d'un film ?", a: ["Le producteur", "Le cadreur", "Le scénariste", "Le réalisateur"], correct: 3 },
      { q: "Comment appelle-t-on l'histoire écrite d'un film avant le tournage ?", a: ["Le générique", "Le scénario", "L'affiche", "Le casting"], correct: 1 },
      { q: "Comment appelle-t-on la courte vidéo qui présente un film à venir ?", a: ["L'affiche", "Le carton", "Le générique", "La bande-annonce"], correct: 3 },
      { q: "Dans quel pays se trouve le quartier de Hollywood ?", a: ["Les États-Unis", "Le Royaume-Uni", "Le Canada", "L'Australie"], correct: 0 },
      { q: "Quel film d'animation Disney raconte l'amour d'une jeune fille et d'un monstre ensorcelé ?", a: ["Mulan", "Cendrillon", "La Belle et la Bête", "Aladdin"], correct: 2 },
    ],
    enfant: [
      { q: "Quel est le héros lion du dessin animé de Disney ?", a: ["Bambi", "Dumbo", "Simba", "Baloo"], correct: 2 },
      { q: "Quel jouet cowboy est le héros de « Toy Story » ?", a: ["Buzz", "Zigzag", "Rex", "Woody"], correct: 3 },
      { q: "De quelle couleur est l'ogre Shrek ?", a: ["Jaune", "Vert", "Rouge", "Bleu"], correct: 1 },
      { q: "Quelle reine des neiges a une sœur nommée Anna ?", a: ["Elsa", "Belle", "Raiponce", "Jasmine"], correct: 0 },
      { q: "Quel petit poisson est recherché par son papa dans le film ?", a: ["Némo", "Dory", "Willy", "Flipper"], correct: 0 },
      { q: "Quel petit robot ramasse des déchets dans un film Pixar ?", a: ["Eve", "C-3PO", "R2-D2", "WALL-E"], correct: 3 },
      { q: "Quel jeune sorcier porte des lunettes rondes et une cicatrice ?", a: ["Aladdin", "Harry Potter", "Tintin", "Pinocchio"], correct: 1 },
      { q: "Quelle petite fille suit un lapin blanc pressé dans un terrier ?", a: ["Raiponce", "Cendrillon", "Alice", "Dorothy"], correct: 2 },
      { q: "Quel éléphant Disney aux grandes oreilles arrive à voler ?", a: ["Dumbo", "Baloo", "Simba", "Bambi"], correct: 0 },
      { q: "Quel jouet spatial s'écrie « Vers l'infini et au-delà » ?", a: ["Rex", "Buzz l'Éclair", "Zigzag", "Woody"], correct: 1 },
      { q: "Quelle voiture de course rouge est la vedette d'un film Pixar ?", a: ["Martin", "Bumblebee", "Flash McQueen", "Herbie"], correct: 2 },
      { q: "Quel panda devient un héros d'arts martiaux dans un dessin animé ?", a: ["Baloo", "King Kong", "Kaa", "Po"], correct: 3 },
    ],
  },
  sport: {
    adulte: [
      { q: "Tous les combien d'années ont lieu les J.O. d'été ?", a: ["3 ans", "2 ans", "4 ans", "5 ans"], correct: 2 },
      { q: "Dans quel sport marque-t-on un « ace » ?", a: ["Le tennis", "La natation", "Le judo", "Le rugby"], correct: 0 },
      { q: "Quel pays a inventé le judo ?", a: ["La Thaïlande", "La Chine", "La Corée", "Le Japon"], correct: 3 },
      { q: "Combien de trous compte un parcours de golf classique ?", a: ["9", "18", "12", "24"], correct: 1 },
      { q: "Combien de joueurs compte une équipe de basket sur le terrain ?", a: ["6", "5", "7", "4"], correct: 1 },
      { q: "Dans quel sport réalise-t-on un « strike » ?", a: ["Le curling", "Le tir à l'arc", "Le bowling", "Le golf"], correct: 2 },
      { q: "Dans quel sport utilise-t-on un ballon ovale ?", a: ["Le basket", "Le handball", "Le volley", "Le rugby"], correct: 3 },
      { q: "Quelle grande course cycliste se déroule chaque mois de juillet ?", a: ["Le Tour de France", "La Vuelta", "Le Giro", "Paris-Roubaix"], correct: 0 },
      { q: "Combien de joueurs compose une équipe de volley sur le terrain ?", a: ["Cinq", "Sept", "Neuf", "Six"], correct: 3 },
      { q: "Quel sport de combat se pratique pieds et poings sur un tatami ?", a: ["La boxe", "La lutte", "Le karaté", "L'escrime"], correct: 2 },
      { q: "Dans quel pays sont nés les Jeux olympiques de l'Antiquité ?", a: ["L'Italie", "La Grèce", "La Turquie", "L'Égypte"], correct: 1 },
      { q: "Combien de minutes dure un match de football réglementaire ?", a: ["Quatre-vingt-dix", "Quarante-cinq", "Soixante", "Cent vingt"], correct: 0 },
      { q: "Quel tournoi de tennis se joue sur gazon près de Londres ?", a: ["Roland-Garros", "Wimbledon", "L'US Open", "L'Open d'Australie"], correct: 1 },
      { q: "Combien de points rapporte un essai au rugby ?", a: ["Cinq", "Sept", "Deux", "Trois"], correct: 0 },
      { q: "Combien de joueurs compte une équipe de rugby à XV sur le terrain ?", a: ["18", "13", "11", "15"], correct: 3 },
      { q: "Dans quel sport utilise-t-on un volant et une raquette légère ?", a: ["Le tennis", "Le padel", "Le badminton", "Le squash"], correct: 2 },
      { q: "Quel sport se joue avec une crosse et un palet sur une patinoire ?", a: ["Le patinage", "Le bobsleigh", "Le curling", "Le hockey sur glace"], correct: 3 },
      { q: "Combien de joueurs compte une équipe de handball sur le terrain ?", a: ["7", "5", "6", "11"], correct: 0 },
      { q: "Quel sport oppose deux cavaliers et un maillet pour pousser une balle ?", a: ["Le cricket", "Le hockey sur gazon", "Le polo", "Le golf"], correct: 2 },
      { q: "Quelle discipline consiste à monter à cheval pour franchir des obstacles ?", a: ["La voltige", "L'équitation", "Le rodéo", "Le polo"], correct: 1 },
      { q: "Dans quel sport s'affrontent deux adversaires sur un ring, en plusieurs rounds ?", a: ["La boxe", "La lutte", "L'escrime", "Le judo"], correct: 0 },
      { q: "Quel sport se pratique avec un fleuret, une épée ou un sabre ?", a: ["Le tir à l'arc", "Le lancer", "Le javelot", "L'escrime"], correct: 3 },
      { q: "Quelle distance parcourt-on lors d'un marathon ?", a: ["10 km", "42 km", "21 km", "100 km"], correct: 1 },
      { q: "Combien d'anneaux figurent sur le drapeau olympique ?", a: ["Quatre", "Six", "Cinq", "Trois"], correct: 2 },
      { q: "Tous les combien d'années a lieu la Coupe du monde de football ?", a: ["Trois ans", "Cinq ans", "Quatre ans", "Deux ans"], correct: 2 },
      { q: "Dans quel pays s'est déroulée la première Coupe du monde de football en 1930 ?", a: ["L'Italie", "L'Uruguay", "La France", "Le Brésil"], correct: 1 },
      { q: "Quel pays a remporté la Coupe du monde de football en 1998 ?", a: ["L'Italie", "L'Allemagne", "Le Brésil", "La France"], correct: 3 },
      { q: "Dans quel sport réalise-t-on un « slam dunk » ?", a: ["Le basket", "Le volley", "Le handball", "Le rugby"], correct: 0 },
      { q: "Quel sport enchaîne natation, vélo puis course à pied ?", a: ["Le triathlon", "Le pentathlon", "Le décathlon", "Le biathlon"], correct: 0 },
      { q: "Quel sport d'hiver combine ski de fond et tir à la carabine ?", a: ["Le curling", "Le biathlon", "Le saut à ski", "Le bobsleigh"], correct: 1 },
      { q: "Sur quelle surface se dispute le tournoi de Roland-Garros ?", a: ["La moquette", "Le gazon", "La terre battue", "Le dur"], correct: 2 },
      { q: "Quelle grande enceinte sportive accueille les Bleus au nord de Paris ?", a: ["Roland-Garros", "Bercy", "Le Parc des Princes", "Le Stade de France"], correct: 3 },
      { q: "De quel pays vient la célèbre équipe de rugby des All Blacks ?", a: ["La Nouvelle-Zélande", "l'Afrique du Sud", "l'Angleterre", "L'Australie"], correct: 0 },
      { q: "Quel sport pratiquait la star américaine Michael Jordan ?", a: ["Le football américain", "Le baseball", "Le basket", "Le tennis"], correct: 2 },
      { q: "Dans quelle discipline le pilote Ayrton Senna s'est-il illustré ?", a: ["Le MotoGP", "Le karting", "Le rallye", "La Formule 1"], correct: 3 },
      { q: "Quelle course automobile d'endurance dure une journée entière en France ?", a: ["Le Grand Prix de Monaco", "Les 24 Heures du Mans", "Le Dakar", "Le Tour Auto"], correct: 1 },
      { q: "Quel sport à la batte, très suivi aux États-Unis, oppose deux équipes de neuf ?", a: ["Le baseball", "Le softball", "Le hockey", "Le cricket"], correct: 0 },
      { q: "Quel sport de batte et de guichet est très populaire en Inde ?", a: ["Le polo", "Le cricket", "Le baseball", "Le golf"], correct: 1 },
      { q: "Combien de joueurs aligne une équipe de football américain sur le terrain ?", a: ["9", "15", "11", "13"], correct: 2 },
      { q: "Quelle nage imite le déplacement d'une grenouille ?", a: ["Le crawl", "Le papillon", "Le dos", "La brasse"], correct: 3 },
      { q: "Comment nomme-t-on l'épreuve où l'athlète franchit une barre à l'aide d'une longue tige flexible ?", a: ["Le triple saut", "Le saut en longueur", "Le saut à la perche", "Le saut en hauteur"], correct: 2 },
      { q: "Quel sport regroupe les lancers de poids, de disque et de javelot ?", a: ["La gymnastique", "Le tir", "L'haltérophilie", "L'athlétisme"], correct: 3 },
      { q: "Quel sport consiste à glisser sur les vagues debout sur une planche ?", a: ["Le kayak", "Le surf", "La voile", "Le ski nautique"], correct: 1 },
      { q: "Quel sport d'hiver se pratique debout sur une seule planche fixée aux pieds ?", a: ["Le snowboard", "La luge", "Le ski", "Le patinage"], correct: 0 },
      { q: "Quelle compétition oppose chaque année les meilleurs clubs de football européens ?", a: ["La Ligue des champions", "La Coupe du monde", "l'Euro", "la Coupe de France"], correct: 0 },
      { q: "Combien de sets gagnants faut-il pour remporter un match masculin en Grand Chelem ?", a: ["Quatre", "Deux", "Cinq", "Trois"], correct: 3 },
      { q: "Quel sport collectif se joue dans l'eau avec un ballon et des buts ?", a: ["L'aviron", "Le water-polo", "La nage synchronisée", "La plongée"], correct: 1 },
      { q: "Quel jeu d'hiver consiste à faire glisser des pierres vers une cible sur la glace ?", a: ["Le hockey", "Le patinage", "Le curling", "Le biathlon"], correct: 2 },
    ],
    enfant: [
      { q: "Avec quelle partie du corps joue-t-on au football ?", a: ["Les coudes", "La tête seulement", "Les pieds", "Les mains"], correct: 2 },
      { q: "Dans quel sport marque-t-on un panier ?", a: ["Le tennis", "Le basket", "La natation", "Le ski"], correct: 1 },
      { q: "Combien de roues a un vélo classique ?", a: ["3", "4", "1", "2"], correct: 3 },
      { q: "Que gagne-t-on quand on finit premier d'une course ?", a: ["Une médaille d'or", "Un filet", "Une raquette", "Un ballon"], correct: 0 },
      { q: "Dans quel sport nage-t-on ?", a: ["Le golf", "La natation", "L'escrime", "Le judo"], correct: 1 },
      { q: "Combien de joueurs y a-t-il dans une équipe de football sur le terrain ?", a: ["9", "7", "11", "5"], correct: 2 },
      { q: "Avec quoi frappe-t-on la balle au tennis ?", a: ["Une raquette", "Une crosse", "Un filet", "Un bâton"], correct: 0 },
      { q: "Quel sport pratique-t-on sur la neige avec deux planches aux pieds ?", a: ["La natation", "Le judo", "Le tennis", "Le ski"], correct: 3 },
      { q: "Quel objet rond frappe-t-on du pied au football ?", a: ["Un palet", "Un volant", "Une raquette", "Un ballon"], correct: 3 },
      { q: "Que met-on sur la tête pour faire du vélo en toute sécurité ?", a: ["Une couronne", "Un casque", "Une casquette", "Un chapeau"], correct: 1 },
      { q: "Quel animal monte-t-on pour faire de l'équitation ?", a: ["Un mouton", "Un chien", "Un cheval", "Une vache"], correct: 2 },
      { q: "Que met-on aux mains pour faire de la boxe ?", a: ["Des gants", "Une raquette", "Des chaussures", "Un casque"], correct: 0 },
    ],
  },
  geopolitique: {
    adulte: [
      { q: "Combien de membres permanents compte le Conseil de sécurité de l'ONU ?", a: ["5", "7", "10", "3"], correct: 0 },
      { q: "Dans quelle ville se trouve le siège de l'ONU ?", a: ["Genève", "New York", "Paris", "Vienne"], correct: 1 },
      { q: "Combien d'étoiles figurent sur le drapeau européen ?", a: ["15", "10", "27", "12"], correct: 3 },
      { q: "Quelle alliance militaire regroupe les pays de l'Atlantique Nord ?", a: ["L'ONU", "L'UE", "L'OTAN", "Le G7"], correct: 2 },
      { q: "Dans quelle ville siègent les institutions de l'Union européenne ?", a: ["Rome", "Bruxelles", "Strasbourg", "Berlin"], correct: 1 },
      { q: "Quel pays était le plus peuplé du monde en 2024 ?", a: ["L'Inde", "La Chine", "Les États-Unis", "L'Indonésie"], correct: 0 },
      { q: "Quel animal est l'emblème des États-Unis ?", a: ["Le bison", "L'ours", "L'aigle", "Le lion"], correct: 2 },
      { q: "Comment appelle-t-on le siège du Parlement britannique ?", a: ["Le Kremlin", "Le Capitole", "Le Reichstag", "Westminster"], correct: 3 },
      { q: "Quel pays a quitté l'Union européenne en 2020 ?", a: ["La Suède", "La Grèce", "Le Royaume-Uni", "La Pologne"], correct: 2 },
      { q: "Dans quel bâtiment travaille le président des États-Unis ?", a: ["La Maison-Blanche", "Le Kremlin", "L'Élysée", "Le Capitole"], correct: 0 },
      { q: "Quelle organisation veille sur la santé à l'échelle mondiale ?", a: ["L'OTAN", "L'OPEP", "L'UNESCO", "L'OMS"], correct: 3 },
      { q: "Combien d'étoiles figurent sur le drapeau américain ?", a: ["Treize", "Cinquante", "Vingt-sept", "Quarante-huit"], correct: 1 },
      { q: "Quel pays voisin de la France est dirigé par un chancelier ?", a: ["La Belgique", "L'Allemagne", "Le Portugal", "L'Espagne"], correct: 1 },
      { q: "Comment nomme-t-on le chef du gouvernement au Royaume-Uni ?", a: ["Le gouverneur", "Le président", "Le chancelier", "Le Premier ministre"], correct: 3 },
      { q: "Combien de pays composent aujourd'hui l'Union européenne ?", a: ["27", "25", "30", "28"], correct: 0 },
      { q: "Quelle est la monnaie utilisée au Royaume-Uni ?", a: ["L'euro", "Le dollar", "La livre sterling", "Le franc"], correct: 2 },
      { q: "Quelle est la monnaie des États-Unis ?", a: ["Le peso", "Le dollar", "L'euro", "La livre"], correct: 1 },
      { q: "Quelle est la monnaie du Japon ?", a: ["Le yen", "Le won", "Le baht", "Le yuan"], correct: 0 },
      { q: "Dans quelle ville se situe la Maison-Blanche ?", a: ["New York", "Philadelphie", "Boston", "Washington"], correct: 3 },
      { q: "Comment s'appelle le palais où réside le président de la République française ?", a: ["Le Louvre", "Versailles", "L'Élysée", "Matignon"], correct: 2 },
      { q: "Comment s'appelle la résidence du Premier ministre français ?", a: ["Matignon", "L'Élysée", "Le Palais-Bourbon", "Le Sénat"], correct: 0 },
      { q: "Quelle institution, élue par le peuple, vote les lois en France ?", a: ["Le Conseil d'État", "Le Sénat", "Le Congrès", "L'Assemblée nationale"], correct: 3 },
      { q: "Combien d'années dure le mandat du président de la République française ?", a: ["Quatre ans", "Cinq ans", "Six ans", "Sept ans"], correct: 1 },
      { q: "Comment appelle-t-on le siège du pouvoir russe, au cœur de Moscou ?", a: ["Le Palais d'Hiver", "La Loubianka", "Le Kremlin", "Le Bolchoï"], correct: 2 },
      { q: "Quel sommet réunit chaque année sept grandes puissances économiques ?", a: ["L'OPEP", "L'ONU", "Le G7", "L'OTAN"], correct: 2 },
      { q: "Quelle organisation regroupe de grands pays exportateurs de pétrole ?", a: ["L'OCDE", "L'OMC", "Le FMI", "L'OPEP"], correct: 3 },
      { q: "Quelle agence de l'ONU est chargée de l'éducation et de la culture ?", a: ["L'OMS", "L'UNESCO", "Le FMI", "L'UNICEF"], correct: 1 },
      { q: "Quelle agence de l'ONU vient en aide aux enfants du monde ?", a: ["L'UNICEF", "Le HCR", "L'UNESCO", "L'OMS"], correct: 0 },
      { q: "Quelle est la langue officielle du Brésil ?", a: ["L'anglais", "Le français", "Le portugais", "L'espagnol"], correct: 2 },
      { q: "Quelle est la langue officielle de l'Argentine ?", a: ["Le français", "L'espagnol", "L'italien", "Le portugais"], correct: 1 },
      { q: "Dans quel pays parle-t-on majoritairement le mandarin ?", a: ["Le Japon", "La Corée", "Le Vietnam", "La Chine"], correct: 3 },
      { q: "Quel pays est aujourd'hui le seul à être dirigé par un empereur ?", a: ["Le Japon", "Le Maroc", "La Thaïlande", "La Chine"], correct: 0 },
      { q: "Quelle ville française partage avec Bruxelles le siège du Parlement européen ?", a: ["Luxembourg", "Strasbourg", "Lille", "Lyon"], correct: 1 },
      { q: "Quel grand fleuve européen traverse Vienne et Budapest ?", a: ["l'Elbe", "Le Rhin", "Le Danube", "Le Rhône"], correct: 2 },
      { q: "Quel minuscule État est entièrement entouré par la ville de Rome ?", a: ["Saint-Marin", "Monaco", "Andorre", "Le Vatican"], correct: 3 },
      { q: "Quelle principauté de la Côte d'Azur est célèbre pour son casino ?", a: ["Monaco", "Liechtenstein", "Saint-Marin", "Andorre"], correct: 0 },
      { q: "Quel pays réunit l'Angleterre, l'Écosse, le pays de Galles et l'Irlande du Nord ?", a: ["Le Royaume-Uni", "la Scandinavie", "l'Irlande", "les Pays-Bas"], correct: 0 },
      { q: "Quelle est la capitale des Pays-Bas ?", a: ["Rotterdam", "Amsterdam", "Utrecht", "La Haye"], correct: 1 },
      { q: "Quel pays neutre, hors de l'UE, accueille l'ONU à Genève ?", a: ["La Norvège", "L'Autriche", "La Suisse", "La Belgique"], correct: 2 },
      { q: "Dans quelle ville se trouve le siège européen de l'ONU ?", a: ["Bruxelles", "La Haye", "Vienne", "Genève"], correct: 3 },
      { q: "Quelle ville néerlandaise abrite la Cour internationale de justice ?", a: ["Rotterdam", "Bruxelles", "La Haye", "Amsterdam"], correct: 2 },
      { q: "Quel oiseau est souvent utilisé comme symbole de la paix ?", a: ["L'aigle", "La colombe", "Le faucon", "Le corbeau"], correct: 1 },
      { q: "Quel texte adopté par l'ONU en 1948 protège les libertés de chacun ?", a: ["La Déclaration universelle des droits de l'homme", "La Magna Carta", "Le traité de Rome", "La Constitution"], correct: 0 },
      { q: "Quel océan sépare la France des États-Unis ?", a: ["Le Pacifique", "l'Arctique", "l'océan Indien", "L'Atlantique"], correct: 3 },
      { q: "Combien d'étoiles figurent sur le drapeau de la Chine ?", a: ["Une", "Trois", "Cinq", "Sept"], correct: 2 },
      { q: "Quelle couleur domine sur le drapeau de la Chine ?", a: ["Le vert", "Le rouge", "Le bleu", "Le blanc"], correct: 1 },
      { q: "Quel est le plus vaste pays du continent américain ?", a: ["l'Argentine", "Le Brésil", "Les États-Unis", "Le Canada"], correct: 3 },
      { q: "Quels trois pays forment l'Amérique du Nord ?", a: ["Canada, États-Unis et Mexique", "France, Espagne et Italie", "Brésil, Chili et Pérou", "Chine, Inde et Japon"], correct: 0 },
    ],
    enfant: [
      { q: "Quelles sont les couleurs du drapeau de la France ?", a: ["Bleu-jaune", "Jaune-rouge", "Vert-blanc-rouge", "Bleu-blanc-rouge"], correct: 3 },
      { q: "Qui dirige un royaume ?", a: ["Un boulanger", "Un roi ou une reine", "Un pompier", "Un facteur"], correct: 1 },
      { q: "Quelle est la fête nationale française ?", a: ["Halloween", "Noël", "Le 14 juillet", "Pâques"], correct: 2 },
      { q: "Dans quelle ville travaille le président français ?", a: ["Paris", "Londres", "Madrid", "Rome"], correct: 0 },
      { q: "Quelle monnaie utilise-t-on en France ?", a: ["Le dollar", "L'euro", "Le yen", "La livre"], correct: 1 },
      { q: "Comment appelle-t-on les pays d'Europe réunis ?", a: ["L'Amérique", "L'Afrique", "L'Union européenne", "L'Asie"], correct: 2 },
      { q: "Comment appelle-t-on le chef élu d'une République comme la France ?", a: ["Le président", "Le chevalier", "Le roi", "Le prince"], correct: 0 },
      { q: "Sur quel continent se situe la France ?", a: ["L'Afrique", "L'Amérique", "L'Asie", "L'Europe"], correct: 3 },
      { q: "Quel objet en tissu, avec des couleurs, représente un pays ?", a: ["Le ballon", "Le tapis", "Le drapeau", "Le chapeau"], correct: 2 },
      { q: "Comment appelle-t-on l'argent utilisé pour acheter des choses ?", a: ["Le ticket", "La monnaie", "La carte", "Le jeton"], correct: 1 },
      { q: "Comment nomme-t-on l'ensemble des habitants d'un pays ?", a: ["L'équipe", "La famille", "La classe", "La population"], correct: 3 },
      { q: "Dans quel bâtiment travaille le maire d'une ville ?", a: ["La mairie", "La gare", "L'école", "L'hôpital"], correct: 0 },
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
  const s = Math.min(window.innerWidth / 1280, window.innerHeight / 800);
  frame.style.transform = `scale(${s})`;
}
window.addEventListener('resize', fitStage);

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
