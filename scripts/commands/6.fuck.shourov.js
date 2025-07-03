module.exports = {
  config: {
    name: "fuck you",
    version: "1.0",
    author: "AceGun",
    countDown: 5,
    role: 0,
    shortDescription: "Responds to rude message",
    longDescription: "Replies with a GIF when someone says 'fuck'",
    category: "no prefix"
  },

  onStart: async function () {},

  onChat: async function({ event, message }) {
    const text = event.body?.toLowerCase();

    if (text === "fuck") {
      return message.reply({
        body: "Fuck you too 🖕",
        attachment: await global.utils.getStreamFromURL("https://i.imgur.com/9bNeakd.gif")
      });
    }
  }
};