import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import CreateTask from '../pages/CreateTask';
import { ToastContainer } from 'react-toastify';

const AppRouter :React.FC= () => {
  return (
     <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-task" element={<CreateTask />} />
      <Route path="/update-task/:id" element={<CreateTask update={true} />} />
    </Routes>
    <ToastContainer/>
      </BrowserRouter>
  )
}

export default AppRouter
