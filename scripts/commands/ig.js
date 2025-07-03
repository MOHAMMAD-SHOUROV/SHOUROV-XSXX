const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "profile",
  version: "1.0.4",
  permission: 0,
  credits: "King_Shourov",
  description: "Show user profile pic with sad captions",
  prefix: true,
  category: "user",
  usages: "",
  cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
  const uid = event.senderID;

  // Sad captions list
  const captions = [
    "❝ আমি তোমাকে ভালোবাসতাম… কিন্তু তুমি তো বুঝোনি ❞ – 💔 BOT OWNER সৌরভ",
    "❝ হঠাৎ করে দূরে সরে যাবো একদিন, তখন খুঁজে পাবে… ❞ – 💔 BOT OWNER সৌরভ",
    "❝ ভাঙা মন আর ভাঙা বিশ্বাস কোনোদিন জোড়া লাগে না… ❞ – 💔 BOT OWNER সৌরভ",
    "❝ দুঃখ দিলে মন দিলে না নিখুঁতভাবে কাদিয়ে বল্লে আর কেদো না 😔😔😔😔 ❞ – 💔 BOT OWNER সৌরভ",
    "❝ Think before you say bad things — ভালোবেসে ফেলবে ☺️🌸🌻 ❞ – 💔 BOT OWNER সৌরভ",
    "❝ আমার মতো খারাপ ছেলে, এই পৃথিবীতে আর একটাও নাই… 😅❞ – 💔 BOT OWNER সৌরভ",
    "❝ সে বলেছিলো কোনো দিনো সেরে যাবে না… তাহলে চলে গেছে কেন? ❞ – 💔 BOT OWNER সৌরভ",
    "❝ প্রয়োজন ছাড়া কেউ খোঁজ নেয় না… চেনা মানুষ গুলো অচেনা হয়ে যায় রোজ ❞ – 💔 BOT OWNER সৌরভ",
    "❝ তুমি গল্প হয়েও গল্প না, তুমি সত্যি হয়েও কল্পনা ❞ – 💔 BOT OWNER সৌরভ",
    "❝ পরিস্থিতির কারণে চুপ হয়ে গেছি… নাহলে হাসি খুশি তো আমিও কম ছিলাম না! ❞ – 💔 BOT OWNER সৌরভ",
    "❝ হাসির উত্তরে হাসি দেওয়া মানুষ গুলো অসম্ভব সুন্দর 🙂😊 ❞ – 💔 BOT OWNER সৌরভ",
    "❝ কোনো এক মায়াবতীর জন্য আজও ভিতরটা পুড়ে… 🤍🪽 ❞ – 💔 BOT OWNER সৌরভ",
    "❝ Life Is Beautiful If You Don’t Fall In Love ❞ ♡︎ _জীবন সুন্দর যদি কারো মায়ায় না পড়ো 🙂💔 – 💔 BOT OWNER সৌরভ",
    "❝ জীবনটা তখনই সুন্দর ছিল, যখন ভাবতাম আকাশের চাঁদটা শুধু আমার সাথেই হাঁটে… 👉❤️‍🩹🥀 ❞ – 💔 BOT OWNER সৌরভ",
    "❝ চোখের পানি কখনো কাউকে দেখাই না, শুধু বালিশ জানে ❞ – 💔 BOT OWNER সৌরভ",
    "❝ ভেতরে কাঁদছি, মুখে হেসে যাচ্ছি… এই অভিনয়টাই এখন জীবন ❞ – 💔 BOT OWNER সৌরভ",
    "❝ তোমার মতো করে ভালোবাসতে পারিনি… তাই হারিয়ে গেলাম ❞ – 💔 BOT OWNER সৌরভ",
    "❝ সম্পর্ক আর ফাইল… ঠিকমতো সেভ না করলে একদিন হারিয়ে যায় ❞ – 💔 BOT OWNER সৌরভ",
    "❝ তোর হেসে উঠার মাঝে আজ আমার কান্না খুঁজে পাই ❞ – 💔 BOT OWNER সৌরভ",
    "❝ যার হৃদয় ভাঙে, সে চুপচাপ থাকলেও ভিতরে ভিতরে কাঁদে ❞ – 💔 BOT OWNER সৌরভ",
    "❝ আমি তো শুধু তোকে ভালোবেসেছিলাম… কিন্তু তুই তো ভালোবাসা বোঝোস না ❞ – 💔 BOT OWNER সৌরভ",
    "❝ কারো জন্য নিজেকে এতটাও বদলিও না… যে নিজেই তোকে বুঝে না ❞ – 💔 BOT OWNER সৌরভ"
  ];

  const caption = captions[Math.floor(Math.random() * captions.length)];
  const fallbackURL = "https://i.postimg.cc/tTP6nKQv/user404.jpg"; // fallback pic for unfriended users
  const imgURL = `https://graph.facebook.com/${uid}/picture?width=720&height=720`;
  const imgPath = path.join(__dirname, "cache", `${uid}.jpg`);

  let name = "😶 Unknown";

  try {
    const info = await api.getUserInfo(uid);
    name = info[uid]?.name || name;
  } catch {}

  try {
    const response = await axios({
      url: imgURL,
      method: "GET",
      responseType: "stream",
      validateStatus: false
    });

    const writer = fs.createWriteStream(imgPath);
    if (response.status === 200) {
      response.data.pipe(writer);
      writer.on("finish", () => sendImage(imgPath));
    } else {
      // Use fallback image
      const fallbackPath = path.join(__dirname, "cache", `fallback_${uid}.jpg`);
      const fallbackRes = await axios({ url: fallbackURL, method: "GET", responseType: "stream" });
      const fallbackWriter = fs.createWriteStream(fallbackPath);
      fallbackRes.data.pipe(fallbackWriter);
      fallbackWriter.on("finish", () => sendImage(fallbackPath));
    }

    function sendImage(pathToSend) {
      api.sendMessage({
        body: `🖤 𝑺𝒂𝒅 𝑴𝒐𝒎𝒆𝒏𝒕:\n❝ ${caption} ❞\n\n👤 Name: ${name}\n🔗 UID: ${uid}`,
        attachment: fs.createReadStream(pathToSend)
      }, event.threadID, () => fs.unlink(pathToSend).catch(() => {}));
    }

  } catch (err) {
    console.error("⚠️ Error:", err);
    api.sendMessage("❌ প্রোফাইল লোড করতে সমস্যা হয়েছে।", event.threadID);
  }
};
