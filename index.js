import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(express.json());

// ---- Azure OpenAI client ----
const client = new OpenAI({
  baseURL: "https://prompt-optimiser-openai.openai.azure.com/openai/v1",
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  defaultHeaders: {
    "api-key": process.env.AZURE_OPENAI_API_KEY
  }
});

// ---- Health check ----
app.get("/", (req, res) => {
  res.send("Prompt Optimiser API running");
});

// ---- Optimise endpoint ----
app.post("/optimise", async (req, res) => {
  try {
    const { optimiserPrompt } = req.body;

    if (!optimiserPrompt) {
      return res.status(400).json({
        error: "optimiserPrompt is required"
      });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini", // DEPLOYMENT NAME
      messages: [
        {
          role: "system",
          content:
            "You are a prompt optimisation engine. Rewrite the user's prompt to be clearer, more specific, and higher quality. Do NOT answer the prompt."
        },
        {
          role: "user",
          content: optimiserPrompt
        }
      ],
      temperature: 0.2,
      max_tokens: 300
    });

    res.json({
      optimisedPrompt: completion.choices[0].message.content
    });
  } catch (err) {
    console.error("Azure OpenAI error:", err);
    res.status(500).json({
      error: err.message || "Azure OpenAI call failed"
    });
  }
});

// ---- Start server ----
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Local API running on http://localhost:${PORT}`);
});
