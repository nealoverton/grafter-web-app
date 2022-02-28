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
const getMaterialRef = (jobId, materialId) =>
  doc(fireStoreDB, 'users', uid, 'jobs', jobId, 'materials', materialId);

const addUser = async (newuid, name = 'test name', company = 'test company') => {
  const newUserRef = doc(fireStoreDB, 'users', newuid);

  return await setDoc(newUserRef, { name, company, uid: newuid });
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
  const jobRef = getJobRef(jobId);
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

  return await deleteDoc(jobRef);
};

const addMaterial = async (jobId, name = 'some material', quantity = 3, price = 3.5) => {
  // get current job file
  const jobRef = collection(fireStoreDB, 'users', uid, 'jobs', jobId, 'materials');

  return await addDoc(jobRef, { name, quantity, price, jobId });
};

const getMaterials = async (jobId) => {
  const jobRef = getJobRef(jobId);
  const materialsSnapshot = await getDocs(collection(jobRef, 'materials'));
  const materials = [];

  // iterates through snapshot and pushes job data
  materialsSnapshot.forEach((job) => {
    materials.push({ id: job.id, ...job.data() });
  });

  return materials;
};

const getMaterial = async (jobId, materialId) => {
  const materialRef = getMaterialRef(jobId, materialId);
  const materialSnap = await getDoc(materialRef);

  return materialSnap.data();
};

const updateMaterial = async (jobId, materialId, data) => {
  // function expects data to be an object
  const materialRef = getMaterialRef(jobId, materialId);
  return await updateDoc(materialRef, data);
};

const deleteMaterial = async (jobId, materialId) => {
  // function expects data to be an object
  const materialRef = getMaterialRef(jobId, materialId);
  return await deleteDoc(materialRef);
};

const databaseService = {
  addUser,
  addJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
  addMaterial,
  getMaterials,
  getMaterial,
  updateMaterial,
  deleteMaterial
};

export default databaseService;
