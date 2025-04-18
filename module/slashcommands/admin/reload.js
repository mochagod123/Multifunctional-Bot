const { EmbedBuilder, Colors } = require('discord.js');
const path = require("path");
const fs = require("fs");
const { console } = require('inspector');

module.exports = {
    name: "reload",
    async execute(interaction) {
        try {
            await interaction.deferReply();

            fs.readdirSync(path.join(__dirname, '..', '..', 'slashcommands')).forEach(file => {
                delete require.cache[require.resolve(path.join(__dirname, '..', '..', 'slashcommands', file))];
            });

            fs.readdirSync(path.join(__dirname, '..', '..', 'slashcommands', 'admin')).forEach(file => {
                delete require.cache[require.resolve(path.join(__dirname, '..', '..', 'slashcommands', 'admin', file))];
            });

            fs.readdirSync(path.join(__dirname, '..', '..', 'slashcommands', 'tools')).forEach(file => {
                delete require.cache[require.resolve(path.join(__dirname, '..', '..', 'slashcommands', 'tools', file))];
            });
    
            fs.readdirSync(path.join(__dirname, '..', '..', 'lib')).forEach(file => {
                delete require.cache[require.resolve(path.join(__dirname, '..', '..', 'lib', file))];
            });
    
            fs.readdirSync(path.join(__dirname, '..', '..', 'event', 'messageCreate')).forEach(file => {
                delete require.cache[require.resolve(path.join(__dirname, '..', '..', 'event', 'messageCreate', file))];
            });
    
            fs.readdirSync(path.join(__dirname, '..', '..', 'event', 'interactionCreate')).forEach(file => {
                delete require.cache[require.resolve(path.join(__dirname, '..', '..', 'event', 'interactionCreate', file))];
            });
    
            fs.readdirSync(path.join(__dirname, '..', '..', 'slashcommands')).map(file => require(path.join(__dirname, '..', '..', 'slashcommands', file)));

            fs.readdirSync(path.join(__dirname, '..', '..', 'slashcommands', 'admin')).map(file => require(path.join(__dirname, '..', '..', 'slashcommands', 'admin', file)));

            fs.readdirSync(path.join(__dirname, '..', '..', 'slashcommands', 'tools')).map(file => require(path.join(__dirname, '..', '..', 'slashcommands', 'tools', file)));
    
            fs.readdirSync(path.join(__dirname, '..', '..', 'lib')).map(file => require(path.join(__dirname, '..', '..', 'lib', file)));
    
            fs.readdirSync(path.join(__dirname, '..', '..', 'event', 'messageCreate')).map(file => require(path.join(__dirname, '..', '..', 'event', 'messageCreate', file)));
    
            fs.readdirSync(path.join(__dirname, '..', '..', 'event', 'interactionCreate')).map(file => require(path.join(__dirname, '..', '..', 'event', 'interactionCreate', file)));
            
            const resembed = new EmbedBuilder()
            .setTitle('再読み込みしました。')
            .setColor(Colors.Green)
            .setTimestamp()
            return await interaction.editReply({embeds: [resembed]})
        } catch (e) {
            const errorembed = new EmbedBuilder()
            .setTitle('再読み込みできませんでした。')
            .setColor(Colors.Red)
            .setTimestamp()
            .setDescription("エラーコード:\n```" + `${e}` + "```")
            return await interaction.editReply({embeds: [errorembed]})
        }

    },
};