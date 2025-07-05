const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");

module.exports = {
  config: {
    name: "shourovvideo",
    version: "1.0.0",
    permission: 0,
    credits: "Shourov",
    prefix: false,
    category: "media",
    usages: "",
    cooldowns: 5
  },

  handleEvent: async function ({ api, event }) {
    const { threadID, messageID, body } = event;
    if (!body) return;

    const input = body.toLowerCase();
    if (input.startsWith("call a aso") || input.startsWith("😡")) {
      const fileName = "hj4iPpe.mp4";
      const cacheFolder = path.join(__dirname, "cache");
      const filePath = path.join(cacheFolder, fileName);
      const videoUrl = "https://i.imgur.com/hj4iPpe.mp4";

      try {
        // 🔧 Step 1: Ensure "cache/" folder exists
        await fs.ensureDir(cacheFolder);

        // 🔧 Step 2: Download the video if not exists
        if (!fs.existsSync(filePath)) {
          const response = await axios.get(videoUrl, { responseType: "stream", timeout: 30000 });

          const writer = fs.createWriteStream(filePath);
          response.data.pipe(writer);

          await new Promise((resolve, reject) => {
            writer.on("finish", resolve);
            writer.on("error", reject);
          });
        }

        // 🔧 Step 3: Send video
        api.sendMessage({
          body: "𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯 🤍",
          attachment: fs.createReadStream(filePath)
        }, threadID, messageID);

        api.setMessageReaction("🤣", messageID, () => {}, true);

      } catch (err) {
        console.error("🤣", err.message || err);
        api.sendMessage("🤣", threadID, messageID);
      }
    }
  },

  start: () => {}
};