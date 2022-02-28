import { collection, addDoc } from 'firebase/firestore';
import { fireStore } from './firebase';

const usersRef = collection(fireStore, 'users');

const addUser = async (uid, name = 'test name', company = 'test company') => {
  await addDoc(usersRef, { uid, name, company });
};

// eslint-disable-next-line import/prefer-default-export
export const databaseService = {
  addUser
};
