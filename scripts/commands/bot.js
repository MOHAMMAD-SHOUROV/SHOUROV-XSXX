start: async function ({ nayan, events, args, Users, api }) {
  try {
    console.log("Start function called");
    const msg = args.join(" ");
    console.log("Message:", msg);

    const cachePath = path.join(__dirname, 'cache');
    if (!fs.existsSync(cachePath)) fs.mkdirSync(cachePath);

    const imgURL = `https://graph.facebook.com/${events.senderID}/picture?width=720&height=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
    console.log("Image URL:", imgURL);

    const name = await Users.getNameUser(events.senderID);
    console.log("User name:", name);

    if (!msg) {
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

      const imgPath = path.join(cachePath, `${events.senderID}.jpg`);
      const img = (await axios.get(imgURL, { responseType: 'arraybuffer' })).data;
      console.log("Image downloaded");
      fs.writeFileSync(imgPath, Buffer.from(img));
      console.log("Image saved to", imgPath);

      await api.sendMessage({
        body: caption,
        attachment: fs.createReadStream(imgPath)
      }, events.threadID, events.messageID);

      console.log("Message sent");
      fs.unlinkSync(imgPath);
      console.log("Image file deleted");
    } else {
      await nayan.reply("আপনার মেসেজ পেয়েছি, কিন্তু আমি শুধুমাত্র ক্যাপশন+ডিপি পাঠাতে পারি!", events.threadID, events.messageID);
    }

  } catch (error) {
    console.error("Error in start function:", error);
    nayan.reply('দুঃখিত, কিছু একটা ভুল হয়েছে, পরে আবার চেষ্টা করুন।', events.threadID, events.messageID);
  }
}