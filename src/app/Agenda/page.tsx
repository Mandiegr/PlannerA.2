"use client"
import React, { useState } from 'react';
import MyCalendar from '@/components/calendario';
import Navbar from '@/components/navbar';
import ProfilePage from '../profile/page';
import { Main, Menu, StyledGridContainer } from './styles'
import { User } from 'firebase/auth';
import {QueryClient,  QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
interface AgendaProps {
  user: User;
}

export default function Agenda({ user }: AgendaProps) {
  const [color, setColor] = useState<'rose' | 'green' | 'blue'>('rose');
  const [events, setEvents] = useState([]);

  const handleColorChange = (newColor: 'rose' | 'green' | 'blue') => {
    setColor(newColor);
  };

  return (
    <>
      <StyledGridContainer color={color}>
        <Menu>
          <ProfilePage />
          <Navbar handleColorChange={handleColorChange} notifications={[]} />
        </Menu>

        <Main>
   
        <QueryClientProvider client={queryClient}>
        <MyCalendar />
        </QueryClientProvider>
        
        </Main>
      </StyledGridContainer>
    </>
  );
}


