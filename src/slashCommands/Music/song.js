const { CommandInteraction, Client, MessageEmbed, Permissions } = require('discord.js');
const { convertTime } = require('../../utils/convert.js');

const db = require("../../schema/playlist");
module.exports = {
  name: 'song',
  description: 'Show now playing song',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  player: true,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: false,
    });
    const player = client.manager.players.get(interaction.guild.id);
    const song = player.queue.current;
    if (!player.queue.current) {
      let thing = new MessageEmbed().setColor('RED').setDescription('There is no music playing.');
      return interaction.editReply({ embeds: [thing] });
    }

    const emojimusic = client.emoji.music;

    const np = new MessageEmbed()
      .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL(), url: `https://discord.gg/WjGxK2P8Ud` })
      .setDescription(`<:notes:1269202879059595296> **Playing Song:**\n<:next:1269204315902312458> **${song.title}**`)
      .addFields([
        {
          name: `${player.queue.current.author}`,
          value: `<:sp:1269208821767868417> **[Spotify](${song.uri})**`,
          inline: true,
        },
      ])
      .setColor(client.embedColor);

    await interaction.editReply({ embeds: [np] });
  },
};
