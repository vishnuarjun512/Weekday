# Weekday’s Assignment Documentation

## Overview
This project implements a scheduling system for Weekday using a MERN stack architecture with PostgreSQL instead of MongoDB. The system is designed to handle interview scheduling requests from 100 partner companies, aiming to schedule 80% of interviews within 24 hours.

## Problem Statement
The assignment involves creating a robust scheduling system for managing interview scheduling requests. The intern team (Ram and Shyam) must efficiently schedule over 500 interview requests daily while navigating potential challenges, such as candidates not responding to outreach.

## Technology Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL
- **State Management**: Redux for managing application state



### Candidate Status Management
A logic system is implemented using a Map to manage candidate statuses with numeric values (0-9) for easy tracking:

```javascript
const statusOptions = new Map<number, string>([
  [0, "Not Responded"],
  [1, "Responded"],
  [2, "Scheduled"],
  [3, "Declined"],
  [4, "Link 1 Interview Done"],
  [5, "Link 2 Interview Done"],
  [6, "Link 3 Interview Done"],
  [7, "Waiting for Company Result"],
  [8, "Not Selected"],
  [9, "Selected"],
]);
```
Interns can view and change the status of candidates, ensuring they have the most current information.

## Features
### Communication Tools
Interns can contact candidates via:
- **Email**
- **Phone Call**
- **WhatsApp**

These functionalities are integrated into the application, allowing easy outreach to candidates to ensure scheduling is completed efficiently.

### Export Functionality
The application includes an export feature that divides interview data into two sections for Ram and Shyam. This ensures clarity in task delegation and progress tracking.


### Workflow
1. **Receive Scheduling Requests**: Process requests from partner companies and verify candidate availability.
2. **Contact Candidates**: Use the integrated communication tools to remind and encourage candidates to schedule interviews via Calendly.
3. **Update Status**: Change candidate statuses based on their responses using the predefined logic system.
4. **Track Progress**: Ensure that 80% of interviews are scheduled within 24 hours.
5. **Export Data**: Generate an export of candidate interview data segmented for each intern.

## Assumptions
- Candidates are likely to have varying responsiveness; some may not check their emails or messages promptly.
- The interns, being college students, might require straightforward processes and guidance to navigate the scheduling tasks efficiently.
- Real-world scenarios such as candidates forgetting to schedule after agreeing need to be considered in the workflow.


##Conclusion
The scheduling system is designed to streamline the interview scheduling process, making it user-friendly for interns while maintaining efficiency and meeting the expected output goals.
