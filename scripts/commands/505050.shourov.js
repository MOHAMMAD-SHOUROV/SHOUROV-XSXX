const fs = require("fs");
module.exports = {
  config: {
    name: "ck",
    version: "1.0.1",
    prefix: false,
    permssion: 0,
    credits: "farhan",
    description: "Fun",
    category: "no prefix",
    usages: "😒",
    cooldowns: 5,
  },

  handleEvent: async function ({ api, event }) {
    const { threadID, messageID } = event;
    const content = event.body || "";
    const body = content.toLowerCase();
    const axios = require("axios");

    const NAYAN = [
      "https://drive.google.com/uc?id=14GzIPZnMTXQp4iz8DF2d5AJsn2vNWKwR",
      "https://drive.google.com/uc?id=11Bn1z1jvt_K-Vtu09ZPKSgUDOIWKoKRX",
      "https://drive.google.com/uc?id=13OUz214ERRQCBxhY3eBB2fVGM0YVCQMQ",
      "https://drive.google.com/uc?id=11CaSdfKqtnAoRuxCZYhXHl2GxhtBbvS1",
      "https://drive.google.com/uc?id=12pNMHGNTI0aDBkK9UmZPbus2UbuRdjff",
      "https://drive.google.com/uc?id=12BkvJA3y08ZfzKwUL0Ak7ux6x5-7ayoa",
      "https://drive.google.com/uc?id=12euL4lhVnT_ZbuyitZFZ0rct9BDhHkek",
      "https://drive.google.com/uc?id=1381W__Tc5iAK82ErOhXk19jr4zuZ-LNh",
      "https://drive.google.com/uc?id=14SQ30sCfCOUVtIezHROZe-g4m3UQ5Ti3",
      "https://drive.google.com/uc?id=13etYEqec3WZRwiETYbasZsv9YMKRgdft"
      // বাকি লিংক গুলো চাইলে এখানেও যুক্ত করতে পারো
    ];

    // শুধু যখন মেসেজটি 🐺 দিয়ে শুরু হলে চলবে
    if (body.indexOf("🐺") === 0) {
      const rndm = NAYAN[Math.floor(Math.random() * NAYAN.length)];
      try {
        const res = await axios.get(rndm, { responseType: 'stream' });
        const msg = {
          body: "•⎯͢⎯⃝🙂_আমরা যাদেরকে ভালোবাসি তারা আমাদের জীবন থেকে হারিয়ে যাবেই..! :- 🙂\n       _এটাই প্রকৃতির নিয়ম⎯͢⎯⃝🤍🫶🌺!-:𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯 ))",
          attachment: res.data
        };
        api.sendMessage(msg, threadID, () => {
          api.setMessageReaction("🖤", messageID, () => {}, true);
        });
      } catch (err) {
        console.log("Download Error:", err.message);
        api.sendMessage("❌ ভিডিও লোড করতে সমস্যা হয়েছে!", threadID);
      }
    }
  },

  start: function () {}
};