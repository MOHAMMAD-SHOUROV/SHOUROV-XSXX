const request = require("request");

module.exports = {
  config: {
    name: "npx2",
    version: "1.0.1",
    prefix: false,
    permission: 0, // spelling fix
    credits: "nayan",
    description: "Fun auto video reply",
    category: "no prefix",
    usages: "😒",
    cooldowns: 5,
  },

  handleEvent: async function ({ api, event }) {
    const { threadID, messageID, body } = event;
    if (!body) return;

    const text = body.toLowerCase();

    // Download the media
    const media = await new Promise((resolve, reject) => {
      request.get('https://i.imgur.com/Yc2atQe.mp4', { encoding: null }, (error, response, body) => {
        if (error) reject(error);
        else resolve(Buffer.from(body));
      });
    });

    // Match these trigger phrases
    const triggers = [
      "love", "❤️‍🔥", "💌", "💘", "💟",
      "i love u", "i love you", "valobashi", "🖤"
    ];

    // Check if message starts with any trigger
    if (triggers.some(t => text.startsWith(t))) {
      const msg = {
        body: "ভালোবাসা সুন্দর 🖤 𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
        attachment: media,
      };
      api.sendMessage(msg, threadID, () => {
        api.setMessageReaction("🖤", messageID, () => {}, true);
      });
    }
  },

  run: function () {}
};