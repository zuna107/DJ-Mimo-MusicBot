const { MessageEmbed, Client } = require('discord.js');
const { convertTime } = require('../../utils/convert.js');
const db = require("../../schema/station");
const fs = require('fs');
const path = require('path');

module.exports = {
    name: "playerStart",
    /**
     * 
     * @param {Client} client 
     * @param {KazagumoPlayer} player 
     * @param {KazagumoTrack} track 
     */

    run: async (client, player, track) => {
        let guild = client.guilds.cache.get(player.guildId);
        if (!guild) return;

        let channel = guild.channels.cache.get(player.textId);
        if (!channel) return;

        let stationData = await db.findOne({ Guild: guild.id });
        const station = stationData ? stationData.Radio : "Default Station";

        const songsPath = {
            "Genshin Impact": path.join(__dirname, '../../songs/genshin.json'),
            "Honkai: Star Rail": path.join(__dirname, '../../songs/hsr.json'),
            "Honkai Impact": path.join(__dirname, '../../songs/hi3.json'),
        };

        const songFile = songsPath[station];
        if (!songFile) return;

        const songs = JSON.parse(fs.readFileSync(songFile, 'utf8'));

        let albumName = 'Spotify Album';
        Object.entries(songs.words).forEach(([name, trackUrls]) => {
            if (trackUrls.includes(track.uri)) {
                albumName = name;
            }
        });

        const embed = new MessageEmbed()
            .setTitle(`【${station}】 - ${track.title}`)
            .setDescription(`- **Song Duration:** ${convertTime(track.length)}\n- **Artist:** ${track.author}`)
            .setURL(track.uri)
            .setColor(6982642)
            .setAuthor({
                name: `${albumName}`,
            })
            .setImage(track.thumbnail ? track.thumbnail : '');

        const targetChannel = guild.channels.cache.get('1269229024442454086'); 
        if (targetChannel) {
            await targetChannel.send({ embeds: [embed] });
        }

        await player.data.set("autoplaySystem", track.identifier);
    }
};
