const request = require("request");
const fs = require("fs");

module.exports = {
  config: {
    name: "rndm",
    version: "0.0.2",
    permission: 0,
    prefix: true,
    credits: "Nayan",
    description: "rndm video",
    category: "user",
    usages: "name",
    cooldowns: 5,
  },

  languages: {
    vi: {},
    en: {
      missing: `[ ! ] Input Name.\nEx: ${global.config.PREFIX}rndm nayan`
    }
  },

  start: async function ({ nayan, events, args, lang }) {
    const axios = require("axios");
    const nameParam = args.join(" ");
    if (!args[0]) return nayan.reply(lang("missing"), events.threadID, events.messageID);

    try {
      const apis = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN-07/Nayan/main/api.json');
      const n = apis.data.api;
      const res = await axios.get(`${n}/random?name=${encodeURIComponent(nameParam)}`);

      const videoUrl = res.data.data.url;
      const name = res.data.data.name;
      const cp = res.data.data.cp;
      const ln = res.data.data.length;
      const filePath = __dirname + "/cache/video.mp4";

      const file = fs.createWriteStream(filePath);
      request(videoUrl)
        .pipe(file)
        .on("close", () => {
          return nayan.reply({
            body: `${cp}\n\n𝐓𝐨𝐭𝐚𝐥 𝐕𝐢𝐝𝐞𝐨𝐬: [${ln}]\n𝐀𝐝𝐝𝐞𝐝 𝐓𝐡𝐢𝐬 𝐕𝐢𝐝𝐞𝐨 𝐓𝐨 𝐓𝐡𝐞 𝐀𝐩𝐢 𝐁𝐲 [${name}]`,
            attachment: fs.createReadStream(filePath)
          }, events.threadID, events.messageID);
        });

    } catch (err) {
      console.error(err);
      return nayan.reply("Something went wrong. Please try again later.", events.threadID, events.messageID);
    }
  }
};
