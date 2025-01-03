import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";

import '@fontsource-variable/playfair-display';
import '@fontsource-variable/playfair-display/wght-italic.css';
import '@fontsource/lato';
import "./App.css";



import TanTable from "./components/TanTable";
import HookForm from "./components/HookForm";

import AuthWrapper from "./components/AuthWrapper";
import Login from "./components/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HookForm />} />
          <Route 
          path="/admin/login" element={<Login/>}
          />
          <Route
            path="/admin/tabellaclienti"
            element={
              <AuthWrapper>
                <TanTable />
              </AuthWrapper>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
