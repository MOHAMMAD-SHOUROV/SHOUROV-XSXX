const fs = require("fs");
module.exports.config = {
  name: "00love",
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
	if (event.body.indexOf("@Angl Anika")==0 || (event.body.indexOf("anika")==0 || (event.body.indexOf("Anika")==0 || (event.body.indexOf("আনিকা")==0)))) {
		var msg = {
				body: "কিরে ওরে ডাকিস কেন দেখস না আমার বস সৌরভ এর সাথে বিজি আসে গাধা 🤬🤬 :))"
    }
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

}