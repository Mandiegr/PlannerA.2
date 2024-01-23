'use client'
import React from 'react';
import { Google, Pencil} from 'react-bootstrap-icons';
import { Main, Square, Text} from '../styles'
import { Button } from '../styles';
import Link from 'next/link';


export default function Home() {
  return (
    <Main>
      
      <Text>
        <h3>PlannerA</h3>
      </Text>
      <Square >
      {/*<text style={{color:'pink', fontWeight:'bold'}}>Crie <Pencil/></text>*/}
     
      <Button><Link  href={'/register'}>create account</Link> </Button>
      <text style={{color:'pink', fontWeight:'bold', marginTop:'20px' }}>Ou</text>
      <Google size={24} style={{color:'pink', marginTop:'20px', cursor:'pointer'}}/>
      </Square>
       
    </Main>
  )
}