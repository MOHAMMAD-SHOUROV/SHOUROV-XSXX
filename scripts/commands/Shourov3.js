const axios = require("axios");

module.exports = {
  config: {
    name: "Shourov3",
    version: "1.0.1",
    prefix: false,
    permission: 0,
    credits: "fahim islam",
    description: "Fun",
    category: "no prefix",
    usages: "😒",
    cooldowns: 5,
  },

  handleEvent: async function ({ api, event }) {
    const { threadID, messageID, body } = event;
    if (!body) return;

    const lowerBody = body.toLowerCase();

    if (lowerBody.startsWith("😿") || lowerBody.startsWith("😹")) {
      try {
        const videoUrl = "https://files.catbox.moe/pe0jio.mp4";
        const response = await axios.get(videoUrl, { responseType: "stream" });

        const msg = {
          body: "𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
          attachment: response.data,
        };

        api.sendMessage(msg, threadID, messageID);
        api.setMessageReaction("🥰", messageID, () => {}, true);
      } catch (err) {
        console.error("❌ ভিডিও পাঠাতে সমস্যা:", err.message);
        api.sendMessage("⚠️ ভিডিও পাঠানো যায়নি!", threadID, messageID);
      }
    }
  },

  start: () => {},
};