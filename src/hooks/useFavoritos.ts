import { useState, useEffect } from 'react';
import { Preferences } from '@capacitor/preferences';

export const useFavoritos = () => {
  const [favoritos, setFavoritos] = useState<number[]>([]);

  // 1. Cargar favoritos del almacenamiento al montar el componente
  useEffect(() => {
    const obtenerFavoritos = async () => {
      const { value } = await Preferences.get({ key: 'favoritos_himnario' });
      if (value) {
        setFavoritos(JSON.parse(value));
      }
    };
    obtenerFavoritos();
  }, []);

  // 2. Función para agregar o quitar favoritos
  const toggleFavorito = async (id: number) => {
    let nuevaLista;
    if (favoritos.includes(id)) {
      nuevaLista = favoritos.filter(favId => favId !== id);
    } else {
      nuevaLista = [...favoritos, id];
    }

    setFavoritos(nuevaLista);

    // Guardar permanentemente en el dispositivo
    await Preferences.set({
      key: 'favoritos_himnario',
      value: JSON.stringify(nuevaLista)
    });
  };

  return { favoritos, toggleFavorito };
};