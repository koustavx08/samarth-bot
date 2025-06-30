import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('member-count')
    .setDescription('Show the current member count.'),
  async execute(interaction) {
    await interaction.reply(`👥 Member count: ${interaction.guild.memberCount}`);
  }
};
