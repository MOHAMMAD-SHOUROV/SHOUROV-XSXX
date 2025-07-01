module.exports.config = {
  name: "add",
  version: "0.0.2",
  permission: 0,
  prefix: true,
  credits: "Nayan",
  description: "",
  category: "user",
  usages: "",
  cooldowns: 5,
};

module.exports.run = async function({ api, event, args }) {
  if (args.length !== 1) {
    return api.sendMessage(`Invalid number of arguments. Usage: Reply to 1 video then type ${global.config.PREFIX}add your name`, event.threadID, event.messageID);
  }

  const axios = require("axios");

  try {
    const apis = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN-07/Nayan/main/api.json');
    const apiUrl = apis.data.api;

    if (!event.messageReply || !event.messageReply.attachments || event.messageReply.attachments.length === 0) {
      return api.sendMessage('Please reply to a video file.', event.threadID, event.messageID);
    }

    const videoAttachments = event.messageReply.attachments.filter(att => att.type === 'video');
    
    if (videoAttachments.length === 0) {
      return api.sendMessage('The reply must contain a video file.', event.threadID, event.messageID);
    }

    
    const uploadedVideos = await Promise.all(videoAttachments.map(async (video) => {
      const encodedUrl = encodeURIComponent(video.url.replace(/\s/g, ''));
      const imgurResult = await axios.get(`${apiUrl}/imgur?url=${encodedUrl}`);
      return imgurResult.data.link;
    }));

    
    const name = args.join(' ');

    
    const res = await axios.get(`${apiUrl}/mixadd?name=${encodeURIComponent(name)}&url=${encodeURIComponent(uploadedVideos.join('\n'))}`);

    const msg = res.data.msg;
    const nam = res.data.data.name;
    const url = res.data.data.url;
    const messageBody = `📩MESSAGE: ${msg}\n📛NAME: ${nam}\n🖇URL: ${url}`;

    
    return api.sendMessage({
      body: messageBody,
    }, event.threadID, event.messageID);

  } catch (error) {
    console.error(error);
    return api.sendMessage('[⚜️]➜ An error occurred while processing your request.', event.threadID, event.messageID);
  }
};
