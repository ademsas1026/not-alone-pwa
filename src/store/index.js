import { createStore, combineReducers, applyMiddleware } from 'redux'
import  { createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import firebase from 'firebase'

import firebaseConfigs from './secrets/firebase.config'
import kmeansClusters from './kmeansClusters'
import monthClusters from './monthClusters'

firebase.initializeApp(firebaseConfigs)
export const firebaseDatabase = firebase.database()

const reducer = combineReducers({ kmeansClusters, monthClusters, selectedCluster, firebaseDatabase })

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))

const store = createStore(reducer, middleware)

//export all desired functions from store
export default store
export * from './kmeansClusters'
export * from './monthClusters'

