import { logger } from '../utils/logger.js';

export const checkPermissions = (interaction, commandName) => {
  const member = interaction.member;
  
  // Check for Administrator permission
  if (member.permissions.has('Administrator')) {
    return true;
  }

  // Check for allowed role IDs from environment variable
  const allowedRoleIds = process.env.ALLOWED_ROLE_IDS?.split(',') || [];
  const hasAllowedRole = member.roles.cache.some(role => allowedRoleIds.includes(role.id));

  if (!hasAllowedRole) {
    logger.warn(`Permission denied for ${commandName}`, {
      userId: interaction.user.id,
      guildId: interaction.guildId,
      command: commandName
    });
    return false;
  }

  return true;
};

export const requirePermissions = (execute) => {
  return async (interaction) => {
    if (!checkPermissions(interaction, interaction.commandName)) {
      await interaction.reply({
        content: '❌ You do not have permission to use this command.',
        ephemeral: true
      });
      return;
    }
    
    return execute(interaction);
  };
};
