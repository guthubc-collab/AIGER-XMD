// ═══════════════════════════════════════════
// 🌸 AIGER-XMD — Créé par MOUHAMED 🌸 DARK 🌸
// ⚠️ Toute copie sans autorisation interdite
// ═══════════════════════════════════════════

module.exports = {
  name: "infos",
  description: "📋 Affiche les infos WhatsApp d'un numéro",
  category: "général",

  async execute({ sock, from, msg, args, sender }) {

    // ✅ Numéro mentionné ou réponse
    let target = msg.message?.extendedTextMessage?.contextInfo?.participant
      || args[0]?.replace(/[^0-9]/g, "") + "@s.whatsapp.net";

    if (!target || target === "@s.whatsapp.net") {
      return await sock.sendMessage(from, {
        text:
          `❌ *Mentionne un numéro !*\n\n` +
          `💡 _!infos @numéro_\n` +
          `💡 _ou réponds à un message_`,
      }, { quoted: msg });
    }

    try {
      // ✅ Vérifie si le numéro existe sur WhatsApp
      const [result] = await sock.onWhatsApp(target.replace("@s.whatsapp.net", ""));

      if (!result?.exists) {
        return await sock.sendMessage(from, {
          text:
            `╔══════════════════════════════╗\n` +
            `║      ❌ *NUMÉRO INTROUVABLE*  ║\n` +
            `╚══════════════════════════════╝\n\n` +
            `😢 _Ce numéro n'est pas sur WhatsApp !_\n\n` +
            `_Powered by AIGER-XMD_ 🌸`,
        }, { quoted: msg });
      }

      const jid = result.jid;
      const number = jid.split("@")[0];

      // ✅ Récupère la photo de profil
      let ppUrl = null;
      try {
        ppUrl = await sock.profilePictureUrl(jid, "image");
      } catch {}

      // ✅ Récupère le statut
      let status = "_Aucun statut_";
      try {
        const s = await sock.fetchStatus(jid);
        if (s?.status) status = s.status;
      } catch {}

      const text =
        `╔══════════════════════════════╗\n` +
        `║      📋 *INFOS WHATSAPP*      ║\n` +
        `╚══════════════════════════════╝\n\n` +
        `📱 *Numéro :* +${number}\n` +
        `✅ *Sur WhatsApp :* Oui\n` +
        `💬 *Bio :* ${status}\n` +
        `🖼️ *Photo :* ${ppUrl ? "Disponible" : "Indisponible"}\n\n` +
        `_Powered by AIGER-XMD_ 🌸`;

      if (ppUrl) {
        const response = await fetch(ppUrl);
        const buffer = Buffer.from(await response.arrayBuffer());
        await sock.sendMessage(from, {
          image: buffer,
          caption: text,
        }, { quoted: msg });
      } else {
        await sock.sendMessage(from, { text }, { quoted: msg });
      }

    } catch (err) {
      await sock.sendMessage(from, {
        text: `❌ Erreur : ${err.message}`,
      }, { quoted: msg });
    }
  },
};