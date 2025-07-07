import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navigation } from './components/Navigation'

function TestDashboard() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-blue-600">
          🤖🚀 ML-FAANG Mastery Plan
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Test Dashboard - If you see this, the app is working!
        </p>
      </div>
      
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Status</h2>
        <p className="text-green-600">✅ React is rendering correctly</p>
        <p className="text-green-600">✅ Tailwind CSS is working</p>
        <p className="text-green-600">✅ Navigation is visible</p>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<TestDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
