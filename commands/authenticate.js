const { SlashCommandBuilder } = require('@discordjs/builders');
const ocr = require('../util/vision.js');
const embed = require('../util/embeds.js');
const role = require('../util/role.js');
const help = require('../util/button.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('authenticate')
		.setDescription('Authenticate yourself with the @Acadia Student role by providing your student ID.'),
	async execute(interaction) {

		const emb = embed.intro(interaction);
		const helpLink = help.helpLink();

		return interaction.reply({fetchReply: true, components: [helpLink], embeds: [emb] })
		.then(async () => {
			const filter = m => m.content.includes('discord');
			const collector = interaction.channel.createMessageCollector(filter, { time: 120000, dispose: true});
			console.log(`${interaction.commandName} - Listening for reply.`);
			
			collector.on('collect', async collected => {
				if(collected.author.id == interaction.user.id && collected.attachments.size > 0)
				{
					collector.stop();
					collected.delete();
					
					const embSearch = embed.search(collected);
					await interaction.editReply({embeds: [embSearch]});

					let valid = await ocr.validate(collected);
					if(valid){
						const embReply = embed.valid(collected);
						role.assign(collected);
						await interaction.editReply({embeds: [embReply]});
					} else {
						const embReply = embed.invalid(collected);
						await interaction.editReply({components: [helpLink], embeds: [embReply]});
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
	name: "authenticate",
	aliases: ["auth"]
}