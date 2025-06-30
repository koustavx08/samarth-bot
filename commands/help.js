import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('List all available commands.'),
  async execute(interaction) {
    const helpText = `**Available Commands:**\n\n` +
      `/setup-server layout:<type> — Setup server layout\n` +
      `/reaction-roles — Post role assignment buttons\n` +
      `/invite-bots — DM recommended bot invites\n` +
      `/ping — Bot latency\n` +
      `/member-count — Show member count\n` +
      `/server-info — Server info`;
    await interaction.reply({ content: helpText, ephemeral: true });
  }
};
