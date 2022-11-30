import React, {useState} from 'react';
import {authService} from 'fbInstance';
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {target: {name, value}} = event;
    if(name === "email") {
      setEmail(value)
    } else if(name === "password") {
      setPassword(value);
    }

  };
  const onSubmit = async (event) => {
    event.preventDefault();
    let data;
    try {
      if(newAccount) {
        // create account
        data = await createUserWithEmailAndPassword(
            authService, email, password
        );
      } else {
        // log in
        data = await signInWithEmailAndPassword(
            authService, email, password
        );
      }
      console.log(data);
    } catch(e) {
      console.error("ERROR:", e);
      setError(e.message);
    }
  };
  const toggleAccount = () => setNewAccount(prev => !prev);
  const onSocialClick = async (event) => {
    const {target: {name},
    } = event;
    let provider;
    if(name === "google") {
      provider = new GoogleAuthProvider();
    } else if(name === "github") {
      provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(authService, provider);
    console.log(data);
  }

  return (
      <div>
        <form onSubmit={onSubmit}>
          <input
              name="email"
              type="email"
              placeholder="Email"
              required={true}
              value={email || ""} // input value 가 없을 때를 지정하지 않으면 에러가 나옴
              onChange={onChange}
          />
          <input
              name="password"
              type="password"
              placeholder="Password"
              required={true}
              value={password || ""}
              onChange={onChange}
          />
          <input type="submit" value={newAccount ? "create Account" : "Log in"}/>
          <div>{error}</div>
          <span onClick={toggleAccount}>{newAccount ? "Sign in" : "Create Account"}</span>
        </form>
        <div>
          <button name="google" onClick={onSocialClick}>Continue with Google</button>
          <button name="github" onClick={onSocialClick}>Continue with Github</button>
        </div>
      </div>
  );
};

export default Auth;