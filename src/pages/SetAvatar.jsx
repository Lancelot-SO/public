import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from '../utils/APIRoutes';
import { Buffer } from 'buffer';

function SetAvatar() {
    const api = "https://api.multiavatar.com/Binx Bond.svg";
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    const toastOptions = {
        position: "bottom-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }
    useEffect(() => {
        async function checkUser() {
          if (!localStorage.getItem("chat-app-user")) {
            navigate("/login");
          }
        }
        checkUser();
      }, []);
      

    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error("Please select an avatar", toastOptions)
        }else {
            const user = await JSON.parse( localStorage.getItem("chat-app-user"));
            const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image: avatars[selectedAvatar],
            });

            if(data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem("chat-app-user", JSON.stringify(user));
                navigate("/");
            }else {
                toast.error("Error setting avatar. Please try again", toastOptions)
            }
        }
    };
    useEffect(() => {
        async function fetchData() {
            const data = [];
            for (let i = 0; i < 4; i++) {
                const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
                const buffer = Buffer.from(image.data);
                data.push(buffer.toString("base64"));
            }
            setAvatars(data);
            setIsLoading(false);
        }

        fetchData();
    }, []);

    return (
        <>
            {
                isLoading ? <Container>
                    <img src={loader} alt="loader" className="loader" />

                </Container> : (


                    <Container>
                        <div className="title-container">
                            <h2>Pick an avatar as your profile picture</h2>
                        </div>
                        <div className="avatars">
                            {avatars.map((avatar, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={`avatar ${selectedAvatar === index ? "selected" : ""
                                            }`}
                                    >
                                        <img src={`data:image/svg+xml;base64,${avatar}`}
                                            alt="avatar"
                                            onClick={() => setSelectedAvatar(index)}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                        <button className='submit-btn' onClick={setProfilePicture}>Set as Profile Picture</button>
                    </Container>
                )
            }
            <ToastContainer />
        </>
    )
}

const Container = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 flex-direction: column;
 gap: 3rem;
 background-color: #131324;
 height:100vh;
 width:100vw;
 .loader {
    max-inline-size: 100%;
 }
 .title-container {
    h2 {
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
        align-items: center;
        justify-content: center;
        transition: 0.5s ease-in-out;
        img {
            height: 6rem;
        }
    }
    .selected {
        border: 0.4rem solid #4e0eff;
    }
 }
 .submit-btn {
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    font-weight: bold;
    border: none;
    cursor: pointer;
    border-radius: 0.4rem;
    text-transform: uppercase;
    transition:0.5s ease-in-out;
    font-size: 1rem;
    &:hover {
        background-color: #4e0eff;
    }
 }
`;

export default SetAvatar
