export const chooseKmeansCluster = (clusters, longitude, latitude) => {
  const allLongitudesAndLatitudes = []
  let sightings = [], minLat, maxLat, minLng, maxLng
  clusters.forEach((cluster, clusterId) => {
    allLongitudesAndLatitudes[allLongitudesAndLatitudes.length] = {
      clusterId,
      longitudes: cluster.map(sighting => sighting.longitude),
      latitudes: cluster.map(sighting => sighting.latitude)
    }
  })
  allLongitudesAndLatitudes.forEach(cluster => {
    minLat = cluster.latitudes.length > 2 ? Math.min(...cluster.latitudes) : Math.min(cluster.latitudes)
    maxLat = cluster.latitudes.length > 2 ? Math.max(...cluster.latitudes) : Math.max(cluster.latitudes)
    minLng = cluster.longitudes.length > 2 ? Math.min(...cluster.longitudes) : Math.min(cluster.longitudes)
    maxLng = cluster.latitudes.length > 2 ? Math.max(...cluster.longitudes) : Math.max(cluster.longitudes)
    if(minLat <= latitude && minLng <= longitude){
      if(latitude < maxLat && longitude < maxLng){
        sightings = clusters[cluster.clusterId];
      }
    }
  })

  if (sightings.length) return sightings
  else return new Error('no cluster found')
}

export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export const chooseMonthCluster = (monthClusters, month) => {
  const indexOfCluster = months.indexOf(month)
  return monthClusters[indexOfCluster]
}