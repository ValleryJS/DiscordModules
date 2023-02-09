const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, Collection, Intents, message, channel, interaction} = require('discord.js');
const fs = require('fs');
const { MessageActionRow, MessageButton, MessageSelectMenu, MessageEmbed } = require('discord.js');
const translate = require('@iamtraction/google-translate');

module.exports = {
	data: new SlashCommandBuilder()
        .setName('translate')
        .setDescription('Translate Text To Any Language')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('Text to translate')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('language')
                .setDescription('The Language you want to translate to.')
                .setRequired(true)
                .addChoices(
                    //4      !! DONT GO OVER 25 OR IT BREAKS FIND A SOLUTION TO HAVE ALL THE LANGUAGES IN A CHOICE
                    { name: 'Czech', value: 'cs'},
                    { name: 'Dutch', value: 'nl' },
                    { name: 'Danish', value: 'da'},
                    { name: 'English', value: 'en'},
                    { name: 'French', value: 'fr'},
                    { name: 'German', value: 'de'},
                    { name: 'Italian', value: 'it'},
                    { name: 'Norwegian', value: 'no'},
                    { name: 'Russian', value: 'ru'},
                    { name: 'Swedish', value: 'sv'},
                    { name: 'Turkish', value: 'tr'},
                    { name: 'Polish', value: 'pl'}            
                ))
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user you are having a conversation with.')
                .setRequired(false)),

    async execute(interaction) {
        const text = interaction.options.getString('text');
        const language = interaction.options.getString('language');
        const user = interaction.options.getUser('user');

        if (user == null) {
            translate(text, { to: language })
                .then(response => interaction.reply({ content: `${response.text}` }))
                .catch(err => {
                    console.error(err);
                });
        } else {
            translate(text, { to: language })
                .then(response => interaction.reply({ content: `${user}\n${response.text}` }))
                .catch(err => {
                    console.error(err);
                });
        }




    }
}
