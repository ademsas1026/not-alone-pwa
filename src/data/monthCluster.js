const fs = require('fs')
const sightings = require('./cleanSightings')

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// "datePosted" : "4/27/2004"
const datePostedToMonth = datePosted => {
  return months[Number(datePosted.split('/')[0]) - 1]
}
const monthCluster = (month, sightings) =>
  sightings.filter(sighting => datePostedToMonth(sighting.datePosted) === month)

const monthClusters = []

months.forEach(month => monthClusters[monthClusters.length] = monthCluster(month, sightings))
  
// console.log('month clusters poop: ', monthClusters)

fs.writeFile(
  'src/data/seedMonthClusters.json',
  JSON.stringify(monthClusters),
  err => {
    if (err) throw err
      console.log('file saved!')
  }
)
