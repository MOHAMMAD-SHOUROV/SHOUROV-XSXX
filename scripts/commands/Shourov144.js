const fs = require("fs");
module.exports.config = {
  name: "Shourov144",
  version: "2.0.0",
  permission: 0,
  credits: "nayan",
  description: "",
  prefix: false,
  category: "user",
  usages: "",
  cooldowns: 5,
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("asalamualaikum")==0 || (event.body.indexOf("Asalamualaikum")==0 || (event.body.indexOf("আসালামু আলাইকুম")==0 || (event.body.indexOf("asalamu alaikum")==0)))) {
		var msg = {
				body: "walaikumasalam 🥰(<) আপনি ভালো আসেন"
    }
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

}