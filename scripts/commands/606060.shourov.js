const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");

module.exports = {
  config: {
    name: "testvideo",
    version: "1.0.0",
    permission: 0,
    credits: "Shourov",
    description: "Test video download",
    category: "media",
    prefix: false,
    usages: "",
    cooldowns: 5
  },

  handleEvent: async function ({ api, event }) {
    const { threadID, messageID, body } = event;
    if (!body) return;

    if (body.toLowerCase().startsWith("test video")) {
      const filePath = path.join(__dirname, "cache/hj4iPpe.mp4");

      try {
        // Ensure cache folder exists
        if (!fs.existsSync(path.join(__dirname, "cache"))) {
          fs.mkdirSync(path.join(__dirname, "cache"));
        }

        // Download video if not already exists
        if (!fs.existsSync(filePath)) {
          const res = await axios.get("https://i.imgur.com/hj4iPpe.mp4", { responseType: "stream" });
          await new Promise((resolve, reject) => {
            const stream = fs.createWriteStream(filePath);
            res.data.pipe(stream);
            stream.on("finish", resolve);
            stream.on("error", reject);
          });
        }

        // Send video
        api.sendMessage({
          body: "✅ ভিডিও আসছে...",
          attachment: fs.createReadStream(filePath)
        }, threadID, messageID);

      } catch (err) {
        console.error("❌ ভিডিও ডাউনলোডে সমস্যা:", err.message);
        api.sendMessage("❌ ভিডিও ডাউনলোডে সমস্যা হয়েছে!", threadID, messageID);
      }
    }
  },

  start: function () {}
};