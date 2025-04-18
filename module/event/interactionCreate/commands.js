const { InteractionType, EmbedBuilder, Colors } = require('discord.js');

module.exports = async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        const error_embed = new EmbedBuilder()
        .setTitle('エラーが発生しました。')
        .setColor(Colors.Red)
        .setTimestamp()
        const replyOptions = { embeds: [error_embed], ephemeral: true };

        if (interaction.replied || interaction.deferred) {
            await interaction.followUp(replyOptions);
        } else {
            await interaction.reply(replyOptions);
        }
    }
};