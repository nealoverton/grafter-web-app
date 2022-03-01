import { doc, setDoc, collection, addDoc, getDocs } from 'firebase/firestore';
import { fireStoreDB } from './firebase';

const addUser = async (newuid, name = 'test name', company = 'test company') => {
  const newUserRef = doc(fireStoreDB, 'users', newuid);
  await setDoc(newUserRef, { name, company, uid: newuid });
};

const addJob = async (
  uid,
  name = 'testJob',
  address = '123 fake street',
  estimate = 0,
  estimateEndDate = '',
  isLive = true,
  jobNotes = 'blah'
) => {
  // get current user file
  const userRef = collection(fireStoreDB, 'users', uid, 'jobs');
  return await addDoc(userRef, { name, address, estimate, estimateEndDate, isLive, jobNotes });
};

const getJobs = async (uid) => {
  const newUID = uid;
  const userRef = doc(fireStoreDB, 'users', newUID);
  const jobsSnapshot = await getDocs(collection(userRef, 'jobs'));
  const jobs = [];
  console.log(jobsSnapshot);
  // iterates through snapshot and pushes job data
  jobsSnapshot.forEach((job) => {
    jobs.push({ id: job.id, ...job.data() });
  });
  return jobs;
};

const databaseService = {
  addUser,
  addJob,
  getJobs
};

export default databaseService;
