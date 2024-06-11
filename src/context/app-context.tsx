import { createContext, useContext } from 'react'
import { useImmerReducer } from 'use-immer'
import { AppActions, AppContextState, AppState } from './app-context.interfase'

const appContextDefaultValue: AppState = {
  isWS: false
}

const AppContext = createContext<AppContextState | undefined>(undefined)

AppContext.displayName = 'app-context'

const reducer = (draft: AppState, action: AppActions) => {
  switch (action.type) {
    case 'setIsWS':
      draft.isWS = action.payload
      break
  }
}

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useImmerReducer(reducer, appContextDefaultValue)

  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useApp = () => {
  const context = useContext(AppContext)
  if (context === undefined) throw new Error('useApp must be used within a AppContextProvider')
  return context
}

// eslint-disable-next-line react-refresh/only-export-components
export { AppContextProvider, useApp }

