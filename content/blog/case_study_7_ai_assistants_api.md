---
title: "Orchestrating Specialized Agents: A Deep Dive into the OpenAI Assistants API"
category: "AI Engineering"
tags: ["OpenAI Assistants API", "State Management", "Microservices", "AdonisJS"]
---

# Orchestrating Specialized Agents: A Deep Dive into the OpenAI Assistants API

## The Problem: One Brain vs. Team of Experts

Initially, we tried to make one generic "System Prompt" handle everything in **Let Me Do It**: cooking, pricing, emotional support, and scheduling.
The result? A "Jack of all trades, master of none."
*   The "Pricing" logic would get confused by "Emotional" context.
*   The "Meal Planner" would forget to output JSON because it was too busy being conversational.

We needed specialized agents, but managing the conversation history ("Threads") for multiple agents is complex.

## The Solution: The Assistants API & Asynchronous Polling

We migrated from the standard Chat Completion API to the **OpenAI Assistants API**, which introduces the concept of persistent **Threads** and specialized **Assistants**.

### Architecture: The Manager Pattern

We built a central service that acts as a dispatcher.

#### 1. Specialized Assistants
We defined specific assistants in the OpenAI dashboard, each with its own instructions and tools:
*   **Meal Assistant**: "You are a chef. Output JSON recipes."
*   **Price Assistant**: "You are a grocer. Estimate costs for these ingredients."
*   **General Assistant**: "You are a supportive friend."

#### 2. Dynamic Dispatch
When a request comes in, the service checks the `category` (determined by the Intent Classifier) and routes it to the correct ID.

```javascript
// Routing Logic
function routeRequest(userIntent) {
  if (userIntent === 'meal_planning') {
    return MEAL_ASSISTANT_ID;
  } else if (userIntent === 'pricing') {
    return PRICE_ASSISTANT_ID;
  } else {
    return GENERAL_ASSISTANT_ID;
  }
}
```

#### 3. Handling Async "Runs"
Unlike the Chat API, the Assistants API is asynchronous. You create a "Run" and then must poll for completion.
We implemented a robust state-handler that manages the lifecycle:
*   `queued` / `in_progress`: Return a "Curating response..." status to the frontend.
*   `completed`: Fetch the new messages.
*   `failed`: Handle errors gracefully.

#### 4. Extracting Structured Data
Since LLMs love to chat, even when asked for JSON they often wrap it in Markdown (```json ... ```).
We built a parser that specifically hunts for these markdown blocks and extracts the pure JSON payload. This ensures that even if the AI adds a friendly preamble like "Here is your recipe:", our code ignores the fluff and grabs the data needed to render the UI widgets.

## Outcome

This architecture allowed us to:
1.  **Maintain Context**: The `Thread` object keeps the history, regardless of which "Assistant" jumps in to help.
2.  **Improve Quality**: The "Meal Assistant" is significantly better at recipes because its system prompt is hyper-focused.
3.  **Simplify Frontend**: The client just sends a `threadId` and a message; the backend handles the complex orchestration of *who* answers.
