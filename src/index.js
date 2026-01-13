// ---------- ENV ----------
require('dotenv').config();

// ---------- DEPENDENCIAS ----------
const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, Events } = require('discord.js');

// ---------- CLIENTE DISCORD ----------
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ]
});

// ---------- MAPA DE COMANDOS ----------
client.commands = new Map();

// ---------- CARGAR COMANDOS ----------
const commandsPath = path.join(__dirname, 'commands');

if (fs.existsSync(commandsPath)) {
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));

    if (!command?.data?.name || !command?.execute) {
      console.warn(`⚠️ Comando inválido ignorado: ${file}`);
      continue;
    }

    client.commands.set(command.data.name, command);
  }
}

console.log('📦 Comandos cargados:', [...client.commands.keys()]);

// ---------- CARGAR EVENTOS ----------
const eventsPath = path.join(__dirname, 'events');

if (fs.existsSync(eventsPath)) {
  const eventFiles = fs
    .readdirSync(eventsPath)
    .filter(file => file.endsWith('.js'));

  for (const file of eventFiles) {
    const event = require(path.join(eventsPath, file));

    if (!event?.name || !event?.execute) {
      console.warn(`⚠️ Evento inválido ignorado: ${file}`);
      continue;
    }

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
}

// ---------- READY ----------
client.once(Events.ClientReady, () => {
  console.log(`🤖 Necro-Chan conectada como ${client.user.tag}`);
});

// ---------- LOGIN ----------
if (!process.env.DISCORD_TOKEN) {
  console.error('❌ DISCORD_TOKEN no definido en .env');
  process.exit(1);
}

client.login(process.env.DISCORD_TOKEN)
  .catch(err => {
    console.error('❌ Error al iniciar sesión:', err);
    process.exit(1);
  });
