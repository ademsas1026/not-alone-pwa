import { createStore, combineReducers, applyMiddleware } from 'redux'
import  { createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import sightings from './sightings'


const reducer = combineReducers({ sightings })

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))

const store = createStore(reducer, middleware)

//export all desired functions from store
export default store
export * from './sightings'

