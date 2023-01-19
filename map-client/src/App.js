import React, {useEffect, useCallback, useState} from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import './App.css';

const WS_URL = 'ws://192.168.1.7:7000';


function App() {
  const { sendMessage, lastMessage, readyState, getWebSocket } = useWebSocket(WS_URL);
  const [messageHistory, setMessageHistory] = useState([]);

  const on = useCallback(() => sendMessage('on'), []);
  const off = useCallback(() => sendMessage('off'), []);
  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage, setMessageHistory]);

  

  return (
    <div>Hello WebSockets!
      <button onClick={on}>On</button>
      <button onClick={off}>off</button>
      {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
    </div>
  );
}

export default App;