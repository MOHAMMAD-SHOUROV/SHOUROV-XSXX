const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: `${global.config.PREFIX}`,
  version: "2.0.0",
  permission: 0,
  credits: "King_Shourov",
  description: "Stylish ultra-caption + image only",
  prefix: true,
  category: "user",
  usages: "/",
  cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
  const captions = [
    "❝ আমি তোমাকে ভালোবাসতাম… কিন্তু তুমি তো বুঝোনি ❞",
    "❝ হঠাৎ করে দূরে সরে যাবো একদিন, তখন খুঁজে পাবে… ❞",
    "❝ ভাঙা মন আর ভাঙা বিশ্বাস কোনোদিন জোড়া লাগে না… ❞",
    "❝ প্রয়োজন ছাড়া কেউ খোঁজ নেয় না… চেনা মানুষ গুলো অচেনা হয়ে যায় রোজ ❞",
    "❝ তুমি গল্প হয়েও গল্প না, তুমি সত্যি হয়েও কল্পনা ❞",
    "❝ সে বলেছিলো কোনোদিন সেরে যাবে না… তাহলে চলে গেছে কেন? ❞",
    "❝ পরিস্থিতির কারণে চুপ হয়ে গেছি… নাহলে হাসি খুশি তো আমিও কম ছিলাম না! ❞",
    "❝ কোনো এক মায়াবতীর জন্য আজও ভিতরটা পুড়ে… 🤍🪽 ❞",
    "❝ জীবনটা তখনই সুন্দর ছিল, যখন ভাবতাম চাঁদটা আমার... ❞",
    "❝ Life Is Beautiful If You Don’t Fall In Love ❞\n♡︎ _জীবন সুন্দর যদি কারো মায়ায় না পড়ো 🙂💔"
  ];

  const images = [
    "https://i.imgur.com/wzXgnwq.jpeg",
    "https://i.imgur.com/aWntUvL.jpeg",
    "https://i.imgur.com/E6xgJSI.jpeg",
    "https://i.imgur.com/xUNknmi.jpeg",
    "https://i.imgur.com/5BtyeEH.jpeg",
    "https://i.imgur.com/1w4Zec2.jpeg",
    "https://i.imgur.com/3MrSsoV.jpeg",
    "https://i.imgur.com/GggjGf9.jpeg",
    "https://i.imgur.com/bh5HuRn.jpeg",
    "https://i.imgur.com/TG3rIiJ.jpeg",
    "https://i.imgur.com/e1X4FL9.jpeg"
  ];

  const caption = captions[Math.floor(Math.random() * captions.length)];
  const imageURL = images[Math.floor(Math.random() * images.length)];
  const filePath = path.join(__dirname, "cache", `king_${Date.now()}.jpg`);

  try {
    const res = await axios({
      url: imageURL,
      method: "GET",
      responseType: "stream"
    });

    const writer = fs.createWriteStream(filePath);
    res.data.pipe(writer);

    writer.on("finish", () => {
      const styled =
`╭━━━━━━━〔🖤 ᶜʰᵃᵗ ᵇᵒᵗ ˢʰᵒᵘʳᵒᵛ 🖤〕━━━━━━━╮
        ${caption}
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯

             🔰 𝑩𝑶𝑻 𝑶𝑾𝑵𝑬𝑹: 𝐊𝐈𝐍𝐆 𝑺𝑯𝑶𝑼𝑹𝑶𝑽 👑`;

      api.sendMessage(
        {
          body: styled,
          attachment: fs.createReadStream(filePath)
        },
        event.threadID,
        () => fs.unlink(filePath, () => {})
      );
    });

  } catch (err) {
    console.log("❌ Error downloading image:", err);
    api.sendMessage("❌ ছবি আনতে সমস্যা হয়েছে...", event.threadID);
  }
};
