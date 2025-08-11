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

## Project Structure (key files)

src/
App.jsx
main.jsx
index.css
components/
CategoryIcon.jsx
FilterBar.jsx
Header.jsx
ProgressRing.jsx
SubtaskRow.jsx
TaskCard.jsx
TaskCardActions.jsx
TaskForm.jsx
TaskList.jsx
TaskListHeader.jsx
TextInput.jsx
ThemeToggle.jsx
icons/
constants/
categories.js
context/
DropdownContext.jsx
TaskContext.jsx
ThemeContext.jsx
pages/
HomePage.jsx
TaskPage.jsx
reducers/
taskReducer.js
taskActionTypes.js
taskActions.js
taskSelectors.js
router/
AppRouter.jsx
AnalyticsLogger.jsx
utils/
tasksUtils.js
localStorageUtils.js
hooks/
useSwipeActions.js

## Notes

- Data persists to LocalStorage under `taskManager.tasks`.  
  To reset, remove that key from LocalStorage.

Built by — Shiri Castro
