const config = require("../config");
const axios = require("axios");

module.exports = {
  name: "kickall",
  description: "Expulse tout le monde ⚠️ !kickall",
  category: "groupe",

  async execute({ sock, from, msg, isOwner, isGroup, groupMetadata, sender }) {

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

    const ownerNum = config.ownerNumber?.replace(/[^0-9]/g, "");
    const creatorNum = config.creatorNumber?.replace(/[^0-9]/g, "");

    const senderClean = sender
      .replace("@s.whatsapp.net", "")
      .replace("@lid", "")
      .split(":")[0];

    const toKick = groupMetadata.participants.filter(m => {
      const num = m.id
        .replace("@s.whatsapp.net", "")
        .replace("@lid", "")
        .split(":")[0];
      const isAdmin = m.admin != null;
      return num !== ownerNum &&
             num !== creatorNum &&
             num !== senderClean &&
             m.id !== sender &&
             !isAdmin;
    });

    if (!toKick.length) {
      return await sock.sendMessage(from, {
        text: "ℹ️ Aucun membre à expulser !",
      }, { quoted: msg });
    }

    await sock.sendMessage(from, {
      text: `⚠️ *Purge en cours...*\n_${toKick.length} cibles identifiées_ 🎯`,
    }, { quoted: msg });

    let kicked = 0;
    let failed = 0;

    for (const member of toKick) {
      try {
        await sock.groupParticipantsUpdate(from, [member.id], "remove");
        kicked++;
        await new Promise(r => setTimeout(r, 500));
      } catch {
        failed++;
      }
    }

    // ✅ Message final stylé avec photo mystérieuse !
    const finalText =
      `🌑 *AIGER-XMD — PURGE TERMINÉE*\n\n` +
      `❝ _Le silence après la tempête..._\n` +
      `_...est la marque du vrai pouvoir_ ❞\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `👢 *Expulsés :* ${kicked}\n` +
      `❌ *Échecs :* ${failed}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `_Powered by ${config.botName}_ 🌸`;

    try {
      const res = await axios.get(config.kickallImage, {
        responseType: "arraybuffer"
      });
      await sock.sendMessage(from, {
        image: Buffer.from(res.data),
        caption: finalText,
      }, { quoted: msg });
    } catch {
      await sock.sendMessage(from, {
        text: finalText,
      }, { quoted: msg });
    }
  },
};