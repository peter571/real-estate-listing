import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
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
import { useQuery } from "@tanstack/react-query";
import { getRealtorByUserId } from "../api/realtors";

interface AuthProps {
  currentUser: UserCredential | User | null | any;
  login: (email: string, password: string) => Promise<UserCredential>;
  signup: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  checkIfUserExists: (email: string) => Promise<string[]>;
  googleSignUp: () => void;
  realtorUser: RealtorDetails | null;
  setRealtorUser: React.Dispatch<React.SetStateAction<RealtorDetails | null>>;
}

interface ExtendedUser extends User {
  uid: string;
}

const AuthContext = createContext({} as AuthProps);

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentUser, setCurrentUser] = useState<User | ExtendedUser | null>(
    null
  );
  const [realtorUser, setRealtorUser] = useState<RealtorDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: realtorDetails } = useQuery({
    queryKey: ["realtor", currentUser?.uid],
    enabled: currentUser !== null,
    queryFn: () => getRealtorByUserId(currentUser!.uid),
  });

  function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function googleSignUp() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
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

  function logout() {
    return auth.signOut().then(() => {
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
    if (realtorDetails && realtorDetails !== "None") {
      setRealtorUser(realtorDetails);
    }
  }, [realtorDetails]);

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
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
