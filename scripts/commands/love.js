const fs = require("fs-extra");
const path = require("path");
const axios = require("axios");
const jimp = require("jimp");

module.exports.config = {
  name: "love",
  version: "1.0.0",
  hasPermission: 0,
  credits: "RAJA ViP 5X - Fixed by King_Shourov",
  description: "Love-themed image generator",
  commandCategory: "media",
  usages: "@mention",
  cooldowns: 5,
};

module.exports.onLoad = async () => {
  const dir = path.join(__dirname, "cache");
  const bgPath = path.join(dir, "Shourov.png");

  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(bgPath)) {
    await global.utils.downloadFile("https://i.imgur.com/TOj5hnO.jpeg", bgPath);
  }
};

async function makeImage({ one, two }) {
  const __root = path.join(__dirname, "cache");
  const bgPath = path.join(__root, "Shourov.png");

  const avatarOnePath = path.join(__root, `avt_${one}.png`);
  const avatarTwoPath = path.join(__root, `avt_${two}.png`);
  const outPath = path.join(__root, `love_${one}_${two}.png`);

  const getAvatar = async (id, filePath) => {
    const url = `https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
    const response = await axios.get(url, { responseType: "arraybuffer" });
    fs.writeFileSync(filePath, Buffer.from(response.data, "utf-8"));
  };

  await getAvatar(one, avatarOnePath);
  await getAvatar(two, avatarTwoPath);

  const circleCrop = async (imgPath) => {
    const img = await jimp.read(imgPath);
    img.circle();
    return img;
  };

  const bg = await jimp.read(bgPath);
  const circleOne = await circleCrop(avatarOnePath);
  const circleTwo = await circleCrop(avatarTwoPath);

  // Positioning and resizing
  bg.composite(circleOne.resize(230, 230), 93, 122);
  bg.composite(circleTwo.resize(232, 232), 513, 124);

  await bg.writeAsync(outPath);

  fs.unlinkSync(avatarOnePath);
  fs.unlinkSync(avatarTwoPath);

  return outPath;
}

module.exports.run = async function ({ event, api }) {
  const { threadID, messageID, senderID, mentions } = event;
  const mentionIDs = Object.keys(mentions);

  if (mentionIDs.length === 0) {
    return api.sendMessage("💌 ভালোবাসার মানুষটিকে ট্যাগ করুন!", threadID, messageID);
  }

  const one = senderID;
  const two = mentionIDs[0];

  try {
    const imagePath = await makeImage({ one, two });
    const msg = {
      body: "︵💚🌸︵\n\n-𝗙𝗮𝘃𝗼𝗿𝗶𝘁𝗲 𝗶𝗻 𝘁𝗵𝗶𝘀 𝗰𝗶𝘁𝘆 𝗶𝘀 𝘄𝗿𝗶𝘁𝗶𝗻𝗴 𝗻𝗼𝘃𝗲𝗹𝘀 𝗯𝘆 𝗽𝗮𝘀𝘀𝗶𝗼𝗻 𝗻𝗼𝘁 𝗹𝗼𝘃𝗲 -!!🙂💔🐰\n\n_এই শহরে আবেগ দ্বারা উপন্যাস লেখা হয় ভালোবাসা না-!!🖤🌸🐰 𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
      attachment: fs.createReadStream(imagePath),
    };
    api.sendMessage(msg, threadID, () => fs.unlinkSync(imagePath), messageID);
  } catch (err) {
    console.error("Error in love command:", err);
    api.sendMessage("❌ কিছু ভুল হয়েছে ছবি তৈরিতে। পরে আবার চেষ্টা করুন!", threadID, messageID);
  }
};