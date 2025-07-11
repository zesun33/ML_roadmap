// Enhanced roadmap application with comprehensive error handling
function roadmapApp() {
    return {
        // Core state
        loading: true,
        error: false,
        errorMessage: '',
        roadmapData: null,
        phases: [],
        totalWeeks: 20,
        currentWeek: 1,
        activeTab: 'roadmap',

        // Progress tracking
        sessionCompletions: {},
        overallProgress: 0,

        // UI state
        selectedProblem: null,
        showAIPrompt: false,
        aiSetupPrompt: '',

        // Calendar state
        currentDate: new Date(),
        selectedCalendarDay: null,

        // Search functionality
        searchQuery: '',
        showSearch: false,

        // Initialize the application
        async init() {
            console.log('🚀 Initializing ML-FAANG Roadmap App...');

            try {
                // Load roadmap data
                await this.loadWeekData(this.currentWeek);

                // Load saved progress
                this.loadProgress();

                // Initialize charts after a short delay to ensure DOM is ready
                setTimeout(() => {
                    this.initializeCharts();
                }, 100);

                // Set current week based on start date
                this.setCurrentWeek();

                console.log('✅ App initialized successfully');

            } catch (error) {
                console.error('❌ Initialization failed:', error);
                this.handleError('Failed to initialize application', error);
            }
        },

        // Load data for a specific week
        async loadWeekData(weekNumber) {
            try {
                this.loading = true;
                this.error = false;
                console.log(`📊 Loading data for week ${weekNumber}...`);

                const response = await fetch(`./roadmap_data/week-${weekNumber}.json`);
                if (!response.ok) {
                    throw new Error(`Failed to load data for week ${weekNumber}: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                if (!this.validateRoadmapData(data)) {
                    throw new Error(`Invalid data structure for week ${weekNumber}`);
                }

                // If this is the first load, set the phase and total weeks data
                if (!this.phases.length) {
                    // Use phases from data if available, otherwise use default phases
                    this.phases = data.metadata.phases || this.getDefaultPhases();
                    this.totalWeeks = data.metadata?.total_weeks || 20;
                }
                
                // Replace the entire roadmapData with just the current week's data
                this.roadmapData = data;

                console.log(`✅ Loaded data for week ${weekNumber}`, this.roadmapData);

            } catch (error) {
                console.error(`❌ Failed to load data for week ${weekNumber}:`, error);
                this.handleError(`Failed to load week ${weekNumber}`, error);
            } finally {
                this.loading = false;
            }
        },

        // Validate roadmap data structure
        validateRoadmapData(data) {
            const required = ['metadata', 'week'];
            const isValid = required.every(key => data.hasOwnProperty(key));

            if (!isValid) {
                console.warn('⚠️ Missing required fields in roadmap data:',
                    required.filter(key => !data.hasOwnProperty(key)));
            }

            return isValid;
        },

        // Change the current week and load its data
        async changeWeek(weekNumber) {
            if (weekNumber >= 1 && weekNumber <= this.totalWeeks) {
                this.currentWeek = weekNumber;
                await this.loadWeekData(weekNumber);
                // You might need to re-initialize or update components that depend on the week's data
                this.initializeCharts(); 
            }
        },

        // Load demo data as fallback
        loadDemoData() {
            console.log('📋 Loading demo data...');

            this.roadmapData = {
                metadata: {
                    title: "AI-Enhanced ML-FAANG Mastery Plan",
                    description: "20-week comprehensive roadmap for ML researchers transitioning to FAANG software engineering roles",
                    total_weeks: 20,
                    total_phases: 5,
                    ai_enhanced: true
                },
                phases: [
                    {
                        number: 1,
                        name: "Foundation & Basic Patterns",
                        description: "Master fundamental data structures and algorithms with AI coaching",
                        weeks: [1, 2, 3, 4],
                        focus_areas: ["Arrays & Hashing", "Two Pointers", "Sliding Window", "Binary Search"]
                    },
                    {
                        number: 2,
                        name: "Advanced Data Structures",
                        description: "Deep dive into complex data structures and algorithms",
                        weeks: [5, 6, 7, 8],
                        focus_areas: ["Linked Lists", "Trees", "Heaps", "Graphs"]
                    },
                    {
                        number: 3,
                        name: "Dynamic Programming & Greedy",
                        description: "Master optimization techniques and mathematical problem solving",
                        weeks: [9, 10, 11, 12],
                        focus_areas: ["Dynamic Programming", "Greedy Algorithms", "Backtracking", "Math"]
                    },
                    {
                        number: 4,
                        name: "System Design & Advanced Topics",
                        description: "Learn system design and advanced algorithmic concepts",
                        weeks: [13, 14, 15, 16],
                        focus_areas: ["System Design", "Advanced Graphs", "Trie", "Intervals"]
                    },
                    {
                        number: 5,
                        name: "Interview Mastery & Specialization",
                        description: "Company-specific preparation and interview mastery",
                        weeks: [17, 18, 19, 20],
                        focus_areas: ["Mock Interviews", "Company Prep", "Optimization", "Final Projects"]
                    }
                ],
                week: {
                    title: "AI Environment Setup + Arrays & Hashing",
                    objectives: [
                        "Set up AI-powered learning environment",
                        "Master core array and hashing problems",
                        "Complete 25 problems with 90%+ accuracy",
                        "Establish daily study routine"
                    ],
                    daily_schedule: {
                        monday: {
                            morning_session: {
                                title: "Environment Setup",
                                time: "6:00-7:30 AM",
                                activities: [
                                    "Install development tools",
                                    "Set up AI learning assistants",
                                    "Configure progress tracking"
                                ]
                            },
                            coding_session: {
                                title: "Core Array Problems",
                                time: "7:30-9:00 AM",
                                problems: [
                                    {
                                        name: "Two Sum",
                                        difficulty: "Easy",
                                        leetcode_url: "https://leetcode.com/problems/two-sum/",
                                        neetcode_url: "https://neetcode.io/problems/two-sum",
                                        description: "Find two numbers that add up to a target sum",
                                        ai_prompt: "Explain Two Sum using hash tables like vocabulary mappings in tokenizers. How does this relate to attention mechanisms in transformers?"
                                    },
                                    {
                                        name: "Best Time to Buy and Sell Stock",
                                        difficulty: "Easy",
                                        leetcode_url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
                                        neetcode_url: "https://neetcode.io/problems/buy-and-sell-crypto",
                                        description: "Find the maximum profit from buying and selling stock",
                                        ai_prompt: "Relate this to gradient optimization and finding optimal points in ML training curves."
                                    }
                                ]
                            },
                            evening_session: {
                                title: "AI Study Setup",
                                time: "8:00-9:00 PM",
                                activities: [
                                    "Create AI study prompts",
                                    "Set up progress tracking",
                                    "Plan tomorrow's schedule"
                                ]
                            }
                        }
                    }
                }
            };

            this.phases = this.roadmapData.phases;
            this.totalWeeks = this.roadmapData.metadata.total_weeks;

            console.log('✅ Demo data loaded successfully');
        },

        // Error handling
        handleError(message, error) {
            this.error = true;
            this.errorMessage = `${message}: ${error.message || error}`;
            console.error('❌ Error:', message, error);
        },

        // Load progress from localStorage
        loadProgress() {
            try {
                const saved = localStorage.getItem('ml-faang-progress');
                if (saved) {
                    const progress = JSON.parse(saved);
                    this.sessionCompletions = progress.sessionCompletions || {};
                    this.currentWeek = progress.currentWeek || 1;
                    console.log('📊 Progress loaded from localStorage');
                }
            } catch (error) {
                console.warn('⚠️ Could not load progress from localStorage:', error);
            }
        },

        // Save progress to localStorage
        saveProgress() {
            try {
                const progress = {
                    sessionCompletions: this.sessionCompletions,
                    currentWeek: this.currentWeek,
                    timestamp: new Date().toISOString()
                };
                localStorage.setItem('ml-faang-progress', JSON.stringify(progress));
                console.log('💾 Progress saved to localStorage');
            } catch (error) {
                console.warn('⚠️ Could not save progress to localStorage:', error);
            }
        },

        // Initialize charts
        initializeCharts() {
            try {
                // Wait for DOM to be ready
                setTimeout(() => {
                    this.initProgressChart();
                    this.initTimeChart();
                }, 100);
            } catch (error) {
                console.warn('⚠️ Could not initialize charts:', error);
            }
        },

        // Initialize progress chart
        initProgressChart() {
            const ctx = document.getElementById('progressChart');
            if (!ctx) return;

            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: Array.from({ length: this.totalWeeks }, (_, i) => `Week ${i + 1}`),
                    datasets: [{
                        label: 'Progress %',
                        data: Array.from({ length: this.totalWeeks }, (_, i) => {
                            return i < this.currentWeek ? Math.random() * 100 : 0;
                        }),
                        borderColor: 'rgb(59, 130, 246)',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        tension: 0.1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            });
        },

        // Initialize time chart
        initTimeChart() {
            const ctx = document.getElementById('timeChart');
            if (!ctx) return;

            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: this.phases.map(phase => phase.name),
                    datasets: [{
                        data: this.phases.map(() => Math.random() * 100),
                        backgroundColor: [
                            '#3B82F6',
                            '#10B981',
                            '#F59E0B',
                            '#EF4444',
                            '#8B5CF6'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        },

        // Set current week based on start date
        setCurrentWeek() {
            // For demo purposes, start with week 1
            // In production, this would calculate based on actual start date
            this.currentWeek = 1;
        },

        // Calculate overall progress
        calculateOverallProgress() {
            const totalSessions = this.totalWeeks * 3; // Assuming 3 sessions per week
            const completedSessions = Object.keys(this.sessionCompletions).length;
            this.overallProgress = Math.round((completedSessions / totalSessions) * 100);
        },

        // Get phase progress
        getPhaseProgress(phaseNumber) {
            const phase = this.phases.find(p => p.number === phaseNumber);
            if (!phase) return 0;

            const phaseWeeks = phase.weeks || [];
            const completedWeeks = phaseWeeks.filter(week => week <= this.currentWeek).length;
            return Math.round((completedWeeks / phaseWeeks.length) * 100);
        },

        // Calendar methods
        getCalendarDays() {
            // Return demo calendar data
            return Array.from({ length: 30 }, (_, i) => ({
                date: new Date(2024, 0, i + 1),
                day: i + 1,
                sessions: i % 7 !== 0 ? [{ id: `session-${i}`, topic: `Study Session ${i}` }] : []
            }));
        },

        selectCalendarDay(day) {
            this.selectedCalendarDay = day;
            console.log('📅 Selected calendar day:', day);
        },

        getSelectedDate() {
            if (!this.selectedCalendarDay) return 'No date selected';
            return this.selectedCalendarDay.date.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        },

        getCalendarDayClass(day) {
            const today = new Date();
            const isToday = day.date.toDateString() === today.toDateString();
            const hasSessions = day.sessions.length > 0;

            let classes = 'calendar-day p-2 border rounded cursor-pointer ';

            if (isToday) {
                classes += 'bg-blue-100 border-blue-500 ';
            } else if (hasSessions) {
                classes += 'bg-gray-50 border-gray-300 ';
            } else {
                classes += 'bg-white border-gray-200 ';
            }

            return classes;
        },

        // Analytics methods
        getStudyDaysCount() {
            return Object.keys(this.sessionCompletions).length;
        },

        getTotalStudyHours() {
            return Math.round(this.getStudyDaysCount() * 2.5); // 2.5 hours per day average
        },

        getCurrentStreak() {
            // Calculate current streak (demo)
            return Math.min(this.getStudyDaysCount(), 7);
        },

        // Week completion methods
        getWeekCompletionClass(week) {
            const progress = this.getWeekCompletionStatus(week);
            if (progress === 100) return 'bg-green-500 text-white';
            if (progress > 0) return 'bg-yellow-400';
            return 'bg-gray-200';
        },

        getWeekCompletionStatus(week) {
            // This function might need to be adjusted if it relies on having all weeks' data at once.
            // For now, we assume it works on a per-week basis from saved progress.
            const weekNumber = week;
            const weekData = this.roadmapData?.week;
            if (!weekData) return 0;

            const sessions = Object.values(weekData.daily_schedule || {}).flatMap(day =>
                Object.values(day)
            );

            if (sessions.length === 0) return 0;

            const completedSessions = sessions.filter(session => this.isSessionCompleted(session.title)).length;
            return (completedSessions / sessions.length) * 100;
        },

        // Export/Import methods
        exportProgress() {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.sessionCompletions, null, 2));
            const a = document.createElement('a');
            a.href = dataStr;
            a.download = `ml-faang-progress-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
        },

        triggerImport() {
            document.getElementById('import-file').click();
        },

        importProgress(event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    this.sessionCompletions = data.sessionCompletions || {};
                    this.currentWeek = data.currentWeek || 1;
                    this.saveProgress();
                    alert('Progress imported successfully!');
                } catch (error) {
                    alert('Error importing progress: ' + error.message);
                }
            };
            reader.readAsText(file);
        },

        // Calendar navigation
        getCurrentMonthYear() {
            return this.currentDate.toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric'
            });
        },

        navigateMonth(direction) {
            const newDate = new Date(this.currentDate);
            newDate.setMonth(newDate.getMonth() + direction);
            this.currentDate = newDate;
        },

        // Session management
        isSessionCompleted(sessionId) {
            return this.sessionCompletions[sessionId] || false;
        },

        toggleSessionCompletion(sessionId) {
            this.sessionCompletions[sessionId] = !this.sessionCompletions[sessionId];
            this.saveProgress();
            this.calculateOverallProgress();
        },

        // AI prompts
        submitAIPrompt() {
            console.log('🤖 AI Prompt submitted:', this.aiSetupPrompt);
            // In a real app, this would send to AI service
            alert('AI setup complete! Your personalized roadmap is ready.');
            this.showAIPrompt = false;
        },

        // Get default phases if not provided in data
        getDefaultPhases() {
            return [
                {
                    number: 1,
                    name: "Foundation & Basic Patterns",
                    description: "Master fundamental data structures and algorithms with AI coaching",
                    weeks: [1, 2, 3, 4],
                    focus_areas: ["Arrays & Hashing", "Two Pointers", "Sliding Window", "Binary Search"]
                },
                {
                    number: 2,
                    name: "Advanced Data Structures",
                    description: "Deep dive into complex data structures and algorithms",
                    weeks: [5, 6, 7, 8],
                    focus_areas: ["Linked Lists", "Trees", "Heaps", "Graphs"]
                },
                {
                    number: 3,
                    name: "Dynamic Programming & Greedy",
                    description: "Master optimization techniques and mathematical problem solving",
                    weeks: [9, 10, 11, 12],
                    focus_areas: ["Dynamic Programming", "Greedy Algorithms", "Backtracking", "Math"]
                },
                {
                    number: 4,
                    name: "System Design & Advanced Topics",
                    description: "Learn system design and advanced algorithmic concepts",
                    weeks: [13, 14, 15, 16],
                    focus_areas: ["System Design", "Advanced Graphs", "Trie", "Intervals"]
                },
                {
                    number: 5,
                    name: "Interview Mastery & Specialization",
                    description: "Company-specific preparation and interview mastery",
                    weeks: [17, 18, 19, 20],
                    focus_areas: ["Mock Interviews", "Company Prep", "Optimization", "Final Projects"]
                }
            ];
        },

        // Search functionality
        toggleSearch() {
            this.showSearch = !this.showSearch;
            if (this.showSearch) {
                setTimeout(() => {
                    const searchInput = document.getElementById('search-input');
                    if (searchInput) searchInput.focus();
                }, 100);
            }
        },

        searchProblems() {
            if (!this.searchQuery || !this.roadmapData?.week?.daily_schedule) return [];
            
            const query = this.searchQuery.toLowerCase();
            const allProblems = [];
            
            // Extract all problems from the current week
            Object.values(this.roadmapData.week.daily_schedule).forEach(day => {
                Object.values(day).forEach(session => {
                    if (session.problems) {
                        session.problems.forEach(problem => {
                            allProblems.push(problem);
                        });
                    }
                });
            });
            
            return allProblems.filter(problem => 
                problem.name.toLowerCase().includes(query) ||
                problem.difficulty.toLowerCase().includes(query) ||
                (problem.description && problem.description.toLowerCase().includes(query))
            );
        },

        selectProblem(problem) {
            this.selectedProblem = problem;
            this.showSearch = false;
            this.searchQuery = '';
        },

        // Get week progress for display
        getWeekProgress(weekNumber) {
            // This is a simplified version - in a real app, you'd calculate actual progress
            const savedProgress = this.sessionCompletions[`week-${weekNumber}`];
            return savedProgress ? savedProgress : 0;
        },

        // Helper to format time
        formatTime(timeString) {
            if (!timeString) return '';
            return timeString.replace(/AM|PM/g, match => match.toLowerCase());
        },

        // Get current phase based on week
        getCurrentPhase() {
            return this.phases.find(phase => 
                phase.weeks && phase.weeks.includes(this.currentWeek)
            ) || this.phases[0];
        }
    };
}

// Log when script is loaded
console.log('📋 ML Roadmap script loaded successfully. Alpine.js will initialize the app automatically.');