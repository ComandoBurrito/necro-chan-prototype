import axios from 'axios';

const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434';
const MODEL = process.env.OLLAMA_MODEL || 'necro-chan-alpha:latest';

export async function generateResponse(prompt) {
  try {
    const res = await axios.post(`${OLLAMA_HOST}/api/generate`, {
      model: MODEL,
      prompt,
      stream: false,
    });

    if (res.data?.completion) {
      return res.data.completion;
    }

    return '💀 No recibí respuesta del cerebro de Necro-Chan...';
  } catch (err) {
    console.error('Ollama request error:', err.message);
    throw err;
  }
}
