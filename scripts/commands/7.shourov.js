const axios = require('axios');
const fs = require("fs");

module.exports = {
  config: {
    name: "Shourov.6",
    version: "1.0.1",
    prefix: false,
    permission: 0,
    credits: "nayan",
    description: "Fun command with media",
    category: "no prefix",
    usages: "😒",
    cooldowns: 5
  },

  handleEvent: async function({ api, event }) {
    const { threadID, messageID, body } = event;
    if (!body) return;

    const lowerBody = body.toLowerCase();
    
    // Trigger words
    if (lowerBody.startsWith("call a aso") || lowerBody.startsWith("😡")) {
      try {
        const mediaUrl = "https://i.imgur.com/hj4iPpe.mp4";

        const response = await axios.get(mediaUrl, {
          responseType: "stream"
        });

        const msg = {
          body: "𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
          attachment: response.data
        };

        api.sendMessage(msg, threadID, messageID);
        api.setMessageReaction("🤣", messageID, (err) => {}, true);

      } catch (error) {
        console.error("Media fetch error:", error);
      }
    }
  },

  start: function() {
    // Optional startup function
  }
};