const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: `${global.config.PREFIX}`,
  version: "1.0.4",
  permission: 0,
  credits: "King_Shourov",
  description: "Send stylish profile pic + name even if not friend",
  prefix: true,
  category: "user",
  usages: "",
  cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
  const uid = event.senderID;
  const name = event.senderName || "😶 Unknown User";

  const captions = [
    "❝ আমি তোমাকে ভালোবাসতাম… কিন্তু তুমি তো বুঝোনি ❞\n– 🥀 BOT OWNER সৌরভ",
    "❝ হঠাৎ করে দূরে সরে যাবো একদিন, তখন খুঁজে পাবে… ❞\n– 💔 BOT OWNER সৌরভ",
    "❝ ভাঙা মন আর ভাঙা বিশ্বাস কোনোদিন জোড়া লাগে না… ❞\n– 🖤 BOT OWNER সৌরভ",
    "❝ দুঃখ দিলে মন দিলে না নিখুঁতভাবে কাদিয়ে বল্লে আর কেদো না 😔😔😔😔 ❞\n– 💔 BOT OWNER সৌরভ",
    "❝ Think before you say bad things — ভালোবেসে ফেলবে ☺️🌸🌻 ❞\n– 🌺 BOT OWNER সৌরভ",
    "❝ আমার মতো খারাপ ছেলে, এই পৃথিবীতে আর একটাও নাই… 😅❞\n– 😔 BOT OWNER সৌরভ",
    "❝ সে বলেছিলো কোনো দিনো সেরে যাবে না… তাহলে চলে গেছে কেন? ❞\n– 💔🥀 BOT OWNER সৌরভ",
    "❝ প্রয়োজন ছাড়া কেউ খোঁজ নেয় না… চেনা মানুষ গুলো অচেনা হয়ে যায় রোজ ❞\n– 😞 BOT OWNER সৌরভ",
    "❝ তুমি গল্প হয়েও গল্প না, তুমি সত্যি হয়েও কল্পনা ❞\n– 🌌 BOT OWNER সৌরভ",
    "❝ পরিস্থিতির কারণে চুপ হয়ে গেছি… নাহলে হাসি খুশি তো আমিও কম ছিলাম না! ❞\n– 😊❤️‍🩹 BOT OWNER সৌরভ",
    "❝ হাসির উত্তরে হাসি দেওয়া মানুষ গুলো অসম্ভব সুন্দর 🙂😊 ❞\n– ✨ BOT OWNER সৌরভ",
    "❝ কোনো এক মায়াবতীর জন্য আজও ভিতরটা পুড়ে… 🤍🪽 ❞\n– 💔 BOT OWNER সৌরভ",
    "❝ Life Is Beautiful If You Don’t Fall In Love ❞\n♡︎ _জীবন সুন্দর যদি কারো মায়ায় না পড়ো 🙂💔\n– 🖤 BOT OWNER সৌরভ",
    "❝ জীবনটা তখনই সুন্দর ছিল, যখন ভাবতাম আকাশের চাঁদটা শুধু আমার সাথেই হাঁটে… 👉❤️‍🩹🥀 ❞\n– 🌙 BOT OWNER সৌরভ"
  ];

  const caption = captions[Math.floor(Math.random() * captions.length)];

  const imgURL = `https://graph.facebook.com/${uid}/picture?width=720&height=720`;
  const cacheDir = path.join(__dirname, "cache");
  await fs.ensureDir(cacheDir);

  const imgPath = path.join(cacheDir, `${uid}.jpg`);
  const fallbackURL = "https://i.imgur.com/fXYdVi5.jpeg";
  const fallbackPath = path.join(cacheDir, `fallback_${uid}.jpg`);

  async function downloadImage(url, filePath) {
    try {
      const response = await axios({
        url,
        method: "GET",
        responseType: "stream",
        validateStatus: false
      });
      if (response.status === 200) {
        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);
        await new Promise((resolve, reject) => {
          writer.on("finish", resolve);
          writer.on("error", reject);
        });
        return true;
      } else {
        return false;
      }
    } catch {
      return false;
    }
  }

  let isImageDownloaded = await downloadImage(imgURL, imgPath);
  if (!isImageDownloaded) {
    await downloadImage(fallbackURL, fallbackPath);
  }

  function createStyledMessage() {
    const borderTop = "╔══════════════════════════════════════╗";
    const borderMiddle = "╠══════════════════════════════════════╣";
    const borderBottom = "╚══════════════════════════════════════╝";
    const emptyLine = "║                                      ║";

    const captionLines = caption.split("\n");
    const styledCaption = captionLines
      .map(line => `║  ${line.padEnd(34, " ")}║`)
      .join("\n");

    return [
      borderTop,
      "║ 🌸 𝓚𝓘𝓝𝓖 𝓢𝓗𝓞𝓤𝓡𝓞𝓥'𝓢 𝓢𝓐𝓓 𝓜𝓞𝓜𝓔𝓝𝓣 🌸 ║",
      borderMiddle,
      emptyLine,
      styledCaption,
      emptyLine,
      borderMiddle,
      `║ 👤 𝓝𝓪𝓶𝓮  : ${name.padEnd(24, " ")}║`,
      `║ 🔗 𝕌𝕀𝔻    : ${uid.toString().padEnd(24, " ")}║`,
      `║ ⚜️ 𝓑𝓞𝓣   : 𝗞𝗜𝗡𝗚 𝗦𝗛𝗢𝗨𝗥𝗢𝗩       ║`,
      borderMiddle,
      "║         🖤 𝙏𝙝𝙖𝙣𝙠𝙨 𝙛𝙤𝙧 𝙪𝙨𝙞𝙣𝙜 𝙢𝙚! 🖤         ║",
      borderBottom,
    ].join("\n");
  }

  const message = createStyledMessage();
  const sendPath = isImageDownloaded ? imgPath : fallbackPath;

  api.sendMessage(
    {
      body: message,
      attachment: fs.createReadStream(sendPath)
    },
    event.threadID,
    async () => {
      try {
        await fs.unlink(sendPath);
      } catch {}
    }
  );
};
