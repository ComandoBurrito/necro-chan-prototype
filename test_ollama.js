import { exec } from "child_process";

function runOllama(prompt) {
  return new Promise((resolve, reject) => {
    exec(`ollama run necro-chan-alpha:latest "${prompt}"`, (error, stdout, stderr) => {
      if (error) return reject(error);
      if (stderr) console.error(stderr);
      resolve(stdout);
    });
  });
}

async function main() {
  try {
    const respuesta = await runOllama("Hola, ¿puedes decir algo rápido?");
    console.log("Respuesta del modelo:", respuesta);
  } catch (err) {
    console.error("Error ejecutando Ollama:", err);
  }
}

main();
