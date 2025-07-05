const axios = require("axios");

let cachedMedia = null;

module.exports = {
  config: {
    name: ".shourov10",
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
    const { threadID, messageID } = event;
    const content = event.body ? event.body.toLowerCase() : "";

    if (content.startsWith("1") || content.startsWith("🥹")) {
      try {
        // নতুন ভিডিও URL ব্যবহার
        const videoURL = 'https://i.imgur.com/fPwwRS3.mp4';

        const response = await axios.get(videoURL, {
          responseType: "stream",
          headers: {
            'User-Agent': 'Mozilla/5.0'
          }
        });

        const msg = {
          body: "𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯 ",
          attachment: response.data,
        };

        api.sendMessage(msg, threadID, () => {
          api.setMessageReaction("😭", messageID, () => {}, true);
        });

      } catch (err) {
        console.error("❌ ভিডিও লোড এ এরর:", err.message);
        api.sendMessage("❌ ভিডিও লোড করতে সমস্যা হয়েছে!", threadID, messageID);
      }
    }
  },

  start: function () {
    console.log("[.shourov10] Module loaded.");
  }
};