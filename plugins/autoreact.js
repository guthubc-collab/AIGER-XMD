// ═══════════════════════════════════════════
// 🌸 AIGER-XMD — Créé par MOUHAMED 🌸 DARK 🌸
// ⚠️ Toute copie sans autorisation interdite
// ═══════════════════════════════════════════

if (!global.autoreactGroups) global.autoreactGroups = new Set();

module.exports = {
  name: "autoreact",
  description: "⚡ Active/désactive les réactions automatiques",
  category: "groupe",

  async execute({ sock, from, msg, args, isOwner }) {
    if (!isOwner) {
      return await sock.sendMessage(from, {
        text: `❌ *Commande réservée au Owner !*`,
      }, { quoted: msg });
    }

    const action = args[0]?.toLowerCase();

    if (action === "on") {
      global.autoreactGroups.add(from);
      return await sock.sendMessage(from, {
        text:
          `╔══════════════════════════════╗\n` +
          `║    ⚡ *AUTOREACT ACTIVÉ !*    ║\n` +
          `╚══════════════════════════════╝\n\n` +
          `😈 _Je vais réagir sur chaque message !_\n\n` +
          `_Powered by AIGER-XMD_ 🌸`,
      }, { quoted: msg });
    }

    if (action === "off") {
      global.autoreactGroups.delete(from);
      return await sock.sendMessage(from, {
        text:
          `╔══════════════════════════════╗\n` +
          `║    ❌ *AUTOREACT DÉSACTIVÉ !* ║\n` +
          `╚══════════════════════════════╝\n\n` +
          `😴 _Je ne réagirai plus aux messages !_\n\n` +
          `_Powered by AIGER-XMD_ 🌸`,
      }, { quoted: msg });
    }

    const status = global.autoreactGroups.has(from) ? "✅ *ACTIVÉ*" : "❌ *DÉSACTIVÉ*";
    return await sock.sendMessage(from, {
      text:
        `╔══════════════════════════════╗\n` +
        `║       ⚡ *AUTOREACT*          ║\n` +
        `╚══════════════════════════════╝\n\n` +
        `📊 Statut : ${status}\n\n` +
        `💡 *!autoreact on* → Activer\n` +
        `💡 *!autoreact off* → Désactiver\n\n` +
        `_Powered by AIGER-XMD_ 🌸`,
    }, { quoted: msg });
  },
};