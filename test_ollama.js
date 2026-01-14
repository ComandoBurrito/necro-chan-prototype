import { exec } from "child_process";

const prompt = "Hola Necro-Chan, dime algo divertido sobre música y programación.";
const model = "necro-chan-alpha:latest";

exec(`ollama run ${model} "${prompt}"`, (error, stdout, stderr) => {
  if (error) {
    console.error("Error ejecutando Ollama:", error);
    return;
  }
  if (stderr) {
    console.error("stderr:", stderr);
    return;
  }
  console.log(stdout);
});
