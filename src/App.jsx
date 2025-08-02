import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormularioFichaje from "./components/FormFichaje";
import Relevamiento from "./components/Relevamiento";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormularioFichaje />} />
        <Route path="/relevamiento" element={<Relevamiento />} />
      </Routes>
    </Router>
  );
}

export default App;
