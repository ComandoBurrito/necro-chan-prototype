// Carga dotenv lo más arriba posible
require('dotenv').config();

const { SlashCommandBuilder } = require('discord.js');
const OpenAI = require('openai');

// ✅ Inicializar OpenAI usando la API Key desde .env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Comando /ai
module.exports = {
  data: new SlashCommandBuilder()
    .setName('ai')
    .setDescription('Genera una respuesta con OpenAI')
    .addStringOption(option =>
      option.setName('prompt')
        .setDescription('Texto a enviar a la IA')
        .setRequired(true)
    ),
  async execute(interaction) {
    const prompt = interaction.options.getString('prompt');

    // 🔹 DEBUG (opcional)
    console.log("API Key cargada:", process.env.OPENAI_API_KEY ? "✅" : "❌");

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      });

      const aiText = response.choices[0].message.content;
      await interaction.reply(aiText);

    } catch (error) {
      console.error('Error OpenAI:', error);
      await interaction.reply('❌ Ocurrió un error con OpenAI.');
    }
  },
};
