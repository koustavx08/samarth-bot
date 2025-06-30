const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('reaction-roles')
    .setDescription('Post a message for users to select roles via emoji.'),

  async execute(interaction) {
    // Respond immediately to avoid timeout
    await interaction.reply({ 
      content: '🔧 Creating reaction role message...', 
      flags: MessageFlags.Ephemeral
    });

    const embed = new EmbedBuilder()
      .setTitle('🎭 Choose Your Role')
      .setDescription('React to get your desired role:\n\n' +
        '💻 → Frontend Dev\n' +
        '🧪 → Backend Dev\n' +
        '🎨 → Designer\n' +
        '🛠️ → Core Team')
      .setColor('Blue');

    const msg = await interaction.channel.send({ embeds: [embed] });

    await msg.react('💻');
    await msg.react('🧪');
    await msg.react('🎨');
    await msg.react('🛠️');

    // Update the response
    await interaction.editReply('✅ Reaction role message posted!');
  }
};
