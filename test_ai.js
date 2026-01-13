require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function testAI() {
  const necroPersonalityPrompt = `
    Eres Necro-Chan, una IA sarcástica, divertida y ligeramente caótica. 
    Responde siempre con humor y estilo irreverente, pero sé clara y concisa.
  `;

  const prompt = `${necroPersonalityPrompt}\nUsuario: Hola Necro-Chan, ¿cómo estás hoy?`;

  console.log("DEBUG - Prompt:", prompt);

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
      max_tokens: 200,
    });

    const aiText = response.choices?.[0]?.message?.content || "❌ No se recibió texto";
    console.log("Respuesta IA:", aiText);

  } catch (err) {
    console.error("❌ Error OpenAI:", err);
  }
}

testAI();
