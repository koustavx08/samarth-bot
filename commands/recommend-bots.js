const { SlashCommandBuilder } = require('discord.js');
const BotRecommendations = require('../utils/botRecommendations');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('recommend-bots')
    .setDescription('Get a list of recommended Discord bots for your server')
    .addBooleanOption(option =>
      option.setName('dm')
        .setDescription('Send the list via DM instead of in the channel')
        .setRequired(false)
    )
    .addStringOption(option =>
      option.setName('category')
        .setDescription('Filter bots by category')
        .setRequired(false)
        .addChoices(
          { name: 'All Categories', value: 'all' },
          { name: 'Music', value: 'music' },
          { name: 'Moderation', value: 'moderation' },
          { name: 'Gaming', value: 'gaming' },
          { name: 'Utility', value: 'utility' },
          { name: 'Fun', value: 'fun' },
          { name: 'Economy', value: 'economy' }
        )
    ),

  async execute(interaction) {
    const sendDM = interaction.options.getBoolean('dm') || false;
    const category = interaction.options.getString('category') || 'all';
    
    let embed;
    if (category === 'all') {
      embed = BotRecommendations.createRecommendationsEmbed();
    } else {
      const categoryBots = BotRecommendations.getBotsByCategory(category);
      if (categoryBots.length === 0) {
        return await interaction.reply({
          content: `❌ No bots found in the "${category}" category.`,
          ephemeral: true
        });
      }
      
      embed = BotRecommendations.createRecommendationsEmbed(
        `🤖 ${category.charAt(0).toUpperCase() + category.slice(1)} Bots`,
        `Here are recommended ${category.toLowerCase()} bots for your server:`
      );
      
      // Clear fields and add only category-specific bots
      embed.data.fields = [];
      categoryBots.forEach(bot => {
        embed.addFields({
          name: bot.name,
          value: `${bot.description}\n**Permissions:** ${bot.permissions}\n[🔗 Invite Link](${bot.inviteLink})`,
          inline: true
        });
      });
      
      // Re-add tips
      embed.addFields({
        name: '💡 Safety Tips',
        value: '• Always review bot permissions before inviting\n• Check bot reviews and community feedback\n• Test bots in a private server first\n• Only invite bots from trusted developers',
        inline: false
      });
    }

    if (sendDM) {
      try {
        await interaction.user.send({ embeds: [embed] });
        await interaction.reply({
          content: '📬 Recommended bot list has been sent to your DMs!',
          ephemeral: true
        });
      } catch (error) {
        console.error('❌ Failed to send DM:', error.message);
        await interaction.reply({
          content: '❌ Unable to send DM. Here\'s the list:',
          embeds: [embed],
          ephemeral: true
        });
      }
    } else {
      const categoryText = category === 'all' ? '' : ` (${category.charAt(0).toUpperCase() + category.slice(1)})`;
      await interaction.reply({
        content: `🤖 **Here are recommended Discord bots for your server${categoryText}:**`,
        embeds: [embed]
      });
    }
  }
};
