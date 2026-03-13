// ═══════════════════════════════════════════
// 🌸 AIGER-XMD — Créé par MOUHAMED 🌸 DARK 🌸
// ⚠️ Toute copie sans autorisation interdite
// ═══════════════════════════════════════════

const blagues = {
  normal: [
    "Pourquoi les plongeurs plongent en arrière ? 😂\n_Parce que sinon ils tomberaient dans le bateau !_",
    "Comment appelle-t-on un chat tombé dans un pot de peinture ? 🎨\n_Un chat-peint !_ 😂",
    "Qu'est-ce qu'un canif ? 🔪\n_Le petit ami de la caniche !_ 😂",
    "Pourquoi l'épouvantail a reçu un prix ? 🏆\n_Parce qu'il était exceptionnel dans son domaine !_ 😂",
    "Comment un manchot construit sa maison ? 🐧\n_Iglou iglou iglou !_ 😂",
  ],
  dark: [
    "Qu'est-ce qu'un aveugle qui fait du parachute ? 😈\n_Un problème pour tout le monde !_",
    "Pourquoi les cimetières ont des murs ? 😈\n_Parce que les gens meurent d'entrer !_",
    "Comment appelle-t-on un boomerang qui ne revient pas ? 😈\n_Un bâton !_",
    "Qu'est-ce qu'un crocodile qui surveille des valises ? 😈\n_Un sac à dents !_",
    "Pourquoi l'homme invisible n'a pas eu le poste ? 😈\n_Le jury voulait voir autre chose !_",
  ],
  sport: [
    "Pourquoi les footballeurs sont excellents en maths ? ⚽\n_Parce qu'ils savent compter les buts !_ 😂",
    "Qu'est-ce qu'un sportif dans l'eau ? 🏊\n_Un athlète mouillé !_ 😂",
    "Pourquoi les golfeurs portent deux pantalons ? ⛳\n_Au cas où il y aurait un trou en un !_ 😂",
    "Comment appelle-t-on un chat qui joue au foot ? 🐱\n_Un miaou-lieu de terrain !_ 😂",
    "Pourquoi les basketteurs sont grands ? 🏀\n_Parce que leur salaire leur permet de grandir !_ 😂",
  ],
  amour: [
    "Comment séduire une bibliothécaire ? 💕\n_Tu lui dis : Je te lis dans les yeux !_ 😂",
    "Qu'est-ce qu'un amoureux sous la pluie ? 🌧️\n_Un trempé d'amour !_ 😂",
    "Pourquoi les amoureux ferment les yeux ? 💕\n_Parce que l'amour c'est aveugle !_ 😂",
    "Comment appelle-t-on deux araignées amoureuses ? 🕷️\n_Des toiles d'amour !_ 😂",
    "Qu'est-ce qu'un cupidon paresseux ? 💘\n_Une flèche perdue !_ 😂",
  ],
};

module.exports = {
  name: "blague",
  description: "😂 Raconte une blague qui illumine ta journée",
  category: "fun",

  async execute({ sock, from, msg, args }) {

    const cat = args[0]?.toLowerCase();
    const categories = Object.keys(blagues);

    if (cat && !categories.includes(cat)) {
      return await sock.sendMessage(from, {
        text:
          `╔══════════════════════════════╗\n` +
          `║        😂 *BLAGUE*            ║\n` +
          `╚══════════════════════════════╝\n\n` +
          `📌 *Catégories disponibles :*\n` +
          `├ *!blague* → Normale\n` +
          `├ *!blague dark* → Humour noir 😈\n` +
          `├ *!blague sport* → Sport ⚽\n` +
          `└ *!blague amour* → Amour 💕\n\n` +
          `_Powered by AIGER-XMD_ 🌸`,
      }, { quoted: msg });
    }

    const liste = blagues[cat] || blagues.normal;
    const blague = liste[Math.floor(Math.random() * liste.length)];

    const emojis = {
      dark: "😈", sport: "⚽", amour: "💕", normal: "😂"
    };

    await sock.sendMessage(from, {
      text:
        `╔══════════════════════════════╗\n` +
        `║   ${emojis[cat || "normal"]} *BLAGUE ${(cat || "normal").toUpperCase()}*\n` +
        `╚══════════════════════════════╝\n\n` +
        `${blague}\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `💡 _!blague dark/sport/amour_\n\n` +
        `_Powered by AIGER-XMD_ 🌸`,
    }, { quoted: msg });
  },
};