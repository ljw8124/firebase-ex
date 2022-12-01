import React, {useState} from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {authService} from '../fbInstance';

const AuthForm = () => {
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

  return (
    <>
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
      </form>
      <span onClick={toggleAccount}>{
        newAccount ? "Sign in" : "Create Account"}
      </span>
    </>

)
}

export default AuthForm;