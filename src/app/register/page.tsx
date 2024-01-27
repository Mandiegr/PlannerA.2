'use client'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/axios';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { setCookie } from 'nookies';
import { Main, Square, Form, TextInput, Button, FormError } from './styles';



interface FormData {
  id: string;
  username: string;
  email: string;
  password: string;
}

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hifens.',
    })
    .transform((username) => username.toLowerCase()),
  email: z.string().min(3, { message: 'Formato de email inválido.' }),
  password: z.string().min(8, { message: 'A senha deve ter no mínimo 8 caracteres.' }),
});

export default function CreateAccount() {
  const router = useRouter(); 

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(registerFormSchema),
  });

  async function handleRegister(data: FormData) {
    try {
     const response = await api.post('http://localhost:3001/register', {
        username: data.username,
        email: data.email,
        password: data.password,
      })

      const { id } = response.data;

      if (typeof window !== 'undefined') {
        router.push('http://localhost:3000/register/Agenda');
      }
      
     
      setCookie(null, 'id', id, { path: '/' });
      //setCookie(null, 'username', data.username, { path: '/' });
     // setCookie(null, 'email', data.email, { path: '/' });
     
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        alert(err.response.data.message)
        return 
      }
      console.error(err)
    }
  }

  return (
    <Main>
      <Square>
        <Form onSubmit={handleSubmit(handleRegister)}>
       
          <TextInput {...register('username')} placeholder="Username" />
          {errors.username && <FormError>{errors.username.message}</FormError>}

          <TextInput {...register('email')} placeholder="Email" autoComplete="email" />
          {errors.email && <FormError>{errors.email.message}</FormError>}

          <TextInput
            {...register('password')}
            type="password"
            placeholder="Password"
            autoComplete="current-password"
          />
          {errors.password && <FormError>{errors.password.message}</FormError>}

          <Button type="submit" disabled={isSubmitting}>
            Register
          </Button>
        </Form>
      </Square>
    </Main>
  );
}
