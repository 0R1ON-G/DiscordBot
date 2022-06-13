const { channel } = require('diagnostics_channel');
const Discord = require('discord.js');

const Client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

const prefix = '-';

var num = 0;

const fs = require('fs');

Client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);

    Client.commands.set(command.name, command);
}

Client.once('ready', () => {
    console.log('Steve Harvey 2.0 is ALIVE!');
});

Client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    
    if(command === 'playfeud') {
        message.channel.send("Hello, contestant! Weclome to Discord Feud!");
        message.channel.send("We surveyed 100 discord users! The more popular an answer was, the more points it is worth!");
        message.channel.send("Your goal is to guess the most popular answer to each question and score the most points!");
        message.channel.send("Type '-ready' when you want to begin!");
        num = 1;
    } else if(command === 'ready' && num == 1) {
        Client.commands.get('FeudGame').execute(message, args);
        num = 0;
    }
});

Client.login('OTc1ODc4OTYxNTQyMzMyNDI2.GAluGH.oMLGUvE0F7r2t3GlRL-WifSrGbVqkcW4h7yUTM');