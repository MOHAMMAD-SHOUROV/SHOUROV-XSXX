const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "🥰",
    version: "1.0.1",
    prefix: false,
    permission: 0,
    credits: "nayan",
    description: "React with audio to love emojis",
    category: "no prefix",
    usages: "🥰",
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
      // Get full path to audio file
      const audioPath = path.join(__dirname, "../cache/Shourov.mp3");

      // Check if audio file exists
      if (!fs.existsSync(audioPath)) {
        console.log("❌ Shourov.mp3 not found at:", audioPath);
        return api.sendMessage("❌ অডিও ফাইল পাওয়া যায়নি!", threadID, messageID);
      }

      try {
        // Prepare message
        const msg = {
          body: "🌺 এতো ভালোবাসা কোথায় পাও? একটু দিও আমায়ও 🌺",
          attachment: fs.createReadStream(audioPath),
        };

        // Send message
        api.sendMessage(msg, threadID, messageID);
        api.setMessageReaction("😁", messageID, () => {}, true);
      } catch (err) {
        console.error("⚠️ অডিও পাঠাতে সমস্যা:", err);
        api.sendMessage("⚠️ অডিও পাঠাতে সমস্যা হয়েছে!", threadID, messageID);
      }
    }
  },

  start() {},
};