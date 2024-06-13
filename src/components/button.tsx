import Link from 'next/link';
import React, { useState } from 'react';
import { Justify } from 'react-bootstrap-icons';
import styled from 'styled-components';
import Navbar from './navbar';

const MenuHamburger = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button onClick={toggleMenu}>
        <Justify size={25} color="#1b263b" />
      </Button>

      {isOpen && (
        <MenuContainer>
          <MenuSection>
            <Navbar
              handleColorChange={(color: 'rose' | 'green' | 'purple') => {
                throw new Error('Function not implemented.');
              }}
              notifications={[]}
            />
          </MenuSection>
        </MenuContainer>
      )}
    </>
  );
};

export default MenuHamburger;

const MenuContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #f2c8c8;
  display: flex;
  flex-direction: column;
  z-index: 1000;
`;

const MenuItem = styled.div`
  color: #ffffff;
  text-decoration: none;
  font-size: 1.5rem;
  margin: 10px 0;

  a {
    color: inherit;
    text-decoration: none;
  }

  @media (max-width: 491px) {
    font-size: 1rem;
  }
`;

const Button = styled.button`
  position: fixed;
  top: 10px;
  left: 10px; 
  background: #f2c8c8;
  border: none;
  z-index: 1100;
  display: none;

  @media (max-width: 700px) {
    display: block;
  }
`;

const MenuSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 60px 0;
  top: 10px;
`;
