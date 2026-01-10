const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Información del bot'),

  async execute(interaction) {
    await interaction.reply({
      content: `🤖 Hola, soy **${interaction.client.user.username}**
Estoy viva y funcionando correctamente.`,
      ephemeral: false,
    });
  },
};