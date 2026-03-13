// ═══════════════════════════════════════════
// 🌸 AIGER-XMD — Créé par MOUHAMED 🌸 DARK 🌸
// ⚠️ Toute copie sans autorisation interdite
// ═══════════════════════════════════════════

const facts = {
  science: [
    "⚡ La foudre frappe la Terre environ 100 fois par seconde !",
    "🧠 Le cerveau humain génère assez d'électricité pour allumer une ampoule !",
    "🌙 La Lune s'éloigne de la Terre de 3,8 cm par an !",
    "💧 L'eau chaude gèle plus vite que l'eau froide — Effet Mpemba !",
    "🧬 L'ADN humain est identique à 98,7% à celui des chimpanzés !",
    "🍌 Les bananes sont légèrement radioactives !",
    "🦴 Les bébés naissent avec 270 os, les adultes n'en ont que 206 !",
  ],
  histoire: [
    "🏛️ Les Romains utilisaient du sang de gladiateur comme médicament !",
    "⚔️ La guerre de Cent Ans a duré 116 ans — pas 100 !",
    "👑 Cléopâtre vivait plus près de l'iPhone que des pyramides dans le temps !",
    "🗼 La Tour Eiffel était censée être démolie en 1909 !",
    "📜 La plus courte guerre de l'histoire a duré 38 minutes !",
    "🌍 Le continent Afrique est plus grand que l'Europe, l'Amérique et la Chine réunies !",
  ],
  animaux: [
    "🐘 Les éléphants sont les seuls animaux qui ne peuvent pas sauter !",
    "🦈 Les requins existent depuis plus longtemps que les arbres !",
    "🐙 Les pieuvres ont 3 cœurs et du sang bleu !",
    "🐜 Les fourmis peuvent soulever 50 fois leur propre poids !",
    "🦁 Les lions dorment 20 heures par jour !",
    "🐬 Les dauphins dorment avec un œil ouvert !",
    "🦅 Les aigles peuvent voir 4 fois mieux que les humains !",
  ],
};

module.exports = {
  name: "fact",
  description: "🧠 Révèle un fait insolite qui va te surprendre",
  category: "fun",

  async execute({ sock, from, msg, args }) {

    const cat = args[0]?.toLowerCase();
    const categories = Object.keys(facts);

    if (cat && !categories.includes(cat)) {
      return await sock.sendMessage(from, {
        text:
          `╔══════════════════════════════╗\n` +
          `║      🧠 *FAIT INSOLITE*       ║\n` +
          `╚══════════════════════════════╝\n\n` +
          `📌 *Catégories :*\n` +
          `├ *!fact* → Aléatoire\n` +
          `├ *!fact science* → Science ⚡\n` +
          `├ *!fact histoire* → Histoire 📜\n` +
          `└ *!fact animaux* → Animaux 🦁\n\n` +
          `_Powered by AIGER-XMD_ 🌸`,
      }, { quoted: msg });
    }

    // ✅ Aléatoire si pas de catégorie
    const liste = cat
      ? facts[cat]
      : facts[categories[Math.floor(Math.random() * categories.length)]];

    const fact = liste[Math.floor(Math.random() * liste.length)];

    const emojis = { science: "⚡", histoire: "📜", animaux: "🦁" };

    await sock.sendMessage(from, {
      text:
        `╔══════════════════════════════╗\n` +
        `║      🧠 *FAIT INSOLITE*       ║\n` +
        `╚══════════════════════════════╝\n\n` +
        `❝ _Savais-tu que..._ ❞ 👀\n\n` +
        `${fact}\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `💡 _!fact science/histoire/animaux_\n\n` +
        `_Powered by AIGER-XMD_ 🌸`,
    }, { quoted: msg });
  },
};