import {
  doc,
  setDoc,
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp
} from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { fireStoreDB, auth, storage } from './firebase';

const { uid } = auth.currentUser ? auth.currentUser : '';

const getCurrentTimestamp = serverTimestamp();

const getJobRef = (jobId) => doc(fireStoreDB, 'users', uid, 'jobs', jobId);
const getMaterialRef = (jobId, materialId) =>
  doc(fireStoreDB, 'users', uid, 'jobs', jobId, 'materials', materialId);

const addUser = async (newuid, name = 'test name', company = 'test company') => {
  const newUserRef = doc(fireStoreDB, 'users', newuid);

  return await setDoc(newUserRef, { name, company, userId: newuid });
};

const addJob = async (
  name = 'testJob',
  firstAddressLine = '123 fake street',
  secondAddressLine = 'pretend boulevard',
  thirdAddressLine = '',
  city = 'test villes',
  postcode = '352 posty',
  estimate = 0,
  jobStartDate = '',

  jobEndDate = '',
  isLive = true,
  jobNotes = 'blah'
) => {
  // get current user file
  const userRef = collection(fireStoreDB, 'users', uid, 'jobs');

  return await addDoc(userRef, {
    name,
    firstAddressLine,
    secondAddressLine,
    thirdAddressLine,
    city,
    estimate,
    postcode,
    jobStartDate,
    jobEndDate,
    isLive,
    jobNotes,
    createdAt: getCurrentTimestamp,
    uid
  });
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

  // iterates through snapshot and pushes material data
  materialsSnapshot.forEach((material) => {
    materials.push({ id: material.id, ...material.data() });
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

const addImageFile = async (url, name, jobId) => {
  const imageRef = collection(fireStoreDB, 'users', uid, 'jobs', jobId, 'images');

  return await addDoc(imageRef, {
    url,
    name,
    createdAt: getCurrentTimestamp,
    uid
  });
};

const uploadImage = (jobId, file) => {
  // This fixes bug where image was not always getting uploaded
  const userUid = uid;
  const filePath = `${userUid}/${jobId}/${file.name}`;
  const storageRef = ref(storage, `files/${filePath}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    'state_changed',
    () => {},
    (error) => error,
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        addImageFile(downloadURL, file.name, jobId);
      });
    }
  );
};

const getImages = async (jobId) => {
  const imagesSnapshot = await getDocs(
    collection(fireStoreDB, 'users', uid, 'jobs', jobId, 'images')
  );
  const images = [];

  imagesSnapshot.forEach((image) => {
    images.push({ id: image.id, ...image.data() });
  });

  return images;
};

const deleteImage = async (jobId, imageName, imageId) => {
  // This fixes bug where image was not always getting deleted
  const userUid = uid;
  const imageRefFireStore = doc(fireStoreDB, 'users', userUid, 'jobs', jobId, 'images', imageId);
  const imageRefCloudStorage = ref(storage, `files/${userUid}/${jobId}/${imageName}`);
  try {
    // deletes from firestore
    await deleteDoc(imageRefFireStore);
    // deletes from storeage
    await deleteObject(imageRefCloudStorage);
  } catch (err) {
    return err;
  }
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
  deleteMaterial,
  uploadImage,
  getImages,
  deleteImage
};

export default databaseService;
