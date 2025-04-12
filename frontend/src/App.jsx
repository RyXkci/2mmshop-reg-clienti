import { useState, useEffect } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";

import '@fontsource-variable/playfair-display';
import '@fontsource-variable/playfair-display/wght-italic.css';
import '@fontsource-variable/montserrat';
import '@fontsource/lato';
import "./App.css";



import TanTable from "./components/TanTable";

import HookForm from "./components/HookForm";

import ClothesPage from "./components/ClothesPage";
import ClothesUpload from "./components/ClothesUpload";
import SingleClothingEdit from "./components/SingleClothingEdit";
import SingleClothing from "./components/SingleClothing";

import AuthWrapper from "./components/AuthWrapper";
import Login from "./components/Login";

const queryClient = new QueryClient();

function App() {
  return (
    <>
     <QueryClientProvider client={queryClient}>

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
          <Route path="/caricavestiti" element={<ClothesUpload />} />
          <Route path="/caricavestiti/modifica/:id" element={<SingleClothingEdit/>} />
          <Route path="/club" element={<ClothesPage />} />
          <Route path="/club/:id" element={<SingleClothing/>} />
        </Routes>
      </BrowserRouter>
     </QueryClientProvider>
    
    </>
  );
}

export default App;
