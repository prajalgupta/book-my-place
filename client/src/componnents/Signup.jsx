import React, { useState } from "react";
import styled from "styled-components";
import TextInput from "./TextInput";
import Button from "./Button";
import { UserSignUp } from "../api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/reducers/userSlice";
import { openSnackbar } from "../redux/reducers/snackbarSlice";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.purple};
`;
const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.secondary + 90};
`;
const TextButton = styled.div`
  width: 100%;
  text-align: end;
  color: ${({ theme }) => theme.purple + 90};
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  font-weight: 500;
  &:hover {
    color: ${({ theme }) => theme.purple};
  }
`;

const Signup = () => {
  return (
    <Container>
      <div>
        <Title>Welcome to BookMyPlace</Title>
        <span>Please Signup with your details here</span>
      </div>
      <div style={{display: "flex", gap: "15px", flexDirection :"column"}}>
        <TextInput label = "Full Name" placeholder = "Enter your name"/>
        <TextInput label = "Email Address" placeholder = "Enter your email"/>
        <TextInput label = "Password" placeholder = "Enter your password"/>
        <Button text = "Sign Up"/>
      </div>
    </Container>
  );
};

export default Signup;
