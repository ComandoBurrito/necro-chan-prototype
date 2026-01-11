module.exports = {
  apps: [
    {
      name: "necrochan",
      script: "./src/index.js", // o donde arranca tu bot
      watch: false,
      env: require('dotenv').config().parsed // Esto carga todo tu .env
    }
  ]
};
