import { useState, useEffect } from 'react'
import WelcomeScreen from './components/WelcomeScreen'
import PreparationFlow from './components/PreparationFlow'
import MeditationSetup from './components/MeditationSetup'
import MeditationScreen from './components/MeditationScreen'
import EndScreen from './components/EndScreen'

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome')
  const [webcamEnabled, setWebcamEnabled] = useState(false)
  const [selectedSound, setSelectedSound] = useState('Healing Music')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [customTime, setCustomTime] = useState(5)
  const [timer, setTimer] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const startPreparation = () => setCurrentScreen('preparation')
  const goToSetup = () => setCurrentScreen('setup')
  const startMeditation = () => {
    setTimer(customTime * 60)
    setCurrentScreen('meditation')
  }
  const endMeditation = () => setCurrentScreen('end')
  const restart = () => {
    setCurrentScreen('welcome')
    setTimer(0)
    setIsPaused(false)
  }

  useEffect(() => {
    if (currentScreen === 'meditation' && timer > 0 && !isPaused) {
      const interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            endMeditation()
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [currentScreen, timer, isPaused])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      {currentScreen === 'welcome' && <WelcomeScreen onStart={startPreparation} />}
      {currentScreen === 'preparation' && <PreparationFlow onContinue={goToSetup} />}
      {currentScreen === 'setup' && (
        <MeditationSetup
          webcamEnabled={webcamEnabled}
          setWebcamEnabled={setWebcamEnabled}
          selectedSound={selectedSound}
          setSelectedSound={setSelectedSound}
          youtubeUrl={youtubeUrl}
          setYoutubeUrl={setYoutubeUrl}
          customTime={customTime}
          setCustomTime={setCustomTime}
          onStart={startMeditation}
        />
      )}
      {currentScreen === 'meditation' && (
        <MeditationScreen
          webcamEnabled={webcamEnabled}
          selectedSound={selectedSound}
          youtubeUrl={youtubeUrl}
          timer={timer}
          isPaused={isPaused}
          setIsPaused={setIsPaused}
          onEnd={endMeditation}
        />
      )}
      {currentScreen === 'end' && <EndScreen onRestart={restart} onHome={restart} />}
    </div>
  )
}

export default App
