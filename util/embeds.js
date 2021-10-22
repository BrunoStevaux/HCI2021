const { MessageEmbed, Interaction } = require('discord.js');

// Rich embeds used for displaying information

module.exports = {
    intro: (interaction) => {
        const embed = new MessageEmbed()
        .setTitle(`Student ID Authenticator`)
        .setDescription(`Please provide a photo of your student ID.`);

        return embed;
    },

    duplicate: (interaction) => {
        const embed = new MessageEmbed()
        .setTitle(`Student ID Authenticator`)
        .setDescription(`${interaction.user} ✅ You already have the student role.`)
        .setFooter(`Finished in ${Date.now() - interaction.createdTimestamp} ms`)
        return embed;
    },

    search: (interaction) => {
        const embed = new MessageEmbed()
        .setTitle(`Student ID Authenticator`)
        .setDescription(`${interaction.author} <a:Loading:900869383356817408> Searching...`)

        return embed;
    },

    valid: (interaction) => {
        const embed = new MessageEmbed()
        .setTitle(`Student ID Authenticator`)
        .setDescription(`${interaction.author} ✅ You now have the Students role.`)
        .setFooter(`Finished in ${Date.now() - interaction.createdTimestamp} ms`)
        return embed;
    },

    invalid: (interaction) => {
        const embed = new MessageEmbed()
        .setTitle(`Student ID Authenticator`)
        .setDescription(`${interaction.author} ❌ I couldn't quite make out your ID. Try taking a better photo.`)
        .setFooter(`Finished in ${Date.now() - interaction.createdTimestamp} ms`)

        return embed;
    },

    error: (interaction) => {
        const embed = new MessageEmbed()
        .setTitle(`Student ID Authenticator`)
        .setDescription(`${interaction.author} ❓ Something went wrong.`)
        .setFooter(`Finished in ${Date.now() - interaction.createdTimestamp} ms`)

        return embed;
    }

}