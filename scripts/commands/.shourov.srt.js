module.exports.config = {
  name: "short", 
  version: "1.0.0", 
  permission: 0,
  credits: "SK-SIDDIK-KHAN",
  description: "Short video",
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
   var hi = ["Short Video 𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯"];
  var know = hi[Math.floor(Math.random() * hi.length)];
  var link = [
  "https://drive.google.com/uc?id=17Siy3m5zeLkokRoCyWwczk6zu526JUPF",
    "https://drive.google.com/uc?id=174zQRjLL0SaJVFD5liEuKm5aR6HtSe_o",
    "https://drive.google.com/uc?id=17hYY34PphiJHdW1A_E9l_-OhDPT0eI_a",
    "https://drive.google.com/uc?id=17g-DLmU_8h0ikcPzILeckxLlc3wVTZu9",
    "https://drive.google.com/uc?id=18Bin28m7IAWa1ivis7_4AXCA_kAeoykB",
    "https://drive.google.com/uc?id=18eW1EQOhSM7fKnyY4o7M6nYW0mipCLkE",
    "https://drive.google.com/uc?id=1786skurI-bLyrKOzDil0Rhyi6jCm1W37",
    "https://drive.google.com/uc?id=19AXDVa7Ztz7VFcihLL1SUk18mvi9VZod",
    "https://drive.google.com/uc?id=17pKu6KBXey7ZUMLsEWBDOPsIy7Hi1HEQ",
    "https://drive.google.com/uc?id=192xwqhizP2L3iHCXm8K_4Jkmpd_HVG7Q",
    "https://drive.google.com/uc?id=19BzZcoVnDa-tbyFtUKjCjKQWp1ulkLJy",
    "https://drive.google.com/uc?id=19-lbnaP6WFGeIsqJqViZFuY5ESVXCF_Q",
    "https://drive.google.com/uc?id=177dfSpPPnxF3OhKfACaIBBh7WjZvaRuz",
    "https://drive.google.com/uc?id=17lpJIGRlXeXAID5VV4CC4jP_hpByMfs2",
    "https://drive.google.com/uc?id=18zNKiD8rMf_fGQpMSCA6Vs76yecmWoIN",
    "https://drive.google.com/uc?id=197tNZmre0q50GNW01DSneC3gLw6tGwF6",
    "https://drive.google.com/uc?id=17ni-ipbRL29juQxiOye2RWbITlrxaAE1",
    "https://drive.google.com/uc?id=18hqgF39ty2beCZ1CsFbsmGnUoIP-BQZU",
   "https://drive.google.com/uc?id=191ByqbJVq3EKg5Ex89iHlL0UEyuP9cEe",
    "https://drive.google.com/uc?id=18ZXuuFJkpeqW8-P5RUQgQK8g4Ers4-R7",
    "https://drive.google.com/uc?id=18E7nT22wCgLF3XWb3mpKJzkCixpJ-UB4",
    "https://drive.google.com/uc?id=18eq15C9pQ7_zgZDVCsfzfR2k-eEEAR3e",
    "https://drive.google.com/uc?id=193y_bb2bceQ1pJjbyIvVY8xJxSJ0rckc",
    "https://drive.google.com/uc?id=18xLT6ftX6U2Y7I6IDh-oG7IZyBs9oh3A",
   "https://drive.google.com/uc?i18PuQ1yxwN2fysn3SpQsV15NwdWKaW028",
    "https://drive.google.com/uc?id=18y5UvhotB5XoeKt5x8gE7DXsAI9BiQj3",
    "https://drive.google.com/uc?id=18wW3LDewAdJi2gDtEXQZDCKD-f6lZjJo",
    "https://drive.google.com/uc?id=193SEBLlHPDXrzdM10HZ3vptPfblD3NMw"
 
];
     var callback = () => api.sendMessage({body:`「 ${know} 」`,attachment: fs.createReadStream(__dirname + "/cache/Fahim.mp4")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/Fahim.mp4"));    
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/Fahim.mp4")).on("close",() => callback());
   };