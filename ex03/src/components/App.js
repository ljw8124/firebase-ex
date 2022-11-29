import React, {useEffect, useState} from 'react';
import fbase from 'fbInstance';
import AppRouter from 'components/Router';
import { authService } from "fbInstance";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  }, [])

  return (
      <>
        {init ? <AppRouter isLoggedIn={isLoggedIn}/> : "Initializing..."}
        <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
      </>
  );
}

export default App;
