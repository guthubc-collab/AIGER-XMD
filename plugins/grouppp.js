// ═══════════════════════════════════════════
// 🌸 AIGER-XMD — Créé par MOUHAMED 🌸 DARK 🌸
// ⚠️ Toute copie sans autorisation interdite
// ═══════════════════════════════════════════

const { downloadMediaMessage } = require("@whiskeysockets/baileys");

module.exports = {
  name: "grouppp",
  description: "🖼️ Change la photo du groupe",
  category: "groupe",

  async execute({ sock, from, msg, isOwner, senderIsAdmin, isGroup }) {

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

    // ✅ Vérifie si une image est envoyée !
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    const imageMsg =
      msg.message?.imageMessage ||
      quoted?.imageMessage;

    if (!imageMsg) {
      return await sock.sendMessage(from, {
        text:
          `╔══════════════════════════════╗\n` +
          `║    🖼️ *SETGROUPPP*            ║\n` +
          `╚══════════════════════════════╝\n\n` +
          `💡 *Utilisation :*\n` +
          `└ Envoie une photo + *!grouppp*\n` +
          `└ Ou réponds à une photo avec *!setgrouppp*\n\n` +
          `_Powered by AIGER-XMD_ 🌸`,
      }, { quoted: msg });
    }

    await sock.sendMessage(from, {
      text:
        `╔══════════════════════════════╗\n` +
        `║    🖼️ *CHANGEMENT EN COURS*   ║\n` +
        `╚══════════════════════════════╝\n\n` +
        `⏳ _Modification de la photo..._\n\n` +
        `_Powered by AIGER-XMD_ 🌸`,
    }, { quoted: msg });

    try {
      const targetMsg = msg.message?.imageMessage ? msg : {
        key: msg.message.extendedTextMessage.contextInfo.stanzaId
          ? { ...msg.key, id: msg.message.extendedTextMessage.contextInfo.stanzaId }
          : msg.key,
        message: quoted,
      };

      const buffer = await downloadMediaMessage(targetMsg, "buffer", {});
      await sock.updateProfilePicture(from, buffer);

      await sock.sendMessage(from, {
        text:
          `╔══════════════════════════════╗\n` +
          `║    ✅ *PHOTO MODIFIÉE !*      ║\n` +
          `╚══════════════════════════════╝\n\n` +
          `🖼️ _La photo du groupe a été changée !_ 😈\n\n` +
          `_Powered by AIGER-XMD_ 🌸`,
      }, { quoted: msg });

    } catch (err) {
      await sock.sendMessage(from, {
        text:
          `╔══════════════════════════════╗\n` +
          `║      ❌ *ERREUR !*             ║\n` +
          `╚══════════════════════════════╝\n\n` +
          `😢 _${err.message}_\n` +
          `⚠️ _Le bot doit être admin !_\n\n` +
          `_Powered by AIGER-XMD_ 🌸`,
      }, { quoted: msg });
    }
  },
};