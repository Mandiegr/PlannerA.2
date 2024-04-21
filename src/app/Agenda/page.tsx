"use client"
import React, { useState } from 'react';
import MyCalendar from '@/components/calendario';
import Navbar from '@/components/navbar';
import ProfilePage from '../profile/page';
import { Container, Main, Menu, StyledGridContainer } from './styles'
import { User } from 'firebase/auth';
import {QueryClient,  QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
interface AgendaProps {
  user: User;
}

export default function Agenda({ user }: AgendaProps) {
  const [color, setColor] = useState<'rose' | 'green' | 'blue'>('rose');
  const [events, setEvents] = useState([]);

  const [notifications, setNotifications] = useState<any[]>([]);

  const handleColorChange = (newColor: 'rose' | 'green' | 'blue') => {
    setColor(newColor);
  };

  const handleEventNotification = (eventNotification: any) => {
    setNotifications(prevNotifications => [...prevNotifications, eventNotification]);
  };

  return (
    <Container color={color}>
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
}


