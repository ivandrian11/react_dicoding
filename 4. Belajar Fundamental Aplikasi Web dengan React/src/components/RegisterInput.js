import React from "react";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";

function RegisterInput({ register }) {
  const [name, handleNameChange] = useInput("");
  const [email, handleEmailChange] = useInput("");
  const [password, handlePasswordChange] = useInput("");
  const [confirmPassword, handleConfirmPasswordChange] = useInput("");

  const onSubmitHandler = () => {
    if (password !== confirmPassword) alert("Password and password confirm must be same.");
    else
      register({
        name: name,
        email: email,
        password: password,
      });
  };

  return (
    <div className="input-register">
      <label for="name">Name</label>
      <input type="text" value={name} id="name" onChange={handleNameChange} />
      <label for="email">Email</label>
      <input type="email" value={email} id="email" onChange={handleEmailChange} />
      <label for="password">Password</label>
      <input type="password" value={password} id="password" onChange={handlePasswordChange} />
      <label for="confirmPassword">Confirm Password</label>
      <input type="password" value={confirmPassword} id="confirmPassword" onChange={handleConfirmPasswordChange} />
      <button onClick={onSubmitHandler}>Register</button>
    </div>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
