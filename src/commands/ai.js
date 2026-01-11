const { SlashCommandBuilder } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY
}));

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ai')
    .setDescription('Responde usando OpenAI')
    .addStringOption(option => 
      option.setName('prompt')
        .setDescription('Escribe tu mensaje para la IA')
        .setRequired(true)
    ),

  async execute(interaction) {
    const prompt = interaction.options.getString('prompt');
    console.log(`Usuario ${interaction.user.tag} usó /ai: ${prompt}`);

    try {
      const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }]
      });

      const reply = response.data.choices[0].message.content;
      console.log(`Respuesta de OpenAI: ${reply}`);

      await interaction.reply(reply);
    } catch (err) {
      console.error(err);
      await interaction.reply('⚠️ Hubo un error procesando tu solicitud.');
    }
  }
};
