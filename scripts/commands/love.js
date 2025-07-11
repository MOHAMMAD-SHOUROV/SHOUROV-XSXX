const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const jimp = require("jimp");

module.exports.config = {
  name: "love",
  version: "1.1.0",
  hasPermission: 0,
  credits: "𝐊𝐈𝐍𝐆 𝐒𝐇𝐎𝐔𝐑𝐎𝐕",
  description: "Love-style DP generator",
  commandCategory: "media",
  usages: "tag someone",
  cooldowns: 5
};

module.exports.onLoad = async () => {
  const dir = __dirname + `/cache/love/`;
  const bgUrl = "https://i.imgur.com/XAbgU5G.jpeg"; // আপনার ব্যাকগ্রাউন্ড
  const bgPath = path.join(dir, "background.png");

  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(bgPath)) {
    const res = await axios.get(bgUrl, { responseType: "arraybuffer" });
    fs.writeFileSync(bgPath, res.data);
  }
};

module.exports.run = async function ({ api, event }) {
  const mention = Object.keys(event.mentions);
  if (!mention[0]) return api.sendMessage("❌ ট্যাগ দিন যাকে ভালোবাসেন 💑", event.threadID, event.messageID);

  const one = event.senderID;
  const two = mention[0];

  const imgPath = await createImage(one, two);
  return api.sendMessage({
    body: `❤️ Forever Love \n\n𝐊𝐈𝐍𝐆 𝐒𝐇𝐎𝐔𝐑𝐎𝐕\n📌 fb.com/www.xsxx.com365`,
    attachment: fs.createReadStream(imgPath)
  }, event.threadID, () => fs.unlinkSync(imgPath), event.messageID);
};

async function createImage(uid1, uid2) {
  const basePath = path.join(__dirname, "cache/love");
  const bgPath = path.join(basePath, "background.png");

  const avatar1Path = path.join(basePath, `avt1_${uid1}.png`);
  const avatar2Path = path.join(basePath, `avt2_${uid2}.png`);
  const finalPath = path.join(basePath, `love_${uid1}_${uid2}.png`);

  const avatar1 = await getAvatar(uid1);
  const avatar2 = await getAvatar(uid2);
  fs.writeFileSync(avatar1Path, avatar1);
  fs.writeFileSync(avatar2Path, avatar2);

  const bg = await jimp.read(bgPath);
  const av1 = await jimp.read(await makeCircle(avatar1Path));
  const av2 = await jimp.read(await makeCircle(avatar2Path));

  // ঠিকভাবে বসানো হয়েছে
  bg.composite(av1.resize(230, 230), 93, 122);
  bg.composite(av2.resize(232, 232), 513, 124);

  await bg.writeAsync(finalPath);

  fs.unlinkSync(avatar1Path);
  fs.unlinkSync(avatar2Path);

  return finalPath;
}

async function getAvatar(uid) {
  const url = `https://graph.facebook.com/${uid}/picture?width=512&height=512&access_token=6628568379|c1e620fa708a1d5696fb991c1bde5662`;
  const res = await axios.get(url, { responseType: "arraybuffer" });
  return res.data;
}

async function makeCircle(imgPath) {
  const image = await jimp.read(imgPath);
  image.circle();
  return await image.getBufferAsync("image/png");
}