// ═══════════════════════════════════════════
// 🌸 AIGER-XMD — Créé par MOUHAMED 🌸 DARK 🌸
// ⚠️ Toute copie sans autorisation interdite
// ═══════════════════════════════════════════

module.exports = {
  name: "owner",
  description: "👑 Révèle les maîtres derrière AIGER-XMD",
  category: "général",

  async execute({ sock, from, msg }) {

    // ✅ Message stylé d'abord !
    await sock.sendMessage(from, {
      text:
        `╔══════════════════════════════╗\n` +
        `║       👑 *NOTRE ÉQUIPE*       ║\n` +
        `╚══════════════════════════════╝\n\n` +
        `❝ _Derrière chaque grand bot..._\n` +
        `_se cachent de grandes personnes_ ❞ 😈\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `🚨 *Tu as un problème URGENT ?*\n` +
        `→ Contacte *Paul Walker* immédiatement !\n` +
        `→ _Rapide, efficace, sans perdre de temps_ ⚡\n\n` +
        `💬 *Tu veux une explication CLAIRE ?*\n` +
        `→ Contacte *Angela Merkel* tranquillement !\n` +
        `→ _Patiente, précise, toujours disponible_ 🌸\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    }, { quoted: msg });

    // ✅ Contact MR MOUHAMED 🌸 DARK 🌸 
    await sock.sendMessage(from, {
      contacts: {
        displayName: "IM MR MOUHAMED BAH ⚡",
        contacts: [{
          vcard:
            `BEGIN:VCARD\n` +
            `VERSION:3.0\n` +
            `FN:IM MR MOUHAMED 🌸 DARK 🌸 ⚡\n` +
            `ORG:AIGER-XMD;\n` +
            `TITLE:🚨 Urgences & Problèmes Rapides\n` +
            `TEL;type=CELL;type=VOICE;waid=2206969574:+2206969574\n` +
            `END:VCARD`,
        }],
      },
    }, { quoted: msg });

    // ✅ Contact Angela Merkel
    await sock.sendMessage(from, {
      contacts: {
        displayName: "Angela Merkel 🌸",
        contacts: [{
          vcard:
            `BEGIN:VCARD\n` +
            `VERSION:3.0\n` +
            `FN:Angela Merkel 🌸\n` +
            `ORG:AIGER-XMD;\n` +
            `TITLE:💬 Assistante & Explications Claires\n` +
            `TEL;type=CELL;type=VOICE;waid=2204024336:+220 402 4336\n` +
            `END:VCARD`,
        }],
      },
    }, { quoted: msg });

    // ✅ Message final
    await sock.sendMessage(from, {
      text:
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `💡 *Clique sur un contact*\n` +
        `_pour écrire directement !_ 👆\n\n` +
        `_Powered by AIGER-XMD_ 🌸`,
    }, { quoted: msg });
  },
};