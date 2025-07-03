/** Đổi Credit ? Bọn t đã không mã hóa cho mà edit rồi thì tôn trọng nhau tý đi ¯\_(ツ)_/¯ **/
module.exports.config = {
  name: `${global.config.PREFIX}`,
  version: "1.0.0", 
  permission: 0,
  credits: "King_Shourov",
  description: "Send random caption with styled image",
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

  const captions = [
    "❝ আমি তোমাকে ভালোবাসতাম… কিন্তু তুমি তো বুঝোনি ❞সৌরভ-বট",
    "❝ হঠাৎ করে দূরে সরে যাবো একদিন, তখন খুঁজে পাবে… ❞",
    "❝ ভাঙা মন আর ভাঙা বিশ্বাস কোনোদিন জোড়া লাগে না… ❞সৌরভ-বট",
    "❝ প্রয়োজন ছাড়া কেউ খোঁজ নেয় না… চেনা মানুষ গুলো অচেনা হয়ে যায় রোজ ❞সৌরভ-বট",
    "❝ তুমি গল্প হয়েও গল্প না, তুমি সত্যি হয়েও কল্পনা ❞সৌরভ-বট",
    "❝ সে বলেছিলো কোনোদিন সেরে যাবে না… তাহলে চলে গেছে কেন? ❞সৌরভ-বট",
    "❝ পরিস্থিতির কারণে চুপ হয়ে গেছি… নাহলে হাসি খুশি তো আমিও কম ছিলাম না! ❞সৌরভ-বট",
    "❝ কোনো এক মায়াবতীর জন্য আজও ভিতরটা পুড়ে… 🤍🪽 ❞সৌরভ-বট",
    "❝ জীবনটা তখনই সুন্দর ছিল, যখন ভাবতাম চাঁদটা আমার... ❞সৌরভ-বট",
    "❝ Life Is Beautiful If You Don’t Fall In Love ❞\n♡︎ _জীবন সুন্দর যদি কারো মায়ায় না পড়ো 🙂💔সৌরভ-বট",
    "🌸 কোনো এক মায়াবতীর জন্য আজও ভিতরটা পুড়ে ︵😌🤍🪽সৌরভ-বট",
    "❝ সৌন্দর্য শুধু চোখকে আকর্ষণ করে, কিন্তু ব্যক্তিত্ব হৃদয় কেড়ে নেয়! ❞সৌরভ-বট",
    "❝ মানুষের মস্তিষ্কই হলো একটা কবরস্থান, যেখানে হাজারো স্বপ্নের মৃত্যু ঘটে.. 💔 ❞সৌরভ-বট",
    "❝ হঠাৎ একদিন দেখা হবে °কিন্তু° কথা হবে না 🖤 ❞সৌরভ-বট",
    "❝ যাকে তুমি যত বেশি চাইবে, সে তোমাকে তত বেশি ইগনোর করবে… এটাই বাস্তব 🙂 ❞সৌরভ-বট"
  ];

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
    "https://i.imgur.com/XOeAkn1.jpeg",
    "https://i.imgur.com/JuA7M0t.jpeg",
    "https://i.imgur.com/CPK9lur.jpeg",
    "https://i.imgur.com/Te7k6sV.jpeg",
    "https://i.imgur.com/vnVjD6L.jpeg"
  ];

  const caption = captions[Math.floor(Math.random() * captions.length)];
  const imageURL = images[Math.floor(Math.random() * images.length)];
  const filePath = __dirname + "/cache/5.jpg";

  const styledBody = `╔═══『 ${caption} 』═══╗\n\n⚜️ 𝐁𝐎𝐓 𝐎𝐖𝐍𝐄𝐑: 𝐊𝐈𝐍𝐆 𝐒𝐇𝐎𝐔𝐑𝐎𝐕 ⚜️`;

  const callback = () => api.sendMessage(
    {
      body: styledBody,
      attachment: fs.createReadStream(filePath)
    },
    event.threadID,
    () => fs.unlinkSync(filePath)
  );

  return request(encodeURI(imageURL))
    .pipe(fs.createWriteStream(filePath))
    .on("close", callback);
};