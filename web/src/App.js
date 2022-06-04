import styles from './styles/App.module.css';
import io from 'socket.io-client';
import {useEffect, useRef, useState} from 'react';

function App() {
  const [socket, setSocket] = useState(null);
  const [sending, setSending] = useState(false);
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
    setSending(true);
    socket.emit('sendMessage', messageRef.current.value, (error) => {
      setSending(false);
      messageRef.current.value = '';  // Clear message
      messageRef.current.focus();  // Focus input
      
      if(error) {
        console.log(error);
      } else {
        console.log('Message Sent!');
      }
    });
  };

  return (
    <div className="App">
      <form className={styles.messageForm} onSubmit={sendMessageHandler}>
        <div className={styles.messageInput}>
          <label htmlFor='message-input'>Message</label>
          <input id="message-input" type="text" placeholder='Send Message' ref={messageRef} />
        </div>
        <button className={styles.submitButton} type='submit' disabled={sending}>Send</button>
      </form>
    </div>
  );
}

export default App;
