const axios = require("axios");

module.exports = {
  config: {
    name: "shourovlove99",
    version: "1.0.2",
    prefix: false,
    permssion: 0,
    credits: "Nayan",
    description: "Trigger-based love video by keyword",
    category: "no prefix",
    usages: "auto-response",
    cooldowns: 5,
  },

  handleEvent: async function ({ api, event }) {
    const { threadID, messageID, body } = event;
    if (!body) return;

    const lowerText = body.toLowerCase();
    const triggers = ["shourov", "SHOUROV", "সৌরভ", "Shourov", "king"];

    if (triggers.some(word => lowerText.includes(word))) {
      try {
        const videoList = [
          "img]https://i.imgur.com/23eTYBu.mp4",
          // Add more links if you want
        ];
        const videoURL = videoList[Math.floor(Math.random() * videoList.length)];

        const media = (
          await axios.get(videoURL, {
            responseType: "stream",
          })
        ).data;

        const msg = {
          body: "🖤 𝐀𝐥𝐈𝐇𝐒𝐀𝐍 𝐒𝐇𝐎𝐔𝐑𝐎𝐕 🖤",
          attachment: media,
        };

        api.sendMessage(msg, threadID, messageID);
        api.setMessageReaction("😓", messageID, (err) => {}, true);
      } catch (err) {
        console.error("❌ Video fetch failed:", err.message);
        api.sendMessage("⚠️ ভিডিও পাঠাতে সমস্যা হয়েছে। পরে আবার চেষ্টা করো!", threadID, messageID);
      }
    }
  },

  start: function () {
    // Initialization if needed
  }
};
