const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const db = require("../../schema/playlist");
module.exports = {
  name: 'stop',
  description: 'Leaves the voice channel',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  dj: true,
  player: false,
  inVoiceChannel: true,
  sameVoiceChannel: true,

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: false,
    });
    

    const emojiLeave = interaction.client.emoji.leave;


   const player = client.manager.players.get(interaction.guild.id); 
await player.destroy(interaction.guild.id);

await interaction.followUp({ embeds: [{
      color: '#6a8bf2',
      description: `<:stop:1269207969644413029> Successfully disconnected from ${interaction.member.voice.channel}
 `
    }]})
            

  

  },
};
