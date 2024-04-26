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
        const userId = authUser.uid;
        console.log("ID do usuário logado:", userId);
      } else {
        router.push('/Home');
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (!user) {
    return null;
  }

  return (
    <>
      <Image
        src={user.photoURL || '/default-photo.jpg'}
        alt="Foto do Usuário"
        width={55}
        height={55}
        style={{ borderRadius: "50%" }}
      />
      <p>{user.displayName}</p>
      {/*<p> {user.email}</p> */}
    </>
  );
};

export default ProfilePage;
