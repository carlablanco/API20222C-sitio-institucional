import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import ClassesComponent from "./components/ClassesComponent/ClassesComponent";
import HomeComponent from "./components/HomeComponent/HomeComponent.lazy";
import LoginComponent from "./components/LoginComponent/LoginComponent.lazy";
import MateriasInscritasComponent from "./components/MateriasInscritasComponent/MateriasInscritasComponent.lazy";
import SignupComponent from "./components/SignupComponent/SignupComponent.lazy";
import ResetPasswordComponent from "./components/ResetPasswordComponent/ResetPasswordComponent.lazy";
import { UserResponse } from "./models/UserResponse";
import MateriasAsignadasComponent from "./components/MateriasAsignadasComponent/MateriasAsignadasComponent";
import PublishClassComponent from "./components/PublishClassComponent/PublishClassComponent.lazy";
import ModifyProfileComponent from "./components/ModifyProfileComponent/ModifyProfileComponent.lazy";
import ChangePasswordComponent from "./components/ChangePasswordComponent/ChangePasswordComponent.lazy";
import { setSourceMapRange } from "typescript";
import LogoutComponent from "./components/LogoutComponent/LogoutComponent.lazy";

function App() {

  // obtenemos el usuario
  const [user] = useState<UserResponse | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
       const loggedUserJSON = window.localStorage.getItem('loggedUser')
       if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
       }
      } catch (err: any) {
        
      }
    }
    getUserData()
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/register" element={<SignupComponent />} />
        <Route path="/classes" element={<ClassesComponent />} />
        <Route path="/assigned-classes" element={<MateriasAsignadasComponent />} />
        <Route path="/inscriptions" element={<MateriasInscritasComponent />} />
        <Route path="/reset-password" element={<ResetPasswordComponent />} />
        <Route path="/publish-class" element={<PublishClassComponent />} />
        <Route path="/modify-account" element={<ModifyProfileComponent />} />
        <Route path="/change-password" element={<ChangePasswordComponent />} />
        <Route path="/logout" element={<LogoutComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;