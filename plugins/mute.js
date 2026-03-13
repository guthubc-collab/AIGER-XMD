// ═══════════════════════════════════════════
// 🌸 AIGER-XMD — Créé par MOUHAMED 🌸 DARK 🌸
// ═══════════════════════════════════════════

module.exports = {
  name: "mute",
  description: "Réduit le groupe au silence 🔇 !mute on/off",
  category: "groupe",

  async execute({ sock, from, msg, isOwner, isGroup, senderIsAdmin, args }) {

    if (!isGroup) {
      return await sock.sendMessage(from, {
        text: "❌ Uniquement dans un *groupe* !",
      }, { quoted: msg });
    }

    if (!isOwner && !senderIsAdmin) {
      return await sock.sendMessage(from, {
        text: "❌ Seul un *admin* ou le *owner* peut muter !",
      }, { quoted: msg });
    }

    const option = args[0]?.toLowerCase();

    if (!option || !["on", "off"].includes(option)) {
      return await sock.sendMessage(from, {
        text:
          `❌ Usage :\n` +
          `├ *!mute on* → Seuls les admins parlent\n` +
          `└ *!mute off* → Tout le monde peut parler`,
      }, { quoted: msg });
    }

    try {
      // on = admins only / off = tout le monde
      await sock.groupSettingUpdate(
        from,
        option === "on" ? "announcement" : "not_announcement"
      );

      await sock.sendMessage(from, {
        text: option === "on"
          ? `🔇 *Groupe mis en silence !*\n\n_Seuls les admins peuvent envoyer des messages_\n\n_Powered by AIGER-XMD_ 🌸`
          : `🔊 *Groupe réactivé !*\n\n_Tout le monde peut parler maintenant_\n\n_Powered by AIGER-XMD_ 🌸`,
      }, { quoted: msg });

    } catch (err) {
      await sock.sendMessage(from, {
        text: "❌ Erreur : " + err.message,
      }, { quoted: msg });
    }
  },
};