import dotenv from 'dotenv';

const parsedEnv = dotenv.config().parsed;

export default {
  apps: [
    {
      name: 'necrochan',
      script: './src/index.js', // o donde arranca tu bot
      watch: false,
      env: parsedEnv, // Esto carga todo tu .env
    },
  ],
};
