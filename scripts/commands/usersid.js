module.exports.config = {
  name: "uid2",
  version: "1.1.0",
  permission: 0,
  credits: "Nayan",
  prefix: 3,
  description: "Get UID only",
  category: "without prefix",
  cooldowns: 5
};

module.exports.run = async function ({ api, event }) {
  const content = event.body || "";

  
  const fbLinkMatch = content.match(/https?:\/\/(www\.)?facebook\.com\/[^\s]+/i);
  if (fbLinkMatch) {
    const link = fbLinkMatch[0];
    try {
      const uid = await new Promise((resolve, reject) => {
        api.getUID(link, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });
      return api.sendMessage(`${uid}`, event.threadID, event.messageID);
    } catch {
      return api.sendMessage(``, event.threadID, event.messageID);
    }
  }

  
  if (Object.keys(event.mentions).length > 0) {
    const uids = Object.keys(event.mentions).join('\n');
    return api.sendMessage(uids, event.threadID, event.messageID);
  }

  
  return api.sendMessage(`${event.senderID}`, event.threadID, event.messageID);
};
