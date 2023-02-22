import React, { useEffect, useState } from 'react'

export default function Card(props) {
  const [card, setCard] = useState(props.card)

  function cardHandleClick(){
    props.clickCard(card)
  }

  useEffect(()=>{
    setCard(props.card)
  })

  return (
    <>
        { !props.isBot || (props.mode === "sim") ? <img src={card.image} width={70} onClick={cardHandleClick}></img> : <img src={"Images/backside.png"} width={70}></img> }
    </>
  )
}
