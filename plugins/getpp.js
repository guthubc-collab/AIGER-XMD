const { downloadMediaMessage } = require("@whiskeysockets/baileys");

module.exports = {
  name: "getpp",
  description: "Obtenir la photo de profil 🖼️ !getpp @mention",
  category: "général",

  async execute({ sock, from, msg, args, sender }) {

    // ✅ Cible — mention ou sender lui-même
    const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    const target = mentioned || sender;

    const num = target
      .replace("@s.whatsapp.net", "")
      .replace("@lid", "")
      .split(":")[0];

    try {
      const ppUrl = await sock.profilePictureUrl(target, "image");

      const res = await fetch(ppUrl);
      const buffer = Buffer.from(await res.arrayBuffer());

      await sock.sendMessage(from, {
        image: buffer,
        caption: `🖼️ *Photo de profil de @${num}*`,
        mentions: [target],
      }, { quoted: msg });

    } catch {
      await sock.sendMessage(from, {
        text: `❌ *@${num}* n'a pas de photo de profil visible !`,
        mentions: [target],
      }, { quoted: msg });
    }
  },
};