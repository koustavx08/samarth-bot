// Server layout definitions for Samarth Bot
export const layouts = {
  basic: [
    { name: '📢 Welcome & Announcements', channels: ['welcome', 'rules', 'roles-reactions', 'announcements', 'server-updates'] },
    { name: '💬 Community', channels: ['general-chat', 'tmsl-campus-life', 'showcase', 'memes-and-fun', 'feedback'] },
    { name: '📹 Voice Channels', channels: ['General Voice', 'Study Room', 'Project Discussion', 'Gaming Voice', 'Music Lounge'] }
  ],
  'ignite-only': [
    { name: '🔥 IGNITE', channels: ['ignite-announcements', 'ignite-dev', 'ignite-uiux', 'ignite-qna'] }
  ],
  full: [
    { name: '📢 Welcome & Announcements', channels: ['welcome', 'rules', 'roles-reactions', 'announcements', 'server-updates'] },
    { name: '💬 Community', channels: ['general-chat', 'tmsl-campus-life', 'showcase', 'memes-and-fun', 'feedback'] },
    { name: '🛠️ Pravidhi', channels: ['project-updates', 'dev-chat', 'tasks', 'resources'] },
    { name: '🔥 IGNITE', channels: ['ignite-announcements', 'ignite-dev', 'ignite-uiux', 'ignite-qna'] },
    { name: '🎯 Study Groups', channels: ['algorithms-ds', 'web-dev', 'app-dev', 'ml-ai', 'study-resources'] },
    { name: '🎮 Events & Gaming', channels: ['event-planning', 'gaming-lounge', 'tournament-updates'] },
    { name: '📹 Voice Channels', channels: ['General Voice', 'Study Room', 'Project Discussion', 'Gaming Voice', 'Music Lounge'] },
    { name: '🔒 Team Only', channels: ['team-chat', 'admin-logs', 'bot-commands'], private: true }
  ]
};
