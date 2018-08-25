import React from 'react'
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryPolarAxis, 
  VictoryLabel, 
  Line
} from 'victory'

import { mostCommonWords } from '../data/prepData'

const Chart = props => {
  const mostCommonlyUsedWords = mostCommonWords(props.sightings).slice(0, 10)
  const data = mostCommonlyUsedWords.map((wordObject, i) => {
    return { x: i, y: wordObject.word }
    })

  return (
    <div className="graph">
      <VictoryChart
        polar
        theme={VictoryTheme.material}
        label={"Top 10 Words"}
        labelPlacement="parallel"
        animate={{duration: 500}}
      >
      { mostCommonlyUsedWords.length &&
        mostCommonlyUsedWords.map((wordObject, i) => (
          <VictoryPolarAxis 
            dependentAxis
            key={i}
            label={wordObject.word}
            labelPlacement="perpendicular"
            axisValue={i}
            style={{
              axis: { stroke: "black" },
              grid: { stroke:  "grey" },
              tickLabels: { fontSize: 10, padding: 15, fill: "white" },
              axisLabel: {fontSize: 20, padding: 15, fill: "white" }
            }}
          />
        ))
      }
        <VictoryBar
          style={{ data: { fill: "#1F3553", width: 25 } }}
          data={data}
          animate={{
          onExit: {
            duration: 500,
            before: () => ({
              _y: 0,
              fill: "green",
              label: "BYE"
            })
          }
        }}
        />
      </VictoryChart>
    </div>
  )
}
  
export default Chart