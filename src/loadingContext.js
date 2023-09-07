import { createContext, useReducer, useContext} from 'react'

const LoadingContext = createContext()

const loadingReducer = (state, action) => {
  switch (action.type) {
    case 'start': {
      return {loading: true}
    }
    case 'stop': {
      return {loading: false}
    }
    default: {
      throw new Error(`Action unknown at context: ${action.type}`)
    }
  }
}

const LoadingProvider = ({children}) => {
  const [state, dispatch] = useReducer(loadingReducer, { loading: false })
  const value = {state, dispatch}
  return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
}

const useLoading = () => useContext(LoadingContext)

export {LoadingProvider, useLoading}