import React, { useEffect, useState } from 'react'
import "./PlayerDeck.css";
import Card from './Card';

export default function PlayerDeck(props) {
    const [cards, setCards] = useState(initiateCards());
    const [isBot, setBot] = useState(props.id === "player"? false: true)
    const [isPlayer, setIsPlayer] = useState(props.currentPlayer === props.id? true: false)

    function initiateCards() {
        let newCards = []

        for (let i = 0; i < 9; i++) {
            let newCard = props.deck[Math.floor(Math.random()*props.deck.length)]
            console.log(newCard)
            newCards.push(newCard)
          }
        return newCards
    }

    function clickCard(card) {
      console.log(card)
      if (validateMove(card)){
        props.playerPlayCard(card)
      } else{
        console.log("Not valid card")
      }
    }

    function validateMove(card){
      const currentCard = props.currentCard

      if(card.colour === currentCard.colour || card.num === currentCard.num || card.type === currentCard.type){
        return true
      } else{
        return false
      }
    }

  return (
    <div className='playerDeckContainer'>
      { isPlayer ? <h2 className='activePlayer'>{props.id}</h2> : <h2>{props.id}</h2>} 
      {cards.map((card) => {
        return <Card card={card} isBot={isBot} isPlayer={isPlayer} clickCard={clickCard}></Card>
      })}
    </div>
  )
}
