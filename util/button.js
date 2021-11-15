const { MessageActionRow, MessageButton } = require('discord.js');

// Buttons that attach to interaction replies

module.exports = {

    button: (interaction) => {
        const row = new MessageActionRow();    
        return row;
    },

    helpLink: (row) => {
        row.addComponents(
            new MessageButton()
                .setLabel('How to take a photo')
                .setStyle('LINK')
                .setURL('https://github.com/BrunoStevaux/HCI2021/blob/main/help.md'),
        );
    
        return row;
    },

    consentLink: (row) => {
        row.addComponents(
            new MessageButton()
                .setLabel('Consent Agreement')
                .setStyle('LINK')
                .setURL('https://docs.google.com/forms/d/10KA8iJSBQ30hWnBbP7kaNpvKSb-qTgXI7vgsLCWNuBc'),
                );
                
                return row;
            },
            
            feedbackLink: (row) => {
                row.addComponents(
                    new MessageButton()
                    .setLabel('Feedback')
                    .setStyle('LINK')
                    .setURL('https://docs.google.com/forms/d/19eQO72clzy2laYwQ2HALm9LmQ4RQn7m3v5LQKfsi21s'),
        );
    
        return row;
    }

}