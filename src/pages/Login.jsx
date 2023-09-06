import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import gupsup from "../assets/GupSupLogoMain.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import "animate.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/authSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInId = localStorage.getItem("loggedInId");
  const loggedUser = useSelector((state) => state.auth.loggedInUser);
  const initialValues = {
    userEmail: "",
    userPassword: "",
  };

  const validationSchema = Yup.object({
    userEmail: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    userPassword: Yup.string()
      .required("Password is required")
      .min(8, "Password should be atleast 8 characters long"),
  });

  const { values, handleChange, handleSubmit, touched, errors } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, action) => {
      dispatch(
        login({
          userEmail: values.userEmail,
          userPassword: values.userPassword,
        })
      );
      action.resetForm();
    },
  });

  useEffect(() => {
    if (loggedInId) {
      navigate("/");
    }
  }, [loggedUser]);

  return (
    <>
      <LoginFrom>
        <form
          onSubmit={handleSubmit}
          className="animate__animated animate__zoomInUp"
        >
          <div className="brand">
            <img src={gupsup} alt="text" />
          </div>
          <input
            type="email"
            name="userEmail"
            placeholder="Email"
            value={values.userEmail}
            onChange={handleChange}
            autoComplete="off"
          />
          {errors.userEmail && touched.userEmail ? (
            <div className="formErrors">{errors.userEmail}</div>
          ) : null}
          <input
            type="password"
            name="userPassword"
            placeholder="Password"
            value={values.userPassword}
            onChange={handleChange}
          />
          {errors.userPassword && touched.userPassword ? (
            <div className="formErrors">{errors.userPassword}</div>
          ) : null}
          <button type="submit">Login</button>
          <span>
            Not registered yet ?{" "}
            <Link
              to="/register"
              onClick={() => localStorage.removeItem("userId")}
            >
              Register
            </Link>
          </span>
        </form>
      </LoginFrom>
      <ToastContainer autoClose={3000} theme="dark"/>
    </>
  );
};

const LoginFrom = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #3f3f4c;
  .brand {
    display: flex;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    img {
      height: 5rem;
    }
    h2 {
      color: white;
      text-transform: uppercase;
    }
  }
  .formErrors {
    color: #ff5c5c;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1.3rem;
    background-color: #1716237a;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #575460;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #fdfcfd;
        outline: none;
        color: #fdfcfd;
      }
    }
    button {
      background-color: #6d6879ba;
      padding: 1rem 2rem;
      color: white;
      border-radius: 0.4rem;
      cursor: pointer;
      border: none;
      font-weight: bold;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #8c8991ba;
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      a {
        color: #5ca0ff;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;

export default Login;
