// ═══════════════════════════════════════════
// 🌸 AIGER-XMD — Créé par MOUHAMED 🌸 DARK 🌸
// ⚠️ Toute copie sans autorisation interdite
// ═══════════════════════════════════════════

const questions = [
  { question: "🌍 Quelle est la capitale de la France ?", choices: { A: "Lyon", B: "Marseille", C: "Paris", D: "Bordeaux" }, answer: "C", cat: "🌍 Géographie" },
  { question: "🌍 Quel est le plus grand pays du monde ?", choices: { A: "Canada", B: "Russie", C: "Chine", D: "USA" }, answer: "B", cat: "🌍 Géographie" },
  { question: "🌍 Quelle est la capitale du Japon ?", choices: { A: "Osaka", B: "Kyoto", C: "Hiroshima", D: "Tokyo" }, answer: "D", cat: "🌍 Géographie" },
  { question: "🌍 Quel est le plus long fleuve du monde ?", choices: { A: "Amazone", B: "Congo", C: "Nil", D: "Mississippi" }, answer: "C", cat: "🌍 Géographie" },
  { question: "🌍 Quelle est la capitale du Brésil ?", choices: { A: "São Paulo", B: "Rio", C: "Brasilia", D: "Salvador" }, answer: "C", cat: "🌍 Géographie" },
  { question: "⚽ Quelle équipe a gagné la Coupe du Monde 2018 ?", choices: { A: "Brésil", B: "Allemagne", C: "Argentine", D: "France" }, answer: "D", cat: "⚽ Sport" },
  { question: "⚽ Combien de fois le Brésil a gagné la Coupe du Monde ?", choices: { A: "3", B: "4", C: "5", D: "6" }, answer: "C", cat: "⚽ Sport" },
  { question: "🏀 Qui détient le record de points NBA all-time ?", choices: { A: "Kobe", B: "Jordan", C: "LeBron", D: "Kareem" }, answer: "C", cat: "⚽ Sport" },
  { question: "🎾 Qui détient le record de Grands Chelems ?", choices: { A: "Federer", B: "Nadal", C: "Djokovic", D: "Murray" }, answer: "C", cat: "⚽ Sport" },
  { question: "⚽ Quel pays a organisé la Coupe du Monde 2022 ?", choices: { A: "Arabie Saoudite", B: "Qatar", C: "Dubaï", D: "Bahreïn" }, answer: "B", cat: "⚽ Sport" },
  { question: "🧠 Qui a peint la Joconde ?", choices: { A: "Picasso", B: "Michel-Ange", C: "Raphaël", D: "Léonard de Vinci" }, answer: "D", cat: "🧠 Culture" },
  { question: "🧠 En quelle année l'homme a marché sur la Lune ?", choices: { A: "1965", B: "1969", C: "1972", D: "1967" }, answer: "B", cat: "🧠 Culture" },
  { question: "🧠 Quelle est la langue la plus parlée au monde ?", choices: { A: "Anglais", B: "Espagnol", C: "Hindi", D: "Mandarin" }, answer: "D", cat: "🧠 Culture" },
  { question: "🧠 Combien de continents sur Terre ?", choices: { A: "5", B: "6", C: "7", D: "8" }, answer: "C", cat: "🧠 Culture" },
  { question: "🧠 Qui a écrit Romeo et Juliette ?", choices: { A: "Victor Hugo", B: "Shakespeare", C: "Molière", D: "Voltaire" }, answer: "B", cat: "🧠 Culture" },
  { question: "⚡ Quelle est la vitesse de la lumière ?", choices: { A: "150 000 km/s", B: "300 000 km/s", C: "200 000 km/s", D: "450 000 km/s" }, answer: "B", cat: "⚡ Science" },
  { question: "⚡ Qui a inventé l'ampoule électrique ?", choices: { A: "Tesla", B: "Edison", C: "Einstein", D: "Newton" }, answer: "B", cat: "⚡ Science" },
  { question: "⚡ Quelle est la formule de l'eau ?", choices: { A: "CO2", B: "H2O2", C: "HO", D: "H2O" }, answer: "D", cat: "⚡ Science" },
  { question: "⚡ Quelle planète est la plus proche du Soleil ?", choices: { A: "Vénus", B: "Mars", C: "Mercure", D: "Terre" }, answer: "C", cat: "⚡ Science" },
  { question: "⚡ Combien de chromosomes a l'être humain ?", choices: { A: "23", B: "44", C: "46", D: "48" }, answer: "C", cat: "⚡ Science" },
  { question: "🎬 Qui a réalisé Titanic ?", choices: { A: "Spielberg", B: "Nolan", C: "James Cameron", D: "Scorsese" }, answer: "C", cat: "🎬 Cinéma" },
  { question: "🎬 Quel acteur joue Iron Man ?", choices: { A: "Chris Evans", B: "Chris Hemsworth", C: "Robert Downey Jr", D: "Mark Ruffalo" }, answer: "C", cat: "🎬 Cinéma" },
  { question: "🎬 Dans quel film : 'Je suis ton père' ?", choices: { A: "Star Trek", B: "Star Wars", C: "Avengers", D: "Matrix" }, answer: "B", cat: "🎬 Cinéma" },
  { question: "🎬 Qui a réalisé Inception ?", choices: { A: "Spielberg", B: "Cameron", C: "Christopher Nolan", D: "Tarantino" }, answer: "C", cat: "🎬 Cinéma" },
  { question: "🎵 Qui a chanté 'Thriller' ?", choices: { A: "Prince", B: "Michael Jackson", C: "James Brown", D: "Whitney" }, answer: "B", cat: "🎵 Musique" },
  { question: "🎵 Quel groupe a chanté 'Bohemian Rhapsody' ?", choices: { A: "The Beatles", B: "Rolling Stones", C: "Queen", D: "Led Zeppelin" }, answer: "C", cat: "🎵 Musique" },
  { question: "🎵 De quel pays vient le reggae ?", choices: { A: "Cuba", B: "Brésil", C: "Jamaïque", D: "Trinidad" }, answer: "C", cat: "🎵 Musique" },
  { question: "🎵 Qui est le 'Roi du Rock' ?", choices: { A: "Chuck Berry", B: "Elvis Presley", C: "Jerry Lee Lewis", D: "Buddy Holly" }, answer: "B", cat: "🎵 Musique" },
  { question: "🎌 Quel est le jutsu signature de Naruto ?", choices: { A: "Chidori", B: "Rasengan", C: "Kage Bunshin", D: "Amaterasu" }, answer: "B", cat: "🎌 Naruto" },
  { question: "🎌 Qui est le père de Naruto ?", choices: { A: "Jiraiya", B: "Kakashi", C: "Minato", D: "Hiruzen" }, answer: "C", cat: "🎌 Naruto" },
  { question: "🎌 Quel est le bijuu de Naruto ?", choices: { A: "Nibi", B: "Hachibi", C: "Kyubi", D: "Gobi" }, answer: "C", cat: "🎌 Naruto" },
  { question: "🎌 Qui a tué Itachi ?", choices: { A: "Naruto", B: "Sasuke", C: "Madara", D: "Obito" }, answer: "B", cat: "🎌 Naruto" },
  { question: "🎌 Quel village est Naruto ?", choices: { A: "Suna", B: "Kumo", C: "Konoha", D: "Kiri" }, answer: "C", cat: "🎌 Naruto" },
  { question: "🐉 Quel est le niveau ultime de Goku ?", choices: { A: "SSJ3", B: "SSJ Blue", C: "Ultra Instinct", D: "SSJ4" }, answer: "C", cat: "🐉 Dragon Ball" },
  { question: "🐉 Qui est le père de Goku ?", choices: { A: "Vegeta", B: "Bardock", C: "Raditz", D: "Nappa" }, answer: "B", cat: "🐉 Dragon Ball" },
  { question: "🐉 Qui a détruit la planète Végéta ?", choices: { A: "Cell", B: "Buu", C: "Freezer", D: "Broly" }, answer: "C", cat: "🐉 Dragon Ball" },
  { question: "🐉 Combien de Dragon Balls existe-t-il ?", choices: { A: "5", B: "6", C: "8", D: "7" }, answer: "D", cat: "🐉 Dragon Ball" },
  { question: "🐉 Qui est le rival de Goku ?", choices: { A: "Piccolo", B: "Krilin", C: "Vegeta", D: "Gohan" }, answer: "C", cat: "🐉 Dragon Ball" },
  { question: "⚔️ Quel est le style de Tanjiro ?", choices: { A: "Eau", B: "Feu", C: "Tonnerre", D: "Vent" }, answer: "A", cat: "⚔️ Demon Slayer" },
  { question: "⚔️ Comment s'appelle la sœur de Tanjiro ?", choices: { A: "Aoi", B: "Kanao", C: "Nezuko", D: "Shinobu" }, answer: "C", cat: "⚔️ Demon Slayer" },
  { question: "⚔️ Qui est le Grand Démon ?", choices: { A: "Akaza", B: "Doma", C: "Muzan", D: "Kokushibo" }, answer: "C", cat: "⚔️ Demon Slayer" },
  { question: "⚔️ Quel est le style de Zenitsu ?", choices: { A: "Eau", B: "Tonnerre", C: "Feu", D: "Vent" }, answer: "B", cat: "⚔️ Demon Slayer" },
  { question: "🌊 Quel est le rêve de Luffy ?", choices: { A: "Meilleur épéiste", B: "Roi des Pirates", C: "Amiral", D: "Navigateur" }, answer: "B", cat: "🌊 One Piece" },
  { question: "🌊 Quel fruit a mangé Luffy ?", choices: { A: "Mera Mera", B: "Yami Yami", C: "Gum Gum", D: "Ope Ope" }, answer: "C", cat: "🌊 One Piece" },
  { question: "🌊 Qui est le meilleur épéiste de l'équipage ?", choices: { A: "Sanji", B: "Usopp", C: "Zoro", D: "Luffy" }, answer: "C", cat: "🌊 One Piece" },
  { question: "🌊 Qui a le fruit Yami Yami ?", choices: { A: "Akainu", B: "Blackbeard", C: "Shanks", D: "Kaido" }, answer: "B", cat: "🌊 One Piece" },
  { question: "🌀 Quel est le Beyblade de Tyson ?", choices: { A: "Draciel", B: "Dranzer", C: "Driger", D: "Dragoon" }, answer: "D", cat: "🌀 Beyblade" },
  { question: "🌀 Quel est le Beyblade de Kai ?", choices: { A: "Dranzer", B: "Draciel", C: "Driger", D: "Dragoon" }, answer: "A", cat: "🌀 Beyblade" },
  { question: "🌀 Comment s'appelle l'équipe de Tyson ?", choices: { A: "White Tigers", B: "Blade Sharks", C: "BBA Team", D: "Majestics" }, answer: "C", cat: "🌀 Beyblade" },
  { question: "💥 Quel est le Quirk de Deku ?", choices: { A: "Explosion", B: "One For All", C: "Half-Cold Half-Hot", D: "Zero Gravity" }, answer: "B", cat: "💥 My Hero Academia" },
  { question: "💥 Qui est le rival de Deku ?", choices: { A: "Todoroki", B: "Kirishima", C: "Bakugo", D: "Uraraka" }, answer: "C", cat: "💥 My Hero Academia" },
  { question: "💥 Quel est le Quirk de Bakugo ?", choices: { A: "One For All", B: "Explosion", C: "Hardening", D: "Zero Gravity" }, answer: "B", cat: "💥 My Hero Academia" },
  { question: "⚔️ Qui est le protagoniste d'AOT ?", choices: { A: "Armin", B: "Levi", C: "Eren", D: "Mikasa" }, answer: "C", cat: "⚔️ Attack on Titan" },
  { question: "⚔️ Quel titan Eren possède en premier ?", choices: { A: "Colossal", B: "Cuirassé", C: "Assaillant", D: "Féminin" }, answer: "C", cat: "⚔️ Attack on Titan" },
  { question: "⚔️ Qui est le meilleur soldat de l'humanité ?", choices: { A: "Eren", B: "Mikasa", C: "Levi", D: "Erwin" }, answer: "C", cat: "⚔️ Attack on Titan" },
];

