const { CommandInteraction, Client, MessageEmbed, Permissions } = require('discord.js');
const fs = require('fs');
const path = require('path');
const db = require('../../schema/station.js');

module.exports = {
  name: 'play',
  description: 'Joins your voice channel and starts playing 24/7',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  player: false,
  inVoiceChannel: true,
  sameVoiceChannel: true,

  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */
  run: async (client, interaction) => {
    await interaction.deferReply({ ephemeral: false });

    if (!interaction.guild.members.me.permissions.has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) {
      return interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`I don't have enough permissions to execute this command! Please give me permission \`CONNECT\` or \`SPEAK\`.`),
        ],
      });
    }

    const { channel } = interaction.member.voice;
    if (!interaction.guild.members.me.permissionsIn(channel).has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) {
      return interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`I don't have enough permissions to connect to your voice channel. Please give me permission \`CONNECT\` or \`SPEAK\`.`),
        ],
      });
    }

    const ress = await db.findOne({ Guild: interaction.guildId });
    let station = ress && ress.Radio ? ress.Radio : "default";
    const songsPath = {
      "default": path.join(__dirname, '../../songs/default.json'),
      "Genshin Impact": path.join(__dirname, '../../songs/genshin.json'),
      "Honkai: Star Rail": path.join(__dirname, '../../songs/hsr.json'),
      "Honkai Impact": path.join(__dirname, '../../songs/hi3.json')
    };

    if (!songsPath[station]) {
      return interaction.editReply({ content: 'Station not found' });
    }

    const songFile = songsPath[station];
    const songs = JSON.parse(fs.readFileSync(songFile, 'utf8'));

    const player = await client.manager.createPlayer({
      guildId: interaction.guildId,
      voiceId: interaction.member.voice.channelId,
      textId: interaction.channelId,
      deaf: true,
    });

    const randomSongs = getRandomSongs(songs.words, 10); 

    for (const url of randomSongs) {
      const result = await player.search(url, { requester: interaction.user });
      if (result.tracks.length) {
        player.queue.add(result.tracks[0]);
      } else {
        console.log(`No result found for ${url}`);
      }
    }

    if (!player.playing && !player.paused) player.play();

    // Debugging loop setting
    try {
      await player.setLoop('queue'); 
      console.log('Queue loop has been set.');
    } catch (error) {
      console.error('Error setting queue loop:', error);
    }

    client.manager.on('playerEmpty', async (player) => {
      console.log('Queue is empty, restarting...');
      
      const shuffled = randomSongs.sort(() => 0.5 - Math.random());
      for (const url of shuffled) {
        const result = await player.search(url, { requester: interaction.user });
        if (result.tracks.length) {
          player.queue.add(result.tracks[0]);
        } else {
          console.log(`No result found for ${url}`);
        }
      }

      if (!player.playing && !player.paused) player.play();
      console.log('Queue restarted.');
    });

    const played = new MessageEmbed()
      .setColor("#6a8bf2")
      .setDescription(`<:notes:1269202879059595296> Successfully joined and bound to ${interaction.member.voice.channel}.`);

    await interaction.followUp({ embeds: [played] });
  },
};

/**
 * Fungsi untuk memilih beberapa lagu secara acak dari setiap album
 * @param {Object} albums - Objek berisi daftar album dan lagu
 * @param {number} count - Jumlah lagu yang ingin dipilih secara acak
 * @returns {Array} - Daftar URL lagu yang dipilih secara acak
 */
function getRandomSongs(albums, count) {
  let allTracks = [];
  for (const album in albums) {
    const tracks = albums[album];
    allTracks = allTracks.concat(tracks);
  }
  const shuffled = allTracks.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
