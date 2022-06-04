import styles from './styles/App.module.css';
import io from 'socket.io-client';
import {useEffect, useRef, useState} from 'react';

function App() {
  const [socket, setSocket] = useState(null);
  const messageRef = useRef('');

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:8000`);
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
    <div className="App">
      <form className={styles.messageForm} onSubmit={sendMessageHandler}>
        <div className={styles.messageInput}>
          <label htmlFor='message-input'>Message</label>
          <input id="message-input" type="text" placeholder='Send Message' ref={messageRef} />
        </div>
        <button className={styles.submitButton} type='submit'>Send</button>
      </form>
    </div>
  );
}

export default App;
