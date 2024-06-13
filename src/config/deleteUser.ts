import { getFirestore, deleteDoc, doc, collection, query, where, getDocs } from 'firebase/firestore';
import { auth } from '../config/firebaseConfig';

export const deleteUserAndEvents = async (userId: string) => {
  const db = getFirestore();
  const userDocRef = doc(db, 'users', userId);

  try {
    const eventsCollectionRef = collection(db, 'events');
    const querySnapshot = await getDocs(query(eventsCollectionRef, where('userId', '==', userId)));
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
      console.log(`Evento ${doc.id} excluído`);
    });

    await deleteDoc(userDocRef);
    console.log('Usuário excluído com sucesso do Firestore');

    console.log('Todos os eventos associados ao usuário foram excluídos');
  } catch (error) {
    console.error('Erro ao excluir usuário e eventos do Firestore:', error);
    throw error;
  }
};

