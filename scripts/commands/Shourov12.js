const axios = require("axios");

module.exports = {
  config: {
    name: "shourov12",
    version: "1.0.1",
    prefix: false,
    permission: 0,
    credits: "nayan",
    description: "Fun audio trigger",
    category: "no prefix",
    usages: "🥰 or 😍",
    cooldowns: 5,
  },

  handleEvent: async function({ api, event }) {
    const { threadID, messageID, body } = event;
    if (!body) return;

    const lowered = body.toLowerCase();

    if (lowered.startsWith("🥰") || lowered.startsWith("😍")) {
      try {
        // ✅ বাস্তব mp3 ফাইল URL বসাও
        const url = ".....; // Replace with valid mp3
        const response = await axios.get(url, { responseType: 'stream' });

        const msg = {
          body: "𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
          attachment: response.data
        };

        api.sendMessage(msg, threadID, messageID);
        api.setMessageReaction("🤭", messageID, () => {}, true);

      } catch (err) {
        console.error("⚠️ অডিও পাঠাতে সমস্যা:", err.message);
        api.sendMessage("❌ অডিও পাঠানো সম্ভব হয়নি!", threadID, messageID);
      }
    }
  },

  start() {}
};