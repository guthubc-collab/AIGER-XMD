// ═══════════════════════════════════════════
// 🌸 AIGER-XMD — Créé par MOUHAMED 🌸 DARK 🌸
// ⚠️ Toute copie sans autorisation interdite
// ═══════════════════════════════════════════

module.exports = {
  name: "mp3",
  description: "🎵 Télécharge audio YouTube",
  category: "téléchargement",

  async execute({ sock, from, msg, args }) {

    if (!args[0]) {
      return await sock.sendMessage(from, {
        text:
          `╔══════════════════════════════╗\n` +
          `║      🎵 *YOUTUBE MP3*         ║\n` +
          `╚══════════════════════════════╝\n\n` +
          `💡 *Utilisation :*\n` +
          `├ !mp3 [titre]\n` +
          `└ !mp3 [lien youtube]\n\n` +
          `_Powered by AIGER-XMD_ 🌸`,
      }, { quoted: msg });
    }

    const query = args.join(" ");
    const isUrl = query.includes("youtube.com") || query.includes("youtu.be");

    await sock.sendMessage(from, {
      text:
        `╔══════════════════════════════╗\n` +
        `║      🎵 *RECHERCHE MP3...*    ║\n` +
        `╚══════════════════════════════╝\n\n` +
        `🔍 _${isUrl ? "Lien détecté !" : "Recherche : " + query}_\n\n` +
        `⏳ _Patiente quelques secondes !_\n\n` +
        `_Powered by AIGER-XMD_ 🌸`,
    }, { quoted: msg });

    try {
      let videoId = "";

      // ✅ Extrait ID YouTube
      if (isUrl) {
        const match = query.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        if (!match) throw new Error("Lien YouTube invalide !");
        videoId = match[1];
      } else {
        // ✅ Recherche par titre
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
      let audioBuffer = null;
      let titre = query;

      // ✅ API 1 — loader.to
      try {
        const res1 = await fetch(
          `https://loader.to/ajax/download.php?format=mp3&url=${encodeURIComponent(videoUrl)}`
        );
        const data1 = await res1.json();
        if (data1?.success && data1?.id) {
          // Attend que le téléchargement soit prêt
          await new Promise(r => setTimeout(r, 5000));
          const check = await fetch(
            `https://loader.to/ajax/progress.php?id=${data1.id}`
          );
          const prog = await check.json();
          if (prog?.download_url) {
            const audioRes = await fetch(prog.download_url);
            audioBuffer = Buffer.from(await audioRes.arrayBuffer());
            titre = prog?.title || query;
          }
        }
      } catch {}

      // ✅ API 2 — agatz.xyz
      if (!audioBuffer) {
        try {
          const res2 = await fetch(
            `https://api.agatz.xyz/api/ytmp3?url=${encodeURIComponent(videoUrl)}`
          );
          const data2 = await res2.json();
          if (data2?.data?.downloadUrl) {
            const audioRes = await fetch(data2.data.downloadUrl);
            audioBuffer = Buffer.from(await audioRes.arrayBuffer());
            titre = data2?.data?.title || query;
          }
        } catch {}
      }

      // ✅ API 3 — yt5s.io
      if (!audioBuffer) {
        try {
          const res3 = await fetch(
            `https://yt5s.io/api/ajaxSearch`,
            {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: `q=${encodeURIComponent(videoUrl)}&vt=mp3`,
            }
          );
          const data3 = await res3.json();
          const link = data3?.links?.mp3?.["128"]?.url;
          if (link) {
            const audioRes = await fetch(link);
            audioBuffer = Buffer.from(await audioRes.arrayBuffer());
            titre = data3?.title || query;
          }
        } catch {}
      }

      if (!audioBuffer) throw new Error("Toutes les APIs ont échoué !");

      await sock.sendMessage(from, {
        audio: audioBuffer,
        mimetype: "audio/mpeg",
        fileName: `${titre}.mp3`,
      }, { quoted: msg });

      await sock.sendMessage(from, {
        text:
          `╔══════════════════════════════╗\n` +
          `║      ✅ *MP3 ENVOYÉ !*        ║\n` +
          `╚══════════════════════════════╝\n\n` +
          `🎵 *${titre}*\n\n` +
          `❝ _Bonne écoute !_ ❞ 😈\n\n` +
          `_Powered by AIGER-XMD_ 🌸`,
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