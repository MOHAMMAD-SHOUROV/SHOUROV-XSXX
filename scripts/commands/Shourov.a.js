const axios = require('axios');

module.exports = {
  config: {
    name: "shourov,a",
    version: "1.0.1",
    prefix: false,
    permission: 0,
    credits: "ss",
    description: "Send random video on emoji",
    category: "no prefix",
    usages: "Send emoji to trigger",
    cooldowns: 5,
  },

  handleEvent: async function ({ api, event }) {
    const { threadID, messageID, body } = event;
    if (!body) return;

    const emojis = [
      "😗", "😒", "😎", "🤦‍♀️", "😈", "🤕", "💖", "😩", "🙈", "🫡",
      "🫣", "🌺", "😟", "🧐", "🫶", "💘", "💕", "😖", "👺", "🤑", "👏",
      "🤝", "🤷‍♂️", "🫥", "🥴", "😵", "🤗", "🤷‍♀️", "😦", "😓", "😻", 
      "💔", "🧡", "🤦‍♂️", "🙆‍♂️"
    ];

    const loweredBody = body.toLowerCase();

    // যদি কোনো ইমোজি দিয়ে শুরু হয়
    if (emojis.some(emoji => loweredBody.startsWith(emoji))) {
      const videos = [
        'https://i.imgur.com/AzF8qu2.mp4',
        'https://i.imgur.com/1bxxZCK.mp4',
        'https://i.imgur.com/zF5Foig.mp4',
        'https://i.imgur.com/jbUCtTa.mp4',
        'https://i.imgur.com/J0sVuRc.mp4',
        'https://i.imgur.com/CHMhxku.mp4',
        'https://i.imgur.com/lEAyLIE.mp4',
        'https://i.imgur.com/exfA2k9.mp4'
        // চাইলে এখানে আরও ভিডিও যোগ করতে পারো
      ];

      const randomVideo = videos[Math.floor(Math.random() * videos.length)];

      try {
        const response = await axios.get(randomVideo, { responseType: 'stream' });
        return api.sendMessage({ attachment: response.data }, threadID, messageID);
      } catch (error) {
        console.error("❌ ভিডিও পাঠাতে সমস্যা:", error.message);
        return api.sendMessage("⚠️ ভিডিও পাঠানো যাচ্ছে না, পরে আবার চেষ্টা করুন।", threadID, messageID);
      }
    }
  }
};