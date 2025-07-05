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
    cooldowns: 5
  },

  handleEvent: async function({ api, event }) {
    const { threadID, messageID, body } = event;
    if (!body) return;

    const lower = body.toLowerCase();

    if (lower.startsWith("call a aso") || lower.startsWith("😡")) {
      const videoURL = "https://i.imgur.com/hj4iPpe.mp4"; // Make sure it's direct .mp4
      const filePath = path.join(__dirname, "cache", "fahim_video.mp4");

      try {
        const res = await axios.get(videoURL, { responseType: "stream" });
        await fs.ensureDir(path.join(__dirname, "cache"));
        const writer = fs.createWriteStream(filePath);
        res.data.pipe(writer);

        writer.on("finish", () => {
          api.sendMessage({
            body: "Md Fahim Islam",
            attachment: fs.createReadStream(filePath)
          }, threadID, () => {
            fs.unlinkSync(filePath);
            api.setMessageReaction("🤣", messageID, (err) => {}, true);
          });
        });

        writer.on("error", (err) => {
          console.error("Video write error:", err);
          api.sendMessage("সৌ্ঁর্ঁভ্ঁ রে gf দে কেউ 🙊", threadID, messageID);
        });

      } catch (e) {
        console.error("Download error:", e.message);
        api.sendMessage("সৌ্ঁর্ঁভ্ঁ রে gf দে কেউ 🙊", threadID, messageID);
      }
    }
  },

  start: function() {}
};