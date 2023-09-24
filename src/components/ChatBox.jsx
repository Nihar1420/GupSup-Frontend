import React from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

const ChatBox = ({ selectedChat }) => {
  const handleSendMessage = (msg) => {
    console.log(msg);
  };
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
      <ChatMessages />
      <ChatInput handleSendMessage={handleSendMessage} />
    </Container>
  );
};

const Container = styled.div`
  padding-top: 1rem;
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
`;

export default ChatBox;
