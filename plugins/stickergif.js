// ═══════════════════════════════════════════
// 🌸 AIGER-XMD — Créé par MOUHAMED 🌸 DARK 🌸
// ⚠️ Toute copie sans autorisation interdite
// ═══════════════════════════════════════════

const { downloadMediaMessage } = require("@whiskeysockets/baileys");

module.exports = {
  name: "stickergif",
  description: "✨ Transforme un GIF en sticker animé",
  category: "média",

  async execute({ sock, from, msg }) {

    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    const isGif = quoted?.videoMessage?.gifPlayback;

    if (!quoted || !isGif) {
      return await sock.sendMessage(from, {
        text:
          `╔══════════════════════════════╗\n` +
          `║     ✨ *GIF → STICKER ANIMÉ*  ║\n` +
          `╚══════════════════════════════╝\n\n` +
          `❌ *Réponds à un GIF !*\n\n` +
          `📌 *Usage :*\n` +
          `_Réponds à un GIF avec *!stickergif*_ ✨\n\n` +
          `_Powered by AIGER-XMD_ 🌸`,
      }, { quoted: msg });
    }

    await sock.sendMessage(from, {
      text: `⏳ *Conversion GIF → Sticker...*`,
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
        sticker: buffer,
        isAnimated: true,
      }, { quoted: msg });

      await sock.sendMessage(from, {
        text:
          `✅ *GIF converti en sticker animé !* ✨\n\n` +
          `_Powered by AIGER-XMD_ 🌸`,
      }, { quoted: msg });

    } catch (err) {
      console.error("❌ stickergif :", err.message);
      await sock.sendMessage(from, {
        text: `❌ *Erreur :* ${err.message}`,
      }, { quoted: msg });
    }
  },
};