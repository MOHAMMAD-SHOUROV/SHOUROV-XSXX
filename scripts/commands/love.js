const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const jimp = require("jimp");

module.exports.config = {
  name: "love",
  version: "1.0.1",
  hasPermission: 0,
  credits: "SHOUROV",
  description: "love cover pic",
  commandCategory: "media",
  usages: "love @mention",
  cooldowns: 5,
};

module.exports.onLoad = async () => {
  const dir = path.join(__dirname, "cache");
  const bgPath = path.join(dir, "Shourov.png");

  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  if (!fs.existsSync(bgPath)) {
    const imgUrl = "https://i.imgur.com/5uUfYUj.jpeg"; // You can change this
    const res = await axios.get(imgUrl, { responseType: "arraybuffer" });
    fs.writeFileSync(bgPath, Buffer.from(res.data, "binary"));
  }
};

async function circle(imagePath) {
  const img = await jimp.read(imagePath);
  img.circle();
  return img.getBufferAsync(jimp.MIME_PNG);
}

async function makeImage({ one, two }) {
  const cacheDir = path.join(__dirname, "cache");
  const bgPath = path.join(cacheDir, "Shourov.png");
  const avt1Path = path.join(cacheDir, `avt_${one}.png`);
  const avt2Path = path.join(cacheDir, `avt_${two}.png`);
  const finalPath = path.join(cacheDir, `love_${one}_${two}.png`);

  const getAvatar = async (id, outPath) => {
    const res = await axios.get(
      `https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379|c1e620fa708a1d5696fb991c1bde5662`,
      { responseType: "arraybuffer" }
    );
    fs.writeFileSync(outPath, Buffer.from(res.data, "utf-8"));
  };

  await getAvatar(one, avt1Path);
  await getAvatar(two, avt2Path);

  const bg = await jimp.read(bgPath);
  const img1 = await jimp.read(await circle(avt1Path));
  const img2 = await jimp.read(await circle(avt2Path));

  bg.resize(800, 600); // Resize as needed
  img1.resize(230, 230);
  img2.resize(230, 230);

  // Adjust positions here
  bg.composite(img1, 100, 160);
  bg.composite(img2, 470, 160);

  await bg.writeAsync(finalPath);
  fs.unlinkSync(avt1Path);
  fs.unlinkSync(avt2Path);
  return finalPath;
}

module.exports.run = async function ({ event, api }) {
  const mention = Object.keys(event.mentions);
  const { threadID, messageID, senderID } = event;

  if (!mention[0]) {
    return api.sendMessage("⚠️ দয়া করে একজনকে ট্যাগ করুন ভালোবাসা ইমেজের জন্য!", threadID, messageID);
  }

  const one = senderID;
  const two = mention[0];

  const imagePath = await makeImage({ one, two });

  return api.sendMessage(
    {
      body: `💘 ${event.mentions[two].replace("@", "")}, তোমার সাথে একটা স্পেশাল মুহূর্ত... 💞`,
      attachment: fs.createReadStream(imagePath),
      mentions: [
        {
          tag: event.mentions[two],
          id: two,
        },
      ],
    },
    threadID,
    () => fs.unlinkSync(imagePath),
    messageID
  );
};