const axios = require("axios");

module.exports = {
  config: {
    name: "shourov11",
    version: "1.0.1",
    prefix: false,
    permission: 0,
    credits: "nayan",
    description: "Fun command on emoji or message",
    category: "no prefix",
    usages: "😡 or 'call a aso'",
    cooldowns: 5,
  },

  handleEvent: async function ({ api, event }) {
    const { threadID, messageID, body } = event;
    if (!body) return;

    const lowered = body.toLowerCase();

    if (lowered.startsWith("call a aso") || lowered.startsWith("😡")) {
      try {
        const videoUrl = 'https://i.imgur.com/hj4iPpe.mp4';
        const response = await axios.get(videoUrl, { responseType: 'stream' });

        const msg = {
          body: "𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯 ",
          attachment: response.data
        };

        api.sendMessage(msg, threadID, messageID);
        api.setMessageReaction("🤣", messageID, () => {}, true);
      } catch (error) {
        console.error("⚠️ ভিডিও পাঠাতে সমস্যা:", error.message);
        api.sendMessage("❌ ভিডিও লোড করতে সমস্যা হয়েছে!", threadID, messageID);
      }
    }
  },

  start() {} // Empty start function
};