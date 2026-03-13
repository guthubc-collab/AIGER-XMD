module.exports = {
  // ─── Créateur — NE PAS MODIFIER ───────────
  creatorName: "MOUHAMED 🌸 DARK 🌸",
  creatorNumber: "2204024336",
  creatorGithub: "https://github.com/guthubc-collab/AIGER-XMD",
  botName: "AIGER-XMD",

  // ─── Déployeur — depuis .env ──────────────
  phoneNumber: process.env.PHONE_NUMBER,
  ownerNumber: process.env.OWNER_NUMBER?.split(":")[0],
  prefix: process.env.PREFIX || ".",
  mode: process.env.MODE || "public",
  menuImage: process.env.MENU_IMAGE,
  menuAudio: process.env.MENU_AUDIO,

  // ─── Liens fixes — NE PAS MODIFIER ────────
  groupLink: "https://chat.whatsapp.com/KaaEQJOFKgs9g2V8RxN9Un?mode=gi_t",
  channelLink: "https://whatsapp.com/channel/0029Vb7eVrJLo4hmc6JuVE0h",

  // ✅ Messages stylés pour groupe et chaîne !
  groupMessage:
    `╔══════════════════════════════╗\n` +
    `║   👥 *REJOINS LE GROUPE !*    ║\n` +
    `╚══════════════════════════════╝\n\n` +
    `❝ _Les grands ne restent pas_\n` +
    `_dans l'ombre... Rejoins-nous !_ ❞\n\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `🤖 *AIGER-XMD Community*\n\n` +
    `☝️ _Rejoins le groupe pour :_\n` +
    `├ 📚 Maîtriser toutes les fonctionnalités\n` +
    `├ 🆕 Être le premier informé des nouveautés\n` +
    `├ 🛠️ Obtenir de l'aide en cas de problème\n` +
    `└ 👥 Rejoindre une communauté de passionnés\n\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `👉 *Clique et rejoins-nous !*\n`,

  channelMessage:
    `╔══════════════════════════════╗\n` +
    `║  📢 *SUIS LA CHAÎNE !*        ║\n` +
    `╚══════════════════════════════╝\n\n` +
    `❝ _Ceux qui suivent AIGER-XMD_\n` +
    `_ne ratent jamais rien..._ ❞ 🌸\n\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `📢 *AIGER-XMD — Canal Officiel*\n\n` +
    `🍀 _Suis la chaîne pour :_\n` +
    `├ 🆕 Nouvelles commandes disponibles\n` +
    `├ 🔧 Mises à jour importantes\n` +
    `├ 💡 Astuces et conseils exclusifs\n` +
    `└ 🌸 Contenu exclusif du créateur\n\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `👉 *Abonne-toi maintenant !*\n`,

  // ─── Photos menu aléatoires ───────────────
  menuImages: [
    "https://files.catbox.moe/4km857.jpg",
    "https://files.catbox.moe/xu2t7p.jpg",
    "https://files.catbox.moe/gnj66d.jpg",
    "https://files.catbox.moe/a2ri3k.png",
    "https://files.catbox.moe/1q0zko.jpg",
  ],

  // ─── Photo kickall mystérieuse ────────────
  kickallImage: "https://files.catbox.moe/xi3t1n.jpg",
};