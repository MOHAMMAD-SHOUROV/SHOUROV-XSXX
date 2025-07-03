const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "profile",
  version: "1.0.3",
  permission: 0,
  credits: "King_Shourov",
  description: "Show user profile pic and info",
  prefix: true,
  category: "user",
  usages: "",
  cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
  const uid = event.senderID;

  try {
    const info = await api.getUserInfo(uid);
    const name = info[uid]?.name || "😶 Unknown User";

    const captions = [
      "❝ আমি তোমাকে ভালোবাসতাম… কিন্তু তুমি তো বুঝোনি ❞ – 💔 BOT OWNER সৌরভ",
      "❝ হঠাৎ করে দূরে সরে যাবো একদিন, তখন খুঁজে পাবে… ❞ – 💔 BOT OWNER সৌরভ",
      "❝ ভাঙা মন আর ভাঙা বিশ্বাস কোনোদিন জোড়া লাগে না… ❞ – 🖤 BOT OWNER সৌরভ",
      "❝ দুঃখ দিলে মন দিলে না নিখুঁতভাবে কাদিয়ে বল্লে আর কেদো না 😔😔😔😔 ❞ – 💔 BOT OWNER সৌরভ",
      "❝ Think before you say bad things — ভালোবেসে ফেলবে ☺️🌸🌻 ❞ – 🌺 BOT OWNER সৌরভ",
      "❝ আমার মতো খারাপ ছেলে, এই পৃথিবীতে আর একটাও নাই… 😅❞ – 😔 BOT OWNER সৌরভ",
      "❝ সে বলেছিলো কোনো দিনো সেরে যাবে না… তাহলে চলে গেছে কেন? ❞ – 💔🥀 BOT OWNER সৌরভ",
      "❝ প্রয়োজন ছাড়া কেউ খোঁজ নেয় না… চেনা মানুষ গুলো অচেনা হয়ে যায় রোজ ❞ – 😞 BOT OWNER সৌরভ",
      "❝ তুমি গল্প হয়েও গল্প না, তুমি সত্যি হয়েও কল্পনা ❞ – 🌌 BOT OWNER সৌরভ",
      "❝ পরিস্থিতির কারণে চুপ হয়ে গেছি… নাহলে হাসি খুশি তো আমিও কম ছিলাম না! ❞ – 😊❤️‍🩹 BOT OWNER সৌরভ",
      "❝ হাসির উত্তরে হাসি দেওয়া মানুষ গুলো অসম্ভব সুন্দর 🙂😊 ❞ – ✨ BOT OWNER সৌরভ",
      "❝ কোনো এক মায়াবতীর জন্য আজও ভিতরটা পুড়ে… 🤍🪽 ❞ – 💔 BOT OWNER সৌরভ",
      "❝ Life Is Beautiful If You Don’t Fall In Love ❞ ♡︎ _জীবন সুন্দর যদি কারো মায়ায় না পড়ো 🙂💔 – 🖤 BOT OWNER সৌরভ",
      "❝ জীবনটা তখনই সুন্দর ছিল, যখন ভাবতাম আকাশের চাঁদটা শুধু আমার সাথেই হাঁটে… 👉❤️‍🩹🥀 ❞ – 🌙 BOT OWNER সৌরভ",
      "❝ ভাঙা মন আর ভাঙা বিশ্বাস কোনোদিন জোড়া লাগে না... ❞ – 🖤 BOT OWNER সৌরভ",
      "❝ চোখের পানি কখনো কাউকে দেখাই না, শুধু বালিশ জানে ❞ – 😢 BOT OWNER সৌরভ"
    ];

    const caption = captions[Math.floor(Math.random() * captions.length)];

    const imgURL = `https://graph.facebook.com/${uid}/picture?width=720&height=720`;
    const imgPath = path.join(__dirname, "cache", `${uid}.jpg`);

    const response = await axios({
      url: imgURL,
      method: "GET",
      responseType: "stream"
    });

    const writer = fs.createWriteStream(imgPath);
    response.data.pipe(writer);

    writer.on("finish", () => {
      api.sendMessage({
        body: `🖤 𝑲𝑰𝑵𝑮-𝑺𝑯𝑶𝑼𝑹𝑶𝑽-𝑪𝑯𝑨𝑻 𝑩𝑶𝑻:\n❝ ${caption} ❞\n\n👤 Name: ${name}\n🔗 UID: ${uid}`,
        attachment: fs.createReadStream(imgPath)
      }, event.threadID, () => fs.unlinkSync(imgPath));
    });

  } catch (e) {
    console.error(e);
    api.sendMessage("❌ প্রোফাইল লোড করতে ব্যর্থ।", event.threadID);
  }
};
