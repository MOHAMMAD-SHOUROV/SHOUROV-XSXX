const axios = require("axios");

module.exports = {
  config: {
    name: "fahim6",
    version: "1.0.1",
    prefix: false,
    permission: 0,
    credits: "nayan",
    description: "Fun video reply command",
    category: "no prefix",
    usages: "😒",
    cooldowns: 5,
  },

  handleEvent: async function({ api, event }) {
    const { threadID, messageID, body } = event;
    if (!body) return;

    const lowerBody = body.toLowerCase();

    if (lowerBody.startsWith("bura beti") || lowerBody.startsWith("😵‍💫")) {
      try {
        const videoUrl = "https://i.imgur.com/6EaYYaU.mp4";

        const response = await axios.get(videoUrl, {
          responseType: "stream"
        });

        const msg = {
          body: "𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
          attachment: response.data
        };

        api.sendMessage(msg, threadID, messageID);
        api.setMessageReaction("😓", messageID, (err) => {}, true);

      } catch (error) {
        console.error("❌ ভিডিও আনতে সমস্যা হয়েছে:", error.message);
      }
    }
  },

  start: function() {
    // Optional startup logic
  }
};