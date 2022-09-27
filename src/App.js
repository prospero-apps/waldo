import './style.css';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom'; 
import Home from './pages/Home';
import Game from './pages/Game';
import Leaderboard from './pages/Leaderboard';
import Login from './pages/Login';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';
import waldo from './images/waldo.png';
import wenda from './images/wenda.jpeg';
import odlaw from './images/odlaw.jpeg';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [level, setLevel] = useState(1);

  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  const [leaders, setLeaders] = useState([]);
  const [characters, setCharacters] = useState([]);

  const logOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear()
        setIsAuth(false);
        window.location.pathname = '/login';
      })
  }

  const formatTime = (time) => {
    const hours = ('0' + Math.floor(time / 3600)).slice(-2);
    const minutes = ('0' + Math.floor(time / 60) % 60).slice(-2);
    const seconds = ('0' + (time % 60)).slice(-2)

    return `${hours}:${minutes}:${seconds}`;
  }

  return (
    <Router>
      <div className="header">
        <nav className='navbar'>
          {!running &&
            <Link to='/'>Home</Link>
          }
          {!isAuth ? (
            <Link to='/login'>Login</Link>
          ) : (
            <p className='logout-link' onClick={logOut}>Log Out</p>
          )}
        </nav>
        <div className="images">
            <div className='character'>
              <img src={waldo} alt="waldo" />
              <p>Waldo</p>
            </div>
            <div className='character'>
              <img src={wenda} alt="wenda" />
              <p>Wenda</p>
            </div>
            <div className='character'>
              <img src={odlaw} alt="odlaw" />
              <p>Odlaw</p>
            </div>
        </div>
        <div id="timer">{formatTime(time)}</div>
      </div>
      <Routes>
        <Route path='/' element={<Home level={level} setLevel={setLevel} isAuth={isAuth} setTime={setTime} />} />
        <Route path='/game' element={<Game level={level} isAuth={isAuth} time={time} setTime={setTime} running={running} setRunning={setRunning} characters={characters} setCharacters={setCharacters} formatTime={formatTime} />} />
        <Route path='/leaderboard' element={<Leaderboard leaders={leaders} setLeaders={setLeaders} formatTime={formatTime} />} />
        <Route path='/login' element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
