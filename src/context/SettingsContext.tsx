// src/context/SettingsContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Preferences } from '@capacitor/preferences';

type TemaType = 'claro' | 'oscuro' | 'sepia';

interface SettingsContextType {
  tema: TemaType;
  setTema: (t: TemaType) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [tema, setTemaState] = useState<TemaType | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Cargar preferencia guardada al iniciar la app
    const loadSettings = async () => {
      const { value } = await Preferences.get({ key: 'user_theme' });
      setTemaState(value ? (value as TemaType) : 'claro');
      setCargando(false);
    };
    loadSettings();
  }, []);

  const setTema = async (nuevoTema: TemaType) => {
    setTemaState(nuevoTema);
    await Preferences.set({ key: 'user_theme', value: nuevoTema });
  };

  if (cargando || tema === null) {
    return null;
  }

  return (
    <SettingsContext.Provider value={{ tema, setTema }}>
      {/* Aplicamos la clase al contenedor principal */}
      <div className={`theme-${tema} min-h-screen transition-colors duration-300`}>
        {children}
      </div>
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error("useSettings debe usarse dentro de SettingsProvider");
  return context;
};  