const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: `${global.config.PREFIX}`, // Usually "/"
  version: "1.0.1",
  permission: 0,
  credits: "King_Shourov",
  description: "Send profile picture with Sad caption",
  prefix: true,
  category: "user",
  usages: "",
  cooldowns: 5,
  dependencies: {}
};

module.exports.run = async ({ api, event }) => {
  const uid = event.senderID;
  const name = event.senderName;

  // 😢 Sad captions with "সৌরভ" and "King_Shourov"
  const captions = [
    "❝ আমি তোমাকে ভালোবাসতাম… কিন্তু তুমি তো বুঝোনি ❞\n– 🥀𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
    "❝ হঠাৎ করে দূরে সরে যাবো একদিন, তখন খুঁজে পাবে… ❞\n– 💔 সৌরভ",
    "❝ ভাঙা মন আর ভাঙা বিশ্বাস কোনোদিন জোড়া লাগে না… ❞\n– 🖤𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
    "❝ দুঃখের দিনে যার পাশে কাউকে পাওয়া যায় না, তার নাম একা ❞\n– 😞 সৌরভ",
    "❝ তোর হেসে উঠার মাঝে আজ আমার কান্না খুঁজে পাই… ❞\n– 🥀𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
    "❝ চোখের পানি কখনো কাউকে দেখাই না, শুধু বিছানার বালিশ জানে… ❞\n– 😔 সৌরভ",
    "❝ আমার ভালোবাসা ছিলো সত্য… কিন্তু তোর ছিলো সময় কাটানোর জন্য ❞\n– 💔𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
    "❝ দুঃখে মানুষ চুপচাপ হয়ে যায়… কারণ কান্নার ভাষা সবাই বোঝে না ❞\n– 🖤 সৌরভ",
    "❝ ভালোবাসা মানে একতরফা কষ্ট না… কিন্তু আমি শুধু কষ্টই পেলাম ❞\n– 🥀𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
    "❝ কিছু অনুভূতির কোনো নাম হয় না… শুধু বোঝা যায় ❞\n– 😢 সৌরভ",
    "❝ আমি এখনো অপেক্ষা করি… যদিও জানি, তুমি আর আসবে না ❞\n– 💔𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
    "❝ যাকে তুমি চোখে হারাও, সে কিন্তু তোমাকে হারানোর ভয় পায় না ❞\n– 🥀 সৌরভ",
    "❝ যার হৃদয় ভাঙে, সে চুপচাপ থাকলেও ভিতরে ভিতরে কাঁদে ❞\n– 😞𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯",
    "❝ আমি তো শুধু তোকে ভালোবেসেছিলাম… কিন্তু তুই তো ভালোবাসা বোঝোস না ❞\n– 💔 সৌরভ",
    "❝ কারো জন্য নিজেকে এতটাও বদলিও না… যে নিজেই তোকে বুঝে না ❞\n– 😔𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯"
  ];

  const caption = captions[Math.floor(Math.random() * captions.length)];
  const imgURL = `https://graph.facebook.com/${uid}/picture?width=720&height=720`;
  const imgPath = path.join(__dirname, "cache", `${uid}.jpg`);

  try {
    const response = await axios({
      url: imgURL,
      method: "GET",
      responseType: "stream"
    });

    const writer = fs.createWriteStream(imgPath);
    response.data.pipe(writer);

    writer.on("finish", () => {
      api.sendMessage(
        {
          body: `🖤 𝑺𝒂𝒅 𝑴𝒐𝒎𝒆𝒏𝒕:\n❝ ${caption} ❞\n\n👤 𝐍𝐚𝐦𝐞: ${name}\n🔗 𝐔𝐈𝐃: ${uid}`,
          attachment: fs.createReadStream(imgPath)
        },
        event.threadID,
        () => fs.unlinkSync(imgPath)
      );
    });

  } catch (err) {
    console.error(err);
    api.sendMessage("❌ প্রোফাইল পিকচার আনতে সমস্যা হয়েছে!", event.threadID);
  }
};