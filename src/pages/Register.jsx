import React, { useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const Register = () => {
  const [formValues, setFormValues] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    userConfirmPassword: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
  };
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  return (
    <>
      <RegisterForm>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <img src="" alt="" />
            <h4>GupSup</h4>
          </div>
          <input
            type="text"
            name="userName"
            placeholder="Username"
            value={formValues.userName}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            name="userEmail"
            placeholder="Email"
            value={formValues.userEmail}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            name="userPassword"
            placeholder="Password"
            value={formValues.userPassword}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            name="userConfirmPassword"
            placeholder="Confirm password"
            value={formValues.userConfirmPassword}
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Register</button>
          <span>
            Already have an account ? <Link to="/login">Login</Link>
          </span>
        </form>
      </RegisterForm>
    </>
  );
};

const RegisterForm = styled.div``;

export default Register;
