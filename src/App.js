import './style.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; 
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

  const logOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear()
        setIsAuth(false);
        window.location.pathname = '/login';
      })
  }

  return (
    <Router>
      <div className="header">
        <nav className='navbar'>
          <Link to='/'>Home</Link>
          {!isAuth ? (
            <Link to='/login'>Login</Link>
          ) : (
            <p className='logout-link' onClick={logOut}>Log Out</p>
          )}
          <Link to='/game'>Game</Link>
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
        <div id="timer">
          00:00:00
        </div>
      </div>
      <Routes>
        <Route path='/' element={<Home level={level} setLevel={setLevel} />} />
        <Route path='/game' element={<Game level={level} setLevel={setLevel} />} />
        <Route path='/leaderboard' element={<Leaderboard />} />
        <Route path='/login' element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
