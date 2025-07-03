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

    console.log("Current __dirname:", __dirname);
    console.log("Current working directory:", process.cwd());

    const audioPath = path.resolve(__dirname, "../cache/Shourov.mp3");
    console.log("Resolved audio path:", audioPath);

    if (!fs.existsSync(audioPath)) {
      console.log("Audio file does NOT exist!");
      return api.sendMessage("এ্ঁত্ঁ ভা্ঁলো্ঁবা্ঁসা্ঁ ক্ঁই্ঁ পা্ঁও্ঁ আ্ঁমার্ঁ ব্ঁস্ঁ সৌর্ঁভ কে এ্ঁক্ঁটুঁ দেও", threadID, messageID);
    }
    console.log("Audio file exists.");

    if (
      body.startsWith("😘") ||
      body.startsWith("🥰") ||
      body.startsWith("😍") ||
      body.startsWith("🤩")
    ) {
      try {
        const msg = {
          body: "এ্ঁত্ঁ ভা্ঁলো্ঁবা্ঁসা্ঁ ক্ঁই্ঁ পা্ঁও্ঁ আ্ঁমাﬁর্ঁ ব্ঁস্ঁ সৌﬁর্ঁভﬁ কেﬁ এ্ঁক্ঁটুঁ দেﬁওﬁ 🌺",
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