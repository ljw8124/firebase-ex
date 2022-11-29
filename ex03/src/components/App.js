import React, {useState} from 'react';
import fbase from 'fbInstance';
import AppRouter from 'components/Router';
import { authService } from "fbInstance";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

  return <>
    <AppRouter isLoggedIn={isLoggedIn}/>
    <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
  </>
}

export default App;
