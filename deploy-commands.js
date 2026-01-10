console.log('🚨 DEPLOY COMMANDS CORRECTO 🚨');
require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');


const commands = [];
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

//for (const file of commandFiles) {
//  const command = require(`./src/commands/${file}`);
//  commands.push(command.data.toJSON());
//}

for (const file of commandFiles) {
  const command = require(`./src/commands/${file}`);

  if (!command.data || typeof command.data.toJSON !== 'function') {
    console.error(`❌ ERROR en comando: ${file}`);
    console.error(command);
    continue;
  }

  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('⏳ Registrando comandos...');

    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands },
    );

    console.log('✅ Comandos registrados correctamente!');
  } catch (error) {
    console.error(error);
  }
})();



