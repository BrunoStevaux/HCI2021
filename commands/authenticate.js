const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const tesseract = require("node-tesseract-ocr");
const ocr = require('../util/tesseract.js');
const embed = require('../util/embeds.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('authenticate')
		.setDescription('Authenticate yourself with the @Student role by providing your student ID.'),
	async execute(interaction) {

		const emb = embed.intro(interaction);

		return interaction.reply({fetchReply: true, embeds: [emb] })
		.then(async () => {
			const filter = m => m.content.includes('discord');
			const collector = interaction.channel.createMessageCollector(filter, { time: 30000, dispose: true});
			console.log(`${interaction.commandName} - Listening for reply.`);
			
			collector.on('collect', async collected => {
				if(collected.author.id == interaction.user.id && collected.attachments.size > 0)
				{
					let valid = await ocr.validate(collected);
					if(valid){
						const embReply = embed.valid(interaction);
						// give role here
						await interaction.editReply({embeds: [embReply]});
					} else {
						const embReply = embed.invalid(interaction);
						await interaction.editReply({embeds: [embReply]});
					}
				}
			});
			
			collector.on('end', collected => {
				console.log(`Collected ${collected.size} items`);
			});
                
            })
        }
    },


module.exports.help = {
	name: "ping",
	aliases: ["p"]
}