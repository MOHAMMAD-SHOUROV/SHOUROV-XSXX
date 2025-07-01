module.exports.config = {
  name: "sex1",
  version: "1.0.0",
  permission: 2,
  credits: "SK-SIDDIK-KHAN",
  description: "",
  prefix: true, 
  category: "bdsex", 
  usages: "user",
  cooldowns: 2,
  dependencies: {
	}
};

module.exports.run = async({api,event,args,Users,Threads,Currencies}) => {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
  var link = [
  
 "https://i.postimg.cc/m2FP4Kgq/BBW-Bhabhi-showing-her-melons-while-dancing.jpg",

"https://i.postimg.cc/tCPFksWY/south-Indian-wife-shows-her-boobs-on-video-call.jpg",

"https://i.postimg.cc/VLyCJzp1/Beautiful-girl-showing-her-sexy-soft-boobies-on-selfie-cam.jpg",

"https://i.postimg.cc/2jWqRP6t/sexy-Indian-Insta-girl-showing-her-big-melons.jpg",

"https://i.postimg.cc/k5Z5Lcd9/Cute-girl-showing-boobs-for-lover-with-Bangla-talk.jpg",

 "https://i.postimg.cc/50L3LKb0/Rajasthani-housewife-ginving-handjob-while-masturbating-pussy.jpg",

"https://i.postimg.cc/vBF7Y7fd/Desi-slum-girl-showing-boobies-on-video-call.jpg",

"https://i.postimg.cc/y82cjhfS/beautiful-cute-girl-boobs-show-selfie-MMS.jpg",

"https://i.postimg.cc/hP5d4bR3/Beautiful-sexy-Bangladeshi-girl-showing-boobs.jpg",

"https://i.postimg.cc/52z6xh36/cute-college-girl-in-glasses-showing-boobs.jpg",

"https://i.postimg.cc/4NDxF8gZ/sexy-boobs-show-by-cute-Bangladeshi-girl.webp",

"https://i.postimg.cc/XNcM0Qd4/Bangladeshi-girl-sucking-black-dick-of-BF.jpg",

"https://i.postimg.cc/QtGz2TMF/big-boob-young-girl-getting-nude-on-cam.jpg",

"https://i.postimg.cc/JnYkybBn/super-sexy-girl-showing-her-hot-big-boobs.jpg",

"https://i.postimg.cc/wj5R5Ksn/hot-sexy-girl-showing-her-big-melons.jpg",

"https://i.postimg.cc/pLkzbbXz/super-busty-Bengali-girl-boobs-pressing-outdoors.jpg",

"https://i.postimg.cc/4ybn6VYV/big-boob-nude-Bhabhi-showing-her-melons.jpg",

"https://i.postimg.cc/BQSvW887/sexy-cute-girl-shows-her-big-round-boobs.jpg",

"https://i.postimg.cc/nrLN2tz2/Beautiful-Pakistani-girl-taking-cum-in-mouth.jpg",

"https://i.postimg.cc/wBcPdBRF/cute-Bhabhi-sucking-big-red-dick-of-hubby.jpg",

"https://i.postimg.cc/JnFQwwxP/Beautiful-Pakistani-girl-teasing-with-sexy-boobs-show.jpg",

"https://i.postimg.cc/qBtPN4PB/horny-Desi-girl-masturbating-with-long-brinjal.jpg",

"https://i.postimg.cc/CxMJf4RC/sexy-Indian-girl-fingering-pussy.webp",

"https://i.postimg.cc/nhwK9fbZ/She-is-just-God-gifted.jpg",

"https://i.postimg.cc/dt5rgc0d/BD-girl-showing-her-big-melons-on-VC.jpg",

"https://i.postimg.cc/zBNyVxB8/innocent-Bangladeshi-girl-showing-boobs-pussy.jpg",

"https://i.postimg.cc/43kdSWpV/beautiful-Bhabhi-showing-her-big-titties-on-video-call.jpg",

"https://i.postimg.cc/ZqxTD4bz/playing-with-sexy-boobs-of-beautiful-Bhabhi.jpg",

"https://i.postimg.cc/qRq9XTgL/horny-girl-fingering-pussy-on-video-call.jpg",

"https://i.postimg.cc/PqJjKZRY/innocent-looking-girl-showing-her-erect-nipples.jpg",

"https://i.postimg.cc/7PMWGhBk/Mehendi-girl-fingering-pussy-on-video-call.jpg",

"https://i.postimg.cc/fR6KgQHC/big-boobs-of-sexy-Pakistani-girl-exposed.jpg",

    ];
   var callback = () => api.sendMessage({body:`✨ BD SEX PIC ✨`,attachment: fs.createReadStream(__dirname + "/cache/1.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.jpg"));  
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/1.jpg")).on("close",() => callback());
   };