const axios = require("axios");

module.exports = {
  config: {
    name: "shourov87",
    version: "1.0.1",
    prefix: false,
    permission: 0,
    credits: "nayan",
    description: "Fun command with auto reply",
    category: "no prefix",
    usages: "😒",
    cooldowns: 5
  },

  handleEvent: async function({ api, event }) {
    const { threadID, messageID, body } = event;
    if (!body) return;

    const text = body.toLowerCase();
    const triggerWords = ["@everyone", "jikir"];

    if (triggerWords.some(trigger => text.startsWith(trigger))) {
      try {
        const media = (
          await axios.get("https://files.catbox.moe/omt6x5.mp4", {
            responseType: "stream"
          })
        ).data;

        const msg = {
          body: "𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
          attachment: media
        };

        api.sendMessage(msg, threadID, () => {
          api.setMessageReaction("🤣", messageID || null, () => {}, true);
        });

      } catch (err) {
        console.error("❌ Media fetch error:", err.message);
        api.sendMessage("❌ ভিডিও আনতে সমস্যা হয়েছে! পরে আবার চেষ্টা করুন।", threadID, messageID);
      }
    }
  },

  run: function() {} // fallback function, required by command handler
};