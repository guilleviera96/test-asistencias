import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import FormularioFichaje from "./components/FormFichaje";
import Relevamiento from "./components/Relevamiento";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<FormularioFichaje />} />
        <Route path="/relevamiento" element={<Relevamiento />} />
      </Routes>
    </BrowserRouter>
  );
}
