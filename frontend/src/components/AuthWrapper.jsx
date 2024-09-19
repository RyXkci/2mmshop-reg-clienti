import { useState, useEffect } from "react";

import AccessDenied from "./AccessDenied";

export default function ({ children }) {
  const [admin, setAdmin]= useState(null);


  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));

    if (admin) {
      setAdmin(admin);
    }
  }, []);
   return admin ? children : <AccessDenied/>
}
