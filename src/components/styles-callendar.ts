import { theme } from '@/assets/themes/theme';
import styled from 'styled-components';

export const CallendarContainer = styled.div`
  @media (max-width: 700px) {
    font-size: 0.7rem;
  }
`;


export const Model = styled.div`
display: flex;
flex-direction: column;
width: 300px;
justify-content: space-between;
align-items: center;
position: absolute;
bottom: 10rem;
padding: 0.5rem;
min-height: 10rem;
background-color: ${theme.colors.green800};
z-index: 2;

input {
  padding: 0.3rem;
  width: 17rem;
}
`;

export const Button = styled.button`
  background-color: ${theme.colors.rose100};
  color: white;
  padding: 0.4rem;
  margin-top: 0.5rem;
  margin-right: 0.5rem;
  border: none;
  color: ${theme.colors.green800};
  text-align: center;
  font-weight: bold;
  font-size: 12px;
  cursor: pointer;
`;
