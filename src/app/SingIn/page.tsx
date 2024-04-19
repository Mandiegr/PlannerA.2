'use client'
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../config/firebaseConfig';
import { useRouter } from 'next/navigation';
import { Button } from '../styles';
import { Google } from 'react-bootstrap-icons';

const RegisterGoogle = () => {
  const router = useRouter();

  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      router.push('/Agenda');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <>
     <div>
      <Button onClick={handleGoogleRegister}>   Sign in with Google <Google/> </Button>
    </div>
   </>
    
  );
};

export default RegisterGoogle;
