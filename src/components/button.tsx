import React, { useState } from 'react';
import { Justify } from 'react-bootstrap-icons';
import styled from 'styled-components';
import Navbar from './navbar';

interface MenuHamburgerProps {
  handleColorChange: (color: 'rose' | 'green' | 'purple') => void;
  notifications: any[];
  themeColor: 'rose' | 'green' | 'purple';
}

const themeColors = {
  rose: '#F2C8C8',
  green: '#b0c4b1',
  purple: '#cdb4db',
};

const MenuHamburger: React.FC<MenuHamburgerProps> = ({ handleColorChange, notifications, themeColor }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button onClick={toggleMenu} color={themeColors[themeColor]}>
        <Justify size={25} color="#1b263b" />
      </Button>

      {isOpen && (
        <MenuContainer color={themeColors[themeColor]}>
          <MenuSection>
            <Navbar handleColorChange={handleColorChange} notifications={notifications} />
          </MenuSection>
        </MenuContainer>
      )}
    </>
  );
};

export default MenuHamburger;

const MenuContainer = styled.div<{ color: string }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${({ color }) => color};
  display: flex;
  flex-direction: column;
  z-index: 1000;
`;

const Button = styled.button<{ color: string }>`
  position: fixed;
  top: 10px;
  left: 10px; 
  background: ${({ color }) => color};
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
