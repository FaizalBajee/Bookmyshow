import React, { useEffect } from "react";
import { createBrowserRouter, useLocation } from "react-router-dom";
import LandingPage from "../Pages/landing page/LandingPage";
import Layout from "../Component/Layout/Layout";
import Home from "../Pages/home/Home";
import { AuthProvider } from "../Component/auth/authContext/AuthContext";
import ProtectedRoute from "../common/ProtectedRoute";

const router = createBrowserRouter([
  {
    element: (
      <AuthProvider>
        <Layout />
      </AuthProvider>
    ),
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },

      // {
      //   element: <ProtectedRoute />,
      //   children: [
      //     {
      //       path: "/",
      //       element: <Home />,
      //     },
      //   ],
      // },
    ],
  },
]);

export default router;
