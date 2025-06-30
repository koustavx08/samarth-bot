import { SlashCommandBuilder } from 'discord.js';
import BotRecommendations from '../utils/botRecommendations.js';

export default {
  data: new SlashCommandBuilder()
    .setName('invite-bots')
    .setDescription('DM recommended bot invite links.'),
  async execute(interaction) {
    try {
      const bots = BotRecommendations.getRecommendedBots();
      const links = bots.map(bot => `${bot.name}: ${bot.inviteLink}`);
      await interaction.user.send(links.join('\n'));
      await interaction.reply({ content: '📬 Check your DMs for recommended bot invites!', ephemeral: true });
    } catch (error) {
      await interaction.reply({ content: '❌ Could not send DM. Please check your privacy settings.', ephemeral: true });
    }
  }
};
