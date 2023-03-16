import React, { useEffect, useState } from 'react'
import "./Board.css"
import DataGrapher from './DataGrapher';
import unoDeck from "./deck.json";
import PlayerDeck from './PlayerDeck'; 

export default function Board(props) {
  // set default values for board
    const [playing, setPlaying] = useState(props.playing)
    const [deck, setDeck] = useState(unoDeck)
    const [colouredDeck, setColouredDeck] = useState(unoDeck.filter(card=> card.colour))
    const [currentCard, setCurrentCard] = useState(colouredDeck[Math.floor(Math.random()*deck.length)])
    const [log, setLog] = useState([currentCard])
    const [players, setPlayers] = useState([...setPlayersArray()])
    const [currentPlayer , setCurrentPlayer] = useState(0)
    const [reversed, setReversed] = useState(false)
    const [winner, setWinner] = useState(null)
    const [mode, setMode] = useState(props.mode)
    const [startCards, setStartCards] = useState(props.startCards)
    const [numGames, setNumGames] = useState(props.numGames)
    const [gameNum, setGameNum] = useState(1)
    const [winners, setWinners] = useState([])
    const [times, setTimes] = useState([])
    const [finishedGame, setFinishedGame] = useState(false)
    const [timerSeconds, setTimerSeconds] = useState(0);
    const [timerIsActive, setTimerIsActive] = useState(false);
    const [placableCard, setPlacableCard]= useState(true)
  
    function timerToggle(override) {
      if(override){
        setTimerIsActive(override)
      }else{
        setTimerIsActive(!timerIsActive);
      }
    }
  
    function timerReset() {
      setTimerSeconds(0); // reset timer count
      setTimerIsActive(false);
    }
  
    useEffect(() => {
      let interval = null;
      if (timerIsActive) {
        interval = setInterval(() => {
          setTimerSeconds(timerSeconds => timerSeconds + 1); // increase timer by 1 every ms
        }, 1);
      } else if (!timerIsActive && timerSeconds !== 0) {
        clearInterval(interval); // reset timer
      }
      return () => clearInterval(interval);
    }, [timerIsActive, timerSeconds]);
  

    const delay = ms => new Promise(
      resolve => setTimeout(resolve, ms)
    );

    useEffect(() =>{
      setMode(props.mode)
      setNumGames(props.numGames)
      setStartCards(props.startCards)
    }, [props])

    function reinitialiseGame(resetStats = false){ //  set all states back to default
      setPlaying(true)
      timerToggle(true)
      setCurrentCard(deck[Math.floor(Math.random()*deck.length)])
      setPlayers(setPlayersArray())
      setCurrentPlayer(0)
      setReversed(false)
      setWinner(null)
      if(resetStats){
        setLog(currentCard)
        setTimes(null)
        setWinners(null)
      }
    }

    function setPlayersArray(){
      const numPlayers = props.numPlayer;
      const playerName = props.playerName;
      const player2Name = props.player2Name;
      let newPlayers = [];

      if(props.mode === "multiplayer"){ // hardcoded multiplayer players, if i had more time i would make it dynamic
        newPlayers.push({"player": 0, "skipped": false , "isBot": false, "current": true, "name": playerName})
        newPlayers.push({"player": 1, "skipped": false , "isBot": true, "current": false, "name": "Bot1"})
        newPlayers.push({"player": 2, "skipped": false , "isBot": false, "current": false, "name": player2Name})
        newPlayers.push({"player": 3, "skipped": false , "isBot": true, "current": false, "name": "Bot2"})
      } else{
        for(let i=0; i < numPlayers; i++){
            if(i === 0){
              if(!(props.mode === "sim")){ // if not sim, add player
    
                newPlayers.push({"player": i, "skipped": false , "isBot": false, "current": true, "name": playerName})
    
              } else { // else let all other players be bots
    
                newPlayers.push({"player": i, "skipped": false , "isBot": true, "current": true, "name": "Bot".concat(i)})
    
              }
            } else{
              newPlayers.push({"player": i, "skipped": false , "isBot": true, "current": false, "name": "Bot".concat(i)})
            }
          }
      }

      return newPlayers
    }

    async function playerPlayCard(card, skip){
      if(playing){
        setPlacableCard(false) // to stop players from playing multiple cards in one go
        logCard(card)
        !(mode === "sim") ? await delay(1000) : await delay(1) ; // speed up simulation / slow down singleplayer
        if(card === "pickUp"){
          resetSkipPlayer(currentPlayer, getNextPlayerIndex()) // skip player if picked up
        } else if(card.skip){
          setCurrentCard(card)
          toggleSkipPlayer(currentPlayer, getNextPlayerIndex()) // turn on skip for next player

        } else if(card === "red"){
          if(skip === "skip"){
            setCurrentCard({"colour": "red", "num": "any", "plusNum":4, "image":"Images/red.png"}) // to allow next player to pick up 4
            toggleSkipPlayer(currentPlayer, getNextPlayerIndex()) // turn on skip for next player
          } else{
            setCurrentCard({"colour": "red", "num": "any", "image":"Images/red.png"})
            toggleCurrentPlayer(currentPlayer, getNextPlayerIndex())
          }
        }else if(card === "blue"){
          if(skip === "skip"){
            setCurrentCard({"colour": "blue", "num": "any", "plusNum":4, "image":"Images/blue.png"})
            toggleSkipPlayer(currentPlayer, getNextPlayerIndex()) // turn on skip for next player
          } else{
            setCurrentCard({"colour": "blue", "num": "any", "image":"Images/blue.png"})
            toggleCurrentPlayer(currentPlayer, getNextPlayerIndex())
          }
        }else if(card === "green"){
          if(skip === "skip"){
            setCurrentCard({"colour": "green", "num": "any", "plusNum":4, "image":"Images/green.png"})
            toggleSkipPlayer(currentPlayer, getNextPlayerIndex()) // turn on skip for next player
          } else{
            setCurrentCard({"colour": "green", "num": "any", "plusNum":4, "image":"Images/green.png"})
            toggleCurrentPlayer(currentPlayer, getNextPlayerIndex())
          }
        }else if(card === "yellow"){
          if(skip === "skip"){
            setCurrentCard({"colour": "yellow", "num": "any", "plusNum":4, "plusNum":4, "image":"Images/yellow.png"})
            toggleSkipPlayer(currentPlayer, getNextPlayerIndex()) // turn on skip for next player
          } else{
            setCurrentCard({"colour": "yellow", "num": "any", "plusNum":4, "image":"Images/yellow.png"})
            toggleCurrentPlayer(currentPlayer, getNextPlayerIndex())
          }
        } else if(card === "skipped"){

          resetSkipPlayer(currentPlayer, getNextPlayerIndex())
        }else if(card.type === "reverse"){
          setCurrentCard(card)
          toggleReverse() // change reverse direction
        }else{
          setCurrentCard(card)

          toggleCurrentPlayer(currentPlayer, getNextPlayerIndex()) // current = false on last current player 
        }
        setPlacableCard(true) // allow next player to play card
      }
    }

    function toggleSkipPlayer(curPly, nxtPly){ // make copy of state, edit then resubmit state
      let curPlayerEdit = {...players[curPly]}
      let nxtPlayerEdit = {...players[nxtPly]}

      let newPlayers = [...players]

      curPlayerEdit.current = false
      newPlayers.splice(curPly, 1, curPlayerEdit)

      nxtPlayerEdit.current = true
      nxtPlayerEdit.skipped = true
      newPlayers.splice(nxtPly, 1, nxtPlayerEdit)

      console.log("updated players",newPlayers)

      setPlayers(newPlayers)
      setCurrentPlayer(nxtPly)
    }

    function resetSkipPlayer(curPly, nxtPly){ // make copy of state, edit then resubmit state
      let curPlayerEdit = {...players[curPly]}
      let nxtPlayerEdit = {...players[nxtPly]}

      let newPlayers = [...players]

      curPlayerEdit.current = false
      curPlayerEdit.skipped = false
      newPlayers.splice(curPly, 1, curPlayerEdit)

      nxtPlayerEdit.current = true
      newPlayers.splice(nxtPly, 1, nxtPlayerEdit)

      console.log("updated players",newPlayers)

      setPlayers(newPlayers)
      setCurrentPlayer(nxtPly)
    }

    function toggleCurrentPlayer(curPly, nxtPly){ // make copy of state, edit then resubmit state
      let curPlayerEdit = {...players[curPly]}
      let nxtPlayerEdit = {...players[nxtPly]}

      let newPlayers = [...players]

      curPlayerEdit.current = false
      newPlayers.splice(curPly, 1, curPlayerEdit) 

      nxtPlayerEdit.current = true
      newPlayers.splice(nxtPly, 1, nxtPlayerEdit)

      console.log("updated players",newPlayers)

      setPlayers(newPlayers)
      setCurrentPlayer(nxtPly)
    }

    function getNextPlayerIndex(){ // use reverse logic
      if(reversed === false){
        const currentIndex = currentPlayer
        let nextIndex = currentIndex + 1

        if(players.length -1 < nextIndex){
          nextIndex = 0
        }

        return nextIndex
      } else if(reversed === true){
        const currentIndex = currentPlayer
        let nextIndex = currentIndex - 1

        if(nextIndex < 0){
          nextIndex = players.length-1
        }

        return nextIndex
      }
    }

    function toggleReverse(){
      let current = reversed
      setReversed(!current)
      const currentIndex = currentPlayer
      let nextIndex = null

      if(!current === true){
        nextIndex = currentIndex - 1

        if(nextIndex < 0){
          nextIndex = players.length-1
        }
      } else{
        nextIndex = currentIndex + 1

        if(players.length -1 < nextIndex){
          nextIndex = 0
        }
      }

      let curPlayerEdit = {...players[currentIndex]}
      let nxtPlayerEdit = {...players[nextIndex]}

      let newPlayers = [...players]

      curPlayerEdit.current = false
      newPlayers.splice(currentIndex, 1, curPlayerEdit) 

      nxtPlayerEdit.current = true
      newPlayers.splice(nextIndex, 1, nxtPlayerEdit)

      console.log("updated players",newPlayers)

      setPlayers(newPlayers)
      setCurrentPlayer(nextIndex)
    }

    async function confirmWin(winner){
      let time = timerSeconds
      timerToggle(false)
      timerReset()
      let oldgameNum = gameNum
      console.log(oldgameNum++)
      setGameNum(oldgameNum++)
      setPlaying(false)
      setWinner(winner)

      let oldTimes = [...times]
      oldTimes.push(time) // update times array
      setTimes(oldTimes)

      let oldWinners = [...winners]
      oldWinners.push(winner) // update winners array
      setWinners(oldWinners)

      if(gameNum < numGames){
        await delay(500) // if sim more than one game, continue with another
        reinitialiseGame()
      } else{
        setFinishedGame(true) // enable back to menu button
      }
    }

    function logCard(card){
      let newLog = [...log]
      newLog.push(card)
      setLog(newLog)
    }

  return (
    <div className='gameDiv'>
      <div className='boardDiv'>
        { playing && <h1>Game {gameNum}</h1>}
        { !playing && <h1>Game {gameNum -1} finished!</h1>}
        { playing && <h2 className='current-go'>It's your go: {players.find(player => player.player === currentPlayer).name}!</h2>}
        <div className='boardDivContents'>
          { !playing && <h1>{winner} Wins!</h1>}
          { finishedGame && <button onClick={props.finishedGame}>Back to menu</button>}
          <div className='playerDecks'>
            {playing && players.map((player) => {
              return <PlayerDeck placableCard={placableCard} resetSkipPlayer={resetSkipPlayer} startCards={props.startCards} mode={mode} name={player.name}confirmWin={confirmWin} currentPlayer={currentPlayer} skipped={player.skipped} deck={deck} key={player.player} id={player.player} currentCard={currentCard} current={player.current} isBot={player.isBot} playerPlayCard={playerPlayCard}></PlayerDeck>
            })}
          </div>
        </div>
        
        <div className='current-card-div'>
          { playing && <img className="current-card" src={currentCard.image} width={100}></img>}
        </div>
      </div>
      
      <DataGrapher times={times} log={log} winners={winners} players={players}></DataGrapher>
    </div>
  )
}

