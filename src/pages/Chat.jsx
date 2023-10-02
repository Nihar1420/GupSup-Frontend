import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getAllContacts } from "../features/userSlice";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatBox from "../components/ChatBox";
import { socket } from "../config/socket_config";
import { setMessages } from "../features/messageSlice";

const Chat = () => {
  const [chatSelected, setChatSelected] = useState(undefined);
  const dispatch = useDispatch();
  const loggedInId = localStorage.getItem("loggedInId");
  useEffect(() => {
    dispatch(getAllContacts({ userId: loggedInId }));
  }, []);

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      console.log("successfully connected");
    });
    socket.emit("user-login", { loggedInUserId: loggedInId });
    return () => {
      socket.off("connect");
    };
  }, []);

  useEffect(() => {
    socket.on("receive-message", ({ senderId, getterId, message }) => {
      console.log(message, senderId, getterId);
      dispatch(
        setMessages({
          senderId: senderId,
          getterId: getterId,
          message: message,
        })
      );
    });

    return () => {
      socket.off("receive-message");
    };
  }, []);
  const allConts = useSelector((state) => state.users.allContacts);
  return (
    <Container>
      <div className="container">
        <Contacts allContacts={allConts} setChatSelected={setChatSelected} />
        {chatSelected !== undefined ? (
          <ChatBox selectedChat={chatSelected} />
        ) : (
          <Welcome />
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
