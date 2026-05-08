import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { App as CapacitorApp } from '@capacitor/app';
import { useEffect } from 'react';
import Home from "./pages/Home.tsx";
import DetalleHimno from "./pages/DetalleHimno.tsx";
import Temas from "./pages/Temas.tsx"; // Asegúrate de importar tu nueva vista
import { SettingsProvider } from "./context/SettingsContext";

function BackButtonHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const backListener = CapacitorApp.addListener('backButton', ({ }) => {
      // Si no estamos en la Home ("/"), volvemos atrás en el router
      if (location.pathname !== '/') {
        navigate(-1);
      } else {
        // Si ya estamos en la Home, cerramos la aplicación
        CapacitorApp.exitApp();
      }
    });

    return () => {
      backListener.then(l => l.remove());
    };
  }, [location, navigate]);

  return null; // Este componente no renderiza nada, solo escucha eventos
} 

function App() {
  return (
    <SettingsProvider>
      <BrowserRouter>
        {/* Agregamos el manejador dentro del Router para que tenga acceso al contexto de navegación */}
        <BackButtonHandler />
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