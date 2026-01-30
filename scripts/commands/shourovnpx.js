const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "shourovnpx",
    version: "1.1.1",
    prefix: false,
    permission: 0,
    credits: "shourov",
    description: "Multi emoji auto audio reply",
    category: "auto"
  },

  handleEvent: async function ({ api, event }) {
    try {
      const { threadID, messageID, body } = event;
      if (!body) return;

      // ✅ lowercase fix
      const text = body.toLowerCase();

      const rules = [
        {
          triggers: ["😖", "😣", "😫", "🙉"],
          audio: "banortor.mp3",
          msg: "কিঁরেঁ বাঁনঁরঁ তোঁরঁ আঁবাঁরঁ কিঁ হঁলোঁ"
        },
        {
          triggers: ["🤭", "🙈", "🙊", "🤫"],
          audio: "sorom.mp3",
          msg: "আঁমিঁ বলুঁম্ না — আমার শরম লাগে 😳"
        },
        {
          triggers: ["😡", "🤬", "😠", "😤", "😾"],
          audio: "ragkoro.mp3",
          msg: "রাঁগঁ কঁরোঁ কেঁনোঁ গোঁ 😡🥺"
        },
        {
          triggers: ["love", "i love you", "i love u", "valobashi", "baby", "babu"],
          audio: "amiotmkonk.mp3",
          msg: "হুঁমঁ আঁমিঁওঁ তোঁমাঁকেঁ ভাঁলোঁবাঁসিঁ কিঁন্তুঁ লঁজ্জাঁয়ঁ বঁলঁতেঁ পাঁরিঁ নাঁ"
        },
        {
          triggers: ["😹", "😂", "😸", "😁"],
          audio: "pagolnaki.mp3",
          msg: "পাঁগঁলঁ নাঁকিঁ এঁভাঁবেঁ কেঁউঁ হাঁসেঁ"
        },
        {
          triggers: ["😒", "🙄", "😳", "👀", "👁"],
          audio: "Mayabi.mp3",
          msg: "এঁভাঁবেঁ তাঁকাঁসঁ নাঁ প্রেঁমেঁ পঁরেঁ যাঁবোঁ 😚🥀𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯"
        },
        {
          triggers: ["😘", "😗", "😚", "😽"],
          audio: "pregnant.mp3",
          msg: "জাঁনঁ আঁমাঁকেঁ প্রেঁগঁন্যাঁন্টঁ বাঁনিঁয়েঁ দিঁলাঁ"
        },
        {
          triggers: ["😍", "🥰", "🤩", "❤️"],
          audio: "এত ভালোবাসা কই পাও আ (1).m4a",
          msg: "এঁতঁ ভাঁলোঁবাঁসাঁ পাঁওঁ আঁমাঁরঁ বঁসঁ সৌঁরঁভঁ কেঁ এঁকঁটুঁ দেঁওঁ 😘"
        },
        {
          triggers: ["🖕", "👇", "🤟", "👍"],
          audio: "angul79.mp3",
          msg: "আঁঙ্গুঁলঁ দেঁখাঁওঁ আঁঙ্গুঁলঁ তোঁমাঁরঁ হেঁডাঁ দিঁয়াঁ দিঁবোঁ"
        },
        {
          triggers: ["🕺", "💃", "🏃‍♀️", "🏃‍♂️"],
          audio: "sabdan.mp3",
          msg: "ওঁইঁ বেঁটাঁ সাঁবঁধাঁনেঁ উঁল্টেঁ পঁরেঁ জাঁবেঁ তোঁ"
        },
        {
          triggers: ["🥵", "💋", "👅", "💌"],
          audio: "betha.mp3",
          msg: "উঁফঁ জাঁনঁ ছাঁড়োঁ নাঁ ব্যাঁথাঁ লাঁগঁছেঁ তেঁ"
        },
        {
          triggers: ["😎", "😈", "👿", "🤙"],
          audio: "attitude.mp3",
          msg: "তুঁমিঁ attitude দেঁখাঁচ্ছঁ তাঁতেঁ আঁমাঁরঁ বাঁলঁ ছেঁড়াঁ গেঁলোঁ 😎"
        },
        {
          triggers: ["💔", "🥺", "😢"],
          audio: "brkup.mp3",
          msg: "জাঁনেঁমাঁনঁ তোঁমাঁরঁ কিঁ breakup হঁয়ঁছেঁ 💔"
        }
      ];

      for (const rule of rules) {
        if (rule.triggers.some(t => text.includes(t))) {
          const audioPath = path.join(__dirname, "Nayan", rule.audio);

          if (!fs.existsSync(audioPath)) {
            console.log("[shourovnpx] Audio missing:", audioPath);
            return;
          }

          return api.sendMessage(
            {
              body: rule.msg,
              attachment: fs.createReadStream(audioPath)
            },
            threadID,
            messageID
          );
        }
      }

    } catch (e) {
      console.error("[shourovnpx] error:", e);
    }
  },

  run: async function () {}
};