import React from 'react'
import { useProgress } from '../contexts/ProgressContext'

export function SimpleDashboard() {
  const { getOverallProgress, progress } = useProgress()
  const overallProgress = getOverallProgress()

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          🤖🚀 AI-Enhanced ML-FAANG Mastery Plan
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          The Ultimate 20-Week Roadmap for ML Researchers → FAANG Software Engineers
        </p>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Progress Overview</h2>
        <p>Overall Progress: {Math.round(overallProgress.completionRate)}%</p>
        <p>Problems Solved: {overallProgress.totalCompleted}/{overallProgress.totalTarget}</p>
        <p>Current Week: {overallProgress.currentWeek}</p>
        <p>Accuracy Rate: {Math.round(overallProgress.accuracyRate)}%</p>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Test Phase</h2>
        <p>If you can see this, the Dashboard is working!</p>
      </div>
    </div>
  )
}
