const { exec } = require("child_process");

module.exports = {
  config: {
    name: "shell",
    aliases: ["sh", "terminal", "exec"],
    version: "1.0.0",
    permission: 2,
    credits: "Nayan",
    description: "Execute shell commands",
    prefix: true,
    category: "owner",
    usages: "shell <command>",
    cooldowns: 5,
  },

  start: async function({ nayan, events, args }) {
    const command = args.join(" ");
    const threadID = events.threadID;
    const messageID = events.messageID;

    if (!command) {
      return nayan.sendMessage("Please provide a shell command to execute.", threadID);
    }

    exec(command, (error, stdout, stderr) => {
      if (error) {
        return nayan.sendMessage(`Error:\n${error.message}`, threadID, messageID);
      }

      if (stderr) {
        return nayan.sendMessage(`Stderr:\n${stderr}`, threadID, messageID);
      }

      const output = stdout || "No output";
      const result = output.length > 2000 ? output.slice(0, 2000) + "\n...output truncated..." : output;
      nayan.sendMessage("Result:\n" + result, threadID, messageID);
    });
  }
};
