import React from 'react'
import { useProgress } from '../contexts/ProgressContext'
import { 
  ChartBarIcon, 
  FireIcon, 
  AcademicCapIcon,
  ClockIcon,
  CheckCircleIcon,
  TrophyIcon,
  CalendarIcon
} from '@heroicons/react/outline'

export function Progress() {
  const { progress, getOverallProgress } = useProgress()
  const overallProgress = getOverallProgress()

  const phases = [
    { name: "Foundation & Basic Patterns", weeks: [1, 2, 3, 4], color: "bg-blue-500" },
    { name: "Core DSA Patterns", weeks: [5, 6, 7, 8], color: "bg-green-500" },
    { name: "Advanced Algorithms", weeks: [9, 10, 11, 12], color: "bg-yellow-500" },
    { name: "System Design & Optimization", weeks: [13, 14, 15, 16], color: "bg-purple-500" },
    { name: "Interview Mastery", weeks: [17, 18, 19, 20], color: "bg-red-500" }
  ]

  const getWeekProgress = (weekNumber) => {
    const weekStats = progress.weeklyStats[weekNumber - 1]
    return {
      ...weekStats,
      completionRate: (weekStats.problemsCompleted / weekStats.target) * 100
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Progress</h1>
        <p className="text-gray-600">Track your journey through the AI-Enhanced ML-FAANG Mastery Plan</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <ChartBarIcon className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Overall Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(overallProgress.completionRate)}%
              </p>
            </div>
          </div>
          <div className="mt-4 progress-bar h-3">
            <div 
              className="progress-fill" 
              style={{ width: `${overallProgress.completionRate}%` }}
            />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <AcademicCapIcon className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Problems Solved</p>
              <p className="text-2xl font-bold text-gray-900">
                {overallProgress.totalCompleted}
              </p>
              <p className="text-xs text-gray-500">of {overallProgress.totalTarget}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <FireIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Current Streak</p>
              <p className="text-2xl font-bold text-gray-900">
                {overallProgress.streak}
              </p>
              <p className="text-xs text-gray-500">days</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrophyIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Accuracy Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(overallProgress.accuracyRate || 0)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Phase Progress */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Progress by Phase</h2>
        
        {phases.map((phase, phaseIndex) => {
          const phaseProgress = phase.weeks.map(week => getWeekProgress(week))
          const phaseTotal = phaseProgress.reduce((sum, week) => sum + week.problemsCompleted, 0)
          const phaseTarget = phaseProgress.reduce((sum, week) => sum + week.target, 0)
          const phaseCompletionRate = (phaseTotal / phaseTarget) * 100

          return (
            <div key={phaseIndex} className="card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${phase.color} rounded-lg flex items-center justify-center text-white font-bold`}>
                    {phaseIndex + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{phase.name}</h3>
                    <p className="text-sm text-gray-500">Weeks {phase.weeks.join(', ')}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{Math.round(phaseCompletionRate)}%</p>
                  <p className="text-sm text-gray-500">{phaseTotal}/{phaseTarget} problems</p>
                </div>
              </div>
              
              <div className="progress-bar h-2 mb-4">
                <div 
                  className="progress-fill" 
                  style={{ width: `${phaseCompletionRate}%` }}
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {phase.weeks.map(weekNumber => {
                  const weekProgress = getWeekProgress(weekNumber)
                  const isCurrentWeek = progress.currentWeek === weekNumber
                  
                  return (
                    <div 
                      key={weekNumber}
                      className={`border rounded-lg p-3 ${
                        isCurrentWeek 
                          ? 'border-primary-300 bg-primary-50' 
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">
                          Week {weekNumber}
                        </span>
                        {isCurrentWeek && (
                          <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded text-xs">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">Problems</span>
                          <span className="font-medium">
                            {weekProgress.problemsCompleted}/{weekProgress.target}
                          </span>
                        </div>
                        <div className="progress-bar h-1">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${weekProgress.completionRate}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* AI Coaching Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Coaching Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Sessions Completed</span>
              <span className="font-bold text-gray-900">
                {progress.aiCoachingStats.sessionsCompleted}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Rating</span>
              <span className="font-bold text-gray-900">
                {progress.aiCoachingStats.averageRating.toFixed(1)}/5.0
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Feedback</span>
              <span className="font-bold text-gray-900">
                {progress.aiCoachingStats.totalFeedback}
              </span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {progress.completedProblems.slice(-5).map((problem, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Problem #{problem.id}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(problem.completedAt).toLocaleDateString()} • {problem.accuracy}% accuracy
                  </p>
                </div>
              </div>
            ))}
            {progress.completedProblems.length === 0 && (
              <p className="text-gray-500 text-sm">No problems completed yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Weekly Breakdown */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Progress Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3">Week</th>
                <th className="text-left py-2 px-3">Problems</th>
                <th className="text-left py-2 px-3">Target</th>
                <th className="text-left py-2 px-3">Completion</th>
                <th className="text-left py-2 px-3">Accuracy</th>
                <th className="text-left py-2 px-3">Time Spent</th>
              </tr>
            </thead>
            <tbody>
              {progress.weeklyStats.map((week, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-2 px-3 font-medium">Week {week.week}</td>
                  <td className="py-2 px-3">{week.problemsCompleted}</td>
                  <td className="py-2 px-3">{week.target}</td>
                  <td className="py-2 px-3">
                    <div className="flex items-center space-x-2">
                      <div className="progress-bar h-2 w-16">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${(week.problemsCompleted / week.target) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-600">
                        {Math.round((week.problemsCompleted / week.target) * 100)}%
                      </span>
                    </div>
                  </td>
                  <td className="py-2 px-3">{week.accuracy}%</td>
                  <td className="py-2 px-3">{week.timeSpent}h</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
