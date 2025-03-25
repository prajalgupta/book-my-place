import { SearchRounded } from "@mui/icons-material";
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


const Container = styled.div`
  padding: 50px 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  @media (max-width: 768px) {
    padding: 20px 12px;
  }
`;

const Title = styled.div`
  color: #ffff;
  font-weight: 500;
  width: fit-content;
  color: ${({ theme }) => theme.black}
`;


const Contact = () => {
    return (
        <Container>
            <Title>Contact US</Title>
        </Container>
      );
 };
  
export default Contact;
