import { Modal } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import Background from "../utils/Images/Background.svg";
import { Close } from "@mui/icons-material";
import SignIn from "../componnents/SignIn";
import Signup from "../componnents/Signup";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const Container = styled.div`
  width: 400px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text_primary};
  background: url(${Background});
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 8px;
  position: relative;
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 50%;
  padding: 2px;
  width: 32px;
  height: 32px;
  border: 1px solid ${({ theme }) => theme.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.secondary + 20};
  }
`;

const Text = styled.p`
  display: flex;
  gap: 12px;
  font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.secondary + 90};
  margin-top: 16px;
  @media (max-width: 400px) {
    font-size: 14px;
  }
`;

const TextButton = styled.div`
  color: ${({ theme }) => theme.secondary};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
`;

const Authentication = ({ openAuth, setOpenAuth }) => {
  console.log("Authentication component received openAuth:", openAuth);

  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <Modal open={openAuth} onClose={() => setOpenAuth(false)}>
      <Wrapper>
        <Container>
          <CloseButton onClick={() => setOpenAuth(false)}>
            <Close sx={{ color: "white" }} />
          </CloseButton>
          {isSignIn ? <SignIn /> : <Signup />}
          <Text>
            {isSignIn ? "Don't have an account?" : "Already have an account?"}
            <TextButton onClick={() => setIsSignIn(!isSignIn)}>
              {isSignIn ? "Sign up" : "Sign in"}
            </TextButton>
          </Text>
        </Container>
      </Wrapper>
    </Modal>
  );
};

export default Authentication;