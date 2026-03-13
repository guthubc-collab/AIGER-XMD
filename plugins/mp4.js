//═══════════════════════════════════════════
// 🌸 AIGER-XMD — Créé par MOUHAMED 🌸 DARK 🌸
// ⚠️ Toute copie sans autorisation interdite
// ═══════════════════════════════════════════

module.exports = {
  name: "mp4",
  description: "🎬 Télécharge vidéo YouTube HD",
  category: "téléchargement",

  async execute({ sock, from, msg, args }) {

    if (!args[0]) {
      return await sock.sendMessage(from, {
        text:
          `╔══════════════════════════════╗\n` +
          `║      🎬 *YOUTUBE MP4*         ║\n` +
          `╚══════════════════════════════╝\n\n` +
          `💡 *Utilisation :*\n` +
          `├ !mp4 [titre]\n` +
          `└ !mp4 [lien youtube]\n\n` +
          `_Powered by AIGER-XMD_ 🌸`,
      }, { quoted: msg });
    }

    const query = args.join(" ");
    const isUrl = query.includes("youtube.com") || query.includes("youtu.be");

    await sock.sendMessage(from, {
      text:
        `╔══════════════════════════════╗\n` +
        `║      🎬 *RECHERCHE MP4...*    ║\n` +
        `╚══════════════════════════════╝\n\n` +
        `🔍 _${isUrl ? "Lien détecté !" : "Recherche : " + query}_\n\n` +
        `⏳ _Patiente quelques secondes !_\n\n` +
        `_Powered by AIGER-XMD_ 🌸`,
    }, { quoted: msg });

    try {
      let videoId = "";

      if (isUrl) {
        const match = query.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        if (!match) throw new Error("Lien YouTube invalide !");
        videoId = match[1];
      } else {
        const searchRes = await fetch(
          `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`,
          { headers: { "User-Agent": "Mozilla/5.0" } }
        );
        const html = await searchRes.text();
        const match = html.match(/\/watch\?v=([\w-]{11})/);
        if (!match) throw new Error("Aucune vidéo trouvée !");
        videoId = match[1];
      }

      const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
      let videoBuffer = null;
      let titre = query;

      // ✅ API 1 — agatz.xyz
      try {
        const res1 = await fetch(
          `https://api.agatz.xyz/api/ytmp4?url=${encodeURIComponent(videoUrl)}`
        );
        const data1 = await res1.json();
        if (data1?.data?.downloadUrl) {
          const videoRes = await fetch(data1.data.downloadUrl);
          videoBuffer = Buffer.from(await videoRes.arrayBuffer());
          titre = data1?.data?.title || query;
        }
      } catch {}

      // ✅ API 2 — yt5s.io
      if (!videoBuffer) {
        try {
          const res2 = await fetch(
            `https://yt5s.io/api/ajaxSearch`,
            {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: `q=${encodeURIComponent(videoUrl)}&vt=mp4`,
            }
          );
          const data2 = await res2.json();
          const link = data2?.links?.mp4?.["720"]?.url
            || data2?.links?.mp4?.["480"]?.url
            || data2?.links?.mp4?.["360"]?.url;
          if (link) {
            const videoRes = await fetch(link);
            videoBuffer = Buffer.from(await videoRes.arrayBuffer());
            titre = data2?.title || query;
          }
        } catch {}
      }

      if (!videoBuffer) throw new Error("Toutes les APIs ont échoué !");

      if (videoBuffer.length > 64 * 1024 * 1024) {
        throw new Error("Vidéo trop lourde ! Max 64MB !");
      }

      await sock.sendMessage(from, {
        video: videoBuffer,
        caption:
          `╔══════════════════════════════╗\n` +
          `║      ✅ *MP4 ENVOYÉ !*        ║\n` +
          `╚══════════════════════════════╝\n\n` +
          `🎬 *${titre}*\n\n` +
          `❝ _Bonne vidéo !_ ❞ 😈\n\n` +
          `_Powered by AIGER-XMD_ 🌸`,
        fileName: `${titre}.mp4`,
      }, { quoted: msg });

    } catch (err) {
      await sock.sendMessage(from, {
        text:
          `╔══════════════════════════════╗\n` +
          `║      ❌ *ERREUR !*             ║\n` +
          `╚══════════════════════════════╝\n\n` +
          `😢 _${err.message}_\n\n` +
          `💡 _Réessaie avec un lien direct !_\n\n` +
          `_Powered by AIGER-XMD_ 🌸`,
      }, { quoted: msg });
    }
  },
};