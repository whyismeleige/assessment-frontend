import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import clsx from 'clsx'
import "../Styles/Login.css";

const SERVER_URL = 'https://assessment-backend-vxbe.onrender.com';

async function registerUser(credentials){
  return fetch(`${SERVER_URL}/register`,{
    method: "POST",
    headers:{
      "content-type": "application/json",
    },
    body: JSON.stringify(credentials)
  }).then((data) => data.json());
}

async function loginUser(credentials){
  return fetch(`${SERVER_URL}/login`,{
    method: "POST",
    headers:{
      "content-type": "application/json",
    },
    body: JSON.stringify(credentials)
  }).then((data) => data.json());
}

export default function Login(props) {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notification, setNotification] = useState("");
  const [isSuccess,setIsSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!emailValidation(email)){
      setIsSuccess(false);
      setNotification("Email Do Not Match");
      return;
    }
    if(!isLogin && password != confirmPassword){
      setIsSuccess(false);
      setNotification("Passwords Do not Match!");
      return;
    }
    const response = isLogin ? await loginUser({email,password}) :await registerUser({email,password});
    if(!isLogin){
      setIsSuccess(true);
      setIsLogin(true);
    }else{
      props.setUserToken(response.token);
    }
    setNotification(response.message);
  }

  return (
    <section>
      <div className="form-box">
        <form className="form" onSubmit={handleSubmit}>
          <span className="title">{isLogin ? "Log In" : "Sign up"}</span>
          <span className="subtitle">
            {isLogin
              ? "Log In to Your Account"
              : "Create a free account with your email."}
          </span>
          <div className="form-container">
            <input
              type="email"
              className="input"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <input
              type="password"
              className="input"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            {!isLogin && (
              <input
                type="text"
                className="input"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
              />
            )}
          </div>
          {notification && (
            <div className="notification-container">
              <span className={clsx('notification')} style={{color:isSuccess ? "green" : "red"}}>
                {isSuccess ? <FontAwesomeIcon icon={faThumbsUp}/> : <FontAwesomeIcon icon={faTriangleExclamation}/>}
                {notification}
              </span>
            </div>
          )}
          <button type="submit">{!isLogin ? "Sign Up" : "Log in"}</button>
        </form>
        <div className="form-section">
          <p>
            {isLogin ? "New User? Register!" : "Have an account? "}
            <span onClick={() => setIsLogin(!isLogin)} id="login">
              {isLogin ? "Sign Up" : "Log in"}
            </span>{" "}
          </p>
        </div>
      </div>
    </section>
  );
}

const emailValidation = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}