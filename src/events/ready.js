module.exports = {
  name: 'clientReady', // cambia el nombre Discord.js v15
  once: true,
  execute(client) {
    console.log(`🤖 Bot conectado como ${client.user.tag}`);
  },
};