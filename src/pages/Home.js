import React, { useEffect } from 'react';
import '../style.css';
import level1 from '../images/level1.jpg';
import level2 from '../images/level2.jpg';
import level3 from '../images/level3.jpg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Home({ setLevel, isAuth, setTime }) {
  let navigate = useNavigate();

  useEffect(() => {
    setTime(0);
  }, [])

  const selectLevel = (level) => {
    setLevel(level);
    navigate('/game');
  }

  return (    
    <div id='home-page'>
      <p>Select Level</p>
      <div className='level-images'>
        <img
            src={level1}
            alt="level1"
            onClick={() => selectLevel(1)}
          />
        <img
          src={level2}
          alt="level2"
          onClick={() => selectLevel(2)}
        />
        <img
          src={level3}
          alt="level3"
          onClick={() => selectLevel(3)}
        />
      </div>
      {isAuth &&
        <Link className='level-link' to='/leaderboard'>View Leaderboard</Link>
      }
    </div>
  )
}

export default Home;
