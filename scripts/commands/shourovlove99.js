const fs = require("fs");
module.exports = {
  config: {
    name: "shourovlove99",
    version: "1.0.1",
    prefix: false,
    permssion: 0,
    credits: "Nayan",
    description: "Trigger-based love video by keyword",
    category: "no prefix",
    usages: "auto-response",
    cooldowns: 5,
  },

  handleEvent: async function ({ api, event }) {
    const { threadID, messageID, body } = event;
    if (!body) return;

    const lowerText = body.toLowerCase();
    const triggers = [
      "shourov",
      "love",
      "সৌরভ",
      "maya",
      "king"
    ];

    // Check if any trigger word exists
    if (triggers.some(word => lowerText.includes(word))) {
      const axios = require("axios");

      const media = (
        await axios.get("https://i.imgur.com/IFNUfqx.mp4", {
          responseType: "stream",
        })
      ).data;

      const msg = {
        body: "🖤𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯🖤",
        attachment: media,
      };

      api.sendMessage(msg, threadID, messageID);
      api.setMessageReaction("😓", messageID, (err) => {}, true);
    }
  },

  start: function () {
    // No startup logic needed
  }
};