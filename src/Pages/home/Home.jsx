import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../Component/auth/authContext/AuthContext";

export default function Home() {
  const authData = useContext(AuthContext);

  useEffect(() => {
    console.log({authData});
  }, [authData]);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
