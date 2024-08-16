const { MessageEmbed, CommandInteraction, Client } = require('discord.js');

module.exports = {
  name: 'help',
  description: `Show DJ Mimo Radio's help menu.`,
  userPrams: [],
  botPrams: ['EMBED_LINKS'],

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction) => {
    const prefix = client.prefix;

    await interaction.deferReply({
      ephemeral: false,
    });

    const embed = new MessageEmbed()
      .setColor(`#6a8bf2`)
      .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL(), url: `https://discord.gg/WjGxK2P8Ud` })
      .setDescription(`<:notes:1269202879059595296> **Music:**\n\n<:next:1269204315902312458> **/play:** Joins your voice channel and starts playing 24/7.\n<:stop:1269207969644413029> **/stop:** Leaves the voice channel.\n<:dvd:1269203617517142069> **/song:** Shows the current playing song.\n<:radio:1269199728697020416> **/station:** Changes the radio station/theme.\n\n<:gear:1269212388767436811> **Config:**\n\n<:mode:1269189245202075708> **/mode:** Switches between radio modes.\n<:dj:1269191766490484816> **/djrole:** Sets which roles are considered DJs.\n<:gear:1269212388767436811> **/settings:** Shows and configures server settings.`);

    await interaction.followUp({ embeds: [embed] });
  },
};
