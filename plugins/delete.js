// ═══════════════════════════════════════════
// 🌸 AIGER-XMD — Créé par MOUHAMED 🌸 DARK 🌸
// ⚠️ Toute copie sans autorisation interdite
// ═══════════════════════════════════════════

module.exports = {
  name: "delete",
  description: "🗑️ Supprime un message — Réponds au message",
  category: "groupe",

  async execute({ sock, from, msg, isOwner, senderIsAdmin }) {
    if (!isOwner && !senderIsAdmin) {
      return await sock.sendMessage(from, {
        text: `❌ *Réservé aux Admins et Owner !*`,
      }, { quoted: msg });
    }

    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    const quotedKey = msg.message?.extendedTextMessage?.contextInfo;

    if (!quoted || !quotedKey) {
      return await sock.sendMessage(from, {
        text:
          `❌ *Réponds à un message pour le supprimer !*\n\n` +
          `💡 _Réponds au message + tape *!delete*_`,
      }, { quoted: msg });
    }

    const deleteKey = {
      remoteJid: from,
      fromMe: false,
      id: quotedKey.stanzaId,
      participant: quotedKey.participant,
    };

    await sock.sendMessage(from, { delete: deleteKey });

    await sock.sendMessage(from, {
      text:
        `╔══════════════════════════════╗\n` +
        `║     🗑️ *MESSAGE SUPPRIMÉ !*   ║\n` +
        `╚══════════════════════════════╝\n\n` +
        `✅ _Message supprimé avec succès !_\n\n` +
        `_Powered by AIGER-XMD_ 🌸`,
    });
  },
};