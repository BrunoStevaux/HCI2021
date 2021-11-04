const { SlashCommandBuilder } = require('@discordjs/builders');
const ocr = require('../util/vision.js');
// const ocr = require('../util/tesseract.js');
const embed = require('../util/embeds.js');
const role = require('../util/role.js');
const button = require('../util/button.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('authenticate')
		.setDescription('Authenticate yourself with the @Acadia Student role by providing your student ID.'),
	async execute(interaction) {

		const emb = embed.intro(interaction);
		const buttons = button.button();
		button.helpLink(buttons);
		button.consentLink(buttons);
		button.feedbackLink(buttons);

		// Check if user already has role.
		if (role.check(interaction)){
			const embDuplicate = embed.duplicate(interaction);
			return interaction.reply({fetchReply: true, embeds: [embDuplicate] })

		}

		return interaction.reply({fetchReply: true, components: [buttons], embeds: [emb] })
		.then(async () => {
			const filter = m => m.content.includes('discord');

			// Listen for a response from the user
			const collector = interaction.channel.createMessageCollector(filter, { time: 120000, dispose: true});
			console.log(`${interaction.commandName} - Listening for reply.`);
			
			// Collector will collect literally every meessage. Including those from other users.
			collector.on('collect', async collected => {

				// Make sure message is from the correct user AND that there is an image.
				if(collected.author.id == interaction.user.id && collected.attachments.size > 0)
				{
					// Stop colecting and delete the photo!
					collector.stop();
					try {collected.delete()}catch(e){console.log("Couldn't delete photo")}
					
					// Let user know we are searching
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
				console.log(`authenticate - ${collected.size} replies received.`);
			});
                
            })
        }
    },


module.exports.help = {
	name: "authenticate",
	aliases: ["auth"]
}