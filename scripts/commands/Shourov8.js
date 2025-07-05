const axios = require("axios");

module.exports = {
  config: {
    name: "Shourov8",
    version: "1.0.1",
    prefix: false,
    permission: 0, // spelling fix: permssion -> permission
    credits: "nayan",
    description: "Fun",
    category: "no prefix",
    usages: "😒",
    cooldowns: 5,
  },

  handleEvent: async function ({ api, event }) {
    const { threadID, messageID, body } = event;
    if (!body) return;

    const text = body.toLowerCase();

    // Trigger emojis
    const triggers = ["8", "🗯8"];
    if (!triggers.some(trigger => text.startsWith(trigger))) return;

    try {
      const media = (
        await axios.get("https://files.catbox.moe/kp8t84.mp4", {
          responseType: "stream"
        })
      ).data;

      const msg = {
        body: "𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
        attachment: media
      };

      api.sendMessage(msg, threadID, () => {
        api.setMessageReaction("😓", messageID, () => {}, true);
      });

    } catch (err) {
      console.error("🔴 ভিডিও ডাউনলোডে সমস্যা:", err.message);
      api.sendMessage(" বস সৌরভ'র পক্ষ থেকে উম্মাহ", threadID);
    }
  },

  start: function () {}
};