// ─── Plugin : mode ────────────────────────────

// Change le mode du bot : public ou private

// Seul le owner peut utiliser cette commande

const fs = require("fs");

const path = require("path");

const settingsPath = path.join(__dirname, "../settings.json");

module.exports = {

  name: "mode",

  description: "Change le mode du bot 🌍 !mode public/private",

  category: "général",

  async execute({ sock, from, msg, args, isOwner }) {

    // Vérifie si c'est le owner

    if (!isOwner) {

      return await sock.sendMessage(from, {

        text: "❌ Seul le *owner* peut changer le mode !",

      }, { quoted: msg });

    }

    // Vérifie si un argument est donné

    const newMode = args[0]?.toLowerCase();

    if (!newMode || !["public", "private"].includes(newMode)) {

      return await sock.sendMessage(from, {

        text: `❌ Usage : *!mode public* ou *!mode private*\n\n🌍 Mode actuel : *${require("../index.js") ? "" : ""}${JSON.parse(fs.readFileSync(settingsPath, "utf8")).mode}*`,

      }, { quoted: msg });

    }

    // Lit les settings actuels

    let settings = {};

    try {

      settings = JSON.parse(fs.readFileSync(settingsPath, "utf8"));

    } catch {

      settings = { mode: "public", antilink: {} };

    }

    // Met à jour le mode

    settings.mode = newMode;

    // Sauvegarde dans settings.json

    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));

    await sock.sendMessage(from, {

      text:

        `✅ Mode changé avec succès !\n\n` +

        `🌍 Nouveau mode : *${newMode.toUpperCase()}*\n\n` +

        `${newMode === "public"

          ? "👥 Tout le monde peut utiliser le bot !"

          : "🔒 Seul le owner peut utiliser le bot !"}`,

    }, { quoted: msg });

  },

};