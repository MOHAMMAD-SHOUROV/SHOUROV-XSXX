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

    const triggers = ["10", "10", "10"];
    const matched = triggers.some(trigger => text.startsWith(trigger));
    if (!matched) return;

    const videos = [
      "https://files.catbox.moe/mrtvhb.mp4",
      "https://files.catbox.moe/env58m.mp4"
    ];
    const chosen = videos[Math.floor(Math.random() * videos.length)];

    try {
      request({ url: chosen, encoding: null }, (err, res, buffer) => {
        if (err || !buffer) {
          return api.sendMessage("আমর বস সৌরভ কে একটু ভালোবাসা দিবা😍🙊", threadID, messageID);
        }

        const stream = Readable.from(buffer);
        const msg = {
          body: "🖤🥀 𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
          attachment: stream
        };

        api.sendMessage(msg, threadID, () => {
          api.setMessageReaction("🖤", messageID, () => {}, true);
        });
      });
    } catch (e) {
      console.error("[npx3] Error sending media:", e.message);
      api.sendMessage("⚠️ একটি অপ্রত্যাশিত সমস্যা হয়েছে!", threadID);
    }
  },

  run: function () {}
};