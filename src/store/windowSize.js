/*--- Initial State ---*/
const initialState = {
  smallWindow: false,
  isLoading: false,
  error: false 
}

/*--- Action Types ---*/
const GET_WINDOW_SIZE = 'GET_WINDOW_SIZE'
const GOT_ERROR = 'GOT_ERROR'
const NO_ERROR = 'NO_ERROR'


/*--- Action Creators ---*/
const windowSize = smallWindow => ({
  type: GET_WINDOW_SIZE,
  smallWindow
})


const gotError = () => ({
  type: GOT_ERROR,
  error: true
})

const noError = () => ({
  type: NO_ERROR,
  error: false
})

/*--- Thunks ---*/
export const getWindowSize = () => async dispatch => {
  try {
    dispatch(noError())
    if (window.innerHeight < 1356) dispatch(windowSize(true))
  } catch (err) {
    dispatch(gotError())
    console.log('error retrieving window size', err)
  }
}


/*--- Reducer ---*/
export default function(state = initialState, action){
  switch(action.type){
    case GET_WINDOW_SIZE:
      return {...state, smallWindow: action.smallWindow}
    case GOT_ERROR: 
      return {...state, error: action.error }
    case NO_ERROR:
      return { ...state, error: action.error }
    default:
      return state
  }
}