const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "emojiVideo",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Shourov",
  description: "Send a random video when someone sends an emoji",
  commandCategory: "media",
  usages: "auto trigger with emoji",
  cooldowns: 5,
  dependencies: {
    "axios": ""
  }
};

const videoIds = [
  "1FYLpzM2b9KbrOuZoi5k1wKnXjGcBRlXX",
  "1FX8S7agOjoIWnDH01l8cS2-TPIwpfOqI",
  "1Fw5cPHvT-wnrSuO1ap6KEJl_2NGuGpE8",
  "1FTqJH6IORfcX2xHWqaPnPKzCa6TuuiPV",
  "1FmH5aTnARtqZTryA97OiUlCfFYObcEYP",
  "1FQBiObk515JFq5FWyUEOxhvETdUOIksa",
  "1FeojyFT1EPAl7xZcROHJ_uu7IviNG4Lc",
  "1FlnhvrlgRVpQeqHUfFJKtFCmFCcEuEso",
  "1FL4yaE1we0qY-lX-bgud-dvql306Dwf2"
];

const allowedEmojis = [
  "😀","😃","😄","😁","😆","😅","🤣","😂","🙂","🙃","😉","😊","😇","🥰","😍","🤩","😘","😗","☺️","😚","😙",
  "😋","😛","😜","🤪","😝","🤑","🤗","🤭","🫢","🫣","🤫","🤔","🫡","🤐","🤨","😐","😑","😶","🫥","😶‍🌫️","😏",
  "😒","🙄","😬","😮‍💨","🤥","😌","😔","😪","🤤","😴","😷","🤒","🤕","🤢","🤮","🤧","🥶","🥴","😵","😵‍💫",
  "🤯","🤠","🥳","🥸","😎","🤓","🧐","😕","🫤","😟","🙁","☹️","😮","😯","😲","😳","🥺","🥹","😦","😧",
  "😨","😰","😱","😖","😣","😞","😓","😩","😫","🥱","😤","😡","😠","💀","☠️","💩","🤡","👹","👺","👻","👽",
  "👾","🤖","😺","😸","😹","😻","😼","😽","🙀","😿","🙈","🙉","🙊","💋","💌","💘","💝","💖","💗","💓","💕",
  "❣️","💔","❤️‍🔥","❤️‍🩹","❤️","🧡","💛","💚","💯","💢","💥","💫","💦","💨","✊"
];

module.exports.handleEvent = async function({ api, event }) {
  const { threadID, messageID, body } = event;
  if (!body || typeof body !== "string") return;
  const emoji = body.trim();
  if (!allowedEmojis.includes(emoji)) return;

  const id = videoIds[Math.floor(Math.random() * videoIds.length)];
  const url = `https://drive.google.com/uc?export=download&id=${id}`;
  const filePath = path.join(__dirname, "emoji-temp.mp4");

  try {
    const res = await axios.get(url, { responseType: "stream" });
    const writer = fs.createWriteStream(filePath);
    res.data.pipe(writer);
    writer.on("finish", () => {
      api.sendMessage({
        body: "🎬 Here's a fun video for your emoji!",
        attachment: fs.createReadStream(filePath)
      }, threadID, () => fs.unlinkSync(filePath), messageID);
    });
    writer.on("error", (e) => {
      console.log("💥 Write error:", e);
      api.sendMessage("❌ ভিডিও পাঠাতে সমস্যা হয়েছে!", threadID, messageID);
    });
  } catch (err) {
    console.error("❌ ডাউনলোডে সমস্যা:", err);
    api.sendMessage("⚠️ ভিডিও ডাউনলোড করতে সমস্যা হয়েছে!", threadID, messageID);
  }
};

module.exports.run = () => {};
