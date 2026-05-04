import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import DetalleHimno from "./pages/DetalleHimno.tsx";
import Temas from "./pages/Temas.tsx"; // Asegúrate de importar tu nueva vista
import { SettingsProvider } from "./context/SettingsContext";

function App() {
  return (
    <SettingsProvider>
      <BrowserRouter>
        {/* El div contenedor debe envolver las rutas para aplicar el max-width en toda la app */}
        <div className="max-w-md mx-auto min-h-screen shadow-lg relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/himno/:id" element={<DetalleHimno />} />
            <Route path="/temas" element={<Temas />} />
          </Routes>
        </div>
      </BrowserRouter>
    </SettingsProvider>
  );
}

export default App;