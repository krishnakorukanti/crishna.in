---
title: "Solving the Recurring Events Challenge: A Custom Implementation of RFC 5545"
category: "Backend Engineering"
tags: ["Node.js", "Scheduling", "Algorithms", "System Design"]
---

# Solving the Recurring Events Challenge: A Custom Implementation of RFC 5545

## The Problem: "Every 2nd Tuesday... Except Next Week"

Building a calendar or task system seems simple until you hit **Recurring Events**. 
Users expect Google Calendar-level flexibility:
*   "Repeat every week on Monday and Wednesday."
*   "End after 10 occurrences."
*   **The Hard Part:** "Cancel just the instance on Oct 12th" or "Move the Oct 19th instance to Oct 20th."

A naive approach—generating rows in the database for every future occurrence—fails immediately. It bloats the database (infinite recurrence?) and makes changing the pattern a nightmare (updating 1,000 rows?).

## The Solution: Master-Override Architecture with RRULE

We implemented a system based on the **iCalendar (RFC 5545)** standard using a "Master-Override" pattern.

### Architecture

1.  **Master Decision**: Stores the rule (e.g., `FREQ=WEEKLY;BYDAY=MO,WE`). It is a single row in the database.
2.  **Virtual Instances**: We do *not* store normal occurrences. We calculate them on the fly when the user requests a date range.
3.  **Exceptions (Overrides)**: We only store changes. If a specific date is modified or cancelled, we create a row linked to the Master.

### Implementation Details

#### 1. The Data Model

We enhanced our `decisions` table to support this linkage. A typical record now includes:
*   **Recurring ID**: Links an override to its Master.
*   **Original Start Time**: Identifies *which* instance is being modified.
*   **RRULE String**: The standard RFC 5545 string defining the pattern.
*   **Status**: Marks an instance as 'active' or 'cancelled'.

#### 2. Generating "Virtual" Instances
When the frontend requests tasks for "January 2024", we don't just query the database. We perform a 3-step synthesis:

1.  **Fetch Masters**: Get all recurring decisions that *could* overlap with the date range.
2.  **Expand Rules**: Use an `rrule` library to calculate the theoretical schedule in memory.
3.  **Apply Overrides**: Overlay any physical exceptions stored in the database.

```javascript
// Logic Flow
function getCalendarEvents(startDate, endDate) {
  // 1. Get the recurrence rules
  const masters = database.fetchRecurringDecisions();
  
  // 2. Calculate theoretical dates
  let virtualEvents = calculateDates(masters, startDate, endDate);
  
  // 3. Swap in overrides
  const exceptions = database.fetchExceptions(startDate, endDate);
  
  virtualEvents = virtualEvents.map(event => {
    const override = findMatchingException(event, exceptions);
    return override ? override : event;
  });
  
  return virtualEvents;
}
```

#### 3. Handling "Edit This and Future"
The most complex interaction is splitting a series. If a user changes the schedule starting *next month*, we essentially:
1.  **Truncate** the current Master (set `UNTIL` date to yesterday).
2.  **Create** a new Master starting today with the new rule.
3.  This preserves the history of the old schedule while enforcing the new one moving forward.

## The Outcome

This approach gave us:
*   **Infinite Scalability**: A decision repeating "forever" takes up 1 row of storage.
*   **Flexibility**: Users can drag-and-drop individual recurring instances without breaking the series.
*   **Standard Compliance**: By using standard RRULE strings, we can easily export to `.ics` files for Outlook or Google Calendar integration.

This logic is the backbone of the "Recurring Decisions" feature in *Let Me Do It*, ensuring users never miss a critical routine.
