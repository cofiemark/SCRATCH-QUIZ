/**
 * Levels management for the Scratch Programming Quiz Platform
 * Handles level selection, progression, and status
 */

const LevelManager = (function() {
    // DOM Elements
    let levelGrid;
    let levelIndicators;
    
    // Level data
    const levelData = [
        {
            id: 1,
            title: "Introduction to Scratch",
            description: "Learn the basics of Scratch interface and sprites",
            questionCount: 20,
            projectRequired: false
        },
        {
            id: 2,
            title: "Basic Motion and Looks",
            description: "Explore movement, appearance, and basic animations",
            questionCount: 20,
            projectRequired: false
        },
        {
            id: 3,
            title: "Variables, Loops, and Conditionals",
            description: "Master programming concepts like variables, loops, and conditionals",
            questionCount: 20,
            projectRequired: false
        },
        {
            id: 4,
            title: "Events and Messaging",
            description: "Learn about events and communication between sprites",
            questionCount: 10,
            projectRequired: true,
            projectTitle: "Create a Simple Animation"
        },
        {
            id: 5,
            title: "Advanced Concepts",
            description: "Explore advanced topics like cloning and game development",
            questionCount: 5,
            projectRequired: true,
            projectTitle: "Build a Simple Game"
        }
    ];
    
    /**
     * Initialize the level manager
     */
    function init() {
        // Get DOM elements
        levelGrid = document.getElementById('level-grid');
        levelIndicators = document.getElementById('level-indicators');
        
        // Set up event listeners
        document.getElementById('start-button').addEventListener('click', () => {
            document.getElementById('welcome-screen').classList.remove('active');
            document.getElementById('level-select-screen').classList.add('active');
        });
        
        // Create level indicators
        createLevelIndicators();
        
        // Create level cards
        createLevelCards();
        
        // Update level status
        updateLevelStatus();
    }
    
    /**
     * Create level indicators in the header
     */
    function createLevelIndicators() {
        levelIndicators.innerHTML = '';
        
        levelData.forEach(level => {
            const indicator = document.createElement('div');
            indicator.className = 'level-indicator';
            indicator.textContent = level.id;
            indicator.dataset.level = level.id;
            
            levelIndicators.appendChild(indicator);
        });
    }
    
    /**
     * Create level selection cards
     */
    function createLevelCards() {
        levelGrid.innerHTML = '';
        
        levelData.forEach(level => {
            const card = document.createElement('div');
            card.className = 'level-card';
            card.dataset.level = level.id;
            
            const header = document.createElement('div');
            header.className = 'level-card-header';
            header.innerHTML = `<h3>Level ${level.id}</h3>`;
            
            const content = document.createElement('div');
            content.className = 'level-card-content';
            content.innerHTML = `
                <h4>${level.title}</h4>
                <p>${level.description}</p>
                <div class="level-progress">
                    <div class="level-progress-label">
                        <span>Progress</span>
                        <span class="level-score">0/${level.questionCount}${level.projectRequired ? ' + Project' : ''}</span>
                    </div>
                    <div class="level-progress-bar">
                        <div class="level-progress-fill" style="width: 0%"></div>
                    </div>
                </div>
            `;
            
            const footer = document.createElement('div');
            footer.className = 'level-card-footer';
            
            const status = document.createElement('div');
            status.className = 'level-status';
            status.textContent = 'Locked';
            
            const button = document.createElement('button');
            button.className = 'primary-button';
            button.textContent = 'Start Level';
            button.disabled = true;
            
            button.addEventListener('click', () => {
                document.getElementById('level-select-screen').classList.remove('active');
                
                // If level has a project, check if questions are completed first
                if (level.projectRequired) {
                    const userProgress = StorageManager.loadProgress();
                    const levelProgress = userProgress.levels.find(l => l.id === level.id);
                    
                    // If questions are completed, go to project screen
                    if (levelProgress && levelProgress.questions.length >= level.questionCount) {
                        QuizEngine.showProjectScreen(level.id);
                    } else {
                        // Otherwise, go to quiz screen
                        document.getElementById('quiz-screen').classList.add('active');
                        QuizEngine.init(level.id);
                    }
                } else {
                    // Go to quiz screen
                    document.getElementById('quiz-screen').classList.add('active');
                    QuizEngine.init(level.id);
                }
            });
            
            footer.appendChild(status);
            footer.appendChild(button);
            
            card.appendChild(header);
            card.appendChild(content);
            card.appendChild(footer);
            
            levelGrid.appendChild(card);
        });
    }
    
    /**
     * Update level status based on user progress
     */
    function updateLevelStatus() {
        const userProgress = StorageManager.loadProgress();
        
        if (!userProgress) return;
        
        // Update level indicators
        userProgress.levels.forEach(level => {
            const indicator = document.querySelector(`.level-indicator[data-level="${level.id}"]`);
            
            if (indicator) {
                if (level.completed) {
                    indicator.classList.add('completed');
                    indicator.classList.remove('unlocked', 'current');
                } else if (level.unlocked) {
                    indicator.classList.add('unlocked');
                    indicator.classList.remove('completed', 'current');
                    
                    // Mark the first unlocked but not completed level as current
                    if (!userProgress.levels.some(l => l.unlocked && !l.completed && l.id < level.id)) {
                        indicator.classList.add('current');
                    }
                }
            }
        });
        
        // Update level cards
        userProgress.levels.forEach(level => {
            const card = document.querySelector(`.level-card[data-level="${level.id}"]`);
            
            if (card) {
                const button = card.querySelector('button');
                const status = card.querySelector('.level-status');
                const progressFill = card.querySelector('.level-progress-fill');
                const scoreDisplay = card.querySelector('.level-score');
                
                // Update progress
                const levelInfo = levelData.find(l => l.id === level.id);
                const totalPoints = levelInfo.questionCount + (levelInfo.projectRequired ? 1 : 0);
                const progressPercent = (level.score / totalPoints) * 100;
                
                progressFill.style.width = `${progressPercent}%`;
                scoreDisplay.textContent = `${level.score}/${totalPoints}`;
                
                if (level.completed) {
                    card.classList.add('completed');
                    card.classList.remove('locked');
                    status.textContent = 'Completed';
                    status.className = 'level-status completed';
                    button.textContent = 'Replay Level';
                    button.disabled = false;
                } else if (level.unlocked) {
                    card.classList.remove('locked', 'completed');
                    status.textContent = 'Unlocked';
                    status.className = 'level-status unlocked';
                    button.textContent = 'Start Level';
                    button.disabled = false;
                } else {
                    card.classList.add('locked');
                    status.textContent = 'Locked';
                    status.className = 'level-status locked';
                    button.disabled = true;
                }
            }
        });
        
        // Update overall progress
        const overallProgress = document.getElementById('overall-progress');
        if (overallProgress) {
            overallProgress.style.width = `${userProgress.overallProgress}%`;
        }
    }
    
    // Public API
    return {
        init,
        updateLevelStatus
    };
})();
