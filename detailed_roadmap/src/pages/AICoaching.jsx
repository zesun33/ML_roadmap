import React, { useState } from 'react'
import { useProgress } from '../contexts/ProgressContext'
import { 
  BrainIcon, 
  ChatBubbleLeftRightIcon,
  CodeBracketIcon,
  ClockIcon,
  StarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/outline'

export function AICoaching() {
  const { progress, updateAICoachingStats } = useProgress()
  const [activePrompt, setActivePrompt] = useState(null)
  const [userInput, setUserInput] = useState('')
  const [coaching, setCoaching] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const coachingCategories = [
    {
      id: 'problem-solving',
      name: 'Problem Solving',
      icon: CodeBracketIcon,
      color: 'bg-blue-500',
      description: 'Get help with understanding problems and solution approaches',
      prompt: "I'm solving array and hashing problems. Given my ML background: 1) What patterns should I recognize from my research experience? 2) How does this relate to algorithms I've used in PyTorch/NumPy? 3) What's the most efficient implementation approach? 4) Generate 2 similar problems for practice."
    },
    {
      id: 'code-review',
      name: 'Code Review',
      icon: CheckCircleIcon,
      color: 'bg-green-500',
      description: 'Review your code for optimization and best practices',
      prompt: "Review my solution for: 1) Time/space complexity optimization opportunities 2) Edge cases I might miss from my research background 3) Alternative approaches using ML algorithm thinking 4) How this pattern appears in production ML systems"
    },
    {
      id: 'interview-practice',
      name: 'Interview Practice',
      icon: ChatBubbleLeftRightIcon,
      color: 'bg-purple-500',
      description: 'Practice technical interviews with AI feedback',
      prompt: "Conduct a technical interview: 1) Ask a medium array/hashing problem with ML context 2) Evaluate my problem-solving communication 3) Provide follow-up optimization questions 4) Grade like a FAANG interviewer (1-10 scale)"
    },
    {
      id: 'ml-connections',
      name: 'ML Connections',
      icon: BrainIcon,
      color: 'bg-yellow-500',
      description: 'Connect algorithms to ML concepts and systems',
      prompt: "Explain how this data structure/algorithm connects to ML: 1) What ML concepts use similar patterns? 2) How is this optimized in ML frameworks like PyTorch? 3) Real-world applications in recommendation systems, NLP, computer vision 4) Performance considerations in large-scale ML systems"
    }
  ]

  const handleStartCoaching = (category) => {
    setActivePrompt(category)
    setUserInput('')
    setCoaching(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!userInput.trim()) return

    setIsLoading(true)
    
    // Simulate AI response (in real app, this would call an AI API)
    setTimeout(() => {
      const mockResponse = {
        category: activePrompt.name,
        response: generateMockResponse(activePrompt.id, userInput),
        timestamp: new Date().toISOString(),
        rating: Math.floor(Math.random() * 2) + 4, // 4-5 rating
        feedback: "This coaching session helped me understand the problem better."
      }
      
      setCoaching(mockResponse)
      setIsLoading(false)
      updateAICoachingStats(mockResponse.rating, mockResponse.feedback)
    }, 2000)
  }

  const generateMockResponse = (categoryId, input) => {
    const responses = {
      'problem-solving': `Based on your ML background, I can help you approach this problem:

1. **Pattern Recognition**: This problem follows the hash table pattern, similar to how you'd use dictionaries in PyTorch for parameter storage. The key insight is mapping values to indices for O(1) lookup.

2. **ML Connection**: This is similar to embedding lookups in transformers - you're essentially creating a mapping from tokens to their positions, just like how attention mechanisms map queries to keys.

3. **Optimal Approach**: 
   - Use a hash map to store value-to-index mappings
   - Single pass through the array
   - Time: O(n), Space: O(n)

4. **Similar Problems for Practice**:
   - Two Sum II (sorted array)
   - Three Sum (extension to triplets)

**Code Template**:
\`\`\`python
def two_sum(nums, target):
    seen = {}  # Similar to nn.Parameter storage
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []
\`\`\``,

      'code-review': `**Code Review Analysis**:

✅ **Strengths**:
- Correct algorithm implementation
- Good variable naming
- Proper edge case handling

🔧 **Optimization Opportunities**:
1. **Space Complexity**: Current O(n) is optimal for this approach
2. **Time Complexity**: O(n) is already optimal
3. **Edge Cases**: Consider empty arrays, single elements

🧠 **ML System Perspective**:
- This pattern appears in recommendation systems for user-item mappings
- Similar to how PyTorch's embedding layers work internally
- Production systems use this for feature lookups in real-time inference

**Alternative Approaches**:
- Two-pointer technique (if array was sorted)
- Brute force O(n²) for comparison
- Hash table is optimal for unsorted arrays`,

      'interview-practice': `**Technical Interview Simulation**

**Problem**: Given an array of integers and a target, find two numbers that sum to the target.

**Your Communication**: I notice you're thinking about this systematically, which is good. Let me evaluate your approach:

**Scoring (1-10 scale)**:
- Problem Understanding: 8/10
- Solution Approach: 9/10
- Code Quality: 8/10
- Communication: 7/10
- Optimization: 8/10

**Overall**: 8/10 - Strong performance!

**Follow-up Questions**:
1. How would you handle duplicate values?
2. What if the array was sorted?
3. Can you extend this to Three Sum?
4. How would this work in a distributed system?

**Interview Tips**:
- Great job connecting to ML concepts
- Consider discussing trade-offs more explicitly
- Practice explaining your thought process step-by-step`,

      'ml-connections': `**ML System Connections**

🔗 **Core ML Concepts**:
1. **Embedding Lookups**: Hash tables are fundamental to embedding layers in transformers
2. **Feature Stores**: Production ML systems use hash tables for real-time feature serving
3. **Attention Mechanisms**: Query-key mappings in attention use similar O(1) lookup patterns

🏗️ **Framework Optimizations**:
- **PyTorch**: Uses hash tables for parameter storage and module registries
- **TensorFlow**: Hash tables in lookup operations and feature columns
- **JAX**: Similar patterns in pytrees and transformations

🌐 **Real-world Applications**:
- **Recommendation Systems**: User-item interaction matrices
- **NLP**: Token-to-ID mappings in tokenizers
- **Computer Vision**: Feature matching in object detection

⚡ **Performance Considerations**:
- **Memory Layout**: CPU cache efficiency in large-scale systems
- **Distributed Systems**: Consistent hashing for load balancing
- **GPU Acceleration**: Hash table operations on CUDA kernels

This pattern is everywhere in ML infrastructure!`
    }
    
    return responses[categoryId] || "I can help you with this problem. Please provide more specific details about what you're working on."
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Coaching</h1>
        <p className="text-gray-600">Get personalized guidance connecting DSA to ML concepts</p>
      </div>

      {/* Coaching Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <ChatBubbleLeftRightIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Sessions Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {progress.aiCoachingStats.sessionsCompleted}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <StarIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Average Rating</p>
              <p className="text-2xl font-bold text-gray-900">
                {progress.aiCoachingStats.averageRating.toFixed(1)}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <ClockIcon className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Feedback</p>
              <p className="text-2xl font-bold text-gray-900">
                {progress.aiCoachingStats.totalFeedback}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Coaching Categories */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Choose Your Coaching Type</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coachingCategories.map((category) => (
            <div
              key={category.id}
              className="card hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleStartCoaching(category)}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {category.description}
                  </p>
                  <button className="text-sm text-primary-600 hover:text-primary-800 font-medium">
                    Start Coaching Session →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Coaching Session */}
      {activePrompt && (
        <div className="card bg-blue-50 border-blue-200">
          <div className="flex items-center space-x-3 mb-4">
            <activePrompt.icon className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-blue-900">
              {activePrompt.name} Session
            </h3>
          </div>
          
          <div className="bg-blue-100 border border-blue-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-blue-800">
              <strong>AI Prompt Template:</strong> {activePrompt.prompt}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="coaching-input" className="block text-sm font-medium text-gray-700 mb-2">
                Describe your problem, code, or question:
              </label>
              <textarea
                id="coaching-input"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Paste your code, describe the problem you're stuck on, or ask a specific question..."
                disabled={isLoading}
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                type="submit"
                disabled={isLoading || !userInput.trim()}
                className="btn btn-primary flex items-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Getting AI Coaching...</span>
                  </>
                ) : (
                  <>
                    <BrainIcon className="w-4 h-4" />
                    <span>Get AI Coaching</span>
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={() => setActivePrompt(null)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Coaching Response */}
      {coaching && (
        <div className="card bg-green-50 border-green-200">
          <div className="flex items-center space-x-3 mb-4">
            <BrainIcon className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-semibold text-green-900">
              AI Coaching Response
            </h3>
            <span className="text-sm text-gray-500">
              {new Date(coaching.timestamp).toLocaleString()}
            </span>
          </div>
          
          <div className="bg-white border border-green-200 rounded-lg p-4 mb-4">
            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap text-gray-800">
                {coaching.response}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Rate this session:</span>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className={`w-4 h-4 ${
                      star <= coaching.rating 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <button
              onClick={() => setCoaching(null)}
              className="text-sm text-green-600 hover:text-green-800"
            >
              Start New Session
            </button>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="card bg-yellow-50 border-yellow-200">
        <div className="flex items-start space-x-3">
          <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600 mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">
              AI Coaching Tips
            </h3>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Be specific about what you're struggling with</li>
              <li>• Include your code when asking for reviews</li>
              <li>• Ask about connections to ML concepts you know</li>
              <li>• Practice explaining your thought process</li>
              <li>• Use the coaching to simulate real interview scenarios</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
