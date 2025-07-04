const fs = require("fs");

module.exports = {
  config: {
    name: "😒",
    version: "1.0.1",
    prefix: false,
    permission: 0,
    credits: "nayan",
    description: "No-prefix auto-reply with cute message",
    category: "no prefix",
    usages: "🥰",
    cooldowns: 5
  },

  handleEvent: function ({ api, event }) {
    const { threadID, messageID, body } = event;
    if (!body) return;

    const text = body.toLowerCase();

    // Trigger if message starts with any emoji or space
    if (
      text.startsWith(" ") ||
      text.startsWith("😍") ||
      text.startsWith("🥰")
    ) {
      const audioPath = __dirname + "/Nayan/Mayabi.mp3";

      if (!fs.existsSync(audioPath)) {
        return api.sendMessage("❌ অডিও ফাইল খুঁজে পাওয়া যায়নি!", threadID);
      }

      const msg = {
        body: "এ্ঁত্ঁ ভা্ঁলো্ঁবা্ঁসা্ঁ ক্ঁই্ঁ পা্ঁও্ঁ আ্ঁমা্ঁর্ঁ ব্ঁস্ঁ সৌ্ঁর্ঁভ্ঁ কে্ঁ এ্ঁক্ঁটু্ঁ দে্ঁও্ঁ🥰",
        attachment: fs.createReadStream(audioPath)
      };

      api.sendMessage(msg, threadID, () => {
        api.setMessageReaction("😁", messageID, () => {}, true);
      });
    }
  },

  run: function () {} // required by some command loaders
};