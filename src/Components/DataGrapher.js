import React, { useEffect, useState } from 'react'
import { Bar, Chart } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import "../Components/DataGrapher.css"


export default function DataGrapher(props) {
    const [log, setLog] = useState([...props.log])
    const [coloursLog, setColoursLog] = useState()
    const [numbersLog, setNumbersLog] = useState()
    const [coloursData, setColoursData] = useState()
    const [numbersData, setNumbersData] = useState()

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

    function formatLogToNumberOfNumbers(){
        const numberedLog = log.filter(card => card.num);
        let abstractedLog = [];
        
        numberedLog.forEach(item => {
            let newItem = {}
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
            if(card.num === 1){
                one = one+1
            } else if(card.num === 2){
                two = two+1
            } else if(card.num === 3){
                three = three+1
            } else if(card.num === 4){
                four = four+1
            } else if(card.num === 5){
                five = five+1
            } else if(card.num === 6){
                six = six+1
            } else if(card.num === 7){
                seven = seven+1
            } else if(card.num === 8){
                eight = eight+1
            } else if(card.num === 9){
                nine = nine+1
            } else if(card.num === 0){
                zero = zero+1
            }
        })
        
        let noNums = []
        noNums.push(one, two, three, four, five, six, seven, eight, nine, zero)

        setColoursData([...noNums])
    }

    useEffect(() => {
        setLog(props.log)
        formatLogToNumberOfColours()
        formatLogToNumberOfNumbers()
    }, [props])

    useEffect(() => {
        if(coloursLog){
            formatNoColoursData()
        }

        if(numbersLog){
            formatNoNumbersData()
        }
    }, [coloursLog, numbersLog])

  return (
    <div className='dataDiv'>
        <div className='barChartDiv'>
            <Bar
                data={{
                    labels: ["Red", "Blue", "Yellow", "Green"],
                    datasets: [{
                    label: 'Frequency of Colour',
                    data: coloursData,
                    backgroundColor: [
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
                    data: coloursData,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
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
    </div>
    
    
  )
}
