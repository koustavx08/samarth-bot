#!/usr/bin/env node

/**
 * Development Helper Script for Samarth Bot
 * Run this script to start development mode with helpful commands
 */

const { spawn } = require('child_process');
const path = require('path');

console.log('🎯 Samarth Bot Development Helper');
console.log('================================');
console.log('');
console.log('Available commands:');
console.log('  npm run dev       - Start bot with nodemon (auto-restart)');
console.log('  npm run start     - Start bot normally');
console.log('  npm run deploy    - Deploy slash commands');
console.log('  npm run deploy-dev - Deploy commands with nodemon');
console.log('');
console.log('Development Tips:');
console.log('  • Type "rs" in terminal to manually restart');
console.log('  • Use Ctrl+C to stop the bot');
console.log('  • Edit .env file to change bot settings');
console.log('  • Check logs for detailed information');
console.log('');

// Check if this script was run directly
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('🚀 Starting development mode...');
    console.log('');
    
    // Start the bot in development mode
    const child = spawn('npm', ['run', 'dev'], {
      stdio: 'inherit',
      shell: true,
      cwd: path.dirname(__filename)
    });
    
    child.on('close', (code) => {
      console.log(`\n🏁 Bot process exited with code ${code}`);
    });
  } else {
    console.log(`❌ Unknown arguments: ${args.join(' ')}`);
    console.log('Run this script without arguments to start development mode.');
  }
}

module.exports = {
  startDev: () => {
    console.log('🚀 Starting development server...');
    const child = spawn('npm', ['run', 'dev'], {
      stdio: 'inherit',
      shell: true
    });
    return child;
  }
};
