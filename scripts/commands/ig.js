/** Đổi Credit ? Bọn t đã không mã hóa cho mà edit rồi thì tôn trọng nhau tý đi ¯\_(ツ)_/¯ **/
module.exports.config = {
  name: `${global.config.PREFIX}`,
  version: "1.0.0", 
  permission: 0,
  credits: "King_Shourov",
  description: "Send random caption + random Imgur image with credit",
  prefix: true,
  category: "user",
  usages: "/",
  cooldowns: 5, 
  dependencies: {}
};

module.exports.run = async ({ api, event }) => {
  const axios = global.nodemodule["axios"];
  const request = global.nodemodule["request"];
  const fs = global.nodemodule["fs-extra"];

  // Caption লিস্ট
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

  // Imgur ছবির লিঙ্ক লিস্ট
  const images = [
    "https://i.imgur.com/e1X4FL9.jpeg",
    "https://i.imgur.com/TG3rIiJ.jpeg",
    "https://i.imgur.com/GggjGf9.jpeg",
    "https://i.imgur.com/3MrSsoV.jpeg",
    "https://i.imgur.com/1w4Zec2.jpeg",
    "https://i.imgur.com/5BtyeEH.jpeg",
    "https://i.imgur.com/xUNknmi.jpeg",
    "https://i.imgur.com/wzXgnwq.jpeg",
    "https://i.imgur.com/aWntUvL.jpeg",
    "https://i.imgur.com/aWntUvL.jpeg"
  ];

  // র‍্যান্ডম ক্যাপশন ও ছবি বাছাই
  const caption = captions[Math.floor(Math.random() * captions.length)];
  const imageURL = images[Math.floor(Math.random() * images.length)];
  const filePath = __dirname + "/cache/5.jpg";

  // ফটো ডাউনলোড এবং মেসেজ পাঠানোর ফাংশন
  const sendMessage = () => {
    const messageBody = `╔═══ 🖤 𝐒𝐚𝐝 𝐌𝐨𝐦𝐞𝐧𝐭 ═══╗\n` +
                        `❝ ${caption} ❞\n` +
                        `╚════════════════════╝\n\n` +
                        `– 🖤 সৌরভ বট`;
    api.sendMessage(
      {
        body: messageBody,
        attachment: fs.createReadStream(filePath)
      },
      event.threadID,
      () => fs.unlink(filePath, () => {})
    );
  };

  try {
    // ছবি ডাউনলোড করা হচ্ছে
    const res = await axios({
      url: imageURL,
      method: "GET",
      responseType: "stream"
    });
    const writer = fs.createWriteStream(filePath);
    res.data.pipe(writer);
    writer.on("finish", sendMessage);
    writer.on("error", () => api.sendMessage("❌ ছবি আনতে সমস্যা হয়েছে...", event.threadID));
  } catch (error) {
    api.sendMessage("❌ ছবি আনতে সমস্যা হয়েছে...", event.threadID);
  }
};