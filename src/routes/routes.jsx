import React, { useEffect } from "react";
import { createBrowserRouter, useLocation } from "react-router-dom";
import LandingPage from "../Pages/landing page/LandingPage";
import Layout from "../Component/Layout/Layout";
import Home from "../Pages/home/Home";
import { AuthProvider } from "../Component/auth/authContext/AuthContext";

// Custom scroll restoration function
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
};

// Wrapper component for ScrollToTop
const PageWrapper = ({ children }) => {
  return (
    <>
      <ScrollToTop />
      {children}
    </>
  );
};

// Create the router
const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <ScrollToTop />
        <Layout />
      </AuthProvider>
    ),
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      
      // {
      //   path: "/home",
      //   element: <Home />,
      // },
    ],
  },
]);

export default router;
