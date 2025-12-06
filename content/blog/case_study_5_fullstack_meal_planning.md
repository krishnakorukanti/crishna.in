---
title: "Bridging the Gap: AI-Powered Meal Planning from Request to Grocery List"
category: "Full Stack"
tags: ["AI", "Product Engineering", "Integration", "Meal Planning"]
---

# Bridging the Gap: AI-Powered Meal Planning from Request to Grocery List

## The Problem: Cognitive Load in Cooking

For many people, especially those with cognitive disabilities, "cooking dinner" isn't one task. It's a mountain of executive function challenges:
1.  Decide what to eat (Decision Paralysis).
2.  Check what ingredients you have.
3.  Make a list.
4.  Understand the recipe instructions.

We wanted to collapse this entire stack into a single interaction: *"Help me cook something with chicken."*

## The Solution: A Multi-Stage AI Pipeline

We built an end-to-end pipeline connecting **Intent Detection**, **Generative AI**, and **Structured Data**.

### Step 1: Intent Detection (The Router)

When a user types into the chat, we don't just send it to GPT-4. First, a lightweight model classifies the *Intent*.
*   Is this a general chat? -> Route to Chat Bot.
*   Is this about food? -> Route to **MealPlannerJob**.

This ensures we use the right "tool" for the job and allows us to trigger specific flows.

### Step 2: Structured Recipe Generation (JSON Mode)

If the intent is "Meal Plan," we prompt the AI to return **JSON**, not text. This is critical. We can't build a UI from a paragraph of text.

**The Strategy:**
We instruct the model to act as a "Culinary Assistant" and enforce a strict schema output. This schema includes not just the text, but metadata like "Complexity Level," "Estimated Cost," and "Tools Needed."

```json
{
  "title": "Simple Roast Chicken",
  "ingredients": [ ... ],
  "steps": [
    { "instruction": "Preheat oven", "complexity": "low" }
  ]
}
```

### Step 3: Visual Reinforcement (Image Gen)

Text isn't enough for everyone. Once we parse the JSON, we trigger an image generation task (using DALL-E 3) to create a visual representation of the *finished dish* to get the user excited and oriented.

### Step 4: The "Gap" - Pricing & Shopping

The AI gives us ingredients, but not real-world data. We integrated a custom **Price Estimation Service**.
*   It maps generic terms ("1 onion") to local average prices.
*   It checks the user's "Pantry" (stored in DB) to subtract items they already own.
*   It generates a final **Shopping List** with a budget estimate.

### Step 5: The Frontend Experience

The mobile app receives this synthesized package.
1.  **Approval**: User sees the photo and price estimate. "Looks good!"
2.  **Shopping Mode**: App acts as a checklist.
3.  **Cooking Mode**: App switches to a "Step-by-Step" view (using the dynamic engine described in our Mobile Case Study), showing one instruction at a time to prevent overwhelm.

## Outcome

We successfully automated the "Executive Function" required for cooking. The user provides the *desire* ("Chicken"), and the system handles the *logistics* (Plan -> List -> Guide). This empowers users to live more independently.
