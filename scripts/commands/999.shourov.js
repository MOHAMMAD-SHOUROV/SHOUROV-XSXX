const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "🥰",
    version: "1.0.1",
    prefix: false,
    permission: 0,
    credits: "nayan",
    description: "Fun",
    category: "no prefix",
    usages: "😒",
    cooldowns: 5,
  },

  handleEvent: async function({ api, event }) {
    const { threadID, messageID, body } = event;
    if (!body) return;

    if (
      body.startsWith("😘") ||
      body.startsWith("🥰") ||
      body.startsWith("😍") ||
      body.startsWith("🤩")
    ) {
      try {
        const audioPath = path.resolve(__dirname, "../cache/Shourov.mp3");
        console.log("Audio file path:", audioPath);
        console.log("File exists:", fs.existsSync(audioPath));

        if (!fs.existsSync(audioPath)) {
          return api.sendMessage("❌ অডিও ফাইল পাওয়া যায়নি!", threadID, messageID);
        }

        const msg = {
          body: "এ্ঁত্ঁ ভা্ঁলো্ঁবা্ঁসা্ঁ ক্ঁই্ঁ পা্ঁওﬄ আﬄমাﬄর্ং বﬄসﬄ সৌﬄর্ংভﬄ কেﬄ এ্ঁক্ঁটুঁ দেﬄওﬄ 🌺",
          attachment: fs.createReadStream(audioPath),
        };

        api.sendMessage(msg, threadID, messageID);
        api.setMessageReaction("😁", messageID, () => {}, true);

      } catch (error) {
        console.error("⚠️ অডিও পাঠাতে সমস্যা:", error.message);
      }
    }
  },

  start() {},
};