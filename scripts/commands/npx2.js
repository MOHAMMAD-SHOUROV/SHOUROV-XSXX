const request = require("request");
const { Readable } = require("stream");

module.exports = {
  config: {
    name: "npx2",
    version: "1.0.1",
    prefix: false,
    permission: 0,
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

    // Trigger words
    const triggers = [
      "love", "❤️‍🔥", "💌", "💘", "💟",
      "i love u", "i love you", "valobashi", "🖤"
    ];

    // Check if message starts with any trigger
    if (!triggers.some(trigger => text.startsWith(trigger))) return;

    // Download the media
    request.get("https://files.catbox.moe/6yzt2m.mp4", { encoding: null }, (err, res, buffer) => {
      if (err || !buffer) {
        return api.sendMessage("❌ ভিডিও আনতে সমস্যা হয়েছে!", threadID, messageID);
      }

      const stream = Readable.from(buffer);

      const msg = {
        body: "ভালোবাসা সুন্দর 🖤 𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
        attachment: stream
      };

      api.sendMessage(msg, threadID, () => {
        api.setMessageReaction("🖤", messageID, () => {}, true);
      });
    });
  },

  run: function () {}
};