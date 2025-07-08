const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const jimp = require("jimp");

module.exports.config = {
name: "shourovlove",
version: "1.0.0",
hasPermission: 0,
credits: "King_Shourov",
description: "Love-style DP generator",
commandCategory: "media",
usages: "",
cooldowns: 5,
prefix:true
};

module.exports.onLoad = async () => {
const canvasPath = path.join(__dirname, "cache", "canvas");
const imgPath = path.join(canvasPath, "shourovlove.png");

if (!fs.existsSync(canvasPath)) fs.mkdirSync(canvasPath, { recursive: true });

if (!fs.existsSync(imgPath)) {
const res = await axios.get("https://i.imgur.com/r81XGpZ.jpeg", { responseType: "arraybuffer" });
fs.writeFileSync(imgPath, Buffer.from(res.data, "binary"));
}
};

async function circle(imagePath) {
const img = await jimp.read(imagePath);
img.circle();
return await img.getBufferAsync("image/png");
}

async function makeImage({ one, two }) {
const canvasPath = path.join(__dirname, "cache", "canvas");
const bgPath = path.join(canvasPath, "shourovlove.png");
const pathImg = path.join(canvasPath, love_${one}_${two}.png);
const avtPath1 = path.join(canvasPath, avt_${one}.png);
const avtPath2 = path.join(canvasPath, avt_${two}.png);

// Download avatars
const getAvatar = async (uid, filePath) => {
const res = await axios.get(
https://graph.facebook.com/${uid}/picture?width=512&height=512&access_token=6628568379|c1e620fa708a1d5696fb991c1bde5662,
{ responseType: "arraybuffer" }
);
fs.writeFileSync(filePath, Buffer.from(res.data, "utf-8"));
};

await getAvatar(one, avtPath1);
await getAvatar(two, avtPath2);

// Read and process
const bg = await jimp.read(bgPath);
const img1 = await jimp.read(await circle(avtPath1));
const img2 = await jimp.read(await circle(avtPath2));

img1.resize(230, 230);
img2.resize(232, 232);

bg.composite(img1, 93, 122);
bg.composite(img2, 513, 124);

await bg.writeAsync(pathImg);

fs.unlinkSync(avtPath1);
fs.unlinkSync(avtPath2);

return pathImg;
}

module.exports.run = async function ({ event, api }) {
const mention = Object.keys(event.mentions);
const one = event.senderID;
const two = mention[0];

if (!two) return api.sendMessage("⚠️ দয়া করে কাউকে ট্যাগ করুন!", event.threadID, event.messageID);

try {
const imgPath = await makeImage({ one, two });
return api.sendMessage(
{
body: "︵💚🌸︵\n\n-𝗙𝗮𝘃𝗼𝗿𝗶𝘁𝗲 𝗶𝗻 𝘁𝗵𝗶𝘀 𝗰𝗶𝘁𝘆 𝗶𝘀 𝘄𝗿𝗶𝘁𝗶𝗻𝗴 𝗻𝗼𝘃𝗲𝗹𝘀 𝗯𝘆 𝗽𝗮𝘀𝘀𝗶𝗼𝗻 𝗻𝗼𝘁 𝗹𝗼𝘃𝗲 -!!🙂💔🐰\n\n_এই শহরে আবেগ দ্বারা উপন্যাস লেখা হয় ভালোবাসা না-!!🖤🌸🐰𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
attachment: fs.createReadStream(imgPath),
mentions: [{ tag: event.mentions[two], id: two }]
},
event.threadID,
() => fs.unlinkSync(imgPath),
event.messageID
);
} catch (err) {
console.error(err);
api.sendMessage("❌ ছবি তৈরিতে ত্রুটি ঘটেছে!", event.threadID, event.messageID);
}
};

