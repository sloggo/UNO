import React, { useEffect, useState } from 'react'
import "./Board.css"
import unoDeck from "./deck.json";
import PlayerDeck from './PlayerDeck'; 

export default function Board(props) {
    const [deck, setDeck] = useState(unoDeck)
    const [currentCard, setCurrentCard] = useState(deck[Math.floor(Math.random()*deck.length)])
    const [players, setPlayers] = useState(["player", "bot1", "bot2", "bot3"])
    const [currentPlayer , setCurrentPlayer] = useState(players[0])
    const [skippedPlayer, setSkippedPlayer] = useState(null)

    useEffect(() =>{
      console.log(unoDeck)
      console.log(currentPlayer)
      console.log(skippedPlayer)
    })

    function playerPlayCard(card){
      if(card === "pickUp"){
        setCurrentPlayer(getNextPlayer())
      } else if(card.skip){
        setCurrentCard(card)
        setSkippedPlayer(getNextPlayer())
        setCurrentPlayer(getNextPlayer())
      } else if("skipped"){
        setSkippedPlayer(null)
        setCurrentPlayer(getNextPlayer())
      }else{
        setCurrentCard(card)
        setCurrentPlayer(getNextPlayer())
      }
    }

    function skipNext(){
      
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
          return <PlayerDeck skippedPlayer={skippedPlayer} deck={deck} key={player} id={player} currentCard={currentCard} currentPlayer={currentPlayer} playerPlayCard={playerPlayCard}></PlayerDeck>
        })}
      </div>
      <h1>Current: {currentCard.num} {currentCard.colour}</h1>
    </>
  )
}
