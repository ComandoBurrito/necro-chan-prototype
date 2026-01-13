// src/events/messageCreate.js
const { Events } = require('discord.js');

module.exports = {
  name: Events.MessageCreate,
  once: false,

  async execute(message) {
    if (message.author.bot) return;

    if (message.content.toLowerCase() === 'hola') {
      await message.reply('🖤 Hola, soy Necro-Chan.');
    }
  }
};
