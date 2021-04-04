require("dotenv").config();
const data = require("./corona.js");
const Discord = require("discord.js");
const fetchNumbers = require("./corona.js");
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
var channel = undefined;
bot.login(TOKEN);

bot.on("ready", async () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on("message", (msg) => {
  if (msg.content.startsWith("!stats")) {
    channel = bot.channels.get("827299110813958165");
    let arrays = fetchNumbers();

    arrays.then((result) => {
      let numbers = result[0];
      let text = result[1];
      channel.send(text[0]); 
      channel.send(text[1]);
      channel.send("Aantal gezette prikken: " + numbers[0]);
    });
  }
});
