import React, { useState } from 'react'

export default function Card(props) {
  const [card, setCard] = useState(props.card)

  function cardHandleClick(){
    props.clickCard(card)
  }

  return (
    <>
        {<p key={props.card.number} card={props.card} colour={props.card.colour} onClick={cardHandleClick} fromdeck={props.fromDeck}>
            {props.card.colour} {props.card.type} {props.card.num} {props.card.plusNum}
        </p>}
    </>
  )
}
