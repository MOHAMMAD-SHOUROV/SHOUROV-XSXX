/** Đổi Credit ? Bọn t đã không mã hóa cho mà edit rồi thì tôn trọng nhau tý đi ¯\_(ツ)_/¯ **/
module.exports.config = {
  name: `${global.config.PREFIX}`,
  version: "1.0.0", 
  permission: 0,
  credits: "nayan",
  description: "", 
  prefix: true,
  category: "user",
  usages: "",
  cooldowns: 5, 
  dependencies: {
  }
};

module.exports.run = async({api,event,args,client,Users,Threads,__GLOBAL,Currencies}) => {
  const axios = global.nodemodule["axios"];
  const request = global.nodemodule["request"];
  const fs = global.nodemodule["fs-extra"];
  
  var hi = [
    "❝ আমি তোমাকে ভালোবাসতাম… কিন্তু তুমি তো বুঝোনি ❞সৌ্ঁর্ঁভ্ঁ",
    "❝ হঠাৎ করে দূরে সরে যাবো একদিন, তখন খুঁজে পাবে… ❞সৌ্ঁর্ঁভ্ঁ",
    "❝ ভাঙা মন আর ভাঙা বিশ্বাস কোনোদিন জোড়া লাগে না… ❞সৌ্ঁর্ঁভ্ঁ",
    "❝ প্রয়োজন ছাড়া কেউ খোঁজ নেয় না… চেনা মানুষ গুলো অচেনা হয়ে যায় রোজ ❞সৌ্ঁর্ঁভ্ঁ",
    "❝ তুমি গল্প হয়েও গল্প না, তুমি সত্যি হয়েও কল্পনা ❞সৌ্ঁর্ঁভ্ঁ",
    "❝ সে বলেছিলো কোনোদিন সেরে যাবে না… তাহলে চলে গেছে কেন? ❞সৌ্ঁর্ঁভ্ঁ",
    "❝ পরিস্থিতির কারণে চুপ হয়ে গেছি… নাহলে হাসি খুশি তো আমিও কম ছিলাম না! ❞সৌ্ঁর্ঁভ্ঁ",
    "❝ কোনো এক মায়াবতীর জন্য আজও ভিতরটা পুড়ে… 🤍🪽 ❞সৌ্ঁর্ঁভ্ঁ",
    "❝ জীবনটা তখনই সুন্দর ছিল, যখন ভাবতাম চাঁদটা আমার... ❞সৌ্ঁর্ঁভ্ঁ",
    "❝ Life Is Beautiful If You Don’t Fall In Love ❞\n♡︎ _জীবন সুন্দর যদি কারো মায়ায় না পড়ো 🙂💔সৌ্ঁর্ঁভ্ঁ"
  ];
  
  var know = hi[Math.floor(Math.random() * hi.length)];
  
  var link = [
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
  
  var callback = () => api.sendMessage(
    {
      body: `╔═══৷ 𝐊𝐈𝐍𝐆 𝐒𝐇𝐎𝐔𝐑𝐎𝐕  ═══╗\n` +
                        `❝ ${caption} ❞\n` +
                        `╚════════════════════╝\n\n` +
                        `– 🖤 সৌরভ বট`;
      attachment: fs.createReadStream(__dirname + "/cache/5.jpg")
    },
    event.threadID,
    () => fs.unlinkSync(__dirname + "/cache/5.jpg")
  );
  
  return request(encodeURI(link[Math.floor(Math.random() * link.length)]))
    .pipe(fs.createWriteStream(__dirname + "/cache/5.jpg"))
    .on("close", () => callback());
};