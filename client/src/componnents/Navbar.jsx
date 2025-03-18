import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Button from "./Button";
import { FavoriteBorder, MenuRounded, SearchRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import LogoImg from "../utils/Images/Logo.svg";
import { logout } from "../redux/reducers/userSlice";


const Nav = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  background: ${({ theme }) => theme.background}; 
  color: ${({ theme }) => theme.text_primary};
`;

const NavbarContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 0 24px;
  display: flex;
  gap: 14px;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
`;

const NavLogo = styled.div`
  display: flex;
  align-items: center;
  padding: 0 6px;
  font-weight: 500;
  font-size: 18px;
  text-decoration: none;
  gap: 12px;
`;

const Logo = styled.img`
  height: 40px;
`;

const NavItems = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 0 6px;
  list-style: none;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Navlink = styled(NavLink)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.purple};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  text-decoration: none;

  &:hover {
    border-bottom: 1.8px solid ${({ theme }) => theme.purple};
  }

  &.active {
    color: ${({ theme }) => theme.purple};
    border-bottom: 1.8px solid ${({ theme }) => theme.purple};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 28px;
  align-items: center;
  padding: 0 6px;
  color: ${({ theme }) => theme.text_primary};

  @media screen and (max-width: 1086px) {
    display: none;
  }
`;

const MobileIcon = styled.div`
  color: ${({ theme }) => theme.purple};
  display: none;

  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

const MobileMenu = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  padding: 16px 32px;
  list-style: none;
  background: ${({ theme }) => theme.card_light}; 
  position: absolute;
  top: 60px;
  left: 0px;
  min-width: 220px;  
  transition: opacity 0.4s ease-in-out, transform 0.4s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  transform: ${({ isOpen }) => (isOpen ? "translateY(0)" : "translateY(-10px)")};
  pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")};
  z-index: ${({ isOpen }) => (isOpen ? "10" : "-1")}; 
`;

const Navbar = ({ setOpenAuth, openAuth }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Nav>
      <NavbarContainer>
        <MobileIcon onClick={() => setIsOpen(!isOpen)}>
          <MenuRounded style={{ color: "inherit" }} />
        </MobileIcon>

        <NavLogo>
          <Logo src={LogoImg} />
        </NavLogo>

        {isOpen && (
          <MobileMenu isOpen={isOpen}>
          <Navlink to="/" onClick={() => setIsOpen(false)}>Home</Navlink>
          <Navlink to="/properties" onClick={() => setIsOpen(false)}>Places to Stay</Navlink>
          <Navlink to="/contact" onClick={() => setIsOpen(false)}>Contact</Navlink>
          <Navlink to="/blogs" onClick={() => setIsOpen(false)}>Blogs</Navlink>
          <div style={{
            flex:1,
            display: "flex",
            gap: "12px"  
          }}>
          <Button text="Sign In" small  onClick={()=> setOpenAuth(!openAuth)}/>
          <Button text="Sign Up" small onClick={()=> setOpenAuth(!openAuth)}/>
          </div>
          </MobileMenu>
        )}

        <NavItems>
          <Navlink to="/">Home</Navlink>
          <Navlink to="/properties">Places to Stay</Navlink>
          <Navlink to="/contact">Contact</Navlink>
          <Navlink to="/blogs">Blogs</Navlink>
        </NavItems>

        <ButtonContainer>
          <Button type="secondary" text="Sign In" small onClick={()=> setOpenAuth(!openAuth)} />
        </ButtonContainer>
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
