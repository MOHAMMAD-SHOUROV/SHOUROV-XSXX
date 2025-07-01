module.exports.config = {
	name: "leave",
	eventType: ["log:unsubscribe"],
	version: "1.0.0",
	credits: "Nayan",
	description: "notify leave.",
};

module.exports.run = async function({ api, event, Users, Threads }) {
	if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
	const { createReadStream, existsSync, mkdirSync } = global.nodemodule["fs-extra"];
	const { join } =  global.nodemodule["path"];
	const { threadID } = event;
	const data = global.data.threadData.get(parseInt(threadID)) || (await Threads.getData(threadID)).data;
	const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
	const type = (event.author == event.logMessageData.leftParticipantFbId) ? "লিভ নেউয়ার জন্য ধন্যবাদ 🤢" : "Kicked by Administrator";
	const path = join(__dirname, "nayan", "leaveGif");
	const gifPath = join(path, `l.gif`);
	var msg, formPush

	if (existsSync(path)) mkdirSync(path, { recursive: true });

	(typeof data.customLeave == "undefined") ? msg = "╭═════⊹⊱✫⊰⊹═════╮ \n ⚠️ গুরুতর ঘোষণা ⚠️\n╰═════⊹⊱✫⊰⊹═════╯\n\n{session}||{name} ভাই/বোন...\nএই মাত্র গ্রুপ থেকে নিখোঁজ হয়েছেন!\nগ্রুপবাসীদের পক্ষ থেকে গভীর উদ্বেগ ও\nচাপা কান্নার মাধ্যমে জানানো যাচ্ছে...\n\n— উনি আর নেই... মানে গ্রুপে নেই!\nকিন্তু হৃদয়ে থেকে যাবেন, এক্টিভ মেম্বার হিসেবে | \n\n⏰ তারিখ ও সময়: {time}\n⚙️ স্ট্যাটাস: {type} (নিজে গেলো নাকি তাড়ানো হইলো বুঝলাম না)\n\✍️ মন্তব্য করে জানাও: তোমার কী ফিলিংস হইছে এই বিচ্ছেদে?" : msg = data.customLeave;
	msg = msg.replace(/\{name}/g, name).replace(/\{type}/g, type);

	if (existsSync(gifPath)) formPush = { body: msg, attachment: createReadStream(gifPath) }
	else formPush = { body: msg }
	
	return api.sendMessage(formPush, threadID);
}
