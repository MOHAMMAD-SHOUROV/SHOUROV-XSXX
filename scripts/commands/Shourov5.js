const axios = require("axios");

module.exports = {
  config: {
    name: "Shourov5",
    version: "1.0.1",
    prefix: false,
    permission: 0,
    credits: "nayan",
    description: "Fun",
    category: "no prefix",
    usages: "😒",
    cooldowns: 5,
  },

  handleEvent: async function ({ api, event }) {
    const { threadID, messageID, body } = event;
    if (!body) return;

    const content = body.toLowerCase();

    if (content.startsWith("😹") || content.startsWith("🥵")) {
      try {
        const media = (
          await axios.get("https://files.catbox.moe/qe7wlc.mp4", {
            responseType: "stream",
          })
        ).data;

        const msg = {
          body: "𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯 ",
          attachment: media,
        };

        api.sendMessage(msg, threadID, messageID);
        api.setMessageReaction("😆", messageID, () => {}, true);
      } catch (err) {
        console.error("⚠️ ভিডিও পাঠাতে সমস্যা:", err.message);
        api.sendMessage("❌ ভিডিও পাঠানো সম্ভব হয়নি!", threadID, messageID);
      }
    }
  },

  start() {},
};