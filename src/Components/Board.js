import React, { useEffect, useState } from 'react'
import "./Board.css"
import unoDeck from "./deck.json";
import PlayerDeck from './PlayerDeck'; 

export default function Board(props) {
    const [deck, setDeck] = useState(unoDeck)
    const [currentCard, setCurrentCard] = useState(deck[Math.floor(Math.random()*deck.length)])
    const [players, setPlayers] = useState([{"player": 0, "skipped": false , "isBot": false, "current": true},
    {"player": 1, "skipped": false , "isBot": true, "current": false},
    {"player": 2, "skipped": false , "isBot": true, "current": false},
    {"player": 3, "skipped": false , "isBot": true, "current": false}])
    const [currentPlayer , setCurrentPlayer] = useState(0)

    useEffect(() =>{
      console.log(players)
    })

    function playerPlayCard(card){
      if(card === "pickUp"){
        toggleCurrentPlayer(currentPlayer, getNextPlayerIndex())
      } else if(card.skip){
        setCurrentCard(card)

        toggleSkipPlayer(currentPlayer, getNextPlayerIndex()) // turn on skip for next player

      } else if(card === "skipped"){

        resetSkipPlayer(currentPlayer, getNextPlayerIndex())
      }else{
        setCurrentCard(card)

        toggleCurrentPlayer(currentPlayer, getNextPlayerIndex()) // current = false on last current player 
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

      console.log(newPlayers)

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

      console.log(newPlayers)

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

      console.log(newPlayers)

      setPlayers(newPlayers)
      setCurrentPlayer(nxtPly)
    }

    function getNextPlayerIndex(){
      const currentIndex = currentPlayer
      let nextIndex = currentIndex + 1

      if(players.length < nextIndex+1){
        nextIndex = 0
      }

      return nextIndex
    }

  return (
    <>
      <div className='boardDiv'>{props.noPlayers} Players</div>
      <h2>Current Go: {currentPlayer}</h2>
      <div className='playerDecks'>
        {players.map((player) => {
          return <PlayerDeck currentPlayer={currentPlayer} skipped={player.skipped} deck={deck} key={player.player} id={player.player} currentCard={currentCard} current={player.current} isBot={player.isBot} playerPlayCard={playerPlayCard}></PlayerDeck>
        })}
      </div>
      <h1>Current: {currentCard.num} {currentCard.colour} {currentCard.type}</h1>
    </>
  )
}
