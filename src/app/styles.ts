import { theme } from '@/assets/styles/theme';
import styled from 'styled-components';

export const Main = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
padding: 6rem;
min-height: 100vh;
background-color: ${theme.colors.rose100};
`;

export const Text = styled.div`
display: flex;
position: absolute;
z-index: 2;
`;

