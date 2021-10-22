require('dotenv').config();
const token = process.env.token;

const fs = require('fs');

const { Client, Collection, Intents, MessageEmbed} = require('discord.js');
const { captureRejections } = require('events');

const client = new Client({ intents: [
	Intents.FLAGS.GUILDS,
	Intents.FLAGS.GUILD_MESSAGES,
	Intents.FLAGS.DIRECT_MESSAGES,
] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}



client.once('ready', () => {
	console.log(`Logged in as: ${client.user.tag} with ${commandFiles.length} commands.`);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		console.log(`${interaction.commandName} - Executing the interaction (${interaction.user.username})`);
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// This runs for every message. We fix this after.
client.on('messageCreate', async message => {
	if (message.author.bot) return;
	// console.log(`#${message.channel.name} - ${message.author.tag}: ${message.content || message.attachments.size + " images"}`);
});

client.login(token);