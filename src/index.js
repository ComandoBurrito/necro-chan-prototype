// --- Cargar los comandos desde la carpeta src/commands ---
require('dotenv').config();
console.log("DEBUG - OPENAI_API_KEY:", process.env.OPENAI_API_KEY ? "✅" : "❌");

const fs = require('fs');        // ya lo tienes
const path = require('path');    // <--- ESTA LÍNEA FALTABA
const { Client, GatewayIntentBits, Events } = require('discord.js');

//Crear el cliente de Discord
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ]
});

// --- Aquí creas el "mapa" de comandos ---
client.commands = new Map();

// --- Cargar los comandos automáticamente ---
const commandsPath = path.join(__dirname, 'commands'); // carpeta src/commands si tus comandos están ahí
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  client.commands.set(command.data.name, command);
}

console.log('📦 Comandos cargados:', [...client.commands.keys()]);

//---------- CARGAR EVENTOS AUTOMATICAMENTE ----------
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js')); 

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);

    if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.once(Events.ClientReady, () => {
  console.log(`🤖 Bot conectado correctamente`);
});

// ---------- LOGIN DEL BOT ----------
client.login(process.env.DISCORD_TOKEN)
  .catch(err => console.error('ERROR LOGIN:', err));
