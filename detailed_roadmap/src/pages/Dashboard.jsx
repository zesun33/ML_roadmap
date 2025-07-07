import React from 'react'
import { Link } from 'react-router-dom'
import { useProgress } from '../contexts/ProgressContext'

export function Dashboard() {
  const { getOverallProgress, progress } = useProgress()
  const overallProgress = getOverallProgress()

  const phases = [
    {
      number: 1,
      name: "Foundation & Basic Patterns",
      weeks: [1, 2, 3, 4],
      color: "bg-blue-500",
      focus: ["Arrays & Hashing", "Two Pointers", "Sliding Window", "Binary Search"]
    },
    {
      number: 2,
      name: "Core DSA Patterns",
      weeks: [5, 6, 7, 8],
      color: "bg-green-500",
      focus: ["Heaps", "Trees", "Graphs", "Dynamic Programming"]
    },
    {
      number: 3,
      name: "Advanced Algorithms",
      weeks: [9, 10, 11, 12],
      color: "bg-yellow-500",
      focus: ["Advanced DP", "Greedy", "Backtracking", "Advanced Graphs"]
    },
    {
      number: 4,
      name: "System Design & Optimization",
      weeks: [13, 14, 15, 16],
      color: "bg-purple-500",
      focus: ["System Design", "Optimization", "Math & Geometry", "Intervals"]
    },
    {
      number: 5,
      name: "Interview Mastery",
      weeks: [17, 18, 19, 20],
      color: "bg-red-500",
      focus: ["Mock Interviews", "Company Focus", "Final Projects", "Optimization"]
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gradient">
          🤖🚀 AI-Enhanced ML-FAANG Mastery Plan
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          The Ultimate 20-Week Roadmap for ML Researchers → FAANG Software Engineers
        </p>
        <p className="text-lg text-gray-500">
          Combining Real FAANG ML Cases with AI-Powered Adaptive Learning
        </p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-primary-600 rounded"></div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Overall Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(overallProgress.completionRate)}%
              </p>
            </div>
          </div>
          <div className="mt-4 progress-bar h-2">
            <div 
              className="progress-fill" 
              style={{ width: `${overallProgress.completionRate}%` }}
            />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-green-600 rounded"></div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Problems Solved</p>
              <p className="text-2xl font-bold text-gray-900">
                {overallProgress.totalCompleted}/{overallProgress.totalTarget}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-yellow-600 rounded"></div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Current Streak</p>
              <p className="text-2xl font-bold text-gray-900">
                {overallProgress.streak} days
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-purple-600 rounded"></div>
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

      {/* Current Week Highlight */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Current Focus</h2>
          <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
            Week {progress.currentWeek}
          </span>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Week {progress.currentWeek}: Arrays & Hashing + Real ML System Integration
            </h3>
            <p className="text-gray-600">
              Master fundamental data structures and algorithms with AI coaching, focusing on hash tables 
              in embeddings and YouTube Recommendation System analysis.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              to={`/week/${progress.currentWeek}`}
              className="btn btn-primary"
            >
              Start Week {progress.currentWeek}
            </Link>
            <Link 
              to="/ai-coaching"
              className="btn btn-secondary"
            >
              AI Coaching Session
            </Link>
          </div>
        </div>
      </div>

      {/* Learning Phases */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          🎯 5-Phase Learning Journey
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {phases.map((phase) => (
            <div key={phase.number} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 ${phase.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white font-bold text-lg">{phase.number}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {phase.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Weeks {phase.weeks.join(', ')}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {phase.focus.map((topic) => (
                      <span 
                        key={topic}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/progress" className="card hover:shadow-md transition-shadow group">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <div className="w-6 h-6 bg-blue-600 rounded"></div>
              </div>
              <h3 className="font-semibold text-gray-800 group-hover:text-blue-600">
                Track Progress
              </h3>
              <p className="text-sm text-gray-600">
                View detailed analytics and achievements
              </p>
            </div>
          </Link>

          <Link to="/ai-coaching" className="card hover:shadow-md transition-shadow group">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <div className="w-6 h-6 bg-purple-600 rounded"></div>
              </div>
              <h3 className="font-semibold text-gray-800 group-hover:text-purple-600">
                AI Coaching
              </h3>
              <p className="text-sm text-gray-600">
                Get personalized hints and feedback
              </p>
            </div>
          </Link>

          <Link to="/ml-systems" className="card hover:shadow-md transition-shadow group">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <div className="w-6 h-6 bg-green-600 rounded"></div>
              </div>
              <h3 className="font-semibold text-gray-800 group-hover:text-green-600">
                ML Systems
              </h3>
              <p className="text-sm text-gray-600">
                Study real FAANG ML architectures
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
