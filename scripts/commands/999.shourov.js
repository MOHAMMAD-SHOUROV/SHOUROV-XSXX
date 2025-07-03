const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "🥰",
    version: "1.0.1",
    prefix: false,
    permission: 0,
    credits: "nayan",
    description: "Fun audio response",
    category: "no prefix",
    usages: "Send 🥰 or 😘 etc.",
    cooldowns: 5,
  },

  handleEvent: async function ({ api, event }) {
    const { threadID, messageID, body } = event;
    if (!body) return;

    // Target emojis
    if (
      body.startsWith("😘") ||
      body.startsWith("🥰") ||
      body.startsWith("😍") ||
      body.startsWith("🤩")
    ) {
      // Resolve the correct path to Shourov.mp3
      const audioPath = path.join(__dirname, "../cache/Shourov.mp3");

      // Check if file exists
      if (!fs.existsSync(audioPath)) {
        console.log("❌ অডিও ফাইল পাওয়া যায়নি:", audioPath);
        return api.sendMessage("❌ অডিও ফাইল পাওয়া যায়নি!", threadID, messageID);
      }

      try {
        const msg = {
          body: "এ্ঁত্ঁ ভা্ঁলো্ঁবা্ঁসা্ঁ ক্ঁই্ঁ পা্ঁও্ঁ আ্ঁমা্ঁর্ঁ ব্ঁস্ঁ সৌ্ঁর্ঁভ্ঁ কে্ঁ এ্ঁক্ঁটুঁ দে্ঁও্ঁ 🌺",
          attachment: fs.createReadStream(audioPath),
        };

        // Send audio message
        api.sendMessage(msg, threadID, messageID);

        // React to the message
        api.setMessageReaction("😁", messageID, () => {}, true);
      } catch (error) {
        console.error("⚠️ অডিও পাঠাতে সমস্যা:", error.message);
        return api.sendMessage("⚠️ অডিও পাঠাতে সমস্যা হয়েছে!", threadID, messageID);
      }
    }
  },

  start() {
    // Optional startup code
  },
};