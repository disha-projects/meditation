import React from 'react'

function WelcomeScreen({ onStart }) {
  return (
    <div className="text-center p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome to Your Meditation Space 🧘</h1>
      <button
        onClick={onStart}
        className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-xl hover:bg-indigo-700 transition-colors"
      >
        Start Preparation
      </button>
    </div>
  )
}

export default WelcomeScreen
