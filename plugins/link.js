// ═══════════════════════════════════════════
// 🌸 AIGER-XMD — Créé par MOUHAMED 🌸 DARK 🌸
// ═══════════════════════════════════════════

module.exports = {
  name: "link",
  description: "Affiche le lien d'invitation du groupe 🔗 !link",
  category: "groupe",

  async execute({ sock, from, msg, isOwner, isGroup, senderIsAdmin }) {

    if (!isGroup) {
      return await sock.sendMessage(from, {
        text: "❌ Uniquement dans un *groupe* !",
      }, { quoted: msg });
    }

    if (!isOwner && !senderIsAdmin) {
      return await sock.sendMessage(from, {
        text: "❌ Seul un *admin* ou le *owner* peut obtenir le lien !",
      }, { quoted: msg });
    }

    try {
      const code = await sock.groupInviteCode(from);
      const link = `https://chat.whatsapp.com/${code}`;

      await sock.sendMessage(from, {
        text:
          `🔗 *Lien d'invitation du groupe !*\n\n` +
          `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
          `👉 ${link}\n` +
          `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
          `⚠️ _Ne partage ce lien qu'avec_\n` +
          `_des personnes de confiance !_\n\n` +
          `_Powered by AIGER-XMD_ 🌸`,
      }, { quoted: msg });

    } catch (err) {
      await sock.sendMessage(from, {
        text:
          `❌ *Impossible d'obtenir le lien !*\n\n` +
          `⚠️ _Vérifie que le bot est admin !_\n` +
          `_${err.message}_`,
      }, { quoted: msg });
    }
  },
};