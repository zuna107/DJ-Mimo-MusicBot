const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const db = require("../../schema/dj");

module.exports = {
    name: "djmode-add",
    description: "Setup DJ role.",
    userPrams: ['ADMINISTRATOR'],
    botPrams: ['MANAGE_GUILD'],
    options: [
        {
            name: "role",
            description: "Mention a Role.",
            required: true,
            type: "ROLE"
        }
    ],
    /**
    * @param {Client} client
    * @param {CommandInteraction} interaction
    */
    run: async (client, interaction, prefix) => {
        await interaction.deferReply({ ephemeral: false });

        const role = interaction.options.getRole('role').id;
        let data = await db.findOne({ Guild: interaction.guildId });

        if (!data) {
            // Create new entry if none exists
            data = new db({
                Guild: interaction.guildId,
                Roles: [role],
                Mode: true
            });
            await data.save();

            const embed = new MessageEmbed()
                .setAuthor({ name: `${client.user.username} - DJRoles`, iconURL: client.user.displayAvatarURL(), url: `https://discord.gg/WjGxK2P8Ud` })
                .setDescription(`<:dj:1269191766490484816> **Successfully added DJ Role in this server**\n<:star:1119915839064379472> **Role:** <@&${role}>.`)
                .setColor(client.embedColor);
                
            return await interaction.editReply({ embeds: [embed] });
        } else {
            // Check if role already exists
            if (data.Roles.includes(role)) {
                const embed = new MessageEmbed()
                    .setAuthor({ name: `${client.user.username} - DJRoles`, iconURL: client.user.displayAvatarURL(), url: `https://discord.gg/WjGxK2P8Ud` })
                    .setDescription(`<:dj:1269191766490484816> **Role already exists in this server**\n<:star:1119915839064379472> **Role:** <@&${role}>.`)
                    .setColor(client.embedColor);
                    
                return await interaction.editReply({ embeds: [embed] });
            }

            // Add new role
            data.Roles.push(role);
            await data.save();

            const embed = new MessageEmbed()
                .setAuthor({ name: `${client.user.username} - DJRoles`, iconURL: client.user.displayAvatarURL(), url: `https://discord.gg/WjGxK2P8Ud` })
                .setDescription(`<:dj:1269191766490484816> **Successfully added DJ Role in this server**\n<:star:1119915839064379472> **Role:** <@&${role}>.`)
                .setColor(client.embedColor);

            return await interaction.editReply({ embeds: [embed] });
        }
    }
}
