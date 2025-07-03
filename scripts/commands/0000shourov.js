const axios = require("axios");

let cachedMedia = null;

module.exports = {
  config: {
    name: "01fahim",
    version: "1.0.1",
    prefix: false,
    permission: 0, // ✅ spelling fixed
    credits: "nayan",
    description: "Fun",
    category: "no prefix",
    usages: "😒",
    cooldowns: 5,
  },

  handleEvent: async function ({ api, event }) {
    const { threadID, messageID } = event;
    const body = event.body?.toLowerCase() || "";

    // ✅ সবকিছু একসাথে চেক
    const triggerWords = [
      "সৌরভ", "shourov", "love", "nayan", "sowrov",
      "sowrav", "shourov k", "nayan k"
    ];

    if (triggerWords.some(word => body.startsWith(word))) {
      try {
        // ✅ ভিডিও আগে থেকেই ডাউনলোড করে cache করে রাখো
        if (!cachedMedia) {
          const res = await axios.get("https://i.imgur.com/3Q94lu8.mp4", {
            responseType: "stream",
            headers: {
              'User-Agent': 'Mozilla/5.0'
            }
          });
          cachedMedia = res.data;
        }

        const msg = {
          body: "𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
          attachment: cachedMedia
        };

        api.sendMessage(msg, threadID, () => {
          api.setMessageReaction("😓", messageID, () => {}, true);
        });

      } catch (err) {
        console.error("⛔ ভিডিও লোড সমস্যা:", err.message);
        api.sendMessage("❌ ভিডিও লোড করতে সমস্যা হয়েছে!", threadID, messageID);
      }
    }
  },

  start: function () {
    console.log("[01fahim] Module loaded ✅");
  }
};