if (!global.quizRooms) global.quizRooms = new Map();

module.exports = {
  name: "quiz",
  description: "🎯 Quiz multijoueur compétitif — 10 questions !",
  category: "fun",

  async execute({ sock, from, msg, body, sender, senderNumber, isOwner }) {

    const room = global.quizRooms.get(from);
    const txt = body.trim().toLowerCase();

    // ✅ JOIN
    if (txt === "join") {
      if (!room || room.status !== "waiting") {
        return await sock.sendMessage(from, {
          text: `❌ Aucun quiz en attente !\n_Tape *!quiz* pour lancer !_ 🎯`,
        }, { quoted: msg });
      }
      if (room.players.find(p => p.id === sender)) {
        return await sock.sendMessage(from, {
          text: `⚠️ @${senderNumber} tu es déjà inscrit ! 😂`,
          mentions: [sender],
        }, { quoted: msg });
      }
      if (room.players.length >= 10) {
        return await sock.sendMessage(from, {
          text: `❌ *Maximum 10 joueurs atteint !* ⛔`,
        }, { quoted: msg });
      }
      room.players.push({ id: sender, number: senderNumber, score: 0 });
      await sock.sendMessage(from, {
        text:
          `╔══════════════════════════════╗\n` +
          `║     🎮 *NOUVEAU JOUEUR !*     ║\n` +
          `╚══════════════════════════════╝\n\n` +
          `🎉 Bienvenue @${senderNumber} !\n\n` +
          `👥 *Joueurs inscrits : ${room.players.length}/10*\n` +
          `${room.players.map((p, i) => `├ ${i + 1}. @${p.number}`).join("\n")}\n\n` +
          `⏳ _Quiz démarre automatiquement !_\n\n` +
          `_Powered by AIGER-XMD_ 🌸`,
        mentions: room.players.map(p => p.id),
      }, { quoted: msg });
      return;
    }

    // ✅ NEW — Recommence après fin
    if (txt === "new") {
      if (!isOwner) {
        return await sock.sendMessage(from, {
          text: `❌ Seul le *owner* peut relancer !`,
        }, { quoted: msg });
      }
      if (global.quizRooms.has(from)) {
        return await sock.sendMessage(from, {
          text: `⚠️ Un quiz est déjà en cours !\nTape *join* pour participer ! 🎮`,
        }, { quoted: msg });
      }
      const shuffled = [...questions].sort(() => Math.random() - 0.5).slice(0, 10);
      const newRoom = {
        status: "waiting", players: [], questions: shuffled,
        current: 0, answered: [], correct: 0, timer: null, waitTimer: null,
      };
      global.quizRooms.set(from, newRoom);
      await sock.sendMessage(from, {
        text:
          `╔══════════════════════════════╗\n` +
          `║   🔄 *NOUVEAU QUIZ !*         ║\n` +
          `╚══════════════════════════════╝\n\n` +
          `⏳ *60 secondes pour rejoindre !*\n\n` +
          `👉 _Tape *join* pour participer !_\n\n` +
          `_Powered by AIGER-XMD_ 🌸`,
      }, { quoted: msg });
      newRoom.waitTimer = setTimeout(async () => {
        await demarrerOuAnnuler(sock, from, newRoom);
      }, 60000);
      return;
    }

    // ✅ Réponse A B C D
    if (["A","B","C","D"].includes(body.trim().toUpperCase())) {
      if (!room || room.status !== "playing") return;
      const player = room.players.find(p => p.id === sender);
      if (!player) return;
      if (room.answered.includes(sender)) return;

      const reponse = body.trim().toUpperCase();
      const q = room.questions[room.current];
      const correct = reponse === q.answer;

      // ✅ Mauvaise réponse → éliminé pour cette question !
      if (!correct) {
        room.answered.push(sender);
        await sock.sendMessage(from, {
          text:
            `╔══════════════════════════════╗\n` +
            `║     ❌ *MAUVAISE RÉPONSE !*   ║\n` +
            `╚══════════════════════════════╝\n\n` +
            `😢 @${senderNumber} *éliminé pour cette question !*\n\n` +
            `❝ _Tu pourras répondre_\n` +
            `_à la prochaine question !_ ❞ 💪\n\n` +
            `⏳ _Attends la question suivante..._`,
          mentions: [sender],
        });
        return;
      }

      // ✅ Bonne réponse — points !
      const rank = room.correct + 1;
      room.correct++;
      room.answered.push(sender);

      let points = 0;
      let medal = "";
      if (rank === 1)      { points = 15; medal = "🥇"; }
      else if (rank === 2) { points = 10; medal = "🥈"; }
      else if (rank === 3) { points = 5;  medal = "🥉"; }

      if (points > 0) {
        player.score += points;
        await sock.sendMessage(from, {
          text:
            `${medal} @${senderNumber} *BONNE RÉPONSE !* 🔥\n` +
            `💰 *+${points} points !* Total : *${player.score} pts*`,
          mentions: [sender],
        });
      }

      // ✅ Top 3 ou tout le monde a répondu
      if (room.correct >= 3 || room.answered.length >= room.players.length) {
        if (room.timer) clearTimeout(room.timer);
        room.current++;
        if (room.current >= 10) return await terminerQuiz(sock, from, room);
        room.answered = [];
        room.correct = 0;
        await new Promise(r => setTimeout(r, 2000));
        await envoyerQuestion(sock, from, room);
      }
      return;
    }

    // ✅ Lance !quiz
    if (global.quizRooms.has(from)) {
      return await sock.sendMessage(from, {
        text:
          `⚠️ *Un quiz est déjà ouvert !*\n` +
          `👉 Tape *join* pour participer ! 🎮`,
      }, { quoted: msg });
    }

    const shuffled = [...questions].sort(() => Math.random() - 0.5).slice(0, 10);
    const newRoom = {
      status: "waiting", players: [], questions: shuffled,
      current: 0, answered: [], correct: 0, timer: null, waitTimer: null,
    };
    global.quizRooms.set(from, newRoom);

    await sock.sendMessage(from, {
      text:
        `╔══════════════════════════════╗\n` +
        `║   🎯 *QUIZ MULTIJOUEUR !*     ║\n` +
        `╚══════════════════════════════╝\n\n` +
        `❝ _Qui sera le plus rapide ?_\n` +
        `_Qui sera le plus intelligent ?_ ❞ 😈\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `📌 *Règles :*\n` +
        `├ 🎮 Tape *join* pour participer\n` +
        `├ 👥 Max *10 joueurs*\n` +
        `├ 🎯 *10 questions* variées\n` +
        `├ ⏱️ *60 secondes* par question\n` +
        `├ 🥇 1er correct → *+15 pts*\n` +
        `├ 🥈 2ème correct → *+10 pts*\n` +
        `└ 🥉 3ème correct → *+5 pts*\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `⏳ *60 secondes pour rejoindre !*\n` +
        `👉 _Tape *join* pour participer !_\n\n` +
        `_Powered by AIGER-XMD_ 🌸`,
    }, { quoted: msg });

    newRoom.waitTimer = setTimeout(async () => {
      await demarrerOuAnnuler(sock, from, newRoom);
    }, 60000);
  },
};

