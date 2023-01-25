import React, { useEffect, useState } from 'react'
import "./Board.css"
import unoDeck from "./deck.json";
import PlayerDeck from './PlayerDeck'; 

export default function Board(props) {
    const [deck, setDeck] = useState(unoDeck)
    const [currentCard, setCurrentCard] = useState(deck[Math.floor(Math.random()*deck.length)])
    const [players, setPlayers] = useState(["player", "bot1", "bot2", "bot3"])
    const [currentPlayer , setCurrentPlayer] = useState(players[0])

    useEffect(() =>{
      console.log(unoDeck)
    })

  return (
    <>
      <div className='boardDiv'>{props.noPlayers} Players</div>
      <h2>Current Go: {currentPlayer}</h2>
      <div className='playerDecks'>
        {players.map((player) => {
          return <PlayerDeck deck={deck} key={player} id={player} currentCard={currentCard} currentPlayer={currentPlayer} ></PlayerDeck>
        })}
      </div>
      <h1>Current: {currentCard.num} {currentCard.colour}</h1>
    </>
  )
}
