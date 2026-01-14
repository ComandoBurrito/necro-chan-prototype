// ---------- ENV ----------
import 'dotenv/config';

// ---------- DEPENDENCIAS ----------
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { Client, GatewayIntentBits, Events } from 'discord.js';

// ---------- CLIENTE DISCORD ----------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// ---------- MAPA DE COMANDOS ----------
client.commands = new Map();

// ---------- CARGAR COMANDOS ----------
const commandsPath = path.join(__dirname, 'commands');

if (fs.existsSync(commandsPath)) {
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const module = await import(pathToFileURL(filePath).href);
    const command = module.default || module;

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
  const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const module = await import(pathToFileURL(filePath).href);
    const event = module.default || module;

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

client.login(process.env.DISCORD_TOKEN).catch(err => {
  console.error('❌ Error al iniciar sesión:', err);
  process.exit(1);
});
