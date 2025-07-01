/** I am doing this coding with a lot of difficulty, please don't post it yourself¯\_(ツ)_/¯ **/
module.exports.config = {
  name: "shairi", 
  version: "1.0.0", 
  permission: 0,
  credits: "farhan",
  description: "Random sad video",
  prefix: true,
  category: "Media", 
  usages: "video", 
  cooldowns: 5,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};

module.exports.run = async({api,event,args,client,Users,Threads,__GLOBAL,Currencies}) => {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
   var hi = ["--SHAIRI-VIDEO-𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯-"];
  var know = hi[Math.floor(Math.random() * hi.length)];
  var link = [

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
    "https://drive.google.com/uc?id=1s9OpuKFfkZHhDjka-On1-PtlsOupDeWp",
];
     var callback = () => api.sendMessage({body:`「 ${know} 」`,attachment: fs.createReadStream(__dirname + "/cache/15.mp4")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/15.mp4"));    
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/15.mp4")).on("close",() => callback());
   };