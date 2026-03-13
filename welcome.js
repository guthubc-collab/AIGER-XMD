// ═══════════════════════════════════════════
// 🌸 AIGER-XMD — Créé par MOUHAMED 🌸 DARK 🌸
// ⚠️ Toute copie sans autorisation interdite
// ═══════════════════════════════════════════

const fs = require("fs");
const path = require("path");

module.exports = {
  name: "welcome",
  description: "👋 Active/désactive le message de bienvenue",
  category: "groupe",

  async execute({ sock, from, msg, args, isOwner, senderIsAdmin, isGroup, settings }) {

    if (!isGroup) return await sock.sendMessage(from, { text: `❌ *Uniquement dans un groupe !*` }, { quoted: msg });
    if (!isOwner && !senderIsAdmin) return await sock.sendMessage(from, { text: `❌ *Réservé aux Admins et Owner !*` }, { quoted: msg });

    const action = args[0]?.toLowerCase();

    if (!action || !["on", "off"].includes(action)) {
      const status = settings.welcome?.[from] ? "✅ *ACTIVÉ*" : "❌ *DÉSACTIVÉ*";
      return await sock.sendMessage(from, {
        text:
          `╔══════════════════════════════╗\n` +
          `║      👋 *WELCOME*             ║\n` +
          `╚══════════════════════════════╝\n\n` +
          `📊 Statut : ${status}\n\n` +
          `💡 *!welcome on* → Activer\n` +
          `💡 *!welcome off* → Désactiver\n\n` +
          `_Powered by AIGER-XMD_ 🌸`,
      }, { quoted: msg });
    }

    if (!settings.welcome) settings.welcome = {};
    settings.welcome[from] = action === "on";
    fs.writeFileSync(path.join(__dirname, "../settings.json"), JSON.stringify(settings, null, 2));

    await sock.sendMessage(from, {
      text: action === "on"
        ? `╔══════════════════════════════╗\n` +
          `║   👋 *WELCOME ACTIVÉ !*       ║\n` +
          `╚══════════════════════════════╝\n\n` +
          `✅ _Les nouveaux membres seront accueillis !_\n\n` +
          `_Powered by AIGER-XMD_ 🌸`
        : `╔══════════════════════════════╗\n` +
          `║   🔕 *WELCOME DÉSACTIVÉ !*    ║\n` +
          `╚══════════════════════════════╝\n\n` +
          `✅ _Messages de bienvenue désactivés !_\n\n` +
          `_Powered by AIGER-XMD_ 🌸`,
    }, { quoted: msg });
  },
};