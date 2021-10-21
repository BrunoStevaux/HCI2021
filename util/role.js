const { MessageEmbed, Interaction } = require('discord.js');

module.exports = {
    assign: (interaction) => {
        if(interaction.guild.roles.cache.find(role => role.name === 'Acadia Student'))
            console.log("Found");
        else {
            interaction.guild.roles.create({
                name: 'Acadia Student',
                color: 'BLUE',
                reason: 'Role did not exist. Created it.'
            }).then(console.log("Created role: 'Acadia Student'."));
        }
        try{
            let role = interaction.guild.roles.cache.find(role => role.name === 'Acadia Student')
            interaction.member.roles.add(role);
        } catch(e){
            console.log(e);
        }
        return 1;
    },

    remove: (interaction) => {

        return 0;
    },

    error: (interaction) => {

        return embed;
    }

}