import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "firebaseapp/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail,
  signInWithPopup,
  GoogleAuthProvider,
  User,
  UserCredential,
} from "firebase/auth";
import { getRealtorByUserId } from "api/realtors";

interface ExtendedUser extends User {
  uid: string;
  accessToken: string;
}

interface AuthProps {
  currentUser: any;
  login: (email: string, password: string) => Promise<UserCredential>;
  signup: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  checkIfUserExists: (email: string) => Promise<string[]>;
  googleSignUp: () => Promise<void>;
  realtorUser: RealtorDetails | null;
  setRealtorUser: React.Dispatch<React.SetStateAction<RealtorDetails | null>>;
  isLoggedIn: boolean;
}

const AuthContext = createContext({} as AuthProps);

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [realtorUser, setRealtorUser] = useState<RealtorDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);

  async function fetchRealtorByUserId() {
    try {
      if (currentUser) {
        const data = await getRealtorByUserId(
          currentUser.uid,
          currentUser.accessToken
        );
        if (data !== "None") {
          setRealtorUser(data);
        }
        
      }
    } catch (error) {}
  }

  function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  async function googleSignUp() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function logout() {
    return await auth.signOut().then(() => {
      setRealtorUser(null);
    });
  }

  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  }

  function checkIfUserExists(email: string) {
    return fetchSignInMethodsForEmail(auth, email);
  }

  //Check if user has a realtor account
  useEffect(() => {
    fetchRealtorByUserId();
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [currentUser]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    checkIfUserExists,
    googleSignUp,
    realtorUser,
    setRealtorUser,
    isLoggedIn,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
