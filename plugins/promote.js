// ─── Plugin : promote ─────────────────────────

// Promeut un membre admin dans le groupe

// Usage : !promote @membre

module.exports = {

  name: "promote",

  description: "Promeut un membre admin 👑 !promote @membre",

  category: "groupe",

  async execute({ sock, from, msg, args, isOwner, isGroup, senderIsAdmin }) {

    // Vérifie si c'est dans un groupe

    if (!isGroup) {

      return await sock.sendMessage(from, {

        text: "❌ Cette commande fonctionne uniquement dans un *groupe* !",

      }, { quoted: msg });

    }

    // Vérifie si c'est le owner ou un admin

    if (!isOwner && !senderIsAdmin) {

      return await sock.sendMessage(from, {

        text: "❌ Seul un *admin* ou le *owner* peut utiliser cette commande !",

      }, { quoted: msg });

    }

    // Récupère le membre mentionné dans le message

    const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];

    if (!mentioned) {

      return await sock.sendMessage(from, {

        text: "❌ Mentionne un membre !\nUsage : *!promote @membre*",

      }, { quoted: msg });

    }

    try {

      // Promeut le membre admin

      await sock.groupParticipantsUpdate(from, [mentioned], "promote");

      const number = mentioned.replace("@s.whatsapp.net", "").split(":")[0];

      await sock.sendMessage(from, {

        text:

          `✅ *Promotion réussie !*\n\n` +

          `👑 @${number} est maintenant *admin* !`,

        mentions: [mentioned],

      }, { quoted: msg });

    } catch (err) {

      console.error("❌ promote :", err.message);

      await sock.sendMessage(from, {

        text: "❌ Erreur lors de la promotion !",

      }, { quoted: msg });

    }

  },

};