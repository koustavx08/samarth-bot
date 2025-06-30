const { Events } = require('discord.js');

const emojiRoleMap = {
  '💻': 'Frontend Dev',
  '🧪': 'Backend Dev',
  '🎨': 'Designer',
  '🛠️': 'Core Team'
};

module.exports = {
  name: Events.MessageReactionAdd,
  async execute(reaction, user) {
    if (user.bot) return;

    const emoji = reaction.emoji.name;
    const roleName = emojiRoleMap[emoji];
    if (!roleName) return;

    const guild = reaction.message.guild;
    const member = await guild.members.fetch(user.id);
    const role = guild.roles.cache.find(r => r.name === roleName);
    if (!role) return;

    await member.roles.add(role);
  }
};
