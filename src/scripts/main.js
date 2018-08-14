// import cluster from 'k-means'
const cluster = require('k-means')
const sightings = require('./seed')
const fs = require('fs')

const kmeans = (...args) => 
  new Promise(resolve => cluster(...args, resolve))


const pos = sightings => 
  sightings.map(
    ({ latitude: lat, longitude: lng }, i) => [Number(lat), Number(lng)]
  )


const NUM_CLUSTERS = 20

// pass sightings to generateClusters
const generateClusters = async sightings => {
  const posResults = pos(sightings)

  const { finalMatrix, clusterCenters } = 
    await kmeans(posResults, {
      clusters: NUM_CLUSTERS,
      iterations: 100
    })

  const clusters = new Array(NUM_CLUSTERS)
    .fill('x')
    .map(x => [])

  if (finalMatrix) {
    sightings.forEach((sighting, i) => {
      const id = finalMatrix[i][0]
      sighting.clusterId = id
      clusters[id].push(sighting)
    })
  }

  return clusters
}


generateClusters(sightings)
  .then(clusters => 
    fs.writeFile(
      'src/scripts/seedClusters.json',
      JSON.stringify(clusters),
      err => {
        if (err) throw err
          console.log('file saved!')
      }
    )
  )



