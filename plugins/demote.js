// ═══════════════════════════════════════════
// 🌸 AIGER-XMD — Créé par MOUHAMED 🌸 DARK 🌸
// ═══════════════════════════════════════════

module.exports = {
  name: "demote",
  description: "Rétrograde un admin 👇 !demote @mention",
  category: "groupe",

  async execute({ sock, from, msg, isOwner, isGroup, senderIsAdmin, groupMetadata }) {

    if (!isGroup) {
      return await sock.sendMessage(from, {
        text: "❌ Uniquement dans un *groupe* !",
      }, { quoted: msg });
    }

    if (!isOwner && !senderIsAdmin) {
      return await sock.sendMessage(from, {
        text: "❌ Seul un *admin* ou le *owner* peut rétrograder !",
      }, { quoted: msg });
    }

    const mentioned = msg.message?.extendedTextMessage
      ?.contextInfo?.mentionedJid?.[0];

    if (!mentioned) {
      return await sock.sendMessage(from, {
        text: "❌ Mentionne un admin !\nEx : *!demote @admin*",
      }, { quoted: msg });
    }

    const num = mentioned.replace("@s.whatsapp.net", "").split(":")[0];
    const isAdmin = groupMetadata.participants
      .find(p => p.id === mentioned)?.admin != null;

    if (!isAdmin) {
      return await sock.sendMessage(from, {
        text: `❌ *@${num}* n'est pas admin !`,
        mentions: [mentioned],
      }, { quoted: msg });
    }

    try {
      await sock.groupParticipantsUpdate(from, [mentioned], "demote");
      await sock.sendMessage(from, {
        text:
          `👇 *Admin rétrogradé !*\n\n` +
          `👤 @${num} n'est plus admin !\n\n` +
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