import React from 'react';
import '../style.css';
import { auth, provider } from '../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login( {setIsAuth }) {
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        localStorage.setItem('isAuth', true);
        setIsAuth(true);
        navigate('/');
      })
  };

  return (
    <div className='login'>
      <p>Sign in with Google to proceed.</p>
      <button 
        className="login-button"
        onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </div>
  )
}

export default Login;
