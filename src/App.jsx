import Login from "./Components/Login";
import Home from "./Components/Home";
import { useState } from "react";
export default function App() {
  const [userToken, setUserToken] = useState(localStorage.getItem('token'));

  const saveUserToken = (token) => {
    setUserToken(token);
    localStorage.setItem('token',token);
  }
  return (
    <>
      {!userToken ? (
        <Login setUserToken={saveUserToken} />
      ) : (
        <>
          <Home/>
        </>
      )}
    </>
  );
}
