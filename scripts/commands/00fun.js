const fs = require("fs");
module.exports.config = {
  name: "00fun",
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
	if (event.body.indexOf("Ayan")==0 || (event.body.indexOf("Habib")==0 || (event.body.indexOf("habib")==0 || (event.body.indexOf("ayan")==0)))) {
		var msg = {
				body: "কোনো ছেলেরা আমাকে ডাকবে না🚫❌শুধু কচি কচি মেয়েরা ডাকবা😍🙂))"
    }
			api.sendMessage(msg, threadID, messageID);
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

}