import React, { useEffect, useState } from 'react'
import "./PlayerDeck.css";
import Card from './Card';

export default function PlayerDeck(props) {
    const [cards, setCards] = useState(initiateCards());
    const [isBot, setBot] = useState(props.id === "player"? false: true)
    const [currentPlayer, setCurrentPlayer] = useState(props.currentPlayer)
    const [isPlayer, setIsPlayer] = useState()

    useEffect(() => {
      setCurrentPlayer(props.currentPlayer);
      setIsPlayer(currentPlayer === props.id ? true : false)
      console.log(props.id, "isBot", isBot, "currentPlayer", currentPlayer, "isplayer", isPlayer)
    })

    function initiateCards() {
        let newCards = []

        for (let i = 0; i < 9; i++) {
            let newCard = {...props.deck[Math.floor(Math.random()*props.deck.length)]}
            newCard.owner = props.id
            newCards.push(newCard)
          }
        return newCards
    }

    function clickCard(card) {
      console.log(card)
      if (validateMove(card)){
        props.playerPlayCard(card)
        removeFromDeck(card)
      } else{
        console.log("Not valid card")
      }
    }

    function removeFromDeck(card){
      let newCards = [...cards]
      let removeIndex = cards.indexOf(card)

      newCards.splice(removeIndex, 1)
      setCards(newCards)
    }

    function validateMove(card){
      const currentCard = props.currentCard
      let validCard = false
      let validOwner = false

      if(card.colour === currentCard.colour || card.num === currentCard.num || card.type === currentCard.type){
        validCard = true
      } else{
        validCard = false
        console.log('Not playable!')
      }

      if(card.owner === props.id){
        validOwner = true
      } else{
        validOwner = false
        console.log('Not your card!')
      }

      if(validCard && validOwner){
        return true
      } else{
        return false
      }
    }

    function botMove(){
      console.log('bot must move')
    }

    useEffect(() => {
      if((isPlayer === true) && (isBot === true)){ // if the player is next and a bot
        botMove()
      }
    },[isPlayer])

  return (
    <div className='playerDeckContainer'>
      { isPlayer ? <h2 className='activePlayer'>{props.id}</h2> : <h2>{props.id}</h2>} 
      {cards.map((card) => {
        return <Card card={card} isBot={isBot} isPlayer={isPlayer} clickCard={clickCard}></Card>
      })}
    </div>
  )
}
