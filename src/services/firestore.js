import {
  doc,
  setDoc,
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { fireStoreDB, auth } from './firebase';

const { uid } = auth.currentUser ? auth.currentUser : '';

const getJobRef = (jobId) => doc(fireStoreDB, 'users', uid, 'jobs', jobId);

const addUser = async (newuid, name = 'test name', company = 'test company') => {
  const newUserRef = doc(fireStoreDB, 'users', newuid);
  await setDoc(newUserRef, { name, company, uid: newuid });
};

const addJob = async (
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

const getJobs = async () => {
  const userRef = doc(fireStoreDB, 'users', uid);
  const jobsSnapshot = await getDocs(collection(userRef, 'jobs'));
  const jobs = [];

  // iterates through snapshot and pushes job data
  jobsSnapshot.forEach((job) => {
    jobs.push({ id: job.id, ...job.data() });
  });
  return jobs;
};

const getJob = async (jobId) => {
  console.log(uid, jobId);
  const jobRef = doc(fireStoreDB, 'users', uid, 'jobs', jobId);
  const jobSnapshot = await getDoc(jobRef);

  return jobSnapshot.data();
};

const updateJob = async (jobId, data) => {
  // function expects data argument to be an object
  const jobRef = getJobRef(jobId);
  return await updateDoc(jobRef, data);
};

const deleteJob = async (jobId) => {
  const jobRef = getJobRef(jobId);
  console.log(jobRef);
  return await deleteDoc(jobRef);
};

const databaseService = {
  addUser,
  addJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob
};

export default databaseService;
