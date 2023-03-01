import React, { useEffect, useId, useState } from 'react'
import "./PlayerDeck.css";
import Card from './Card';
import {default as UUID} from "node-uuid";

export default function PlayerDeck(props) {
    const [cards, setCards] = useState(initiateCards());
    const [isBot, setBot] = useState(props.isBot)
    const [currentPlayer, setCurrentPlayer] = useState(props.currentPlayer)
    const [isPlayer, setIsPlayer] = useState(props.current)
    const [isSkipped, setIsSkipped] = useState(props.skipped)
    const [choosingColour, setChoosingColour] = useState(false)
    const [Uno, setUno] = useState(false)
    const [confirmUno, setConfirmUno] = useState(false)

    let failJobId = undefined;

    useEffect(() => {
      setBot(props.isBot)
      setCurrentPlayer(props.currentPlayer);
      setIsPlayer(props.current)
      setIsSkipped(props.skipped)
    }, [props])

    useEffect(() => {
      if(isSkipped){
        playerSkipped()
      }
    }, [isSkipped])

    useEffect(() => {
      checkUno() // everytime game state updated, check for uno and wins
      checkWin()
    }, [cards])

    useEffect(() => {
      if(Uno === true){
        unoTimer()
      }
    }, [Uno])

    const delay = ms => new Promise(
      resolve => setTimeout(resolve, ms)
    );

    function checkWin(){
      if(cards.length === 0){ // check if player has no card left
        props.confirmWin(props.id) // pass winner to board
      }
    }

    async function unoTimer(){
      if(Uno === true && !isBot){
        failJobId = setTimeout(() => { // set auto lose, so then if player clicks uno, it cancelles the loss
          setUno(false);
          console.log('Lost!');
        }, 1000);
        console.log(failJobId);
      } else if(Uno === true && !isBot){
        let result = botConfirmUno()
        if(result === false){
          pickUp(2)
        }
      }
    }

    const checkUno = () => {
      if(cards.length === 1){
        setUno(true)  // sets uno state
        if(isBot){
          botConfirmUno() // trigger bot algo
        }
      } else{
        setUno(false)
      }
    }

    function confirmUnoClick(){
      if (Uno && failJobId) {
        console.log(failJobId);
        setConfirmUno(true); // stop fail timer and allow them to move on without picking up 2
        clearTimeout(failJobId);
      }
    }

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
      newCard.id = UUID.v4();

      return newCard
    }

    function initiateCards() {
        let newCards = []

        for (let i = 0; i < props.startCards; i++) { // cycles as many times as startcards is set
            newCards.push(randomCard())
          }
        return newCards
    }

    function clickCard(card) {
      if(props.placableCard){
        console.log(card)
        if (validateMove(card)){ // if the move is valid
          if(card.changeColour === true){ // if card is +4 or wild
            if(card.plusNum === 4){
              removeFromDeck(card) // remove it from the deck
              colourChoose("skip") // enable skip and initiate choose colour ui
            } else{
              removeFromDeck(card) // remove it from the deck
              colourChoose() // inititate colour choose ui
            }
          }else{
            props.playerPlayCard(card) // pass up to board to change current card
            removeFromDeck(card) // remove it from the deck
          }
        } else{
          console.log("Not valid card")
        }
      } else{
        console.log("card already played")
      }
    }

    function removeFromDeck(toRemove){
      let newCards = [...cards] // creates copy to not mess with react props
      let removeIndex = newCards.findIndex(card => card.id === toRemove.id) // find index to remove

      newCards.splice(removeIndex, 1) // splices just the card to remove
      setCards(newCards) // update player deck UI
    }

    function validateMove(card){
      const currentCard = props.currentCard
      let validCard = false
      let validOwner = false // default values

      let currentPlayerIndex = props.currentPlayer

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

    async function pickUp(plusNum){
      if(isPlayer || (Uno && confirmUno === false)){
        let newCards = [...cards] // copy to not interfere with react states
        for (let i = 0 ; i < plusNum; i++){
          newCards.push(randomCard()) // add a new random card
        }
        setCards(newCards)
        props.playerPlayCard("pickUp") // communicate to board that player picked up card
      } else{
        console.log("Not your turn!")
      }
    }

    function botMove(){
      console.log('bot must move')
      let movePool = getValidMoves()

      if(movePool.length <= 0){
        pickUp(1) // if no valid pick up
      } else{
        const chosenCard = movePool[Math.floor(Math.random()*movePool.length)] // choose randomly from pool of legal moves
        clickCard(chosenCard)
      }
    }

    function colourChoose(skip = "noskip"){
      setChoosingColour(skip)
      if(isBot){
        colourChosen(botChooseColour())
      }
    }

    function botChooseColour(){
      const botCards = [...cards]
      const noYellow = botCards.filter(card => card.colour === "yellow").length // find amount of each colour in deck
      const noRed = botCards.filter(card => card.colour === "red").length
      const noBlue = botCards.filter(card => card.colour === "blue").length
      const noGreen = botCards.filter(card => card.colour === "green").length

      const largest = Math.max(noBlue, noGreen, noYellow, noRed)

      if(noYellow === largest){ // choose most frequent card in deck
        return "yellow"
      } else if(noBlue === largest){
        return "blue"
      } else if(noGreen === largest){
        return "green"
      } else if(noRed === largest){
        return "red"
      }
    }
    
    function botConfirmUno(){
      const randomNum = Math.random(1,10)
      if(randomNum <= 9){
        return true
      } else{
        return false
      }
    }

    function colourChosen(colour){
      props.playerPlayCard(colour, choosingColour)
      setChoosingColour(false)
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
      { Uno && <h2>UNO!</h2>} 
      { isPlayer ? <h2 className='activePlayer'>{props.name}</h2> : <h2>{props.name}</h2>}
      <div className='player-deck'>
        { !isBot && <img src="Images/backside.png" width={70} onClick={()=> pickUp(1)}></img>}
        {cards.map((card) => {
          return <Card mode={props.mode} card={card} isBot={isBot} isPlayer={isPlayer} clickCard={clickCard} isSkipped={isSkipped} fromdeck={props.id}></Card>
        })}
      </div>

      { choosingColour && <div> <button onClick={() => colourChosen("red")}>RED</button> <button onClick={() => colourChosen("blue")}>BLUE</button> <button onClick={() => colourChosen("yellow")}>YELLOW</button> <button onClick={() => colourChosen("green")}>GREEN</button></div>}
      { !confirmUno && !isBot && Uno && <button onClick={() => confirmUnoClick()}>UNO!</button>}
    </div>
  )
}
