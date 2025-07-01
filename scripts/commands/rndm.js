const request = require("request");
const fs = require("fs-extra");

module.exports.config = {
  name: "random",
  version: "0.0.2",
  permission: 0,
  prefix: true,
  credits: "Nayan",
  description: "sad video",
  category: "admin",
  usages: "",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  const axios = require("axios");

  try {
    const apis = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN-07/Nayan/main/api.json');
    const n = apis.data.api;

    const res = await axios.get(`${n}/video/mixvideo`);
    const { url: videoData, cp, length: ln } = res.data;
    const { url: videoUrl, name } = videoData;

    const filePath = __dirname + "/cache/video.mp4";
    const file = fs.createWriteStream(filePath);

    request(videoUrl)
      .pipe(file)
      .on("close", () => {
        return api.sendMessage({
          body: `${cp}\n\n𝐓𝐨𝐭𝐚𝐥 𝐕𝐢𝐝𝐞𝐨𝐬: [${ln}]\n𝐀𝐝𝐝𝐞𝐝 𝐓𝐡𝐢𝐬 𝐕𝐢𝐝𝐞𝐨 𝐓𝐨 𝐓𝐡𝐞 𝐀𝐩𝐢 𝐁𝐲 [${name}]`,
          attachment: fs.createReadStream(filePath)
        }, event.threadID, event.messageID);
      });

  } catch (e) {
    console.log(e);
    return api.sendMessage("Failed to fetch video. Please try again later.", event.threadID, event.messageID);
  }
};
