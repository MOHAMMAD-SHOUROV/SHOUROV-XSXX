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

  handleReply: async function ({ api, event }) {
    try {
      const apiData = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN-07/Nayan/main/api.json');
      const apiUrl = apiData.data.sim;
      const kl = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN-07/Nayan/main/api.json');
      const apiUrl2 = kl.data.api2;

      // event.body থেকে ইউজারের মেসেজ পাঠানো
      const response = await axios.get(`${apiUrl}/sim?type=ask&ask=${encodeURIComponent(event.body)}`);
      const result = response.data.data.msg;

      // টেক্সট স্টাইল লোড করা
      const textStyles = loadTextStyles();
      const userStyle = textStyles[event.threadID]?.style || 'normal';

      // স্টাইল্ড ফন্টের জন্য API কল
      const fontResponse = await axios.get(`${apiUrl2}/bold?text=${encodeURIComponent(result)}&type=${userStyle}`);
      const text = fontResponse.data.data.bolded;

      // রেসপন্স পাঠানো
      api.sendMessage(text, event.threadID, (error, info) => {
        if (error) {
          console.error('Error replying to user:', error);
          return api.sendMessage('An error occurred while processing your request. Please try again later.', event.threadID, event.messageID);
        }
        global.client.handleReply.push({
          type: 'reply',
          name: this.config.name,
          messageID: info.messageID,
          author: event.senderID,
          head: event.body
        });
      }, event.messageID);

    } catch (error) {
      console.error('Error in handleReply:', error);
      api.sendMessage('An error occurred while processing your request. Please try again later.', event.threadID, event.messageID);
    }
  },

  start: async function ({ nayan, events, args, Users }) {
    try {
      const msg = args.join(" ");
      const imgURL = `https://graph.facebook.com/${events.senderID}/picture?width=720&height=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
      const apiData = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN-07/Nayan/main/api.json');
      const apiUrl = apiData.data.sim;

      if (!msg) {
        const name = await Users.getNameUser(events.senderID);
        const imgPath = path.join(__dirname, `cache/${events.senderID}.jpg`);
        const img = (await axios.get(imgURL, { responseType: 'arraybuffer' })).data;
        fs.writeFileSync(imgPath, Buffer.from(img));

        return nayan.reply({
          body: `👤 𝐍𝐀𝐌𝐄: ${name}\n\n✨ 𝐑𝐄𝐒𝐏𝐎𝐍𝐒𝐄 𝐁𝐘: 𝐊𝐈𝐍𝐆 𝐒𝐇𝐎𝐔𝐑𝐎𝐕 🔗 fb.me/www.xsxx.com365`,
          attachment: fs.createReadStream(imgPath)
        }, events.threadID, () => fs.unlinkSync(imgPath), events.messageID);
      }

      // msg থাকলে কিছু ডিফল্ট রেসপন্স দেখাতে পারেন (যেমন গ্রীটিং)
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

      // আপনি চাইলে msg থেকে কোন কিছু পার্স করে কাস্টম রেসপন্স দিতে পারেন
      // নিচে উদাহরণ হিসেবে রেনডম গ্রীটিং পাঠাচ্ছি
      const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
      return nayan.reply(randomGreeting, events.threadID, events.messageID);

    } catch (error) {
      console.log(error);
      nayan.reply('An error has occurred, please try again later.', events.threadID, events.messageID);
    }
  }
}

function loadTextStyles() {
  const Path = path.join(__dirname, 'system', 'textStyles.json');
  try {
    if (!fs.existsSync(Path)) {
      fs.writeFileSync(Path, JSON.stringify({}, null, 2));
    }
    const data = fs.readFileSync(Path, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading text styles:', error);
    return {};
  }
}

function saveTextStyle(threadID, style) {
  const styles = loadTextStyles();
  styles[threadID] = { style };
  const Path = path.join(__dirname, 'system', 'textStyles.json');
  try {
    fs.writeFileSync(Path, JSON.stringify(styles, null, 2));
  } catch (error) {
    console.error('Error saving text styles:', error);
  }
}