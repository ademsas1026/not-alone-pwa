import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryPolarAxis, 
  VictoryLabel, 
  Line
} from 'victory'
import { Typography } from '@material-ui/core'


import { mostCommonWords } from '../data/prepData'
import { reverseGeocode } from './componentUtils'

class Chart extends Component {
  constructor(){
    super()
    this.state = {
      location: ''
    }
  }
  async componentDidMount() {
    if (this.props.sightings.length > 0){
      let { city, state } = await reverseGeocode(`${this.props.latitude},${this.props.longitude}`)
      await this.setState({ location: `${city}, ${state}`})
    }
  }

  render(){
    const mostCommonlyUsedWords = mostCommonWords(this.props.sightings).slice(0, 10)
    const data = mostCommonlyUsedWords.map((wordObject, i) => {
      return { x: i, y: wordObject.word }
      })
    if (this.props.sightings.length > 0){
      return (
        <div className="graph">
          {this.state.location !== '' && this.props.clusterType !== 'month' && <Typography variant="display1" style={{color: 'white'}}>{'overheard near ' + this.state.location}</Typography>}
          {this.props.clusterType === 'month' && 
            <div className="chartHeader">
              <Typography variant='display1' style={{color: 'white'}}>There were </Typography>
              <Typography variant="display1" style={{color: 'green'}}>{' ' + this.props.sightings.length + ' '}</Typography>
              <Typography variant="display1" style={{color: 'white'}}>{' UFO sightings reported in ' + this.props.month}</Typography>
              <Typography variant="caption" style={{color: 'white', position: 'relative', top: '1.8vh', left: '0.8vw'}}>*between 1949 - 2013</Typography>
            </div>
          }
          <div className="innerGraph">
          <VictoryChart
            polar
            theme={VictoryTheme.material}
            label={"Top 10 Words"}
            labelPlacement="parallel"
            animate={{duration: 500}}
            className="chart"
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
        </div>
      )
    } else {
      return (
        <Typography variant="display2" style={{color: '#fff', alignSelf: 'center', justifySelf: 'center'}}>No sightings selected. Return to the map view and choose some sightings.</Typography>
      )
    }
    
  }
}

  
const mapState = state => ({
  sightings: state.selectedCluster.selectedCluster
})

export default connect(mapState, null)(Chart)