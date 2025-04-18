const { ActivityType } = require('discord.js');

module.exports = async (client) => {
    setInterval(async()=>{
        client.user.setActivity({ 
            name: `/help | ping:${client.ws.ping}ms`,
            type: ActivityType.Custom
        });
    })
};