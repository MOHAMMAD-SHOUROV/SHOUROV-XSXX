const axios = require('axios');

module.exports = {
  config: {
    name: "Fahim.6",
    version: "1.0.1",
    prefix: false,
    permission: 0,
    credits: "nayan",
    description: "Fun command with media",
    category: "no prefix",
    usages: "😒",
    cooldowns: 5
  },

  handleEvent: async function({ api, event }) {
    const { threadID, messageID, body } = event;
    if (!body) return;

    const lowerBody = body.toLowerCase();
    
    // Trigger words
    if (lowerBody.startsWith("call a aso") || lowerBody.startsWith("😡")) {
      try {
        const mediaUrl = "https://i.imgur.com/hj4iPpe.mp4";

        const response = await axios.get(mediaUrl, {
          responseType: "stream"
        });

        const msg = {
          body: "𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
          attachment: response.data
        };

        api.sendMessage(msg, threadID, messageID);
        api.setMessageReaction("🤣", messageID, (err) => {}, true);

      } catch (error) {
        console.error("❌ ভিডিও আনতে সমস্যা হয়েছে:", error.message);
      }
    }
  },

  start: function() {
    // যদি বট চালুর সময় কিছু করতে চাও তাহলে এখানে লেখো
  }
};