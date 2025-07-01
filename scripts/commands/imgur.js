module.exports.config = {
  name: "imgur",
  version: "1.0.0",
  permission: 0,
  credits: "Nayan",
  description: "",
  prefix: true,
  category: "user",
  usages: "Link",
  cooldowns: 5,
  dependencies: {
    "axios": ""
  }
};

module.exports.run = async ({ api, event, args }) => {
  const axios = global.nodemodule['axios'];

  let linkanh = event.messageReply?.attachments[0]?.url || args.join(" ");
  if (!linkanh) {
    return api.sendMessage('[⚜️]➜ Please provide an image or video link.', event.threadID, event.messageID);
  }

  try {
    linkanh = linkanh.replace(/\s/g, '');

    
    if (!/^https?:\/\//.test(linkanh)) {
      return api.sendMessage('[⚜️]➜ Invalid URL: URL must start with http:// or https://', event.threadID, event.messageID);
    }

    
    const encodedUrl = encodeURIComponent(linkanh);

    const attachments = event.messageReply?.attachments || [{
      url: linkanh
    }];

    const apis = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN-07/Nayan/main/api.json');
    const n = apis.data.api;
    const allPromises = attachments.map(item => {
      const encodedItemUrl = encodeURIComponent(item.url);
      return axios.get(`${n}/imgur?url=${encodedItemUrl}`);
    });

    const results = await Promise.all(allPromises);

    
    const imgurLinks = results.map(result => result.data.success ? result.data.link : 'Upload failed');

    
    return api.sendMessage(`Uploaded Imgur Links:\n${imgurLinks.join('\n')}`, event.threadID, event.messageID);
  } catch (e) {
    console.error(e);
    return api.sendMessage('[⚜️]➜ An error occurred while uploading the image or video.', event.threadID, event.messageID);
  }
};
