import "./Menu.css"
import React, { useState } from 'react'
import Board from "./Board"

export default function Menu() {
    const [currentTab, setCurrentTab] = useState("main")
    const [playerName, setPlayerName] = useState("Player")
    const [numPlayer, setNumPlayer] = useState(4)
    const [playing, setPlaying] = useState(false)

    function selectSinglePlayer(){
        setCurrentTab("singleplayer")
    }

    function selectSim(){
        setCurrentTab("sim")
    }

    function selectSettings(){
        setCurrentTab("settings")
    }

    function selectMain(){
        setCurrentTab("main")
    }

    function updateName(event){
        setPlayerName(event.target.value)
    }

    function updateNumPlayer(event){
        setNumPlayer(event.target.value)
    }

    function beginSinglePlayer(){
        setPlaying(true)
    }

  return (
    <>
    {!playing && <div className="menuContainer">
        <img className="unoHeader" src="./Images/unologo.png"></img>
        {currentTab === "main" && <div className="main">
            <div className="menuButtonsDiv">
                <div className="menuButton" onClick={selectSinglePlayer}>
                    Play Singleplayer
                </div>

                <div className="menuButton" onClick={selectSim}>
                    Simulation Mode
                </div>

                <div className="menuButton" onClick={selectSettings}>
                    Settings
                </div>
            </div>
        </div>}

        {currentTab === "singleplayer" && <div className="main">
            <h2>Singleplayer</h2>
            <p>Enter your name and begin playing!</p>

            <input type="text" placeholder="Name" onChange={updateName}></input>
            <input type="number" placeholder="No. Players" max="8" min="2" onChange={updateNumPlayer}></input>

            <div className="menuButtonsDiv">
                <div className="menuButton" onClick={beginSinglePlayer}>
                    Begin
                </div>

                <div className="menuButton" onClick={selectMain}>
                    Back
                </div>
            </div>
        </div>}

        {currentTab === "sim" && <div className="main">
            <h2>Simulation Mode</h2>
            <div className="menuButtonsDiv">

                <div className="menuButton" onClick={selectMain}>
                    Back
                </div>
            </div>
        </div>}

        {currentTab === "settings" && <div className="main">
            <h2>Settings</h2>
            <div className="menuButtonsDiv">

                <div className="menuButton" onClick={selectMain}>
                    Back
                </div>
            </div>
        </div>}
    </div>}
    {playing && <Board playerName={playerName} mode={currentTab} numPlayer={numPlayer} playing={playing}></Board>}
    </>
  )
}
