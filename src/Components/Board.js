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
    const [currentPlayer , setCurrentPlayer] = useState(players[0])

    useEffect(() =>{
      console.log(unoDeck)
      console.log(currentPlayer)
    })

    function playerPlayCard(card){
      if(card === "pickUp"){
        toggleCurrentPlayer(getNextPlayer())
        setCurrentPlayer(getNextPlayer())
      } else if(card.skip){
        setCurrentCard(card)

        toggleSkipPlayer(getNextPlayer())

        toggleCurrentPlayer(getNextPlayer())
        setCurrentPlayer(getNextPlayer())
      } else if("skipped"){
        toggleSkipPlayer(getCurrentPlayerIndex())

        toggleCurrentPlayer(getNextPlayer())
        setCurrentPlayer(getNextPlayer())
      }else{
        setCurrentCard(card)

        toggleCurrentPlayer(getNextPlayer())
        setCurrentPlayer(getNextPlayer())
      }
    }

    function toggleSkipPlayer(indexPlayer){
      let newPlayer = {...players[indexPlayer]}
      let newPlayers = [...players]

      newPlayer.skipped = !newPlayer.skipped
      newPlayers.splice(indexPlayer, 1, newPlayer)

      setPlayers(newPlayers)
    }

    function toggleCurrentPlayer(indexPlayer){
      let newPlayer = {...players[indexPlayer]}
      let newPlayers = [...players]

      newPlayer.current = !newPlayer.current
      newPlayers.splice(indexPlayer, 1, newPlayer)

      setPlayers(newPlayers)
    }

    function getCurrentPlayerIndex(){
      const currentIndex = players.indexOf(currentPlayer)
      return currentIndex
    }

    function getNextPlayer(){
      const currentIndex = players.indexOf(currentPlayer)
      let nextIndex = currentIndex + 1

      if(players.length < nextIndex+1){
        nextIndex = 0
      }

      return players[nextIndex]
    }

  return (
    <>
      <div className='boardDiv'>{props.noPlayers} Players</div>
      <h2>Current Go: {currentPlayer}</h2>
      <div className='playerDecks'>
        {players.map((player) => {
          return <PlayerDeck skipped={player.skipped} deck={deck} key={player.player} id={player.player} currentCard={currentCard} current={player.current} isBot={player.isBot} playerPlayCard={playerPlayCard}></PlayerDeck>
        })}
      </div>
      <h1>Current: {currentCard.num} {currentCard.colour}</h1>
    </>
  )
}
