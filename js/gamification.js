/**
 * Gamification System for the Scratch Programming Quiz Platform
 * Handles badges, achievements, and other gamification elements
 */

const GamificationSystem = (function() {
    // Badge definitions
    const badges = {
        // Level completion badges
        level1_complete: {
            id: 'level1_complete',
            name: 'Scratch Beginner',
            description: 'Completed Level 1: Introduction to Scratch',
            type: 'level-badge'
        },
        level2_complete: {
            id: 'level2_complete',
            name: 'Motion Master',
            description: 'Completed Level 2: Basic Motion and Looks',
            type: 'level-badge'
        },
        level3_complete: {
            id: 'level3_complete',
            name: 'Code Logician',
            description: 'Completed Level 3: Variables, Loops, and Conditionals',
            type: 'level-badge'
        },
        level4_complete: {
            id: 'level4_complete',
            name: 'Event Handler',
            description: 'Completed Level 4: Events and Messaging',
            type: 'level-badge'
        },
        level5_complete: {
            id: 'level5_complete',
            name: 'Scratch Master',
            description: 'Completed Level 5: Advanced Concepts',
            type: 'level-badge'
        },
        
        // Perfect score badges
        level1_perfect: {
            id: 'level1_perfect',
            name: 'Perfect Beginner',
            description: 'Achieved a perfect score in Level 1',
            type: 'achievement-badge'
        },
        level2_perfect: {
            id: 'level2_perfect',
            name: 'Perfect Animator',
            description: 'Achieved a perfect score in Level 2',
            type: 'achievement-badge'
        },
        level3_perfect: {
            id: 'level3_perfect',
            name: 'Perfect Programmer',
            description: 'Achieved a perfect score in Level 3',
            type: 'achievement-badge'
        },
        level4_perfect: {
            id: 'level4_perfect',
            name: 'Perfect Communicator',
            description: 'Achieved a perfect score in Level 4',
            type: 'achievement-badge'
        },
        level5_perfect: {
            id: 'level5_perfect',
            name: 'Perfect Master',
            description: 'Achieved a perfect score in Level 5',
            type: 'achievement-badge'
        },
        
        // Concept mastery badges
        loops_master: {
            id: 'loops_master',
            name: 'Loop Master',
            description: 'Demonstrated mastery of loops in Scratch',
            type: 'concept-badge'
        },
        variables_master: {
            id: 'variables_master',
            name: 'Variable Virtuoso',
            description: 'Demonstrated mastery of variables in Scratch',
            type: 'concept-badge'
        },
        conditionals_master: {
            id: 'conditionals_master',
            name: 'Conditional Champion',
            description: 'Demonstrated mastery of conditionals in Scratch',
            type: 'concept-badge'
        },
        events_master: {
            id: 'events_master',
            name: 'Event Expert',
            description: 'Demonstrated mastery of events in Scratch',
            type: 'concept-badge'
        },
        cloning_master: {
            id: 'cloning_master',
            name: 'Clone Commander',
            description: 'Demonstrated mastery of cloning in Scratch',
            type: 'concept-badge'
        },
        
        // Special achievement badges
        all_levels_complete: {
            id: 'all_levels_complete',
            name: 'Scratch Champion',
            description: 'Completed all levels in the Scratch Programming Quiz',
            type: 'achievement-badge'
        },
        no_hints: {
            id: 'no_hints',
            name: 'Independent Thinker',
            description: 'Completed a level without using any hints',
            type: 'achievement-badge'
        },
        speed_demon: {
            id: 'speed_demon',
            name: 'Speed Demon',
            description: 'Completed a level in record time',
            type: 'achievement-badge'
        }
    };
    
    // DOM Elements
    let badgesModal;
    let modalBadgesContainer;
    
    /**
     * Initialize the gamification system
     */
    function init() {
        // Get DOM elements
        badgesModal = document.getElementById('badges-modal');
        modalBadgesContainer = document.getElementById('modal-badges-container');
        
        // Set up event listeners
        document.getElementById('show-badges').addEventListener('click', showBadgesModal);
        
        // Initialize badges in storage
        initializeBadges();
        
        // Update badge displays
        updateBadgeDisplays();
    }
    
    /**
     * Initialize badges in storage
     */
    function initializeBadges() {
        const userProgress = StorageManager.loadProgress();
        
        if (userProgress) {
            // Add any missing badges to storage
            Object.keys(badges).forEach(badgeId => {
                if (!userProgress.badges.some(badge => badge.id === badgeId)) {
                    StorageManager.updateBadgeProgress(badgeId, false);
                }
            });
            
            // Check for all levels complete badge
            if (userProgress.levels.every(level => level.completed)) {
                StorageManager.updateBadgeProgress('all_levels_complete', true);
            }
        }
    }
    
    /**
     * Update all badge displays
     */
    function updateBadgeDisplays() {
        updateModalBadges();
        updateNewBadges();
        updateAllBadges();
    }
    
    /**
     * Update badges in the modal
     */
    function updateModalBadges() {
        if (!modalBadgesContainer) return;
        
        modalBadgesContainer.innerHTML = '';
        
        const userProgress = StorageManager.loadProgress();
        
        if (userProgress) {
            // Group badges by type
            const badgesByType = {
                'level-badge': [],
                'concept-badge': [],
                'achievement-badge': []
            };
            
            // Add all badges to their respective groups
            Object.keys(badges).forEach(badgeId => {
                const badge = badges[badgeId];
                const userBadge = userProgress.badges.find(b => b.id === badgeId);
                const earned = userBadge && userBadge.earnedDate;
                
                badgesByType[badge.type].push({
                    ...badge,
                    earned: earned
                });
            });
            
            // Create badge elements for each type
            Object.keys(badgesByType).forEach(type => {
                const typeHeading = document.createElement('h3');
                typeHeading.textContent = getBadgeTypeTitle(type);
                modalBadgesContainer.appendChild(typeHeading);
                
                const badgeContainer = document.createElement('div');
                badgeContainer.className = 'badges-container';
                
                badgesByType[type].forEach(badge => {
                    const badgeElement = createBadgeElement(badge);
                    badgeContainer.appendChild(badgeElement);
                });
                
                modalBadgesContainer.appendChild(badgeContainer);
            });
        }
    }
    
    /**
     * Update newly earned badges on level complete screen
     */
    function updateNewBadges() {
        const newBadgesContainer = document.getElementById('new-badges');
        if (!newBadgesContainer) return;
        
        newBadgesContainer.innerHTML = '';
        
        const userProgress = StorageManager.loadProgress();
        
        if (userProgress) {
            // Get current level
            const currentLevel = userProgress.currentLevel;
            
            // Find badges earned for this level
            const levelBadges = [
                `level${currentLevel}_complete`,
                `level${currentLevel}_perfect`
            ];
            
            // Add concept badges based on level
            if (currentLevel === 3) {
                levelBadges.push('loops_master', 'variables_master', 'conditionals_master');
            } else if (currentLevel === 4) {
                levelBadges.push('events_master');
            } else if (currentLevel === 5) {
                levelBadges.push('cloning_master');
            }
            
            // Filter to only earned badges
            const earnedBadges = userProgress.badges.filter(badge => 
                levelBadges.includes(badge.id) && badge.earned
            );
            
            // Create badge elements
            earnedBadges.forEach(userBadge => {
                const badge = badges[userBadge.id];
                if (badge) {
                    const badgeElement = createBadgeElement({
                        ...badge,
                        earned: true,
                        new: true
                    });
                    newBadgesContainer.appendChild(badgeElement);
                }
            });
            
            // If no badges earned, show message
            if (earnedBadges.length === 0) {
                const message = document.createElement('p');
                message.textContent = 'No new badges earned. Keep practicing to earn badges!';
                newBadgesContainer.appendChild(message);
            }
        }
    }
    
    /**
     * Update all badges on completion screen
     */
    function updateAllBadges() {
        const allBadgesContainer = document.getElementById('all-badges-container');
        if (!allBadgesContainer) return;
        
        allBadgesContainer.innerHTML = '';
        
        const userProgress = StorageManager.loadProgress();
        
        if (userProgress) {
            // Get all earned badges
            const earnedBadges = userProgress.badges.filter(badge => badge.earned);
            
            // Create badge elements
            earnedBadges.forEach(userBadge => {
                const badge = badges[userBadge.id];
                if (badge) {
                    const badgeElement = createBadgeElement({
                        ...badge,
                        earned: true
                    });
                    allBadgesContainer.appendChild(badgeElement);
                }
            });
            
            // If no badges earned, show message
            if (earnedBadges.length === 0) {
                const message = document.createElement('p');
                message.textContent = 'No badges earned yet. Complete levels to earn badges!';
                allBadgesContainer.appendChild(message);
            }
        }
    }
    
    /**
     * Create a badge element
     * @param {Object} badge - Badge data
     * @returns {HTMLElement} Badge element
     */
    function createBadgeElement(badge) {
        const badgeElement = document.createElement('div');
        badgeElement.className = `badge ${badge.type}`;
        
        if (!badge.earned) {
            badgeElement.classList.add('locked');
        }
        
        if (badge.new) {
            badgeElement.classList.add('new-earned');
        }
        
        const badgeIcon = document.createElement('div');
        badgeIcon.className = 'badge-icon';
        
        // Use badge ID to determine icon content
        if (badge.id.includes('level')) {
            const levelNum = badge.id.match(/\d+/)[0];
            badgeIcon.textContent = levelNum;
        } else {
            // For concept and achievement badges, use first letter
            badgeIcon.textContent = badge.name.charAt(0);
        }
        
        const badgeName = document.createElement('div');
        badgeName.className = 'badge-name';
        badgeName.textContent = badge.earned ? badge.name : '???';
        
        badgeElement.appendChild(badgeIcon);
        badgeElement.appendChild(badgeName);
        
        // Add tooltip with description
        badgeElement.title = badge.earned ? badge.description : 'Badge locked. Complete more challenges to unlock!';
        
        return badgeElement;
    }
    
    /**
     * Get title for badge type
     * @param {string} type - Badge type
     * @returns {string} Title
     */
    function getBadgeTypeTitle(type) {
        switch(type) {
            case 'level-badge':
                return 'Level Badges';
            case 'concept-badge':
                return 'Concept Mastery';
            case 'achievement-badge':
                return 'Achievements';
            default:
                return 'Badges';
        }
    }
    
    /**
     * Show the badges modal
     */
    function showBadgesModal() {
        updateModalBadges();
        badgesModal.style.display = 'flex';
    }
    
    /**
     * Show badge notification
     * @param {string} badgeId - Badge ID
     */
    function showBadgeNotification(badgeId) {
        const badge = badges[badgeId];
        
        if (!badge) return;
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'badge-notification';
        
        const notificationIcon = document.createElement('div');
        notificationIcon.className = 'badge-notification-icon';
        
        // Use badge ID to determine icon content
        if (badge.id.includes('level')) {
            const levelNum = badge.id.match(/\d+/)[0];
            notificationIcon.textContent = levelNum;
        } else {
            // For concept and achievement badges, use first letter
            notificationIcon.textContent = badge.name.charAt(0);
        }
        
        const notificationContent = document.createElement('div');
        notificationContent.className = 'badge-notification-content';
        
        const notificationTitle = document.createElement('h4');
        notificationTitle.textContent = 'New Badge Earned!';
        
        const notificationText = document.createElement('p');
        notificationText.textContent = badge.name;
        
        notificationContent.appendChild(notificationTitle);
        notificationContent.appendChild(notificationText);
        
        notification.appendChild(notificationIcon);
        notification.appendChild(notificationContent);
        
        // Add to document
        document.body.appendChild(notification);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 5000);
    }
    
    /**
     * Check for concept mastery badges
     * @param {number} levelId - Level ID
     * @param {Object} questionResults - Question results
     */
    function checkConceptMasteryBadges(levelId, questionResults) {
        // This would analyze question results to determine if concept badges should be awarded
        // For example, if a user correctly answers all questions related to loops
        
        // Implementation would depend on how questions are tagged with concepts
    }
    
    // Public API
    return {
        init,
        updateBadgeDisplays,
        showBadgeNotification,
        checkConceptMasteryBadges
    };
})();
