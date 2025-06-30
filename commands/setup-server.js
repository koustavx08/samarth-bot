const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const BotRecommendations = require('../utils/botRecommendations');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup-server')
    .setDescription('Create the full Samarth server layout.'),

  async execute(interaction) {
    await interaction.reply('🔧 Setting up the server structure...');

    const guild = interaction.guild;

    // === ROLES ===
    const rolesData = [
      { name: 'Admin', color: 'Red', permissions: PermissionsBitField.Flags.Administrator },
      { name: 'Moderator', color: 'Purple', permissions: [PermissionsBitField.Flags.ManageMessages, PermissionsBitField.Flags.KickMembers] },
      { name: 'Core Team', color: 'Green', permissions: [] },
      { name: 'Frontend Dev', color: 'Blue', permissions: [] },
      { name: 'Backend Dev', color: 'Blue', permissions: [] },
      { name: 'Designer', color: 'Yellow', permissions: [] },
      { name: 'Student Member', color: 'White', permissions: [] },
      { name: 'Bot', color: 'Grey', permissions: [] }
    ];

    const roles = {};
    for (const roleData of rolesData) {
      const role = await guild.roles.create({ name: roleData.name, color: roleData.color, permissions: roleData.permissions });
      roles[roleData.name] = role;
    }

    // === CHANNEL STRUCTURE ===
    const structure = [
      {
        name: '📢 Welcome & Announcements', channels: ['welcome', 'rules', 'roles-reactions', 'announcements', 'server-updates']
      },
      {
        name: '💬 Community', channels: ['general-chat', 'tmsl-campus-life', 'showcase', 'memes-and-fun', 'feedback']
      },
      {
        name: '🛠️ Pravidhi', channels: ['project-updates', 'dev-chat', 'tasks', 'resources']
      },
      {
        name: '🔥 IGNITE', channels: ['ignite-announcements', 'ignite-dev', 'ignite-uiux', 'ignite-qna']
      },
      {
        name: '🎯 Study Groups', channels: ['algorithms-ds', 'web-dev', 'app-dev', 'ml-ai', 'study-resources']
      },
      {
        name: '🎮 Events & Gaming', channels: ['event-planning', 'gaming-lounge', 'tournament-updates']
      },
      {
        name: '📹 Voice Channels', channels: ['General Voice', 'Study Room', 'Project Discussion', 'Gaming Voice', 'Music Lounge']
      },
      {
        name: '🔒 Team Only', channels: ['team-chat', 'admin-logs', 'bot-commands']
      }
    ];

    // === CREATE CATEGORIES AND CHANNELS ===
    for (const category of structure) {
      const categoryChannel = await guild.channels.create({
        name: category.name,
        type: 4, // Category type
        permissionOverwrites: category.name === '🔒 Team Only' ? [
          {
            id: guild.roles.everyone.id,
            deny: [PermissionsBitField.Flags.ViewChannel]
          },
          {
            id: roles['Core Team'].id,
            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
          }
        ] : []
      });

      for (const channelName of category.channels) {
        let channelType = 0; // Text channel by default
        
        // Voice channels
        if (category.name === '📹 Voice Channels') {
          channelType = 2; // Voice channel
        }

        await guild.channels.create({
          name: channelName,
          type: channelType,
          parent: categoryChannel.id,
          permissionOverwrites: category.name === '🔒 Team Only' ? [
            {
              id: guild.roles.everyone.id,
              deny: [PermissionsBitField.Flags.ViewChannel]
            },
            {
              id: roles['Core Team'].id,
              allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
            }
          ] : []
        });
      }
    }

    await interaction.followUp('✅ Server setup completed! All roles and channels have been created.');

    // === SEND RECOMMENDED BOT INVITE LINKS ===
    await this.sendRecommendedBots(interaction);
  },

  async sendRecommendedBots(interaction) {
    const guild = interaction.guild;
    
    try {
      const result = await BotRecommendations.sendRecommendations(
        guild, 
        interaction, 
        '🎉 **Server setup complete!** Here are some recommended bots to enhance your server:'
      );

      if (result.success) {
        let followUpMessage;
        switch (result.location) {
          case 'channel':
            followUpMessage = `📋 Recommended bot list has been posted in ${result.channel}!`;
            break;
          case 'dm':
            followUpMessage = '📬 Recommended bot list has been sent to the server owner via DM!';
            break;
          case 'interaction':
            followUpMessage = '📋 Recommended bot list has been sent!';
            break;
        }
        
        await interaction.followUp({
          content: followUpMessage,
          ephemeral: true
        });
      } else {
        await interaction.followUp({
          content: '⚠️ Unable to send recommended bot list. Please use `/recommend-bots` command to get the list.',
          ephemeral: true
        });
      }
    } catch (error) {
      console.error('❌ Error sending bot recommendations:', error.message);
      await interaction.followUp({
        content: '⚠️ There was an error sending the bot recommendations. Please use `/recommend-bots` command.',
        ephemeral: true
      });
    }
  }
};
