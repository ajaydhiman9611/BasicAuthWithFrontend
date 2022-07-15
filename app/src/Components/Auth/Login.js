import React, { useState } from "react";
import "./styles.css";
import { isLoggedIn } from "../../helper/auth";
import {Navigate} from 'react-router-dom'
import {callLoginAPI} from "../../controllers/apis/auth"

function App() {
  // React States
  const [errorMessages, setErrorMessages] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    email: "",
    phone: "",
    pass: ""
  })

  const changeInput = function(e){
    setInput(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    });
  }

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();
    setLoading(true)

    const userdata = await callLoginAPI(input)
    console.log("Userdata in Login.js : ", userdata);
    if(userdata.success){
      setIsSuccess(true)
      setLoading(false)
      window.href = '/dashboard'
    } else {
      setIsSuccess(false);
      setErrorMessages(userdata.message)
      setLoading(false)
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = () =>
    errorMessages && (
      <div className="error">{errorMessages}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email </label>
          <input type="text" value={input.email} onChange={changeInput} name="email" required />
          {/* {renderErrorMessage("email")} */}
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;OR
        <div className="input-container">
          <label>Phone </label>
          <input type="text" value={input.phone} onChange={changeInput} name="phone" required />
          {/* {renderErrorMessage("phone")} */}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" value={input.password} onChange={changeInput} name="pass" required />
        </div>
        <div className="button-container">
          <input type="submit" disabled={loading} value={loading ? "Loading..." : "Submit"} />
        </div>
        {renderErrorMessage}
      </form>
    </div>
  );

  if(isSuccess || isLoggedIn()) return <Navigate to={"/dashboard"} />
  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
          {renderForm}
      </div>
    </div>
  );
}

export default App;