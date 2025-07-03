const axios = require("axios");

module.exports = {
  config: {
    name: "Shourov11",
    version: "1.0.1",
    prefix: false,
    permssion: 0,
    credits: "nayan", 
    description: "Fun",
    category: "no prefix",
    usages: "😒",
    cooldowns: 5, 
  },

  handleEvent: async function({ api, event }) {
    const { threadID, messageID, body } = event;

    if (!body) return;

    const msgBody = body.toLowerCase();

    // Matching condition
    if (msgBody.startsWith("call a aso") || msgBody.startsWith("😡")) {
      try {
        const media = (await axios.get('https://i.imgur.com/hj4iPpe.mp4', { responseType: 'stream' })).data;

        const msg = {
          body: "Md Fahim Islam",
          attachment: media
        };

        api.sendMessage(msg, threadID, messageID);
        api.setMessageReaction("🤣", messageID, () => {}, true);
      } catch (err) {
        console.error("Failed to fetch media:", err);
        api.sendMessage("❌ ভিডিও আনতে সমস্যা হয়েছে!", threadID, messageID);
      }
    }
  },

  start: function() {} // Optional starter
};