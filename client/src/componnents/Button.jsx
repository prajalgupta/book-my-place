import { CircularProgress } from "@mui/material";
import React from "react";
import styled from "styled-components";

const Button = styled.button` 
  border-radius: 10px;
  color: white; 
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: min-content;
  padding: 16px 26px;
  border: 1px solid #A020F0; 
  background: #A020F0;
  @media (max-width: 600px) {
    padding: 8px 12px;
  }

  ${({ type }) =>
    type === "secondary" &&
    `
    background: #A020F0;
    color: white;
    border: 1px solid #A020F0;
  `}

  ${({ isDisabled }) =>
    isDisabled &&
    `
  opacity: 0.8;
  cursor: not-allowed;
  `}

  ${({ isLoading }) =>
    isLoading &&
    `
    opacity: 0.8;
  cursor: not-allowed;
`}

  ${({ flex }) =>
    flex &&
    `
    flex: 1;
`}

  ${({ small }) =>
    small &&
    `
padding: 10px 28px;
`}

  ${({ outlined }) =>
    outlined &&
    `
background: transparent;
color: #A020F0;
  box-shadow: none;
  border: 1px solid #A020F0;
`}

  ${({ full }) =>
    full &&
    `
  width: 100%;`}
`;

const CustomButton = ({
  text,
  isLoading,
  isDisabled,
  rightIcon,
  leftIcon,
  type,
  onClick,
  flex,
  small,
  outlined,
  full,
}) => {
  return (
    <Button
      as="button" 
      onClick={() => !isDisabled && !isLoading && onClick && onClick()} 
      isDisabled={isDisabled}
      type={type}
      isLoading={isLoading}
      flex={flex}
      small={small}
      outlined={outlined}
      full={full}
    >
      {isLoading && (
        <CircularProgress
          style={{ width: "18px", height: "18px", color: "inherit" }}
        />
      )}
      {leftIcon}
      {text}
      {isLoading && <> . . .</>}
      {rightIcon}
    </Button>
  );
};

export default CustomButton;
