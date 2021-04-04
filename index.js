require("dotenv").config();
const Discord = require("discord.js");
const fetchNumbers = require("./corona.js");
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
var channel = undefined;
bot.login(TOKEN);

const embedMessage = new Discord.MessageEmbed()
  .setColor("#ffdf2e")
  .setTitle("Corona stats van vandaag")

bot.on("ready", async () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on("message", (msg) => {
  if (msg.content.startsWith("!stats")) {
    channel = bot.channels.cache.get("827299110813958165");
    let arrays = fetchNumbers();

    arrays.then((result) => {
      let numbers = result[0];
      let text = result[1];
      embedMessage.addFields(
        {name: 'Positieve tests', value: text[0]},
        {name: 'Ziekenhuisopnames', value: text[1]},
        {name: 'Aantal gezette prikken', value: numbers[0]}
      )
      channel.send(embedMessage)
    });
  }
});

