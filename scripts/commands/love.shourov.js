const fs = require("fs-extra");
const path = require("path");
const axios = require("axios");
const jimp = require("jimp");

module.exports.config = {
  name: "lovef",
  version: "1.0.0",
  permission: 0,
  credits: "SK-SIDDIK-KHAN",
  description: "Create a love image with tagged user",
  prefix: true,
  category: "Love",
  usages: "lovef @user",
  cooldowns: 5,
  dependencies: {
    "axios": "",
    "fs-extra": "",
    "path": "",
    "jimp": ""
  }
};

module.exports.onLoad = async () => {
  const dir = path.join(__dirname, 'cache/canvas');
  const framePath = path.join(dir, 'frame4.jpeg');

  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(framePath)) {
    const res = await axios.get("https://i.imgur.com/Tavx3Pv.jpg", { responseType: "arraybuffer" });
    fs.writeFileSync(framePath, res.data);
  }
};

async function circle(imagePath) {
  const image = await jimp.read(imagePath);
  image.circle();
  return await image.getBufferAsync("image/png");
}

async function makeImage({ one, two }) {
  const dir = path.join(__dirname, "cache/canvas");
  const bg = await jimp.read(path.join(dir, "frame4.jpeg"));

  const avatarOnePath = path.join(dir, `avt_${one}.jpeg`);
  const avatarTwoPath = path.join(dir, `avt_${two}.jpeg`);
  const outputPath = path.join(dir, `love_${one}_${two}.jpeg`);

  const avatarOne = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379|c1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
  fs.writeFileSync(avatarOnePath, Buffer.from(avatarOne, "utf-8"));

  const avatarTwo = (await axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379|c1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
  fs.writeFileSync(avatarTwoPath, Buffer.from(avatarTwo, "utf-8"));

  const circledOne = await jimp.read(await circle(avatarOnePath));
  const circledTwo = await jimp.read(await circle(avatarTwoPath));

  bg.composite(circledOne.resize(200, 200), 540, 90);
  bg.composite(circledTwo.resize(280, 280), 108, 108);

  const finalBuffer = await bg.getBufferAsync(jimp.MIME_JPEG);
  fs.writeFileSync(outputPath, finalBuffer);

  fs.unlinkSync(avatarOnePath);
  fs.unlinkSync(avatarTwoPath);

  return outputPath;
}

module.exports.run = async function ({ event, api }) {
  const { threadID, messageID, senderID, mentions } = event;
  const mention = Object.keys(mentions);
  
  if (!mention.length) {
    return api.sendMessage("⚠️ দয়া করে একটি মানুষকে ট্যাগ করুন!", threadID, messageID);
  }

  try {
    const path = await makeImage({ one: senderID, two: mention[0] });
    api.sendMessage({
      body: "◦•●◉LOVE IS PERA◉●•◦",
      attachment: fs.createReadStream(path)
    }, threadID, () => fs.unlinkSync(path), messageID);
  } catch (err) {
    console.error(err);
    api.sendMessage("❌ একটি সমস্যা হয়েছে, পরে আবার চেষ্টা করুন।", threadID, messageID);
  }
};