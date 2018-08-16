import React from 'react'
import { Typography } from '@material-ui/core'

const styles = {
  title: {
    zIndex: '1000',
    color: '#fff',
    position: 'absolute',
    left: '5.5vw',
    top: '10vh'
  },
  subheading1: {
    zIndex: '1000',
    color: '#fff',
    position: 'relative',
    top: '20vh'
  },
  subheading2: {
    zIndex: '1000',
    color: '#fff',
    position: 'relative',
    top: '25vh'
  },
  subheading3: {
    zIndex: '1000',
    color: '#fff',
    position: 'relative',
    top: '30vh'
  }
}
const MapHeader = () => (
  <div id="mapHeader">
    <Typography variant="display1" style={styles.title}>Not Alone</Typography>
    <Typography variant="subheading" style={styles.subheading1}>An Interactive Visualization of UFO Sightings</Typography>
    <Typography variant="subheading" style={styles.subheading2}>US, 1949 - 2013</Typography>
    <Typography variant="subheading" style={styles.subheading3}>click map...if you dare</Typography>
  </div>
)

export default MapHeader