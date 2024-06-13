'use client';

import React from 'react';
import { Google, Pencil } from 'react-bootstrap-icons';
import { Main, Square, Text } from '../styles';
import Link from 'next/link';
import SignIn from '../SingIn/page'; 

const Home: React.FC = () => {
  return (
    <Main>
      <Text>
        <h3>PlannerA</h3>
      </Text>
      <Square>
        <SignIn /> 
      </Square>
    </Main>
  );
}

export default Home;

