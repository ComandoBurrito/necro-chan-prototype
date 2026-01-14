import { SlashCommandBuilder } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Información del bot'),

  async execute(interaction) {
    await interaction.reply({
      content: `🤖 Hola, soy **${interaction.client.user.username}**\nEstoy viva y funcionando correctamente.`,
      ephemeral: false,
    });
  },
};