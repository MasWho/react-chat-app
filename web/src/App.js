import io from 'socket.io-client';
import {useEffect, useRef, useState} from 'react';

const SERVER_URL = `http://${window.location.hostname}:8000`;

function App() {
  const [socket, setSocket] = useState(null);
  const messageRef = useRef('');

  useEffect(() => {
    const newSocket = io(SERVER_URL);
    setSocket(newSocket);

    // Setup socket event listener
    newSocket.on('message', (message) => {
      console.log(message);
    });

    return () => newSocket.close();
  }, []);

  const sendMessageHandler = (event) => {
    event.preventDefault();
    socket.emit('sendMessage', messageRef.current.value);
    messageRef.current.value = '';
  };

  return (
    <div className="App" style={{padding: '20px'}}>
      <form onSubmit={sendMessageHandler}>
        <input type="text" placeholder='Send Message' ref={messageRef} />
        <button type='submit'>Send</button>
      </form>
    </div>
  );
}

export default App;
