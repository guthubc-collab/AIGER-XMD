// ═══════════════════════════════════════════
// 🌸 AIGER-XMD — Créé par MOUHAMED 🌸 DARK 🌸
// ⚠️ Toute copie sans autorisation interdite
// ═══════════════════════════════════════════

module.exports = {
  name: "doc",
  description: "📄 Documentation officielle AIGER-XMD",
  category: "général",

  async execute({ sock, from, msg }) {
    await sock.sendMessage(from, {
      text:
        `╔══════════════════════════════╗\n` +
        `║   📄 *AIGER-XMD OFFICIEL*    ║\n` +
        `╚══════════════════════════════╝\n\n` +
        `❝ _Un bot né dans l'ombre..._\n` +
        `_pour dominer WhatsApp_ ❞ 😈\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `📌 *C'EST QUOI AIGER-XMD ?*\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `AIGER-XMD est un bot WhatsApp\n` +
        `100% gratuit, open-source et sécurisé\n` +
        `créé par *MOUHAMED 🌸 DARK 🌸*\n\n` +
        `📅 *Date de création :* 2025\n` +
        `⚡ *Version actuelle :* V1\n` +
        `🎯 *Commandes :* 50+\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `🚀 *COMMENT DÉPLOYER ?*\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `1️⃣ Va sur *GitHub AIGER-XMD*\n` +
        `2️⃣ Fork le repo\n` +
        `3️⃣ Déploie sur *Bot-Hosting.net*\n` +
        `   ou *HidenCloud.com*\n` +
        `4️⃣ Entre ton numéro\n` +
        `5️⃣ Connecte avec *Pair Code*\n` +
        `6️⃣ Profite ! 🔥\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `🛡️ *POURQUOI AIGER-XMD EST*\n` +
        `   *MEILLEUR QUE LES AUTRES ?*\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `✅ Code *obfusqué* → impossible à voler\n` +
        `✅ *Aucune backdoor* cachée\n` +
        `✅ *Aucun vol* de session\n` +
        `✅ *Aucun spam* automatique\n` +
        `✅ *Open source* et transparent\n` +
        `✅ Mis à jour *régulièrement*\n\n` +
        `❌ *Les autres bots :*\n` +
        `❌ Volent ta session WhatsApp\n` +
        `❌ Spamment tes contacts\n` +
        `❌ Contiennent des backdoors\n` +
        `❌ Code fermé et suspect\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `👨‍💻 *CRÉATEURS :*\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `🌸 *MOUHAMED* — Développeur principal\n` +
        `🌸 *DARK* — Co-développeur\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `📢 _Rejoins notre chaîne pour_\n` +
        `_les mises à jour !_ 🔔\n\n` +
        `_Powered by AIGER-XMD_ 🌸`,
    }, { quoted: msg });
  },
};