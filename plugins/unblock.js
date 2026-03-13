// ═══════════════════════════════════════════
// 🌸 AIGER-XMD — Créé par MOUHAMED 🌸 DARK 🌸
// ═══════════════════════════════════════════

module.exports = {
  name: "unblock",
  description: "Débloque un utilisateur ✅ !unblock @mention",
  category: "owner",

  async execute({ sock, from, msg, isOwner }) {

    if (!isOwner) {
      return await sock.sendMessage(from, {
        text: "❌ Seul le *owner* peut utiliser cette commande !",
      }, { quoted: msg });
    }

    const mentioned = msg.message?.extendedTextMessage
      ?.contextInfo?.mentionedJid?.[0];

    if (!mentioned) {
      return await sock.sendMessage(from, {
        text: "❌ Mentionne un utilisateur !\nEx : *!unblock @user*",
      }, { quoted: msg });
    }

    const num = mentioned.replace("@s.whatsapp.net", "").split(":")[0];

    try {
      await sock.updateBlockStatus(mentioned, "unblock");

      await sock.sendMessage(from, {
        text:
          `✅ *@${num} est débloqué !*\n\n` +
          `_Il peut à nouveau envoyer des messages _\n\n` +
          `_Powered by AIGER-XMD_ 🌸`,
        mentions: [mentioned],
      }, { quoted: msg });

    } catch (err) {
      await sock.sendMessage(from, {
        text: "❌ Erreur : " + err.message,
      }, { quoted: msg });
    }
  },
};