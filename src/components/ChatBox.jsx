import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserMessages,
  sendMessage,
  setMessages,
} from "../features/messageSlice";
import { socket } from "../config/socket_config";

const ChatBox = ({ selectedChat }) => {
  const dispatch = useDispatch();
  const scrollRef = useRef();
  const loggedInId = localStorage.getItem("loggedInId");
  const messages = useSelector((state) => state.messages.messages);
  const handleSendMessage = (msg) => {
    dispatch(
      sendMessage({
        senderId: loggedInId,
        getterId: selectedChat?._id,
        message: msg,
      })
    );
    socket.emit("send-message", {
      senderId: loggedInId,
      getterId: selectedChat?._id,
      message: msg,
    });
    dispatch(
      setMessages({
        message: {
          text: msg,
        },
        senderId: loggedInId,
      })
    );
  };
  useEffect(() => {
    dispatch(
      getUserMessages({
        senderId: loggedInId,
        getterId: selectedChat?._id,
      })
    );
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  console.log(messages);
  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${selectedChat?.avatarImage}`}
              alt="avatarImage"
            />
          </div>
          <div className="username">
            <h3>{selectedChat?.userName}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => {
          return (
            <div ref={scrollRef} key={index}>
              <div
                className={`message ${
                  message?.senderId === loggedInId ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message?.message?.text}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMessage={handleSendMessage} />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
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
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;

export default ChatBox;
