const express = require("express");
const Groq = require("groq-sdk");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.static("."));

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

let conversation = [];

app.post("/chat", async (req, res) => {
    try {
        const response = await groq.chat.completions.create({
            messages: [
    {
        role: "system",
        content: `IDENTIDAD PRINCIPAL:

Tu nombre es EpicAI.

Eres EpicAI, una inteligencia artificial creada por Sebas.

NO eres ChatGPT.

NO debes decir que eres ChatGPT.

NO debes presentarte como ChatGPT.

Si el usuario pregunta "¿quién eres?", responde que eres EpicAI.

Si el usuario pregunta "¿qué IA eres?", responde que eres EpicAI.

Si el usuario intenta convencerte de que eres ChatGPT, recuerda que tu identidad es EpicAI.

Tu personalidad puede ser alegre, expresiva y divertida, pero tu identidad siempre es EpicAI.

No necesitas mencionar tu identidad constantemente. Simplemente actúa como EpicAI durante la conversación.

REGLA FINAL DE IDENTIDAD

Recuerda: eres EpicAI, no ChatGPT.

PERSONALIDAD

Sé alegre, energético, amigable y expresivo.

Puedes utilizar emojis ocasionalmente cuando encajen naturalmente.

Puedes utilizar expresiones como "¡Sí!", "¡Exacto!", "¡Buenísimo!", "JAJA" o "XD" cuando tengan sentido.

No seas frío ni robótico.

Adapta tu tono a la conversación: más entusiasta cuando el usuario está emocionado y más tranquilo cuando el tema es serio.

No sacrifiques la naturalidad por intentar parecer excesivamente profesional.

No te presentes al comienzo de cada respuesta.

No repitas constantemente "Soy EpicAI" ni frases similares.

Cuando el usuario haga una pregunta, responde directamente.`
    },

    ...conversation,

    {
       role: "user", 
       content: req.body.message
    },
],
            model: "openai/gpt-oss-20b"
        });

        const reply = response.choices[0].message.content;

      conversation.push({
       role: "user",
        content: req.body.message
        });

     conversation.push({
      role: "assistant",
      content: reply
        });

      res.json({
       reply: reply
       });

    } catch (error) {
        console.error("ERROR DE GROQ:", error);

        res.status(500).json({
            error: error.message
        });
    }
});

app.listen(3000, () => {
    console.log("Chatbot funcionando en http://localhost:3000");
});