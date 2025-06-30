import { Events } from 'discord.js';
import { info, error } from '../utils/logger.js';

export const name = Events.InteractionCreate;
export const once = false;

export async function execute(interaction) {
  try {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
      info(`Command not found: ${interaction.commandName}`, {
        userId: interaction.user.id,
        guildId: interaction.guildId
      });
      return;
    }

    await command.execute(interaction);
    
    info(`Command executed: ${interaction.commandName}`, {
      command: interaction.commandName,
      userId: interaction.user.id,
      guildId: interaction.guildId
    });
  } catch (err) {
    error('Error executing command', {
      command: interaction.commandName,
      error: err
    });

    const errorMessage = {
      content: 'There was an error executing this command!',
      ephemeral: true
    };

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(errorMessage);
    } else {
      await interaction.reply(errorMessage);
    }
  }
}
