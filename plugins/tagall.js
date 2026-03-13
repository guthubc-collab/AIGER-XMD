module.exports = {
  name: "tagall",
  description: "Mentionne tout le groupe 📢 !tagall [message]",
  category: "groupe",

  async execute({ sock, from, msg, args, isGroup, groupMetadata }) {

    if (!isGroup) {
      return await sock.sendMessage(from, {
        text: "❌ Uniquement dans un *groupe* !",
      }, { quoted: msg });
    }

    // ✅ Pas de vérif admin — tout le monde peut tagall !
    const message = args.join(" ") || "📢 Attention tout le monde *aiger xmd* vous demande d'être présent 🎁🎉🎁!";
    const members = groupMetadata.participants;
    const mentions = members.map(m => m.id);

    let text = `📢 *${message}*\n\n`;
    for (const member of members) {
      const num = member.id.replace("@s.whatsapp.net", "").split(":")[0];
      text += `@${num}\n`;
    }

    await sock.sendMessage(from, {
      text: text,
      mentions: mentions,
    }, { quoted: msg });
  },
};