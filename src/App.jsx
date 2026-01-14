import React from "react";
import Navbar from "./components/navbar/Navbar.jsx";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"; // Importing necessary modules
import "./app.scss";
import Footer from "./components/footer/Footer.jsx";
import Home from "./pages/home/Home.jsx";
import Gig from "./pages/gig/Gig.jsx";
import Gigs from "./pages/gigs/Gigs.jsx";
import Messages from "./pages/messages/Messages.jsx";
import MyGigs from "./pages/myGigs/MyGigs.jsx";
import Orders from "./pages/orders/Orders.jsx";
import Register from "./pages/register/Register.jsx";
import Add from "./pages/add/Add.jsx";
import Message from "./pages/message/Message.jsx";
import Login from "./pages/login/Login.jsx";
import {QueryClient, QueryClientProvider, useQuery} from "@tanstack/react-query"; 

function App() {

  const queryClient = new QueryClient();  

  const Layout = () => {
    return (
      <div className="app">
        <QueryClientProvider client={queryClient} >
        <Navbar />
        <Outlet /> {/* Placeholder for nested routes */}
        <Footer />
        </QueryClientProvider>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/gig/:id",
          element: <Gig />,
        },
        {
          path: "/gigs",
          element: <Gigs />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
        {
          path: "/mygigs",
          element: <MyGigs />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/add",
          element: <Add />,
        },
        {
          path: "/message/:id",
          element: <Message />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />{" "}
      {/* Providing the router to the application */}
    </div>
  );
}

export default App;
