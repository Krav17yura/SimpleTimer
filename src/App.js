import React, {useState, useRef} from 'react'
import './App.css'

const padTime = (time) => time.toString().padStart(2, '0')

function App() {
    const [title, setTitle] = useState('Let the countdown begin!!!');
    const [timer, setTimer] = useState(10 * 60)
    const [isRunning, setIsRunning] = useState(false)
    const intervalRef = useRef(null)

    const startTimer = () => {
        if (intervalRef.current !== null) return;

        setIsRunning(true)
        setTitle("You`re doing great!")
        intervalRef.current = setInterval(() => {
            setTimer(timeLeft => {
                if (timeLeft >= 1) return timeLeft - 1
                resetTimer()
                return 0
            })
        }, 1000)
    }

    const stopTimer = () => {
        if (intervalRef.current === null) return;

        clearInterval(intervalRef.current)
        intervalRef.current = null
        setTitle('Keep it up')
        setIsRunning(false)
    }

    const resetTimer = () => {
        clearInterval(intervalRef.current)
        intervalRef.current = null
        setTitle('Let the countdown begin!!!')
        setTimer(10 * 60)
        setIsRunning(false)
    }

    const minutes = padTime(Math.floor(timer / 60))
    const seconds = padTime(timer - minutes * 60)

    return (
        <div className="app">
            <h2>{title}</h2>
            <div className="timer">
                <span>{minutes}</span>
                <span>:</span>
                <span>{seconds}</span>
            </div>
            <div className="buttons">
                {!isRunning && <button onClick={startTimer}>Start</button>}
                {isRunning && <button onClick={stopTimer}>Stop</button>}
                <button onClick={resetTimer}>Reset</button>
            </div>
        </div>
    );
}

export default App;
