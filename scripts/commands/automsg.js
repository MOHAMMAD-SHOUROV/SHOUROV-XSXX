const moments = [
  { time: "12:00 AM", icon: "🌌", caption: "রাতের শুরু... আর মনের ভিতর পুরনো কষ্টের হাহাকার..." },
  { time: "12:30 AM", icon: "🌃", caption: "শব্দহীন রাত, মনের চাপা কান্না..." },
  { time: "01:00 AM", icon: "🌙", caption: "স্মৃতির ভারে ঘুম উড়ে যায়..." },
  { time: "01:30 AM", icon: "🕯️", caption: "একাকীত্ব রাত জেগে থাকে..." },
  { time: "02:00 AM", icon: "😔", caption: "তুমি থাকো না, কিন্তু কষ্টটা থাকে..." },
  { time: "02:30 AM", icon: "🥀", caption: "মন আজও তোমার স্মৃতিতে খুঁজে ফেরে..." },
  { time: "03:00 AM", icon: "😴", caption: "ঘুম আসে না... চোখে কেবল ছবি ভাসে..." },
  { time: "03:30 AM", icon: "🖤", caption: "নীরবতায় ডুবে থাকা রাত..." },
  { time: "04:00 AM", icon: "💭", caption: "ভোরের আগে সবচেয়ে গভীর হয় অন্ধকার..." },
  { time: "04:30 AM", icon: "🔕", caption: "একটি নিঃশব্দ সকালের আগে শেষ কান্না..." },
  { time: "05:00 AM", icon: "🌄", caption: "ভোরের আলোয় মনের ক্লান্তি কমে না..." },
  { time: "05:30 AM", icon: "🕊️", caption: "নতুন সকাল, পুরনো স্মৃতি..." },
  { time: "06:00 AM", icon: "☀️", caption: "সূর্য উঠেছে, মন কিন্তু অন্ধকারে..." },
  { time: "06:30 AM", icon: "🌞", caption: "সকালের আলোয়ও তুমি অনুপস্থিত..." },
  { time: "07:00 AM", icon: "🌅", caption: "নতুন শুরু, কিন্তু তোমার অভাব রয়ে যায়..." },
  { time: "07:30 AM", icon: "🍵", caption: "চায়ের কাপে ভাসে তোমার স্মৃতি..." },
  { time: "08:00 AM", icon: "📖", caption: "সকাল মানেই নতুন কষ্টের অধ্যায়..." },
  { time: "08:30 AM", icon: "📝", caption: "তোমার লেখা সব আজও হৃদয়ে..." },
  { time: "09:00 AM", icon: "🕘", caption: "প্রতিটি সকাল তোমাকে মনে করায়..." },
  { time: "09:30 AM", icon: "📚", caption: "কাজের মাঝে মন ফিরে যায় অতীতে..." },
  { time: "10:00 AM", icon: "💼", caption: "ব্যস্ততার মাঝেও মন একলা..." },
  { time: "10:30 AM", icon: "🕥", caption: "আলো আছে, কিন্তু উষ্ণতা নেই..." },
  { time: "11:00 AM", icon: "🧠", caption: "স্মৃতিগুলো সবসময়ই তাজা..." },
  { time: "11:30 AM", icon: "🧡", caption: "তুমি নেই, অনুভব আছে..." },
  { time: "12:00 PM", icon: "🌞", caption: "দুপুর হলেও হৃদয়ে কুয়াশা..." },
  { time: "12:30 PM", icon: "🍂", caption: "স্মৃতির খাতায় দুপুরের পাতা..." },
  { time: "01:00 PM", icon: "🌤️", caption: "একাকীত্ব দুপুরে বেশি জ্বলে..." },
  { time: "01:30 PM", icon: "💔", caption: "হৃদয়ের ব্যথা দুপুরে স্পষ্ট হয়..." },
  { time: "02:00 PM", icon: "🫀", caption: "একাকী অনুভব পিছু ছাড়ে না..." },
  { time: "02:30 PM", icon: "🤍", caption: "তোমার স্মৃতিতে হৃদয় ভিজে..." },
  { time: "03:00 PM", icon: "🔆", caption: "ভালোবাসা ছিল, রয়ে গেছে কষ্ট..." },
  { time: "03:30 PM", icon: "🕞", caption: "দুপুর গড়ালেও মন বাঁধা পড়ে..." },
  { time: "04:00 PM", icon: "🌇", caption: "বিকেলের আলোয় তুমি নেই..." },
  { time: "04:30 PM", icon: "🎧", caption: "মিউজিকে ভেসে আসে স্মৃতি..." },
  { time: "05:00 PM", icon: "🌆", caption: "সন্ধ্যার কষ্ট সবচেয়ে তীব্র..." },
  { time: "05:30 PM", icon: "🖤", caption: "দিন শেষ... আবার শুরু একাকীত্ব..." },
  { time: "06:00 PM", icon: "🕕", caption: "সন্ধ্যার ছায়ায় মন ভিজে..." },
  { time: "06:30 PM", icon: "🌃", caption: "নিরবতা আবার ফিরে আসে..." },
  { time: "07:00 PM", icon: "🧥", caption: "তোমার স্মৃতি রাতকে ঘিরে ফেলে..." },
  { time: "07:30 PM", icon: "🍁", caption: "হারানো অনুভব ফিরে আসে..." },
  { time: "08:00 PM", icon: "🌌", caption: "রাত যত বাড়ে, কষ্ট তত গভীর..." },
  { time: "08:30 PM", icon: "🕣", caption: "চোখে ভাসে তোমার ছবি..." },
  { time: "09:00 PM", icon: "🌙", caption: "নীরব রাত, ব্যথার গল্প..." },
  { time: "09:30 PM", icon: "🌠", caption: "চোখের পাতা ভিজে যায় নীরবে..." },
  { time: "10:00 PM", icon: "🪐", caption: "তোমার অভাবটা আজও পোড়ায়..." },
  { time: "10:30 PM", icon: "😶‍🌫️", caption: "রাতের নিরবতায় হারিয়ে যাই..." },
  { time: "11:00 PM", icon: "🌘", caption: "ঘুম আসে না, স্মৃতিতে জেগে থাকি..." },
  { time: "11:30 PM", icon: "🔒", caption: "একটি নিঃশব্দ রাতের শেষ..." }
];

module.exports.config = {
  name: "autotime",
  version: "4.0.0",
  permission: 0,
  credits: "KING_SHOUROV",
  description: "২৪ ঘণ্টার জন্য stylish caption সহ অটো টাইম বার্তা",
  prefix: false,
  category: "auto",
  usages: "",
  cooldowns: 3
};

module.exports.onLoad = ({ api }) => {
  setInterval(() => {
    const timeNow = new Date(Date.now() + 6 * 60 * 60 * 1000).toLocaleTimeString("en-US", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

    const match = moments.find(m => `${m.time}:00` === timeNow);
    if (match) {
      const message = `
━━━━━━━━━━━━━━━  
🕓 𝙏𝙄𝙈𝙀 : ${match.time}  
🖤 𝐊𝐈𝐍𝐆 𝐒𝐇𝐎𝐔𝐑𝐎𝐕  
━━━━━━━━━━━━━━━  
${match.icon} ${match.caption}

🔗 fb.me/www.xsxx.com365  
━━━━━━━━━━━━━━━`;

      for (const tid of global.data.allThreadID) {
        api.sendMessage(message, tid);
      }
    }
  }, 1000);
};

module.exports.run = () => {};