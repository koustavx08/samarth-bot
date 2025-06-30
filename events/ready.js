import { Events } from 'discord.js';
import { info } from '../utils/logger.js';

export const name = Events.ClientReady;
export const once = true;

export function execute(client) {
  const guildCount = client.guilds.cache.size;
  const memberCount = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
  const commandCount = client.commands.size;

  info('Bot is ready!', {
    event: 'ready',
    guilds: guildCount,
    members: memberCount,
    commands: commandCount
  });

  // Set the bot's presence
  client.user.setPresence({
    activities: [{ name: `${guildCount} servers | /help`, type: 3 }],
    status: 'online'
  });
}
