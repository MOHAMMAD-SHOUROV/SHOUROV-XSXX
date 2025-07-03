const fs = require("fs");
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

    if (content.startsWith("🥺") || content.startsWith("🥹")) {
      try {
        // Media cache না থাকলে ডাউনলোড করো
        if (!cachedMedia) {
          const response = await axios.get('https://i.imgur.com/fPwwRS3.mp4', { responseType: 'stream' });
          cachedMedia = response.data;
        }

        const msg = {
          body: "𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯 ",
          attachment: cachedMedia,
        };

        api.sendMessage(msg, threadID, (err, info) => {
          api.setMessageReaction("😭", messageID, () => {}, true);
        });
      } catch (err) {
        console.error("Media load failed:", err);
        api.sendMessage("❌ ভিডিও লোড করতে সমস্যা হয়েছে!", threadID, messageID);
      }
    }
  },

  start: function () {
    // Start block is optional; if unused, can be removed or used for logging
    console.log("[ nayan ] Module loaded.");
  }
};