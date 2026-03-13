// ═══════════════════════════════════════════
// 🌸 AIGER-XMD — Créé par MOUHAMED 🌸 DARK 🌸
// ⚠️ Toute copie sans autorisation interdite
// ═══════════════════════════════════════════

const config = require("../config");

module.exports = {
  name: "help",
  description: "📖 Guide le perdu vers la lumière des commandes",
  category: "général",

  async execute({ sock, from, msg, args, plugins }) {

    // ✅ !help [commande] → Aide spécifique
    if (args[0]) {
      const cmd = args[0].toLowerCase();
      const plugin = plugins.get(cmd);

      if (!plugin) {
        return await sock.sendMessage(from, {
          text:
            `❌ *Commande introuvable !*\n\n` +
            `💡 Tape *${config.prefix}help* pour voir toutes les commandes !`,
        }, { quoted: msg });
      }

      return await sock.sendMessage(from, {
        text:
          `╔══════════════════════════════╗\n` +
          `║       📖 *AIDE COMMANDE*      ║\n` +
          `╚══════════════════════════════╝\n\n` +
          `⚡ *Commande :* ${config.prefix}${plugin.name}\n` +
          `📌 *Description :* ${plugin.description}\n` +
          `📂 *Catégorie :* ${plugin.category || "général"}\n\n` +
          `_Powered by AIGER-XMD_ 🌸`,
      }, { quoted: msg });
    }

    // ✅ !help → Liste toutes les commandes
    let text =
      `╔══════════════════════════════╗\n` +
      `║       📖 *AIDE AIGER-XMD*    ║\n` +
      `╚══════════════════════════════╝\n\n` +
      `❝ _Toutes les commandes disponibles_ ❞\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;

    // ✅ Groupe par catégorie automatiquement !
    const categories = {};
    for (const [name, plugin] of plugins) {
      const cat = plugin.category || "général";
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(name);
    }

    const emojis = {
      "groupe": "👥",
      "média": "🎬",
      "téléchargement": "📥",
      "fun": "🎮",
      "owner": "👑",
      "général": "🔧",
    };

    for (const [cat, cmds] of Object.entries(categories)) {
      text += `\n${emojis[cat] || "📌"} *${cat.toUpperCase()}*\n`;
      for (const cmd of cmds) {
        text += `├ ${config.prefix}${cmd}\n`;
      }
    }

    text +=
      `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `💡 *${config.prefix}help [cmd]* pour plus de détails\n\n` +
      `_Powered by AIGER-XMD_ 🌸`;

    await sock.sendMessage(from, { text }, { quoted: msg });
  },
};