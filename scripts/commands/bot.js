const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "bot",
    version: "1.0.0",
    aliases: ["mim"],
    permission: 0,
    credits: "nayan",
    description: "talk with bot",
    prefix: 3,
    category: "talk",
    usages: "hi",
    cooldowns: 5,
  },

  start: async function ({ nayan, events, args, Users, api }) {
    try {
      const msg = args.join(" ");

      // ইউজারের FB প্রোফাইল পিকচার URL (আপনার access token ব্যবহার করবেন)
      const imgURL = `https://graph.facebook.com/${events.senderID}/picture?width=720&height=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
      const name = await Users.getNameUser(events.senderID);

      if (!msg) {
        // ক্যাপশনগুলো যেখান থেকে র‍্যান্ডম নেবেন
        const greetings = [
          "আহ শুনা আমার তোমার অলিতে গলিতে উম্মাহ😇😘",
          "কি গো সোনা আমাকে ডাকছ কেনো",
          "বার বার আমাকে ডাকস কেন😡",
          "আহ শোনা আমার আমাকে এতো ডাক্তাছো কেনো আসো বুকে আশো🥱",
          "হুম জান তোমার অইখানে উম্মমাহ😷😘",
          "আসসালামু আলাইকুম বলেন আপনার জন্য কি করতে পারি",
          "আমাকে এতো না ডেকে বস সৌরভ'কে একটা গফ দে 🙄",
          "jang hanga korba",
          "jang bal falaba🙂"
        ];

        const randomCaption = greetings[Math.floor(Math.random() * greetings.length)];
        const caption = `${randomCaption}\n\n✨ 𝐑𝐄𝐒𝐏𝐎𝐍𝐒𝐄 𝐁𝐘: 𝐊𝐈𝐍𝐆 𝐒𝐇𝐎𝐔𝐑𝐎𝐕 🔗 fb.me/www.xsxx.com365`;

        // ছবি ডাউনলোড ও লোকাল ফাইলে সেভ
        const imgPath = path.join(__dirname, `cache/${events.senderID}.jpg`);
        const img = (await axios.get(imgURL, { responseType: 'arraybuffer' })).data;
        fs.writeFileSync(imgPath, Buffer.from(img));

        // ছবি ও ক্যাপশন একসাথে পাঠানো
        await api.sendMessage({
          body: caption,
          attachment: fs.createReadStream(imgPath)
        }, events.threadID, events.messageID);

        // ক্যাশ ছবি ডিলিট করা
        fs.unlinkSync(imgPath);

      } else {
        // যদি মেসেজ থাকে, তাহলে অন্য কিছু করতে পারেন, যেমন রেন্ডম গ্রীটিং
        return nayan.reply("আপনার মেসেজ পেয়েছি, কিন্তু আমি শুধুমাত্র ক্যাপশন+ডিপি পাঠাতে পারি!", events.threadID, events.messageID);
      }

    } catch (error) {
      console.error(error);
      nayan.reply('দুঃখিত, কিছু একটা ভুল হয়েছে, পরে আবার চেষ্টা করুন।', events.threadID, events.messageID);
    }
  }
}