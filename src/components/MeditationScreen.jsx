import { useEffect, useRef } from 'react'

function MeditationScreen({ webcamEnabled, selectedSound, youtubeUrl, timer, isPaused, setIsPaused, onEnd }) {
  const videoRef = useRef(null)
  const audioRef = useRef(null)

  useEffect(() => {
    if (webcamEnabled) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream
          }
        })
        .catch(err => console.error('Error accessing webcam:', err))
    }
  }, [webcamEnabled])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center">
      {webcamEnabled && (
        <video
          ref={videoRef}
          autoPlay
          className="absolute top-4 right-4 w-48 h-36 border rounded"
        />
      )}
      
      <div className="text-6xl font-mono mb-8">{formatTime(timer)}</div>
      
      {selectedSound === 'YouTube Video' && youtubeUrl && (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${youtubeUrl.split('v=')[1]}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="mb-8"
        ></iframe>
      )}
      
      {(selectedSound === 'Healing Music' || selectedSound === 'Binaural Beats') && (
        <audio ref={audioRef} autoPlay loop>
          <source src={`/sounds/${selectedSound.toLowerCase().replace(' ', '-')}.mp3`} type="audio/mpeg" />
        </audio>
      )}
      
      <div className="flex space-x-4">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="bg-white text-black px-6 py-3 rounded-lg text-xl hover:bg-gray-200 transition-colors"
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        <button
          onClick={onEnd}
          className="bg-red-600 text-white px-6 py-3 rounded-lg text-xl hover:bg-red-700 transition-colors"
        >
          Stop
        </button>
      </div>
    </div>
  )
}

export default MeditationScreen