// ✅ Démarre ou annule après 60s !
async function demarrerOuAnnuler(sock, from, room) {
  if (!global.quizRooms.has(from)) return;
  if (room.players.length === 0) {
    global.quizRooms.delete(from);
    return await sock.sendMessage(from, {
      text:
        `╔══════════════════════════════╗\n` +
        `║     ❌ *QUIZ ANNULÉ !*        ║\n` +
        `╚══════════════════════════════╝\n\n` +
        `😢 _Aucun participant ne s'est inscrit !_\n\n` +
        `💡 _Tape *!quiz* pour réessayer !_\n\n` +
        `_Powered by AIGER-XMD_ 🌸`,
    });
  }
  room.status = "playing";
  const mentions = room.players.map(p => p.id);
  await sock.sendMessage(from, {
    text:
      `╔══════════════════════════════╗\n` +
      `║      🚀 *LE QUIZ COMMENCE !*  ║\n` +
      `╚══════════════════════════════╝\n\n` +
      `👥 *${room.players.length} joueur(s) inscrits :*\n` +
      `${room.players.map((p, i) => `├ ${i + 1}. @${p.number}`).join("\n")}\n\n` +
      `🏆 *Système de points :*\n` +
      `├ 🥇 1er correct → *+15 pts*\n` +
      `├ 🥈 2ème correct → *+10 pts*\n` +
      `└ 🥉 3ème correct → *+5 pts*\n\n` +
      `❝ _Que le meilleur gagne !_ ❞ 😈\n\n` +
      `_Powered by AIGER-XMD_ 🌸`,
    mentions,
  });
  await new Promise(r => setTimeout(r, 3000));
  await envoyerQuestion(sock, from, room);
}

