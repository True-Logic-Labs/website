import { ChatOpenAI } from "@langchain/openai";

const apiKey = import.meta.env.OPENAI_API_KEY;

export class AIAgent
{
  constructor(name, prompt) {
    this.name = name;
    this.prompt = prompt;
  }
async callAPI ( message )
{
    try {
        let model = new ChatOpenAI({ temperature: 0.7, apiKey, modelName: "gpt-4o-mini", });
        let response = await model.invoke(message);
        return response
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
        });
    }
}
}

const API_URL = "https://api.openai.com/v1";

export class AIAgentDirect
{
  constructor(name, prompt) {
    this.name = name;
    this.prompt = prompt;
  }

  async callAPI(message, options = {}) {
    const {
      modelName = "gpt-4o-mini",
      temperature = 0.7,
      responseFormat = "text"
    } = options;

    try {
      // Handle DALL-E
      if (modelName.includes("dall-e-3")) {
        const response = await fetch(`${API_URL}/images/generations`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: modelName,
            prompt: message,
            n: 1,
            size: "1024x1024",
            response_format: "url"
          })
        });
        return (await response.json()).data;
      }

      // Handle chat completions
      const response = await fetch(`${API_URL}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: modelName,
          messages: [{ role: "user", content: message }],
          temperature
        })
      });
      
      return (await response.json()).choices[0].message.content;

    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }
}