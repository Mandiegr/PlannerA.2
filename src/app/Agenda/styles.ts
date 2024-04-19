import styled from "styled-components";

const ColorSwitcher = styled.div`
  margin-bottom: 10px;

  button {
    margin-right: 10px;
    cursor: pointer;
  }
`;

interface StyledGridContainerProps {
  color: 'rose' | 'green' | 'blue';
}

export const StyledGridContainer = styled.div<StyledGridContainerProps>`
  display: grid;
  grid-template-areas:
    'header header header header header header'
    'menu main main main main main';
  margin-top: 10px;
  gap: 10px;
  padding: 8px;
  padding-right: 20px;
  background-color: ${(props) => {
    switch (props.color) {
      case 'rose':
        return '#F2C8C8';
      case 'green':
        return '#b0c4b1';
      case 'blue':
        return '#cdb4db';
      default:
        return '#F2C8C8';
    }
  }};

  @media (min-width: 340px) and (max-width: 540px) {
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
`;

export const Main = styled(GridItem)`
  grid-area: main;
`;
