import { selectMonthCluster, chooseMonthCluster, chooseKmeansCluster } from '../data/utils'

/*--- Initial State ---*/
const initialState = {
  isLoading: false,
  error: false,
  clusterType: 'kmeans',
  selectedCluster: []
}

/*--- Action Types ---*/
const CLUSTER_TYPE = 'CLUSTER_TYPE'
const GET_CLUSTER = 'GET_CLUSTER'
const GOT_ERROR = 'GOT_ERROR'
const NO_ERROR = 'NO_ERROR'
const IS_LOADING = 'IS_LOADING'
const NOT_LOADING = 'NOT_LOADING'

/*--- Action Creators ---*/
export const changeClusterType = clusterType => ({
  type: CLUSTER_TYPE,
  clusterType
})

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
export const chooseCluster = (clusters, clusterType, month, longitude, latitude) => async dispatch => {
  try {
    dispatch(noError())
    dispatch(isLoading())
    console.log('clusters', clusters, 'clusterType', clusterType, 'month', month)
    const cluster = clusterType === 'month' 
      ? chooseMonthCluster(clusters, month)
      : chooseKmeansCluster(clusters, longitude, latitude)
    console.log('cluster', cluster)
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
    case CLUSTER_TYPE:
      return { ...state, clusterType: action.clusterType }
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