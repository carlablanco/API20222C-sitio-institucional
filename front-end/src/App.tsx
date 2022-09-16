import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import ClasesComponent from "./components/ClasesComponent/ClasesComponent";
import HomeComponent from "./components/HomeComponent/HomeComponent.lazy";
import LoginComponent from "./components/LoginComponent/LoginComponent.lazy";
import SignupComponent from "./components/SignupComponent/SignupComponent.lazy";

function App() {
  //Logear usuario
  const logearUsuario = () => {
    sessionStorage.setItem("usuario", JSON.stringify({
      "name": "Sergio Garroni",
      "type": "student",
      "id": "1111",
      "picture": "../../mockData/mockImages/user-dummy.svg"
  }));
  }
  logearUsuario();
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<SignupComponent />} />
          <Route path="/clases" element={<ClasesComponent />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;