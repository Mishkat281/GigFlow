import React, { useState } from "react";
import "./Register.scss";
import upload from "../../utils/upload";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

function Register() {

  const [file, setFile] = useState(null);
  const [user, setUser] = useState({ // state to hold user registration data
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
  });   

  const navigate = useNavigate();

    // function to handle input changes and update user state
  const handleChange = (e) => { 
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

     // function to handle seller toggle
  const handleSeller = (e) => { 
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };

    // function to handle form submission
  const handleSubmit = async (e) => { 
    e.preventDefault();

    const url = file ? await upload(file) : "";

    try {
      await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

    return (
      <div className="register">
        <form action="" onSubmit={handleSubmit}>
          <div className="left">
            <h1>Create a new account</h1>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="eg: Maya"
              onChange={handleChange}
            />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="maya@123.com"
              onChange={handleChange}
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
            />
            <label htmlFor="">Profile Picture</label>
            <input type="file" onChange={e=>setFile(e.target.files[0])}/>
            <label htmlFor="">Country</label>
            <input
              type="text"
              name="country"
              placeholder="eg: India"
              onChange={handleChange}
            />
            <button type="submit">Register</button>
          </div>
          <div className="right">
            <h1>I want to become a seller</h1>
            <div className="toggle">
              <label htmlFor="seller">Activate the seller account</label>
              <label htmlFor="" className="switch">
                <input type="checkbox" name=""  onChange={handleSeller}/>
                <span className="slider round"></span>
              </label>
            </div>
            <label htmlFor="">Phone Number</label>
            <input
              type="phone"
              name=""
              id="tel"
              placeholder="+91 9876543210"
              onChange={handleChange}
            />
            <textarea name="desc" cols="30" rows="10" id="text" onChange={handleChange}></textarea>
          </div>
        </form>
      </div>
    );
  };

export default Register;
