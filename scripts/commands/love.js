const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const jimp = require("jimp");

module.exports.config = {
  name: "love",
  version: "1.0.0",
  hasPermission: 0,
  credits: "RAJA ViP 5X | Fixed by King_Shourov",
  description: "Love style profile image generator",
  commandCategory: "media",
  usages: "love @mention",
  cooldowns: 5,
};

// 📥 Auto-download background image
module.exports.onLoad = async () => {
  const dir = path.join(__dirname, "cache");
  const bgPath = path.join(dir, "Shourov.png");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  if (!fs.existsSync(bgPath)) {
    const res = await axios.get("https://i.imgur.com/TOj5hnO.jpeg", { responseType: "arraybuffer" });
    fs.writeFileSync(bgPath, Buffer.from(res.data, "binary"));
  }
};

// 🌀 Make circular avatar
async function circle(imagePath) {
  const img = await jimp.read(imagePath);
  img.circle();
  return await img.getBufferAsync("image/png");
}

// 🖼️ Generate final love image
async function makeImage({ one, two }) {
  const cacheDir = path.join(__dirname, "cache");
  const bgPath = path.join(cacheDir, "Shourov.png");
  const avtPath1 = path.join(cacheDir, `avt_${one}.png`);
  const avtPath2 = path.join(cacheDir, `avt_${two}.png`);
  const finalPath = path.join(cacheDir, `love_${one}_${two}.png`);

  // Download avatars
  const avatar1 = await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379|c1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" });
  fs.writeFileSync(avtPath1, Buffer.from(avatar1.data, "utf-8"));

  const avatar2 = await axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379|c1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" });
  fs.writeFileSync(avtPath2, Buffer.from(avatar2.data, "utf-8"));

  // Read and process images
  const bg = await jimp.read(bgPath);
  const img1 = await jimp.read(await circle(avtPath1));
  const img2 = await jimp.read(await circle(avtPath2));

  bg.resize(1281, 720); // Size based on your background image
  img1.resize(230, 230);
  img2.resize(232, 232);

  // Composite avatar positions — adjust as needed
  bg.composite(img1, 93, 122); // Left avatar
  bg.composite(img2, 513, 124); // Right avatar

  await bg.writeAsync(finalPath);

  // Cleanup avatars
  fs.unlinkSync(avtPath1);
  fs.unlinkSync(avtPath2);

  return finalPath;
}

// 🚀 Command runner
module.exports.run = async function ({ event, api }) {
  const { threadID, messageID, senderID } = event;
  const mention = Object.keys(event.mentions);
  if (!mention[0]) {
    return api.sendMessage("⚠️ ভালোবাসার মানুষটিকে ট্যাগ করুন! 💑", threadID, messageID);
  }

  const one = senderID;
  const two = mention[0];

  try {
    const imagePath = await makeImage({ one, two });

    return api.sendMessage(
      {
        body:
          "︵💚🌸︵\n\n-𝗙𝗮𝘃𝗼𝗿𝗶𝘁𝗲 𝗶𝗻 𝘁𝗵𝗶𝘀 𝗰𝗶𝘁𝘆 𝗶𝘀 𝘄𝗿𝗶𝘁𝗶𝗻𝗴 𝗻𝗼𝘃𝗲𝗹𝘀 𝗯𝘆 𝗽𝗮𝘀𝘀𝗶𝗼𝗻 𝗻𝗼𝘁 𝗹𝗼𝘃𝗲 -!!🙂💔🐰\n\n_এই শহরে আবেগ দ্বারা উপন্যাস লেখা হয় ভালোবাসা না-!!🖤🌸🐰\n\n𝐊𝐢𝐧𝐠 𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
        attachment: fs.createReadStream(imagePath),
        mentions: [{ tag: event.mentions[mention[0]], id: two }],
      },
      threadID,
      () => fs.unlinkSync(imagePath),
      messageID
    );
  } catch (err) {
    console.error(err);
    return api.sendMessage("❌ ইমেজ তৈরি করতে সমস্যা হয়েছে!", threadID, messageID);
  }
};