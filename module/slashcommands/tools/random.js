const { EmbedBuilder, Colors, PermissionFlagsBits } = require('discord.js');
const random = require('../../lib/random');

module.exports = {
    name: "random",
    async execute(interaction) {
        try {
            const rand = interaction.options.getString('選択する内容');

            const list = rand.split(',');

            const res = random(list);
    
            const resembed = new EmbedBuilder()
            .setTitle('選択しました。')
            .setColor(Colors.Green)
            .setTimestamp()
            .setDescription(`${res}`)
            return await interaction.reply({embeds: [resembed]})
        } catch (e) {
            const errorembed = new EmbedBuilder()
            .setTitle('選択できませんでした。')
            .setColor(Colors.Red)
            .setTimestamp()
            .setDescription("エラーコード:\n```" + `${e}` + "```")
            return await interaction.reply({embeds: [errorembed]})
        }

    },
};