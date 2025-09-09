import { useState, useEffect, useRef } from 'react';

// Component for the meditation session
function MeditationSession({ audioSrc, duration, stream, onEnd, logSession }) {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // in seconds
  const [isPlaying, setIsPlaying] = useState(false);
  const [cameraOn, setCameraOn] = useState(!!stream);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const intervalRef = useRef(null);

  // Start timer
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            playBell();
            logSession(duration);
            onEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, onEnd, logSession, duration]);

  // Handle audio
  useEffect(() => {
    if (audioSrc && audioRef.current) {
      audioRef.current.src = audioSrc;
      if (isPlaying) audioRef.current.play();
    }
  }, [audioSrc, isPlaying]);

  // Handle video
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  // Play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (audioRef.current) {
      if (!isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  // Toggle camera
  const toggleCamera = () => {
    setCameraOn(!cameraOn);
  };

  // Play bell sound using WebAudio
  const playBell = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(800, audioContext.currentTime); // Bell-like frequency
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 1);

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1);
  };

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center text-white">
      {/* Timer */}
      <div className="text-6xl font-mono mb-4" aria-live="polite">
        {formatTime(timeLeft)}
      </div>

      {/* Progress bar */}
      <div className="w-64 h-2 bg-gray-700 rounded mb-4">
        <div
          className="h-full bg-blue-500 rounded transition-all duration-1000"
          style={{ width: `${progress}%` }}
          aria-label={`Progress: ${Math.round(progress)}%`}
        ></div>
      </div>

      {/* Video feed */}
      {cameraOn && stream && (
        <video
          ref={videoRef}
          autoPlay
          muted
          className="w-64 h-48 bg-gray-800 rounded mb-4"
          aria-label="Webcam feed"
        ></video>
      )}

      {/* Controls */}
      <div className="flex space-x-4 mb-4">
        <button
          onClick={togglePlay}
          className="px-6 py-3 bg-blue-500 rounded font-semibold hover:bg-blue-600"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        {stream && (
          <button
            onClick={toggleCamera}
            className="px-6 py-3 bg-gray-500 rounded font-semibold hover:bg-gray-600"
            aria-label={cameraOn ? 'Hide camera' : 'Show camera'}
          >
            {cameraOn ? 'Hide Camera' : 'Show Camera'}
          </button>
        )}
        <button
          onClick={onEnd}
          className="px-6 py-3 bg-red-500 rounded font-semibold hover:bg-red-600"
          aria-label="End session"
        >
          End
        </button>
      </div>

      {/* Audio element */}
      <audio ref={audioRef} loop />
    </div>
  );
}

export default MeditationSession;
