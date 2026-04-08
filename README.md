# An Interactive Wall Calendar Built with React

This project is an interactive wall calendar built using React.

The idea behind it is to make a digital calendar feel like a real one, instead of just displaying dates on a screen.

Live Demo: https://calendarsony.netlify.app/

---
## What this project does

This is not just a normal calendar.

It is designed to feel like a real wall calendar with:

- A large image for each month
- A paper-like background
- Notebook-style lines for writing memos
- A layout similar to a real calendar hanging on a wall

---

## Features

### Realistic calendar UI

- Top section shows a monthly image
- Spiral rings are added to look like a real calendar
- Date area has a paper texture
- Memo section looks like a notebook

---

### Click and view day (Sticky note)

- Double click on any date
- A popup opens like a sticky note
- It shows:
  - Date
  - Day
  - Your tasks for that day

---

### Select date range

- Click once → start date
- Click again → end date
- All days in between are highlighted

You can add a task for the full selected range.

---

### Add and manage tasks

- Add new tasks
- Add tasks for a range of days
- Delete tasks anytime

---

### Local storage (No backend)

- All tasks are stored in browser
- Data stays even after refresh
- No API or backend is used

---

### Memo section

- Shows all tasks for the current month
- Looks like a notebook with lines
- Keeps everything organized

---

### Today highlight

- Current date is automatically detected
- Highlighted clearly with animation

---

### Responsive design

Works on both desktop and mobile

Desktop:
- Calendar and memos side by side

Mobile:
- Layout becomes vertical
- Easy to use on touch screens

---

### Monthly themes

- Each month has a different image
- Accent colors change automatically
- Smooth transitions between months

---

## Tech Stack

- React (Vite)
- Tailwind CSS
- Framer Motion
- date-fns
- Lucide React

---

## Important Imports

import React, { useState, useEffect, useRef }

Used for managing state and handling UI interactions.

---

import CalendarFrame from './components/CalendarFrame.jsx'

Handles the layout of the calendar including header and structure.

---

import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns'

Used for:

- Creating calendar grid
- Navigating months
- Formatting dates
- Checking today
- Handling range selection

---

import { motion, AnimatePresence } from 'framer-motion'

Used for animations like:

- Page transitions
- Popup animations
- Smooth UI effects

---

import { Bell, ChevronLeft, ChevronRight, Trash2, Sparkles, XCircle } from 'lucide-react'

Used for icons in the UI.

---

## How it works

- Calendar grid is created using date-fns
- Range selection is handled using start and end dates
- Selected range is highlighted using isWithinInterval
- Tasks are stored in localStorage
- UI is built using Tailwind CSS

No external calendar library is used.

---

## Folder Structure

src/

components/
CalendarFrame.jsx

App.jsx
main.jsx
index.css

---

## Run this project

git clone https://github.com/SONY123n/calendar
cd wall_calendar
npm install
npm run dev

---

## Future improvements

- Drag and drop tasks
- Dark mode
- Cloud sync
- Better animations
- Task categories

---

## About me

I am Sony Jarupula, a B.Tech CSE student at NIT Agartala.

I enjoy building projects that are simple, useful, and feel good to use.

This project shows my interest in frontend development and UI design.

---

## Note

This project is built completely from scratch.

No calendar libraries are used.
Everything is custom built.
