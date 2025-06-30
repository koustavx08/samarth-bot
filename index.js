const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, Collection, Events, MessageFlags } = require('discord.js');
require('dotenv').config();

console.log('🚀 Starting Samarth Bot...');
console.log(`📍 Environment: ${process.env.NODE_ENV || 'production'}`);
console.log(`📁 Working Directory: ${__dirname}`);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

client.commands = new Collection();

// Load commands
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

console.log(`📁 Found ${commandFiles.length} command files`);

for (const file of commandFiles) {
  try {
    const command = require(`./commands/${file}`);
    if (command.data && command.data.name) {
      client.commands.set(command.data.name, command);
      console.log(`✅ Loaded command: ${command.data.name}`);
    } else {
      console.log(`⚠️  Command file ${file} is missing data or data.name property`);
    }
  } catch (error) {
    console.error(`❌ Error loading command ${file}:`, error.message);
  }
}

// Load reaction handler
console.log('📝 Loading reaction handler...');
try {
  const reactionHandler = require('./handlers/reactionHandler');
  console.log('✅ Reaction handler loaded');
  
  client.on(Events.MessageReactionAdd, async (reaction, user) => {
    if (reaction.partial) await reaction.fetch();
    await reactionHandler.execute(reaction, user);
  });
} catch (error) {
  console.error('❌ Error loading reaction handler:', error.message);
}

client.once(Events.ClientReady, () => {
  console.log(`✅ Bot is ready! Logged in as ${client.user.tag}`);
  console.log(`🔗 Bot is in ${client.guilds.cache.size} server(s)`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  
  console.log(`🎯 Command received: ${interaction.commandName}`);
  const command = client.commands.get(interaction.commandName);
  
  if (command) {
    try {
      await command.execute(interaction);
      console.log(`✅ Command ${interaction.commandName} executed successfully`);
    } catch (error) {
      console.error(`❌ Error executing command ${interaction.commandName}:`, error);
      
      // Check if we can still respond to the interaction
      try {
        if (!interaction.replied && !interaction.deferred) {
          await interaction.reply({ 
            content: 'There was an error executing this command!', 
            flags: MessageFlags.Ephemeral
          });
        } else if (interaction.deferred) {
          await interaction.editReply('There was an error executing this command!');
        } else {
          await interaction.followUp({ 
            content: 'There was an error executing this command!', 
            flags: MessageFlags.Ephemeral
          });
        }
      } catch (replyError) {
        console.error('❌ Failed to send error message:', replyError.message);
      }
    }
  } else {
    console.log(`⚠️  Command ${interaction.commandName} not found`);
    try {
      await interaction.reply({ 
        content: 'Command not found!', 
        flags: MessageFlags.Ephemeral
      });
    } catch (replyError) {
      console.error('❌ Failed to send command not found message:', replyError.message);
    }
  }
});

client.on(Events.Error, error => {
  console.error('❌ Discord client error:', error);
});

console.log('🔑 Attempting to login...');
client.login(process.env.DISCORD_TOKEN);

// Graceful shutdown handling for development
process.on('SIGINT', () => {
  console.log('\n🔄 Received SIGINT. Shutting down gracefully...');
  client.destroy();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🔄 Received SIGTERM. Shutting down gracefully...');
  client.destroy();
  process.exit(0);
});

// Development-specific logging
if (process.env.NODE_ENV === 'development') {
  console.log('🛠️  Development mode enabled');
  console.log('💡 Use "rs" to manually restart the server');
  console.log('🔍 Watching for file changes...');
}
