const fs = require("fs");

module.exports.config = {
    name: "owners",
    version: "1.1.1",
    prefix: true,
    permission: 0,
    credits: "Md SHOUROV Islam", 
    description: "",
    category: "no prefix",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
    var { threadID, messageID } = event;
    let react = event.body.toLowerCase();
    
    if (react.includes("owner") || react.includes("boss shourov") || react.includes("king ")) {
        var msg = {
            body: "╭╼|━━━━━━━━━━━━━━|╾╮\n          KING SHOUROV \n╰╼|━━━━━━━━━━━━━━|╾╯"
        };

        api.sendMessage(msg, threadID, messageID);

        api.setMessageReaction("😘", event.messageID, (err) => {}, true);
    }
};

module.exports.run = function({ api, event, client, __GLOBAL }) {
    
};