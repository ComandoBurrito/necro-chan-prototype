import axios from "axios";

const ollama = axios.create({
  baseURL: process.env.OLLAMA_BASE_URL,
  timeout: 120000,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function generateResponse(prompt) {
  const res = await ollama.post("/api/generate", {
    model: process.env.OLLAMA_MODEL,
    prompt,
    stream: false,
  });

  return res.data.response;
}