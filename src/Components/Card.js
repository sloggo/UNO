import React from 'react'

export default function Card(props) {
  return (
    <>
        {props.isBot ? <p>...</p> : <p key={props.card.number} card={props.card} colour={props.card.colour} onClick={ (e) => props.clickCard(e.target.card)}>
            {props.card.colour} {props.card.type} {props.card.num} {props.card.plusNum}
        </p>}
    </>
  )
}
