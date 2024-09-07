# Weekday’s Assignment

## Overview

This project implements a scheduling system for Weekday using a MERN stack architecture with PostgreSQL instead of MongoDB. The system is designed to handle interview scheduling requests from 100 partner companies, aiming to schedule 80% of interviews within 24 hours.

## Problem Statement

The assignment involves creating a robust scheduling system for managing interview scheduling requests. You are in charge of Weekday’s scheduling team, with two college interns, Ram and Shyam, assisting you. You need to create a copy of the [input sheet](https://docs.google.com/spreadsheets/d/10vOfrHpHle7XRXbZ4-d8_9gC4ePapK4NVWXkUN0iAWA/edit#gid=0) for this assignment.

### Input

Every day, our 100 partner companies reach out to you with over 500 interview scheduling requests in total. They provide their Calendly links, expecting you to handle scheduling end-to-end.

**Output:**

1. Ensure that candidates schedule their interviews via Calendly using any means necessary (call/email/WhatsApp).
2. Aim to schedule 80% of interviews within 24 hours.

## Features

### Candidate Status Management

- A logic system is implemented using a `Map` to manage candidate statuses with numeric values (0-9) for easy tracking:
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
