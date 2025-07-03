const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "🥰",
    version: "1.0.1",
    prefix: false,
    permission: 0,
    credits: "nayan",
    description: "Fun",
    category: "no prefix",
    usages: "😒",
    cooldowns: 5,
  },

  handleEvent: async function({ api, event }) {
    const { threadID, messageID, body } = event;
    if (!body) return;

    if (
      body.startsWith("😘") ||
      body.startsWith("🥰") ||
      body.startsWith("😍") ||
      body.startsWith("🤩")
    ) {
      try {
        // অডিও ফাইলের সঠিক পাথ
        const audioPath = path.resolve(__dirname, "../cache/Shourov.mp3");

        // ডিবাগিং এর জন্য লগ দেখাবে কোথায় চেক করলো ফাইল
        console.log("Audio file path:", audioPath);
        console.log("File exists:", fs.existsSync(audioPath));

        // যদি ফাইল না থাকে, ইউজারকে জানাবে
        if (!fs.existsSync(audioPath)) {
          return api.sendMessage("❌ অডিও ফাইল পাওয়া যায়নি!", threadID, messageID);
        }

        // মেসেজ সেট করা হচ্ছে
        const msg = {
          body: "এ্ঁত্ঁ ভা্ঁলো্ঁবা্ঁসা্ঁ ক্ঁই্ঁ পা্ঁও্ঁ আ্ঁমা্ঁর্ঁ ব্ঁস্ঁ সৌ্ঁর্ঁভ্ঁ কে্ঁ এ্ঁক্ঁটুঁ দে্ঁও্ঁ 🌺",
          attachment: fs.createReadStream(audioPath),
        };

        // মেসেজ পাঠানো
        api.sendMessage(msg, threadID, messageID);

        // মেসেজ রিয়েকশন দেয়া
        api.setMessageReaction("😁", messageID, () => {}, true);

      } catch (error) {
        console.error("⚠️ অডিও পাঠাতে সমস্যা:", error.message);
      }
    }
  },

  start() {
    // Optional, বট স্টার্ট হলে যা করণীয় তা এখানে দিবে
  },
};