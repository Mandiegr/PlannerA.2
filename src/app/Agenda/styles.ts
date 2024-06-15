import { theme } from "@/assets/themes/theme";
import styled from "styled-components";

const ColorSwitcher = styled.div`
  margin-bottom: 10px;

  button {
    margin-right: 10px;
    cursor: pointer;
  }
`;

interface ContainerProps {
  color: 'rose' | 'green' | 'purple';
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => {
    switch (props.color) {
      case 'rose':
        return '#F2C8C8';
      case 'green':
        return '#b0c4b1';
      case 'purple':
        return '#cdb4db';
      default:
        return '#F2C8C8';
    }
  }};
  
  @media screen and (max-width: 700px) {
    flex-direction: column;
  }
`;

export const Logo = styled.div`
   display: none;
   color: ${theme.colors.green800};
  font-size: 2.5rem;
  @media screen and (max-width: 700px) {
    display: block;
  }
`;

export const StyledGridContainer = styled.div`
  display: grid;
  grid-template-areas:
    'header header header header header header'
    'menu main main main main main';
  margin-top: 10px;
  gap: 10px;
 padding: 20px;
  width: 100rem;

  @media (max-width: 700px) {
    grid-template-areas:
      'menu'
      'main';
    grid-template-columns: 1fr;
    width: 100%;
    padding: 10px;
  }
`;

export const GridItem = styled.div`
  background-color: '#b0c4b1';
  text-align: center;
  padding: 1rem 0;
  font-size: 1rem;

  @media (min-width: 412px) and (max-width: 720px) {
    font-size: 0.9rem;
  }

  @media (min-width: 360px) and (max-width: 390px) {
    font-size: 0.8rem;
  }

  @media (min-width: 430px) {
    font-size: 15px;
  }
`;

export const Menu = styled(GridItem)`
  grid-area: menu;

  @media screen and (max-width: 700px) {
    display: none;
  }
`;

export const Main = styled(GridItem)`
  grid-area: main;
`;
