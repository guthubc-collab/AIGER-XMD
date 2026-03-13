// ═══════════════════════════════════════════
// 🌸 AIGER-XMD — Créé par MOUHAMED 🌸 DARK 🌸
// ⚠️ Toute copie sans autorisation interdite
// ═══════════════════════════════════════════

module.exports = {
  name: "citation",
  description: "📜 Citation aléatoire par catégorie",
  category: "fun",

  async execute({ sock, from, msg, args }) {

    const categories = {
      vie: [
        "La vie est trop courte pour la passer à haïr les autres. 💫",
        "Chaque jour est une nouvelle chance de changer ta vie. 🌅",
        "Ne remets pas à demain ce que tu peux faire aujourd'hui. ⚡",
        "La vie commence là où ta zone de confort se termine. 🔥",
        "Vis comme si tu mourais demain, apprends comme si tu vivais toujours. 📚",
        "La vie n'est pas mesurée par le nombre de respirations mais par les moments qui nous coupent le souffle. 💨",
        "Le bonheur n'est pas une destination, c'est une façon de voyager. 🌍",
        "Chaque matin est une nouvelle page de ta vie. Écris quelque chose de beau. 📝",
        "La vie est un cadeau, ouvre-le chaque matin avec gratitude. 🎁",
        "Ce n'est pas la durée de ta vie qui compte, c'est ce que tu en fais. ⏳",
        "Souris à la vie et la vie te sourira. 😊",
        "Les plus belles histoires commencent là où on ne s'y attend pas. 🌸",
        "La vie est courte, fais de chaque moment quelque chose de mémorable. ✨",
        "Le secret d'une belle vie c'est de ne jamais cesser d'apprendre. 🎓",
        "Vis pleinement, aime sincèrement, ris souvent. 😄",
        "La vie est un voyage, pas une destination. 🚀",
        "Chaque obstacle est une opportunité déguisée. 💎",
        "La vraie richesse c'est la santé, la famille et la paix intérieure. 🌿",
        "La vie te donne ce que tu mérites quand tu travailles dur. 💪",
        "Profite de chaque instant car rien n'est permanent. 🌊",
        "La vie est belle quand tu arrêtes de la comparer à celle des autres. 🦋",
        "Ne vis pas pour les autres, vis pour toi-même. 💫",
        "La vie commence au bout de ta zone de confort. 🔥",
        "Chaque expérience difficile te rend plus fort. 💪",
        "La vie est trop précieuse pour la gaspiller en regrets. 🌺",
        "Sois reconnaissant pour ce que tu as pendant que tu travailles pour ce que tu veux. 🙏",
        "La vie c'est 10% ce qui t'arrive et 90% comment tu y réagis. ⚡",
        "Le meilleur moment de ta vie c'est maintenant. 🌟",
        "Ne laisse jamais quelqu'un décider de ta valeur. 👑",
        "La vie est une aventure ou elle n'est rien. 🗺️",
      ],
      succes: [
        "Le succès c'est tomber 7 fois et se relever 8. 💪",
        "Rêve grand, travaille dur, reste humble. 👑",
        "Les gagnants ne lâchent jamais, ceux qui lâchent ne gagnent jamais. 🏆",
        "Le seul endroit où le succès vient avant le travail c'est dans le dictionnaire. 😈",
        "Sois la personne que tu aurais voulu rencontrer. ✨",
        "Le succès est la somme de petits efforts répétés jour après jour. 🔑",
        "Ta seule limite c'est toi-même. 🚀",
        "Les grands résultats viennent de petites actions consistantes. 💡",
        "Le succès ne vient pas à toi, tu dois aller vers lui. 🏃",
        "Travaille en silence, laisse ton succès faire du bruit. 🔥",
        "Ne cherche pas à être meilleur que les autres, cherche à être meilleur qu'hier. 📈",
        "Le succès appartient à ceux qui se lèvent tôt et travaillent tard. ⏰",
        "Aucun grand succès n'a jamais été atteint sans passion. ❤️‍🔥",
        "Le talent sans travail ne vaut rien. 💼",
        "Chaque expert était autrefois un débutant. 🌱",
        "La discipline est le pont entre tes objectifs et tes accomplissements. 🌉",
        "Ne souhaite pas que ce soit plus facile, souhaite être meilleur. 💎",
        "Le succès c'est faire ce que tu aimes et être payé pour ça. 💰",
        "Les opportunités ne se présentent pas, elles se créent. 🎯",
        "Un jour ou un jour. Tu choisis ! 📅",
        "Le succès est un état d'esprit avant d'être un résultat. 🧠",
        "Crois en toi même quand personne d'autre ne le fait. 🌟",
        "Le chemin vers le succès est toujours en construction. 🏗️",
        "Fais de ton mieux et laisse Dieu faire le reste. 🤲",
        "Le succès c'est d'aimer ce que tu fais et de faire ce que tu aimes. ❤️",
        "Ne compte pas les jours, fais que les jours comptent. ⚡",
        "La réussite commence dans ta tête. 💡",
        "Chaque jour sans progrès est un jour perdu. 📊",
        "Les grands rêves exigent de grands sacrifices. 🌙",
        "Le succès n'est pas final, l'échec n'est pas fatal. 💪",
      ],
      motivation: [
        "Tu es plus fort que tu ne le penses. 💎",
        "Arrête d'attendre l'occasion parfaite. Crée-la ! 🚀",
        "Chaque expert a été un débutant un jour. 🌱",
        "Le seul échec c'est de ne pas essayer. ❤️‍🔥",
        "Douleur aujourd'hui, force demain. 💪",
        "Si tu peux le rêver, tu peux le faire. 🌟",
        "Ne regarde pas en arrière, tu n'y vas pas. 👁️",
        "La motivation te démarre, l'habitude te fait avancer. 🔄",
        "Sois plus fort que tes excuses. 💥",
        "Commence là où tu es, utilise ce que tu as, fais ce que tu peux. 🎯",
        "Le moment parfait n'existe pas. Lance-toi maintenant ! ⚡",
        "Tes actions d'aujourd'hui déterminent ton futur de demain. 🌅",
        "Ne laisse personne éteindre ta flamme. 🔥",
        "L'impossible n'est qu'un avis. 😈",
        "Sois le changement que tu veux voir dans le monde. 🌍",
        "Courage c'est être terrifié et agir quand même. 🦁",
        "Ne te compare qu'à toi d'hier. 📈",
        "Si ce n'est pas maintenant, alors quand ? ⏰",
        "Ton potentiel est infini, arrête de te limiter. 💫",
        "Les obstacles font partie du chemin, pas des raisons d'abandonner. 🏔️",
        "Lève-toi chaque matin avec la détermination de te coucher satisfait. ☀️",
        "Ne baisse jamais les bras, les miracles prennent du temps. 🌈",
        "Ton seul concurrent c'est qui tu étais hier. 🏃",
        "La douleur est temporaire, la fierté est permanente. 🏆",
        "Fais de ta vie un chef-d'œuvre. 🎨",
        "Il n'y a pas de raccourcis vers un endroit qui vaut le voyage. 🗺️",
        "Sois obsédé par tes objectifs ou sois obsédé par tes regrets. 🎯",
        "Le meilleur investissement c'est en toi-même. 💰",
        "Chaque jour est une chance de devenir meilleur. 🌿",
        "Si tu veux quelque chose que tu n'as jamais eu, fais quelque chose que tu n'as jamais fait. 🚀",
      ],
      islam: [
        "Alhamdoulillah pour tout. 🤲",
        "La patience est la clé du paradis. 🌸",
        "Confie-toi à Allah et Il te suffira. ⭐",
        "Après chaque difficulté vient la facilité. 🌅",
        "Le meilleur d'entre vous est celui qui est le meilleur envers sa famille. 💛",
        "Allah ne charge pas une âme au-delà de ce qu'elle peut supporter. 🌿",
        "Dis Bismillah avant chaque chose importante. 📿",
        "Le dou'a est l'arme du croyant. 🤲",
        "Sois reconnaissant et tu recevras davantage. 🙏",
        "La foi peut déplacer des montagnes. 🏔️",
        "Cherche la connaissance du berceau jusqu'à la tombe. 📚",
        "Souris à ton frère, c'est une sadaqa. 😊",
        "Allah aime ceux qui se repentent. 💚",
        "Chaque épreuve est une purification. 🌟",
        "Le paradis est sous les pieds des mères. 👑",
        "Ne désespère jamais de la miséricorde d'Allah. 🌈",
        "Fais le bien même si personne ne te voit. Allah voit tout. 👁️",
        "Rappelle-toi d'Allah et Il se rappellera de toi. 📿",
        "La vraie richesse c'est la richesse du cœur. 💎",
        "Sois patient, la récompense est immense. ⭐",
        "Le croyant n'est jamais seul, Allah est toujours avec lui. 🌸",
        "Travaille pour ta vie comme si tu vivais toujours et pour ta religion comme si tu mourais demain. ⚡",
        "Le meilleur des hommes est celui qui est utile aux autres. 🤝",
        "L'intention compte plus que l'action. 💡",
        "Purifiez vos cœurs et vos actions seront purifiées. 💚",
        "La bonté est une sadaqa. 🌺",
        "Cherche la science même en Chine. 🌍",
        "Aie confiance en Allah même quand tu ne comprends pas Son plan. 🤲",
        "Le dua du musulman n'est jamais perdu. 📿",
        "Ramadan est la porte de la miséricorde. 🌙",
      ],
      amour: [
        "L'amour ne se trouve pas, il se construit. 💕",
        "Aimer c'est trouver sa richesse en l'autre. ❤️",
        "Le vrai amour ne fait pas mal, il guérit. 🌸",
        "Aime sans condition, pardonne sans raison. 💫",
        "L'amour est la seule chose qui grandit quand on la donne. ❤️‍🔥",
        "Le vrai amour c'est quand tu rends l'autre meilleur. 💎",
        "Aimer quelqu'un c'est accepter ses défauts avec un sourire. 😊",
        "L'amour ne regarde pas avec les yeux mais avec le cœur. 💝",
        "Un amour vrai ne s'explique pas, il se ressent. 🌊",
        "Aime-toi d'abord, les autres suivront. 🌟",
        "L'amour c'est trouver quelqu'un avec qui tu veux vieillir. 🌹",
        "Dis à ceux que tu aimes que tu les aimes pendant qu'il est encore temps. ⏳",
        "L'amour est le seul trésor qui s'enrichit quand on le partage. 💰",
        "Chaque amour est une histoire unique. 📖",
        "L'amour c'est regarder dans la même direction. 🌅",
        "Aimer c'est voir quelqu'un tel qu'il est et l'aimer quand même. 💚",
        "Le plus grand cadeau qu'on puisse offrir c'est son amour. 🎁",
        "L'amour sincère ne demande rien en retour. 🕊️",
        "Aime les gens pour ce qu'ils sont pas pour ce qu'ils ont. 💡",
        "L'amour est la seule force capable de transformer un ennemi en ami. ✌️",
        "Quand l'amour est vrai, la distance ne change rien. 🌍",
        "L'amour c'est quand le bonheur de l'autre devient plus important que le tien. 💫",
        "Un cœur qui aime est toujours jeune. 💕",
        "L'amour ne se commande pas, il s'apprivoise. 🦋",
        "Être aimé de quelqu'un te donne la force. ⚡",
        "L'amour est une décision pas seulement un sentiment. 💪",
        "Aimer c'est donner sans attendre de recevoir. 🌸",
        "Le secret d'un amour durable c'est le respect mutuel. 🤝",
        "L'amour véritable grandit avec les épreuves. 🌱",
        "Chéris ceux qui t'aiment, ils sont rares. 👑",
      ],
    };

    const catDemandee = args[0]?.toLowerCase();

    if (!catDemandee || !categories[catDemandee]) {
      return await sock.sendMessage(from, {
        text:
          `╔══════════════════════════════╗\n` +
          `║      📜 *CITATIONS*           ║\n` +
          `╚══════════════════════════════╝\n\n` +
          `💡 *Utilisation :*\n` +
          `└ !citation [catégorie]\n\n` +
          `📌 *Catégories disponibles :*\n` +
          `├ 💫 *vie*\n` +
          `├ 🏆 *succes*\n` +
          `├ 🚀 *motivation*\n` +
          `├ 🤲 *islam*\n` +
          `└ ❤️ *amour*\n\n` +
          `📌 *Exemple :*\n` +
          `└ !citation motivation\n\n` +
          `_Powered by AIGER-XMD_ 🌸`,
      }, { quoted: msg });
    }

    const liste = categories[catDemandee];
    const citation = liste[Math.floor(Math.random() * liste.length)];

    const emojis = {
      vie: "💫", succes: "🏆", motivation: "🚀", islam: "🤲", amour: "❤️"
    };

    await sock.sendMessage(from, {
      text:
        `╔══════════════════════════════╗\n` +
        `║  ${emojis[catDemandee]} *CITATION ${catDemandee.toUpperCase()}*   ║\n` +
        `╚══════════════════════════════╝\n\n` +
        `❝ _${citation}_ ❞\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `💭 _Réfléchis à ça !_ 😈\n\n` +
        `_Powered by AIGER-XMD_ 🌸`,
    }, { quoted: msg });
  },
};