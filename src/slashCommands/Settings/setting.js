const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const db1 = require("../../schema/station.js");
const db2 = require('../../schema/mode.js');
module.exports = {
  name: "settings",
  description: "Shows the server settings",
  userPrams: ['MANAGE_GUILD'],
  botPrams: ['EMBED_LINKS'],
  dj: true,
  /**
      * @param {Client} client
      * @param {CommandInteraction} interaction
      */

  run: async (client, interaction, prefix) => {
    await interaction.deferReply({
    });


    let station;
    let mode;
const ress = await db1.findOne({ Guild: interaction.guildId });
    if (ress && ress.Radio) station = ress.Radio;

const res = await db2.findOne({ Guild: interaction.guildId });
    if (res && res.mode) mode = res.mode;


if(!ress){
  station = "DJ Mimo Radio (Default)"
}

    if(!res){
      mode = "None"
    }
    
    
const np = new MessageEmbed()
  .setAuthor({ name: `${client.user.username} Setting`, iconURL: client.user.displayAvatarURL(), url: `https://discord.gg/WjGxK2P8Ud` })
//                     .setDescription(`
// <:notes:1119915814733217843> **Playing Song:**
// <:blank:1120331253569302619><:next:1119915811415539722> **${song.title}**`)

      .addFields([
        {
          name: `<:radio:1269199728697020416> Radio Station`,
          value: `${station}`,
          inline: true,
        },
        {
          name: `<:gear:1269212388767436811> Radio Mode`,
          value: `${mode}`,
          inline: true,
        },
      ])
      .setColor(client.embedColor);


interaction.followUp({
  embeds: [np]
})

    
  }
}
