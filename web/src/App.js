import './App.css';
import io from 'socket.io-client';
import {useEffect, useState} from 'react';

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:8000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  return (
    <div className="App">
      Chat App
    </div>
  );
}

export default App;
