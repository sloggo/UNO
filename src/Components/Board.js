import React, { useEffect, useState } from 'react'
import "./Board.css"
import DataGrapher from './DataGrapher';
import unoDeck from "./deck.json";
import PlayerDeck from './PlayerDeck'; 

export default function Board(props) {
    const [playing, setPlaying] = useState(props.playing)
    const [deck, setDeck] = useState(unoDeck)
    const [currentCard, setCurrentCard] = useState(deck[Math.floor(Math.random()*deck.length)])
    const [log, setLog] = useState([currentCard])
    const [players, setPlayers] = useState([...setPlayersArray()])
    const [currentPlayer , setCurrentPlayer] = useState(0)
    const [reversed, setReversed] = useState(false)
    const [winner, setWinner] = useState(null)
    const [mode, setMode] = useState(props.mode)

    const delay = ms => new Promise(
      resolve => setTimeout(resolve, ms)
    );

    useEffect(() =>{
      setMode(props.mode)
    }, [props])

    function reinitialiseGame(resetStats = false){
      setPlaying(true)
      setCurrentCard(deck[Math.floor(Math.random()*deck.length)])
      setPlayers(setPlayersArray())
      setCurrentPlayer(0)
      setReversed(false)
      setWinner(null)
      if(resetStats){
        setLog(currentCard)
      }
    }

    function setPlayersArray(){
      const numPlayers = props.numPlayer;
      const playerName = props.playerName;
      let newPlayers = [];

      for(let i=0; i < numPlayers; i++){
        if(i === 0){
          newPlayers.push({"player": i, "skipped": false , "isBot": false, "current": true, "name": playerName})
        } else{
          newPlayers.push({"player": i, "skipped": false , "isBot": true, "current": false, "name": "Bot".concat(i)})
        }
      }
      console.log(newPlayers)

      return newPlayers
    }

    async function playerPlayCard(card, skip){
      if(playing){
        logCard(card)
        await delay(1000);
        if(card === "pickUp"){
          toggleCurrentPlayer(currentPlayer, getNextPlayerIndex())
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
          toggleReverse()
        }else{
          setCurrentCard(card)

          toggleCurrentPlayer(currentPlayer, getNextPlayerIndex()) // current = false on last current player 
        }
      }
    }

    function toggleSkipPlayer(curPly, nxtPly){
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

    function resetSkipPlayer(curPly, nxtPly){
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

    function toggleCurrentPlayer(curPly, nxtPly){
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

    function getNextPlayerIndex(){
      if(reversed === false){
        const currentIndex = currentPlayer
        let nextIndex = currentIndex + 1

        if(players.length < nextIndex+1){
          nextIndex = 0
        }

        return nextIndex
      } else if(reversed === true){
        const currentIndex = currentPlayer
        let nextIndex = currentIndex - 1

        if(nextIndex < 0){
          nextIndex = 3
        }

        return nextIndex
      }
    }

    function toggleReverse(){
      let current = reversed
      setReversed(!current, toggleCurrentPlayer(currentPlayer, getNextPlayerIndex()))
    }

    function confirmWin(winner){
      setPlaying(false)
      setWinner(winner)
    }

    function logCard(card){
      let newLog = [...log]
      newLog.push(card)
      setLog(newLog)
    }

  return (
    <div className='gameDiv'>
      <div className='boardDiv'>
        { playing && <h2 className='current-go'>It's your go: {players.find(player => player.player === currentPlayer).name}!</h2>}
        <div className='boardDivContents'>
          { !playing && <h1>{winner} Wins!</h1>}
          <div className='playerDecks'>
            {playing && players.map((player) => {
              return <PlayerDeck name={player.name}confirmWin={confirmWin} currentPlayer={currentPlayer} skipped={player.skipped} deck={deck} key={player.player} id={player.player} currentCard={currentCard} current={player.current} isBot={player.isBot} playerPlayCard={playerPlayCard}></PlayerDeck>
            })}
          </div>
        </div>
        
        <div className='current-card-div'>
          { playing && <img className="current-card" src={currentCard.image} width={100}></img>}
        </div>
      </div>
      
      <DataGrapher log={log}></DataGrapher>
    </div>
  )
}
