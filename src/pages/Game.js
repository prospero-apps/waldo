import React from 'react';
import '../style.css';
import level1 from '../images/level1.jpg';
import level2 from '../images/level2.jpg';
import level3 from '../images/level3.jpg';

function Game({ level, setLevel }) {
  let bgImage;
  switch (level) {
    case 1:
      bgImage = level1;
      break;
    case 2:
      bgImage = level2;
      break;
    case 3:
      bgImage = level3;
      break;
    default:
      bgImage = level1;
  }

  const getPosition = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    console.log(x + ' ' + y)
  }

  return (
    <div>
      <img 
        src={bgImage} 
        alt="waldo" 
        id='game-image'
        onMouseMove={getPosition}
      />
    </div>
  )
}

export default Game
