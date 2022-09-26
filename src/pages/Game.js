import React, { useState, useEffect } from 'react';
import '../style.css';
import level1 from '../images/level1.jpg';
import level2 from '../images/level2.jpg';
import level3 from '../images/level3.jpg';
import { addDoc, getDocs, collection, query, where, doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import SelectBox from '../SelectBox';
import Congrats from '../Congrats';

function Game({ level, isAuth, time, setTime, running, setRunning, characters, setCharacters, formatTime}) {
  const [started, setStarted] = useState(true);
  const [waldoFound, setWaldoFound] = useState(false);
  const [wendaFound, setWendaFound] = useState(false);
  const [odlawFound, setOdlawFound] = useState(false);
  const [allFound, setAllFound] = useState(false);
  const [clickPos, setClickPos] = useState([0, 0]);
  const [selectedCharacter, setSelectedCharacter] = useState('');
  const [nothingClicked, setNothingClicked] = useState(true);
  const charactersCollectionRef = collection(db, 'characters');

  let navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  }, [isAuth, navigate]);  

  useEffect(() => {    
    let timer = null;
    started && setRunning(true);

    if(running) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [running, started, setRunning, setTime])

  useEffect(() => {
    const getCharacters = async () => {
      const data = await getDocs(charactersCollectionRef);
      const characterData = data.docs.map((doc) => ({
        name: doc._document.data.value.mapValue.fields.name.stringValue,
        coords: {
          level1: {
            x1: doc._document.data.value.mapValue.fields.level1.mapValue.fields.x1.integerValue,
            x2: doc._document.data.value.mapValue.fields.level1.mapValue.fields.x2.integerValue,
            y1: doc._document.data.value.mapValue.fields.level1.mapValue.fields.y1.integerValue,
            y2: doc._document.data.value.mapValue.fields.level1.mapValue.fields.y2.integerValue,
          },
          level2: {
            x1: doc._document.data.value.mapValue.fields.level2.mapValue.fields.x1.integerValue,
            x2: doc._document.data.value.mapValue.fields.level2.mapValue.fields.x2.integerValue,
            y1: doc._document.data.value.mapValue.fields.level2.mapValue.fields.y1.integerValue,
            y2: doc._document.data.value.mapValue.fields.level2.mapValue.fields.y2.integerValue,
          },
          level3: {
            x1: doc._document.data.value.mapValue.fields.level3.mapValue.fields.x1.integerValue,
            x2: doc._document.data.value.mapValue.fields.level3.mapValue.fields.x2.integerValue,
            y1: doc._document.data.value.mapValue.fields.level3.mapValue.fields.y1.integerValue,
            y2: doc._document.data.value.mapValue.fields.level3.mapValue.fields.y2.integerValue,
          }
        },
        id: doc.id,
      }));

      setCharacters(characterData);
    };
    getCharacters();
  }, [])

  useEffect(() => {
    if (waldoFound && wendaFound && odlawFound) {
      setAllFound(true);
      createTimeRecord();
    }
  }, [waldoFound, wendaFound, odlawFound])

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

  const leadersCollectionRef = collection(db, 'leaders');
  
  const createTimeRecord = async () => {
    setStarted(false);
    setRunning(false);

    // check if user already is in database
    const q = query(leadersCollectionRef, where('userId', '==', auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length > 0) {
      // if so, update the time if it's better than before
      const docRef = doc(db, 'leaders', querySnapshot.docs[0].id);
      
      if (time < querySnapshot.docs[0].data().time) {
        const newTime = { time };
        updateDoc(docRef, newTime);        
      }
      
    } else {
      // otherwise add the user to database
      await addDoc(leadersCollectionRef, {
        name: auth.currentUser.displayName,
        userId: auth.currentUser.uid,
        level,
        time,      
      });
    }
  }

  const characterAlreadyFound = (character) => {
    switch (character) {
      case 'waldo':
        return waldoFound ? true : false;
      case 'wenda':
        return wendaFound ? true : false;
      case 'odlaw':
        return odlawFound ? true : false;
      default:
        return false;
    }
  }

  const markAsFound = (character) => {
    switch (character) {
      case 'waldo':
        setWaldoFound(true);
        break;
      case 'wenda':
        setWendaFound(true);
        break;
      case 'odlaw':
        setOdlawFound(true);
        break;
      default:
        setWaldoFound(false);
        setWendaFound(false);
        setOdlawFound(false);
    }
  }
  
  const showSelectionBox = (e) => {
    setNothingClicked(false);

    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setClickPos([x, y]);
  }

  const correctLocation = (selectedCharacter, coords) => {
    const currentX = clickPos[0];
    const currentY = clickPos[1];

    if (currentX >= coords.x1 
      && currentX <= coords.x2
      && currentY >= coords.y1
      && currentY <= coords.y2) {
        return true;
      }
    return false;
  }

  const checkCharacter = (character) => {
    if (!characterAlreadyFound(character)) {
      const selected = characters.find((c) => c.name === character);
            
      let currentLevel;
      switch (level) {
        case 1:
          currentLevel = selected.coords.level1;
          break;
        case 2:
          currentLevel = selected.coords.level2;
          break;
        case 3:
          currentLevel = selected.coords.level3;
          break;
        default:
          currentLevel = selected.coords.level1;
      }         

      if (correctLocation(selected, currentLevel)) {
        markAsFound(character);
      }
    }    
  }

  return (
    <div>
      <img 
        src={bgImage} 
        alt="waldo" 
        id='game-image'
        onClick={showSelectionBox}
      />
      {!nothingClicked &&
        <SelectBox clickPos={clickPos} selectedCharacter={selectedCharacter} setSelectedCharacter={setSelectedCharacter} checkCharacter={checkCharacter} setNothingClicked={setNothingClicked} />        
      }
      {!running &&
        <Congrats time={time} formatTime={formatTime} />
      }
    </div>
  )
}

export default Game
