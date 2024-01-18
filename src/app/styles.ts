import { theme } from '@/assets/styles/theme';
import styled from 'styled-components';

export const Main = styled.div`
display: flex;
flex-direction: column;
//justify-content: space-between;
justify-content: center;
align-items: center;
padding: 6rem;
min-height: 100vh;
background-color: ${theme.colors.rose100};
`;

export const Text = styled.div`
  font-size: ${theme.fontSizes.xll};
  font-family: 'Times New Roman', Times, serif;
  color: ${theme.colors.rose600};
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
  box-shadow: 30px 40px ${theme.colors.rose600};
    
  
`;

export const Button = styled.div`

  background-color:${theme.colors.rose600};
  color: white;
  padding: 10px;
  border: none;
  border-radius: 15px;
  width: 35%; 
  text-align: center; 
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.green800};
  }
  
`;



