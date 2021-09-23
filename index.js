require('dotenv').config();
const token = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const rest = new REST({ version: '9' }).setToken(token);
const { Client, Intents } = require('discord.js');

// 32767 all intents
const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.DIRECT_MESSAGES
	]
});

const commands = [{
	name: 'ping',
	description: 'Replies with Pong!'
}]; 


(async () => {
	try {
	console.log('Started refreshing application (/) commands.');

	await rest.put(
		Routes.applicationCommands(CLIENT_ID),
	{ body: commands },
	);

	console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
	console.error(error);
	}
})();

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	if (interaction.commandName === 'ping') {
	await interaction.reply('Pong!');
	}
});

client.login(token);