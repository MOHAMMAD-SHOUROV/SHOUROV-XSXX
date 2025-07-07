const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const jimp = require("jimp");

module.exports.config = {
  name: "love",
  version: "2.0.0",
  permission: 0,
  credits: "King_Shourov",
  description: "Generate love image with tagged person",
  prefix: true,
  category: "love",
  usages: "love @mention",
  cooldowns: 5,
};

const loveDir = path.join(__dirname, "cache", "love_template");
const bgURL = "https://i.imgur.com/5uUfYUj.jpeg";
const bgPath = path.join(loveDir, "template.png");

module.exports.onLoad = async () => {
  if (!fs.existsSync(loveDir)) fs.mkdirSync(loveDir, { recursive: true });
  if (!fs.existsSync(bgPath)) {
    await global.utils.downloadFile(bgURL, bgPath);
  }
};

async function circleImage(imagePath) {
  const img = await jimp.read(imagePath);
  img.circle();
  return img;
}

module.exports.run = async function ({ event, api }) {
  const mention = Object.keys(event.mentions);
  const one = event.senderID;
  const two = mention[0];

  if (!two) {
    return api.sendMessage("⚠️ একজনকে ট্যাগ করুন এই লাভ ইমেজ তৈরির জন্য!", event.threadID, event.messageID);
  }

  const avtPath1 = path.join(loveDir, `avt_${one}.png`);
  const avtPath2 = path.join(loveDir, `avt_${two}.png`);
  const finalPath = path.join(loveDir, `love_${one}_${two}.png`);

  const getAvatar = async (id, filePath) => {
    const res = await axios.get(
      `https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379|c1e620fa708a1d5696fb991c1bde5662`,
      { responseType: "arraybuffer" }
    );
    fs.writeFileSync(filePath, Buffer.from(res.data, "utf-8"));
  };

  await getAvatar(one, avtPath1);
  await getAvatar(two, avtPath2);

  const bg = await jimp.read(bgPath);
  const img1 = await circleImage(avtPath1);
  const img2 = await circleImage(avtPath2);

  bg.resize(700, 500);
  img1.resize(180, 180);
  img2.resize(180, 180);

  bg.composite(img1, 130, 160);
  bg.composite(img2, 390, 160);

  await bg.writeAsync(finalPath);

  return api.sendMessage(
    {
      body: `❤️ ${event.mentions[two].replace("@", "")}, তোমার জন্য একটা লাভ মেমোরি ✨`,
      attachment: fs.createReadStream(finalPath),
      mentions: [{ tag: event.mentions[two], id: two }],
    },
    event.threadID,
    () => {
      fs.unlinkSync(avtPath1);
      fs.unlinkSync(avtPath2);
      fs.unlinkSync(finalPath);
    },
    event.messageID
  );
};