// ═══════════════════════════════════════════
// 🌸 AIGER-XMD — Créé par MOUHAMED 🌸 DARK 🌸
// ⚠️ Toute copie sans autorisation interdite
// ═══════════════════════════════════════════

module.exports = {
  name: "translate",
  description: "🌍 Traduit un texte dans une langue",
  category: "général",

  async execute({ sock, from, msg, args }) {

    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    const quotedText =
      quoted?.conversation ||
      quoted?.extendedTextMessage?.text || "";

    const langues = {
      fr: "Français", en: "Anglais", es: "Espagnol",
      ar: "Arabe", pt: "Portugais", de: "Allemand",
      it: "Italien", ru: "Russe", zh: "Chinois",
      ja: "Japonais", ko: "Coréen", tr: "Turc",
    };

    if (!args[0]) {
      return await sock.sendMessage(from, {
        text:
          `❌ *Précise la langue !*\n\n` +
          `💡 _!translate fr [texte]_\n` +
          `💡 _ou réponds à un message_\n\n` +
          `🌍 *Langues disponibles :*\n` +
          Object.entries(langues)
            .map(([k, v]) => `├ *${k}* → ${v}`)
            .join("\n"),
      }, { quoted: msg });
    }

    const lang = args[0].toLowerCase();
    const texte = quotedText || args.slice(1).join(" ");

    if (!texte) {
      return await sock.sendMessage(from, {
        text: `❌ *Donne un texte à traduire !*\n_Réponds à un message ou écris le texte_`,
      }, { quoted: msg });
    }

    try {
      const res = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${encodeURIComponent(texte)}`
      );
      const data = await res.json();
      const traduction = data[0].map(x => x[0]).join("");
      const langSource = data[2] || "auto";

      await sock.sendMessage(from, {
        text:
          `╔══════════════════════════════╗\n` +
          `║      🌍 *TRADUCTION*          ║\n` +
          `╚══════════════════════════════╝\n\n` +
          `📥 *Langue source :* ${langues[langSource] || langSource}\n` +
          `📤 *Traduit en :* ${langues[lang] || lang}\n\n` +
          `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
          `📝 *Original :*\n${texte}\n\n` +
          `✅ *Traduction :*\n${traduction}\n` +
          `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
          `_Powered by AIGER-XMD_ 🌸`,
      }, { quoted: msg });

    } catch {
      await sock.sendMessage(from, {
        text: `❌ *Erreur de traduction !*\n_Réessaie plus tard !_`,
      }, { quoted: msg });
    }
  },
};