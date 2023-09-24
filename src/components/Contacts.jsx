import React from "react";
import { useState } from "react";
import Logo from "../assets/GupSupLogoMain.png";
import styled from "styled-components";

const Contacts = ({ allContacts, setChatSelected }) => {
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
        </div>
        <div className="contacts">
          {allContacts?.map((contact, index) => {
            return (
              <div
                className={`contact ${
                  index === currentSelected ? "selected" : ""
                }`}
                key={index}
                onClick={() => {
                  setCurrentSelected(index);
                  setChatSelected(contact);
                }}
              >
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${contact?.avatarImage}`}
                    alt="avatar"
                  />
                </div>
                <div className="username">
                  <h3>{contact?.userName}</h3>
                </div>
              </div>
            );
          })}
        </div>
        <div className="current-user">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentUserImage}`}
              alt="avatar"
            />
          </div>
          <div className="username">
            <h2>{currentUsername}</h2>
          </div>
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-templte-columns: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1 rem;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8 rem;
    &:: -webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff39;
      min-height: 5rem;
      display: flex;
      width: 90%;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.4rem;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9186f3;
    }
  }
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    gap: 2rem;
    align-items: center;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;

export default Contacts;
