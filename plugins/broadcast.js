// ═══════════════════════════════════════════
// 🌸 AIGER-XMD — Créé par MOUHAMED 🌸 DARK 🌸
// ═══════════════════════════════════════════

module.exports = {
  name: "broadcast",
  description: "Envoie + tag silencieux à tous les groupes 📢 !broadcast [msg]",
  category: "owner",

  async execute({ sock, from, msg, args, isOwner }) {

    if (!isOwner) {
      return await sock.sendMessage(from, {
        text: "❌ Seul le *owner* peut utiliser !",
      }, { quoted: msg });
    }

    if (!args.length) {
      return await sock.sendMessage(from, {
        text: "❌ Écris un message !\nEx : *!broadcast Bonjour tout le monde !*",
      }, { quoted: msg });
    }

    const message = args.join(" ");

    try {
      const groupsObj = await sock.groupFetchAllParticipating();
      const groups = Object.entries(groupsObj);

      if (!groups.length) {
        return await sock.sendMessage(from, {
          text: "❌ Le bot n'est dans aucun groupe !",
        }, { quoted: msg });
      }

      await sock.sendMessage(from, {
        text:
          `📢 *Broadcast en cours...*\n` +
          `_${groups.length} groupes ciblés !_\n` +
          `_Tag silencieux activé_ 👀`,
      }, { quoted: msg });

      let success = 0;
      let failed = 0;

      for (const [groupId, groupData] of groups) {
        try {
          // ✅ Récupère tous les membres du groupe !
          const members = groupData.participants || [];
          const mentions = members.map(m => m.id);

          await sock.sendMessage(groupId, {
            // ✅ Message avec tag silencieux !
            text:
              `📢 *MESSAGE IMPORTANT*\n\n` +
              `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
              `${message}\n` +
              `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
              `_Powered by AIGER-XMD_ 🌸`,
            // ✅ Tag tout le monde en silence !
            mentions: mentions,
          });

          success++;
          await new Promise(r => setTimeout(r, 2000));
        } catch {
          failed++;
        }
      }

      await sock.sendMessage(from, {
        text:
          `✅ *Broadcast terminé !*\n\n` +
          `📢 *Groupes atteints :* ${success}\n` +
          `👥 *Membres notifiés :* tous !\n` +
          `❌ *Échecs :* ${failed}\n\n` +
          `_Powered by AIGER-XMD_ 🌸`,
      }, { quoted: msg });

    } catch (err) {
      console.error("❌ broadcast :", err.message);
      await sock.sendMessage(from, {
        text: `❌ Erreur : ${err.message}`,
      }, { quoted: msg });
    }
  },
};