import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import "./App.css";

import Basic from "./components/Basic";
import Table from "./components/Table";
import TanTable from "./components/TanTable";
import HookForm from "./components/HookForm";

import AuthWrapper from "./components/AuthWrapper";
import Login from "./components/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/basic" element={<Basic />} />
          <Route path="/table" element={<Table />} />
          <Route path="/tantable" element={<TanTable />} />
          <Route path="/formdati" element={<HookForm />} />
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
