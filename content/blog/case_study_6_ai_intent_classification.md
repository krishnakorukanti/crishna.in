---
title: "Beyond Keywords: Building a Multi-Strategy Intent Classification System"
category: "AI Engineering"
tags: ["NLP", "Classification", "Embeddings", "Backend"]
---

# Beyond Keywords: Building a Multi-Strategy Intent Classification System

## The Problem: "I'm torn between two options..."

In the early days of **Let Me Do It**, we routed user requests using simple keyword matching.
*   If message contains "cook" -> Meal Planner.
*   If message contains "help" -> General Assistant.

This broke down quickly. Users talk naturally, not in commands.
*   *"I'm torn between these two jobs"* contains neither keyword but is clearly a **Decision**.
*   *"I don't know what to eat"* is a meal request but doesn't say "cook".

We needed a way to classify the *Intent* of a message with high precision, without training a massive custom model.

## The Solution: Weighted Multi-Strategy Classification

We built a composite classifier that doesn't rely on a single signal. Instead, it aggregates four different analysis methods to produce a confidence score.

### The 4 Strategies

1.  **Semantic Similarity (Weight: 40%)**
    We compare the vector embedding of the user's message against a library of known "Decision Making" or "Meal Planning" prototypes.
    *   *Why*: Catches meaning. "I'm torn" is semantically close to "I need to choose," even if the words differ.

2.  **Pattern-Based Detection (Weight: 25%)**
    We use sophisticated Regex patterns to catch structural linguistic cues.
    *   *Why*: Extremely fast and accurate for common sentence structures like "Should I...?"

3.  **Enhanced Keywords (Weight: 20%)**
    A fallback layer of high-signal keywords.
    *   *Why*: Cheap and effective for obvious requests.

4.  **Contextual Analysis (Weight: 15%)**
    Analyzes the *grammar* of the sentence. Is it a question? Does it use comparative language ("better than", "worse than")?

### The Algorithm

The system calculates a score for each strategy and then computes a weighted average.

```javascript
// Conceptual Weighting Logic
function calculateConfidence(scores) {
  return (scores.semantic * 0.40) +
         (scores.pattern * 0.25) +
         (scores.keyword * 0.20) +
         (scores.context * 0.15);
}
```

If the final confidence score exceeds a threshold (e.g., 0.6), we classify the intent as "Decision Making" and route it accordingly.

## Optimization: Caching & Batching

Generating embeddings for every chat message is slow and expensive ($).
To optimize this:
1.  **Embedding Cache**: We cache the vector representation of unique messages. If a user asks the same thing twice, it hits Redis, not OpenAI.
2.  **Prototype Pre-calculation**: The "canonical examples" we compare against are embedded once on startup, not on every request.

## Results

This system drastically improved our "Router" accuracy.
*   **False Positives dropped**: It stops thinking "I need help with my homework" is a "Support Ticket".
*   **Nuance detection**: It correctly identifies "I want to make lasagna" as a **Meal Plan** request, triggering the structured JSON generator instead of a generic chat response.

By combining modern AI (embeddings) with traditional engineering (regex/weights), we built a system that is both smart and reliable.
