import React, { useState } from 'react'
import { 
  ServerIcon, 
  BuildingStorefrontIcon,
  GlobeAltIcon,
  ChartBarIcon,
  LinkIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/outline'

export function MLSystems() {
  const [selectedCompany, setSelectedCompany] = useState('youtube')

  const mlSystems = {
    youtube: {
      name: 'YouTube',
      system: 'Recommendation Engine',
      color: 'bg-red-500',
      icon: '🎥',
      description: 'Large-scale video recommendation system serving billions of users',
      hashTableUsage: 'User embeddings, video embeddings, feature hashing for scalability',
      keyComponents: [
        'Candidate Generation',
        'Ranking System',
        'Real-time Serving',
        'A/B Testing Framework'
      ],
      dsaPatterns: [
        'Hash Tables: User/video embedding lookups',
        'Graphs: User interaction networks',
        'Heaps: Top-K recommendation ranking',
        'Trees: Hierarchical clustering of content'
      ],
      studyMaterials: [
        {
          title: 'Deep Neural Networks for YouTube Recommendations',
          url: 'https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/45530.pdf',
          type: 'Research Paper'
        },
        {
          title: 'YouTube Recommendation System Architecture',
          url: 'https://www.youtube.com/watch?v=f32KoVKfGbc',
          type: 'Tech Talk'
        }
      ],
      interviewQuestions: [
        'How would you design a recommendation system for billions of users?',
        'How do you handle the cold start problem?',
        'What data structures would you use for real-time serving?',
        'How would you implement A/B testing for recommendations?'
      ]
    },
    instagram: {
      name: 'Instagram',
      system: 'Feed Ranking',
      color: 'bg-pink-500',
      icon: '📸',
      description: 'Real-time feed ranking system with ML-powered content personalization',
      hashTableUsage: 'Feature storage, user interaction history, content caching',
      keyComponents: [
        'Content Ingestion',
        'Feature Engineering',
        'Ranking Models',
        'Feed Assembly'
      ],
      dsaPatterns: [
        'Hash Tables: Feature storage and retrieval',
        'Queues: Content processing pipeline',
        'Graphs: Social network analysis',
        'Sliding Window: Engagement tracking'
      ],
      studyMaterials: [
        {
          title: 'Instagram Feed Ranking System',
          url: 'https://instagram-engineering.com/instagram-feed-ranking-65827de712f8',
          type: 'Engineering Blog'
        },
        {
          title: 'Real-time Machine Learning at Instagram',
          url: 'https://www.youtube.com/watch?v=ODkEWsO5I30',
          type: 'Conference Talk'
        }
      ],
      interviewQuestions: [
        'How would you rank posts in a user\'s feed?',
        'How do you handle real-time updates to the feed?',
        'What features would you use for ranking?',
        'How would you prevent spam and low-quality content?'
      ]
    },
    netflix: {
      name: 'Netflix',
      system: 'Content Recommendation',
      color: 'bg-red-600',
      icon: '🎬',
      description: 'Personalized content recommendation with collaborative filtering',
      hashTableUsage: 'Content metadata, user preferences, collaborative filtering',
      keyComponents: [
        'Content Analysis',
        'User Modeling',
        'Collaborative Filtering',
        'Content-Based Filtering'
      ],
      dsaPatterns: [
        'Hash Tables: User-content interaction matrices',
        'Graphs: Content similarity networks',
        'Heaps: Top-N recommendations',
        'Arrays: Rating matrices and embeddings'
      ],
      studyMaterials: [
        {
          title: 'Netflix Recommendation System',
          url: 'https://netflixtechblog.com/netflix-recommendations-beyond-the-5-stars-part-1-55838468f429',
          type: 'Tech Blog'
        },
        {
          title: 'Deep Learning for Recommender Systems',
          url: 'https://www.youtube.com/watch?v=EOFK5iQ7PeY',
          type: 'Tech Talk'
        }
      ],
      interviewQuestions: [
        'How would you design Netflix\'s recommendation algorithm?',
        'How do you handle the cold start problem for new users?',
        'What are the trade-offs between collaborative and content-based filtering?',
        'How would you evaluate recommendation quality?'
      ]
    },
    airbnb: {
      name: 'Airbnb',
      system: 'Search Ranking',
      color: 'bg-pink-600',
      icon: '🏠',
      description: 'Location-based search and ranking system with personalization',
      hashTableUsage: 'Property features, user search patterns, ranking factors',
      keyComponents: [
        'Search Infrastructure',
        'Ranking Models',
        'Personalization',
        'Geographic Indexing'
      ],
      dsaPatterns: [
        'Hash Tables: Property feature storage',
        'Spatial Data Structures: Geographic search',
        'Heaps: Search result ranking',
        'Graphs: Location connectivity'
      ],
      studyMaterials: [
        {
          title: 'Airbnb Search Ranking System',
          url: 'https://medium.com/airbnb-engineering/machine-learning-powered-search-ranking-of-airbnb-experiences-110b4b1a0789',
          type: 'Engineering Blog'
        },
        {
          title: 'Real-time Personalization at Airbnb',
          url: 'https://www.youtube.com/watch?v=tq9kLYOBTq8',
          type: 'Conference Talk'
        }
      ],
      interviewQuestions: [
        'How would you design Airbnb\'s search system?',
        'How do you handle location-based queries efficiently?',
        'What factors would you consider for ranking properties?',
        'How would you personalize search results?'
      ]
    },
    google: {
      name: 'Google',
      system: 'Search & Ads',
      color: 'bg-blue-600',
      icon: '🔍',
      description: 'Global search engine with ML-powered ranking and ad targeting',
      hashTableUsage: 'Web index, query processing, ad targeting, user profiles',
      keyComponents: [
        'Web Crawling',
        'Index Building',
        'Query Processing',
        'Ad Auction System'
      ],
      dsaPatterns: [
        'Hash Tables: Web page indexing',
        'Tries: Query auto-completion',
        'Graphs: PageRank algorithm',
        'Heaps: Search result ranking'
      ],
      studyMaterials: [
        {
          title: 'The Anatomy of a Large-Scale Hypertextual Web Search Engine',
          url: 'http://infolab.stanford.edu/~backrub/google.html',
          type: 'Research Paper'
        },
        {
          title: 'Google\'s Machine Learning Infrastructure',
          url: 'https://www.youtube.com/watch?v=HcStlHGpjN8',
          type: 'Tech Talk'
        }
      ],
      interviewQuestions: [
        'How would you design Google Search?',
        'How does PageRank work?',
        'How would you implement query auto-completion?',
        'How do you handle billions of search queries per day?'
      ]
    },
    meta: {
      name: 'Meta',
      system: 'News Feed & Ads',
      color: 'bg-blue-700',
      icon: '📱',
      description: 'Social media feed ranking with targeted advertising',
      hashTableUsage: 'User graphs, content features, ad targeting, engagement tracking',
      keyComponents: [
        'Social Graph',
        'Content Ranking',
        'Ad Targeting',
        'Real-time Updates'
      ],
      dsaPatterns: [
        'Hash Tables: User relationship storage',
        'Graphs: Social network analysis',
        'Queues: Real-time feed updates',
        'Trees: Content categorization'
      ],
      studyMaterials: [
        {
          title: 'Facebook\'s News Feed Ranking',
          url: 'https://engineering.fb.com/2016/06/29/core-data/facebook-news-feed-ranking/',
          type: 'Engineering Blog'
        },
        {
          title: 'Deep Learning at Facebook',
          url: 'https://www.youtube.com/watch?v=6StHf272tF8',
          type: 'Conference Talk'
        }
      ],
      interviewQuestions: [
        'How would you design Facebook\'s News Feed?',
        'How do you handle real-time updates for billions of users?',
        'What algorithms would you use for friend recommendations?',
        'How would you design the ad targeting system?'
      ]
    }
  }

  const currentSystem = mlSystems[selectedCompany]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">ML Systems Study</h1>
        <p className="text-gray-600">Learn how FAANG companies implement large-scale ML systems</p>
      </div>

      {/* Company Selection */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(mlSystems).map(([key, system]) => (
          <button
            key={key}
            onClick={() => setSelectedCompany(key)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedCompany === key
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">{system.icon}</div>
              <h3 className="font-semibold text-gray-900">{system.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{system.system}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Selected System Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* System Overview */}
        <div className="space-y-6">
          <div className="card">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`w-10 h-10 ${currentSystem.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                {currentSystem.icon}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{currentSystem.name}</h2>
                <p className="text-gray-600">{currentSystem.system}</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">{currentSystem.description}</p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Hash Table Usage</h4>
              <p className="text-blue-800 text-sm">{currentSystem.hashTableUsage}</p>
            </div>
          </div>

          {/* Key Components */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Components</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentSystem.keyComponents.map((component, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <ServerIcon className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-700">{component}</span>
                </div>
              ))}
            </div>
          </div>

          {/* DSA Patterns */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">DSA Patterns Used</h3>
            <div className="space-y-3">
              {currentSystem.dsaPatterns.map((pattern, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <ChartBarIcon className="w-4 h-4 text-primary-600 mt-0.5" />
                  <span className="text-sm text-gray-700">{pattern}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Study Materials & Interview Questions */}
        <div className="space-y-6">
          {/* Study Materials */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Study Materials</h3>
            <div className="space-y-4">
              {currentSystem.studyMaterials.map((material, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">{material.title}</h4>
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        {material.type}
                      </span>
                    </div>
                    <a
                      href={material.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-3 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interview Questions */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Common Interview Questions</h3>
            <div className="space-y-3">
              {currentSystem.interviewQuestions.map((question, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="inline-block w-6 h-6 bg-primary-100 text-primary-600 rounded-full text-xs font-medium flex items-center justify-center mt-0.5">
                    {index + 1}
                  </span>
                  <p className="text-sm text-gray-700">{question}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Practice Suggestions */}
          <div className="card bg-yellow-50 border-yellow-200">
            <h3 className="text-lg font-semibold text-yellow-900 mb-3">Practice Suggestions</h3>
            <div className="space-y-2 text-sm text-yellow-800">
              <p>• Design a simplified version of this system</p>
              <p>• Practice the DSA patterns mentioned above</p>
              <p>• Study the scalability challenges and solutions</p>
              <p>• Understand the trade-offs in system design</p>
              <p>• Practice explaining the system in technical interviews</p>
            </div>
          </div>
        </div>
      </div>

      {/* System Comparison */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3">Company</th>
                <th className="text-left py-2 px-3">System</th>
                <th className="text-left py-2 px-3">Primary Pattern</th>
                <th className="text-left py-2 px-3">Scale</th>
                <th className="text-left py-2 px-3">Key Challenge</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-3 font-medium">🎥 YouTube</td>
                <td className="py-2 px-3">Recommendations</td>
                <td className="py-2 px-3">Hash Tables + Heaps</td>
                <td className="py-2 px-3">Billions of users</td>
                <td className="py-2 px-3">Real-time serving</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-3 font-medium">📸 Instagram</td>
                <td className="py-2 px-3">Feed Ranking</td>
                <td className="py-2 px-3">Graphs + Queues</td>
                <td className="py-2 px-3">Millions of posts/day</td>
                <td className="py-2 px-3">Real-time updates</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-3 font-medium">🎬 Netflix</td>
                <td className="py-2 px-3">Content Rec</td>
                <td className="py-2 px-3">Collaborative Filtering</td>
                <td className="py-2 px-3">200M+ users</td>
                <td className="py-2 px-3">Cold start problem</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-3 font-medium">🏠 Airbnb</td>
                <td className="py-2 px-3">Search Ranking</td>
                <td className="py-2 px-3">Spatial + Ranking</td>
                <td className="py-2 px-3">Millions of properties</td>
                <td className="py-2 px-3">Location-based search</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-3 font-medium">🔍 Google</td>
                <td className="py-2 px-3">Search & Ads</td>
                <td className="py-2 px-3">PageRank + Hash Tables</td>
                <td className="py-2 px-3">Billions of queries</td>
                <td className="py-2 px-3">Web-scale indexing</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium">📱 Meta</td>
                <td className="py-2 px-3">News Feed</td>
                <td className="py-2 px-3">Social Graphs</td>
                <td className="py-2 px-3">Billions of users</td>
                <td className="py-2 px-3">Real-time social updates</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
