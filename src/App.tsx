import './assets/css/index.css'
import WebsocketControl from './compoment/WebsocketControl.tsx'
import { AppContextProvider } from './context/app-context.tsx'

function App() {

  return (
    <AppContextProvider>
      <WebsocketControl/>
    </AppContextProvider>
  )
}

export default App
