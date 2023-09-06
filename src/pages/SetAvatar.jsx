import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import loader from "../assets/loader (1).gif";
import "animate.css";
// import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Buffer } from "buffer";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAvatarImage } from "../features/profileSlice";

const SetAvatar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = localStorage.getItem("loggedInId");
  const avatarApi = "https://api.multiavatar.com/45678945";
  const [avatar, setAvatar] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const [loading, setIsLoading] = useState(true);
  const setProfilePicture = () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select your avatar");
    } else {
      dispatch(
        setAvatarImage({
          avatarImage: avatar[selectedAvatar],
          userId: userId,
        })
      );
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      let data = [];
      for (let i = 0; i < 2; i++) {
        let image = await axios.get(
          `${avatarApi}/${Math.round(Math.random() * 1000)}`
        );
        let buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setIsLoading(false);
      setAvatar(data);
    };
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <AvatarContainer>
          <img src={loader} alt="loader" className="loader" />
        </AvatarContainer>
      ) : (
        <AvatarContainer>
          <div className="title-container">
            <h1>Pick an avatar for your profile picture</h1>
          </div>
          <div className="avatars">
            {avatar.map((uniqueAvatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${uniqueAvatar}`}
                    alt="avatar"
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button className="submit-btn" onClick={() => setProfilePicture()}>
            Set as Profile Picture
          </button>
        </AvatarContainer>
      )}
      <ToastContainer theme="dark" autoClose={3000} />
    </>
  );
};

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.2s ease-in-out;
      img {
        height: 6rem;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
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
`;

export default SetAvatar;
