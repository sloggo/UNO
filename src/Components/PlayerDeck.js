import React, { useEffect, useState } from 'react'
import "./PlayerDeck.css";
import Card from './Card';

export default function PlayerDeck(props) {
    const [cards, setCards] = useState(initiateCards());
    const [isBot, setBot] = useState(props.isBot)
    const [currentPlayer, setCurrentPlayer] = useState(props.currentPlayer)
    const [isPlayer, setIsPlayer] = useState(props.current)
    const [isSkipped, setIsSkipped] = useState(props.skipped)

    useEffect(() => {
      setBot(props.isBot)
      setCurrentPlayer(props.currentPlayer);
      setIsPlayer(props.current)
      setIsSkipped(props.skipped)
    })

    useEffect(() => {
      if(isSkipped){
        playerSkipped()
      }
    }, [isSkipped])

    const delay = ms => new Promise(
      resolve => setTimeout(resolve, ms)
    );

    function playerSkipped(){
        if(props.currentCard.plusNum){ // if the card just played has a plus attribute
          pickUp(props.currentCard.plusNum)
        } else{
          props.playerPlayCard("skipped") // skip players go
        }
    }

    function randomCard() { 
      let newCard = structuredClone(props.deck[Math.floor(Math.random()*props.deck.length)]); // selects random card
      newCard.owner = props.id // adds owner attribute

      return newCard
    }

    function initiateCards() {
        let newCards = []

        for (let i = 0; i < 9; i++) { // cycles 9 times
            newCards.push(randomCard())
          }
        return newCards
    }

    function clickCard(card) {
      console.log(card)
      if (validateMove(card)){ // if the move is valid
        props.playerPlayCard(card) // pass up to board to change current card
        removeFromDeck(card) // remove it from the deck
      } else{
        console.log("Not valid card")
      }
    }

    function removeFromDeck(card){
      let newCards = [...cards] // creates copy to not mess with react props
      let removeIndex = cards.indexOf(card) // finds index to remove

      newCards.splice(removeIndex, 1) // splices just the card to remove
      setCards(newCards) // update player deck UI
    }

    function validateMove(card){
      const currentCard = props.currentCard
      let validCard = false
      let validOwner = false // default values

      let currentPlayerIndex = props.currentPlayer
      console.log(currentPlayerIndex)

      if(card.colour === currentCard.colour || card.num === currentCard.num || card.changeColour === true){ // if the card is of the same number, colour or a wild/plus4
        validCard = true // the actual card is legal to be played
      } else{
        validCard = false
        console.log('Not playable!')
      }

      if(card.owner === props.currentPlayer){ // if current player owns the card chosen
        validOwner = true // the owner is legal
      } else{
        validOwner = false
        console.log('Not your card!')
      }

      if(validCard && validOwner){ // if both owner and card is legal to be played
        return true // allow the card to be played
      } else{
        return false
      }
    }

    function getValidMoves(){
      let validMoves = cards.filter((card) => { // create array of valid moves by filtering if the card is legal
        if(validateMove(card)){
          return true
        } else{
          return false
        }
      })

      return validMoves
    }

    async function pickUp(plusNum = 1){
      if(isPlayer){
        let newCards = [...cards]
        for (let i = 0 ; i < plusNum; i++){
          await delay(1000);
          newCards.push(randomCard()) // add a new random card
        }
        setCards(newCards)
        props.playerPlayCard("pickUp")
      } else{
        console.log("Not your turn!")
      }
    }

    function botMove(){
      console.log('bot must move')
      let movePool = getValidMoves()

      if(movePool.length <= 0){
        pickUp() // if no valid pick up
      } else{
        const chosenCard = movePool[Math.floor(Math.random()*movePool.length)] // choose randomly from pool of legal moves
        clickCard(chosenCard)
      }
    }

    useEffect(() => {
      if((isPlayer === true) && (isBot === true)){ // if the player is next and a bot
        if(isSkipped){
          playerSkipped()
        } else{
          botMove()
        }
      }
    },[isPlayer])

  return (
    <div className='playerDeckContainer'>
      { isPlayer ? <h2 className='activePlayer'>{props.id}</h2> : <h2>{props.id}</h2>} 
      <button onClick={pickUp}>Pick Up Card</button>
      {cards.map((card) => {
        return <Card card={card} isBot={isBot} isPlayer={isPlayer} clickCard={clickCard} fromdeck={props.id}></Card>
      })}
    </div>
  )
}
