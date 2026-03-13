// ═══════════════════════════════════════════
// 🌸 AIGER-XMD — Créé par MOUHAMED 🌸 DARK 🌸
// ⚠️ Toute copie sans autorisation interdite
// ═══════════════════════════════════════════

module.exports = {
  name: "add",
  description: "➕ Ajoute un membre dans le groupe",
  category: "groupe",

  async execute({ sock, from, msg, args, isOwner, senderIsAdmin, isGroup }) {

    if (!isGroup) {
      return await sock.sendMessage(from, {
        text: `❌ *Commande uniquement en groupe !*`,
      }, { quoted: msg });
    }

    if (!isOwner && !senderIsAdmin) {
      return await sock.sendMessage(from, {
        text: `❌ *Réservé aux Admins et Owner !*`,
      }, { quoted: msg });
    }

    if (!args[0]) {
      return await sock.sendMessage(from, {
        text:
          `╔══════════════════════════════╗\n` +
          `║      ➕ *ADD MEMBRE*          ║\n` +
          `╚══════════════════════════════╝\n\n` +
          `💡 *Utilisation :*\n` +
          `└ !add [numéro]\n\n` +
          `📌 *Exemple :*\n` +
          `└ !add 22612345678\n\n` +
          `⚠️ _Sans + ni espaces !_\n\n` +
          `_Powered by AIGER-XMD_ 🌸`,
      }, { quoted: msg });
    }

    const number = args[0].replace(/[^0-9]/g, "");
    const jid = number + "@s.whatsapp.net";

    try {
      // ✅ Vérifie si le numéro est sur WhatsApp
      const [check] = await sock.onWhatsApp(number);
      if (!check?.exists) {
        return await sock.sendMessage(from, {
          text:
            `╔══════════════════════════════╗\n` +
            `║      ❌ *NUMÉRO INVALIDE !*   ║\n` +
            `╚══════════════════════════════╝\n\n` +
            `😢 _Ce numéro n'est pas sur WhatsApp !_\n\n` +
            `_Powered by AIGER-XMD_ 🌸`,
        }, { quoted: msg });
      }

      await sock.groupParticipantsUpdate(from, [jid], "add");

      await sock.sendMessage(from, {
        text:
          `╔══════════════════════════════╗\n` +
          `║      ✅ *MEMBRE AJOUTÉ !*     ║\n` +
          `╚══════════════════════════════╝\n\n` +
          `🎉 @${number} *a été ajouté !*\n\n` +
          `❝ _Bienvenue dans le groupe !_ ❞ 😈\n\n` +
          `_Powered by AIGER-XMD_ 🌸`,
        mentions: [jid],
      }, { quoted: msg });

    } catch (err) {
      await sock.sendMessage(from, {
        text:
          `╔══════════════════════════════╗\n` +
          `║      ❌ *ERREUR !*             ║\n` +
          `╚══════════════════════════════╝\n\n` +
          `😢 _Impossible d'ajouter ce membre !_\n` +
          `⚠️ _Le bot doit être admin !_\n\n` +
          `_Powered by AIGER-XMD_ 🌸`,
      }, { quoted: msg });
    }
  },
};