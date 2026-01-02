# Prompt Optimiser API

An Express.js API that optimizes prompts using Azure OpenAI.

## Setup

1. Install dependencies: `npm install`
2. Create `.env` file with your `AZURE_OPENAI_API_KEY`
3. Run: `npm run dev`

## API Endpoints

- `GET /` - Health check
- `POST /optimise` - Optimize a prompt
  ```json
  {
    "optimiserPrompt": "your prompt here"
  }
  ```

## Deploy

Push to GitHub and deploy via:
- [Railway.app](https://railway.app)
- [Render.com](https://render.com)
- [Azure App Service](https://azure.microsoft.com/services/app-service/)
- [Vercel](https://vercel.com)

Add `AZURE_OPENAI_API_KEY` as an environment variable on your chosen platform.
