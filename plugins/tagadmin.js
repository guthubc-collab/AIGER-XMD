// ═══════════════════════════════════════════
// 🌸 AIGER-XMD — Créé par MOUHAMED 🌸 DARK 🌸
// ⚠️ Toute copie sans autorisation interdite
// ═══════════════════════════════════════════

module.exports = {
  name: "tagadmin",
  description: "👑 Mentionne tous les admins du groupe",
  category: "groupe",

  async execute({ sock, from, msg, args, isOwner, senderIsAdmin, isGroup, groupMetadata }) {

    if (!isGroup) {
      return await sock.sendMessage(from, {
        text: `❌ *Uniquement dans un groupe !*`,
      }, { quoted: msg });
    }

    if (!isOwner && !senderIsAdmin) {
      return await sock.sendMessage(from, {
        text: `❌ *Réservé aux Admins et Owner !*`,
      }, { quoted: msg });
    }

    const admins = groupMetadata.participants.filter(p => p.admin != null);
    const mentions = admins.map(p => p.id);
    const message = args.join(" ") || "📢 Attention réunion urgent a tout Les admins !";

    let text =
      `╔══════════════════════════════╗\n` +
      `║      👑 *TAG ADMINS !*        ║\n` +
      `╚══════════════════════════════╝\n\n` +
      `📢 *${message}*\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;

    for (const admin of admins) {
      const num = admin.id.replace("@s.whatsapp.net", "").split(":")[0];
      text += `👑 @${num}\n`;
    }

    text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `_Powered by AIGER-XMD_ 🌸`;

    await sock.sendMessage(from, {
      text,
      mentions,
    }, { quoted: msg });
  },
};