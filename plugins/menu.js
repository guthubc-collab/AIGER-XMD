const config = require("../config");
const axios = require("axios");

module.exports = {
  name: "menu",
  description: "Affiche toutes les commandes 📋",
  category: "général",

  async execute({ sock, from, msg, settings, plugins }) {

    const categoryConfig = {
      "groupe":         { emoji: "👥", nom: "GROUPE" },
      "média":          { emoji: "🎬", nom: "MÉDIA" },
      "téléchargement": { emoji: "📥", nom: "TÉLÉCHARGEMENTS" },
      "fun":            { emoji: "🎮", nom: "FUN & JEUX" },
      "owner":          { emoji: "👑", nom: "OWNER" },
      "général":        { emoji: "🔧", nom: "GÉNÉRAL" },
    };

    // ✅ Construit catégories !
    const categories = {};
    for (const [name, plugin] of plugins) {
      const cat = plugin.category || "général";
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push({ cmd: name, desc: plugin.description || "" });
    }

    let text =
      `╔══════════════════════════════╗\n` +
      `║        🤖 *AIGER-XMD*        ║\n` +
      `╚══════════════════════════════╝\n\n` +
      `👨‍💻 *Créateur :* ${config.creatorName}\n` +
      `🌐 *Mode :* ${(settings?.mode || "public").toUpperCase()}\n` +
      `📦 *Préfixe :* ${config.prefix}\n` +
      `📊 *Commandes :* ${plugins.size}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

    for (const [catKey, cat] of Object.entries(categoryConfig)) {
      if (!categories[catKey]?.length) continue;
      text += `╔══════════════════════════════╗\n`;
      text += `║ ${cat.emoji} *${cat.nom}* (${categories[catKey].length} cmds)\n`;
      text += `╚══════════════════════════════╝\n`;
      for (const c of categories[catKey]) {
        text += `├ *${config.prefix}${c.cmd}*\n`;
      }
      text += `\n`;
    }

    text +=
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `📢 *Chaîne :* ${config.channelLink}\n\n` +
      `_Powered by ${config.botName}_ 🌸`;

    const images = config.menuImages || [];
    const randomImage = images[Math.floor(Math.random() * images.length)];

    try {
      if (randomImage) {
        const res = await axios.get(randomImage, { responseType: "arraybuffer" });
        await sock.sendMessage(from, {
          image: Buffer.from(res.data),
          caption: text,
        }, { quoted: msg });
      } else {
        await sock.sendMessage(from, { text }, { quoted: msg });
      }
    } catch {
      await sock.sendMessage(from, { text }, { quoted: msg });
    }

    // ✅ Audio générique !
    try {
      const generiques = [
        { titre: "Beyblade Burst Turbo 🔥", id: "SP2KoTb9kLc" },
        { titre: "Beyblade Burst ⚡", id: "b9PTWmYYYSs" },
        { titre: "Beyblade Burst Evolution 💎", id: "mhXh-zf2hA0" },
        { titre: "Beyblade Burst Rise 🌸", id: "t_hvPOEf4pI" },
      ];
      const pick = generiques[Math.floor(Math.random() * generiques.length)];
      const videoUrl = `https://www.youtube.com/watch?v=${pick.id}`;
      const res = await fetch(`https://api.agatz.xyz/api/ytmp3?url=${encodeURIComponent(videoUrl)}`);
      const data = await res.json();
      if (data?.data?.downloadUrl) {
        const audioRes = await fetch(data.data.downloadUrl);
        const audioBuffer = Buffer.from(await audioRes.arrayBuffer());
        await sock.sendMessage(from, {
          audio: audioBuffer,
          mimetype: "audio/mpeg",
          fileName: `${pick.titre}.mp3`,
        });
      }
    } catch {}
  },
};