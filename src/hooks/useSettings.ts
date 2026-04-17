import { useState, useEffect } from 'react';
import { Preferences } from '@capacitor/preferences';

interface Settings {
  fontSize: number;
  tema: 'claro' | 'oscuro' | 'sepia';
}

export const useSettings = () => {
  const [settings, setSettings] = useState({ fontSize: 18, tema: 'claro' });
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      const { value } = await Preferences.get({ key: 'user_settings' });
      if (value) {
        setSettings(JSON.parse(value));
      }
      setCargando(false);
    };
    cargar();
  }, []);

  // Función genérica para actualizar cualquier setting
  const updateSetting = async (nuevosSettings: Partial<Settings>) => {
    const actualizados = { ...settings, ...nuevosSettings };
    setSettings(actualizados);
    
    await Preferences.set({
      key: 'user_settings',
      value: JSON.stringify(actualizados),
    });
  };

  // Funciones de utilidad específicas para el tamaño de letra
  const aumentarFuente = () => {
    if (settings.fontSize < 40) {
      updateSetting({ fontSize: settings.fontSize + 2 });
    }
  };

  const disminuirFuente = () => {
    if (settings.fontSize > 12) {
      updateSetting({ fontSize: settings.fontSize - 2 });
    }
  };

return { settings, cargando, aumentarFuente, disminuirFuente, updateSetting };
};