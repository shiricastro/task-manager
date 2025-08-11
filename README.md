# Task Manager

Small React + Vite app for managing tasks and subtasks.  
Includes console analytics on page navigation (per assignment).

## Quick Start

**Prerequisites**

- Node.js 18+ and npm

**Setup**

1. Clone this repository
2. cd into the project directory
3. npm install
4. npm start
5. Open http://localhost:5173

## Features

- Create / edit / delete tasks
- Optional subtasks per task
- Completing a task marks all subtasks; completing all subtasks marks the task
- Category filter
- Light/Dark theme
- Mobile swipe actions (edit/delete)
- Route analytics (console):
  - "User visited: Home Page"
  - "User visited: Task Management Page"

## Tech Stack

- React 18 + Vite
- React Router v6
- Context + useReducer
- TailwindCSS
- LocalStorage

## Notes

- Data persists to LocalStorage under `taskManager.tasks`.  
  To reset, remove that key from LocalStorage.

Built by — Shiri Castro
