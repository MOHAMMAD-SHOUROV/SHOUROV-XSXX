/** I am doing this coding with a lot of difficulty, please don't post it yourself¯\_(ツ)_/¯ **/
module.exports.config = {
  name: "ss", 
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
   var hi = ["--যারা ফুলকে ভালোবাসে তারা নিজেরাই এক একটা ফুল 💕🌸-𝐊𝐢𝐧𝐠_𝐒𝐡𝐨𝐮𝐫𝐨𝐯-"];
  var know = hi[Math.floor(Math.random() * hi.length)];
  var link = [

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
     var callback = () => api.sendMessage({body:`「 ${know} 」`,attachment: fs.createReadStream(__dirname + "/cache/15.mp4")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/15.mp4"));    
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/15.mp4")).on("close",() => callback());
   };