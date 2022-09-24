import React from "react";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";

function LoginInput({ login }) {
  const [email, handleEmailChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");

  const onSubmitHandler = () => {
    login({
      email: email,
      password: password,
    });
  };

  return (
    <div className="input-login">
      <label for="email">Email</label>
      <input type="email" value={email} id="email" onChange={handleEmailChange} />
      <label for="password">Password</label>
      <input type="password" value={password} id="password" onChange={handlePasswordChange} />
      <button onClick={onSubmitHandler}>Login</button>
    </div>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
