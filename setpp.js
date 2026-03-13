// ═══════════════════════════════════════════
// 🌸 AIGER-XMD — Créé par MOUHAMED 🌸 DARK 🌸
// ⚠️ Toute copie sans autorisation est interdite
// ═══════════════════════════════════════════

const { downloadMediaMessage } = require("@whiskeysockets/baileys");

module.exports = {
  name: "setpp",
  description: "Change la photo du groupe 🖼️ !setpp",
  category: "groupe",

  async execute({ sock, from, msg, isOwner, isGroup, senderIsAdmin }) {

    if (!isGroup) {
      return await sock.sendMessage(from, {
        text: "❌ Uniquement dans un *groupe* !",
      }, { quoted: msg });
    }

    if (!isOwner && !senderIsAdmin) {
      return await sock.sendMessage(from, {
        text: "❌ Seul un *admin* ou le *owner* peut changer la photo !",
      }, { quoted: msg });
    }

    // ✅ Cherche l'image — directe ou citée
    const directImage = msg.message?.imageMessage;
    const quotedImage = msg.message?.extendedTextMessage
      ?.contextInfo?.quotedMessage?.imageMessage;

    const imageMessage = directImage || quotedImage;

    if (!imageMessage) {
      return await sock.sendMessage(from, {
        text:
          `❌ *Aucune image trouvée !*\n\n` +
          `📌 *Usage :*\n` +
          `├ Envoie une image avec *${require("../config").prefix}setpp*\n` +
          `└ Ou réponds à une image avec *${require("../config").prefix}setpp*`,
      }, { quoted: msg });
    }

    await sock.sendMessage(from, {
      text: "⏳ *Changement de la photo en cours...*",
    }, { quoted: msg });

    try {
      // ✅ Télécharge l'image
      const msgToDownload = directImage ? msg : {
        key: msg.key,
        message: msg.message?.extendedTextMessage?.contextInfo?.quotedMessage,
      };

      const buffer = await downloadMediaMessage(
        msgToDownload,
        "buffer",
        {},
      );

      // ✅ Change la photo du groupe !
      await sock.updateProfilePicture(from, buffer);

      await sock.sendMessage(from, {
        text:
          `✅ *Le Photo du groupe à été  mise à jour !* 🖼️\n\n` +
          `_Powered by 🌸 AIGER-XMD_ 🌸`,
      }, { quoted: msg });

    } catch (err) {
      console.error("❌ setpp :", err.message);
      await sock.sendMessage(from, {
        text:
          `❌ *Erreur !*\n\n` +
          `_${err.message}_\n\n` +
          `⚠️ _Vérifie que le bot est admin du groupe !_`,
      }, { quoted: msg });
    }
  },
};