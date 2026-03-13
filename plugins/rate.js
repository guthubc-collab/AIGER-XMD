// ═══════════════════════════════════════════
// 🌸 AIGER-XMD — Créé par MOUHAMED 🌸 DARK 🌸
// ⚠️ Toute copie sans autorisation interdite
// ═══════════════════════════════════════════

module.exports = {
  name: "rate",
  description: "😈 Note quelqu'un sans pitié sur 100",
  category: "fun",

  async execute({ sock, from, msg }) {

    const mentioned = msg.message?.extendedTextMessage
      ?.contextInfo?.mentionedJid?.[0];

    if (!mentioned) {
      return await sock.sendMessage(from, {
        text:
          `❌ *Mentionne quelqu'un !*\n` +
          `Ex : *!rate @membre*`,
      }, { quoted: msg });
    }

    const num = mentioned.replace("@s.whatsapp.net", "").split(":")[0];
    const score = Math.floor(Math.random() * 101);

    let emoji, comments;

    if (score === 100) {
      emoji = "👑";
      comments = ["Tu es LA référence absolue !", "Dieu lui-même te respecte !", "Le monde entier s'incline devant toi !"];
    } else if (score >= 90) {
      emoji = "🔥";
      comments = ["Légende vivante !", "On t'enseigne dans les écoles !", "Les stars rêvent d'être toi !"];
    } else if (score >= 70) {
      emoji = "😎";
      comments = ["Pas mal... pour un humain !", "Tu impressionnes parfois !", "Continue comme ça et t'iras loin !"];
    } else if (score >= 50) {
      emoji = "😊";
      comments = ["Moyen mais on t'aime quand même !", "Tu fais ce que tu peux... 😅", "La médiocrité a un visage et c'est le tien 😂"];
    } else if (score >= 30) {
      emoji = "😬";
      comments = ["Ton futur me fait peur !", "T'as essayé de changer de personnalité ?", "Même ton miroir te fuit !"];
    } else if (score >= 10) {
      emoji = "💀";
      comments = ["Cas clinique urgent !", "La science s'interroge sur ton existence !", "Même ta mère doute ! 😂"];
    } else {
      emoji = "🗑️";
      comments = ["Supprime-toi et réinstalle-toi !", "Tu es une erreur de la nature !", "Même Google ne peut pas t'aider ! 😂"];
    }

    const comment = comments[Math.floor(Math.random() * comments.length)];
    const filled = Math.floor(score / 10);
    const empty = 10 - filled;
    const bar = "█".repeat(filled) + "░".repeat(empty);

    // ✅ Essaie d'envoyer avec photo du profil !
    try {
      const ppUrl = await sock.profilePictureUrl(mentioned, "image");
      const res = await fetch(ppUrl);
      const buffer = Buffer.from(await res.arrayBuffer());

      await sock.sendMessage(from, {
        image: buffer,
        caption:
          `╔══════════════════════════════╗\n` +
          `║        😈 *NOTE SOCIALE*      ║\n` +
          `╚══════════════════════════════╝\n\n` +
          `👤 *@${num}*\n\n` +
          `${emoji} *Score : ${score}/100*\n\n` +
          `[${bar}]\n\n` +
          `💬 _"${comment}"_\n\n` +
          `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
          `_Powered by AIGER-XMD_ 🌸`,
        mentions: [mentioned],
      }, { quoted: msg });

    } catch {
      // ✅ Pas de photo → texte seulement
      await sock.sendMessage(from, {
        text:
          `╔══════════════════════════════╗\n` +
          `║        😈 *NOTE SOCIALE*      ║\n` +
          `╚══════════════════════════════╝\n\n` +
          `👤 *@${num}*\n\n` +
          `${emoji} *Score : ${score}/100*\n\n` +
          `[${bar}]\n\n` +
          `💬 _"${comment}"_\n\n` +
          `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
          `_Powered by AIGER-XMD_ 🌸`,
        mentions: [mentioned],
      }, { quoted: msg });
    }
  },
};