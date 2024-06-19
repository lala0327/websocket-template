import { useCallback, useEffect, useState } from 'react'
import { useApp } from '../context/app-context'

function WebsocketControl() {
  const [ws, setWs] = useState<WebSocket | null>(null)
  const { isWS, dispatch } = useApp()

  const connectWebsocket = () => { 
    const port = 'ws://localhost:5500'
    !ws && setWs(new WebSocket(port))
  }
  const closeConnectWebsocket = () => { 
    ws?.close()
  }
  const initWebSocket = useCallback(() => {
    if (ws) {
      // 開啟 
      ws.onopen = () => {
        console.log('[成功連線]')
      }
      // 錯誤
      ws.onerror = (err) => {
        console.log(`[連線錯誤] 內容：${err}`)
      }
      // 斷線
      ws.onclose = () => {
        console.log('[關閉連線]')
        setWs(null)
      }
    }
  }, [ws]);

  const sendMessage = () => {
    if (ws) {
      // 四代ws傳送訊息規定
      //   const tmpData = {
      //     api: api,
      //     srcApiPath: (api == apiList().api51 || api == apiList().api61) ? "/xps/shell" : config().apiPath,
      //     targetApiPath: (api == apiList().api51 || api == apiList().api61) ? config().apiPath : config().targetApiPath,
      //     reqSn: config().getSn(),
      //     unixTime: config().getUnixTime(),
      //     sendTime: config().getTimeFormat(),
      //     data: data
      // };

      const msg = (document.getElementById('message') as HTMLInputElement).value
      console.log('[Client 傳訊息給 Server]: ', msg)
      // 發送訊息給 Server 端
      ws.send(JSON.stringify(msg))

      // 監聽 Server 端傳送的訊息
      ws.onmessage = (event) => {console.log('[Server 傳訊息給 Client]: ', JSON.parse(event.data))}
    }
  }

  // 監聽是否連線成功
  useEffect(() => {
    console.log(ws)
    if (ws) {
      //連線成功在 console 中打印訊息
      dispatch({ type: 'setIsWS', payload: true })
      //設定監聽
      initWebSocket()
    } else { 
      dispatch({ type: 'setIsWS', payload: false })
    }
  }, [ws, dispatch, initWebSocket])

  return (
    <>
      狀態：{ isWS? '己連線':'尚未連線'}
      <button onClick={connectWebsocket}>連線</button>
      <button onClick={closeConnectWebsocket}>中斷連線</button>
      <br/>
      <input type="text" id='message'/>
      <button onClick={sendMessage}>傳送訊息</button>
    </>
  )
}

export default WebsocketControl