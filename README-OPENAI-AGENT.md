# OpenAI-Powered AI Assistant for Your Portfolio Website

This implementation adds a powerful, dynamic AI assistant to your portfolio website, allowing visitors to have natural conversations about your background, skills, and projects.

## What's Included

1. **OpenAI API Integration**: Backend API route to securely communicate with OpenAI
2. **Conversation History Management**: Maintains context for more coherent multi-turn conversations
3. **Hybrid Approach**: Uses both scripted responses and dynamic AI-generated content
4. **Special Commands**: Support for `clear`, `save`, and other useful utility commands
5. **Customizable System Prompt**: Detailed information about your background tailored to your profile
6. **Markdown & Formatting Support**: AI responses can include rich text formatting
7. **Downloadable Conversations**: Users can save their conversations as text files

## Features

### 1. Natural Language Understanding
The AI can understand and respond to a wide variety of questions about your background, skills, projects, and more using OpenAI's advanced language models.

### 2. Contextual Memory
The implementation maintains conversation history, allowing the AI to reference previous messages and provide more coherent responses.

### 3. Special Commands
- `clear` - Clears the conversation history
- `save` - Downloads the conversation as a text file
- Additional commands like `help`, `background`, `skills`, etc.

### 4. Security & Privacy
- API key is securely stored in environment variables
- All API calls are made server-side to protect your credentials
- No user data is stored beyond the current session

### 5. Performance Optimizations
- Minimal dependencies and efficient code
- Response caching options
- Conversation context limits to prevent token overflow

## Implementation Details

### Files Created/Modified:
- `app/api/ai-chat/route.ts` - API endpoint for OpenAI integration
- `app/Terminal.tsx` - Enhanced terminal with OpenAI integration
- `.env.local.example` - Example environment configuration
- Documentation files

### Technical Architecture:
1. User inputs a question in the terminal interface
2. Frontend collects this input and any conversation history
3. Data is sent to the backend API route
4. Backend securely communicates with OpenAI API
5. OpenAI generates a response based on your custom system prompt
6. Response is returned to the frontend and displayed to the user
7. Conversation history is updated for context in future exchanges

## Getting Started

1. Copy `.env.local.example` to `.env.local` and add your OpenAI API key
2. Install the OpenAI package with `npm install openai` or `yarn add openai`
3. Restart your development server
4. Test the integration by asking questions in the terminal interface

## Customization Options

You can customize various aspects of the AI assistant:

- **System Prompt**: Edit the information about your background in `app/api/ai-chat/route.ts`
- **AI Model**: Change the model type in environment variables or API code
- **Response Parameters**: Adjust temperature, max tokens, etc. in the API route
- **UI/UX**: Modify the terminal interface in `app/Terminal.tsx`
- **Commands**: Add or modify special commands in the handleSubmit function

## Future Enhancements

Potential improvements you might consider:

1. **Rate Limiting**: Add rate limiting to prevent abuse of your API key
2. **Specialized Endpoints**: Create dedicated endpoints for specific types of information
3. **Analytics**: Track which questions are most common to improve your portfolio
4. **Multi-modal Responses**: Incorporate images or other media in AI responses
5. **Voice Interface**: Add speech recognition and text-to-speech capabilities

## Troubleshooting

If you encounter issues:

1. Check your OpenAI API key and subscription status
2. Verify environment variables are properly configured
3. Look for error messages in the browser console or server logs
4. Test the API endpoint directly using a tool like Postman
5. Ensure your OpenAI account has available credits 