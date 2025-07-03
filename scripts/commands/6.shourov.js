module.exports.config = {
  name: "Sorry bol", 
  version: "1.0.0", 
  permission: 2,
  credits: "SK-SIDDIK-KHAN",
  description: "Send 'SORRY' message multiple times with delay",
  prefix: true,
  category: "test", 
  usages: "admin", 
  cooldowns: 5,
  dependencies: {}
};

module.exports.run = async function ({ api, event }) {
  const { threadID } = event;

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  for (let i = 0; i < 20; i++) { // safer limit than 150
    api.sendMessage("🅂🄾🅁🅁🅈", threadID);
    await delay(500); // 500ms delay between messages
  }
};