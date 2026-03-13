// ═══════════════════════════════════════════
// 🌸 AIGER-XMD — Créé par MOUHAMED 🌸 DARK 🌸
// ⚠️ Toute copie sans autorisation interdite
// ═══════════════════════════════════════════

module.exports = {
  name: "idee",
  description: "💡 Idée fun aléatoire",
  category: "fun",

  async execute({ sock, from, msg }) {

    const idees = [
      "Crée un groupe WhatsApp avec tes ennemis et envoie des blagues 😂",
      "Apprends une nouvelle langue en 30 jours ! Commence par 5 mots par jour 📚",
      "Fais un défi : 30 jours sans réseaux sociaux 😈",
      "Crée ton propre bot WhatsApp ! Oh attends... tu l'as déjà fait 😎",
      "Écris une lettre à toi-même dans 10 ans ✉️",
      "Lance un business en ligne avec 0 francs de départ 💰",
      "Apprends à cuisiner un nouveau plat chaque semaine 🍳",
      "Fais du sport 20 minutes par jour pendant 30 jours 💪",
      "Lis un livre par mois et partage ton avis 📖",
      "Crée une chaîne YouTube sur un sujet qui te passionne 🎬",
      "Apprends la programmation en 3 mois 💻",
      "Organise une soirée jeux avec tes amis 🎮",
      "Plante un arbre et prends soin de lui 🌱",
      "Écris tes 3 objectifs chaque matin au réveil 🎯",
      "Fais une détox digitale un jour par semaine 📵",
      "Apprends à jouer d'un instrument de musique 🎸",
      "Lance un podcast sur ta passion 🎙️",
      "Voyage dans une ville que tu n'as jamais visitée 🌍",
      "Dessine quelque chose chaque jour pendant 30 jours 🎨",
      "Médite 10 minutes chaque matin ☀️",
      "Crée une application mobile simple 📱",
      "Vends quelque chose que tu n'utilises plus 💸",
      "Apprends la photographie avec ton téléphone 📸",
      "Écris un journal intime pendant 30 jours 📝",
      "Crée une page Instagram sur ta passion ❤️",
      "Apprends à faire du montage vidéo 🎥",
      "Fais du bénévolat dans ton quartier 🤝",
      "Apprends 10 recettes faciles à cuisiner 🍽️",
      "Crée un budget mensuel et respecte-le 💵",
      "Apprends à réparer des objets au lieu de les jeter 🔧",
      "Fais une liste de 100 choses à faire avant de mourir 🌟",
      "Apprends le dessin en 30 jours avec YouTube 🎨",
      "Crée un site web gratuit sur tes passions 🌐",
      "Lis la biographie d'une personne qui t'inspire 📚",
      "Apprends à faire de la musique sur ton téléphone 🎵",
      "Commence une collection de quelque chose qui te passionne 🏺",
      "Crée un groupe d'étude avec tes amis 👥",
      "Apprends à coudre ou tricoter 🧵",
      "Fais du jeûne intermittent pendant 30 jours 🥗",
      "Apprends à faire de la calligraphie ✍️",
      "Crée une newsletter sur un sujet qui te passionne 📰",
      "Apprends à faire du vélo ou de la natation 🏊",
      "Enseigne quelque chose que tu sais à quelqu'un 🎓",
      "Crée une application no-code sur Glide ou Bubble 📲",
      "Apprends le marketing digital gratuitement 📊",
      "Fais 10 pompes chaque matin pendant 30 jours 💪",
      "Apprends à faire du pain maison 🍞",
      "Crée un groupe d'entraide dans ton quartier 🏘️",
      "Apprends à investir avec 1000 francs 📈",
      "Fais une surprise à quelqu'un que tu aimes ce soir 🎁",
    ];

    const idee = idees[Math.floor(Math.random() * idees.length)];

    await sock.sendMessage(from, {
      text:
        `╔══════════════════════════════╗\n` +
        `║      💡 *IDÉE DU MOMENT !*    ║\n` +
        `╚══════════════════════════════╝\n\n` +
        `❝ _${idee}_ ❞\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `🔥 _Lance-toi !_ 😈\n\n` +
        `_Powered by AIGER-XMD_ 🌸`,
    }, { quoted: msg });
  },
};