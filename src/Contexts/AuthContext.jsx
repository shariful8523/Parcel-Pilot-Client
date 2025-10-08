
import { createContext } from "react";
import { getAuth } from "firebase/auth";
import app from "../firebase/firebase.init";

// Firebase auth instance
export const auth = getAuth(app);

// React context
export const AuthContext = createContext(null);
