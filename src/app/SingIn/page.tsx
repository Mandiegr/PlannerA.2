'use client'
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../config/firebaseConfig';
import { useRouter } from 'next/navigation';
import { Button } from '../styles';

const SingIn = () => {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      router.push('/Agenda');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <div>
      <Button onClick={handleGoogleLogin}>Sing In Google</Button>
    </div>
  );
};

export default SingIn;
