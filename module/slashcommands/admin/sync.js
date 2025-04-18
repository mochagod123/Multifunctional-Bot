const { EmbedBuilder, Colors } = require('discord.js');
const path = require("path");
const fs = require("fs");

module.exports = {
    name: "sync",
    async execute(interaction) {
        try {
            await interaction.deferReply();

            const commandsPath = path.join(__dirname, '..', '..', 'slashcommands');
            const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {
                const filePath = path.join(commandsPath, file);
                const command = require(filePath);

                if ('data' in command && 'execute' in command) {
                    client.commands.set(command.data.name, command);
                } else {
                    return;
                }
            }

            const resembed = new EmbedBuilder()
            .setTitle('スラッシュコマンドを同期しました。')
            .setColor(Colors.Green)
            .setTimestamp()
            .setDescription(`${res}`)
            return await interaction.editReply({embeds: [resembed]})
        } catch (e) {
            const errorembed = new EmbedBuilder()
            .setTitle('スラッシュコマンドを同期できませんでした。')
            .setColor(Colors.Red)
            .setTimestamp()
            .setDescription("エラーコード:\n```" + `${e}` + "```")
            return await interaction.editReply({embeds: [errorembed]})
        }

    },
};