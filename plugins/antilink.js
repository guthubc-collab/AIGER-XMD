// ═══════════════════════════════════════════
// 🌸 AIGER-XMD — Créé par MOUHAMED 🌸 DARK 🌸
// ⚠️ Toute copie sans autorisation interdite
// ═══════════════════════════════════════════

const fs = require("fs");
const path = require("path");
const settingsPath = path.join(__dirname, "../settings.json");

module.exports = {
  name: "antilink",
  description: "🔗 Active/désactive l'antilink",
  category: "groupe",

  async execute({ sock, from, msg, args, isOwner, senderIsAdmin, isGroup, settings }) {

    if (!isGroup) {
      return await sock.sendMessage(from, {
        text: `❌ *Uniquement dans un groupe !*`,
      }, { quoted: msg });
    }

    if (!isOwner && !senderIsAdmin) {
      return await sock.sendMessage(from, {
        text: `❌ *Réservé aux Admins et Owner !*`,
      }, { quoted: msg });
    }

    const action = args[0]?.toLowerCase();

    if (!action || !["on", "off"].includes(action)) {
      const status = settings.antilink?.[from] ? "✅ *ACTIVÉ*" : "❌ *DÉSACTIVÉ*";
      return await sock.sendMessage(from, {
        text:
          `╔══════════════════════════════╗\n` +
          `║      🔗 *ANTILINK*            ║\n` +
          `╚══════════════════════════════╝\n\n` +
          `📊 Statut : ${status}\n\n` +
          `💡 *!antilink on* → Activer\n` +
          `💡 *!antilink off* → Désactiver\n\n` +
          `_Powered by AIGER-XMD_ 🌸`,
      }, { quoted: msg });
    }

    if (!settings.antilink) settings.antilink = {};
    settings.antilink[from] = action === "on";
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));

    if (action === "on") {

      // ✅ Owner admin → Bot se promeut admin !
      let botIsAdmin = false;
      try {
        const meta = await sock.groupMetadata(from);
        const botId = sock.user.id.split(":")[0].split("@")[0];
        botIsAdmin = meta.participants.find(p =>
          p.id.split(":")[0].split("@")[0] === botId && p.admin != null
        ) != null;

        if (!botIsAdmin && senderIsAdmin) {
          await sock.groupParticipantsUpdate(
            from,
            [sock.user.id.split(":")[0] + "@s.whatsapp.net"],
            "promote"
          ).catch(() => {});
          botIsAdmin = true;
        }
      } catch {}

      return await sock.sendMessage(from, {
        text:
          `╔══════════════════════════════╗\n` +
          `║   🛡️ *ANTILINK ACTIVÉ !*      ║\n` +
          `╚══════════════════════════════╝\n\n` +
          `✅ _Les liens sont interdits !_\n\n` +
          `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
          `${botIsAdmin
            ? "👑 _Je suis admin !_ ✅\n🔨 _Suppression + expulsion activés !_"
            : "⚠️ _Je ne suis pas admin !_\n❌ _Je peux seulement avertir !_"
          }\n\n` +
          `⚠️ *3 liens = expulsion !*\n\n` +
          `_Powered by AIGER-XMD_ 🌸`,
      }, { quoted: msg });
    }

    await sock.sendMessage(from, {
      text:
        `╔══════════════════════════════╗\n` +
        `║   🔓 *ANTILINK DÉSACTIVÉ !*   ║\n` +
        `╚══════════════════════════════╝\n\n` +
        `✅ _Les liens sont maintenant autorisés !_\n\n` +
        `_Powered by AIGER-XMD_ 🌸`,
    }, { quoted: msg });
  },
};