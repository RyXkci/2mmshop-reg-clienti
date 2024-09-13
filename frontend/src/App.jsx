import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import "./App.css";

import Basic from "./components/Basic";
import Table from "./components/Table";
import TanTable from "./components/TanTable";
import HookForm from "./components/HookForm";

function App() {
  



  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/basic" element={<Basic />}
      />
      <Route path="/table" element={<Table />}
      />
      <Route path="/tantable" element={<TanTable />}
      />
      <Route path="/formdati" element={<HookForm />}
      />
    </Routes>
    </BrowserRouter>
    </>
    
  )
}

export default App;