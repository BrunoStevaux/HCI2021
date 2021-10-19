// const row = new MessageActionRow()
// 	.addComponents(
// 		new MessageButton()
// 			.setLabel('How to take a photo')
// 			.setStyle('LINK')
// 			.setURL('https://github.com/BrunoStevaux/HCI2021/blob/main/help.md'),
// 	);

const { MessageEmbed, Interaction } = require('discord.js');

module.exports = {
    helpLink: (interaction) => {
    
        return 1;
    },

    remove: (interaction) => {

        return 0;
    },

    error: (interaction) => {

        return embed;
    }

}