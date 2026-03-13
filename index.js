const crypto = require("crypto");
globalThis.crypto = crypto;
require("dotenv").config();

const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
} = require("@whiskeysockets/baileys");

const { Boom } = require("@hapi/boom");
const pino = require("pino");
const path = require("path");
const fs = require("fs");
const config = require("./config");
const express = require("express");

// ─── Keep Alive ───────────────────────────────
const app = express();
const PORT = process.env.PORT || 8080;
app.get("/", (_, res) => res.send("✅ AIGER-XMD en ligne !"));
app.listen(PORT, () => console.log(`🌐 Keep-alive → port ${PORT}`));

const logger = pino({ level: "silent" });

// ─── Settings ─────────────────────────────────
const settingsPath = path.join(__dirname, "settings.json");
function getSettings() {
  try {
    if (fs.existsSync(settingsPath))
      return JSON.parse(fs.readFileSync(settingsPath, "utf8"));
  } catch {}
  const def = { mode: process.env.MODE || "public", antilink: {} };
  fs.writeFileSync(settingsPath, JSON.stringify(def, null, 2));
  return def;
}

// ─── Plugins ──────────────────────────────────
const plugins = new Map();
// ✅ Sessions menu globales — partagées avec menu.js
const menuSessions = new Map();
function loadPlugins() {
  const dir = path.join(__dirname, "plugins");
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".js"));
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("📦 Chargement des plugins...");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  for (const file of files) {
    try {
      delete require.cache[require.resolve(path.join(dir, file))];
      const plugin = require(path.join(dir, file));
      plugins.set(plugin.name, plugin);
      console.log(`  ✅ ${plugin.name}`);
    } catch (err) {
      console.log(`  ❌ ${file} : ${err.message}`);
    }
  }
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`📊 ${plugins.size} plugin(s) chargé(s)\n`);
}

const linkRegex = /(https?:\/\/|www\.|chat\.whatsapp\.com)[^\s]*/i;

// ─── Variable LID du owner ────────────────────
let ownerLid = null;

// ════════════════════════════════════════════
async function startBot() {
  loadPlugins();

  const { state, saveCreds } = await useMultiFileAuthState("./auth_info");
  const { version, isLatest } = await fetchLatestBaileysVersion();
  console.log(`📱 Baileys v${version.join(".")} ${isLatest ? "✅" : "⚠️"}`);

  const sock = makeWASocket({
    version,
    logger,
    printQRInTerminal: false,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, logger),
    },
    browser: ["Ubuntu", "Chrome", "120.0.0"],
    markOnlineOnConnect: false,
    syncFullHistory: false,
  });

  // ─── Connexion ────────────────────────────────
  sock.ev.on("connection.update", async ({ connection, lastDisconnect }) => {

    if (connection === "connecting" && !sock.authState.creds.registered) {
      const number = config.phoneNumber?.replace(/[^0-9]/g, "");
      if (!number) {
        console.log("❌ PHONE_NUMBER manquant dans .env !");
        process.exit(1);
      }
      await new Promise(r => setTimeout(r, 1500));
      try {
        const code = await sock.requestPairingCode(number);
        const fmt = code?.match(/.{1,4}/g)?.join("-") || code;
        console.log("\n╔══════════════════════════════╗");
        console.log("║     🔑 CODE DE JUMELAGE      ║");
        console.log("╠══════════════════════════════╣");
        console.log(`║       ${fmt}        ║`);
        console.log("╚══════════════════════════════╝");
        console.log("📲 WhatsApp → Appareils liés → Lier avec numéro\n");
        const interval = setInterval(async () => {
          if (sock.authState.creds.registered) { clearInterval(interval); return; }
          try {
            const nc = await sock.requestPairingCode(number);
            console.log(`🔄 Nouveau code : ${nc?.match(/.{1,4}/g)?.join("-") || nc}`);
          } catch {}
        }, 60000);
      } catch (err) {
        console.error("❌ Pair-code :", err.message);
      }
    }

    if (connection === "close") {
      const code = new Boom(lastDisconnect?.error)?.output?.statusCode;
      if (code === DisconnectReason.loggedOut) {
        console.log("🚪 Déconnecté !");
        fs.rmSync("./auth_info", { recursive: true, force: true });
        process.exit(0);
      } else {
        console.log(`🔄 Reconnexion dans 5s...`);
        setTimeout(() => startBot(), 5000);
      }
    } else if (connection === "open") {
      // ✅ Sauvegarde le LID du owner !
      ownerLid = sock.authState?.creds?.me?.lid?.split(":")[0];
      console.log(`🔑 Owner LID : ${ownerLid || "non disponible"}`);
        // ✅ Message retour après restart !
const fs = require("fs");
if (fs.existsSync("./restart.json")) {
  try {
    const data = JSON.parse(fs.readFileSync("./restart.json"));
    fs.unlinkSync("./restart.json");

    setTimeout(async () => {
      await sock.sendMessage(data.from, {
        text:
          `╔══════════════════════════════╗\n` +
          `║      ✅ *JE SUIS DE RETOUR !*  ║\n` +
          `╚══════════════════════════════╝\n\n` +
          `❝ _Je t'avais dit que je reviendrais..._\n` +
          `_plus fort qu'avant_ ❞ 😈\n\n` +
          `⚡ *AIGER-XMD* est de retour !\n` +
          `📦 *Commandes :* ${plugins.size} chargées\n` +
          `🚀 *Statut :* Opérationnel !\n\n` +
          `_Powered by AIGER-XMD_ 🌸`,
      });
    }, 3000);
  } catch {}
}

      const settings = getSettings();
      console.log("\n╔══════════════════════════════╗");
      console.log("║     🤖 AIGER-XMD ACTIF !     ║");
      console.log("╠══════════════════════════════╣");
      console.log(`║ 👤 ${sock.user?.id?.split(":")[0].padEnd(26)}║`);
      console.log(`║ 🌍 Mode : ${settings.mode.toUpperCase().padEnd(21)}║`);
      console.log(`║ 📦 Plugins : ${String(plugins.size).padEnd(18)}║`);
      console.log("╚══════════════════════════════╝\n");
    }
  });

  sock.ev.on("creds.update", saveCreds);
    // ✅ Welcome + Goodbye !
