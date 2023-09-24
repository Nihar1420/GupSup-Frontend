import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Robotgif from "../assets/robot.gif";

const Welcome = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedUserData"));
  const [currentUsername, setCurrentUsername] = useState(
    loggedInUser?.userName
  );
  return (
    <Container>
      <img src={Robotgif} alt="robotif" />
      <h1>
        Welcome , <span>{currentUsername}!</span>
      </h1>
      <h3>
        Please select a chat to start!!!
      </h3>   
    </Container>
  );
};

const Container = styled.div`
   display:flex;
   justify-content:center;
   align-items:center;
   flex-direction:column;
   color:white;
   img {
    height:20rem;
   }
   span {
    color : #4e00ff
   }
`;

export default Welcome;
