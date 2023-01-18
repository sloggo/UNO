import React, { useEffect, useState } from 'react'

export default function PlayerDeck(props) {
    const [cards, setCards] = useState();

    useEffect(() =>{
        initiateCards();
        console.log(cards)
    },[]);

    function initiateCards() {
        let newCards = []

        for (let i = 0; i < 9; i++) {
            let newCard = props.deck[Math.floor(Math.random()*props.deck.length)]
            console.log(newCard)
            newCards.push(newCard)
          }

        console.log(newCards)
        setCards(newCards)
    }

  return (
    <div></div>
  )
}
