import { doc, setDoc, collection, addDoc, getDoc } from 'firebase/firestore';
import { fireStoreDB } from './firebase';

//const usersRef = collection(fireStoreDB, 'users');

const addUser = async (newuid, name = 'test name', company = 'test company') => {
  const newUserRef = doc(fireStoreDB, 'users', newuid);
  await setDoc(newUserRef, { name, company, uid: newuid });
};

const addJob = async (uid, name = 'testJob', estimate = 0) => {
  // get current user file
  const userRef = collection(fireStoreDB, 'users', uid, 'jobs');
  return await addDoc(userRef, { name, estimate });
};

const getJobs = async (uid) => {
  const jobSnapshot = await getDoc(doc(fireStoreDB, 'users', uid));
  console.log(jobSnapshot.data());
};

// eslint-disable-next-line import/prefer-default-export
export const databaseService = {
  addUser,
  addJob,
  getJobs
};
