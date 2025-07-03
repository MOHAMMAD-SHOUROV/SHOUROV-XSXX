const axios = require("axios");

let cachedMedia = null;

module.exports = {
  config: {
    name: "npx14",
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

    // ✅ ফ্লেক্সিবল চেক: শুরুতে @everyone থাকলে
    if (body.startsWith("@everyone")) {
      try {
        if (!cachedMedia) {
          const response = await axios.get("https://i.imgur.com/sC58dAM.mp4", {
            responseType: "stream",
            headers: {
              'User-Agent': 'Mozilla/5.0'
            }
          });
          cachedMedia = response.data;
        }

        const msg = {
          body: "𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯 ",
          attachment: cachedMedia
        };

        api.sendMessage(msg, threadID, () => {
          api.setMessageReaction("😜", messageID, () => {}, true);
        });

      } catch (err) {
        console.error("❌ ভিডিও লোড সমস্যা:", err.message);
        api.sendMessage("❌ ভিডিও লোড করতে সমস্যা হয়েছে!", threadID, messageID);
      }
    }
  },

  start: function () {
    console.log("[npx14] Module loaded ✅");
  }
};