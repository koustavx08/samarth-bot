import { SlashCommandBuilder } from 'discord.js';
import { info } from '../utils/logger.js';

export const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with bot latency and uptime information');

export async function execute(interaction) {
    const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
    const latency = sent.createdTimestamp - interaction.createdTimestamp;
    const wsLatency = interaction.client.ws.ping;

    const uptimeSeconds = Math.floor(interaction.client.uptime / 1000);
    const days = Math.floor(uptimeSeconds / 86400);
    const hours = Math.floor((uptimeSeconds % 86400) / 3600);
    const minutes = Math.floor((uptimeSeconds % 3600) / 60);
    const seconds = uptimeSeconds % 60;

    const uptime = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    await interaction.editReply({
        content: `🏓 Pong!\n⏱️ Latency: ${latency}ms\n📡 WebSocket: ${wsLatency}ms\n⬆️ Uptime: ${uptime}`
    });

    info('Ping command executed', { latency, wsLatency });
};
