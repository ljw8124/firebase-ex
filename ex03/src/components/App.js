import React, {useEffect, useState} from 'react';
import AppRouter from 'components/Router';
import { authService } from "fbInstance";
import {updateProfile} from 'firebase/auth';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user) {
        setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => updateProfile(user, {
            displayName: user.displayName
          })
        });
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => updateProfile(user, {
        displayName: user.displayName,
      })
    });
  }
  return (
      <>
        {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={isLoggedIn} userObj={userObj}/> : "Initializing..."}
      </>
  );
}

export default App;
