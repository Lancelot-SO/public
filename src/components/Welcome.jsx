import React from 'react'
import styled from "styled-components";
import Robot from "../assets/robot.gif";

export default function Welcome( { currentUser } ) {
  return (
    <Container>
      <img src={Robot} alt="robot"/>
      <h1>
        Welcome, <span>{currentUser.username}!</span>
      </h1>
      <h3>Please select a chat to start messaging</h3>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  img {
    height: 20rem;
  }
  span {
    color: #4e00ff;
  }
`;
