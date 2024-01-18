'use client'
import React from 'react';
import { Google, Pencil} from 'react-bootstrap-icons';
import {  Button, Main, Square, Text} from '../styles'


export default function Home() {
  return (
    <Main>
      
      <Text>
        PlannerA
      </Text>
      <Square >
      {/*<text style={{color:'pink', fontWeight:'bold'}}>Crie <Pencil/></text>*/}

      <Button>Login</Button>
      <text style={{color:'pink', fontWeight:'bold', marginTop:'20px' }}>Ou</text>
      <Google size={24} style={{color:'pink', marginTop:'20px', cursor:'pointer'}}/>
      </Square>
       
    </Main>
  )
}