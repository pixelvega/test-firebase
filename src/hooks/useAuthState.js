import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { auth } from "../services/firebase.controller";

const useAuthState = () => {
  const [user, setUser] = useState();
  onAuthStateChanged(auth, (user) => setUser(user));
  return { user };
};

export default useAuthState;
