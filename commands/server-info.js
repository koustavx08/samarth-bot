import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('server-info')
    .setDescription('Show server information.'),
  async execute(interaction) {
    const guild = interaction.guild;
    await interaction.reply({
      content: `**Server Name:** ${guild.name}\n**Created:** ${guild.createdAt.toDateString()}\n**Owner:** <@${guild.ownerId}>\n**Members:** ${guild.memberCount}`
    });
  }
};
