import { theme } from '@/assets/themes/theme';
import styled from 'styled-components';

export const Main = styled.div`
display: flex;
flex-direction: column;
//justify-content: space-between;
justify-content: center;
align-items: center;
padding: 6rem;
min-height: 100vh;
background-color: ${theme.colors.rose400};
`;

export const Text = styled.text`
  font-size: ${theme.fontSizes.xll};
  font-family: 'Times New Roman', Times, serif;
  color: ${theme.colors.green800};
  text-align: center; 
  margin-bottom: 50px;
`;

export const Square = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-direction: column;
  width: 500px; 
  height: 500px; 
  background-color:  ${theme.colors.white};
  box-shadow: 30px 40px ${theme.colors.green800};
    
  
`;

export const Button = styled.button`

  background-color:${theme.colors.green800};
  color: white;
  padding: 5px;
  border: none;
  //width: 50%; 
  text-align: center; 
  font-weight: bold;
  font-size: ${theme.fontSizes.p};
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.rose400};
    color: ${theme.colors.green800}
  }
  
`;



