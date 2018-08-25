import { createStore, combineReducers, applyMiddleware } from 'redux'
import  { createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import firebase from 'firebase'

import firebaseConfigs from '../secrets/firebase.config'
import kmeansClusters from './kmeansClusters'
import monthClusters from './monthClusters'
import selectedCluster from './selectedCluster'
import accessUserLocation from './userLocation'

firebase.initializeApp(firebaseConfigs)
export const firebaseDatabase = firebase.database()

const reducer = combineReducers({ kmeansClusters, monthClusters, selectedCluster, firebaseDatabase, accessUserLocation })

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))

const store = createStore(reducer, middleware)

//export all desired functions from store
export default store
export { default as kmeansClusters } from './kmeansClusters'
export * from './kmeansClusters'
export { default as monthClusters } from './monthClusters'
export * from './monthClusters'
export * from './selectedCluster'
export * from './userLocation'

