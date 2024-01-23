'use client'
import { useForm } from 'react-hook-form';
import { Main, Square, Form, TextInput, Button } from './styles'

interface FormData {
  username: string;
  email: string;
  password: string;
}

export default function CreateAccount() {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {

    console.log(data);
  };

  return (
    <Main>
      <Square>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInput {...register('username')} placeholder="Username" />
          <TextInput {...register('email')} placeholder="Email" />
          <TextInput {...register('password')} type="password" placeholder="Password" />
          <Button type="submit">Register</Button>
        </Form>
      </Square>
    </Main>
  );
}
