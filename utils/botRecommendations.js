
import { EmbedBuilder, PermissionsBitField } from 'discord.js';

/**
 * Bot recommendation utility functions
 */
class BotRecommendations {
  /**
   * Get the list of recommended bots with their information
   * @returns {Array} Array of bot objects with name, description, invite link, and permissions
   */
  static getRecommendedBots() {
    return [
      {
        name: "🎵 Rythm Bot",
        description: "High-quality music bot for voice channels",
        inviteLink: "https://discord.com/api/oauth2/authorize?client_id=235088799074484224&permissions=3148800&scope=bot",
        permissions: "Connect, Speak, Use Voice Activity",
        category: "Music"
      },
      {
        name: "🛡️ MEE6",
        description: "Moderation and leveling system",
        inviteLink: "https://discord.com/api/oauth2/authorize?client_id=159985870458322944&permissions=8&scope=bot",
        permissions: "Administrator (configurable)",
        category: "Moderation"
      },
      {
        name: "🎮 Mudae",
        description: "Character collection game for entertainment",
        inviteLink: "https://discord.com/api/oauth2/authorize?client_id=432610292342587392&permissions=67628032&scope=bot",
        permissions: "Send Messages, Embed Links, Add Reactions",
        category: "Gaming"
      },
      {
        name: "📊 Statbot",
        description: "Server statistics and analytics",
        inviteLink: "https://discord.com/api/oauth2/authorize?client_id=491174779278065689&permissions=68608&scope=bot",
        permissions: "Read Messages, Send Messages",
        category: "Utility"
      },
      {
        name: "🤖 Carl-bot",
        description: "Advanced moderation and automation",
        inviteLink: "https://discord.com/api/oauth2/authorize?client_id=235148962103951360&permissions=8&scope=bot",
        permissions: "Administrator (configurable)",
        category: "Moderation"
      },
      {
        name: "🔔 NotSoBot",
        description: "Fun commands and utility features",
        inviteLink: "https://discord.com/api/oauth2/authorize?client_id=170915256833540096&permissions=379968&scope=bot",
        permissions: "Send Messages, Embed Links, Attach Files",
        category: "Fun"
      },
      {
        name: "📝 Dyno",
        description: "Comprehensive server management",
        inviteLink: "https://discord.com/api/oauth2/authorize?client_id=161660517914509312&permissions=8&scope=bot",
        permissions: "Administrator (configurable)",
        category: "Moderation"
      },
      {
        name: "🎲 UnbelievaBoat",
        description: "Economy system and fun games",
        inviteLink: "https://discord.com/api/oauth2/authorize?client_id=292953664492929025&permissions=268446720&scope=bot",
        permissions: "Send Messages, Manage Messages, Add Reactions",
        category: "Economy"
      }
    ];
  }

  /**
   * Create an embed with recommended bots
   * @param {string} title - Custom title for the embed
   * @param {string} description - Custom description for the embed
   * @returns {EmbedBuilder} Discord embed with bot recommendations
   */
  static createRecommendationsEmbed(title = '🤖 Recommended Discord Bots', description = 'Here are some popular and useful bots that can enhance your server experience:') {
    const embed = new EmbedBuilder()
      .setTitle(title)
      .setDescription(description)
      .setColor(0x00AE86)
      .setTimestamp()
      .setFooter({ text: 'Samarth Bot • Bot Recommendations' });

    const bots = this.getRecommendedBots();
    
    bots.forEach((bot, index) => {
      embed.addFields({
        name: bot.name,
        value: `${bot.description}\n**Category:** ${bot.category}\n**Permissions:** ${bot.permissions}\n[🔗 Invite Link](${bot.inviteLink})`,
        inline: true
      });
    });

    // Add tips section
    embed.addFields({
      name: '💡 Safety Tips',
      value: '• Always review bot permissions before inviting\n• Check bot reviews and community feedback\n• Test bots in a private server first\n• Only invite bots from trusted developers',
      inline: false
    });

    return embed;
  }

  /**
   * Send bot recommendations to the best available location
   * @param {Guild} guild - Discord guild object
   * @param {Interaction} interaction - Discord interaction object
   * @param {string} customMessage - Custom message to send with recommendations
   */
  static async sendRecommendations(guild, interaction, customMessage = '🎉 **Here are some recommended bots for your server:**') {
    const embed = this.createRecommendationsEmbed();

    // Priority 1: Try to find server-updates channel
    let targetChannel = guild.channels.cache.find(channel => 
      channel.name === 'server-updates' && channel.type === 0
    );

    // Priority 2: Try to find any announcement/general channel
    if (!targetChannel) {
      targetChannel = guild.channels.cache.find(channel => 
        (channel.name.includes('announcement') || 
         channel.name.includes('general') || 
         channel.name.includes('update') ||
         channel.name.includes('info')) && 
        channel.type === 0
      );
    }

    // Try to send to channel first
    if (targetChannel && targetChannel.permissionsFor(guild.members.me).has([
      PermissionsBitField.Flags.SendMessages, 
      PermissionsBitField.Flags.EmbedLinks
    ])) {
      try {
        await targetChannel.send({ 
          content: customMessage,
          embeds: [embed] 
        });
        
        return {
          success: true,
          location: 'channel',
          channel: targetChannel
        };
      } catch (error) {
        console.error('❌ Failed to send to channel:', error.message);
      }
    }

    // Fallback: Send to server owner via DM
    try {
      const owner = await guild.fetchOwner();
      await owner.send({ 
        content: `${customMessage}\n**Server:** ${guild.name}`,
        embeds: [embed] 
      });
      
      return {
        success: true,
        location: 'dm',
        recipient: owner
      };
    } catch (error) {
      console.error('❌ Failed to send DM to owner:', error.message);
      
      // Last resort: Send as interaction response
      try {
        await interaction.followUp({
          content: customMessage,
          embeds: [embed],
          ephemeral: true
        });
        
        return {
          success: true,
          location: 'interaction'
        };
      } catch (interactionError) {
        console.error('❌ Failed to send via interaction:', interactionError.message);
        return {
          success: false,
          error: 'All delivery methods failed'
        };
      }
    }
  }

  /**
   * Get bots filtered by category
   * @param {string} category - Category to filter by (Music, Moderation, Gaming, etc.)
   * @returns {Array} Filtered array of bot objects
   */
  static getBotsByCategory(category) {
    return this.getRecommendedBots().filter(bot => 
      bot.category.toLowerCase() === category.toLowerCase()
    );
  }

  /**
   * Get all available categories
   * @returns {Array} Array of unique categories
   */
  static getCategories() {
    const bots = this.getRecommendedBots();
    return [...new Set(bots.map(bot => bot.category))];
  }
}

export default BotRecommendations;
