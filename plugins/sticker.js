// ─── Plugin : sticker ─────────────────────────

// Convertit une image en sticker WhatsApp

// Usage : envoie une image avec !sticker en caption

// Ou réponds à une image avec !sticker

const { Sticker, StickerTypes } = require("wa-sticker-formatter");

module.exports = {

  name: "sticker",

  description: "Convertit une image en sticker 🎭",

  category: "média",

  async execute({ sock, from, msg, isOwner, isCreator }) {

    // Récupère le message image

    // Soit l'image directe soit le message cité

    const imageMessage =

      msg.message?.imageMessage ||

      msg.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage;

    if (!imageMessage) {

      return await sock.sendMessage(from, {

        text:

          `❌ Envoie une image avec *!sticker* en légende\n` +

          `_Ou réponds à une image avec !sticker_`,

      }, { quoted: msg });

    }

    // Avertit que ça télécharge

    await sock.sendMessage(from, {

      text: "⏳ Création du sticker en cours..."

    }, { quoted: msg });

    try {

      // Télécharge l'image depuis WhatsApp

      const { downloadMediaMessage } = require("@whiskeysockets/baileys");

      const buffer = await downloadMediaMessage(msg, "buffer", {});

      // Crée le sticker avec wa-sticker-formatter

      const sticker = new Sticker(buffer, {

        pack: require("../config").packName || "AIGER-XMD",

        author: require("../config").authorName || "MOUHAMED 🌸 DARK 🌸!/ *Le futur appartient à ceux qui codent leurs propres règles.*",

        type: StickerTypes.FULL,

        quality: 70,

      });

      // Convertit en buffer

      const stickerBuffer = await sticker.toBuffer();

      // Envoie le sticker

      await sock.sendMessage(from, {

        sticker: stickerBuffer,

      }, { quoted: msg });

    } catch (err) {

      console.error("❌ sticker :", err.message);

      await sock.sendMessage(from, {

        text: "❌ Erreur lors de la création du sticker !\n" + err.message,

      }, { quoted: msg });

    }

  },

};