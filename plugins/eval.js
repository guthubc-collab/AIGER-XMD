// ═══════════════════════════════════════════
// 🌸 AIGER-XMD — Créé par MOUHAMED 🌸 DARK 🌸
// ⚠️ COMMANDE DANGEREUSE — OWNER ONLY !
// ═══════════════════════════════════════════

module.exports = {
  name: "eval",
  description: "Exécute du code JS ⚡ !eval [code]",
  category: "owner",

  async execute({ sock, from, msg, args, isOwner }) {

    if (!isOwner) {
      return await sock.sendMessage(from, {
        text: "❌ Seul le *owner* peut utiliser cette commande !",
      }, { quoted: msg });
    }

    const code = args.join(" ");

    if (!code) {
      return await sock.sendMessage(from, {
        text: "❌ Écris du code !\nEx : *!eval 1 + 1*",
      }, { quoted: msg });
    }

    try {
      // ✅ Exécute le code !
      let result = await eval(code);

      if (typeof result !== "string") {
        result = JSON.stringify(result, null, 2);
      }

      await sock.sendMessage(from, {
        text:
          `⚡ *EVAL — Résultat :*\n\n` +
          `📥 *Input :*\n\`${code}\`\n\n` +
          `📤 *Output :*\n\`${result}\``,
      }, { quoted: msg });

    } catch (err) {
      await sock.sendMessage(from, {
        text:
          `❌ *Erreur !*\n\n` +
          `📥 *Input :*\n\`${code}\`\n\n` +
          `💥 *Erreur :*\n\`${err.message}\``,
      }, { quoted: msg });
    }
  },
};