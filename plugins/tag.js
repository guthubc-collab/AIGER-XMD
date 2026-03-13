// ═══════════════════════════════════════════
// 🌸 AIGER-XMD — Créé par MOUHAMED 🌸 DARK 🌸
// ⚠️ Toute copie sans autorisation est interdite
// ═══════════════════════════════════════════

module.exports = {
  name: "tag",
  description: "Mentionne tout le monde en silence 🔕 !tag [message]",
  category: "groupe",

  async execute({ sock, from, msg, args, isGroup, groupMetadata, sender }) {

    if (!isGroup) {
      return await sock.sendMessage(from, {
        text: "❌ Uniquement dans un *groupe* !",
      }, { quoted: msg });
    }

    const members = groupMetadata.participants;
    const mentions = members.map(m => m.id);
    const message = args.join(" ") || "📌";

    // ✅ Mentionne tout le monde EN SILENCE !
    // Le texte ne montre pas les @numéros
    // Mais WhatsApp notifie quand même tout le monde !
    await sock.sendMessage(from, {
      text: message,
      mentions: mentions,
    }, { quoted: msg });
  },
};