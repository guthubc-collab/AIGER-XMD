// ─── Plugin : ping ────────────────────────────

// Teste si le bot répond et affiche la latence

module.exports = {

  name: "ping",

  description: "Teste si le bot répond ⚡",

  category: "général",

  async execute({ sock, from, msg }) {

    // Enregistre le temps avant l'envoi

    const start = Date.now();

    await sock.sendMessage(from, {

      text: "⚡ *Calcul en cours...*"

    }, { quoted: msg });

    // Calcule la différence en millisecondes

    const latence = Date.now() -start;

    await sock.sendMessage(from, {
      text: `🏓 *PONG !*\n\n⚡ Latence : *${latence}ms*\n🤖 Bot : *AIGER-XMD*\n✅ Statut : *En ligne !*`

    }, { quoted: msg });

  },

};