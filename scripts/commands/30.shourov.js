/** I am doing this coding with a lot of difficulty, please don't post it yourself¯\_(ツ)_/¯ **/
module.exports.config = {
  name: "shairi",
  version: "1.0.0",
  permission: 0,
  credits: "farhan",
  description: "Random shairi video",
  prefix: true,
  category: "Media",
  usages: "video",
  cooldowns: 5,
  dependencies: {
    "request": "",
    "fs-extra": "",
    "axios": ""
  }
};

module.exports.run = async ({ api, event }) => {
  const axios = global.nodemodule["axios"];
  const request = global.nodemodule["request"];
  const fs = global.nodemodule["fs-extra"];
  const path = __dirname + "/cache/15.mp4";

  const hi = ["--SHAIRI-VIDEO-𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯--"];
  const know = hi[Math.floor(Math.random() * hi.length)];
  const links = [
    "https://drive.google.com/uc?id=1GtiVmOs2VMH1FuryKDb_p864NGrLP_iK",
    "https://drive.google.com/uc?id=1HWBJDDQdJPqpEc7VwJux1STI4aRAta1L",
    "https://drive.google.com/uc?id=1HeE-vnNZdfrA-CLR6tInVftZhdelNUGB",
    "https://drive.google.com/uc?id=1GqP65X_yWywBc5D0mfjTh9mUfQzmh8fb",
    "https://drive.google.com/uc?id=1GRSc0p6O1O03be1EKx1DYrIg1BLqRCxs",
    "https://drive.google.com/uc?id=1GYJRHvr7MQuNv9edlg153ZzAJnvFQU_y",
    "https://drive.google.com/uc?id=114bQWGar2c_qAQ8xLcqwuxjr3YJxD7GR",
    "https://drive.google.com/uc?id=11B_AoQejKb11TRBugmySc3k25U5qkY5z",
    "https://drive.google.com/uc?id=10x0iIUbpV12DRMnC-anCf29PNcwuGZIU",
    "https://drive.google.com/uc?id=11DrJUgGla-bP6yg0G1hnQbA5Kj0EFlI5",
    "https://drive.google.com/uc?id=1sX1cBCQv4qppFdeORJpt1Tjf9qW7vfL5",
    "https://drive.google.com/uc?id=1sGyqYbRQD8dCOJugEV7eyPqJUTRO8LYH",
    "https://drive.google.com/uc?id=1sEye37kl21741pRAjoLxKJh4uctn3IGT",
    "https://drive.google.com/uc?id=1sRb7zhf68GfkdUEmOBr3qDoXxn9ThT6T",
    "https://drive.google.com/uc?id=1sSeQumcIINAS1RQzngs8IqmXikORSmRU",
    "https://drive.google.com/uc?id=1sMQwfiNWRqSKkh2FeMBc4kslOKhARgOe",
    "https://drive.google.com/uc?id=1sbI30bNjdgUOljU1BZRz5zSEqgjitkVZ",
    "https://drive.google.com/uc?id=1sQwXPnF3RXk_PVSIu1WJi4pSqGkkuqup",
    "https://drive.google.com/uc?id=1sAjzw4me9PdY12I74zyxQhqEjSX_uaYl",
    "https://drive.google.com/uc?id=1sHehVkqa5weubDxUhgmcpxXK0XYJC7li",
    "https://drive.google.com/uc?id=1sU-zi4PuvwiEiT8akTR6qRArM8Lpp-cM",
    "https://drive.google.com/uc?id=1sZkJajZxbAq5k0vp-Og0N-jt7XuJRec8",
    "https://drive.google.com/uc?id=1sIb8Djq4pdAwLi0YCqbmzHMpAip9DScA",
    "https://drive.google.com/uc?id=1s9OpuKFfkZHhDjka-On1-PtlsOupDeWp"
  ];

  const url = encodeURI(links[Math.floor(Math.random() * links.length)]);

  try {
    const res = await axios.get(url, { responseType: "stream" });
    const writer = fs.createWriteStream(path);
    res.data.pipe(writer);

    writer.on("finish", () => {
      api.sendMessage({
        body: `「 ${know} 」`,
        attachment: fs.createReadStream(path)
      }, event.threadID, () => fs.unlinkSync(path));
    });

    writer.on("error", (err) => {
      console.error("File write error:", err.message);
      api.sendMessage("❌ ভিডিও সেভ করতে সমস্যা হয়েছে!", event.threadID);
    });
  } catch (err) {
    console.error("Download error:", err.message);
    api.sendMessage("❌ ভিডিও লোড করতে সমস্যা হয়েছে! Google Drive লিংক dead বা private হতে পারে।", event.threadID);
  }
};