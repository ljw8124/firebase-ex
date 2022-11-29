import React, {useState} from 'react';

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onChange = (event) => {
    const {target: {name, value}} = event;
    if(name === "email") {
      setEmail(value)
    } else if(name === "password") {
      setPassword(value);
    }

  };
  const onSubmit = (event) => {
    event.preventDefault();
  }
  return (
      <div>
        <form onSubmit={onSubmit}>
          <input
              name="email"
              type="text"
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
          <input type="submit" value="Log In"/>
        </form>
        <div>
          <button>Continue with Google</button>
          <button>Continue with Github</button>
        </div>
      </div>
  );
};

export default Auth;