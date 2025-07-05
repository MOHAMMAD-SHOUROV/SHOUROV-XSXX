const axios = require("axios");

module.exports = {
  config: {
    name: "Shourov9",
    version: "1.0.1",
    prefix: false,
    permssion: 0,
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

    // যদি 🤴 বা 👸 থাকে
    if (text.includes("🤴") || text.includes("👸")) {
      try {
        const media = (
          await axios.get("https://files.catbox.moe/1bx2l9.mp4", {
            responseType: "stream",
          })
        ).data;

        const msg = {
          body: "𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯 👑",
          attachment: media,
        };

        api.sendMessage(msg, threadID, () => {
          api.setMessageReaction("😓", messageID, () => {}, true);
        });
      } catch (err) {
        console.error("❌ ভিডিও আনতে সমস্যা:", err.message);
        api.sendMessage("❌ ভিডিও পাঠাতে সমস্যা হয়েছে!", threadID, messageID);
      }
    }
  },

  start: function () {}
};