// ✅ Envoie chaque question !
async function envoyerQuestion(sock, from, room) {
  if (!global.quizRooms.has(from)) return;
  const q = room.questions[room.current];
  const num = room.current + 1;

  await sock.sendMessage(from, {
    text:
      `╔══════════════════════════════╗\n` +
      `║  ❓ *QUESTION ${num} sur 10*        ║\n` +
      `╚══════════════════════════════╝\n\n` +
      `📂 _${q.cat}_\n\n` +
      `❓ *${q.question}*\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `🅰️ *A —* ${q.choices.A}\n` +
      `🅱️ *B —* ${q.choices.B}\n` +
      `🆎 *C —* ${q.choices.C}\n` +
      `🅾️ *D —* ${q.choices.D}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `⏱️ _*60 secondes* !_ 🏃 *Soyez rapides !*`,
  });

  room.timer = setTimeout(async () => {
    if (!global.quizRooms.has(from)) return;
    await sock.sendMessage(from, {
      text:
        `⏰ *Temps écoulé !*\n\n` +
        `💡 *Bonne réponse :*\n` +
        `*${q.answer} — ${q.choices[q.answer]}*\n\n` +
        `😴 _Personne n'a été assez rapide !_`,
    });
    room.current++;
    if (room.current >= 10) return await terminerQuiz(sock, from, room);
    room.answered = [];
    room.correct = 0;
    await new Promise(r => setTimeout(r, 2000));
    await envoyerQuestion(sock, from, room);
  }, 60000);
}

// ✅ Fin du quiz !
async function terminerQuiz(sock, from, room) {
  global.quizRooms.delete(from);
  const sorted = [...room.players].sort((a, b) => b.score - a.score);
  const mentions = sorted.map(p => p.id);
  const podium = ["🥇","🥈","🥉","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟"];
  let classement = "";
  sorted.forEach((p, i) => { classement += `${podium[i]} @${p.number} — *${p.score} pts*\n`; });
  const winner = sorted[0];
  await sock.sendMessage(from, {
    text:
      `╔══════════════════════════════╗\n` +
      `║      🏆 *QUIZ TERMINÉ !*      ║\n` +
      `╚══════════════════════════════╝\n\n` +
      `👑 *GAGNANT : @${winner.number}* 🎉\n` +
      `🏆 *Score : ${winner.score} points !*\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `📊 *CLASSEMENT FINAL :*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `${classement}\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `🔄 _Envie de rejouer ?_\n` +
      `👑 _Owner tape *new* pour relancer !_\n` +
      `_(Pas besoin de !quiz)_ 😎\n\n` +
      `_Powered by AIGER-XMD_ 🌸`,
    mentions,
  });
}