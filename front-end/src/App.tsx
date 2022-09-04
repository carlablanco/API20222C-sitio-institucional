import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import ClasesComponent from "./components/ClasesComponent/ClasesComponent";
import HomeComponent from "./components/HomeComponent/HomeComponent.lazy";
import LoginComponent from "./components/LoginComponent/LoginComponent.lazy";
import SignupComponent from "./components/SignupComponent/SignupComponent.lazy";

function App() {
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