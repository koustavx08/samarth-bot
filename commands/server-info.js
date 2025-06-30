import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { info } from '../utils/logger.js';

export const data = new SlashCommandBuilder()
    .setName('server-info')
    .setDescription('Shows detailed server information');

export async function execute(interaction) {
    const guild = interaction.guild;
    const owner = await guild.fetchOwner();
    
    const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle(`${guild.name} Information`)
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .addFields(
            { name: '👑 Owner', value: `${owner.user.tag}`, inline: true },
            { name: '👥 Members', value: `${guild.memberCount}`, inline: true },
            { name: '🎭 Roles', value: `${guild.roles.cache.size}`, inline: true },
            { name: '📺 Channels', value: `${guild.channels.cache.size}`, inline: true },
            { name: '🎨 Emojis', value: `${guild.emojis.cache.size}`, inline: true },
            { name: '🚀 Boost Level', value: `${guild.premiumTier}`, inline: true },
            { name: '📅 Created At', value: `${guild.createdAt.toLocaleDateString()}`, inline: false }
        )
        .setFooter({ text: `Server ID: ${guild.id}` })
        .setTimestamp();

    await interaction.reply({ embeds: [embed] });
    
    info('Server info command executed', {
        guildId: guild.id,
        guildName: guild.name
    });
};
