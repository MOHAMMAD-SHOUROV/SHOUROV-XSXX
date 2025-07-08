const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "🐰",
    version: "1.0.1",
    prefix: false,
    permission: 0,
    credits: "nayan",
    description: "Send funny rabbit voice",
    category: "no prefix",
    usages: "🐰",
    cooldowns: 5,
  },

  handleEvent: function ({ api, event }) {
    const { threadID, messageID, body } = event;
    if (!body) return;

    const triggers = ["🐰", "rabbit", "korgosh", "খরগোশ"];
    const lowerBody = body.toLowerCase();
    const isTriggered = triggers.some(trigger => lowerBody.includes(trigger));

    if (!isTriggered) return;

    const filePath = path.join(__dirname, "Nayan", "korgus.mp3");
    if (!fs.existsSync(filePath)) return;

    const msg = {
      body: "এঁইঁ খোঁরঁগোঁশঁ গাঁজঁরঁ খাঁবিঁনিঁ তুঁইঁ 🐰",
      attachment: fs.createReadStream(filePath),
    };

    api.sendMessage(msg, threadID, () => {
      api.setMessageReaction("😁", event.messageID, () => {}, true);
    });
  },

  start: () => {},
};