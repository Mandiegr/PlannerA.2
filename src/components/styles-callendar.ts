import { theme } from '@/assets/themes/theme';
import styled from 'styled-components';

export const CalendarContainer = styled.div`
  @media (max-width: 700px) {
    font-size: 0.7rem;
  }
`;

export const ModelContainer = styled.div`
 display: flex;
 align-items: center;
  justify-content: center;
`

export const Model = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  position: absolute;
  bottom: 10rem;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: ${theme.colors.green800};
  z-index: 2;
  align-items: center;
  justify-content: center;

  input {
    padding: 0.6rem;
    width: 100%;
    margin: 0.5rem 0;
    border: 1px solid ${theme.colors.green700};
    border-radius: 4px;
    background-color: ${theme.colors.green800};
    color: white;
    font-size: 0.9rem;
  }
`;

export const ButtonContainer = styled.div`
 display: flex;
 justify-content: space-between;
 width: 100%;
`

export const Button = styled.button`
  background-color: ${theme.colors.rose100};
  color: ${theme.colors.green800};
  padding: 0.6rem 1.2rem;
  margin: 0.5rem 0;
  border: none;
  border-radius: 4px;
  text-align: center;
  font-weight: bold;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${theme.colors.rose200};
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: -2px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: ${theme.colors.rose300};
`;
