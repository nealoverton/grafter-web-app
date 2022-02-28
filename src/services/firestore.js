import { doc, setDoc, collection, addDoc, getDocs, getDoc } from 'firebase/firestore';
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
  const userRef = doc(fireStoreDB, 'users', uid);
  const jobsSnapshot = await getDocs(collection(userRef, 'jobs'));
  const jobs = [];

  // iterates through snapshot and pushes job data
  jobsSnapshot.forEach((job) => {
    jobs.push({ id: job.id, ...job.data() });
  });
  return jobs;
};

const getJob = async (uid, jobId) => {
  const jobRef = doc(fireStoreDB, 'users', uid, 'jobs', jobId);
  const jobSnapshot = await getDoc(jobRef);

  return jobSnapshot.data();
};

const databaseService = {
  addUser,
  addJob,
  getJobs,
  getJob
};

export default databaseService;
