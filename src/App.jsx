import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import Basic from "./pages/Basic";
import Table from "./pages/Table";

function App() {
  



  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/basic" element={<Basic />}
      />
      <Route path="/table" element={<Table />}
      />
    </Routes>
    </BrowserRouter>
    </>
    
  )
}

export default App;
