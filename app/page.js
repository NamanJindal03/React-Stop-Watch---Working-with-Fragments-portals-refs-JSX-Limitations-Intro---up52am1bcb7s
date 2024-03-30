'use client'
import React, { useRef, useState } from 'react'

function Home() {

  const startTime = useRef(0);
  const intervalRef = useRef(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [laps, setLaps] = useState([]);

  function startStopWatch(){
    if(intervalRef.current){
      clearInterval(intervalRef.current)
    }
    startTime.current = Date.now();
    intervalRef.current = setInterval(()=>{
      setCurrentTime(Date.now())
    },10)
  }

  let timeToDisplay = ((currentTime-startTime.current)/1000).toFixed(3) 

  function stopStopWatch(){
     clearInterval(intervalRef.current);
  }

  function addLap(){
    setLaps((prev)=> [...prev, timeToDisplay])
  }
  function resetStopWatch(){
    if(intervalRef.current){
      clearInterval(intervalRef.current)
    }
    startTime.current = 0;
    intervalRef.current = 0;
    setLaps([]);
    setCurrentTime(0);
  }

  return (
    <div id="main">
      <section>
        <h1 className='seconds-elapsed'>{timeToDisplay }</h1>
        <section className='buttons'>
          <button className="start-btn" onClick={startStopWatch}>START</button>
          <button className="stop-btn" onClick={stopStopWatch}>STOP</button>
          <button className="lap-btn" onClick={addLap}>LAP</button>
          <button className="reset-btn" onClick={resetStopWatch}>RESET</button>
        </section>
      </section>
      {laps?.length ?
        <section className='lap-section' >
          <h2>Laps</h2>
          <section className='laps'>
            {
              laps.map((lap)=>{
                return (
                  <div>{lap}</div>
                )
              })
            }
            
          </section>
        </section>
        : null
      }
    </div>
  )
}

export default Home
