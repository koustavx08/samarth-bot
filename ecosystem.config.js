module.exports = {
  apps: [{
    name: 'samarth-bot',
    script: 'index.js',
    watch: false,
    env: {
      NODE_ENV: 'production',
    },
    env_development: {
      NODE_ENV: 'development'
    },
    max_memory_restart: '300M',
    error_file: 'logs/pm2/error.log',
    out_file: 'logs/pm2/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    instances: 1,
    exec_mode: 'fork'
  }]
};
