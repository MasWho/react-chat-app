import './App.css';
import io from 'socket.io-client';
import {useEffect, useState, useRef} from 'react';

function App() {
  const [socket, setSocket] = useState(null);
  const [ownMessages, setOwnMessages] = useState([]);
  const [otherMessages, setOtherMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:8000`);
    setSocket(newSocket);
    newSocket.on('message-for-all', (message) => {
      console.log('hello')
      setOtherMessages((prevState) => {
        return [...prevState, message];
      })
    });
    return () => newSocket.close();
  }, []);

  const submitHandler = () => {
    setOwnMessages((prevState) => {
      const newState = [...prevState, message];
      socket.emit('message', message);
      return newState;
    });

    setMessage('');
  }

  const messageChangeHandler = (event) => {
    setMessage(event.target.value);
  }

  console.log(ownMessages)
  console.log(otherMessages)
  return (
    <>
      <div style={{width: '100%', textAlign: 'center'}}>
        Chat App
        <input value={message} onChange={messageChangeHandler} type="text" />
        <button onClick={submitHandler}>Submmit</button>
      </div>
      <div className="App" style={{width: '100%'}}>
        {
          ownMessages.map((message, idx) => <p key={`own-${idx}`} style={{width: '100%', textAlign: 'right'}}>{message}</p>)
        }
        {
          otherMessages.map((message, idx) => <p key={`other-${idx}`} style={{width: '100%', textAlign: 'left'}}>{message}</p>)
        }
      </div>
    </>
  );
}

export default App;
