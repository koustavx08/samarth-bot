<div align="center">


# 🤖 Samarth Bot

*A powerful Discord server management bot built exclusively for the Samarth TMSL community*

[![Discord.js](https://img.shields.io/badge/Discord.js-v14.21.0-blue.svg?logo=discord&logoColor=white)](https://discord.js.org/)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg?logo=node.js&logoColor=white)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-ISC-yellow.svg)](LICENSE)
[![Nodemon](https://img.shields.io/badge/Dev-Nodemon-76d04b.svg?logo=nodemon&logoColor=white)](https://nodemon.io/)

[Features](#-features) • [Installation](#-installation) • [Commands](#-commands) • [Development](#-development) • [Contributing](#-contributing)

</div>

---

## 🌟 Overview


**Samarth Bot** is a comprehensive Discord server management solution built **exclusively for the Samarth TMSL community**. It automates server setup, manages role assignments, and provides curated bot recommendations to enhance the experience for Samarth TMSL students, faculty, and tech enthusiasts.


### ✨ Key Highlights

- 🚀 **One-Command Server Setup** - Complete server structure in seconds, tailored for Samarth TMSL
- 🎭 **Interactive Role Management** - Reaction-based role assignment for Samarth TMSL roles  
- 🤖 **Smart Bot Recommendations** - Curated list of useful Discord bots for the Samarth TMSL server
- 🛠️ **Developer-Friendly** - Hot reload development with nodemon
- 🎯 **Community-Focused** - Designed specifically for the Samarth TMSL student and tech community

---


> **Note:** This bot is intended **only for use within the official Samarth TMSL Discord server**. Features, roles, and recommendations are customized for the needs of Samarth TMSL students, faculty, and community members.

## 🎯 Features


### 🏗️ **Server Management**
- **Complete Server Setup** - Creates an organized channel structure with categories specific to Samarth TMSL
- **Role System** - Predefined roles for Samarth TMSL team members, students, and skill levels
- **Permission Management** - Secure channel access with proper role-based permissions
- **Voice Channels** - Dedicated spaces for collaboration, study, and gaming


### 🎭 **Role Assignment**
- **Reaction Roles** - Users can self-assign roles via emoji reactions, mapped to Samarth TMSL roles
- **Skill-Based Roles** - Frontend Dev, Backend Dev, Designer, Student Member (customized for Samarth TMSL)
- **Interactive Embeds** - Beautiful, user-friendly role selection interface


### 🤖 **Bot Recommendations**
- **Curated Bot List** - Hand-picked bots for different purposes, relevant to Samarth TMSL
- **Category Filtering** - Music, Moderation, Gaming, Utility, Fun, Economy
- **Smart Delivery** - Automatic posting to appropriate channels or DMs
- **Safety First** - Built-in security tips and permission transparency


### ⚡ **Developer Experience**
- **Hot Reload** - Instant server restart on file changes
- **Comprehensive Logging** - Detailed console output for debugging
- **Graceful Shutdown** - Clean process termination
- **Development Scripts** - Ready-to-use npm commands

---


## 🚀 Installation (Samarth TMSL Only)


### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- [Discord Bot Token](https://discord.com/developers/applications) (**for Samarth TMSL server only**)
- Git (optional)


### Quick Setup (For Samarth TMSL Server Admins)

1. **Clone the repository**
   ```bash
   git clone https://github.com/koustavx08/samarth-bot.git
   cd samarth-bot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Create .env file
   cp .env.example .env
   ```
   
   Edit `.env` with your bot credentials:
   ```env
   DISCORD_TOKEN=your_bot_token_here
   CLIENT_ID=your_client_id_here
   GUILD_ID=your_guild_id_here
   NODE_ENV=development
   ```

4. **Deploy slash commands**
   ```bash
   npm run deploy
   ```

5. **Start the bot**
   ```bash
   # Development mode (auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

---


## 🎮 Commands (Samarth TMSL)


### `/setup-server`
Creates a complete server structure with roles, channels, and categories, all tailored for the Samarth TMSL community.

**Features:**
- 📢 Welcome & Announcements
- 💬 Community channels
- 🛠️ Project-specific channels (Pravidhi, IGNITE)
- 🎯 Study groups
- 🎮 Events & Gaming
- 🔒 Team-only areas

**Auto-includes:** Bot recommendations sent to #server-updates or admin DM


### `/reaction-roles`
Sets up interactive role assignment via emoji reactions for Samarth TMSL roles.

**Available Roles:**
- 💻 Frontend Dev
- 🧪 Backend Dev  
- 🎨 Designer
- 🎓 Student Member


### `/recommend-bots`
Displays curated Discord bot recommendations for the Samarth TMSL server.

**Options:**
- `dm:true` - Send via direct message
- `category` - Filter by bot type (Music, Moderation, Gaming, etc.)

**Included Bots:**
- 🎵 **Music:** Rythm Bot
- 🛡️ **Moderation:** MEE6, Carl-bot, Dyno
- 🎮 **Gaming:** Mudae, UnbelievaBoat
- 📊 **Utility:** Statbot, NotSoBot

---


## 🛠️ Development (For Samarth TMSL Contributors)

### Development Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start with nodemon (auto-restart) |
| `npm start` | Start in production mode |
| `npm run deploy` | Deploy slash commands |
| `npm run deploy-dev` | Deploy with nodemon |
| `node dev.js` | Development helper with tips |


### File Structure (Samarth TMSL Customization)

```
samarth-bot/
├── 📁 commands/              # Slash commands
│   ├── setup-server.js       # Server setup command
│   ├── reaction-roles.js     # Role assignment command
│   └── recommend-bots.js     # Bot recommendations
├── 📁 handlers/              # Event handlers
│   └── reactionHandler.js    # Reaction role handler
├── 📁 utils/                 # Utility functions
│   └── botRecommendations.js # Bot data and utilities
├── 📄 index.js               # Main bot file
├── 📄 deploy-commands.js     # Command deployment
├── 📄 dev.js                 # Development helper
├── 📄 nodemon.json           # Nodemon configuration
└── 📄 package.json           # Project configuration
```

### Development Features

- 🔄 **Auto-restart** on file changes
- 🎯 **Watched directories:** commands/, handlers/, utils/, .env
- ⚡ **Manual restart:** Type `rs` in terminal
- 🛡️ **Graceful shutdown:** Ctrl+C handling
- 📊 **Environment detection** and logging

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---


## 📋 Server Structure Preview (Samarth TMSL)

When you run `/setup-server`, here's what gets created for the Samarth TMSL Discord server:

```
📢 Welcome & Announcements
├── #welcome
├── #rules  
├── #roles-reactions
├── #announcements
└── #server-updates

💬 Community
├── #general-chat
├── #tmsl-campus-life
├── #showcase
├── #memes-and-fun
└── #feedback

🛠️ Pravidhi
├── #project-updates
├── #dev-chat
├── #tasks
└── #resources

🔥 IGNITE
├── #ignite-announcements
├── #ignite-dev
├── #ignite-uiux
└── #ignite-qna

🎯 Study Groups
├── #algorithms-ds
├── #web-dev
├── #app-dev
├── #ml-ai
└── #study-resources

🎮 Events & Gaming
├── #event-planning
├── #gaming-lounge
└── #tournament-updates

📹 Voice Channels
├── 🔊 General Voice
├── 🔊 Study Room
├── 🔊 Project Discussion
├── 🔊 Gaming Voice
└── 🔊 Music Lounge

🔒 Team Only
├── #team-chat
├── #admin-logs
└── #bot-commands
```

---


## 🔧 Configuration (Samarth TMSL)

### Environment Variables

```env
# Required
DISCORD_TOKEN=your_bot_token
CLIENT_ID=your_application_id  
GUILD_ID=your_server_id

# Optional
NODE_ENV=development
```

### Bot Permissions Required

- Send Messages
- Use Slash Commands
- Manage Roles
- Manage Channels
- Add Reactions
- Embed Links
- Read Message History

---


## 🐛 Troubleshooting (Samarth TMSL)

### Common Issues

**Bot not responding to commands?**
- ✅ Check if commands are deployed (`npm run deploy`)
- ✅ Verify bot permissions in Discord
- ✅ Ensure bot is online and has proper intents

**Development server not restarting?**
- ✅ Check if files are in watched directories
- ✅ Try manual restart with `rs`
- ✅ Verify nodemon.json configuration

**Permission errors?**
- ✅ Ensure bot role is above managed roles
- ✅ Check channel-specific permissions
- ✅ Verify administrator permissions if needed

---


## 📊 Stats & Info (Samarth TMSL)

- **Language:** JavaScript (Node.js)
- **Framework:** Discord.js v14
- **Development:** Nodemon hot reload
- **Commands:** 3 slash commands
- **Features:** Server setup, role management, bot recommendations
- **Target:** Tech communities, student organizations

---


## 📞 Support (Samarth TMSL)

- 📧 **Issues:** [GitHub Issues](https://github.com/koustavx08/samarth-bot/issues)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/koustavx08/samarth-bot/discussions)
- 📖 **Documentation:** [Development Guide](DEVELOPMENT.md)

---

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">


**Built with ❤️ for the Samarth TMSL developer community**

⭐ **Star this repo if you found it helpful for Samarth TMSL!** ⭐

</div>
