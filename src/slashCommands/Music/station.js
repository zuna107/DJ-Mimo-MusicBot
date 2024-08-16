const { MessageEmbed, MessageActionRow, MessageSelectMenu, CommandInteraction, Client } = require('discord.js');
const db = require("../../schema/autoReconnect");
const db1 = require('../../schema/station');
module.exports = {
    name: 'station',
    description: 'Changes the radio station/theme.',
    userPrams: [],
    botPrams: ['EMBED_LINKS'],
    player: false,
    dj: true,
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
  let station = "DJ Mimo Radio (Default)"
const ress = await db1.findOne({ Guild: interaction.guildId });
 if(ress) station = ress.Radio;
      
            let thing = new MessageEmbed()
                .setColor(client.embedColor)
                .setDescription(`<:radio:1269199728697020416> Current Station: **${station}**`)


 const row = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('station')
          .setMinValues(1)
          .setMaxValues(1)
          .setPlaceholder('DJ Mimo Radio Stations')
          .addOptions([
            {
              label: 'Genshin Impact',
              value: 'genshin',
              emoji: '🌠',
            },
            {
              label: ' Honkai: Star Rail',
              value: 'hsr',
              emoji: '🌌',
            },
            {
              label: 'Honkai Impact',
              value: 'hi3',
              emoji: '🌑',
            }
          ])
      )


       const row2 = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('dstation')
        .setDisabled(true)
          .setMinValues(1)
          .setMaxValues(1)
          .setPlaceholder('DJ Mimo Radio Stations')
          .addOptions([
            {
              label: 'Genshin Impact',
              value: 'genshin',
              emoji: '🌠',
            },
            {
              label: ' Honkai: Star Rail',
              value: 'hsr',
              emoji: '🌌',
            },
            {
              label: 'Honkai Impact',
              value: 'hi3',
              emoji: '🌑',
            }
          ])
      )
      
        const m =  await  interaction.followUp({ embeds: [thing], components: [row] })

    const collector = m.createMessageComponentCollector({
      filter: (i) => {
        if (i.user.id === interaction.user.id) return true;
        else {
          i.followUp({
            ephemeral: true,
            content: `Only **${interaction.user.tag}** can use this button, if you want then you've to run the command again.`,
          });
          return false;
        }
      },
      componentType: "SELECT_MENU",
      time: 20000,
      idle: 20000 / 2,
    });



collector.on('end', async () => {
      if (!m) return;
      return m.edit({ components: [row2] }).catch(() => { });
    });

      
      collector.on("collect", async i => {
      if (!i.deferred) i.deferUpdate();
      const options = i.values[0];
if (options === 'genshin') {
    
         let ani = new MessageEmbed()
                .setColor(client.embedColor)
                .setDescription(`<:radio:1269199728697020416> Current Station: **Genshin Impact** `)
  

 if (ress) {
      ress.oldradio = station;
      ress.Radio = "Genshin Impact";
      await ress.save()
              if (!m) return; 
  m.edit({
          embeds: [ani]
        });
    } else {
      const newData = new db1({
        Guild: interaction.guildId,
        Radio: "Genshin Impact",
        oldradio: station
      });
           if (!m) return; 
  m.edit({
          embeds: [ani]
        });
      await newData.save()
      
    }
  
      // const newData = new db1({
      //   Guild: interaction.guildId,
      //   Radio: "Genshin Impact",
      //   oldradio: "DJ Mimo Radio (Default)"
      // });
      // await newData.save()
  

      }

        if (options === 'hsr') {
    
         let slp = new MessageEmbed()
                .setColor(client.embedColor)
                .setDescription(`<:radio:1269199728697020416> Current Station: **Honkai: Star Rail** `)
  
               if (ress) {
      ress.oldradio = station;
      ress.Radio = "Honkai: Star Rail";
      await ress.save()
              if (!m) return; 
  m.edit({
          embeds: [slp]
        });
    } else {
      const newData = new db1({
        Guild: interaction.guildId,
        Radio: "Honkai: Star Rail",
        oldradio: station
      });
           if (!m) return; 
  m.edit({
          embeds: [slp]
        });
      await newData.save()
      
    }
        }

         if (options === 'hi3') {
    
         let sty = new MessageEmbed()
                .setColor(client.embedColor)
                .setDescription(`<:radio:1269199728697020416> Current Station: **Honkai Impact** `)
  
               if (ress) {
      ress.oldradio = station;
      ress.Radio = "Honkai Impact";
      await ress.save()
              if (!m) return; 
  m.edit({
          embeds: [sty]
        });
    } else {
      const newData = new db1({
        Guild: interaction.guildId,
        Radio: "Honkai Impact",
        oldradio: station
      });
           if (!m) return; 
  m.edit({
          embeds: [sty]
        });
      await newData.save()
      
    }
      }


        

      })



      
        }

    }
