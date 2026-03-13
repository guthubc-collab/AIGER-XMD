// ═══════════════════════════════════════════
// 🌸 AIGER-XMD — Créé par MOUHAMED 🌸 DARK 🌸
// ⚠️ Toute copie sans autorisation interdite
// ═══════════════════════════════════════════

const fs = require("fs");
const path = require("path");

module.exports = {
  name: "goodbye",
  description: "🚪 Active/désactive le message d'au revoir",
  category: "groupe",

  async execute({ sock, from, msg, args, isOwner, senderIsAdmin, isGroup, settings }) {

    if (!isGroup) return await sock.sendMessage(from, { text: `❌ *Uniquement dans un groupe !*` }, { quoted: msg });
    if (!isOwner && !senderIsAdmin) return await sock.sendMessage(from, { text: `❌ *Réservé aux Admins et Owner !*` }, { quoted: msg });

    const action = args[0]?.toLowerCase();

    if (!action || !["on", "off"].includes(action)) {
      const status = settings.goodbye?.[from] ? "✅ *ACTIVÉ*" : "❌ *DÉSACTIVÉ*";
      return await sock.sendMessage(from, {
        text:
          `╔══════════════════════════════╗\n` +
          `║      🚪 *GOODBYE*             ║\n` +
          `╚══════════════════════════════╝\n\n` +
          `📊 Statut : ${status}\n\n` +
          `💡 *!goodbye on* → Activer\n` +
          `💡 *!goodbye off* → Désactiver\n\n` +
          `_Powered by AIGER-XMD_ 🌸`,
      }, { quoted: msg });
    }

    if (!settings.goodbye) settings.goodbye = {};
    settings.goodbye[from] = action === "on";
    fs.writeFileSync(path.join(__dirname, "../settings.json"), JSON.stringify(settings, null, 2));

    await sock.sendMessage(from, {
      text: action === "on"
        ? `╔══════════════════════════════╗\n` +
          `║   🚪 *GOODBYE ACTIVÉ !*       ║\n` +
          `╚══════════════════════════════╝\n\n` +
          `✅ _Les membres qui partent seront salués !_\n\n` +
          `_Powered by AIGER-XMD_ 🌸`
        : `╔══════════════════════════════╗\n` +
          `║   🔕 *GOODBYE DÉSACTIVÉ !*    ║\n` +
          `╚══════════════════════════════╝\n\n` +
          `✅ _Messages d'au revoir désactivés !_\n\n` +
          `_Powered by AIGER-XMD_ 🌸`,
    }, { quoted: msg });
  },
};