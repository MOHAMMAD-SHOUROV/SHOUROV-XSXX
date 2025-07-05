const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const jimp = require("jimp");

module.exports.config = {
  name: "kisss",
  version: "1.0.0",
  permission: 0,
  credits: "Md Shourov Islam",
  description: "Create a kissing image with tagged user",
  prefix: true,
  category: "kiss",
  usages: "user",
  cooldowns: 5,
  dependencies: {
    "axios": "",
    "fs-extra": "",
    "path": "",
    "jimp": ""
  }
};

module.exports.onLoad = async () => {
  const dirMaterial = path.resolve(__dirname, 'cache');
  const imgPath = path.resolve(dirMaterial, 'IMG-20250615-WA0013.jpg');

  if (!fs.existsSync(dirMaterial)) fs.mkdirSync(dirMaterial, { recursive: true });

  if (!fs.existsSync(imgPath)) {
    const { data } = await axios.get("https://i.imgur.com/BtSlsSS.jpg", { responseType: "arraybuffer" });
    fs.writeFileSync(imgPath, Buffer.from(data, "utf-8"));
  }
};

async function makeImage({ one, two }) {
  const __root = path.resolve(__dirname, "cache");

  const hon_img = await jimp.read(path.join(__root, "IMG-20250615-WA0013.jpg"));
  const pathImg = path.join(__root, `hon_${one}_${two}.png`);
  const avatarOne = path.join(__root, `avt_${one}.png`);
  const avatarTwo = path.join(__root, `avt_${two}.png`);

  const getAvatarOne = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
  fs.writeFileSync(avatarOne, Buffer.from(getAvatarOne, 'utf-8'));

  const getAvatarTwo = (await axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
  fs.writeFileSync(avatarTwo, Buffer.from(getAvatarTwo, 'utf-8'));

  const circleOne = await jimp.read(await circle(avatarOne));
  const circleTwo = await jimp.read(await circle(avatarTwo));

  hon_img.resize(700, 440)
    .composite(circleOne.resize(200, 200), 390, 23)
    .composite(circleTwo.resize(180, 180), 140, 80);

  const raw = await hon_img.getBufferAsync("image/png");
  fs.writeFileSync(pathImg, raw);
  fs.unlinkSync(avatarOne);
  fs.unlinkSync(avatarTwo);

  return pathImg;
}

async function circle(imagePath) {
  const image = await jimp.read(imagePath);
  image.circle();
  return await image.getBufferAsync("image/png");
}

module.exports.run = async function ({ event, api }) {
  const { threadID, messageID, senderID, mentions } = event;
  const mention = Object.keys(mentions)[0];

  if (!mention) {
    return api.sendMessage("⚠️ দয়া করে একটি ইউজারকে ট্যাগ করুন!", threadID, messageID);
  } else {
    const one = senderID, two = mention;
    const tag = mentions[mention].replace("@", "");

    try {
      const imagePath = await makeImage({ one, two });
      return api.sendMessage({
        body: `💋 ${tag} তোমার জন্য এক চুমু!`,
        mentions: [{ tag: tag, id: mention }],
        attachment: fs.createReadStream(imagePath)
      }, threadID, () => fs.unlinkSync(imagePath), messageID);
    } catch (err) {
      return api.sendMessage("কেউ আমার বস সৌরভ কে চুমু দে,চুমুর উভাবে মরতেছে🙊💋", threadID, messageID);
    }
  }
};