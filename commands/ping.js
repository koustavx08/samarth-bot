import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Check bot latency.'),
  async execute(interaction) {
    await interaction.reply(`🏓 Pong! Latency: ${Date.now() - interaction.createdTimestamp}ms`);
  }
};
