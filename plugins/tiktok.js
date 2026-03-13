// ─── Plugin : tiktok ──────────────────────────
// Télécharge une vidéo TikTok sans watermark
// Utilise l'API gratuite tikwm.com

const axios = require("axios");

module.exports = {
  name: "tiktok",
  description: "Télécharge une vidéo TikTok 🎵 !tiktok [lien]",
  category: "téléchargement",

  async execute({ sock, from, msg, args }) {

    const url = args[0];

    if (!url || !url.includes("tiktok.com")) {
      return await sock.sendMessage(from, {
        text:
          `❌ Envoie un lien TikTok !\n\n` +
          `📌 *Usage :*\n` +
          `!tiktok https://tiktok.com/@user/video/xxx`,
      }, { quoted: msg });
    }

    await sock.sendMessage(from, {
      text: "⏳ *Téléchargement TikTok en cours...*",
    }, { quoted: msg });

    try {
      // API gratuite sans clé !
      const res = await axios.post(
        "https://www.tikwm.com/api/",
        new URLSearchParams({ url, hd: "1" }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      const data = res.data?.data;

      if (!data) {
        return await sock.sendMessage(from, {
          text: "❌ Impossible de télécharger cette vidéo !",
        }, { quoted: msg });
      }

      // Télécharge la vidéo sans watermark
      const videoUrl = data.play || data.wmplay;
      const videoBuffer = await axios.get(videoUrl, {
        responseType: "arraybuffer"
      });

      await sock.sendMessage(from, {
        video: Buffer.from(videoBuffer.data),
        caption:
          `🎵 *TikTok*\n\n` +
          `👤 *Auteur :* ${data.author?.nickname || "Inconnu"}\n` +
          `❤️ *Likes :* ${data.digg_count || 0}\n` +
          `💬 *Commentaires :* ${data.comment_count || 0}\n\n` +
          `_Téléchargé via AIGER-XMD_ 🤖`,
      }, { quoted: msg });

    } catch (err) {
      console.error("❌ tiktok :", err.message);
      await sock.sendMessage(from, {
        text: "❌ Erreur : " + err.message,
      }, { quoted: msg });
    }
  },
};