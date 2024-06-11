import { useEffect, useState } from 'react'
import { useApp } from '../context/app-context'
function WebsocketControl() {
  const [ws, setWs] = useState<WebSocket | null>(null)
  const { isWS, dispatch } = useApp()
  // 監聽是否連線成功
  useEffect(() => {
    console.log(ws)
    if (ws) {
      //連線成功在 console 中打印訊息
      dispatch({ type: 'setIsWS', payload: true })
      console.log('success connect!')
      //設定監聽
      initWebSocket()
    } else { 
      dispatch({ type: 'setIsWS', payload: false })
    }
  }, [ws])

  const connectWebsocket = () => { 
    const port = 'ws://localhost:5500'
    if (!ws) setWs(new WebSocket(port))
  }

  const initWebSocket = () => {
    if (ws) { 
      ws.onopen = () => {
        console.log('[open connection]')
      }
      ws.onerror = (ev) => {
        console.log(`[connection error] ${ev}`)
      }
      ws.onclose = () => {
        console.log('[connection close]')
        setWs(null)
      }
    }
  }
  
  return (
    <>
      { isWS? 'open connection':'connection close'}
      <button onClick={connectWebsocket}>Connect</button>
    </>
  )
}

export default WebsocketControl
