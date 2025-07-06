const fs = require("fs");

module.exports = {
  config: {
    name: "😎",
    version: "1.0.1",
    prefix: false,
    permission: 0, // spelling fixed
    credits: "shourov",
    description: "Fun",
    category: "no prefix",
    usages: "😒",
    cooldowns: 5,
  },

  handleEvent: function ({ api, event }) {
    const { threadID, messageID, body } = event;
    if (!body) return;

    const lowerBody = body.toLowerCase();

    // Trigger condition (can add more)
    const triggers = ["😎", "😈", "👿", "🤙"];
    const isTriggered = triggers.some(trigger => lowerBody.startsWith(trigger));

    if (isTriggered) {
      const filePath = __dirname + "/Nayan/attitude.mp3";
      if (!fs.existsSync(filePath)) return;

      const msg = {
        body: "তুঁমিঁ attitude দেঁখাঁচ্ছঁ তাঁতেঁ আঁমাঁরঁ বাঁলঁ ছেঁড়াঁ গেঁলোঁ",
        attachment: fs.createReadStream(filePath),
      };

      api.sendMessage(msg, threadID, messageID);
      api.setMessageReaction("😁", messageID, (err) => {}, true);
    }
  },

  start: function () {}
};