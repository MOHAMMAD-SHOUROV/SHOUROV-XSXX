module.exports.config = {
  name: "frok",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Shourov",
  description: "📦 Share Shourov's bot GitHub fork link",
  commandCategory: "system",
  usages: "Type: frok / forklink / githublink...",
  cooldowns: 5
};

module.exports.languages = {
  en: {
    title: "🤖 Shourov's GitHub Bot Fork",
    list: `🔹 SHOUROV-XSXX\n🌐 GitHub: https://github.com/MOHAMMAD-SHOUROV/SHOUROV-XSXX`,
    footer: `📌 Developer: https://facebook.com/www.xsxx.com365\n📌 Support GitHub 🌟 & Follow!`
  }
};

module.exports.handleEvent = async function ({ event, api, getText }) {
  const body = event.body?.toLowerCase() || "";
  const triggers = ["frok", "forklink", "myfrok", "githublink", "github"];

  if (triggers.some(trigger => body.includes(trigger))) {
    const msg = `╭━〔 ${getText("title")} 〕━╮\n\n${getText("list")}\n\n━━━━━━━━━━━━━━━\n${getText("footer")}`;
    return api.sendMessage(msg, event.threadID, event.messageID);
  }
};

module.exports.run = () => {};