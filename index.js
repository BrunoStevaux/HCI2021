require('dotenv').config();
const token = process.env.token;

const fs = require('fs');
const tesseract = require("node-tesseract-ocr")

const { Client, Collection, Intents, MessageEmbed} = require('discord.js');

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

// This runs for every message. We fix this after.
client.on('messageCreate', async message => {
	console.log(`#${message.channel.name} - ${message.author.tag}: ${message.content}`);

	
	if (message.attachments.size > 0)
	{
		await message.delete();
		let exampleEmbed = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle(`${message.author.username}'s Student Verification`)
		.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
		.setDescription('Fetching user data...')
		.setTimestamp();

		let msg = await message.channel.send({embeds: [exampleEmbed]});
		const config = { lang: "eng", oem: 3, psm: 3}

		let reply;
		await tesseract
		.recognize(message.attachments.first().proxyURL, config)
		.then((text) => {
			// Replace escape characters
			text = text.split('\r\n').join(' ');
			// Replace colons 
			text = text.split(':').join(' ');
			text = text.split('  ').join(' ');
			text = text.trim();
			reply = text;
		})
		.catch((error) => {
			console.log(error);
		});

		// Last name, first name, student number, DOB text, DOB number, Expiry text, month, year
		//                          ^^^^^                       ^^^^                         ^^^
		// if these are all numbers then we're just going to assume they took a photo of their
		// ID. 

		if(!isNaN(reply.split(' ')[2]) && !isNaN(reply.split(' ')[4]) && !isNaN(reply.split(' ')[7])){
			exampleEmbed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle(`${message.author.username}'s Student Verification`)
			.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
			.setDescription('✅ You\'ve been granted the student role.')
			.setTimestamp()
			.setFooter(`${(Date.now() - message.createdTimestamp)}ms`, 'https://i.imgur.com/AfFp7pu.png');
		} else { 
			exampleEmbed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle(`${message.author.username}'s Student Verification`)
			.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
			.setDescription('❌ Something went wrong.')
			.setTimestamp()
			.setFooter(`${(Date.now() - message.createdTimestamp)}ms`, 'https://i.imgur.com/AfFp7pu.png');
		}
		await msg.edit({embeds: [exampleEmbed]});

	} else return;
});

client.login(token);