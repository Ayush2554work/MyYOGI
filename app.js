// MyYogi Smart Yoga Mat App - Interactive JavaScript

class MyYogiApp {
    constructor() {
        this.currentTab = 'dashboard';
        this.currentTheme = 'light';
        this.isPracticeActive = false;
        this.practiceTimer = null;
        this.biometricInterval = null;
        this.breathingInterval = null;
        this.heartRateData = [];
        this.pressureZones = [];
        this.achievements = [];
        
        this.init();
    }

    init() {
        this.showLoadingScreen();
        this.setupEventListeners();
        this.setupKeyboardShortcuts();
        this.initializeCharts();
        this.startBiometricSimulation();
        this.animateProgressBars();
        setTimeout(() => this.hideLoadingScreen(), 3000);
    }

    showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const app = document.getElementById('app');
        
        loadingScreen.style.display = 'flex';
        app.classList.add('hidden');
        
        // Animate loading progress
        const progressFill = document.querySelector('.progress-fill');
        progressFill.style.width = '0%';
        
        setTimeout(() => {
            progressFill.style.width = '100%';
        }, 500);
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const app = document.getElementById('app');
        
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            app.classList.remove('hidden');
            this.animateWelcomeSection();
            this.animateStatCards();
        }, 300);
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Dashboard interactions
        this.setupDashboardEvents();
        this.setupPracticeEvents();
        this.setupAnalyticsEvents();
        this.setupSocialEvents();
        this.setupGamesEvents();
        this.setupSettingsEvents();
        this.setupModalEvents();
    }

    setupDashboardEvents() {
        // Interactive stat cards
        document.querySelectorAll('.stat-card.interactive').forEach(card => {
            card.addEventListener('click', (e) => {
                this.showStatDetails(e.currentTarget.dataset.stat);
            });
        });

        // Calendar day interactions
        document.querySelectorAll('.calendar-day').forEach(day => {
            day.addEventListener('click', (e) => {
                this.showDayDetails(e.currentTarget.dataset.day);
            });
        });

        // Quick action buttons
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleQuickAction(e.currentTarget.dataset.action);
            });
        });

        // Achievement interactions
        document.querySelectorAll('.achievement-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.showAchievementDetails(e.currentTarget.dataset.achievement);
            });
        });

        // Goal editing
        document.querySelectorAll('.goal-edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const goalCard = e.target.closest('.goal-card');
                this.openGoalEditor(goalCard.dataset.goal);
            });
        });
    }

    setupPracticeEvents() {
        // Start practice button
        const startBtn = document.getElementById('start-practice');
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.startPracticeSession();
            });
        }

        // Routine selection
        document.querySelectorAll('.routine-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.selectRoutine(e.currentTarget.dataset.routine);
            });
        });

        // Practice controls
        const playPauseBtn = document.getElementById('play-pause');
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', () => {
                this.togglePractice();
            });
        }

        const prevBtn = document.getElementById('prev-pose');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.previousPose();
            });
        }

        const nextBtn = document.getElementById('next-pose');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.nextPose();
            });
        }

        const endBtn = document.getElementById('end-session');
        if (endBtn) {
            endBtn.addEventListener('click', () => {
                this.endPracticeSession();
            });
        }

        // Pose timer
        const poseTimerBtn = document.getElementById('pose-timer');
        if (poseTimerBtn) {
            poseTimerBtn.addEventListener('click', () => {
                this.togglePoseTimer();
            });
        }

        // Pressure zone interactions
        document.querySelectorAll('.pressure-zone').forEach(zone => {
            zone.addEventListener('click', (e) => {
                this.showPressureDetails(e.target.dataset.zone);
            });

            zone.addEventListener('mouseenter', (e) => {
                this.highlightPressureZone(e.target);
            });

            zone.addEventListener('mouseleave', (e) => {
                this.unhighlightPressureZone(e.target);
            });
        });
    }

    setupAnalyticsEvents() {
        // Time range selector
        document.querySelectorAll('.range-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.changeTimeRange(e.target.dataset.range);
            });
        });

        // Interactive chart elements
        setTimeout(() => {
            this.makeChartsInteractive();
        }, 1000);
    }

    setupSocialEvents() {
        // Leaderboard interactions
        document.querySelectorAll('.leaderboard-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.showUserProfile(e.currentTarget);
            });
        });

        // Friend activity interactions
        document.querySelectorAll('.action-btn.like').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.likeActivity(e.target);
            });
        });

        document.querySelectorAll('.action-btn.comment').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.commentOnActivity(e.target);
            });
        });

        // Challenge interactions
        document.querySelectorAll('.challenge-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.showChallengeDetails(e.currentTarget);
            });
        });

        // Invite friends
        const inviteBtn = document.getElementById('invite-friends');
        if (inviteBtn) {
            inviteBtn.addEventListener('click', () => {
                this.showInviteModal();
            });
        }
    }

    setupGamesEvents() {
        // Game cards
        document.querySelectorAll('.game-card').forEach(card => {
            card.addEventListener('click', (e) => {
                this.startGame(e.currentTarget.dataset.game);
            });
        });

        // Game play buttons
        document.querySelectorAll('.game-play-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const gameCard = e.target.closest('.game-card');
                this.startGame(gameCard.dataset.game);
            });
        });
    }

    setupSettingsEvents() {
        // Theme options
        document.querySelectorAll('.theme-option').forEach(option => {
            option.addEventListener('click', (e) => {
                this.changeTheme(e.currentTarget.dataset.theme);
            });
        });

        // Volume sliders
        const masterVolumeSlider = document.getElementById('master-volume');
        if (masterVolumeSlider) {
            masterVolumeSlider.addEventListener('input', (e) => {
                this.updateVolumeDisplay(e.target, 'master');
            });
        }

        const voiceVolumeSlider = document.getElementById('voice-volume');
        if (voiceVolumeSlider) {
            voiceVolumeSlider.addEventListener('input', (e) => {
                this.updateVolumeDisplay(e.target, 'voice');
            });
        }

        const effectsVolumeSlider = document.getElementById('effects-volume');
        if (effectsVolumeSlider) {
            effectsVolumeSlider.addEventListener('input', (e) => {
                this.updateVolumeDisplay(e.target, 'effects');
            });
        }

        // Mat controls
        const ledBrightnessSlider = document.getElementById('led-brightness');
        if (ledBrightnessSlider) {
            ledBrightnessSlider.addEventListener('input', (e) => {
                this.updateBrightnessDisplay(e.target);
            });
        }

        const matSensitivitySlider = document.getElementById('mat-sensitivity');
        if (matSensitivitySlider) {
            matSensitivitySlider.addEventListener('input', (e) => {
                this.updateSensitivityDisplay(e.target);
            });
        }

        // LED color picker
        document.querySelectorAll('.color-option').forEach(option => {
            option.addEventListener('click', (e) => {
                this.changeLedColor(e.target.dataset.color);
            });
        });
    }

    setupModalEvents() {
        // Modal close buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                this.closeModal(modal);
            });
        });

        // Modal backgrounds
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal);
                }
            });
        });

        // Goal editor
        const goalTargetSlider = document.getElementById('goal-target');
        if (goalTargetSlider) {
            goalTargetSlider.addEventListener('input', (e) => {
                const valueDisplay = document.querySelector('.goal-target-value');
                if (valueDisplay) {
                    valueDisplay.textContent = `${e.target.value} sessions`;
                }
            });
        }

        const saveGoalBtn = document.getElementById('save-goal');
        if (saveGoalBtn) {
            saveGoalBtn.addEventListener('click', () => {
                this.saveGoal();
            });
        }

        const cancelGoalBtn = document.getElementById('cancel-goal');
        if (cancelGoalBtn) {
            cancelGoalBtn.addEventListener('click', () => {
                this.closeModal(document.getElementById('goal-edit-modal'));
            });
        }
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Space bar for play/pause
            if (e.code === 'Space' && this.currentTab === 'practice') {
                e.preventDefault();
                this.togglePractice();
                this.showVoiceCommandFeedback();
            }

            // Number keys for quick navigation
            if (e.key >= '1' && e.key <= '6') {
                const tabs = ['dashboard', 'practice', 'analytics', 'social', 'games', 'settings'];
                const tabIndex = parseInt(e.key) - 1;
                if (tabs[tabIndex]) {
                    this.switchTab(tabs[tabIndex]);
                }
            }

            // Escape to close modals
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    switchTab(tabName) {
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const targetNavBtn = document.querySelector(`[data-tab="${tabName}"]`);
        if (targetNavBtn) {
            targetNavBtn.classList.add('active');
        }

        // Update content - this was the main issue
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        const targetContent = document.getElementById(tabName);
        if (targetContent) {
            targetContent.classList.add('active');
        }

        this.currentTab = tabName;
        
        // Tab-specific initializations
        if (tabName === 'practice') {
            this.initializePracticeMode();
        } else if (tabName === 'analytics') {
            this.refreshAnalytics();
        }
    }

    toggleTheme() {
        const themes = ['light', 'dark', 'yoga'];
        const currentIndex = themes.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        this.currentTheme = themes[nextIndex];
        
        document.body.setAttribute('data-color-scheme', this.currentTheme);
        
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcons = ['🌙', '☀️', '🧘‍♀️'];
        themeToggle.textContent = themeIcons[nextIndex];
        
        this.animateThemeChange();
    }

    animateThemeChange() {
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }

    animateWelcomeSection() {
        const welcomeSection = document.querySelector('.welcome-section');
        if (welcomeSection) {
            welcomeSection.style.opacity = '0';
            welcomeSection.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                welcomeSection.style.transition = 'all 0.6s ease';
                welcomeSection.style.opacity = '1';
                welcomeSection.style.transform = 'translateY(0)';
            }, 100);
        }
    }

    animateStatCards() {
        document.querySelectorAll('.stat-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.4s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                
                // Animate counter
                const valueElement = card.querySelector('.stat-value');
                if (valueElement && valueElement.dataset.count) {
                    this.animateCounter(valueElement, parseInt(valueElement.dataset.count));
                }
            }, index * 100);
        });
    }

    animateCounter(element, target) {
        const duration = 1500;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }

    animateProgressBars() {
        setTimeout(() => {
            // Animate progress rings
            document.querySelectorAll('.progress-foreground').forEach(circle => {
                const progress = circle.dataset.progress;
                if (progress) {
                    const circumference = 2 * Math.PI * 25;
                    const offset = circumference - (progress / 100) * circumference;
                    circle.style.strokeDashoffset = offset;
                }
            });

            // Animate goal progress bars
            document.querySelectorAll('.goal-progress-fill').forEach(fill => {
                const progress = fill.dataset.progress;
                if (progress) {
                    setTimeout(() => {
                        fill.style.width = `${progress}%`;
                    }, Math.random() * 1000);
                }
            });

            // Animate metric bars
            document.querySelectorAll('.metric-fill').forEach(fill => {
                const percentage = fill.dataset.percentage;
                if (percentage) {
                    setTimeout(() => {
                        fill.style.width = `${percentage}%`;
                    }, Math.random() * 1000);
                }
            });

            // Animate challenge progress
            document.querySelectorAll('.challenge-progress .progress-fill').forEach(fill => {
                const progress = fill.dataset.progress;
                if (progress) {
                    setTimeout(() => {
                        fill.style.width = `${progress}%`;
                    }, Math.random() * 1000);
                }
            });
        }, 500);
    }

    initializeCharts() {
        this.createWeeklyChart();
        this.createHeartRateChart();
    }

    createWeeklyChart() {
        const ctx = document.getElementById('weekly-chart');
        if (!ctx) return;

        const weeklyData = [
            { day: 'Mon', sessions: 2, minutes: 45, accuracy: 88 },
            { day: 'Tue', sessions: 1, minutes: 25, accuracy: 91 },
            { day: 'Wed', sessions: 1, minutes: 30, accuracy: 89 },
            { day: 'Thu', sessions: 2, minutes: 50, accuracy: 93 },
            { day: 'Fri', sessions: 1, minutes: 20, accuracy: 87 },
            { day: 'Sat', sessions: 2, minutes: 55, accuracy: 95 },
            { day: 'Sun', sessions: 1, minutes: 30, accuracy: 92 }
        ];

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: weeklyData.map(d => d.day),
                datasets: [{
                    label: 'Minutes',
                    data: weeklyData.map(d => d.minutes),
                    backgroundColor: '#1FB8CD',
                    borderRadius: 6,
                    borderSkipped: false,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0,0,0,0.1)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                animation: {
                    duration: 1500,
                    easing: 'easeOutQuart'
                }
            }
        });
    }

    createHeartRateChart() {
        const ctx = document.getElementById('heart-rate-chart');
        if (!ctx) return;

        // Generate heart rate data
        for (let i = 0; i < 20; i++) {
            this.heartRateData.push(85 + Math.random() * 10);
        }

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array.from({length: 20}, (_, i) => i),
                datasets: [{
                    data: this.heartRateData,
                    borderColor: '#ff5459',
                    backgroundColor: 'rgba(255, 84, 89, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        display: false,
                        min: 75,
                        max: 100
                    },
                    x: {
                        display: false
                    }
                },
                elements: {
                    point: {
                        radius: 0
                    }
                },
                animation: {
                    duration: 0
                }
            }
        });
    }

    startBiometricSimulation() {
        this.biometricInterval = setInterval(() => {
            this.updateHeartRate();
            this.updateBreathingAnimation();
            this.updatePressureMap();
        }, 1000);
    }

    updateHeartRate() {
        const heartRateElement = document.getElementById('heart-rate');
        if (!heartRateElement) return;

        const currentRate = parseInt(heartRateElement.textContent);
        const variation = (Math.random() - 0.5) * 6;
        const newRate = Math.max(80, Math.min(100, currentRate + variation));
        
        heartRateElement.textContent = Math.round(newRate);
        
        // Update heart rate chart
        if (this.heartRateData.length > 20) {
            this.heartRateData.shift();
        }
        this.heartRateData.push(newRate);
    }

    updateBreathingAnimation() {
        const breathingCircle = document.getElementById('breathing-circle');
        if (!breathingCircle) return;

        // The breathing animation is handled by CSS, but we can trigger states
        breathingCircle.style.animationDuration = '4s';
    }

    updatePressureMap() {
        document.querySelectorAll('.pressure-zone').forEach(zone => {
            const intensity = Math.random();
            let className = 'pressure-zone ';
            
            if (intensity > 0.7) {
                className += 'high';
            } else if (intensity > 0.4) {
                className += 'medium';
            } else {
                className += 'low';
            }
            
            zone.className = className;
        });

        // Update center of gravity
        const centerGravity = document.getElementById('center-gravity');
        if (centerGravity) {
            const offsetX = (Math.random() - 0.5) * 10;
            const offsetY = (Math.random() - 0.5) * 10;
            centerGravity.style.left = `calc(45% + ${offsetX}px)`;
            centerGravity.style.top = `calc(45% + ${offsetY}px)`;
        }
    }

    startPracticeSession() {
        this.isPracticeActive = true;
        const startBtn = document.getElementById('start-practice');
        if (startBtn) {
            startBtn.textContent = 'Session Active';
            startBtn.disabled = true;
        }
        
        this.showNotification('Practice session started! 🧘‍♀️', 'success');
        this.startPoseTimer();
    }

    startPoseTimer() {
        let seconds = 0;
        this.practiceTimer = setInterval(() => {
            seconds++;
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            const timerDisplay = document.querySelector('.timer-display');
            if (timerDisplay) {
                timerDisplay.textContent = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
            }
        }, 1000);
    }

    togglePractice() {
        const playPauseBtn = document.getElementById('play-pause');
        const poseTimerBtn = document.getElementById('pose-timer');
        
        if (this.isPracticeActive) {
            // Pause
            if (playPauseBtn) playPauseBtn.textContent = '▶️ Resume';
            if (poseTimerBtn) poseTimerBtn.textContent = '▶️';
            clearInterval(this.practiceTimer);
            this.isPracticeActive = false;
        } else {
            // Resume
            if (playPauseBtn) playPauseBtn.textContent = '⏸️ Pause';
            if (poseTimerBtn) poseTimerBtn.textContent = '⏸️';
            this.startPoseTimer();
            this.isPracticeActive = true;
        }
    }

    togglePoseTimer() {
        this.togglePractice();
    }

    previousPose() {
        this.showNotification('Previous pose selected', 'info');
    }

    nextPose() {
        this.showNotification('Next pose selected', 'info');
    }

    endPracticeSession() {
        if (this.practiceTimer) {
            clearInterval(this.practiceTimer);
        }
        
        this.isPracticeActive = false;
        const startBtn = document.getElementById('start-practice');
        if (startBtn) {
            startBtn.textContent = 'Start Practice';
            startBtn.disabled = false;
        }
        
        this.showSessionSummary();
    }

    showSessionSummary() {
        const modal = this.createModal('Session Complete! 🎉', `
            <div class="session-summary">
                <div class="summary-stats">
                    <div class="summary-stat">
                        <span class="stat-value">25</span>
                        <span class="stat-label">Minutes</span>
                    </div>
                    <div class="summary-stat">
                        <span class="stat-value">94%</span>
                        <span class="stat-label">Accuracy</span>
                    </div>
                    <div class="summary-stat">
                        <span class="stat-value">120</span>
                        <span class="stat-label">Calories</span>
                    </div>
                </div>
                <div class="achievements-earned">
                    <h4>New Achievement Unlocked!</h4>
                    <div class="achievement-badge">🌅 Morning Warrior</div>
                </div>
            </div>
        `);
        
        this.showModal(modal);
    }

    selectRoutine(routineName) {
        document.querySelectorAll('.routine-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const selectedRoutine = document.querySelector(`[data-routine="${routineName}"]`);
        if (selectedRoutine) {
            selectedRoutine.classList.add('active');
        }
        this.showNotification(`Selected: ${routineName} routine`, 'info');
    }

    showStatDetails(statType) {
        const details = {
            sessions: 'You\'ve completed 52 sessions this month. Keep up the great work!',
            minutes: 'You\'ve practiced for 890 minutes total. That\'s nearly 15 hours of yoga!',
            calories: 'You\'ve burned 4,250 calories through your yoga practice. Amazing!',
            accuracy: 'Your average pose accuracy is 92%. You\'re doing excellent!'
        };
        
        this.showNotification(details[statType] || 'Great progress!', 'info');
    }

    showDayDetails(day) {
        const dayData = {
            mon: { sessions: 2, minutes: 45 },
            tue: { sessions: 1, minutes: 25 },
            wed: { sessions: 1, minutes: 30 },
            thu: { sessions: 2, minutes: 50 },
            fri: { sessions: 1, minutes: 20 },
            sat: { sessions: 2, minutes: 55 },
            sun: { sessions: 1, minutes: 30 }
        };
        
        const data = dayData[day];
        if (data) {
            this.showNotification(`${day.toUpperCase()}: ${data.sessions} session(s), ${data.minutes} minutes`, 'info');
        }
    }

    showAchievementDetails(achievement) {
        const details = {
            'early-bird': 'You\'ve unlocked the Early Bird achievement by completing 10 morning sessions!',
            'balance-master': 'You\'ve mastered balance by holding tree pose for 60 seconds!',
            'strength-guru': 'Complete 5 more strength sessions to unlock this achievement!'
        };
        
        this.showNotification(details[achievement] || 'Achievement details', 'info');
    }

    handleQuickAction(action) {
        const actions = {
            'quick-session': () => {
                this.switchTab('practice');
                this.showNotification('Starting quick 10-minute session...', 'success');
            },
            'morning-flow': () => {
                this.switchTab('practice');
                this.selectRoutine('morning');
                this.showNotification('Morning Flow selected!', 'success');
            },
            'breathing': () => {
                this.startBreathingExercise();
            },
            'balance': () => {
                this.switchTab('games');
                this.startGame('balance');
            }
        };
        
        if (actions[action]) {
            actions[action]();
        }
    }

    startBreathingExercise() {
        const modal = this.createModal('Breathing Exercise', `
            <div class="breathing-exercise">
                <div class="breathing-circle-large" id="breathing-exercise-circle"></div>
                <div class="breathing-instructions">
                    <p>Follow the circle</p>
                    <p><strong>Inhale</strong> as it expands</p>
                    <p><strong>Exhale</strong> as it contracts</p>
                </div>
                <div class="breathing-controls">
                    <button class="btn btn--secondary" id="stop-breathing">Stop</button>
                </div>
            </div>
            <style>
                .breathing-circle-large {
                    width: 120px;
                    height: 120px;
                    border: 4px solid var(--color-primary);
                    border-radius: 50%;
                    margin: 0 auto 20px;
                    animation: breathe-large 6s infinite;
                }
                .breathing-instructions {
                    text-align: center;
                    margin-bottom: 20px;
                }
                .breathing-controls {
                    text-align: center;
                }
                @keyframes breathe-large {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.3); }
                }
            </style>
        `);
        
        this.showModal(modal);
        
        // Add stop button functionality
        setTimeout(() => {
            const stopBtn = document.getElementById('stop-breathing');
            if (stopBtn) {
                stopBtn.addEventListener('click', () => {
                    this.closeModal(modal);
                });
            }
        }, 100);
    }

    openGoalEditor(goalType) {
        const modal = document.getElementById('goal-edit-modal');
        const goalTypeSelect = document.getElementById('goal-type');
        if (goalTypeSelect) {
            goalTypeSelect.value = goalType;
        }
        this.showModal(modal);
    }

    saveGoal() {
        const goalTypeSelect = document.getElementById('goal-type');
        const targetSlider = document.getElementById('goal-target');
        const deadlineInput = document.getElementById('goal-deadline');
        
        const goalType = goalTypeSelect ? goalTypeSelect.value : 'unknown';
        const target = targetSlider ? targetSlider.value : '0';
        const deadline = deadlineInput ? deadlineInput.value : 'not set';
        
        this.showNotification(`${goalType} goal updated: ${target} sessions by ${deadline}`, 'success');
        this.closeModal(document.getElementById('goal-edit-modal'));
    }

    changeTimeRange(range) {
        document.querySelectorAll('.range-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const selectedBtn = document.querySelector(`[data-range="${range}"]`);
        if (selectedBtn) {
            selectedBtn.classList.add('active');
        }
        
        this.showNotification(`Analytics view changed to ${range}`, 'info');
    }

    showUserProfile(userItem) {
        const userName = userItem.querySelector('.user-name');
        const name = userName ? userName.textContent : 'User';
        this.showNotification(`Viewing profile: ${name}`, 'info');
    }

    likeActivity(btn) {
        btn.style.background = 'var(--color-success)';
        btn.style.transform = 'scale(1.2)';
        this.showNotification('Activity liked! 👍', 'success');
        
        setTimeout(() => {
            btn.style.background = '';
            btn.style.transform = '';
        }, 500);
    }

    commentOnActivity(btn) {
        this.showNotification('Comment feature coming soon! 💬', 'info');
    }

    showChallengeDetails(challengeItem) {
        const challengeName = challengeItem.querySelector('.challenge-name');
        const name = challengeName ? challengeName.textContent : 'Challenge';
        this.showNotification(`Challenge details: ${name}`, 'info');
    }

    showInviteModal() {
        const modal = this.createModal('Invite Friends', `
            <div class="invite-content">
                <p>Share MyYogi with your friends and practice together!</p>
                <div class="invite-methods">
                    <button class="btn btn--primary" onclick="navigator.share ? navigator.share({title: 'MyYogi', text: 'Join me on MyYogi!'}) : alert('Share link copied!')">Share Link</button>
                    <button class="btn btn--secondary">Send Email</button>
                </div>
            </div>
        `);
        this.showModal(modal);
    }

    startGame(gameType) {
        const gameModal = document.getElementById('game-modal');
        const gameTitle = document.getElementById('game-title');
        const gameArea = document.getElementById('game-area');
        
        const games = {
            balance: {
                title: 'Balance Challenge',
                content: this.createBalanceGame()
            },
            memory: {
                title: 'Pose Memory Game',
                content: this.createMemoryGame()
            },
            breathing: {
                title: 'Breath Master',
                content: this.createBreathingGame()
            },
            puzzle: {
                title: 'Daily Puzzle',
                content: this.createPuzzleGame()
            }
        };
        
        const game = games[gameType];
        if (game && gameTitle && gameArea) {
            gameTitle.textContent = game.title;
            gameArea.innerHTML = game.content;
            this.showModal(gameModal);
        }
    }

    createBalanceGame() {
        return `
            <div class="balance-game">
                <div class="balance-meter">
                    <div class="balance-indicator" id="balance-indicator"></div>
                </div>
                <div class="balance-score">
                    Score: <span id="balance-score">0</span>
                </div>
                <div class="balance-instructions">
                    Stay centered to earn points!<br>
                    <small>Move mouse to simulate balance</small>
                </div>
            </div>
            <style>
                .balance-game {
                    text-align: center;
                    padding: 20px;
                }
                .balance-meter {
                    width: 200px;
                    height: 20px;
                    background: var(--color-secondary);
                    border-radius: 10px;
                    position: relative;
                    margin: 20px auto;
                }
                .balance-indicator {
                    width: 20px;
                    height: 20px;
                    background: var(--color-primary);
                    border-radius: 50%;
                    position: absolute;
                    top: 0;
                    left: 90px;
                    transition: left 0.1s ease;
                }
                .balance-score {
                    font-size: 18px;
                    font-weight: bold;
                    margin: 20px 0;
                }
            </style>
        `;
    }

    createMemoryGame() {
        const poses = ['🧘‍♀️', '🤸‍♀️', '🏃‍♀️', '💪', '🤲', '🙏'];
        let gameGrid = '<div class="memory-grid">';
        
        for (let i = 0; i < 8; i++) {
            const pose = poses[Math.floor(Math.random() * poses.length)];
            gameGrid += `<div class="memory-card" data-pose="${pose}">${pose}</div>`;
        }
        gameGrid += '</div>';
        
        return `
            <div class="memory-game">
                <div class="memory-instructions">
                    Remember the sequence and recreate it!
                </div>
                ${gameGrid}
                <div class="memory-controls">
                    <button class="btn btn--primary" onclick="this.closest('.game-area').querySelector('.memory-game').style.display='none'">Start Game</button>
                </div>
            </div>
            <style>
                .memory-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 10px;
                    margin: 20px 0;
                    max-width: 300px;
                    margin: 20px auto;
                }
                .memory-card {
                    aspect-ratio: 1;
                    background: var(--color-secondary);
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                .memory-card:hover {
                    background: var(--color-secondary-hover);
                    transform: scale(1.05);
                }
            </style>
        `;
    }

    createBreathingGame() {
        return `
            <div class="breathing-game">
                <div class="breath-circle" id="game-breath-circle"></div>
                <div class="breath-phase" id="breath-phase">Prepare...</div>
                <div class="breath-score">Score: <span id="breath-score">100</span>%</div>
                <div class="breath-controls">
                    <button class="btn btn--primary" id="start-breath-game">Start</button>
                </div>
            </div>
            <style>
                .breathing-game {
                    text-align: center;
                    padding: 20px;
                }
                .breath-circle {
                    width: 150px;
                    height: 150px;
                    border: 4px solid var(--color-primary);
                    border-radius: 50%;
                    margin: 20px auto;
                    transition: transform 4s ease-in-out;
                }
                .breath-phase {
                    font-size: 18px;
                    font-weight: bold;
                    margin: 20px 0;
                    color: var(--color-primary);
                }
                .breath-score {
                    font-size: 16px;
                    margin: 20px 0;
                }
            </style>
        `;
    }

    createPuzzleGame() {
        return `
            <div class="puzzle-game">
                <div class="puzzle-title">Daily Yoga Puzzle</div>
                <div class="puzzle-question">
                    Which pose is best for improving balance?
                </div>
                <div class="puzzle-options">
                    <button class="puzzle-option" data-answer="correct">Tree Pose</button>
                    <button class="puzzle-option" data-answer="wrong">Child's Pose</button>
                    <button class="puzzle-option" data-answer="wrong">Corpse Pose</button>
                    <button class="puzzle-option" data-answer="wrong">Cat Pose</button>
                </div>
                <div class="puzzle-feedback" id="puzzle-feedback"></div>
            </div>
            <style>
                .puzzle-game {
                    padding: 20px;
                    text-align: center;
                }
                .puzzle-title {
                    font-size: 20px;
                    font-weight: bold;
                    margin-bottom: 20px;
                    color: var(--color-primary);
                }
                .puzzle-question {
                    font-size: 16px;
                    margin-bottom: 20px;
                }
                .puzzle-options {
                    display: grid;
                    gap: 10px;
                    margin-bottom: 20px;
                }
                .puzzle-option {
                    padding: 12px;
                    background: var(--color-secondary);
                    border: 1px solid var(--color-card-border);
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                .puzzle-option:hover {
                    background: var(--color-secondary-hover);
                }
                .puzzle-feedback {
                    font-weight: bold;
                    margin-top: 10px;
                }
            </style>
        `;
    }

    changeTheme(themeName) {
        document.querySelectorAll('.theme-option').forEach(option => {
            option.classList.remove('active');
        });
        
        const selectedTheme = document.querySelector(`[data-theme="${themeName}"]`);
        if (selectedTheme) {
            selectedTheme.classList.add('active');
        }
        
        this.currentTheme = themeName;
        document.body.setAttribute('data-color-scheme', themeName);
        
        this.showNotification(`Theme changed to ${themeName}`, 'info');
    }

    updateVolumeDisplay(slider, type) {
        const value = slider.value;
        const display = slider.parentNode.querySelector('.volume-value');
        if (display) {
            display.textContent = `${value}%`;
        }
        
        // Simulate volume feedback
        if (value > 50) {
            this.showNotification(`${type} volume: ${value}%`, 'info');
        }
    }

    updateBrightnessDisplay(slider) {
        const value = slider.value;
        const display = slider.parentNode.querySelector('.brightness-value');
        if (display) {
            display.textContent = `${value}%`;
        }
        
        // Simulate LED brightness change
        this.showNotification(`LED brightness set to ${value}%`, 'info');
    }

    updateSensitivityDisplay(slider) {
        const value = slider.value;
        const display = slider.parentNode.querySelector('.sensitivity-value');
        if (display) {
            display.textContent = `${value}/10`;
        }
    }

    changeLedColor(color) {
        document.querySelectorAll('.color-option').forEach(option => {
            option.classList.remove('active');
        });
        
        const selectedColor = document.querySelector(`[data-color="${color}"]`);
        if (selectedColor) {
            selectedColor.classList.add('active');
        }
        this.showNotification(`LED color changed to ${color}`, 'success');
    }

    showVoiceCommandFeedback() {
        const feedback = document.createElement('div');
        feedback.className = 'voice-feedback';
        feedback.textContent = '🎤 Voice command activated';
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--color-primary);
            color: var(--color-btn-primary-text);
            padding: 12px 20px;
            border-radius: 25px;
            z-index: 1001;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => feedback.remove(), 300);
        }, 2000);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        const colors = {
            info: 'var(--color-primary)',
            success: 'var(--color-success)',
            error: 'var(--color-error)',
            warning: 'var(--color-warning)'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type]};
            color: var(--color-btn-primary-text);
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 1001;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
            box-shadow: var(--shadow-lg);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    createModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        `;
        
        // Add close functionality
        modal.querySelector('.modal-close').addEventListener('click', () => {
            this.closeModal(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal(modal);
            }
        });
        
        document.body.appendChild(modal);
        return modal;
    }

    showModal(modal) {
        if (modal) {
            modal.classList.remove('hidden');
            document.body.classList.add('no-scroll');
        }
    }

    closeModal(modal) {
        if (modal) {
            modal.classList.add('hidden');
            document.body.classList.remove('no-scroll');
            
            // Remove created modals from DOM
            if (!modal.id) {
                setTimeout(() => modal.remove(), 300);
            }
        }
    }

    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            this.closeModal(modal);
        });
    }

    // Add more interactive methods as needed
    highlightPressureZone(zone) {
        zone.style.transform = 'scale(1.5)';
        zone.style.zIndex = '10';
        this.showNotification(`Pressure Zone: ${zone.dataset.zone}`, 'info');
    }

    unhighlightPressureZone(zone) {
        zone.style.transform = 'scale(1)';
        zone.style.zIndex = '';
    }

    showPressureDetails(zoneName) {
        this.showNotification(`Pressure zone: ${zoneName} - Click to analyze`, 'info');
    }

    makeChartsInteractive() {
        // Add hover tooltips and click interactions to charts
        const chartCanvas = document.getElementById('weekly-chart');
        if (chartCanvas) {
            chartCanvas.addEventListener('mousemove', (e) => {
                // Chart.js handles this automatically, but we can add custom behavior
            });
        }
    }

    refreshAnalytics() {
        // Refresh analytics data and animations
        setTimeout(() => {
            this.animateProgressBars();
        }, 100);
    }

    initializePracticeMode() {
        // Initialize practice-specific features
        if (!this.biometricInterval) {
            this.startBiometricSimulation();
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.myYogiApp = new MyYogiApp();
});

// Add custom CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);