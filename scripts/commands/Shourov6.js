const axios = require("axios");

module.exports = {
  config: {
    name: "Shourov6",
    version: "1.0.1",
    prefix: false,
    permssion: 0,
    credits: "nayan",
    description: "Trigger-based fun reply",
    category: "no prefix",
    usages: "😒",
    cooldowns: 5
  },

  handleEvent: async function ({ api, event }) {
    const { threadID, messageID, body } = event;
    if (!body) return;

    const text = body.toLowerCase();
    const triggers = ["👻", "😈"];

    if (triggers.some(trigger => text.includes(trigger))) {
      try {
        const media = (
          await axios.get("https://files.catbox.moe/1bx2l9.mp4", {
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
        console.error("কেউ আমায় ভালো না বাসুক সৌরভ", err.message);
        api.sendMessage("আমি মানুষ টা অনেক খারাপ সৌরভ ", threadID, messageID);
      }
    }
  },

  start: function () {
    // Optional init logic
  }
};