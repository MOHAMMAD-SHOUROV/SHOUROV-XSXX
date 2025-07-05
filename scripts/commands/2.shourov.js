const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const moment = require("moment-timezone");

module.exports.config = {
  name: "info",
  version: "1.0.1",
  permission: 0,
  credits: "Islamick Cyber Chat | Fixed by Shourov",
  prefix: true,
  description: "Admin and Bot info.",
  category: "system",
  cooldowns: 1,
  dependencies: {
    "axios": "",
    "fs-extra": ""
  }
};

module.exports.run = async function({ api, event }) {
  const time = process.uptime();
  const hours = Math.floor(time / (60 * 60));
  const minutes = Math.floor((time % (60 * 60)) / 60);
  const seconds = Math.floor(time % 60);
  const currentTime = moment.tz("Asia/Dhaka").format("DD/MM/YYYY || hh:mm:ss A");

  const imageLinks = [
    "https://i.imgur.com/TDpYXBD.jpg",
    "https://i.imgur.com/VHEu9Up.jpg"
  ];
  const imageURL = imageLinks[Math.floor(Math.random() * imageLinks.length)];
  const filePath = path.join(__dirname, "cache", "cyber.jpg");

  // Main message body
  const message = `
━━━━━━━━━━━━━━━━━━━━━
「 🤖 𝗕𝗢𝗧 & 𝗔𝗗𝗠𝗜𝗡 𝗜𝗡𝗙𝗢 🤖 」
━━━━━━━━━━━━━━━━━━━━━

👑 𝗕𝗢𝗧 𝗡𝗔𝗠𝗘: ${global.config.BOTNAME || "SHOUROV BOT"}
👤 𝗔𝗗𝗠𝗜𝗡: 𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯
📍 𝗟𝗢𝗖𝗔𝗧𝗜𝗢𝗡: Dhaka, Bangladesh

━━━━━━━━━━━━━━━━━━━━━
🔗 𝗖𝗢𝗡𝗧𝗔𝗖𝗧
━━━━━━━━━━━━━━━━━━━━━

🌐 𝗙𝗕 𝗜𝗗: https://facebook.com/broken.shourov.ss
📞 𝗣𝗔𝗚𝗘: N/A

━━━━━━━━━━━━━━━━━━━━━
⚙️ 𝗦𝗬𝗦𝗧𝗘𝗠 𝗦𝗧𝗔𝗧𝗨𝗦
━━━━━━━━━━━━━━━━━━━━━

📌 𝗣𝗥𝗘𝗙𝗜𝗫: ${global.config.PREFIX || "!"}
🕒 𝗨𝗣𝗧𝗜𝗠𝗘: ${hours}h ${minutes}m ${seconds}s
📆 𝗧𝗜𝗠𝗘: ${currentTime}

━━━━━━━━━━━━━━━━━━━━━
💖 𝗧𝗛𝗔𝗡𝗞 𝗬𝗢𝗨 𝗙𝗢𝗥 𝗨𝗦𝗜𝗡𝗚 💖
━━━━━━━━━━━━━━━━━━━━━`;

  try {
    const res = await axios.get(imageURL, { responseType: "arraybuffer" });
    await fs.ensureDir(path.join(__dirname, "cache"));
    fs.writeFileSync(filePath, Buffer.from(res.data, "binary"));

    return api.sendMessage({
      body: message,
      attachment: fs.createReadStream(filePath)
    }, event.threadID, () => fs.unlinkSync(filePath), event.messageID);

  } catch (err) {
    console.error("❌ Info command error:", err.message);
    return api.sendMessage("⚠️ ছবিটি লোড করতে সমস্যা হয়েছে। তবে ইনফো নিচে দেওয়া হলো:\n\n" + message, event.threadID, event.messageID);
  }
};