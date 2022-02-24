import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useContext, createContext, useState, useEffect, useMemo } from 'react';
import { auth } from '../services/firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return unsubscribe();
  }, []);

  const value = useMemo(() => ({ currentUser, signup }), []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
