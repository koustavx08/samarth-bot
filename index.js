import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Client, GatewayIntentBits, Collection } from 'discord.js';
import { scheduleDailyBackup } from './handlers/scheduleHandler.js';
import { info, error } from './utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

info('🚀 Starting Samarth Bot...', {
  environment: process.env.NODE_ENV || 'production',
  workingDirectory: process.cwd()
});

if (!process.env.BOT_TOKEN) {
  error('BOT_TOKEN is missing in environment variables');
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent
  ]
});

// Initialize collections
client.commands = new Collection();
client.cooldowns = new Collection();

// Load commands
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const fileUrl = new URL(path.join('commands', file), import.meta.url);
  try {
    const commandModule = await import(fileUrl);
    
    // Handle both default and named exports
    const command = commandModule.default || commandModule;
    
    // Check if command has required properties
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
      info(`Loaded command: ${command.data.name}`);
    } else {
      error(`Invalid command file: ${file} - missing required properties`);
    }
  } catch (err) {
    error(`Error loading command ${file}:`, { error: err.stack });
  }
}

// Load events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const fileUrl = new URL(path.join('events', file), import.meta.url);
  try {
    const eventModule = await import(fileUrl);
    
    // Handle both default and named exports
    const event = eventModule.default || eventModule;
    
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
    
    info(`Loaded event: ${event.name}`);
  } catch (err) {
    error(`Error loading event ${file}:`, { error: err.stack });
  }
}

// Schedule daily backup
scheduleDailyBackup(client);


// Error handling for unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  error('Unhandled Rejection at:', { reason, promise });
});

// Error handling for uncaught exceptions
process.on('uncaughtException', (err) => {
  error('Uncaught Exception:', { error: err });
  process.exit(1);
});

client.login(process.env.BOT_TOKEN);

// Graceful shutdown handling
process.on('SIGINT', () => {
  info('Received SIGINT. Shutting down gracefully...');
  client.destroy();
  process.exit(0);
});

process.on('SIGTERM', () => {
  info('Received SIGTERM. Shutting down gracefully...');
  client.destroy();
  process.exit(0);
});

if (process.env.NODE_ENV === 'development') {
  info('Development mode enabled', {
    tips: [
      'Use "rs" to manually restart the server',
      'Watching for file changes...'
    ]
  });
}
