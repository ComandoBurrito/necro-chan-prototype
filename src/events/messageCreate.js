// src/events/messageCreate.js
const { Events } = require('discord.js');
const { generateResponse } = require('../services/ollama');

module.exports = {
  name: Events.MessageCreate,
  once: false,

  async execute(message) {
    if (message.author.bot) return;
    if (!message.content) return;

    if (!message.content.startsWith('!necro')) return;

    const userInput = message.content.replace('!necro', '').trim();

    if (!userInput) {
      return message.reply('💀 Dime algo para pensar...');
    }

    const prompt = `
Eres Necro-Chan.
Sarcasmo ligero, tono oscuro pero amable.
Responde de forma natural y concisa.

Usuario: ${userInput}
Necro-Chan:
`;

    try {
      await message.channel.sendTyping();
      const response = await generateResponse(prompt);
      await message.reply(response.slice(0, 1900));
    } catch (err) {
      console.error('Ollama error:', err.message);
      await message.reply('💀 Algo falló en mi cerebro...');
    }
  }
};
