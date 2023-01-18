import React, { useEffect, useState } from 'react'
import unoDeck from "./deck.json";

export default function Board() {
    const [deck, setDeck] = useState(unoDeck)  

    useEffect(() =>{
      console.log(unoDeck)
    })

  return (
    <div>Board</div>
  )
}
