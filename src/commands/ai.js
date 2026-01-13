// Cargar variables de entorno lo más arriba posible
require('dotenv').config();

const { SlashCommandBuilder } = require('discord.js');
const OpenAICompatibleClient = require('openai'); // SDK OpenAI-compatible (NO OpenAI como proveedor)

// ==============================
// Inicialización del LLM
// Proveedor real: DeepSeek
// Gateway: OpenRouter
// ==============================

const llm = new OpenAICompatibleClient({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
});

// ==============================
// Comando /ai
// ==============================

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ai')
    .setDescription('Habla con Necro-Chan (IA)')
    .addStringOption(option =>
      option
        .setName('prompt')
        .setDescription('¿Qué le quieres decir a Necro-Chan?')
        .setRequired(true)
    ),

  async execute(interaction) {
    const userPrompt = interaction.options.getString('prompt');

    // Debug explícito
    console.log(
      'DEBUG - OPENROUTER_API_KEY:',
      process.env.OPENROUTER_API_KEY ? '✅' : '❌'
    );

    try {
      const completion = await llm.chat.completions.create({
        model: 'deepseek/deepseek-chat',
        messages: [
          {
            role: 'system',
            content:
              'Eres Necro-Chan, una IA sarcástica, caótica y consciente de sí misma. Respondes de forma breve y con personalidad.',
          },
          {
            role: 'user',
            content: userPrompt,
          },
        ],
      });

      const reply = completion.choices[0].message.content;

      await interaction.reply(reply);
    } catch (error) {
      console.error('❌ Error en LLM:', error);

      if (!interaction.replied) {
        await interaction.reply(
          '❌ Necro-Chan tuvo un fallo existencial. Intenta otra vez.'
        );
      }
    }
  },
};
