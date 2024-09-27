import { useState } from "react";

export const useLogout = (setAdmin) => {
  const logout = (admin) => {
    localStorage.removeItem("admin");
    setAdmin(null);
  };

  return { logout };
};
