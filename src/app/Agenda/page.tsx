'use client';

import React, { useState } from 'react';
import MyCalendar from '@/components/calendario';
import Navbar from '@/components/navbar';
import ProfilePage from '../profile/page';
import { Container, Logo, Main, Menu, StyledGridContainer } from './styles';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useUser } from '@/context/UserContext';
import MenuHamburger from '@/components/button';
import { Text } from '../styles';

const queryClient = new QueryClient();

const Agenda: React.FC = () => {
  const { user } = useUser(); 
  const [color, setColor] = useState<'rose' | 'green' | 'purple'>('rose');
  const [events, setEvents] = useState([]);
  const [notifications, setNotifications] = useState<any[]>([]);

  const handleColorChange = (newColor: 'rose' | 'green' | 'purple') => {
    setColor(newColor);
  };

  const handleEventNotification = (eventNotification: any) => {
    setNotifications(prevNotifications => [...prevNotifications, eventNotification]);
  };

  return (
    <Container color={color}>
       <MenuHamburger handleColorChange={handleColorChange} notifications={notifications} themeColor={color} />
      <Logo>PlannerA</Logo>
      <StyledGridContainer>
        <Menu>
          <ProfilePage />
          <Navbar handleColorChange={handleColorChange} notifications={notifications} />
        </Menu>
        <Main>
          <QueryClientProvider client={queryClient}>
            <MyCalendar handleEventNotification={handleEventNotification} />
          </QueryClientProvider>
        </Main>
      </StyledGridContainer>
     
    </Container>
  );
};

export default Agenda;
