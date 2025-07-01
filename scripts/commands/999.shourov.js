𝐫const fs = require("fs");
module.exports = {
  config:{
	name: "🥰",
        version: "1.0.1",
        prefix: false,
	permssion: 0,
	credits: "nayan", 
	description: "Fun",
	category: "no prefix",
	usages: "😒",
        cooldowns: 5, 
},

handleEvent: function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
  const content = event.body ? event.body : '';
  const body = content.toLowerCase();
	if (body.indexOf("😘")==0 || body.indexOf("🥰")==0 || body.indexOf("😍")==0 || body.indexOf("🤩")==0) {
		var msg = {
				body: "এ্ঁত্ঁ ভা্ঁলো্ঁবা্ঁসা্ঁ ক্ঁই্ঁ পা্ঁও্ঁ আ্ঁমা্ঁর্ঁ ব্ঁস্ঁ সৌ্ঁর্ঁভ্ঁ কে্ঁ এ্ঁক্ঁটুঁ দে্ঁও্ঁ 🌺",
				attachment: fs.createReadStream(__dirname + `এতো ভালোবাসা কই পাও .m4a`)
			}
			api.sendMessage( msg, threadID, messageID);
    api.setMessageReaction("😁", event.messageID, (err) => {}, true)
		}
	},
	start: function({ nayan }) {

  }
}