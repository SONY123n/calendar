# Vellum: An Artisan Wall Calendar

Vellum is a skeuomorphic, interactive wall calendar built with React.
It is designed to bridge the gap between digital utility and physical aesthetics.

Instead of following the typical flat design trend, this project focuses on recreating the experience of using a real paper calendar—something familiar, tactile, and visually engaging.

Live Demo: https://sonycalendar.netlify.app/

---

## Demo

https://github.com/user-attachments/assets/REPLACE_WITH_YOUR_VIDEO_LINK

---

## Concept and Design Philosophy

This project started with a simple question:

"Why does digital have to feel digital?"

Most calendar applications today are purely functional and visually flat. Vellum explores skeuomorphism—a design approach that mimics real-world objects to create a more intuitive and engaging user experience.

### Key design elements:

* Paper textures using subtle grain and notebook-style lines
* 3D spiral binder rings to simulate a physical calendar
* A tear-off interaction that mimics removing a page
* Dynamic background imagery that changes with each month

The goal was to make the interface feel natural rather than purely functional.

---

## Core Features

### 1. Dynamic Monthly Navigation

* Smooth transitions between months
* Fully custom-built calendar logic without external libraries

### 2. Smart "Today" Detection

* Automatically identifies the current date
* Highlights it with a distinct visual indicator and animation

### 3. Event and Memo Management

* Users can add notes to any date
* Data is stored using localStorage
* No backend required
* Events persist across page refresh

### 4. Interactive Tear-Off View

* Double-clicking a date triggers a tear-off animation
* Opens a focused view for that specific day

### 5. Responsive Design

* Desktop layout uses a side-by-side notebook style
* Mobile layout stacks vertically for better usability

---

## Tech Stack

* React (Vite) for component-based UI development
* Tailwind CSS for styling and responsive layout
* Framer Motion for animations and transitions
* date-fns for calendar logic and date handling
* Lucide React for icons

---

## Key Imports

```js
import React, { useState, useEffect } from 'react';
```

Used to manage state such as current date, events, and UI interactions.

```js
import CalendarFrame from './components/CalendarFrame.jsx';
```

Handles the main layout including header, background, and overall structure.

```js
import {
  format, addMonths, subMonths,
  startOfMonth, endOfMonth,
  eachDayOfInterval,
  isSameDay,
  startOfWeek, endOfWeek
} from 'date-fns';
```

Used for generating the calendar grid, navigating months, formatting dates, and detecting the current day.

```js
import { motion, AnimatePresence } from 'framer-motion';
```

Used for page transitions, modal animations, and the tear-off interaction.

```js
import { Bell, ChevronLeft, ChevronRight, X, Trash2 } from 'lucide-react';
```

Provides icons for navigation and UI actions.

---

## Implementation Details

This project does not rely on any pre-built calendar libraries.

Instead:

* The calendar grid is generated manually using date-fns
* UI elements are designed to replicate physical objects
* Custom CSS layers are used to create paper textures, notebook lines, and spiral rings

This approach provided full control over both functionality and design.

---

## Directory Structure

```
src/
│
├── components/
│   └── CalendarFrame.jsx
│
├── App.jsx
├── main.jsx
├── index.css
```

---

## Local Development

```
git clone https://github.com/SONY123n/wall_calendar.git
cd wall_calendar
npm install
npm run dev
```

---

## Future Improvements

* Google Calendar integration
* Drag and drop events
* Backend support for real-time data
* Dark mode
* Page flip animation

---

## About the Author

I am Sony Jarupula, a B.Tech Computer Science student at NIT Agartala.
My focus is on frontend engineering and building interfaces that are both intuitive and visually distinct.

This project reflects my interest in combining strong logic with thoughtful user experience design.
