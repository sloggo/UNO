import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'


export default function DataGrapher(props) {
    const [log, setLog] = useState([...props.log])
    const [coloursLog, setColoursLog] = useState()
    const [coloursData, setColoursData] = useState()

    function formatLogToNumberOfColours(){
        const colouredLog = log.filter(card => card.colour || (card === "red" || card === "blue" || card === "yellow" || card === "green"));
        let abstractedLog = [];
        
        colouredLog.forEach(item => {
            let newItem = {}
            if(item.colour){
                newItem = {colour: item.colour}
            } else{
                newItem = {colour: item}
            }
            abstractedLog.push(newItem)
        })

        setColoursLog([...abstractedLog])
    }

    function formatNoColoursData(){
        let red = 0
        let blue = 0
        let yellow = 0
        let green = 0

        coloursLog.forEach(card => {
            if(card.colour === "red"){
                red = red+1
            } else if(card.colour === "blue"){
                blue = blue+1
            } else if(card.colour === "yellow"){
                yellow = yellow+1
            } else if(card.colour === "green"){
                green = green+1
            }
        })
        
        let noColours = []
        noColours.push(red)
        noColours.push(blue)
        noColours.push(yellow)
        noColours.push(green)

        setColoursData([...noColours])
    }

    useEffect(() => {
        setLog(props.log)
        formatLogToNumberOfColours()
    }, [props])

    useEffect(() => {
        if(coloursLog){
            formatNoColoursData()
        }
    }, [coloursLog])

  return (
    <></>
  )
}
