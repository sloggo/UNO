import "./Menu.css"
import React, { useState } from 'react'
import Board from "./Board"

export default function Menu() {
    const [currentTab, setCurrentTab] = useState("main") // uses this to keep track of what tab the player is on
    const [playerName, setPlayerName] = useState("Player") // default values
    const [player2Name, setPlayer2Name] = useState("Player 2")
    const [numPlayer, setNumPlayer] = useState(4)
    const [numGames, setNumGames] = useState(1)
    const [startCards, setStartCards] = useState(9)
    const [playing, setPlaying] = useState(false) // trigger board component

    function selectSinglePlayer(){
        setCurrentTab("singleplayer")
    }

    function selectMultiPlayer(){
        setCurrentTab("multiplayer")
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
        setPlayerName(event.target.value) // updates state to value entered by user
    }

    function updateName2(event){
        setPlayer2Name(event.target.value) // updates state to value entered by user
        setNumPlayer(2)
    }

    function updateNumPlayer(event){
        setNumPlayer(event.target.value)
    }

    function updateNumGames(event){
        setNumGames(event.target.value)
    }

    function beginSinglePlayer(){
        setPlaying(true)
    }

    function updateNumCards(event){
        setStartCards(event.target.value)
    }

    function finishedGame(){ // reset values to default
        setPlaying(false)
        setPlayerName("Player")
        setNumGames(1)
        setNumPlayer(4)
        setCurrentTab("main")
        setStartCards(9)
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

                <div className="menuButton" onClick={selectMultiPlayer}>
                    Play Multiplayer
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

        {currentTab === "multiplayer" && <div className="main">
            <h2>2 Player Multiplayer</h2>
            <p>Enter your names and begin playing!</p>

            <input type="text" placeholder="Name" onChange={updateName}></input>
            <input type="text" placeholder="Name2" onChange={updateName2}></input>

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
            <p>Test hypotheses by tweaking these values!</p>
            <input type="number" placeholder="No. Players" max="8" min="2" onChange={updateNumPlayer}></input>
            <input type="number" placeholder="No. Games" max="50" min="1" onChange={updateNumGames}></input>
            <input type="number" placeholder="No. Starting Cards" max="20" min="3" onChange={updateNumCards}></input>

            <div className="menuButtonsDiv">
                <div className="menuButton" onClick={beginSinglePlayer}>
                    Begin
                </div>

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
    {playing && <Board mode={currentTab} player2Name={player2Name} playerName={playerName} numPlayer={numPlayer} numGames={numGames} startCards={startCards} playing={playing}></Board>}
    </>
  )
}
