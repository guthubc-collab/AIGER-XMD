// ═══════════════════════════════════════════
// 🌸 AIGER-XMD — Créé par MOUHAMED 🌸 DARK 🌸
// ═══════════════════════════════════════════

module.exports = {
  name: "block",
  description: "Bloque un utilisateur 🚫 !block @mention",
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
        text: "❌ Mentionne un utilisateur !\nEx : *!block @user*",
      }, { quoted: msg });
    }

    const num = mentioned.replace("@s.whatsapp.net", "").split(":")[0];

    try {
      await sock.updateBlockStatus(mentioned, "block");

      await sock.sendMessage(from, {
        text:
          `🚫 *@${num} est bloqué !*\n\n` +
          `_Il ne peut plus envoyer de messages_\n\n` +
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