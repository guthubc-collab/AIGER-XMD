// ═══════════════════════════════════════════
// 🌸 AIGER-XMD — Créé par MOUHAMED 🌸 DARK 🌸
// ⚠️ Toute copie sans autorisation interdite
// ═══════════════════════════════════════════

const { downloadMediaMessage } = require("@whiskeysockets/baileys");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

module.exports = {
  name: "videosticker",
  description: "🎥 Transforme une vidéo en sticker animé magique",
  category: "média",

  async execute({ sock, from, msg }) {

    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    const isVideo = quoted?.videoMessage;

    if (!quoted || !isVideo) {
      return await sock.sendMessage(from, {
        text:
          `╔══════════════════════════════╗\n` +
          `║   🎥 *VIDÉO → STICKER ANIMÉ*  ║\n` +
          `╚══════════════════════════════╝\n\n` +
          `❌ *Réponds à une vidéo !*\n\n` +
          `📌 *Usage :*\n` +
          `_Réponds à une vidéo courte avec_\n` +
          `_*!videosticker*_ 🎥\n\n` +
          `⚠️ _Max 10 secondes recommandé !_\n\n` +
          `_Powered by AIGER-XMD_ 🌸`,
      }, { quoted: msg });
    }

    await sock.sendMessage(from, {
      text:
        `⏳ *Conversion vidéo → sticker...*\n\n` +
        `❝ _La magie opère..._ ❞ 😈`,
    }, { quoted: msg });

    try {
      const msgToDownload = {
        key: msg.key,
        message: quoted,
      };

      const buffer = await downloadMediaMessage(
        msgToDownload,
        "buffer",
        {},
      );

      // ✅ Sauvegarde temporaire
      const tmpIn  = path.join("/tmp", `vid_${Date.now()}.mp4`);
      const tmpOut = path.join("/tmp", `sticker_${Date.now()}.webp`);
      fs.writeFileSync(tmpIn, buffer);

      // ✅ Convertit avec ffmpeg !
      await new Promise((resolve, reject) => {
        exec(
          `ffmpeg -i ${tmpIn} -vf "scale=512:512:force_original_aspect_ratio=decrease,fps=15" -vcodec libwebp -lossless 0 -compression_level 6 -q:v 50 -loop 0 -preset picture -an -vsync 0 -t 8 ${tmpOut}`,
          (err) => {
            if (err) reject(err);
            else resolve();
          }
        );
      });

      const stickerBuffer = fs.readFileSync(tmpOut);

      // ✅ Nettoie les fichiers temp
      fs.unlinkSync(tmpIn);
      fs.unlinkSync(tmpOut);

      await sock.sendMessage(from, {
        sticker: stickerBuffer,
      }, { quoted: msg });

      await sock.sendMessage(from, {
        text:
          `✅ *Vidéo convertie en sticker !* 🎥\n\n` +
          `_Powered by AIGER-XMD_ 🌸`,
      }, { quoted: msg });

    } catch (err) {
      console.error("❌ videosticker :", err.message);
      await sock.sendMessage(from, {
        text:
          `❌ *Échec conversion !*\n\n` +
          `⚠️ _${err.message}_\n\n` +
          `💡 _Vidéo trop longue ? Max 10 sec !_\n\n` +
          `_Powered by AIGER-XMD_ 🌸`,
      }, { quoted: msg });
    }
  },
};