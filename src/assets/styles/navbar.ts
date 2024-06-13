import styled from "styled-components";
import { theme } from "../themes/theme";

export const Container = styled.div``;

export const LeftContainer = styled.div`
  flex: 1;
`;

export const Sidebar = styled.div`
  flex: 1;
  margin-top: 1rem;
`;

export const Icon = styled.span`
  padding: 0.5rem;
  font-size: 1.5rem;

  @media (max-width: 700px) {
    padding: 0.9rem;
    font-size: 1.2rem;
  }
`;

export const MenuItem = styled.a`
  display: flex;
  align-items: center;
  margin-left: -5px;
  height: 4rem;
  cursor: pointer;
  transition: all 300ms ease;
  position: relative;
  color: #003049;

  &:hover {
    background: ${theme.colors.rose400};
    color: #396177;
  }

  @media screen and (max-width: 700px) {
    h3 {
      //display: none;

    }

  }
`;

export const NotificationsPopup = styled.div<{ show: boolean }>`
  position: absolute;
  top: 0;
  left: 105%;
  width: 20rem;
  background: ${theme.colors.rose300};
  color: #003049;
  border-radius: var(--card-border-radius);
  padding: 0.8rem;
  box-shadow: 0 0 2rem hsl(var(--color-primary), 75%, 60% 25%);
  z-index: 8;
  display: ${({ show }) => (show ? 'block' : 'none')};

`;
export const ThemeIndicator = styled.div<{ color: string }>`
  width: 12px; 
  height: 12px;
  border-radius: 50%;
  margin-left: 0.6rem;
  margin-right: 1rem;
  background-color: ${({ color }) => color};
  border: 2px solid ${({ color }) => color !== 'transparent' ? color : '#1b263b'};
  

  @media (max-width: 700px) {
   margin-left: 1rem;
   margin-top: 0.5rem;
    
  }
`;