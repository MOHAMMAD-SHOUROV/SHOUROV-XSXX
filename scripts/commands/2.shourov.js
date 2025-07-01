module.exports.config = {
  name: "info",
  version: "1.0.1", 
  permssion: 0,
  credits: "Ialamick Cyber Chat",
  prefix:true,
  description: "Admin and Bot info.",
  category: "...",
  cooldowns: 1,
  dependencies: 
  {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};
module.exports.run = async function({ api,event,args,client,Users,Threads,__GLOBAL,Currencies }) {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
const time = process.uptime(),
    hours = Math.floor(time / (60 * 60)),
    minutes = Math.floor((time % (60 * 60)) / 60),
    seconds = Math.floor(time % 60);
const moment = require("moment-timezone");
var juswa = moment.tz("Asia/Manila").format("『D/MM/YYYY』 【hh:mm:ss】");
var link = ["https://imgur.com/a/G5yERRQ", 

            "https://imgur.com/a/G5yERRQ", 

            "https://imgur.com/a/G5yERRQ",

            "https://imgur.com/a/G5yERRQ"];

var callback = () => api.sendMessage({body:`ADMIN AND BOT INFORMATION 
________________________________________

❇️BOT NAME : 𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯🤖🤖

❇️BOT ADMIN : 𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯

❇️ADDRESS: Dhaka, Bangladesh 

_____________CONTACT_____________

❇️FACEBOOK ID: https://www.facebook.com/broken.shourov.ss?

❇️FACEBOOK PAGE: 👅❌

❇️BOT PREFIX : ${global.config.PREFIX}

❇️BOT OWNER : {SHOUROV  KING} 

OTHER NFORMATION____________________

TYPE /admin 

➟ UPTIME

𝐁𝐨𝐭 𝐍𝐚𝐦𝐞 : ${global.config.BOTNAME}

𝐁𝐨𝐭 𝐏𝐫𝐞𝐟𝐢𝐱 : ${global.config.PREFIX}

•—»✨ 𝐔𝐩𝐭𝐢𝐦𝐞

𝐓𝐨𝐝𝐚𝐲 𝐈𝐬 𝐓𝐢𝐦𝐞 : ${juswa} 

𝐁𝐨𝐭 𝐈𝐬 𝐑𝐮𝐧𝐧𝐢𝐧𝐠 ${hours}:${minutes}:${seconds}.

𝐓𝐡𝐚𝐧𝐤𝐬 𝐅𝐨𝐫 𝐔𝐬𝐢𝐧𝐠  ༄🌺\n｢🥰｣${global.config.BOTNAME}｢🥰｣`,attachment: fs.createReadStream(__dirname + "/cache/cyber.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/cyber.jpg")); 
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/cyber.jpg")).on("close",() => callback());
   };