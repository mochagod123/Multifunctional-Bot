const { SlashCommandBuilder } = require('discord.js');
const fs = require("fs");
const path = require("path");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('admin')
        .setDescription('Bot管理者用コマンドです。')
        .addSubcommand(subcommand =>
            subcommand
                .setName('reload')
                .setDescription('再読み込みします。'),
        ).addSubcommand(subcommand =>
            subcommand
                .setName('sync')
                .setDescription('スラッシュコマンドを同期します。')
        ),
    
    async execute(interaction) {
        const subcommandName = interaction.options.getSubcommand();
        const subcommandPath = path.join(__dirname, "admin", `${subcommandName}.js`);

        const subcommand = require(subcommandPath);
        subcommand.execute(interaction);
    }
};