import fs from 'fs';
import path from 'path';

export async function backupServerStructure(guild) {
  const data = {
    roles: guild.roles.cache.map(role => ({
      id: role.id,
      name: role.name,
      color: role.color,
      permissions: role.permissions.bitfield
    })),
    channels: guild.channels.cache.map(channel => ({
      id: channel.id,
      name: channel.name,
      type: channel.type,
      parent: channel.parentId
    }))
  };
  const filePath = path.join('backups', `${guild.id}_backup_${Date.now()}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
