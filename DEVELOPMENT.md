# Samarth Bot - Development Guide

## 🛠️ Development Setup

### Quick Start
```bash
# Install dependencies
npm install

# Start development server (auto-restart on file changes)
npm run dev

# Deploy slash commands
npm run deploy
```

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start bot with nodemon (auto-restart) |
| `npm start` | Start bot normally |
| `npm run deploy` | Deploy slash commands |
| `npm run deploy-dev` | Deploy commands with nodemon |
| `node dev.js` | Development helper with tips |

## 🔄 Development Features

### Nodemon Configuration
- **Auto-restart** on file changes in:
  - `index.js`
  - `commands/` folder
  - `handlers/` folder  
  - `utils/` folder
  - `.env` file
- **Delay**: 1 second after changes
- **Manual restart**: Type `rs` in terminal
- **Graceful shutdown**: Ctrl+C

### Development Logging
- Environment detection
- Working directory display
- File change monitoring
- Graceful shutdown messages

## 🎯 Development Workflow

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Make Changes** to any watched files
   - Bot automatically restarts
   - Console shows restart notifications

3. **Deploy Commands** (when adding new commands)
   ```bash
   npm run deploy
   ```

4. **Manual Restart** (if needed)
   - Type `rs` in terminal
   - Or use Ctrl+C then `npm run dev`

## 🔍 Debugging Tips

- Check console for detailed logs
- Use `console.log()` for debugging (auto-restarts)
- Monitor file changes in terminal
- Check `.env` file for configuration
- Use Discord Developer Portal for bot settings

## 📁 Watched Files & Folders

```
index.js           # Main bot file
commands/          # Slash commands
handlers/          # Event handlers  
utils/             # Utility functions
.env              # Environment variables
```

## 🚫 Ignored Files

```
node_modules/      # Dependencies
logs/             # Log files
*.log             # Log files
test-deploy.js    # Test files
*.md              # Documentation
```

## 🛡️ Environment Variables

Create `.env` file with:
```env
DISCORD_TOKEN=your_bot_token
CLIENT_ID=your_client_id
GUILD_ID=your_guild_id
NODE_ENV=development
```

## 🔧 Troubleshooting

### Bot Not Restarting?
- Check if files are in watched directories
- Verify nodemon.json configuration
- Try manual restart with `rs`

### Commands Not Working?
- Run `npm run deploy` to register commands
- Check Discord Developer Portal
- Verify bot permissions

### Environment Issues?
- Check `.env` file exists and has correct values
- Restart development server after `.env` changes
- Verify NODE_ENV is set to 'development'

Happy coding! 🚀
