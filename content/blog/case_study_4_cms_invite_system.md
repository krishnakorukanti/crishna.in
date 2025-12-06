---
title: "Scaling Beta Access: A Centralized Invite Code Management System"
category: "Full Stack / CMS"
tags: ["Next.js", "React", "CMS", "Growth Engineering"]
---

# Scaling Beta Access: A Centralized Invite Code Management System

## The Problem: Controlled Growth

Launching a consumer app requires balance. Open the floodgates too early, and your server crashes or support gets overwhelmed. Keep it too closed, and interest dies.

For **Let Me Do It**, we needed a robust "Private Beta" system.
*   We needed to issue codes to partners (Service Providers).
*   We needed to track *who* invited *whom* (attribution).
*   We needed to batch-generate hundreds of codes for events.
*   We needed codes to expire or have usage limits.

## The Solution: A Next.js Dashboard with Server Actions

We built a dedicated CMS module using **Next.js (App Router)** that interacts with our AdonisJS backend API.

### 1. Batch Generation Interface

We created a UI to generate codes in bulk. This is crucial for physical events where we might print QR codes.

**The Workflow:**
The admin enters a prefix (e.g., "CONF2024-"), a quantity (e.g., 50), and an expiration date. The frontend sends this to the backend via a Server Action, which handles the secure communication.

### 2. The Backend Logic (AdonisJS)

On the backend, efficiently generating unique, readable codes is key. We implemented a generator that specifically excludes ambiguous characters (like 'I' vs 'l', 'O' vs '0') to prevent user frustration when typing codes from a flyer.

```javascript
// Logic for batch generation
function generateBatch(prefix, quantity) {
  const codes = [];
  while (codes.length < quantity) {
    const newCode = generateSecureRandomString();
    if (isUnique(newCode)) {
      codes.push(prefix + newCode);
    }
  }
  database.bulkInsert(codes);
}
```

### 3. Tracking Analytics

The most powerful part of the CMS is the analytics view. Because every user signup is linked to an Invite Code, we can query:
*   "How many users did Partner X bring?"
*   "What is the retention rate of users from the 'Summer Promo' code?"

We visualize this in the Next.js dashboard using charts, pulling aggregated data from the backend.

### 4. Service Provider Integration

We took it a step further by linking Invite Codes to **Service Providers** (ISPs/Agencies).
*   An Agency gets a master code.
*   They can generate sub-codes for their clients.
*   This hierarchy allows us to offer B2B features, where an agency can manage the accounts of the users they invited.

## Outcome

This system turned "Invite Codes" from a simple database table into a full growth engine. We can now safely throttle onboarding, measure the ROI of marketing campaigns, and empower our partners to distribute the app autonomously.
