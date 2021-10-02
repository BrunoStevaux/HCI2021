require('dotenv').config();
const token = process.env.token;

const fs = require('fs');
const tesseract = require("node-tesseract-ocr")

const { Client, Collection, Intents } = require('discord.js');

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
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on('messageCreate', async message => {
	console.log(`#${message.channel.name} - ${message.author.tag}: ${message.content}`);
	if (message.attachments.size > 0)
	{
		const config =
		{
			lang: "eng",
			oem: 1,
			psm: 3,
		}



		tesseract
		.recognize(message.attachments.first().proxyURL, config)
		.then((text) => {
			console.log("Result:", text.split())
		})
		.catch((error) => {
			// console.log(error.message);
		})
	}
});

client.login(token);