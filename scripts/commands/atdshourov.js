module.exports.config = {
  name: "attitude", 
  version: "1.0.0", 
  permission: 0,
  credits: "SK-SIDDIK-KHAN",
  description: "Attitude Short video",
  prefix: true,
  category: "media", 
  usages: "user", 
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
   var hi = ["--𝐀𝐭𝐭𝐢𝐭𝐮𝐝𝐞 𝐕𝐢𝐝𝐞𝐨 𝐁𝐲 😇\n\n[» 𒄬 𓆩𝐊𝐈𝐍𝐆 𝐒𝐇𝐎𝐔𝐑𝐎𝐕⁽๏̬̬̬̬̽̽̈⁾𓆪』"];
  var know = hi[Math.floor(Math.random() * hi.length)];
  var link = [
  "https://drive.google.com/uc?id=14tb-XgVWGcS63Jw0oNbm2hsqrQLw_gzL",
  "https://drive.google.com/uc?id=1520dma_yKw2ixGpb7wnktzrM20Kjo_3v",
  "https://drive.google.com/uc?id=1513P_XukMB6gPDf9lr20t8re3ScCL5Rw",
  "https://drive.google.com/uc?id=1-4yGIC7A0GKJHSUzaECF3d_bAWSp4Tl8",
  "https://drive.google.com/uc?id=1-xItCYLhq2oaR4tfiU8ap11CMDaJvMLq",
  "https://drive.google.com/uc?id=13qfO0aoXblNXXS-voJWj-8LqdYV4Gltu",
  "https://drive.google.com/uc?id=1-zgBe2_gCLh_Rl7DRBzKAG_CA914QbTQ",
  "https://drive.google.com/uc?id=10D9HinfwrtMjYo4fI7lWQYSStWrVllBQ",
  "https://drive.google.com/uc?id=107EjQ_uLg2Q5812NBux6QpAwx8ncS6JR",
  "https://drive.google.com/uc?id=14gr6fIUTYsF0nMOKtuOQqQmJ8Ggf71Tn",
  "https://drive.google.com/uc?id=14PgaietaupKI5jy89Y_VbENC_Zluy3D_",
  "https://drive.google.com/uc?id=13G9hyUkfx7oWWTbdD4AYQ6Vlk2f4EQ1Y",
  "https://drive.google.com/uc?id=13uE2XejtfWUJW6uzc83rXvcsPKoU3rek",
 
];
     var callback = () => api.sendMessage({body:`「 ${know} 」`,attachment: fs.createReadStream(__dirname + "/cache/Fahim.mp4")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/Fahim.mp4"));    
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/Fahim.mp4")).on("close",() => callback());
   };