
// Assign role to users  

module.exports = {
    assign: (interaction) => {
        if(!interaction.guild.roles.cache.find(role => role.name === 'Acadia Student'))
        {
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

    check: (interaction) => {
        if(interaction.member.roles.cache.find(role => role.name === 'Acadia Student')) return 1;
    },

}