
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { Client, GatewayIntentBits, Collection } from 'discord.js';
import { scheduleDailyBackup } from './handlers/scheduleHandler.js';
import { handleEvents } from './handlers/eventHandler.js';
import { handleReactionRoles } from './handlers/reactionHandler.js';

dotenv.config();

console.log('🚀 Starting Samarth Bot...');
console.log(`📍 Environment: ${process.env.NODE_ENV || 'production'}`);
console.log(`📁 Working Directory: ${process.cwd()}`);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});
client.commands = new Collection();

// Dynamically load commands
const commandsPath = path.join(process.cwd(), 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = await import(`./commands/${file}`);
  client.commands.set(command.default.data.name, command.default);
}

// Register event handlers
handleEvents(client);
handleReactionRoles(client);


client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  try {
    await command.execute(interaction, client);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error executing this command.', ephemeral: true });
  }
});

client.once('ready', () => {
  console.log(`✅ Bot is ready! Logged in as ${client.user.tag}`);
  console.log(`🔗 Bot is in ${client.guilds.cache.size} server(s)`);
});

client.login(process.env.BOT_TOKEN);

// Graceful shutdown handling
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

if (process.env.NODE_ENV === 'development') {
  console.log('🛠️  Development mode enabled');
  console.log('💡 Use "rs" to manually restart the server');
  console.log('🔍 Watching for file changes...');
}
