const fs = require("fs-extra");
const path = require("path");
const axios = require("axios");
const jimp = require("jimp");

module.exports.config = {
  name: "dp8",
  version: "1.0.0",
  hasPermission: 0,
  credits: "KING_SHOUROV",
  description: "Love-style DP generator",
  commandCategory: "media",
  usages: "",
  cooldowns: 5,
};

module.exports.onLoad = async () => {
  const dir = path.join(__dirname, "cache/canvas");
  const bgPath = path.join(dir, "shourovlove.png");

  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(bgPath)) {
    const img = (await axios.get("https://i.imgur.com/PeyPJDz.jpeg", { responseType: "arraybuffer" })).data;
    fs.writeFileSync(bgPath, Buffer.from(img));
  }
};

async function circle(imagePath) {
  const image = await jimp.read(imagePath);
  image.circle();
  return image;
}

async function makeImage({ one, two }) {
  const __root = path.join(__dirname, "cache/canvas");
  const bg = await jimp.read(path.join(__root, "shourovlove.png"));

  const avatarOnePath = path.join(__root, `avt_${one}.png`);
  const avatarTwoPath = path.join(__root, `avt_${two}.png`);

  const getAvatar = async (id, savePath) => {
    const avatarData = (await axios.get(`https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, {
      responseType: "arraybuffer"
    })).data;
    fs.writeFileSync(savePath, Buffer.from(avatarData));
  };

  await getAvatar(one, avatarOnePath);
  await getAvatar(two, avatarTwoPath);

  const circleOne = await circle(avatarOnePath);
  const circleTwo = await circle(avatarTwoPath);

  // Composite: Adjust avatar position and size here
  bg.composite(circleOne.resize(230, 230), 93, 122);
  bg.composite(circleTwo.resize(232, 232), 513, 124);

  const outputPath = path.join(__root, `shourovlove_${one}_${two}.png`);
  await bg.writeAsync(outputPath);

  // Clean up temp avatars
  fs.unlinkSync(avatarOnePath);
  fs.unlinkSync(avatarTwoPath);

  return outputPath;
}

module.exports.run = async function ({ event, api }) {
  const { threadID, messageID, senderID, mentions } = event;
  const mention = Object.keys(mentions);

  if (!mention[0]) {
    return api.sendMessage("💌 দয়া করে আপনার ভালোবাসার মানুষকে ট্যাগ করুন!", threadID, messageID);
  }

  const one = senderID;
  const two = mention[0];

  try {
    const imgPath = await makeImage({ one, two });

    return api.sendMessage({
      body: `︵💚🌸︵\n\n-𝗙𝗮𝘃𝗼𝗿𝗶𝘁𝗲 𝗶𝗻 𝘁𝗵𝗶𝘀 𝗰𝗶𝘁𝘆 𝗶𝘀 𝘄𝗿𝗶𝘁𝗶𝗻𝗴 𝗻𝗼𝘃𝗲𝗹𝘀 𝗯𝘆 𝗽𝗮𝘀𝘀𝗶𝗼𝗻 𝗻𝗼𝘁 𝗹𝗼𝘃𝗲 -!!🙂💔🐰\n\n_এই শহরে আবেগ দ্বারা উপন্যাস লেখা হয় ভালোবাসা না-!!🖤🌸🐰\n\n𝐊𝐢𝐧𝐠 𝐒𝐡𝐨𝐮𝐫𝐨𝐯`,
      attachment: fs.createReadStream(imgPath)
    }, threadID, () => fs.unlinkSync(imgPath), messageID);

  } catch (e) {
    console.error(e);
    return api.sendMessage("⚠️ কোনো একটি ত্রুটি ঘটেছে। দয়া করে আবার চেষ্টা করুন।", threadID, messageID);
  }
};