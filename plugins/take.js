const { Sticker, StickerTypes } = require("wa-sticker-formatter");
const { downloadMediaMessage } = require("@whiskeysockets/baileys");

module.exports = {
  name: "take",
  description: "Renomme un sticker 🎭 !take NomPack | NomAuteur",
  category: "média",

  async execute({ sock, from, msg, args }) {

    const quotedMsg = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    const stickerMessage = msg.message?.stickerMessage || quotedMsg?.stickerMessage;

    if (!stickerMessage) {
      return await sock.sendMessage(from, {
        text: `❌ Réponds à un *sticker* avec !take\n\n📌 Exemple :\n!take AIGER-XMD | MOUHAMED 🌸`,
      }, { quoted: msg });
    }

    await sock.sendMessage(from, {
      text: "⏳ Modification du sticker en cours..."
    }, { quoted: msg });

    try {
      const text = args.join(" ");
      const parts = text.split("|");
      const packName = parts[0]?.trim() || "AIGER-XMD";
      const authorName = parts[1]?.trim() || "MOUHAMED 🌸 DARK 🌸";

      // ✅ Fix simple — télécharge directement
      const buffer = await downloadMediaMessage(
        msg.message?.stickerMessage ? msg : {
          key: msg.key,
          message: quotedMsg,
        },
        "buffer",
        {}
      );

      const sticker = new Sticker(buffer, {
        pack: packName,
        author: authorName,
        type: StickerTypes.FULL,
        quality: 50,
      });

      await sock.sendMessage(from, {
        sticker: await sticker.toBuffer(),
      }, { quoted: msg });

      await sock.sendMessage(from, {
        text: `✅ *Sticker renommé !*\n\n📦 *Pack :* ${packName}\n✍️ *Auteur :* ${authorName}`,
      }, { quoted: msg });

    } catch (err) {
      console.error("❌ take :", err.message);
      await sock.sendMessage(from, {
        text: "❌ Erreur : " + err.message,
      }, { quoted: msg });
    }
  },
};