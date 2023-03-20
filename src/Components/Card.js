import React, { useEffect, useState } from 'react'

export default function Card(props) {
  const [card, setCard] = useState(props.card)
  const [showMultiPlayerCard, setShowMultiPlayerCard] = useState(false)

  function cardHandleClick(){
    props.clickCard(card)
  }

  useEffect(()=>{
    console.log("fromhere")
    setCard(props.card)
    if(!props.isBot && props.isPlayer && props.mode === "multiplayer"){
      setShowMultiPlayerCard(true)
    } else if(!props.isPlayer && props.mode === "multiplayer"){
      setShowMultiPlayerCard(false)
    }
  }, [props])

  return (
    <>
        { props.mode !== "multiplayer" && (!props.isBot || (props.mode === "sim") ? <img src={card.image} width={70} onClick={cardHandleClick}></img> : <img src={"Images/backside.png"} width={70}></img>) }
        { props.mode === "multiplayer" && (showMultiPlayerCard ? <img src={card.image} width={70} onClick={cardHandleClick}></img> : <img src={"Images/backside.png"} width={70}></img>) }
    </>
  )
}
