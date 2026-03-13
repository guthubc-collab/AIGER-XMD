// ═══════════════════════════════════════════
// 🌸 AIGER-XMD — Créé par MOUHAMED 🌸 DARK 🌸
// ⚠️ Toute copie sans autorisation interdite
// ═══════════════════════════════════════════

const axios = require("axios");

module.exports = {
  name: "tts",
  description: "🗣️ Transforme ton texte en message vocal",
  category: "média",

  async execute({ sock, from, msg, args }) {

    if (!args.length) {
      return await sock.sendMessage(from, {
        text:
          `╔══════════════════════════════╗\n` +
          `║        🗣️ *TEXT TO SPEECH*    ║\n` +
          `╚══════════════════════════════╝\n\n` +
          `❌ *Usage :*\n` +
          `└ *!tts Bonjour tout le monde !*\n\n` +
          `_Powered by AIGER-XMD_ 🌸`,
      }, { quoted: msg });
    }

    const text = args.join(" ");

    await sock.sendMessage(from, {
      text: `🗣️ *Conversion en cours...*\n_"${text}"_`,
    }, { quoted: msg });

    try {
      // ✅ API Google TTS gratuite !
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=fr&client=tw-ob`;

      const res = await axios.get(url, {
        responseType: "arraybuffer",
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
        timeout: 15000,
      });

      await sock.sendMessage(from, {
        audio: Buffer.from(res.data),
        mimetype: "audio/mpeg",
        ptt: true, // ✅ Envoie comme message vocal !
      }, { quoted: msg });

    } catch (err) {
      console.error("❌ tts :", err.message);
      await sock.sendMessage(from, {
        text:
          `❌ *Échec TTS !*\n\n` +
          `⚠️ _${err.message}_\n\n` +
          `💡 _Texte trop long ? Essaie plus court !_\n\n` +
          `_Powered by AIGER-XMD_ 🌸`,
      }, { quoted: msg });
    }
  },
};