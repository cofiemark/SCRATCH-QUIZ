# Interactive Quiz Platform for Scratch Programming

## Overview

This document provides instructions for deploying and using the Interactive Quiz Platform for Introduction to Programming with SCRATCH. The platform is designed to help students learn Scratch programming concepts through progressive levels of quizzes and hands-on projects.

## Features

- **5 Progressive Levels**: From basic concepts to advanced programming
- **Multiple Question Types**: Multiple choice, true/false, fill-in-the-blank, and drag-and-drop
- **Scratch Editor Integration**: Built-in Blockly-based editor for coding projects in Levels 4-5
- **Gamification Elements**: Badges, progress tracking, and hint system
- **Responsive Design**: Works on desktop and mobile devices
- **Local Storage**: Saves progress automatically

## Technical Implementation

The platform is built using:
- HTML5, CSS3, and vanilla JavaScript
- Blockly library for Scratch-like programming interface
- LocalStorage for saving user progress

## Installation Instructions

### Option 1: Local Installation

1. Download the project files
2. Ensure you have Node.js installed (for serving the files)
3. Navigate to the project directory in your terminal
4. Run a local server:
   ```
   npx http-server
   ```
5. Open your browser and navigate to `http://localhost:8080`

### Option 2: Web Server Deployment

1. Upload all files to your web server
2. Ensure the directory structure is maintained
3. Access the platform through your domain

## Directory Structure

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
├── lib/                    # External libraries
│   └── blockly/            # Blockly library files
└── node_modules/           # Node.js dependencies (not needed for deployment)
```

## Usage Guide

### For Students

1. **Starting the Platform**:
   - Open the platform in a web browser
   - Click "Start Learning" on the welcome screen

2. **Navigating Levels**:
   - Select a level from the level selection screen
   - Complete each level to unlock the next one

3. **Quiz Questions**:
   - Answer questions by selecting options, typing answers, or dragging items
   - Receive immediate feedback after each question
   - Use hints if you're stuck (limited number available)

4. **Programming Projects (Levels 4-5)**:
   - Use the Blockly editor to create Scratch programs
   - Click "Run Project" to test your code
   - Click "Submit Project" when you're satisfied with your work

5. **Tracking Progress**:
   - View your badges by clicking "View Your Badges"
   - See your overall progress in the progress bar at the top
   - Your progress is automatically saved

### For Instructors

1. **Customizing Questions**:
   - Edit the `questions.js` file to modify existing questions or add new ones
   - Questions are organized by level

2. **Customizing Projects**:
   - Edit the project instructions in `questions.js` under the `projectInstructions` object
   - Modify the evaluation criteria in `scratch-integration.js` in the `submitProject` function

3. **Monitoring Progress**:
   - Currently, progress is stored locally on each student's device
   - For centralized tracking, the storage system would need to be extended with a server-side component

## Extending the Platform

### Adding New Levels

1. Add level data to the `levelData` array in `levels.js`
2. Add questions for the new level in `questions.js`
3. Update the level navigation logic in `levels.js`

### Adding New Question Types

1. Define the new question type structure in `questions.js`
2. Implement the creation and checking functions in `quiz-engine.js`
3. Add CSS styling for the new question type in `quiz.css`

### Adding New Blockly Blocks

1. Define new block definitions in `scratch-integration.js` in the `scratchBlocks` object
2. Add the new blocks to the toolbox in the `createToolbox` function
3. Implement the functionality in the JavaScript wrapper functions

## Troubleshooting

### Common Issues

1. **Progress Not Saving**:
   - Ensure localStorage is enabled in your browser
   - Check for browser privacy settings that might block storage

2. **Blockly Editor Not Loading**:
   - Verify that all Blockly files are correctly loaded
   - Check browser console for JavaScript errors

3. **Display Issues**:
   - Try a different browser if you experience layout problems
   - Ensure you're using a modern browser with HTML5 support

### Contact

For additional support or feature requests, please contact the development team.

---

© 2025 Scratch Programming Quiz Platform
