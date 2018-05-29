export const FETCH_PRODUCTS_REQUEST = 'products/FETCH_PRODUCTS_REQUEST'
export const FETCH_PRODUCTS_SUCCESS = 'products/FETCH_PRODUCTS_SUCCESS'
export const FETCH_PRODUCTS_FAILURE = 'products/FETCH_PRODUCTS_FAILURE'

const doFetch = number => new Promise(resolve => {
  const result = { number, price: 10 }
  setTimeout(() => resolve(result), 1500)
})

export const fetchProduct = number => dispatch => {
  dispatch({ type: FETCH_PRODUCTS_REQUEST, meta: {number} })
  return doFetch(number)
    .then(payload => dispatch({ type: FETCH_PRODUCTS_SUCCESS, meta: {number}, payload}) && payload)
}

const initialState = {
  isFetching: false,
  byId: {}
}

export default function reducer (state=initialState, action){
  switch(action.type){
    case FETCH_PRODUCTS_REQUEST: return {...state, isFetching: true}
    case FETCH_PRODUCTS_SUCCESS: return {
      ...state, 
      isFetching: false, 
      byId: { ...state.byId, [action.meta.number]: action.payload} 
    }
    default: return state
  }
}

export const getProducts = state => Object.keys(state.byId).map(key => state.byId[key])
export const shouldFetch = (state, number) => !state.byId[number] 