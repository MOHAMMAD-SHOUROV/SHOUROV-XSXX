module.exports.config = {
  name: "frok",
  version: "1.0.1",
  hasPermission: 0,
  credits: "King_Shourov",
  description: "📦 Shourov's bot GitHub fork link",
  commandCategory: "system",
  usages: "no prefix",
  cooldowns: 5,
  prefix: false // ✅ prefix না চাইলে এটা false রাখো
};

module.exports.handleEvent = async function({ event, api }) {
  const body = (event.body || "").toLowerCase();
  const triggers = ["frok", "forklink", "myfrok", "githublink"];

  if (triggers.some(trigger => body === trigger)) {
    const message = `
╭━━〔 🤖 Shourov's GitHub Fork 〕━━╮

🔹 SHOUROV-BOT REPO:
🌐 https://github.com/MOHAMMAD-SHOUROV/SHOUROV-XSXX

📌 Facebook:
https://www.facebook.com/www.xsxx.com365

📌 GitHub:
https://github.com/MOHAMMAD-SHOUROV

╰━━━━━━━━━━━━━━━━━━━━━━━╯
    `.trim();
    api.sendMessage(message, event.threadID, event.messageID);
  }
};

module.exports.run = () => {}; // Prefix দিলে এই run ব্যবহার হবে