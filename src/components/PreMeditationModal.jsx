import { useState } from 'react';
import AudioSelect from './AudioSelect';

// Component for pre-meditation setup
function PreMeditationModal({ audioSrc, setAudioSrc, duration, setDuration, cameraEnabled, setCameraEnabled, onStart }) {
  const [step, setStep] = useState(0); // Current step in pre-meditation

  const steps = [
    "Find a quiet, comfortable place to sit or lie down.",
    "Close your eyes and take a few deep breaths.",
    "Set your intention for this meditation session.",
    "When ready, click 'Begin' to start."
  ];

  const nextStep = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
      <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">Meditation Mirror</h1>

      {/* Pre-meditation steps */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Pre-Meditation Steps</h2>
        <p className="text-gray-700 mb-4">{steps[step]}</p>
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={step === 0}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
            aria-label="Previous step"
          >
            Previous
          </button>
          <span className="text-sm text-gray-500">{step + 1} / {steps.length}</span>
          <button
            onClick={nextStep}
            disabled={step === steps.length - 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            aria-label="Next step"
          >
            Next
          </button>
        </div>
      </div>

      {/* Audio selection */}
      <AudioSelect audioSrc={audioSrc} setAudioSrc={setAudioSrc} />

      {/* Duration selection */}
      <div className="mb-4">
        <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
          Duration (minutes)
        </label>
        <select
          id="duration"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
      </div>

      {/* Camera toggle */}
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={cameraEnabled}
            onChange={(e) => setCameraEnabled(e.target.checked)}
            className="mr-2"
          />
          Enable camera (accountability mirror)
        </label>
      </div>

      {/* Privacy notice */}
      <div className="mb-4 text-xs text-gray-600">
        <p><strong>Privacy Notice:</strong> Webcam feed is used locally only and not recorded or uploaded. Your data stays on your device.</p>
      </div>

      {/* Begin button */}
      <button
        onClick={onStart}
        className="w-full py-3 bg-green-500 text-white rounded font-semibold hover:bg-green-600 transition"
        aria-label="Begin meditation session"
      >
        Begin Meditation
      </button>
    </div>
  );
}

export default PreMeditationModal;
