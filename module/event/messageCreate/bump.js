const { EmbedBuilder, Colors } = require('discord.js');
module.exports = async (message) => {
    const bump_ok_embed = new EmbedBuilder()
        .setTitle('Bumpを検知しました。')
        .setColor(Colors.Green)
        .setTimestamp()
        .setDescription("2時間後に通知します。")
    const bump_alert_embed = new EmbedBuilder()
        .setTitle('DisboradBumpの時間です！')
        .setColor(Colors.Green)
        .setTimestamp()
        .setDescription("</bump:947088344167366698>\nでBumpをお願いします！")
    if (message.author.id === "302050872383242240") {
        if (message.embeds[0]?.description.match(/表示順をアップしたよ/)) {
            await message.channel.send({embeds: [bump_ok_embed]});
            setTimeout(async()=>{
                await message.channel.send({embeds: [bump_alert_embed]});
            },7200000);
        }
    }
};