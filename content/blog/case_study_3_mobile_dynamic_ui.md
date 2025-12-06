---
title: "Flutter Architecture for Dynamic, AI-Driven User Interfaces"
category: "Mobile Engineering"
tags: ["Flutter", "Dart", "Mobile", "UI/UX", "Dynamic Rendering"]
---

# Flutter Architecture for Dynamic, AI-Driven User Interfaces

## The Problem: The UI Bottleneck

In a traditional mobile app, the UI is hardcoded. You design a "Login Screen," a "List Screen," and a "Detail Screen."

But **Let Me Do It** is AI-driven. The AI generates plans and decisions on the fly.
*   One meal plan might have 3 simple steps.
*   Another might need a checklist, a timer, and a warning modal.
*   A "Decision" might be a branching tree of questions.

We couldn't ship a new app update every time the AI learned a new way to present information. We needed a **Server-Driven UI** where the structure of the screen is dictated by the data.

## The Solution: Recursive Widget System

We built a flexible rendering engine in Flutter that takes a JSON definition of a "Decision" and recursively builds the UI.

### The Data Structure

The backend sends a structured object describing the *content*, not the design.

```json
{
  "type": "decision",
  "steps": [
    { "type": "instruction", "text": "Preheat oven..." },
    { 
      "type": "choice", 
      "question": "Do you have oil?",
      "options": ["Yes", "No"] 
    }
  ]
}
```

### The Flutter Implementation

We created a "Factory Widget" that takes a piece of data and determines how to render it.

If it sees an "Instruction", it renders a card with text. If it sees a "Choice", it renders buttons. Crucially, this system is **recursive**.

```dart
// Conceptual Widget Structure
Widget renderStep(StepData step) {
  if (step.type == 'instruction') {
    return InstructionCard(step);
  } 
  else if (step.type == 'choice') {
    return ChoiceButtons(step);
  }
  else if (step.type == 'group') {
    // Recursion happens here
    return Column(
      children: step.subSteps.map(renderStep).toList()
    );
  }
}
```

### Handling Complexity: Recursive Lists

For complex plans, steps can contain sub-steps. The engine simply walks down the JSON tree, building Flutter widgets as it goes. This allows for infinitely nested structures (e.g., a Project -> Phase -> Task -> Checklist) without any custom code for the nesting logic.

### "Financial Inclusion" & Offline Sync

Another challenge was the **Financial Inclusion** module. Users needed to access these decisions offline.
We implemented a local database (using Hive or SQLite) that mirrors the JSON structure.
1.  **Fetch**: App downloads the latest decision definitions on launch.
2.  **Store**: JSON is serialized into local objects.
3.  **Render**: The UI reads solely from the local DB.

This "Offline-First" approach ensures that even if the user loses internet connectivity while shopping or cooking, the dynamic UI continues to function perfectly.

## Outcome

This architecture allows our backend AI to "design" new screen flows—like adding a new type of "Safety Check" step—without us writing a single line of Dart code. The app simply receives the new step type (mapped to a generic fallback or a new widget) and renders it.
