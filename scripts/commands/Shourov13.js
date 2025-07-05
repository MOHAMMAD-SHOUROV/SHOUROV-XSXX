const axios = require("axios");

module.exports = {
  config: {
    name: "shourov13",
    version: "1.0.1",
    prefix: false,
    permission: 0,
    credits: "nayan",
    description: "Sad reacts video",
    category: "no prefix",
    usages: "😭 or 🤧",
    cooldowns: 5,
  },

  handleEvent: async function({ api, event }) {
    const { threadID, messageID, body } = event;
    if (!body) return;

    const lowered = body.toLowerCase();

    if (lowered.startsWith("3") || lowered.startsWith("3")) {
      try {
        const url = "https://files.catbox.moe/7cf5c9.mp4"; // Replace with actual link
        const response = await axios.get(url, { responseType: 'stream' });

        const msg = {
          body: "𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯 ",
          attachment: response.data
        };

        api.sendMessage(msg, threadID, messageID);
        api.setMessageReaction("😂", messageID, () => {}, true);

      } catch (err) {
        console.error("❌ ভিডিও পাঠাতে সমস্যা:", err.message);
        api.sendMessage("⚠️ ভিডিও পাঠানো যায়নি!", threadID, messageID);
      }
    }
  },

  start() {}
};