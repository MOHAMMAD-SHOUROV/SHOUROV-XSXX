const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const jimp = require("jimp");

module.exports.config = {
  name: "love",
  version: "1.0.0",
  permission: 0,
  credits: "Modified by King_Shourov",
  description: "Love-style profile image generator",
  prefix: true,
  category: "media",
  usages: "love @mention",
  cooldowns: 5,
};

module.exports.onLoad = async () => {
  const dir = path.join(__dirname, "cache");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const bgPath = path.join(dir, "shourovlove.png");
  if (!fs.existsSync(bgPath)) {
    const res = await axios.get("https://i.imgur.com/TOj5hnO.jpeg", { responseType: "arraybuffer" });
    fs.writeFileSync(bgPath, Buffer.from(res.data, "binary"));
  }
};

async function circle(imagePath) {
  const img = await jimp.read(imagePath);
  img.circle();
  return await img.getBufferAsync("image/png");
}

async function makeImage({ one, two }) {
  const bgPath = path.join(__dirname, "cache", "shourovlove.png");
  const avtPath1 = path.join(__dirname, "cache", `avt_${one}.png`);
  const avtPath2 = path.join(__dirname, "cache", `avt_${two}.png`);
  const finalPath = path.join(__dirname, "cache", `love_${one}_${two}.png`);

  const res1 = await axios.get(
    `https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379|c1e620fa708a1d5696fb991c1bde5662`,
    { responseType: "arraybuffer" }
  );
  fs.writeFileSync(avtPath1, Buffer.from(res1.data, "binary"));

  const res2 = await axios.get(
    `https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379|c1e620fa708a1d5696fb991c1bde5662`,
    { responseType: "arraybuffer" }
  );
  fs.writeFileSync(avtPath2, Buffer.from(res2.data, "binary"));

  const bg = await jimp.read(bgPath);
  const img1 = await jimp.read(await circle(avtPath1));
  const img2 = await jimp.read(await circle(avtPath2));

  bg.resize(700, 500);
  img1.resize(230, 230);
  img2.resize(232, 232);

  bg.composite(img1, 93, 122);
  bg.composite(img2, 513, 124);

  await bg.writeAsync(finalPath);

  fs.unlinkSync(avtPath1);
  fs.unlinkSync(avtPath2);

  return finalPath;
}

module.exports.run = async function ({ event, api }) {
  const { threadID, messageID, senderID } = event;
  const mention = Object.keys(event.mentions);

  if (!mention[0]) {
    return api.sendMessage("⚠️ দয়া করে কাউকে ট্যাগ করুন!", threadID, messageID);
  }

  const one = senderID;
  const two = mention[0];

  const imagePath = await makeImage({ one, two });

  return api.sendMessage(
    {
      body:
        "︵💚🌸︵\n\n-𝗙𝗮𝘃𝗼𝗿𝗶𝘁𝗲 𝗶𝗻 𝘁𝗵𝗶𝘀 𝗰𝗶𝘁𝘆 𝗶𝘀 𝘄𝗿𝗶𝘁𝗶𝗻𝗴 𝗻𝗼𝘃𝗲𝗹𝘀 𝗯𝘆 𝗽𝗮𝘀𝘀𝗶𝗼𝗻 𝗻𝗼𝘁 𝗹𝗼𝘃𝗲 -!!🙂💔🐰\n\n_এই শহরে আবেগ দ্বারা উপন্যাস লেখা হয় ভালোবাসা না-!!🖤🌸🐰𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
      attachment: fs.createReadStream(imagePath),
      mentions: [{ tag: event.mentions[two], id: two }],
    },
    threadID,
    () => fs.unlinkSync(imagePath),
    messageID
  );
};