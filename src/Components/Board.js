import React, { useEffect, useState } from 'react'
import "./Board.css"
import unoDeck from "./deck.json";
import PlayerDeck from './PlayerDeck'; 

export default function Board(props) {
    const [deck, setDeck] = useState(unoDeck)
    const [currentCard, setCurrentCard] = useState(deck[Math.floor(Math.random()*deck.length)])
    const [players, setPlayers] = useState([{"player": 0, "skipped": false , "isBot": false, "current": true},
    {"player": 1, "skipped": false , "isBot": false, "current": false},
    {"player": 2, "skipped": false , "isBot": false, "current": false},
    {"player": 3, "skipped": false , "isBot": false, "current": false}])
    const [currentPlayer , setCurrentPlayer] = useState(0)

    useEffect(() =>{
      console.log(players)
    })

    function playerPlayCard(card){
      if(card === "pickUp"){
        toggleCurrentPlayer(currentPlayer) // current = false on last current player
        toggleCurrentPlayer(getNextPlayerIndex()) // current = true on new current player
        setCurrentPlayer(getNextPlayerIndex())
      } else if(card.skip){
        setCurrentCard(card)

        toggleSkipPlayer(getNextPlayerIndex()) // turn on skip for next player

        toggleCurrentPlayer(currentPlayer) // current = false on last current player
        toggleCurrentPlayer(getNextPlayerIndex()) // current = true on new current player
        setCurrentPlayer(getNextPlayerIndex())
      } else if("skipped"){
        toggleSkipPlayer(currentPlayer) // turn off skip

        toggleCurrentPlayer(currentPlayer) // current = false on last current player
        toggleCurrentPlayer(getNextPlayerIndex()) // current = true on new current player
        setCurrentPlayer(getNextPlayerIndex())
      }else{
        setCurrentCard(card)

        toggleCurrentPlayer(currentPlayer) // current = false on last current player
        toggleCurrentPlayer(getNextPlayerIndex()) // current = true on new current player
        setCurrentPlayer(getNextPlayerIndex())
      }
    }

    function toggleSkipPlayer(indexPlayer){
      let newPlayer = structuredClone(players[indexPlayer]);
      let newPlayers = [...players]

      newPlayer.skipped = !newPlayer.skipped
      newPlayers.splice(indexPlayer, 1, newPlayer)

      console.log(newPlayer)

      setPlayers(newPlayers)
    }

    function toggleCurrentPlayer(indexPlayer){
      let newPlayer = {...players[indexPlayer]}
      let newPlayers = [...players]

      newPlayer.current = !newPlayer.current
      newPlayers.splice(indexPlayer, 1, newPlayer)

      console.log(newPlayer)

      setPlayers(newPlayers)
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
      <h1>Current: {currentCard.num} {currentCard.colour}</h1>
    </>
  )
}
