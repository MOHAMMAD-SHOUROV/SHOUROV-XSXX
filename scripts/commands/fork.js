module.exports.config = {
  name: "frok",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Shourov",
  description: "📦 Shourov's bot forks with no prefix",
  commandCategory: "system",
  usages: "Just type: frok, forklink, githublink...",
  cooldowns: 5
};

module.exports.languages = {
  en: {
    title: "🤖 Shourov's GitHub Bot Forks",
    list: `🔹 SHOUROV-BOT\n🌐 https://github.com/MOHAMMAD-SHOUROV/SHOUROV-XSXX`,
    footer: `📌 Facebook: https://www.facebook.com/www.xsxx.com365\n📌 GitHub: https://github.com/MOHAMMAD-SHOUROV`
  }
};

module.exports.handleEvent = async function ({ event, api, getText }) {
  const body = event.body?.toLowerCase() || "";
  const triggers = ["frok", "forklink", "myfrok", "githublink", "github"];

  if (triggers.some(trigger => body.startsWith(trigger))) {
    const message = `╭━〔 ${getText("title")} 〕━╮\n\n${getText("list")}\n\n━━━━━━━━━━━━━━━\n${getText("footer")}`;
    api.sendMessage(message, event.threadID, event.messageID);
  }
};

module.exports.run = () => {}; // No-prefix only, run not used