import { Events, EmbedBuilder } from 'discord.js';
import { logAction, logError } from '../utils/logger.js';

export function handleEvents(client) {
  client.on(Events.GuildMemberAdd, async member => {
    try {
      const channel = member.guild.channels.cache.find(
        ch => ch.name === 'welcome' && ch.isTextBased()
      );
      if (channel) {
        const embed = new EmbedBuilder()
          .setTitle('Welcome!')
          .setDescription(`Welcome to the server, <@${member.id}>! 🎉`)
          .setColor('Green');
        await channel.send({ embeds: [embed] });
      }
      logAction('Member Joined', { user: member.user.tag, guild: member.guild.name });
    } catch (error) {
      logError(error);
    }
  });
}
