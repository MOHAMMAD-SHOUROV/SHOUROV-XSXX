const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: `${global.config.PREFIX}`,
  version: "1.0.2",
  permission: 0,
  credits: "King_Shourov",
  description: "Send profile pic + name even if not friend",
  prefix: true,
  category: "user",
  usages: "",
  cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
  const uid = event.senderID;
  const name = event.senderName || "😶 Unknown User";

  // ✅ Sad captions with BOT OWNER সৌরভ
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

  // ✅ Random caption pick
  const caption = captions[Math.floor(Math.random() * captions.length)];

  const imgURL = `https://graph.facebook.com/${uid}/picture?width=720&height=720`;
  const imgPath = path.join(__dirname, "cache", `${uid}.jpg`);
  const fallbackURL = "https://i.postimg.cc/tTP6nKQv/user404.jpg"; // fallback profile pic

  try {
    const response = await axios({
      url: imgURL,
      method: "GET",
      responseType: "stream",
      validateStatus: false
    });

    if (response.status === 200) {
      const writer = fs.createWriteStream(imgPath);
      response.data.pipe(writer);
      writer.on("finish", () => sendMessage(imgPath));
    } else {
      console.log("🛑 FB profile image not available. Using fallback.");
      await useFallback();
    }

  } catch (e) {
    console.log("⚠️ Error fetching profile pic, using fallback.");
    await useFallback();
  }

  async function useFallback() {
    const fallbackPath = path.join(__dirname, "cache", `fallback_${uid}.jpg`);
    const res = await axios({
      url: fallbackURL,
      method: "GET",
      responseType: "stream"
    });
    const writer = fs.createWriteStream(fallbackPath);
    res.data.pipe(writer);
    writer.on("finish", () => sendMessage(fallbackPath));
  }

  function sendMessage(imagePath) {
    api.sendMessage(
      {
        body: `🖤 𝑲𝑰𝑵𝑮 𝑺𝑯𝑶𝑼𝑹𝑶𝑽-𝑪𝑯𝑨𝑻 𝑩𝑶𝑻:\n❝ ${caption} ❞\n\n👤 𝐍𝐚𝐦𝐞: ${name}\n🔗 𝐔𝐈𝐃: ${uid}`,
        attachment: fs.createReadStream(imagePath)
      },
      event.threadID,
      () => fs.unlink(imagePath).catch(() => {})
    );
  }
};
