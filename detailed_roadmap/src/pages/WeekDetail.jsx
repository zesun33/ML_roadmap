import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useProgress } from '../contexts/ProgressContext'
import { 
  ClockIcon, 
  CheckCircleIcon, 
  PlayCircleIcon,
  BrainIcon,
  LinkIcon,
  ArrowLeftIcon,
  CalendarDaysIcon,
  ChartBarIcon
} from '@heroicons/react/outline'

export function WeekDetail() {
  const { weekNumber } = useParams()
  const { progress, getWeekProgress } = useProgress()
  const [weekData, setWeekData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedDay, setSelectedDay] = useState('monday')

  const weekProgress = getWeekProgress(parseInt(weekNumber))

  useEffect(() => {
    // Load week data from JSON file
    import(`../data/weeks/week-${weekNumber.padStart(2, '0')}.json`)
      .then(data => {
        setWeekData(data.default)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error loading week data:', error)
        setLoading(false)
      })
  }, [weekNumber])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!weekData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Week {weekNumber} Not Found</h2>
        <p className="text-gray-600 mb-6">This week's content is not yet available.</p>
        <Link to="/" className="btn btn-primary">
          Back to Dashboard
        </Link>
      </div>
    )
  }

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
  const dayData = weekData.daily_schedule[selectedDay]

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'difficulty-easy'
      case 'medium': return 'difficulty-medium'
      case 'hard': return 'difficulty-hard'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-3xl font-bold text-gray-900">
                Week {weekNumber}: {weekData.metadata.title}
              </h1>
              <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                {weekData.metadata.phase}
              </span>
            </div>
            <p className="text-gray-600 mt-2">{weekData.metadata.ml_focus}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-500">Progress</p>
            <p className="text-2xl font-bold text-primary-600">
              {Math.round(weekProgress.completionRate || 0)}%
            </p>
          </div>
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
            <ChartBarIcon className="w-8 h-8 text-primary-600" />
          </div>
        </div>
      </div>

      {/* Week Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Objectives */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Week Objectives</h2>
            <div className="space-y-3">
              {weekData.objectives.map((objective, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">{objective}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Day Navigation */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Daily Schedule</h2>
            <div className="flex space-x-2 mb-6">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedDay === day
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </button>
              ))}
            </div>

            {/* Day Content */}
            {dayData && (
              <div className="space-y-6">
                {/* Morning Session */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <ClockIcon className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">{dayData.morning_session.title}</h3>
                    <span className="text-sm text-gray-500">{dayData.morning_session.time}</span>
                  </div>
                  <div className="space-y-2">
                    {dayData.morning_session.activities.map((activity, index) => (
                      <p key={index} className="text-gray-700 text-sm">• {activity}</p>
                    ))}
                  </div>
                </div>

                {/* Coding Session */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <PlayCircleIcon className="w-5 h-5 text-green-600" />
                    <h3 className="font-semibold text-gray-900">{dayData.coding_session.title}</h3>
                    <span className="text-sm text-gray-500">{dayData.coding_session.time}</span>
                  </div>
                  
                  {dayData.coding_session.problems && (
                    <div className="space-y-4">
                      {dayData.coding_session.problems.map((problem, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">{problem.name}</h4>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                              {problem.difficulty}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{problem.description}</p>
                          
                          <div className="flex items-center space-x-4 mb-3">
                            <a 
                              href={problem.leetcode_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
                            >
                              <LinkIcon className="w-4 h-4" />
                              <span>LeetCode</span>
                            </a>
                            <a 
                              href={problem.neetcode_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-1 text-orange-600 hover:text-orange-800 text-sm"
                            >
                              <LinkIcon className="w-4 h-4" />
                              <span>NeetCode</span>
                            </a>
                          </div>

                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <div className="flex items-start space-x-2">
                              <BrainIcon className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-xs font-medium text-blue-800 mb-1">AI Coaching Prompt</p>
                                <p className="text-sm text-blue-700">{problem.ai_coaching_prompt}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Evening Session */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <ClockIcon className="w-5 h-5 text-purple-600" />
                    <h3 className="font-semibold text-gray-900">{dayData.evening_session.title}</h3>
                    <span className="text-sm text-gray-500">{dayData.evening_session.time}</span>
                  </div>
                  <div className="space-y-2">
                    {dayData.evening_session.activities.map((activity, index) => (
                      <p key={index} className="text-gray-700 text-sm">• {activity}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Week Stats */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Week Statistics</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Problems Target</span>
                  <span className="font-medium">{weekData.metadata.target_problems}</span>
                </div>
                <div className="progress-bar h-2">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${(weekProgress.problemsCompleted / weekData.metadata.target_problems) * 100}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Accuracy Target</span>
                  <span className="font-medium">{weekData.metadata.target_accuracy}%</span>
                </div>
                <div className="progress-bar h-2">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${weekProgress.accuracy || 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* AI Prompts */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Coaching Prompts</h3>
            <div className="space-y-3">
              {weekData.ai_prompts.map((prompt, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">{prompt.category}</h4>
                  <p className="text-xs text-gray-600">{prompt.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Weekend Sessions */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekend Sessions</h3>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-3">
                <h4 className="font-medium text-gray-900 mb-2">Saturday</h4>
                <p className="text-sm text-gray-600 mb-2">{weekData.daily_schedule.weekend_sessions.saturday.deliverable}</p>
                <Link 
                  to={`/week/${weekNumber}/day/saturday`}
                  className="text-sm text-primary-600 hover:text-primary-800"
                >
                  View Details →
                </Link>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-3">
                <h4 className="font-medium text-gray-900 mb-2">Sunday</h4>
                <p className="text-sm text-gray-600 mb-2">{weekData.daily_schedule.weekend_sessions.sunday.deliverable}</p>
                <Link 
                  to={`/week/${weekNumber}/day/sunday`}
                  className="text-sm text-primary-600 hover:text-primary-800"
                >
                  View Details →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
