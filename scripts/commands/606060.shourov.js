const fs = require('fs-extra');
const axios = require('axios');

module.exports = {
  config: {
    name: "Fahim11",
    version: "1.0.1",
    prefix: false,
    permssion: 0,
    credits: "nayan",
    description: "Fun",
    category: "no prefix",
    usages: "😒",
    cooldowns: 5,
  },

  handleEvent: async function({ api, event }) {
    const { threadID, messageID, body } = event;
    if (!body) return;

    if (body.toLowerCase().startsWith("call a aso") || body.startsWith("😡")) {
      const url = 'https://i.imgur.com/hj4iPpe.mp4';
      const path = __dirname + "/cache/fahim11.mp4";

      try {
        // যদি ফাইল আগে থেকে না থাকে, তখন ডাউনলোড করবে
        if (!fs.existsSync(path)) {
          const response = await axios({
            url,
            method: "GET",
            responseType: "stream",
          });
          await new Promise((resolve, reject) => {
            const stream = fs.createWriteStream(path);
            response.data.pipe(stream);
            stream.on("finish", resolve);
            stream.on("error", reject);
          });
        }

        // তারপর ফাইল পাঠাবে
        api.sendMessage(
          {
            body: "Md Fahim Islam",
            attachment: fs.createReadStream(path),
          },
          threadID,
          messageID
        );
        api.setMessageReaction("🤣", messageID, () => {}, true);
      } catch (err) {
        console.error(err);
        api.sendMessage("❌ ভিডিও ডাউনলোডে সমস্যা হয়েছে!", threadID, messageID);
      }
    }
  },
  start: function() {},
};