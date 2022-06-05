import './styles/global.css';
import { Routes, Route } from 'react-router-dom';
import ChatPage from './components/ChatPage';
import JoinPage from './components/JoinPage';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<JoinPage />} />
        <Route path="join" element={<JoinPage />} />
        <Route path="chat" element={<ChatPage />} />
      </Routes>
    </>
  );
}

export default App;
