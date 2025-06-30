import { Events, EmbedBuilder } from 'discord.js';
import { info, error } from '../utils/logger.js';

export const name = Events.GuildMemberAdd;
export const once = false;

export async function execute(member) {
  try {
    const welcomeChannel = member.guild.channels.cache.find(
      ch => ch.name === 'welcome' && ch.isTextBased()
    );

    if (!welcomeChannel) {
      info('No welcome channel found', {
        event: 'guildMemberAdd',
        guildId: member.guild.id
      });
      return;
    }

    const embed = new EmbedBuilder()
      .setColor('#00ff00')
      .setTitle('🎉 Welcome!')
      .setDescription(`Welcome to ${member.guild.name}, ${member}!`)
      .setThumbnail(member.user.displayAvatarURL())
      .addFields(
        { name: 'Member Count', value: `You are member #${member.guild.memberCount}!` },
        { name: 'Getting Started', value: 'Please read our rules and introduce yourself!' }
      )
      .setTimestamp();

    await welcomeChannel.send({ embeds: [embed] });
    
    info('New member welcomed', {
      event: 'guildMemberAdd',
      userId: member.id,
      guildId: member.guild.id
    });
  } catch (err) {
    error('Error in guildMemberAdd event', {
      event: 'guildMemberAdd',
      error: err,
      userId: member.id,
      guildId: member.guild.id
    });
  }
}
