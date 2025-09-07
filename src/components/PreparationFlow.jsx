import { useState, useEffect } from 'react'

function PreparationFlow({ onContinue }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [breathingCycle, setBreathingCycle] = useState(0)

  const steps = [
    "Find a quiet place where you won't be disturbed.",
    "Sit comfortably with a straight back.",
    "Deep breathing: Breathe in... hold... breathe out...",
    "Let go of all thoughts and just be present."
  ]

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      onContinue()
    }
  }

  const BreathingAnimation = () => {
    const [scale, setScale] = useState(1)
    const [phase, setPhase] = useState('in')

    useEffect(() => {
      const interval = setInterval(() => {
        setScale(prev => prev === 1 ? 1.5 : 1)
        setPhase(prev => prev === 'in' ? 'out' : 'in')
      }, 2000)
      return () => clearInterval(interval)
    }, [])

    return (
      <div className="flex flex-col items-center">
        <div
          className="w-32 h-32 bg-indigo-200 rounded-full transition-transform duration-2000"
          style={{ transform: `scale(${scale})` }}
        ></div>
        <p className="mt-4 text-lg text-gray-700">
          {phase === 'in' ? "Breathe in..." : "Breathe out..."}
        </p>
      </div>
    )
  }

  return (
    <div className="text-center p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-8">Preparation Step {currentStep}</h2>
      <p className="text-xl text-gray-600 mb-8">{steps[currentStep - 1]}</p>
      {currentStep === 3 && <BreathingAnimation />}
      <button
        onClick={nextStep}
        className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-xl hover:bg-indigo-700 transition-colors"
      >
        {currentStep === 4 ? "Continue to Meditation Setup" : "Done"}
      </button>
    </div>
  )
}

export default PreparationFlow
