import React, { useEffect, useState } from 'react'
import unoDeck from "./deck.json";
import PlayerDeck from './PlayerDeck'; 

export default function Board(props) {
    const [deck, setDeck] = useState(unoDeck)  

    useEffect(() =>{
      console.log(unoDeck)
    })

  return (
    <>
      <div className='boardDiv'>{props.noPlayers} Players</div>
      <PlayerDeck deck={deck}></PlayerDeck>
    </>
  )
}
