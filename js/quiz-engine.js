/**
 * Quiz Engine for the Scratch Programming Quiz Platform
 * Handles question display, user interaction, and scoring
 */

const QuizEngine = (function() {
    // DOM Elements
    let questionContainer;
    let questionText;
    let questionOptions;
    let feedbackContainer;
    let feedbackHeader;
    let feedbackText;
    let nextQuestionBtn;
    let questionCounter;
    let quizProgress;
    let hintsRemaining;
    let useHintBtn;
    let hintModal;
    let hintText;
    
    // Quiz State
    let currentLevel = 1;
    let currentQuestionIndex = 0;
    let questions = [];
    let userAnswers = [];
    let score = 0;
    
    /**
     * Initialize the quiz engine
     * @param {number} levelId - Level ID to load
     */
    function init(levelId) {
        // Get DOM elements
        questionContainer = document.getElementById('question-container');
        questionText = document.getElementById('question-text');
        questionOptions = document.getElementById('question-options');
        feedbackContainer = document.getElementById('feedback-container');
        feedbackHeader = document.getElementById('feedback-header');
        feedbackText = document.getElementById('feedback-text');
        nextQuestionBtn = document.getElementById('next-question');
        questionCounter = document.getElementById('question-counter');
        quizProgress = document.getElementById('quiz-progress');
        hintsRemaining = document.getElementById('hints-remaining');
        useHintBtn = document.getElementById('use-hint');
        hintModal = document.getElementById('hint-modal');
        hintText = document.getElementById('hint-text');
        
        // Set up event listeners
        nextQuestionBtn.addEventListener('click', showNextQuestion);
        useHintBtn.addEventListener('click', showHint);
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.modal').forEach(modal => {
                    modal.style.display = 'none';
                });
            });
        });
        
        // Load level
        loadLevel(levelId);
    }
    
    /**
     * Load questions for a specific level
     * @param {number} levelId - Level ID to load
     */
    function loadLevel(levelId) {
        currentLevel = levelId;
        
        // Get questions for this level
        switch(levelId) {
            case 1:
                questions = QuestionData.level1;
                break;
            case 2:
                questions = QuestionData.level2;
                break;
            case 3:
                questions = QuestionData.level3;
                break;
            case 4:
                questions = QuestionData.level4;
                break;
            case 5:
                questions = QuestionData.level5;
                break;
            default:
                questions = QuestionData.level1;
        }
        
        // Reset quiz state
        currentQuestionIndex = 0;
        userAnswers = new Array(questions.length).fill(null);
        score = 0;
        
        // Update level title
        document.getElementById('quiz-level-title').textContent = `Level ${levelId}: ${getLevelTitle(levelId)}`;
        
        // Update hints remaining
        const userProgress = StorageManager.loadProgress();
        hintsRemaining.textContent = userProgress.hintsRemaining;
        
        // Show first question
        showQuestion(0);
    }
    
    /**
     * Get the title for a specific level
     * @param {number} levelId - Level ID
     * @returns {string} Level title
     */
    function getLevelTitle(levelId) {
        switch(levelId) {
            case 1: return "Introduction to Scratch";
            case 2: return "Basic Motion and Looks";
            case 3: return "Variables, Loops, and Conditionals";
            case 4: return "Events and Messaging";
            case 5: return "Advanced Concepts";
            default: return "Scratch Programming";
        }
    }
    
    /**
     * Display a question
     * @param {number} index - Question index to display
     */
    function showQuestion(index) {
        if (index >= questions.length) {
            finishQuiz();
            return;
        }
        
        currentQuestionIndex = index;
        const question = questions[index];
        
        // Update question text
        questionText.textContent = question.question;
        
        // Update question counter
        questionCounter.textContent = `Question ${index + 1}/${questions.length}`;
        
        // Update progress bar
        quizProgress.style.width = `${((index) / questions.length) * 100}%`;
        
        // Clear previous options
        questionOptions.innerHTML = '';
        
        // Create options based on question type
        switch(question.type) {
            case 'multiple-choice':
                createMultipleChoiceOptions(question);
                break;
            case 'true-false':
                createTrueFalseOptions(question);
                break;
            case 'fill-blank':
                createFillBlankOptions(question);
                break;
            case 'drag-drop':
                createDragDropOptions(question);
                break;
            default:
                createMultipleChoiceOptions(question);
        }
        
        // Hide feedback container
        feedbackContainer.classList.add('hidden');
        
        // Show question container
        questionContainer.classList.remove('hidden');
    }
    
    /**
     * Create multiple choice options
     * @param {Object} question - Question data
     */
    function createMultipleChoiceOptions(question) {
        const optionContainer = document.createElement('div');
        optionContainer.className = 'option-container';
        
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.textContent = option;
            optionElement.dataset.index = index;
            
            optionElement.addEventListener('click', () => {
                // Remove selected class from all options
                document.querySelectorAll('.option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // Add selected class to clicked option
                optionElement.classList.add('selected');
                
                // Check answer
                checkAnswer(index);
            });
            
            optionContainer.appendChild(optionElement);
        });
        
        questionOptions.appendChild(optionContainer);
    }
    
    /**
     * Create true/false options
     * @param {Object} question - Question data
     */
    function createTrueFalseOptions(question) {
        const optionContainer = document.createElement('div');
        optionContainer.className = 'true-false-container';
        
        const trueOption = document.createElement('div');
        trueOption.className = 'true-false-option';
        trueOption.textContent = 'True';
        trueOption.dataset.value = 'true';
        
        const falseOption = document.createElement('div');
        falseOption.className = 'true-false-option';
        falseOption.textContent = 'False';
        falseOption.dataset.value = 'false';
        
        trueOption.addEventListener('click', () => {
            document.querySelectorAll('.true-false-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            trueOption.classList.add('selected');
            checkAnswer(true);
        });
        
        falseOption.addEventListener('click', () => {
            document.querySelectorAll('.true-false-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            falseOption.classList.add('selected');
            checkAnswer(false);
        });
        
        optionContainer.appendChild(trueOption);
        optionContainer.appendChild(falseOption);
        
        questionOptions.appendChild(optionContainer);
    }
    
    /**
     * Create fill-in-the-blank options
     * @param {Object} question - Question data
     */
    function createFillBlankOptions(question) {
        const container = document.createElement('div');
        container.className = 'fill-blank-container';
        
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'fill-blank-input';
        input.placeholder = 'Type your answer here...';
        
        const submitBtn = document.createElement('button');
        submitBtn.className = 'primary-button';
        submitBtn.textContent = 'Submit Answer';
        submitBtn.style.marginTop = '1rem';
        
        submitBtn.addEventListener('click', () => {
            const userAnswer = input.value.trim().toLowerCase();
            const correctAnswer = question.correctAnswer.toLowerCase();
            
            checkAnswer(userAnswer === correctAnswer, userAnswer);
            
            if (userAnswer === correctAnswer) {
                input.classList.add('correct');
            } else {
                input.classList.add('incorrect');
            }
        });
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                submitBtn.click();
            }
        });
        
        container.appendChild(input);
        container.appendChild(submitBtn);
        
        questionOptions.appendChild(container);
    }
    
    /**
     * Create drag-and-drop options
     * @param {Object} question - Question data
     */
    function createDragDropOptions(question) {
        const container = document.createElement('div');
        container.className = 'drag-drop-container';
        
        // Create drag items
        const dragItems = document.createElement('div');
        dragItems.className = 'drag-items';
        
        // Shuffle items for challenge
        const shuffledItems = [...question.items];
        for (let i = shuffledItems.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledItems[i], shuffledItems[j]] = [shuffledItems[j], shuffledItems[i]];
        }
        
        shuffledItems.forEach((item, index) => {
            const dragItem = document.createElement('div');
            dragItem.className = 'drag-item';
            dragItem.textContent = item;
            dragItem.draggable = true;
            dragItem.dataset.originalIndex = question.items.indexOf(item);
            
            dragItem.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', dragItem.dataset.originalIndex);
                dragItem.classList.add('dragging');
            });
            
            dragItem.addEventListener('dragend', () => {
                dragItem.classList.remove('dragging');
            });
            
            dragItems.appendChild(dragItem);
        });
        
        // Create drop zones
        const dropZones = document.createElement('div');
        dropZones.className = 'drop-zones';
        
        question.zones.forEach((zone, index) => {
            const dropZone = document.createElement('div');
            dropZone.className = 'drop-zone';
            dropZone.textContent = zone;
            dropZone.dataset.index = index;
            
            dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropZone.classList.add('active');
            });
            
            dropZone.addEventListener('dragleave', () => {
                dropZone.classList.remove('active');
            });
            
            dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropZone.classList.remove('active');
                
                const draggedItemIndex = e.dataTransfer.getData('text/plain');
                const draggedItem = document.querySelector(`.drag-item[data-original-index="${draggedItemIndex}"]`);
                
                // Check if this answer is correct
                const isCorrect = question.correctAnswers[index] == draggedItemIndex;
                
                // Add visual feedback
                if (isCorrect) {
                    dropZone.classList.add('correct');
                } else {
                    dropZone.classList.add('incorrect');
                }
                
                // Store the answer
                if (!userAnswers[currentQuestionIndex]) {
                    userAnswers[currentQuestionIndex] = new Array(question.zones.length).fill(null);
                }
                userAnswers[currentQuestionIndex][index] = draggedItemIndex;
                
                // Check if all zones have answers
                const allAnswered = userAnswers[currentQuestionIndex].every(answer => answer !== null);
                
                if (allAnswered) {
                    // Check if all answers are correct
                    const allCorrect = userAnswers[currentQuestionIndex].every((answer, i) => 
                        question.correctAnswers[i] == answer
                    );
                    
                    checkAnswer(allCorrect);
                }
            });
            
            dropZones.appendChild(dropZone);
        });
        
        container.appendChild(dragItems);
        container.appendChild(dropZones);
        
        questionOptions.appendChild(container);
        
        // Add submit button for drag-drop questions
        const submitBtn = document.createElement('button');
        submitBtn.className = 'primary-button';
        submitBtn.textContent = 'Submit Arrangement';
        submitBtn.style.marginTop = '1rem';
        
        submitBtn.addEventListener('click', () => {
            // Check if all zones have answers
            if (userAnswers[currentQuestionIndex] && userAnswers[currentQuestionIndex].every(answer => answer !== null)) {
                // Check if all answers are correct
                const allCorrect = userAnswers[currentQuestionIndex].every((answer, i) => 
                    question.correctAnswers[i] == answer
                );
                
                checkAnswer(allCorrect);
            } else {
                alert('Please drag all items to their matching zones before submitting.');
            }
        });
        
        questionOptions.appendChild(submitBtn);
    }
    
    /**
     * Check if the user's answer is correct
     * @param {*} userAnswer - User's answer
     * @param {*} rawInput - Raw input for fill-in-the-blank questions
     */
    function checkAnswer(userAnswer, rawInput) {
        const question = questions[currentQuestionIndex];
        let isCorrect = false;
        
        switch(question.type) {
            case 'multiple-choice':
                isCorrect = userAnswer === question.correctAnswer;
                break;
            case 'true-false':
                isCorrect = userAnswer === question.correctAnswer;
                break;
            case 'fill-blank':
                isCorrect = userAnswer;
                break;
            case 'drag-drop':
                isCorrect = userAnswer;
                break;
            default:
                isCorrect = userAnswer === question.correctAnswer;
        }
        
        // Store user's answer
        userAnswers[currentQuestionIndex] = userAnswer;
        
        // Update score
        if (isCorrect) {
            score++;
        }
        
        // Show feedback
        showFeedback(isCorrect, question.explanation);
        
        // Update question in storage
        StorageManager.updateQuestionProgress(
            currentLevel,
            question.id,
            isCorrect
        );
        
        // Check for badges
        checkForBadges();
    }
    
    /**
     * Show feedback after answering
     * @param {boolean} isCorrect - Whether the answer was correct
     * @param {string} explanation - Explanation text
     */
    function showFeedback(isCorrect, explanation) {
        // Hide question container
        questionContainer.classList.add('hidden');
        
        // Update feedback content
        if (isCorrect) {
            feedbackHeader.textContent = 'Correct!';
            feedbackContainer.classList.add('correct');
            feedbackContainer.classList.remove('incorrect');
        } else {
            feedbackHeader.textContent = 'Incorrect';
            feedbackContainer.classList.add('incorrect');
            feedbackContainer.classList.remove('correct');
        }
        
        feedbackText.textContent = explanation;
        
        // Show feedback container
        feedbackContainer.classList.remove('hidden');
    }
    
    /**
     * Show the next question
     */
    function showNextQuestion() {
        showQuestion(currentQuestionIndex + 1);
    }
    
    /**
     * Finish the quiz and show results
     */
    function finishQuiz() {
        // Hide quiz screen
        document.getElementById('quiz-screen').classList.remove('active');
        
        // Update level complete screen
        document.getElementById('level-score').textContent = score;
        document.getElementById('level-max-score').textContent = questions.length;
        
        // Check if level is completed
        const passingScore = Math.ceil(questions.length * 0.7); // 70% to pass
        const levelCompleted = score >= passingScore;
        
        // Update level progress in storage
        if (levelCompleted) {
            StorageManager.updateLevelProgress(currentLevel, {
                completed: true,
                score: score,
                maxScore: questions.length
            });
            
            // Unlock next level if available
            if (currentLevel < 5) {
                StorageManager.updateLevelProgress(currentLevel + 1, {
                    unlocked: true
                });
            }
        } else {
            StorageManager.updateLevelProgress(currentLevel, {
                score: score,
                maxScore: questions.length
            });
        }
        
        // Show level complete screen
        document.getElementById('level-complete-screen').classList.add('active');
        
        // Update buttons
        const nextLevelBtn = document.getElementById('next-level');
        if (currentLevel >= 5 || !levelCompleted) {
            nextLevelBtn.style.display = 'none';
        } else {
            nextLevelBtn.style.display = 'block';
            nextLevelBtn.textContent = `Start Level ${currentLevel + 1}`;
            
            nextLevelBtn.onclick = () => {
                document.getElementById('level-complete-screen').classList.remove('active');
                
                // If next level has a project, go to project screen
                if (currentLevel + 1 >= 4) {
                    showProjectScreen(currentLevel + 1);
                } else {
                    // Otherwise, go to quiz screen
                    document.getElementById('quiz-screen').classList.add('active');
                    init(currentLevel + 1);
                }
            };
        }
        
        // If all levels are complete, show all complete screen
        if (currentLevel === 5 && levelCompleted) {
            document.getElementById('level-complete-screen').classList.remove('active');
            document.getElementById('all-complete-screen').classList.add('active');
        }
    }
    
    /**
     * Show the project screen for a level
     * @param {number} levelId - Level ID
     */
    function showProjectScreen(levelId) {
        // Hide other screens
        document.getElementById('quiz-screen').classList.remove('active');
        document.getElementById('level-complete-screen').classList.remove('active');
        
        // Update project title and instructions
        const projectData = levelId === 4 ? QuestionData.projectInstructions.level4 : QuestionData.projectInstructions.level5;
        document.getElementById('project-title').textContent = `Level ${levelId}: ${projectData.title}`;
        document.getElementById('project-instructions-content').innerHTML = projectData.instructions;
        
        // Show project screen
        document.getElementById('scratch-project-screen').classList.add('active');
        
        // Initialize Blockly (this will be implemented in scratch-integration.js)
        if (typeof ScratchIntegration !== 'undefined') {
            ScratchIntegration.init(levelId);
        }
    }
    
    /**
     * Show a hint for the current question
     */
    function showHint() {
        const userProgress = StorageManager.loadProgress();
        
        if (userProgress.hintsRemaining > 0) {
            // Generate hint based on question type
            const question = questions[currentQuestionIndex];
            let hintContent = '';
            
            switch(question.type) {
                case 'multiple-choice':
                    // Eliminate two wrong answers for multiple choice
                    const wrongOptions = [];
                    for (let i = 0; i < question.options.length; i++) {
                        if (i !== question.correctAnswer) {
                            wrongOptions.push(i);
                        }
                    }
                    
                    // Randomly select one wrong option to eliminate
                    const eliminateIndex = Math.floor(Math.random() * wrongOptions.length);
                    const eliminatedOption = wrongOptions[eliminateIndex];
                    
                    hintContent = `One of the incorrect options is: "${question.options[eliminatedOption]}"`;
                    break;
                    
                case 'true-false':
                    // Give a clue about the correct answer
                    hintContent = question.correctAnswer ? 
                        "The correct answer is likely to be True." : 
                        "The correct answer is likely to be False.";
                    break;
                    
                case 'fill-blank':
                    // Give the first letter of the answer
                    const firstLetter = question.correctAnswer.charAt(0).toUpperCase();
                    hintContent = `The answer starts with the letter "${firstLetter}".`;
                    break;
                    
                case 'drag-drop':
                    // Give one correct match
                    const randomIndex = Math.floor(Math.random() * question.items.length);
                    const itemIndex = question.correctAnswers[randomIndex];
                    hintContent = `"${question.items[itemIndex]}" matches with "${question.zones[randomIndex]}".`;
                    break;
                    
                default:
                    hintContent = "Think about what you've learned about Scratch so far.";
            }
            
            // Update hint text
            hintText.textContent = hintContent;
            
            // Show hint modal
            hintModal.style.display = 'flex';
            
            // Decrease hints remaining
            StorageManager.updateHints(1);
            hintsRemaining.textContent = userProgress.hintsRemaining - 1;
        } else {
            alert("You don't have any hints remaining!");
        }
    }
    
    /**
     * Check for badges based on performance
     */
    function checkForBadges() {
        const userProgress = StorageManager.loadProgress();
        
        // Level completion badges
        if (currentQuestionIndex === questions.length - 1) {
            const levelScore = userAnswers.filter(answer => {
                if (typeof answer === 'boolean') {
                    return answer;
                } else if (Array.isArray(answer)) {
                    return answer.every((a, i) => a === questions[currentQuestionIndex].correctAnswers[i]);
                } else {
                    return answer === questions[currentQuestionIndex].correctAnswer;
                }
            }).length;
            
            // Level completion badge
            if (levelScore >= Math.ceil(questions.length * 0.7)) { // 70% to earn badge
                const badgeId = `level${currentLevel}_complete`;
                const newlyEarned = StorageManager.updateBadgeProgress(badgeId, true);
                
                if (newlyEarned) {
                    // Show badge notification (to be implemented in gamification.js)
                    if (typeof GamificationSystem !== 'undefined') {
                        GamificationSystem.showBadgeNotification(badgeId);
                    }
                }
            }
            
            // Perfect score badge
            if (levelScore === questions.length) {
                const badgeId = `level${currentLevel}_perfect`;
                const newlyEarned = StorageManager.updateBadgeProgress(badgeId, true);
                
                if (newlyEarned && typeof GamificationSystem !== 'undefined') {
                    GamificationSystem.showBadgeNotification(badgeId);
                }
            }
        }
        
        // Concept mastery badges (to be implemented based on specific concepts)
    }
    
    // Public API
    return {
        init,
        loadLevel,
        showProjectScreen
    };
})();
