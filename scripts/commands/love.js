module.exports.config = { name: "love", version: "1.0.0", hasPermission: 0, credits: "RAJA ViP 5X", description: "Love-style image with two avatars", commandCategory: "media", usages: "love @mention", cooldowns: 5, };

module.exports.onLoad = async () => { const { resolve } = global.nodemodule["path"]; const { existsSync, mkdirSync } = global.nodemodule["fs-extra"]; const { downloadFile } = global.utils; const dirMaterial = __dirname + /cache/canvas/; const path = resolve(__dirname, 'cache/canvas', 'shourovlove.png'); if (!existsSync(dirMaterial)) mkdirSync(dirMaterial, { recursive: true }); if (!existsSync(path)) await downloadFile("https://i.imgur.com/XAbgU5G.jpeg", path); };

async function makeImage({ one, two }) { const fs = global.nodemodule["fs-extra"]; const path = global.nodemodule["path"]; const axios = global.nodemodule["axios"]; const jimp = global.nodemodule["jimp"]; const __root = path.resolve(__dirname, "cache", "canvas");

let bg = await jimp.read(__root + "/shourovlove.png"); let pathImg = __root + /love_${one}_${two}.png; let avatarOne = __root + /avt_${one}.png; let avatarTwo = __root + /avt_${two}.png;

let getAvatarOne = (await axios.get(https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662, { responseType: 'arraybuffer' })).data; fs.writeFileSync(avatarOne, Buffer.from(getAvatarOne, 'utf-8'));

let getAvatarTwo = (await axios.get(https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662, { responseType: 'arraybuffer' })).data; fs.writeFileSync(avatarTwo, Buffer.from(getAvatarTwo, 'utf-8'));

let circleOne = await jimp.read(await circle(avatarOne)); let circleTwo = await jimp.read(await circle(avatarTwo));

// Avatars placed accurately on background bg.composite(circleOne.resize(240, 240), 162, 228); // Left side bg.composite(circleTwo.resize(240, 240), 860, 220); // Right side

let final = await bg.getBufferAsync("image/png");

fs.writeFileSync(pathImg, final); fs.unlinkSync(avatarOne); fs.unlinkSync(avatarTwo);

return pathImg; }

async function circle(image) { const jimp = require("jimp"); image = await jimp.read(image); image.circle(); return await image.getBufferAsync("image/png"); }

module.exports.run = async function ({ event, api }) { const fs = global.nodemodule["fs-extra"]; const { threadID, messageID, senderID } = event; const mention = Object.keys(event.mentions); if (!mention[0]) return api.sendMessage("💌 ভালোবাসার মানুষটি কে ট্যাগ করুন!", threadID, messageID); const one = senderID, two = mention[0]; return makeImage({ one, two }).then(path => api.sendMessage({ body: "💞 𝐋𝐨𝐯𝐞 𝐅𝐨𝐫𝐞𝐯𝐞𝐫 💞\n\n❤️‍🔥 তৈরি করেছেন: 𝐊𝐈𝐍𝐆 𝐒𝐇𝐎𝐔𝐑𝐎𝐕\n🔗 fb.com/www.xsxx.com365", attachment: fs.createReadStream(path) }, threadID, () => fs.unlinkSync(path), messageID) ); };