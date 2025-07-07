import React, { createContext, useContext, useState, useEffect } from 'react'

const ProgressContext = createContext()

export function useProgress() {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider')
  }
  return context
}

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(() => {
    // Load progress from localStorage
    const saved = localStorage.getItem('ml-faang-progress')
    return saved ? JSON.parse(saved) : {
      completedProblems: [],
      completedDays: [],
      currentWeek: 1,
      currentDay: 1,
      totalProblemsCompleted: 0,
      accuracyRate: 0,
      streak: 0,
      lastActiveDate: null,
      aiCoachingStats: {
        sessionsCompleted: 0,
        averageRating: 0,
        totalFeedback: 0
      },
      weeklyStats: Array.from({ length: 20 }, (_, i) => ({
        week: i + 1,
        problemsCompleted: 0,
        target: getWeekTarget(i + 1),
        accuracy: 0,
        timeSpent: 0
      }))
    }
  })

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ml-faang-progress', JSON.stringify(progress))
  }, [progress])

  const markProblemCompleted = (problemId, accuracy = 100, timeSpent = 0) => {
    setProgress(prev => {
      const newCompleted = [...prev.completedProblems]
      if (!newCompleted.find(p => p.id === problemId)) {
        newCompleted.push({
          id: problemId,
          accuracy,
          timeSpent,
          completedAt: new Date().toISOString()
        })
      }

      return {
        ...prev,
        completedProblems: newCompleted,
        totalProblemsCompleted: newCompleted.length,
        accuracyRate: newCompleted.reduce((acc, p) => acc + p.accuracy, 0) / newCompleted.length,
        lastActiveDate: new Date().toISOString()
      }
    })
  }

  const markDayCompleted = (weekNumber, dayNumber) => {
    setProgress(prev => {
      const dayId = `week-${weekNumber}-day-${dayNumber}`
      const newCompletedDays = [...prev.completedDays]
      
      if (!newCompletedDays.includes(dayId)) {
        newCompletedDays.push(dayId)
      }

      return {
        ...prev,
        completedDays: newCompletedDays,
        lastActiveDate: new Date().toISOString()
      }
    })
  }

  const updateAICoachingStats = (rating, feedback) => {
    setProgress(prev => ({
      ...prev,
      aiCoachingStats: {
        ...prev.aiCoachingStats,
        sessionsCompleted: prev.aiCoachingStats.sessionsCompleted + 1,
        totalFeedback: prev.aiCoachingStats.totalFeedback + 1,
        averageRating: (prev.aiCoachingStats.averageRating * prev.aiCoachingStats.totalFeedback + rating) / (prev.aiCoachingStats.totalFeedback + 1)
      }
    }))
  }

  const getWeekProgress = (weekNumber) => {
    const weekStats = progress.weeklyStats[weekNumber - 1]
    return {
      ...weekStats,
      completionRate: (weekStats.problemsCompleted / weekStats.target) * 100
    }
  }

  const getOverallProgress = () => {
    const totalTarget = progress.weeklyStats.reduce((sum, week) => sum + week.target, 0)
    const totalCompleted = progress.totalProblemsCompleted
    return {
      completionRate: (totalCompleted / totalTarget) * 100,
      totalTarget,
      totalCompleted,
      currentWeek: progress.currentWeek,
      streak: progress.streak,
      accuracyRate: progress.accuracyRate
    }
  }

  const value = {
    progress,
    markProblemCompleted,
    markDayCompleted,
    updateAICoachingStats,
    getWeekProgress,
    getOverallProgress
  }

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  )
}

function getWeekTarget(weekNumber) {
  // Target problems per week based on the roadmap
  const targets = {
    1: 25, 2: 30, 3: 28, 4: 25, 5: 32, 6: 35, 7: 30, 8: 28,
    9: 30, 10: 32, 11: 35, 12: 30, 13: 28, 14: 30, 15: 32,
    16: 30, 17: 25, 18: 25, 19: 20, 20: 15
  }
  return targets[weekNumber] || 25
}
