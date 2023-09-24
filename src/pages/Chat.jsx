import React, { useEffect ,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getAllContacts } from "../features/userSlice";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatBox from "../components/ChatBox";

const Chat = () => {
  const [chatSelected, setChatSelected] = useState(undefined);
  const dispatch = useDispatch();
  const loggedInId = localStorage.getItem("loggedInId");
  useEffect(() => {
    dispatch(getAllContacts({ userId: loggedInId }));
  }, []);
  const allConts = useSelector((state) => state.users.allContacts);
  return (
    <Container>
      <div className="container">
        <Contacts allContacts={allConts} setChatSelected={setChatSelected}/>
        {chatSelected !== undefined ? <ChatBox selectedChat = {chatSelected}/> : <Welcome />}
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
