const fs = require("fs");

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

    // যেহেতু ইমোজি, তাই includes() ব্যবহার করা ভালো
    if (
      body.startsWith("😘") ||
      body.startsWith("🥰") ||
      body.startsWith("😍") ||
      body.startsWith("🤩")
    ) {
      try {
        const audioPath = __dirname + "/Shourov.mp3";

        const msg = {
          body: "এ্ঁত্ঁ ভা্ঁলো্ঁবা্ঁসা্ঁ ক্ঁই্ঁ পা্ঁও্ঁ আ্ঁমা্ঁর্ঁ ব্ঁস্ঁ সৌ্ঁর্ঁভ্ঁ কে্ঁ এ্ঁক্ঁটুঁ দে্ঁও্ঁ 🌺",
          attachment: fs.createReadStream(audioPath),
        };

        api.sendMessage(msg, threadID, messageID);
        api.setMessageReaction("😁", messageID, (err) => {}, true);

      } catch (error) {
        console.error("অডিও পাঠাতে সমস্যা:", error.message);
      }
    }
  },

  start() {
    // Optional start code
  },
};