# Setting Up the OpenAI Agent for Your Portfolio

This document explains how to set up and configure the OpenAI-powered AI assistant for your portfolio website.

## Prerequisites

1. An OpenAI API key (Get one at https://platform.openai.com/api-keys)
2. Your Next.js project (already set up)

## Setup Instructions

### 1. Install the OpenAI package

```bash
npm install openai
# or
yarn add openai
```

### 2. Set up your environment variables

1. Create a `.env.local` file in the root of your project
2. Add your OpenAI API key:

```
OPENAI_API_KEY=your_openai_api_key_here
```

3. Optionally, specify a preferred model:

```
OPENAI_MODEL=gpt-4o
```

### 3. Customize the AI prompt (optional)

You can customize the information about yourself in the system prompt. Open `app/api/ai-chat/route.ts` and modify the `systemPrompt` variable to update your:

- Professional background
- Technical skills
- Projects
- Contact information
- Other personal/professional details

## How It Works

1. The Terminal component in your portfolio website allows visitors to chat with an AI assistant
2. Initial scripted commands introduce the assistant and provide basic information
3. After the scripted introduction, user messages are sent to the OpenAI API
4. The API returns AI-generated responses based on your professional information
5. These responses are displayed in the terminal interface

## Customization Options

### Changing the OpenAI Model

You can change the model by setting the `OPENAI_MODEL` environment variable. Some options include:

- `gpt-4o` (default, most capable)
- `gpt-3.5-turbo` (faster, less expensive)

### Adjusting Response Parameters

In `app/api/ai-chat/route.ts`, you can modify these parameters:

- `temperature`: Controls randomness (0.0-2.0, default 0.7)
- `max_tokens`: Controls maximum response length (default 600)

### Extending Functionality

You can extend the AI assistant's capabilities by:

1. Adding more context to the system prompt
2. Implementing conversation history for more coherent multi-turn conversations
3. Adding specialized commands that trigger specific responses or actions

## Troubleshooting

If you encounter issues:

1. Check that your API key is correct and has sufficient credits
2. Verify that the OpenAI package is installed correctly
3. Check the browser console and server logs for error messages
4. Ensure your environment variables are properly set

## Security Notes

- Keep your OpenAI API key secure and never expose it in client-side code
- The implementation uses server-side API routes to protect your credentials
- Consider rate limiting to prevent abuse of your API key 