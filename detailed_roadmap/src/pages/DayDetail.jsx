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
  CalendarIcon,
  CodeBracketIcon
} from '@heroicons/react/outline'

export function DayDetail() {
  const { weekNumber, dayNumber } = useParams()
  const { progress, markDayCompleted } = useProgress()
  const [weekData, setWeekData] = useState(null)
  const [loading, setLoading] = useState(true)

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
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Day Not Found</h2>
        <p className="text-gray-600 mb-6">This day's content is not yet available.</p>
        <Link to={`/week/${weekNumber}`} className="btn btn-primary">
          Back to Week {weekNumber}
        </Link>
      </div>
    )
  }

  const dayData = weekData.daily_schedule[dayNumber] || weekData.daily_schedule.weekend_sessions?.[dayNumber]
  const isDayCompleted = progress.completedDays.includes(`week-${weekNumber}-day-${dayNumber}`)

  const handleMarkCompleted = () => {
    markDayCompleted(parseInt(weekNumber), dayNumber)
  }

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
          <Link to={`/week/${weekNumber}`} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-3xl font-bold text-gray-900">
                Week {weekNumber} - {dayNumber.charAt(0).toUpperCase() + dayNumber.slice(1)}
              </h1>
              {isDayCompleted && (
                <CheckCircleIcon className="w-8 h-8 text-green-600" />
              )}
            </div>
            <p className="text-gray-600 mt-2">{dayData?.title || `${dayNumber.charAt(0).toUpperCase() + dayNumber.slice(1)} Sessions`}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {!isDayCompleted && (
            <button
              onClick={handleMarkCompleted}
              className="btn btn-primary flex items-center space-x-2"
            >
              <CheckCircleIcon className="w-5 h-5" />
              <span>Mark Complete</span>
            </button>
          )}
        </div>
      </div>

      {/* Weekend Sessions */}
      {(dayNumber === 'saturday' || dayNumber === 'sunday') && dayData && (
        <div className="space-y-6">
          {/* Sessions for weekend */}
          {Object.entries(dayData).map(([sessionKey, sessionData]) => {
            if (sessionKey === 'title' || sessionKey === 'deliverable') return null
            
            return (
              <div key={sessionKey} className="card">
                <div className="flex items-center space-x-3 mb-4">
                  <ClockIcon className="w-6 h-6 text-primary-600" />
                  <h2 className="text-xl font-bold text-gray-900">{sessionData.title}</h2>
                  {sessionData.time && (
                    <span className="text-sm text-gray-500">{sessionData.time}</span>
                  )}
                  {sessionData.duration && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                      {sessionData.duration} mins
                    </span>
                  )}
                </div>

                {/* Activities */}
                {sessionData.activities && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Activities</h3>
                    <div className="space-y-2">
                      {sessionData.activities.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-700">{activity}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Problems */}
                {sessionData.problems && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Problems</h3>
                    <div className="space-y-4">
                      {sessionData.problems.map((problem, index) => (
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
                  </div>
                )}
              </div>
            )
          })}

          {/* Deliverable */}
          {dayData.deliverable && (
            <div className="card bg-green-50 border-green-200">
              <div className="flex items-center space-x-3 mb-3">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-semibold text-green-900">Day Deliverable</h3>
              </div>
              <p className="text-green-800">{dayData.deliverable}</p>
            </div>
          )}
        </div>
      )}

      {/* Weekday Sessions */}
      {dayNumber !== 'saturday' && dayNumber !== 'sunday' && dayData && (
        <div className="space-y-6">
          {/* Morning Session */}
          <div className="card">
            <div className="flex items-center space-x-3 mb-4">
              <ClockIcon className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">{dayData.morning_session.title}</h2>
              <span className="text-sm text-gray-500">{dayData.morning_session.time}</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                {dayData.morning_session.duration} mins
              </span>
            </div>
            <div className="space-y-3">
              {dayData.morning_session.activities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">{activity}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Coding Session */}
          <div className="card">
            <div className="flex items-center space-x-3 mb-4">
              <CodeBracketIcon className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-bold text-gray-900">{dayData.coding_session.title}</h2>
              <span className="text-sm text-gray-500">{dayData.coding_session.time}</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                {dayData.coding_session.duration} mins
              </span>
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
          <div className="card">
            <div className="flex items-center space-x-3 mb-4">
              <ClockIcon className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl font-bold text-gray-900">{dayData.evening_session.title}</h2>
              <span className="text-sm text-gray-500">{dayData.evening_session.time}</span>
              <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm">
                {dayData.evening_session.duration} mins
              </span>
            </div>
            <div className="space-y-3">
              {dayData.evening_session.activities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">{activity}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
