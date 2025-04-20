/**
 * Questions data for the Scratch Quiz Platform
 * Contains all questions for each level
 */

const QuestionData = {
    // Level 1: Introduction to Scratch
    level1: [
        {
            id: "1-1",
            type: "multiple-choice",
            question: "Which part of the Scratch interface is used to add code blocks?",
            options: [
                "Stage area",
                "Block palette",
                "Sprite list",
                "Costume tab"
            ],
            correctAnswer: 1,
            explanation: "The Block palette contains all the code blocks that can be dragged into the coding area."
        },
        {
            id: "1-2",
            type: "multiple-choice",
            question: "What is a sprite in Scratch?",
            options: [
                "A sound effect",
                "A character or object that can be programmed",
                "A background image",
                "A type of code block"
            ],
            correctAnswer: 1,
            explanation: "A sprite is any character or object in your Scratch project that can be programmed to do things."
        },
        {
            id: "1-3",
            type: "true-false",
            question: "In Scratch, you can have multiple sprites in a single project.",
            correctAnswer: true,
            explanation: "Yes, Scratch allows you to create and program multiple sprites in a single project, each with their own scripts."
        },
        {
            id: "1-4",
            type: "multiple-choice",
            question: "How do you create a new sprite in Scratch?",
            options: [
                "Click the 'New Sprite' button at the bottom of the sprite list",
                "Press the spacebar",
                "Right-click on the stage",
                "Use the 'Create Sprite' block"
            ],
            correctAnswer: 0,
            explanation: "To create a new sprite, click the 'New Sprite' button (with a cat icon) at the bottom of the sprite list."
        },
        {
            id: "1-5",
            type: "multiple-choice",
            question: "Which of these is NOT a category of blocks in Scratch?",
            options: [
                "Motion",
                "Looks",
                "Database",
                "Events"
            ],
            correctAnswer: 2,
            explanation: "Database is not a category in Scratch. The main categories include Motion, Looks, Sound, Events, Control, Sensing, Operators, and Variables."
        },
        {
            id: "1-6",
            type: "fill-blank",
            question: "The area where you can see your sprite move and interact is called the _______.",
            correctAnswer: "stage",
            explanation: "The Stage is the area on the right side of the Scratch interface where you can see your sprites move and interact."
        },
        {
            id: "1-7",
            type: "multiple-choice",
            question: "What happens when you click the green flag in Scratch?",
            options: [
                "It saves your project",
                "It starts running scripts that begin with 'when green flag clicked'",
                "It creates a new sprite",
                "It changes the background"
            ],
            correctAnswer: 1,
            explanation: "The green flag starts running all scripts that begin with the 'when green flag clicked' block."
        },
        {
            id: "1-8",
            type: "true-false",
            question: "You can only use blocks from one category at a time in Scratch.",
            correctAnswer: false,
            explanation: "You can use blocks from any category and combine them in your scripts."
        },
        {
            id: "1-9",
            type: "drag-drop",
            question: "Match each Scratch term with its description:",
            items: [
                "Sprite",
                "Stage",
                "Script",
                "Costume"
            ],
            zones: [
                "A character or object that can be programmed",
                "The background area where sprites move and interact",
                "A sequence of connected blocks that perform actions",
                "Different appearances that a sprite can have"
            ],
            correctAnswers: [0, 1, 2, 3],
            explanation: "Sprites are objects that can be programmed, the Stage is where they move, Scripts are sequences of blocks, and Costumes are different appearances for sprites."
        },
        {
            id: "1-10",
            type: "multiple-choice",
            question: "How do you move a sprite 10 steps in Scratch?",
            options: [
                "Use the 'change x by 10' block",
                "Use the 'move 10 steps' block",
                "Click and drag the sprite",
                "Type '10' in the sprite's position box"
            ],
            correctAnswer: 1,
            explanation: "The 'move 10 steps' block from the Motion category will move a sprite 10 steps in the direction it's facing."
        },
        // Additional questions to reach 20 total for Level 1
        {
            id: "1-11",
            type: "multiple-choice",
            question: "Which block would you use to make a sprite say something?",
            options: [
                "The 'move' block",
                "The 'say' block",
                "The 'play sound' block",
                "The 'ask' block"
            ],
            correctAnswer: 1,
            explanation: "The 'say' block from the Looks category creates a speech bubble with text above the sprite."
        },
        {
            id: "1-12",
            type: "true-false",
            question: "In Scratch, the x-coordinate increases as you move to the right of the stage.",
            correctAnswer: true,
            explanation: "Yes, the x-coordinate increases as you move to the right and decreases as you move to the left."
        },
        {
            id: "1-13",
            type: "multiple-choice",
            question: "What does the 'wait 1 seconds' block do?",
            options: [
                "Makes the sprite invisible for 1 second",
                "Pauses the script for 1 second before continuing",
                "Makes the sprite move for only 1 second",
                "Counts down from 1 second"
            ],
            correctAnswer: 1,
            explanation: "The 'wait' block pauses the execution of a script for the specified amount of time before continuing with the next block."
        },
        {
            id: "1-14",
            type: "fill-blank",
            question: "To change how a sprite looks, you can switch to a different _______.",
            correctAnswer: "costume",
            explanation: "You can change how a sprite looks by switching to a different costume using blocks like 'switch costume to' or 'next costume'."
        },
        {
            id: "1-15",
            type: "multiple-choice",
            question: "What is the default position (x,y coordinates) of the center of the stage?",
            options: [
                "(0,0)",
                "(1,1)",
                "(100,100)",
                "(240,180)"
            ],
            correctAnswer: 0,
            explanation: "The center of the stage is at coordinates (0,0). X increases to the right, and Y increases upward."
        },
        {
            id: "1-16",
            type: "multiple-choice",
            question: "Which of these is NOT a way to create a new sprite?",
            options: [
                "Choose one from the library",
                "Paint your own",
                "Upload an image",
                "Use a 'create sprite' block"
            ],
            correctAnswer: 3,
            explanation: "There is no 'create sprite' block in Scratch. You can create sprites from the library, paint your own, or upload an image."
        },
        {
            id: "1-17",
            type: "true-false",
            question: "Sprites can detect when they touch other sprites or colors.",
            correctAnswer: true,
            explanation: "Yes, using sensing blocks like 'touching (sprite)?' or 'touching color?', sprites can detect collisions with other sprites or specific colors."
        },
        {
            id: "1-18",
            type: "multiple-choice",
            question: "What happens when a sprite reaches the edge of the stage?",
            options: [
                "It automatically bounces",
                "It stops moving",
                "It wraps around to the other side",
                "It depends on how you program it"
            ],
            correctAnswer: 3,
            explanation: "What happens when a sprite reaches the edge depends on how you program it. You can make it bounce, stop, or wrap around using different blocks."
        },
        {
            id: "1-19",
            type: "fill-blank",
            question: "The _______ block is used to repeat a sequence of blocks a specific number of times.",
            correctAnswer: "repeat",
            explanation: "The 'repeat' block from the Control category lets you run a sequence of blocks a specific number of times."
        },
        {
            id: "1-20",
            type: "multiple-choice",
            question: "Which of these is NOT a way to trigger a script to run in Scratch?",
            options: [
                "When green flag clicked",
                "When a key is pressed",
                "When a sprite is clicked",
                "When the computer's battery is low"
            ],
            correctAnswer: 3,
            explanation: "Scratch cannot detect when a computer's battery is low. Common triggers include the green flag, key presses, sprite clicks, and other events."
        }
    ],

    // Level 2: Basic Motion and Looks
    level2: [
        {
            id: "2-1",
            type: "multiple-choice",
            question: "Which block would you use to make a sprite move in a circle?",
            options: [
                "move 10 steps",
                "turn right 15 degrees",
                "change y by 10",
                "A combination of 'move' and 'turn' blocks in a loop"
            ],
            correctAnswer: 3,
            explanation: "To make a sprite move in a circle, you need to combine 'move' and 'turn' blocks inside a loop, so the sprite continuously moves forward and turns."
        },
        {
            id: "2-2",
            type: "true-false",
            question: "The 'glide' block moves a sprite more smoothly than the 'move' block.",
            correctAnswer: true,
            explanation: "Yes, the 'glide' block creates a smooth animation between the sprite's current position and the target position over a specified time."
        },
        {
            id: "2-3",
            type: "multiple-choice",
            question: "What does the 'point in direction 90' block do?",
            options: [
                "Points the sprite to the right",
                "Points the sprite upward",
                "Points the sprite to the left",
                "Points the sprite downward"
            ],
            correctAnswer: 0,
            explanation: "In Scratch, direction 90 points to the right, 0 points up, -90 (or 270) points to the left, and 180 points down."
        },
        // Add more questions for Level 2...
        {
            id: "2-4",
            type: "fill-blank",
            question: "To make a sprite face the mouse pointer, you would use the 'point towards _______' block.",
            correctAnswer: "mouse-pointer",
            explanation: "The 'point towards mouse-pointer' block makes a sprite continuously face the mouse cursor."
        },
        {
            id: "2-5",
            type: "multiple-choice",
            question: "Which block would you use to make a sprite grow larger?",
            options: [
                "change size by 10",
                "set size to 110%",
                "grow by 10",
                "expand sprite"
            ],
            correctAnswer: 0,
            explanation: "The 'change size by 10' block increases a sprite's size by 10%. You can also use 'set size to' for an absolute size."
        },
        // Continue with more Level 2 questions...
        {
            id: "2-6",
            type: "true-false",
            question: "The 'go to x:0 y:0' block will always move a sprite to the center of the stage.",
            correctAnswer: true,
            explanation: "Yes, the coordinates (0,0) represent the center of the stage in Scratch."
        },
        {
            id: "2-7",
            type: "multiple-choice",
            question: "What does the 'set rotation style' block control?",
            options: [
                "How fast a sprite rotates",
                "Which direction a sprite faces when it moves",
                "Whether a sprite can rotate at all",
                "How a sprite appears when it changes direction"
            ],
            correctAnswer: 3,
            explanation: "The 'set rotation style' block controls how a sprite appears when it changes direction - it can rotate freely, only face left-right, or not rotate visually at all."
        },
        {
            id: "2-8",
            type: "drag-drop",
            question: "Match each motion block with its function:",
            items: [
                "move 10 steps",
                "turn right 15 degrees",
                "go to random position",
                "point towards"
            ],
            zones: [
                "Moves the sprite forward in its current direction",
                "Rotates the sprite clockwise",
                "Places the sprite at random x,y coordinates",
                "Makes the sprite face another sprite or the mouse pointer"
            ],
            correctAnswers: [0, 1, 2, 3],
            explanation: "These motion blocks control different aspects of sprite movement and positioning."
        },
        {
            id: "2-9",
            type: "multiple-choice",
            question: "Which block would you use to make a sprite appear to talk?",
            options: [
                "play sound",
                "say Hello! for 2 seconds",
                "switch backdrop",
                "change effect"
            ],
            correctAnswer: 1,
            explanation: "The 'say' block creates a speech bubble above the sprite with the specified text for the given duration."
        },
        {
            id: "2-10",
            type: "fill-blank",
            question: "The _______ block changes how a sprite looks by applying visual effects like color or whirl.",
            correctAnswer: "change effect",
            explanation: "The 'change [effect] effect by [value]' block applies visual effects to sprites, such as color, fisheye, whirl, pixelate, and more."
        },
        // Additional Level 2 questions to reach 20
        {
            id: "2-11",
            type: "multiple-choice",
            question: "What happens if you use a negative number with the 'move' block?",
            options: [
                "The sprite moves faster",
                "The sprite moves backward",
                "The sprite shrinks",
                "The block will show an error"
            ],
            correctAnswer: 1,
            explanation: "Using a negative number with the 'move' block makes the sprite move backward (in the opposite direction of where it's pointing)."
        },
        {
            id: "2-12",
            type: "true-false",
            question: "In Scratch, the y-coordinate increases as you move up the stage.",
            correctAnswer: true,
            explanation: "Yes, the y-coordinate increases as you move up and decreases as you move down the stage."
        },
        {
            id: "2-13",
            type: "multiple-choice",
            question: "Which block would you use to make a sprite disappear?",
            options: [
                "hide",
                "set size to 0",
                "set transparency to 100%",
                "delete sprite"
            ],
            correctAnswer: 0,
            explanation: "The 'hide' block makes a sprite invisible. You can make it visible again with the 'show' block."
        },
        {
            id: "2-14",
            type: "fill-blank",
            question: "To make a sprite move to a specific position on the stage, you would use the 'go to x:___ y:___' block.",
            correctAnswer: "go to",
            explanation: "The 'go to x:__ y:__' block instantly moves a sprite to the specified coordinates on the stage."
        },
        {
            id: "2-15",
            type: "multiple-choice",
            question: "What does the 'next costume' block do?",
            options: [
                "Creates a new costume",
                "Switches to the next costume in the sprite's costume list",
                "Shows the next sprite",
                "Changes the backdrop"
            ],
            correctAnswer: 1,
            explanation: "The 'next costume' block switches the sprite to the next costume in its costume list, cycling back to the first if it's at the end."
        },
        {
            id: "2-16",
            type: "true-false",
            question: "The 'stamp' block creates a permanent copy of the sprite that cannot be programmed.",
            correctAnswer: true,
            explanation: "Yes, the 'stamp' block creates a visual copy of the sprite on the stage, but this copy is just an image and cannot be programmed or moved."
        },
        {
            id: "2-17",
            type: "multiple-choice",
            question: "Which block would you use to make a sprite bounce off the edge of the stage?",
            options: [
                "if on edge, bounce",
                "bounce if on edge",
                "turn around at edge",
                "reflect at boundary"
            ],
            correctAnswer: 0,
            explanation: "The 'if on edge, bounce' block makes a sprite bounce off the edge of the stage by changing its direction."
        },
        {
            id: "2-18",
            type: "fill-blank",
            question: "The _______ block is used to clear all graphic effects from a sprite.",
            correctAnswer: "clear graphic effects",
            explanation: "The 'clear graphic effects' block removes all visual effects that have been applied to a sprite."
        },
        {
            id: "2-19",
            type: "multiple-choice",
            question: "What is the maximum size percentage you can set for a sprite?",
            options: [
                "100%",
                "200%",
                "500%",
                "There is no fixed maximum"
            ],
            correctAnswer: 3,
            explanation: "There is no fixed maximum size for sprites in Scratch, although very large sprites may extend beyond the visible stage."
        },
        {
            id: "2-20",
            type: "drag-drop",
            question: "Match each Looks block with its function:",
            items: [
                "switch costume to",
                "change color effect",
                "show",
                "think"
            ],
            zones: [
                "Changes the sprite's appearance to a specific costume",
                "Alters the sprite's color",
                "Makes a hidden sprite visible",
                "Displays a thought bubble above the sprite"
            ],
            correctAnswers: [0, 1, 2, 3],
            explanation: "These Looks blocks control different aspects of a sprite's appearance and visual effects."
        }
    ],

    // Level 3: Variables, Loops, and Conditionals
    level3: [
        {
            id: "3-1",
            type: "multiple-choice",
            question: "What is a variable in Scratch?",
            options: [
                "A type of sprite",
                "A container that stores a value that can change",
                "A special effect",
                "A type of loop"
            ],
            correctAnswer: 1,
            explanation: "A variable is a container that stores a value (like a number or text) that can be used and changed in your program."
        },
        {
            id: "3-2",
            type: "true-false",
            question: "In Scratch, you can create variables that are available to all sprites or just to one sprite.",
            correctAnswer: true,
            explanation: "Yes, when creating a variable, you can choose whether it's 'For all sprites' (global) or 'For this sprite only' (local)."
        },
        {
            id: "3-3",
            type: "multiple-choice",
            question: "Which block would you use to repeat a sequence of blocks forever?",
            options: [
                "repeat",
                "repeat until",
                "forever",
                "while"
            ],
            correctAnswer: 2,
            explanation: "The 'forever' block repeats the blocks inside it indefinitely, until the program is stopped."
        },
        // Add more questions for Level 3...
        {
            id: "3-4",
            type: "fill-blank",
            question: "The _______ block is used to check if a condition is true and run code only if it is.",
            correctAnswer: "if",
            explanation: "The 'if' block checks a condition and only runs the blocks inside it if that condition is true."
        },
        {
            id: "3-5",
            type: "multiple-choice",
            question: "What does the 'repeat until' block do?",
            options: [
                "Repeats forever",
                "Repeats a specific number of times",
                "Repeats until a condition becomes true",
                "Repeats until a variable reaches zero"
            ],
            correctAnswer: 2,
            explanation: "The 'repeat until' block repeats the blocks inside it until the specified condition becomes true."
        },
        // Continue with more Level 3 questions...
        {
            id: "3-6",
            type: "drag-drop",
            question: "Match each control block with its function:",
            items: [
                "if...then",
                "if...then...else",
                "wait until",
                "repeat"
            ],
            zones: [
                "Runs code only if a condition is true",
                "Runs one set of code if a condition is true, another set if false",
                "Pauses the script until a condition becomes true",
                "Runs code a specific number of times"
            ],
            correctAnswers: [0, 1, 2, 3],
            explanation: "These control blocks determine the flow of your program based on conditions and repetition."
        },
        {
            id: "3-7",
            type: "multiple-choice",
            question: "Which operator would you use to check if a variable is greater than 10?",
            options: [
                "> (greater than)",
                "< (less than)",
                "= (equal to)",
                ">= (greater than or equal to)"
            ],
            correctAnswer: 0,
            explanation: "The '>' (greater than) operator checks if the value on the left is larger than the value on the right."
        },
        {
            id: "3-8",
            type: "true-false",
            question: "The 'and' operator returns true only if both conditions are true.",
            correctAnswer: true,
            explanation: "Yes, the 'and' operator requires both conditions to be true for the overall result to be true."
        },
        {
            id: "3-9",
            type: "fill-blank",
            question: "To combine two text strings in Scratch, you use the _______ operator.",
            correctAnswer: "join",
            explanation: "The 'join' operator combines two pieces of text (strings) together."
        },
        {
            id: "3-10",
            type: "multiple-choice",
            question: "What does the 'pick random 1 to 10' block do?",
            options: [
                "Always returns 1",
                "Always returns 10",
                "Returns a random whole number between 1 and 10",
                "Returns a random decimal between 1 and 10"
            ],
            correctAnswer: 2,
            explanation: "The 'pick random' block returns a random whole number between the two specified values, inclusive."
        },
        // Additional Level 3 questions to reach 20
        {
            id: "3-11",
            type: "multiple-choice",
            question: "Which block would you use to set a variable to a specific value?",
            options: [
                "change variable by",
                "set variable to",
                "make variable",
                "variable = value"
            ],
            correctAnswer: 1,
            explanation: "The 'set [variable] to [value]' block assigns a specific value to a variable."
        },
        {
            id: "3-12",
            type: "true-false",
            question: "The 'or' operator returns true if either or both conditions are true.",
            correctAnswer: true,
            explanation: "Yes, the 'or' operator returns true if at least one of the conditions is true."
        },
        {
            id: "3-13",
            type: "multiple-choice",
            question: "What does the 'mod' operator do?",
            options: [
                "Multiplies two numbers",
                "Divides two numbers",
                "Returns the remainder after division",
                "Returns the absolute value"
            ],
            correctAnswer: 2,
            explanation: "The 'mod' operator returns the remainder after dividing the first number by the second number."
        },
        {
            id: "3-14",
            type: "fill-blank",
            question: "The _______ block is used to check if a condition is false.",
            correctAnswer: "not",
            explanation: "The 'not' operator reverses a Boolean value, turning true to false and false to true."
        },
        {
            id: "3-15",
            type: "multiple-choice",
            question: "Which of these is NOT a valid variable name in Scratch?",
            options: [
                "score",
                "player name",
                "my-variable",
                "2ndPlayer"
            ],
            correctAnswer: 3,
            explanation: "Variable names in Scratch cannot start with a number, so '2ndPlayer' would not be valid."
        },
        {
            id: "3-16",
            type: "drag-drop",
            question: "Match each operator with its function:",
            items: [
                "+",
                "mod",
                "join",
                "not"
            ],
            zones: [
                "Adds two numbers",
                "Finds the remainder after division",
                "Combines two text strings",
                "Reverses a Boolean value"
            ],
            correctAnswers: [0, 1, 2, 3],
            explanation: "These operators perform different mathematical, text, and logical operations in Scratch."
        },
        {
            id: "3-17",
            type: "multiple-choice",
            question: "What happens if you try to add a number and a text string in Scratch?",
            options: [
                "It shows an error",
                "It treats both as numbers and adds them",
                "It treats both as text and joins them",
                "It ignores the operation"
            ],
            correctAnswer: 2,
            explanation: "When adding a number and text in Scratch, both are treated as text and joined together (concatenated)."
        },
        {
            id: "3-18",
            type: "true-false",
            question: "Lists in Scratch can store multiple values in a single container.",
            correctAnswer: true,
            explanation: "Yes, lists in Scratch can store multiple items (values) that can be accessed by their position in the list."
        },
        {
            id: "3-19",
            type: "fill-blank",
            question: "To add an item to a list in Scratch, you use the 'add _______ to [list]' block.",
            correctAnswer: "thing",
            explanation: "The 'add [thing] to [list]' block appends a new item to the end of a list."
        },
        {
            id: "3-20",
            type: "multiple-choice",
            question: "Which block would you use to check if a list contains a specific item?",
            options: [
                "item # of [thing] in [list]",
                "[list] contains [thing]?",
                "if [list] has [thing]",
                "find [thing] in [list]"
            ],
            correctAnswer: 1,
            explanation: "The '[list] contains [thing]?' block checks if a specific item exists anywhere in the list and returns true or false."
        }
    ],

    // Level 4: Events and Messaging
    level4: [
        {
            id: "4-1",
            type: "multiple-choice",
            question: "What is an event in Scratch?",
            options: [
                "A type of variable",
                "A trigger that starts a script running",
                "A special effect",
                "A type of sprite"
            ],
            correctAnswer: 1,
            explanation: "An event is a trigger that starts a script running, such as clicking the green flag, pressing a key, or clicking a sprite."
        },
        {
            id: "4-2",
            type: "true-false",
            question: "Sprites can communicate with each other using the 'broadcast' block.",
            correctAnswer: true,
            explanation: "Yes, the 'broadcast' block sends a message that can be received by all sprites, allowing them to coordinate actions."
        },
        {
            id: "4-3",
            type: "multiple-choice",
            question: "Which block would you use to make a sprite respond to being clicked?",
            options: [
                "when green flag clicked",
                "when this sprite clicked",
                "when space key pressed",
                "when backdrop switches to"
            ],
            correctAnswer: 1,
            explanation: "The 'when this sprite clicked' block starts a script when the user clicks on that specific sprite."
        },
        // Add more questions for Level 4...
        {
            id: "4-4",
            type: "fill-blank",
            question: "The _______ block sends a message and waits for all receiving scripts to finish before continuing.",
            correctAnswer: "broadcast and wait",
            explanation: "The 'broadcast [message] and wait' block sends a message and pauses the script until all scripts triggered by that message have completed."
        },
        {
            id: "4-5",
            type: "multiple-choice",
            question: "What is the difference between 'broadcast' and 'broadcast and wait'?",
            options: [
                "There is no difference",
                "'broadcast' sends a message to one sprite, while 'broadcast and wait' sends to all sprites",
                "'broadcast' continues the script immediately, while 'broadcast and wait' pauses until all triggered scripts complete",
                "'broadcast' only works with the green flag, while 'broadcast and wait' works anytime"
            ],
            correctAnswer: 2,
            explanation: "'broadcast' sends a message and continues the script immediately, while 'broadcast and wait' pauses the script until all scripts triggered by that message have completed."
        },
        // Continue with more Level 4 questions...
        {
            id: "4-6",
            type: "drag-drop",
            question: "Match each event block with its trigger:",
            items: [
                "when green flag clicked",
                "when this sprite clicked",
                "when key pressed",
                "when I receive"
            ],
            zones: [
                "User clicks the green flag button",
                "User clicks on the sprite",
                "User presses a specific key on the keyboard",
                "Another script broadcasts a message"
            ],
            correctAnswers: [0, 1, 2, 3],
            explanation: "These event blocks start scripts in response to different triggers or actions."
        },
        {
            id: "4-7",
            type: "multiple-choice",
            question: "Which sensing block would you use to detect if a sprite is touching the edge of the stage?",
            options: [
                "touching [edge]?",
                "touching color?",
                "color is touching?",
                "on edge?"
            ],
            correctAnswer: 0,
            explanation: "The 'touching [edge]?' block detects if a sprite is touching the edge of the stage."
        },
        {
            id: "4-8",
            type: "true-false",
            question: "In Scratch, you can create custom blocks to reuse code.",
            correctAnswer: true,
            explanation: "Yes, you can create custom blocks (also called 'My Blocks') to reuse code in multiple places or make your scripts more organized."
        },
        {
            id: "4-9",
            type: "fill-blank",
            question: "The _______ block allows you to get input from the user and store it in a variable.",
            correctAnswer: "ask and wait",
            explanation: "The 'ask [question] and wait' block displays a question, waits for the user to type an answer, and stores it in the 'answer' variable."
        },
        {
            id: "4-10",
            type: "multiple-choice",
            question: "What does the 'stop all' block do?",
            options: [
                "Stops only the current script",
                "Stops all scripts in the current sprite",
                "Stops all scripts in all sprites",
                "Stops the program and closes Scratch"
            ],
            correctAnswer: 2,
            explanation: "The 'stop all' block stops all scripts in all sprites, effectively ending the program."
        }
    ],

    // Level 5: Advanced Concepts
    level5: [
        {
            id: "5-1",
            type: "multiple-choice",
            question: "What is cloning in Scratch?",
            options: [
                "Creating a copy of a script",
                "Making a duplicate of a sprite during the program's execution",
                "Copying a project",
                "Sharing code with others"
            ],
            correctAnswer: 1,
            explanation: "Cloning creates a duplicate of a sprite while the program is running. Clones can have their own scripts and behaviors."
        },
        {
            id: "5-2",
            type: "true-false",
            question: "Clones in Scratch can create their own clones.",
            correctAnswer: true,
            explanation: "Yes, clones can create their own clones, but be careful as this can quickly create many sprites and slow down your project."
        },
        {
            id: "5-3",
            type: "multiple-choice",
            question: "Which block would you use to make a sprite create a clone of itself?",
            options: [
                "make clone",
                "create clone of myself",
                "duplicate sprite",
                "spawn clone"
            ],
            correctAnswer: 1,
            explanation: "The 'create clone of [myself]' block creates a clone of the sprite that runs this block."
        },
        {
            id: "5-4",
            type: "fill-blank",
            question: "The _______ block is used to run code when a clone starts existing.",
            correctAnswer: "when I start as a clone",
            explanation: "The 'when I start as a clone' block is an event block that runs its script whenever a new clone of the sprite is created."
        },
        {
            id: "5-5",
            type: "multiple-choice",
            question: "What happens when you use the 'delete this clone' block?",
            options: [
                "It deletes the original sprite",
                "It deletes all clones of the sprite",
                "It deletes the specific clone that runs this block",
                "It deletes the entire project"
            ],
            correctAnswer: 2,
            explanation: "The 'delete this clone' block removes the specific clone that runs this block. It has no effect if run by the original sprite."
        }
    ],

    // Project instructions for Levels 4 and 5
    projectInstructions: {
        level4: {
            title: "Create a Simple Animation",
            instructions: `
                <p>Create an animation of a character moving across the stage and interacting with an object.</p>
                <h4>Requirements:</h4>
                <ul>
                    <li>Use at least 2 sprites (a character and an object)</li>
                    <li>Make the character move using the arrow keys</li>
                    <li>When the character touches the object, it should trigger an effect (sound, visual change, etc.)</li>
                    <li>Use at least one broadcast message</li>
                    <li>Include at least one loop and one conditional statement</li>
                </ul>
                <p>Use the Blockly editor below to create your animation. When you're done, click "Run Project" to test it, and "Submit Project" when you're satisfied with your work.</p>
            `
        },
        level5: {
            title: "Build a Simple Game",
            instructions: `
                <p>Create a simple game where the player controls a character to collect items while avoiding obstacles.</p>
                <h4>Requirements:</h4>
                <ul>
                    <li>Include a player-controlled sprite</li>
                    <li>Create items to collect (using clones)</li>
                    <li>Add at least one obstacle or enemy</li>
                    <li>Keep score using variables</li>
                    <li>Include a win/lose condition</li>
                    <li>Add sound effects and visual feedback</li>
                </ul>
                <p>Use the Blockly editor below to create your game. When you're done, click "Run Project" to test it, and "Submit Project" when you're satisfied with your work.</p>
            `
        }
    }
};
