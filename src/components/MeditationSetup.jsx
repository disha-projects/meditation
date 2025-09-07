import React from 'react'

function MeditationSetup({ webcamEnabled, setWebcamEnabled, selectedSound, setSelectedSound, youtubeUrl, setYoutubeUrl, customTime, setCustomTime, onStart }) {
  return (
    <div className="text-center p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-8">Meditation Setup</h2>
      
      <div className="mb-6">
        <label className="flex items-center justify-center">
          <input
            type="checkbox"
            checked={webcamEnabled}
            onChange={(e) => setWebcamEnabled(e.target.checked)}
            className="mr-2"
          />
          Enable Webcam
        </label>
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Background Sound</label>
        <select
          value={selectedSound}
          onChange={(e) => setSelectedSound(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option>Healing Music</option>
          <option>Binaural Beats</option>
          <option>YouTube Video</option>
        </select>
        {selectedSound === 'YouTube Video' && (
          <input
            type="text"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="Paste YouTube URL"
            className="w-full p-2 border rounded mt-2"
          />
        )}
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Duration</label>
        <div className="flex justify-center space-x-2 mb-2">
          {[2, 5, 10].map(time => (
            <button
              key={time}
              onClick={() => setCustomTime(time)}
              className={`px-4 py-2 rounded ${customTime === time ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
            >
              {time} min
            </button>
          ))}
        </div>
        <input
          type="number"
          value={customTime}
          onChange={(e) => setCustomTime(parseInt(e.target.value))}
          className="w-full p-2 border rounded"
          min="1"
        />
      </div>
      
      <button
        onClick={onStart}
        className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-xl hover:bg-indigo-700 transition-colors"
      >
        Start Meditation
      </button>
    </div>
  )
}

export default MeditationSetup
