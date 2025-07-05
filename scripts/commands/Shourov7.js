const axios = require("axios");

module.exports = {
  config: {
    name: "Shourov7",
    version: "1.0.1",
    prefix: false,
    permssion: 0,
    credits: "nayan",
    description: "Fun",
    category: "no prefix",
    usages: "😒",
    cooldowns: 5
  },

  handleEvent: async function ({ api, event }) {
    const { threadID, messageID, body } = event;
    if (!body) return;

    const text = body.toLowerCase();
    const triggers = ["🙂", "🤕"];

    // Check trigger
    if (triggers.some(trigger => text.includes(trigger))) {
      try {
        const media = (
          await axios.get("https://files.catbox.moe/h1c7pz.mp4", {
            responseType: "stream"
          })
        ).data;

        const msg = {
          body: "𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯 ",
          attachment: media
        };

        api.sendMessage(msg, threadID, () => {
          api.setMessageReaction("😓", messageID, () => {}, true);
        }, messageID);
        
      } catch (err) {
        console.error("❌ ভিডিও আনতে সমস্যা:", err.message);
        api.sendMessage("সবাই কি বস সৌরভ'র মতো একা🙂", threadID, messageID);
      }
    }
  },

  start: function () {}
};