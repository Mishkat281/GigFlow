import React, { useState } from "react";
import "./Login.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", { username, password }); // sending login request
      localStorage.setItem("currentUser", JSON.stringify(res.data.Data)); // storing user data in local storage
        navigate("/"); // redirecting to home page

      console.log(res.data); // success response
    } catch (err) {
      setError(err.response.data); // setting error message
      
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>

        <label>Username</label>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>

        {error && error}
      </form>
    </div>
  );
}

export default Login;
