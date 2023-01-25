import React, { useState } from 'react'

export default function Card(props) {
    const[card, setCard] = useState(props.card)

    function clickCardComp(){
        props.clickCard(props.card)
    }

  return (
    <>
        {props.isBot ? <p>...</p> : <p key={props.card.number} card={props.card} colour={props.card.colour} onClick={clickCardComp}>
            {props.card.colour} {props.card.type} {props.card.num} {props.card.plusNum}
        </p>}
    </>
  )
}
