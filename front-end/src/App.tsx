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

function App() {

  // obtenemos el usuario
  const [user] = useState<UserResponse | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
        sessionStorage.setItem("usuario", JSON.stringify({
          "name": "Sergio Garroni",
          "type": "professor",
          "email": "sergio@garroni.com",
          "id": "1111",
          "picture": "../../mockData/mockImages/user-dummy.svg"
        }));
      } catch (err: any) {
        sessionStorage.setItem("usuario", JSON.stringify({
          "name": "Sergio Garroni",
          "type": "professor",
          "email": "sergio@garroni.com",
          "id": "1111",
          "picture": "../../mockData/mockImages/user-dummy.svg"
        }));
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
        <Route path="/resetpassword" element={<ResetPasswordComponent />} />
        <Route path="/publish-class" element={<PublishClassComponent />} />
        <Route path="/modify-account" element={<ModifyProfileComponent />} />
        <Route path="/change-password" element={<ChangePasswordComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;