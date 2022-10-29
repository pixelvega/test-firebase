import {
  addData,
  anonymousLogin,
  getDocumentsByUserId,
  getTestCollection,
  googleLogin,
  logout,
} from "./services/firebase.controller";
import "./App.css";
import useAuthState from "./hooks/useAuthState";
import { useCallback } from "react";

function App() {
  const { user } = useAuthState();

  const handleGetData = async () => {
    const data = await getTestCollection();
    console.log(data);
  };

  const handleAddData = useCallback(async () => {
    if (!user) return;
    const docRef = await addData(user.uid);
    console.log(docRef);
  }, [user]);

  const handleGetDataByUserId = useCallback(async () => {
    if (!user) return;
    const docRef = await getDocumentsByUserId(user.uid);
    console.log(docRef);
  }, [user]);

  return (
    <>
      <button onClick={anonymousLogin}>ANONYMOUS LOGIN</button>
      <button onClick={googleLogin}>GOOGLE LOGIN</button>

      <button onClick={logout}>LOGOUT</button>
      <button onClick={handleGetData}>GET DATA</button>
      <button onClick={handleGetDataByUserId}>GET DATA BY USERID</button>

      <button onClick={handleAddData}>ADD DATA</button>
      <div>{JSON.stringify(user)}</div>
    </>
  );
}

export default App;
