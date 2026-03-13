// ═══════════════════════════════════════════
// 🌸 AIGER-XMD — Créé par MOUHAMED 🌸 DARK 🌸
// ═══════════════════════════════════════════

const axios = require("axios");

module.exports = {
  name: "facebook",
  description: "Télécharge une vidéo Facebook 💙 !facebook [lien]",
  category: "téléchargement",

  async execute({ sock, from, msg, args }) {

    const url = args[0];

    if (!url || (!url.includes("facebook.com") && !url.includes("fb.watch"))) {
      return await sock.sendMessage(from, {
        text:
          `❌ Envoie un lien Facebook !\n\n` +
          `📌 *Usage :*\n` +
          `!facebook https://facebook.com/...`,
      }, { quoted: msg });
    }

    await sock.sendMessage(from, {
      text: "⏳ *Téléchargement Facebook en cours...*",
    }, { quoted: msg });

    try {
      // ✅ API gratuite et fiable !
      const res = await axios.get(
        `https://api.tiklydown.eu.org/api/download/fb?url=${encodeURIComponent(url)}`
      );

      const data = res.data;

      if (!data?.video) {
        throw new Error("Vidéo introuvable ou privée !");
      }

      const videoBuffer = await axios.get(data.video, {
        responseType: "arraybuffer",
        maxContentLength: 50 * 1024 * 1024,
      });

      await sock.sendMessage(from, {
        video: Buffer.from(videoBuffer.data),
        caption:
          `💙 *Facebook*\n\n` +
          `📌 *${data.title || "Vidéo Facebook"}*\n\n` +
          `_Téléchargé via AIGER-XMD_ 🤖`,
      }, { quoted: msg });

    } catch (err) {
      console.error("❌ facebook :", err.message);
      await sock.sendMessage(from, {
        text:
          `❌ *Échec du téléchargement !*\n\n` +
          `⚠️ _Raisons possibles :_\n` +
          `├ Vidéo privée ou protégée\n` +
          `├ Lien invalide ou expiré\n` +
          `└ Essaie avec fb.watch\n\n` +
          `_${err.message}_`,
      }, { quoted: msg });
    }
  },
};