# Platform Architecture Design

## Overview

The Interactive Quiz Platform for Introduction to Programming with SCRATCH will be a web-based application built using HTML, CSS, and JavaScript. The platform will provide a gamified learning experience with progressive levels, instant feedback, and integration with Scratch programming.

## System Components

### 1. Core Application Structure

```
scratch_quiz_platform/
├── index.html              # Main entry point
├── css/                    # Styling
│   ├── main.css            # Main styles
│   ├── quiz.css            # Quiz-specific styles
│   └── gamification.css    # Styles for badges, progress bars, etc.
├── js/                     # JavaScript functionality
│   ├── app.js              # Main application logic
│   ├── quiz-engine.js      # Quiz functionality
│   ├── levels.js           # Level management
│   ├── questions.js        # Question data and logic
│   ├── storage.js          # Local storage management
│   ├── scratch-integration.js # Scratch/Blockly integration
│   └── gamification.js     # Badges, progress tracking, etc.
├── assets/                 # Images, icons, etc.
│   ├── badges/             # Badge images
│   ├── icons/              # UI icons
│   └── backgrounds/        # Background images
└── lib/                    # External libraries
    └── blockly/            # Blockly library files
```

### 2. Component Interactions

![Component Interaction Diagram]

- **User Interface Layer**: Handles user interactions and display
- **Quiz Engine**: Manages questions, answers, and scoring
- **Level Manager**: Controls progression through levels
- **Storage Manager**: Handles saving/loading user progress
- **Scratch Integration**: Manages Blockly or embedded Scratch editor
- **Gamification System**: Handles badges, achievements, and progress tracking

## Technical Decisions

### 1. Frontend Framework

- **Decision**: Use vanilla JavaScript without a framework
- **Rationale**: 
  - Simplifies development for a focused application
  - Reduces overhead and dependencies
  - Sufficient for the required functionality
  - Better for educational purposes (easier to understand)

### 2. Scratch Integration

- **Decision**: Use Blockly library for Levels 4-5
- **Rationale**:
  - More customizable than embedded Scratch editor
  - Better integration with our application
  - Allows for custom blocks and functionality
  - Provides similar experience to Scratch
  - Can be configured to match specific requirements

### 3. Storage Solution

- **Decision**: Use localStorage for user progress
- **Rationale**:
  - Simple to implement
  - No server-side setup required
  - Sufficient for storing quiz progress, badges, and achievements
  - User data remains on their device

### 4. Responsive Design

- **Decision**: Use CSS Grid and Flexbox for responsive layouts
- **Rationale**:
  - Modern approach to responsive design
  - Works well across different screen sizes
  - No need for external CSS frameworks

## User Flow

1. **Initial Load**:
   - User arrives at platform
   - System checks for existing progress in localStorage
   - If found, loads last state; if not, starts at Level 1

2. **Level Progression**:
   - User completes quiz questions in current level
   - System provides immediate feedback on answers
   - Upon reaching score threshold, next level unlocks
   - Progress is saved automatically

3. **Levels 1-3 (Quiz Only)**:
   - Multiple choice, true/false, drag-and-drop, fill-in-blank questions
   - Instant feedback after each question
   - Level completion unlocks badges and next level

4. **Levels 4-5 (Quiz + Scratch Projects)**:
   - Quiz portion similar to earlier levels
   - Project portion uses Blockly for coding tasks
   - System evaluates project against requirements
   - Successful completion unlocks badges and next level

5. **Completion**:
   - After finishing all levels, user sees summary screen
   - All earned badges displayed
   - Option to reset and start over

## Gamification Elements

1. **Badges**:
   - Awarded for level completion
   - Special badges for perfect scores
   - Concept mastery badges (e.g., "Loop Master")

2. **Progress Tracking**:
   - Visual progress bar for overall completion
   - Level indicators showing locked/unlocked status
   - Score display for current and previous levels

3. **Hint System**:
   - Limited hints available per level
   - Visual indicator of remaining hints
   - Option to "earn" additional hints

4. **Adaptive Difficulty**:
   - Track question performance
   - Adjust follow-up questions based on performance
   - Provide additional practice for challenging concepts

## Data Structure

### User Progress Data (localStorage)

```json
{
  "currentLevel": 2,
  "levels": [
    {
      "id": 1,
      "completed": true,
      "score": 18,
      "maxScore": 20,
      "questions": [
        {"id": "1-1", "answered": true, "correct": true},
        {"id": "1-2", "answered": true, "correct": false},
        // More question data
      ]
    },
    // More level data
  ],
  "badges": [
    {"id": "level1_complete", "earned": true, "date": "2025-04-20"},
    {"id": "loop_master", "earned": false},
    // More badge data
  ],
  "hintsRemaining": 3
}
```

### Question Data Structure

```json
{
  "levels": [
    {
      "id": 1,
      "title": "Introduction to Scratch",
      "description": "Learn the basics of Scratch interface and sprites",
      "questions": [
        {
          "id": "1-1",
          "type": "multiple-choice",
          "question": "Which part of the Scratch interface is used to add code blocks?",
          "options": [
            "Stage area",
            "Block palette",
            "Sprite list",
            "Costume tab"
          ],
          "correctAnswer": 1,
          "explanation": "The Block palette contains all the code blocks that can be dragged into the coding area."
        },
        // More questions
      ]
    },
    // More levels
  ]
}
```

## Accessibility Considerations

- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance
- Text resizing support
- Alternative text for images

## Performance Optimization

- Lazy loading of level content
- Efficient DOM manipulation
- Minimized reflows and repaints
- Optimized asset loading

## Future Expansion Possibilities

- Server-side storage for multi-device access
- User accounts and authentication
- Leaderboard functionality
- Additional levels and content
- Teacher dashboard for monitoring student progress
