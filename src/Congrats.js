import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

function Congrats({ time, formatTime }) { 
  const formattedTime = formatTime(time);
  const hours = +formattedTime.slice(0, 2);
  const minutes = +formattedTime.slice(3, 5);
  const seconds = +formattedTime.slice(6);

  return (
    <div id='congrats'>
      <h1>Found 'em all. Congrats.</h1>
      <h2>Took you {hours} hour{hours === 1 ? '' : 's'}, {minutes} minute{minutes === 1 ? '' : 's'} and {seconds} seconds. </h2>
      <h3>
        Click <Link className='return-link' to='/'>here</Link> to go back to Home Page.
      </h3>      
    </div>
  )
}

export default Congrats
