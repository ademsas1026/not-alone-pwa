import { monthClusters, kmeansClusters } from './index'
import { selectMonthCluster, chooseMonthCluster, chooseKmeansCluster } from '../data/utils'

/*--- Initial State ---*/
const initialState = {
  isLoading: false,
  error: false,
  selectedCluster: []
}

/*--- Action Types ---*/
const GET_CLUSTER = 'GET_CLUSTER'
const GOT_ERROR = 'GOT_ERROR'
const NO_ERROR = 'NO_ERROR'
const IS_LOADING = 'IS_LOADING'
const NOT_LOADING = 'NOT_LOADING'

/*--- Action Creators ---*/
const getCluster = selectedCluster => ({
  type: GET_CLUSTER,
  selectedCluster
})

const isLoading = () => ({
  type: IS_LOADING
})

const notLoading = () => ({
  type: NOT_LOADING
})

const gotError = () => ({
  type: GOT_ERROR
})

const noError = () => ({
  type: NO_ERROR
})
/*--- Thunks ---*/
export const selectCluster = (clusterType, month = null, latitude = null, longitude = null) => async dispatch => {
  try {
    dispatch(noError())
    dispatch(isLoading())
    const cluster = clusterType === 'month' 
      ? chooseMonthCluster(monthClusters, month)
      : chooseKmeansCluster(kmeansClusters, latitude, longitude)
    dispatch(notLoading())
    dispatch(getCluster(cluster))
  } catch (err) {
    dispatch(gotError())
    console.error(err)
  }
}

/*--- Reducer ---*/
export default function (state = initialState, action) {
  switch(action.type) {
    case GET_CLUSTER:
        return {...state, selectedCluster: action.selectedCluster }
      case IS_LOADING: 
        return {...state, isLoading: true}
      case NOT_LOADING:
        return {...state, isLoading: false}
      case GOT_ERROR:
        return {...state, error: true}
      case NO_ERROR:
        return {...state, error: false}
    default:
      return state
  }
}