const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "Shourov11",
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

    const msgBody = body.toLowerCase();

    if (msgBody.startsWith("call a aso") || msgBody.startsWith("😡")) {
      try {
        const cachePath = path.resolve(__dirname, "cache", "shourov11.mp4");

        // ফাইল আগে থেকে আছে কিনা চেক করো, না থাকলে ডাউনলোড করো
        if (!fs.existsSync(cachePath)) {
          const response = await axios({
            url: 'https://i.imgur.com/hj4iPpe.mp4',
            method: 'GET',
            responseType: 'stream'
          });
          await new Promise((resolve, reject) => {
            const writeStream = fs.createWriteStream(cachePath);
            response.data.pipe(writeStream);
            writeStream.on("finish", resolve);
            writeStream.on("error", reject);
          });
        }

        // লোকালি সেভ করা ফাইল থেকে পাঠাও
        await api.sendMessage({
          body: "𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
          attachment: fs.createReadStream(cachePath)
        }, threadID, messageID);

        api.setMessageReaction("🤣", messageID, () => {}, true);
      } catch (err) {
        console.error("Failed to fetch media:", err);
        api.sendMessage("❌ ভিডিও আনতে সমস্যা হয়েছে!", threadID, messageID);
      }
    }
  },

  start: function() {}
};