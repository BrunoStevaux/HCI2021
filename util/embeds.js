const { MessageEmbed, Interaction } = require('discord.js');

// Rich embeds used for displaying information

module.exports = {
    welcome: (member) => {
        const embed = new MessageEmbed()
        .setTitle(`Student ID Authenticator`)
        .setDescription(`${member.user} Type /Authenticate and follow the steps to get the student role.`)
		.addField('Consent', 'Please note that by using this bot, you are agreeing to our consent agreement.')
        .addField('\u200B', 'https://docs.google.com/forms/d/19eQO72clzy2laYwQ2HALm9LmQ4RQn7m3v5LQKfsi21s');
        console.log(`Welcomed user (${member.user})`)
        return embed;
    },

    intro: (interaction) => {
        const embed = new MessageEmbed()
        .setTitle(`Student ID Authenticator`)
        .setDescription(`Please provide a photo of your student ID. Simply send a photo after using this command.`)
        .addField('What do to', 'Take a photo of your ID (check the help link). Then send the photo in this channel (We will automatically delete your photo).')
        .addField('Consent', 'Please note that by using this bot, you are agreeing to our consent agreement.\n'
        + 'If you do not consent, simply do not upload your ID.');

        return embed;
    },

    duplicate: (interaction) => {
        const embed = new MessageEmbed()
        .setTitle(`Student ID Authenticator`)
        .setDescription(`${interaction.user} ✅ You already have the student role.`)
        .setFooter(`Finished in ${Date.now() - interaction.createdTimestamp} ms`)
        console.log(`User already has role (${interaction.user.username})`);
        return embed;
    },

    search: (interaction) => {
        const embed = new MessageEmbed()
        .setTitle(`Student ID Authenticator`)
        .setDescription(`${interaction.author} <a:Loading:900869383356817408> Searching...`)
        console.log(`Searching for user (${interaction.author.username})`);
        return embed;
    },

    valid: (interaction) => {
        const embed = new MessageEmbed()
        .setTitle(`Student ID Authenticator`)
        .setDescription(`${interaction.author} ✅ You now have the Students role.`)
        .setFooter(`Finished in ${Date.now() - interaction.createdTimestamp} ms`)
        console.log(`Valid (${interaction.author.username})`);
        return embed;
    },

    invalid: (interaction) => {
        const embed = new MessageEmbed()
        .setTitle(`Student ID Authenticator`)
        .setDescription(`${interaction.author} ❌ I couldn't quite make out your ID. Try taking a better photo. Use the \`/authenticate\` command to retry.`)
        .setFooter(`Finished in ${Date.now() - interaction.createdTimestamp} ms`)
        console.log(`Invalid (${interaction.author.username})`);
        return embed;
    },

    timeout: (interaction) => {
        const embed = new MessageEmbed()
        .setTitle(`Student ID Authenticator`)
        .setDescription(`${interaction.author} ❌ I didn't receive any images from you.`)
        .setFooter(`Finished in ${Date.now() - interaction.createdTimestamp} ms`)
        console.log(`Timeout (${interaction.author.username})`);
        return embed;
    },

    error: (interaction) => {
        const embed = new MessageEmbed()
        .setTitle(`Student ID Authenticator`)
        .setDescription(`${interaction.author} ❓ Something went wrong.`)
        .setFooter(`Finished in ${Date.now() - interaction.createdTimestamp} ms`)
        console.log(`Error (${interaction.author.username})`);
        return embed;
    }

}