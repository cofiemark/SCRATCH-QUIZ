/**
 * Scratch Integration for the Scratch Programming Quiz Platform
 * Handles Blockly integration for Scratch-like programming experience
 */

const ScratchIntegration = (function() {
    // Blockly workspace
    let workspace = null;
    
    // Current level
    let currentLevel = 0;
    
    // DOM Elements
    let blocklyContainer;
    let runButton;
    let submitButton;
    
    // Custom blocks for Scratch-like experience
    const scratchBlocks = {
        // Motion blocks
        motion_move: {
            type: 'motion_move',
            message0: 'move %1 steps',
            args0: [
                {
                    type: 'field_number',
                    name: 'STEPS',
                    value: 10,
                    min: -100,
                    max: 100
                }
            ],
            previousStatement: null,
            nextStatement: null,
            colour: 230,
            tooltip: 'Move the sprite forward or backward'
        },
        
        motion_turn_right: {
            type: 'motion_turn_right',
            message0: 'turn right %1 degrees',
            args0: [
                {
                    type: 'field_number',
                    name: 'DEGREES',
                    value: 15,
                    min: 0,
                    max: 360
                }
            ],
            previousStatement: null,
            nextStatement: null,
            colour: 230,
            tooltip: 'Turn the sprite clockwise'
        },
        
        motion_turn_left: {
            type: 'motion_turn_left',
            message0: 'turn left %1 degrees',
            args0: [
                {
                    type: 'field_number',
                    name: 'DEGREES',
                    value: 15,
                    min: 0,
                    max: 360
                }
            ],
            previousStatement: null,
            nextStatement: null,
            colour: 230,
            tooltip: 'Turn the sprite counter-clockwise'
        },
        
        motion_goto: {
            type: 'motion_goto',
            message0: 'go to x: %1 y: %2',
            args0: [
                {
                    type: 'field_number',
                    name: 'X',
                    value: 0
                },
                {
                    type: 'field_number',
                    name: 'Y',
                    value: 0
                }
            ],
            previousStatement: null,
            nextStatement: null,
            colour: 230,
            tooltip: 'Move the sprite to specific coordinates'
        },
        
        // Looks blocks
        looks_say: {
            type: 'looks_say',
            message0: 'say %1 for %2 seconds',
            args0: [
                {
                    type: 'field_input',
                    name: 'TEXT',
                    text: 'Hello!'
                },
                {
                    type: 'field_number',
                    name: 'SECONDS',
                    value: 2,
                    min: 0,
                    max: 10
                }
            ],
            previousStatement: null,
            nextStatement: null,
            colour: 160,
            tooltip: 'Make the sprite say something in a speech bubble'
        },
        
        looks_change_costume: {
            type: 'looks_change_costume',
            message0: 'switch costume to %1',
            args0: [
                {
                    type: 'field_dropdown',
                    name: 'COSTUME',
                    options: [
                        ['costume1', 'COSTUME1'],
                        ['costume2', 'COSTUME2']
                    ]
                }
            ],
            previousStatement: null,
            nextStatement: null,
            colour: 160,
            tooltip: 'Change the sprite\'s appearance'
        },
        
        // Control blocks
        control_repeat: {
            type: 'control_repeat',
            message0: 'repeat %1 times',
            message1: '%1',
            args0: [
                {
                    type: 'field_number',
                    name: 'TIMES',
                    value: 10,
                    min: 0
                }
            ],
            args1: [
                {
                    type: 'input_statement',
                    name: 'DO'
                }
            ],
            previousStatement: null,
            nextStatement: null,
            colour: 120,
            tooltip: 'Run the blocks inside a specific number of times'
        },
        
        control_if: {
            type: 'control_if',
            message0: 'if %1 then',
            message1: '%1',
            args0: [
                {
                    type: 'input_value',
                    name: 'CONDITION',
                    check: 'Boolean'
                }
            ],
            args1: [
                {
                    type: 'input_statement',
                    name: 'DO'
                }
            ],
            previousStatement: null,
            nextStatement: null,
            colour: 120,
            tooltip: 'Run the blocks inside only if the condition is true'
        },
        
        control_if_else: {
            type: 'control_if_else',
            message0: 'if %1 then',
            message1: '%1',
            message2: 'else',
            message3: '%1',
            args0: [
                {
                    type: 'input_value',
                    name: 'CONDITION',
                    check: 'Boolean'
                }
            ],
            args1: [
                {
                    type: 'input_statement',
                    name: 'DO'
                }
            ],
            args3: [
                {
                    type: 'input_statement',
                    name: 'ELSE'
                }
            ],
            previousStatement: null,
            nextStatement: null,
            colour: 120,
            tooltip: 'Run the first set of blocks if the condition is true, otherwise run the second set'
        },
        
        control_wait: {
            type: 'control_wait',
            message0: 'wait %1 seconds',
            args0: [
                {
                    type: 'field_number',
                    name: 'SECONDS',
                    value: 1,
                    min: 0
                }
            ],
            previousStatement: null,
            nextStatement: null,
            colour: 120,
            tooltip: 'Wait for a specified amount of time before continuing'
        },
        
        // Events blocks
        events_when_flag_clicked: {
            type: 'events_when_flag_clicked',
            message0: 'when green flag clicked',
            nextStatement: null,
            colour: 40,
            tooltip: 'Run the blocks below when the green flag is clicked'
        },
        
        events_when_key_pressed: {
            type: 'events_when_key_pressed',
            message0: 'when %1 key pressed',
            args0: [
                {
                    type: 'field_dropdown',
                    name: 'KEY',
                    options: [
                        ['space', 'SPACE'],
                        ['up arrow', 'UP'],
                        ['down arrow', 'DOWN'],
                        ['left arrow', 'LEFT'],
                        ['right arrow', 'RIGHT']
                    ]
                }
            ],
            nextStatement: null,
            colour: 40,
            tooltip: 'Run the blocks below when a specific key is pressed'
        },
        
        // Sensing blocks
        sensing_touching: {
            type: 'sensing_touching',
            message0: 'touching %1 ?',
            args0: [
                {
                    type: 'field_dropdown',
                    name: 'OBJECT',
                    options: [
                        ['edge', 'EDGE'],
                        ['sprite1', 'SPRITE1'],
                        ['sprite2', 'SPRITE2']
                    ]
                }
            ],
            output: 'Boolean',
            colour: 190,
            tooltip: 'Check if the sprite is touching another object'
        },
        
        // Operators blocks
        operators_equals: {
            type: 'operators_equals',
            message0: '%1 = %2',
            args0: [
                {
                    type: 'input_value',
                    name: 'A'
                },
                {
                    type: 'input_value',
                    name: 'B'
                }
            ],
            output: 'Boolean',
            colour: 250,
            tooltip: 'Check if two values are equal'
        },
        
        operators_gt: {
            type: 'operators_gt',
            message0: '%1 > %2',
            args0: [
                {
                    type: 'input_value',
                    name: 'A'
                },
                {
                    type: 'input_value',
                    name: 'B'
                }
            ],
            output: 'Boolean',
            colour: 250,
            tooltip: 'Check if the first value is greater than the second'
        },
        
        operators_lt: {
            type: 'operators_lt',
            message0: '%1 < %2',
            args0: [
                {
                    type: 'input_value',
                    name: 'A'
                },
                {
                    type: 'input_value',
                    name: 'B'
                }
            ],
            output: 'Boolean',
            colour: 250,
            tooltip: 'Check if the first value is less than the second'
        },
        
        operators_add: {
            type: 'operators_add',
            message0: '%1 + %2',
            args0: [
                {
                    type: 'input_value',
                    name: 'A',
                    check: 'Number'
                },
                {
                    type: 'input_value',
                    name: 'B',
                    check: 'Number'
                }
            ],
            output: 'Number',
            colour: 250,
            tooltip: 'Add two numbers'
        },
        
        operators_subtract: {
            type: 'operators_subtract',
            message0: '%1 - %2',
            args0: [
                {
                    type: 'input_value',
                    name: 'A',
                    check: 'Number'
                },
                {
                    type: 'input_value',
                    name: 'B',
                    check: 'Number'
                }
            ],
            output: 'Number',
            colour: 250,
            tooltip: 'Subtract the second number from the first'
        },
        
        // Variables blocks
        data_variable: {
            type: 'data_variable',
            message0: 'variable %1',
            args0: [
                {
                    type: 'field_dropdown',
                    name: 'VARIABLE',
                    options: [
                        ['score', 'SCORE'],
                        ['lives', 'LIVES'],
                        ['position', 'POSITION']
                    ]
                }
            ],
            output: null,
            colour: 330,
            tooltip: 'Get the value of a variable'
        },
        
        data_setvariableto: {
            type: 'data_setvariableto',
            message0: 'set %1 to %2',
            args0: [
                {
                    type: 'field_dropdown',
                    name: 'VARIABLE',
                    options: [
                        ['score', 'SCORE'],
                        ['lives', 'LIVES'],
                        ['position', 'POSITION']
                    ]
                },
                {
                    type: 'input_value',
                    name: 'VALUE'
                }
            ],
            previousStatement: null,
            nextStatement: null,
            colour: 330,
            tooltip: 'Set a variable to a value'
        },
        
        data_changevariableby: {
            type: 'data_changevariableby',
            message0: 'change %1 by %2',
            args0: [
                {
                    type: 'field_dropdown',
                    name: 'VARIABLE',
                    options: [
                        ['score', 'SCORE'],
                        ['lives', 'LIVES'],
                        ['position', 'POSITION']
                    ]
                },
                {
                    type: 'input_value',
                    name: 'VALUE',
                    check: 'Number'
                }
            ],
            previousStatement: null,
            nextStatement: null,
            colour: 330,
            tooltip: 'Change a variable by a value'
        }
    };
    
    /**
     * Initialize the Scratch integration
     * @param {number} levelId - Level ID
     */
    function init(levelId) {
        currentLevel = levelId;
        
        // Get DOM elements
        blocklyContainer = document.getElementById('blockly-container');
        runButton = document.getElementById('run-project');
        submitButton = document.getElementById('submit-project');
        
        // Set up event listeners
        runButton.addEventListener('click', runProject);
        submitButton.addEventListener('click', submitProject);
        
        // Load Blockly scripts
        loadBlocklyScripts().then(() => {
            // Initialize Blockly
            initBlockly();
        });
    }
    
    /**
     * Load Blockly scripts dynamically
     * @returns {Promise} Promise that resolves when scripts are loaded
     */
    function loadBlocklyScripts() {
        return new Promise((resolve, reject) => {
            // Create script elements for Blockly
            const blocklyScript = document.createElement('script');
            blocklyScript.src = 'node_modules/blockly/blockly.min.js';
            
            // Set onload handler
            blocklyScript.onload = () => {
                resolve();
            };
            
            // Set onerror handler
            blocklyScript.onerror = () => {
                reject(new Error('Failed to load Blockly scripts'));
            };
            
            // Append scripts to document
            document.head.appendChild(blocklyScript);
        });
    }
    
    /**
     * Initialize Blockly with custom blocks
     */
    function initBlockly() {
        // Register custom blocks
        for (const [blockName, blockDef] of Object.entries(scratchBlocks)) {
            Blockly.Blocks[blockName] = {
                init: function() {
                    this.jsonInit(blockDef);
                }
            };
        }
        
        // Create toolbox XML
        const toolbox = createToolbox();
        
        // Initialize Blockly workspace
        workspace = Blockly.inject(blocklyContainer, {
            toolbox: toolbox,
            grid: {
                spacing: 20,
                length: 3,
                colour: '#ccc',
                snap: true
            },
            zoom: {
                controls: true,
                wheel: true,
                startScale: 1.0,
                maxScale: 3,
                minScale: 0.3,
                scaleSpeed: 1.2
            },
            trashcan: true
        });
        
        // Load saved project if available
        loadSavedProject();
    }
    
    /**
     * Create toolbox XML based on level
     * @returns {Element} Toolbox XML element
     */
    function createToolbox() {
        // Create categories based on level
        const categories = [];
        
        // Motion category
        categories.push(`
            <category name="Motion" colour="230">
                <block type="motion_move"></block>
                <block type="motion_turn_right"></block>
                <block type="motion_turn_left"></block>
                <block type="motion_goto"></block>
            </category>
        `);
        
        // Looks category
        categories.push(`
            <category name="Looks" colour="160">
                <block type="looks_say"></block>
                <block type="looks_change_costume"></block>
            </category>
        `);
        
        // Control category
        categories.push(`
            <category name="Control" colour="120">
                <block type="control_repeat"></block>
                <block type="control_if"></block>
                <block type="control_if_else"></block>
                <block type="control_wait"></block>
            </category>
        `);
        
        // Events category
        categories.push(`
            <category name="Events" colour="40">
                <block type="events_when_flag_clicked"></block>
                <block type="events_when_key_pressed"></block>
            </category>
        `);
        
        // Sensing category
        categories.push(`
            <category name="Sensing" colour="190">
                <block type="sensing_touching"></block>
            </category>
        `);
        
        // Operators category
        categories.push(`
            <category name="Operators" colour="250">
                <block type="operators_equals"></block>
                <block type="operators_gt"></block>
                <block type="operators_lt"></block>
                <block type="operators_add"></block>
                <block type="operators_subtract"></block>
            </category>
        `);
        
        // Variables category
        categories.push(`
            <category name="Variables" colour="330">
                <block type="data_variable"></block>
                <block type="data_setvariableto"></block>
                <block type="data_changevariableby"></block>
            </category>
        `);
        
        // Create toolbox XML
        const toolboxXml = `
            <xml id="toolbox" style="display: none">
                ${categories.join('')}
            </xml>
        `;
        
        // Parse XML string to DOM element
        const parser = new DOMParser();
        const toolboxDoc = parser.parseFromString(toolboxXml, 'text/xml');
        return toolboxDoc.documentElement;
    }
    
    /**
     * Load saved project from storage
     */
    function loadSavedProject() {
        const userProgress = StorageManager.loadProgress();
        
        if (userProgress && userProgress.levels[currentLevel - 1] && userProgress.levels[currentLevel - 1].project) {
            const projectXml = userProgress.levels[currentLevel - 1].project.xml;
            
            if (projectXml) {
                try {
                    const xml = Blockly.Xml.textToDom(projectXml);
                    Blockly.Xml.domToWorkspace(xml, workspace);
                } catch (e) {
                    console.error('Error loading saved project:', e);
                }
            }
        }
    }
    
    /**
     * Save project to storage
     */
    function saveProject() {
        if (!workspace) return;
        
        // Get XML representation of workspace
        const xml = Blockly.Xml.workspaceToDom(workspace);
        const xmlText = Blockly.Xml.domToText(xml);
        
        // Save to storage
        StorageManager.updateProjectProgress(currentLevel, false, 0, xmlText);
    }
    
    /**
     * Run the project
     */
    function runProject() {
        if (!workspace) return;
        
        // Save project first
        saveProject();
        
        // Get JavaScript code from workspace
        const code = Blockly.JavaScript.workspaceToCode(workspace);
        
        // Create a sandbox for running the code
        const sandbox = document.createElement('iframe');
        sandbox.style.display = 'none';
        document.body.appendChild(sandbox);
        
        // Create a canvas for visualization
        const canvas = document.createElement('canvas');
        canvas.width = 480;
        canvas.height = 360;
        canvas.style.border = '1px solid #ccc';
        canvas.style.display = 'block';
        canvas.style.margin = '1rem auto';
        
        // Replace any existing canvas
        const existingCanvas = blocklyContainer.querySelector('canvas');
        if (existingCanvas) {
            blocklyContainer.replaceChild(canvas, existingCanvas);
        } else {
            blocklyContainer.appendChild(canvas);
        }
        
        // Get canvas context
        const ctx = canvas.getContext('2d');
        
        // Clear canvas
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Create sprite object
        const sprite = {
            x: canvas.width / 2,
            y: canvas.height / 2,
            direction: 90, // degrees (0 = up, 90 = right, 180 = down, 270 = left)
            costume: 0,
            costumes: [
                { color: 'red', shape: 'triangle' },
                { color: 'blue', shape: 'square' }
            ],
            sayText: '',
            sayTimer: 0
        };
        
        // Draw sprite
        function drawSprite() {
            ctx.save();
            ctx.translate(sprite.x, sprite.y);
            ctx.rotate((sprite.direction - 90) * Math.PI / 180);
            
            const costume = sprite.costumes[sprite.costume];
            
            ctx.fillStyle = costume.color;
            
            if (costume.shape === 'triangle') {
                ctx.beginPath();
                ctx.moveTo(0, -15);
                ctx.lineTo(15, 15);
                ctx.lineTo(-15, 15);
                ctx.closePath();
                ctx.fill();
            } else if (costume.shape === 'square') {
                ctx.fillRect(-15, -15, 30, 30);
            }
            
            ctx.restore();
            
            // Draw speech bubble if needed
            if (sprite.sayText && sprite.sayTimer > 0) {
                ctx.fillStyle = 'white';
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 2;
                
                const textWidth = ctx.measureText(sprite.sayText).width;
                const bubbleWidth = textWidth + 20;
                const bubbleHeight = 30;
                
                // Draw bubble
                ctx.beginPath();
                ctx.moveTo(sprite.x, sprite.y - 20);
                ctx.lineTo(sprite.x + 10, sprite.y - 30);
                ctx.lineTo(sprite.x + 20, sprite.y - 20);
                ctx.arc(sprite.x + bubbleWidth / 2, sprite.y - 20 - bubbleHeight / 2, bubbleHeight / 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                
                // Draw text
                ctx.fillStyle = 'black';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(sprite.sayText, sprite.x + bubbleWidth / 2, sprite.y - 20 - bubbleHeight / 2);
            }
        }
        
        // Create wrapper functions for Scratch blocks
        const scratchFunctions = {
            moveSteps: function(steps) {
                const radians = sprite.direction * Math.PI / 180;
                sprite.x += steps * Math.cos(radians);
                sprite.y += steps * Math.sin(radians);
                drawScene();
            },
            
            turnRight: function(degrees) {
                sprite.direction = (sprite.direction + degrees) % 360;
                drawScene();
            },
            
            turnLeft: function(degrees) {
                sprite.direction = (sprite.direction - degrees + 360) % 360;
                drawScene();
            },
            
            goTo: function(x, y) {
                sprite.x = x + canvas.width / 2;
                sprite.y = -y + canvas.height / 2; // Invert y to match Scratch coordinate system
                drawScene();
            },
            
            say: function(text, seconds) {
                sprite.sayText = text;
                sprite.sayTimer = seconds * 1000;
                drawScene();
                
                setTimeout(() => {
                    sprite.sayText = '';
                    sprite.sayTimer = 0;
                    drawScene();
                }, seconds * 1000);
            },
            
            changeCostume: function(costume) {
                if (costume === 'COSTUME1') {
                    sprite.costume = 0;
                } else if (costume === 'COSTUME2') {
                    sprite.costume = 1;
                }
                drawScene();
            },
            
            wait: function(seconds) {
                return new Promise(resolve => {
                    setTimeout(resolve, seconds * 1000);
                });
            },
            
            isTouching: function(object) {
                // Simplified collision detection
                if (object === 'EDGE') {
                    return sprite.x < 15 || sprite.x > canvas.width - 15 || 
                           sprite.y < 15 || sprite.y > canvas.height - 15;
                }
                return false;
            }
        };
        
        // Draw the scene
        function drawScene() {
            // Clear canvas
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw sprite
            drawSprite();
        }
        
        // Initial draw
        drawScene();
        
        // Create JavaScript code with wrapper functions
        const wrappedCode = `
            // Scratch wrapper functions
            const moveSteps = ${scratchFunctions.moveSteps.toString()};
            const turnRight = ${scratchFunctions.turnRight.toString()};
            const turnLeft = ${scratchFunctions.turnLeft.toString()};
            const goTo = ${scratchFunctions.goTo.toString()};
            const say = ${scratchFunctions.say.toString()};
            const changeCostume = ${scratchFunctions.changeCostume.toString()};
            const wait = ${scratchFunctions.wait.toString()};
            const isTouching = ${scratchFunctions.isTouching.toString()};
            
            // Variables
            let score = 0;
            let lives = 3;
            let position = 0;
            
            // User code
            async function runUserCode() {
                try {
                    ${code}
                } catch (e) {
                    console.error('Error running code:', e);
                }
            }
            
            // Run user code
            runUserCode();
        `;
        
        // Run the code in the sandbox
        try {
            const sandboxContent = sandbox.contentDocument || sandbox.contentWindow.document;
            sandboxContent.open();
            sandboxContent.write(`
                <script>
                    ${wrappedCode}
                </script>
            `);
            sandboxContent.close();
        } catch (e) {
            console.error('Error running project:', e);
            alert('Error running project: ' + e.message);
        }
        
        // Clean up sandbox after execution
        setTimeout(() => {
            document.body.removeChild(sandbox);
        }, 100);
    }
    
    /**
     * Submit the project for evaluation
     */
    function submitProject() {
        if (!workspace) return;
        
        // Save project first
        saveProject();
        
        // Get JavaScript code from workspace
        const code = Blockly.JavaScript.workspaceToCode(workspace);
        
        // Evaluate project based on level requirements
        let score = 0;
        let feedback = '';
        
        if (currentLevel === 4) {
            // Level 4 requirements
            const requirements = [
                { test: code.includes('moveSteps'), points: 1, feedback: 'Used movement blocks' },
                { test: code.includes('turnRight') || code.includes('turnLeft'), points: 1, feedback: 'Used turning blocks' },
                { test: code.includes('say'), points: 1, feedback: 'Used speech blocks' },
                { test: code.includes('changeCostume'), points: 1, feedback: 'Changed sprite appearance' },
                { test: code.includes('wait'), points: 1, feedback: 'Used timing blocks' },
                { test: code.includes('if') || code.includes('isTouching'), points: 1, feedback: 'Used conditional logic' },
                { test: code.includes('repeat') || code.includes('for'), points: 1, feedback: 'Used loops' }
            ];
            
            // Check each requirement
            let totalPoints = 0;
            let passedRequirements = [];
            
            requirements.forEach(req => {
                if (req.test) {
                    totalPoints += req.points;
                    passedRequirements.push(req.feedback);
                }
            });
            
            // Calculate score (out of 10)
            score = Math.min(10, totalPoints);
            
            // Generate feedback
            feedback = `
                <h3>Project Evaluation</h3>
                <p>Score: ${score}/10</p>
                <h4>Requirements Met:</h4>
                <ul>
                    ${passedRequirements.map(req => `<li>${req}</li>`).join('')}
                </ul>
                <p>${score >= 7 ? 'Great job! You\'ve met most of the requirements.' : 'Keep practicing! Try to meet more of the requirements.'}</p>
            `;
        } else if (currentLevel === 5) {
            // Level 5 requirements
            const requirements = [
                { test: code.includes('moveSteps') || code.includes('goTo'), points: 1, feedback: 'Implemented player movement' },
                { test: code.includes('isTouching'), points: 1, feedback: 'Used collision detection' },
                { test: code.includes('score'), points: 1, feedback: 'Implemented scoring system' },
                { test: code.includes('if'), points: 1, feedback: 'Used conditional logic' },
                { test: code.includes('repeat') || code.includes('for'), points: 1, feedback: 'Used loops' },
                { test: code.includes('wait'), points: 1, feedback: 'Used timing blocks' },
                { test: code.includes('say'), points: 1, feedback: 'Provided user feedback' },
                { test: code.includes('changeCostume'), points: 1, feedback: 'Changed sprite appearance' },
                { test: workspace.getAllBlocks().length >= 20, points: 1, feedback: 'Created a complex program' },
                { test: code.includes('events_when_key_pressed'), points: 1, feedback: 'Implemented keyboard controls' }
            ];
            
            // Check each requirement
            let totalPoints = 0;
            let passedRequirements = [];
            
            requirements.forEach(req => {
                if (req.test) {
                    totalPoints += req.points;
                    passedRequirements.push(req.feedback);
                }
            });
            
            // Calculate score (out of 10)
            score = Math.min(10, totalPoints);
            
            // Generate feedback
            feedback = `
                <h3>Project Evaluation</h3>
                <p>Score: ${score}/10</p>
                <h4>Requirements Met:</h4>
                <ul>
                    ${passedRequirements.map(req => `<li>${req}</li>`).join('')}
                </ul>
                <p>${score >= 7 ? 'Excellent work! Your game meets most of the requirements.' : 'Keep improving your game to meet more requirements.'}</p>
            `;
        }
        
        // Display feedback
        const feedbackContainer = document.createElement('div');
        feedbackContainer.className = 'project-feedback';
        feedbackContainer.innerHTML = feedback;
        
        // Replace any existing feedback
        const existingFeedback = blocklyContainer.querySelector('.project-feedback');
        if (existingFeedback) {
            blocklyContainer.replaceChild(feedbackContainer, existingFeedback);
        } else {
            blocklyContainer.appendChild(feedbackContainer);
        }
        
        // Update project progress in storage
        const xml = Blockly.Xml.workspaceToDom(workspace);
        const xmlText = Blockly.Xml.domToText(xml);
        
        StorageManager.updateProjectProgress(currentLevel, true, score, xmlText);
        
        // Check if level is completed
        const userProgress = StorageManager.loadProgress();
        const levelProgress = userProgress.levels.find(l => l.id === currentLevel);
        
        if (levelProgress && levelProgress.completed) {
            // Show level complete screen
            document.getElementById('scratch-project-screen').classList.remove('active');
            document.getElementById('level-complete-screen').classList.add('active');
            
            // Update level score display
            document.getElementById('level-score').textContent = levelProgress.score;
            document.getElementById('level-max-score').textContent = levelProgress.maxScore;
            
            // Update badges
            if (typeof GamificationSystem !== 'undefined') {
                GamificationSystem.updateBadgeDisplays();
            }
        }
    }
    
    // Public API
    return {
        init
    };
})();
