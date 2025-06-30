const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const BotRecommendations = require('../utils/botRecommendations');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup-server')
    .setDescription('Create the Samarth server layout.')
    .addStringOption(option =>
      option.setName('layout')
        .setDescription('Choose the server layout type')
        .setRequired(true)
        .addChoices(
          { name: 'basic', value: 'basic' },
          { name: 'full', value: 'full' },
          { name: 'ignite-only', value: 'ignite-only' }
        )
    ),

  async execute(interaction) {
    const layout = interaction.options.getString('layout');
    await interaction.reply(`🔧 Setting up the server structure for layout: **${layout}**...`);

    if (layout === 'basic') {
      await this.buildBasicLayout(interaction);
    } else if (layout === 'full') {
      await this.buildFullLayout(interaction);
    } else if (layout === 'ignite-only') {
      await this.buildIgniteLayout(interaction);
    } else {
      await interaction.followUp('❌ Invalid layout type.');
    }
  },

  async buildBasicLayout(interaction) {
    const guild = interaction.guild;
    // Roles
    const rolesData = [
      { name: 'Admin', color: 'Red', permissions: PermissionsBitField.Flags.Administrator },
      { name: 'Moderator', color: 'Purple', permissions: [PermissionsBitField.Flags.ManageMessages, PermissionsBitField.Flags.KickMembers] },
      { name: 'Designer', color: 'Yellow', permissions: [] },
      { name: 'Student', color: 'White', permissions: [] },
    ];
    const roles = {};
    for (const roleData of rolesData) {
      const role = await guild.roles.create({ name: roleData.name, color: roleData.color, permissions: roleData.permissions });
      roles[roleData.name] = role;
    }
    // Categories & Channels
    const structure = [
      { name: '📢 Welcome & Announcements', channels: ['welcome', 'rules', 'roles-reactions', 'announcements', 'server-updates'] },
      { name: '💬 Community', channels: ['general-chat', 'tmsl-campus-life', 'showcase', 'memes-and-fun', 'feedback'] },
      { name: '📹 Voice Channels', channels: ['General Voice', 'Study Room', 'Project Discussion', 'Gaming Voice', 'Music Lounge'] }
    ];
    for (const category of structure) {
      const categoryChannel = await guild.channels.create({ name: category.name, type: 4 });
      for (const channelName of category.channels) {
        let channelType = 0;
        if (category.name === '📹 Voice Channels') channelType = 2;
        await guild.channels.create({ name: channelName, type: channelType, parent: categoryChannel.id });
      }
    }
    await interaction.followUp('✅ Server setup completed for layout: **basic**!');
    await this.sendRecommendedBots(interaction);
  },

  async buildFullLayout(interaction) {
    const guild = interaction.guild;
    // Roles
    const rolesData = [
      { name: 'Admin', color: 'Red', permissions: PermissionsBitField.Flags.Administrator },
      { name: 'Moderator', color: 'Purple', permissions: [PermissionsBitField.Flags.ManageMessages, PermissionsBitField.Flags.KickMembers] },
      { name: 'Designer', color: 'Yellow', permissions: [] },
      { name: 'Student', color: 'White', permissions: [] },
      { name: 'Core Team', color: 'Green', permissions: [] },
      { name: 'Frontend Dev', color: 'Blue', permissions: [] },
      { name: 'Backend Dev', color: 'Blue', permissions: [] },
      { name: 'Bot', color: 'Grey', permissions: [] }
    ];
    const roles = {};
    for (const roleData of rolesData) {
      const role = await guild.roles.create({ name: roleData.name, color: roleData.color, permissions: roleData.permissions });
      roles[roleData.name] = role;
    }
    // Categories & Channels
    const structure = [
      { name: '📢 Welcome & Announcements', channels: ['welcome', 'rules', 'roles-reactions', 'announcements', 'server-updates'] },
      { name: '💬 Community', channels: ['general-chat', 'tmsl-campus-life', 'showcase', 'memes-and-fun', 'feedback'] },
      { name: '🛠️ Pravidhi', channels: ['project-updates', 'dev-chat', 'tasks', 'resources'] },
      { name: '🔥 IGNITE', channels: ['ignite-announcements', 'ignite-dev', 'ignite-uiux', 'ignite-qna'] },
      { name: '🎯 Study Groups', channels: ['algorithms-ds', 'web-dev', 'app-dev', 'ml-ai', 'study-resources'] },
      { name: '🎮 Events & Gaming', channels: ['event-planning', 'gaming-lounge', 'tournament-updates'] },
      { name: '📹 Voice Channels', channels: ['General Voice', 'Study Room', 'Project Discussion', 'Gaming Voice', 'Music Lounge'] },
      { name: '🔒 Team Only', channels: ['team-chat', 'admin-logs', 'bot-commands'], private: true }
    ];
    for (const category of structure) {
      const isTeamOnly = category.name === '🔒 Team Only';
      const permissionOverwrites = isTeamOnly ? [
        { id: guild.roles.everyone.id, deny: [PermissionsBitField.Flags.ViewChannel] },
        { id: roles['Core Team'].id, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] }
      ] : [];
      const categoryChannel = await guild.channels.create({ name: category.name, type: 4, permissionOverwrites });
      for (const channelName of category.channels) {
        let channelType = 0;
        if (category.name === '📹 Voice Channels') channelType = 2;
        await guild.channels.create({ name: channelName, type: channelType, parent: categoryChannel.id, permissionOverwrites });
      }
    }
    await interaction.followUp('✅ Server setup completed for layout: **full**!');
    await this.sendRecommendedBots(interaction);
  },

  async buildIgniteLayout(interaction) {
    const guild = interaction.guild;
    // Roles
    const rolesData = [
      { name: 'Admin', color: 'Red', permissions: PermissionsBitField.Flags.Administrator },
      { name: 'Moderator', color: 'Purple', permissions: [PermissionsBitField.Flags.ManageMessages, PermissionsBitField.Flags.KickMembers] },
      { name: 'Designer', color: 'Yellow', permissions: [] },
      { name: 'Student', color: 'White', permissions: [] }
    ];
    const roles = {};
    for (const roleData of rolesData) {
      const role = await guild.roles.create({ name: roleData.name, color: roleData.color, permissions: roleData.permissions });
      roles[roleData.name] = role;
    }
    // Only IGNITE category
    const structure = [
      { name: '🔥 IGNITE', channels: ['ignite-announcements', 'ignite-dev', 'ignite-uiux', 'ignite-qna'] }
    ];
    for (const category of structure) {
      const categoryChannel = await guild.channels.create({ name: category.name, type: 4 });
      for (const channelName of category.channels) {
        await guild.channels.create({ name: channelName, type: 0, parent: categoryChannel.id });
      }
    }
    await interaction.followUp('✅ Server setup completed for layout: **ignite-only**!');
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
