const request = require("request");
const { Readable } = require("stream");

module.exports = {
  config: {
    name: "npx3",
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

    const triggers = ["🥰", "🤩", "😍"];
    const matched = triggers.some(trigger => text.startsWith(trigger));
    if (!matched) return;

    // Random media
    const videos = [
      "https://files.catbox.moe/mrtvhb.mp4",
      "https://files.catbox.moe/env58m.mp4"
    ];
    const chosen = videos[Math.floor(Math.random() * videos.length)];

    // Download video and send
    request({ url: chosen, encoding: null }, (err, res, buffer) => {
      if (err || !buffer) {
        return api.sendMessage("❌ ভিডিও পাঠাতে সমস্যা হয়েছে!", threadID, messageID);
      }

      const stream = Readable.from(buffer);
      const msg = {
        body: "🖤🥀𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
        attachment: stream
      };

      api.sendMessage(msg, threadID, () => {
        api.setMessageReaction("🖤", messageID, () => {}, true);
      });
    });
  },

  run: function () {}
};