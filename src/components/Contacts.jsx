import React from "react";
import { useState } from "react";
import Logo from "../assets/GupSupLogoMain.png";
import styled from "styled-components";

const Contacts = ({ allContacts }) => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedUserData"));
  const [currentUsername, setCurrentUsername] = useState(
    loggedInUser?.userName
  );
  const [currentUserImage, setCurrentUserImage] = useState(
    loggedInUser?.avatarImage
  );
  const [currentSelected, setCurrentSelected] = useState();
  return (
    <>
      <Container>
        <div className="brand">
          <img src={Logo} alt="Logo" />
          <h3>GupSup</h3>
        </div>
        <div className="contacts">
          {allContacts.map((contact, index) => {
            return (
              <div
                className={`contact ${
                  index === currentSelected ? "selected" : ""
                }`}
                key={index}
              >
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${contact?.avatarImage}`}
                    alt="avatar"
                  />
                </div>
                <div className="username">
                    {contact?.userName}
                </div>
              </div>
            );
          })}
        </div>
        <div className="current-user">
            <div className="avatar">
                
            </div>
        </div>
      </Container>
    </>
  );
};

const Container = styled.div``;

export default Contacts;
