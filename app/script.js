function roadmapApp() {
    return {
        // State variables
        loading: true,
        error: false,
        errorMessage: '',
        roadmapData: null,
        phases: [],
        totalWeeks: 20,
        currentWeek: 1,
        currentDay: 1, // Day 1-7 within the current week
        showTimer: false,
        activeSession: null,
        timerRunning: false,
        timeRemaining: 0,
        timerInterval: null,
        sessionCompletions: {},
        timerHistory: {},
        showPromptModal: false,
        selectedPrompt: null,
        activeTab: 'overview',

        // Computed properties
        get overallProgress() {
            if (!this.phases.length) return 0;
            const totalProgress = this.phases.reduce((sum, phase) => sum + this.getPhaseProgress(phase.number), 0);
            return totalProgress / this.phases.length;
        },

        // Initialization
        async init() {
            await this.loadRoadmapData();
            this.loadProgress();
            this.loadTimerHistory();

            // Initialize charts after data is loaded
            this.$nextTick(() => {
                if (this.activeTab === 'analytics') {
                    this.initializeCharts();
                }
            });

            // Auto-save progress and current week/day
            this.$watch('currentWeek', (value) => {
                localStorage.setItem('currentWeek', value);
            });

            this.$watch('currentDay', (value) => {
                localStorage.setItem('currentDay', value);
            });

            this.$watch('sessionCompletions', (value) => {
                localStorage.setItem('sessionCompletions', JSON.stringify(value));
            }, { deep: true });

            // Watch for tab changes to initialize charts
            this.$watch('activeTab', (value) => {
                if (value === 'analytics') {
                    this.$nextTick(() => {
                        this.initializeCharts();
                    });
                }
            });
        },

        // Data loading
        async loadRoadmapData() {
            try {
                this.loading = true;
                this.error = false;

                const response = await fetch('./roadmap_data.json');
                if (!response.ok) {
                    throw new Error(`Failed to load roadmap data: ${response.status} ${response.statusText}`);
                }

                this.roadmapData = await response.json();
                this.phases = this.roadmapData.phases || [];
                this.totalWeeks = this.roadmapData.metadata?.total_weeks || 20;

                console.log('Roadmap data loaded successfully:', this.roadmapData);

            } catch (error) {
                console.error('Error loading roadmap data:', error);
                this.error = true;
                this.errorMessage = `Could not load roadmap_data.json: ${error.message}. Make sure the file exists in the same directory as this HTML file.`;
            } finally {
                this.loading = false;
            }
        },

        // Progress management
        loadProgress() {
            const savedWeek = localStorage.getItem('currentWeek');
            if (savedWeek) {
                this.currentWeek = parseInt(savedWeek);
            }

            const savedDay = localStorage.getItem('currentDay');
            if (savedDay) {
                this.currentDay = parseInt(savedDay);
            }

            const savedCompletions = localStorage.getItem('sessionCompletions');
            if (savedCompletions) {
                this.sessionCompletions = JSON.parse(savedCompletions);
            }
        },

        loadTimerHistory() {
            const savedHistory = localStorage.getItem('timerHistory');
            if (savedHistory) {
                this.timerHistory = JSON.parse(savedHistory);
            }
        },

        saveTimerSession(sessionId, duration) {
            const today = new Date().toISOString().split('T')[0];
            if (!this.timerHistory[today]) {
                this.timerHistory[today] = {};
            }
            if (!this.timerHistory[today][sessionId]) {
                this.timerHistory[today][sessionId] = 0;
            }
            this.timerHistory[today][sessionId] += duration;
            localStorage.setItem('timerHistory', JSON.stringify(this.timerHistory));
        },

        // Week data access
        getCurrentWeekData() {
            if (!this.roadmapData?.weeks) return null;
            return this.roadmapData.weeks[this.currentWeek.toString()];
        },

        getCurrentWeekTitle() {
            const weekData = this.getCurrentWeekData();
            return weekData?.title || `Week ${this.currentWeek} Advanced Training`;
        },

        getCurrentWeekObjectives() {
            const weekData = this.getCurrentWeekData();
            return weekData?.objectives || [
                "Advanced learning objectives with AI enhancement",
                "Company-specific interview preparation",
                "Portfolio project development and optimization",
                "Mock interview practice with AI feedback"
            ];
        },

        getTodaySessions() {
            const weekData = this.getCurrentWeekData();
            const allSessions = weekData?.sessions || [
                {
                    id: `${this.currentWeek}-morning`,
                    title: "Morning Session: Core Concepts",
                    time: "6:00-7:30 AM",
                    description: "Theory learning with AI-enhanced explanations",
                    tags: ["Theory", "AI-Coaching", "Foundation"],
                    duration: 90
                },
                {
                    id: `${this.currentWeek}-evening`,
                    title: "Evening Session: Practical Implementation",
                    time: "8:00-9:30 PM",
                    description: "Hands-on coding with AI feedback",
                    tags: ["Coding", "Practice", "AI-Review"],
                    duration: 90
                }
            ];

            // Filter sessions by current day (show one session per day)
            const sessionIndex = this.currentDay - 1;
            return allSessions[sessionIndex] ? [allSessions[sessionIndex]] : [];
        },

        getAllWeekSessions() {
            const weekData = this.getCurrentWeekData();
            return weekData?.sessions || [];
        },

        getTotalDaysInWeek() {
            const weekData = this.getCurrentWeekData();
            return weekData?.sessions ? weekData.sessions.length : 2;
        },

        getCurrentWeekAIPrompts() {
            const weekData = this.getCurrentWeekData();
            return weekData?.ai_prompts || [
                {
                    category: "Problem Solving",
                    text: `Help me with Week ${this.currentWeek} problem solving. Explain patterns, optimal approaches, and time complexity. Provide code review feedback.`
                },
                {
                    category: "Interview Practice",
                    text: `Simulate a technical interview for Week ${this.currentWeek} topics. Ask me algorithm questions and evaluate my problem-solving approach.`
                },
                {
                    category: "Learning Strategy",
                    text: `Based on my Week ${this.currentWeek} progress, provide personalized study recommendations and identify areas that need more focus.`
                }
            ];
        },

        getCurrentPhase() {
            if (this.currentWeek <= 4) return 1;
            if (this.currentWeek <= 8) return 2;
            if (this.currentWeek <= 12) return 3;
            if (this.currentWeek <= 16) return 4;
            return 5;
        },

        getCurrentPhaseName() {
            const phaseNames = {
                1: "Foundation & Basic Patterns",
                2: "Advanced Data Structures",
                3: "Advanced Algorithms & System Design",
                4: "Company-Specific Preparation",
                5: "Interview Mastery & Specialization"
            };
            return phaseNames[this.getCurrentPhase()] || "Advanced Training";
        },

        getWeekPhaseInfo(week) {
            const phase = week <= 4 ? 1 : week <= 8 ? 2 : week <= 12 ? 3 : week <= 16 ? 4 : 5;
            return `Phase ${phase}`;
        },

        getWeekProgress(week) {
            const weekData = this.roadmapData?.weeks?.[week.toString()];
            if (!weekData?.sessions) return 0;

            const completedSessions = weekData.sessions.filter(session =>
                this.sessionCompletions[session.id] || false
            );
            return weekData.sessions.length > 0 ? (completedSessions.length / weekData.sessions.length) * 100 : 0;
        },

        getWeekCardStyle(week) {
            const isCurrentWeek = week === this.currentWeek;
            const isCompleted = this.isWeekCompleted(week);
            const phase = week <= 4 ? 1 : week <= 8 ? 2 : week <= 12 ? 3 : week <= 16 ? 4 : 5;

            const phaseColors = {
                1: 'border-blue-500 text-blue-600',
                2: 'border-green-500 text-green-600',
                3: 'border-purple-500 text-purple-600',
                4: 'border-yellow-500 text-yellow-600',
                5: 'border-red-500 text-red-600'
            };

            if (isCurrentWeek) {
                return `${phaseColors[phase]} bg-blue-50 border-blue-400 text-blue-700 shadow-md`;
            } else if (isCompleted) {
                return `${phaseColors[phase]} bg-green-50 border-green-400 text-green-700`;
            } else {
                return `border-gray-300 text-gray-600 hover:${phaseColors[phase]} hover:bg-gray-50`;
            }
        },

        // Session management
        isSessionCompleted(sessionId) {
            return this.sessionCompletions[sessionId] || false;
        },

        toggleSession(sessionId) {
            this.sessionCompletions[sessionId] = !this.sessionCompletions[sessionId];

            // Trigger reactivity
            this.sessionCompletions = { ...this.sessionCompletions };
        },

        // Progress calculations
        getPhaseProgress(phaseNumber) {
            const phaseWeeks = this.getWeeksForPhase(phaseNumber);
            const completedWeeks = phaseWeeks.filter(week => this.isWeekCompleted(week));
            return phaseWeeks.length > 0 ? (completedWeeks.length / phaseWeeks.length) * 100 : 0;
        },

        getWeeksForPhase(phaseNumber) {
            const ranges = {
                1: [1, 2, 3, 4],
                2: [5, 6, 7, 8],
                3: [9, 10, 11, 12],
                4: [13, 14, 15, 16],
                5: [17, 18, 19, 20]
            };
            return ranges[phaseNumber] || [];
        },

        isWeekCompleted(weekNumber) {
            const weekData = this.roadmapData?.weeks?.[weekNumber.toString()];
            if (!weekData?.sessions) return false;

            return weekData.sessions.every(session =>
                this.sessionCompletions[session.id] || false
            );
        },

        getCompletedSessionsCount() {
            return Object.values(this.sessionCompletions).filter(completed => completed).length;
        },

        getTotalSessionsCount() {
            if (!this.roadmapData?.weeks) return 0;

            let total = 0;
            for (let week = 1; week <= this.totalWeeks; week++) {
                const weekData = this.roadmapData.weeks[week.toString()];
                if (weekData?.sessions) {
                    total += weekData.sessions.length;
                }
            }
            return total;
        },

        getCompletedWeeksCount() {
            let completed = 0;
            for (let week = 1; week <= this.totalWeeks; week++) {
                if (this.isWeekCompleted(week)) {
                    completed++;
                }
            }
            return completed;
        },

        getTotalStudyHours() {
            let total = 0;
            Object.values(this.timerHistory).forEach(day => {
                Object.values(day).forEach(duration => {
                    total += duration;
                });
            });
            return Math.round(total / 60); // Convert minutes to hours
        },

        getWeekStudyHours() {
            const today = new Date().toISOString().split('T')[0];
            const thisWeek = this.timerHistory[today] || {};
            let total = 0;
            Object.values(thisWeek).forEach(duration => {
                total += duration;
            });
            return Math.round(total / 60); // Convert minutes to hours
        },

        // Timer functions
        startTimer(session) {
            this.activeSession = session;
            this.timeRemaining = session.duration * 60; // Convert to seconds
            this.showTimer = true;
        },

        toggleTimer() {
            this.timerRunning = !this.timerRunning;
            if (this.timerRunning) {
                this.timerInterval = setInterval(() => {
                    if (this.timeRemaining > 0) {
                        this.timeRemaining--;
                    } else {
                        this.completeTimer();
                    }
                }, 1000);
            } else {
                clearInterval(this.timerInterval);
            }
        },

        resetTimer() {
            this.timerRunning = false;
            clearInterval(this.timerInterval);
            this.timeRemaining = this.activeSession?.duration * 60 || 0;
        },

        closeTimer() {
            if (this.timerRunning) {
                const studiedMinutes = Math.floor((this.activeSession.duration * 60 - this.timeRemaining) / 60);
                if (studiedMinutes > 0) {
                    this.saveTimerSession(this.activeSession.id, studiedMinutes);
                }
            }

            this.showTimer = false;
            this.timerRunning = false;
            clearInterval(this.timerInterval);
            this.activeSession = null;
        },

        completeTimer() {
            this.timerRunning = false;
            clearInterval(this.timerInterval);

            // Save the completed session
            this.saveTimerSession(this.activeSession.id, this.activeSession.duration);

            // Mark session as completed
            this.sessionCompletions[this.activeSession.id] = true;
            this.sessionCompletions = { ...this.sessionCompletions };

            this.showNotification(`🎉 Great job! You completed your ${this.activeSession.title}!`);
        },

        formatTime(seconds) {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        },

        // Navigation
        nextWeek() {
            if (this.currentWeek < this.totalWeeks) {
                this.currentWeek++;
                this.currentDay = 1; // Reset to day 1 when changing weeks
            }
        },

        previousWeek() {
            if (this.currentWeek > 1) {
                this.currentWeek--;
                this.currentDay = 1; // Reset to day 1 when changing weeks
            }
        },

        nextDay() {
            if (this.currentDay < this.getTotalDaysInWeek()) {
                this.currentDay++;
            }
        },

        previousDay() {
            if (this.currentDay > 1) {
                this.currentDay--;
            }
        },

        // Utilities
        copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                this.showNotification("✅ Prompt copied to clipboard! Paste it into your AI tool.");
            }).catch(() => {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                this.showNotification("✅ Prompt copied to clipboard!");
            });
        },

        showNotification(message) {
            // Create a temporary notification
            const notification = document.createElement('div');
            notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-transform duration-300';
            notification.textContent = message;

            document.body.appendChild(notification);

            // Animate in
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 100);

            // Remove after 3 seconds
            setTimeout(() => {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        },

        // Enhanced AI functionality
        showPromptModalDialog(prompt) {
            this.selectedPrompt = prompt;
            this.showPromptModal = true;
        },

        copyAllPrompts() {
            const prompts = this.getCurrentWeekAIPrompts();
            const allPromptsText = prompts.map(p => `${p.category}:\n${p.text}`).join('\n\n---\n\n');
            this.copyToClipboard(allPromptsText);
            this.showNotification("✅ All AI prompts copied! Ready to paste into your AI assistant.");
        },

        generateCustomPrompt() {
            const weekData = this.getCurrentWeekData();
            const objectives = this.getCurrentWeekObjectives();
            const phase = this.getCurrentPhase();

            const customPrompt = `I'm on Week ${this.currentWeek} of my ML-FAANG preparation (Phase ${phase}). 
            
Current week objectives:
${objectives.map(obj => `• ${obj}`).join('\n')}

Please provide:
1. Personalized study recommendations for this week
2. Practice problems specific to these objectives  
3. Mock interview questions for Week ${this.currentWeek} topics
4. Areas I should focus on based on typical FAANG interview patterns

Context: I'm an ML researcher transitioning to software engineering roles at FAANG companies.`;

            this.copyToClipboard(customPrompt);
            this.showNotification("✅ Custom AI prompt generated and copied!");
        },

        openAITool(promptText) {
            // Try to open ChatGPT with the prompt (this will depend on browser support)
            const chatGPTUrl = `https://chat.openai.com/?prompt=${encodeURIComponent(promptText)}`;
            window.open(chatGPTUrl, '_blank');
        },

        // Export/Import functionality
        exportProgress() {
            const exportData = {
                version: '1.0',
                exportDate: new Date().toISOString(),
                currentWeek: this.currentWeek,
                sessionCompletions: this.sessionCompletions,
                timerHistory: this.timerHistory,
                metadata: {
                    totalWeeks: this.totalWeeks,
                    exportedSessions: Object.keys(this.sessionCompletions).length,
                    totalStudyHours: this.getTotalStudyHours()
                }
            };

            const dataStr = JSON.stringify(exportData, null, 2);
            const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

            const exportFileDefaultName = `ml-roadmap-backup-${new Date().toISOString().split('T')[0]}.json`;

            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();

            this.showNotification("✅ Progress data exported successfully!");
        },

        triggerImport() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.onchange = (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        try {
                            const importData = JSON.parse(e.target.result);
                            this.importProgress(importData);
                        } catch (error) {
                            this.showNotification("❌ Invalid backup file format");
                        }
                    };
                    reader.readAsText(file);
                }
            };
            input.click();
        },

        importProgress(data) {
            if (data.version && data.sessionCompletions) {
                this.currentWeek = data.currentWeek || 1;
                this.sessionCompletions = data.sessionCompletions || {};
                this.timerHistory = data.timerHistory || {};

                // Save to localStorage
                localStorage.setItem('currentWeek', this.currentWeek);
                localStorage.setItem('sessionCompletions', JSON.stringify(this.sessionCompletions));
                localStorage.setItem('timerHistory', JSON.stringify(this.timerHistory));

                this.showNotification("✅ Progress data imported successfully!");
            } else {
                this.showNotification("❌ Invalid backup file structure");
            }
        },

        // Analytics functions
        getStudyDaysCount() {
            const uniqueDays = new Set();
            Object.keys(this.timerHistory).forEach(date => {
                const dayTotal = Object.values(this.timerHistory[date]).reduce((sum, time) => sum + time, 0);
                if (dayTotal > 0) {
                    uniqueDays.add(date);
                }
            });
            return uniqueDays.size;
        },

        getCurrentStreak() {
            const today = new Date();
            let streak = 0;
            let checkDate = new Date(today);

            while (true) {
                const dateStr = checkDate.toISOString().split('T')[0];
                const dayHistory = this.timerHistory[dateStr];

                if (dayHistory) {
                    const dayTotal = Object.values(dayHistory).reduce((sum, time) => sum + time, 0);
                    if (dayTotal > 0) {
                        streak++;
                        checkDate.setDate(checkDate.getDate() - 1);
                        continue;
                    }
                }
                break;
            }

            return streak;
        },

        getWeekCompletionClass(week) {
            const weekData = this.roadmapData?.weeks?.[week.toString()];
            if (!weekData?.sessions) return 'bg-gray-100 border-gray-300';

            const completedSessions = weekData.sessions.filter(session =>
                this.sessionCompletions[session.id]
            ).length;

            if (completedSessions === 0) return 'bg-gray-100 border-gray-300';
            if (completedSessions === weekData.sessions.length) return 'bg-green-100 border-green-500';
            return 'bg-yellow-100 border-yellow-300';
        },

        getWeekCompletionStatus(week) {
            const weekData = this.roadmapData?.weeks?.[week.toString()];
            if (!weekData?.sessions) return 'No data';

            const completedSessions = weekData.sessions.filter(session =>
                this.sessionCompletions[session.id]
            ).length;

            return `${completedSessions}/${weekData.sessions.length} sessions completed`;
        },

        // Calendar functionality
        calendarDate: new Date(),
        selectedCalendarDay: null,

        getCurrentMonthYear() {
            const months = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];
            return `${months[this.calendarDate.getMonth()]} ${this.calendarDate.getFullYear()}`;
        },

        navigateMonth(direction) {
            this.calendarDate = new Date(this.calendarDate.getFullYear(), this.calendarDate.getMonth() + direction, 1);
        },

        getCalendarDays() {
            const year = this.calendarDate.getFullYear();
            const month = this.calendarDate.getMonth();
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const firstDayOfWeek = firstDay.getDay();

            const days = [];

            // Add padding days from previous month
            for (let i = firstDayOfWeek - 1; i >= 0; i--) {
                const date = new Date(year, month, -i);
                days.push({
                    day: date.getDate(),
                    date: date.toISOString().split('T')[0],
                    isCurrentMonth: false,
                    sessions: []
                });
            }

            // Add current month days
            for (let day = 1; day <= lastDay.getDate(); day++) {
                const date = new Date(year, month, day);
                const dateStr = date.toISOString().split('T')[0];
                days.push({
                    day: day,
                    date: dateStr,
                    isCurrentMonth: true,
                    sessions: this.getSessionsForDate(dateStr)
                });
            }

            // Add padding days from next month
            const remainingDays = 42 - days.length; // 6 weeks * 7 days
            for (let day = 1; day <= remainingDays; day++) {
                const date = new Date(year, month + 1, day);
                days.push({
                    day: date.getDate(),
                    date: date.toISOString().split('T')[0],
                    isCurrentMonth: false,
                    sessions: []
                });
            }

            return days;
        },

        getSessionsForDate(dateStr) {
            // Simple implementation - could be enhanced to show actual scheduled sessions
            const date = new Date(dateStr);
            const dayOfWeek = date.getDay();

            // For demo purposes, show sessions on weekdays
            if (dayOfWeek >= 1 && dayOfWeek <= 5) {
                return [
                    {
                        id: `${dateStr}-morning`,
                        title: "Morning Session",
                        time: "6:00-7:30 AM"
                    },
                    {
                        id: `${dateStr}-evening`,
                        title: "Evening Session",
                        time: "8:00-9:30 PM"
                    }
                ];
            }
            return [];
        },

        getCalendarDayClass(day) {
            const today = new Date().toISOString().split('T')[0];
            let classes = 'calendar-day';

            if (day.date === today) classes += ' today';
            if (!day.isCurrentMonth) classes += ' text-gray-400';
            if (day.sessions.length > 0) classes += ' has-session';

            const completedSessions = day.sessions.filter(session =>
                this.sessionCompletions[session.id]
            ).length;

            if (completedSessions === day.sessions.length && day.sessions.length > 0) {
                classes += ' completed';
            }

            return classes;
        },

        selectCalendarDay(day) {
            this.selectedCalendarDay = day;
        },

        formatSelectedDate() {
            if (!this.selectedCalendarDay) return '';
            const date = new Date(this.selectedCalendarDay.date);
            return date.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        },

        // Enhanced navigation functions
        searchQuery: '',
        filteredProblems: [],

        getCurrentWeekSessions() {
            const weekData = this.roadmapData?.weeks?.[this.currentWeek.toString()];
            return weekData?.sessions || [];
        },

        filterProblems() {
            if (!this.searchQuery.trim()) {
                this.filteredProblems = [];
                return;
            }

            const query = this.searchQuery.toLowerCase();
            const allProblems = [];

            // Collect all problems from all weeks
            Object.entries(this.roadmapData?.weeks || {}).forEach(([weekNum, week]) => {
                week.sessions?.forEach(session => {
                    session.problems?.forEach(problem => {
                        allProblems.push({
                            ...problem,
                            weekNumber: weekNum,
                            sessionTitle: session.title,
                            sessionId: session.id
                        });
                    });
                });
            });

            // Filter problems based on search query
            this.filteredProblems = allProblems.filter(problem =>
                problem.name.toLowerCase().includes(query) ||
                problem.difficulty.toLowerCase().includes(query) ||
                problem.description?.toLowerCase().includes(query) ||
                problem.sessionTitle?.toLowerCase().includes(query)
            ).slice(0, 10); // Limit to 10 results
        },

        jumpToWeek(weekNumber) {
            this.currentWeek = parseInt(weekNumber);
            this.currentDay = 1;
            this.activeTab = 'roadmap';
        },

        jumpToSession(sessionId) {
            // Find which week and day this session belongs to
            Object.entries(this.roadmapData?.weeks || {}).forEach(([weekNum, weekData]) => {
                weekData.sessions?.forEach((session, index) => {
                    if (session.id === sessionId) {
                        this.currentWeek = parseInt(weekNum);
                        this.currentDay = index + 1;
                        this.activeTab = 'roadmap';
                    }
                });
            });
        },

        getWeekProgress(weekNumber) {
            const weekData = this.roadmapData?.weeks?.[weekNumber.toString()];
            if (!weekData?.sessions) return 0;

            const completedSessions = weekData.sessions.filter(session =>
                this.sessionCompletions[session.id]
            ).length;

            return Math.round((completedSessions / weekData.sessions.length) * 100);
        },

        // Chart initialization
        initializeCharts() {
            this.$nextTick(() => {
                this.initProgressChart();
                this.initTimeChart();
            });
        },

        initProgressChart() {
            const ctx = document.getElementById('progressChart');
            if (!ctx) return;

            const weeks = Array.from({ length: this.totalWeeks }, (_, i) => i + 1);
            const progressData = weeks.map(week => {
                const weekData = this.roadmapData?.weeks?.[week.toString()];
                if (!weekData?.sessions) return 0;

                const completedSessions = weekData.sessions.filter(session =>
                    this.sessionCompletions[session.id]
                ).length;

                return Math.round((completedSessions / weekData.sessions.length) * 100);
            });

            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: weeks.map(w => `Week ${w}`),
                    datasets: [{
                        label: 'Completion %',
                        data: progressData,
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                callback: function (value) {
                                    return value + '%';
                                }
                            }
                        }
                    }
                }
            });
        },

        initTimeChart() {
            const ctx = document.getElementById('timeChart');
            if (!ctx) return;

            const phaseNames = ['Foundation', 'Patterns', 'Advanced', 'Systems', 'Integration'];
            const phaseHours = phaseNames.map((_, index) => {
                let total = 0;
                Object.entries(this.timerHistory).forEach(([date, sessions]) => {
                    Object.entries(sessions).forEach(([sessionId, minutes]) => {
                        const weekNum = this.getWeekFromSessionId(sessionId);
                        const phase = this.getPhaseFromWeek(weekNum);
                        if (phase === index + 1) {
                            total += minutes;
                        }
                    });
                });
                return Math.round(total / 60); // Convert to hours
            });

            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: phaseNames,
                    datasets: [{
                        data: phaseHours,
                        backgroundColor: [
                            '#3b82f6',
                            '#10b981',
                            '#f59e0b',
                            '#ef4444',
                            '#8b5cf6'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        },

        getWeekFromSessionId(sessionId) {
            const match = sessionId.match(/^(\d+)-/);
            return match ? parseInt(match[1]) : 1;
        },

        getPhaseFromWeek(week) {
            if (week <= 4) return 1;
            if (week <= 8) return 2;
            if (week <= 12) return 3;
            if (week <= 16) return 4;
            return 5;
        }
    }
}