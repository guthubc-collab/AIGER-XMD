// ═══════════════════════════════════════════
// 🌸 AIGER-XMD — Créé par MOUHAMED 🌸 DARK 🌸
// ⚠️ Toute copie sans autorisation interdite
// ═══════════════════════════════════════════

module.exports = {
  name: "couple",
  description: "💕 Révèle la compatibilité entre deux âmes",
  category: "fun",

  async execute({ sock, from, msg }) {

    const mentions = msg.message?.extendedTextMessage
      ?.contextInfo?.mentionedJid;

    if (!mentions || mentions.length < 2) {
      return await sock.sendMessage(from, {
        text:
          `❌ *Mentionne 2 personnes !*\n` +
          `Ex : *!couple @personne1 @personne2*`,
      }, { quoted: msg });
    }

    const num1 = mentions[0].replace("@s.whatsapp.net", "").split(":")[0];
    const num2 = mentions[1].replace("@s.whatsapp.net", "").split(":")[0];
    const score = Math.floor(Math.random() * 101);

    let emoji, comment;

    if (score === 100) {
      emoji = "💍";
      comment = "PARFAIT ! C'est l'amour absolu !";
    } else if (score >= 90) {
      emoji = "💍"; comment = "Mariage prévu bientôt !";
    } else if (score >= 70) {
      emoji = "❤️"; comment = "Faits l'un pour l'autre !";
    } else if (score >= 50) {
      emoji = "💛"; comment = "Ça peut marcher avec effort !";
    } else if (score >= 30) {
      emoji = "🤔"; comment = "Beaucoup d'efforts nécessaires...";
    } else if (score >= 10) {
      emoji = "💔"; comment = "C'est très compliqué !";
    } else {
      emoji = "🗑️"; comment = "Catastrophe totale ! 😂";
    }

    const filled = Math.floor(score / 10);
    const empty = 10 - filled;
    const bar = "❤️".repeat(filled) + "🖤".repeat(empty);

    // ✅ Message spécial si 100% !
    if (score === 100) {
      await sock.sendMessage(from, {
        text:
          `╔══════════════════════════════╗\n` +
          `║    💍 *AMOUR PARFAIT !* 💍    ║\n` +
          `╚══════════════════════════════╝\n\n` +
          `🎊 *FÉLICITATIONS !* 🎊\n\n` +
          `👤 *@${num1}*\n` +
          `💍 *+* 💍\n` +
          `👤 *@${num2}*\n\n` +
          `💯 *Compatibilité : 100% PARFAIT !*\n\n` +
          `❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️\n\n` +
          `❝ _Deux âmes qui ne font plus_\n` +
          `_qu'une seule... Pour toujours_ ❞ 💍\n\n` +
          `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
          `🎊 _Le destin a parlé !_ 🎊\n\n` +
          `_Powered by AIGER-XMD_ 🌸`,
        mentions: mentions,
      }, { quoted: msg });
      return;
    }

    await sock.sendMessage(from, {
      text:
        `╔══════════════════════════════╗\n` +
        `║      💕 *COMPATIBILITÉ*       ║\n` +
        `╚══════════════════════════════╝\n\n` +
        `👤 *@${num1}*\n` +
        `🤝 *avec*\n` +
        `👤 *@${num2}*\n\n` +
        `${emoji} *Compatibilité : ${score}%*\n\n` +
        `${bar}\n\n` +
        `💬 _"${comment}"_\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `_Powered by AIGER-XMD_ 🌸`,
      mentions: mentions,
    }, { quoted: msg });
  },
};