import cron from 'cron';
import { backupServerStructure } from '../utils/backup.js';

export function scheduleDailyBackup(client) {
  const job = new cron.CronJob('0 0 * * *', () => {
    client.guilds.cache.forEach(guild => backupServerStructure(guild));
  });
  job.start();
}
