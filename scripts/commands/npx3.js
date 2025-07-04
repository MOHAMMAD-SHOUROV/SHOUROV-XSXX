const request = require("request");

module.exports = {
  config: {
    name: "npx3",
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

    // Media URLs
    const NAYAN = [
      "https://i.imgur.com/LLucP15.mp4",
      "https://i.imgur.com/DEBRSER.mp4"
    ];
    const rndm = NAYAN[Math.floor(Math.random() * NAYAN.length)];

    // Download the video as a buffer stream
    const media = await new Promise((resolve, reject) => {
      request.get(rndm, { encoding: null }, (error, response, body) => {
        if (error) reject(error);
        else resolve(Buffer.from(body));
      });
    });

    // Match these triggers
    const triggers = ["🥰", "🤩", "😍", " "];
    if (triggers.some(prefix => text.startsWith(prefix))) {
      const msg = {
        body: "🖤🥀𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
        attachment: media
      };

      api.sendMessage(msg, threadID, () => {
        api.setMessageReaction("🖤", messageID, () => {}, true);
      });
    }
  },

  run: function () {}
};