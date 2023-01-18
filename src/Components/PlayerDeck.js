import React, { useEffect, useState } from 'react'

export default function PlayerDeck(props) {
    const [cards, setCards] = useState();

    useEffect(() =>{
        initiateCards();
        console.log(cards)
    });

    function initiateCards() {
        let newCards = []

        for (let i = 0; i < 9; i++) {
            newCards.push(props.deck[Math.floor(Math.random()*props.deck.length)])
          }

        setCards(newCards)
    }

  return (
    <div>PlayerDeck</div>
  )
}
