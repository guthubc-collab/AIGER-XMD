// ═══════════════════════════════════════════
// 🌸 AIGER-XMD — Créé par MOUHAMED 🌸 DARK 🌸
// ⚠️ Toute copie sans autorisation interdite
// ═══════════════════════════════════════════

module.exports = {
  name: "uptime",
  description: "⏱️ Révèle depuis combien de temps le bot veille",
  category: "général",

  async execute({ sock, from, msg }) {

    const ms = process.uptime() * 1000;

    const jours    = Math.floor(ms / 86400000);
    const heures   = Math.floor((ms % 86400000) / 3600000);
    const minutes  = Math.floor((ms % 3600000) / 60000);
    const secondes = Math.floor((ms % 60000) / 1000);

    await sock.sendMessage(from, {
      text:
        `╔══════════════════════════════╗\n` +
        `║        ⏱️ *UPTIME*            ║\n` +
        `╚══════════════════════════════╝\n\n` +
        `❝ _Je veille sans jamais dormir..._\n` +
        `_depuis :_ ❞ 😈\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `📅 *Jours :*    ${jours}j\n` +
        `🕐 *Heures :*   ${heures}h\n` +
        `⏱️ *Minutes :*  ${minutes}m\n` +
        `⚡ *Secondes :* ${secondes}s\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `_Powered by AIGER-XMD_ 🌸`,
    }, { quoted: msg });
  },
};