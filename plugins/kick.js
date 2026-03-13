// ─── Plugin : kick ────────────────────────────
// Expulse un membre du groupe
// Usage : !kick @membre

module.exports = {
  name: "kick",
  description: "Expulse un membre 👢 !kick @membre",
  category: "groupe",

  async execute({ sock, from, msg, isOwner, isGroup, senderIsAdmin }) {

    if (!isGroup) {
      return await sock.sendMessage(from, {
        text: "❌ Cette commande fonctionne uniquement dans un *groupe* !",
      }, { quoted: msg });
    }

    if (!isOwner && !senderIsAdmin) {
      return await sock.sendMessage(from, {
        text: "❌ Seul un *admin* ou le *owner* peut utiliser cette commande !",
      }, { quoted: msg });
    }

    const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];

    if (!mentioned) {
      return await sock.sendMessage(from, {
        text: "❌ Mentionne un membre !\nUsage : *!kick @membre*",
      }, { quoted: msg });
    }

    const number = mentioned.replace("@s.whatsapp.net", "").split(":")[0];

    try {
      await sock.groupParticipantsUpdate(from, [mentioned], "remove");

      await sock.sendMessage(from, {
        text: `✅ @${number} a été *expulsé* du groupe ! 👢`,
        mentions: [mentioned],
      }, { quoted: msg });

    } catch (err) {
      console.error("❌ kick :", err.message);
      await sock.sendMessage(from, {
        text: "❌ Erreur lors de l'expulsion !",
      }, { quoted: msg });
    }
  },
};