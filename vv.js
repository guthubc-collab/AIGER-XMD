// ═══════════════════════════════════════════
// 🌸 AIGER-XMD — Créé par MOUHAMED 🌸 DARK 🌸
// ⚠️ Toute copie sans autorisation interdite
// ═══════════════════════════════════════════

const { downloadMediaMessage } = require("@whiskeysockets/baileys");

module.exports = {
  name: "vv",
  description: "👁️ Révèle les médias vu unique",
  category: "général",

  async execute({ sock, from, msg, isOwner, senderIsAdmin }) {

    if (!isOwner && !senderIsAdmin) {
      return await sock.sendMessage(from, {
        text: `❌ *Réservé aux Admins et Owner !*`,
      }, { quoted: msg });
    }

    const quoted = msg.message?.extendedTextMessage?.contextInfo;
    const quotedMsg = quoted?.quotedMessage;

    if (!quotedMsg) {
      return await sock.sendMessage(from, {
        text:
          `❌ *Réponds à un média vu unique !*\n\n` +
          `💡 _Réponds au message + tape *!vv*_`,
      }, { quoted: msg });
    }

    // ✅ Détecte le message vu unique
    const viewOnceMsg =
      quotedMsg?.viewOnceMessage?.message ||
      quotedMsg?.viewOnceMessageV2?.message ||
      quotedMsg?.viewOnceMessageV2Extension?.message ||
      quotedMsg;

    const isImage = viewOnceMsg?.imageMessage;
    const isVideo = viewOnceMsg?.videoMessage;
    const isAudio = viewOnceMsg?.audioMessage;

    if (!isImage && !isVideo && !isAudio) {
      return await sock.sendMessage(from, {
        text: `❌ *Aucun média vu unique détecté !*`,
      }, { quoted: msg });
    }

    try {
      const fakeMsg = {
        key: {
          remoteJid: from,
          fromMe: false,
          id: quoted.stanzaId,
          participant: quoted.participant,
        },
        message: viewOnceMsg,
      };

      const buffer = await downloadMediaMessage(fakeMsg, "buffer", {});

      if (isImage) {
        return await sock.sendMessage(from, {
          image: buffer,
          caption:
            `╔══════════════════════════════╗\n` +
            `║    👁️ *MÉDIA RÉVÉLÉ !*        ║\n` +
            `╚══════════════════════════════╝\n\n` +
            `😈 _Rien ne m'échappe !_\n\n` +
            `_Powered by AIGER-XMD_ 🌸`,
        }, { quoted: msg });
      }

      if (isVideo) {
        return await sock.sendMessage(from, {
          video: buffer,
          caption:
            `╔══════════════════════════════╗\n` +
            `║    👁️ *VIDÉO RÉVÉLÉE !*       ║\n` +
            `╚══════════════════════════════╝\n\n` +
            `😈 _Rien ne m'échappe !_\n\n` +
            `_Powered by AIGER-XMD_ 🌸`,
        }, { quoted: msg });
      }

      if (isAudio) {
        return await sock.sendMessage(from, {
          audio: buffer,
          mimetype: "audio/mp4",
          ptt: true,
        }, { quoted: msg });
      }

    } catch (err) {
      await sock.sendMessage(from, {
        text: `❌ *Erreur :* ${err.message}`,
      }, { quoted: msg });
    }
  },
};