'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../config/firebaseConfig';
import { User } from 'firebase/auth';
import Image from 'next/image';

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        // Acessar o ID do usuário aqui:
        const userId = authUser.uid;
        console.log("ID do usuário logado:", userId);
        // Você pode utilizar o userId para outras ações na sua aplicação
      } else {
        router.push('/Home');
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (!user) {
    return null; // Retornar null ou algo apropriado para usuários não autenticados
  }

  return (
    <>
      <Image
        src={user.photoURL || '/default-photo.jpg'}
        alt="Foto do Usuário"
        width={60}
        height={60}
        style={{ borderRadius: "50%" }}
      />
      <p>{user.displayName}</p>
      {/*<p> {user.email}</p> */}
    </>
  );
};

export default ProfilePage;
