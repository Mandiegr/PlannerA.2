'use client'
import React from 'react';
import { Google, Pencil} from 'react-bootstrap-icons';
import { Main, Square, Text} from '../styles'
import Link from 'next/link';
import SingIn from '../SingIn/page';


export default function Home() {
  return (
    <Main>
      
      <Text>
        <h3>PlannerA</h3>
      </Text>
      <Square >
        
       <SingIn/>
     
      </Square>
       
    </Main>
  )
}