/**
 * Main application script for the Scratch Programming Quiz Platform
 * Initializes and coordinates all components
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize storage
    const userProgress = StorageManager.init();
    
    // Initialize level manager
    LevelManager.init();
    
    // Initialize gamification system
    GamificationSystem.init();
    
    // Set up modal close buttons
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        document.querySelectorAll('.modal').forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Set up level complete buttons
    document.getElementById('retry-level').addEventListener('click', function() {
        document.getElementById('level-complete-screen').classList.remove('active');
        document.getElementById('quiz-screen').classList.add('active');
        
        const currentLevel = userProgress.currentLevel;
        QuizEngine.init(currentLevel);
    });
    
    // Set up all complete screen buttons
    document.getElementById('restart-all').addEventListener('click', function() {
        if (confirm('Are you sure you want to restart? This will reset all your progress.')) {
            StorageManager.resetProgress();
            location.reload();
        }
    });
    
    // Check if this is the first visit
    if (userProgress.firstVisit === undefined) {
        // Mark as visited
        userProgress.firstVisit = false;
        StorageManager.saveProgress(userProgress);
        
        // Show welcome screen
        document.getElementById('welcome-screen').classList.add('active');
    } else {
        // Show level select screen
        document.getElementById('level-select-screen').classList.add('active');
    }
});
