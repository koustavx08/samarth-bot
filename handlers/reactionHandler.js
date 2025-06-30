// Reaction role handler for button-based roles (for ES module import)
export function handleReactionRoles(client) {
  client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;
    if (interaction.customId === 'role_designer') {
      const role = interaction.guild.roles.cache.find(r => r.name === 'Designer');
      if (role) {
        await interaction.member.roles.add(role);
        await interaction.reply({ content: 'You have been given the Designer role!', ephemeral: true });
      }
    } else if (interaction.customId === 'role_student') {
      const role = interaction.guild.roles.cache.find(r => r.name === 'Student');
      if (role) {
        await interaction.member.roles.add(role);
        await interaction.reply({ content: 'You have been given the Student role!', ephemeral: true });
      }
    }
  });
}
