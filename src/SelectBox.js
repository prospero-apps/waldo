import React, { useEffect } from 'react';
import './style.css';

function SelectBox({ clickPos, setSelectedCharacter, checkCharacter, setNothingClicked }) {
  useEffect(() => {    
    const selectBox = document.getElementById('selectbox');    
    selectBox.style.transform = `translate(${clickPos[0] + 20}px, ${clickPos[1] + 50}px)`;
  }, [clickPos])

  const selectCharacter = (e) => {
    const character = e.target.textContent.toLowerCase();
    setSelectedCharacter(character);
    checkCharacter(character);
    setNothingClicked(true);
  }
  
  return (
    <div id='selectbox'>
      <p onClick={selectCharacter}>Waldo</p>
      <p onClick={selectCharacter}>Wenda</p>
      <p onClick={selectCharacter}>Odlaw</p>
    </div>
  )
}

export default SelectBox
