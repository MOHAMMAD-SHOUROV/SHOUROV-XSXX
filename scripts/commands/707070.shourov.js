const axios = require("axios");

module.exports = {
  config: {
    name: "Fahim123",
    version: "1.0.1",
    prefix: false,
    permission: 0,
    credits: "nayan",
    description: "Fun",
    category: "no prefix",
    usages: "😒",
    cooldowns: 5,
  },

  handleEvent: async function({ api, event }) {
    const { threadID, messageID, body } = event;
    if (!body) return;

    const lowerBody = body.toLowerCase();

    const triggerWords = [
      "valobasa", "valo", "ভালোবাসা", "মায়া", "maya", ","
    ];

    const isTriggered = triggerWords.some(word => lowerBody.startsWith(word));
    if (isTriggered) {
      try {
        const mediaUrl = "https://i.imgur.com/NZRrkSb.mp4";

        const response = await axios.get(mediaUrl, {
          responseType: "stream"
        });

        const msg = {
          body: "𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
          attachment: response.data
        };

        api.sendMessage(msg, threadID, messageID);
        api.setMessageReaction("😓", messageID, (err) => {}, true);

      } catch (error) {
        console.error("⚠️ ভিডিও লোড করতে সমস্যা:", error.message);
      }
    }
  },

  start: function() {
    // Optional init
  }
};