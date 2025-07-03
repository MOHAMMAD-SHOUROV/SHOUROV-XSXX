const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "shourov",
  version: "1.0.0",
  permission: 0,
  credits: "farhan",
  description: "Random sad video",
  prefix: true,
  category: "Media",
  usages: "video",
  cooldowns: 5,
  dependencies: {
    "axios": "",
    "fs-extra": ""
  }
};

module.exports.run = async ({ api, event }) => {
  const videoLinks = [
    "https://drive.google.com/uc?id=13sAsW5wQ3qhNfAMuJBLJD6NQnw8mexou",
    "https://drive.google.com/uc?id=136oqsV5ff-DhKScw4TRmv0iefQRvdEDc",
    "https://drive.google.com/uc?id=13Hbrq6Qrc5Pd2_PVB9XzMiHsx0lhLCPF",
    "https://drive.google.com/uc?id=13-KSN4yUN8TdVZm4OtVUs0qbVYefPB4F",
    "https://drive.google.com/uc?id=13WMlu9HeUjMPeB9iVLjbIGyCtPDn1_XW",
    "https://drive.google.com/uc?id=13rGGm97uus5SSj3QLzBxQMje8j0CZIes",
    "https://drive.google.com/uc?id=13Q85KfF5gQnclgDwoC7iUiEcwDKstNrb",
    "https://drive.google.com/uc?id=142Y95z79WtfVnjA5WH9BXu1n7IAVAANS",
    "https://drive.google.com/uc?id=13yjHB5Ty44vyp8SGqBnK90KF4242MA1d",
    "https://drive.google.com/uc?id=13YLFXAzq4lW6wacISzqAoSw2sHe-aXL_",
    "https://drive.google.com/uc?id=138wEfuuPZm-S9pONKboQowMMY_tK4RTX",
    "https://drive.google.com/uc?id=13-YbLYqQBA2d9bf46GGqp80vsL5WnOdz",
    "https://drive.google.com/uc?id=138iWDaltcR6Q9C2ZlNiFomicSSBbUzXu",
    "https://drive.google.com/uc?id=13abtid-Du_ZJtRcpT6qUhW5mF4NyI61Y",
    "https://drive.google.com/uc?id=13tbsM4z2NZAAowAg4DBJHfPhjFufPtpB",
    "https://drive.google.com/uc?id=13cel_8uVelO2mcolfGO4j476gFCpuoHn",
    "https://drive.google.com/uc?id=130Tv10j7JPZNaFP5RzuJ4fs1STzxLcpa",
    "https://drive.google.com/uc?id=139c3KZsKzpFzhBpVUJI14unIyOTvdbXq",
    "https://drive.google.com/uc?id=13bqtT4Ee7jKsQ9Lt7NG7qenKeKCz51Ji",
    "https://drive.google.com/uc?id=14MaSmAOGu88k3pb7VeWHvX9-3PoHoEOn",
    "https://drive.google.com/uc?id=14_6TY5WIGQ0hunYrJbNgavVEFRDsAgbj",
    "https://drive.google.com/uc?id=14MaSmAOGu88k3pb7VeWHvX9-3PoHoEOn",
  ];

  const quotes = [
    "--যারা ফুলকে ভালোবাসে তারা নিজেরাই এক একটা ফুল 💕🌸-𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯-"
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  const randomLink = videoLinks[Math.floor(Math.random() * videoLinks.length)];
  const filePath = path.join(__dirname, "cache", "ss_video.mp4");

  try {
    // Ensure cache folder exists
    await fs.ensureDir(path.join(__dirname, "cache"));

    // Download video with axios
    const res = await axios.get(randomLink, {
      responseType: "stream",
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const writer = fs.createWriteStream(filePath);
    res.data.pipe(writer);

    writer.on("finish", () => {
      api.sendMessage(
        {
          body: `「 ${randomQuote} 」`,
          attachment: fs.createReadStream(filePath)
        },
        event.threadID,
        () => fs.unlinkSync(filePath)
      );
    });

    writer.on("error", err => {
      console.error("⛔ ভিডিও লিখতে সমস্যা:", err);
      api.sendMessage("❌ ভিডিও সংরক্ষণে সমস্যা হয়েছে!", event.threadID);
    });
  } catch (err) {
    console.error("⛔ ভিডিও ডাউনলোড সমস্যা:", err.message);
    api.sendMessage("❌ ভিডিও লোড করতে সমস্যা হয়েছে!", event.threadID);
  }
};