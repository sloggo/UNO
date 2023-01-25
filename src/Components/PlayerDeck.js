import React, { useEffect, useState } from 'react'
import "./PlayerDeck.css";

export default function PlayerDeck(props) {
    const [cards, setCards] = useState(initiateCards());

    function initiateCards() {
        let newCards = []

        for (let i = 0; i < 9; i++) {
            let newCard = props.deck[Math.floor(Math.random()*props.deck.length)]
            console.log(newCard)
            newCards.push(newCard)
          }
        return newCards
    }

  return (
    <div className='playerDeckContainer'>
      <h2>{props.id}</h2>
      {cards.map((card) => {
        return <p key={card.number}>{card.colour}, {card.type}, {card.num}, {card.plusNum}</p>
      })}
    </div>
  )
}
