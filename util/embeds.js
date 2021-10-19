const { MessageEmbed, Interaction } = require('discord.js');

module.exports = {
    intro: (interaction) => {
        const embed = new MessageEmbed()
        .setTitle(`Student ID Authenticator`)
        .setDescription(`Please provide a photo of your student ID.`);

        return embed;
    },

    valid: (interaction) => {
        const embed = new MessageEmbed()
        .setTitle(`Student ID Authenticator`)
        .setDescription(`${interaction.user} ✅ You now have the Students role.`)

        return embed;
    },

    invalid: (interaction) => {
        const embed = new MessageEmbed()
        .setTitle(`Student ID Authenticator`)
        .setDescription(`${interaction.user} ❌ I couldn't quite make out your ID. Try taking a better photo.`)

        return embed;
    },

    error: (interaction) => {
        const embed = new MessageEmbed()
        .setTitle(`Student ID Authenticator`)
        .setDescription(`${interaction.user} ❓ Something went wrong.`)

        return embed;
    }

}