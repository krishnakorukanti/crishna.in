---
title: "Building an AI-Enhanced Decision Support System with Vector Search"
category: "Backend Engineering"
tags: ["AdonisJS", "PostgreSQL", "pgvector", "AI", "Embeddings"]
---

# Building an AI-Enhanced Decision Support System with Vector Search

## The Problem: AI Without Memory

In building **Let Me Do It**, a personal assistant app for users with disabilities, we faced a critical challenge: **Context**.

Standard AI integrations (like a basic chat wrapper around OpenAI) are stateless. If a user asks, "Help me plan lunch," the AI doesn't know they are diabetic or that they struggled with a complex recipe yesterday. For our users, having to repeat their constraints and history every time is a massive friction point.

We needed an AI that has "long-term memory"—one that understands the user's specific disability, preferences, and past successful decisions.

## The Solution: Vector Search with PostgreSQL

We chose to implement a **Vector Search** architecture directly within our primary database, avoiding the complexity of managing a separate vector DB like Pinecone.

### Architecture Overview

1.  **User Preferences & History**: We structured user data (disability type, interests, goals) and decision history.
2.  **Embeddings Pipeline**: When a user creates a decision or preference, we generate an "embedding" (a mathematical vector representation of the text) using OpenAI's `text-embedding-3-small` model.
3.  **Storage**: We used `pgvector`, a PostgreSQL extension, to store these vectors in a dedicated column.
4.  **Retrieval (RAG)**: When a user asks a question, we convert their query into a vector and perform a "similarity search" to find the most relevant past data.

### Technical Implementation

We use **AdonisJS** for our backend. Here is how we integrated `pgvector`.

#### 1. Database Schema
Instead of a complex setup, we simply enabled the `pgvector` extension on our existing PostgreSQL instance. We added a vector column to our `user_preferences` table. This keeps the "AI Memory" directly alongside the transactional data, reducing latency and complexity.

We utilized an **IVFFlat index**, which is optimized for approximate nearest neighbor search. This ensures that even as our dataset grows, retrieving relevant context remains millisecond-fast.

#### 2. Generating Embeddings
When text comes in (either a user query or a new preference), we pass it through an embedding service.

```javascript
// Conceptual Logic
function getContext(userQuery) {
  // 1. Convert text to vector
  const vector = generateEmbedding(userQuery); 
  
  // 2. Find similar records
  const relevantData = database.searchVectors(vector);
  
  return relevantData;
}
```

#### 3. Performing Similarity Search
The core of the logic relies on **Cosine Distance**. In vector space, the angle between two vectors represents their semantic similarity.

We run a query that effectively asks:
*"Find me the top 5 rows in the `decisions` table where the content vector is mathematically closest to the user's current question vector."*

Because this is a standard SQL query, we can filter by `user_id` simultaneously, ensuring strict data privacy—something that is often harder to enforce in external vector databases.

## Results

By integrating `pgvector`:
*   **Cost Reduction**: We avoided paying for a separate vector database service.
*   **Latency**: Since the vector data lives alongside the relational data, we can fetch the decision metadata and its vector in a single query.
*   **Experience**: The AI now "remembers." If a user says "I want to cook," it pulls up their preference for "simple steps" and their history of "successful pasta dishes," proactively suggesting a recipe that fits their capabilities.

This architecture transformed the app from a generic chatbot into a personalized cognitive support tool.
