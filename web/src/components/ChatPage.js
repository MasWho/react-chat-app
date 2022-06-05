import { useState, useRef, useEffect } from 'react';
import {io} from 'socket.io-client';

import styles from '../styles/ChatPage.module.css';
import Message from './Message';

const ChatPage = () => {
  const [socket, setSocket] = useState(null);
  const [sending, setSending] = useState(false);
  const [allMessages, setAllMessages] = useState([]);
  const messageRef = useRef("");

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:8000`);
    setSocket(newSocket);

    // Setup socket event listener
    newSocket.on("message", (message) => {
      setAllMessages((prevState) => [...prevState, message]);
    });

    return () => newSocket.close();
  }, []);

  const sendMessageHandler = (event) => {
    event.preventDefault();
    setSending(true);
    socket.emit("sendMessage", messageRef.current.value, (error) => {
      setSending(false);
      messageRef.current.value = ""; // Clear message
      messageRef.current.focus(); // Focus input

      if (error) {
        console.log(error);
      } else {
        console.log("Message Sent!");
      }
    });
  };

  // Messages to be rendered
  const messages =  allMessages.map((message, idx) => <Message
    key={`msg-${idx}`}
    body={message.text}
    time={message.createdAt}
  />);

  return (
    <div className={styles.ChatPage}>
      <div className={styles.ChatSidebar}></div>
      <div className={styles.ChatMain}>
        <div className={styles.ChatMessages}>{messages}</div>
        <div className={styles.Compose}>
          <form onSubmit={sendMessageHandler}>
            <input type="text" placeholder="Send Message" ref={messageRef} />
            <button type="submit" disabled={sending}>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;