import React from 'react'

function EndScreen({ onRestart, onHome }) {
  return (
    <div className="text-center p-8">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">✨ Well done! You've completed your meditation.</h2>
      <div className="flex justify-center space-x-4">
        <button
          onClick={onRestart}
          className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-xl hover:bg-indigo-700 transition-colors"
        >
          Restart
        </button>
        <button
          onClick={onHome}
          className="bg-gray-600 text-white px-8 py-4 rounded-lg text-xl hover:bg-gray-700 transition-colors"
        >
          Go Home
        </button>
      </div>
    </div>
  )
}

export default EndScreen
