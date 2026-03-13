// ═══════════════════════════════════════════
// 🌸 AIGER-XMD — Créé par MOUHAMED 🌸 DARK 🌸
// ⚠️ Toute copie sans autorisation interdite
// ═══════════════════════════════════════════

const { downloadMediaMessage } = require("@whiskeysockets/baileys");

module.exports = {
  name: "toimg",
  description: "🖼️ Transforme un sticker en image",
  category: "média",

  async execute({ sock, from, msg }) {

    // ✅ Récupère le sticker cité
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    const isSticker = quoted?.stickerMessage;

    if (!quoted || !isSticker) {
      return await sock.sendMessage(from, {
        text:
          `╔══════════════════════════════╗\n` +
          `║       🖼️ *STICKER → IMAGE*    ║\n` +
          `╚══════════════════════════════╝\n\n` +
          `❌ *Réponds à un sticker !*\n\n` +
          `📌 *Usage :*\n` +
          `_Réponds à un sticker avec *!toimg*_ 🖼️\n\n` +
          `_Powered by AIGER-XMD_ 🌸`,
      }, { quoted: msg });
    }

    await sock.sendMessage(from, {
      text: `⏳ *Conversion en cours...*`,
    }, { quoted: msg });

    try {
      const msgToDownload = {
        key: msg.key,
        message: quoted,
      };

      const buffer = await downloadMediaMessage(
        msgToDownload,
        "buffer",
        {},
      );

      await sock.sendMessage(from, {
        image: buffer,
        caption:
          `🖼️ *Sticker converti en image !*\n\n` +
          `_Powered by AIGER-XMD_ 🌸`,
      }, { quoted: msg });

    } catch (err) {
      console.error("❌ toimg :", err.message);
      await sock.sendMessage(from, {
        text: `❌ *Erreur :* ${err.message}`,
      }, { quoted: msg });
    }
  },
};