// ═══════════════════════════════════════════
// 🌸 AIGER-XMD — Créé par MOUHAMED 🌸 DARK 🌸
// ═══════════════════════════════════════════

module.exports = {
  name: "left",
  description: "Owner + Bot quittent le groupe 👋 !left",
  category: "groupe",

  async execute({ sock, from, msg, isOwner, isGroup, sender, senderNumber }) {

    if (!isGroup) {
      return await sock.sendMessage(from, {
        text: "❌ Uniquement dans un *groupe* !",
      }, { quoted: msg });
    }

    if (!isOwner) {
      return await sock.sendMessage(from, {
        text: "❌ Seul le *owner* peut utiliser cette commande !",
      }, { quoted: msg });
    }

    // ✅ Message d'au revoir stylé !
    await sock.sendMessage(from, {
      text:
        `👋 *On se casse !*\n\n` +
        `❝ _Certains endroits ne méritent_\n` +
        `_pas notre présence..._ ❞ 😈\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `👤 *@${senderNumber}* quitte le groupe !\n` +
        `🤖 *AIGER-XMD* quitte aussi !\n\n` +
        `_À bientôt ailleurs..._ 🌸`,
      mentions: [sender],
    }, { quoted: msg });

    // ✅ Délai pour lire le message
    await new Promise(r => setTimeout(r, 2000));

    // ✅ Expulse le owner d'abord !
    try {
      await sock.groupParticipantsUpdate(from, [sender], "remove");
    } catch {}

    // ✅ Petit délai puis bot quitte !
    await new Promise(r => setTimeout(r, 1000));
    await sock.groupLeave(from);
  },
};