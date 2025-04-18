const { SlashCommandBuilder } = require('discord.js');
const fs = require("fs");
const path = require("path");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tools')
        .setDescription('Discord上で使えるツールたちです。')
        .addSubcommand(subcommand =>
            subcommand
                .setName('random')
                .setDescription('ランダムに選択します。')
                .addStringOption(option => option.setName('選択する内容').setDescription(',で区切る').setRequired(true))
        ),
    
    async execute(interaction) {
        const subcommandName = interaction.options.getSubcommand();
        const subcommandPath = path.join(__dirname, "tools", `${subcommandName}.js`);

        const subcommand = require(subcommandPath);
        subcommand.execute(interaction);
    }
};