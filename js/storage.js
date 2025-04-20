/**
 * Storage management for the Scratch Quiz Platform
 * Handles saving and loading user progress using localStorage
 */

const StorageManager = (function() {
    // Default user progress structure
    const defaultUserProgress = {
        currentLevel: 1,
        levels: [
            {
                id: 1,
                unlocked: true,
                completed: false,
                score: 0,
                maxScore: 20,
                questions: []
            },
            {
                id: 2,
                unlocked: false,
                completed: false,
                score: 0,
                maxScore: 20,
                questions: []
            },
            {
                id: 3,
                unlocked: false,
                completed: false,
                score: 0,
                maxScore: 20,
                questions: []
            },
            {
                id: 4,
                unlocked: false,
                completed: false,
                score: 0,
                maxScore: 11, // 10 questions + 1 project
                questions: [],
                project: {
                    completed: false,
                    score: 0
                }
            },
            {
                id: 5,
                unlocked: false,
                completed: false,
                score: 0,
                maxScore: 6, // 5 questions + 1 project
                questions: [],
                project: {
                    completed: false,
                    score: 0
                }
            }
        ],
        badges: [],
        hintsRemaining: 3,
        overallProgress: 0
    };

    // Storage key
    const STORAGE_KEY = 'scratch_quiz_progress';

    /**
     * Initialize storage
     * @returns {Object} User progress data
     */
    function init() {
        let userProgress = loadProgress();
        
        if (!userProgress) {
            userProgress = JSON.parse(JSON.stringify(defaultUserProgress));
            saveProgress(userProgress);
        }
        
        return userProgress;
    }

    /**
     * Load user progress from localStorage
     * @returns {Object|null} User progress data or null if not found
     */
    function loadProgress() {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : null;
    }

    /**
     * Save user progress to localStorage
     * @param {Object} progress - User progress data
     */
    function saveProgress(progress) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }

    /**
     * Update level progress
     * @param {number} levelId - Level ID
     * @param {Object} levelData - Updated level data
     */
    function updateLevelProgress(levelId, levelData) {
        const userProgress = loadProgress();
        
        if (userProgress) {
            const levelIndex = userProgress.levels.findIndex(level => level.id === levelId);
            
            if (levelIndex !== -1) {
                userProgress.levels[levelIndex] = {
                    ...userProgress.levels[levelIndex],
                    ...levelData
                };
                
                // Update overall progress
                updateOverallProgress(userProgress);
                
                saveProgress(userProgress);
            }
        }
    }

    /**
     * Update question progress within a level
     * @param {number} levelId - Level ID
     * @param {string} questionId - Question ID
     * @param {boolean} correct - Whether the answer was correct
     */
    function updateQuestionProgress(levelId, questionId, correct) {
        const userProgress = loadProgress();
        
        if (userProgress) {
            const levelIndex = userProgress.levels.findIndex(level => level.id === levelId);
            
            if (levelIndex !== -1) {
                const level = userProgress.levels[levelIndex];
                const questionIndex = level.questions.findIndex(q => q.id === questionId);
                
                if (questionIndex !== -1) {
                    level.questions[questionIndex] = {
                        ...level.questions[questionIndex],
                        answered: true,
                        correct: correct
                    };
                } else {
                    level.questions.push({
                        id: questionId,
                        answered: true,
                        correct: correct
                    });
                }
                
                // Update level score
                level.score = level.questions.filter(q => q.correct).length;
                
                // Check if level is completed
                const questionsRequired = level.id <= 3 ? 20 : (level.id === 4 ? 10 : 5);
                const projectRequired = level.id >= 4;
                
                const questionsCompleted = level.questions.filter(q => q.answered).length >= questionsRequired;
                const projectCompleted = !projectRequired || (level.project && level.project.completed);
                
                if (questionsCompleted && projectCompleted) {
                    level.completed = true;
                    
                    // Unlock next level if available
                    if (levelIndex < userProgress.levels.length - 1) {
                        userProgress.levels[levelIndex + 1].unlocked = true;
                    }
                }
                
                // Update overall progress
                updateOverallProgress(userProgress);
                
                saveProgress(userProgress);
            }
        }
    }

    /**
     * Update project progress within a level
     * @param {number} levelId - Level ID
     * @param {boolean} completed - Whether the project was completed
     * @param {number} score - Project score
     */
    function updateProjectProgress(levelId, completed, score) {
        const userProgress = loadProgress();
        
        if (userProgress) {
            const levelIndex = userProgress.levels.findIndex(level => level.id === levelId);
            
            if (levelIndex !== -1 && userProgress.levels[levelIndex].project) {
                userProgress.levels[levelIndex].project = {
                    completed: completed,
                    score: score
                };
                
                // Update level score to include project
                const questionsScore = userProgress.levels[levelIndex].questions.filter(q => q.correct).length;
                userProgress.levels[levelIndex].score = questionsScore + (completed ? 1 : 0);
                
                // Check if level is completed
                const questionsRequired = levelId === 4 ? 10 : 5;
                const questionsCompleted = userProgress.levels[levelIndex].questions.filter(q => q.answered).length >= questionsRequired;
                
                if (questionsCompleted && completed) {
                    userProgress.levels[levelIndex].completed = true;
                    
                    // Unlock next level if available
                    if (levelIndex < userProgress.levels.length - 1) {
                        userProgress.levels[levelIndex + 1].unlocked = true;
                    }
                }
                
                // Update overall progress
                updateOverallProgress(userProgress);
                
                saveProgress(userProgress);
            }
        }
    }

    /**
     * Update badge progress
     * @param {string} badgeId - Badge ID
     * @param {boolean} earned - Whether the badge was earned
     * @returns {boolean} Whether the badge was newly earned
     */
    function updateBadgeProgress(badgeId, earned) {
        const userProgress = loadProgress();
        let newlyEarned = false;
        
        if (userProgress) {
            const badgeIndex = userProgress.badges.findIndex(badge => badge.id === badgeId);
            
            if (badgeIndex !== -1) {
                if (!userProgress.badges[badgeIndex].earned && earned) {
                    newlyEarned = true;
                }
                userProgress.badges[badgeIndex].earned = earned;
                if (earned && !userProgress.badges[badgeIndex].date) {
                    userProgress.badges[badgeIndex].date = new Date().toISOString().split('T')[0];
                }
            } else if (earned) {
                userProgress.badges.push({
                    id: badgeId,
                    earned: true,
                    date: new Date().toISOString().split('T')[0]
                });
                newlyEarned = true;
            } else {
                userProgress.badges.push({
                    id: badgeId,
                    earned: false
                });
            }
            
            saveProgress(userProgress);
        }
        
        return newlyEarned;
    }

    /**
     * Update hints remaining
     * @param {number} hintsUsed - Number of hints used
     */
    function updateHints(hintsUsed) {
        const userProgress = loadProgress();
        
        if (userProgress) {
            userProgress.hintsRemaining = Math.max(0, userProgress.hintsRemaining - hintsUsed);
            saveProgress(userProgress);
        }
    }

    /**
     * Add hints to the user's available hints
     * @param {number} hintsToAdd - Number of hints to add
     */
    function addHints(hintsToAdd) {
        const userProgress = loadProgress();
        
        if (userProgress) {
            userProgress.hintsRemaining += hintsToAdd;
            saveProgress(userProgress);
        }
    }

    /**
     * Update overall progress percentage
     * @param {Object} userProgress - User progress data
     */
    function updateOverallProgress(userProgress) {
        let totalPoints = 0;
        let earnedPoints = 0;
        
        userProgress.levels.forEach(level => {
            totalPoints += level.maxScore;
            earnedPoints += level.score;
        });
        
        userProgress.overallProgress = Math.round((earnedPoints / totalPoints) * 100);
    }

    /**
     * Reset all progress
     */
    function resetProgress() {
        localStorage.removeItem(STORAGE_KEY);
        init();
    }

    // Public API
    return {
        init,
        loadProgress,
        saveProgress,
        updateLevelProgress,
        updateQuestionProgress,
        updateProjectProgress,
        updateBadgeProgress,
        updateHints,
        addHints,
        resetProgress
    };
})();
