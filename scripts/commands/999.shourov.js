const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "🥰",
    version: "1.0.1",
    prefix: false,
    permission: 0,
    credits: "nayan",
    description: "Fun audio emoji reply",
    category: "no prefix",
    usages: "🥰",
    cooldowns: 5,
  },

  handleEvent: function ({ api, event }) {
    const { threadID, messageID, body } = event;
    if (!body) return;

    if (
      body.startsWith("😘") ||
      body.startsWith("🥰") ||
      body.startsWith("😍") ||
      body.startsWith("🤩")
    ) {
      // 🔥 ঠিক path ও ফাইল নাম
      const audioPath = path.join(
        __dirname,
        "../cache/এত ভালোবাসা কই পাও আমার বস সৌরভ কে একটু দেও _1751567240087.mp3"
      );

      // ✅ ফাইল আছে কিনা চেক
      if (!fs.existsSync(audioPath)) {
        console.log("❌ অডিও ফাইল নেই:", audioPath);
        return api.sendMessage("❌ অডিও ফাইল পাওয়া যায়নি!", threadID, messageID);
      }

      const msg = {
        body: "🌺 এত ভালোবাসা কোথায় পাও? একটু দিও আমায়ও 🌺",
        attachment: fs.createReadStream(audioPath),
      };

      api.sendMessage(msg, threadID, messageID);
      api.setMessageReaction("😁", messageID, () => {}, true);
    }
  },

  start() {},
};