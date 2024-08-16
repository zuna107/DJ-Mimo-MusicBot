const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const db = require("../../schema/dj");

module.exports = {
    name: "djmode-remove",
    description: "Delete Dj role.",
    userPrams: ['ADMINISTRATOR'],
    botPrams: ['MANAGE_GUILD'],
    /**
    * @param {Client} client
    * @param {CommandInteraction} interaction
    */

    run: async (client, interaction, prefix) => {

        await interaction.deferReply({
            ephemeral: false
        });

        let data = await db.findOne({ Guild: interaction.guildId });
        if (data) {

const thing = new MessageEmbed()
  .setAuthor({ name: `${client.user.username} - DJRoles`, iconURL: client.user.displayAvatarURL(), url: `https://discord.gg/WjGxK2P8Ud` })
.setDescription(`
<:dj:1269191766490484816> **Successfully removed all DJ roles in this server**\n<:star:1119915839064379472> **/djmode add** To add djroles for lo-fi radio.
`)
.setColor(client.embedColor);


      

          
            await data.delete()
            return interaction.editReply({ embeds: [thing] })
        } else {
           const things =  new MessageEmbed().setAuthor({ name: `${client.user.username} - DJRoles`, iconURL: client.user.displayAvatarURL(), url: `https://discord.gg/WjGxK2P8Ud` })
.setDescription(`<:dj:1269191766490484816> **Please setup Dj roles first for this server** \n<:star:1119915839064379472> **/djmode add** To add djroles for lo-fi radio.`)
.setColor(client.embedColor)
          return interaction.editReply({ embeds: [things] })
        }
    }
}