import React from "react";
import "./Navbar.scss";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";

const Navbar = () => {
  const [active, setActive] = React.useState(false); // to track navbar state
  const [open, setOpen] = React.useState(false); // to track user menu state
  const {pathname} = useLocation(); // to get current route

  const isActive = () => {
    // function to check scroll position
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  React.useEffect(() => {
    // add scroll event listener on mount
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null; // get current user from local storage

  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
      await newRequest.post("/auth/logout"); // send logout request to server
      localStorage.setItem("currentUser", null); // remove user from local storage
      navigate("/"); // redirect to home page
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link to="/" className="link">
            <span className="text">GigFlow</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="links">
          <span>GigFlow Business</span>
          <span>Explore</span>
          <span>English</span>
          <Link to="/login" className="link">Sign in</Link>
          {/*  Conditional rendering based on user role */}
          {!currentUser?.isSeller && <span>Become a Seller</span>}
          {!currentUser?.isSeller && <button>Join </button>}
          {currentUser && (
            <div className="user" onClick={() => setOpen(!open)}>
              <img
                src={currentUser.img || "/img/noavatar.jpg"}
                alt=""
              />
              <span>{currentUser.username}</span>
              {open && (
                <div className="option">
                  {currentUser?.isSeller && (
                    <>
                      <Link to="/mygigs" className="link">Gigs</Link >
                      <Link to="/add" className="link">Add New Gig</Link >
                    </>
                  )}
                  <Link to="/orders" className="link">Orders</Link >
                  <Link to="/messages" className="link">Messages</Link >
                  <Link onClick={handleLogout} className="link">LogOut</Link >
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {active && (
        <>
          <hr />
          <div  className="menu">
            <Link className="link" to="/">Writing & Translaction</Link>
            <Link className="link" to="/">Graphic & Design</Link>
            <Link className="link" to="/"> & AnimationVideo</Link>
            <Link className="link" to="/">Music & Audio</Link>
            <Link className="link" to="/">Programming & Tech</Link>
            <Link className="link" to="/">Business</Link>
            <Link className="link" to="/">Lifestyle</Link>
            
          </div>
          <hr />
        </>
      )}
    </div>
  );
};

export default Navbar;
