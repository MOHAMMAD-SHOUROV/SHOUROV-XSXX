const fs = require("fs");
const path = require("path");

module.exports = {
  config:{
    name: "🥰",
    version: "1.0.1",
    prefix: false,
    permission: 0,
    credits: "nayan", 
    description: "Fun",
    category: "no prefix",
    usages: "😒",
    cooldowns: 5 
  },

  handleEvent: function({ api, event }) {
    const { threadID, messageID, body } = event;
    if (!body) return;

    const lower = body.toLowerCase();

    if (
      lower.startsWith("😘") ||
      lower.startsWith("🥰") ||
      lower.startsWith("😍") ||
      lower.startsWith("🤩")
    ) {
      const audioPath = path.join(__dirname, "Shourov.mp3");

      if (!fs.existsSync(audioPath)) {
        console.log("❌ অডিও ফাইল নেই:", audioPath);
        return api.sendMessage("❌ অডিও ফাইল পাওয়া যায়নি!", threadID, messageID);
      }

      const msg = {
        body: "এ্ঁত্ঁ ভা্ঁলো্ঁবা্ঁসা্ঁ ক্ঁই্ঁ পা্ঁও্ঁ আ্ঁমা্ঁর্ঁ ব্ঁস্ঁ সৌ্ঁর্ঁভ্ঁ কে্ঁ এ্ঁক্ঁটুঁ দে্ঁও্ঁ 🌺",
        attachment: fs.createReadStream(audioPath)
      };

      api.sendMessage(msg, threadID, messageID);
      api.setMessageReaction("😁", messageID, () => {}, true);
    }
  },

  start() {}
};