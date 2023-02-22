import React, { useEffect, useState } from 'react'
import { Bar, Chart, Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import "../Components/DataGrapher.css"


export default function DataGrapher(props) {
    const [log, setLog] = useState([...props.log])
    const [winners, setWinners] = useState(props.winners)
    const [players, setPlayers] = useState(props.players)
    const [coloursLog, setColoursLog] = useState()
    const [numbersLog, setNumbersLog] = useState()
    const [coloursData, setColoursData] = useState()
    const [numbersData, setNumbersData] = useState()
    const [winningData, setWinningData] = useState()
    const [playerLabels, setPlayerLabels] = useState()
    const [playerWins, setPlayerWins] = useState()

    function formatLogToNumberOfColours(){
        const colouredLog = log.filter(card => card.colour || (card === "red" || card === "blue" || card === "yellow" || card === "green")); // array of coloured cards
        let abstractedLog = [];
        
        colouredLog.forEach(item => {
            let newItem = {}
            if(item.colour){
                newItem = {colour: item.colour} // log only the colour
            } else{
                newItem = {colour: item} // if item is a plus four
            }
            abstractedLog.push(newItem) // add to data pile
        })

        setColoursLog([...abstractedLog])
    }

    function formatLogToNumberOfNumbers(){
        const numberedLog = log.filter(card => (card.num || card.num === 0)); // if card has a num or is 0
        let abstractedLog = [];
        
        numberedLog.forEach(item => {
            let newItem = {} // abstract just number value
            if(item.num){
                newItem = {num: item.num}
            }
            abstractedLog.push(newItem)
        })

        setNumbersLog([...abstractedLog])
    }

    function formatNoColoursData(){
        let red = 0
        let blue = 0
        let yellow = 0
        let green = 0

        coloursLog.forEach(card => { // count frequency of each colour
            if(card.colour === "red"){
                red++
            } else if(card.colour === "blue"){
                blue++
            } else if(card.colour === "yellow"){
                yellow++
            } else if(card.colour === "green"){
                green++
            }
        })
        
        let noColours = [] // create array of data
        noColours.push(red,blue,yellow,green)

        setColoursData([...noColours])
    }

    function formatNoNumbersData(){
        let one = 0
        let two = 0
        let three = 0
        let four = 0
        let five = 0
        let six = 0
        let seven = 0
        let eight = 0
        let nine = 0
        let zero = 0

        numbersLog.forEach(card => {
            if(card.num === 1){ // count freq of numbered cards
                one++
            } else if(card.num === 2){
                two++
            } else if(card.num === 3){
                three++
            } else if(card.num === 4){
                four++
            } else if(card.num === 5){
                five++
            } else if(card.num === 6){
                six++
            } else if(card.num === 7){
                seven++
            } else if(card.num === 8){
                eight++
            } else if(card.num === 9){
                nine++
            } else if(card.num === 0){
                zero++
            }
        })
        
        let noNums = []
        noNums.push(one, two, three, four, five, six, seven, eight, nine, zero) // create array of frequencies

        setNumbersData([...noNums])
    }

    function formatWinnersData(){
        let newWinningData = players.map(player => { // for each player, create an object with their position and number of wins abstract rest of data
            let noWins = winners.filter(win => win === player.player).length
            let playerData = {position: player.player+1, noWins: noWins}
            return playerData
        })

        setWinningData(newWinningData)
    }

    function seperateWinningData(){
        setPlayerLabels(winningData.map(player => String(player.position))) // extract only labels of positions
        setPlayerWins(winningData.map(player => player.noWins)) //  extract only win numbers
    }

    useEffect(() => { // update values if they are changed
        setLog(props.log)
        setWinners(props.winners)
        setPlayers(props.players)
        formatLogToNumberOfColours()
        formatLogToNumberOfNumbers()
        formatWinnersData()
    }, [props])

    useEffect(() => {
        if(coloursLog){ // to stop it running with errors if no data is available
            formatNoColoursData()
        }

        if(numbersLog){
            formatNoNumbersData()
        }

        if(winningData){
            seperateWinningData()
        }
    }, [coloursLog, numbersLog])

  return (
    <div className='dataDiv'>
        <div className='barChartDiv'>
            <Doughnut // graphing library
                data={{
                    labels: ["Red", "Blue", "Yellow", "Green"],
                    datasets: [{
                    label: 'Frequency of Colour',
                    data: coloursData,
                    backgroundColor: [ // colours of items
                        'rgba(178,34,34, 0.2)',
                        'rgba(137, 207, 240, 0.2)',
                        'rgba(255, 191, 0, 0.2)',
                        'rgba(152,251,152, 0.2)',
                    ],
                    borderColor: [
                        'rgb(178,34,34)',
                        'rgb(137, 207, 240)',
                        'rgb(255, 191, 0)',
                        'rgb(152,251,152)',
                    ],
                    borderWidth: 1
                    }] 
                }}
                height={500}
                width={500}
                options={{
                    maintainAspectRatio: false,
                    legend: {
                        labels: {
                            fontSize: 25,
                        },
                    },
                }}
            />
        </div>

        <div className='barChartDiv'>
            <Bar
                data={{
                    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
                    datasets: [{
                    label: 'Frequency of Numbers',
                    data: numbersData,
                    backgroundColor: [
                        'rgba(247, 37, 133, 0.2)',
                        'rgba(181, 23, 158, 0.2)',
                        'rgba(114, 9, 183, 0.2)',
                        'rgba(86, 11, 173, 0.2)',
                        'rgba(72, 12, 168, 0.2)',
                        'rgba(58, 12, 163, 0.2)',
                        'rgba(63, 55, 201, 0.2)',
                        'rgba(67, 97, 238, 0.2)',
                        'rgba(72, 149, 239, 0.2)',
                        'rgba(76, 201, 240, 0.2)',
                    ],
                    borderColor: [
                        'rgb(247, 37, 133)',
                        'rgb(181, 23, 158)',
                        'rgb(114, 9, 183)',
                        'rgb(86, 11, 173)',
                        'rgb(72, 12, 168)',
                        'rgb(58, 12, 163)',
                        'rgb(63, 55, 201)',
                        'rgb(67, 97, 238)',
                        'rgb(72, 149, 239)',
                        'rgb(76, 201, 240)',
                    ],
                    borderWidth: 1
                    }] 
                }}
                height={500}
                width={500}
                options={{
                    maintainAspectRatio: false,
                    legend: {
                        labels: {
                            fontSize: 25,
                        },
                    },
                    scales: {
                        y: {
                          title: {
                            display: true,
                            text: 'Frequency'
                          }
                        },
                        x: {
                            title: {
                              display: true,
                              text: 'Number on Card'
                            }
                          }
                      }   
                }}
            />
        </div>
        
        <div className='barChartDiv'>
            <Bar
                data={{
                    labels: playerLabels,
                    datasets: [{
                    label: 'Frequency of Wins',
                    data: playerWins,
                    backgroundColor: [
                        'rgba(0, 129, 167, 0.2)',
                        'rgba(0, 175, 185, 0.2)',
                        'rgba(132, 165, 157, 0.2)',
                        'rgba(246, 189, 96, 0.2)',
                        'rgba(240, 113, 103, 0.2)',
                        
                    ],
                    borderColor: [
                        'rgb(0, 129, 167)',
                        'rgb(0, 175, 185)',
                        'rgb(132, 165, 157)',
                        'rgb(246, 189, 96)',
                        'rgb(240, 113, 103)',
                    ],
                    borderWidth: 1
                    }] 
                }}
                height={500}
                width={500}
                options={{
                    maintainAspectRatio: false,
                    legend: {
                        labels: {
                            fontSize: 25,
                        },
                    },
                    scales: {
                        y: {
                          title: {
                            display: true,
                            text: 'Number of Wins'
                          }
                        },
                        x: {
                            title: {
                              display: true,
                              text: 'Player Position'
                            }
                          }
                      }     
                }}
            />
        </div>
    </div>
    
    
  )
}