sock.ev.on("group-participants.update", async ({ id, participants, action }) => {
  const settings = getSettings();
  const from = id;

  for (const participant of participants) {
    const number = participant.replace("@s.whatsapp.net", "").split(":")[0];

    if (action === "add" && settings.welcome?.[from]) {
      await sock.sendMessage(from, {
        text:
          `┏━━━━━━━━━━━━━━━━━━━━━━━━━━━┓\n` +
          `┃   ✨ *NOUVEAU MEMBRE !* ✨   ┃\n` +
          `┗━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n\n` +
          `╔══════════════════════════════╗\n` +
          `║  👑 *BIENVENUE PARMI NOUS !* ║\n` +
          `╚══════════════════════════════╝\n\n` +
          `🌸 @${number} 🌸\n\n` +
          `❝ _Un nouveau guerrier rejoint\n` +
          `le champ de bataille..._ 😈⚡\n\n` +
          `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
          `📜 *LES RÈGLES DU GROUPE :*\n` +
          `├ ✅ Respecte les membres\n` +
          `├ ✅ Pas de spam\n` +
          `├ ✅ Pas de liens non autorisés\n` +
          `└ ✅ Bonne ambiance ! 😄\n` +
          `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
          `🔥 _Montre nous ce que tu vaux !_\n` +
          `💎 _Le groupe t'attend !_ 👑\n\n` +
          `_Powered by AIGER-XMD_ 🌸`,
        mentions: [participant],
      }).catch(() => {});
    }

    if ((action === "remove" || action === "leave") && settings.goodbye?.[from]) {
      await sock.sendMessage(from, {
        text:
          `┏━━━━━━━━━━━━━━━━━━━━━━━━━━━┓\n` +
          `┃   💔 *DÉPART D'UN MEMBRE* 💔 ┃\n` +
          `┗━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n\n` +
          `╔══════════════════════════════╗\n` +
          `║     🚪 *AU REVOIR !* 🚪      ║\n` +
          `╚══════════════════════════════╝\n\n` +
          `😢 @${number} 😢\n\n` +
          `❝ _Un guerrier quitte\n` +
          `le champ de bataille..._\n` +
          `_Le groupe ne sera plus\n` +
          `jamais pareil !_ 💀😈\n\n` +
          `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
          `💭 _On se souviendra de toi..._\n` +
          `⚡ _Peut-être !_ 😂\n` +
          `🌸 _Bonne continuation !_\n` +
          `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
          `_Powered by AIGER-XMD_ 🌸`,
        mentions: [participant],
      }).catch(() => {});
    }
  }
});

  // ─── Messages ─────────────────────────────────
  sock.ev.on("messages.upsert", async ({ messages, type }) => {
    if (type !== "notify") return;
    const msg = messages[0];
    if (!msg?.message) return;

    const isFromMe = msg.key.fromMe;
// ✅ Ignore les messages envoyés par le bot lui-même
if (isFromMe && !msg.key.participant) {
  msg.key.fromMe = false;
} else if (isFromMe && msg.key.participant) {
  return; // ✅ Ignore en groupe si c'est le bot
}

    const from = msg.key.remoteJid;
    if (from === "status@broadcast") return;

    const sender = msg.key.fromMe
      ? sock.user.id.split(":")[0] + "@s.whatsapp.net"
      : msg.key.participant || from;

    // ✅ Nettoie le numéro — gère @s.whatsapp.net ET @lid
    const senderNumber = sender
      .replace("@s.whatsapp.net", "")
      .replace("@lid", "")
      .split(":")[0];

    const ownerNum = config.ownerNumber?.replace(/[^0-9]/g, "");
    const creatorNum = config.creatorNumber?.replace(/[^0-9]/g, "");

    // ✅ Extrait le LID du sender si format @lid
    const senderLid = sender.includes("@lid")
      ? sender.replace("@lid", "").split(":")[0]
      : null;

    // ✅ Vérifie si owner — 4 méthodes !
    const isOwner =
      isFromMe ||
      senderNumber === ownerNum ||
      senderNumber === creatorNum ||
      (ownerLid && senderLid === ownerLid);

    const isCreator = senderNumber === creatorNum;
    const isGroup = from.endsWith("@g.us");
    const settings = getSettings();
     
    const body =
      msg.message?.conversation ||
      msg.message?.extendedTextMessage?.text ||
      msg.message?.imageMessage?.caption || "";
      
    let groupMetadata = null;
    let senderIsAdmin = false;

    if (isGroup) {
      try {
        groupMetadata = await sock.groupMetadata(from);
        senderIsAdmin = groupMetadata.participants.find(p =>
          p.id === sender ||
          p.id.replace("@lid", "").replace("@s.whatsapp.net", "").split(":")[0] === senderNumber
        )?.admin != null || isOwner;
      } catch {}
    }
      // ✅ Autoreact — juste après body !
if (!global.autoreactGroups) global.autoreactGroups = new Set();
const emojisReact = [
  "😂","🔥","❤️","😈","💀","👑","⚡","🌸","😎","💯","🤩","😍",
  "🎯","🏆","💎","🌊","🦋","🎭","🎪","🎨","🎬","🎤","🎵","🎶",
  "👻","🤡","🦁","🐉","🌈","⭐","🌙","☀️","🍀","🎃","💫","✨",
  "🤣","😭","😤","🥶","🥵","😱","🤯","🥳","😜","🤪","😏","🧠",
  "💪","🙌","👀","🫡","🤝","✌️","🤟","👊","🫶","❤️‍🔥","💥","🚀"
];
if (global.autoreactGroups.has(from) && body) {
  const emoji = emojisReact[Math.floor(Math.random() * emojisReact.length)];
  await sock.sendMessage(from, {
    react: { text: emoji, key: msg.key }
  }).catch(() => {});
}
      if (!global.antilinkWarns) global.antilinkWarns = new Map();

if (isGroup && settings.antilink?.[from] && !msg.key.fromMe && !isOwner && !senderIsAdmin) {
  if (linkRegex.test(body)) {

    // ✅ Supprime SANS vérifier — essaie direct !
    await sock.sendMessage(from, {
      delete: {
        remoteJid: from,
        id: msg.key.id,
        participant: sender,
        fromMe: false,
      }
    }).catch(() => {});

    const warnKey = `${from}_${senderNumber}`;
    const warns = (global.antilinkWarns.get(warnKey) || 0) + 1;
    global.antilinkWarns.set(warnKey, warns);

    if (warns >= 3) {
      global.antilinkWarns.delete(warnKey);
      await sock.groupParticipantsUpdate(from, [sender], "remove").catch(() => {});
      await sock.sendMessage(from, {
        text:
          `╔══════════════════════════════╗\n` +
          `║   🚨 *LIEN DÉTECTÉ !*         ║\n` +
          `╚══════════════════════════════╝\n\n` +
          `⚠️ @${senderNumber}\n\n` +
          `❝ _Tu as été averti 3 fois..._\n` +
          `_Au revoir !_ ❞ 😈\n\n` +
          `🔨 _Expulsé !_\n\n` +
          `_Powered by AIGER-XMD_ 🌸`,
        mentions: [sender],
      }).catch(() => {});
    } else {
      const restant = 3 - warns;
      const coeurs = warns === 1 ? "❤️❤️❤️" : "🖤❤️❤️";
      await sock.sendMessage(from, {
        text:
          `╔══════════════════════════════╗\n` +
          `║   🚨 *LIEN DÉTECTÉ !*         ║\n` +
          `╚══════════════════════════════╝\n\n` +
          `⚠️ @${senderNumber}\n\n` +
          `❝ _Les liens sont interdits !_ ❞ 😈\n\n` +
          `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
          `${coeurs}\n` +
          `⚠️ *Avertissement ${warns}/3*\n` +
          `❌ _Encore ${restant} lien(s) = expulsion !_\n\n` +
          `_Powered by AIGER-XMD_ 🌸`,
        mentions: [sender],
      }).catch(() => {});
    }
    return;
  }
}
    
 
    // ✅ menuSessions global — déclaré ici directement !
if (!global.menuSessions) global.menuSessions = new Map();
const menuSessions = global.menuSessions;
// ✅ Gère réponse liste interactive !
const selectedId = msg.message?.listResponseMessage?.singleSelectReply?.selectedRowId;

if (selectedId?.startsWith("cat_") && global.menuSessions.has(from)) {
  const catKey = selectedId.replace("cat_", "");
  const session = global.menuSessions.get(from);
  const categories = session?.categories || {};
  global.menuSessions.delete(from);

  const cat = {
    groupe: { emoji: "👥", nom: "GROUPE" },
    "média": { emoji: "🎬", nom: "MÉDIA" },
    "téléchargement": { emoji: "📥", nom: "TÉLÉCHARGEMENTS" },
    fun: { emoji: "🎮", nom: "FUN & JEUX" },
    owner: { emoji: "👑", nom: "OWNER" },
    "général": { emoji: "🔧", nom: "GÉNÉRAL" },
  }[catKey];

  const cmds = categories[catKey] || [];
  let text =
    `╔══════════════════════════════╗\n` +
    `║  ${cat?.emoji} *${cat?.nom}*\n` +
    `╚══════════════════════════════╝\n\n`;

  for (const c of cmds) {
    text += `├ *${config.prefix}${c.cmd}*\n`;
    text += `│  _${c.desc}_\n\n`;
  }
  text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `_Tape ${config.prefix}menu pour revenir_ 🔙`;

  await sock.sendMessage(from, { text }, { quoted: msg });
  return;
}

const isMenuReply = false;

// ✅ Quiz — join, new et A B C D !
const isQuizAction =
  body.trim().toLowerCase() === "join" ||
  body.trim().toLowerCase() === "new" ||
  (["A","B","C","D"].includes(body.trim().toUpperCase()) &&
  global.quizRooms?.has(from));

if (isQuizAction) {
  if (plugins.has("quiz")) {
    try {
      await plugins.get("quiz").execute({
        sock, msg, from, args: [],
        body, sender, senderNumber,
        isOwner, isGroup, groupMetadata,
        senderIsAdmin, settings, plugins,
        menuSessions,
      });
    } catch (err) {
      console.error("❌ quiz :", err.message);
    }
  }
  return;
}
      if (settings.mode === "private" && !isOwner && !isCreator) return;
      
    if (!body.startsWith(config.prefix)) return;

    const args = body.slice(config.prefix.length).trim().split(/\s+/);
    const command = args.shift().toLowerCase();

    console.log(`📩 [${senderNumber}] → ${config.prefix}${command}${isGroup ? " (groupe)" : " (privé)"}`);

    if (plugins.has(command)) {
      try {
        await plugins.get(command).execute({
          sock, msg, from, args, body,
          sender, senderNumber,
          isOwner, isCreator, isGroup,
          groupMetadata, senderIsAdmin,
          settings, plugins,
            menuSessions,
        });
      } catch (err) {
        console.error(`❌ Plugin [${command}] :`, err.message);
        await sock.sendMessage(from, {
          text: `❌ Erreur dans *${config.prefix}${command}*`,
        }, { quoted: msg });
      }
    } else {
      await sock.sendMessage(from, {
        text: `❓ *${config.prefix}${command}* inconnue.\nTape *${config.prefix}menu* pour les commandes.`,
      }, { quoted: msg });
    }
  });
}

startBot().catch(err => {
  console.error("❌ Erreur fatale :", err.message);
  process.exit(1);
});