const axios = require('axios');

module.exports = {
  config: {
    name: "Shourov,a",
    version: "1.0.1",
    prefix: false,
    permission: 0,
    credits: "ss",
    description: "Fun",
    category: "no prefix",
    usages: "😒",
    cooldowns: 5,
  },

  handleEvent: async function ({ api, event, client, __GLOBAL }) {
    const { threadID, messageID, body } = event;

    if (!body) return;

    // Define emoji list for triggering the bot
    const emojis = [
      "😗", "😒", "😎", "🤦‍♀️", "😈", "🤕", "💖", "😩", "🙈", "🫡",
      "🫣", "🌺", "😟", "🧐", "🫶", "💘", "💕", "😖", "👺", "🤑", "👏",
      "🤝", "🤷‍♂️", "🫥", "🥴", "😵", "🤗", "🤷‍♀️", "😦", "😓", "😻", 
      "💔", "🧡", "🤦‍♂️", "🙆‍♂️"
    ];

    // Check if the message starts with any emoji from the list
    const content = body.toLowerCase();

    if (emojis.some(e => content.startsWith(e))) {
      // Select a random video from the NAYAN array
      const NAYAN = [
        'https://i.imgur.com/AzF8qu2.mp4', 'https://i.imgur.com/1bxxZCK.mp4', 
        'https://i.imgur.com/zF5Foig.mp4', 'https://i.imgur.com/jbUCtTa.mp4',
        'https://i.imgur.com/J0sVuRc.mp4', 'https://i.imgur.com/CHMhxku.mp4',
        'https://i.imgur.com/lEAyLIE.mp4', 'https://i.imgur.com/exfA2k9.mp4',
        // Add more video URLs here...
      ];

      const rndm = NAYAN[Math.floor(Math.random() * NAYAN.length)];

      // Fetch the video stream
      const media = (await axios.get(rndm, { responseType: 'stream' })).data;

      // Send the video to the thread
      return api.sendMessage({ attachment: media }, threadID, messageID);
    }
  }
};