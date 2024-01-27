import { theme } from "@/assets/styles/theme";
import styled from "styled-components";



export const Main = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 6rem;
min-height: 100vh;
background-color: ${theme.colors.rose100};
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
  box-shadow: 30px 40px ${theme.colors.rose600}
  
  `;

 export const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: auto;
  border-style: ${theme.colors.green800};
  
`;

export const TextInput = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border-color: ${theme.colors.rose600};

  

`;

export const Button = styled.button`
  background-color: ${theme.colors.rose600};
  color: white;
  padding: 10px;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: ${theme.colors.green800};
  }
`;

export const FormError = styled.text`
 font-size: 10px;
  color: #f75a68;

`;